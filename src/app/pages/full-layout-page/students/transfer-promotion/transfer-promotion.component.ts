import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-transfer-promotion',
  templateUrl: './transfer-promotion.component.html',
  styleUrls: ['./transfer-promotion.component.css']
})
export class TransferPromotionComponent implements OnInit {
  studentList: Array<Object> = [];
  schoolId: number;
  dataHeader: any;
  selectedColumns: Array<Object> = [];
  exportColumns: Array<Object> = [];
  constructor(private studentService : StudentService,private userSessionService: UserSessionService) {
    this.schoolId = this.userSessionService.schoolId();
   }

  ngOnInit() {
    this.dataHeader = [];
    this.sampleData();
    this.getStudentLists();
  }
  sampleData()
  {
    this.dataHeader = [
      {field: 'unique_id_no', header: 'Unique Id' },
      { field: 'name_tamil', header: 'Name in Tamil' },
      { field: 'name', header: 'Name in English' },
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section' },
      { field: 'father_name', header: 'Father Name' },
      { field: 'mother_name', header: 'Mother Name' },
      // { field: 'dob', header: 'DOB' },
      // { field: 'group', header: 'Blood Group' },
  ];
  this.selectedColumns = this.dataHeader;
  }
  getStudentLists() {
    debugger;
    this.studentService.getStudentList(this.schoolId,'REGULAR_STUDENT',true).subscribe((res) => {
      if (res.dataStatus) {
        this.studentList = res.result;
        this.studentList.forEach(element => {});
        this.exportColumns = this.dataHeader.map(col => ({title: col.header, dataKey: col.field}));
        
      }
      else window.alert(res.message);
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
  exportPdf() {
    debugger;
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, this.studentList);
            // doc.text(20, 20, 'Hello world!');
            // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
            doc.save('primengTable.pdf');
        })
    })
  }
  getstudents() {
    let cars = [];
    for(let car of this.studentList) {
        // car.year = car.year.toString();
        cars.push(car);
    }
    return cars;
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudents());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

}
