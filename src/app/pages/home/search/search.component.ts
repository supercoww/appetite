import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import 'firebase/storage';
import 'firebase/app';
import { HistoryService } from 'src/app/history.service';
import imageCompression from 'browser-image-compression';
import { MatSnackBar } from '@angular/material';

interface IWindow extends Window {
	webkitSpeechRecognition: any;
}

const { webkitSpeechRecognition }: IWindow = (window as any) as IWindow;

/**
 * Provides search UI with voice, text and image input
 */
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	compress = true;
	minsizetocompress = 1000000;
	storage = null;
	firebase = require('firebase/app');
	apiurl = 'https://protected-mesa-37941.herokuapp.com/?url=';
	@ViewChild('searchInput', { static: true }) searchInput: MatInput;
	// tslint:disable-next-line: variable-name
	public imgUrl: any = '';
	public cropperHidden = true;

	@Output() loaderEvent: EventEmitter<boolean> = new EventEmitter();

	private _searchString = '';
	voiceButtonColor = '';
	public get searchString() {
		return this._searchString;
	}
	public set searchString(value) {
		this._searchString = value;
		this.searchInput.focus();
		//console.log('focused');
	}

	speechRecognition: SpeechRecognition;

	constructor(
		private ref: ChangeDetectorRef,
		private historyService: HistoryService,
		private snackbar: MatSnackBar
	) {
		this.speechRecognition = new webkitSpeechRecognition();
		this.speechRecognition.interimResults = true;

		this.speechRecognition.onstart = event => {
			//console.log('start');
		};
		this.speechRecognition.onend = event => {
			//console.log('end');
			this.stopListening();
		};

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

	ngOnInit() {
		var config = {
			apiKey: 'AIzaSyBd6vTCGgYOg9jjBJ7gV4X-4XA7p8crWUg',
			authDomain: 'stacksearch-4646c.firebaseapp.com',
			databaseURL: 'https://stacksearch-4646c.firebaseio.com',
			projectId: 'stacksearch-4646c',
			storageBucket: 'stacksearch-4646c.appspot.com',
			messagingSenderId: '845252858351',
			appId: '1:845252858351:web:dd36c674d91bc093a1261a'
		};
		this.firebase.initializeApp(config);
		this.storage = this.firebase.storage();
	}

	/**
	 * Emit event for search and add string to history.
	 */
	triggerSearch() {
		this.searchEvent.emit(this.searchString);
		this.historyService.addHistory(this.searchString);
	}

	/**
	 * Start listening to voice input
	 */
	startListening() {
		this.speechRecognition.start();
		this.voiceButtonColor = 'accent';
	}

	/**
	 * Stop listening to voice input
	 */
	stopListening() {
		this.voiceButtonColor = '';
		this.ref.detectChanges();
	}
	/**
	 * This method triggers the click for hidden image upload input field
	 */
	clickRealImgBtn() {
		document.getElementById('realImageUpload').click();
		this.loaderEvent.emit(true);
	}
	/**
	 * This method formats the recognized text to replace new lines with spaces
	 * @param text the recognized text output from the image
	 */
	formatQuery(text) {
		return text.replace(/(\r\n|\n|\r)/gm, ' '); // replacing newlines with space
	}
	/**
	 * Runs checks on the image uploaded.
	 */
	imgPreview() {
		this.cropperHidden = false;
		const fileUp = document.getElementById('realImageUpload') as HTMLInputElement;
		const fileOb = fileUp.files[0];
		//console.log(fileOb);
		if (fileUp.files.length === 0) return;

		var mimeType = fileOb.type; // only images checks..
		if (mimeType.match(/image\/*/) == null) {
			this.showError('Only images are supported');
			return;
		}

		var need = true;
		if (fileOb.size < this.minsizetocompress) need = false;
		//console.log('processing');
		this.compressimg(fileOb, need);
	}

	/**
	 * Processes the image and binds the recognized text with the Search string
	 * @param img Image file to be processed
	 */
	processimg(img) {
		if (img.size > 5000000) {
			this.showError('File too large');
			return;
		}

		var apiurl = this.apiurl;
		var self = this;
		this.storage
			.ref('images')
			.put(img)
			.then(fileSnapshot => {
				// 3 - Generate a public URL for the file.
				return fileSnapshot.ref
					.getDownloadURL()
					.then(url => {
						//console.log(url);
						//console.log('upload-complete');
						//console.log('now recognizing');
						fetch(apiurl + url)
							.then(response => response.json())
							.then(response => {
								//console.log(response);
								//console.log('well done');
								this.loaderEvent.emit(false);
								if (response.status == 1) {
									self.searchString = self.formatQuery(response.text);
								} else {
									this.showError('Could not recognize text');
								}
							});
					})
					.catch(error => this.showError('Error uploading image'));
				// 4 - Update the chat message placeholder with the image’s URL.

				// $('#summe
			})
			.catch(error => this.showError('Error uploading image'));
	}
	/**
	 * Compressed the image if needed and calls the processimg function for recognizing text
	 * @param {File} img Image file to be compressed
	 * @param {boolean} need Do we need to compress the image ,true or false
	 */
	compressimg(img, need) {
		if (this.compress == false || need == false) {
			this.processimg(img);
			return;
		}

		var imageFile = img;
		//console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
		//console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

		var options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		};
		var self = this;
		imageCompression(imageFile, options).then(function(compressedFile) {
			//console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
			//console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
			self.processimg(compressedFile);
		});
	}

	/**
	 * Display a error message in snackbar. Also hides the loader if visible
	 * @param message Message to be displayed
	 */
	showError(message: string) {
		this.snackbar.open(message, '', { duration: 2000 });
		this.loaderEvent.emit(false);
	}
}
