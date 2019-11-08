import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/home/results/results.component';
import { SearchComponent } from './pages/home/search/search.component';

@NgModule({
	declarations: [AppComponent, TopBarComponent, HomeComponent, SearchComponent, ResultsComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
