import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-special-cash-incentive',
  templateUrl: './special-cash-incentive.component.html',
  styleUrls: ['./special-cash-incentive.component.css']
})
export class SpecialCashIncentiveComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  schoolCode: string;
  public noDataFound = false;
  userTypeID: number;
  districtId: any;
  schoolwithoutdata: any;
  school_type: { label: string; value: string; }[];
  arrString: any;
  school_type_get_val: any;
  exportExcelData: any;
  statelogin: boolean;
  ceologin: boolean = false ;
  school_type1: { label: string; value: string; }[];
  schoolwithoutdatastate: any;
  schooltypedropvalue: { label: string; value: number; }[];
  schooltypedropvaluestate: { label: string; value: number; }[];
  schooltype: any;
  twelth_tot: any;
  cash_received: any;
  cash_notreceived: any;

  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
  }

  ngOnInit() {
    this.schooltype =1,2,4;
    const districtId = this.userSessionService.districtId();
    if (this.userTypeID == 5 )
    {
    this.statelogin = true;
    this.getspecialcashsensitivestate();
      this.schooltypedropvaluestate = [
        {label: 'Government', value: 1},
        {label: 'Fully Aided', value: 2},
        {label: 'Un-aided', value: 3},
        {label: 'Partially Aided', value: 4},
        {label: 'Central Government', value: 5},
      ];  
    {
    this.dataHeader = 
    [
      { field: 'district_name', header: 'District Name', widthstyle: '5em' },
     { field: 'c12_ttl', header: 'Students in 12th' , widthstyle: '5em'},
     { field: 'c12_cash_rcvd_ttl', header: 'Details Updated For', widthstyle: '5em' },
     { field: 'c12_cash_not_rcvd_ttl', header: 'Pending', widthstyle: '5em' },];
    }
  } 
   if (this.userTypeID == 9 || this.userTypeID == 3) {
    this.ceologin=true;
    this.getspecialcashsensitive();
    this.schooltypedropvalue = [    
         {label: 'Government', value: 1},
        {label: 'Fully Aided', value: 2},
        //  {label: 'Un-aided', value: 3},
         {label: 'Partially Aided', value: 4},
        //  {label: 'Central Government', value: 5},
      ]; 
      this.dataHeader = [
        {field: 'udise_code', header: 'UDISE Code', widthstyle: '5em' },
        { field: 'school_name', header: 'School Name', widthstyle: '8em' },
       { field: 'school_type', header: 'School Type', widthstyle: '4em' },
       { field: 'c12_ttl', header: 'Students in 12 th ', widthstyle: '5em' },
       { field: 'c12_cash_rcvd_ttl', header: 'Details Updated for', widthstyle: '5em'},
       { field: 'c12_cash_not_rcvd_ttl', header: 'Pending', widthstyle: '3em'},
      ];
   }
  }
  getspecialcashsensitivestate() {
    this.schooltype =1,2,4;
    const schooltype = this.schooltype;
    this.reportsService.getspecialcashsensitive(schooltype).subscribe((data) => {
    if (data != 0) {
      this.schoolwithoutdatastate = data.result;
      this.schoolwithoutdatastate.map(item => {item.total = (Number(item.c12_ttl) + Number(item.c12_cash_rcvd_ttl) + Number(item.c12_cash_not_rcvd_ttl));
      });
      this.twelth_tot = this.schoolwithoutdatastate.map(c => c.c12_ttl === '' ? 0 : Number(c.c12_ttl)).reduce((sum, current) => sum + current);
      this.cash_received = this.schoolwithoutdatastate.map(c => c.c12_cash_rcvd_ttl === '' ? 0 : Number(c.c12_cash_rcvd_ttl)).reduce((sum, current) => sum + current);
      this.cash_notreceived = this.schoolwithoutdatastate.map(c => c.c12_cash_not_rcvd_ttl === '' ? 0 : Number(c.c12_cash_not_rcvd_ttl)).reduce((sum, current) => sum + current);
      
    }
    else {
      this.noDataFound = true;
    }
  });
}
SchoolTypeOptionstate (event){
  let schooltype = event.value ;
  this.reportsService.getspecialcashsensitive(schooltype).subscribe((data) => {
    if(data != 0){
      this.schoolwithoutdatastate = data.result;
      this.schoolwithoutdatastate.map(item => {item.total = (Number(item.c12_ttl) + Number(item.c12_cash_rcvd_ttl) + Number(item.c12_cash_not_rcvd_ttl));
      });
      this.twelth_tot = this.schoolwithoutdatastate.map(c => c.c12_ttl === '' ? 0 : Number(c.c12_ttl)).reduce((sum, current) => sum + current);
      this.cash_received = this.schoolwithoutdatastate.map(c => c.c12_cash_rcvd_ttl === '' ? 0 : Number(c.c12_cash_rcvd_ttl)).reduce((sum, current) => sum + current);
      this.cash_notreceived = this.schoolwithoutdatastate.map(c => c.c12_cash_not_rcvd_ttl === '' ? 0 : Number(c.c12_cash_not_rcvd_ttl)).reduce((sum, current) => sum + current);
    
      this.noDataFound = false;
    }
    else{
      this.noDataFound = true;
    }
  })
}

