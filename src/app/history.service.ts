import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private history: string[];

	constructor() {
		this.history = JSON.parse(localStorage.getItem('history')) || [];
	}

	getHistory(): string[] {
		return this.history;
	}

	addHistory(entry: string) {
		this.history.push(entry);
		localStorage.setItem('history', JSON.stringify(this.history));
	}
}
