import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

@Injectable()
export class ShoppingListService{

    ingredientChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient( 'Apples', 5 ),
        new Ingredient( 'Grapes', 5 ),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient( ingredient: Ingredient ) {
        this.ingredients.push( ingredient );
        this.ingredientChanged.emit( this.ingredients.slice() );
    }

    // referenced to and from - recipe.service.ts
    addIngredients( ingredients: Ingredient[] ) {
        // with this approach we will emmit alot of event emitters
        // for ( let ingredient of ingredients ) {
        //     this.addIngredient( ingredient );
        // }

        // ... it is a spread operator which lets us push list of array elements.
        // although we can push array directly but it pushes as a single object of array in to array
        // so we first push all ingredient element and then emit the changes
        this.ingredients.push( ...ingredients );
        this.ingredientChanged.emit( this.ingredients.slice() );
    }
}