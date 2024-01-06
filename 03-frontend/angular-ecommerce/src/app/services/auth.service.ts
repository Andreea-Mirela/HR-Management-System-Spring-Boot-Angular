import { Injectable } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable, from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oktaAuthService: OktaAuthStateService,  private oktaAuth: OktaAuth) { }

  isAuthenticated(): Observable<boolean> {
    return this.oktaAuthService.authState$.pipe(
      filter((authState) => !!authState.isAuthenticated),
      map((authState) => authState.isAuthenticated!)
    );
  }

  getUserEmail(): Observable<string | undefined> {
    return this.oktaAuthService.authState$.pipe(
      filter((authState) => !!authState.isAuthenticated),
      switchMap(() => {
        return from(this.oktaAuth.getUser()).pipe(
          map((user: any) => user?.email as string | undefined)
        );
      })
    );
  }
}
