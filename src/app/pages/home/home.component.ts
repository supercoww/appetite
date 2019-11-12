import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	searchString: string;
	searchResults;

	constructor() {}

	ngOnInit() {}

	onSearch($event) {
		this.searchString = $event;
		this.searchResults = this.getSearchResults(this.searchString);
	}

	// TODO: replace demo results with actual
	getSearchResults(searchString: string): any[] {
		return [
			{ que: 'Question', ans: 'Answer' },
			{ que: 'Question', ans: 'Answer' },
			{ que: 'Question', ans: 'Answer' }
		];
	}
}
