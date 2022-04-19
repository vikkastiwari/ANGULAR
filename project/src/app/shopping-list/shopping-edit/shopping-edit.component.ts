import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    // @Output() ingredientAdded = new EventEmitter<{nameInput:string,amountInput:number}>();
    
    // @Output() ingredientAdded = new EventEmitter<Ingredient>();

    // @ViewChild('amountInput') amountInput!:ElementRef;
    // @ViewChild('nameInput') nameInput!:ElementRef;

    @ViewChild( 'f' ) shoppingListForm!: NgForm;
    subscription!: Subscription;
    editMode = false;
    edditedItemIndex!: number;
    edditedItem!: Ingredient;

    constructor(private shoppingListService:ShoppingListService) { }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            ( index: number ) => {
                this.edditedItemIndex = index;
                this.editMode = true;
                this.edditedItem = this.shoppingListService.getIngredient( index );
                this.shoppingListForm.setValue( {
                    name: this.edditedItem.name,
                    amount: this.edditedItem.amount
                })
            }
        );
    }

    onSubmit(form:NgForm) {

        // const ingName = this.nameInput.nativeElement.value;
        // const ingAmount = this.amountInput.nativeElement.value;

        const value = form.value;
        
        const newIngredient = new Ingredient( value.name, value.amount );
        
        if ( this.editMode ) {
            this.shoppingListService.updateIngredient( this.edditedItemIndex, newIngredient );
        } else {
            this.shoppingListService.addIngredient( newIngredient );
        }

        this.editMode = false;
        form.reset();

        // emitting new event and passing new ingredient as a data
        // this.ingredientAdded.emit( newIngredient );

    }

    onDelete() {
        this.shoppingListService.deleteIngredient( this.edditedItemIndex );
    }

    onClear() {
        this.shoppingListForm.reset();
        this.editMode = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

