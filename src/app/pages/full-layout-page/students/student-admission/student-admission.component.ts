import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { DatePipe } from '@angular/common';
import { UserSessionService } from 'src/services/usersession.service';
import {
  bloodgroup, religion, community, income, disabilities, disadvantages, schooldist,
  classstudying, mediumofinstruction, groupcate, launguages, caste
} from '../../../../../models/student-registration';
import { MessageService } from 'primeng/api';
import { UidaiValidationService } from 'ng2-uidai-validation';
import { AlertService } from 'src/services/alert.service';
// import $ from "jquery";
import * as $ from 'jquery';
import { arLocale } from 'ngx-bootstrap';
declare var $: any;
declare var toggleKBMode: any
declare var convertThis: any

@Component({
  selector: 'app-student-admission',
  templateUrl: './student-admission.component.html',
  styleUrls: ['./student-admission.component.css']
})
export class StudentAdmissionComponent implements OnInit {
  noSpecial: any = "^[a-zA-Z \b]+$";
  public isStudentExist: boolean = true;
  index: number = 0;
  studentRegistrationForm: FormGroup;
  studentAdmittedForm: FormGroup;
  religion: any[]=[];
  bloodgrouparr: bloodgroup[];
  allcommunity: community[];
  allcaste: caste[];
  community: any[];
  casteList: any[];
  subcaste: any[] = [];
  incomes: income[];
  disadvantages: disadvantages[];
  disabilities: any;
  schooldist: schooldist[] = [];
  classstudying: classstudying[];
  mediumofinstruction: mediumofinstruction[];
  sortedMediumListArr: mediumofinstruction[];
  groupcate: groupcate[];
  section: any[] = [];
  getalldept: any[] = [];
  managecateid: any[] = [];
  groupcateid: any[] = [];
  launguages: any[]=[];
  pipe = new DatePipe('en-US');
  msgs: any;
  gender: any;
  submitted: boolean = false;
  fullDisablitiesList: any[] = [];
  inValidAadhar: boolean = false;
  form: FormGroup;
  data: any;
  studentDetail: any[];
  searchList:any[] = [];
  selectedItem: any;
  public dataHeader: any[] = [];
  classList: any[] = [];
  isSelectedUdise: boolean = false;
  public display: boolean =false;
  public schoolUniqueCode: number;
  public studentId: number;
  public schoolId: any;
  public maxLength: number;
  selectedDatePicker: boolean = false;
  admitDialogTitle:string;
  admitDisplayDialog : boolean = false;
  groupshow : boolean = false;
  enddate: any ;
  startdate: any;
  mediumListArr:any[]=[];
  sectionListArr: any[];
  groupListArr: any[];
  classListArr: any[];
  lowClass:any;
  highClass:any;
  Class:any;
  classes: any[];
  allClassesRevalentDetails : any[];
  classId: number;
  sectionList:any[] =[];
  mediumId: number;
  tamilClass: boolean;
  occupation: any[] = [];
  academic: any[] = [];
  schoolTypeId: number;
  stringFlag: string;
  searchMessage: string = '';
  CurrentYear:any;
  resultYear:any;
  NowYear:any;
  NowYearRange:any;
  minDate:any;
  maxDate:any;
  Studentdropvalue: { label: string; value: number; }[];
  isAllowedToView: boolean;
  ApllicatioNumber: any;
  Reg_No: any;
  Studentname: any;
  isAllowedToEdit: boolean = true;
  udiseCode: any;
  isRteStudent: boolean = false;
  selectedClass: number;
  needDCApproval: boolean = false;
  Search : boolean = false;
  ArchieveSearch : boolean = false;  
  orgs : any;
  orgs1: any;
  yearRange: any;
  showCaption: boolean = false;
  transferedDate: string;
  name_tamil: any;
  father_name_tamil: any;
  mother_name_tamil: any;
  guardian_name_tamil: any;
  constructor(private router: Router,
              private studentService: StudentService,
              private userSessionService: UserSessionService,
              public fb: FormBuilder,
              private messageService: MessageService,
              private uidaiValidationService: UidaiValidationService,
              private alertService:AlertService,
              private el: ElementRef)
               {
          this.CurrentYear = (new Date()).getFullYear()-3;
          this.NowYear=(new Date()).getFullYear();
         this.NowYearRange ="2000 :"+this.NowYear;
        //  this.resultYear ="2000 : 2017";
         this.resultYear = "2000 :"+this.CurrentYear;
          let today = new Date();         
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = 0;
        let prevYear = 2000;
        let nextMonth = month;
        let nextYear = year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
      this.schoolId = this.userSessionService.userName();
      this.lowClass = this.userSessionService.lowClass();
      this.highClass = this.userSessionService.highClass();
      this.schoolTypeId = +this.userSessionService.schoolTypeId();
      this.udiseCode = this.userSessionService.userName();
      this.isAllowedToView = this.schoolTypeId == 3 ? false : true;
      this.Studentdropvalue = [
        {label: 'RTE Student', value: 1},
        {label: 'Other Student', value: 2},
      ];
  }

