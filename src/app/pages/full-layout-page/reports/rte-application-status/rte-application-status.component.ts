import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-rte-application-status',
  templateUrl: './rte-application-status.component.html',
  styleUrls: ['./rte-application-status.component.css']
})
export class RteApplicationStatusComponent implements OnInit {
  pageStage: number;
  applicationStatus: any;
  applicationStatuss: any;
  applicationStateStatus: any;
  districtId: any;
  usertypeId: any;
  noDataFound = false;
  exportExcelData: any[];

  constructor(public reportsService: ReportsService, private userSessionService: UserSessionService ) {
    debugger
    this.usertypeId = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
  }

  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'udise_code', header: 'udise_code', widthstyle: '12em'},
      { field: 'school_name', header: 'Address', widthstyle: '10em'},
      { field: 'management', header: 'Category', widthstyle: '12em'},
      { field: 'intake_capacity', header: 'Verifi Status', widthstyle: '10em'},
    ];

  ngOnInit() {
   // this.districtId = this.userSessionService.districtId();
   this.getapplicationStatus();
    this.getapplicationStateStatus();
  }

  getapplicationStatus() {
    // const distrctID = this.districtId;
    this.reportsService.applicationStatus(this.districtId).subscribe((data) => {
      this.applicationStatus =  data.result.Application_status;
      if (this.applicationStatus.length > 0) {
        this.applicationStatuss = this.applicationStatus;
        console.log(this.applicationStatuss);
      } else {
        this.noDataFound = true;
      }
    });
  }

  getapplicationStateStatus() { 
    debugger
    this.reportsService.applicationStateStatus().subscribe((data) => {
      this.applicationStatus =  data.result.Application_status;
      if (this.applicationStatus.length > 0) {
        this.applicationStateStatus = this.applicationStatus;
        console.log(this.applicationStateStatus,"stte");
      } else {
        this.noDataFound = true;
      }
    });
  }



// Excelfiledownload
getRteData(){
  debugger
  this.exportExcelData = [];
  this.applicationStatuss.map(item => {
    return {
      'UDISE CODE': item.udise_code,
      'Student Name': item.school_name,
      'Management': item.management,
      'Intake capacity': item.intake_capacity,
      'WS-Received': item.Received_WS,
      'DG-Received': item.Received_DG,
      'DGS-Received': item.Received_DGS,
      'Total-Received': ( item.Received_WS* 1 ) + ( item.Received_DG* 1 ) + ( item.Received_DGS* 1 ),
      'WS-Approved-': item.Verified_WS,
      'DG-Approved': item.Verified_DG,
      'DGS-Approved': item.Verified_DGS,
      'Total-Approved': ( item.Verified_WS* 1 ) + ( item.Verified_DG* 1 ) + ( item.Verified_DGS* 1 ),
      'WS-alloted seat-': item.Allotted_WS,
      'DG-alloted seat': item.Allotted_DG,
      'DGS-alloted seat': item.Allotted_DGS,
      'Total-alloted seat': ( item.Allotted_WS* 1 ) + ( item.Allotted_DG* 1 ) + ( item.Allotted_DGS* 1 ),
      'WS-Admitted': item.Admit_WS,
      'DG-Admitted': item.Admit_DG,
      'DGS-Admitted': item.Admit_DGS,
      'Total-Admitted ': ( item.Admit_WS* 1 ) + ( item.Admit_DG* 1 ) + ( item.Admit_DGS* 1 ),
       } 
       }).forEach(item => this.exportExcelData.push(item));
       let Rtestudentlist = [];
       for(let studentlist of this.exportExcelData) {
        Rtestudentlist.push(studentlist);
       }
       return Rtestudentlist;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getRteData());
      const workbook = { Sheets: { 'RTE Students List' : worksheet }, SheetNames: ['RTE Students List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,'(RTE Students List)');
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

//stateExcel
exportStateExcel(data)
{
  import("xlsx").then(xlsx => {
  const worksheet = xlsx.utils.json_to_sheet((data));
  const workbook = { Sheets: { 'RTE-Application List' : worksheet }, SheetNames: ['RTE-Application List'] };
  const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer,'(RTE-Application List)');
});
}
saveAsExcelFile1(buffer: any, fileName: string): void {
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
