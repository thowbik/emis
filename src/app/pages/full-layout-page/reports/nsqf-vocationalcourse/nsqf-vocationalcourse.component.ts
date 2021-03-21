import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-nsqf-vocationalcourse',
  templateUrl: './nsqf-vocationalcourse.component.html',
  styleUrls: ['./nsqf-vocationalcourse.component.css']
})
export class NsqfVocationalcourseComponent implements OnInit {
  public resultsnsofvocational : any[] = [];
  public noDataFound : boolean = false;
    acayear: string;
    public SkillTraining : any;

    constructor(public reportsService : ReportsService , private userSessionService : UserSessionService) { }

    ngOnInit() {
      this.getCurrentFinancialYear()
      this.getnsofvocationalAPI()
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
    getnsofvocationalAPI(){
      let acyear =  this.acayear;
      // console.log('acyear',acyear);
      let udise=this.userSessionService.userName();
      let cls = '12', item='2',  q='exmmarks';
      this.reportsService.getnsofvocationalAPI(cls, acyear, udise, item, q).subscribe((res) => {
        console.log("check",res)

        if(res.result.length>0){
          this.resultsnsofvocational = res.result;
          console.log("check",this.resultsnsofvocational)
        }
        else{
          this.noDataFound = true;
        }
      })
    }

  }