  ngOnInit() {
    var dateToday = new Date();
var yrRange = dateToday.getFullYear() -20 + ":" + (dateToday.getFullYear() - 3);
console.log(yrRange,"date");
    this.searchValidator();
    this.getClassLists();
    this.initialValidator();
    this.searchList =[
    {name: 'EMIS ID', value: 'unique_id_no'},
    // {name: 'Name',value:'name'},
    {name: 'AADHAR No.', value: 'aadhaar_uid_number'},
    {name: 'Phone No.', value: 'phone_number'},
    {name: 'UDISE', value: 'udise_code'},
    {name: 'DOB', value: 'dob'}
    ];
    this.dataHeader = [   
      { field: 'unique_id_no', header: 'EMIS ID',width: '15em' },
      { field: 'name', header: 'Name' },
      { field: 'school_name', header: 'School Name' },
      { field: 'school_admission_no', header: 'Admission Number' },
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section' }
      // { field: 'dob', header: 'DOB' },
      // { field: 'group', header: 'Blood Group' },
  ];

    this.disabilities = [];
    this.msgs = [];
    this.gender = [
      { "label": "Male", "value": "1" },
      { "label": "Female", "value": "2" }
    ];
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

    this.studentService.getMediumOfInstructionJSON().subscribe(data => {
        data['mediumofinstruction'].map(item => { return { label: item.MEDINSTR_DESC, value:item.MEDINSTR_ID }})
                                   .forEach(item => this.mediumListArr.push(item));       
    });

    this.studentService.getOccupationJSON().subscribe(data=>{
      this.occupation = data['occupation'].map(l => { return { label: l.occu_name, value: l.id }; });
    });

    this.studentService.getschoolclasses(this.userSessionService.schoolId(),true).subscribe(list=>{

      this.allClassesRevalentDetails = list['classlist'];
      let classes = list['classlist'];
      debugger;
      this.classListArr = classes.filter((val,inx) => classes.findIndex(item => item.class_id == val.class_id) === inx).map(list => { return { label: list.class_studying, value: list.class_id }; });
      // if(+this.lowClass == 15){
      //        this.classes = [{label: 'Pre-KG', value:'15'},{ label: 'LKG', value:'13'},{ label: 'UKG', value:'14'},{ label: 'I', value:'1'}];
      // }else if(+this.lowClass == 13){   
      //        this.classes = [{ label: 'LKG', value:'13'},{ label: 'UKG', value:'14'},{ label: 'I', value:'1'}]
      // }
      // else if(+this.lowClass == 14){   
      //   this.classes = [{ label: 'UKG', value:'14'},{ label: 'I', value:'1'}] }
      // else if(+this.lowClass == 1) {
      //        this.classes = this.classListArr.filter(l => l.value == this.lowClass );
      // }else{ this.classes = []; }
       this.classes = this.classListArr; 
    });
    
    this.studentService.studentRegistration(this.userSessionService.schoolId()).subscribe(list => {
      console.log(list,'new data');
      if(list)
      {
        var masterlist: any = list['result'];
        this.incomes = masterlist['incomes'].map(l => { return { label: l.income_value, value: l.id }; });
        // this.religion =masterlist['religions'];
        //this.launguages = masterlist['launguages'].map(l => { return { label: l.MEDINSTR_DESC, value: l.ID }; });
        // this.orgs =[];
        this.orgs1 = masterlist['launguages'].filter(i => i.MEDINSTR_DESC != 'Tamil');
       
        
        // for(var i = 0; i < this.launguages.length; i++) {
        //     this.orgs.push({label: this.launguages[i], value: this.launguages[i]});
        // }
      //  this.orgs.push({label: 'Tamil', value: 16});
      this.launguages.push({label: 'Tamil', value: 16});
        this.orgs1.forEach(element => {
          this.launguages.push({
            label: element.MEDINSTR_DESC,
            value: element.ID
          });
        });
        //this.launguages = masterlist['launguages'].map(l => { return { label: l.MEDINSTR_DESC, value: l.ID }; });
        console.log(this.orgs)
        this.disadvantages = masterlist['disadvantages'];
        this.fullDisablitiesList = masterlist['disabilities']
        this.disabilities = masterlist['disabilities'].map(l => { return { label: l.da_name, value: l.id }; });
        this.disabilities.push({ label:'Not Applicable',value: '0'});
        this.classstudying = masterlist['classstudying'].map(l => { return { label: l.class_studying, value: l.id }; });
        this.mediumofinstruction = masterlist['mediumofinstruction'].map(l => { return { label: l.MEDINSTR_DESC, value: +l.MEDINSTR_ID }; });
        this.sortedMediumListArr = this.mediumofinstruction;
        console.log('med',this.mediumofinstruction);
        this.groupcate = masterlist['groupcate'];
        this.groupcateid = masterlist['groupcateid'];
        this.schooldist = masterlist['schooldist'].map(l => { return { label: l.district_name, value: l.id }; });
        this.academic = masterlist['academic'].map(l => { return { label: l.academic_teacher, value: l.id }; });
        this.studentRegistrationForm.controls['differently_abled'].setValue("0");
      }
    });
  }

