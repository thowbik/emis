import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-repeatersall',
  templateUrl: './repeatersall.component.html',
  styleUrls: ['./repeatersall.component.css']
})
export class RepeatersallComponent implements OnInit {
  public socialCategoryData : any[] = [];
  public MinorityData : any[] = [];
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  acayear: string;
  constructor(private reportsService : ReportsService, private userSessionService : UserSessionService) { }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.geRepeatersGrade();
  }

  // Fetch data from API
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
  
  geRepeatersGrade(){    
  //  console.log('acayear',this.acayear);
   let acyear = this.acayear;
   console.log('acyear',acyear);
    let udise=this.userSessionService.userName();
    let repId = '2', item= '1', item2='2';
    this.reportsService.getRepeatersByGradeAPI(repId, acyear, udise,item).subscribe((res) => {
      if(res.enrolment.length>0){
        this.socialCategoryData = res.enrolment;
      }
      else{
        this.noDataFound = true;
      }
    })
    this.reportsService.getRepeatersByGradeAPI(repId, acyear, udise,item2).subscribe((res) => {
      if(res.enrolment.length>0){
        this.MinorityData = res.enrolment;
      }
      else
      {
        this.noDataFound2 = true;
      }
    })
  }
}

