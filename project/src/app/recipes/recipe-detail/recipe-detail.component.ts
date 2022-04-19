import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    // @Input() recipe!: Recipe;
    recipe!: Recipe;
    id!: number;
    
    constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }
    
    ngOnInit() {
        this.route.params.subscribe(
            ( params: Params ) => {
                // getting id
                this.id = +params['id'];

                // getting service wrt to id
                this.recipe = this.recipeService.getRecipe( this.id );
            }
        )
    }

    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList( this.recipe.ingredients );
    }

    onEditRecipe() {
        this.router.navigate(['edit'],{relativeTo:this.route});
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe( this.id );
        this.router.navigate( ['../'],{relativeTo:this.route} );
    }
}
