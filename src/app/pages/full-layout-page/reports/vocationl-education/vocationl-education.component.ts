import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-vocationl-education',
  templateUrl: './vocationl-education.component.html',
  styleUrls: ['./vocationl-education.component.css']
})
export class VocationlEducationComponent implements OnInit {
  public VocationalData: any[] = [];
  public VocationalData1: any[] = [];
  public VocationalList: any[] = [];
  public noDataFound = false;
  fiyear: any;
  udiseCode: any;
  selectedColumns: any[] = [];
  sampleSelectedColumn: Array<Object> = [];

  constructor(private reportsService: ReportsService , private userSessionService: UserSessionService) {
    this.udiseCode = this.userSessionService.userName();
   }
  ngOnInit() {
    debugger;
    this.getCurrentFinancialYear();
    this.getVocationalEducaionList();
    this.VocationalList = [
      { row: 'A – General' },
      { row: 'B - SC' },
      { row: 'C – ST' },
      { row: 'D – OBC' },
      { row: 'Muslim' },
      { row: 'Christian' },
      { row: 'Sikh' },
      { row: 'Buddhist' },
      { row: 'Parsi' },
      { row: 'Jain' },
      { row: 'Other' },
      { row: 'CWSN' },
    ];
  }

  headerData() {
    this.selectedColumns = [
      { field: 'sector'},
      { field: 'item_id' },
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
    let fiscalyear = '2018-19';
    let today = new Date();
    if ((today.getMonth() + 1) <= 6) {
      fiscalyear = (today.getFullYear() - 1) + '-' + today.getFullYear().toString().slice(-2);
    } else {
      fiscalyear = today.getFullYear() + '-' + (today.getFullYear() + 1);
      console.log('3', fiscalyear);
    }
    this.fiyear = fiscalyear;

  }

  getVocationalEducaionList() {
    debugger;
    // let cYer = parseInt(((new Date()).getFullYear()).toString().slice(-2));
    // let lYer = (new Date()).getFullYear()-1;
    // let acyear = lYer+'-'+cYer;
    // let acyear='2018-19',  section='1', udise='33320900104';
    // let udise=this.userSessionService.userName();
    //const acyear = '2018-19';
    const acyear = this.fiyear;
    const section = '1';
    const udise = this.udiseCode ;

    this.reportsService.getVocationalEducaionListAPI(acyear, section, udise).subscribe((res) => {
      // if(res.vocation.length>0){
      //   let newDataMarge = res.vocation.map((item, i) => Object.assign({}, item, this.VocationalList[i]));
      //   this.VocationalData = newDataMarge;
      // }
      if (res.vocation != '') {
        this.VocationalData = res.vocation[1];
        this.VocationalData1 = res.vocation[2];
      } else {
        this.noDataFound = true;
      }
    });





    // let newDataMarge = this.VocationalList.map((item, i) => Object.assign({}, item, this.SocialCategory[i]));
    // this.VocationalData = newDataMarge;
  }


}
