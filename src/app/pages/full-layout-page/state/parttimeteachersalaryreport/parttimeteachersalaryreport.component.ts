
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-parttimeteachersalaryreport',
  templateUrl: './parttimeteachersalaryreport.component.html',
  styleUrls: ['./parttimeteachersalaryreport.component.css']
})

export class ParttimeteachersalaryreportComponent implements OnInit {

  public dataHeader: any;
  partimeteacher: any[] = [];
  userTypeID: number;
  monthfilterdd: number = 0;
  rptFlag : number = 1;
  pageTitle : string = "PT Staff Report-District wise";
  paginator: boolean = false ;
  rows : any = "0";
  cloned: { [s: string]: any; } = {};
  pipe = new DatePipe('en-US');
  lastArr : any = {};
  exportExcelData:any[]=[];


  monthList: Array<{'value': number, 'label': string}> =  [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }];


  constructor(private router: Router, private reportsService: StateService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
  }

  ngOnInit() {
    
    this.dataHeader = [{ field: 'dynCol', header: 'District' ,widthstyle: '14em'},
     { field: 'PT_Teachers', header: 'Part Time Teachers', widthstyle: '4em' },
     { field: 'Paid', header: 'Paid', widthstyle: '4em'},
     { field: 'Not_Paid', header: 'Not Paid', widthstyle: '4em' },
     { field: 'Not_Updated', header: 'Not Updated', widthstyle: '4em'}];
   
   let currMonth = this.pipe.transform(new Date(),'M');
   this.monthfilterdd = Number(currMonth)-1;
   this.monthfilterdd = this.monthfilterdd == 0 ? 12 : this.monthfilterdd;
   this.drill_to_nxt(this.monthfilterdd,'',this.rptFlag);
  }



getparttimeteachersalaryreport(val){
  // console.log(this.lastArr);
  this.drill_to_nxt(val,this.lastArr,Number(this.rptFlag-1));
}

drill_to_nxt(month,rowdata,flag) {
  if(flag == 1){
    this.rptFlag = 2;
    this.lastArr = {};
    this.partimeteacher = [];
    this.dataHeader[0]['header']= 'District',{widthstyle: '15em'};           
    var params = '?month='+month;
    // console.log(params,rowdata);
    this.reportsService.getStatePtStaffReport(params).subscribe(
      (res) => { if(res.dataStatus == true) {              
        if (res.ptStaffPaidedWiseReportList.length > 0) {
          this.partimeteacher = res.ptStaffPaidedWiseReportList;
          this.partimeteacher.map(item => {item.Not_Updated = (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1;
            item.dynCol = item.district_name;
          });
          // console.log('parttimeteacher - ',this.rptFlag, this.partimeteacher);
        } else {
          console.log(res.message);
        }}else{
          console.log(res.message);
        }
        },(err)=>console.error(err));

  }
  else if(flag == 2){
    this.rptFlag = 3;
    this.partimeteacher = [];
    this.dataHeader[0]['header']= 'Block';      
    var params = '?month='+month+'&district='+rowdata.district_id;
    // console.log(params,rowdata);
    this.lastArr = {'district_id':rowdata.district_id,'district_name':rowdata.district_name};
    this.pageTitle = "PT Staff - "+rowdata.district_name+"`s Report";
    // this.paginator = true ;
    // this.rows = "10"; 
    this.reportsService.getStatePtStaffReport(params).subscribe(
      (res) => { if(res.dataStatus == true) {              
                  if(res.ptStaffPaidedWiseReportList.length > 0) {
                    this.partimeteacher = res.ptStaffPaidedWiseReportList;
                    this.partimeteacher.map(item => {item.Not_Updated = (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1;
                                                     item.dynCol = item.block_name;
                                            });
                    // console.log('parttimeteacher - ',this.rptFlag, this.partimeteacher);
                  } else {
                    console.log(res.message);
                  }}
                  else{
                    console.log(res.message);
                 }
               },(err)=>console.error(err));
  }
  else if(flag == 3){
    this.rptFlag = 4;
    this.partimeteacher = [];
    this.dataHeader[0]['header']= 'Udise Code';      
    this.dataHeader.splice(1, 0, { field: 'school_name', header: 'School' ,widthstyle: '8em'});
    this.dataHeader.splice(2, 0, { field: 'school_type', header: 'School Type' ,widthstyle: '8em'});
    this.pageTitle = "PT Staff - "+rowdata.block_name+"`s Report";
    this.lastArr = {'block_id':rowdata.block_id,'block_name':rowdata.block_name};
    // this.paginator = true ;
    // this.rows = "10"; 
    var params = '?month='+month+'&block='+rowdata.block_id;
    // console.log(params,rowdata);
    this.reportsService.getStatePtStaffReport(params).subscribe(
      (res) => { if(res.dataStatus == true) {              
                  if(res.ptStaffPaidedWiseReportList.length > 0) {
                    this.partimeteacher = res.ptStaffPaidedWiseReportList;
                    this.partimeteacher.map(item => {item.Not_Updated = (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1;
                      item.dynCol = item.udise_code;
                    });
                    // console.log('parttimeteacher - ',this.rptFlag, this.partimeteacher);
                  } else {
                    console.log(res.message);
                  }}
                  else{
                    console.log(res.message);
                 }
               },(err)=>console.error(err));
  }
 
}

getparttimesalary() {
  this.exportExcelData = [];
  let flag = Number(this.rptFlag-1);
  if(flag == 1){  
    this.partimeteacher.map(item => {
    return {
      'District Name': item.district_name,
      'Part Time Teachers': item.PT_Teachers,
      'Paid': item.Paid,
      'Not Paid': item.Not_Paid,
      'Not Updated': (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1
       }
}).forEach(item => this.exportExcelData.push(item));
let staffs = [];
for(let Teacherssalary of this.exportExcelData) {
  staffs.push(Teacherssalary);
}
return staffs;
}else if(flag == 2){
this.partimeteacher.map(item => {
    return {
      // 'District Name': item.district_name,
      'Block Name': item.block_name,
      'Part Time Teachers': item.PT_Teachers,
      'Paid': item.Paid,
      'Not Paid': item.Not_Paid,
      'Not Updated': (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1
       }
}).forEach(item => this.exportExcelData.push(item));
let staffs = [];
for(let Teacherssalary of this.exportExcelData) {
  staffs.push(Teacherssalary);
}
return staffs;
}else if(flag == 3){
  this.partimeteacher.map(item => {
    return {
      'Udise Code': item.udise_code,
      // 'District Name': item.district_name,
      // 'Block Name': item.block_name,
      'School Name':item.school_name,
      'School Type':item.school_type,
      'Part Time Teachers': item.PT_Teachers,
      'Paid': item.Paid,
      'Not Paid': item.Not_Paid,
      'Not Updated': (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1
       }
}).forEach(item => this.exportExcelData.push(item));
let staffs = [];
for(let Teacherssalary of this.exportExcelData) {
  staffs.push(Teacherssalary);
}
return staffs;
}
}

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getparttimesalary());
      const workbook = { Sheets: { 'Part time salary list' : worksheet }, SheetNames: ['Part time salary list'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.pageTitle);
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
