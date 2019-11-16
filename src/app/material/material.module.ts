import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [],
	imports: [
		MatToolbarModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatRippleModule,
		MatSelectModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatListModule,
		MatSidenavModule,
		MatProgressSpinnerModule,
		MatSnackBarModule
	],
	exports: [
		MatToolbarModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatRippleModule,
		MatSelectModule,
		MatDividerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatListModule,
		MatSidenavModule,
		MatProgressSpinnerModule,
		MatSnackBarModule
	]
})
export class MaterialModule {}
