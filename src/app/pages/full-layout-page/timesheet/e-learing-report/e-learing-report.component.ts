import { Component, OnInit, ElementRef } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { TimesheetService } from '../timesheet.service';
import { AlertService } from 'src/services/alert.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-e-learing-report',
  templateUrl: './e-learing-report.component.html',
  styleUrls: ['./e-learing-report.component.css']
})
export class ELearingReportComponent implements OnInit {
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  Current_User_Type_Id: any;
  Current_User_Type_Id_1: any;
  result_Elearn_data: any;
  noDataFound1: boolean;
  exportExcelData: any[];

  constructor(public timesheetService : TimesheetService, public UserSessionService : UserSessionService, private alertService :AlertService,private fb: FormBuilder,private el: ElementRef) {
    this.Current_User_Type_Id = this.UserSessionService.userTypeId();
    this.Current_User_Type_Id_1 = this.UserSessionService.emisUsertype1(); }

  ngOnInit() {

    this.e_learn_content();

    this.dataHeader1 = [
      { field: 'class', header: 'Class', widthstyle: '4em' },
      { field: 'subject', header: 'Subject', widthstyle: '4em' },
      { field: 'medium', header: 'Medium' , widthstyle:'4em'},
      { field: 'Videos', header: 'Video' , widthstyle:'4em'},
      { field: 'Links', header: 'Links' , widthstyle:'4em'},
      { field: 'Documents', header: 'Documents' , widthstyle:'5em'},
      { field: 'Total', header: 'Total' , widthstyle:'4em'},
     ];

  }

  e_learn_content(){
    if(this.Current_User_Type_Id == 20 ) {
      let Current_User_Type_Id_1 = '' ;
      this.timesheetService.get_e_learn_content_api(this.Current_User_Type_Id , Current_User_Type_Id_1).subscribe((res) => {
        console.log(res,"ress elearn");
       if(res.data != 0){
         this.result_Elearn_data = res.result.ELearnRprt;
         this.noDataFound1 = false;
       }
       else{
         this.noDataFound1 = true;
       }
     })
    }

    if(this.Current_User_Type_Id == 21 ) {
      this.timesheetService.get_e_learn_content_api(this.Current_User_Type_Id , this.Current_User_Type_Id_1).subscribe((res) => {
        console.log(res,"ress elearn");
       if(res.data != 0){
         this.result_Elearn_data = res.result.ELearnRprt;
         this.noDataFound1 = false;
       }
       else{
         this.noDataFound1 = true;
       }
     })
    }
  
  }

  getstudentstatedata(){
    this.exportExcelData = [];
    this.result_Elearn_data.map(item => {
      return {

        // { field: 'class', header: 'Class', widthstyle: '4em' },
        // { field: 'subject', header: 'Subject', widthstyle: '4em' },
        // { field: 'medium', header: 'Medium' , widthstyle:'4em'},
        // { field: 'Videos', header: 'Video' , widthstyle:'4em'},
        // { field: 'Links', header: 'Links' , widthstyle:'4em'},
        // { field: 'Documents', header: 'Documents' , widthstyle:'5em'},
        // { field: 'Total', header: 'Total' , widthstyle:'4em'},

        'Class': item.class,
        'Subject': item.subject,
        'Medium': item.medium,
        'Video': item.Videos,
        'Links': item.Links,
        'Documents': item.Documents,
        'Total': item.Total,
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let studentdatastate = [];
         for(let schooldata of this.exportExcelData) {
          studentdatastate.push(schooldata);
         }
         return studentdatastate;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedata());
        const workbook = { Sheets: { 'E-Learning Content Reports' : worksheet }, SheetNames: ['E-Learning Content Reports'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'E-Learning Content Reports');
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
