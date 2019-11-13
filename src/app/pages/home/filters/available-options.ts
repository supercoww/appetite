import { IFilter, ISort } from 'src/interfaces';

export const availableFilters: IFilter[] = [
	{
		displayName: 'Views',
		id: 'view_count',
		type: 'number'
	},
	{
		displayName: 'Answers',
		id: 'answer_count',
		type: 'number'
	},
	{
		displayName: 'Upvote Count',
		id: 'score',
		type: 'number'
	},
	{
		displayName: 'Answered',
		id: 'is_answered',
		type: 'boolean'
	},
	{
		displayName: 'Last Activity Date',
		id: 'activity',
		type: 'date'
	},
	{
		displayName: 'Creation Date',
		id: 'creationdate',
		type: 'date'
	}
];

export const availableSorts: ISort[] = [
	{
		displayName: 'Activity Date',
		id: 'activitydate'
	},
	{
		displayName: 'Upvote Count',
		id: 'votes'
	},
	{
		displayName: 'Views',
		id: 'view_count'
	}
];
