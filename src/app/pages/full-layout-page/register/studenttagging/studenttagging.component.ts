import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-studenttagging',
  templateUrl: './studenttagging.component.html',
  styleUrls: ['./studenttagging.component.css']
})
export class StudenttaggingComponent implements OnInit {
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
  nmmsresult: any;
  noDataFound: boolean;
  nmmsdata: any;
  trstseresult: any;
  trstsedata: any;
  oscresult: any;
  oscdata: any;
  inspireresult: any;
  inspiredata: any;
  vocresult: any;
  vocdata: any;
  sportsresult: any;
  sportsdata: any;
  exportColumns: any;


  constructor(private registersService: RegisterService,
    private cs: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSessionService: UserSessionService) {
    debugger
    this.schoolId = this.userSessionService.schoolId();
    this.routeData = this.route.snapshot;
    this.pageId = this.routeData.queryParams.PageId;
  }

  ngOnInit() {
    this.headerData();
    if (this.pageId == 1) {
      this.getNMMS();
    }
    if (this.pageId == 2) {
      this.getTRSTSE();
    }
    if (this.pageId == 3) {
      this.getOutofSchool();
    }
    if (this.pageId == 4) {
      this.getInspireAward();
    }
    if (this.pageId == 5) {
      this.getVocational();
    }
    if (this.pageId == 6) {
      this.getSports();
    }
  }

