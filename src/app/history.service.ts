import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private history: string[];
	private history$: Observable<string[]>;

	constructor() {
		this.history = JSON.parse(localStorage.getItem('history')) || [];
	}

	getHistory(): string[] {
		return this.history;
	}

	addHistory(entry: string) {
		this.history.unshift(entry);
		localStorage.setItem('history', JSON.stringify(this.history));
	}
}
