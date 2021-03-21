import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stream-school',
  templateUrl: './stream-school.component.html',
  styleUrls: ['./stream-school.component.css']
})
export class StreamSchoolComponent implements OnInit {
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'Stream', header: 'Stream' , widthstyle: ''},
      { field: 'Available (Yes = 1; No =2)', header: 'Available (Yes = 1; No =2)', widthstyle: ''},
    ];

  constructor(private router: Router, private reportsService: ReportsService) {
  }
  ngOnInit() {
  }

}
