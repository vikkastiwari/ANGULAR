import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
  }

    onLoadServers() {
        // navigate is not aware on which path currently you are
        // so we pass config in object form
      this.router.navigate( ['/servers'], {relativeTo:this.route} );
  }

     onLoadServer(id:number) {
        // navigate is not aware on which path currently you are
        // so we pass config in object form
         this.router.navigate( ['/servers', 2, 'edit'], { queryParams: { allowEdit: 1 }, fragment:"loading"} );
  }
}
