import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

@Component({
  selector: 'app-rte-typewise-application',
  templateUrl: './rte-typewise-application.component.html',
  styleUrls: ['./rte-typewise-application.component.css']
})
export class RteTypewiseApplicationComponent implements OnInit {
  pageStage: number;
  typeWiseapplicationStatus: any;
  typeWiseapplicationStatuss: any;
  typeWiseapplicationStateStatus: any;
  districtId: any;
  usertypeId: any;
  noDataFound = false;
  exportExcelData: any[];
  WS : any;
  DG_BC : any;
  DG_MBC : any;
  DG_SC : any;
  DG_ST: any;
  DG_SCA : any;
  DGS_Orphan: any;
  DGS_DA: any;
  DGS_Scav: any;
  DGS_Trans: any;
  DGS_HIV: any;
  DG_DNC: any;
  constructor(public reportsService: ReportsService, private userSessionService: UserSessionService ) {
    this.districtId = this.userSessionService.districtId();
  }

  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'udise_code', header: 'udise_code', widthstyle: '12em'},
      { field: 'school_name', header: 'Address', widthstyle: '10em'},
      { field: 'management', header: 'Category', widthstyle: '12em'},
      { field: 'intake_capacity', header: 'Verifi Status', widthstyle: '10em'},
    ];

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    this.usertypeId = this.userSessionService.userTypeId();
    this.getapplicationStatus();
    this.getapplicationStateStatus();
  }

  getapplicationStatus() {
    const distrctID = this.districtId;
    this.reportsService.typeWiseApplicationStatus(distrctID).subscribe((data) => {
      this.typeWiseapplicationStatus =  data.result.Type_wise_application;
      if (this.typeWiseapplicationStatus.length > 0) {
        this.typeWiseapplicationStatuss = this.typeWiseapplicationStatus;
        console.log(this.typeWiseapplicationStatuss);

        this.WS = this.typeWiseapplicationStatuss.map(c => c.WS === '' ? 0 : Number(c.WS)).reduce((sum, current) => sum + current);
        this.DG_BC = this.typeWiseapplicationStatuss.map(c => c.DG_BC === '' ? 0 : Number(c.DG_BC)).reduce((sum, current) => sum + current);
        this.DG_MBC = this.typeWiseapplicationStatuss.map(c => c.DG_MBC === '' ? 0 : Number(c.DG_MBC)).reduce((sum, current) => sum + current);
        this.DG_SC = this.typeWiseapplicationStatuss.map(c => c.DG_SC === '' ? 0 : Number(c.DG_SC)).reduce((sum, current) => sum + current);
        this.DG_ST = this.typeWiseapplicationStatuss.map(c => c.DG_ST === '' ? 0 : Number(c.DG_ST)).reduce((sum, current) => sum + current);
        this.DG_SCA = this.typeWiseapplicationStatuss.map(c => c.DG_SCA === '' ? 0 : Number(c.DG_SCA)).reduce((sum, current) => sum + current);
        this.DG_DNC = this.typeWiseapplicationStatuss.map(c => c.DG_DNC === '' ? 0 : Number(c.DG_DNC)).reduce((sum, current) => sum + current);
        this.DGS_Orphan = this.typeWiseapplicationStatuss.map(c => c.DGS_Orphan === '' ? 0 : Number(c.DGS_Orphan)).reduce((sum, current) => sum + current);
        this.DGS_DA = this.typeWiseapplicationStatuss.map(c => c.DGS_DA === '' ? 0 : Number(c.DGS_DA)).reduce((sum, current) => sum + current);
        this.DGS_Scav = this.typeWiseapplicationStatuss.map(c => c.DGS_Scav === '' ? 0 : Number(c.DGS_Scav)).reduce((sum, current) => sum + current);
        this.DGS_Trans = this.typeWiseapplicationStatuss.map(c => c.DGS_Trans === '' ? 0 : Number(c.DGS_Trans)).reduce((sum, current) => sum + current);
        this.DGS_HIV = this.typeWiseapplicationStatuss.map(c => c.DGS_HIV === '' ? 0 : Number(c.DGS_HIV)).reduce((sum, current) => sum + current);

      } else {
        this.noDataFound = true;
      }
    });
  }

  getapplicationStateStatus() {
    this.reportsService.typeWiseapplicationStateStatus().subscribe((data) => {
      this.typeWiseapplicationStatus =  data.result.Type_wise_application;
      if (this.typeWiseapplicationStatus.length > 0) {
        this.typeWiseapplicationStateStatus = this.typeWiseapplicationStatus;

        this.WS = this.typeWiseapplicationStateStatus.map(c => c.WS === '' ? 0 : Number(c.WS)).reduce((sum, current) => sum + current);
this.DG_BC = this.typeWiseapplicationStateStatus.map(c => c.DG_BC === '' ? 0 : Number(c.DG_BC)).reduce((sum, current) => sum + current);
this.DG_MBC = this.typeWiseapplicationStateStatus.map(c => c.DG_MBC === '' ? 0 : Number(c.DG_MBC)).reduce((sum, current) => sum + current);
this.DG_SC = this.typeWiseapplicationStateStatus.map(c => c.DG_SC === '' ? 0 : Number(c.DG_SC)).reduce((sum, current) => sum + current);
this.DG_ST = this.typeWiseapplicationStateStatus.map(c => c.DG_ST === '' ? 0 : Number(c.DG_ST)).reduce((sum, current) => sum + current);
this.DG_SCA = this.typeWiseapplicationStateStatus.map(c => c.DG_SCA === '' ? 0 : Number(c.DG_SCA)).reduce((sum, current) => sum + current);
this.DG_DNC = this.typeWiseapplicationStateStatus.map(c => c.DG_DNC === '' ? 0 : Number(c.DG_DNC)).reduce((sum, current) => sum + current);
this.DGS_Orphan = this.typeWiseapplicationStateStatus.map(c => c.DGS_Orphan === '' ? 0 : Number(c.DGS_Orphan)).reduce((sum, current) => sum + current);
this.DGS_DA = this.typeWiseapplicationStateStatus.map(c => c.DGS_DA === '' ? 0 : Number(c.DGS_DA)).reduce((sum, current) => sum + current);
this.DGS_Scav = this.typeWiseapplicationStateStatus.map(c => c.DGS_Scav === '' ? 0 : Number(c.DGS_Scav)).reduce((sum, current) => sum + current);
this.DGS_Trans = this.typeWiseapplicationStateStatus.map(c => c.DGS_Trans === '' ? 0 : Number(c.DGS_Trans)).reduce((sum, current) => sum + current);
this.DGS_HIV = this.typeWiseapplicationStateStatus.map(c => c.DGS_HIV === '' ? 0 : Number(c.DGS_HIV)).reduce((sum, current) => sum + current);

      } else {
        this.noDataFound = true;
      }
    });
  }




// Excelfiledownload
getRteData(){
  this.exportExcelData = [];
  this.typeWiseapplicationStatuss.map(item => {
    return {
      'UDISE CODE': item.udise_code,
      'Student Name': item.school_name,
      'Management': item.management,
      'Weaker Section': item.WS,
      'BC-Disadvantaged': item.DG_BC,
      'MBC-Disadvantaged': item.DG_MBC,
      'SC-Disadvantaged': item.DG_SC,
      'ST-Disadvantaged': item.DG_ST,
      'SCA-Disadvantaged-': item.DG_SCA,
      'DNC-Disadvantaged': item.DG_DNC,
      'Orphan-Special-Disadvantaged': item.DGS_Orphan,
      'Differently-Abled-Special-Disadvantaged': item.DGS_DA,
      'Child of Scavenger-Special-Disadvantaged': item.DGS_Scav,
      'Transgender-Special-Disadvantaged': item.DGS_Trans,
      'HIV-Special-Disadvantaged': item.DGS_HIV,
      // 'Total': item.pre_kg + item.lkg + item.ukg + item.c1 + item.c2+ item.c3+ item.c4+ item.c5+ item.c6+ item.c7+ item.c8,
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
}
