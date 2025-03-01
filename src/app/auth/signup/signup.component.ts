import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup | undefined;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSignUpSubmit() {
    if (!this.signUpForm?.valid) {
      return;
    }
    const email = this.signUpForm?.value.email;
    const password = this.signUpForm?.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));

    this.store.dispatch(signupStart({ email, password }));
  }
}
