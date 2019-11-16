import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service for writing and reading search history. It uses `window.localstorage` for storing data.
 */
@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private history: string[];
	private history$: Observable<string[]>;

	constructor() {
		this.history = JSON.parse(localStorage.getItem('history')) || [];
	}

	/**
	 * Returns the user search history
	 */
	getHistory(): string[] {
		return this.history;
	}

	/**
	 * Adds single new entry to history
	 * @param entry new value to be added in history
	 */
	addHistory(entry: string) {
		this.history.unshift(entry);
		localStorage.setItem('history', JSON.stringify(this.history));
	}
}
