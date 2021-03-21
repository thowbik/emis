import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
@Component({
  selector: 'app-teachers-class-taught',
  templateUrl: './teachers-class-taught.component.html',
  styleUrls: ['./teachers-class-taught.component.css']
})
export class TeachersClassTaughtComponent implements OnInit {
  col: any;
  cities:any;
  public fileUrl;
  TeachersReport: any[] = [];
  school_type:any;
  appoinment:any;
  report_value:any;
  appoint_nature_get_value:any;
  school_type_get_val:any;
  arrString:any;
  date =  new Date();
  constructor(private ReportsService:ReportsService ) { }
  cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: '#', header: '#',widthstyle: '0.3em'},
  { field: 'Name of the Report', header: 'Name of the Report',widthstyle: '4em'},
  { field: 'Description', header: 'Description',widthstyle: '6em'},
  { field: 'Updated', header: 'Updated',widthstyle: '2em'},
  { field: 'Download', header: 'Download',widthstyle: '3em'},
  ];
  ngOnInit() {
   this.arrString =1,2,3,6,90;
    this.appoinment = [
      {label: 'Select Nature of Appointment', value: '0'},
      {label: 'Regular', value: '1'},
      {label: 'Contract', value: '2'},
      {label: 'Part Time', value: '3'}
      ];
      this.school_type = [
        {label: 'Select School Type', value: '0'},
        {label: 'Government', value: '1,2,3,6,90'},
        {label: 'Aided', value: '4'},
        {label: 'Government and Aided', value: '1,2,3,4,6,90'},
        {label: 'Others', value: '5,8,90,92,94,95'}
        ];
        this.ReportsService.SearchTeacherClassTaught(1,this.arrString).subscribe((res) => {
          if (res.dataStatus == true) 
          {
           this.TeachersReport = res.data;
          }
        });
    
  }
  nature_of_post(event)
  {
    this.appoint_nature_get_value = event.value;
    
  }
  school_type_val(event)
  {
    this.school_type_get_val = event.value;
    
  }
  SearchData()
  {
    this.ReportsService.SearchTeacherClassTaught(this.appoint_nature_get_value,this.school_type_get_val).subscribe((res) => {
      if (res.dataStatus == true) 
      {
       this.TeachersReport = res.data;
      }
    });
  }

}
