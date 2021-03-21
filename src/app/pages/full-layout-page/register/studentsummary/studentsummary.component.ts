import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-studentsummary',
  templateUrl: './studentsummary.component.html',
  styleUrls: ['./studentsummary.component.css']
})
export class StudentsummaryComponent implements OnInit {
  schoolId: any;
  routeData: any;
  pageId: any;
  cols1: any[] = [];
  sampleSelectedColumn1: Array<Object> = [];
  cols2: any[] = [];
  sampleSelectedColumn2: Array<Object> = [];
  cols3: any[] = [];
  sampleSelectedColumn3: Array<Object> = [];
  cols4: any[] = [];
  sampleSelectedColumn4: Array<Object> = [];
  cols5: any[] = [];
  sampleSelectedColumn5: Array<Object> = [];
  cols6: any[] = [];
  sampleSelectedColumn6: Array<Object> = [];
  cols7: any[] = [];
  sampleSelectedColumn7: Array<Object> = [];
  pipe = new DatePipe('en-US');
  rte: any;
  rteData: any;
  noDataFound: boolean;
  cwsn: any;
  cwsn1: any;
  cwsnData: any;
  cwsnData1: any;
  religiondata: any;
  religion: any;
  poverty: any;
  povertyData: any;
  aadhar: any;
  aadharData: any;
  age: any;
  ageData: any;
  com: any;
  comData: any;
  exportColumns: any;

  constructor(
    private registersService: RegisterService,
    private cs: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSessionService: UserSessionService
  ) {
    debugger
    this.schoolId = this.userSessionService.schoolId();
    this.routeData = this.route.snapshot;
    this.pageId = this.routeData.queryParams.PageId;
  }

  ngOnInit() {
    this.headerData();
    if (this.pageId == 1) {
      this.getRTEStudent();
    }
    if (this.pageId == 2) {
      this.getCWSN();
    }
    if (this.pageId == 3) {
      this.getReligion();
    }
    if (this.pageId == 4) {
      this.getBelowPoverty();
    }
    if (this.pageId == 5) {
      this.getAADHAR();
    }
    if (this.pageId == 6) {
      this.getAge();
    }
    if (this.pageId == 7) {
      this.getCommunity();
    }
  }


  headerData() {
    // RTE Student Register
    this.cols1 = [
      { field: 'unique_id_no', header: 'Unique Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'community_name', header: 'Community' },
      { field: 'dob', header: 'DOB', widthstyle: '15em' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'child_admitted_under_reservation', header: 'RTE Status' },
      { field: 'rte_type', header: 'RTE Type' },
    ];
    this.sampleSelectedColumn1 = this.cols1;
    // CWSN-Student Register
    this.cols2 = [
      { field: 'da_name', header: 'Disability', widthstyle: '10em' },
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
    this.sampleSelectedColumn2 = this.cols2;

    this.cols3 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'da_name', header: 'Disability' }
    ];
    this.sampleSelectedColumn3 = this.cols3;
    // Students Religion Details
    this.cols4 = [
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
    this.sampleSelectedColumn4 = this.cols4;
    // Students under Below Poverty Line
    this.cols5 = [
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
    this.sampleSelectedColumn5 = this.cols5;
    // Students Report By Age
    this.cols6 = [
      { field: 'Age', header: 'Age', widthstyle: '9em' },
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
      { field: 'tot', header: 'Total', widthstyle: '9em' }
    ];
    this.sampleSelectedColumn6 = this.cols6;
    // Students Community Details
    this.cols7 = [
      { field: 'community_name', header: 'Community', widthstyle: '14em' },
      { field: 'Prkg_b', header: 'PreKG-Boys', widthstyle: '9em' },
      { field: 'Prkg_g', header: 'PreKG-Girls', widthstyle: '9em' },
      { field: 'lkg_b', header: 'LKG-Boys', widthstyle: '9em' },
      { field: 'lkg_g', header: 'LKG-Girls', widthstyle: '9em' },
      { field: 'ukg_b', header: 'UKG-Boys', widthstyle: '9em' },
      { field: 'ukg_g', header: 'UKG-Girls', widthstyle: '9em' },
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
      { field: 'total_t', header: 'Total', widthstyle: '9em' }
    ];
    this.sampleSelectedColumn7 = this.cols7;
  }


  // RTE Student Register
  getRTEStudent() {
    const classsection = {
      emis_school_id: this.schoolId
    };
    this.registersService.getRTEStudentRegister(classsection, true).subscribe((res) => {
      if (res) {
        this.rte = res.result.RTI_List;
        this.rte['dob'] = this.pipe.transform(this.rte['dob'], 'dd-MM-yyyy');
        if (this.rte.length > 0) {
          this.rteData = this.rte;
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


  // CWSN-Student Register
  getCWSN() {
    this.registersService.getCWSNStudentRegister(this.schoolId).subscribe((res) => {
      if (res) {
        this.cwsn = res.result.allstuds;
        this.cwsn1 = res.result.stud_detail;
        if (this.cwsn.length > 0) {
          this.cwsnData = this.cwsn;

        } else if (this.cwsn1.length > 0) {
          this.cwsnData1 = this.cwsn1;
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

  // Students Religion Details
  getReligion() {
    this.registersService.getStudentsReligionDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.religion = res.result.school_community;
        if (this.religion.length > 0) {
          this.religiondata = this.religion;
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

  // Students under Below Poverty Line
  getBelowPoverty() {
    this.registersService.getStudentsUnderbelowPovertyline(this.schoolId).subscribe((res) => {
      if (res) {
        this.poverty = res.result.school_community;
        if (this.poverty.length > 0) {
          this.povertyData = this.poverty;
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

  // Students having Valid AADHAR
  getAADHAR() {
    this.registersService.getStudentsAadharDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.aadhar = res.result.school_community;
        if (this.aadhar.length > 0) {
          this.aadharData = this.aadhar;
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

  // Students Report By Age
  getAge() {
    this.registersService.getStudentsReportbyAge(this.schoolId).subscribe((res) => {
      if (res) {
        this.age = res.result.student_age;
        if (this.age.length > 0) {
          this.ageData = this.age;
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

  // Students Community Details
  getCommunity() {
    this.registersService.getStudentsCommunityDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.com = res.result.school_community;
        if (this.com.length > 0) {
          this.comData = this.com;
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

// common for all
onBack() {
  this.router.navigate(['/register']);
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
