import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
    
export class AppComponent implements OnInit {
    // title = 'project';
    
    // loadedFeature = 'recipe';
    // onNavigate( feature: string ) {
    //     this.loadedFeature = feature;
    // }

    constructor(private authService:AuthService){}

    ngOnInit() {
        this.authService.autoLogin();
    }
}
