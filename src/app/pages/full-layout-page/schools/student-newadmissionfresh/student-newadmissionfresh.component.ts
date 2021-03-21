import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-student-newadmissionfresh',
  templateUrl: './student-newadmissionfresh.component.html',
  styleUrls: ['./student-newadmissionfresh.component.css']
})
export class StudentNewadmissionfreshComponent implements OnInit {

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
  freshstudentdata: any;

  constructor(private router: Router, private schoolService:schoolsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    {
    this.getfreshstudentdata();  
    {
    this.dataHeader = [
      { field: 'EMIS_ID', header: 'Student ID', widthstyle: '8em' },
      { field: 'Name', header: 'Name' , widthstyle: '7em'},
      { field: 'gender', header: 'Gender', widthstyle: '4em' },
      { field: 'Class', header: 'Class', widthstyle: '4em' },
      { field: 'Section', header: 'Section', widthstyle: '4em'}];
    }
  } 
   
  }
  getfreshstudentdata() {
    const schoolid = this.schoolId;
    this.schoolService.getfreshstudentdata(schoolid).subscribe((res) => {
    if (res != 0) {
      this.freshstudentdata = res.data;
    } else {
      this.noDataFound = true;
    }
  });
}

getstudentfreshdata(){
  this.exportExcelData = [];
  this.freshstudentdata.map(item => {
    return {
      'EMIS_ID': item.EMIS_ID,
      'Name': item.Name,
      'gender': item.gender,
      'Class': item.Class,
      'Section': item.Section,
      }
       }).forEach(item => this.exportExcelData.push(item));
       let studentfreshdata = [];
       for(let studentdata of this.exportExcelData) {
        studentfreshdata.push(studentdata);
       }
       return studentfreshdata;
 }

 ExportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getstudentfreshdata());
      const workbook = { Sheets: { 'Fresh Student information' : worksheet }, SheetNames: ['Fresh Student information'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFilestate(excelBuffer, this.schoolId +' (Fresh Student information) ');
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



