import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-results-of-the-grade-regular-marks',
  templateUrl: './results-of-the-grade-regular-marks.component.html',
  styleUrls: ['./results-of-the-grade-regular-marks.component.css']
})
export class ResultsOfTheGradeRegularMarksComponent implements OnInit {
public resultsGradeRegularMarks : any[] = [];
public noDataFound : boolean = false;
  acayear: string;
  constructor(public reportsService : ReportsService , private userSessionService : UserSessionService) { }

  ngOnInit() {
    this.getCurrentFinancialYear()
    this.getResultsOfTheGradeRegularMarks()
  }

  // Fetch Api Data
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
  getResultsOfTheGradeRegularMarks(){
    debugger;
    let acyear = this.acayear;
    console.log('acyear',acyear);
    let udise=this.userSessionService.userName();
    let cls = 12, item=1,  q='exmmarks';
    this.reportsService.getResultsOfTheGradeRegularMarksAPI(cls, acyear, udise, item, q).subscribe((res) => {
      if(res.result.length>0){
        this.resultsGradeRegularMarks = res.result;
      }
      else{
        this.noDataFound = true;
      }
    })
  }
}
