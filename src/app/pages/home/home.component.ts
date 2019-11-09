import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	searchString;

	constructor() {}

	ngOnInit() {}

	onSearch($event) {
		this.searchString = $event;
		console.log(this.searchString);
	}
}
