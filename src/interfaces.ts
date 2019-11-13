export interface IFilter {
	displayName: string;
	id: string;
	type: 'number' | 'date' | 'boolean';
}

export interface ISort {
	displayName: string;
	id: string;
}