  headerData() {
    // NMMS Scheme
    this.cols1 = [
      { field: 'student_id', header: 'Student Id' , widthstyle: '10em'},
      { field: 'name', header: 'Student Name' , widthstyle: '15em'},
      { field: 'gender', header: 'Gender', widthstyle: '8em' },
      { field: 'class', header: 'Class Studying' , widthstyle: '8em'},
      { field: 'section', header: 'Section' , widthstyle: '8em'},
      { field: 'community_name', header: 'Community' , widthstyle: '15em'},
      { field: 'nmmsexam_passed', header: 'NMMS Exam Passed On', widthstyle: '15em' },
    ];
    this.sampleSelectedColumn1 = this.cols1;
    // TRSTSE Scholarship Scheme
    this.cols2 = [
      { field: 'student_id', header: 'Student Id', widthstyle: '13em' },
      { field: 'name', header: 'Student Name' , widthstyle: '15em'},
      { field: 'gender', header: 'Gender' , widthstyle: '10em'},
      { field: 'class', header: 'Class Studing' , widthstyle: '15em'},
      { field: 'community_name', header: 'Community' , widthstyle: '10em'},
      { field: 'trstse', header: 'TRSTSE' , widthstyle: '10em'},
    ];
    this.sampleSelectedColumn2 = this.cols2;
    // Out Of School Children Register
    this.cols3 = [
      { field: 'unique_id_no', header: 'Unique Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'pre_stus', header: 'present Status' },
      { field: 'training_type', header: 'Training Type' },
      { field: 'ac_year', header: 'Academic Year' },
    ];
    this.sampleSelectedColumn3 = this.cols3;
    // Inspire Award Details
    this.cols4 = [
      { field: 'student_id', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class', header: 'Class Studing' },
      { field: 'community_name', header: 'Community' },
      { field: 'inspire', header: 'Date of issue of the Award' },
      { field: 'remarks', header: 'Remarks' },

    ];
    this.sampleSelectedColumn4 = this.cols4;
    // Vocational Student (NSQF) Register
    this.cols5 = [
      { field: 'job_role', header: 'Job Role' , widthstyle: '10em'},
      { field: 'job_sector', header: 'Job Sector' , widthstyle: '10em'},
      { field: 'cnt_b', header: 'Boys Total', widthstyle: '7em' }, { field: 'cnt_g', header: 'Girls Total' , widthstyle: '7em'},
      { field: 'PREKG_b', header: 'PreKG-Boys', widthstyle: '7em' }, { field: 'PREKG_g', header: 'PreKG-Girls' , widthstyle: '7em'},
      { field: 'LKG_b', header: 'LKG-Boys', widthstyle: '7em' }, { field: 'LKG_g', header: 'LKG-Girls', widthstyle: '7em' },
      { field: 'UKG_b', header: 'UKG-Boys' , widthstyle: '7em'}, { field: 'UKG_g', header: 'UKG-Girls' , widthstyle: '7em'},
      { field: 'c1_b', header: 'I-Boys' , widthstyle: '7em'}, { field: 'c1_g', header: 'I-Girls' , widthstyle: '7em'},
      { field: 'c2_b', header: 'II-Boys' , widthstyle: '7em'}, { field: 'c2_g', header: 'II-Girls' , widthstyle: '7em'},
      { field: 'c3_b', header: 'III-Boys' , widthstyle: '7em'}, { field: 'c3_g', header: 'III-Girls', widthstyle: '7em' },
      { field: 'c4_b', header: 'IV-Boys' , widthstyle: '7em'}, { field: 'c4_g', header: 'IV-Girls' , widthstyle: '7em'},
      { field: 'c5_b', header: 'V-Boys' , widthstyle: '7em'}, { field: 'c5_g', header: 'V-Girls' , widthstyle: '7em'},
      { field: 'c6_b', header: 'VI-Boys' , widthstyle: '7em'}, { field: 'c6_g', header: 'VI-Girls' , widthstyle: '7em'},
      { field: 'c7_b', header: 'VII-Boys' , widthstyle: '7em'}, { field: 'c7_g', header: 'VII-Girls' , widthstyle: '7em'},
      { field: 'c8_b', header: 'VIII-Boys' , widthstyle: '7em'}, { field: 'c8_g', header: 'VIII-Girls', widthstyle: '7em' },
      { field: 'c9_b', header: 'IX-Boys' , widthstyle: '7em'}, { field: 'c9_g', header: 'IX-Girls', widthstyle: '7em' },
      { field: 'c10_b', header: 'X-Boys' , widthstyle: '7em'}, { field: 'c10_g', header: 'X-Girls' , widthstyle: '7em'},
      { field: 'c11_b', header: 'XI-Boys' , widthstyle: '7em'}, { field: 'c11_g', header: 'XI-Girls', widthstyle: '7em' },
      { field: 'c12_b', header: 'XII-Boys' , widthstyle: '7em'}, { field: 'c12_g', header: 'XII-Girls', widthstyle: '7em' }
    ];
    this.sampleSelectedColumn5 = this.cols5;
    // Students Sports Participation
    this.cols6 = [
      { field: 'unique_id_no', header: 'UDISE No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'game_participating', header: 'Game Participating' },
      { field: 'last_participating_date', header: 'Participating Date' },
      { field: 'last_participating_level', header: 'Played Level' },
      { field: 'winner_level_details', header: 'Winner Level Details' },
    ];
    this.sampleSelectedColumn6 = this.cols6;
  }


  // NMMS Scheme
  getNMMS() {
    this.registersService.getNMMSScheme(this.schoolId).subscribe((res) => {
      if (res) {
        this.nmmsresult = res.result.nmms;
        if (this.nmmsresult.length > 0) {
          this.nmmsdata = this.nmmsresult;
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


  // TRSTSE Scholarship Scheme
  getTRSTSE() {
    this.registersService.getTrstseScholarshipData(this.schoolId).subscribe((res) => {
      if (res) {
        this.trstseresult = res.result.trstse;
        if (this.trstseresult.length > 0) {
          this.trstsedata = this.trstseresult;
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

  // Out Of School Children Register
  getOutofSchool() {
    this.registersService.getOutofSchollChildern(this.schoolId).subscribe((res) => {
      if (res) {
        this.oscresult = res.result.student_osc;
        if (this.oscresult.length > 0) {
          this.oscdata = this.oscresult;
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

  // Inspire Award Details
  getInspireAward() {
    this.registersService.getInspireAwardDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.inspireresult = res.result.inspire;
        if (this.inspireresult.length > 0) {
          this.inspiredata = this.inspireresult;
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

  // Vocational Student (NSQF) Register
  getVocational() {
    this.registersService.getVocationalStudentNSQF(this.schoolId).subscribe((res) => {
      if (res) {
        this.vocresult = res.result.school_community;
        if (this.vocresult.length > 0) {
          this.vocdata = this.vocresult;
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

  // Students Sports Participation
  getSports() {
    const classsection = {
      emis_school_id: this.schoolId
    };
    this.registersService.getStudentSportsParticipation(classsection, true).subscribe((res) => {
      if (res) {
        this.sportsresult = res.result.student_tag1;
        if (this.sportsresult.length > 0) {
          this.sportsdata = this.sportsresult;
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
