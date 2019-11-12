import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { createWorker } from 'tesseract.js';

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
		var fileUp = document.getElementById("realImageUpload");
		console.log(fileUp.files);
		var fileOb = fileUp.files;

		const worker = createWorker({
			logger: m => console.log(m), // Add logger here
		  });
		  
		  (async () => {
				await worker.load();
				await worker.loadLanguage('eng+chi_tra');
				await worker.initialize('eng+chi_tra');
				
				const { data: { text } } = await worker.recognize(fileOb[0]);

				// TODO :- SPINNER 
				var imgText=this.formatQuery(text)
				console.log(imgText);
				this.searchString=imgText;
				await worker.terminate();
		  })();
		}

		formatQuery(text)
		{
			return text.replace(/(\r\n|\n|\r)/gm," "); // replacing newlines with space
		}
}
