import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/services/alert.service';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-data-correction',
  templateUrl: './data-correction.component.html',
  styleUrls: ['./data-correction.component.css']
})
export class DataCorrectionComponent implements OnInit {
  dataHeader: any [];
  Data_Correction_for: { label: string; value: string; }[];
  Selected_dropdown_values: any;
  noDataFound: boolean;
  result_data: any;
  onloadTemplate: boolean ;
  exportExcelData : any[]=[];

  constructor(private alertService: AlertService, private schoolsService:schoolsService,private userSessionService: UserSessionService) {
    this.Data_Correction_for = [
      {label: 'Teacher Data', value: '2'},
      {label: 'Student Data', value: '1'},
      ];
   }

  ngOnInit() {
    // this.noDataFound = true;
    this.onloadTemplate=true;
    // this.dataHeader = [
    //  { field: '', header: 'EMIS ID', widthstyle: '5em' },
    //  { field: '', header: 'Student Name' , widthstyle:'5em'},
    //  { field: '', header: 'Class', widthstyle: '5em' },
    //  { field: '', header: 'Section', widthstyle: '5em' },
    // ];
 
  }

  TypeOptions(event)
  {
   this.Selected_dropdown_values = event.value;

   if(this.Selected_dropdown_values == 2){
    this.onloadTemplate = false;
    this.dataHeader = [
      { field: 'info', header: 'Error Description', widthstyle: '5em' },
      { field: 'teacher_id', header: 'Teacher ID', widthstyle: '5em' },
      { field: 'teacher_name', header: 'Teacher Name' , widthstyle:'5em'},
     ];

     this.schoolsService.get_correctiondataapi(this.Selected_dropdown_values).subscribe((data) => {
       console.log(data,"dasas");
       
      if(data.result != 0){
        this.result_data = data.result.Students_Teacher_Data;
        this.noDataFound = false;
      }
      else{
        this.noDataFound = true;
      }
    })

   }
   if(this.Selected_dropdown_values == 1){
    this.onloadTemplate = false;
    this.dataHeader = [
      { field: 'info', header: 'Error Description', widthstyle: '6em' },
      { field: 'unique_id_no', header: 'EMIS ID', widthstyle: '5em' },
      { field: 'name', header: 'Student Name' , widthstyle:'5em'},
      { field: 'class_studying_id', header: 'Class', widthstyle: '5em' }, 
      { field: 'class_section', header: 'Section', widthstyle: '5em' },
     ];

     this.schoolsService.get_correctiondataapi(this.Selected_dropdown_values).subscribe((data) => {
       console.log(data,"dasas");

      if(data.result != 0){
        this.result_data = data.result.Students_Teacher_Data;
        this.noDataFound = false;
      }
      else{
        this.noDataFound = true;
      }
    })

   }
  }
  //excel
  getStudentData()
  {
    this.exportExcelData=[];
    this.result_data.map(i =>
      {
        return {
          'Error Description' : i.info ,
          'EMIS ID' : i.unique_id_no,
          'Student Name' : i.name ,
          'Class' : i.class_studying_id,
          'Section' : i.class_section 
        }
      }).forEach(item => this.exportExcelData.push(item));
      let students = [];
      for(let Students of this.exportExcelData) {
        students.push(Students);
      }
      return students;
  }
  exportExcel()
  {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getStudentData());
          const workbook = { Sheets: { 'DataCorrection List': worksheet }, SheetNames: ['DataCorrection List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "DataCorrection List");
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

    //excelTEacher
    getTeacherData()
  {
    this.exportExcelData=[];
    this.result_data.map(i =>
      {
        return {
          'Error Description' : i.info ,
          'Teacher ID' : i.teacher_id,
          'Teacher Name' : i.teacher_name ,
        
        }
      }).forEach(item => this.exportExcelData.push(item));
      let students = [];
      for(let Students of this.exportExcelData) {
        students.push(Students);
      }
      return students;
  }
  exportExcelTeacher()
  {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getTeacherData());
          const workbook = { Sheets: { 'DataCorrection List': worksheet }, SheetNames: ['DataCorrection List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "DataCorrection List");
      });
    }
    saveAsExcelFile1(buffer: any, fileName: string): void {
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
