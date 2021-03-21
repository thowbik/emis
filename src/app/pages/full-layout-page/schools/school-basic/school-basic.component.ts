import { Component, OnInit, ElementRef } from '@angular/core';
import { schoolsService } from '../schools.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-school-basic',
  templateUrl: './school-basic.component.html',
  styleUrls: ['./school-basic.component.css']
})
export class SchoolBasicComponent implements OnInit {
  schoolId: any; schoolTypeId: number;
  form: FormGroup;
  submitted: boolean = false;
  isDisabled = true;
  emailpattern: any = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  urbanruralList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Urban', value: '2' },
    { label: 'Rural', value: '1' }];

  ClassList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Pre-KG', value: '15' },
    { label: 'UKG', value: '14' },
    { label: 'LKG', value: '13' },
    { value: '1', label: 'I' },
    { value: '2', label: 'II' },
    { value: '3', label: 'III' },
    { value: '4', label: 'IV' },
    { value: '5', label: 'V' },
    { value: '6', label: 'VI' },
    { value: '7', label: 'VII' },
    { value: '8', label: 'VIII' },
    { value: '9', label: 'IX' },
    { value: '10', label: 'X' },
    { value: '11', label: 'XI' },
    { value: '12', label: 'XII' },
    { value: '0', label: 'Not Applicable' }];

  managementSchoolcodeList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Department of Education', value: '1' },
    { label: 'Tribal Walfare Department', value: '2' },
    { label: 'Local Body', value: '3' },
    { label: 'Government Aided', value: '4' },
    { label: 'Private Unaided (Recognized)', value: '5' },
    { label: 'Other Govt. managed schools', value: '6' },
    { label: 'Unrecognized', value: '8' },
    { label: 'Social Welfare Department', value: '90' },
    { label: 'Ministry of Labour', value: '91' },
    { label: 'Kendriya Vidyalaya / Cemtral School', value: '92' },
    { label: 'Jawahar Navodaya Vidyalaya', value: '93' },
    { label: 'Sainik School', value: '94' },
    { label: 'Railway School', value: '95' },
    { label: 'Central Tibetan School', value: '96' },
    { label: 'Madarsa Recognized (by Wakf board / Madarsa Board)', value: '97' },
    { label: 'Madarsa Unrecognized', value: '98' },
  ];

  schoolCategoryList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Primary only (I-V)', value: '1' },
    { label: 'Middle School (I-VIII)', value: '2' },
    { label: 'Hr.Sec School (I-XII)', value: '3' },
    { label: 'Middle School (VI-VIII)', value: '4' },
    { label: 'Hr.Sec School (VI-XII)', value: '5' },
    { label: 'High Schools (I-X)', value: '6' },
    { label: 'High Schools (VI-X)', value: '7' },
    { label: 'High Schools (IX-X)', value: '8' },
    { label: 'Hr.Sec Schools(IX-XII)', value: '10' },
    { label: 'Hr.Sec Schools(XI-XII)', value: '11' },
    { label: 'Nursery & Primary (Pre-KG - V)', value: '12' },
    { label: 'Specials Schools', value: '13' },
    { label: 'Others', value: '14' },
    { label: 'Play School', value: '15' }];


  typeofResidentialSchoolList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Ashram (Govt.)', value: '1' },
    { label: 'Non-ashram (Govt.)', value: '2' },
    { label: 'Private', value: '3' },
    { label: 'Others', value: '4' },
    { label: 'KGBV', value: '6' },
    { label: 'Model School', value: '7' },
    { label: 'Eklavya Model Residential School', value: '8' }];

  public isanganwadi: any;
  public show = false;
  public isPrimary: boolean;
  public show2: boolean;
  public show3: boolean;
  public show4: boolean;
  public schoolBasicDetails: any[] = [];
  stdCodes: any[] = [];
  stdCode : any;
  stdList: any;
  corrstdList: any;
  anganchild: any;

  constructor(private SchoolsService: schoolsService,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private confirmationService: ConfirmationService,
    public fb: FormBuilder,
    private el: ElementRef) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
  }

  ngOnInit() {
    this.initialValidator();
    this.getStdCodes();
    this.getBasicInfo();
    this.checkValidator();
  }


  initialValidator() {
    this.form = this.fb.group({
      'udise_code': new FormControl('', null),
      'latitude': new FormControl('', null),
      'longitude': new FormControl('', null),
      'school_name': new FormControl('', null),
      'manage_name': new FormControl('', null),
      'management': new FormControl('', null),
      'department': new FormControl('', null),
      'sch_cate_id': new FormControl('', null),
      //  'sch_management_id': new FormControl('', null),
      'school_type': new FormControl('', null),
      'low_class': new FormControl('', null),
      'high_class': new FormControl('', null),

      'anganwadi': new FormControl('', null),
      'angan_wrks': new FormControl('', null),
      'angan_childs': new FormControl('', null),

      'anganwadi_schl': new FormControl('', null),
      'anganwadi_center': new FormControl('', null),
      'anganwadi_train': new FormControl('', null),


      'district_name': new FormControl('', null),
      'urbanrural': new FormControl('', null),
      'zone_type': new FormControl('', null),
      'village_munci': new FormControl('', null),
      'lb_vill_town_muni_name': new FormControl('', null),
      'cluster_name': new FormControl('', null),
      'panchayat_id': new FormControl('', null),
      'block_name': new FormControl('', null),
      'village_ward': new FormControl('', null),
      'edu_dist_name': new FormControl('', null),
      'assembly_name': new FormControl('', null),
      'parli_name': new FormControl('', null),
      'municipal_name': new FormControl('', null),
      'city_id': new FormControl('', null),
      'pincode': new FormControl('', null),
      'address': new FormControl('', Validators.required),


      'corr_name': new FormControl('', Validators.required),
      'office_std_code': new FormControl('', Validators.required),
      'office_landline': new FormControl('', Validators.required),
      'office_mobile': new FormControl('', Validators.required),
      'corr_std_code': new FormControl('', Validators.required),
      'corr_landlline': new FormControl('', Validators.required),
      'corr_mobile': new FormControl('', Validators.required),
      'sch_email': new FormControl('', [Validators.compose([Validators.required, Validators.pattern(this.emailpattern)])]),
      'website': new FormControl('', null),


      'yr_estd_schl': new FormControl('', null),
      'yr_recgn_first': new FormControl('', null),
      'yr_last_renwl': new FormControl('', null),
      'certifi_no': new FormControl('', null),
      'yr_recogn_schl': new FormControl('', null),
      'yr_rec_schl_elem': new FormControl('', null),
      'yr_rec_schl_sec': new FormControl('', null),
      'yr_rec_schl_hsc': new FormControl('', null),
      'upgrad_prito_uprpri': new FormControl('', null),
      'upgrad_uprprito_sec': new FormControl('', null),
      'upgrad_secto_higsec': new FormControl('', null),
      'cwsn_scl': new FormControl('', null),
      'shftd_schl': new FormControl('', null),
      'resid_schl': new FormControl('', null),
      'typ_resid_schl': new FormControl('', null),
      'boarding_pri_yn': new FormControl('', null),
      'boarding_pri_b': new FormControl('', null),
      'boarding_pri_g': new FormControl('', null),
      'boarding_upr_yn': new FormControl('', null),
      'boarding_upr_b': new FormControl('', null),
      'boarding_upr_g': new FormControl('', null),
      'boarding_sec_yn': new FormControl('', null),
      'boarding_sec_b': new FormControl('', null),
      'boarding_sec_g': new FormControl('', null),
      'boarding_hsec_yn': new FormControl('', null),
      'boarding_hsec_b': new FormControl('', null),
      'boarding_hsec_g': new FormControl('', null),
      'hill_frst': new FormControl('', null),
      'spl_edtor': new FormControl('', null),
    });
  }


  getStdCodes()
  {
    this.SchoolsService.getstdCodeJSON().subscribe((result) => {
      debugger
      this.stdCode = result;
      this.stdList = this.stdCode['stdCode'].map(item => { return { 
        label: item.label, 
        value :item.value
      }});
    });
  }

  getBasicInfo() {
    debugger;
    this.SchoolsService.getschoolDetails(this.schoolId, true).subscribe(data => {
      this.schoolBasicDetails = data.result.schoolinfo;
      console.log(this.schoolBasicDetails);
      this.form.patchValue(this.schoolBasicDetails);
      this.anganchild = +data.result.schoolinfo.anganwadi_stu_b + + data.result.schoolinfo.anganwadi_stu_g;
      this.form.controls['angan_childs'].setValue(this.anganchild);
    });
  }
 
  checkValidator() {
    if (this.schoolTypeId == 1 || this.schoolTypeId == 2 || this.schoolTypeId == 4) {

      this.form.controls['anganwadi'].enable();
      this.form.controls['angan_wrks'].enable();
      this.form.controls['angan_childs'].enable();
      this.form.controls['anganwadi_schl'].enable();
      this.form.controls['anganwadi_center'].enable();
      this.form.controls['anganwadi_train'].enable();

      this.form.controls['anganwadi'].setValidators(null);
      this.form.controls['angan_wrks'].setValidators(null);
      this.form.controls['angan_childs'].setValidators(null);
      this.form.controls['anganwadi_schl'].setValidators(null);
      this.form.controls['anganwadi_center'].setValidators(null);
      this.form.controls['anganwadi_train'].setValidators(null);

    } else {
      this.form.controls['anganwadi'].disable();
      this.form.controls['angan_wrks'].disable();
      this.form.controls['angan_childs'].disable();
      this.form.controls['anganwadi_schl'].disable();
      this.form.controls['anganwadi_center'].disable();
      this.form.controls['anganwadi_train'].disable();

      this.form.controls['anganwadi'].setValidators(Validators.required);
      this.form.controls['angan_wrks'].setValidators(Validators.required);
      this.form.controls['angan_childs'].setValidators(Validators.required);
      this.form.controls['anganwadi_schl'].setValidators(Validators.required);
      this.form.controls['anganwadi_center'].setValidators(Validators.required);
      this.form.controls['anganwadi_train'].setValidators(Validators.required);

    }

    if (this.schoolTypeId == 2 || this.schoolTypeId == 3 || this.schoolTypeId == 4) {
      this.form.controls['yr_recogn_schl'].enable();
      this.form.controls['yr_rec_schl_elem'].enable();
      this.form.controls['yr_rec_schl_sec'].enable();
      this.form.controls['yr_rec_schl_hsc'].enable();
      this.form.controls['upgrad_prito_uprpri'].enable();
      this.form.controls['upgrad_uprprito_sec'].enable();
      this.form.controls['upgrad_secto_higsec'].enable();

      this.form.controls['yr_recogn_schl'].setValidators(null);
      this.form.controls['yr_rec_schl_elem'].setValidators(null);
      this.form.controls['yr_rec_schl_sec'].setValidators(null);
      this.form.controls['yr_rec_schl_hsc'].setValidators(null);
      this.form.controls['upgrad_prito_uprpri'].setValidators(null);
      this.form.controls['upgrad_uprprito_sec'].setValidators(null);
      this.form.controls['upgrad_secto_higsec'].setValidators(null);

    } else {
      this.form.controls['yr_recogn_schl'].disable();
      this.form.controls['yr_rec_schl_elem'].disable();
      this.form.controls['yr_rec_schl_sec'].disable();
      this.form.controls['yr_rec_schl_hsc'].disable();
      this.form.controls['upgrad_prito_uprpri'].disable();
      this.form.controls['upgrad_uprprito_sec'].disable();
      this.form.controls['upgrad_secto_higsec'].disable();

      this.form.controls['yr_recogn_schl'].setValidators(Validators.required);
      this.form.controls['yr_rec_schl_elem'].setValidators(Validators.required);
      this.form.controls['yr_rec_schl_sec'].setValidators(Validators.required);
      this.form.controls['yr_rec_schl_hsc'].setValidators(Validators.required);
      this.form.controls['upgrad_prito_uprpri'].setValidators(Validators.required);
      this.form.controls['upgrad_uprprito_sec'].setValidators(Validators.required);
      this.form.controls['upgrad_secto_higsec'].setValidators(Validators.required);

      this.form.controls['yr_recogn_schl'].setValidators(null);
      this.form.controls['yr_rec_schl_elem'].setValidators(null);
      this.form.controls['yr_rec_schl_sec'].setValidators(null);
      this.form.controls['yr_rec_schl_hsc'].setValidators(null);
      this.form.controls['upgrad_prito_uprpri'].setValidators(null);
      this.form.controls['upgrad_uprprito_sec'].setValidators(null);
      this.form.controls['upgrad_secto_higsec'].setValidators(null);

    }

    this.form.controls['anganwadi'].updateValueAndValidity();
    this.form.controls['angan_wrks'].updateValueAndValidity();
    this.form.controls['angan_childs'].updateValueAndValidity();
    this.form.controls['anganwadi_schl'].updateValueAndValidity();
    this.form.controls['anganwadi_center'].updateValueAndValidity();
    this.form.controls['anganwadi_train'].updateValueAndValidity();

    this.form.controls['yr_recogn_schl'].updateValueAndValidity();
    this.form.controls['yr_rec_schl_elem'].updateValueAndValidity();
    this.form.controls['yr_rec_schl_sec'].updateValueAndValidity();
    this.form.controls['yr_rec_schl_hsc'].updateValueAndValidity();
    this.form.controls['upgrad_prito_uprpri'].updateValueAndValidity();
    this.form.controls['upgrad_uprprito_sec'].updateValueAndValidity();
    this.form.controls['upgrad_secto_higsec'].updateValueAndValidity();

  }

  onCancel() {
    this.getBasicInfo();
  }

  onSave() {
    debugger;
    this.submitted = true;
    var data = {
      "schoolnew_basicinfo": {
        "school_id": this.schoolId,
        "address": this.form.value.address,
        "corr_name": this.form.value.corr_name,
        "office_landline": this.form.value.office_landline,
        "office_mobile": this.form.value.office_mobile,
        "corr_landlline": this.form.value.corr_landlline,
        "corr_mobile": this.form.value.corr_mobile,
        "sch_email": this.form.value.sch_email,
        "website": this.form.value.website,

        "panchayat_id": this.form.value.panchayat_id,
        'municipal_name': this.form.value.municipal_name,
        'city_id': this.form.value.city_id,
        'corr_std_code': this.form.value.corr_std_code,
        'office_std_code': this.form.value.office_std_code,
      },
      "schoolnew_academic_detail": {
        "school_key_id": this.schoolId,
        "yr_estd_schl": this.form.value.yr_estd_schl,
        'yr_recgn_first': this.form.value.yr_recgn_first,
        'yr_last_renwl': this.form.value.yr_last_renwl,
        'certifi_no': this.form.value.certifi_no,
        'yr_recogn_schl': this.form.value.yr_recogn_schl,
        'yr_rec_schl_elem': this.form.value.yr_rec_schl_elem,
        'yr_rec_schl_sec': this.form.value.yr_rec_schl_sec,
        'yr_rec_schl_hsc': this.form.value.yr_rec_schl_hsc,
        'upgrad_prito_uprpri': this.form.value.upgrad_prito_uprpri,
        'upgrad_uprprito_sec': this.form.value.upgrad_uprprito_sec,
        'upgrad_secto_higsec': this.form.value.upgrad_secto_higsec,
        'typ_resid_schl': this.form.value.typ_resid_schl,
        //'cwsn_scl': this.form.value.cwsn_scl

      },
      "schoolnew_sectionbyclass": {
        "school_key_id": this.schoolId,
        'pre_pri_sec': this.form.value.pre_pri_sec,
        'class1_sec': this.form.value.class1_sec,
        'class2_sec': this.form.value.class2_sec,
        'class3_sec': this.form.value.class3_sec,
        'class4_sec': this.form.value.class4_sec,
        'class5_sec': this.form.value.class5_sec,
        'class6_sec': this.form.value.class6_sec,
        'class7_sec': this.form.value.class7_sec,
        'class8_sec': this.form.value.class8_sec,
        'class9_sec': this.form.value.class9_sec,
        'class10_sec': this.form.value.class10_sec,
        'class11_sec': this.form.value.class11_sec,
        'class12_sec': this.form.value.class12_sec,
      },
      "schoolnew_training_detail": {
        "school_key_id": this.schoolId,
        'anganwadi_schl': this.form.value.anganwadi_schl,
        'anganwadi_center': this.form.value.anganwadi_center,
        'angan_childs': this.form.value.anganwadi_center,
        'anganwadi_train': this.form.value.anganwadi_train,
      },
      "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_1": "1" }
    }
    if (this.form.valid) {
      this.SchoolsService.saveSchoolDetails(data).subscribe(res => {
        if (res.result == true) {
          this.alertService.success("Records Updated Successfully");
          this.getBasicInfo();
        }
        else {
          this.alertService.error(res.message);
        }
      });
    }
    else {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys',key);
          invalidControl.focus();
           break;
        }
      }
      this.alertService.error("Please fill all the required fields");
    }
  }


  // onFinalSubmit() {
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
  //     accept: () => {
  //       this.submitted = true;
  //       var data = {
  //         "schoolnew_basicinfo": {
  //           "school_id": this.schoolId,
  //           "address": this.form.value.address,
  //           "corr_name": this.form.value.corr_name,
  //           "office_landline": this.form.value.office_landline,
  //           "office_mobile": this.form.value.office_mobile,
  //           "corr_landlline": this.form.value.corr_landlline,
  //           "corr_mobile": this.form.value.corr_mobile,
  //           "sch_email": this.form.value.sch_email,
  //           "website": this.form.value.website,

  //           "panchayat_id": this.form.value.panchayat_id,
  //           'municipal_id': this.form.value.municipal_id,
  //           'city_id': this.form.value.city_id,
  //         },
  //         "schoolnew_academic_detail": {
  //           "school_key_id": this.schoolId,
  //           "yr_estd_schl": this.form.value.yr_estd_schl,
  //           'yr_recgn_first': this.form.value.yr_recgn_first,
  //           'yr_last_renwl': this.form.value.yr_last_renwl,
  //           'certifi_no': this.form.value.certifi_no,
  //           'yr_recogn_schl': this.form.value.yr_recogn_schl,
  //           'yr_rec_schl_elem': this.form.value.yr_rec_schl_elem,
  //           'yr_rec_schl_sec': this.form.value.yr_rec_schl_sec,
  //           'yr_rec_schl_hsc': this.form.value.yr_rec_schl_hsc,
  //           'upgrad_pri_to_uprpri': this.form.value.upgrad_pri_to_uprpri,
  //           'upgrad_uprpri_to_sec': this.form.value.upgrad_uprpri_to_sec,
  //           'upgrad_sec_to_higsec': this.form.value.upgrad_sec_to_higsec,
  //           'typ_resid_schl': this.form.value.typ_resid_schl,

  //         },
  //         "schoolnew_sectionbyclass": {
  //           "school_key_id": this.schoolId,
  //           'pre_pri_sec': this.form.value.pre_pri_sec,
  //           'class1_sec': this.form.value.class1_sec,
  //           'class2_sec': this.form.value.class2_sec,
  //           'class3_sec': this.form.value.class3_sec,
  //           'class4_sec': this.form.value.class4_sec,
  //           'class5_sec': this.form.value.class5_sec,
  //           'class6_sec': this.form.value.class6_sec,
  //           'class7_sec': this.form.value.class7_sec,
  //           'class8_sec': this.form.value.class8_sec,
  //           'class9_sec': this.form.value.class9_sec,
  //           'class10_sec': this.form.value.class10_sec,
  //           'class11_sec': this.form.value.class11_sec,
  //           'class12_sec': this.form.value.class12_sec,
  //         },
  //         "schoolnew_training_detail": {
  //           "school_key_id": this.schoolId,
  //           'anganwadi_schl': this.form.value.anganwadi_schl,
  //           'anganwadi_center': this.form.value.anganwadi_center,
  //           'angan_childs': this.form.value.anganwadi_center,
  //           'anganwadi_train': this.form.value.anganwadi_train,
  //         },
  //         "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_1": "2" }
  //       }
  //       if (this.form.valid) {
  //         this.SchoolsService.saveSchoolDetails(data).subscribe(res => {
  //           if (res.result == true) {
  //             this.alertService.success("Records Updated Successfully");
  //             this.getBasicInfo();
  //           }
  //           else {
  //             this.alertService.error(res.message);
  //           }
  //         });
  //       }
  //       else {
  //         this.alertService.error("Please fill all the required fields");
  //       }
  //     }
  //   });
  // }


}
