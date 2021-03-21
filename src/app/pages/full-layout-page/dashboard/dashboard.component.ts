import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavigationService } from 'src/services/navigation.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentDataHeader: Array<Object> = [];
  staffDataHeader: Array<Object> = [];
  studentAttendance: Array<Object> = [];
  selectedColumns: Array<Object> = [];
  sampleDataHeader: Array<Object> = [];
  attendanceList: Array<Object> = [];
  dashboardData: any[] = [];
  overAllStudents: any;
  overAllStaffTotal: number;
  studentCount: any[] = [];
  sampleSelectedColumn: Array<Object> = [];
  sampleYear: Array<Object> = [];
  data: any;
  schoolId: any;
  schoolUdiseCode: any;
  userTypeId: number;
  staffCount: any[] = [];
  pendingRequest: number;
  overAllStudentsTotal: number;
  overAllStudentsTotalBoys: number;
  overAllStudentsTotalGirls: number;
  overAllStaffTotalGents: number;
  overAllStaffTotalLadies: number;
  inValidAadharCount: number;
  inValidPhoneCount: number;
  facilitieList: any[] = [];
  nonfailitieList: any[] = [];
  funcFacilitiesList: any[] = [];
  nonfuncFacilitiesList: any[] = [];
  funcFaclitiesHeader: any[] = [];

  staffAttendanceDayList: any[] = [];
  staffAttendanceWeekList: any[] = [];
  staffAttendanceMonthList: any[] = [];
  staffAttendanceQuaterlyList: any[] = [];

  staffAttendanceDayList1: any[] = [];
  staffAttendanceWeekList1: any[] = [];
  staffAttendanceMonthList1: any[] = [];
  staffAttendanceQuaterlyList1: any[] = [];

  studentAttendanceDayList: any[] = [];
  studentAttendanceWeekList: any[] = [];
  studentAttendanceMonthList: any[] = [];
  studentAttendanceQuaterlyList: any[] = [];
  studentAttendanceDayList1: any[] = [];
  studentAttendanceWeekList1: any[] = [];
  studentAttendanceMonthList1: any[] = [];
  studentAttendanceQuaterlyList1: any[] = [];

  studaytop: any[] = [];
  stuweektop: any[] = [];
  stumonthtop: any[] = [];
  stuquattop: any[] = [];

  studaybot: any[] = [];
  stuweekbot: any[] = [];
  stumonthbot: any[] = [];
  stuquatbot: any[] = [];

  stafdaytop: any[] = [];
  stafweektop: any[] = [];
  stafmonthtop: any[] = [];
  stafquattop: any[] = [];

  stafdaybot: any[] = [];
  stafweekbot: any[] = [];
  stafmonthbot: any[] = [];
  stafquatbot: any[] = [];

  staff: any[];
  staff1: any[];
  staff2: any[];
  staff3: any[];

  display: boolean = false;
  display1: boolean = false;
  NewStudentDataHeader: { field: string; header: string; }[];
  tranferstudentdata: any;
  noDataFound: boolean;
  Studenttranferlength: number;
  freshstudentdata: any;
  Studenttranferfresslength: number;
  countmale: number;
  download1: any;
  download2: any;
  download3: any;
  download4: any;
  cateId: any;
  schoolTypeId: any;


  constructor(private dashboardService: DashboardService,
    private userSessionService: UserSessionService,
    private navigationService: NavigationService,
    private messageService: MessageService,
    private router: Router) {
    
    this.schoolId = this.userSessionService.schoolId();
    this.schoolUdiseCode = this.userSessionService.userName();
    this.userTypeId = this.userSessionService.userTypeId();
    this.cateId = this.userSessionService.cate_id();
    this.schoolTypeId = this.userSessionService.schoolTypeId();
    this.router = router;
  }

  ngOnInit() {
    this.onDownload1();
    this.onDownload2();
    this.onDownload3();
    this.onDownload4();
    if (this.userTypeId != 1) {
      this.router.navigate(['/statedashboard']);
    }
    this.sampleData();
    this.getDashBoardData();
    this.getInvalidAadharCount();
    this.getInvalidPhoneNoCount();
    this.getstudenttransferdata();
    this.getfreshstudentdata();
    // this.getFunctionalFacilitiesList();
    // this.getNonFunctionalFacilitiesList();

    // this.getStaffDayAttendance();
    // this.getStaffWeekAttendance();
    // this.getStaffMonthAttendance();
    // this.getStaffQuaterlyAttendance();

    // this.getStudentDayAttendance();
    // this.getStudentWeekAttendance();
    // this.getStudentMonthAttendance();
    // this.getStudentQuaterlyAttendance();


    this.staff = [
      { field: 'day_teachabper', header: 'Teaching' },
      { field: 'day_nontabper', header: 'Non Teaching' },
      { field: 'day_overall', header: 'Overall' }
    ];
    this.staff1 = [
      { field: 'weekly_teach_per', header: 'Teaching' },
      { field: 'weekly_nonteach_per', header: 'Non Teaching' },
      { field: 'weekly_overall', header: 'Overall' }
    ];
    this.staff2 = [
      { field: 'monthly_teach_per', header: 'Teaching' },
      { field: 'monthly_nonteach_per', header: 'Non Teaching' },
      { field: 'monthly_overall', header: 'Overall' }
    ];
    this.staff3 = [
      { field: 'yearly_teach_per', header: 'Teaching' },
      { field: 'yearly_nonteach_per', header: 'Non Teaching' },
      { field: 'yearly_overall', header: 'Overall' }
    ];
  }

  showDialog() {
    this.display = true;
  }

  showDialog1() {
    this.display1 = true;
  }

  getFunctionalFacilitiesList() {
    ;
    this.dashboardService.functionalFacilitiesList().subscribe((res) => {
      if (res) {
        ;
        this.funcFacilitiesList = res.result.facilities;
      }
    });
  }
  getNonFunctionalFacilitiesList() {
    this.dashboardService.nonfunctionalFacilitiesList().subscribe((result) => {
      if (result) {
        ;
        this.nonfuncFacilitiesList = result.result.facilities;
      }
    });
  }

  getStaffDayAttendance() {
    this.dashboardService.staffDayAttendance().subscribe((staffdayresult) => {
      if (staffdayresult) {
        this.staffAttendanceDayList = staffdayresult.result.staffoverall;
        this.staffAttendanceDayList1 = staffdayresult.result.staff;
        this.stafdaytop = this.staffAttendanceDayList1.slice(0, 5);
        this.stafdaybot = this.staffAttendanceDayList1.slice(-5).reverse();
        console.log(this.stafdaybot);

      }
    });
  }

  getStaffWeekAttendance() {

    this.dashboardService.staffWeekAttendance().subscribe((staffweekresult) => {
      if (staffweekresult) {
        this.staffAttendanceWeekList = staffweekresult.result.staffoverall;
        this.staffAttendanceWeekList1 = staffweekresult.result.staff;
        this.stafweektop = this.staffAttendanceWeekList1.slice(0, 5);
        this.stafweekbot = this.staffAttendanceWeekList1.slice(-5).reverse();
      }
    });
  }

  getStaffMonthAttendance() {
    this.dashboardService.staffMonthAttendance().subscribe((staffmonthresult) => {
      if (staffmonthresult) {
        this.staffAttendanceMonthList = staffmonthresult.result.staffoverall;
        this.staffAttendanceMonthList1 = staffmonthresult.result.staff;
        this.stafmonthtop = this.staffAttendanceMonthList1.slice(0, 5);
        this.stafmonthbot = this.staffAttendanceMonthList1.slice(-5).reverse();
      }
    });
  }

  getStaffQuaterlyAttendance() {
    this.dashboardService.staffQuaterlyAttendance().subscribe((staffquaterlyresult) => {
      if (staffquaterlyresult) {
        this.staffAttendanceQuaterlyList = staffquaterlyresult.result.staffoverall;
        this.staffAttendanceQuaterlyList1 = staffquaterlyresult.result.staff;
        this.stafquattop = this.staffAttendanceQuaterlyList1.slice(0, 5);
        this.stafquatbot = this.staffAttendanceQuaterlyList1.slice(-5).reverse();
      }
    });
  }


  getStudentDayAttendance() {
    this.dashboardService.studentDayAttendance().subscribe((res1) => {
      if (res1) {
        this.studentAttendanceDayList = res1.studentattendance.overall;
        this.studentAttendanceDayList1 = res1.studentattendance.overallclasswise;
        this.studaytop = this.studentAttendanceDayList1.slice(0, 5);
        this.studaybot = this.studentAttendanceDayList1.slice(-5).reverse();
      }
    });
  }

  getStudentWeekAttendance() {
    this.dashboardService.studentWeekAttendance().subscribe((res2) => {
      if (res2) {
        this.studentAttendanceWeekList = res2.studentattendance.overall;
        this.studentAttendanceWeekList1 = res2.studentattendance.overallclasswise;
        this.stuweektop = this.studentAttendanceWeekList1.slice(0, 5);
        this.stuweekbot = this.studentAttendanceWeekList1.slice(-5).reverse();
      }
    });
  }

  getStudentQuaterlyAttendance() {
    this.dashboardService.studentMonthAttendance().subscribe((res3) => {
      if (res3) {
        ;
        this.studentAttendanceMonthList = res3.studentattendance.overall;
        this.studentAttendanceMonthList1 = res3.studentattendance.overallclasswise;
        this.stumonthtop = this.studentAttendanceMonthList1.slice(0, 5);
        this.stumonthbot = this.studentAttendanceMonthList1.slice(-5).reverse();
      }
    });
  }


  getStudentMonthAttendance() {
    this.dashboardService.studentQuaterlyAttendance().subscribe((res4) => {
      if (res4) {
        ;
        this.studentAttendanceQuaterlyList = res4.studentattendance.overall;
        this.studentAttendanceQuaterlyList1 = res4.studentattendance.overallclasswise;
        this.stuquattop = this.studentAttendanceQuaterlyList1.slice(0, 5);
        this.stuquatbot = this.studentAttendanceQuaterlyList1.slice(-5).reverse();
      }
    });


  }



  sampleData() {
    this.studentDataHeader = [
      { field: 'body_type', header: 'Class' },
      { field: 'boys', header: 'Boys' },
      { field: 'girls', header: 'Girls' },
      { field: 'total', header: 'Total' }
    ];
    this.staffDataHeader = [
      { field: 'body_type', header: 'Type' },
      { field: 'male', header: 'Male' },
      { field: 'female', header: 'Female' },
      { field: 'total', header: 'Total' }
    ];
    // this.NewStudentDataHeader = [
    //   { field: 'body_type', header: 'Typesssssssss' },
    //   { field: 'male', header: 'Male' },
    //   { field: 'female', header: 'Female' },
    //   { field: 'total', header: 'Total' }
    // ];
    this.sampleDataHeader = [
      { field: 'boys', header: 'Boys' },
      { field: 'girls', header: 'Girls' },
      { field: 'total', header: 'Total' },
    ];
    this.sampleSelectedColumn = this.sampleDataHeader;
    this.studentAttendance = [
      { "body_type": "Boys Present", "lkg": "51/54", "pre_kg": "52/54", "I_Std": "51/54", "II_Std": "51/54", "III_Std": "51/54", "IV_Std": "51/54", },
      { "body_type": "Girls Present", "lkg": "51/54", "pre_kg": "52/54", "I_Std": "51/54", "II_Std": "51/54", "III_Std": "51/54", "IV_Std": "51/54", },

    ];
    this.sampleYear = [{ label: '2019', value: '2019' },
    { label: '2018', value: '2018' },
    { label: '2017', value: '2017' }];
    this.attendanceList = [
      { "body_type": "LKG", "boys": "51", "girls": "43", "total": "94" },
      { "body_type": "UKG", "boys": "51", "girls": "43", "total": "94" },
      { "body_type": "I Std", "boys": "51", "girls": "43", "total": "94" },
      { "body_type": "II Std", "boys": "51", "girls": "43", "total": "94" },
      { "body_type": "III Std", "boys": "51", "girls": "43", "total": "94" },
      { "body_type": "IV Std", "boys": "51", "girls": "43", "total": "94" },


    ];
    this.selectedColumns = this.studentDataHeader;
    this.facilitieList = [
      { label: 'Drinking Water' },
      { label: 'Gents Toilet' },
      { label: 'Boys Toilet' },
      { label: 'Boys Urinals' },
      { label: 'Incinerator' },
      { label: 'Ladies Toilet' },
      { label: 'Girls Toilet' },
      { label: 'Girls Urinals' }
    ];
    this.nonfailitieList = [
      { label: 'Drinking Water', value: 'drinkingwater' },
      { label: 'Gents Toilet', value: 'staffgentstoil' },
      { label: 'Boys Toilet' },
      { label: 'Boys Urinals' },
      { label: 'Incinerator' },
      { label: 'Ladies Toilet' },
      { label: 'Girls Toilet' },
      { label: 'Girls Urinals' }
    ];
  }
  getInvalidAadharCount() {
    this.dashboardService.invalidAadharCount().subscribe((res) => {
      if (res) {
        this.inValidAadharCount = res.result[0].cnt;
      }
    });
  }
  getInvalidPhoneNoCount() {
    this.dashboardService.invalidPhoneNoCount().subscribe((res) => {
      if (res) {
        this.inValidPhoneCount = res.result[0].cnt;
      }
    });
  }
  getDashBoardData() {
    this.data = { "records": { "school_udise_code": this.schoolUdiseCode, "user_id": this.schoolId, "school_id": this.schoolId, "user_type_id": this.userTypeId } }
    this.dashboardService.getDashboardData(this.data, true).subscribe((res) => {
      if (res) {
        this.dashboardData = res.result;
        this.overAllStudents = this.dashboardData['overall_schools_students'];
        this.overAllStudentsTotal = this.dashboardData['overall_schools_students']['total'];
        this.overAllStudentsTotalBoys = this.dashboardData['overall_schools_students']['total_boys'];
        this.overAllStudentsTotalGirls = this.dashboardData['overall_schools_students']['total_girls'];
        this.overAllStaffTotal = this.dashboardData['overall_schools_teachers']['total'];
        this.overAllStaffTotalGents = this.dashboardData['overall_schools_teachers']['total_gents'];
        this.overAllStaffTotalLadies = this.dashboardData['overall_schools_teachers']['total_ladies'];
        this.pendingRequest = this.dashboardData['pending_student_transfer']['pending_student_transfer_count'];
        this.studentCount = res.result.categorized_classwise_count;
        // this.dashboardData.categorized_classwise_count.forEach(x => {
        //   this.studentCount.push({
        //     body_type:x.body_type,

        //   });
      }
      this.staffCount = res.result.categorized_staff_details;
      this.staffCount.splice(2);
    });
    //});
  }
  getstudenttransferdata() {
    ;
    const schoolid = this.schoolId;
    this.dashboardService.getstudenttransferdata(schoolid).subscribe((res) => {
      console.log("studentdata", res)
      if (res.dataStatus == true) {
        this.tranferstudentdata = res.data;
        this.Studenttranferlength = +this.tranferstudentdata.length;
        console.log(this.Studenttranferlength);
      } else {
        this.Studenttranferlength = 0;
        console.log("studentelse" + this.Studenttranferlength);
        this.noDataFound = true;
      }
    });
  }
  getfreshstudentdata() {
    const schoolid = this.schoolId;
    this.dashboardService.getfreshstudentdata(schoolid).subscribe((res) => {
      if (res.dataStatus == true) {
        this.freshstudentdata = res.data;
        this.Studenttranferfresslength = +this.freshstudentdata.length;
        console.log(this.Studenttranferfresslength);
      } else {
        this.Studenttranferfresslength = 0;
        console.log("freshelse" + this.Studenttranferfresslength);
        this.noDataFound = true;
      }
    });
  }
  goToMaster() {
    this.navigationService.goToMasterTimetable();

  }
  goToWeekly() {
    this.navigationService.goToWeeklyTimetable();
  }
  goToToday() {
    this.navigationService.goToTodayTimetable();
  }
  goToInvalidAadhar() {
    this.navigationService.goToInvalidAadharList();
  }
  goToInvalidPhone() {
    this.navigationService.goToInvalidPhoneList();
  }

  goTotranferdetails() {
    this.navigationService.goToStudentTransfer();
  }
  goTotranferfreshdetails() {
    this.navigationService.goToStudentFershTransfer();
  }

  //document download
  onDownload1() {
    
    var bucketName = "renewalapplicationemis";
    var filename = "Parent_Consent_Tamil.pdf";
    let expiry: number = 1800;
    this.dashboardService.getUploadedFiles(bucketName, filename, expiry).subscribe((result) => {
      if (result) {
        ;
        this.download1 = result.url;
      }
      else {

        this.messageService.add({ severity: 'warn', summary: 'Error in Uploading File please try again', detail: '' });
      }
    });
  }
  onDownload2() {
    
    var bucketName = "renewalapplicationemis";
    var filename = "School_Consent_English.pdf";
    let expiry: number = 1800;
    this.dashboardService.getUploadedFiles(bucketName, filename, expiry).subscribe((result) => {
      if (result) {
        ;
        this.download2 = result.url;
      }
      else {

        this.messageService.add({ severity: 'warn', summary: 'Error in Uploading File please try again', detail: '' });
      }
    });
  }
  onDownload3() {
    
    var bucketName = "renewalapplicationemis";
    var filename = "School_Consent_Tamil.pdf";
    let expiry: number = 1800;
    this.dashboardService.getUploadedFiles(bucketName, filename, expiry).subscribe((result) => {
      if (result) {
        ;
        this.download3 = result.url;
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Error in Uploading File please try again', detail: '' });
      }
    });
  }
  onDownload4() {
    
    var bucketName = "renewalapplicationemis";
    var filename = "Health_Profile_English.pdf";
    let expiry: number = 1800;
    this.dashboardService.getUploadedFiles(bucketName, filename, expiry).subscribe((result) => {
      if (result) {
        ;
        this.download4 = result.url;
      }
      else {

        this.messageService.add({ severity: 'warn', summary: 'Error in Uploading File please try again', detail: '' });
      }
    });
  }

  downloadVideo(filename) {
    
    debugger;
    var bucketName = "lmes-content";
    var filename = filename;
    let expiry: number = 1800;
    this.dashboardService.getUploadedFiles(bucketName, filename, expiry).subscribe((result) => {
        if (result) {
            debugger;
            this.dashboardService.download(result.url)
            .subscribe(blob => {
              debugger;
              const a = document.createElement('a')
              const objectUrl = URL.createObjectURL(blob)
              a.href = objectUrl
              a.download = filename;
              a.click();
              URL.revokeObjectURL(objectUrl);
            })
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Error in Uploading File please try again', detail: '' });
        }
    });
}
}
