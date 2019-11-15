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

	toggleFilters() {
		this.toggleFilterEvent.emit();
	}
}
