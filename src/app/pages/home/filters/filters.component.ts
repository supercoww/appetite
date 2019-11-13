import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { availableFilters, availableSorts } from './available-options';
@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
	@Output() toggleFilterEvent = new EventEmitter();

	availableSorts = availableSorts;
	availableFilters = availableFilters;
	sortBy: string;

	constructor() {}

	ngOnInit() {}

	saveFilters() {
		// TODO: Actually save filters
		this.toggleFilterEvent.emit();
	}
}
