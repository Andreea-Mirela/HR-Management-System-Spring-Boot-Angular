import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule, Router} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, 
  OktaAuthGuard
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService  } from './services/auth.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';




import { Inject, Injector, NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import * as jsPDF from 'jspdf';


import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductService } from './services/product.service';


import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';


import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


import { LoginStatusComponent } from './components/login-status/login-status.component';





import { FormsModule } from '@angular/forms';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

import { ShopComponent } from './components/shop/shop.component';
import { EmployeePortalComponent } from './components/employee-portal/employee-portal.component';
import { HrPortalComponent } from './components/hr-portal/hr-portal.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { HealthTrainingComponent } from './components/health-training/health-training.component';
import { HealthTrainingPdfComponent } from './components/health-training-pdf/health-training-pdf.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ChangeBgDirective } from './directives/change-bg.directive';
import { EmployeeDocsComponent } from './components/employee-docs/employee-docs.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

import { AccessControlService } from './services/access-control.service';
import { RoleService } from './services/role.service';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PortalMenuComponent } from './components/portal-menu/portal-menu.component';
import { VideoConferenceComponent } from './components/video-conference/video-conference.component';
import { TrainingComponent } from './components/training/training.component';
import { VideoConferenceeComponent } from './components/video-conferencee/video-conferencee.component'; 


const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'home', component: HomeComponent},

  {path: 'employeePortal', component: EmployeePortalComponent},

  {path: 'trainings', component: TrainingsComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'healthTraining', component: HealthTrainingComponent},
  {path: 'healthTrainingPdf', component: HealthTrainingPdfComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'question', component: QuestionComponent},

  {path: 'employeeDocs', component: EmployeeDocsComponent},

  {path: 'hrPortal', component: HrPortalComponent},
  {path: 'employee', component: EmployeesListComponent},

  {path: 'adminPortal', component: AdminPortalComponent},
  {path: 'videoconference', component:VideoConferenceComponent},
  {path: 'videoconferencee', component:VideoConferenceeComponent},

  { 
    path: 'shop',
    component: ShopComponent,
    canActivate: [OktaAuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailsComponent},
      { path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
      { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage} },
      { path: 'category', component: ProductListComponent},
      { path: 'category/:id', component: ProductListComponent},
      { path: 'search/:keyword', component: ProductListComponent},
      { path: 'checkout', component: CheckoutComponent},
      { path: 'cart-details', component: CartDetailsComponent},
      { path: '**', redirectTo: 'products', pathMatch: 'full' }
    ]
  },

  {path: 'products', component: ProductListComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    HomeComponent,
    ShopComponent,
    EmployeePortalComponent,
    HrPortalComponent,
    TrainingsComponent,
    HealthTrainingComponent,
    HealthTrainingPdfComponent,
    QuizComponent,
    QuestionComponent,
    ChangeBgDirective,
    EmployeeDocsComponent,
    EmployeesListComponent,
    AdminPortalComponent,
    LoadingSpinnerComponent,
    PortalMenuComponent,
    VideoConferenceComponent,
    TrainingComponent,
    VideoConferenceeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    FormsModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [
    ProductService,
    AuthService, 
    RoleService, 
    { provide: OktaAuth, useValue: oktaAuth },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    {
      provide: OKTA_CONFIG,
      useFactory: () => ({
        oktaAuth: oktaAuth
      })
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
