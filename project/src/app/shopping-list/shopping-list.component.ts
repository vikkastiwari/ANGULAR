import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
//   providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients!: Ingredient[];
    private ingredientSubStatus!:Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();

        // subscribe to event - assign ingredients
        this.ingredientSubStatus = this.shoppingListService.ingredientChanged.subscribe(
            ( ingredients: Ingredient[] ) => {
                this.ingredients = ingredients;
            }
        )
    }

    onEditItem( index: number ) {
        this.shoppingListService.startedEditing.next( index );
    }

    ngOnDestroy() {
        this.ingredientSubStatus.unsubscribe();
    }

    // onIngredientAdded( ingredient: Ingredient ) {
    //     this.ingredients.push( ingredient );
    // }
}
