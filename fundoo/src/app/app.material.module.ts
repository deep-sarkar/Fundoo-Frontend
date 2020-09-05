// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatButtonModule,
        MatChipsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatMenuModule,
    ],
    exports:[
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatButtonModule,
        MatChipsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatMenuModule,
    ]
})
export class Material {}