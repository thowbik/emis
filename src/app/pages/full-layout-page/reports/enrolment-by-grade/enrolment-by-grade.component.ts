import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

@Component({
  selector: 'app-enrolment-by-grade',
  templateUrl: './enrolment-by-grade.component.html',
  styleUrls: ['./enrolment-by-grade.component.css']
})
export class EnrolmentByGradeComponent implements OnInit {
  public EnrollmentCurrentAcademic: any;
  schoolCode: any;
  finyear: any;
  public noDataFound : boolean = false;
  fiyear: string;
  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
   // this.getCurrentFinancialYear();
    this.geRepeatersSplChildrenDetails();
  }

  getCurrentFinancialYear() {
    var fiscalyear = "";
     var today = new Date();
     if ((today.getMonth() + 1) <= 6) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
     }
      this.fiyear = fiscalyear
  }
  
  geRepeatersSplChildrenDetails() {
debugger;
  //   var acyear = "";
  //   var today = new Date();
  //   if ((today.getMonth() + 1) <= 3) {
  //     acyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
  //  } else {
  //   acyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
  //  }
  //    this.finyear = acyear;
     let acyear = '';
  const today = new Date(); 
  console.log("checkdate",acyear);
  if ((today.getMonth() + 1) <= 6) {
    acyear = (today.getFullYear() - 1) + '-' + today.getFullYear().toString().slice(-2);
  } else {
    acyear = today.getFullYear() + '-' + (today.getFullYear() + 1);
  }
  this.finyear = acyear;
  
    let repId = 5, datasclservice = this.schoolCode;
    this.reportsService.getEnrollmentCurrentacademic(repId, this.finyear, datasclservice).subscribe((data) => {
      console.log('data',data);
      if(data.enrolment.length>0){
        console.log('data',data);
        this.EnrollmentCurrentAcademic = data.enrolment;
      }
      else
      {
        this.noDataFound = true;
        
      }
    });
  }
}
