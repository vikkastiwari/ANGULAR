import { Subject, tap } from 'rxjs';
import { map } from 'rxjs';
import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable( { providedIn: 'root' } )
export class PostsService{

    error = new Subject<string>();

    constructor(private http:HttpClient){}

    createAndStorePost(title:string, content:string) {


        const postData:Post = {title:title, content:content}

        this.http
            .post( 'https://ng-angular-5872e-default-rtdb.firebaseio.com/posts.json', postData )
            .subscribe( postData => {
                console.log(postData);
            }, error => {
                this.error.next( error );
            } );
        
    }
    
    fetchPosts() {

        let searchParams = new HttpParams();
        searchParams = searchParams.append( 'print', 'pretty' );
        searchParams = searchParams.append( 'custom', 'key' );

        return this.http
            .get<{ [key: string]: Post }>( 'https://ng-angular-5872e-default-rtdb.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({'Custom-Header':'Hello'}),
                    params: searchParams,
                    responseType: 'json'
                }
            )
            .pipe(
                map( responseData => {
                    const postsArray: Post[] = [];
                    for ( const key in responseData ) {
                        if ( responseData.hasOwnProperty( key ) ) {
                            postsArray.push( { ...responseData[key], id: key } );
                        }
                    }
                    return postsArray;
                } )
            );
    }

    deletePosts() {
        return this.http.delete( 'https://ng-angular-5872e-default-rtdb.firebaseio.com/posts.json', {
            observe:'events'
        })
        .pipe(
            tap(event => {
                console.log( event );
                if ( event.type === HttpEventType.Response ) {
                    console.log(event.body);
                }

                if ( event.type === HttpEventType.Sent ) {
                    console.log(event.type);
                }
                
            })
        );
    }
}