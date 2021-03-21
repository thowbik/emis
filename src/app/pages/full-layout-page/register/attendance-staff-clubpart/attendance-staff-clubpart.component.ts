import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance-staff-clubpart',
  templateUrl: './attendance-staff-clubpart.component.html',
  styleUrls: ['./attendance-staff-clubpart.component.css']
})
export class AttendanceStaffClubpartComponent implements OnInit {

  // Students Attendance Register
  cols: any[];
  classsection: FormGroup;
  assigned_section1: any;
  classsec: any = { result: '' };
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  classlist: any;
  public schoolId: any;
  date: Date;
  sample: any;
  studentattendacereglist: any[] = [];
  exportColumns: any;
  sampleSelectedColumn: Array<Object> = [];
  routeData: any;
  pageId: any;
  result: any;
  noDataFound: boolean;

  // Staff Attendance Register
  cols1: any[];
  sampleSelectedColumn1: Array<Object> = [];
  classsection1: FormGroup;
  staffattendacereglist: any[] = [];
  staffresult: any;
  noDataFound1: boolean;
  sample1: string;

  // Staff Training Details
  cols2: any[];
  sampleSelectedColumn2: Array<Object> = [];
  stafftraining: any;
  trainingData: any;
  noDataFound3: boolean;
  classsection2: FormGroup;

  // Club Participation Register
  selectedColumns: Array<Object> = [];
  clubdata: any;
  clubData: any;
  noDataFound4: boolean;
  clubColumn: any[];

