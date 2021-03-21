import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  rankSheet: any[] = [];
  exportExcelData :any[]=[];

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getRankSheet(true).subscribe(data => {
      this.rankSheet = data.staterankdetails.ranksheet;
    });
  }
  //excel
  getDistrictdetails(){
    this.exportExcelData = [];
    this.rankSheet .map(item => {
      return {
        'Block Name': item.district_name,
        'Rank': item.distrank,
        'Overall Scroll': item.overscore ,
        'Passed-Tamil':item.pass_score_stud_tam,
        'Passed-English' :item.pass_score_stud_eng ,
        'Passed-Maths': item.pass_score_stud_mat,
        'Passed-Sience': item.pass_score_stud_sci ,
        'Passed-Social':item.pass_score_stud_soc,
        'Max-Marks-Tamil' :item.maxm_score_stud_tam ,
        'Max-Marks-English': item.maxm_score_stud_eng,
        'Max-Marks-Maths': item.maxm_score_stud_mat ,
        'Max-Marks-Sience':item.maxm_score_stud_sci,
        'Max-Marks-Social': item.maxm_score_stud_soc,
        'Avg-Passed-Tamil':item.avgp_score_stud_tam,
        'Avg-Passed-English' :item.avgp_score_stud_eng ,
        'Avg-Passed-Maths': item.avgp_score_stud_mat,
        'Avg-Passed-Science': item.avgp_score_stud_sci ,
        'Avg-Passed-Social':item.avgp_score_stud_soc,
        'Distnction-Tamil' :item.dist_score_stud_tam ,
        'Distnction-English': item.dist_score_stud_eng,
        'Distnction-Maths': item.dist_score_stud_mat ,
        'Distnction-Science':item.dist_score_stud_sci,
        'Distnction-Social': item.dist_score_stud_soc,
        'Centum-Tamil': item.cent_score_stud_tam,
        'Centum-English': item.cent_score_stud_eng ,
        'Centum-Maths':item.cent_score_stud_mat,
        'Centum-Science' :item.cent_score_stud_sci ,
        'Centum-Social': item.cent_score_stud_soc,
        'Inclusiveness-Tam': item.incl_score_stud_tam ,
        'Inclusiveness-Eng':item.incl_score_stud_eng,
        'Inclusiveness-Mat': item.incl_score_stud_mat,
        'Inclusiveness-Sci': item.incl_score_stud_sci,
        'Inclusiveness-Soc': item.incl_score_stud_soc,
        'Bunch-Tam': item.bunc_score_stud_tam,
        'Bunch-Eng': item.bunc_score_stud_eng ,
        'Bunch-Mat':item.bunc_score_stud_mat,
        'Bunch-Sci' :item.bunc_score_stud_sci,
        'Bunch-Soc': item.bunc_score_stud_soc,
        'Below-Tam': item.blow_score_stud_tam ,
        'Below-Eng':item.blow_score_stud_eng,
        'Below-Mat': item.blow_score_stud_mat,
        'Below-Sci': item.blow_score_stud_sci,
        'Below-Soc': item.blow_score_stud_soc,
        'Dist.avg-Tam': item.dsta_score_stud_tam ,
        'Dist.avg-Eng':item.dsta_score_stud_eng,
        'Dist.avg-Mat': item.dsta_score_stud_mat,
        'Dist.avg-Sci': item.dsta_score_stud_sci,
        'Dist.avg-Soc': item.dsta_score_stud_soc,
        } 
         }).forEach(item => this.exportExcelData.push(item));
         let DistList = [];
         for(let distlist of this.exportExcelData) {
          DistList.push(distlist);
         }
         return DistList;
   }
  
   exportExcel(){
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getDistrictdetails());
      const workbook = { Sheets: { 'Ranksheet-Details': worksheet }, SheetNames: ['Ranksheet-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Ranksheet Details");
  });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
  }

}
