import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //signedIn = false;
  signedInRef$: BehaviorSubject<boolean>;

  constructor(private auhService: AuthService) {
    this.signedInRef$ = this.auhService.signedin$;
  }

  // ngOnInit() {
  //   this.auhService.signedin$.subscribe((signedin$) => {
  //     this.signedIn = signedin$;
  //   });
  // }

  ngOnInit() {
    this.auhService.checkAuthStatus().subscribe(() => {});
  }
}
