import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import {UserSessionService} from '../../../../../services/usersession.service';

interface School {
  name: string;
  value: string;
}
@Component({
  selector: 'app-children-spl-needs',
  templateUrl: './children-spl-needs.component.html',
  styleUrls: ['./children-spl-needs.component.css']
})
export class ChildrenSplNeedsComponent implements OnInit {
  public EnrollmentChildrenDetails: any;
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
     }
      this.fiyear = fiscalyear
  }
  geRepeatersSplChildrenDetails() {
        // console.log('fiyear',this.fiyear);
    let acyear =this.fiyear;
        // console.log('acyear',acyear);
    let repId = '7', datasclservice = this.schoolCode;
    this.reportsService.getEnrollmentChildrenSplNeeds(repId, acyear, datasclservice).subscribe((data) => {
      if(data.enrolment.length>0){
        this.EnrollmentChildrenDetails = data.enrolment;
      }
      else
      {
        this.noDataFound = true;
      }
      
    });
  }
}
