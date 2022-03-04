import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
    // selector:'.app-server', // class selector
    // selector:'[app-server]', // attribute selector
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
