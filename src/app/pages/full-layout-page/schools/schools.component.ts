import { Component, OnInit } from '@angular/core';
import { schoolsService } from './schools.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  dataHeader : Array<Object> = [];
  selectedColumns : Array<Object> = [];
  schoolList :Array<Object> = [];
  schoolId: number;
  schoolDetails:Array<Object> = [];
  constructor(private schoolService:schoolsService,
    private userSessionService : UserSessionService) {
    this.schoolId = this.userSessionService.schoolId();
   }

  ngOnInit() {
    this.sampleData();
  }

  sampleData() {
  this.dataHeader = [
    {field: 'form_name', header: 'Form Name' },
    { field: 'form_status', header: 'Form Status' },
    { field: 'last_modified', header: 'Last Modified By' },
    { field: 'last_updated', header: 'Last Updated On'},
];
this.selectedColumns = this.dataHeader; 
this.schoolList = [  { "form_name": "Basic Details", "form_status": "Not Started", "last_modified": "33020801618", "last_updated": "22/10/2019" },
{ "form_name": "School Details", "form_status": "Completed", "last_modified": "-", "last_updated": "-" },
{ "form_name": "Training Details", "form_status": "Not Started", "last_modified": "-", "last_updated": "-" },
{ "form_name": "Committee Details", "form_status": "Not Started", "last_modified": "-", "last_updated": "-" }
]}
}
