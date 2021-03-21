import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-student-summary',
  templateUrl: './student-summary.component.html',
  styleUrls: ['./student-summary.component.css']
})
export class StudentSummaryComponent implements OnInit {
  schoolId: number;
  data: any[] = [];
  data1: any[] = [];
  selectedColumns: any[] = [];
  selectedColumns1: any[] = [];
  sampleSelectedColumn1: Array<Object> = [];
  isDataAvailable: boolean;
  sampleSelectedColumn: Array<Object> = [];
  exportExcelData: any[];
  saveAsExcelFile: any;
  tot_boys: number;
  tot_girls: number;
  tot_boys1: number;
  tot_girls1: number;
  tot_boysgirls: number;
  tot_boysgirls1: number;
  cateType: any;
  origin: void[];


  constructor(private userSessionService: UserSessionService,
    private registersService: schoolsService) {
    this.schoolId = this.userSessionService.schoolId();
    this.cateType = this.userSessionService.cateType();
  }

  ngOnInit() {
    this.headerData();
    this.getData();
    this.getData1();
  }
  headerData() {
    this.selectedColumns = [
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'edu_med', header: 'Medium' },
      { field: 'teacher_name', header: 'Class Teacher' },
      { field: 'male', header: 'Boys' },
      { field: 'Female', header: 'Girls' },

    ];
    this.selectedColumns1 = [
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'grp', header: 'Group' },
      { field: 'edu_med', header: 'Medium' },
      { field: 'male', header: 'Boys' },
      { field: 'Female', header: 'Girls' },

    ];
    this.sampleSelectedColumn = this.selectedColumns;
    this.sampleSelectedColumn1 = this.selectedColumns1;
  }

  getData() {
    debugger;
    this.registersService.getstudentdata(this.schoolId).subscribe((res) => {
      if (res) {
        this.data = res.result;
        this.data.map(item => {
          item.total = (Number(item.boys) + Number(item.girls));
        });
      }
      this.tot_boys = this.data.map(c => c.boys === '' ? 0 : Number(c.boys)).reduce((sum, current) => sum + current);
      this.tot_girls = this.data.map(c => c.girls === '' ? 0 : Number(c.girls)).reduce((sum, current) => sum + current);
      this.tot_boysgirls = this.data.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
      //  if(this.data.length > 0) {
      //    this.isDataAvailable = true;
      //  }
      //  else {
      //   this.isDataAvailable = false;
      //  }

    });

  }
  getData1() {
    debugger;
    this.registersService.gethrschool(this.schoolId).subscribe((res) => {
      if (res) {
        this.data1 = res.result;
        this.data1.map(item => {
          item.total = (Number(item.male) + Number(item.Female));
        });
      }
      this.tot_boys1 = this.data1.map(c => c.male === '' ? 0 : Number(c.male)).reduce((sum, current) => sum + current);
      this.tot_girls1 = this.data1.map(c => c.Female === '' ? 0 : Number(c.Female)).reduce((sum, current) => sum + current);
      this.tot_boysgirls1 = this.data1.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);

      //  if(this.data.length > 0) {
      //    this.isDataAvailable = true;
      //  }
      //  else {
      //   this.isDataAvailable = false;
      //  }
      // }
    });

  }

  getschoolsummary() {
    this.exportExcelData = [];
    this.data.map(item => {
      return {
        'Class': item.class_id ,
        'Section': item.section,
        'Medium': item.Medium,
        'Class Teacher': item.teacher_name,
        'Boys': item.boys,
        'Girls': item.girls,
        'Total': item.total,

      }
    }).forEach(item => this.exportExcelData.push(item));
    let schoolwithoutdatastate = [];
    for (let schoolwithoutdata of this.exportExcelData) {
      schoolwithoutdatastate.push(schoolwithoutdata);
    }
    return schoolwithoutdatastate;
  }

  ExportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschoolsummary());
      const workbook = { Sheets: { 'student-summary': worksheet }, SheetNames: ['student-summary'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFilestate(excelBuffer, this.schoolId + ' (student-summary) ');
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
  getschoolsummarygroup() {
    this.exportExcelData = [];
    this.data1.map(item => {
      return {
        'Class': item.class_studying_id,
        'Section': item.class_section,
        'Group': item.grp,
        'Medium': item.edu_med,
        'Boys': item.male,
        'Girls': item.Female,
        'Total': item.total,
      }

    }).forEach(item => this.exportExcelData.push(item));
    let schoolwithoutdatastate = [];
    for (let schoolwithoutdata of this.exportExcelData) {
      schoolwithoutdatastate.push(schoolwithoutdata);
    }
    return schoolwithoutdatastate;
  }

  ExportExcelgroup() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschoolsummarygroup());
      const workbook = { Sheets: { 'student-summary': worksheet }, SheetNames: ['student-summary'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFilegroup(excelBuffer, this.schoolId + ' (student-summary) ');
    });
  }

  saveAsExcelFilegroup(buffer: any, fileName: string): void {
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