  initialValidator() {
  
    this.studentRegistrationForm = this.fb.group({
       'student_type': new FormControl('',null),
      //  'AppNo': new FormControl('',null),
       'rte_appli_no': new FormControl('',null),
      'name': ['', Validators.compose([Validators.required, Validators.pattern(this.noSpecial)])],
      // 'name_id_card': new FormControl('', Validators.required),
      'name_tamil': new FormControl( null),
      // 'name_tamil': ['', Validators.compose([null, Validators.pattern(this.noSpecial)])],
      // 'name_tamil_id_card': new FormControl('', Validators.required),
      'aadhaar_uid_number': new FormControl(''),
      // 'enrollmentnumber': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'bloodgroup': new FormControl('',null),
      'religion_id': new FormControl('', Validators.required),
      'community_id': new FormControl('', Validators.required),
      'subcaste_id': new FormControl('', Validators.required),
      'mothertounge_id': new FormControl('', Validators.required),
      // 'disadvantaged_group' : new FormControl('', Validators.required),
      'differently_abled': new FormControl(''),
      'mother_name': new FormControl('',Validators.pattern(this.noSpecial)),
      'father_name': new FormControl('',Validators.pattern(this.noSpecial)),
      'mother_name_tamil': new FormControl('', null),
      'father_name_tamil': new FormControl('', null),
      'guardian_name_tamil': new FormControl('', null),
      // 'mother_name_tamil': new FormControl('',Validators.pattern(this.noSpecial)),
      // 'father_name_tamil': new FormControl('',Validators.pattern(this.noSpecial)),
      // 'guardian_name_tamil': new FormControl('',Validators.pattern(this.noSpecial)),
      'guardian_name': new FormControl('',Validators.pattern(this.noSpecial)),
      'father_occupation': new FormControl(''),
      'mother_occupation': new FormControl(''),
      'father_qualify': new FormControl(''),
      'mother_qualify': new FormControl(''),
      'guardian_qualify': new FormControl(''),
      'parent_income': new FormControl(''),
      'phone_number': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      'email': new FormControl(''),
      'house_address': new FormControl('', Validators.required),
      'street_name': new FormControl('', Validators.required),
      'area_village': new FormControl('', Validators.required),
      'district_id': new FormControl('', Validators.required),
      'pin_code': new FormControl('', Validators.required),
      'class_studying_id': new FormControl('',Validators.required),
      'doj': new FormControl('', Validators.required),
      'class_section': new FormControl('',Validators.required),
      'education_medium_id': new FormControl('',Validators.required),
      'school_admission_no': new FormControl('',Validators.required),
      'group_code_id': new FormControl(null),
      'pass_fail':new FormControl('PASS'),
      'rte_type': new FormControl('',null),
      'child_admitted_under_reservation': new FormControl('',null),
      'contractor_flag':new FormControl(false) /* contractor students flag  */
    });

    this.studentAdmittedForm = this.fb.group({
      'doj': new FormControl('', Validators.required),
      'id': new FormControl(''),
      'emis_unique_id_no': new FormControl(''),
      'emis_class_study': new FormControl(''),
      'emis_reg_stu_section': new FormControl(''),
      'emis_reg_grup_code':new FormControl(''),
      'emis_reg_mediofinst': new FormControl(''),
      'emis_reg_stu_admission_admiss': new FormControl('', Validators.required)
    });
  }
  show() {
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }
  showStudentDetails() {
   this.isStudentExist = true;
  }
  goToNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }

  goToPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
  }

  searchValidator() {
    this.form = new FormGroup({
      search_data: new FormControl('', [Validators.required]),
      db_col: new FormControl('', null),
      db_sub_col: new FormControl('', null),
      class_id: new FormControl('', null),
    });
  }

  getClassLists()
  {
    this.studentService.getClassList().subscribe((res) => {
      if (res) {
        this.classList =res;
      }
    });
  }

  onContractflagChange(e){
    this.sortedMediumListArr = [];
    this.studentRegistrationForm.controls['class_studying_id'].setValue(null);
    this.studentRegistrationForm.controls['class_section'].setValue(null);
    this.studentRegistrationForm.controls['education_medium_id'].setValue(null) ;
    this.sortedMediumListArr = (e == true) ? this.mediumListArr:  this.mediumofinstruction;
    if(e == true){
      if(+this.lowClass == 15 || +this.lowClass == 13 || +this.lowClass == 1 && +this.highClass == 12){
        this.classes.push({ label: 'V', value:'5'},{ label: 'VIII', value:'8'});
      }else if(+this.lowClass == 6 && +this.highClass == 8){   
        this.classes.push({ label: 'VIII', value:'8'});
      }else if(+this.lowClass == 6 && +this.highClass == 12){
        this.classes.push({ label: 'VIII', value:'8'});
      }
    }
    else{
      if(+this.lowClass == 15 || +this.lowClass == 13 || +this.lowClass == 1 && +this.highClass == 12){
        this.classes.splice(this.classes.findIndex(item => item.value == "5"), 1); 
        this.classes.splice(this.classes.findIndex(item => item.value == "8"), 1); 
      }else if(+this.lowClass == 6 && +this.highClass == 8){   
        this.classes.splice(this.classes.findIndex(item => item.value == "8"), 1); 
      }else if(+this.lowClass == 6 && +this.highClass == 12){
        this.classes.splice(this.classes.findIndex(item => item.value == "8"), 1); 
      }
    }
  }

  onClassChange(cls){
    debugger;
     this.selectedClass = Number(cls);
    if (this.selectedClass < 13 && this.selectedClass > 1) {
     this.needDCApproval = true;
    }
    else {
      this.needDCApproval = false;
    }
    this.sectionListArr = [];
    this.sectionListArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == cls)
                            .map(list => { return {label: list.section,value:list.section}});                          
  }

  onSectionChange()
  {
    debugger;
    let itsclass = this.studentRegistrationForm.get('class_studying_id').value;
    let itssection = this.studentRegistrationForm.get('class_section').value;
    // let itsconstractorflag = this.studentRegistrationForm.get('contractor_flag').value;
    this.groupListArr = [];

    let filteredArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == itsclass && item['section'] == itssection);
    this.mediumId = filteredArr.map(l => {return +l.school_medium_id})[0];
    debugger;
    this.studentRegistrationForm.controls['education_medium_id'].setValue(this.mediumId);
    if(itsclass == 11 || itsclass == 12){  
      this.groupshow = true;
      this.groupListArr = filteredArr.map(l => { return { label: l.group_name, value: l.group_id }; });
      let grpid: number = filteredArr.map(l => {return +l.group_id})[0];
      this.studentRegistrationForm.controls.group_code_id.setValue(grpid);
    }else{
      this.groupListArr = [{ label: "Choose Group", value: "" }] ;
      this.groupshow = false;
    }
  }

  
  onKey(event)
  {
    this.tamilClass = true;
    //   if(event.which==121){
    //     $(this).toggleClass('tamil');
    //     return false;
    //   }
    //   if($(this).hasClass('tamil')){
    //     toggleKBMode(event);
    //   }else{
    //     return true;
    //   }
    // });
    // $('input,textarea').on('keypress',function(event){
    //   if($(this).hasClass('tamil')){
    //     convertThis(event);
  }

