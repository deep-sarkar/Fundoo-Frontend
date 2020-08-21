import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsComponent } from './components/components.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatCardModule } from '@angular/material';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ValidateFormFieldService } from './services/validationService/validate-form-field.service';
import { AccountHttpService } from './services/accountServices/account-http.service';

const fundooRoutes: Routes=[
  {path:"register", component:RegistrationComponent},
  {path:"login", component:LoginComponent},
  {path:"forgot", component:ForgotPasswordComponent},
  {path:"changePassword", component:ChangePasswordComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
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
    MatCardModule
  ],
  providers: [
    AccountHttpService,
    ValidateFormFieldService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
