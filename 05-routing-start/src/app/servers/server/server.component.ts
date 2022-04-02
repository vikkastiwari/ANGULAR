import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

    constructor ( private serversService: ServersService,
        private route: ActivatedRoute, private router:Router ) { }

    ngOnInit() {

        // getting servers from resolver
        this.route.data.subscribe(
            ( data: Data ) => {
                this.server = data['server'];
            }
        )

        // getting servers from snapshot
        // const id = +this.route.snapshot.params['id'];
        // this.server = this.serversService.getServer( id );
        
        //  to achieve this reactively we can use observable
        // this.route.params.subscribe(
        //     ( params: Params ) => {
        //         this.server = this.serversService.getServer( +params['id'] );
        //     }
        // )
    }

    onEdit() {
        // reactive routing
        this.router.navigate( ['edit'] ,{relativeTo:this.route, queryParamsHandling:'preserve'});
    }
}
