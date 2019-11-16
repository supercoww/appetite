import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/home/results/results.component';
import { SearchComponent } from './pages/home/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './pages/home/filters/filters.component';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { HistoryComponent } from './pages/history/history.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		TopBarComponent,
		HomeComponent,
		SearchComponent,
		ResultsComponent,
		FiltersComponent,
		HistoryComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		ImageCropperModule,
		HttpClientModule,
		AngularCropperjsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],

	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
