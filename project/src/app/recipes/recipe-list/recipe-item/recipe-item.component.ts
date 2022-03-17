import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
    // to get data from outside from the components
    @Input()
    recipe!: Recipe;
    
    @Output() recipeSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

    onSelected() {
        this.recipeSelected.emit();
    }
    
}
