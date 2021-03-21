import { Component, OnInit } from '@angular/core';
import {CeoService} from '../ceo.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-noc-cbsc-status',
  templateUrl: './noc-cbsc-status.component.html',
  styleUrls: ['./noc-cbsc-status.component.css']
})
export class NocCbscStatusComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  public noDataFound = false;
  userTypeID: number;
  districtId: any;
  schoolwithoutdata: any;
  schooltype: any;
  noccbscformstatus: any;
  school_id: any;
  schoolId: any;
  schoolid: any;
  noccbscformstatusdownload: any;
  appid: any;
  downloadorder:any;
  downloadordercondition:any;

  constructor(private router: Router, private Ceoservice: CeoService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {

    
    const districtId = this.userSessionService.districtId();
    {
    this.getschoolcbscform();
    this.getApp_id();
    {
    this.dataHeader = [
      { field: 'Action_Taken', header: 'Action', widthstyle: '6em' },
     { field: 'By', header: 'By' , widthstyle: '5em'},
     { field: 'To', header: 'To', widthstyle: '5em' },
     { field: 'On', header: 'Date', widthstyle: '4em' },
     { field: 'Remarks', header: 'Remarks', widthstyle: '8em' }];
    }
  } 

  }
  getschoolcbscform() {
    // const school_id = this.schoolId;
    this.Ceoservice.getnocformstatus(this.schoolId,3).subscribe((data) => {
      console.log("check",data)
    if (data != 0) {
      this.noccbscformstatus =data.schoolDocList;
      console.log("nocform",this.noccbscformstatus)
    } else {
      this.noDataFound = true;
    }
  });
}

getApp_id()
{
  this.Ceoservice.getnocDownloadApiAppid(this.schoolId).subscribe((data) => {
  
  if (data != 0) {
    this.appid=data.List[0]['app_id'];
    this.SchoolDownloadOrder();
    this.SchoolDownloadOrderCondition();
  }
});
}
SchoolDownloadOrder() {

  this.Ceoservice.getnocformstatusdownload(this.appid).subscribe((data) => {
    
  if (data != 0) {
  this.downloadorder =  data.schoolDocList[0]['order_filepath'];
  this.downloadordercondition = data.schoolDocList[0]['order_conditions_filepath'];
  
  //console.log(this.downloadorder);
    //console.log("nocformdownload",this.noccbscformstatus)
  } else {
    this.noDataFound = true;
  }
});
}
SchoolDownloadOrderCondition() {

  this.Ceoservice.getnocformstatusdownloadcondition(this.appid).subscribe((data) => {
    
  if (data != 0) {
  
  this.downloadordercondition = data.schoolDocList[0]['order_conditions_filepath'];
  
  //console.log(this.downloadorder);
    //console.log("nocformdownload",this.noccbscformstatus)
  } else {
    this.noDataFound = true;
  }
});
}





  
}

