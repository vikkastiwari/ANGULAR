import { AuthGuard } from './auth/auth.guard';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    {path:"", redirectTo:'recipes', pathMatch:'full'},
    {
        path: "recipes", component: RecipesComponent, canActivate:[AuthGuard],
        children: [
            {path:"",component:RecipeStartComponent},
            {path:"new", component: RecipeEditComponent},
            {path: ":id", component: RecipeDetailComponent, resolve:[RecipeResolverService]},
            {path:":id/edit", component: RecipeEditComponent, resolve:[RecipeResolverService]}
        ]
    },
    {
        path: "shopping-list", component: ShoppingListComponent,
        children: [
            {path:"edit", component: ShoppingEditComponent}
        ],
    }, 
    {
        path: "auth", component: AuthComponent,
    }
]

@NgModule( {
  imports: [
    RouterModule.forRoot( appRoutes )
    ],
    exports:[RouterModule]
} )
    
export class AppRoutingModule{ }