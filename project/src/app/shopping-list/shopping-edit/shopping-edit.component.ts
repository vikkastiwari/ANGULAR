import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    // @Output() ingredientAdded = new EventEmitter<{nameInput:string,amountInput:number}>();
    
    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    @ViewChild('amountInput') amountInput!:ElementRef;
    @ViewChild('nameInput') nameInput!:ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

    onAddItem() {

        const ingName = this.nameInput.nativeElement.value;
        const ingAmount = this.amountInput.nativeElement.value;

        const newIngredient = new Ingredient( ingName, ingAmount );
        
        // emitting new event and passing new ingredient as a data
        this.ingredientAdded.emit( newIngredient );
    }
    
}

