import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slasstudentschoolwise',
  templateUrl: './slasstudentschoolwise.component.html',
  styleUrls: ['./slasstudentschoolwise.component.scss']
})
export class SlasstudentschoolwiseComponent implements OnInit {
  schlhead: { field: string; header: string; }[];
  schlbody: { field: string; header: string; }[];
  schliststudDetail: any;
  schliststud: any;

  constructor(private routers : Router) { 
    this.schliststud = this.routers.getCurrentNavigation().extras;
console.log( this.schliststud);
  }

  ngOnInit() {
    this.slasstudentschl();
    this.schliststudDetail = this.schliststud;
  }
  slasstudentschl(){
    this.schlhead = [
      { field: '0 Marks', header: '0 Marks' },
      { field: '1-3 Marks', header: '1-3 Marks' },
      { field: '4-6 Marks', header: '4-6 Marks' },
      { field: '7-9 Marks', header: '7-9 Marks' },
      { field: '10-12 Marks', header: '10-12 Marks' },
  ];
  this.schlbody = [
    { field: 'school_name', header: 'School' },
    { field: 'total', header: 'Total Students' },
    { field: 'p0', header: '#' },
    { field: 'per0', header: '%' },
    { field: 'p1', header: '#' },
    { field: 'per1', header: '%' },
    { field: 'p2', header: '#' },
    { field: 'per2', header: '%' },
    { field: 'p3', header: '#' },
    { field: 'per3', header: '%' },
    { field: 'p4', header: '#' },
    { field: 'per4', header: '%' },
];
  }

}
