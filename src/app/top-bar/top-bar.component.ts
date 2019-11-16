import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
	@Input() rightIcon;

	@Output() toggleFilterEvent = new EventEmitter();
	@Output() drawerEvent = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	/**
	 * Emits an event to toggle filter page as visible / not visible
	 */
	toggleFilters() {
		this.toggleFilterEvent.emit();
	}
}
