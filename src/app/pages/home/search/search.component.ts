import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	searchString = '';

	constructor() {}

	@Output() searchEvent = new EventEmitter<string>();

	ngOnInit() {}

	triggerSearch() {
		this.searchEvent.emit(this.searchString);
	}

	clickRealImgBtn(){
		document.getElementById("realImageUpload").click();	
	}

	imageUpload(){
		console.log("imageupload");
		var fileUp = <HTMLInputElement>(document.getElementById("realImageUpload"));
		console.log(fileUp.files);
		var fileOb = fileUp.files[0];

		Tesseract.recognize(
			fileOb,'eng',
			{ 
				logger: m => {
					console.log(m);
					var progess=m['progress']*100 + "%";
					var currProcess = m['status'] ;
					// TODO :- progress bar using above vars instead of spinner
					console.log(currProcess,progess);
				}
			}
		  ).then(({ data: { text } }) => {
			  var imgQuery = this.formatQuery(text);
			  this.searchString = imgQuery;
			  console.log(imgQuery);
		  })
		}

		formatQuery(text)
		{
			return text.replace(/(\r\n|\n|\r)/gm," "); // replacing newlines with space
		}
}
