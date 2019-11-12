import { Injectable, Query } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
	sitenames = ['stackoverflow','math',]
	availablefilters=['view_count','answer_count','score','activity','is_answered','creationdate']
	availablesorts=['activitydate','votes','view_count'];
	apiurl = "https://api.stackexchange.com/2.2/search/advanced?";
	defaultsort="view_count";


	results = []
	filteredresults=[]
	

	constructor(private http: HttpClient) {
	
		
	}


	fetchresults(query) {
		
		//=this.http.get('?order=desc&sort=activity&q='+query);
		var suf=this.apiurl+this.parsequery;
		console.log(suf);
		this.sitenames.forEach(site=>{
			fetch(suf+"&site="+site).then(response => response.json()).then(res => {
				this.results=this.results.concat(res.items);
			});
		}

		);
	this.filterresult(query);
	this.sortcombineresult(query);

	}
	
/*
	filterresult(query)
	{
		if(query.filters)
		{
			query.filters.forEach(element => {
				element.
				
			});
		}
	}
	*/
	filterresult(query)
	{
		this.results.forEach(ele=>
			{
				query.filters.forEach(element => {
					var name=element.name;
					if(element.min)
					{
						if(ele.name >= element.min)
						{
							if(element.max)
							{
								if(ele.name <= element.max)
								{
									this.filteredresults.push(ele);
								}
							
							}
							else this.filteredresults.push(ele);
						}
					}


					else if(element.max)
					{
						if(ele.name <= element.max)
						{
							
							this.filteredresults.push(ele);
						}
					}











				});
			})
	}
	sortcombineresult(query)
	{
		var sortval;
		if(query.sort)
		{
			sortval=query.sort;
		}
		else
		{
			sortval=this.defaultsort;
		}
		this.filteredresults.sort( function(a,b)
		{
				if(a.sortval > b.sortval)
				{
					return -1;
				}
				else if(a.sortval < b.sortval)
				{
					return 1;
				}
				else
				{
					return 0;								//If equal then no swapping i.e More relevant ans will stay at the top
				}
		}
		);
	}

	parsequery(query)
	{
		var suf="q="+query.text;
		suf=suf+"&sort="+this.defaultsort;
		return suf;

	}


	

}
