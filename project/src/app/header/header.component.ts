import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    private userSub!: Subscription;

    constructor (
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) { }

    ngOnInit(){
        this.userSub = this.authService.user.subscribe( user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        }); 
    }
    

// to make it to listen from parent component
    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect( feature: string ) {
    //     // when we click the button after that it will emit and we will receive the strings - recipe or shopping-list
    //     this.featureSelected.emit( feature );
    // }

    onSaveData() {   
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
    
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
