import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-smc-uploadreport',
  templateUrl: './smc-uploadreport.component.html',
  styleUrls: ['./smc-uploadreport.component.css']
})
export class SmcUploadreportComponent implements OnInit {
  userTypeID: any;
  districtId: any;
  userId: number;
  smcuploadreport: any;
  BlockOption: any[] = [];
  brtelogin: boolean;
  statelogin:  boolean;
  exportExcelData: any[];
  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
    this.userId = this.userSessionService.userId();
  }

  ngOnInit() {
    if (this.userTypeID == 14 )
    {
      this.getBlockApi();
      this.getsmcuploaddata();
     this.brtelogin = true;
    }
    else 
    {
      this.statelogin = true;
      this.getsmcuploaddata();
    }
  }
  smc: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'District', header: 'District',widthstyle: '13em'},
  { field: 'Block', header: 'Block',widthstyle: '10em'},
  { field: 'UDISE', header: 'UDISE Code',widthstyle: '10em'},
  { field: 'School', header: 'School',widthstyle: '30em'},
  { field: 'School_type', header: 'School Type',widthstyle: '15em'},
  { field: 'Category', header: 'Category',widthstyle: '15em'},
  { field: 'file_type1', header: 'Resolution',widthstyle: '15em'},
  { field: 'file_type2', header: 'Action Plan',widthstyle: '15em'}];

  smcbrte: Array<{'field':string,'header':string,'widthstyle':string}> =
  [
  { field: 'UDISE', header: 'UDISE Code',widthstyle: '15em'},
  { field: 'School', header: 'School',widthstyle: '30em'},
  { field: 'School_type', header: 'School Type',widthstyle: '15em'},
  { field: 'Category', header: 'Category',widthstyle: '15em'},
  { field: 'file_type1', header: 'Resolution',widthstyle: '15em'},
  { field: 'file_type2', header: 'Action Plan',widthstyle: '15em'}];
  
  getsmcuploaddata() {
    this.reportsService.getsmcuploadreport().subscribe((data) => {
      this.smcuploadreport = data.result;
  });
}
getBlockApi() {
  this.reportsService.BlockApi().subscribe((data) => {
      this.BlockOption = data.blockList.map(list => { return { label: list.block_name, value: list.block_id } });
    });
      }

OnBlockChange(block_id) {

  var blockId = block_id;

  var data = {"records":
  {"block_id":blockId}
  }
     this.reportsService.getsmcuploadreport1(data).subscribe((data) => {
      this.smcuploadreport = data.result;
  });
}
// Getimageuploaddatastate
getsmcreport(){
  this.exportExcelData = [];
  this.smcuploadreport.map(item => {
    return {
      'District': item.District,
      'Block': item.Block,
      'UDISE Code': item.UDISE,
      'School': item.School,
      'School Type': item.School_type,
      'Category': item.Category,
      'Resolution': item.file_type1,
      'Action Plan': item.file_type2,
      }
       }).forEach(item => this.exportExcelData.push(item));
       let SMCData = [];
       for(let smcreport of this.exportExcelData) {
        SMCData.push(smcreport);
       }
       return SMCData;
 }

 ExportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getsmcreport());
      const workbook = { Sheets: { 'SMC Resolution Report' : worksheet }, SheetNames: ['SMC Resolution Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFilestate(excelBuffer, ' (SMC Resolution Report) ');
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
