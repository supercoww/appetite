import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [],
	imports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
	exports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule]
})
export class MaterialModule {}
