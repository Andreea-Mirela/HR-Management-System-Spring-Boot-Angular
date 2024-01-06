import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription  } from 'rxjs';
import { AccessControlService } from 'src/app/services/access-control.service';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  canAccessEmployeePortal$: Observable<boolean> | undefined;
  canAccessHRPortal$: Observable<boolean> | undefined;
  canAccessAdminPortal$: Observable<boolean> | undefined;

  // Declară variabilele aici
  canAccessEmployeePortal: boolean | undefined;
  canAccessHRPortal: boolean | undefined;
  canAccessAdminPortal: boolean | undefined;


  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage: Storage = sessionStorage;

  showModal: boolean = false;

  private subscription: Subscription = new Subscription(); // Pentru a ține evidența tuturor subscriptions
  isLoading: boolean = true;

  constructor(private router: Router, private accessControlService: AccessControlService, private oktaAuth: OktaAuth, private oktaAuthService: OktaAuthStateService) {}

  
ngOnInit(): void {
  this.oktaAuthService.authState$.subscribe(
    (result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    }
  );

  // Începe verificările și setează rezultatul la variabile
  this.subscription.add(
    this.accessControlService.canAccessComponent('Angajat').subscribe(
      result => this.canAccessEmployeePortal = result
    )
  );

  this.subscription.add(
    this.accessControlService.canAccessComponent('Specialist HR').subscribe(
      result => this.canAccessHRPortal = result
    )
  );

  this.subscription.add(
    this.accessControlService.canAccessComponent('Administrator').subscribe(
      result => this.canAccessAdminPortal = result
    )
  );

  setTimeout(() => {
    this.isLoading = false;
  }, 4000);
}

  goToProducts() {
    this.router.navigate(['/products']);
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
  }
  async getUserDetails() {
    if (this.isAuthenticated) {

      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;

          // retrieve the user's email from authentication response
          const theEmail = res.email;

          // now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      );
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe la toate când componenta e distrusă
  }
}
