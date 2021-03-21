import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-co-scholastic',
  templateUrl: './co-scholastic.component.html',
  styleUrls: ['./co-scholastic.component.css']
})
export class CoScholasticComponent implements OnInit {
  cities : Array<Object> = [];
  dataHeader  : Array<Object> = [];
  selectedColumns : Array<Object> = [];
  dataList: Array<Object> = [];
  constructor() { }

  ngOnInit() {
    this.sampleData();
  }
  sampleData()
  {
    this.cities = [
      {label:'Select City', value:null},
      {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
      {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
  ];
  this.dataHeader = [
    {field: 'aadhaar_uid_number', header: 'Whether Assessed?' },
    { field: 'name_tamil', header: 'Student Name' },
    { field: 'name', header: 'Section' },
    { field: 'class_studying_id', header: 'FA(A) ACTIVITY'},
    { field: 'class_section', header: 'FA(B) ACTIVITY' },
    { field: 'father_name', header: 'FA (Out Of 40)' },
    { field: 'mother_name', header: 'SA (Out Of 60)' },
  ];
  this.dataList = [
    { "assessed ": "Yes", "student_name": "Ram", "physical_education": "Yes", "life_Skill": "Yes" },
    { "assessed ": "Yes", "student_name": "Selva", "physical_education": "Yes", "life_Skill": "Yes" },
    { "assessed ": "Yes", "student_name": "Ganesh", "physical_education": "Yes", "life_Skill": "Yes" },
    
   ];
  this.selectedColumns = this.dataHeader;
  }
  submit(event)
  {
    
  }
}
