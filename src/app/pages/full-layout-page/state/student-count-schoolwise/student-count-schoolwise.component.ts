import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-count-schoolwise',
  templateUrl: './student-count-schoolwise.component.html',
  styleUrls: ['./student-count-schoolwise.component.scss']
})
export class StudentCountSchoolwiseComponent implements OnInit {
  public studentsList : any; 
  studentDetail : any[] = [];

  
  constructor(private router: Router, private routers : Router,) {
    this.studentsList = this.router.getCurrentNavigation().extras;
   }
  cols: Array<{'field':string,'header':string,'widthstyle':string}> = 
  [
    { field: 'district_name', header: 'School',widthstyle: '11em'},
    { field: 'Prkg', header: 'Pre-Kg',widthstyle: '8em'},
    { field: 'LKG', header: 'LKG' ,widthstyle: '7em'},
    { field: 'UKG', header: 'UKG',widthstyle: '7em' },
    { field: 'class_1', header: 'I',widthstyle: '7em' },
    { field: 'class_2', header: 'II',widthstyle: '7em' },
    { field: 'class_3', header: 'III',widthstyle: '7em' },
    { field: 'class_4', header: 'IV',widthstyle: '7em' },
    { field: 'class_5', header: 'V',widthstyle: '7em' },
    { field: 'class_6', header: 'VI',widthstyle: '7em' },
    { field: 'class_7', header: 'VII',widthstyle: '7em' },
    { field: 'class_8', header: 'VIII',widthstyle: '7em' },
    { field: 'class_9', header: 'IX',widthstyle: '7em' },
    { field: 'class_10', header: 'X',widthstyle: '7em' },
    { field: 'class_11', header: 'XI',widthstyle: '7em' },
    { field: 'class_12', header: 'XII',widthstyle: '7em' },
    { field: 'total', header: 'TOTAL',widthstyle: '7em' },
  ];

  ngOnInit() {
  }

}
