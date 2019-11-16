import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	@ViewChild('drawer', { static: false }) drawer: MatDrawer;
	title = 'Stack Search';
	showFilters = false;
	topBarFilterIcon = 'filter_list';

	/**
	 * Toggles the filter page as visible / not visible
	 */
	toggleFilterMenu() {
		this.showFilters = !this.showFilters;
		this.topBarFilterIcon = this.topBarFilterIcon === 'close' ? 'filter_list' : 'close';
	}

	/**
	 * Opens the side drawer.
	 */
	@HostListener('panright')
	openSidenav() {
		this.drawer.open();
	}
}
