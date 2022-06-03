import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]), //async validators!
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, 
  { validators: [this.matchPassword.validate]}
  )

  constructor(
    private matchPassword: MatchPassword, 
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    window.addEventListener('load', this.resize)
    window.addEventListener('resize', this.resize)
  }

  //sets up the size to the exact 100% for mobile!
  resize() {
    let vh = window.innerHeight * 0.01;
    let form = document.querySelector('.form')
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.body.style.setProperty('height', `${vh * 100}px`);
    (form as HTMLElement).style.setProperty('height', `${vh * 100}px`);
    console.log(vh * 100)
  }

  onSubmit(){
    if (this.authForm.invalid) {
      return;
    }

    //some RxJS

    this.authService.signup(this.authForm.value).subscribe({
      next: response => {
        console.log(this)
      },

      //this way they can see the error message if you want to display it from any template
      error: error => {
        if(!error.status){
          this.authForm.setErrors({ noConnection: true })
        }else{
          this.authForm.setErrors({ unknownError: true })
        }
      },
      complete: () => {
        console.log('complete')
      }
    })
      
  }

}