  // Hill Station
  hillcols: any[];
  hillColumn: Array<Object> = [];
  hillresult: any;
  data: any;

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
    this.validators();
    this.getData();
    if (this.pageId == 5) {
      this.getCostFreeCutSweater();
    } else if (this.pageId == 6) {
      this.getCostFreeboot();
    } else if (this.pageId == 7) {
      this.getCostFreeSocks();
    } else if (this.pageId == 8) {
      this.getCostFreeRaincoat();
    } else {

    }
  }



  headerData() {
    // Students Attendance Register
    this.cols = [
      { field: 'name', header: 'Student Name', widthstyle: '18em' },
      { field: '1', header: '1', widthstyle: '5em' }, { field: '2', header: '2', widthstyle: '5em' }, { field: '3', header: '3', widthstyle: '5em' },
      { field: '4', header: '4', widthstyle: '5em' }, { field: '5', header: '5', widthstyle: '5em' }, { field: '6', header: '6', widthstyle: '5em' },
      { field: '7', header: '7', widthstyle: '5em' }, { field: '8', header: '8', widthstyle: '5em' }, { field: '9', header: '9', widthstyle: '5em' },
      { field: '10', header: '10', widthstyle: '5em' }, { field: '11', header: '11', widthstyle: '5em' }, { field: '12', header: '12', widthstyle: '5em' },
      { field: '13', header: '13', widthstyle: '5em' }, { field: '14', header: '14', widthstyle: '5em' }, { field: '15', header: '15', widthstyle: '5em' },
      { field: '16', header: '16', widthstyle: '5em' }, { field: '17', header: '17', widthstyle: '5em' }, { field: '18', header: '18', widthstyle: '5em' },
      { field: '19', header: '19', widthstyle: '5em' }, { field: '20', header: '20', widthstyle: '5em' }, { field: '21', header: '21', widthstyle: '5em' },
      { field: '22', header: '22', widthstyle: '5em' }, { field: '23', header: '23', widthstyle: '5em' }, { field: '24', header: '24', widthstyle: '5em' },
      { field: '25', header: '25', widthstyle: '5em' }, { field: '26', header: '26', widthstyle: '5em' }, { field: '27', header: '27', widthstyle: '5em' },
      { field: '28', header: '28', widthstyle: '5em' }, { field: '29', header: '29', widthstyle: '5em' }, { field: '30', header: '30', widthstyle: '5em' },
      { field: '31', header: '31', widthstyle: '5em' }
    ];
    this.sampleSelectedColumn = this.cols;

    // Staff Attendance Register
    this.cols1 = [
      { field: 'teacher_name', header: 'Staff Name', widthstyle: '18em' },
      { field: '1', header: '1', widthstyle: '5em' }, { field: '2', header: '2', widthstyle: '5em' }, { field: '3', header: '3', widthstyle: '5em' },
      { field: '4', header: '4', widthstyle: '5em' }, { field: '5', header: '5', widthstyle: '5em' }, { field: '6', header: '6', widthstyle: '5em' },
      { field: '7', header: '7', widthstyle: '5em' }, { field: '8', header: '8', widthstyle: '5em' }, { field: '9', header: '9', widthstyle: '5em' },
      { field: '10', header: '10', widthstyle: '5em' }, { field: '11', header: '11', widthstyle: '5em' }, { field: '12', header: '12', widthstyle: '5em' },
      { field: '13', header: '13', widthstyle: '5em' }, { field: '14', header: '14', widthstyle: '5em' }, { field: '15', header: '15', widthstyle: '5em' },
      { field: '16', header: '16', widthstyle: '5em' }, { field: '17', header: '17', widthstyle: '5em' }, { field: '18', header: '18', widthstyle: '5em' },
      { field: '19', header: '19', widthstyle: '5em' }, { field: '20', header: '20', widthstyle: '5em' }, { field: '21', header: '21', widthstyle: '5em' },
      { field: '22', header: '22', widthstyle: '5em' }, { field: '23', header: '23', widthstyle: '5em' }, { field: '24', header: '24', widthstyle: '5em' },
      { field: '25', header: '25', widthstyle: '5em' }, { field: '26', header: '26', widthstyle: '5em' }, { field: '27', header: '27', widthstyle: '5em' },
      { field: '28', header: '28', widthstyle: '5em' }, { field: '29', header: '29', widthstyle: '5em' }, { field: '30', header: '30', widthstyle: '5em' },
      { field: '31', header: '31', widthstyle: '5em' }
    ];
    this.sampleSelectedColumn1 = this.cols1;

    // Staff Training Details
    this.cols2 = [
      { field: 'teacher_code', header: 'Teacher Code' },
      { field: 'teacher_name', header: 'Teacher Name' },
      { field: 'training_type', header: 'Training Type' },
      { field: 'trained_at', header: 'Trained at' },
      { field: 'training_date', header: 'Date' },
      { field: 'training_days', header: 'No of days in Training' }
    ];
    this.sampleSelectedColumn2 = this.cols2;

    // Club Participation Register
    this.selectedColumns = [
      { field: 'EMIS_ID', header: 'UDISE No' },
      { field: 'StudName', header: 'Student Name' },
      { field: 'Class', header: 'Class' },
      { field: 'ParticipationIn', header: 'Participating In' },
      { field: 'Detail', header: 'Details' },
      { field: 'AcademicYr', header: 'Academic Year' },
    ];
    this.clubColumn = this.selectedColumns;
    // Hill Station
    this.hillcols = [
      { field: 'unique_id_no', header: 'UDISE No',widthstyle: '15em' },
      { field: 'name', header: 'Student Name',widthstyle: '15em'},
      { field: 'gender', header: 'Gender',widthstyle: '8em' },
      { field: 'class_studying_id', header: 'Class' ,widthstyle: '8em'},
      { field: 'class_section', header: 'Section' ,widthstyle: '8em'},
      { field: 'MEDINSTR_DESC', header: 'Medium' ,widthstyle: '15em'},
      { field: 'scheme_category', header: 'Size' ,widthstyle: '15em'},
      { field: 'distribution_date', header: 'Distribution Date' ,widthstyle: '15em'}
    ];
    this.hillColumn = this.hillcols;
  }


  validators() {
    // Students Attendance Register
    this.classsection = this.cs.group(
      {
        school_id: [''],
        class_id: ['', Validators.required],
        section: ['', Validators.required],
        date: ['', Validators.required],
      });

    // Staff Attendance Register
    this.classsection1 = this.cs.group(
      {
        emis_school_id: [''],
        date: ['', Validators.required]
      });

    // Staff Training Details
    this.classsection2 = this.cs.group(
      {
        emis_school_id: [''],
        class_id: ['']
      });
    this.classsection2.controls['emis_school_id'].setValue(this.schoolId);
  }





  getData() {
    // Students Attendance Register
    this.registersService.getclasslist(this.schoolId, true).subscribe(bb => {
      this.classsec = bb
      this.classlist = this.classsec['result']
      this.classlist.map(i => i['roman'] = this.class_in_roman[i['class_id']]);
    });

    // Staff Training Details
    this.registersService.getStaffTrainingRegisterDetails(this.classsection2.value, true).subscribe((res) => {
      if (res) {
        this.trainingData = res.result.training_staff_list;
        if (this.trainingData.length > 0) {
          this.stafftraining = this.trainingData;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    });

    // Club Participation Register
    this.registersService.getClubParticipationRegister().subscribe((res) => {
      if (res) {
        this.clubdata = res.result;
        if (this.clubdata.length > 0) {
          this.clubData = this.clubdata;
        }
        else {
          this.noDataFound = true;
        }
      }
      else {
        this.noDataFound = true;
      }
    })
  }




  // Students Attendance Register
  onSelection(e) {
    this.assigned_section1 = '';
    const results = (this.classsec.result).filter(s => s.class_id == e);
    this.assigned_section1 = results[0].revalent_section;
  }

  getStudentDetails() {
    this.sample = moment(this.classsection.value.date).format('MM-YYYY');
    this.classsection.controls['school_id'].setValue(this.schoolId);
    this.classsection.value.date = this.sample;
    if (this.classsection.valid) {
      this.registersService.getStudentAttendanceReport(this.classsection.value, true).subscribe((res) => {
        if (res) {
          this.result = res.result.students_section_details;
          if (this.result.length > 0) {
            this.studentattendacereglist = this.result;
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



  // Staff Attendance Register
  getStaffDetails() {
    this.sample1 = moment(this.classsection1.value.date).format('MM-YY');
    this.classsection1.controls['emis_school_id'].setValue(this.schoolId);
    this.classsection.value.date = this.sample1;
    if (this.classsection1.valid) {
      this.registersService.getStaffAttendanceRegister(this.classsection1.value, true).subscribe((res) => {
        if (res) {
          this.staffresult = res.result.teacher_absent_list;
          if (this.staffresult.length > 0) {
            this.staffattendacereglist = this.staffresult;
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

  // Cost Free Cut-Sweater
  getCostFreeCutSweater() {
    this.registersService.getCostFreeCutSweaterDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.hillresult = res.result.sweater_distribute_details;
        if (this.hillresult.length > 0) {
          this.data = this.hillresult;
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

  // Cost Free boot
  getCostFreeboot() {
    this.registersService.getCostFreeBootDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.hillresult = res.result.boot_distribute_details;
        if (this.hillresult.length > 0) {
          this.data = this.hillresult;
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

  // Cost Free Socks
  getCostFreeSocks() {
    this.registersService.getCostFreeSocksDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.hillresult = res.result.socks_distribute_details;
        if (this.hillresult.length > 0) {
          this.data = this.hillresult;
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

  // Cost Free raincoat
  getCostFreeRaincoat() {
    this.registersService.getCostFreeRaincoatDetails(this.schoolId).subscribe((res) => {
      if (res) {
        this.hillresult = res.result.raincoat_distribute_details;
        if (this.hillresult.length > 0) {
          this.data = this.hillresult;
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
