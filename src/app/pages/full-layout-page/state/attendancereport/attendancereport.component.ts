import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-attendancereport',
  templateUrl: './attendancereport.component.html',
  styleUrls: ['./attendancereport.component.scss']
})
export class AttendancereportComponent implements OnInit {
  usertypeId:any;
  DistVar=0;
  blockVar= 0;
  schoolvar=0;
  schoolvarsection=0;
  schoolvarsection1=0;
  blockVarstaff=0;
  staffvar=0;
  studentdistmark=0;
  staffdistmark=0;
  stucateblock=0;
  blockstaffmark=0;
  distback=0;

  show: true;
  classsection: FormGroup;
  date: any;
  schoolcatdatalist: Array<Object> = [];
  schooldistdatalist: Array<Object> = [];
  teachercatdatalist: Array<Object> = [];
  teacherdistdatalist: Array<Object> = [];
  sampleSelectedColumnScat: any[] = [];
  sampleSelectedColumnSdist: any[] = [];
  sampleSelectedColumnTcat: any[] = [];
  sampleSelectedColumnTdist: any[] = [];
  schoolcatdata: any;
  schooldistdata: any;
  teachercatdata: any;
  teacherdistdata: any;
  distId: any;
  date1: any;
  dist: any;

  /* block */
  schoolcatdatalist1: Array<Object> = [];
  schooldistdatalist1: Array<Object> = [];
  teachercatdatalist1: Array<Object> = [];
  teacherdistdatalist1: Array<Object> = [];

  sampleSelectedColumnScat1: any[] = [];
  sampleSelectedColumnSdist1: any[] = [];
  sampleSelectedColumnTcat1: any[] = [];
  sampleSelectedColumnTdist1: any[] = [];

  schoolcatdata1: any;
  schooldistdata1: any;
  teachercatdata1: any;
  teacherdistdata1: any;

  /* school*/
  block: any;
  blockname: any;
  schoolcatdatas: any;
  schoolcatdatalists: Array<Object> = [];
  sampleSelectedColumnScats: any[] = [];
  /* school by class */
  schoolname: any;
  school_id: any;
  marklistclass: { field: string; header: string; }[];
  markdetaillistclass: any[] = [];
  sampleSelectedColumnScatclass: any[] = [];
  /* school by section */
  class: any;
  marklistsection: { field: string; header: string; }[];
  sampleSelectedColumnScatsection: any[] = [];
  markdetaillistsection: any[] = [];

  /* staff school list */
  schoolcatdatastaff:any;
  schoolcatdataliststaff : Array<Object> = [];
  sampleSelectedColumnScatstaff : any[] = [];

  /* staff attend */
  markliststaffattend: { field: string; header: string; }[];
  markdetailliststaffattend: any[] = [];
  sampleSelectedColumnScatstaffattend: any[] = [];

  /* student districk mark */
  marklistdistmark: { field: string; header: string; }[];
  sampleSelectedColumnScatdistmark: any[] = [];
  markdetaillistdistmark: any[] = [];

  /* staff district mark */
markliststafdistmark: { field: string; header: string; }[];
markdetailliststafdistmark: any[] = [];
sampleSelectedColumnScatstafdistmark: any[] = [];

/* student category block mark */
markliststudentcatblock: { field: string; header: string; }[];
  sampleSelectedColumnScatstudentcatblock: any[] = [];
  markdetailliststudentcatblock: any[] = [];

/*  student block mark */

markliststaffblock: { field: string; header: string; }[];
  sampleSelectedColumnScatstaffblock: any[] = [];
  markdetailliststaffblock: any[] = [];



  constructor(private cs: FormBuilder,
    public stateService: StateService,
    public navigationservice: NavigationService,
    private userSessionService: UserSessionService,
    public router: Router) {
      this.usertypeId = this.userSessionService.userTypeId();
     }

