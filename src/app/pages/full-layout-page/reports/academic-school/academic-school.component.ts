import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

interface School {
  name: string;
  value: string;
}
@Component({
  selector: 'app-academic-school',
  templateUrl: './academic-school.component.html',
  styleUrls: ['./academic-school.component.css']
})
export class AcademicSchoolComponent implements OnInit {
  public AcademicStream: any;
  schoolCode: string;
  public noDataFound : boolean = false;
  fiyear: string;
  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.geRepeatersSplChildrenDetails();
  }

  getCurrentFinancialYear() {
    var fiscalyear = "";
     var today = new Date();
     if ((today.getMonth() + 1) <= 6) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
      console.log('3',fiscalyear);
    }
      this.fiyear = fiscalyear
  }

  geRepeatersSplChildrenDetails() {
    // console.log('fiscalyear',this.fiyear);
    let acyear = this.fiyear;
    // console.log('acyear',acyear);
    let repId = '8', datasclservice = this.schoolCode, item = '1';
    this.reportsService.getEnrollmentAcademicYear(repId, acyear, datasclservice, item).subscribe((data) => {
      if(data.enrolment.length>0){
        this.AcademicStream = data.enrolment;
      }
      else
      {
        this.noDataFound = true
      }
    });
  }
}
