export interface IFilterOption {
	displayName: string;
	id: string;
	type: 'number' | 'date' | 'boolean';
}

export interface IFilter {
	filtername: string;
	min: number;
	max: number;
}

export interface ISort {
	displayName: string;
	id: string;
}
