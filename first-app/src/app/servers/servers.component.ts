import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
    // selector:'.app-server', // class selector
    // selector:'[app-server]', // attribute selector
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
    allowNewServer = false;
    serverCreationStatus = 'Server is not created!';
    serverName = 'server name ';
    serverCreated = false;

    constructor () {
        setTimeout( () => {
            this.allowNewServer = true;
        },2000)
   }

    ngOnInit(): void {
    }

    onCreateServer() {
        this.serverCreated = true;
        this.serverCreationStatus = 'Server Created & Name is ' + this.serverName;
    }

    onUpdateServerName( event: Event ) {
    //   console.log(event);
        this.serverName = ( <HTMLInputElement>event.target ).value;
    }

}
