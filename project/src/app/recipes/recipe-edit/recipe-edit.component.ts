import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    id!: number;
    editMode = false;
    recipeForm!: FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

    ngOnInit() {
    //   fectched id from route
      this.route.params.subscribe(
            ( params: Params ) => {
                this.id = +params['id'];
                //   to check whether we are creating new recipe or editing existing recipe
                //   on new recipe id will null and on existing recipe id will be not null
                this.editMode = params['id'] != null; 
                console.log( this.editMode );
                this.intiForm();
            }
        )
    }

    
    onSubmit() {
        // console.log(this.recipeForm);
        // const newRecipe = new Recipe(
        //     this.recipeForm.value['name'],
        //     this.recipeForm.value['description'],
        //     this.recipeForm.value['imagePath'],
        //     this.recipeForm.value['ingredients']
        // );

        if ( this.editMode ) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        // To navigate away
        this.router.navigate( ['../'],{relativeTo:this.route} );
    }

    onAddIngredient() {
        ( <FormArray>this.recipeForm.get( 'ingredients' ) ).push(
            new FormGroup( {
                'name': new FormControl(),
                'amount': new FormControl()
            })
        )
    }

    onCancel() {
        this.router.navigate( ['../'],{relativeTo:this.route} );
    }

    onDeleteIngredient(index:number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    private intiForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if(this.editMode){
            const recipe = this.recipeService.getRecipe( this.id );
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if(recipe['ingredients']){
                for ( let ingredient of recipe.ingredients ) {
                    recipeIngredients.push(
                        new FormGroup( {
                            'name': new FormControl( ingredient.name, Validators.required ),
                            'amount': new FormControl( ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] )
                        })
                    )
                }
            }
        }

        // this will be initialized when creating new form
        this.recipeForm = new FormGroup( {
            'name': new FormControl( recipeName, Validators.required ),
            'imagePath': new FormControl( recipeImagePath, Validators.required ),
            'description': new FormControl( recipeDescription, Validators.required ),
            'ingredients': recipeIngredients
        })
    }

    getControls() {
        console.log( ( this.recipeForm.get( 'ingredients' ) as FormArray ).controls );
        
        return (this.recipeForm.get( 'ingredients' ) as FormArray).controls;
    }

}
