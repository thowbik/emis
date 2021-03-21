import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-summary',
  templateUrl: './student-summary.component.html',
  styleUrls: ['./student-summary.component.css']
})
export class StudentSummaryComponent implements OnInit {
  dataHeader : Array<Object> = [];
  selectedColumns : Array<Object> = [];
  studentList : Array<Object> = [];
  constructor() { }

  ngOnInit() {
    this.sampleData();
  }
  sampleData() {
  this.dataHeader = [
    {field: 'class', header: 'Unique Id' },
    { field: 'section', header: 'Name in Tamil' },
    { field: 'medium', header: 'Name in English' },
    { field: 'boys', header: 'Class'},
    { field: 'girls', header: 'Section' },
];
this.selectedColumns = this.dataHeader;
this.studentList = [
  { "class": "VI", "section": "A", "medium": "English", "boys": "10" , "girls" : "19", "Total" :"29"}, 
  { "class": "I", "section": "B", "medium": "Tamil", "boys": "19" , "girls" : "19", "Total" :"38"}, 
  { "class": "VII", "section": "A", "medium": "English", "boys": "19" , "girls" : "10", "Total" :"29"}, 
  { "class": "VI", "section": "C", "medium": "English", "boys": "20" , "girls" : "19", "Total" :"39"}, 
]
}
}
