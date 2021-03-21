import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-non-teaching-staff',
  templateUrl: './non-teaching-staff.component.html',
  styleUrls: ['./non-teaching-staff.component.css']
})
export class NonTeachingStaffComponent implements OnInit {
  public nonTeachingList : any[] = [];
  public noDataFound : boolean = false;
  schoolid: any;
  acayear: any;;

  constructor(private reportsService : ReportsService,private userSessionService : UserSessionService) { 
    this.schoolid = this.userSessionService.userName();

  }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.getNonTeachingStaffList();
  }
  getCurrentFinancialYear() {
    var acdyear = "";
     var today = new Date();
     if ((today.getMonth() + 1) <= 6) {
      acdyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      acdyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
     }
      this.acayear = acdyear
  }
  getNonTeachingStaffList(){
    debugger
    let schoolID=this.schoolid;
    let acyear =  this.acayear
    this.reportsService.getNonTeachingList(schoolID,acyear).subscribe((res) => {
      debugger;
      console.log('reportsService',res.teacherpost);
      if(res.teacherpost.length>0)
      {
        console.log('reportsService',res.teacherpost);
        this.nonTeachingList = res.teacherpost;
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }

}
