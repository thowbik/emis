import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-schoolswithoutdata',
  templateUrl: './schoolswithoutdata.component.html',
  styleUrls: ['./schoolswithoutdata.component.css']
})
export class SchoolswithoutdataComponent implements OnInit {
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
  schooltypedropvalue: { label: string; value: string; }[];
  schooltypedropvaluestate: { label: string; value: string; }[];
  schooltype: any;
  userId : any;

  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
    this.userId = this.userSessionService.userId();
    console.log(this.userId);
  }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    if (this.userTypeID == 5 )
    {
    this.statelogin = true;
    this.getschoolwithoutdatastate();
      this.schooltypedropvaluestate = [
        {label: 'No Enrolment', value: 'NoEnrolmentReport'},
        {label: 'No Teachers', value: 'NoTeachersReport'},
        {label: 'No Ramp', value: 'NoRampReport'},
        {label: 'No Drinking Water', value: 'NoDrinkWaterReport'},
        {label: 'No Boys Toilet', value: 'NoBysTioletReport'},
        {label: 'No Girls Toilet ', value: 'NoGirlsTioletReport'},
        {label: 'Without SMC', value: 'NoSMCReport'},
        {label: 'Without SMDC', value: 'NoSMDCReport'},
        {label: 'Without PTA', value: 'NoPTAReport'},
        {label: 'Without Electricity', value: 'NoElectricity'},
      ];  
    {
    this.dataHeader = [
      { field: 'district_name', header: 'District Name', widthstyle: '6em' },
     { field: 'Government', header: 'Government' , widthstyle: '5em'},
     { field: 'Fully_Aided', header: 'Fully Aided', widthstyle: '5em' },
     { field: 'Unaided', header: 'Un Aided', widthstyle: '4em' },
     { field: 'Partially_Aided', header: 'Partially Aided', widthstyle: '5em'},
     { field: 'Central_Govt', header: 'Central Government', widthstyle: '5em'}];
    }
  } 
   if (this.userTypeID == 9 || this.userTypeID == 3 || this.userTypeID == 2) {
    this.ceologin=true;
    this.getschoolwithoutdata();
    this.schooltypedropvalue = [
      {label: 'No Enrolment', value: 'NoEnrolmentReport'},
        {label: 'No Teachers', value: 'NoTeachersReport'},
        {label: 'No Ramp', value: 'NoRampReport'},
        {label: 'No Drinking Water', value: 'NoDrinkWaterReport'},
        {label: 'No Boys Toilet', value: 'NoBysTioletReport'},
        {label: 'No Girls Toilet', value: 'NoGirlsTioletReport'},
        {label: 'Without SMC', value: 'NoSMCReport'},
        {label: 'Without SMDC', value: 'NoSMDCReport'},
        {label: 'Without PTA', value: 'NoPTAReport'},
        {label: 'Without Electricity', value: 'NoElectricity'},
      ]; 
      this.dataHeader = [
       { field: 'block_name', header: 'Block Name', widthstyle: '6em' },
       {field: 'udise_code', header: 'UDISE Code', widthstyle: '6em' },
       { field: 'school_name', header: 'School Name', widthstyle: '6em' },
       { field: 'Type', header: 'Type' , widthstyle: '4em'},
       { field: 'school_type', header: 'School Type', widthstyle: '5em' },
       { field: 'cate_type', header: 'Category', widthstyle: '7em' },
       { field: 'total_b', header: 'Total Boys', widthstyle: '3em'},
       { field: 'total_g', header: 'Total Girls', widthstyle: '3em'},
       { field: 'teach_tot', header: 'Total Staff', widthstyle: '3em' }];
   }
  }
  getschoolwithoutdatastate() {
    const schooltype = this.schooltype;
    this.reportsService.getschoolwithoutdata(schooltype).subscribe((data) => {
    if (data != 0) {
      this.schoolwithoutdatastate = data.result.report_list;
      console.log(this.schoolwithoutdatastate,"state");
    } else {
      this.noDataFound = true;
    }
  });
}
SchoolTypeOptionstate (event){
  let schooltype = event.value ;
  this.reportsService.getschoolwithoutdata(schooltype).subscribe((data) => {
    let dropDownList = data.result.report_list;
    if(data != 0){
      this.schoolwithoutdatastate = data.result.report_list;
      this.noDataFound = false;
    }
    else{
      this.noDataFound = true;
    }
  })
}

  getschoolwithoutdata() {
    const schooltype = this.schooltype;
      this.reportsService.getschoolwithoutdata(schooltype).subscribe((data) => {
        if (data != 0) {
          this.noDataFound = false;
        this.schoolwithoutdata = data.result.report_list;
      } else {
        this.noDataFound = true;
      }
    });
}
// on select  school type value
SchoolTypeOption (event){
  let schooltype = event.value ;
  this.reportsService.getschoolwithoutdata(schooltype).subscribe((data) => {
    let dropDownList = data.result;
    if (data != 0) {
      this.noDataFound = false;
      this.schoolwithoutdata = data.result.report_list;
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
      'Block Name': item.block_name,
      'UDISE code': item.udise_code,
      'School Name': item.school_name,
      'Type': item.Type,
      'School Type': item.school_type,
      'Category': item.cate_type,
      'Total Boys': item.total_b,
      'Total Girls': item.total_g,
      'Total Staff': item.teach_tot,
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
      const workbook = { Sheets: { 'School Without Data' : worksheet }, SheetNames: ['School Without Data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (School Without Data) ');
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
      'Government': item.Government,
      'Fully Aided': item.Fully_Aided,
      'Un Aided': item.Unaided,
      'Partially Aided': item.Partially_Aided,
      'Central Government': item.Central_Govt,
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
      const workbook = { Sheets: { 'School Without Data' : worksheet }, SheetNames: ['School Without Data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (School Without Data) ');
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

