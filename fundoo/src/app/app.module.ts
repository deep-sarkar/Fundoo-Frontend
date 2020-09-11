import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AmazingTimePickerModule } from 'amazing-time-picker';

// material
import { Material } from './app.material.module';

// services
import { ValidateFormFieldService } from './services/validationService/validate-form-field.service';
import { AccountHttpService } from './services/accountServices/account-http.service';
import { UtilityService } from './services/utilityService/utility.service';
import { GenericService } from './services/genericService/generic.service';

//icon component
import { IconLabelComponent } from './components/icon-label/icon-label.component';
import { IconPaletteComponent } from './components/icon-palette/icon-palette.component';
import { IconInsertPhotoComponent } from './components/icon-insert-photo/icon-insert-photo.component';
import { IconArchiveComponent } from './components/icon-archive/icon-archive.component';
import { IconPinComponent } from './components/icon-pin/icon-pin.component';
import { IconReminderComponent } from './components/icon-reminder/icon-reminder.component';
import { IconCollaboratorComponent } from './components/icon-collaborator/icon-collaborator.component';

// Component
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { NotesComponent } from './components/notes/notes.component';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { IconTrashComponent } from './components/icon-trash/icon-trash.component';
import { LabelComponent } from './components/label/label.component';
import { IconCheckComponent } from './components/icon-check/icon-check.component';
import { DataService } from './services/dataService/data.service';
import { IconCancelComponent } from './components/icon-cancel/icon-cancel.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { TrashComponent } from './components/trash/trash.component';
import { IconDeleteComponent } from './components/icon-delete/icon-delete.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FilterPipe } from './notePipe/filter.pipe';
import { AuthGuard } from './guard/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ActivateAccountComponent,
    ResetPasswordComponent,
    CreateNoteComponent,
    IconLabelComponent,
    IconPaletteComponent,
    IconInsertPhotoComponent,
    IconArchiveComponent,
    IconPinComponent,
    IconReminderComponent,
    IconCollaboratorComponent,
    DashboardComponent,
    DisplayNoteComponent,
    NotesComponent,
    SingleNoteComponent,
    IconTrashComponent,
    LabelComponent,
    IconCheckComponent,
    IconCancelComponent,
    ReminderComponent,
    ArchivesComponent,
    TrashComponent,
    IconDeleteComponent,
    HomeComponent,
    SearchComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TextFieldModule,
    AmazingTimePickerModule,
    RouterModule,
    Material
  ],
  entryComponents:[
    SingleNoteComponent,
    LabelComponent
  ],
  providers: [
    AccountHttpService,
    ValidateFormFieldService,
    UtilityService,
    GenericService,
    DataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
