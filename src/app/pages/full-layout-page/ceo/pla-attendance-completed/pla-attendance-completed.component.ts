import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { CeoService } from '../ceo.service';

@Component({
  selector: 'app-pla-attendance-completed',
  templateUrl: './pla-attendance-completed.component.html',
  styleUrls: ['./pla-attendance-completed.component.css']
})
export class PlaAttendanceCompletedComponent implements OnInit {
  noData:boolean=false;
  noData3:boolean=false;
  noData2:boolean=false
  exportExcelData: any[];
  usertypeId: any;
  todayDate:string
  // Particular District of District id
  dist_id:string="";
  // Particular Block of Block Id
  blck_id:string="";
  districtname:string=""
  schoolname:string=""
  blockname:string=""
  districtid:string=""

  PLAAttendanceCompleted:FormGroup
  attendanceCompletedDistrict:any
  attendanceCompletedBlock:any
  attendanceCompletedSchool:any
  dataHeader: { field: string; header: string; widthstyle: string;class:string }[];
  dataHeader2: { field: string; header: string; widthstyle: string;class:string }[];
  dataHeader3: { field: string; header: string; widthstyle: string;class:string }[];
  pageStage:Number
  grandTotal_LearnersPresent:any
  grandTotal_LearnersAbsent:any
  

  constructor(private fb:FormBuilder,private alertService:AlertService,private ceo:CeoService,private user:UserSessionService) { 
    this.usertypeId = this.user.userTypeId();
    this.districtid = this.user.districtId();
  }

 
  ngOnInit() {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.initValidators()
    // PLA Attendance Completed Report
    this.dataHeader = [
      { field: 'district_name', header: 'District Name', widthstyle: '12em',class:'text-left' },
      { field: 'Learners_Present', header: 'Learners Present', widthstyle: '6em',class:'text-center' },
      { field: 'Learners_Absent', header: 'Learners Absent', widthstyle: '6em',class:'text-center' },
    ];
    this.dataHeader2 = [
      { field: 'block_name', header: 'Block Name', widthstyle: '10em', class:'text-left'},
      { field: 'Learners_Present', header: 'Learners Present', widthstyle: '6em',class:'text-center' },
      { field: 'Learners_Absent', header: 'Learners Absent', widthstyle: '6em',class:'text-center' },
    ];
    this.dataHeader3 = [
      { field: 'UDISE', header: 'UDISE', widthstyle: '10em',class:'text-center' },
      { field: 'SclName', header: 'School Name', widthstyle: '15em',class:'text-left' },
      { field: 'attandance_date', header: 'Attendance Date', widthstyle: '7em',class:'text-center' },
      { field: 'Volunteer_Name', header: 'Volunteer Name', widthstyle: '12em',class:'text-left' },
      { field: 'Login', header: 'Mobile Number', widthstyle: '8em',class:'text-center' },
      { field: 'Marked_Status', header: 'Status', widthstyle: '7em',class:'text-center' },
      { field: 'VolunteerAttend', header: ' Volunteer Attendance', widthstyle: '7em',class:'text-center' },
      { field: 'Learners_Present', header: 'Learners Present', widthstyle: '7em',class:'text-center' },
      { field: 'Learners_Absent', header: 'Learners Absent', widthstyle: '7em',class:'text-center' },
    ];
    this.PLAAttendanceCompleted.patchValue({ date:this.todayDate})
 
    if(this.usertypeId==6 || this.usertypeId==10)
    {
      this.pageStage=3;
      this.onSubmitPLACompleted()
    
    }
    else if(this.usertypeId==9 || this.usertypeId==3)
    {
         this.pageStage=2
         this.onSubmitPLACompleted()
    }
    else if(this.usertypeId==5)
    {
        this.pageStage=1
        this.onSubmitPLACompleted()
    }
  }
getAttendanceCompletedData()
{
    var date = this.PLAAttendanceCompleted.value.date;
    let attendanceCompletedReport = { "records": { "date": date ,"dist_id":this.dist_id,"blck_id":this.blck_id} }
    this.ceo.getPLAAttendanceCompleted(attendanceCompletedReport).subscribe(res => {
        this.attendanceCompletedDistrict = [];
        console.log( this.attendanceCompletedDistrict)
        var attendanceCompDistrictResult=res.data;
        this.pageStage=1
        if(attendanceCompDistrictResult.length > 0)
        {
        this.attendanceCompletedDistrict =  attendanceCompDistrictResult
        console.log( this.attendanceCompletedDistrict)
        this.noData = false;
        this.grandTotal_LearnersPresent = this.attendanceCompletedDistrict.map(c => c.Learners_Present === '' ? 0 : Number(c.Learners_Present)).reduce((sum, current) => sum + current);
        this.grandTotal_LearnersAbsent = this.attendanceCompletedDistrict.map(c => c.Learners_Absent  === '' ? 0 : Number(c.Learners_Absent)).reduce((sum, current) => sum + current);
      }
      else {

        this.noData = true;
      }
    })
  }
  redirectToBlock(districtid,districtname)
  {
    this.dist_id=districtid
    this.districtname=districtname
    var date = this.PLAAttendanceCompleted.value.date;
    let attendanceCompletedReport = { "records": { "date": date,"dist_id":this.dist_id } }
    this.ceo.getPLAAttendanceCompleted(attendanceCompletedReport).subscribe(res => {
        this.attendanceCompletedBlock = [];
        var attendanceCompletedBlockResult=res.data;
        this.pageStage=2
        if(attendanceCompletedBlockResult.length > 0)
        {
        
        this.attendanceCompletedBlock =  attendanceCompletedBlockResult
        this.noData2 = false;
        this.grandTotal_LearnersPresent = this.attendanceCompletedBlock.map(c => c.Learners_Present === '' ? 0 : Number(c.Learners_Present)).reduce((sum, current) => sum + current);
        this.grandTotal_LearnersAbsent = this.attendanceCompletedBlock.map(c => c.Learners_Absent  === '' ? 0 : Number(c.Learners_Absent)).reduce((sum, current) => sum + current);
      }
      else {

        this.noData2 = true;
      }
    })
  }

