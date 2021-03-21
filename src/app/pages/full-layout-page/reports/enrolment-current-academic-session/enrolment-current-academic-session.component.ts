import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-enrolment-current-academic-session',
  templateUrl: './enrolment-current-academic-session.component.html',
  styleUrls: ['./enrolment-current-academic-session.component.css']
})
export class EnrolmentCurrentAcademicSessionComponent implements OnInit {
  public EnrolmentData : any[] = [];
  public EnrolmentData1 : any[] = [];
  public noDataFound : boolean = false;
  fiyear: any;
  udiseCode: any;
  selectedColumns: any[] = [];
  sampleSelectedColumn: Array<Object> = [];

  constructor(private reportsService : ReportsService, private userSessionService : UserSessionService) { 
    this.udiseCode = this.userSessionService.userName();
  }

  ngOnInit() {
    this.headerData();
    this. getCurrentFinancialYear();
    this.getEnrolmentList();
  }

  headerData() {
    this.selectedColumns = [
      { field: 'sector'},
      { field: 'jobrole' },
      { field: 'c9_b' },
      { field: 'c9_g' },
      { field: 'c10_b' },
      { field: 'c10_g' },
      { field: 'c11_b'},
      { field: 'c11_g' },
      { field: 'c12_b' },
      { field: 'c12_g' }
    ];
    this.sampleSelectedColumn = this.selectedColumns;
  }

  getCurrentFinancialYear() {
    var fiscalyear = "";
     var today = new Date();
     if ((today.getMonth() + 1) <= 6) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
      console.log('3',fiscalyear);
    }
      this.fiyear = fiscalyear

  }
  getEnrolmentList(){
    debugger
    // let cYer = parseInt(((new Date()).getFullYear()).toString().slice(-2));
    // let lYer = (new Date()).getFullYear()-1;
    // let acyear = lYer+'-'+cYer;
    // let acyear='2018-19',  section='2', udise='33320900104';
    // let udise=this.userSessionService.userName();
  //  const acyear = this.fiyear;
   const acyear = '2018-19';
    const section = 2;
    const udise =this.udiseCode ;
    this.reportsService.getEnrolmentCurrentAcademicAPI(acyear,section,udise).subscribe((res) => {
      // if(res.vocation.length>0)
      if(res.length>0)
      {
        this.EnrolmentData = res.vocation; 
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }

}
