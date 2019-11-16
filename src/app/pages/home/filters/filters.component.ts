import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { availableFilters, availableSorts } from './available-options';
import { IFilter } from 'src/interfaces';
import { DataServiceService } from 'src/app/data-service.service';

/**
 * This component provides interface for changing the filter and sort options
 */
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

	filters: IFilter[] = [];

	constructor(private dataService: DataServiceService) {
		availableFilters.forEach((filter, i) => {
			this.filters[i] = {
				filtername: filter.id,
				min: null,
				max: null,
				type: filter.type
			};
		});
	}

	ngOnInit() {}

	/**
	 * Stores the filter and sort configuration in dataService
	 */
	saveFilters() {
		// convert date objects  to epoch time
		this.filters.forEach(filter => {
			if (filter.type === 'date') {
				if (filter.minDate) {
					filter.min = filter.minDate.getTime();
				}
				if (filter.maxDate) {
					filter.max = filter.maxDate.getTime();
				}
			}
		});

		this.dataService.setparams(this.sortBy, this.filters);

		this.toggleFilterEvent.emit();
	}
}
