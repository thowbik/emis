import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { schoolsService } from '../../full-layout-page/schools/schools.service';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../full-layout-page/students/student.service';
import { AlertService } from 'src/services/alert.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-student-tc-form',
  providers: [StudentService],
  templateUrl: './student-tc-form.component.html',
  styleUrls: ['./student-tc-form.component.css']
})
export class StudentTcFormComponent implements OnInit {
  currentyear: number = new Date().getFullYear();
  form: FormGroup;
  public cbsePdfDetails: any[] = [];
  public fundsPdfDetails: any[] = [];
  schoolTypeId: any;
  schoolId: any;
  schoolDetailsData: any;
  content:any;
  @ViewChild('reportContent',{static: false}) reportContent: ElementRef;
  canvasImage: any;
  canvasImage1: any;
  sch_id: any;
  app_id: any;
  users: any;
  studentTcid: any;
  exportColumns:any[]=[];
  routeData: any;
  photo: any;
  displayEditDialog: boolean;
  profileurl: any;
  gender: any;
  current_class: any;
  promote_class: any;
  transfer_reason: any;
  studentclassid: any;
  studentcommunitytc: any;
  studentstudiedfrom: any;
  studentcurrentclass: any;
  dateInWords: string;
  admissionDateInWords: string;
  yearinword: string;
  dateinword: string;
  monthinword: string;
  adateinword: string;
  amonthinword: string;
  ayearinword: string;

  constructor(private route: ActivatedRoute,private SchoolsService: schoolsService,
    private router: Router,
    private userSessionService: UserSessionService,
    public fb: FormBuilder,
    private studentService: StudentService,
    private alertService: AlertService 
     ) {
    this.studentTcid = this.router.getCurrentNavigation().extras;    
      this.routeData = this.route.snapshot;      
    this.schoolId = this.routeData.queryParams.studentid;

  }
  ngOnInit() {
    this.initialValidator();
    this.getStudentTc();
  }

  initialValidator() {
    this.form = this.fb.group({
      'student_id': new FormControl('', null),
      'school_admission_no': new FormControl('', null),
      'photo': new FormControl('', null),
      'school_name': new FormControl('', null),
      'school_recognition_no': new FormControl('', null),
      'district_name': new FormControl('', null),
      'edu_dist_name': new FormControl('', null),
      'block_name': new FormControl('', null),
      'group_offer': new FormControl('', null),
      'name_tamil': new FormControl('', null),
      'name': new FormControl('', null),
      'father_name': new FormControl('', null),
      'mother_name': new FormControl('', null),
      'caste_name': new FormControl('', null),
      'student_community_tc': new FormControl('', null),
      'community_name': new FormControl('', null),
      'student_nationality': new FormControl('', null),
      'gender': new FormControl('', null),
      'dob': new FormControl('', null),
      'student_dob_words': new FormControl('', null),
      'student_idenitiy1': new FormControl('', null),
      'student_idenitiy2': new FormControl('', null),
      'student_period_study_from': new FormControl('', null),
      'student_class_id': new FormControl('', null),
      'student_current_class_id': new FormControl('', null),
      'group_name': new FormControl('', null),
      'student_promote_class': new FormControl('', null),
      'student_scholarship': new FormControl('', null),
      'student_medical_date': new FormControl('', null),
      'student_last_date': new FormControl('', null),
      'student_conduct': new FormControl('', null),
      'student_apply_tc': new FormControl('', null),
      'transfer_reason': new FormControl('', null),
      'student_tc_date': new FormControl('', null),
      'student_period_study_to': new FormControl('', null),
      'student_unique_id': new FormControl('', null),
      'first_lang': new FormControl('', null),
      'MEDINSTR_DESC': new FormControl('', null),
      'student_smart_id': new FormControl('', null),
    });
  }
 
