import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import * as moment from 'moment';


@Component({
  selector: 'app-student-attendancereg',
  templateUrl: './student-attendancereg.component.html',
  styleUrls: ['./student-attendancereg.component.css']
})
export class StudentAttendanceregComponent implements OnInit {
  cols: any[];
  classsection:FormGroup;
  assigned_section1:any;
  classsec:any={result:''};
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  attendance:any;
  classlist: any;
  public schoolId: any;
  date: Date;
  sample: any;
  studentattendacereglist: any[] = [];
  exportColumns: any;
  sampleSelectedColumn  : Array<Object> = [];

  constructor(private registersService: RegistersService, private cs:FormBuilder, 
    private userSessionService: UserSessionService) { 
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.getData();
    this.cols = [];
    this.cols = [
    //  { field: 'sno' , header: 'S.No' },
      { field: 'name', header: 'Student Name'},
      { field: '1', header: '1' }, { field: '2', header: '2' }, { field: '3', header: '3' },
      { field: '4', header: '4' }, { field: '5', header: '5' }, { field: '6', header: '6' },
      { field: '7', header: '7' }, { field: '8', header: '8' }, { field: '9', header: '9' },
      { field: '10', header: '10' }, { field: '11', header: '11' }, { field: '12', header: '12' },
      { field: '13', header: '13' }, { field: '14', header: '14' }, { field: '15', header: '15' },
      { field: '16', header: '16' }, { field: '17', header: '17' }, { field: '18', header: '18' },
      { field: '19', header: '19' }, { field: '20', header: '20' }, { field: '21', header: '21' },
      { field: '22', header: '22' }, { field: '23', header: '23' }, { field: '24', header: '24' },
      { field: '25', header: '25' }, { field: '26', header: '26' }, { field: '27', header: '27' },
      { field: '28', header: '28' }, { field: '29', header: '29' }, { field: '30', header: '30' },
      { field: '31', header: '31' }
  ];
  this.sampleSelectedColumn =  this.cols;
  this.classsection = this.cs.group(
    {
      school_id: [''],
      class_id: ['', Validators.required],
      section: ['', Validators.required],
      date: ['', Validators.required],

    });
    // this.dashboardService.functionalFacilitiesList().subscribe((res) => {
    this.registersService.getclasslist(this.schoolId,true).subscribe(bb=>{console.log(bb)
      this.classsec=bb
      this.classlist=this.classsec['result']
    
      this.classlist.map(i=> i['roman'] = this.class_in_roman[i['class_id']]);
      });

    //   this.AccessDeviceList.forEach(a => {
    //     a.from_time = moment(a.from_time).format('hh:mm A');
    //     a.to_time = moment(a.to_time).format('hh:mm A');
    //  });
  }


  getData() {
    // this.registersService.getStudentAttendanceReport(this.schoolId,true).subscribe((res) => {
    //   if (res) {
    //    }
    // });
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.exportColumns);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "studentAttendanceTable");
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
  // exportPdf() {
  //     import("jspdf").then(jsPDF => {
  //         import("jspdf-autotable").then(x => {
  //             const doc = new jsPDF.default(0,0);
  //             doc.autoTable(this.exportColumns, this.studentattendacereglist);
  //             // doc.text(20, 20, 'Hello world!');
  //             // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
  //             doc.save('StudentAttendanceReport.pdf');
  //         })
  //     })

  // }
  onSelection(e){
console.log(e);
    this.assigned_section1 = '';
    const results = (this.classsec.result).filter(s => s.class_id == e);
    this.assigned_section1 = results[0].revalent_section;
  }

  getStudentDetails()
 {  
  this.sample = moment(this.classsection.value.date).format('MM-YYYY');
  this.classsection.controls['school_id'].setValue(this.schoolId);
  this.classsection.value.date=this.sample;
  if(this.classsection.valid)
  {
    this.registersService.getStudentAttendanceReport(this.classsection.value,true).subscribe((res) => {
      if(res) {
        this.studentattendacereglist = res.result.students_section_details;
        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      }
      // this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    });
  }
}

exportPdf() {
  import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default(0,0);
          doc.autoTable(this.exportColumns, this.studentattendacereglist);
          // doc.text(20, 20, 'Hello world!');
          // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
          doc.save('StudentAttendanceReport.pdf');
      })
  })

}

}
