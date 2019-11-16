import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FiltersComponent } from './pages/home/filters/filters.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'history', component: HistoryComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
