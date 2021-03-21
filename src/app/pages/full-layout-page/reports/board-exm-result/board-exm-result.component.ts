import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
 import { UserSessionService } from '../../../../../services/usersession.service';

@Component({
  selector: 'app-board-exm-result',
  templateUrl: './board-exm-result.component.html',
  styleUrls: ['./board-exm-result.component.css']
 })
export class BoardExmResultComponent implements OnInit {
  rangeofmark: { row: string; }[];
  XBoardExamOtherResults: any;
  XBoardOtherExamResults: any;
  XBoardExamRegularResults: any;
  XBoardRegularExamResults: any;
  rangeofmarks: any;
  totalCount_boys: { total_boys: number; }[];
  totalCount_girls: { total_girls: number; }[];
  public regularresults : any[] = [];
  public othersresults : any[] = [];
  total_girlss: any;
  totalCount_Appeared_girls: { total_girls: number; }[];
  totalCount_Appeared_boys: { total_boys: number; }[];
  schoolCode: any;
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  public noDataFound3 : boolean = false;
  public noDataFound4 : boolean = false;
  fiyear: string;
  fiscalyear: any;

  constructor(private reportService : ReportsService,private userSessionService: UserSessionService) 
  { 
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
  this.getCurrentFinancialYear();
  this.getXRegularOtherExaminationList();
  this.getXBoardExaminationList();
  this.rangeofmark = [
    { row: '<40%' },
    { row: '40<60%' },
    { row: '60<80%' },
    { row: '>=80%' },
    { row: 'Total' },  ];
  }

  getCurrentFinancialYear() {
    // var fiscalyear = "2018-19";
     var today = new Date();
     if ((today.getMonth() + 1) <= 6) {
      this.fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      this.fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
      console.log('3',this.fiscalyear);
    }
      this.fiyear = this.fiscalyear

  }

