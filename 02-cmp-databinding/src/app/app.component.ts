import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{type:'server',name:"testserver",content:"This is test server"}];

    // methods are fired after the button is clicked not during the button is clicked
    onServerAdded( serverData: {serverName:string,serverContent:string} ) {
        this.serverElements.push( {
            type: 'server',
            name: serverData.serverName,
            content: serverData.serverContent
        })
    }

    onBluePrintAdded( bluePrintData: {serverName:string,serverContent:string} ) {
        this.serverElements.push( {
            type: 'blueprint',
            name: bluePrintData.serverName,
            content: bluePrintData.serverContent
        })
    }
}
