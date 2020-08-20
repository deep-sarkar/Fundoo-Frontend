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
import { RegisterService } from './services/accountServices/register.service';

const fundooRoutes: Routes=[
  {path:"register", component:RegistrationComponent},
  {path:"login", component:LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    RegistrationComponent,
    LoginComponent
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
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