//   var value = event.key;
//   // const translate = require('google-translate-api');
//   this.google-translate-api.translate('I spea Dutch!', {from: 'en', to: 'nl'}).then(res => {
//     console.log(res.text);
//     //=> Ik spreek Nederlands!
//     console.log(res.from.text.autoCorrected);
//     //=> true
//     console.log(res.from.text.value);
//     //=> I [speak] Dutch!
//     console.log(res.from.text.didYouMean);
//     //=> false
// }).catch(err => {
//     console.error(err);
// });

//   alert("hi");


getSectionForRevalentClass(cls){
  this.sectionListArr = [];
  this.sectionListArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == cls)
                            .map(list => { return {label: list.section,value:list.section}});                            
}

getGroupForRevalentClass()
{

  let itsclass = this.studentAdmittedForm.get('emis_class_study').value;
  let itssection = this.studentAdmittedForm.get('emis_reg_stu_section').value;

  this.groupListArr = [];
  let filteredArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == itsclass && item['section'] == itssection);
  if(itsclass == 11 || itsclass == 12){
    this.groupshow = true;
    this.groupListArr = filteredArr.map(l => { return { label: l.group_name, value: l.group_id }; });
    let grpid: number = filteredArr.map(l => {return +l.group_id})[0];
    this.studentAdmittedForm.controls.emis_reg_grup_code.setValue(grpid);
  }else{

    this.groupListArr = [{ label: "Choose Group", value: "" }] ;
    this.groupshow = false;
  }
  this.studentAdmittedForm.controls.emis_reg_mediofinst.setValue(filteredArr.map(l => {return +l.school_medium_id})[0]);
  // console.log(filteredArr.map(l => {return l.school_medium_id})[0]);
}

