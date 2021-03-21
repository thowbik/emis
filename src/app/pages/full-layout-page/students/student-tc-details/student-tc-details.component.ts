import { Component, OnInit, ElementRef, ɵConsole, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { AlertService } from 'src/services/alert.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';
import { DatePipe } from '@angular/common';
import {
  bloodgroup, religion, community, income, disabilities, disadvantages, schooldist,
  classstudying, mediumofinstruction, groupcate, launguages, caste
} from '../../../../../models/student-registration';
import { UidaiValidationService } from 'ng2-uidai-validation';
// Tamilname
// import $ from "jquery";
import * as $ from 'jquery';
import { arLocale } from 'ngx-bootstrap';
declare var $: any;
declare var toggleKBMode: any
declare var convertThis: any

@Component({
  selector: 'app-student-tc-details',
  templateUrl: './student-tc-details.component.html',
  styleUrls: ['./student-tc-details.component.css']
})
export class StudentTcDetailsComponent implements OnInit {

  schoolName: string;
  schoolId: number;
  schoolTypeId: number;
  allStudentList: any;
  studentList: any;
  data: any;
  dataHeader: any;
  classFilter: any;
  sectionFilter: any;  
  studentid:any;
  
  public selectedColumns: any;
  exportColumns: any;

  /** Edit Student and Transfer Student Dialog Ends Here */
  studentTCdtlsForm: FormGroup;
  studentTransferForm: FormGroup;

  pipe = new DatePipe('en-US');

  submitted: boolean = false;

  displayEditDialog: boolean;
  displayTransferDialog: boolean;

  editDialogTitle: string;
  transferDialogTitle : string;

  enddate: any;
  startdate: any;
  cond_tr : boolean = false;
  
  classstudying: classstudying[];
  
  launguages: launguages[];
  mediumofinstruction : mediumofinstruction[];
  classListArr: any[] = [];
  allClassesRevalentDetails: any[];
  mediumListArr: any[] = [];
  exportExcelData: any[] = [];

  promote: { "label": string; "value": string; }[];
  option: { "label": string; "value": string; }[];
  reason: {"label":string; "value":string; }[];
  category: { "label": string; "value": number; }[];
  selectedCategory: number = 0;

  fullDisablitiesList: any;
  groupshow: boolean = false; groupListArr: any[];
  
  profileurl: any;
  rteRemoveTagConfirmation:boolean = false;
  tempArrForClassAndSection: any;
  inValidAadhar: boolean = false;
  public classesInRoman = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII',"LKG","UKG","PRE KG"];  
  lowClass: number;
  highClass: number;
  isRteStudent: boolean = false;
  RowId: any;
  PageStage: number;
  // @ViewChild('input1') inputEl:ElementRef;
  casteList: any;
  gender: { label: string; value: string; }[];
  bloodgrouparr: any;
  religion: any;
  allcommunity: any;
  allcaste: any;
  occupation: any;
  // studentTCdtlsForm: any;
  sectionListArr: any[];
  community: any;
  incomes: any;
  disadvantages: any;
  disabilities: any;
  groupcate: any;
  groupcateid: any;
  schooldist: any;
  academic: any;
  studentList1: any;
  studentLists: any;
  studentList2: any;
  PageStage_2_1: any;
  student_unique_id: any;
  student_name: any;
  routeData: any;
  page: any;
  sub: any;
  id: any;
  studentlist: any;
  std_id: any;
  rowData: any;
  showForm : boolean = false;
  pageType: number;
  studentId: number;
    // Studenttamilname
    name_tamil: any;
    father_name_tamil: any;
    mother_name_tamil: any;
    guardian_name_tamil: any;
  constructor(private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private alertService: AlertService,
    private router: Router,
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private userSessionService: UserSessionService,
    private studentService: StudentService,
    private uidaiValidationService: UidaiValidationService,
    private el: ElementRef,private route : ActivatedRoute) {

    this.schoolName = this.userSessionService.schoolName();
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
    this.lowClass = this.userSessionService.lowClass();
    this.highClass = this.userSessionService.highClass();
    this.routeData = this.route.snapshot.params;
    this.pageType = this.routeData.pageId;
    //console.log(this.pageType,"pagetype");  
    this.studentId = this.routeData.studentId;
   // console.log('hiii' + this.studentId);

  }

  ngOnInit() {
    // console.clear();
   this.showForm = false;
    this.category = [
      {label:'Current Student List', value:0},
      {label:'Past Student List', value:1}
    ];
    this.PageStage=1
    this.sectionFilter = [];
    this.selectedColumns = [];
    this.classFilter = [];
    this.allStudentList = [];
    this.studentList = [];
    this.dataHeader = [];
    this.sampleData();
    this.getClasses();
   this.getStudentLists();
 // this.Student_id();
  
    this.promote = [{ "value":"1","label":"Yes"},
                    { "value":"2","label":"No"},
                    { "value":"3","label":"No-Discontinued"},
                    { "value":"4","label":"Refer Marksheet"}];
    this.option = [{ "value":"1","label":"Leave Blank"},
                   { "value":"2","label":"Refer Community Certificate"},
                   { "value":"3","label":"No Caste / Community"}];
    this.reason = [ 
            {"value":"1","label":"Long Absent"},
            {"value":"2","label":"Transfer Request by Parent"},
            {"value":"3","label":"Terminal Class"},
            {"value":"4","label":"Dropped Out"},
            {"value":"5","label":"Student expired"},
            {"value":"6","label":"Duplicate EMIS Entry"}];

    this.studentService.getMediumOfInstructionJSON().subscribe(data => {
      debugger;
      this.mediumListArr = data['mediumofinstruction'].map(item =>  { return { label: item.MEDINSTR_DESC, value: item.MEDINSTR_ID } })
    debugger});
    debugger;

    this.studentService.getSchoolWiseClassandSection(this.schoolId, true).subscribe(data => {
      this.tempArrForClassAndSection = data['result'];
    });

    this.studentService.getschoolclasses(this.userSessionService.schoolId(), true).subscribe(list => {
      this.allClassesRevalentDetails = list['classlist'];
  
      // if(this.lowClass == 15) {
      //   for(let i=this.lowClass;i<=this.highClass;i--){
      //     this.classListArr.push({ label: this.classesInRoman[i], value:i.toString()});
      // }
      // }
      // else {
      //         for(let i=this.lowClass;i<=this.highClass;i++){
      //     this.classListArr.push({ label: this.classesInRoman[i], value:i.toString()});
      // }
      // }

      // let classes = list['classlist'];
      // this.classListArr = classes.filter((val, inx) => classes.findIndex(item => item.class_id == val.class_id) === inx).map(list => { return { label: list.class_studying, value: list.class_id }; });
      // console.log(this.classListArr);
    });

    
    this.initialValidator();

    this.gender = [{ "label": "Male", "value": "1"},
  { "label": "Female", "value":"2" }];

this.studentService.getBloodGroupJSON().subscribe(data => {
this.bloodgrouparr = data['bloodgroup'];
});

this.studentService.getReligionJSON().subscribe(data => {
this.religion = data['religion'];
});

this.studentService.getCommunityJSON().subscribe(data => {
this.allcommunity = data['community'];
});

this.studentService.getCasteJSON().subscribe(data => {
this.allcaste = data['caste'];
});

this.studentService.getOccupationJSON().subscribe(data=>{
this.occupation = data['occupation'].map(l => { return { label: l.occu_name, value: l.id }; });
});
this.studentService.getMediumOfInstructionJSON().subscribe(data => {
data['mediumofinstruction'].map(item => { return { label: item.MEDINSTR_DESC, value:item.MEDINSTR_ID }})
                  .forEach(item => this.mediumListArr.push(item));
});

this.studentService.getSchoolWiseClassandSection(this.schoolId,true).subscribe(data=>{
this.tempArrForClassAndSection = data['result'];
});

this.studentService.getschoolclasses(this.userSessionService.schoolId(),true).subscribe(list=>{
this.allClassesRevalentDetails = list['classlist'];
let classes = list['classlist'];
this.classListArr = classes.filter((val,inx) => classes.findIndex(item => item.class_id == val.class_id) === inx).map(list => { return { label: list.class_studying, value: list.class_id }; });

});

this.studentService.studentRegistration(this.schoolId).subscribe(list => {
  var masterlist: any = list['result'];
  this.incomes = masterlist['incomes'].map(l => { return { label: l.income_value, value: l.id }; });
  // console.log(this.incomes);
  // this.religion =masterlist['religions'];
  this.launguages = masterlist['launguages'].map(l => { return { label: l.MEDINSTR_DESC, value: l.ID }; });
  this.disadvantages = masterlist['disadvantages'];
  this.fullDisablitiesList = masterlist['disabilities']
  this.disabilities = masterlist['disabilities'].map(l => { return { label: l.da_name, value: l.id }; });
  this.disabilities.push({
    label:'Not Applicable',
    value: '0'
  })
  this.classstudying = masterlist['classstudying'];
  this.mediumofinstruction = masterlist['mediumofinstruction'];
  debugger;
  // this.groupcate = masterlist['groupcate'];
  this.groupcate = masterlist['groupcate'];
  this.groupcateid = masterlist['groupcateid'];
  this.schooldist = masterlist['schooldist'].map(l => { return { label: l.district_name, value: l.id }; });
  this.academic = masterlist['academic'].map(l => { return { label: l.academic_teacher, value: l.id }; });
  // console.log(this.schooldist);
  // console.log(this.disabilities);
  // this.sections = masterlist['sections'];
  // this.bloodgrouparr = masterlist['bloodgroup'];
  // this.getalldept = masterlist['getalldept'];
  // this.managecateid = masterlist['managecateid'];
});
  }
  getSectionForRevalentClass(cls,status){
    if(status){
    this.studentTCdtlsForm.controls.class_section.setValue(null);
    }
    this.sectionListArr = [];
    this.sectionListArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == cls)
                              .map(list => { return {label: list.section,value:list.section}});
  }
  onReligionChange(e) {
    debugger;
    this.community = this.allcommunity.filter(function (item) { return item.religion_id == +e })
                                      .map(l => { return { label: l.community_name, value: l.id } });
  }
  onCommunityChange(e) {
    debugger;
    this.casteList = this.allcaste.filter(function (item) { return item.community_id == +e })
                                  .map(l => { return { label: l.caste_name, value: l.id } });
  }
  getClasses() {
   this.classListArr = [
      { "value": "1", "label": "I" },
      { "value": "2", "label": "II" },
      { "value": "3", "label": "III" },
      { "value": "4", "label": "IV" },
      { "value": "5", "label": "V" },
      { "value": "6", "label": "VI" },
      { "value": "7", "label": "VII" },
      { "value": "8", "label": "VIII" },
      { "value": "9", "label": "IX" },
      { "value": "10", "label": "X" },
      { "value": "11", "label": "XI" },
      { "value": "12", "label": "XII" },
      { "value": "13", "label": "LKG" },
      { "value": "14", "label": "UKG" },
      { "value": "15", "label": "PRE-KG" }
    ];
  }
  sampleData() {

    this.dataHeader = [
      { field: 'unique_id_no', header: 'EMIS Id' },
      { field: 'name_tamil', header: 'Name in Tamil' },
      { field: 'name', header: 'Name in English' },
      { field: 'class_studying', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'tc_status', header: 'TC Details' },
      { field: 'formatted_last_date', header: 'TC issue date ' },
      // { field: 'dob', header: 'DOB' },
    ];
    this.selectedColumns = [
      { field: 'unique_id_no', header: 'EMIS Id' },
      { field: 'name', header: 'Name' },
      { field: 'class_and_section', header: 'Class - Section' },
      { field: 'tc_status', header: 'TC Details' },
      { field: 'formatted_last_date', header: 'TC issue date ' },
      // { field: 'hm_tc_flag', header: 'Remaining Attempt' },
    ];

  }


  
  
  
  initialValidator() {
  
    this.studentTCdtlsForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'id': new FormControl('', Validators.required),
      'unique_id_no': new FormControl('', Validators.required),
      // 'name_id_card': new FormControl('', Validators.required),
      'name_tamil': new FormControl(''),
      // 'name_tamil_id_card': new FormControl('', Validators.required),
      'aadhaar_uid_number': new FormControl(null),
      // 'enrollmentnumber': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'bloodgroup': new FormControl(''),
      'religion_id': new FormControl('', Validators.required),
      'community_id': new FormControl('', Validators.required),
      'subcaste_id': new FormControl('', Validators.required),
      'mothertounge_id': new FormControl('', Validators.required),
      // 'disadvantaged_group' : new FormControl('', Validators.required),
      'differently_abled': new FormControl(''),
      'mother_name': new FormControl(''),
      'father_name': new FormControl(''),
      'guardian_name': new FormControl(''),
      'mother_name_tamil': new FormControl(null),
      'father_name_tamil': new FormControl(null),
      'guardian_name_tamil': new FormControl(null),
      'father_occupation': new FormControl(''),
      'mother_occupation': new FormControl(''),
      'father_qualify': new FormControl(null),
      'mother_qualify': new FormControl(null),
      'guardian_qualify': new FormControl(null),
      'parent_income': new FormControl(''),
      'phone_number': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      'email': new FormControl(''),
      'house_address': new FormControl('', Validators.required),
      'street_name': new FormControl('', Validators.required),
      'area_village': new FormControl('', Validators.required),
      'district_id': new FormControl('', Validators.required),
      'pin_code': new FormControl('', Validators.required),
      'class_studying_id': new FormControl(''),
      'doj': new FormControl('', Validators.required),
      'class_section': new FormControl(''),
      'education_medium_id': new FormControl(''),
      'group_code_id':new FormControl(''),
      'school_admission_no': new FormControl(''),
      'image_name': new FormControl(''),
      'image_data': new FormControl(''),

      'student_id_in_child_dtl': new FormControl(''),
      'student_id_in_tc_dtl': new FormControl(''),
      'student_idenitiy1': new FormControl('', Validators.required),
      'student_idenitiy2': new FormControl('', null),
      'student_scholarship': new FormControl('', Validators.required),
      'student_medical_date': new FormControl('', Validators.required),
      'student_conduct': new FormControl('', Validators.required),
      'student_promote_class': new FormControl('', Validators.required),
      'student_class_id': new FormControl('', Validators.required),
      'student_last_date': new FormControl(''),
      'student_current_class_id': new FormControl(''),//current class id 
      'student_first_lang': new FormControl('', Validators.required),
      'student_medium_inst': new FormControl('', Validators.required),
      'student_dob_words': new FormControl(''),
      'student_nationality': new FormControl('INDIAN', Validators.required),
      'student_admission_date': new FormControl('', Validators.required),
      'school_recognition_no': new FormControl(''),
      'student_community_tc': new FormControl('', Validators.required),
      'student_apply_tc': new FormControl('', null),
      'student_tc_date': new FormControl('', null)
    });

    this.studentTransferForm = this.fb.group({
      'name':new FormControl(''),
      'unique_id_no':new FormControl(''),
      'school_id_transfer':new FormControl(''),
      'class_studying_id':new FormControl(''),
      'process_type':new FormControl(''),
      'admission_no':new FormControl(''),
      'school_doj':new FormControl(''),
      'medium_of_ins':new FormControl(''),
      'transfer_reason': new FormControl('', Validators.required)});

      if(this.schoolTypeId == 3){
        this.studentTCdtlsForm.controls['school_recognition_no'].setValidators([Validators.required]);
      }
      else{
        this.studentTCdtlsForm.controls['school_recognition_no'].clearValidators();
        this.studentTCdtlsForm.controls['school_recognition_no'].setValue(null);
      }
  }

  getStudentLists() {
    debugger;
    this.studentService.studentsTransferList().subscribe((res) => {
      if (res.dataStatus) {
        if(this.pageType == 2) {
          this.studentlist = res.result['allstuds']; 
          const studData =  this.studentlist.filter((element) => element.unique_id_no === this.studentId);
          this.onRowEditstd(studData)
        }
      //  this.studentList1 = res.result;
      //  this.patch();
        // debugger;
        // if(res.result.allstuds[0].student_id_in_tc_dtl === null && res.result.allstuds[0].student_id_in_tc_dtl === "")
        // {
        // this.cond_tr =true;
      //}
        let masterlist = res.result
        this.allStudentList = masterlist['allstuds'];
        this.allStudentList.map(item => { item.tc_status = 
           (item.student_id_in_tc_dtl === null ||item.student_id_in_tc_dtl === "" ? 'Not Updated' : "Updated");
        this.onSingleButtonChange();
        item.formatted_last_date = this.pipe.transform(item.student_last_date, 'dd-MM-yyyy');
        item.class_and_section = item.class_studying+'-'+item.class_section;
      });   
        // this.patch();
        this.launguages = masterlist['launguages'].map(l => { return { label: l.MEDINSTR_DESC, value: l.ID }; });
        this.mediumofinstruction = masterlist['mediumofinstruction'].map(l => { return { label: l.MEDINSTR_DESC, value: l.ID }; });
        debugger
        this.exportColumns = this.dataHeader.map(col => ({ title: col.header, dataKey: col.field }));
      }
      else this.alertService.error(res.message);
    });
  }

  onSingleButtonChange(){
    this.studentList = this.allStudentList.length > 0 ? this.allStudentList.filter(l => +l.transfer_flag == +this.selectedCategory) : [];
  }

  oldStudyingId : any;
  labelDob : any;
  mediumId: string;
  //FROM StudentId
  onRowEditstd(rowData)
  {
   console.log(rowData,"rowData");
   this.PageStage = 2;
   this.PageStage_2_1 = 1;
     // this.studentTCdtlsForm.patchValue(rowData); 
   this.RowId = rowData[0].unique_id_no ;
  //  console.log("RowId",this.RowId);
   
   debugger;
   this.studentTCdtlsForm.reset();
   // this.startdate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
   this.enddate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
   this.oldStudyingId  = rowData[0].class_studying_id;
   this.labelDob = this.pipe.transform(rowData[0].dob, 'dd-MM-yyyy');
   let filteredArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == rowData[0].class_studying_id && item['section'] == rowData[0].class_section);
   this.mediumId = filteredArr.length > 0 ? filteredArr.map(l => {return l.school_medium_id})[0] : '';
   // this.convertingIntoWords(this.labelDob);
   this.studentTCdtlsForm.patchValue(rowData);
  //  this.getStudentLists();////
   
   this.studentTCdtlsForm.controls.student_admission_date.setValue(rowData[0].doj);

   if(!this.studentTCdtlsForm.value.student_nationality) {
     this.studentTCdtlsForm.controls['student_nationality'].setValue("INDIAN");
   }
   if(!this.studentTCdtlsForm.value.student_conduct) {
     this.studentTCdtlsForm.controls['student_conduct'].setValue("GOOD");
   }
   if(!this.studentTCdtlsForm.value.student_promote_class) {
     this.studentTCdtlsForm.controls['student_promote_class'].setValue("4");
   }
   if(!this.studentTCdtlsForm.value.student_community_tc) {
     this.studentTCdtlsForm.controls['student_community_tc'].setValue("2");
   }
   this.studentTCdtlsForm.controls.student_medium_inst.setValue(rowData[0].education_medium_id);
   this.studentTCdtlsForm.controls.student_current_class_id.setValue(this.oldStudyingId);
   this.studentTCdtlsForm.controls.student_id_in_child_dtl.setValue(rowData[0].student_id_in_child_dtl)
   this.editDialogTitle = rowData[0].name + ' - ' + rowData[0].unique_id_no;
   if(rowData[0].hm_tc_flag < 3 )
   {
     this.displayEditDialog = true;
   }else{
     this.PageStage=1;
     this.PageStage_2_1=0;
     this.alertService.info('Too many attempts. Unable to edit the details !');
     return true;
   }
   
   this.studentService.getStudentList(this.schoolId,'REGULAR_STUDENT',true).subscribe((res) => {
     if (res.dataStatus) {
       this.studentLists = res.result;
       this.studentList2  = this.studentLists.filter(a => a.unique_id_no == this.RowId)
       this.studentList1 =this.studentList2[0];
       this.patch();
       debugger
       this.studentList.forEach(element => {
        this.classFilter.push({
           label:element.class_studying_id,
           value:element.class_studying_id
        })
        this.sectionFilter.push({
           label:element.class_section,
           value:element.class_section
        })
       });
     }
     else this.alertService.error(res.message);
   });
  }
  //onClick Action
  onRowEdit(rowData) {
      // Tamilnametypingfunction
      $(document).ready(function(){
  
        $('input,textarea').on('keydown',function(event){
          if(event.which==121){
            $(this).toggleClass('tamil');
            return false;
          }
          if($(this).hasClass('tamil')){
            toggleKBMode(event);
          }else{
            return true;
          }
        });
        $('input,textarea').on('keypress',function(event){
          if($(this).hasClass('tamil')){
            convertThis(event);
          }
        });
      });
     //console.log(rowData,"rowData");
     this.submitted = false;
     this.showForm = true;
    this.PageStage = 2;
    this.PageStage_2_1 = 1;
      // this.studentTCdtlsForm.patchValue(rowData); 
    this.RowId = rowData.unique_id_no ;
    // console.log("RowId",this.RowId);
    debugger;
    this.studentTCdtlsForm.reset();
    // this.startdate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.enddate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.oldStudyingId  = rowData.class_studying_id;
    this.labelDob = this.pipe.transform(rowData.dob, 'dd-MM-yyyy');
    let filteredArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == rowData.class_studying_id && item['section'] == rowData.class_section);
    this.mediumId = filteredArr.length > 0 ? filteredArr.map(l => {return l.school_medium_id})[0] : '';
    // this.convertingIntoWords(this.labelDob);
    this.studentTCdtlsForm.patchValue(rowData);
    //this.getStudentLists();
    
    this.studentTCdtlsForm.controls.student_admission_date.setValue(rowData.doj);

    if(!this.studentTCdtlsForm.value.student_nationality) {
      this.studentTCdtlsForm.controls['student_nationality'].setValue("INDIAN");
    }
    if(!this.studentTCdtlsForm.value.student_conduct) {
      this.studentTCdtlsForm.controls['student_conduct'].setValue("GOOD");
    }
    if(!this.studentTCdtlsForm.value.student_promote_class) {
      this.studentTCdtlsForm.controls['student_promote_class'].setValue("4");
    }
    if(!this.studentTCdtlsForm.value.student_community_tc) {
      this.studentTCdtlsForm.controls['student_community_tc'].setValue("2");
    }
    this.studentTCdtlsForm.controls.student_medium_inst.setValue(rowData.education_medium_id);
    this.studentTCdtlsForm.controls.student_current_class_id.setValue(this.oldStudyingId);
    this.studentTCdtlsForm.controls.student_id_in_child_dtl.setValue(rowData.student_id_in_child_dtl)
    // rowData.student_id_in_tc_dtl == '' ? 
    // this.studentTCdtlsForm.controls.hm_tc_flag.setValue(1) :
    // this.studentTCdtlsForm.controls.hm_tc_flag.setValue((+rowData.student_id_in_tc_dtl)+1) ; 
    
    this.editDialogTitle = rowData.name + ' - ' + rowData.unique_id_no;
    if(rowData.hm_tc_flag < 3 )
    {
      this.displayEditDialog = true;
    }else{
      this.PageStage=1;
      this.PageStage_2_1=0;
      this.alertService.info('Too many attempts. Unable to edit the details !');
      return true;
    }
    
    this.studentService.getStudentList(this.schoolId,'REGULAR_STUDENT',true).subscribe((res) => {
      if (res.dataStatus) {
        this.studentLists = res.result;
        this.studentList2  = this.studentLists.filter(a => a.unique_id_no == this.RowId)
        this.studentList1 =this.studentList2[0];
        // console.log(this.studentList1,"this.studentLists");
        this.patch();
        // this.studentList1 = res.result[0];
        // this.patch();
        debugger
        this.studentList.forEach(element => {
         this.classFilter.push({
            label:element.class_studying_id,
            value:element.class_studying_id
         })
         this.sectionFilter.push({
            label:element.class_section,
            value:element.class_section
         })
        });
        this.exportColumns = this.dataHeader.map(col => ({title: col.header, dataKey: col.field}));
  // var RowDataS = [];
     

      // console.log(this.studentList1 ,"this.studentList1 fin");
      
    // this.studentList1 = RowDataS.map(l => 
    //   {return  {father_name:l.father_name,
    //     father_name_tamil:l.father_name_tamil,
    //     aadhaar_uid_number:l.aadhaar_uid_number,
    //     aadhar_no:l.aadhar_no,
    //     gender:l.gender,
    //     e_blood_grp:l.e_blood_grp,
    //     staff_dob:l.staff_dob,
    //     social_category:l.social_category,
    //     e_prnts_nme:l.e_prnts_nme,
    //     teacher_mother_name:l.teacher_mother_name,
    //     teacher_spouse_name:l.teacher_spouse_name,
    //     disability_type:l.disability_type,
    //     types_disability:l.types_disability,
    //     teacher_type:l.teacher_type,
    //     appointed_subject:l.appointed_subject,
     
    //   }}) ;
    // console.log("stafflistdetailsstudentList1",this.studentList1)
        // this.teachingstaffregistration.patchValue(this.stafflistdetails[0]);
        // this.patch();

  // });
      }
      else this.alertService.error(res.message);
    });
  }

  onRowTransfer(rowData){
    if(rowData.child_admitted_under_reservation == "Yes") {
      debugger;
     this.isRteStudent = true; 
    }
    else {
      this.isRteStudent = false; 
    }
    this.studentTransferForm.controls.name.setValue(rowData.name);
    this.studentTransferForm.controls.unique_id_no.setValue(rowData.unique_id_no);
    this.studentTransferForm.controls.school_id_transfer.setValue(rowData.school_id);
    this.studentTransferForm.controls.class_studying_id.setValue(rowData.class_studying_id);
    this.studentTransferForm.controls.process_type.setValue(1);
    this.studentTransferForm.controls.admission_no.setValue(rowData.school_admission_no);
    this.studentTransferForm.controls.school_doj.setValue(rowData.doj);
    this.studentTransferForm.controls.medium_of_ins.setValue(rowData.education_medium_id);
    this.studentTransferForm.controls.transfer_reason.setValue("0");
    this.transferDialogTitle = rowData.name+' - '+rowData.unique_id_no;
    this.displayTransferDialog = true;

   
  }
  onRowPDF(rowData){
    console.log(rowData.student_id_in_tc_dtl);
    this.studentid = rowData.student_id_in_tc_dtl
this.router.navigate(['/tcform'], {queryParams: {studentid:this.studentid}});
  }
  

