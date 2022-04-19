import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    // recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe( 'A test Recipe', "Tasty one", "https://static.onecms.io/wp-content/uploads/sites/44/2021/02/18/veggie-grilled-cheese-tomato-soup.jpg", [
            new Ingredient('Fries',20),
            new Ingredient('Bread Slice',20),
        ] ),
        
        new Recipe( 'A tasty Recipe', "Yummy one", "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg", [
            new Ingredient('Fries',10),
            new Ingredient('Breads',2),
        ]),
    ];

    constructor(private shoppingListService:ShoppingListService){}

    getRecipes() {
        // we have created a copy of array and returned it using splice
        return this.recipes.slice();
    }

    getRecipe( index: number ) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList( ingredients: Ingredient[] ) {
        this.shoppingListService.addIngredients( ingredients );
    }

    addRecipe( recipe: Recipe ) {
        this.recipes.push( recipe );
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe( index: number, newRecipe: Recipe ) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}
