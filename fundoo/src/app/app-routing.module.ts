import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TrashComponent } from './components/trash/trash.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  { path: "changePassword", component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: "activate/:surl", component: ActivateAccountComponent },
  { path: "resetPassword/:surl", component: ResetPasswordComponent },
  {
    path: "", component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "", component: NotesComponent,
        children: [
          { path: "create", component: CreateNoteComponent, canActivate: [AuthGuard], },
        ],
        canActivate: [AuthGuard],
      },
      { path: "reminder", component: ReminderComponent, canActivate: [AuthGuard] },
      { path: "archives", component: ArchivesComponent, canActivate: [AuthGuard] },
      { path: "trash", component: TrashComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }