import { Component,ViewChild, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
//import {Teacher,bloodgroupjson,pgjson,ugjson} from '../';
import { Teacher, bloodgroupjson, pgjson, ugjson, regulationjson, studyuptojson, trainingneedjson } from '../../../../../models/teacher';
import { DatePipe } from '@angular/common';
import { UidaiValidationService } from 'ng2-uidai-validation';

@Component({
  selector: 'app-add-edit-staff',
  templateUrl: './add-edit-staff.component.html',
  styleUrls: ['./add-edit-staff.component.css']
})
export class AddEditStaffComponent implements OnInit {
  /** ⇒ Variables Declaration */
  @Input() dtls: any[];
  @Input() _display: boolean; // alternative
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  pipe = new DatePipe('en-US'); 

  /* ✦ for session Declaration */
  public sesnId: any;
  public sesnTypeId: number;
  public userTypeId: number;

  /* ✦ for form Declaration */
  public teachingstaffregistration: FormGroup;
  date_relinguish_data: any;
  maxDate: string;
  dobMaxDate: string;
  dialogTitle : string;
  

  /* ✦ for Dropdown Declaration */
  public profileurl: any;
  public yeararr: any[] = [];
  public schoolteachers: any[] = [];
  subjects: any[];
  firstsubject: any = [];
  secondsubject: any = [];
  thridsubject: any = [];
  forthsubject: any = [];
  fifthsubject: any = [];
  sixthsubject: any = [];
  suffix: any[];
  classttaught: any[];
  bloodgroup: bloodgroupjson[];
  ug: ugjson[];
  pg: pgjson[];
  regulation: regulationjson[];
  studyupto: studyuptojson[];
  trainingneed: trainingneedjson[];
  social_category: any[];
  staff_category: any[];
  teaching_type:any[];
  non_teaching_type:any[];
  professional: any[];
  academic: any[];
  districtdet: any[];
  headaccount: any[];

  /* ✦ for Flag Variables */
  gotosave : boolean;
  diffableyes: boolean = false;
  gcetnumberyes: boolean = false;
  suffixyes: boolean = false;
  recruitmentyes: boolean = false;
  ugyes: boolean = false;
  pgyes: boolean = false;
  relinguishment: boolean = false;
  blockyes: boolean = false;
  subjectappointedflag : boolean = false;
  inValidAadhar:boolean = false;
  inValidAccno:boolean = false;
  appointment_nature: any;

  /* ✦ for array list for dropdown */
  recruit_type_arr: any = ["", "TNPSC", "TRB", "Compassionate Grounds", "Transfer of Services", "", "Employment Seniority"
                             , "Retrenched Census Employees", "Management", "SSA", "Direct Recruitment", "TET"];
  gcet_type_arr: any = ["", "GPF", "CPS", "Applied", "Not Applicaple", "EPF", "TPF"];
  professional_type_arr: any = ["", "D.T.Ed./S.G.T.T.", "B.Ed.", "M.Ed.", "B.Ed.(Spl.Edn.)", "B.P.Ed", "B.P.E.S.",
                                    "M.P.E.S", "Others", "Not Applicable", "B.M.S.", "M.P.Ed.", "TAMIL PANDIT TRAINING (TPT)"];
  /** ⇒ Constructor */
  constructor(private fb: FormBuilder,
              private el: ElementRef,
              private service: TeacherService,
              private userSessionService: UserSessionService, 
              private alertService: AlertService,
              private uidaiValidationService: UidaiValidationService){ 
              /* ✦ ID from session */
              this.userTypeId = +this.userSessionService.userTypeId();
              switch(this.userTypeId){
                case 1: 
                  console.info('teacher list in school login',this.userTypeId);
                  this.sesnId = this.userSessionService.schoolId(); // here session id is a school id ...............
                  this.sesnTypeId = +this.userSessionService.schoolTypeId(); // here session type id is a school type id (any one of this 1,2,3,4,5) for validation purpose............
                  break;
                case 2: case 3: console.info('teacher list in district and block`s',this.userTypeId);break;
                case 5: case 6: case 9: case 10: case 22:
                  console.info('teacher list in beo,ceo,deo login`s',this.userTypeId);
                  this.sesnId = this.userSessionService.offKeyId(); // here session id is an office key id .............
                  this.sesnTypeId = 1; // here session type id is 1 (Government) for validation purpose ...................
                  break;
                default:
                  console.info('can`t found usertype id');
                  this.alertService.info('Invalid User Access Denied');
                  this._display = false;
                  break;
              }
        }

  /** ⇒ On Init */         
  ngOnInit(){
    debugger
   // console.clear();
   // this.maxDate =  this.pipe.transform(new Date(),'yyyy-MM-dd');
    let year = this.pipe.transform(new Date(),'yyyy');
    let monthanddate = this.pipe.transform(new Date(),'MM-dd');
    let dob_max_year = +year-18;
    this.dobMaxDate =  dob_max_year+'-'+monthanddate;
    this.profileurl= './assets/media/logos/Placeholder.jpg';
    this.loadDropDownDtls();
    /* ✦ length 0 means add-staff else edit-staff */
    this.formInitialization(null, null, null);
    if (!this.dtls || !this.dtls.length) {
      this.dialogTitle = this.userTypeId == 22 ? "Create Staff" : "Create Staff (or) Instructors (Including Head Master/Mistress)";
      this.gotosave = true;
    }
    else{
      setTimeout(()=>{
        this.editForm(this.dtls[0]);
        this.gotosave = false;
      }, 2000);
    }
    // console.log('this.dtls',this.dtls);
  }

  /** ⇒ on close dialog */
  onHide(e: any) { 
    // console.log('onHide',e);
    this.onClose.emit(this._display);
  }

   
  /** ⇒ Form Initialization */         
  formInitialization(part1, part2, regulation) {
    console.log('147','forminitialization',part1, part2, regulation);
    var recruit_type_inx = (part1 !== null) ? this.recruit_type_arr.indexOf(part1['recruit_type']) : null;
    var gcet_type_inx = (part1 !== null) ? this.gcet_type_arr.indexOf(part1['cps_gps_details']) : null;
    var professional_type_inx = (part1 !== null) ? this.professional_type_arr.indexOf(part1['professional']) : null;
    var posting_nature_inx = (part1 !== null) ? part1['posting_nature'] == 'Govt' ? '1' : part1['posting_nature'] == 'Management' ? '2' : null : null;
    this.dialogTitle = (part1 !== null) ? 'EMIS TEACHER ID ('+part1['teacher_id']+')':'Loading .....';
    
    
    this.teachingstaffregistration = this.fb.group({
      regularisation: this.fb.array([]),
      category:[null, Validators.required],
      teacher_code: [part1 !== null ? part1['teacher_code'] : null],
      // off_id:[part1 !== null ? part1['off_id'] : null],
      teacher_name: [part1 !== null ? part1['teacher_name'] : null, Validators.required],
      teacher_name_tamil:[part1 !== null ?part1['teacher_name_tamil'] : null],
      u_id: [part1 !== null ? part1['u_id'] : null],
      // aadhar_no: [part1 !== null ? part1['aadhar_no' ] : null],
      aadhar_no: [part1 !== null ? part1['aadhar_no' ] : null, Validators.required],
      gender: [part1 !== null ? part1['gender'] : null, Validators.required],
      e_blood_grp: [part1 !== null ? part1['e_blood_grp'] : null, Validators.required],
      staff_dob: [part1 !== null ? part1['staff_dob'] : null, Validators.required],
      e_prnts_nme: [part1 !== null ? part1['e_prnts_nme'] : null, Validators.required],
      teacher_mother_name: [part1 !== null ? part1['teacher_mother_name'] : null, Validators.required],
      social_category: [part1 !== null ? part1['social_category'] : null, Validators.required],
      teacher_spouse_name: [part1 !== null ? part1['teacher_spouse_name'] : null, Validators.required],
      disability_type: [part1 !== null ? part1['disability_type'] : null, Validators.required],
      types_disability: [part1 !== null ? part1['types_disability'] : null],

      teacher_type: [null, Validators.required],
      appointed_subject: [null],
      staff_service_join: [part1 !== null ? part1['staff_join'] : null, Validators.required],
      staff_pjoin: [part1 !== null ? part1['staff_pjoin'] : null, Validators.required],
      staff_psjoin: [part1 !== null ? part1['staff_psjoin'] : null, Validators.required],
      joining_present_block: [part2 !== null ? part2['doj_block'] : null],
      posting_nature : [posting_nature_inx,null],
      
      probation_declaration: [part2 !== null ? part2['prob_id'] : null],
      probation_date: [part2 !== null ? part2['prob_date'] : null],

      cps_gps_details: [gcet_type_inx,null],
      cps_gps: [part1 !== null ? part1['cps_gps'] : null],
     recruit_type: [recruit_type_inx,null],
      // recruit_type : [''],
      recruit_year: [part1 !== null ? part1['recruit_year'] : null],
      recruit_rank: [part1 !== null ? part1['recruit_rank'] : null],
      suffix: [part1 !== null ? part1['suffix'] : null],
      // appointment_nature : [''], 
       appointment_nature: [part1 !== null ? part1['appointment_nature'] : null],
      relinguish: [part2 !== null ? part2['relinguish'] : null],
      date_relinguish: [part2 !== null ? part2['relinguish_date'] : null],
      head_account: [part1 !== null ? part1['head_account'] : null],

      mbl_nmbr: [part1 !== null ? part1['mbl_nmbr'] : null, [Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      email_id: [part1 !== null ? part1['email_id'] : null, [Validators.required,Validators.email]],
      e_prsnt_doorno: [part1 !== null ? part1['e_prsnt_doorno'] : null, Validators.required],
      e_prsnt_street: [part1 !== null ? part1['e_prsnt_street'] : null, Validators.required],
      e_prsnt_place: [part1 !== null ? part1['e_prsnt_place'] : null, Validators.required],
      e_prsnt_distrct: [part1 !== null ? part1['e_prsnt_distrct'] : null, Validators.required],
      e_prsnt_pincode: [part1 !== null ? part1['e_prsnt_pincode'] : null, [Validators.required, Validators.pattern('[6]\\d{5}')]],
           
      tenth_passed: [part2 !== null ? part2['sslc_dop'] : null],
      twelth_passed: [part2 !== null ? part2['higersec_dop'] : null],
      academic: [part1 !== null ? part1['academic'] : null, Validators.required],
      professional: [professional_type_inx, Validators.required],
      e_ug: [part1 !== null ? part1['e_ug'] : null],
      e_pg: [part1 !== null ? part1['e_pg'] : null],
      science_upto: [part1 !== null ? part1['science_upto'] : null, Validators.required],
      math_upto: [part1 !== null ? part1['math_upto'] : null, Validators.required],
      english_upto: [part1 !== null ? part1['english_upto'] : null, Validators.required],
      soc_study_upto: [part1 !== null ? part1['soc_study_upto'] : null, Validators.required],
      lang_study_upto: [part1 !== null ? part1['lang_study_upto'] : null, Validators.required],


      subject1: [part1 !== null ? part1['subject1'] : null],
      subject2: [part1 !== null ? part1['subject2'] : null],
      subject3: [part1 !== null ? part1['subject3'] : null],
      subject4: [part1 !== null ? part1['subject4'] : null],
      subject5: [part1 !== null ? part1['subject5'] : null],
      subject6: [part1 !== null ? part1['subject6'] : null],

      trng_needed: [part1 !== null ? part1['trng_needed'] : null],
      trng_received: [part1 !== null ? part1['trng_received'] : null],
      trained_comp: [part1 !== null ? part1['trained_comp'] : null],
      trained_cwsn: [part1 !== null ? part1['trained_cwsn'] : null],
      class_taught: [part1 !== null ? part1['class_taught'] : null],
      nontch_days: [part1 !== null ? part1['nontch_days'] : null],

      ifsc_code: [part1 !== null ? part1['ifsc_code'] : null],
      branch: [part1 !== null ? part1['branch'] : null],
      branch_id: [part1 !== null ? part1['branch'] : null],
      bank_name: [part1 !== null ? part1['bank_name'] : null],
      bank_acc: [part1 !== null ? part1['bank_acc'] : null],
      pan_no: [part1 !== null ? part1['pan_no'] : null,[Validators.pattern('[A-Z]{5}\\d{4}[A-Z]{1}')]],
      doj_dept:[part1 !== null ? part1['doj_dept'] : null],
      image_name: [part1 !== null ? part1['e_picid'] : null],
      image_data: ['']
    });
    this.handleFormChanges(regulation);
    if(part1 !== null){
     
      this.teachingstaffregistration.controls['category'].setValue(part1['category']);
     
        this.teachingstaffregistration.controls['teacher_type'].setValue(part1['teacher_type']);
        this.teachingstaffregistration.controls['appointed_subject'].setValue(part1['appointed_subject']);
       if(part1['ifsc_code'] !==  null) this.getbankdetails(part1['ifsc_code']);
    }
  }
  /** ⇒ act as onchange */         
  handleFormChanges(regulation) {       
     
    this.teachingstaffregistration.get('category').valueChanges.subscribe(mode => {
      this.teachingstaffregistration.controls['teacher_type'].setValue(null);
      this.staff_category = [];
      const control = <FormArray>this.teachingstaffregistration.controls['regularisation'];
      if(mode == '1' && (this.sesnTypeId == 2 || this.sesnTypeId == 4 || this.sesnTypeId == 1)){
        if (regulation === null) {
          control.push(this.regularisationFormCreation(null));
        }else {
          if(regulation.length > 0){
            regulation.forEach((val, inx) => {
              control.push(this.regularisationFormCreation(val));
            });
          }else control.push(this.regularisationFormCreation(null));
      }
      this.teachingstaffregistration.controls['subject1'].setValidators([Validators.required]);
      this.teachingstaffregistration.controls['joining_present_block'].setValidators([Validators.required]);
      this.teachingstaffregistration.controls['tenth_passed'].setValidators([Validators.required]);
      
      }else if(mode == '2'){ 
        control.controls = [];
        this.teachingstaffregistration.controls['subject1'].clearValidators();
        this.teachingstaffregistration.controls['subject1'].setValue('');
        this.teachingstaffregistration.controls['joining_present_block'].clearValidators();
        this.teachingstaffregistration.controls['joining_present_block'].setValue('');
        this.teachingstaffregistration.controls['tenth_passed'].clearValidators();
        this.teachingstaffregistration.controls['tenth_passed'].setValue('');
      }
      if(mode == '1')
      { 
        
        //this.staff_category = this.teaching_type;
       
          this.staff_category = this.teaching_type;
      
        this.teachingstaffregistration.controls['appointed_subject'].setValidators([Validators.required]);
      }
      else{ this.staff_category = this.non_teaching_type ;this.teachingstaffregistration.controls['appointed_subject'].clearValidators();
            this.teachingstaffregistration.controls['appointed_subject'].setValue(''); }
      this.teachingstaffregistration.controls['appointed_subject'].updateValueAndValidity();
      this.teachingstaffregistration.controls['subject1'].updateValueAndValidity();      
      this.teachingstaffregistration.controls['joining_present_block'].updateValueAndValidity();      
      this.teachingstaffregistration.controls['tenth_passed'].updateValueAndValidity();      
    });     
  }
 /** ⇒ load master details for Dropdowns */         
 loadDropDownDtls(){
   debugger;
  this.service.getdropdownsteachingstaff(true).subscribe(res => {

    this.subjects = res['subjects'];
   
    this.firstsubject = this.subjects.map(i => ({...i , 'isdisabled': false}));
    this.secondsubject = this.subjects.map(i => ({...i , 'isdisabled': false}));
    this.thridsubject = this.subjects.map(i => ({...i , 'isdisabled': false}));
    this.forthsubject = this.subjects.map(i => ({...i , 'isdisabled': false}));
    this.fifthsubject = this.subjects.map(i => ({...i , 'isdisabled': false}));
    this.sixthsubject = this.subjects.map(i => ({...i , 'isdisabled': false}));
    
    //  this.bloodgroup= res['bloodgroup'];
    this.social_category = res['teachersocial'];
    this.teaching_type = res['teachingtype'];
    this.non_teaching_type = res['nonteachingtype'];
    this.professional = res['professional'];
    this.academic = res['academic'];
    this.districtdet = res['schooldist'];
    this.headaccount = res['head_account'];
    this.suffix = res['suffix'];
    this.classttaught = res['classtaught'];
    console.log(this.classttaught);

    this.service.getBloodgroupJSON().subscribe(json => {
      debugger;
      this.bloodgroup = json['bloodgroup']
      this.pg = json['pg']
      this.ug = json['ug']
      this.regulation = json['regulation']
      this.studyupto = json['studyupto']
      this.trainingneed = json['trainingneed']
    });
    this.editForm(this.dtls[0]);
    this.gotosave = false;
  });
 }

 /** ⇒ Fetching the details  */         
 editForm(rowdata) {
    
    this.date_relinguish_data = (rowdata['secondpart'] !== null || rowdata['secondpart'].length > 0 )  ?  rowdata['secondpart']['relinguish'] : null;
    
    
    var diffabled = rowdata['firstpart'].disability_type;
    var gcet = rowdata['firstpart'].cps_gps_details;
    var academic = rowdata['firstpart'].academic;
    var recruit_type = rowdata['firstpart'].recruit_type;

    this.divshowhide(diffabled,'1d');
    this.divshowhide(academic,'4d');
    this.divshowhide(this.date_relinguish_data,'5d');
    // console.log(rowdata['firstpart'].teacher_type);
    this.divshowhide(rowdata['firstpart'].teacher_type,'6d');
    
    if (recruit_type == "TNPSC" || recruit_type == "TRB" || recruit_type == "TET") {
      this.recruitmentyes = true;
    }
    if (gcet == "GPF" || gcet == "CPS" || gcet == "EPF" || gcet == "TPF") {
      this.gcetnumberyes = true;
    }
    if (gcet == "GPF" || gcet == "CPS" || gcet == "TPF") {
      this.suffixyes = true;
    } 
    this.formInitialization(rowdata['firstpart'], rowdata['secondpart'], rowdata['regulationpart']);

    this._changeDate(rowdata['firstpart']['staff_dob'],1);
    this._getProfilePic(rowdata['firstpart']['e_picid']);
    this._subjectvalidation(1);
    // this.dialogTitle = rowdata['firstpart']['teacher_name']+' ( '+rowdata['firstpart']['teacher_code']+' ) Staff Detail'
   // this.dialogTitle = rowdata['firstpart']['teacher_name']+'`s Profile Details'

    this.dialogTitle ="EMIS TEACHER ID"+'( '+rowdata['firstpart']['teacher_id']+' )';
    // item.name+'-'+item.unique_id_no
  }

  /** ⇒ regularisation form Initialization */         
  regularisationFormCreation(record) {
    return this.fb.group({
			type_date: [record !== null ? record['type_date'] : '',Validators.required],
      dates: [record !== null ? record['dates'] : '',Validators.required],
      appoint_nature: [record !== null ? record['appoint_nature'] : '',Validators.required],
    });
  }

  /** ⇒ add regularisation functionality */         
  addRegularisation() {
    const control = <FormArray>this.teachingstaffregistration.controls['regularisation'];
    if (control.valid) {
      control.push(this.regularisationFormCreation(null));
    }
    else{
      this.validateAllFormFields(control);
      this.alertService.warning('Please Fill All Mandatory Fields In Date of Regularisation Part!');
      return true;
    }  
  }

  /** ⇒ remove regularisation functionality */         
  deleteRegularisation(index) {
    const control = <FormArray>this.teachingstaffregistration.controls['regularisation'];
    control.removeAt(index);
  }

  /** ⇒ using ifsc code to get the bank details */         
  getbankdetails(no){
    if(no != ''){
      this.service.getbankdetails(no).subscribe(td => {
        if(td.dataStatus)
        {
        
            var branch=td.result[0].branch;        
            var bankname=td.result[0].bank_name;
            var id=td.result[0].id;
            
            this.teachingstaffregistration.controls['branch'].setValue(branch);
            this.teachingstaffregistration.controls['branch'].updateValueAndValidity();
            this.teachingstaffregistration.controls['branch_id'].setValue(id);
            this.teachingstaffregistration.controls['branch_id'].updateValueAndValidity();
            this.teachingstaffregistration.controls['bank_name'].setValue(bankname);
            this.teachingstaffregistration.controls['bank_name'].updateValueAndValidity();
        }
        else  this.alertService.error(td.message);
      });
    }
  }
  appointedsubject: any = [];
  /** ⇒ based on value its show and hide other fields */         
  divshowhide(val: any, strFlag) {
          switch (strFlag) {
        case "1d": {
          this.diffableyes = (val == 1) ? false : true;
          break;
        }
        case "2d": {
          this.gcetnumberyes = (val == 1 || val == 2 || val == 5 || val == 6) ? true : false;
          this.suffixyes = (val == 1 || val == 2 || val == 6) ? true : false;
          break;
        }
        case "3d": {
          this.recruitmentyes = (val == 1 || val == 2 || val == 11) ? true : false;
          break;
        }
        case "4d": {
          this.ugyes = (val == 4 || val == 5 || val == 6 || val == 7 || val == 8) ? true : false;
          this.pgyes = (val == 5 || val == 6 || val == 7 || val == 8) ? true : false;
          break;
        }
        case "5d": {
          this.relinguishment = (val == 1) ? true : false;
          break;
        }
        case "6d" : {
          // console.log('val,stringflag',val,strFlag);
          val = +val;
          // this.subjectappointedflag = (val == 7) ? true : false;
          this.teachingstaffregistration.controls['appointed_subject'].setValue(null);
          if(val == 7){
            this.subjectappointedflag = true;
              // console.log('val',val);
              let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
              let filteredIdList = ["91","92","129","130","131","132","133","134"];
              // console.log(originalIdList);
              // console.log(filteredIdList);
              this.appointedsubject = filteredIdList.map(x => {
                let inx = originalIdList.indexOf(x);
                return this.subjects[inx];
              });
              // this.appointedsubject = this.subjects;
          }
          else if(val == 41 || val==29 && this.userTypeId == 1 || this.userTypeId ==2|| this.userTypeId == 4)
         {
          
            this.subjectappointedflag = true;
            // console.log('val',val);
            let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
            let filteredIdList = ["1"];
            // console.log(originalIdList);
            // console.log(filteredIdList);
            this.appointedsubject = filteredIdList.map(x => {
              let inx = originalIdList.indexOf(x);
              return this.subjects[inx];
            });
          }
          
          else if(val == 11 && this.userTypeId == 1 || this.userTypeId ==2|| this.userTypeId == 4)
          {
             this.subjectappointedflag = true;
             // console.log('val',val);
             let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
             let filteredIdList = ["48","46","3","7","8","41","45","94","95","96"];
             // console.log(originalIdList);
             // console.log(filteredIdList);
             this.appointedsubject = filteredIdList.map(x => {
               let inx = originalIdList.indexOf(x);
               return this.subjects[inx];
             });
           }
           else if(val == 36 && this.userTypeId == 1 || this.userTypeId ==2|| this.userTypeId == 4)
           {
            
              this.subjectappointedflag = true;
              // console.log('val',val);
              let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
              let filteredIdList = ["48","46","3","22","13","26","27","14","56","11","19","18","15","10","51","23"];
              // console.log(originalIdList);
              // console.log(filteredIdList);
              this.appointedsubject = filteredIdList.map(x => {
                let inx = originalIdList.indexOf(x);
                return this.subjects[inx];
              });
            }
            else if(val == 37 || val == 38 || val == 39 && this.userTypeId == 1 || this.userTypeId ==2|| this.userTypeId == 4)
            {
             
               this.subjectappointedflag = true;
               // console.log('val',val);
               let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
               let filteredIdList = ["92"];
               // console.log(originalIdList);
               // console.log(filteredIdList);
               this.appointedsubject = filteredIdList.map(x => {
                 let inx = originalIdList.indexOf(x);
                 return this.subjects[inx];
               });
             }
             else if(val == 128 && this.userTypeId == 1 || this.userTypeId ==2|| this.userTypeId == 4)
             {
              
                this.subjectappointedflag = true;
                // console.log('val',val);
                let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
                let filteredIdList = ["54"];
                // console.log(originalIdList);
                // console.log(filteredIdList);
                this.appointedsubject = filteredIdList.map(x => {
                  let inx = originalIdList.indexOf(x);
                  return this.subjects[inx];
                });
              }

          else{
            this.subjectappointedflag = false;
            this.appointedsubject = this.subjects;
          }
          break;
          
        }
        default: {
          console.log("Invalid choice");
          break;
        }
      }
   }
  
  /** ⇒ set required validation  */         
  setRequired(){
    let category = this.teachingstaffregistration.get('category').value;

    if(this.ugyes){
      this.teachingstaffregistration.controls['e_ug'].setValidators([Validators.required]);
    }
    else{
      this.teachingstaffregistration.controls['e_ug'].clearValidators();
      this.teachingstaffregistration.controls['e_ug'].setValue(null);
    }
    if(this.pgyes){
      this.teachingstaffregistration.controls['e_pg'].setValidators([Validators.required]);
    }
    else{
      this.teachingstaffregistration.controls['e_pg'].clearValidators();
      this.teachingstaffregistration.controls['e_pg'].setValue(null);
    }
    
    
    if(this.sesnTypeId == 2 || this.sesnTypeId == 4){
      this.teachingstaffregistration.controls['posting_nature'].setValidators([Validators.required]);
    }
    else{
      this.teachingstaffregistration.controls['posting_nature'].clearValidators();
      this.teachingstaffregistration.controls['posting_nature'].setValue(null);
    }
    this.teachingstaffregistration.controls['posting_nature'].updateValueAndValidity();
    this.teachingstaffregistration.controls['trng_received'].setValidators([Validators.required]);
    this.teachingstaffregistration.controls['trng_needed'].setValidators([Validators.required]);
    this.teachingstaffregistration.controls['trained_comp'].setValidators([Validators.required]);
    this.teachingstaffregistration.controls['trained_cwsn'].setValidators([Validators.required]);
    this.teachingstaffregistration.controls['class_taught'].setValidators([Validators.required]);  

    if(this.sesnTypeId == 1 || this.sesnTypeId == 2  || this.sesnTypeId == 4 ){  
      
      debugger;
      this.teachingstaffregistration.controls['nontch_days'].setValidators([Validators.required]);
      this.teachingstaffregistration.controls['recruit_type'].setValidators([Validators.required]);
      this.teachingstaffregistration.controls['appointment_nature'].setValidators([Validators.required]);
      if(!this.subjectappointedflag){ 
          this.teachingstaffregistration.controls['cps_gps_details'].setValidators(null);
          // this.teachingstaffregistration.controls['recruit_type'].setValidators([Validators.required]);
          // this.teachingstaffregistration.controls['appointment_nature'].setValidators([Validators.required]);
          if(this.gcetnumberyes){
            this.teachingstaffregistration.controls['cps_gps'].setValidators([Validators.required]);
          }else{
            this.teachingstaffregistration.controls['cps_gps'].clearValidators();
            this.teachingstaffregistration.controls['cps_gps'].setValue(null);
          }
          if(this.suffixyes){
            this.teachingstaffregistration.controls['suffix'].setValidators([Validators.required]);
          }
          else{
            this.teachingstaffregistration.controls['suffix'].clearValidators();
            this.teachingstaffregistration.controls['suffix'].setValue(null);
          }
          if(this.recruitmentyes){
            this.teachingstaffregistration.controls['recruit_year'].setValidators([Validators.required]);
            this.teachingstaffregistration.controls['recruit_rank'].setValidators([Validators.required]);
          
          }
          else{
            this.teachingstaffregistration.controls['recruit_year'].clearValidators();
            this.teachingstaffregistration.controls['recruit_year'].setValue(null);
            this.teachingstaffregistration.controls['recruit_rank'].clearValidators();
            this.teachingstaffregistration.controls['recruit_rank'].setValue(null);
         
          }
      }
      else{
        this.teachingstaffregistration.controls['cps_gps_details'].clearValidators();
        // this.teachingstaffregistration.controls['recruit_type'].clearValidators();
        // this.teachingstaffregistration.controls['appointment_nature'].clearValidators();
        this.teachingstaffregistration.controls['cps_gps_details'].setValue(null);
        // this.teachingstaffregistration.controls['recruit_type'].setValue(null);
        // this.teachingstaffregistration.controls['appointment_nature'].setValue(null);
     
      }
      if(!this.subjectappointedflag && category == '1'){
        // this.teachingstaffregistration.controls['probation_declaration'].setValidators([Validators.required]);
        this.teachingstaffregistration.controls['probation_date'].setValidators([Validators.required]);
        this.teachingstaffregistration.controls['relinguish'].setValidators([Validators.required]);
        this.teachingstaffregistration.controls['head_account'].setValidators([Validators.required]);
        if(this.relinguishment){
          this.teachingstaffregistration.controls['date_relinguish'].setValidators([Validators.required]);
        }
        else{
          this.teachingstaffregistration.controls['date_relinguish'].clearValidators();
          this.teachingstaffregistration.controls['date_relinguish'].setValue(null);
        }
      }
      else{
        // this.teachingstaffregistration.controls['probation_declaration'].clearValidators();
        this.teachingstaffregistration.controls['probation_date'].clearValidators();
        this.teachingstaffregistration.controls['relinguish'].clearValidators();
        this.teachingstaffregistration.controls['head_account'].clearValidators();
        // this.teachingstaffregistration.controls['probation_declaration'].setValue(null);
        this.teachingstaffregistration.controls['probation_date'].setValue(null);
        this.teachingstaffregistration.controls['relinguish'].setValue(null);
        this.teachingstaffregistration.controls['head_account'].setValue(null);
      }
    }
      // this.teachingstaffregistration.controls['trng_needed'].clearValidators();
      // this.teachingstaffregistration.controls['trng_received'].clearValidators();
      // this.teachingstaffregistration.controls['class_taught'].clearValidators();
      // this.teachingstaffregistration.controls['trained_comp'].clearValidators();
      // this.teachingstaffregistration.controls['trained_cwsn'].clearValidators();
      // this.teachingstaffregistration.controls['nontch_days'].clearValidators();
      // this.teachingstaffregistration.controls['trng_needed'].setValue(null);
      // this.teachingstaffregistration.controls['trng_received'].setValue(null);
      // this.teachingstaffregistration.controls['class_taught'].setValue(null);
      // this.teachingstaffregistration.controls['trained_comp'].setValue(null);
      // this.teachingstaffregistration.controls['trained_cwsn'].setValue(null);
      // this.teachingstaffregistration.controls['nontch_days'].setValue(null);

    // this.teachingstaffregistration.controls['probation_declaration'].updateValueAndValidity();
    this.teachingstaffregistration.controls['probation_date'].updateValueAndValidity();
    this.teachingstaffregistration.controls['trng_needed'].updateValueAndValidity();
    this.teachingstaffregistration.controls['trng_received'].updateValueAndValidity();
    this.teachingstaffregistration.controls['class_taught'].updateValueAndValidity();
    this.teachingstaffregistration.controls['trained_comp'].updateValueAndValidity();
    this.teachingstaffregistration.controls['trained_cwsn'].updateValueAndValidity();
    this.teachingstaffregistration.controls['nontch_days'].updateValueAndValidity();
    this.teachingstaffregistration.controls['cps_gps_details'].updateValueAndValidity();
    this.teachingstaffregistration.controls['cps_gps'].updateValueAndValidity();
    this.teachingstaffregistration.controls['suffix'].updateValueAndValidity();
    this.teachingstaffregistration.controls['e_ug'].updateValueAndValidity();
    this.teachingstaffregistration.controls['e_pg'].updateValueAndValidity();
    debugger;
    this.teachingstaffregistration.controls['recruit_type'].updateValueAndValidity();
    this.teachingstaffregistration.controls['appointment_nature'].updateValueAndValidity();
    this.teachingstaffregistration.controls['relinguish'].updateValueAndValidity();
    this.teachingstaffregistration.controls['head_account'].updateValueAndValidity();
    this.teachingstaffregistration.controls['recruit_year'].updateValueAndValidity();
    this.teachingstaffregistration.controls['recruit_rank'].updateValueAndValidity();
    this.teachingstaffregistration.controls['date_relinguish'].updateValueAndValidity();
    // if(this.sesnTypeId == 1){
    //   this.teachingstaffregistration.controls['ifsc_code'].setValidators([Validators.required]);
    //   this.teachingstaffregistration.controls['bank_acc'].setValidators([Validators.required]);
    //   this.teachingstaffregistration.controls['pan_no'].setValidators([Validators.required]);
    // }
    // else{
    //   this.teachingstaffregistration.controls['ifsc_code'].clearValidators();
    //   this.teachingstaffregistration.controls['bank_acc'].clearValidators();
    //   this.teachingstaffregistration.controls['pan_no'].clearValidators();
    // }

    // this.teachingstaffregistration.controls['ifsc_code'].updateValueAndValidity();
    // this.teachingstaffregistration.controls['bank_acc'].updateValueAndValidity();
    // this.teachingstaffregistration.controls['pan_no'].updateValueAndValidity();
    if(category == '1' && (this.sesnTypeId == 2 || this.sesnTypeId == 4 || this.sesnTypeId == 1)){
      this.setRequriedforDOR();    
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target);
      console.log(event);
      console.log(event.target.files[0]);
      // if (event.target.files[0].size < 4.6302083333 * 3.96875){// Checking height * width
      if (event.target.files[0].size <= 25600) {// checking size here - 2MB}
      const fileReader: FileReader = new FileReader();
  
      fileReader.readAsDataURL(event.target.files[0]); // read file as data url
  
      fileReader.onload = (event: Event) => {// called once readAsDataURL is completed
        this.profileurl = fileReader.result;
        this.teachingstaffregistration.controls['image_data'].setValue(fileReader.result);
        let image_data = fileReader.result
				let image_name = this.teachingstaffregistration.get('image_name').value;
        let u_id = this.teachingstaffregistration.get('u_id').value;
        let data = { 'image_data' : image_data,'image_name':image_name,'u_id':u_id};
        this._saveProfilePic(data);
     };
     }else{
        this.alertService.warning('Image Can`t uploaded because Image size should have less than or equal to 25kb');
     }
    //  } else{
    //   this.alertService.warning('Image should have 175px width and 150px height');
    //  }
     
    }
  }

  setRequriedforDOR(){
    const control = <FormArray>this.teachingstaffregistration.controls['regularisation'];
    let category = this.teachingstaffregistration.get('category').value;
    let CtrlLength = control.controls.length;
    if (CtrlLength > 0) {
        let cnt = 0;
        while (cnt < CtrlLength) {

            let ChildCtrl: any = control.controls[cnt]

          
            if((this.sesnTypeId == 1 || this.sesnTypeId == 2 || this.sesnTypeId == 4) && category == '1')
                ChildCtrl.controls['appoint_nature'].setValidators([Validators.required]);
            else {
                ChildCtrl.controls['appoint_nature'].clearValidators();
                ChildCtrl.controls['appoint_nature'].setValue('');
            }

            if((this.sesnTypeId == 1 || this.sesnTypeId == 2 || this.sesnTypeId == 4) && category == '1' && !this.subjectappointedflag){
              ChildCtrl.controls['type_date'].setValidators([Validators.required]);
              ChildCtrl.controls['dates'].setValidators([Validators.required]);  
            }
            else {
              ChildCtrl.controls['type_date'].clearValidators();
              ChildCtrl.controls['type_date'].setValue('');
              ChildCtrl.controls['dates'].clearValidators();
              ChildCtrl.controls['dates'].setValue('');
            }

            ChildCtrl.controls['type_date'].updateValueAndValidity();
            ChildCtrl.controls['dates'].updateValueAndValidity();
            ChildCtrl.controls['appoint_nature'].updateValueAndValidity();

            cnt++;
        }
    }
  }

  /** ⇒ update staff list details  */         
  updateteacher() {
    debugger;
    let x = 0 ; 
    this.setRequired();
      this.inValidAadhar = false;
      let aadharNo = this.teachingstaffregistration.value.aadhar_no != null ? this.teachingstaffregistration.value.aadhar_no : 0;
       if(aadharNo != ''){
        let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
        if(!isValidUidaiNo){
        this.alertService.error('Invalid Aadhaar Number');
        this.inValidAadhar = true;
        return true;
        }
      }
      
      //for focus
      for (const key of Object.keys(this.teachingstaffregistration.controls)) {
        if (this.teachingstaffregistration.controls[key].invalid) {
          console.log('first'+key)
          if(key != 'regularisation'){
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('702',invalidControl,key);
            invalidControl.focus();
            break;
          }
          else if(key == 'regularisation'){ 
            console.log('second'+key)
            const control = <FormArray>this.teachingstaffregistration.controls['regularisation'];
            let CtrlLength = control.controls.length;
            let cnt = 0
            if (CtrlLength > 0) {
              for(cnt;cnt < CtrlLength;cnt++){
                let ChildCtrl: any = control.controls[cnt]
                for (const key of Object.keys(ChildCtrl.controls)) {
                  if (ChildCtrl.controls[key].invalid) {
                      const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                      console.log('716',invalidControl,cnt,key);
                      invalidControl.focus();
                      break;
                  }
                }
              }
            }
          }
        }
      }
    
    if (this.teachingstaffregistration.valid) {
      var teachingstaffregistration = this.teachingstaffregistration.value;
      if(teachingstaffregistration.teacher_type == 7){
        this.appointment_nature = 3;
      }
      else {
        this.appointment_nature = teachingstaffregistration.appointment_nature;
        console.log(this.appointment_nature,"nature");
      }
      let firstpartdetails: any = {
        'u_id'                   : teachingstaffregistration.u_id,
        'off_id'                 : teachingstaffregistration.off_id,
        'teacher_name'           : teachingstaffregistration.teacher_name,
        'teacher_name_tamil'     : teachingstaffregistration.teacher_name_tamil,
        'aadhar_no'              : teachingstaffregistration.aadhar_no,
        'gender'                 : teachingstaffregistration.gender,
        'e_blood_grp'            : teachingstaffregistration.e_blood_grp,
        'staff_dob'              : this.pipe.transform(teachingstaffregistration.staff_dob, 'yyyy-MM-dd'),
        'social_category'        : teachingstaffregistration.social_category,
        'e_prnts_nme'        	   : teachingstaffregistration.e_prnts_nme,
        'teacher_mother_name'    : teachingstaffregistration.teacher_mother_name,
        'teacher_spouse_name'    : teachingstaffregistration.teacher_spouse_name,
        'disability_type'        : teachingstaffregistration.disability_type,
        'types_disability'       : teachingstaffregistration.types_disability,
        'appointed_subject'      : teachingstaffregistration.appointed_subject,
        'teacher_type'           : teachingstaffregistration.teacher_type,
        'staff_join'             : this.pipe.transform(teachingstaffregistration.staff_service_join, 'yyyy-MM-dd'),
        'staff_pjoin'            : this.pipe.transform(teachingstaffregistration.staff_pjoin, 'yyyy-MM-dd'),
        'staff_psjoin'           : this.pipe.transform(teachingstaffregistration.staff_psjoin, 'yyyy-MM-dd'),
        'cps_gps_details'        : teachingstaffregistration.cps_gps_details,
        'suffix'                 : teachingstaffregistration.suffix,
        'cps_gps'                : teachingstaffregistration.cps_gps,
        'recruit_type'       	   : teachingstaffregistration.recruit_type,
        'recruit_rank'         	 : teachingstaffregistration.recruit_rank,
        'recruit_year'         	 : teachingstaffregistration.recruit_year,
        'appointment_nature'     : this.appointment_nature,
        'posting_nature'         : teachingstaffregistration.posting_nature,
        'mbl_nmbr'               : teachingstaffregistration.mbl_nmbr,
        'email_id'               : teachingstaffregistration.email_id,
        'e_prsnt_doorno'         : teachingstaffregistration.e_prsnt_doorno,
        'e_prsnt_place'       	 : teachingstaffregistration.e_prsnt_street,
        'e_prsnt_street'     	   : teachingstaffregistration.e_prsnt_place,
        'e_prsnt_distrct'        : teachingstaffregistration.e_prsnt_distrct,
        'e_prsnt_pincode'    	   : teachingstaffregistration.e_prsnt_pincode,
        'academic'               : teachingstaffregistration.academic,
        'e_ug'                	 : teachingstaffregistration.e_ug,
        'e_pg'                	 : teachingstaffregistration.e_pg,
        'professional'           : teachingstaffregistration.professional,
        'science_upto'           : teachingstaffregistration.science_upto,
        'math_upto'           	 : teachingstaffregistration.math_upto,
        'english_upto'           : teachingstaffregistration.english_upto,
        'soc_study_upto'         : teachingstaffregistration.soc_study_upto,
        'lang_study_upto'        : teachingstaffregistration.lang_study_upto,
        'subject1'               : teachingstaffregistration.subject1,
        'subject2'               : teachingstaffregistration.subject2,
        'subject3'               : teachingstaffregistration.subject3,
        'subject4'               : teachingstaffregistration.subject4,
        'subject5'               : teachingstaffregistration.subject5,
        'subject6'               : teachingstaffregistration.subject6,
        'class_taught'           : teachingstaffregistration.class_taught,
        'trng_needed'   		     : teachingstaffregistration.trng_needed,
        'trng_received'   		   : teachingstaffregistration.trng_received,
        'trained_comp'   		     : teachingstaffregistration.trained_comp,	
        'trained_cwsn'   		     : teachingstaffregistration.trained_cwsn,
        'nontch_days'   		     : teachingstaffregistration.nontch_days,
        'archive'                : '1',
        'school_key_id'          : this.sesnId
      };
      let secondpartdetails: any = {
        'teacher_id' 	 : teachingstaffregistration.teacher_code,
        'teacher_uid'  : teachingstaffregistration.u_id,
        'school_key_id': this.sesnId,
        'sslc_dop'	   : this.pipe.transform(teachingstaffregistration.tenth_passed, 'yyyy-MM-dd'),
        'higersec_dop' : this.pipe.transform(teachingstaffregistration.twelth_passed, 'yyyy-MM-dd'),
        'doj_block'		 : teachingstaffregistration.joining_present_block,
        'relinguish'	 : teachingstaffregistration.relinguish,		
        'relinguish_date': teachingstaffregistration.date_relinguish,
        'prob_id'		   : teachingstaffregistration.probation_declaration,		
        'prob_date'		 : this.pipe.transform(teachingstaffregistration.probation_date, 'yyyy-MM-dd'),
        'head_account' :teachingstaffregistration.head_account,
        'ifsc_code'		 : teachingstaffregistration.ifsc_code,
        'branch_id'		 : teachingstaffregistration.branch_id,
        'bank_acc'		 : teachingstaffregistration.bank_acc,
        'pan_no'		   : teachingstaffregistration.pan_no,
        'doj_dept'     : teachingstaffregistration.doj_dept != '' ? this.pipe.transform(teachingstaffregistration.doj_dept, 'yyyy-MM-dd') : null
      }
      var regularisationpartdetails: any = [];
      let currentDateTime: string = this.pipe.transform(new Date(), 'yyyy-MM-dd HH:mm')

      if (teachingstaffregistration.regularisation.length > 0 && teachingstaffregistration.category == '1') {
        teachingstaffregistration.regularisation.forEach((element, itemIndex) => {
          let obj : any = {
            'teacher_id' 	  : teachingstaffregistration.teacher_code,
            'teacher_uid'   : teachingstaffregistration.u_id,
            'school_key_id' : this.sesnId,
            'appoint_nature': element.appoint_nature,
            'type_date' 	  : element.type_date,
            'dates'			    : element.dates,
            'created_at'	  : currentDateTime,
            'updated_date'	: currentDateTime      
          }
          regularisationpartdetails.push(obj);
        });
      }

      // console.log(regularisationpartdetails);
     
      if(this.gotosave){
          this.service.saveStaffDetails({'firstpart':firstpartdetails,'secondpart':secondpartdetails,'regulationpart':regularisationpartdetails}, true).subscribe(
            dataresult => {
              if (dataresult.dataStatus){  
                this.alertService.success(dataresult.message); 
                this.onClose.emit(this._display);
              }
              else this.alertService.error(dataresult.message);
            },
            error => {
              this.alertService.error(error);
            }
          );
      }
      else if(!this.gotosave){
        // console.log('in else if condition') ;
        this.service.updateStaffDetails({'firstpart':firstpartdetails,'secondpart':secondpartdetails,'regulationpart':regularisationpartdetails,'teacher_code':teachingstaffregistration.teacher_code}, true).subscribe(
          dataresult => {
            if (dataresult.dataStatus){  
              this.alertService.success(dataresult.message); 
              this.onClose.emit(this._display);
            }
            else this.alertService.error(dataresult.message);
          },
          error => {
            this.alertService.error(error);
          }
        );
      }
      else{
        // console.log('in else condition') ;
        this.alertService.success('recheck again or refresh the screen');
      }
    }
    else{
      this.validateAllFormFields(this.teachingstaffregistration);
      this.alertService.warning('Please Fill All Mandatory Fields.!');
      return true;
    }
    
  }

  /** ⇒ update staff's aadhar number  */         
  stfcheckaadhar(e){
    this.service.stfcheckaadhar(e).subscribe((res) => {
      if(res.dataStatus ){
        if(res.result.length>0){
          this.alertService.error("Given aadhar-no is already mapped to "+ res.result[0]['teacher_name'] +" ( "+res.result[0]['teacher_code']+" )"+"");
          this.teachingstaffregistration.controls['aadhar_no'].setValue(null);
          this.inValidAadhar = true;  }else this.inValidAadhar = false;
      } else this.inValidAadhar = false;
    });
  }

  /** ⇒ update staff's bank acc number  */         
  stfcheckbankacc(e){
    this.service.stfcheckbankacc(e).subscribe((res) => {
      if(!res.dataStatus){
          this.alertService.error(res.message);
          this.teachingstaffregistration.controls['bank_acc'].setValue(null);
          this.inValidAccno = false;  
      } else this.inValidAccno = true;
    });
  }

  /** ⇒ Saving profile pic  */         
  _saveProfilePic(data){
    this.service.saveAWSS3Image(data).subscribe((res) => {
      if (res.dataStatus) {
        debugger;
        this.alertService.info(res.message);
      }
      else{
        this.alertService.error(res.message);
      }
    },err=>{ this.alertService.error(err);}); 
  }

  /** ⇒ get profile pic  */         
  _getProfilePic(pic){
  if(pic !== null ){
    let path = 'Teachers/photo_all'+'/'+pic+'.jpgx';
    this.service.getAWSS3Image(path,true).subscribe((res) => {
      if (res.dataStatus) {
        debugger;
        this.profileurl = res.result;
        // console.log(this.profileurl);
      }
    });
  }
  else{
    this.profileurl= './assets/media/logos/Placeholder.jpg';
  }
  }

  /** ⇒ to set min max date  */         
  _changeDate(val,flag){  
    switch(flag){
      case 1 : 
        let stf_service_started_on = this.teachingstaffregistration.get('staff_service_join').value;
        if(stf_service_started_on > val){
          // console.log('stf_service_started_on',stf_service_started_on,'greater than ',val);
          // this.teachingstaffregistration.controls['staff_service_join'].setValue(null);
        }

        let curryear = +this.pipe.transform(new Date(),'yyyy');
        let dobyear = +this.pipe.transform(val,'yyyy');
        let x = 0;

        for(let i=dobyear;i<=curryear;i++){
        this.yeararr[x] = dobyear;
        x++;dobyear++;
        }

      break;
      case 2 : 
        let stf_posting_started_on = this.teachingstaffregistration.get('staff_pjoin').value;
        if(stf_posting_started_on > val){
          this.teachingstaffregistration.controls['staff_pjoin'].setValue(null);
        }
        let stf_posting_started_on_present_sch = this.teachingstaffregistration.get('staff_psjoin').value;
        if(stf_posting_started_on_present_sch > val){
          this.teachingstaffregistration.controls['staff_psjoin'].setValue(null);
        }
        let stf_posting_started_on_present_blk = this.teachingstaffregistration.get('joining_present_block').value;
        if(stf_posting_started_on_present_blk > val){
          this.teachingstaffregistration.controls['joining_present_block'].setValue(null);
        }

        let probation_date = this.teachingstaffregistration.get('probation_date').value;
        if(probation_date > val){
          this.teachingstaffregistration.controls['probation_date'].setValue(null);
        }

        let relinguish = this.teachingstaffregistration.get('relinguish').value;
        let date_relinguish = this.teachingstaffregistration.get('date_relinguish').value;
        
        if(relinguish == "1" && date_relinguish > val){
          this.teachingstaffregistration.controls['date_relinguish'].setValue(null);
        }
        
        
      break;
      case 1 : 
      let twelth_passed = this.teachingstaffregistration.get('twelth_passed').value;
      if(twelth_passed > val){
        this.teachingstaffregistration.controls['twelth_passed'].setValue(null);
      }
    break;
      
      
    }
  }

  filteredsubjectlist(arr){
    if(arr.length > 0){
              //filtering id only
              let originalIdList = this.subjects.filter(val => val.id).map(mapVal => mapVal.id);
              
              let filteredIdList = originalIdList.filter(function(x) { 
                return arr.indexOf(x) < 0;
              });

              let final = filteredIdList.map(x => {
                let inx = originalIdList.indexOf(x);
                return this.subjects[inx];
              });

              return final;
              
    }
    else{
      return this.subjects;
    }
  }

  
  _subjectvalidation(option){
    let s1temparr = [];let s2temparr = [];let s3temparr = [];
    let s4temparr = [];let s5temparr = [];let s6temparr = [];
  
    let s1val = this.teachingstaffregistration.get('subject1').value;
    let s2val = this.teachingstaffregistration.get('subject2').value;
    let s3val = this.teachingstaffregistration.get('subject3').value;
    let s4val = this.teachingstaffregistration.get('subject4').value;
    let s5val = this.teachingstaffregistration.get('subject5').value;
    let s6val = this.teachingstaffregistration.get('subject6').value;
 
    if(s1val!=null){ s2temparr.push(s1val); s3temparr.push(s1val); s4temparr.push(s1val); s5temparr.push(s1val); s6temparr.push(s1val); }
    if(s2val!=null){ s3temparr.push(s2val); s4temparr.push(s2val); s5temparr.push(s2val); s6temparr.push(s2val); s1temparr.push(s2val); }
    if(s3val!=null){ s4temparr.push(s3val); s5temparr.push(s3val); s6temparr.push(s3val); s1temparr.push(s3val); s2temparr.push(s3val); }
    if(s4val!=null){ s5temparr.push(s4val); s6temparr.push(s4val); s1temparr.push(s4val); s2temparr.push(s4val); s3temparr.push(s4val); }
    if(s5val!=null){ s6temparr.push(s5val); s1temparr.push(s5val); s2temparr.push(s5val); s3temparr.push(s5val); s4temparr.push(s5val); }
    if(s6val!=null){ s1temparr.push(s6val); s2temparr.push(s6val); s3temparr.push(s6val); s4temparr.push(s6val); s5temparr.push(s6val); }
 
    this.firstsubject = this.filteredsubjectlist(s1temparr);
    this.secondsubject = this.filteredsubjectlist(s2temparr);
    this.thridsubject = this.filteredsubjectlist(s3temparr);
    this.forthsubject = this.filteredsubjectlist(s4temparr);
    this.fifthsubject = this.filteredsubjectlist(s5temparr);
    this.sixthsubject = this.filteredsubjectlist(s6temparr);
    
   
  }
  
  /** ⇒  number only validation **/
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  /** ⇒  validate all form group and form array fields **/
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
}
