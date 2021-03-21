import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cwsn-student-reg',
  templateUrl: './cwsn-student-reg.component.html',
  styleUrls: ['./cwsn-student-reg.component.css']
})
export class CwsnStudentRegComponent implements OnInit {
  cols: any[] = [];
  cols1: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  data1: any[] = [];
  sampleSelectedColumn: Array<Object> = [];
  sampleSelectedColumn1: Array<Object> = [];
  excelExportData: any[] = [];
  excelExportData1: any[] = [];
  noDataFound: boolean;
  result1: any;
  result2: any;
  exportColumns: any[] = [];


  constructor(private registersService: RegistersService,
    private router: Router,
    private userSessionService: UserSessionService) {
    this.emis_school_id = this.userSessionService.schoolId();
  }


  ngOnInit() {
    this.getData();
    this.headerData();
  }


  headerData() {
    this.cols = [
      { field: 'da_name', header: 'Disability',widthstyle: '10em' },
      { field: 'cls_1', header: 'I' },
      { field: 'cls_2', header: 'II' },
      { field: 'cls_3', header: 'III' },
      { field: 'cls_4', header: 'IV' },
      { field: 'cls_5', header: 'V' },
      { field: 'cls_6', header: 'VI' },
      { field: 'cls_7', header: 'VII' },
      { field: 'cls_8', header: 'VIII' },
      { field: 'cls_9', header: 'IX' },
      { field: 'cls_10', header: 'X' },
      { field: 'cls_11', header: 'XI' },
      { field: 'cls_12', header: 'XII' },
      { field: 'total', header: 'Total' }
    ];
    this.sampleSelectedColumn = this.cols;

    this.cols1 = [
      { field: 'unique_id_no', header: 'EMIS No' },
      { field: 'name', header: 'Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'da_name', header: 'Disability' }
    ];
    this.sampleSelectedColumn1 = this.cols1;
  }


  getData() {
    debugger
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCWSNStudentRegister(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.result1 = res.result.allstuds;
        this.result2 = res.result.stud_detail;
        if (this.result1.length > 0) {
          this.data = this.result1;

        } else if (this.result2.length > 0) {
          this.data1 = this.result2;
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
        doc.save('Verificationstatus.pdf');
      })
    })
  }

  exportExcel(data) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Verificationstatus");
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