import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthResponseStructure, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

    isLoginMode = true;
    isLoading = false;
    error = "";

    
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    
    onSubmit( form: NgForm ) {
        
        if ( !form.valid ) {
            return; 
        }
        const email = form.value.email;
        const password = form.value.password;
        
        // kind of custom observable
        let authObs: Observable<AuthResponseStructure>;

        this.isLoading = true;
        if ( this.isLoginMode ) {
            authObs = this.authService.login(email,password);
        } else {
            authObs = this.authService.signUp(email,password);
        }

        // after setting the obeservable we subscribe here to the authObs
        authObs.subscribe((resData: any) => {
            console.log( resData );
            this.isLoading = false;
            this.router.navigate(['/recipes']); 
        },(errorMessage: any) => {
            console.log( errorMessage );
            this.error = errorMessage;
            this.isLoading = false;
        });

        console.log(form.value);
        form.reset();
    }
}