onSubmitTransferredStudent(value){

    if(value.transfer_reason == "0"){
      this.alertService.warning('Please Select The Transfer Reason');
     return true;
    }
    // console.log(value);
    if(this.isRteStudent) {
      value.Rte_status = "YES"
    }
    this.studentService.updateStudentsTransferDetails(value).subscribe(res => {
      if(res) {
        this.alertService.success(res.message);
      this.rteRemoveTagConfirmation = false;
      }
      else {
        this.alertService.error('Something went wrong unable To update detail');
    }
      this.displayTransferDialog = false;
      this.ngOnInit();
      // console.log(res);
    });
  }
        // Studentnametamilvalue
        private onKeySearch(event: any) {
          this.name_tamil = event.target.value;
        }
        private onKeySearchfather(event: any) {
          this.father_name_tamil = event.target.value;
        }
        private onKeySearchmother(event: any) {
          this.mother_name_tamil = event.target.value;
        }
        private onKeySearchgurdian(event: any) {
          this.guardian_name_tamil = event.target.value;
    
        }
  onSubmit(value) {

    // New 
    this.inValidAadhar = false;
    this.submitted = true;
    var pattern = /[a-zA-Z0-9&_\.-/?@#$%^&*!<>,]/
    var Studennametamil =  this.name_tamil;
          // Student validation
          if(Studennametamil = this.name_tamil)
          {
            if(!Studennametamil.match(pattern) ) {
              // this.alertService.success('Valid Student Name in Tamil');
          }
            else
            {
              this.alertService.error('Invalid Student Name in Tamil');
              return true;
          }
          }
        // Fathername Validation
        var Fathernametamil =  this.father_name_tamil;
        if(Fathernametamil = this.father_name_tamil)
        {
          if(!Fathernametamil.match(pattern)) {
            // this.alertService.success('Valid Father  Name in Tamil');
          }
          else{
            this.alertService.error('Invalid Father  Name in Tamil');
            return true;
          }
        }
      //  Mothernametamil
      var Mothernametamil =  this.mother_name_tamil;
      if(Mothernametamil = this.mother_name_tamil)
      {
        if(!Mothernametamil.match(pattern)) {
          // this.alertService.success('Valid Mother  Name in Tamil');
        }
        else{
          this.alertService.error('Invalid Mother  Name in Tamil');
          return true;
        }
      }
      //  Gurdiannametamil
      var Gurdiannametamil =  this.guardian_name_tamil;
      if(Gurdiannametamil = this.guardian_name_tamil)
      {
        if(!Gurdiannametamil.match(pattern)) {
          // this.alertService.success('Valid Guardian  Name in Tamil');
        }
        else
        {
          this.alertService.error('Invalid Guardian  Name in Tamil');
          return true;
        }
      }
      // => ValidationEnd 
    let aadharNo = value.aadhaar_uid_number;
    if(aadharNo != '' ){
      if(+aadharNo != 0) {
        let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
        if(!isValidUidaiNo){
        this.alertService.error('Invalid Aadhaar Number');
        this.inValidAadhar = true;
        return true;
        }
        }
      }

    if(value.class_studying_id) this.studentTCdtlsForm.controls['class_section'].setValidators([Validators.required]);
    else this.studentTCdtlsForm.controls['class_section'].clearValidators();
    this.studentTCdtlsForm.controls['class_section'].updateValueAndValidity();
  
    for (const key of Object.keys(this.studentTCdtlsForm.controls)) {
      if (this.studentTCdtlsForm.controls[key].invalid) {
        // const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys',key);
        // invalidControl.focus();
        // break;
     }
    } 
    // console.log(value);

  //  Old 
     if (this.studentTCdtlsForm.valid) {
       //New 
          // delete value.education_medium_id;
          let toSTD = value.class_studying_id; //newStudyingId
          let fromSTD = this.oldStudyingId;
          let students_promote_history : any ;
          if(fromSTD !== toSTD){
            students_promote_history = {
             'school_key_id' : this.schoolId,
             'student_id' : value.id,
             'from_class' : fromSTD,
             'to_class' : toSTD
             }
            // console.log('they are diff ',fromSTD,toSTD);
          }
          else{
            // console.log('they are same ',fromSTD.toSTD);
            students_promote_history = {}
          }
          // console.log(value.class_studying_id);
          (value.class_studying_id == '11') || (value.class_studying_id == '12') ? '' : delete value.group_code_id;
          value.dob = this.pipe.transform(value.dob, 'yyyy-MM-dd');
          value.doj = this.pipe.transform(value.doj, 'yyyy-MM-dd');
          value.transfer_flag = 0;
          value.status = "Active";
          value.updated_at = this.pipe.transform(new Date(), 'yyyy-MM-dd');
          value.name_tamil= this.name_tamil;
          value.father_name_tamil = this.father_name_tamil;
          value.mother_name_tamil = this.mother_name_tamil;
          value.guardian_name_tamil = this.guardian_name_tamil;
          // console.log('B4 submit',value);
          var data = {
            "aadhaar_uid_number": value.aadhaar_uid_number,
            "area_village": value.area_village,
            "bloodgroup": value.bloodgroup,
            "class_section": value.bloodgroup,
            "class_studying_id": value.class_studying_id,
            "community_id":value.community_id,
            "differently_abled": value.differently_abled,
            "district_id": value.district_id,
            "dob": value.dob,
            "doj": value.doj,
            "education_medium_id": value.education_medium_id,
            "email": value.email,
            "father_name": value.father_name,
            "father_name_tamil": value.father_name,
            "father_occupation": value.father_occupation,
            "father_qualify": value.father_qualify,
            "gender": value.gender,
            "guardian_name": value.guardian_name,
            "guardian_name_tamil": value.guardian_name_tamil,
            "guardian_qualify": value.guardian_qualify,
            "house_address":value.house_address,
            "id": value.id,
            "image_data": value.image_data,
            "image_name": value.image_name,
            "mother_name": value.mother_name,
            "mother_name_tamil": value.mother_name_tamil,
            "mother_occupation": value.mother_occupation,
            "mother_qualify": value.mother_qualify,
            "mothertounge_id": value.mothertounge_id,
            "name": value.name,
            "name_tamil": value.name_tamil,
            "parent_income": value.parent_income,
            "phone_number": value.phone_number,
            "pin_code": value.pin_code,
            "religion_id": value.religion_id,
            "school_admission_no": value.school_admission_no,
            "status": value.status,
            "street_name":value.street_name,
            "subcaste_id": value.subcaste_id,
            "transfer_flag": value.transfer_flag,
            "unique_id_no": value.unique_id_no,
            "updated_at": value.updated_at,
         };
          // console.log(data,"data");
          
          this.studentService.updateStudentRegistrationData({"records":data,"promote_history":students_promote_history,"constant":'REGULAR_STUDENT'}).subscribe(res => {
            // console.log(value,"records");
            // console.log(students_promote_history,"students_promote_history");
            
            if (res.dataStatus == true) {
              this.alertService.success(res.message);
              // this.getStudentLists();
              this.displayEditDialog = false;
           //Old
    this.studentService.studentsTransferSave(value).subscribe(res => {
    if (res.dataStatus == true) {
      this.alertService.success(res.message);
        this.getStudentLists();
      this.displayEditDialog = false;
    }
    else this.alertService.info(res.message);
    // this.redirectTo(this.router.url);
    },err => this.alertService.error(err));

            }
            else this.alertService.info(res.message);
            // this.redirectTo(this.router.url);
          });
     
     
     }
     else{
      this.validateAllFormFields(this.studentTCdtlsForm);
      this.alertService.warning('Please Fill All Mandatory Fields.!');
      for (const key of Object.keys(this.studentTCdtlsForm.controls)) {
        if (this.studentTCdtlsForm.controls[key].invalid) {
          console.log(key);
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return true;
    }
    
    }
    onSubmitTc(value){
      this.submitted = true;
  //  console.log(value);
   
     if (this.studentTCdtlsForm.valid) {
      this.studentService.studentsTransferSave(value).subscribe(res => {
        if (res.dataStatus == true) {
          this.alertService.success(res.message);
           this.getStudentLists();
          this.displayEditDialog = false;
        }
        else this.alertService.info(res.message);
        // this.redirectTo(this.router.url);
      },err => this.alertService.error(err));
     }
     else{
      this.validateAllFormFields(this.studentTCdtlsForm);
      this.alertService.warning('Please Fill All Mandatory Fields.!');
      for (const key of Object.keys(this.studentTCdtlsForm.controls)) {
        if (this.studentTCdtlsForm.controls[key].invalid) {
          console.log(key);
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return true;
    }
    
    }
    PastonRowEdit(rowData){
      // console.log(rowData,"rowData");
      this.submitted = false;
      this.student_unique_id = rowData.unique_id_no;
      this.student_name = rowData.name;
    this.studentTCdtlsForm.controls['id'].setValidators(null);
    this.studentTCdtlsForm.controls['gender'].setValidators(null);
    this.studentTCdtlsForm.controls['religion_id'].setValidators(null);
    this.studentTCdtlsForm.controls['community_id'].setValidators(null);
    this.studentTCdtlsForm.controls['subcaste_id'].setValidators(null);
    this.studentTCdtlsForm.controls['phone_number'].setValidators(null);
    this.studentTCdtlsForm.controls['house_address'].setValidators(null);
    this.studentTCdtlsForm.controls['street_name'].setValidators(null);
    this.studentTCdtlsForm.controls['area_village'].setValidators(null);
    this.studentTCdtlsForm.controls['district_id'].setValidators(null);
    this.studentTCdtlsForm.controls['pin_code'].setValidators(null);
    // this.studentTCdtlsForm.controls['ZonalID'].updateValueAndValidity();
    this.PageStage = 0;
    this.PageStage_2_1 = 1;
    debugger;
    this.studentTCdtlsForm.reset();
    // this.startdate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.enddate = this.pipe.transform(new Date(), 'yyyy-MM-dd');
    this.oldStudyingId  = rowData.class_studying_id;
    this.labelDob = this.pipe.transform(rowData.dob, 'dd-MM-yyyy');
    let filteredArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == rowData.class_studying_id && item['section'] == rowData.class_section);
    this.mediumId = filteredArr.length > 0 ? filteredArr.map(l => {return l.school_medium_id})[0] : '';
    // this.convertingIntoWords(this.labelDob);
    //this.getStudentLists();
    this.studentTCdtlsForm.patchValue(rowData);
    this.studentTCdtlsForm.controls.student_admission_date.setValue(rowData.doj);

    if(!this.studentTCdtlsForm.value.student_nationality) {
      this.studentTCdtlsForm.controls['student_nationality'].setValue("INDIAN");
    }
    if(!this.studentTCdtlsForm.value.student_conduct) {
      this.studentTCdtlsForm.controls['student_conduct'].setValue("GOOD");
    }
    if(!this.studentTCdtlsForm.value.student_promote_class) {
      this.studentTCdtlsForm.controls['student_promote_class'].setValue("4");
    }
    if(!this.studentTCdtlsForm.value.student_community_tc) {
      this.studentTCdtlsForm.controls['student_community_tc'].setValue("2");
    }
    this.studentTCdtlsForm.controls.student_medium_inst.setValue(rowData.education_medium_id);
    this.studentTCdtlsForm.controls.student_current_class_id.setValue(this.oldStudyingId);
    this.studentTCdtlsForm.controls.student_id_in_child_dtl.setValue(rowData.student_id_in_child_dtl)
    // rowData.student_id_in_tc_dtl == '' ? 
    // this.studentTCdtlsForm.controls.hm_tc_flag.setValue(1) :
    // this.studentTCdtlsForm.controls.hm_tc_flag.setValue((+rowData.student_id_in_tc_dtl)+1) ; 
    
    this.editDialogTitle = rowData.name + ' - ' + rowData.unique_id_no;
    if(rowData.hm_tc_flag < 3 )
    {
      this.displayEditDialog = true;
    }else{
      this.PageStage=1;
      this.PageStage_2_1=0;
      this.alertService.info('Too many attempts. Unable to edit the details !');
      return true;
    }
    }
  // exportPdf() {
  //   debugger;
  //   let pdftitle = this.schoolName +' (Student`s TC Status List '+this.acadYear()+' ) ';
  //   import("jspdf").then(jsPDF => {
  //     import("jspdf-autotable").then(x => {
  //       const doc = new jsPDF.default(0, 0);
  //       doc.autoTable(this.exportColumns, this.studentList);
        
  //       // doc.text(20, 20, 'Hello world!');
  //       // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
  //       doc.save(pdftitle+'.pdf');
  //     })
  //   })
  // }
  GoTcDetails(){
    if(this.page !== 1){
    this.PageStage = 1 ;
    this.PageStage_2_1 = 0;
    }
  }
  getstudents() {
    this.exportExcelData = [];
    this.studentList.map(item => {
      return {
        'EMIS Id': item.unique_id_no,
        'Name': item.name,
        'Name in Tamil': item.name_tamil,
        'Class':item.class_studying,
        'Section':item.class_section,
        'TC Details':item.tc_status,
        'TC Date':item.student_last_date
      }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }  

  xlfilter(arr,val){
    let ar = arr.filter(l => l.value == val);
    if(ar.length > 0){
     return ar[0].label;
    }
    else{
     return '';
    }
  }

  exportExcel() {
    let xltitle = this.schoolName +' (Student`s TC Status List '+this.acadYear()+' ) ';
    let xlsheetname = 'TC status list'+this.acadYear();
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudents());
        const workbook = { Sheets: { 'student`s TC status list' : worksheet }, SheetNames: ['student`s TC status list'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, xltitle);
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

acadYear(){
  let month = (new Date().getMonth() + 1);
  let dates = [(new Date()).getFullYear(),(new Date()).getFullYear()-1];
  let tempArr : any = [];
  dates.forEach(function (date,inx) {
    tempArr[inx] = (month > 6) ? date + '-' + (date+1) : (date-1) + '-' + (date);
  }); 
  return tempArr.length > 0 ? (this.selectedCategory == 0) ? 'Curr Yr '+tempArr[this.selectedCategory] : 'Past Yr '+tempArr[this.selectedCategory] : '';
}

  /** ⇒  validate all form group and form array fields **/
  validateAllFormFields(formGroup: any) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } 
    });
  }

  convertingIntoWords(data){
// console.log(data);
  }
  removeRteTagConfirmation() {
    if(this.isRteStudent) {
      this.rteRemoveTagConfirmation = true;
    }
    else {
      this.onSubmitTransferredStudent(this.studentTransferForm.value);
    }
   
  }
  proceedToRemoveRteTag() {
this.onSubmitTransferredStudent(this.studentTransferForm.value);
  }
  cancelToRemoveRteTag() {

  }

patch(){
  debugger
  // console.log(this.studentList,"rowDatarowDatarowD1111ata");
  debugger
  // console.log(this.studentList1,"rowDatarowDatarowData");
  // let dtls:any[] =  this.studentList1;
  this.studentTCdtlsForm.patchValue(this.studentList1);
  debugger;

    let defaultsformat = 'yyyy-MM-dd';
    this.startdate  = this.pipe.transform(this.studentList1.dob,defaultsformat);
    this.enddate = this.pipe.transform(new Date(),defaultsformat);
    this.oldStudyingId  = this.studentList1.class_studying_id;
    
    this.studentTCdtlsForm.controls.doj.setValue(this.studentList1.doj == '' ? this.enddate : this.studentList1.doj);
    this.studentTCdtlsForm.controls.bloodgroup.setValue(+this.studentList1.bloodgroup);
    this.studentTCdtlsForm.controls.religion_id.setValue(+this.studentList1.religion_id);
    this.studentTCdtlsForm.controls.community_id.setValue(+this.studentList1.community_id);
    this.studentTCdtlsForm.controls.name_tamil.setValue(this.studentList1.name_tamil === null ?'' : this.studentList1.name_tamil);
    this.studentTCdtlsForm.controls.mother_name_tamil.setValue(this.studentList1.mother_name_tamil === null ? '' : this.studentList1.mother_name_tamil);
    this.studentTCdtlsForm.controls.guardian_name_tamil.setValue(this.studentList1.guardian_name_tamil === null ? '' : this.studentList1.guardian_name_tamil);
    this.studentTCdtlsForm.controls.father_name_tamil.setValue(this.studentList1.father_name_tamil === null ? '' : this.studentList1.father_name_tamil);
    this.studentTCdtlsForm.controls.image_name.setValue(this.studentList1.photo == '' ? null : this.studentList1.photo);

    this.editDialogTitle = this.studentList1.name+' - '+this.studentList1.unique_id_no;
    // this.inputEl.nativeElement.focus();
    this.onReligionChange(+this.studentList1.religion_id);
    this.onCommunityChange(this.studentList1.community_id);
    this.getSectionForRevalentClass(this.studentList1.class_studying_id,false);
    // this.getGroupForRevalentClass();


if(this.studentList1.photo !== null){
    let path = 'Students_emis'+'/'+this.studentList1.photo+'';
    this.studentService.getAWSS3Image(path,true).subscribe((res) => {
      if (res.dataStatus) {
        debugger;
        this.profileurl = res.result;
        // console.log(this.profileurl);
      }
      this.displayEditDialog = true;
      
    });
  }
  else{
    this.profileurl= './assets/media/logos/Placeholder.jpg';
    this.displayEditDialog = true;
  }
} 
}