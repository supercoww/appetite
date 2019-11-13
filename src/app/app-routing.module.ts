import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FiltersComponent } from './pages/home/filters/filters.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'filters', component: FiltersComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
