import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

@Injectable()
export class ShoppingListService{

    // ingredientChanged = new EventEmitter<Ingredient[]>();
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject < number>();

    private ingredients: Ingredient[] = [
        new Ingredient( 'Apples', 5 ),
        new Ingredient( 'Grapes', 5 ),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient( ingredient: Ingredient ) {
        this.ingredients.push( ingredient );
        // this.ingredientChanged.emit( this.ingredients.slice() );
        this.ingredientChanged.next( this.ingredients.slice() );
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
        // this.ingredientChanged.emit( this.ingredients.slice() );
        this.ingredientChanged.next( this.ingredients.slice() );
    }

    getIngredient( index: number ) {
        return this.ingredients[index];
    }

    updateIngredient( index: number, newIngredient: Ingredient ) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient( index: number ) {
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}