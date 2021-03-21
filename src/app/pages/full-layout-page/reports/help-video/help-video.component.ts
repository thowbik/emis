import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-video',
  templateUrl: './help-video.component.html',
  styleUrls: ['./help-video.component.css']
})
export class HelpVideoComponent implements OnInit {
  netImage: any = '../assets';
  images: any[] = [];
  constructor() { }
  displayDialog: boolean;
  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.images = [
      {img: 'precaution1'},
      {img: 'precaution2'},
      {img: 'precaution3'},
      {img: 'precaution4'},
    ];
    this.displayDialog = true;
  }
}
