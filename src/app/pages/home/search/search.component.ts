import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { createWorker } from 'tesseract.js';

interface IWindow extends Window {
	webkitSpeechRecognition: any;
}

const { webkitSpeechRecognition }: IWindow = window as IWindow;

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@ViewChild('searchInput', { static: true }) searchInput: MatInput;
	// tslint:disable-next-line: variable-name
	private _searchString = '';
	public get searchString() {
		return this._searchString;
	}
	public set searchString(value) {
		this._searchString = value;
		this.searchInput.focus();
		console.log('focused');
	}

	speechRecognition: SpeechRecognition;

	constructor() {
		this.speechRecognition = new webkitSpeechRecognition();
		this.speechRecognition.interimResults = true;

		this.speechRecognition.onstart = _ => console.log('started listening');
		this.speechRecognition.onend = _ => console.log('stopped listening');

		this.speechRecognition.onresult = event => {
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					this.searchString += event.results[i][0].transcript;
				}
			}
		};

		this.speechRecognition.lang = 'en-US';
	}

	@Output() searchEvent = new EventEmitter<string>();

	ngOnInit() {}

	triggerSearch() {
		this.searchEvent.emit(this.searchString);
	}

	clickRealImgBtn() {
		document.getElementById('realImageUpload').click();
	}

	imageUpload() {
		console.log('imageupload');
		var fileUp = <HTMLInputElement>document.getElementById('realImageUpload');
		console.log(fileUp.files);
		var fileOb = fileUp.files[0];

		const worker = createWorker({
			logger: m => console.log(m) // Add logger here
		});

		(async () => {
			await worker.load();
			await worker.loadLanguage('eng+chi_tra');
			await worker.initialize('eng+chi_tra');

			const {
				data: { text }
			} = await worker.recognize(fileOb);

			// TODO :- SPINNER
			var imgText = this.formatQuery(text);
			console.log(imgText);
			this.searchString = imgText;
			await worker.terminate();
		})();
	}

	formatQuery(text) {
		return text.replace(/(\r\n|\n|\r)/gm, ' '); // replacing newlines with space
	}
}
