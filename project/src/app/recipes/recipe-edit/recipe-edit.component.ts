import { Route, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    id!: number;
    editMode = false;

  constructor(private route:ActivatedRoute) { }

    ngOnInit() {
    //   fectched id from route
      this.route.params.subscribe(
          ( params: Params ) => {
              this.id = +params['id'];
            //   to check whether we are creating new recipe or editing existing recipe
            //   on new recipe id will null and on existing recipe id will be not null
              this.editMode = params['id'] != null; 
              console.log(this.editMode);
              
          }
      )
  }

}
