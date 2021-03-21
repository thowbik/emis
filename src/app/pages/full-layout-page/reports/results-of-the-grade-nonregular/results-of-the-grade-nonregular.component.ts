import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-results-of-the-grade-nonregular',
  templateUrl: './results-of-the-grade-nonregular.component.html',
  styleUrls: ['./results-of-the-grade-nonregular.component.css']
})
export class ResultsOfTheGradeNonregularComponent implements OnInit {
  acayear: string;

  constructor(public reportsService : ReportsService , private userSessionService : UserSessionService) { }
public resultsGradeNonRegular : any[] = [];
public rowHeader : any[] = [];
public noDataFound : boolean = false;
  ngOnInit() {
    this.getCurrentFinancialYear();
    this.getResultsOfTheGradeNonregular();
    this.rowHeader = [
      { row: 'Arts' },
      { row: 'Science' },
      { row: 'Commerce' },
      { row: 'Vocational' },
      { row: 'Other streams' },
      { row: 'Total' },
    ];
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
  
  getResultsOfTheGradeNonregular(){
   debugger;
    let acyear = this.acayear;
    console.log('acyear',acyear);
    let udise=this.userSessionService.userName();
    let cls = '12', item='2';
  this.reportsService.getResultsOfTheGradeNonRegularAPI(cls, acyear, udise, item).subscribe((res) => {
    if(res.result.length>0){
      let newDataMarge = res.result.map((item, i) => Object.assign({}, item, this.rowHeader[i]));
      this.resultsGradeNonRegular = newDataMarge; 
    }
    else{
      this.noDataFound = true;
    }
  })
  
  }

 

}
