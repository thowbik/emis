import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';
import { Router } from '@angular/router';

interface School {
  name: string;
  value: string;
}
@Component({
  selector: 'app-indicators-mark-sheet-reports',
  templateUrl: './indicators-mark-sheet-reports.component.html',
  styleUrls: ['./indicators-mark-sheet-reports.component.scss']
})
export class IndicatorsMarkSheetReportsComponent implements OnInit {
  rankSheet: any[] = [];
  MarkSheet: School[];
  MarkSheetIndicators: School[];
  exportExcelData : any[]=[];

  constructor(private stateService: StateService, private router: Router) {
    this.MarkSheet = [
      {name: 'Trem - 1', value: '1'},
      {name: 'Trem - 2', value: '2'},
      {name: 'Trem - 3', value: '3'}
    ];
    this.MarkSheetIndicators = [
      {name: 'Passed Students', value: '1'},
      {name: 'Maximum Obtained', value: '2'},
      {name: 'Average of Passed', value: '3'},
      {name: 'Distinction', value: '4'},
      {name: 'Centum', value: '5'},
      {name: 'Inclusiveness', value: '6'},
      {name: 'Bunch(35-40%)', value: '7'},
      {name: 'Below20%', value: '8'},
      {name: 'District Avg', value: '9'}
    ];
  }


  ngOnInit() {
    this.stateService.getMarkReport(true).subscribe(data => {
      this.rankSheet = data.schooldetails.mklist;
      console.log(this.rankSheet);
    });
  }

  markSheet(distname) {
    this.stateService.getMarkSheetReport(distname).subscribe(
      details => {
        this.router.navigate(['/state/indicatorMarkSheetReportEducation'], details.schooldetails.mklist);
      }
    );
  }

  //excel
  getDistrictdetails(){
    this.exportExcelData = [];
    this.rankSheet .map(item => {
      return {
        'District Name': item.district_name,
        'Total Students': item.total_stud,
        'Tamil-Present': item.attend_tam ,
        'Tamil-PassedStd':item.pstud_tam,
        'Tamil-Marks-%' :((item.pstud_tam /item.attend_tam )* 100).toFixed(2),
        'Tamil-Score': ((((item.pstud_tam / item.attend_tam ) * 100)*35)/100).toFixed(2),
        'English-Present': item.attend_eng ,
        'English-PassedStd':item.pstud_eng,
        'English-Marks-%' :((item.pstud_eng /item.attend_eng )* 100).toFixed(2),
        'English-Score': ((((item.pstud_eng / item.attend_eng ) * 100)*35)/100).toFixed(2),
        'Maths-Present': item.attend_mat ,
        'Maths-PassedStd':item.pstud_mat,
        'Maths-Marks-%' :((item.pstud_mat /item.attend_mat )* 100).toFixed(2),
        'Maths-Score' :((((item.pstud_mat / item.attend_mat ) * 100)*35)/100).toFixed(2),
        'Science-Present': item.attend_sci ,
        'Science-PassedStd':item.pstud_sci,
        'Science-Marks-%' :((item.pstud_sci /item.attend_sci )* 100).toFixed(2),
        'Science-Score': ((((item.pstud_sci / item.attend_sci ) * 100)*35)/100).toFixed(2),
        'Social-Present': item.attend_soc ,
        'Social-PassedStd':item.pstud_soc,
        'Social-Marks-%' :((item.pstud_soc /item.attend_soc )* 100).toFixed(2),
        'Social-Score': ((((item.pstud_soc / item.attend_soc ) * 100)*35)/100).toFixed(2),
        'Overall %' : (((((item.pstud_mat / item.attend_mat ) * 100) + ((item.pstud_tam / item.attend_tam ) * 100) +
                       ((item.pstud_eng / item.attend_eng ) * 100)+ ((item.pstud_sci / item.attend_sci ) * 100) + ((item.pstud_soc / item.attend_soc ) * 100)) / 100) * 100).toFixed(2),
        'Overall Score' :(((((item.pstud_tam / item.attend_tam ) * 100)*35)/100) + ((((item.pstud_eng / item.attend_eng ) * 100)*35)/100) + ((((item.pstud_sci / item.attend_sci ) * 100)*35)/100) + ((((item.pstud_mat / item.attend_mat ) * 100)*35)/100) +((((item.pstud_soc / item.attend_soc ) * 100)*35)/100) / 5).toFixed(2) 
              
      
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
      const workbook = { Sheets: { 'Marks-Summary-Details': worksheet }, SheetNames: ['Marks-Summary-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Marks-Summary Report");
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
