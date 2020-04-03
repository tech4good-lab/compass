import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

// External Modules
import { MatMenuModule} from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Containers

// Components
import { NavbarComponent } from './navbar/navbar.component';

// Pipes


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // External Modules
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    EffectsModule.forFeature([
    ])
  ],
  declarations: [
    // Containers
    // Components
    NavbarComponent,
    // Pipes
  ],
  exports: [
    RouterModule,
    FormsModule,
    // External Modules
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    // Containers
    // Components
    NavbarComponent,
    // Pipes
  ],
})
export class SharedModule { }
