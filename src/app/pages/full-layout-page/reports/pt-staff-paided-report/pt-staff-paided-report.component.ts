import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pt-staff-paided-report',
  templateUrl: './pt-staff-paided-report.component.html',
  styleUrls: ['./pt-staff-paided-report.component.css']
})
export class PtStaffPaidedReportComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  schoolCode: string;
  public noDataFound = false;
  partimeteacher: any;
  ceodistrictlogin = false;
  userTypeID: number;
  districtId: any;
  blockId:any;
  monthfilterdd: number = 0;
  cloned: { [s: string]: any; } = {};
  pipe = new DatePipe('en-US');
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


  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
    this.blockId = this.userSessionService.blockId();

  }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.blockId();
    if (this.userTypeID == 5  )
    {
    this.ceodistrictlogin = true;
    console.log('logins', this.ceodistrictlogin);
    this.getparttimeteachersalaryreport(this.monthfilterdd);

    this.dataHeader = [
      {field: 'udise_code', header: 'UDISE Code', widthstyle: '5em' },
    { field: 'district_name', header: 'District Name', widthstyle: '5em' },
     { field: 'block_name', header: 'Block Name', widthstyle: '5em' },
     { field: 'school_name', header: 'School Name' , widthstyle: '8em'},
     { field: 'school_type', header: 'School Type', widthstyle: '6em' },
     { field: 'PT_Teachers', header: 'Part Time Teachers', widthstyle: '4em' },
     { field: 'Paid', header: 'Paid', widthstyle: '4em'},
     { field: 'Not_Paid', header: 'Not Paid', widthstyle: '4em' },
     { field: 'Not_Updated', header: 'Not Updated', widthstyle: '4em'}];
  } else if (this.userTypeID != 5) {
    this.dataHeader = [{field: 'udise_code', header: 'UDISE Code', widthstyle: '5em' },
     { field: 'block_name', header: 'Block Name', widthstyle: '5em' },
     { field: 'school_name', header: 'School Name' , widthstyle: '8em'},
     { field: 'school_type', header: 'School Type', widthstyle: '6em' },
     { field: 'PT_Teachers', header: 'Part Time Teachers', widthstyle: '4em' },
     { field: 'Paid', header: 'Paid', widthstyle: '4em'},
     { field: 'Not_Paid', header: 'Not Paid', widthstyle: '4em' },
     { field: 'Not_Updated', header: 'Not Updated', widthstyle: '4em'}];
   }
   let currMonth = this.pipe.transform(new Date(),'M');
   this.monthfilterdd = Number(currMonth)-1;
   this.monthfilterdd = this.monthfilterdd == 0 ? 12 : this.monthfilterdd;
   this.getparttimeteachersalaryreport(this.monthfilterdd);
   this.getBlockparttimeteachersalaryreport(this.monthfilterdd);
  }
  getparttimesalary() {
    this.exportExcelData = [];
    this.partimeteacher.map(item => {
      return {
        'Udise Code': item.udise_code,
        'District Name': item.district_name,
        'Block Name': item.block_name,
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
    console.log(this.partimeteacher);
  }
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getparttimesalary());
        const workbook = { Sheets: { 'Part time salary list' : worksheet }, SheetNames: ['Part time salary list'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.districtId +' (parttimeteachersalaryreport ) ');
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
  getparttimeteachersalaryreport(val) {
    const distrctID = this.districtId;
    this.reportsService.getparttimeteachersalaryreport(val,distrctID).subscribe((data) => {
      console.log("check",data)
      if (data.ptStaffPaidedWiseReportList.length > 0) {
        this.partimeteacher = data.ptStaffPaidedWiseReportList;
        this.partimeteacher =  data.ptStaffPaidedWiseReportList.map(item => {
          return {
            'udise_code': item.udise_code,
            'district_name': item.district_name,
            'block_name': item.block_name,
            'school_name':item.school_name,
            'school_type':item.school_type,
            'PT_Teachers': item.PT_Teachers,
            'Paid': item.Paid,
            'Not_Paid': item.Not_Paid,
            'Not_Updated': (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1
             }
      })
        console.log('parttimeteacher1', this.partimeteacher);
      
      } else {
        this.noDataFound = true;
      }
    });
}
getBlockparttimeteachersalaryreport(val)
{
  const BLOCKID = this.blockId;
  this.reportsService.getparttimeteachersalaryreport(val,BLOCKID).subscribe((data) => {
    console.log("check",data)
    if (data.ptStaffPaidedWiseReportList.length > 0) {
      this.partimeteacher = data.ptStaffPaidedWiseReportList;
      this.partimeteacher =  data.ptStaffPaidedWiseReportList.map(item => {
        return {
          'udise_code': item.udise_code,
          'district_name': item.district_name,
          'block_name': item.block_name,
          'school_name':item.school_name,
          'school_type':item.school_type,
          'PT_Teachers': item.PT_Teachers,
          'Paid': item.Paid,
          'Not_Paid': item.Not_Paid,
          'Not_Updated': (item.PT_Teachers)*1 - (item.Paid)*1 - (item.Not_Paid)*1
           }
    })
      console.log('parttimeteacher', this.partimeteacher);
    
    } else {
      this.noDataFound = true;
    }
  });
}
}


