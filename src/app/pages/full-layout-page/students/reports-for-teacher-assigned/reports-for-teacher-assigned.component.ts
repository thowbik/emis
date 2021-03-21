import { Component, OnInit, ElementRef } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-reports-for-teacher-assigned',
  templateUrl: './reports-for-teacher-assigned.component.html',
  styleUrls: ['./reports-for-teacher-assigned.component.css']
})
export class ReportsForTeacherAssignedComponent implements OnInit {

  cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'district_name', header: 'District',widthstyle: '10em'},
  { field: 'Class_10_Stud', header: 'Class 10 Students',widthstyle: '13em'},
  { field: 'Class_11_Stud', header: 'Class 11 Students',widthstyle: '13em'},
  { field: 'Containment', header: 'No. of Students in Containment Zone',widthstyle: '16em'},
  { field: 'Transport_Reqd', header: 'No. of Students Requiring Transport',widthstyle: '14em'},
  { field: 'Students_assigned_Teachers', header: 'No. of Students for Whom teacher is assigned' ,widthstyle: '15em'},
  ];

  cols1 : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'school_name', header: 'School Name',widthstyle: '12em'},
  { field: 'Class_10_Stud', header: 'Class 10 Students',widthstyle: '13em'},
  { field: 'Class_11_Stud', header: 'Class 11 Students',widthstyle: '13em'},
  { field: 'Containment', header: 'No. of Students in Containment Zone',widthstyle: '16em'},
  { field: 'Transport_Reqd', header: 'No. of Students Requiring Transport',widthstyle: '14em'},
  { field: 'Students_assigned_Teachers', header: 'No. of Students for Whom teacher is assigned' ,widthstyle: '15em'},
  ];

  pageStage: number;
  statelogincwsn_report: any;
  noDataFound: boolean;
  statelogincwsn_Sch_report: any;
  noDataFound1: boolean;
  grandtotal_Class_10_Stud: any;
  grandtotal_Class_11_Stud: any;
  grandtotal_School: any;
  grandtotal_Containment: any;
  grandtotal_Transport_Reqd: any;
  grandtotal_Students_assigned_Teachers: any;
  User_typ_id: any;
  exportExcelData: any[];
  sample: any;

  constructor(public usersessionService : UserSessionService, private el: ElementRef, private studentservice: StudentService, private alertService: AlertService) {
    this.User_typ_id = this.usersessionService.userTypeId();
   }

  ngOnInit() {
   
    if(this.User_typ_id == 5){
       this.state_login();
    }
    if(this.User_typ_id == 9 || this.User_typ_id == 3){
      this.ceo_Dc_lgin();
   }

  }


  state_login(){
    let district_id = '' ;
    this.studentservice.statelogin_reportAPI(district_id).subscribe((res) => {
      console.log(res);
     if(res.result != 0 ){
      this.pageStage = 1;
       this.statelogincwsn_report = res.result.Teachers_Assigns;
       console.log(this.statelogincwsn_report,"asd");
       this.noDataFound = false;
     
      //  this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_school.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
      //  this.grandtotal_CWSN_CP = this.statelogincwsn_school.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
      //  this.grandtotal_School = this.statelogincwsn_school.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
      //  this.grandtotal_SRP_Center = this.statelogincwsn_school.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
      //  this.grandtotal_Home_Based = this.statelogincwsn_school.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
      //  this.grandtotal_NID = this.statelogincwsn_school.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
      //  this.grandtotal_UDID = this.statelogincwsn_school.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
      //  this.grandtotal_Account_Number = this.statelogincwsn_school.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
  
     }
     else {
       this.noDataFound = true;
     }
   })
  }

  getSelecteddistrictid(district_id){
    let select_district_id = district_id ;
    this.studentservice.statelogin_reportAPI(select_district_id).subscribe((res) => {
      console.log(res);
     if(res.result !=0 ){
      this.pageStage = 2;
       this.statelogincwsn_Sch_report = res.result.Teachers_Assigns;
       console.log(this.statelogincwsn_Sch_report,"asd");
       this.noDataFound1 = false;
     
       this.grandtotal_Class_10_Stud = this.statelogincwsn_Sch_report.map(c => c.Class_10_Stud === '' ? 0 : Number(c.Class_10_Stud)).reduce((sum, current) => sum + current);
       this.grandtotal_Class_11_Stud = this.statelogincwsn_Sch_report.map(c => c.Class_11_Stud === '' ? 0 : Number(c.Class_11_Stud)).reduce((sum, current) => sum + current);
       this.grandtotal_Containment = this.statelogincwsn_Sch_report.map(c => c.Containment === '' ? 0 : Number(c.Containment)).reduce((sum, current) => sum + current);
       this.grandtotal_Transport_Reqd= this.statelogincwsn_Sch_report.map(c => c.Transport_Reqd === '' ? 0 : Number(c.Transport_Reqd)).reduce((sum, current) => sum + current);
       this.grandtotal_Students_assigned_Teachers = this.statelogincwsn_Sch_report.map(c => c.Students_assigned_Teachers === '' ? 0 : Number(c.Students_assigned_Teachers)).reduce((sum, current) => sum + current);
  
       this.sample = this.statelogincwsn_Sch_report + this.grandtotal_Class_10_Stud
       console.log(this.sample,"sample");
     }
     else {
       this.noDataFound1 = true;
     }
   })
  }

