import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/history.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
	history: string[];

	constructor(private historyService: HistoryService) {}

	ngOnInit() {
		this.history = this.historyService.getHistory();
	}
}
