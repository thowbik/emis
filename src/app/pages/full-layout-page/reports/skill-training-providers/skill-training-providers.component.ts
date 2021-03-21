import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';


@Component({
  selector: 'app-skill-training-providers',
  templateUrl: './skill-training-providers.component.html',
  styleUrls: ['./skill-training-providers.component.css']
})
export class SkillTrainingProvidersComponent implements OnInit {
  public SkillTraining : any[] = [];
  acayear: string;
  public noDataFound : boolean = false;



  constructor(private reportService : ReportsService, private userSessionService : UserSessionService) { }

  ngOnInit() {
    this.getSkillTraining();
  }

  getSkillTraining(){
    debugger;
    let acyear =  this.acayear;
    // console.log('acyear',acyear);
    let udise=this.userSessionService.userName();
    let cls = '12', item='2',  q='exmmarks';
    this.reportService.getSkillTrainingProvidersAPI(cls, acyear, udise, item, q).subscribe((res) => {
      if(res.length<0){
      }
      else{
        this.noDataFound = true;
      }
    })
  }

}
