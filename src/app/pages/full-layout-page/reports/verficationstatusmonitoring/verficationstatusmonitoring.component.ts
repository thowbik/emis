import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-verficationstatusmonitoring',
  templateUrl: './verficationstatusmonitoring.component.html',
  styleUrls: ['./verficationstatusmonitoring.component.css']
})
export class VerficationstatusmonitoringComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  schoolCode: string;
  public noDataFound = false;
  userTypeID: number;
  districtId: any;
  verificationmonitoring: any;
  school_type: { label: string; value: string; }[];
  arrString: any;
  school_type_get_val: any;
  exportExcelData: any;

  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();
  }

  ngOnInit() {
    this.arrString =1;
    this.school_type = [
      {label: 'Select School Type', value: '0'},
      {label: 'Government', value: '1'},
      {label: 'Fully Aided', value: '2'},
      {label: 'Unaided', value: '3'},
      {label: 'Partially Aided', value: '4'},
      {label: 'Central Government', value: '5'}]; 
    const districtId = this.userSessionService.districtId();
    {
    this.dataHeader = [
      { field: 'block_name', header: 'Block Name', widthstyle: '5em' },
      {field: 'udise_code', header: 'UDISE Code', widthstyle: '5em' },
      { field: 'school_name', header: 'School Name', widthstyle: '9em' },
     { field: 'school_type', header: 'School Type' , widthstyle: '5em'},
     { field: 'School_Status', header: 'HM Verified on', widthstyle: '5em' },
     { field: 'BRTE_Status', header: 'BRTE Verfied on', widthstyle: '4em' },
     { field: 'BEO_Status', header: 'BEO Verfied on', widthstyle: '4em'},
     { field: 'DC_CEO_Status', header: 'DC/CEO Verified on', widthstyle: '4em' }];
  } 
   this.getverificationstatusmonitoring();
  }
  
  getverificationstatusmonitoring() {
    const distrctID = this.districtId;
      this.reportsService.getverificationstatusmonitoring(1,distrctID).subscribe((data) => {
      if (data.result.udise_reports_verifystatus.length > 0) {
        this.verificationmonitoring = data.result.udise_reports_verifystatus;
        // console.log('verificationmonitoringreport', this.verificationmonitoring);
      } else {
        this.noDataFound = true;
      }
    });
}
school_type_val(event)
  {
    debugger;
    this.school_type_get_val = event.value;
    console.log("schooltypeval",this.school_type_get_val);

    
  }
  SearchData()
  {
    debugger;
    this.reportsService.getverificationstatusmonitoring(this.school_type_get_val,this.districtId).subscribe((data) => {
      if (data.result.udise_reports_verifystatus) 
      {
       this.verificationmonitoring = data.result.udise_reports_verifystatus;
       console.log("searchdata",this.verificationmonitoring)

      }
    });
  }
  getTeacherAcdamic(){
    this.exportExcelData = [];
    this.verificationmonitoring.map(item => {
      return {
        'Block Name': item.block_name,
        'UDISE code': item.udise_code,
        'School Name': item.school_name,
        'School Type': item.school_type,
        'HM Verified on': item.School_Status,
        'BRTE Verfied on': item.BRTE_Status,
        'BEO Verfied on': item.BEO_Status,
        ' DC/CEO Verified on': item.DC_CEO_Status,
      


        
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
        const worksheet = xlsx.utils.json_to_sheet(this.getTeacherAcdamic());
        const workbook = { Sheets: { 'Teacher Verification monitor' : worksheet }, SheetNames: ['Teacher Verification monitor'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.districtId +' (Teacher Verification monitor) ');
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

