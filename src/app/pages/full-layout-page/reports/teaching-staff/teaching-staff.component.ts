import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-teaching-staff',
  templateUrl: './teaching-staff.component.html',
  styleUrls: ['./teaching-staff.component.css']
})
export class TeachingStaffComponent implements OnInit {
  public teachingList : any[] = [];
  public noDataFound : boolean = false;
  schoolid: any;
  acayear: string;

  constructor(private reportService : ReportsService,private userSessionService : UserSessionService) {
    this.schoolid = this.userSessionService.userName();
   }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.getTeachingList();
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
  getTeachingList(){
    debugger;
    let acyear =  this.acayear
    let schoolID=this.schoolid;
    this.reportService.getNonTeachingList(schoolID,acyear).subscribe((res) => {
      if(res.teacherpost.length>0){
        this.teachingList = res.teacherpost;
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }

}