  ngOnInit() {

    
    this.classsection = this.cs.group(
      {
        date: ['', Validators.required]
      });
      this.classsection.controls['date'].setValue("24-03-2020");
      this.date = this.classsection.controls['date'].setValue("24-03-2020");
    this.getStaffDetails();

    /* District wise List */
    this.schoolcatdatalist = [
      { field: 'school_type', header: 'Category' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'Fully_Marked', header: 'Fully Marked' },
      { field: 'Partially_Marked', header: 'Partially Marked' },
      { field: 'notmarked', header: 'Not Marked' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnScat = this.schoolcatdatalist;
    this.schooldistdatalist = [
      { field: 'district_name', header: 'District Name' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'Fully_Marked_school', header: 'Fully Marked' },
      { field: 'Partially_Marked_school', header: 'Partially Marked' },
      { field: 'notmarked', header: 'Not Marked' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnSdist = this.schooldistdatalist;
    this.teachercatdatalist = [
      { field: 'school_type', header: 'Category' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'marked_school', header: 'Marked Schools' },
      { field: 'notmarked', header: 'Not Marked Schools' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnTcat = this.teachercatdatalist;
    this.teacherdistdatalist = [
      { field: 'district_name', header: 'District Name' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'marked_school', header: 'Marked Schools' },
      { field: 'notmarked', header: 'Not Marked Schools' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnTdist = this.teacherdistdatalist;
    /* Block List */
    this.schoolcatdatalist1 = [
      { field: 'school_type', header: 'Category' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'Fully_Marked', header: 'Fully Marked' },
      { field: 'Partially_Marked', header: 'Partially Marked' },
      { field: 'notmarked', header: 'Not Marked' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnScat1 = this.schoolcatdatalist1;

    this.teachercatdatalist1 = [
      { field: 'school_type', header: 'Category' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'marked_school', header: 'Marked Schools' },
      { field: 'notmarked', header: 'Not Marked Schools' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnTcat1 = this.teachercatdatalist1;

    this.schooldistdatalist1 = [
      { field: 'block_name', header: 'Block Name' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'Fully_Marked_school', header: 'Fully Marked' },
      { field: 'Partially_Marked_school', header: 'Partially Marked' },
      { field: 'notmarked', header: 'Not Marked' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnSdist1 = this.schooldistdatalist1;

    this.teacherdistdatalist1 = [
      { field: 'block_name', header: 'Block Name' },
      { field: 'total_school', header: 'Total Schools' },
      { field: 'marked_school', header: 'Marked Schools' },
      { field: 'notmarked', header: 'Not Marked Schools' },
      { field: 'percentage', header: 'Percentage' },
    ];
    this.sampleSelectedColumnTdist1 = this.teacherdistdatalist1;

    /* school list */
    this.schoolcatdatalists = [
      { field: 'udise_code', header: 'UDISE Code' },
      { field: 'school_name', header: 'School Name' },
      { field: 'marked_section', header: 'Marked/Total Section' },
      { field: 'today_total_student', header: 'Total Students' },
      { field: 'today_present', header: 'Marked Present' },
      { field: 'today_absent', header: 'Marked Absent' },
    ];
    this.sampleSelectedColumnScats = this.schoolcatdatalists;

    /* school by class*/
    this.marklistclass = [
      { field: 'class', header: 'Class' },
      { field: 'total_class', header: 'Total' },
      { field: 'present', header: 'Present' },
      { field: 'absent', header: 'Absent', }
    ];
    this.sampleSelectedColumnScatclass = this.marklistclass;

     /* school by section */
  this.marklistsection = [
    { field: 'name', header: 'Student Name' },
    { field: 'section', header: 'Section' },
  ];
  this.sampleSelectedColumnScatsection = this.marklistsection;

/* staff school list */
this.schoolcatdataliststaff =[
  { field: 'udise_code', header: 'UDISE Code' },
  { field: 'school_name', header: 'School Name' },
  { field: 'total_teacher', header: 'Marked/Total Staff'},
  { field: 'present', header: 'Marked Present Staff' },
  { field: 'absent', header: 'Marked Absent Staff' }
];
this.sampleSelectedColumnScatstaff =  this.schoolcatdataliststaff;

/* staff attend */
this.markliststaffattend = [
  { field: 'teacher_name', header: 'Staff Name' },
  { field: 'gender', header: 'Gender' },
];
this.sampleSelectedColumnScatstaffattend = this.markliststaffattend;

/* student districk mark */
this.marklistdistmark = [
  { field: 'udise_code', header: 'UDISE Code' },
  { field: 'school_name', header: 'School Name' },
  { field: 'section_nos', header: 'Marked / Total Section' },
  { field: 'today_total_student', header: 'Total Students', },
  { field: 'today_present', header: 'Marked Present', },
  { field: 'today_absent', header: 'Marked Absent', },
];
this.sampleSelectedColumnScatdistmark = this.marklistdistmark;

/* staff district mark */
this.markliststafdistmark = [
  { field: 'udise_code', header: 'UDISE Code' },
  { field: 'school_name', header: 'School Name' },
  { field: 'total_teacher', header: 'Marked / Total Staff' },
  { field: 'present', header: 'Marked Present Staff', },
  { field: 'absent', header: 'Marked Absent Staff', },
];
this.sampleSelectedColumnScatstafdistmark = this.markliststafdistmark;
/* student category block mark */
this.markliststudentcatblock = [
  { field: 'udise_code', header: 'UDISE Code' },
  { field: 'school_name', header: 'School Name' },
  { field: 'section_nos', header: 'Marked / Total Section' },
  { field: 'today_total_student', header: 'Total Students', },
  { field: 'today_present', header: 'Marked Present', },
  { field: 'today_absent', header: 'Marked Absent', },
];
this.sampleSelectedColumnScatstudentcatblock = this.markliststudentcatblock;
/* student block list */
this.markliststaffblock = [
  { field: 'udise_code', header: 'UDISE Code' },
  { field: 'school_name', header: 'School Name' },
  { field: 'section_nos', header: 'Marked / Total Section' },
  { field: 'today_total_student', header: 'Total Students', },
  { field: 'today_present', header: 'Marked Present', },
  { field: 'today_absent', header: 'Marked Absent', },
];
this.sampleSelectedColumnScatstaffblock = this.markliststaffblock;

  }


  getStaffDetails() {
    this.date = moment(this.classsection.value.date).format('DD-MM-YYYY');
    if (this.classsection.valid) {
      this.stateService.getAttendancelist(this.date).subscribe((res) => {
        if (res) {
          this.schoolcatdata = res.school_type;
          this.schooldistdata = res.school_details_districtwise;
          this.teachercatdata = res.teacher_school_type;
          this.teacherdistdata = res.teacher_districtwise;
        }
      });
    }
  }
  onDistrict(e) {
    debugger;
    //  this.date = this.classsection.controls['date'].setValue("24-03-2020");
    this.date = moment(this.classsection.value.date).format('DD-MM-YYYY');
    this.dist = e.district_id;
    this.stateService.getAttendanceDistReport(this.dist, this.date).subscribe((distres) => {
      debugger;
      if (distres) {
        this.schooldistdata1 = distres.school_details_blockwise;
        this.teacherdistdata1 = distres.teacher_blockwise;
        this.schoolcatdata1 = distres.school_type;
        this.teachercatdata1 = distres.teacher_school_type_blockwise;
      }
    });

  }
  onStudentAttendance(e) {
    this.block = e.block_id;
    this.blockname = e.block_name;
    this.stateService.getAttendanceStudentBlockReport(this.block, this.date).subscribe((res) => {
      if (res) {
        this.schoolcatdatas = res.student_details_schoolwise;

      }
    });
  }

  onStudentByClass(e) {
    debugger;
    this.schoolname = e.school_name;
    this.school_id = e.school_id;
    this.stateService.getAttendanceByClass(this.school_id,this.date).subscribe((res) => {
      if(res){
        this.markdetaillistclass = res.classwise_details;
      }
    });
  }

  onAttendanceBySection(e) {
    debugger
    const schoolname = e.schoolname
    this.school_id = e.school_id;
    this.class= e.class;
    this.stateService.getAttendanceBySection(this.school_id ,this.class,this.date).subscribe((res) => {
      this.markdetaillistsection = res.classwise_details;
   });
  }

  onStaffAttendance(e) {
    const block = e.block_id;
    const blockname = e.block_name;
    this.stateService.getAttendanceStaffBlockReport(block,this.date).subscribe((res) => {
      debugger;
      if(res) {
        this.schoolcatdatastaff = res.teacher_details_schoolwise;        
      }
    });
  }
  
  onAttendancebyStaff(e) {
    debugger;
    console.log(e);
    const schoolname = e.school_name;
    this.school_id = e.school_id;
    this.stateService.getAttendanceByStaff(this.school_id).subscribe((res) => {
      debugger;
     this.markdetailliststaffattend = res.datteacher_absent_list;
  });
  }

  /* student districk mark */

  // onFullyMarked(e) {
  //   debugger
  //   const distname = e.district_name;
  //   const distId = e.district_id;
  //   const date1 = this.date;
  //   const col = 1;
  //   this.stateService.getStudentAttendaceDistMark(distId,col, this.date).subscribe((res) => {
  //     this.markdetaillistdistmark = res.student_details_schoolwise;
  //       });
  // }
  // onPartiallyMarked(e) {
  //   const distname = e.district_name;
  //   const distId = e.district_id;
  //   const date1 = this.date;
  //   const col = 2;
  //   this.stateService.getStudentAttendaceDistMark(distId,col, this.date).subscribe((res) => {
  //     this.markdetaillistdistmark = res.student_details_schoolwise;
  //       });
  // }
  // onNoMarked(e) {
  //   const distname = e.district_name;
  //   const distId = e.district_id;
  //   const date1 = this.date;
  //   const col = 3;
  //   this.stateService.getStudentAttendaceDistMark(distId,col, this.date).subscribe((res) => {
  //     this.markdetaillistdistmark = res.student_details_schoolwise;
  //       });
  // }

  /* staff district mark */
  // onStaffMarkedSchool(e) {
  //   debugger;
  //   const distname = e.district_name;
  //   const distId = e.district_id;
  //   const date1 = this.date;
  //   const col = 1;
  //   this.stateService.getStaffAttendaceDistMark(distId, col, date1).subscribe((res) => {
  //     this.markdetailliststafdistmark = res.teacher_details_schoolwise;
  //   });
  // }
  // onStaffNotmarkedSchool(e) {
  //   const distname = e.district_name;
  //   const distId = e.district_id;
  //   const date1 = this.date;
  //   const col = 2;
  //   this.stateService.getStaffAttendaceDistMark(distId, col, date1).subscribe((res) => {
  //     this.markdetailliststafdistmark = res.teacher_details_schoolwise;
  //   });
  // }

  /* student block category list */
  // onFullyMarkedCate(e) {
  //   debugger
  //   const block = e.block_id;
  //   const cate = e.school_type;
  //   const dist1 = this.dist;
  //   const date1 = this.date;
  //   const blockname = e.block_name;
  //   const col = 1;
  //   this.stateService.getStudentAttendaceBlockCate(cate, col,date1,dist1).subscribe((res) => {
  //     debugger
  //       this.markdetailliststudentcatblock = res.student_details_schoolwise;
  //   });
  // }

  // onPartiallyMarkedCate(e) {
  //   const block = e.block_id;
  //   const cate = e.school_type;
  //   const dist1 = this.dist;
  //   const date1 = this.date;
  //   const blockname = e.block_name;
  //   const col = 2;
  //   this.stateService.getStudentAttendaceBlockCate(cate, col,date1,dist1).subscribe((res) => {
  //     debugger
  //       this.markdetailliststudentcatblock = res.student_details_schoolwise;
  //   });
  // }

  // onNoMarkedCate(e) {
  //   const cate = e.school_type;
  //   const dist1 = this.dist;
  //   const date1 = this.date;
  //   const col = 3;
  //   this.stateService.getStudentAttendaceBlockCate(cate,col,date1,dist1).subscribe((res) => {
  //     debugger
  //       this.markdetailliststudentcatblock = res.student_details_schoolwise;
  //   });
  // }

  /* student block mark list */
  // onFullyMarkedblock(e) {
  //   const dist = this.dist;
  //   const blockname = e.block_name;
  //   const block = e.block_id;
  //   const date1 = this.date;
  //   const col = 1;
  //   this.stateService.getStudentAttendaceBlockMark(block, col, date1).subscribe((res) => {
  //     this.markdetailliststaffblock =  res.student_details_schoolwise;
  //   });
  // }

  // onPartiallyMarkedblock(e) {
  //   const dist = this.dist;
  //   const blockname = e.block_name;
  //   const block = e.block_id;
  //   const date1 = this.date;
  //   const col = 2;
  //   this.stateService.getStudentAttendaceBlockMark(block, col, date1).subscribe((res) => {
  //     this.markdetailliststaffblock =  res.student_details_schoolwise;
  //   });
  // }

  // onNoMarkedblock(e) {
  //   const dist = this.dist;
  //   const blockname = e.block_name;
  //   const block = e.block_id;
  //   const date1 = this.date;
  //   const col = 3;
  //   this.stateService.getStudentAttendaceBlockMark(block, col, date1).subscribe((res) => {
  //     this.markdetailliststaffblock =  res.student_details_schoolwise;
  //   });
  // }


  onDistrictBack() {

  }
}
