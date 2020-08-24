import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Component
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LoginComponent } from './components/login/login.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// services
import { ValidateFormFieldService } from './services/validationService/validate-form-field.service';
import { AccountHttpService } from './services/accountServices/account-http.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UtilityService } from './services/utilityService/utility.service';
import { GenericService } from './services/genericService/generic.service';


const fundooRoutes: Routes=[
  {path:"register", component:RegistrationComponent},
  {path:"login", component:LoginComponent},
  {path:"forgot", component:ForgotPasswordComponent},
  {path:"changePassword", component:ChangePasswordComponent},
  {path:"", component:SideNavComponent},
  {path:"activate/:surl", component:ActivateAccountComponent},
  {path:"resetPassword/:surl", component:ResetPasswordComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    SideNavComponent,
    ActivateAccountComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forRoot(fundooRoutes),
    HttpClientModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule
  
  ],
  providers: [
    AccountHttpService,
    ValidateFormFieldService,
    UtilityService,
    GenericService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
