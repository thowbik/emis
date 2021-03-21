import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentsreligiondetails-reg',
  templateUrl: './studentsreligiondetails-reg.component.html',
  styleUrls: ['./studentsreligiondetails-reg.component.css']
})
export class StudentsreligiondetailsRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn: Array<Object> = [];
  exportExcelData: any[] = [];
  exportColumns: any[] = [];
  noDataFound: boolean;
  result: any;

  constructor(private registersService: RegistersService,
    private router: Router,
    private userSessionService: UserSessionService) {
    this.emis_school_id = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.headerData();
    this.getData();
  }

  headerData() {
    this.cols = [
      { field: 'religion', header: 'Religion', widthstyle: '10em' },
      { field: 'PREKG_b', header: 'PreKG-Boys', widthstyle: '9em' },
      { field: 'PREKG_g', header: 'PreKG-Girls', widthstyle: '9em' },
      { field: 'LKG_b', header: 'LKG-Boys', widthstyle: '9em' },
      { field: 'LKG_g', header: 'LKG-Girls', widthstyle: '9em' },
      { field: 'UKG_b', header: 'UKG-Boys', widthstyle: '9em' },
      { field: 'UKG_g', header: 'UKG-Girls', widthstyle: '9em' },
      { field: 'c1_b', header: 'I-Boys', widthstyle: '9em' },
      { field: 'c1_g', header: 'I-Girls', widthstyle: '9em' },
      { field: 'c2_b', header: 'II-Boys', widthstyle: '9em' },
      { field: 'c2_g', header: 'II-Girls', widthstyle: '9em' },
      { field: 'c3_b', header: 'III-Boys', widthstyle: '9em' },
      { field: 'c3_g', header: 'III-Girls', widthstyle: '9em' },
      { field: 'c4_b', header: 'IV-Boys', widthstyle: '9em' },
      { field: 'c4_g', header: 'IV-Girls', widthstyle: '9em' },
      { field: 'c5_b', header: 'V-Boys', widthstyle: '9em' },
      { field: 'c5_g', header: 'V-Girls', widthstyle: '9em' },
      { field: 'c6_b', header: 'VI-Boys', widthstyle: '9em' },
      { field: 'c6_g', header: 'VI-Girls', widthstyle: '9em' },
      { field: 'c7_b', header: 'VII-Boys', widthstyle: '9em' },
      { field: 'c7_g', header: 'VII-Girls', widthstyle: '9em' },
      { field: 'c8_b', header: 'VIII-Boys', widthstyle: '9em' },
      { field: 'c8_g', header: 'VIII-Girls', widthstyle: '9em' },
      { field: 'c9_b', header: 'IX-Boys', widthstyle: '9em' },
      { field: 'c9_g', header: 'IX-Girls', widthstyle: '9em' },
      { field: 'c10_b', header: 'X-Boys', widthstyle: '9em' },
      { field: 'c10_g', header: 'X-Girls', widthstyle: '9em' },
      { field: 'c11_b', header: 'XI-Boys', widthstyle: '9em' },
      { field: 'c11_g', header: 'XI-Girls', widthstyle: '9em' },
      { field: 'c12_b', header: 'XII-Boys', widthstyle: '9em' },
      { field: 'c12_g', header: 'XII-Girls', widthstyle: '9em' },
      { field: 'total', header: 'Total', widthstyle: '9em' },
    ];
    this.sampleSelectedColumn = this.cols;
  }

  getData() {
    this.registersService.getStudentsReligionDetails(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.result = res.result.school_community;
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