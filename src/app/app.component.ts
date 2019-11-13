import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Stack Search';
	showFilters = false;
	topBarFilterIcon = 'filter_list';

	toggleFilterMenu() {
		this.showFilters = !this.showFilters;
		this.topBarFilterIcon = this.topBarFilterIcon === 'close' ? 'filter_list' : 'close';
	}
}