  redirectToSchool(blockid,blockname)
  {
    debugger
    this.blck_id=blockid
    this.blockname=blockname
    var date = this.PLAAttendanceCompleted.value.date;
    let attendanceCompletedReport = { "records": { "date": date,"blck_id":this.blck_id } }
    this.ceo.getPLAAttendanceCompleted(attendanceCompletedReport).subscribe(res => {
        this.attendanceCompletedSchool = [];
        var attendanceCompletedSchoolResult=res.data;
        this.pageStage=3
        if(attendanceCompletedSchoolResult.length > 0)
        {
         
        this.attendanceCompletedSchool =  attendanceCompletedSchoolResult
        this.noData3 = false;
        this.grandTotal_LearnersPresent = this.attendanceCompletedSchool.map(c => c.Learners_Present === '' ? 0 : Number(c.Learners_Present)).reduce((sum, current) => sum + current);
        this.grandTotal_LearnersAbsent = this.attendanceCompletedSchool.map(c => c.Learners_Absent  === '' ? 0 : Number(c.Learners_Absent)).reduce((sum, current) => sum + current);
      }
      else {

        this.noData3= true;
      }
    })
  }
      // PLA Attendance Completed Report
  initValidators()
  {
      //  PLA Attendance Completed Form Initiate
      this.PLAAttendanceCompleted = this.fb.group({
        'date': new FormControl('', Validators.required),
        "dist_id":new FormControl(''),
        "blck_id":new FormControl('')
      });
    
  }
  onSubmitPLACompleted()
   {
  if (this.PLAAttendanceCompleted.valid) {
    if(this.usertypeId==5)
    {
    if(this.dist_id=="" && this.blck_id=="")
    {
    this.getAttendanceCompletedData()
    }
    else if(this.dist_id!="" && this.blck_id==""){
      this.redirectToBlock(this.dist_id,this.districtname)
    }
    else if(this.dist_id!="" && this.blck_id!=""){
      this.redirectToSchool(this.blck_id,this.blockname)
    }
  }
  else  if(this.usertypeId==6 || this.usertypeId==10)
  {
     if(this.dist_id=="" && this.blck_id==""){
      this.redirectToSchool(this.blck_id,this.blockname)
    }
  }
  else  if(this.usertypeId==9 || this.usertypeId==3)
  {
    if(this.dist_id=="" && this.blck_id==""){
      this.redirectToBlock(this.dist_id,this.districtname)
    }
    if(this.dist_id=="" && this.blck_id!=""){
      this.redirectToSchool(this.blck_id,this.blockname)
    }
  }
  }
  else {
    this.alertService.error("Please Select Date");
  }
}



// Excel Sheet 

getAttendanceCompletedDistrictReport() {
  this.exportExcelData = [];
  this.attendanceCompletedDistrict.map(item => {
    return {
      'District Name': item.district_name ,
      'Learners Present': item.Learners_Present,
      'Learners Absent': item.Learners_Absent,
    }
  }).forEach(item => this.exportExcelData.push(item));
  let attendanceCompletedDistReport = [];
  for (let schoolwithoutdata of this.exportExcelData) {
    attendanceCompletedDistReport.push(schoolwithoutdata);
  }
  return attendanceCompletedDistReport;
}

getAttendanceCompletedBlockReport() {
  this.exportExcelData = [];
  this.attendanceCompletedBlock.map(item => {
    return {
      'Block Name': item.block_name,
      'Learners Present': item.Learners_Present,
      'Learners Absent': item.Learners_Absent,
    }
  }).forEach(item => this.exportExcelData.push(item));
  let attendanceCompletedBlockReport = [];
  for (let schoolwithoutdata of this.exportExcelData) {
    attendanceCompletedBlockReport.push(schoolwithoutdata);
  }
  return attendanceCompletedBlockReport;
}

getAttendanceCompletedSchoolReport() {
  this.exportExcelData = [];
  this.attendanceCompletedSchool.map(item => {
    return {
      'UDISE': item.UDISE,
      'School Name': item.SclName,
        'Attendance Date':item.attandance_date,
        'Volunteer Name': item.Volunteer_Name,
        'Mobile Number':item.Login,
        'Status': item.Marked_Status,
        'Voluneer Attendance': item.VolunteerAttend,
        'Learners Present': item.Learners_Present,
        'Learners Absent': item.Learners_Absent,
    }
  }).forEach(item => this.exportExcelData.push(item));
  let attendanceCompletedSchoolReport = [];
  for (let schoolwithoutdata of this.exportExcelData) {
    attendanceCompletedSchoolReport.push(schoolwithoutdata);
  }
  return attendanceCompletedSchoolReport;
}
exportExcelCompletedDist(){
  debugger
  if(this.attendanceCompletedDistrict.length > 0 ) {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getAttendanceCompletedDistrictReport());
      const workbook = { Sheets: { 'PLA-Attendance Reports': worksheet }, SheetNames: ['PLA-Attendance Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileCompletedDist(excelBuffer, "PLA-Attendance  Reports");
  });
  }
}
saveAsExcelFileCompletedDist(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

exportExcelCompletedBlock(){
  if(this.attendanceCompletedBlock.length > 0 ) {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getAttendanceCompletedBlockReport());
      const workbook = { Sheets: { 'PLA-Attendance  Reports': worksheet }, SheetNames: ['PLA-Attendance  Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileCompletedBlock(excelBuffer, "PLA-Attendance  Reports");
  });
  }
}
saveAsExcelFileCompletedBlock(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

exportExcelCompletedSchool(){
  if(this.attendanceCompletedSchool.length > 0 ) {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getAttendanceCompletedSchoolReport());
      const workbook = { Sheets: { 'PLA-Attendance Reports': worksheet }, SheetNames: ['PLA-Attendance Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileCompletedSchool(excelBuffer, "PLA-Attendance Reports");
  });
  }
}
saveAsExcelFileCompletedSchool(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

// For Breadcrumbs
goBack() {
  this.pageStage = 1;
  this.blockname = '';
  this.schoolname = '';
  this.districtname = '';
  this.dist_id=""
  this.blck_id=""
  this.getAttendanceCompletedData()
}
goBack_b() {
  this.pageStage = 2;
  this.schoolname = '';
  this.blockname = '';
  this.blck_id=""
  this.redirectToBlock(this.dist_id,this.districtname)
}

goBack_sc() {
  this.pageStage = 3;
  this.schoolname = '';
  this.redirectToSchool(this.blck_id,this.blockname)
  
}


}