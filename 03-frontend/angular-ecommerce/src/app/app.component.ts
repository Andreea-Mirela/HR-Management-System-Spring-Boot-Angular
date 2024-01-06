import { Component } from '@angular/core';
import { AuthService  } from './services/auth.service';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      (result) => {
        this.isAuthenticated = result;
      }
    );
  }

  
}
