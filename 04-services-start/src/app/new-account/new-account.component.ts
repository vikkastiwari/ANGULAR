import { AccountsService } from './../accounts.service';
import { Component, EventEmitter, Output } from '@angular/core';

import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
    styleUrls: ['./new-account.component.css'],
//   providers:[LoggingService],
})
export class NewAccountComponent {
    // @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();
    
    constructor ( private loggingService: LoggingService, private accountsService: AccountsService ) {
        this.accountsService.statusUpdated.subscribe( ( status: string ) => alert( 'New Status:' + status ) );
  }

    onCreateAccount( accountName: string, accountStatus: string ) {
        this.accountsService.addAccount( accountName, accountStatus );
        // this.loggingService.logStatusChange(accountStatus);
      
    // Bad way of initialization
    //   const logService = new LoggingService();
    //   logService.logStatusChange(accountStatus);
        
    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
