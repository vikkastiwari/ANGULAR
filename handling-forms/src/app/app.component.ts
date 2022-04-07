import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'handling-forms';

    // approach 1
    @ViewChild( 'f' ) signUpForm!: NgForm;

    onSubmit() {
      console.log(this.signUpForm);
    }

    // approach 2
    //   onSubmit(form: NgForm) {
    //     console.log(form);
    //   }
}