  getXBoardExaminationList()
  {// 7.1
   debugger
     let  acyear=this.fiyear, cls = '10', udise= this.schoolCode , item= '1',  item2= '2' ;
     this.reportService.getXBoardExamResultsList(acyear, cls, udise, item).subscribe((res) => {
       if(res.result.length>0)
      {
        this.XBoardExamRegularResults = res.result;
      }
      else
      {
        this.noDataFound = true;
      }
      for (var i = 0; i < this.XBoardExamRegularResults.length; i++) {
        var total_appeared_girls = +this.XBoardExamRegularResults[i].gen_app_g + +this.XBoardExamRegularResults[i].obc_app_g + +this.XBoardExamRegularResults[i].sc_app_g + +this.XBoardExamRegularResults[i].st_app_g;
        var total_appeared_boys = +this.XBoardExamRegularResults[i].gen_app_b + +this.XBoardExamRegularResults[i].obc_app_b + +this.XBoardExamRegularResults[i].sc_app_b + +this.XBoardExamRegularResults[i].st_app_b;
        var total_Passed_boys = +this.XBoardExamRegularResults[i].gen_pass_b + +this.XBoardExamRegularResults[i].obc_pass_b + +this.XBoardExamRegularResults[i].sc_pass_b + +this.XBoardExamRegularResults[i].st_pass_b;
        var total_Passed_girls = +this.XBoardExamRegularResults[i].gen_pass_g + +this.XBoardExamRegularResults[i].obc_pass_g + +this.XBoardExamRegularResults[i].sc_pass_g + +this.XBoardExamRegularResults[i].st_pass_g;
        this.XBoardExamRegularResults[i].total_app_girls = total_appeared_girls;
        this.XBoardExamRegularResults[i].total_app_boys = total_appeared_boys;
        this.XBoardExamRegularResults[i].total_pass_boys = total_Passed_boys;
        this.XBoardExamRegularResults[i].total_pass_girls = total_Passed_girls;      
     }
   })
   this.reportService.getXBoardExamResultsList(acyear, cls, udise, item2).subscribe((res) => {
     debugger
     if(res.result.length>0)
     {
      this.XBoardExamOtherResults = res.result;
     }
     else
     {
       this.noDataFound2 = true;
     }
    for (var i = 0; i < this.XBoardExamOtherResults.length; i++) {
      var  b_total_appeared_girls = +this.XBoardExamOtherResults[i].gen_app_g + +this.XBoardExamOtherResults[i].obc_app_g + +this.XBoardExamOtherResults[i].sc_app_g + +this.XBoardExamOtherResults[i].st_app_g;
      var  b_total_appeared_boys = +this.XBoardExamOtherResults[i].gen_app_b + +this.XBoardExamOtherResults[i].obc_app_b + +this.XBoardExamOtherResults[i].sc_app_b + +this.XBoardExamOtherResults[i].st_app_b;
      var  b_total_Passed_boys = +this.XBoardExamOtherResults[i].gen_pass_b + +this.XBoardExamOtherResults[i].obc_pass_b + +this.XBoardExamOtherResults[i].sc_pass_b + +this.XBoardExamOtherResults[i].st_pass_b;
      var  b_total_Passed_girls = +this.XBoardExamOtherResults[i].gen_pass_g + +this.XBoardExamOtherResults[i].obc_pass_g + +this.XBoardExamOtherResults[i].sc_pass_g + +this.XBoardExamOtherResults[i].st_pass_g;
      this.XBoardExamOtherResults[i]. b_total_app_girls = b_total_appeared_girls;
      this.XBoardExamOtherResults[i]. b_total_app_boys =  b_total_appeared_boys;
      this.XBoardExamOtherResults[i]. b_total_pass_boys =  b_total_Passed_boys;
      this.XBoardExamOtherResults[i]. b_total_pass_girls =  b_total_Passed_girls;      
   }
 })
  this.rangeofmark = [
    { row: '<40%' },
    { row: '40<60%' },
    { row: '60<80%' },
    { row: '>=80%' },
    { row: 'Total' },
  ];
  let newDataMarge = this.rangeofmark.map((item, i) => Object.assign({}, item, this.rangeofmark[i]));
  this.rangeofmark = newDataMarge;
  }
  getXRegularOtherExaminationList()
  {// 7.2
    let  acyear=this.fiyear, cls = '10', udise=this.schoolCode, item= '1', item2= '2', q='exmmarks'  ;
    this.reportService.getXRegularOtherResults(acyear, cls, udise, item, q).subscribe((res) => {
      if(res.result.length>0)
      {
      this.XBoardRegularExamResults = res.result;
      }
      else
      {
        this.noDataFound3 = true;
      }
      for (var i = 0; i < this.XBoardRegularExamResults.length; i++) {
        var totalgirls = +this.XBoardRegularExamResults[i].gen_g + +this.XBoardRegularExamResults[i].obc_g + +this.XBoardRegularExamResults[i].sc_g + +this.XBoardRegularExamResults[i].st_g;
        var totalboys = +this.XBoardRegularExamResults[i].gen_b + +this.XBoardRegularExamResults[i].obc_b + +this.XBoardRegularExamResults[i].sc_b + +this.XBoardRegularExamResults[i].st_b;
        this.XBoardRegularExamResults[i].total_girls = totalgirls;
        this.XBoardRegularExamResults[i].total_boys = totalboys;
     }
   }) //  7.3
   this.reportService.getXRegularOtherResults(acyear, cls, udise, item2, q).subscribe((res) => {
   if(res.result.length>0)
    {
      this.XBoardOtherExamResults = res.result;
      console.log(this.XBoardOtherExamResults)
    }
    else
    {
      this.noDataFound4 = true;
    } 
     for (var i = 0; i < this.XBoardOtherExamResults.length; i++)
      {
      var totalgirls = +this.XBoardOtherExamResults[i].gen_g + +this.XBoardOtherExamResults[i].obc_g + +this.XBoardOtherExamResults[i].sc_g + +this.XBoardOtherExamResults[i].st_g;
      var totalboys = +this.XBoardOtherExamResults[i].gen_b + +this.XBoardOtherExamResults[i].obc_b + +this.XBoardOtherExamResults[i].sc_b + +this.XBoardOtherExamResults[i].st_b;
      this.XBoardOtherExamResults[i].total_girls = totalgirls;
      this.XBoardOtherExamResults[i].total_boys = totalboys;
      }
    })
  }
}