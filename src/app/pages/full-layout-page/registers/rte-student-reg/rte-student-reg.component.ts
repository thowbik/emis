import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rte-student-reg',
  templateUrl: './rte-student-reg.component.html',
  styleUrls: ['./rte-student-reg.component.css']
})
export class RteStudentRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  exportExcelData :any[] = [];
  pipe = new DatePipe('en-US');
  origin: any;

  

  constructor(private registersService: RegistersService,
    private router: Router,
    private userSessionService: UserSessionService) { 
      this.emis_school_id = this.userSessionService.schoolId();
    }

  ngOnInit() {
    this.getData();
    this.headerData();
  }

  headerData()
  {
    this.cols =[
      { field: 'unique_id_no', header: 'Unique Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'community_name', header: 'Community'},
      { field: 'dob', header: 'DOB',widthstyle: '15em' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section'},
      { field: 'child_admitted_under_reservation', header: 'RTE Status'},
      { field: 'rte_type', header: 'RTE Type'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    const classsection ={   
        emis_school_id : this.emis_school_id 
    };
      this.registersService.getRTEStudentRegister(classsection,true).subscribe((res) => {
        if (res) {
          this.data = res.result.RTI_List;
          this.data['dob'] = this.pipe.transform(this.data['dob'], 'dd-MM-yyyy');
        }
      });
    }

 getstudentregister(){
  this.exportExcelData = [];
  this.origin = this.data.map(function(item){ 
    if(item.gender == 1){
      item.gender = 'Boy'
    } else {
      item.gender = 'Girl'
    }
  })
  this.data.map(item => {
    return {
      'Unique Id': item.unique_id_no,
      'Student Name': item.name,
      'Gender': item.gender,
      'Community':item.community_name,
      'DOB':item.dob,
      'Class': item.class_studying_id,
      'Section': item.class_section,
      'RTE Status': item.child_admitted_under_reservation,
      'RTE Type': (item.category), 
       } 
       }).forEach(item => this.exportExcelData.push(item));
       let student = [];
       for(let Studentreg of this.exportExcelData) {
        student.push(Studentreg);
       }
       return student;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getstudentregister());
      const workbook = { Sheets: { 'Student register list' : worksheet }, SheetNames: ['Student register list'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (studentreport ) ');
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
onBack() {
  this.router.navigate(['/registers']);
}
}