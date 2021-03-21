import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-enrolment-medium-instruction',
  templateUrl: './enrolment-medium-instruction.component.html',
  styleUrls: ['./enrolment-medium-instruction.component.css']
})
export class EnrolmentMediumInstructionComponent implements OnInit {
  public rowHeader : any[] = [];
  public EnrolmentData : any[] = [];
  public noDataFound : boolean = false;
  constructor(private reportsService : ReportsService, private userSessionService : UserSessionService) {}

  ngOnInit() {
    this.getEnrolmentData();
    this.rowHeader = [
      { row: 'I' },
      { row: 'II' },
      { row: 'III' },
      { row: 'IV' },
      { row: 'V' },
    ];
  }

  // Fetch data from API
  
  getEnrolmentData(){
    debugger;
    let cYer = parseInt(((new Date()).getFullYear()).toString().slice(-2));
    let lYer = (new Date()).getFullYear()-1;
    let acyear = lYer+'-'+cYer;
    let udise=this.userSessionService.userName();
    let repId = '6';
    this.reportsService.getEnrolmentMediumInstructionAPI(repId, acyear, udise).subscribe((res) => {
      if(res.enrolment.length>0){
        let newDataMarge = res.enrolment.map((item, i) => Object.assign({}, item, this.rowHeader[i]));
        this.EnrolmentData = newDataMarge; 
      }
      else
      {
        this.noDataFound = true;
      }
    })
 
  }

}
