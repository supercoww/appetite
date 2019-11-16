import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/history.service';

/**
 * Component for displaying user history
 */
@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	history: string[];

	constructor(private historyService: HistoryService) {}

	/**
	 * Initialize the history array. It takes data from the history service.
	 */
	ngOnInit() {
		this.history = this.historyService.getHistory();
	}
}
