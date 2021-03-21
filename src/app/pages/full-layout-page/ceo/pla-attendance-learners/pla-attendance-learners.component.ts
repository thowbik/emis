import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { CeoService } from '../ceo.service';

@Component({
  selector: 'app-pla-attendance-learners',
  templateUrl: './pla-attendance-learners.component.html',
  styleUrls: ['./pla-attendance-learners.component.css']
})
export class PlaAttendanceLearnersComponent implements OnInit {
  noData:boolean=false;
  noData3:boolean=false;
  exportExcelData: any[];
  usertypeId: any;
  todayDate:string
  dist_id:string="";
  blck_id:string="";
  districtid:string=""
  districtname:string=""
  schoolname:string=""
  blockname:string=""
    PLAAttendanceLearners:FormGroup
    attendanceLearnersDistrict:any
    attendanceLearnersBlock:any
    attendanceLearnersSchool:any
    noData2:boolean
    pageStage:Number
    dataHeader: { field: string; header: string; widthstyle: string;class:string }[];
    dataHeader2: { field: string; header: string; widthstyle: string;class:string }[];
    dataHeader3: { field: string; header: string; widthstyle: string;class:string }[];

    grandTotal_LearnersPresent:any;
  grandTotal_LearnersAbsent:any;
    
  
    constructor(private fb:FormBuilder,private alertService:AlertService,private ceo:CeoService,private user:UserSessionService) { 
      this.usertypeId = this.user.userTypeId();
      this.districtid = this.user.districtId();
    }

  ngOnInit() {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.initValidators()
    // PLA Attendance Learners Report
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
      
      { field: 'UDISE', header: 'UDISE', widthstyle: '8em',class:'text-center' },
      { field: 'school_name', header: 'School Name', widthstyle: '12em',class:'text-left' },
      { field: 'Learners_Present', header: 'Learners Present', widthstyle: '7em',class:'text-center' },
      { field: 'Learners_Absent', header: 'Learners Absent', widthstyle: '6em',class:'text-center' },
    ];
    this.PLAAttendanceLearners.patchValue({ date:this.todayDate})
   
