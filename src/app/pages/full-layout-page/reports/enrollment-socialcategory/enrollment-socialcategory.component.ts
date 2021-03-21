import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';


@Component({
  selector: 'app-enrollment-socialcategory',
  templateUrl: './enrollment-socialcategory.component.html',
  styleUrls: ['./enrollment-socialcategory.component.css']
})
export class EnrollmentSocialcategoryComponent implements OnInit {
  schoolCode: string;
  Socialdata: any;
  Minoritygroups: any;
  providenumber: any;
  Transgender: any;
  public noDataFound = false;
  public noDataFound2 = false;
  public noDataFound3 = false;
  public noDataFound4 = false;
  finyear: string;
  item: any;
  rep: any;
  item1: any;
  rep1: any;

  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.schoolCode = this.userSessionService.userName();
   }

   ngOnInit() {
    this.getenrollmentcategory();
   }

  getenrollmentcategory() {
    // let udise=this.userSessionService.userName();
    let financialyear = '';
    const today = new Date(); 
    console.log("checkdate",financialyear);
    if ((today.getMonth() + 1) <= 6) {
      financialyear = (today.getFullYear() - 1) + '-' + today.getFullYear().toString().slice(-2);
    } else {
      financialyear = today.getFullYear() + '-' + (today.getFullYear() + 1);
    }
    this.finyear = financialyear;
    const item1 = 1;
    const rep1=1;
    this.reportsService.getenrollmentcategory(this.schoolCode,this.finyear,item1,rep1).subscribe((data) => {
      if (data.enrolment.length > 0) {
        this.Socialdata = data.enrolment;
      // const result = data.enrolment;
      // const i = result.length - 1;
      // const j = result.length - 2;
      // const result2 = result.slice(0, i).concat(result.slice(i + 1, result.length));
      // const result3 = result2.slice(0, j).concat(result2.slice(j + 1, result2.length));
      // this.Socialdata = result3;

      } else {
        this.noDataFound = true;
      }
    });
    this.reportsService.getMinoritygroups(this.schoolCode, this.finyear).subscribe((data) => {
      if (data.enrolment.length > 0) {
        this.Minoritygroups = data.enrolment;
      } else {
        this.noDataFound2 = true;
      }
    });
    this.item=3;
    this.rep=1;
    this.reportsService.getprovidenumber(this.schoolCode, this.finyear, this.item, this.rep).subscribe((data) => {
      if (data.enrolment.length > 0) {
          this.providenumber = data.enrolment;
        } else {
        this.noDataFound3 = true;
      }
    });
    this.item1=4;
    this.rep1=1;
    this.reportsService.getTransgender(this.schoolCode, this.finyear,this.item1, this.rep1).subscribe((data) => {

      if (data.enrolment.length > 0) {
        this.Transgender = data.enrolment;
      } else {
        this.noDataFound4 = true;
      }
    });
  }
}
