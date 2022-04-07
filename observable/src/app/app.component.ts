import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'observable';
    userActivated = false;
    
    constructor ( private userService: UserService ) { }
    
    ngOnInit(){
        this.userService.activatedEmitter.subscribe( didActivated => {
            this.userActivated = didActivated;
        });
    }
    
}
