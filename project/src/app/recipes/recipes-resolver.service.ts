import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageService, private recipeService:RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        const recipes = this.recipeService.getRecipes();

        // we made a check here so that when we edit the recipe the content is not overrided with the recipes fetched from backend
        // it will only be fetched if length is zero of recipes

        if ( recipes.length === 0 ) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}