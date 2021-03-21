import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-results-of-the-grade-regular',
  templateUrl: './results-of-the-grade-regular.component.html',
  styleUrls: ['./results-of-the-grade-regular.component.css']
})
export class ResultsOfTheGradeRegularComponent implements OnInit {
public resultsGradeRegular : any[] = [];
public rowHeader : any[] = [];
public noDataFound : boolean = false;
  acayear: string;
  constructor(private reportsService : ReportsService,  private userSessionService : UserSessionService) { }

  ngOnInit() {
    this.getCurrentFinancialYear()
    this.getResultsOfTheGradeRegular()
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
  // Fetch data from API
  
  getResultsOfTheGradeRegular(){
  
  let acyear =  this.acayear
  console.log('acyear',acyear);
  let udise=this.userSessionService.userName();
  let cls = '12', item='1';
  this.reportsService.getResultsOfTheGradeRegularAPI(cls, acyear, udise, item).subscribe((res) => {
    debugger
    if(res.result.length>0){
      let newDataMarge = res.result.map((item, i) => Object.assign({}, item, this.rowHeader[i]));
      this.resultsGradeRegular = newDataMarge; 
    }
    else{
      this.noDataFound = true;
    }
  })
}

}
