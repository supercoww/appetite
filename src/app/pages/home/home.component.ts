import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	searchString: string;
	searchResults;
	resultLoading = false;

	constructor(private dataService: DataServiceService) {}

	ngOnInit() {}

	/**
	 * Responds to search event from search component
	 * @param searchString string to be used for search
	 */
	onSearch(searchString) {
		this.searchString = searchString;
		this.searchResults = this.getSearchResults();
	}

	/**
	 * Hide/unhide loader.
	 * @param value Use true to make loader visible. Use False to hide the loader.
	 */
	updateLoader(value: boolean) {
		this.resultLoading = value;
		if (value) {
			this.searchResults = undefined;
		}
	}

	/**
	 * Returns an Observable for search results received from data service.
	 */
	getSearchResults() {
		this.resultLoading = true;
		const results$ = this.dataService.fetchresults(this.searchString);
		return results$;
	}
}
