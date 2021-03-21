import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-student-newadmission',
  templateUrl: './student-newadmission.component.html',
  styleUrls: ['./student-newadmission.component.css']
})
export class StudentNewadmissionComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  schoolCode: string;
  public noDataFound = false;
  userTypeID: number;
  districtId: any;
  schoolwithoutdata: any;
  exportExcelData: any;
  schoolwithoutdatastate: any;
  schooltype: any;
  saveAsExcelFile: any;
  schoolId: any;
  tranferstudentdata: any;
  count_val: any;
  Studenttranferlength: number;

  constructor(private router: Router, private schoolService:schoolsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    {
    this.getstudenttransferdata();  
    {
    this.dataHeader = [
      { field: 'EMIS_ID', header: 'Student ID', widthstyle: '6em' },
     { field: 'Name', header: 'Name' , widthstyle: '7em'},
     { field: 'Class', header: 'Class', widthstyle: '4em' },
     { field: 'Section', header: 'Section', widthstyle: '5em'}];
    }
  } 
   
  }
  getstudenttransferdata() {
    const schoolid = this.schoolId;
    this.schoolService.getstudenttransferdata(schoolid).subscribe((res) => {
      console.log("studentdata",res)
    if (res != 0) {
      this.tranferstudentdata = res.data;
    this.Studenttranferlength = +this.tranferstudentdata.length;
      console.log("LeStudenttranferlengthngth "+this.tranferstudentdata.length); 
    } else {
      this.noDataFound = true;
    }
  });
}

getstudenttranferdata(){
  this.exportExcelData = [];
  this.tranferstudentdata.map(item => {
    return {
      'EMIS_ID': item.EMIS_ID,
      'Name': item.Name,
      'Class': item.Class,
      'Section': item.Section,
      }
       }).forEach(item => this.exportExcelData.push(item));
       let tranferstudent = [];
       for(let tranferstudentinfo of this.exportExcelData) {
        tranferstudent.push(tranferstudentinfo);
       }
       return tranferstudent;
 }

 ExportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getstudenttranferdata());
      const workbook = { Sheets: { 'Tranfer Student Information' : worksheet }, SheetNames: ['Tranfer Student Information'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFilestate(excelBuffer, this.schoolId +' (Tranfer Student Information) ');
  });
}

saveAsExcelFilestate(buffer: any, fileName: string): void {
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


