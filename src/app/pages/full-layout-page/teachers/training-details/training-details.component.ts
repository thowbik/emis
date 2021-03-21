import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { TeacherService } from '../teacher.service';
@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  public teacherwithtraining : any[] = [];
  public teacherwithouttraining: any[] = [];
  public teachertrain :boolean = false;
   public teacherwithout: boolean = false;
userTypeId: any;
    schooltypedropvalue: { label: string; value: number; }[];
    schooltypewithout: { label: string; value: number; }[];

  schooltype: any;
  exportExcelData: any;
  districtId: any;
  
    constructor(private routers:Router,private teacherservice:TeacherService, private userSessionService: UserSessionService) {
      this.districtId = this.userSessionService.districtId();
      this.schooltypedropvalue = [
        {label: 'Government', value: 1},
        {label: 'Fully Aided', value: 2},
        {label: 'Un-aided', value: 3},
        {label: 'Partially Aided', value: 4},
        {label: 'Central Government.', value: 5}
      ];
      this.schooltypewithout = [
        {label: 'Government', value: 1},
        {label: 'Fully Aided', value: 2},
        {label: 'Un-aided', value: 3},
        {label: 'Partially Aided', value: 4},
        {label: 'Central Government.', value: 5}
      ];
     }
    
    cols: Array<{'field':string,'header':string,'widthstyle':string}> =
    [{ field: 'block_name', header: 'Block Name',widthstyle: '12em'},
    { field: 'teacher_id', header: 'Teacher ID',widthstyle: '12em'},
    { field: 'teacher_name', header: 'Teacher Name',widthstyle: '12em'},
    { field: 'type_teacher', header: 'Designation',widthstyle: '12em'},
    { field: 'udise_code', header: 'UDISE code',widthstyle: '12em'},
    { field: 'school_name', header: 'School Name',widthstyle: '12em'},
    { field: 'training', header: 'Training',widthstyle: '12em'},
    { field: 'trained_at', header: 'Trained at',widthstyle: '12em'},
    { field: 'Days', header: 'Days',widthstyle: '12em'},
  ];
    //  Droppedoutstudenlist
      cols5: Array<{'field':string,'header':string,'widthstyle':string}> =
      [{ field: 'block_name', header: 'Block Name',widthstyle: '12em'},
    { field: 'teacher_id', header: 'Teacher ID',widthstyle: '12em'},
    { field: 'teacher_name', header: 'Teacher Name',widthstyle: '12em'},
    { field: 'type_teacher', header: 'Designation',widthstyle: '12em'},
    { field: 'udise_code', header: 'UDISE code',widthstyle: '12em'},
    { field: 'school_name', header: 'School Name',widthstyle: '12em'},
    ];
  
  
    ngOnInit() {
      const districtId = this.userSessionService.districtId();

  
    }
    getteachertrain(){
      const schooltype = this.schooltype;
      this.teacherservice.getteachertrain(schooltype).subscribe(
      res=> {
        if(res != 0){
          this.teacherwithtraining = res.result.Teacher_training_det;
  
        }
        }
      )
    }
    SchoolTypeOption (event){
      let schooltype = event.value ;
      this.teacherservice.getteachertrain(schooltype).subscribe( res=>
         {
          if(res != 0){
            this.teacherwithtraining = res.result.Teacher_training_det;
    
          }
          })
    }
    // Droppedout school student
    getteacherwithout(){
      const schooltype = this.schooltype;
      this.teacherservice.getteacherwithout(schooltype).subscribe(
      res=> {
        if(res != 0){
          this.teacherwithouttraining = res.result.Teacher_training_det;
        }
        }
      )
    }
    schooltypewithoutoption (event){
      let schooltype = event.value ;
      this.teacherservice.getteacherwithout(schooltype).subscribe( res=>
         {
          if(res != 0){
            this.teacherwithouttraining = res.result.Teacher_training_det;
    
          }
          })
    }
  
getTeachertraning(){
  this.exportExcelData = [];
  this.teacherwithtraining.map(item => {
    return {
      'Block Name': item.block_name,
      'Teacher ID': item.teacher_id,
      'Teacher Name': item.teacher_name,
      'Designation': item.type_teacher,
      'UDISE code': item.udise_code,
      'School Name': item.school_name,
      'Training': item.training,
      'Trained at': item.trained_at,
      'Days': item.Days,

       } 
       }).forEach(item => this.exportExcelData.push(item));
       let teacherwithtraning = [];
       for(let teacherreport of this.exportExcelData) {
        teacherwithtraning.push(teacherreport);
       }
       return teacherwithtraning;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getTeachertraning());
      const workbook = { Sheets: { 'Teachers With Training Details' : worksheet }, SheetNames: ['Teachers With Training Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (Teachers With Training Details) ');
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
getTeacherwithouttraning(){
  this.exportExcelData = [];
  this.teacherwithouttraining.map(item => {
    return {
      'Block Name': item.block_name,
      'Teacher ID': item.teacher_id,
      'Teacher Name': item.teacher_name,
      'Designation': item.type_teacher,
      'UDISE code': item.udise_code,
      'School Name': item.school_name,
      'Days': item.Days,

       } 
       }).forEach(item => this.exportExcelData.push(item));
       let teacherwithouttraning = [];
       for(let teacherreport of this.exportExcelData) {
        teacherwithouttraning.push(teacherreport);
       }
       return teacherwithouttraning;
 }

 teacherexportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getTeacherwithouttraning());
      const workbook = { Sheets: { 'Teachers Without Training ' : worksheet }, SheetNames: ['Teachers Without Training '] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileteacher(excelBuffer, this.districtId +' (Teachers Without Training ) ');
  });
}

saveAsExcelFileteacher(buffer: any, fileName: string): void {
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
  