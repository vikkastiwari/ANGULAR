import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

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

}
