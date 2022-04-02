import { ServersService } from './../servers.service';
// we use this service to resolving dynamic data with the resolve guard.

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

interface Server {
    id: number;
    name: string;
    status: string;
}

// injecting service into service
@Injectable()
export class ServerResolver implements Resolve<Server>{

    constructor(private serversService:ServersService){}

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Server | Observable<Server> | Promise<Server> {
        // here unlike the component itself each time it gets executed or to say re-rendered there fore no need to define observable or subscribe just snapshot will work
        return this.serversService.getServer(+route.params['id']);
    }
}