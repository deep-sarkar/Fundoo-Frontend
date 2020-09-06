import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TrashComponent } from './components/trash/trash.component';


const routes: Routes = [
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  { path: "changePassword", component: ChangePasswordComponent },
  { path: "activate/:surl", component: ActivateAccountComponent },
  { path: "resetPassword/:surl", component: ResetPasswordComponent },
  {
    path: "", component: DashboardComponent,
    children: [
      {
        path: "", component: NotesComponent,
        children: [
          { path: "create", component: CreateNoteComponent },
        ]
      },
      { path: "reminder", component: ReminderComponent },
      { path: "archives", component: ArchivesComponent },
      { path: "trash", component: TrashComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }