import { RouterStateSnapshot , ActivatedRouteSnapshot , CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// only structure and no logic
export interface CanComponentDeactivate{
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean; 
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{
    canDeactivate(
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nesxtState?: RouterStateSnapshot
    ) { 
        return component.canDeactivate();
    }
}