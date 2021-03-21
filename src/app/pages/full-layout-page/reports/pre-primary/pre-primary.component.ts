import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';

interface School {
  name: string;
  value: string;
}

@Component({
  selector: 'app-pre-primary',
  templateUrl: './pre-primary.component.html',
  styleUrls: ['./pre-primary.component.css']
})
export class PrePrimaryComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  MarkSheet: School[];
  MarkSheetIndicators: School[];
  EnrollmentChildrenDetails: School[];
  public Blocklist: any;

  constructor(private router: Router, private reportsService: ReportsService) {
    this.Blocklist = this.router.getCurrentNavigation().extras;
    this.MarkSheet = [
      {name: 'Trem - 1', value: '1'},
      {name: 'Trem - 2', value: '2'},
      {name: 'Trem - 3', value: '3'}
    ];
    this.MarkSheetIndicators = [
      {name: 'Passed Students', value: '1'},
      {name: 'Maximum Obtained', value: '2'},
      {name: 'Average of Passed', value: '3'},
      {name: 'Distinction', value: '4'},
      {name: 'Centum', value: '5'},
      {name: 'Inclusiveness', value: '6'},
      {name: 'Bunch(35-40%)', value: '7'},
      {name: 'Below20%', value: '8'},
      {name: 'District Avg', value: '9'}
    ];
  }

}
