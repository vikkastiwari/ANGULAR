import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Subject, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

// this is a structure of response that is returned by firebase API
export interface AuthResponseStructure {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable( { providedIn: 'root' } )
export class AuthService {
    // user = new Subject<User>();

    // now instead of Subject we will use BehaviourSubject which has same functionality but also it gives the access of previuosly emitted value

    user = new BehaviorSubject<User>( null! );
    private tokenExpirationTimer: any;

    constructor ( private http: HttpClient, private router: Router ) { }
    
    // the fields are defined wrt firebase API, we can modify it as per our need or API
    signUp( email: string, password: string ) {
        return this.http.post<AuthResponseStructure>( 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjJVwL_czml2DXvJyMH0zfDAFSrSHG5o8', {
            email: email,
            password: password,
            returnSecureToken: true,
        } ).pipe(
            catchError(this.handleError),
            tap( resData => {
                this.handleAuthentication(resData.email, resData.localId,resData.idToken,+resData.expiresIn);
            }) 
        )
    }

    login( email: string, password: string ) {
        return this.http.post<AuthResponseStructure>( 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjJVwL_czml2DXvJyMH0zfDAFSrSHG5o8', {
            email: email,
            password: password,
            returnSecureToken: true,
        } ).pipe(
            catchError( this.handleError ),
            tap( resData => {
                this.handleAuthentication(resData.email, resData.localId,resData.idToken,+resData.expiresIn);
            })
        );
    }

    logout() {
        this.user.next( null! );
        this.router.navigate( ['/auth'] );
        localStorage.removeItem( 'userData' );
        if ( this.tokenExpirationTimer ) {
            clearTimeout( this.tokenExpirationTimer );
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse( localStorage.getItem( 'userData' )! );
        
        if ( !userData ) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date( userData._tokenExpirationDate )
        );

        if ( loadedUser.token ) {
            this.user.next( loadedUser );
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }

    autoLogout( expirationDuration: number ) {
        console.log( expirationDuration );
        this.tokenExpirationTimer = setTimeout( () => {
            this.logout();
        }, expirationDuration );
    }

    private handleAuthentication( email: string, userId: string, token: string, expiresIn: number ) {
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
        
        const user = new User( email, userId, token, expirationDate );
        // emmit this as our currently logged in user
        this.user.next( user );
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    private handleError( errorRes: HttpErrorResponse ) {
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError( errorMessage );
        }

        switch ( errorRes.error.error.message ) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The entered password is invalid';
                break;
        }
        return throwError( errorMessage );
    }
}