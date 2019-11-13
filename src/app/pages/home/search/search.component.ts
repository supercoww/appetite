
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import * as Tesseract from 'tesseract.js';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

import { CropperComponent } from 'angular-cropperjs';

interface IWindow extends Window {
	webkitSpeechRecognition: any;
}

const { webkitSpeechRecognition }: IWindow = (window as any) as IWindow;

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@ViewChild('searchInput', { static: true }) searchInput: MatInput;
	// tslint:disable-next-line: variable-name
	//imageChangedEvent: any = '';
	//croppedImage: any = '';
	public imgUrl:any='';
	public cropperHidden = true;

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
		this.cropperHidden=true;
		alert('imageupload');
		Tesseract.recognize(
			this.imgUrl,'eng',
			{ 
				logger: m => {
					//console.log(m);
					var progess=m['progress']*100 + "%";
					var currProcess = m['status'] ;
					// TODO :- progress bar using above vars instead of spinner
					console.log(currProcess,progess);
					this.searchString=currProcess +"   "+ progess;
				}
			}
		  ).then(({ data: { text } }) => {
			  var imgQuery = this.formatQuery(text);
			  this.searchString = imgQuery;
			  alert(imgQuery);
		  })
		}

		formatQuery(text)
		{
			return text.replace(/(\r\n|\n|\r)/gm," "); // replacing newlines with space
		}
		//////// Cropper code...
		@ViewChild('angularCropper',{static:true}) public angularCropper: CropperComponent;
		imgCrp = null;
		config = {
			dragMode : 'crop',
			autoCrop: false,
			background : true,
			movable: true,
			rotatable : true,
			scalable: true,
			zoomable: false,
			viewMode: 1,
			checkImageOrigin : true,
			cropmove:this.cropMoved.bind(this),
			checkCrossOrigin: true
		};
	
		previewURL: any;
		imgPreview() {
			this.cropperHidden = false;
			const fileUp = document.getElementById('realImageUpload') as HTMLInputElement;
			const fileOb = fileUp.files[0];
			if (fileUp.files.length === 0)
			return;

			var mimeType = fileOb.type;
			if (mimeType.match(/image\/*/) == null) {
				alert("Only images are supported.");
				return;
			}

			var reader = new FileReader();
			reader.readAsDataURL(fileOb); 
			reader.onload = (_event) => { 
				this.previewURL = reader.result; 
			}
		}

		cropMoved(data){
			this.imgUrl = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
		}
		crop(){
			this.imageUpload();
		}
		left(){
			this.angularCropper.cropper.rotate(-90);
		}
		right(){
			this.angularCropper.cropper.rotate(90);
		}
		flipH(){
			var val = this.angularCropper.cropper.getData().scaleX;
			this.angularCropper.cropper.scaleX(-val);
		}
		flipV(){
			var val = this.angularCropper.cropper.getData().scaleY;
			this.angularCropper.cropper.scaleY(-val);
		}
		/// previous cropper code...
/*
		@ViewChild('imageCropper',{ static: true })
		imageCropper: ImageCropperComponent;

		fileChangeEvent(event: any): void {
			this.imageChangedEvent = event;
			this.cropperHidden=false;
			console.log("filechangeeevtn");
		}
		imageCropped(event: ImageCroppedEvent) {
			this.croppedImage = event.base64;
			this.imgUrl = this.croppedImage; // passing to recognise 
			//console.log(this.imgUrl);
		}
		crop()
		{
			this.imageUpload();
		}
		left()
		{
			this.imageCropper.rotateLeft();
		}
		right()
		{
			this.imageCropper.rotateRight();
		}
		flip()
		{
			this.imageCropper.flipHorizontal();
		}
		*/
}
