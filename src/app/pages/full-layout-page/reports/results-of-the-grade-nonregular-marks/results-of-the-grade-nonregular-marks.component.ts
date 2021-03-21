import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-results-of-the-grade-nonregular-marks',
  templateUrl: './results-of-the-grade-nonregular-marks.component.html',
  styleUrls: ['./results-of-the-grade-nonregular-marks.component.css']
})
export class ResultsOfTheGradeNonregularMarksComponent implements OnInit {
public resultsGradeRegularNonMarks : any[] = [];
public noDataFound : boolean = false;
  acayear: string;
  constructor(public reportsService : ReportsService , private userSessionService : UserSessionService) { }

  ngOnInit() {
    this.getCurrentFinancialYear()
    this.getresultsGradeRegularNonMarks()
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
  getresultsGradeRegularNonMarks(){
   
    let acyear =  this.acayear;
    // console.log('acyear',acyear);
    let udise=this.userSessionService.userName();
    let cls = '12', item='2',  q='exmmarks';
    this.reportsService.getResultsOfTheGradeNonRegularMarksAPI(cls, acyear, udise, item, q).subscribe((res) => {
      if(res.result.length>0){
        this.resultsGradeRegularNonMarks = res.result;
      }
      else{
        this.noDataFound = true;
      }
    })
  }

}
