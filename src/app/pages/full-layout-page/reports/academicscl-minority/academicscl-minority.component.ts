import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

@Component({
  selector: 'app-academicscl-minority',
  templateUrl: './academicscl-minority.component.html',
  styleUrls: ['./academicscl-minority.component.css']
})
export class AcademicsclMinorityComponent implements OnInit {
  public AcademicStream: any;
  schoolCode: string;
  public noDataFound : boolean = false;
  acayear: string;

  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.getEnrollmentAcademicYearMinority();
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

  getEnrollmentAcademicYearMinority() {
    // console.log('acayear',this.acayear);
    let acyear = this.acayear;
    // console.log('acyear',acyear);
      let repId = '8', datasclservice = this.schoolCode, item = '2';
      this.reportsService.getEnrollmentAcademicYear(repId, acyear, datasclservice, item).subscribe((data) => {
      if(data.enrolment.length>0){
      this.AcademicStream = data.enrolment;
      }
      else
      {
        this.noDataFound = true;
      }
    });
  }
}
