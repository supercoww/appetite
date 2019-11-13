import { Injectable } from '@angular/core';
import { forkJoin, VirtualTimeScheduler } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { checkServerIdentity } from 'tls';

class Query {
	text;
	sort;
	filters;

	constructor(text, sort, filters) {
		this.text = text;
		if (sort != null) this.sort = sort;
		if (filters != null) this.filters = filters;
	}
}

@Injectable({
	providedIn: 'root'
})
export class DataServiceService {
	/*
		Prototype for Query Object
		{
			text : //Search text
			sort : //Enter the field you want to sort by  (not compulsory)
			filters:
			[
				{
					filtername:
					min:
					max:
				}
			]
		}
*/

	//Configuration
	key = 'tOO5hgmFwGE*fxvgJn8U8A((';
	sitenames = ['stackoverflow', 'math', 'physics', 'askubuntu'];
	availablefilters = ['view_count', 'answer_count', 'score', 'activity', 'is_answered', 'creationdate'];
	availablesorts = ['activitydate', 'votes', 'view_count'];
	apiurl = 'https://api.stackexchange.com/2.2/search/advanced?key=' + this.key;
	defaultsort = 'view_count';
	query = {};
	results = [];
	filteredresults = [];
	filters = null;
	sort = null;

	constructor(private http: HttpClient) {}

	setparams(sort = null, filters = null) {
		this.sort = sort;
		this.filters = filters;
	}

	fetchresults(text) {
		var query = new Query(text, this.sort, this.filters);
		//=this.http.get('?order=desc&sort=activity&q='+query);
		var suf = this.apiurl + this.parsequery(query);
		var responses = [];
		this.sitenames.forEach(name => {
			let r = this.http.get(suf + '&site=' + name);
			responses.push(r);
		});
		var results = forkJoin(responses).pipe(
			map(res => {
				var combinearray = [];

				res.forEach(ele => {
					ele.items.forEach(v => combinearray.push(v));
					//var elem=this.filterresult(ele.items,query);
					//var elem=this.sortcombineresult(elem.items,query);
				});
				combinearray = this.filterresult(combinearray, query);
				combinearray = this.sortcombineresult(combinearray, query);

				return combinearray;
			})
		);

		return results;
	}
	filterresult(results, query) {
		var filteredresults = [];
		if (!query.filters) {
			filteredresults = results;
			return filteredresults;
		} else if (query.filters.length == 0) {
			filteredresults = results;
			return filteredresults;
		}
		results.forEach(ele => {
			if (this.check(ele, query.filters) == true) {
				filteredresults.push(ele);
			}
		});
		return filteredresults;
	}
	sortcombineresult(results, query) {
		var sortval;
		if (query.sort) {
			sortval = query.sort;
		} else {
			sortval = this.defaultsort;
		}
		results.sort(function(a, b) {
			if (a[sortval] > b[sortval]) {
				return -1;
			} else if (a[sortval] < b[sortval]) {
				return 1;
			} else {
				return 0; //If equal then no swapping i.e More relevant ans will stay at the top
			}
		});
		return results;
	}

	parsequery(query) {
		var suf = '&q=' + query.text;
		suf = suf + '&sort=relevance';
		return suf;
	}

	check(ele, filters) {
		var flag = true;
		for (var i = 0; i < filters.length; i++) {
			var element = filters[i];

			var name = element.filtername;
			console.log(name, ele[name]);
			console.log(element.min, element.max);
			//console.log(element.filtername,element.min,element.max,ele.name);
			if (element.min) {
				if (ele[name] >= element.min) {
					if (element.max) {
						if (ele[name] > element.max) {
							return false;
						}
					}
				} else return false;
			} else if (element.max) {
				if (ele[name] > element.max) {
					return false;
				}
			}
		}

		return flag;
	}
}
