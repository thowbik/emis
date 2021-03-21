import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { schoolsService } from '../schools.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css'],
  providers: [MessageService]
})
export class SchoolDetailsComponent implements OnInit {
  SchoolMedium: any[] = [];
  roadsConnectedThrough: any[] = [];
  schoolId: any;
  schoolDetailForm: FormGroup;
  submitted: boolean;
  schoolDetailsData: any;
  schoolTypeId: any;
  mediumEntryInvalid: boolean;
  languageEntryInvalid: boolean;
  vocationEntryInvalid: boolean;


  communityTypeList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Muslim', value: '1' },
    { label: 'Sikh', value: '2' },
    { label: 'Jain', value: '3' },
    { label: 'Christian', value: '4' },
    { label: 'Parsi', value: '5' },
    { label: 'Buddhist', value: '6' },
    { label: 'Any Other', value: '7' },
    { label: 'Linguistic Minority', value: '8' }];

  schoolMediumList: Array<{ 'label': any, 'value': any }> = [
    // { label: 'Assamese', value: '1' },
    // { label: 'Bengali', value: '2' },
    // { label: 'Gujarati', value: '3' },
    { label: 'Hindi', value: '4' },
    { label: 'Kannada', value: '5' },
    // { label: 'Kashmiri', value: '6' },
    // { label: 'Konkani', value: '7' },
    { label: 'Malayalam', value: '8' },
    // { label: 'Manipuri', value: '9' },
    // { label: 'Marathi', value: '10' },
    // { label: 'Nepali', value: '11' },
    // { label: 'Odia', value: '12' },
    // { label: 'Punjabi', value: '13' },
    // { label: 'Sanskrit', value: '14' },
    { label: 'Sindhi', value: '15' },
    { label: 'Tamil', value: '16' },
    { label: 'Telugu', value: '17' },
    { label: 'Urdu', value: '18' },
    { label: 'English', value: '19' },
    // { label: 'Bodo', value: '20' },
    // { label: 'Dogri', value: '22' },
    // { label: 'Khasi', value: '23' },
    // { label: 'Garo', value: '24' },
    // { label: 'Mizo', value: '25' },
    // { label: 'Bhutia', value: '26' },
    // { label: 'Lepcha', value: '27' },
    // { label: 'Limboo', value: '28' },
    // { label: 'French', value: '29' },
    // { label: 'Santhali', value: '39' },
    // { label: 'Maithali', value: '51' },
    // { label: 'Other languages', value: '99' }
  ];


  laguageList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Assamese', value: '1' },
    { label: 'Bengali', value: '2' },
    { label: 'Gujarati', value: '3' },
    { label: 'Hindi', value: '4' },
    { label: 'Kannada', value: '5' },
    { label: 'Kashmiri', value: '6' },
    { label: 'Konkani', value: '7' },
    { label: 'Malayalam', value: '8' },
    { label: 'Manipuri', value: '9' },
    { label: 'Marathi', value: '10' },
    { label: 'Nepali', value: '11' },
    { label: 'Odia', value: '12' },
    { label: 'Panjabi', value: '13' },
    { label: 'Sanskrit', value: '14' },
    { label: 'Sindhi', value: '15' },
    { label: 'Tamil', value: '16' },
    { label: 'Telugu', value: '17' },
    { label: 'Urdu', value: '18' },
    { label: 'English', value: '19' },
    { label: 'Bodo', value: '20' },
    { label: 'Dogri', value: '22' },
    { label: 'Khasi', value: '23' },
    { label: 'Garo', value: '24' },
    { label: 'Mizo', value: '25' },
    { label: 'Bhutia', value: '26' },
    { label: 'Lepcha', value: '27' },
    { label: 'Limboo', value: '28' },
    { label: 'French', value: '29' },
    { label: 'Angami', value: '41' },
    { label: 'Ao', value: '42' },
    { label: 'Arabic', value: '43' },
    { label: 'Bhoti', value: '44' },
    { label: 'Bodhi', value: '45' },
    { label: 'German', value: '46' },
    { label: 'Kakbarak', value: '47' },
    { label: 'Konyak', value: '48' },
    { label: 'Laddakhi', value: '49' },
    { label: 'Lotha', value: '50' },
    { label: 'Maithili', value: '51' },
    { label: 'Nicobaree', value: '52' },
    { label: 'Odia(lower)', value: '53' },
    { label: 'Persian', value: '54' },
    { label: 'Portuguese', value: '55' },
    { label: 'Rajasthani', value: '56' },
    { label: 'Russian', value: '57' },
    { label: 'Sema', value: '58' },
    { label: 'Spanish', value: '59' },
    { label: 'Tibetan', value: '60' },
    { label: 'Zeliang', value: '61' },
    { label: 'Other Languages', value: '99' }];

  boardSecondarySectionTypeList: Array<{ 'label': any, 'value': any }> = [
    { label: 'CBSE', value: '1' },
    { label: 'State Board', value: '2' },
    { label: 'ICSE', value: '3' },
    { label: 'International Board', value: '4' },
    { label: 'Others', value: '5' },
    { label: 'Both CBSE & State Board', value: '6' },
    { label: 'Not Applicable', value: '9' }];

  preVocational: Array<{ 'label': any, 'value': any }> = [
    { label: 'Electronics', value: '1' },
    { label: 'Automobile', value: '2' },
    { label: 'Agriculture', value: '3' },
    { label: 'Apparel', value: '4' },
    { label: 'Beauty and Wellness', value: '5' },
    { label: 'Multi Skill Foundation Course', value: '6' }
  ];


  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private SchoolsService: schoolsService,
    private routers: Router,
    private userSessionService: UserSessionService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private el: ElementRef) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
    console.log(this.schoolTypeId);
  }

  ngOnInit() {
    debugger
    this.initialValidator();
    this.getSchoolDetailsData();
    this.getMediumData();
    //  this.checkValidator();
  
  }


  initialValidator() {
    this.schoolDetailForm = this.fb.group({

      'minority_sch': new FormControl('', Validators.required),
      'minority_grp': new FormControl('', null),
      'minority_yr': new FormControl('', null),
      'mtongue_pri': new FormControl('', Validators.required),
      'medium_instrut': new FormControl('', null),
      // 'other_medium': new FormControl('', null),
      'lang_taught': new FormControl('', null),
      'prevoc_course': new FormControl('', Validators.required),
      'voc_trade': new FormControl('', null),

      'stu_councel': new FormControl('', Validators.required),
      'board_sec': new FormControl('', Validators.required),
      'board_sec_no': new FormControl('', null),
      'board_sec_oth': new FormControl('', null),
      'board_hsec': new FormControl('', Validators.required),
      'board_hsec_no': new FormControl('', null),
      'board_hsec_oth': new FormControl('', null),
      'distance_pri': new FormControl('', Validators.required),
      'distance_upr': new FormControl('', Validators.required),
      'distance_sec': new FormControl('', Validators.required),
      'distance_hsec': new FormControl('', Validators.required),
      'weather_roads': new FormControl('', Validators.required),
      // 'road_connect': new FormControl('', null),
      'distance_road': new FormControl('', null),


      'pre_pri_sec': new FormControl('', Validators.required),
      'class1_sec': new FormControl('', Validators.required),
      'class2_sec': new FormControl('', Validators.required),
      'class3_sec': new FormControl('', Validators.required),
      'class4_sec': new FormControl('', Validators.required),
      'class5_sec': new FormControl('', Validators.required),
      'class6_sec': new FormControl('', Validators.required),
      'class7_sec': new FormControl('', Validators.required),
      'class8_sec': new FormControl('', Validators.required),
      'class9_sec': new FormControl('', Validators.required),
      'class10_sec': new FormControl('', Validators.required),
      'class11_sec': new FormControl('', Validators.required),
      'class12_sec': new FormControl('', Validators.required),

      schoolnew_mediumentry_details: this.fb.array([]),
      schoolnew_langtaught_entry_details: this.fb.array([]),
      voc_trade_details: this.fb.array([]),


      'enrol_lkg_boys': new FormControl('', null),
      'enrol_ukg_boys': new FormControl('', null),
      'enrol_lkg_girls': new FormControl('', null),
      'enrol_ukg_girls': new FormControl('', null),
      'grd1_boys_below_5': new FormControl('', null),
      'grd1_boys_age_5': new FormControl('', null),
      'grd1_boys_age_6': new FormControl('', null),
      'grd1_boys_age_7': new FormControl('', null),
      'grd1_boys_above_7': new FormControl('', null),
      'grd1_tot_1_boys': new FormControl('', null),
      'grd1_samescl_b': new FormControl('', Validators.required),
      'grd1_othscl_b': new FormControl('', Validators.required),
      'grd1_angan_b': new FormControl('', Validators.required),

      'grd1_girls_below_5': new FormControl('', null),
      'grd1_girls_age_5': new FormControl('', null),
      'grd1_girls_age_6': new FormControl('', null),
      'grd1_girls_age_7': new FormControl('', null),
      'grd1_girls_above_7': new FormControl('', null),
      'grd1_tot_1_girls': new FormControl('', null),
      'grd1_samescl_g': new FormControl('', Validators.required),
      'grd1_othscl_g': new FormControl('', Validators.required),
      'grd1_angan_g': new FormControl('', Validators.required),



    });

  }
  checkValidator() {
    if (this.schoolTypeId == 2 && this.schoolTypeId == 3 && this.schoolTypeId == 4) {

      this.schoolDetailForm.controls['board_sec_no'].enable();
      this.schoolDetailForm.controls['board_hsec_no'].enable();


      this.schoolDetailForm.controls['board_sec_no'].setValidators(null);
      this.schoolDetailForm.controls['board_hsec_no'].setValidators(null);

    }
    // else{
    //   this.schoolDetailForm.controls['board_sec_no'].disable();
    //   this.schoolDetailForm.controls['board_hsec_no'].disable();


    //   this.schoolDetailForm.controls['board_sec_no'].setValidators(Validators.required);
    //   this.schoolDetailForm.controls['board_hsec_no'].setValidators(Validators.required);

    // } 

    this.schoolDetailForm.controls['board_sec_no'].updateValueAndValidity();
    this.schoolDetailForm.controls['board_hsec_no'].updateValueAndValidity();

  }


  minority(value) {
    debugger;
    if (value == 1) {
      this.schoolDetailForm.controls['minority_grp'].setValidators(Validators.required);
      this.schoolDetailForm.controls['minority_yr'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['minority_grp'].setValue("");
      this.schoolDetailForm.controls['minority_grp'].setValidators(null);
      this.schoolDetailForm.controls['minority_yr'].setValue("");
      this.schoolDetailForm.controls['minority_yr'].setValidators(null);

    }
    this.schoolDetailForm.controls['minority_grp'].updateValueAndValidity();
    this.schoolDetailForm.controls['minority_yr'].updateValueAndValidity();
  }

  onRoadReset(value) {
    if (value == 2) {
      this.schoolDetailForm.controls['distance_road'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['distance_road'].setValue("");
      this.schoolDetailForm.controls['distance_road'].setValidators(null);
    }
    this.schoolDetailForm.controls['distance_road'].updateValueAndValidity();
  }


  getSchoolDetailsData() {
    debugger;
    let schoolId = this.userSessionService.schoolId();
    this.SchoolsService.getschoolDetails(schoolId, true).subscribe((res) => {
      this.schoolDetailsData = res.result.schoolinfo;
      this.schoolDetailForm.patchValue(this.schoolDetailsData);
      this.schoolDetailForm.controls['distance_pri'].setValue((+this.schoolDetailForm.value.distance_pri).toFixed(1));
      this.schoolDetailForm.controls['distance_sec'].setValue((+this.schoolDetailForm.value.distance_sec).toFixed(1));
      this.schoolDetailForm.controls['distance_upr'].setValue((+this.schoolDetailForm.value.distance_upr).toFixed(1));
      this.schoolDetailForm.controls['distance_hsec'].setValue((+this.schoolDetailForm.value.distance_hsec).toFixed(1));
      // this.form.controls['area_cent_1'].setValue((this.form.value.play_area_sqft / 43560).toFixed(2));
       //this.getMediumInstruction(res.result.schoolinfo.medium);
      //this.getLanguageList(res.result.schoolinfo.langetr);
      this.getVocationList(res.result.schoolinfo.trade);
      if (this.schoolDetailForm.value.minority_sch) {
        this.minority(this.schoolDetailForm.value.minority_sch)
      }
    })
  }

  getMediumData() {
    debugger
    let schoolId = this.userSessionService.schoolId();
    this.SchoolsService.getMediumDetails(schoolId, true).subscribe((res) => {
      this.getMediumInstruction(res.data.medium);
      this.getLanguageList(res.data.lang);
    });
    
  }

  onVocationalReset() {
    debugger;
    const tradingArray = this.schoolDetailForm.controls.voc_trade_details as FormArray;
    while (tradingArray.length !== 0) {
      tradingArray.removeAt(0)
    }
  }

  onCancel() {
    this.getSchoolDetailsData();
  }

  onSave() {
    debugger;
    this.submitted = true;
    var data = {
      "schoolnew_academic_detail": {
        "school_key_id": this.schoolId,
        'minority_sch': this.schoolDetailForm.value.minority_sch,
        'minority_grp': this.schoolDetailForm.value.minority_grp,
        'mtongue_pri': this.schoolDetailForm.value.mtongue_pri,
        'prevoc_course': this.schoolDetailForm.value.prevoc_course,
        'board_sec': this.schoolDetailForm.value.board_sec,
        'board_sec_no': this.schoolDetailForm.value.board_sec_no,
        'board_sec_oth': this.schoolDetailForm.value.board_sec_oth,
        'board_hsec': this.schoolDetailForm.value.board_hsec,
        'board_hsec_no': this.schoolDetailForm.value.board_hsec_no,
        'board_hsec_oth': this.schoolDetailForm.value.board_hsec_oth,
        'distance_pri': this.schoolDetailForm.value.distance_pri,
        'distance_upr': this.schoolDetailForm.value.distance_upr,
        'distance_sec': this.schoolDetailForm.value.distance_sec,
        'distance_hsec': this.schoolDetailForm.value.distance_hsec,
        'minority_yr': this.schoolDetailForm.value.minority_yr,
      },
      "schoolnew_sectionbyclass": {
        "school_key_id": this.schoolId,
        'pre_pri_sec': this.schoolDetailForm.value.pre_pri_sec,
        'class1_sec': this.schoolDetailForm.value.class1_sec,
        'class2_sec': this.schoolDetailForm.value.class2_sec,
        'class3_sec': this.schoolDetailForm.value.class3_sec,
        'class4_sec': this.schoolDetailForm.value.class4_sec,
        'class5_sec': this.schoolDetailForm.value.class5_sec,
        'class6_sec': this.schoolDetailForm.value.class6_sec,
        'class7_sec': this.schoolDetailForm.value.class7_sec,
        'class8_sec': this.schoolDetailForm.value.class8_sec,
        'class9_sec': this.schoolDetailForm.value.class9_sec,
        'class10_sec': this.schoolDetailForm.value.class10_sec,
        'class11_sec': this.schoolDetailForm.value.class11_sec,
        'class12_sec': this.schoolDetailForm.value.class12_sec,
      },
      "schoolnew_mediumentry": this.schoolDetailForm.value.schoolnew_mediumentry_details,
      "schoolnew_langtaught_entry": this.schoolDetailForm.value.schoolnew_langtaught_entry_details,
      "schoolnew_voctrade_entry": this.schoolDetailForm.value.voc_trade_details,
      "schoolnew_training_detail": {
        "school_key_id": this.schoolId,
        'stu_councel': this.schoolDetailForm.value.stu_councel,
        'grd1_samescl_b': this.schoolDetailForm.value.grd1_samescl_b,
        'grd1_othscl_b': this.schoolDetailForm.value.grd1_othscl_b,
        'grd1_angan_b': this.schoolDetailForm.value.grd1_angan_b,
        'grd1_samescl_g': this.schoolDetailForm.value.grd1_samescl_g,
        'grd1_othscl_g': this.schoolDetailForm.value.grd1_othscl_g,
        'grd1_angan_g': this.schoolDetailForm.value.grd1_angan_g
      },
      "students_child_detail": {
        'enrol_lkg_boys': this.schoolDetailForm.value.enrol_lkg_boys,
        'enrol_ukg_boys': this.schoolDetailForm.value.enrol_ukg_boys,
        'enrol_lkg_girls': this.schoolDetailForm.value.enrol_lkg_girls,
        'enrol_ukg_girls': this.schoolDetailForm.value.enrol_ukg_girls,
        'grd1_boys_below_5': this.schoolDetailForm.value.grd1_boys_below_5,
        'grd1_boys_age_5': this.schoolDetailForm.value.grd1_boys_age_5,
        'grd1_boys_age_6': this.schoolDetailForm.value.grd1_boys_age_6,
        'grd1_boys_age_7': this.schoolDetailForm.value.grd1_boys_age_7,
        'grd1_boys_above_7': this.schoolDetailForm.value.grd1_boys_above_7,
        'grd1_tot_1_boys': this.schoolDetailForm.value.grd1_tot_1_boys,
        'grd1_girls_below_5': this.schoolDetailForm.value.grd1_girls_below_5,
        'grd1_girls_age_5': this.schoolDetailForm.value.grd1_girls_age_5,
        'grd1_girls_age_6': this.schoolDetailForm.value.grd1_girls_age_7,
        'grd1_girls_age_7': this.schoolDetailForm.value.grd1_girls_age_7,
        'grd1_girls_above_7': this.schoolDetailForm.value.grd1_girls_above_7,
        'grd1_tot_1_girls': this.schoolDetailForm.value.grd1_tot_1_girls,
      },
      "schoolnew_infra_detail": {
        "school_key_id": this.schoolId,
        'weather_roads': this.schoolDetailForm.value.weather_roads,
        'road_connect': this.schoolDetailForm.value.road_connect,
        'distance_road': this.schoolDetailForm.value.distance_road,
      },
      "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_2": "1" }
    };


    if(this.schoolDetailForm.value.grd1_tot_1_boys == '' || this.schoolDetailForm.value.grd1_tot_1_boys == null)
    {
      this.schoolDetailForm.controls['grd1_tot_1_boys'].setValue("0");
    }
    if(this.schoolDetailForm.value.grd1_tot_1_girls == '' || this.schoolDetailForm.value.grd1_tot_1_girls == null)
    {
      this.schoolDetailForm.controls['grd1_tot_1_girls'].setValue("0");
    }

  
  
    const total = +this.schoolDetailForm.value.grd1_samescl_g + +this.schoolDetailForm.value.grd1_othscl_g + +this.schoolDetailForm.value.grd1_angan_g;
    const total1 = +this.schoolDetailForm.value.grd1_samescl_b + +this.schoolDetailForm.value.grd1_othscl_b + +this.schoolDetailForm.value.grd1_angan_b;
    if ((+total === +this.schoolDetailForm.value.grd1_tot_1_girls) && (+total1 === +this.schoolDetailForm.value.grd1_tot_1_boys)) {
      if (this.schoolDetailForm.valid) {
        this.SchoolsService.saveSchoolDetails(data).subscribe(res => {
          if (res.result == true) {
            this.alertService.success("Records Updated Successfully");
            this.getSchoolDetailsData();
          }
          else {
            this.alertService.error(res.message);
          }
        });
      }
      else {
        for (const key of Object.keys(this.schoolDetailForm.controls)) {
          if (this.schoolDetailForm.controls[key].invalid) {
             const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('invalid keys',key);
            invalidControl.focus();
             break;
          }
        }
        this.alertService.error("Please fill all the required fields");
      }
    } else {
      this.alertService.error("Total children admitted in grade 1 not equal to number of children with pre-school experience");
    }
  }


  // onFinalSubmit() {
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
  //     accept: () => {
  //       this.submitted = true;
  //       var data = {
  //         "schoolnew_academic_detail": {
  //           "school_key_id": this.schoolId,
  //           'minority_sch': this.schoolDetailForm.value.minority_sch,
  //           'minority_grp': this.schoolDetailForm.value.minority_grp,
  //           'mtongue_pri': this.schoolDetailForm.value.mtongue_pri,
  //           'prevoc_course': this.schoolDetailForm.value.prevoc_course,
  //           'board_sec': this.schoolDetailForm.value.board_sec,
  //           'board_sec_no': this.schoolDetailForm.value.board_sec_no,
  //           'board_sec_oth': this.schoolDetailForm.value.board_sec_oth,
  //           'board_hsec': this.schoolDetailForm.value.board_hsec,
  //           'board_hsec_no': this.schoolDetailForm.value.board_hsec_no,
  //           'board_hsec_oth': this.schoolDetailForm.value.board_hsec_oth,
  //           'distance_pri': this.schoolDetailForm.value.distance_pri,
  //           'distance_upr': this.schoolDetailForm.value.distance_upr,
  //           'distance_sec': this.schoolDetailForm.value.distance_sec,
  //           'distance_hsec': this.schoolDetailForm.value.distance_hsec,
  //           'minority_yr': this.schoolDetailForm.value.minority_yr,
  //         },
  //         "schoolnew_sectionbyclass": {
  //           "school_key_id": this.schoolId,
  //           'pre_pri_sec': this.schoolDetailForm.value.pre_pri_sec,
  //           'class1_sec': this.schoolDetailForm.value.class1_sec,
  //           'class2_sec': this.schoolDetailForm.value.class2_sec,
  //           'class3_sec': this.schoolDetailForm.value.class3_sec,
  //           'class4_sec': this.schoolDetailForm.value.class4_sec,
  //           'class5_sec': this.schoolDetailForm.value.class5_sec,
  //           'class6_sec': this.schoolDetailForm.value.class6_sec,
  //           'class7_sec': this.schoolDetailForm.value.class7_sec,
  //           'class8_sec': this.schoolDetailForm.value.class8_sec,
  //           'class9_sec': this.schoolDetailForm.value.class9_sec,
  //           'class10_sec': this.schoolDetailForm.value.class10_sec,
  //           'class11_sec': this.schoolDetailForm.value.class11_sec,
  //           'class12_sec': this.schoolDetailForm.value.class12_sec,
  //         },
  //         "schoolnew_mediumentry": this.schoolDetailForm.value.schoolnew_mediumentry_details,
  //         "schoolnew_langtaught_entry": this.schoolDetailForm.value.schoolnew_langtaught_entry_details,
  //         "schoolnew_voctrade_entry": this.schoolDetailForm.value.voc_trade_details,
  //         "schoolnew_training_detail": {
  //           "school_key_id": this.schoolId,
  //           'stu_councel': this.schoolDetailForm.value.stu_councel,
  //           'grd1_samescl_b': this.schoolDetailForm.value.grd1_samescl_b,
  //           'grd1_othscl_b': this.schoolDetailForm.value.grd1_othscl_b,
  //           'grd1_angan_b': this.schoolDetailForm.value.grd1_angan_b,
  //           'grd1_samescl_g': this.schoolDetailForm.value.grd1_samescl_g,
  //           'grd1_othscl_g': this.schoolDetailForm.value.grd1_othscl_g,
  //           'grd1_angan_g': this.schoolDetailForm.value.grd1_angan_g
  //         },
  //         "students_child_detail": {
  //           'enrol_lkg_boys': this.schoolDetailForm.value.enrol_lkg_boys,
  //           'enrol_ukg_boys': this.schoolDetailForm.value.enrol_ukg_boys,
  //           'enrol_lkg_girls': this.schoolDetailForm.value.enrol_lkg_girls,
  //           'enrol_ukg_girls': this.schoolDetailForm.value.enrol_ukg_girls,
  //           'grd1_boys_below_5': this.schoolDetailForm.value.grd1_boys_below_5,
  //           'grd1_boys_age_5': this.schoolDetailForm.value.grd1_boys_age_5,
  //           'grd1_boys_age_6': this.schoolDetailForm.value.grd1_boys_age_6,
  //           'grd1_boys_age_7': this.schoolDetailForm.value.grd1_boys_age_7,
  //           'grd1_boys_above_7': this.schoolDetailForm.value.grd1_boys_above_7,
  //           'grd1_tot_1_boys': this.schoolDetailForm.value.grd1_tot_1_boys,
  //           'grd1_girls_below_5': this.schoolDetailForm.value.grd1_girls_below_5,
  //           'grd1_girls_age_5': this.schoolDetailForm.value.grd1_girls_age_5,
  //           'grd1_girls_age_6': this.schoolDetailForm.value.grd1_girls_age_7,
  //           'grd1_girls_age_7': this.schoolDetailForm.value.grd1_girls_age_7,
  //           'grd1_girls_above_7': this.schoolDetailForm.value.grd1_girls_above_7,
  //           'grd1_tot_1_girls': this.schoolDetailForm.value.grd1_tot_1_girls,
  //         },
  //         "schoolnew_infra_detail": {
  //           "school_key_id": this.schoolId,
  //           'weather_roads': this.schoolDetailForm.value.weather_roads,
  //           'road_connect': this.schoolDetailForm.value.road_connect,
  //           'distance_road': this.schoolDetailForm.value.distance_road,
  //         },
  //         "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_2": "2" }
  //       };
    
    
    
  //       const total = +this.schoolDetailForm.value.grd1_samescl_g + +this.schoolDetailForm.value.grd1_othscl_g + +this.schoolDetailForm.value.grd1_angan_g;
  //       const total1 = +this.schoolDetailForm.value.grd1_samescl_b + +this.schoolDetailForm.value.grd1_othscl_b + +this.schoolDetailForm.value.grd1_angan_b;
    
  //       if ((total == this.schoolDetailForm.value.grd1_tot_1_girls) && (total1 == this.schoolDetailForm.value.grd1_tot_1_boys)) {
  //         if (this.schoolDetailForm.valid) {
  //           this.SchoolsService.saveSchoolDetails(data).subscribe(res => {
  //             if (res.result == true) {
  //               this.alertService.success("Records Updated Successfully");
  //               this.getSchoolDetailsData();
  //             }
  //             else {
  //               this.alertService.error(res.message);
  //             }
  //           });
  //         }
  //         else {
  //           this.alertService.error("Please fill all the required fields");
  //         }
  //       } else {
  //         this.alertService.error("Total children admitted in grade 1 not equal to number of children with pre-school experience");
  //       }
  //     }
  //   });
  // }





  getMediumInstruction(item) {
    debugger;
    const mediumentry = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
    const mediumDataValues = item;
    if (mediumDataValues.length > 0) {
      const mediumentry = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
      while (mediumentry.length !== 0) {
        mediumentry.removeAt(0)
      }
    }
    for (let i = 0; i < item.length; i++) {
      mediumentry.push(this.fb.group({
        school_key_id: this.schoolId,
        medium_instrut: item[i].id,
        //other_medium: item[i].other_medium,
      })
      )
    }
  }

  getLanguageList(items) {
    debugger;
    const langtaught_entry = this.schoolDetailForm.controls.schoolnew_langtaught_entry_details as FormArray;
    const langDataValues = items;
    if (langDataValues.length > 0) {
      const langtaught_entry = this.schoolDetailForm.controls.schoolnew_langtaught_entry_details as FormArray;
      while (langtaught_entry.length !== 0) {
        langtaught_entry.removeAt(0)
      }
    }
    for (let i = 0; i < items.length; i++) {
      langtaught_entry.push(this.fb.group({
        school_key_id: this.schoolId,
        lang_taught: items[i].id
      })
      )
    }
  }


  getVocationList(data) {
    debugger;
    const vocation_entry = this.schoolDetailForm.controls.voc_trade_details as FormArray;
    const vocationDataValues = data;
    if (vocationDataValues.length > 0) {
      const vocation_entry = this.schoolDetailForm.controls.voc_trade_details as FormArray;
      while (vocation_entry.length !== 0) {
        vocation_entry.removeAt(0)
      }
    }
    for (let i = 0; i < data.length; i++) {
      vocation_entry.push(this.fb.group({
        school_key_id: this.schoolId,
        voc_trade: data[i].voc_trade
      })
      )
    }
  }


  addMediumInstruction(): void {
    debugger
    const mediumadd = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
    if ((mediumadd.length < this.schoolMediumList.length) && (mediumadd.length < 4)) {
      if (this.schoolDetailForm.controls.schoolnew_mediumentry_details.valid) {
        mediumadd.push(this.createItem());
      }
      else {
        this.mediumEntryInvalid = true;
      }
    }
  }

  addLanguagesTaught(): void {
    const languageadd = this.schoolDetailForm.controls.schoolnew_langtaught_entry_details as FormArray;
    if ((languageadd.length < this.laguageList.length) && (languageadd.length < 4)) {
      if (this.schoolDetailForm.controls.schoolnew_langtaught_entry_details.valid) {
        languageadd.push(this.createLanguagesTaught());
      }
      else {
        this.languageEntryInvalid = true;
      }
    }
  }

  addPreVocational(): void {
    const vocationadd = this.schoolDetailForm.controls.voc_trade_details as FormArray;
    if ((vocationadd.length < this.preVocational.length) && (vocationadd.length < 4)) {
      if (this.schoolDetailForm.controls.voc_trade_details.valid) {
        vocationadd.push(this.createPreVocational());
      }
      else {
        this.vocationEntryInvalid = true;
      }
    }
  }

  removeMediumInstruction() {
    const mediumremove = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
    if (mediumremove.length > 0) {
      this.mediumEntryInvalid = false;
      mediumremove.removeAt(mediumremove.length - 1);
    }
  }

  removeLanguagesTaught() {
    const languageremove = this.schoolDetailForm.controls.schoolnew_langtaught_entry_details as FormArray;
    if (languageremove.length > 0) {
      this.languageEntryInvalid = false;
      languageremove.removeAt(languageremove.length - 1);
    }
  }


  removePreVocational() {
    const vocationremove = this.schoolDetailForm.controls.voc_trade_details as FormArray;
    if (vocationremove.length > 0) {
      this.vocationEntryInvalid = false;
      vocationremove.removeAt(vocationremove.length - 1);
    }

  }

  chooseMedium(event, index) {
    var selectedMediumType = event.value;
    (<FormArray>this.schoolDetailForm.controls['schoolnew_mediumentry_details']).at(index).patchValue({ medium_instrut: '' });
    debugger;
    const checkAvailable = this.schoolDetailForm.value.schoolnew_mediumentry_details.find(x => x.medium_instrut == selectedMediumType)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");
    }
    else {
      (<FormArray>this.schoolDetailForm.controls['schoolnew_mediumentry_details']).at(index).patchValue({ medium_instrut: selectedMediumType });
    }
    // if (selectedMediumType == 99) {
    //   this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['other_medium'].setValidators(Validators.required);
    // }
    // else {
    //   this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['other_medium'].setValue("");
    //   this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['other_medium'].setValidators(null);
    // }
    // this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['other_medium'].updateValueAndValidity();

  }

  chooseLanguage(event, index) {
    var selectedlLanguageType = event.value;
    (<FormArray>this.schoolDetailForm.controls['schoolnew_langtaught_entry_details']).at(index).patchValue({ lang_taught: '' });
    debugger;
    const checkAvailable = this.schoolDetailForm.value.schoolnew_langtaught_entry_details.find(x => x.lang_taught == selectedlLanguageType)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");
    }
    else {
      (<FormArray>this.schoolDetailForm.controls['schoolnew_langtaught_entry_details']).at(index).patchValue({ lang_taught: selectedlLanguageType });
    }
  }

  chooseVocation(event, index) {
    var selectedMediumType = event.value;
    (<FormArray>this.schoolDetailForm.controls['voc_trade_details']).at(index).patchValue({ voc_trade: '' });
    debugger;
    const checkAvailable = this.schoolDetailForm.value.voc_trade_details.find(x => x.voc_trade == selectedMediumType)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");
    }
    else {
      (<FormArray>this.schoolDetailForm.controls['voc_trade_details']).at(index).patchValue({ voc_trade: selectedMediumType });
    }
  }

  createItem() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      medium_instrut: new FormControl('', Validators.required),
     // other_medium: new FormControl('', null),
    });
  }

  createLanguagesTaught() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      lang_taught: new FormControl('', Validators.required),
    });
  }


  createPreVocational(): FormGroup {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      voc_trade: new FormControl('', Validators.required)
    });
  }

  chooseSecondarySection(e) {
    if (e.value == 5) {
      this.schoolDetailForm.controls['board_sec_oth'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['board_sec_oth'].setValue("");
      this.schoolDetailForm.controls['board_sec_oth'].setValidators(null);
    }
    this.schoolDetailForm.controls['board_sec_oth'].updateValueAndValidity();
  }

  chooseHigherSecondarySection(e) {
    if (e.value == 5) {
      this.schoolDetailForm.controls['board_hsec_oth'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['board_hsec_oth'].setValue("");
      this.schoolDetailForm.controls['board_hsec_oth'].setValidators(null);
    }
    this.schoolDetailForm.controls['board_hsec_oth'].updateValueAndValidity();
  }

}
