import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { availableFilters, availableSorts } from './available-options';
@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
	availableSorts = availableSorts;
	availableFilters = availableFilters;
	sortBy: string;

	constructor() {}

	ngOnInit() {}
}
