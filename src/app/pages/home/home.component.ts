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

	constructor(private dataService: DataServiceService) {}

	ngOnInit() {}

	onSearch($event) {
		this.searchString = $event;
		this.searchResults = this.getSearchResults();
	}

	// TODO: pass filter and sort data
	getSearchResults() {
		return this.dataService.fetchresults(this.searchString);
	}
}