selectRecord(item)
{
      
    if(item.transfer_flag==1){
      
      let defaultsformat = 'yyyy-MM-dd';
      this.startdate  = this.pipe.transform(item.dob,defaultsformat);
      this.enddate = this.pipe.transform(new Date(),defaultsformat);

      this.studentAdmittedForm.controls.doj.setValue(this.enddate);
      this.studentAdmittedForm.controls.emis_unique_id_no.setValue(item.unique_id_no);
      this.studentAdmittedForm.controls.id.setValue(item.id);

		  // return true;
		  // var optchi=document.getValue("emis_class_study");
		  //   for(var i=0;i<optchi.children.length;i++){
		  //     //alert(optchi.children[i].getAttribute("disabled"));
		  //     if(optchi.children[i].getAttribute("disabled"))
			//      optchi.children[i].removeAttribute("disabled");
		  //   }
      //       var check=0;
		  //   for(var i=0;i<optchi.children.length;i++){
			//     if(parseInt(optchi.children[i].getAttribute("value"))==parseInt(students_detail.class_studying_id) || parseInt(optchi.children[i].getAttribute("value"))==parseInt(students_detail.class_studying_id)+1){
			//         check=1;
			// 	    continue;
			//     }else{
			// 	    optchi.children[i].setAttribute("disabled","disabled");
			// }
		  // }
      // if(!check){alert("Student Class Not Found In the School");}
        
      this.studentAdmittedForm.controls.emis_class_study.setValue(item.class_studying_id);
      if(+item.class_studying_id >= 1 && +item.class_studying_id <= 11) {
        this.classListArr = this.classListArr.filter(l=> (+l.value) >= (+item.class_studying_id) && (+l.value) <= (+item.class_studying_id+1));
      }
      else if(+item.class_studying_id == 12){
        this.classListArr = this.classListArr.filter(l=> (+l.value) == (+item.class_studying_id));
      }
      else if(+item.class_studying_id == 13 || +item.class_studying_id == 14 || +item.class_studying_id == 15){ 
        this.classListArr = this.classListArr;
        //have to check
      } 

      this.getSectionForRevalentClass(item.class_studying_id);
      this.studentAdmittedForm.controls.emis_reg_stu_section.setValue(item.class_section);
      this.studentAdmittedForm.controls.emis_reg_stu_admission_admiss.setValue(item.school_admission_no);
      this.getGroupForRevalentClass();
      // this.get_stu_section(students_detail.class_studying_id,students_detail.class_section);
      // this.studentAdmittedForm.controls.emis_reg_grup_code.setValue('');
      this.admitDisplayDialog = true;
      this.admitDialogTitle = item.name+'-'+item.unique_id_no;
    }
    else if(this.userSessionService.schoolId() == item.school_id){
       this.alertService.error('Not Allowed - Student is already in the School');
       return false;
    }
    else if(item.request_flag ==null || item.request_flag==0 ){
      this.studentId = item.id;
      this.display =true;
    }
    else{
     this.alertService.error('Request Already Raised for This Student');
     return false;
    }

}
raiseRequest()
{
  debugger;
  this.data = {"records":{"student_id": this.studentId,"school_unique_code":this.schoolId}}
  this.studentService.raiseRequestForm(this.data,true).subscribe((res) => {
    // this.display = false;
      if (res.dataStatus) {
        debugger;
        //this.studentDetail = res.result;
        this.alertService.success(res.message);
      }
      else{
        this.alertService.info(res.message);
    }
    this.display = false;
  });
}
moveToCpool(data){
  this.studentService.moveToCommonPool(data,true).subscribe(
    res => {
          if (res.dataStatus) {
            debugger;
            this.alertService.success(res.message);
          }
          else{
            this.alertService.info(res.message);
          }        
  },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});
}

