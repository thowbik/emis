import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.css']
})
export class ProjectReportComponent implements OnInit {
  details_of_resource: FormGroup ;
  resource: { label: string; value: number; }[];
  allprojectlist: any;
  noDataFound: boolean ;
  activitywisereports: any;
  noDataFound1: boolean ;
  resourceOptions: any [] = [];
  resource_detail_list: any [] = [];
  noDataFound2: boolean;
  usertypeid: number;
  usertype20: boolean = false ;
  usertype21: boolean = false ;
  username: any;
  noDataFound3: boolean;
  ymd: string;
  userid: any;
  resource_id: any;

  constructor(public timesheetService : TimesheetService, public Usersession :UserSessionService, private fb: FormBuilder) {
    this.usertypeid=this.Usersession.userTypeId();
    this.username=this.Usersession.userName();
    this.userid=this.Usersession.userId();

   }
  cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'block_name', header: 'Reference ID',widthstyle: '12em'},
  { field: 'udise_code', header: 'Application',widthstyle: '10em'},
  { field: 'schoolName', header: 'Title',widthstyle: '12em'},
  { field: 'schoolType', header: 'Start Date',widthstyle: '10em'},
  { field: 'Prkg', header: 'Target Comppletion Date',widthstyle: '18em'},
  { field: 'LKG', header: 'Actual  Comppletion Date' ,widthstyle: '18em'},
  { field: 'UKG', header: 'Man Hours',widthstyle: '10em' },
  { field: 'class_1', header: 'Status',widthstyle: '10em' },
  // { field: 'class_1', header: 'Time Status',widthstyle: '10em' },
  { field: 'class_1', header: 'Link ',widthstyle: '17em' },
  ];

  cols2 : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'block_name', header: 'Date',widthstyle: '12em'},
  { field: 'udise_code', header: 'Project',widthstyle: '10em'},
  { field: 'schoolName', header: 'Activity',widthstyle: '12em'},
  { field: 'schoolType', header: 'Hours',widthstyle: '10em'},
  ];

  cols1 : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'block_name', header: 'Module Name',widthstyle: '12em'},
  { field: 'udise_code', header: 'API Development',widthstyle: '13em'},
  { field: 'schoolName', header: 'Automation of Reports',widthstyle: '16em'},
  { field: 'schoolType', header: 'Bug Fixing',widthstyle: '10em'},
  { field: 'Prkg', header: 'Data Validation',widthstyle: '15em'},
  { field: 'LKG', header: 'Database Maintenance' ,widthstyle: '17em'},
  { field: 'UKG', header: 'Front End Design',widthstyle: '14em' },
  { field: 'class_1', header: 'Integration of API & Front End Design',widthstyle: '24em' },
  { field: 'class_1', header: 'Meeting',widthstyle: '10em' },
  { field: 'class_1', header: 'Report Generation ',widthstyle: '15em' },
  { field: 'class_1', header: 'Self Learning / Training',widthstyle: '18em' },
  { field: 'class_1', header: 'Server Management',widthstyle: '15em' },
  { field: 'class_1', header: 'Testing',widthstyle: '10em' },
  { field: 'Leaves', header: 'Leaves',widthstyle: '10em' },
  { field: 'class_1', header: 'Grand Total',widthstyle: '10em' },
  ];

  ngOnInit() {
    this.details_of_resource = this.fb.group({
      'from_date' : new FormControl('',null),
      'to_date' : new FormControl('',null),
      'resource_name' : new FormControl('',null),
      'resource_name_user' : new FormControl(this.username,null),
      'resource_id' : new FormControl(this.userid,null),
      });
    if(this.usertypeid == 20) {
      this.usertype20 = true;
      this.allprojectsummery();
      this.activitywisereport();
      this.dropdown_resource_admin();    
      this.onload_datewisereport_admin();
    }
    else if (this.usertypeid == 21){ 
      this.usertype21 = true;
      this.activitywisereport();
      this.onloaddatewisereport_user();
    }
  }

  dropdown_resource_admin(){
  this.timesheetService.resourcenameAPI().subscribe((res) => {
    let resourcename= res.data;
    // dropdown resource 
    if(resourcename.length>0){
      for(let i=0; i<resourcename.length;i++){
        this.resourceOptions.push({ value: resourcename[i].resource_id, label: resourcename[i].resource_name })
      }
    }
    else
    {
      this.resourceOptions.push({ value: "", label: "No Data" })
    }
  })
}

onload_datewisereport_admin(){
  // let name_resource = event.value ,
  var today = new Date();
   let year = today.getFullYear().toString() ,
       month = today.getMonth().toString(),
       date = today.getDate().toString();
    var ym = year.concat("-",month);
    this.ymd =ym.concat("-",date);

     let from_date ="2020-03-01",
      to_date = this.ymd,
      resource_name = "2003";
      this.timesheetService.selectedresourceAPI(from_date , to_date ,resource_name).subscribe((res) => {
        console.log('res omn', res.data);
        if(res.data.length>0){
          this.resource_detail_list = res.data;
        }
        else {
          this.noDataFound2 = true;
        }
      })
}

onloaddatewisereport_user(){
    // let name_resource = event.value ,
    var today = new Date();
     let year = today.getFullYear().toString() ,
         month = today.getMonth().toString(),
         date = today.getDate().toString();
      var ym = year.concat("-",month);
      this.ymd =ym.concat("-",date);

       let from_date ="2020-03-01",
        to_date = this.ymd,
        resource_name = this.userid ;
        this.timesheetService.selectedresourceAPI(from_date , to_date ,resource_name).subscribe((res) => {
          console.log('res omn', res.data);
          if(res.data.length>0){
            this.resource_detail_list = res.data;
          }
          else {
            this.noDataFound2 = true;
          }
        })
  }

  user_search(){
    // let name_resource = event.value ,
     let from_date =this.details_of_resource.value.from_date,
        to_date =this.details_of_resource.value.to_date,
        resource_name = this.details_of_resource.value.resource_id ;
        this.timesheetService.selectedresourceAPI(from_date , to_date ,resource_name).subscribe((res) => {
          console.log('res omn', res.data);
          if(res.data.length>0){
            this.resource_detail_list = res.data;
          }
          else {
            this.noDataFound2 = true;
          }
        })
  }

  admin_search(){
    // let name_resource = event.value ,
     let from_date =this.details_of_resource.value.from_date,
        to_date =this.details_of_resource.value.to_date,
        resource_name = this.details_of_resource.value.resource_name   ;
        this.timesheetService.selectedresourceAPI(from_date , to_date ,resource_name).subscribe((res) => {
          console.log('res admin', res.data);
          if(res.data.length>0){
            this.resource_detail_list = res.data;
          }
          else {
            this.noDataFound2 = true;
          }
        })
  }


  allprojectsummery(){
    this.timesheetService.allprojectsummeryAPI().subscribe((res) => {
      if(res.data.length>0){
        this.allprojectlist = res.data;
      }
      else{
        this.noDataFound = true;
      }
    })
  }  
  
  activitywisereport(){
    this.timesheetService.activitywisereportAPI().subscribe((res) => {
      console.log('res',res.data);
      if(res.data.length>0){
        this.activitywisereports = res.data;
      }
      else{
        this.noDataFound1 = true;
      }
    })
  } 

}