    if(this.usertypeId==6 || this.usertypeId==10)
    {
      this.pageStage=3;
      this.onSubmitPLALearners()
      
    }
    else if(this.usertypeId==9 || this.usertypeId==3)
    {
         this.pageStage=2
        this.onSubmitPLALearners()
    }
    else if(this.usertypeId==5)
    {
        this.pageStage=1
        this.onSubmitPLALearners()
      
    }
  }

  // PLA Attendance Learners Report
  initValidators()
  {
      //  PLA Attendance Learners Form Initiate
      this.PLAAttendanceLearners = this.fb.group({
        'date': new FormControl('', Validators.required),
        "dist_id":new FormControl(''),
        "blck_id":new FormControl('')
      });
    
  }
  onSubmitPLALearners()
   {
  if (this.PLAAttendanceLearners.valid) {
    if(this.usertypeId==5)
    {
    if(this.dist_id=="" && this.blck_id=="")
    {
    this.getAttendanceLearnersData()
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
getAttendanceLearnersData()
{
    var date = this.PLAAttendanceLearners.value.date;
    let attendanceLearnersReport = { "records": { "date": date ,"dist_id":this.dist_id,"blck_id":this.blck_id} }
    this.ceo.getPLAAttendanceLearners(attendanceLearnersReport).subscribe(res => {
        this.attendanceLearnersDistrict = [];
        var attendanceLearDistrictResult=res.data;
        this.pageStage=1
        if(attendanceLearDistrictResult.length > 0)
        {
        
        this.attendanceLearnersDistrict =  attendanceLearDistrictResult
        this.noData = false;
        this.grandTotal_LearnersPresent = this.attendanceLearnersDistrict.map(c => c.Learners_Present === '' ? 0 : Number(c.Learners_Present)).reduce((sum, current) => sum + current);
        this.grandTotal_LearnersAbsent = this.attendanceLearnersDistrict.map(c => c.Learners_Absent  === '' ? 0 : Number(c.Learners_Absent)).reduce((sum, current) => sum + current);
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
    var date = this.PLAAttendanceLearners.value.date;
    let attendanceLearnersReport = { "records": { "date": date,"dist_id":districtid } }
    this.ceo.getPLAAttendanceLearners(attendanceLearnersReport).subscribe(res => {
        this.attendanceLearnersBlock = [];
        var attendanceLearnersBlockResult=res.data;
        this.pageStage=2
        if(attendanceLearnersBlockResult.length > 0)
        {
        
        this.attendanceLearnersBlock =  attendanceLearnersBlockResult
        this.noData2 = false;
        this.grandTotal_LearnersPresent = this.attendanceLearnersBlock.map(c => c.Learners_Present === '' ? 0 : Number(c.Learners_Present)).reduce((sum, current) => sum + current);
        this.grandTotal_LearnersAbsent = this.attendanceLearnersBlock.map(c => c.Learners_Absent  === '' ? 0 : Number(c.Learners_Absent)).reduce((sum, current) => sum + current);
      }
      else {

        this.noData2 = true;
      }
    })
  }

  redirectToSchool(blockid,blockname)
  {
    
    this.blck_id=blockid
    this.blockname=blockname
    var date = this.PLAAttendanceLearners.value.date;
    let attendanceLearnersReport = { "records": { "date": date,"blck_id":this.blck_id } }
    this.ceo.getPLAAttendanceLearners(attendanceLearnersReport).subscribe(res => {
        this.attendanceLearnersSchool = [];
        var attendanceLearnersSchoolResult=res.data;
        this.pageStage=3
        if(attendanceLearnersSchoolResult.length > 0)
        {
         
        this.attendanceLearnersSchool =  attendanceLearnersSchoolResult
        this.noData3 = false;
        this.grandTotal_LearnersPresent = this.attendanceLearnersSchool.map(c => c.Learners_Present === '' ? 0 : Number(c.Learners_Present)).reduce((sum, current) => sum + current);
        this.grandTotal_LearnersAbsent = this.attendanceLearnersSchool.map(c => c.Learners_Absent  === '' ? 0 : Number(c.Learners_Absent)).reduce((sum, current) => sum + current);
      }
      else {

        this.noData3= true;
      }
    })
  }
  
// Excel Sheet 

  getAttendanceLearnersDistrictReport() {
    this.exportExcelData = [];
    this.attendanceLearnersDistrict.map(item => {
      return {
        'District Name': item.district_name ,
        'Learners Present': item.Learners_Present,
        'Learners Absent': item.Learners_Absent,
      }
    }).forEach(item => this.exportExcelData.push(item));
    let attendanceLearnersReport = [];
    for (let schoolwithoutdata of this.exportExcelData) {
      attendanceLearnersReport.push(schoolwithoutdata);
    }
    return attendanceLearnersReport;
  }

  getAttendanceLearnersBlockReport() {
    this.exportExcelData = [];
    this.attendanceLearnersBlock.map(item => {
      return {
    
        'Block Name': item.block_name,
        'Learners Present': item.Learners_Present,
        'Learners Absent': item.Learners_Absent,
      }
    }).forEach(item => this.exportExcelData.push(item));
    let attendanceLearnersReport = [];
    for (let schoolwithoutdata of this.exportExcelData) {
      attendanceLearnersReport.push(schoolwithoutdata);
    }
    return attendanceLearnersReport;
  }

  getAttendanceLearnersSchoolReport() {
    this.exportExcelData = [];
    this.attendanceLearnersSchool.map(item => {
      return {
        'UDISE':item.UDISE,
        'School Name': item.school_name,
        'Learners Present': item.Learners_Present,
        'Learners Absent': item.Learners_Absent,
      }
    }).forEach(item => this.exportExcelData.push(item));
    let attendanceLearnersReport = [];
    for (let schoolwithoutdata of this.exportExcelData) {
      attendanceLearnersReport.push(schoolwithoutdata);
    }
    return attendanceLearnersReport;
  }
  exportExcelLearnersDist(){
    if(this.attendanceLearnersDistrict.length > 0 ) {
      import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getAttendanceLearnersDistrictReport());
        const workbook = { Sheets: { 'PLA-Attendance Learners Reports': worksheet }, SheetNames: ['PLA-Attendance Learners Reports'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFileLearnersDist(excelBuffer, "PLA-Attendance Learners Reports");
    });
    }
  }
  saveAsExcelFileLearnersDist(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  exportExcelLearnersBlock(){
    if(this.attendanceLearnersBlock.length > 0 ) {
      import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getAttendanceLearnersBlockReport());
        const workbook = { Sheets: { 'PLA-Attendance Learners Reports': worksheet }, SheetNames: ['PLA-Attendance Learners Reports'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFileLearnersBlock(excelBuffer, "PLA-Attendance Learners Reports");
    });
    }
  }
  saveAsExcelFileLearnersBlock(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  exportExcelLearnersSchool(){
    if(this.attendanceLearnersSchool.length > 0 ) {
      import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getAttendanceLearnersSchoolReport());
        const workbook = { Sheets: { 'PLA-Attendance Learners Reports': worksheet }, SheetNames: ['PLA-Attendance Learners Reports'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFileLearnersSchool(excelBuffer, "PLA-Attendance Learners Reports");
    });
    }
  }
  saveAsExcelFileLearnersSchool(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


  goBack() {
    this.pageStage = 1;
    this.blockname = '';
    this.schoolname = '';
    this.districtname = '';
    this.dist_id=""
    this.blck_id=""
    this.getAttendanceLearnersData()
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
