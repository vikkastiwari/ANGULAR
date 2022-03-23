import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
//   providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit {

    ingredients!: Ingredient[];

  constructor(private shoppingListService:ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();

        // subscribe to event - assign ingredients
        this.shoppingListService.ingredientChanged.subscribe(
            ( ingredients: Ingredient[] ) => {
                this.ingredients = ingredients;
            }
        )
    }

    // onIngredientAdded( ingredient: Ingredient ) {
    //     this.ingredients.push( ingredient );
    // }
}