getspecialcashsensitive() {
  this.schooltype =1,2,4;
      this.reportsService.getspecialcashsensitive(this.schooltype).subscribe((data) => {
        if (data != 0) {
          this.noDataFound = false;
        this.schoolwithoutdata = data.result;
        this.schoolwithoutdata.map(item => {item.total = (Number(item.c12_ttl) + Number(item.c12_cash_rcvd_ttl) + Number(item.c12_cash_not_rcvd_ttl));
        });
        this.twelth_tot = this.schoolwithoutdata.map(c => c.c12_ttl === '' ? 0 : Number(c.c12_ttl)).reduce((sum, current) => sum + current);
        this.cash_received = this.schoolwithoutdata.map(c => c.c12_cash_rcvd_ttl === '' ? 0 : Number(c.c12_cash_rcvd_ttl)).reduce((sum, current) => sum + current);
        this.cash_notreceived = this.schoolwithoutdata.map(c => c.c12_cash_not_rcvd_ttl === '' ? 0 : Number(c.c12_cash_not_rcvd_ttl)).reduce((sum, current) => sum + current);
        
      } else {
        this.noDataFound = true;
      }
    });
}
// on select  school type value
SchoolTypeOption (event){
  let schooltype = event.value ;
  this.reportsService.getspecialcashsensitive(schooltype).subscribe((data) => {
    let dropDownList = data.result;
    if (data != 0) {
      this.noDataFound = false;
      this.schoolwithoutdata = data.result;
      this.schoolwithoutdata.map(item => {item.total = (Number(item.c12_ttl) + Number(item.c12_cash_rcvd_ttl) + Number(item.c12_cash_not_rcvd_ttl));
      });
      this.twelth_tot = this.schoolwithoutdata.map(c => c.c12_ttl === '' ? 0 : Number(c.c12_ttl)).reduce((sum, current) => sum + current);
      this.cash_received = this.schoolwithoutdata.map(c => c.c12_cash_rcvd_ttl === '' ? 0 : Number(c.c12_cash_rcvd_ttl)).reduce((sum, current) => sum + current);
      this.cash_notreceived = this.schoolwithoutdata.map(c => c.c12_cash_not_rcvd_ttl === '' ? 0 : Number(c.c12_cash_not_rcvd_ttl)).reduce((sum, current) => sum + current);
      
    }
    else{
      this.noDataFound = true;
    }
  })
}
getschooldata(){
  this.exportExcelData = [];
  this.schoolwithoutdata.map(item => {
    return {
      'UDISE code': item.udise_code,
      'School Name': item.school_name,
      'School Type': item.school_type,
      'Students in 12th': item.c12_ttl,
      'Details Updated For': item.c12_cash_rcvd_ttl,
      'Pending': item.c12_cash_not_rcvd_ttl,
    
       } 
  
       }).forEach(item => this.exportExcelData.push(item));
       let teacherreportacademic = [];
       for(let acdamicreport of this.exportExcelData) {
        teacherreportacademic.push(acdamicreport);
       }
       return teacherreportacademic;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschooldata());
      const workbook = { Sheets: { 'Special Cash Incentive report' : worksheet }, SheetNames: ['Special Cash Incentive report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (Special Cash Incentive report) ');
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
getschooldatastate(){
  this.exportExcelData = [];
  this.schoolwithoutdatastate.map(item => {
    return {
      'District Name': item.district_name,
      'Students in 12th': item.c12_ttl,
      'Details Updated For': item.c12_cash_rcvd_ttl,
      'Pending': item.c12_cash_not_rcvd_ttl,
     
      }
     
       }).forEach(item => this.exportExcelData.push(item));
       let schoolwithoutdatastate = [];
       for(let schoolwithoutdata of this.exportExcelData) {
        schoolwithoutdatastate.push(schoolwithoutdata);
       }
       return schoolwithoutdatastate;
 }

 ExportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschooldatastate());
      const workbook = { Sheets: { 'Special Cash Incentive report' : worksheet }, SheetNames: ['Special Cash Incentive report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (Special Cash Incentive report) ');
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