  getStudentTc() {
    debugger
    let data = {"stud" :this.schoolId}
    this.SchoolsService.getTcdetails(data).subscribe(res => {
      this.users= res.data;
      console.log("this.users",this.users);
      this.studentclassid = this.users.student_class_id;
      console.log("studentid",this.studentclassid)
      this.photo = res.data.photo
      this.form.patchValue(this.users);
      if(this.photo !== null){
        let path = 'Students_emis'+'/'+this.photo+'';
        this.studentService.getAWSS3Image(path,true).subscribe((res) => {
          if (res.dataStatus) {
            debugger;
            this.profileurl = res.result;
          }
          this.displayEditDialog = true;
        });
      }
      else{
        this.profileurl= './assets/media/logos/Placeholder.jpg';
        this.displayEditDialog = true;
      }
      
      // studentstudiedfrom
      if(this.users['student_class_id']== 1){
         this.studentstudiedfrom= 'I'
      }else if(this.users['student_class_id'] == 2){
        this.studentstudiedfrom= 'II'
      }else if(this.users['student_class_id'] == 3){
        this.studentstudiedfrom= 'III'
      }else if(this.users['student_class_id'] == 4){
         this.studentstudiedfrom= 'IV'
      }else if(this.users['student_class_id'] == 5){
         this.studentstudiedfrom= 'V'
      }else if(this.users['student_class_id'] == 6){
         this.studentstudiedfrom= 'VI'
      }else if(this.users['student_class_id'] == 7){
         this.studentstudiedfrom= 'VII'
      }else if(this.users['student_class_id'] == 8){
         this.studentstudiedfrom= 'VIII'
      }else if(this.users['student_class_id'] == 9){
         this.studentstudiedfrom= 'IX'
      }else if(this.users['student_class_id'] == 10){
         this.studentstudiedfrom= 'X'
      }else if(this.users['student_class_id'] == 11){
         this.studentstudiedfrom= 'XI'
      }else if(this.users['student_class_id'] == 12){
         this.studentstudiedfrom= 'XII'
      }else if(this.users['student_class_id'] == 13){
        this.studentstudiedfrom= 'L.K.G'
     }else if(this.users['student_class_id'] == 14){
      this.studentstudiedfrom= 'U.K.G'
   }

     // studentcurrentclass
     if(this.users['student_current_class_id']== 1){
      this.studentcurrentclass= 'I'
   }else if(this.users['student_current_class_id'] == 2){
     this.studentcurrentclass= 'II'
   }else if(this.users['student_current_class_id'] == 3){
     this.studentcurrentclass= 'III'
   }else if(this.users['student_current_class_id'] == 4){
      this.studentcurrentclass= 'IV'
   }else if(this.users['student_current_class_id'] == 5){
      this.studentcurrentclass= 'V'
   }else if(this.users['student_current_class_id'] == 6){
      this.studentcurrentclass= 'VI'
   }else if(this.users['student_current_class_id'] == 7){
      this.studentcurrentclass= 'VII'
   }else if(this.users['student_current_class_id'] == 8){
      this.studentcurrentclass= 'VIII'
   }else if(this.users['student_current_class_id'] == 9){
      this.studentcurrentclass= 'IX'
   }else if(this.users['student_current_class_id'] == 10){
      this.studentcurrentclass= 'X'
   }else if(this.users['student_current_class_id'] == 11){
      this.studentcurrentclass= 'XI'
   }else if(this.users['student_current_class_id'] == 12){
      this.studentcurrentclass= 'XII'
   }else if(this.users['student_current_class_id'] == 13){
     this.studentcurrentclass= 'L.K.G'
  }else if(this.users['student_current_class_id'] == 14){
   this.studentcurrentclass= 'U.K.G'
}
        // studenttccommunity
        if(this.users['student_community_tc']== 1){
          this.studentcommunitytc = 'Leave Blank'
        }else if(this.users['student_community_tc']== 2){
          this.studentcommunitytc='Refer Community Certificate'
        }else if(this.users['student_community_tc']== 3){
          this.studentcommunitytc='No Caste / Community'
        }else {
          this.studentcommunitytc = '-';
        }
      //gender selection
      if (this.users['gender'] == 1) {
        this.gender = 'Male';
      }
      else if (this.users['gender'] == 2) {
        this.gender = 'Female';
      }
      else if (this.users['gender'] == 3) {
        this.gender = 'Transgender';
      }
      else  {
        this.gender = '-';
      }  
      //transfer reason
      if (this.users['transfer_reason'] == 1) {
        this.transfer_reason="Long Absent";
      }
      else if (this.users['transfer_reason'] == 2) {
        this.transfer_reason="Transfer Request by Parents";
      }
      else if (this.users['transfer_reason'] == 3) {
        this.transfer_reason="Terminal class";
      }
      else if (this.users['transfer_reason'] == 4) {
        this.transfer_reason="Dropped out";
      }
      else if (this.users['transfer_reason'] == 5) {
        this.transfer_reason="Student Expired";
      }
      else if (this.users['transfer_reason'] == 6) {
        this.transfer_reason="Duplicate EMIS entry";
      }
      else {
        this.transfer_reason="-";
        this.form.controls['transfer_reason'].setValue("-");
      } 
      //next higher class
      if (this.users['student_promote_class'] == 1) {
        this.promote_class = "Yes";
      }
      else if (this.users['student_promote_class'] == 2) {
        this.promote_class = "No";
      }
      else if (this.users['student_promote_class'] == 3) {
        this.promote_class = "No - Discontinued";
      }
      else if (this.users['student_promote_class'] == 4) {
        this.promote_class = "Refer Marksheet";
      }
      else  {
        this.promote_class = "-";
      }
      //class studying id
      if (this.users['student_current_class_id'] == 1) {
        this.current_class= "01 - Class one"
      }
      else if (this.users['student_current_class_id'] == 2) {
        this.current_class= "02 - Class Two"
      }
      else if (this.users['student_current_class_id'] == 3) {
        this.current_class= "03 - Class Three"
      }
      else if (this.users['student_current_class_id'] == 4) {
        this.current_class= "04 - Class Four"
      }
      else if (this.users['student_current_class_id'] == 5) {
        this.current_class= "05 - Class Five"
      }
      else if (this.users['student_current_class_id'] == 6) {
        this.current_class= "06 - Class Six"
      }
      else if (this.users['student_current_class_id'] == 7) {
        this.current_class= "07 - Class Seven"
      }
      else if (this.users['student_current_class_id'] == 8) {
        this.current_class= "08 - Class Eight"
      }
      else if (this.users['student_current_class_id'] == 9) {
        this.current_class= "09 - Class Nine"
      }
      else if (this.users['student_current_class_id'] == 10) {
        this.current_class= "10 - Class Ten"
      }
      else if (this.users['student_current_class_id'] == 11) {
        this.current_class= "11 - Class Eleven"
      }
      else if (this.users['student_current_class_id'] == 12) {
        this.current_class= "12 - Class Twelve"

      }
      else if (this.users['student_current_class_id'] == 13) {
        this.current_class= "L.K.G"
       
      }
      else   if (this.users['student_current_class_id'] == 14) {
        this.current_class= "U.K.G"
       
      }
      else  {
        this.current_class= "-"
        
      }

      // dobdatesinword
    var num = this.users.dob 
    var wMonths=['january','february','march','april','may','june','july','august','september','october','november','december']
    var dateinword = num.split('-')
    var year = dateinword[0]
    var date = dateinword[2]
    this.yearinword = this.inWords(year);
    console.log(" this.yearinword", this.yearinword)
    this.monthinword = wMonths[parseInt(dateinword[1])-1]
    console.log(" this.monthinword ",this.monthinword)
    this.dateinword = this.inWords(date);
    console.log("this. dateinword",this.dateinword)
    this.dateInWords = this.dateinword + " " + this.monthinword + " " + this.yearinword 

    // admissionDateInWords
    var anum = this.users.student_period_study_from
    var wMonths=['january','february','march','april','may','june','july','august','september','october','november','december']
    var adateinword = anum.split('-')
    var ayear = adateinword[0]
    var adate = adateinword[2]
    this.ayearinword = this.inWords(ayear);
    console.log(" this.yearinword", this.yearinword)
    this.amonthinword = wMonths[parseInt(adateinword[1])-1]
    console.log(" this.monthinword ",this.amonthinword)
    this.adateinword = this.inWords(adate);
    console.log("this. dateinword",this.dateinword)
    this.admissionDateInWords = this.adateinword + " " + this.amonthinword + " " + this.ayearinword 
    })  
  }
  inWords(num) {
    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
   var n : any;
      if ((num = num.toString()).lengyearth > 10) return 'overflow';
       n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
      return str;
      
  }
  

  onRowPDF(){
window.print();
  }
}

