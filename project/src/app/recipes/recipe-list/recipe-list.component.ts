import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    // @Output() recipeWasSelected = new EventEmitter<Recipe>();

    recipes!: Recipe[];
    constructor ( private recipeService: RecipeService, private route:ActivatedRoute, private router:Router ) { }

    ngOnInit(){
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate( ['new'] , {relativeTo:this.route});
    }

    // onRecipeSelected( recipe: Recipe ) {
    //     this.recipeWasSelected.emit( recipe );
    // }
}
