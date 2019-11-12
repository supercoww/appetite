import { Injectable, Query } from '@angular/core';

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
	sitenames = ['stackoverflow','math','physics','askubuntu']
	availablefilters=['view_count','answer_count','score','activity','is_answered','creationdate']
	availablesorts=['activitydate','votes','view_count'];
	apiurl = "https://api.stackexchange.com/2.2/search/advanced?";
	defaultsort="view_count";
		query={};

	results = []
	filteredresults=[]
	

	constructor() {
	
		
	}
	utility(suf,i,query)
	{
		if(i>=this.sitenames.length)
		{
			this.filterresult(query);
			this.sortcombineresult(query);
			console.log(this.filteredresults);
			console.log(this.results);
			return;

		}
		fetch(suf+"&site="+this.sitenames[i]).then(response => response.json()).then(res => {
			this.results=this.results.concat(res.items);
			this.utility(suf,i+1,query);
			return;
		});
	}
	fetchresults(query) {
		
		//=this.http.get('?order=desc&sort=activity&q='+query);
		this.query=query;
		var suf=this.apiurl+this.parsequery(query);
		console.log(suf);
		this.utility(suf,0,query);
	

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
		if(!query.filters)
		{
			this.filteredresults=this.results;
			return;
		}
		else if(query.filters.length==0)
		{
			this.filteredresults=this.results;
			return;
		}
		this.results.forEach(ele=>
			{
					query.filters.forEach(element => {
					
						var name=element.filtername;
						console.log(name,ele.name);
						//console.log(element.filtername,element.min,element.max,ele.name);
						if(element.min)
						{
							if(ele[name]>= element.min)
							{
								if(element.max)
								{
									if(ele[name] <= element.max)
									{
										this.filteredresults.push(ele);
									}
								
								}
								else this.filteredresults.push(ele);
							}
						}


						else if(element.max)
						{
							if(ele[name] <= element.max)
							{
								
								this.filteredresults.push(ele);
							}
						}
						else this.filteredresults.push(ele);


					});
				});
				

	
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
		suf=suf+"&sort=relevance";
		return suf;

	}


	

}
