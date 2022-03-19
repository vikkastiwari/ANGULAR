import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
    @Output() serverCreated = new EventEmitter<{serverName:string,serverContent:string}>();
    
    @Output('bpCreated') bluePrintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

    @ViewChild('serverContent') serverContent:ElementRef;
    
    // newServerName = '';
    newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

    onAddServer( serverName ) {
    //   serverName - local reference technique
    //   serverContent - two way binding technique
        this.serverCreated.emit( {
            serverName: serverName.value,
            serverContent: this.serverContent.nativeElement.value,
        } );
  }

    onAddBlueprint( serverName ) {
        // this.serverContent.nativeElement.value = "something";
      this.bluePrintCreated.emit( {
        //   serverName: this.newServerName,
          serverName: serverName.value,
          serverContent: this.serverContent.nativeElement.value
      } );
  }
}
