import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authservice: AuthService) {}

  validate = (formControl: FormControl) => {
    const username = formControl.value;

    return this.authservice.usernameAvailable(username).pipe(
      map((value) => {
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
