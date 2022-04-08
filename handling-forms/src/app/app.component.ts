import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    submitted = false;
    title = 'handling-forms';
    defaultSecret = 'pet';
    answer="";
    genders = ['male', 'female'];
    user = {
        username: '',
        email: '',
        secretQuestion: '',
        answer: '',
        gender: ''
    }
    
    // approach 1
    @ViewChild( 'f' ) signUpForm!: NgForm;

    onSubmit() {
        console.log( this.signUpForm );
        this.submitted = true;
        this.user.username = this.signUpForm.value.userData.username;
        this.user.email = this.signUpForm.value.userData.email;
        this.user.secretQuestion = this.signUpForm.value.secret;
        this.user.answer = this.signUpForm.value.questionAnswer;
        this.user.gender = this.signUpForm.value.gender;

        // reset the form which also resets the state as well as fields.
        this.signUpForm.reset();

    }

    // approach 2
    //   onSubmit(form: NgForm) {
    //     console.log(form);
    //   }

     suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }
  
}
