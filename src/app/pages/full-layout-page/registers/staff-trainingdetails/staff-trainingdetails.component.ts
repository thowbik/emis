import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-trainingdetails',
  templateUrl: './staff-trainingdetails.component.html',
  styleUrls: ['./staff-trainingdetails.component.css']
})
export class StaffTrainingdetailsComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  classlist: any;
  classsection:FormGroup;
  exportExcelData: any;
  exportColumns: any[] = [];
  result: any;
  noDataFound: boolean;


  constructor(private registersService: RegistersService,
    private router: Router,
    private userSessionService: UserSessionService, private cs:FormBuilder) {
      this.emis_school_id = this.userSessionService.schoolId();
     }

  ngOnInit() {
    console.log(this.emis_school_id);
    this.headerData();
    this.classsection = this.cs.group(
      {
        emis_school_id: [''],
       // class_id: ['', Validators.required]
        class_id: ['']
      });
     this.classsection.controls['emis_school_id'].setValue(this.emis_school_id);
    this.getStaffTrainingDetails();
    // this.registersService.getStaffTrainingRegisterDetails(this.classsection.value,true).subscribe((res) => {
    //   if (res) {
    //     this.classlist = res.result.aca_year_list;
    //   }
    // });
  }
  headerData()
  {
    this.cols =[
     
      { field: 'teacher_code', header: 'Teacher Code' },
      { field: 'teacher_name', header: 'Teacher Name' },
      { field: 'training_type', header: 'Training Type'},
      { field: 'trained_at', header: 'Trained at' },
      { field: 'training_date', header: 'Date' },
      { field: 'training_days', header: 'No of days in Training'}
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getStaffTrainingDetails() {
    if(this.classsection.valid) {
      this.registersService.getStaffTrainingRegisterDetails(this.classsection.value,true).subscribe((res) => {

        if (res) {
          this.result = res.result.training_staff_list;
          if (this.result.length > 0) {
            this.data = this.result;
          }
          else {
            this.noDataFound = true;
          }
        }
        else {
          this.noDataFound = true;
        }
      });
    }
  }
  onBack() {
    this.router.navigate(['/registers']);
  }

  exportPdf(data, dataHeader) {
    debugger;
    this.exportColumns = dataHeader.map(col => ({ title: col.header, dataKey: col.field }));
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, data);
        doc.save('Student_Religion_details.pdf');
      })
    })
  }

  exportExcel(data) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Student_Religion_details");
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
