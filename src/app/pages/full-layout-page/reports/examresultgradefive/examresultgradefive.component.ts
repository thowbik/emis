import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

@Component({
  selector: 'app-examresultgradefive',
  templateUrl: './examresultgradefive.component.html',
  styleUrls: ['./examresultgradefive.component.css']
})
export class ExamresultgradefiveComponent implements OnInit {
  public rowHeader: any[] = [];
  public ExamresultGradeFive: any;
  public ExamresultGradeEight: any;
  schoolCode: string;
  public noDataFound : boolean = false;
  public noDataFound1 : boolean = false;
  acayear: string;

  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.getExamGradeFive();
    this.getExamGradeEight();
    this.rowHeader = [
      { row: 'Number of Students Appeared' },
      { row: 'Number of Students Passed/Qualified' },
      { row: 'Number of Students Passed with Marks>=60%' },
    ];
  }

  getExamGradeFive() {
    debugger;
    let acyear = this.acayear;
    // tslint:disable-next-line:prefer-const
    let cls = '5', datasclservice = this.schoolCode;
    this.reportsService.getExmResultGradeFive(cls, acyear, datasclservice).subscribe((data) => {
      if(data.result.length>0){
      this.ExamresultGradeFive = data.result;
      }
      else
      {
        this.noDataFound = true;
      }
    });
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
  getExamGradeEight() {
    let acyear = this.acayear;
    let cls = '8', datasclservice = this.schoolCode;
    this.reportsService.getExmResultGradeEight(cls, acyear, datasclservice).subscribe((data) => {
      if(data.result.length>0){
      this.ExamresultGradeEight = data.result;
      }
      else
      {
        this.noDataFound1 = true;
      }
    });
  }

}
