import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let credentials = {
      username: this.authForm.get('username').value,
      password: this.authForm.get('password').value,
    };
    if (this.authForm.invalid) {
      return;
    } else {
      this.authservice.signin(credentials).subscribe(
        (response) => {
          this.router.navigateByUrl('/inbox');
        },
        (error) => {
          if (!error.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
          if (error.error.username || error.error.password) {
            this.authForm.setErrors({ credentials: true });
          }
        }
      );
    }
  }
}