ceo_Dc_lgin(){
  let district_id = "";
  this.studentservice.statelogin_reportAPI(district_id).subscribe((res) => {
    console.log(res);
   if(res.result !=0 ){
    this.pageStage = 2;
     this.statelogincwsn_Sch_report = res.result.Teachers_Assigns;
     console.log(this.statelogincwsn_Sch_report,"asd");
     this.noDataFound1 = false;
   
     this.grandtotal_Class_10_Stud = this.statelogincwsn_Sch_report.map(c => c.Class_10_Stud === '' ? 0 : Number(c.Class_10_Stud)).reduce((sum, current) => sum + current);
     this.grandtotal_Class_11_Stud = this.statelogincwsn_Sch_report.map(c => c.Class_11_Stud === '' ? 0 : Number(c.Class_11_Stud)).reduce((sum, current) => sum + current);
     this.grandtotal_Containment = this.statelogincwsn_Sch_report.map(c => c.Containment === '' ? 0 : Number(c.Containment)).reduce((sum, current) => sum + current);
     this.grandtotal_Transport_Reqd= this.statelogincwsn_Sch_report.map(c => c.Transport_Reqd === '' ? 0 : Number(c.Transport_Reqd)).reduce((sum, current) => sum + current);
     this.grandtotal_Students_assigned_Teachers = this.statelogincwsn_Sch_report.map(c => c.Students_assigned_Teachers === '' ? 0 : Number(c.Students_assigned_Teachers)).reduce((sum, current) => sum + current);
     
   }
   else {
     this.noDataFound1 = true;
   }
 })
}


getstudentstatedata(){
  this.exportExcelData = [];
  this.statelogincwsn_Sch_report.map(item => {

    return {
        'ROLL NO': item.school_name,
        'NAME': item.Class_10_Stud,
        'class': item.Class_11_Stud,
        'No. of Students in Containment Zone': item.Containment,
        'No. of Students Requiring Transport': item.Transport_Reqd,
        'No. of Students for Whom teacher is assigned': item.Students_assigned_Teachers,

       } 
       }).forEach(item => this.exportExcelData.push(item));
       let studentdatastate = [];
       for(let schooldata of this.exportExcelData) {
        studentdatastate.push(schooldata);
        studentdatastate.push(this.grandtotal_Class_10_Stud)+"hi";
       }
       return studentdatastate;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedata());
      const workbook = { Sheets: { 'Board Exam Students' : worksheet }, SheetNames: ['Board Exam Students'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Board Exam Students');
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
