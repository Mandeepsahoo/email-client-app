import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}
  onSubmit() {
    let credentials = {
      username: this.authForm.get('username').value,
      password: this.authForm.get('password').value,
      passwordConfirmation: this.authForm.get('passwordConfirmation').value,
    };
    if (this.authForm.invalid) {
      return;
    } else {
      this.authservice.signup(credentials).subscribe(
        (response) => {
          this.router.navigateByUrl('/inbox');
        },
        (error) => {
          if (!error.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        }
      );
    }
  }
}
