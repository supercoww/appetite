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

	// TODO: replace demo results with actual
	getSearchResults() {
		this.dataService.fetchresults(this.searchString);
		return [
			{
				score: 10,
				answer_count: 5,
				view_count: 100,
				link:
					'https://stackoverflow.com/questions/56400290/white-screen-on-fresh-new-angular-8-electron-5-app',
				creation_date: 1573560621098,
				last_activity_date: 1573560621098,
				title: 'We want fridge',
				is_answered: true,
				owner: {
					display_name: 'spongebob',
					profile_image:
						'https://www.gravatar.com/avatar/6c8986ef36d3e6a1edcdaf6ecea15a6d?s=32&d=identicon&r=PG&f=1'
				}
			}
		];
	}
}