cancel()
{
  this.display = false;
}

goToAdmission()
{
    this.isStudentExist = false;
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
    
}

radioSelect(name,value)
{
    debugger;
    this.form.controls['search_data'].setValue("");
    this.selectedItem = "Enter"  + name;
    this.selectedDatePicker = false;
    if(value == 'udise_code')
    {
      this.showCaption = true;
      this.form.controls['db_sub_col'].setValue('class_studying_id');
    this.isSelectedUdise = true;  
    this.maxLength = 16;
    }
    else {
      if(value == 'dob')
      {
        this.selectedDatePicker = true;
        this.showCaption = true;
      }
      this.form.controls['db_sub_col'].setValue("");
      this.form.controls['class_id'].setValue(-1);
      this.isSelectedUdise = false;  
      if(value == 'aadhaar_uid_number')
      {
        this.maxLength = 12;
        this.showCaption = false;
      }
      else if(value == 'phone_number')
      {
        this.maxLength = 10;
        this.showCaption = false;
      }
      else if(value == 'unique_id_no')
      {
        this.maxLength = 20;
        this.showCaption = false;
        
      }
    }
  }
  selectClass(event)
  {
    debugger;
    this.form.controls['class_id'].setValue(event.value.value);
  }
  // goToCommonPool()
  // {
  //   this.router.navigate(['/commonpool']);
  //   this.canSearch = true;
  // }
  search(event)
  {
    debugger;
    this.studentDetail = [];
    var searchData =this.form.value.search_data;
    
    var dbCol = this.form.value.db_col;
    var subDbCol =this.form.value.db_sub_col;
    var classId =this.form.value.class_id;
  
    this.stringFlag = event;

  this.data = {"records":{"search_data": searchData,"db_col":dbCol,"db_sub_col":subDbCol,"class_id":classId}}
  if(event == 'isSearch')
  {
    debugger;
    this.Search = true;this.ArchieveSearch = false;
    this.studentService.getStudentDetail(this.data,true).subscribe((res) => {
      if (res.dataStatus) {
        debugger;
        this.searchMessage = res.message;
        this.studentDetail = res.result;
      }
      else{
        this.searchMessage = res.message;
        this.studentDetail = [];
        this.alertService.info(res.message);
      }  
    },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});
  }
  else {
    this.ArchieveSearch = true; this.Search =false;
    this.studentService.getStudentArchiveDetail(this.data,true).subscribe((res) => {
      if (res.dataStatus) {
        debugger;
        this.searchMessage = res.message;
        this.studentDetail = res.result;
      }
      else{
        this.searchMessage = res.message;
        this.studentDetail = [];
        this.alertService.info(res.message);
      }
    },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});
  }
}

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  onSubmitAdmitForm(value){
    // console.log(value);
  this.studentService.updateStudentsAdmitted(value,this.userSessionService.schoolId()).subscribe(res => {
    // console.log(res);
    if(res){
      this.alertService.success(res.message);
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    }
    this.admitDisplayDialog = false;
  });
}

  onReligionChange(event, flag) {
    debugger;
    var e = event.value;
    this.community = this.allcommunity.filter(function (item) { return item.religion_id == +e }).map(l => { return { label: l.community_name, value: l.id } });
  }

  onCommunityChange(community, flag) {
    debugger;
    var e = community.value;
    this.casteList = this.allcaste.filter(function (item) { return item.community_id == +e }).map(l => { return { label: l.caste_name, value: l.id } });
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
  onSubmit() {
    // debugger;
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
    if (this.studentRegistrationForm.valid) {

      if(this.isRteStudent) { 
        this.studentRegistrationForm.controls['child_admitted_under_reservation'].setValue("Yes");
      }
      
      let aadharNo = this.studentRegistrationForm.value.aadhaar_uid_number;

        if (this.studentRegistrationForm.value.father_name == '' 
        && this.studentRegistrationForm.value.mother_name == '' 
        && this.studentRegistrationForm.value.guardian_name == '') {
          this.alertService.warning('Note: Father name or Mother name or Guardian name Either one is mandatory!');
          return true;
        }

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
      
        
        var data: any[] = this.studentRegistrationForm.value;
        data['school_id'] = this.userSessionService.schoolId();
        data['dob'] = this.pipe.transform(data['dob'], 'yyyy-MM-dd');
        data['doj'] = this.pipe.transform(data['doj'], 'yyyy-MM-dd');
        data['transfer_flag'] = this.needDCApproval ? "3" : "0";
        data['status'] = "Active";
        data['created_at'] = this.pipe.transform(new Date(), 'yyyy-MM-dd');
        data['name_tamil'] = this.name_tamil;
        data['father_name_tamil'] = this.father_name_tamil;
        data['mother_name_tamil'] = this.mother_name_tamil;
        data['guardian_name_tamil'] = this.guardian_name_tamil;
        
        var rteRecords =  {
	  
          "admit_status": "1",
          "rte_appli_no": this.studentRegistrationForm.value.rte_appli_no
        }
        if(this.isRteStudent) {
          this.studentService.studentRegistrationDataRTE(data,this.userSessionService.userName(),rteRecords).subscribe(res => {
            if (res.dataStatus) {
              debugger;
              // "Student registered successfully"
              this.alertService.success(res.message);
              this.studentRegistrationForm.reset();
              this.submitted = false;
             // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
            }
            else{
              this.alertService.error(res.message);
            }
          });
        }
        else if(this.needDCApproval) {
          var studentAdmitLog =  {
	  
            "schl_id": this.userSessionService.schoolId(),
		"class":this.studentRegistrationForm.value.class_studying_id,
		"sec": this.studentRegistrationForm.value.class_section,
		"stud_name":this.studentRegistrationForm.value.name,
		"admt_date": this.studentRegistrationForm.value.doj,
		"admison_status": "3",
		"remrks": ""
          }
          this.studentService.studentRegistrationNeedApproval(data,this.userSessionService.userName(),studentAdmitLog).subscribe(res => {
            if (res.dataStatus) {
              debugger;
              // "Student registered successfully"
              this.alertService.success(res.message);
              this.studentRegistrationForm.reset();
              this.submitted = false;
              this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
            }
            else{
              this.alertService.error(res.message);
            }
          });
        }
    else {
      this.studentService.studentRegistrationData(data,this.userSessionService.userName()).subscribe(res => {
        if (res.dataStatus) {
          debugger;
          // "Student registered successfully"
          this.alertService.success(res.message);
          this.studentRegistrationForm.reset();
          this.submitted = false;
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
        }
        else{
          this.alertService.error(res.message);
        }
      });
    }
   
    }
    else{
      for (const key of Object.keys(this.studentRegistrationForm.controls)) {
        if (this.studentRegistrationForm.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys', key);
            invalidControl.focus();
          //  break;
        }
      }
        this.validateAllFormFields(this.studentRegistrationForm);
        this.alertService.warning('Please Fill All Mandatory Fields.!');
        this.alertService.warning('Age should be minimum 3 years and maximum 20 years.!');

        return;
    }
    // this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }
  // validate all form group and form array fields
  validateAllFormFields(formGroup: any) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

  get diagnostic() {
    return JSON.stringify(this.studentRegistrationForm.value);
  }


  stucheckaadhar(e){
    this.studentService.stucheckaadhar(e).subscribe((res) => {
      if(res.dataStatus){
          let response = res.result;
          this.alertService.error("Given aadhar-no is already Existed with "+response[0].unique_id_no+' - '+response[0].name);
          this.inValidAadhar = true;  
      } else this.inValidAadhar = false;
    });
  }
  chooseStudentType(event) {
debugger;
if(event.value == 1)
{
  this.isAllowedToView = false;
}
else {
  this.isAllowedToView = true;
  this.isAllowedToEdit = true;
  this.isRteStudent = false;
  this.submitted = false;
  this.studentRegistrationForm.reset();
}
  }
// RteList
getRteDetails()
    {
      debugger;
      // this.Reg_No =this.studentRegistrationForm.value.AppNo;
      this.studentService.getrteliststudent(this.studentRegistrationForm.value.rte_appli_no).subscribe(res =>
        {
          
        //  this.Studentname =   this.Reg_No[0]['StudName'];
       if(res.dataStatus){
        this.alertService.success(res.message);
        this.isAllowedToView = true;
        this.isAllowedToEdit = false;
        this.isRteStudent = true;
        debugger;
        this.transferedDate = this.pipe.transform(res.result[0].dob, 'dd/MM/yyyy');
        this.studentRegistrationForm.patchValue(res.result[0]);
        this.onClassChange(this.studentRegistrationForm.value.class_studying_id);
        }
        else
      {
      this.alertService.error(res.message);
     }
    })

    }
    //  tamil only event
  tamilOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}

//   $(document).ready(function(){
//   alert("jquery");
//   $("#test1").on('keydown',function(event){
//      alert("hi1");
   
//     if(event.which==121){
//        alert("hielloooo");
//       $(this).toggleClass('tamil');
//       alert("tamilClass");
//       alert(event);
//       return false;
//     }
//     if($(this).hasClass('tamil')){
//       //toggleKBMode(event);
//     }else{
//       return true;
//     }
//   });
//   $('#test1').on('keypress',function(event){
//     if($(this).hasClass('tamil')){
//       //convertThis(event);
//     }
//   });
// });
// $(function () {
//   $("#test").keypress(function (e) {
//       var keyCode = e.keyCode || e.which;

//       $("#lblError").html("");

//       //Regex for Valid Characters i.e. Alphabets and Numbers.
//       var regex = /^[A-Za-z0-9]+$/;

//       //Validate TextBox value against the Regex.
//       var isValid = regex.test(String.fromCharCode(keyCode));
//       if (!isValid) {
//           $("#lblError").html("Only Alphabets and Numbers allowed.");
//       }

//       return isValid;
//   });
// });