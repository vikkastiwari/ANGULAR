import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe( 'A test Recipe', "Tasty one", "https://static.onecms.io/wp-content/uploads/sites/44/2021/02/18/veggie-grilled-cheese-tomato-soup.jpg" ),
    ];
    constructor() { }

    ngOnInit(): void {
    }

    onRecipeSelected( recipe: Recipe ) {
        this.recipeWasSelected.emit( recipe );
    }
}
