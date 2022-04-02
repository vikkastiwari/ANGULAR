import { ServerResolver } from './servers/server/server-resolver.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './../../../01-first-app/src/app/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path : "", component: HomeComponent},
    {path: "users", component: UsersComponent, children: [
        {path : ":id/:name", component: UserComponent},
    ]},
    // {path : "users/some", component: UsersComponent},
    {
        path: "servers",
        // canActivate: [AuthGuard],
        canActivateChild:[AuthGuard],
        component: ServersComponent,
        children: [
            { path: ":id", component: ServerComponent, resolve: { servers:ServerResolver}},
        {path : ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard]
    },
    ]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data:{'message':'Page not found'} },
    // wild-card route path
    {path:'**', redirectTo:'/not-found'}
]

@NgModule( {
    imports: [
        // hash routing method
        // RouterModule.forRoot(appRoutes, {useHash:true}),
        RouterModule.forRoot(appRoutes),
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{ 

}