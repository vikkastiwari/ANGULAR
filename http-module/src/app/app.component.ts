import { PostsService } from './posts.service';
import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';

@Component({
selector: 'app-root',
//   changeDetection: ChangeDetectionStrategy.Default,
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    
    @Input()
    loadedPosts: Post[] = [];
    error = '';
    isLoading = false;
    private errSub!: Subscription;

    constructor(private http: HttpClient, private postsService:PostsService) {}

    ngOnInit() {

        this.errSub = this.postsService.error.subscribe( errMessage => {
            this.error = errMessage;
        });

        this.isLoading = true;
        this.postsService.fetchPosts().subscribe( posts => {
            this.isLoading = false;
            this.loadedPosts = posts;
        }, error => {
            this.isLoading = false;
            this.error = error.message;
            console.log(this.error);
        });
    }

    onCreatePost(postData: Post) {
        // Send Http request
        this.postsService.createAndStorePost( postData.title, postData.content );
    }

    onFetchPosts() {
    // Send Http request
        this.isLoading = true;
        
        this.postsService.fetchPosts().subscribe( posts => {
            this.isLoading = false;
            this.loadedPosts = posts;
        }, error => {
            this.isLoading = false;
            this.error = error.message;
            console.log(error);
        });
    }

    onClearPosts() {
    // Send Http request
        this.postsService.deletePosts().subscribe(()=>{
            this.loadedPosts = [];
        });
    }

    onHandleError() {
        this.error = '';
    }

    ngOnDestroy() {
        this.errSub.unsubscribe();
    }
}
