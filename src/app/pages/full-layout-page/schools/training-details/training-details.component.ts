import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { schoolsService } from '../schools.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  form: FormGroup;
  schoolTypeId: any;
  clubList: any[] = [];
  isShowOthers: boolean = false;
  selectedClubsList: any[] = [];
  month: any[] = [];
  trainingLocation: any[] = [];
  trainingType: any[] = [];
  trainingCondBy: any[] = [];
  clubDetails: any[] = [];
  schoolId: number;
  schoolDetails: any[] = [];
  submitted: boolean = false;
  dayWorkInfo: any[] = [];
  schoolTypes: any[] = [];
  totalClubRecords: any[] = [];
  studenrollhead: { field: string; header: string; }[];
  studenrollby: { field: string; header: string; }[];
  economicweakersec: { field: string; header: string; }[];
  economicweakersecbody: { field: string; header: string; }[];
  dayEntryInvalid: boolean;
  clubEntryInvalid: boolean = false;
  constructor(private fb: FormBuilder,
    private schoolService: schoolsService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private userSessionService: UserSessionService,
    private el: ElementRef) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
  }

  ngOnInit() {
    this.initialValidators();
    this.getSchoolDetails();
    this.dataList();
    this.studentenroll();
    this.checkValidator();
    const dayEntryformArray = this.form.controls.daysHoursInfo as FormArray;
    if (dayEntryformArray.length < 1) {
      dayEntryformArray.push(this.createDaysEntry());
    }
  }

  studentenroll() {
    this.studenrollhead = [
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
    ];
    this.studenrollby = [
      { field: 'Girls', header: 'Girls' },
    ];
    this.economicweakersec = [
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
      { field: 'B', header: 'B' },
      { field: 'G', header: 'G' },
    ];
    this.economicweakersecbody = [
      { field: 'B', header: 'B' },
    ];
  }
  initialValidators() {
    this.form = this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      // acad_mnth_start: new FormControl('', Validators.required),
      // special_train: new FormControl('', Validators.required),
      // train_prov_boys: new FormControl('', null),
      // train_prov_grls: new FormControl('', null),
      // train_cond_by : new FormControl('', null),
      //  train_cond_in: new FormControl('', null),
      //  train_type: new FormControl('', null),
      acad_mnth_start: new FormControl('', null),
      txtbk_recd_yn: new FormControl('', null),
      txtbk_recd_mon: new FormControl('', null),
      special_train: new FormControl('', null),
      train_prov_boys: new FormControl('', null),
      train_prov_grls: new FormControl('', null),
      spltrg_py_enrol_b: new FormControl('', null),
      spltrg_py_enrol_g: new FormControl('', null),
      spltrg_py_prov_b: new FormControl('', null),
      spltrg_py_prov_g: new FormControl('', null),
      train_cond_by: new FormControl('', null),
      train_cond_in: new FormControl('', null),
      train_type: new FormControl('', null),
      remedial_tch_enrol: new FormControl('', null),
      sdmp_dev: new FormControl('', Validators.required),
      stu_councel: new FormControl('', Validators.required),
      sturct_saf: new FormControl('', Validators.required),
      nonsturct_saf: new FormControl('', Validators.required),
      cctv_school: new FormControl('', Validators.required),
      firext_schl: new FormControl('', Validators.required),
      nodtchr_schlsaf: new FormControl('', Validators.required),
      dister_trng: new FormControl('', Validators.required),
      dister_part: new FormControl('', Validators.required),
      slfdfse_trng: new FormControl('', Validators.required),
      noslfdfse_trng: new FormControl('', Validators.required),
      rte_25p_applied: new FormControl('', null),
      rte_25p_enrolled: new FormControl('', null),
      rte_pvt_c0_b: new FormControl('', null),
      rte_pvt_c0_g: new FormControl('', null),
      rte_pvt_c1_b: new FormControl('', null),
      rte_pvt_c1_g: new FormControl('', null),
      rte_pvt_c2_b: new FormControl('', null),
      rte_pvt_c2_g: new FormControl('', null),
      rte_pvt_c3_b: new FormControl('', null),
      rte_pvt_c3_g: new FormControl('', null),
      rte_pvt_c4_b: new FormControl('', null),
      rte_pvt_c4_g: new FormControl('', null),
      rte_pvt_c5_b: new FormControl('', null),
      rte_pvt_c5_g: new FormControl('', null),
      rte_pvt_c6_b: new FormControl('', null),
      rte_pvt_c6_g: new FormControl('', null),
      rte_pvt_c7_b: new FormControl('', null),
      rte_pvt_c7_g: new FormControl('', null),
      rte_pvt_c8_b: new FormControl('', null),
      rte_pvt_c8_g: new FormControl('', null),
      rte_bld_c0_b: new FormControl('', null),
      rte_bld_c0_g: new FormControl('', null),
      rte_bld_c1_b: new FormControl('', null),
      rte_bld_c1_g: new FormControl('', null),
      rte_bld_c2_b: new FormControl('', null),
      rte_bld_c2_g: new FormControl('', null),
      rte_bld_c3_b: new FormControl('', null),
      rte_bld_c3_g: new FormControl('', null),
      rte_bld_c4_b: new FormControl('', null),
      rte_bld_c4_g: new FormControl('', null),
      rte_bld_c5_b: new FormControl('', null),
      rte_bld_c5_g: new FormControl('', null),
      rte_bld_c6_b: new FormControl('', null),
      rte_bld_c6_g: new FormControl('', null),
      rte_bld_c7_b: new FormControl('', null),
      rte_bld_c7_g: new FormControl('', null),
      rte_bld_c8_b: new FormControl('', null),
      rte_bld_c8_g: new FormControl('', null),
      rte_ews_c9_b: new FormControl('', null),
      rte_ews_c9_g: new FormControl('', null),
      rte_ews_c10_b: new FormControl('', null),
      rte_ews_c10_g: new FormControl('', null),
      rte_ews_c11_b: new FormControl('', null),
      rte_ews_c11_g: new FormControl('', null),
      rte_ews_c12_b: new FormControl('', null),
      rte_ews_c12_g: new FormControl('', null),
      daysHoursInfo: this.fb.array([]),
      clubDetails: this.fb.array([]),
      guidline_disply_brd: new FormControl('', Validators.required),
      grnt_frstlvl_conslrs: new FormControl('', Validators.required),
      guidlins_counsling: new FormControl('', null),
      sensitiz_parnts: new FormControl('', null),
      awrnss_studscomm: new FormControl('', null),
      studs_feedbck: new FormControl('', null),
      safty_sugstn: new FormControl('', null),
      copies_studs: new FormControl('', null)
    });
  }
  checkValidator() {

    if (this.schoolTypeId == 3) {
      this.form.controls['rte_25p_applied'].enable();//doc no : 1.41
      this.form.controls['rte_25p_enrolled'].enable();//doc no : 1.41
      this.form.controls['rte_pvt_c0_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c0_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c1_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c1_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c2_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c2_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c3_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c3_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c4_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c4_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c5_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c5_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c6_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c6_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c7_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c7_g'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c8_b'].enable();//doc no : 1.42
      this.form.controls['rte_pvt_c8_g'].enable();//doc no : 1.42

      this.form.controls['rte_25p_applied'].setValidators(Validators.required);
      this.form.controls['rte_25p_enrolled'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c0_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c0_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c1_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c1_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c2_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c2_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c3_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c3_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c4_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c4_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c5_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c5_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c6_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c6_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c7_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c7_g'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c8_b'].setValidators(Validators.required);
      this.form.controls['rte_pvt_c8_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c0_b'].enable();
      this.form.controls['rte_bld_c0_g'].enable();
      this.form.controls['rte_bld_c1_b'].enable();
      this.form.controls['rte_bld_c1_g'].enable();
      this.form.controls['rte_bld_c2_b'].enable();
      this.form.controls['rte_bld_c2_g'].enable();
      this.form.controls['rte_bld_c3_b'].enable();
      this.form.controls['rte_bld_c3_g'].enable();
      this.form.controls['rte_bld_c4_b'].enable();
      this.form.controls['rte_bld_c4_g'].enable();
      this.form.controls['rte_bld_c5_b'].enable();
      this.form.controls['rte_bld_c5_g'].enable();
      this.form.controls['rte_bld_c6_b'].enable();
      this.form.controls['rte_bld_c6_g'].enable();
      this.form.controls['rte_bld_c7_b'].enable();
      this.form.controls['rte_bld_c7_g'].enable();
      this.form.controls['rte_bld_c8_b'].enable();
      this.form.controls['rte_bld_c8_g'].enable();
      this.form.controls['rte_ews_c9_b'].enable();
      this.form.controls['rte_ews_c9_g'].enable();
      this.form.controls['rte_ews_c10_b'].enable();
      this.form.controls['rte_ews_c10_g'].enable();
      this.form.controls['rte_ews_c11_b'].enable();
      this.form.controls['rte_ews_c11_g'].enable();
      this.form.controls['rte_ews_c12_b'].enable();
      this.form.controls['rte_ews_c12_g'].enable();


      this.form.controls['rte_bld_c0_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c0_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c1_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c1_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c2_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c2_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c3_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c3_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c4_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c4_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c5_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c5_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c6_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c6_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c7_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c7_g'].setValidators(Validators.required);
      this.form.controls['rte_bld_c8_b'].setValidators(Validators.required);
      this.form.controls['rte_bld_c8_g'].setValidators(Validators.required);
      this.form.controls['rte_ews_c9_b'].setValidators(Validators.required);
      this.form.controls['rte_ews_c9_g'].setValidators(Validators.required);
      this.form.controls['rte_ews_c10_b'].setValidators(Validators.required);
      this.form.controls['rte_ews_c10_g'].setValidators(Validators.required);
      this.form.controls['rte_ews_c11_b'].setValidators(Validators.required);
      this.form.controls['rte_ews_c11_g'].setValidators(Validators.required);
      this.form.controls['rte_ews_c12_b'].setValidators(Validators.required);
      this.form.controls['rte_ews_c12_g'].setValidators(Validators.required);

    }
    else {
      this.form.controls['rte_25p_applied'].disable();
      this.form.controls['rte_25p_enrolled'].disable();
      this.form.controls['rte_pvt_c0_b'].disable();
      this.form.controls['rte_pvt_c0_g'].disable();
      this.form.controls['rte_pvt_c1_b'].disable();
      this.form.controls['rte_pvt_c1_g'].disable();
      this.form.controls['rte_pvt_c2_b'].disable();
      this.form.controls['rte_pvt_c2_g'].disable();
      this.form.controls['rte_pvt_c3_b'].disable();
      this.form.controls['rte_pvt_c3_g'].disable();
      this.form.controls['rte_pvt_c4_b'].disable();
      this.form.controls['rte_pvt_c4_g'].disable();
      this.form.controls['rte_pvt_c5_b'].disable();
      this.form.controls['rte_pvt_c5_g'].disable();
      this.form.controls['rte_pvt_c6_b'].disable();
      this.form.controls['rte_pvt_c6_g'].disable();
      this.form.controls['rte_pvt_c7_b'].disable();
      this.form.controls['rte_pvt_c7_g'].disable();
      this.form.controls['rte_pvt_c8_b'].disable();
      this.form.controls['rte_pvt_c8_g'].disable();
      this.form.controls['rte_25p_applied'].setValidators(null);
      this.form.controls['rte_25p_enrolled'].setValidators(null);
      this.form.controls['rte_pvt_c0_b'].setValidators(null);
      this.form.controls['rte_pvt_c0_g'].setValidators(null);
      this.form.controls['rte_pvt_c1_b'].setValidators(null);
      this.form.controls['rte_pvt_c1_g'].setValidators(null);
      this.form.controls['rte_pvt_c2_b'].setValidators(null);
      this.form.controls['rte_pvt_c2_g'].setValidators(null);
      this.form.controls['rte_pvt_c3_b'].setValidators(null);
      this.form.controls['rte_pvt_c3_g'].setValidators(null);
      this.form.controls['rte_pvt_c4_b'].setValidators(null);
      this.form.controls['rte_pvt_c4_g'].setValidators(null);
      this.form.controls['rte_pvt_c5_b'].setValidators(null);
      this.form.controls['rte_pvt_c5_g'].setValidators(null);
      this.form.controls['rte_pvt_c6_b'].setValidators(null);
      this.form.controls['rte_pvt_c6_g'].setValidators(null);
      this.form.controls['rte_pvt_c7_b'].setValidators(null);
      this.form.controls['rte_pvt_c7_g'].setValidators(null);
      this.form.controls['rte_pvt_c8_b'].setValidators(null);
      this.form.controls['rte_pvt_c8_g'].setValidators(null);
      this.form.controls['rte_bld_c0_b'].disable();
      this.form.controls['rte_bld_c0_g'].disable();
      this.form.controls['rte_bld_c1_b'].disable();
      this.form.controls['rte_bld_c1_g'].disable();
      this.form.controls['rte_bld_c2_b'].disable();
      this.form.controls['rte_bld_c2_g'].disable();
      this.form.controls['rte_bld_c3_b'].disable();
      this.form.controls['rte_bld_c3_g'].disable();
      this.form.controls['rte_bld_c4_b'].disable();
      this.form.controls['rte_bld_c4_g'].disable();
      this.form.controls['rte_bld_c5_b'].disable();
      this.form.controls['rte_bld_c5_g'].disable();
      this.form.controls['rte_bld_c6_b'].disable();
      this.form.controls['rte_bld_c6_g'].disable();
      this.form.controls['rte_bld_c7_b'].disable();
      this.form.controls['rte_bld_c7_g'].disable();
      this.form.controls['rte_bld_c8_b'].disable();
      this.form.controls['rte_bld_c8_g'].disable();
      this.form.controls['rte_ews_c9_b'].disable();
      this.form.controls['rte_ews_c9_g'].disable();
      this.form.controls['rte_ews_c10_b'].disable();
      this.form.controls['rte_ews_c10_g'].disable();
      this.form.controls['rte_ews_c11_b'].disable();
      this.form.controls['rte_ews_c11_g'].disable();
      this.form.controls['rte_ews_c12_b'].disable();
      this.form.controls['rte_ews_c12_g'].disable();

      this.form.controls['rte_bld_c0_b'].setValidators(null);
      this.form.controls['rte_bld_c0_g'].setValidators(null);
      this.form.controls['rte_bld_c1_b'].setValidators(null);
      this.form.controls['rte_bld_c1_g'].setValidators(null);
      this.form.controls['rte_bld_c2_b'].setValidators(null);
      this.form.controls['rte_bld_c2_g'].setValidators(null);
      this.form.controls['rte_bld_c3_b'].setValidators(null);
      this.form.controls['rte_bld_c3_g'].setValidators(null);
      this.form.controls['rte_bld_c4_b'].setValidators(null);
      this.form.controls['rte_bld_c4_g'].setValidators(null);
      this.form.controls['rte_bld_c5_b'].setValidators(null);
      this.form.controls['rte_bld_c5_g'].setValidators(null);
      this.form.controls['rte_bld_c6_b'].setValidators(null);
      this.form.controls['rte_bld_c6_g'].setValidators(null);
      this.form.controls['rte_bld_c7_b'].setValidators(null);
      this.form.controls['rte_bld_c7_g'].setValidators(null);
      this.form.controls['rte_bld_c8_b'].setValidators(null);
      this.form.controls['rte_bld_c8_g'].setValidators(null);
      this.form.controls['rte_ews_c9_b'].setValidators(null);
      this.form.controls['rte_ews_c9_g'].setValidators(null);
      this.form.controls['rte_ews_c10_b'].setValidators(null);
      this.form.controls['rte_ews_c10_g'].setValidators(null);
      this.form.controls['rte_ews_c11_b'].setValidators(null);
      this.form.controls['rte_ews_c11_g'].setValidators(null);
      this.form.controls['rte_ews_c12_b'].setValidators(null);
      this.form.controls['rte_ews_c12_g'].setValidators(null);


    }

    if (this.schoolTypeId == 1 || this.schoolTypeId == 2 || this.schoolTypeId == 4) {
      this.form.controls['special_train'].enable();//doc no : 1.43
      this.form.controls['special_train'].setValidators(Validators.required);

      this.form.controls['train_prov_boys'].enable();//doc no : 1.43
      this.form.controls['train_prov_grls'].enable();//doc no : 1.43
      this.form.controls['train_prov_boys'].setValidators(Validators.required);
      this.form.controls['train_prov_grls'].setValidators(Validators.required);

      // this.form.controls['spltrg_py_enrol_b'].enable();//doc no : 1.43
      // this.form.controls['spltrg_py_enrol_g'].enable();//doc no : 1.43
      // this.form.controls['spltrg_py_prov_b'].enable();//doc no : 1.43
      // this.form.controls['spltrg_py_prov_g'].enable();//doc no : 1.43
      // this.form.controls['spltrg_py_enrol_b'].setValidators(Validators.required);
      // this.form.controls['spltrg_py_enrol_g'].setValidators(Validators.required);
      // this.form.controls['spltrg_py_prov_b'].setValidators(Validators.required);
      // this.form.controls['spltrg_py_prov_g'].setValidators(Validators.required);

      this.form.controls['train_cond_by'].enable();//doc no : 1.43
      this.form.controls['train_cond_in'].enable();//doc no : 1.43
      this.form.controls['train_type'].enable();//doc no : 1.43
      this.form.controls['train_cond_by'].setValidators(Validators.required);
      this.form.controls['train_cond_in'].setValidators(Validators.required);
      this.form.controls['train_type'].setValidators(Validators.required);

      //question missing 1.44 there is formcontrol name in given but in html they removed ask arun sir for this missing question.

      this.form.controls['acad_mnth_start'].enable();//doc no : 1.45
      this.form.controls['acad_mnth_start'].setValidators(Validators.required);

      this.form.controls['txtbk_recd_yn'].enable();//doc no : 1.46
      this.form.controls['txtbk_recd_mon'].enable();//doc no : 1.46
      this.form.controls['txtbk_recd_yn'].setValidators(Validators.required);
      this.form.controls['txtbk_recd_mon'].setValidators(Validators.required);


    }
    else {
      this.form.controls['special_train'].disable();//doc no : 1.43
      this.form.controls['special_train'].setValidators(null);

      this.form.controls['train_prov_boys'].disable();//doc no : 1.43 a) boys
      this.form.controls['train_prov_grls'].disable();//doc no : 1.43 a) girls
      this.form.controls['train_prov_boys'].setValidators(null);
      this.form.controls['train_prov_grls'].setValidators(null);

      // this.form.controls['spltrg_py_enrol_b'].disable();
      // this.form.controls['spltrg_py_enrol_g'].disable();
      // this.form.controls['spltrg_py_prov_b'].disable();
      // this.form.controls['spltrg_py_prov_g'].disable();

      // this.form.controls['spltrg_py_enrol_b'].setValidators(null);
      // this.form.controls['spltrg_py_enrol_g'].setValidators(null);
      // this.form.controls['spltrg_py_prov_b'].setValidators(null);
      // this.form.controls['spltrg_py_prov_g'].setValidators(null);

      this.form.controls['train_cond_by'].disable();//doc no : 1.43
      this.form.controls['train_cond_in'].disable();//doc no : 1.43
      this.form.controls['train_type'].disable();//doc no : 1.43
      this.form.controls['train_cond_by'].setValidators(null);
      this.form.controls['train_cond_in'].setValidators(null);
      this.form.controls['train_type'].setValidators(null);

      this.form.controls['acad_mnth_start'].disable();//1.45
      this.form.controls['acad_mnth_start'].setValidators(null);

      this.form.controls['txtbk_recd_yn'].disable();//1.46
      this.form.controls['txtbk_recd_mon'].disable();//1.46
      this.form.controls['txtbk_recd_yn'].setValidators(null);
      this.form.controls['txtbk_recd_mon'].setValidators(null);

    }


    this.form.controls['rte_25p_applied'].updateValueAndValidity();
    this.form.controls['rte_25p_enrolled'].updateValueAndValidity();
    this.form.controls['rte_pvt_c0_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c0_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c1_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c1_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c2_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c2_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c3_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c3_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c4_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c4_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c5_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c5_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c6_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c6_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c7_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c7_g'].updateValueAndValidity();
    this.form.controls['rte_pvt_c8_b'].updateValueAndValidity();
    this.form.controls['rte_pvt_c8_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c0_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c0_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c1_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c1_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c2_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c2_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c3_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c3_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c4_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c4_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c5_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c5_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c6_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c6_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c7_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c7_g'].updateValueAndValidity();
    this.form.controls['rte_bld_c8_b'].updateValueAndValidity();
    this.form.controls['rte_bld_c8_g'].updateValueAndValidity();
    this.form.controls['rte_ews_c9_b'].updateValueAndValidity();
    this.form.controls['rte_ews_c9_g'].updateValueAndValidity();
    this.form.controls['rte_ews_c10_b'].updateValueAndValidity();
    this.form.controls['rte_ews_c10_g'].updateValueAndValidity();
    this.form.controls['rte_ews_c11_b'].updateValueAndValidity();
    this.form.controls['rte_ews_c11_g'].updateValueAndValidity();
    this.form.controls['rte_ews_c12_b'].updateValueAndValidity();
    this.form.controls['rte_ews_c12_g'].updateValueAndValidity();

    this.form.controls['acad_mnth_start'].updateValueAndValidity();
    this.form.controls['txtbk_recd_yn'].updateValueAndValidity();
    this.form.controls['txtbk_recd_mon'].updateValueAndValidity();
    this.form.controls['special_train'].updateValueAndValidity();
    this.form.controls['train_prov_boys'].updateValueAndValidity();
    this.form.controls['train_prov_grls'].updateValueAndValidity();
    // this.form.controls['spltrg_py_enrol_b'].updateValueAndValidity();
    // this.form.controls['spltrg_py_enrol_g'].updateValueAndValidity();
    // this.form.controls['spltrg_py_prov_b'].updateValueAndValidity();
    // this.form.controls['spltrg_py_prov_g'].updateValueAndValidity();
    this.form.controls['train_cond_by'].updateValueAndValidity();
    this.form.controls['train_cond_in'].updateValueAndValidity();
    this.form.controls['train_type'].updateValueAndValidity();
    // this.form.controls['remedial_tch_enrol '].updateValueAndValidity();

  }
  getSchoolDetails() {
    this.schoolService.getBasicsList(this.schoolId).subscribe((res) => {
      if (res) {
        debugger;
        this.schoolDetails = res.result.schoolinfo;
        this.dayWorkInfo = res.result.schoolinfo.daywork_school_type;
        this.totalClubRecords = res.result.schoolinfo.clubs;
        // this.mediumList =  this.schoolBasicDetails['medium'];
        // this.langList =  this.schoolBasicDetails['langetr'];
        // this.clubList =this.schoolBasicDetails['clubs'];
        this.form.patchValue(this.schoolDetails);
        if (this.dayWorkInfo.length > 0) {
          const dayWorkInfoFormArray = this.form.controls.daysHoursInfo as FormArray;
          while (dayWorkInfoFormArray.length !== 0) {
            dayWorkInfoFormArray.removeAt(0)
          }
          for (let i = 0; i < this.dayWorkInfo.length; i++) {
            dayWorkInfoFormArray.push(this.fb.group({
              school_key_id: this.schoolId,
              school_type: this.dayWorkInfo[i].school_type,
              instr_dys: this.dayWorkInfo[i].instr_dys,
              hrs_chldrn_sty_schl: this.dayWorkInfo[i].stud_hrsonly,
              mns_chldrn_sty_schl: this.dayWorkInfo[i].stud_minonly,
              hrs_tchrs_sty_schl: this.dayWorkInfo[i].teach_hrsonly,
              mns_tchrs_sty_schl: this.dayWorkInfo[i].teach_minonly,
              cce_impl: this.dayWorkInfo[i].cce_impl,
              cce_cum: this.dayWorkInfo[i].cce_cum,
              cce_shared: this.dayWorkInfo[i].cce_shared,
              isShowList: true,
            }));
          }
        }

        if (this.totalClubRecords.length > 0) {
          const totalClubRecordsFormArray = this.form.controls.clubDetails as FormArray;
          while (totalClubRecordsFormArray.length !== 0) {
            totalClubRecordsFormArray.removeAt(0)
          }
          for (let i = 0; i < this.totalClubRecords.length; i++) {
            debugger;
            totalClubRecordsFormArray.push(this.fb.group({
              school_key_id: this.schoolId,
              extra_cc: this.totalClubRecords[i].extra_cc,
              other_cc: this.totalClubRecords[i].others_cc
            }));
          }
        }
        if (this.form.value.special_train) {
          this.trainingAttendChange(this.form.value.special_train);
        }
        if (this.form.value.slfdfse_trng) {
          this.trainForGirls(this.form.value.slfdfse_trng);
        }
        if (this.form.value.grnt_frstlvl_conslrs) {
          this.allTeachers(this.form.value.grnt_frstlvl_conslrs);
        }
        if (this.form.value.txtbk_recd_yn) {
          this.txtbkRecdYn(this.form.value.txtbk_recd_yn);
        }


      }
    });
  }
  save() {
    debugger;
    this.submitted = true;
    if (this.form.valid) {


      //     for(var i = 0; i < this.form.value.daysHoursInfo.length; i++) {
      // this.form.value.daysHoursInfo[i].school_type = i+1;
      //     }
      var data = {
        //  "schoolnew_dayswork_entry":{"this.form.value.daysHoursInfo"
        //    },
        "schoolnew_academic_detail": this.form.value,
        // "school_key_id":this.schoolId,
        // "acad_mnth_start":this.form.value.acad_mnth_start,
        //  "txtbk_recd_yn":this.form.value.txtbk_recd_yn,
        //  "txtbk_recd_mon":this.form.value.txtbk_recd_mon,
        // "rte_pvt_c0_b" :this.form.value.rte_pvt_c0_b,
        // "rte_25p_applied" :this.form.value.rte_25p_applied,
        "schoolnew_training_detail": {
          "school_key_id": this.schoolId,
          "special_train": this.form.value.special_train,
          "stu_councel": this.form.value.stu_councel,
          "train_prov_boys": this.form.value.train_prov_boys,
          "train_prov_grls": this.form.value.train_prov_grls,
          "train_cond_by": this.form.value.train_cond_by,
          "train_cond_in": this.form.value.train_cond_in,
          "train_type": this.form.value.train_type,
          "spltrg_py_enrol_b": this.form.value.spltrg_py_enrol_b,
          "spltrg_py_enrol_g": this.form.value.spltrg_py_enrol_g,
          "spltrg_py_prov_b": this.form.value.spltrg_py_prov_b,
          "spltrg_py_prov_g": this.form.value.spltrg_py_prov_g,
          "remedial_tch_enrol": this.form.value.remedial_tch_enrol,
        },
        "schoolnew_safety_details": {
          "school_key_id": this.schoolId,
          "sdmp_dev": this.form.value.sdmp_dev,
          "sturct_saf": this.form.value.sturct_saf,
          "nonsturct_saf": this.form.value.nonsturct_saf,
          "cctv_school": this.form.value.cctv_school,
          "firext_schl": this.form.value.firext_schl,
          "nodtchr_schlsaf": this.form.value.nodtchr_schlsaf,
          "dister_trng": this.form.value.dister_trng,
          "dister_part": this.form.value.dister_part,
          "slfdfse_trng": this.form.value.slfdfse_trng,
          "noslfdfse_trng": this.form.value.noslfdfse_trng,

          "guidline_disply_brd": this.form.value.guidline_disply_brd,
          "grnt_frstlvl_conslrs": this.form.value.grnt_frstlvl_conslrs,
          "guidlins_counsling": this.form.value.guidlins_counsling,
          "sensitiz_parnts": this.form.value.sensitiz_parnts,
          "awrnss_studscomm": this.form.value.awrnss_studscomm,
          "studs_feedbck": this.form.value.studs_feedbck,
          "safty_sugstn": this.form.value.safty_sugstn,
          "copies_studs": this.form.value.copies_studs
        },
        "schoolnew_extracc_entry": this.form.value.clubDetails,
        "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_3": "1" }

      }

      data['schoolnew_dayswork_entry'] = this.form.value.daysHoursInfo.map(item => {
        return {
          school_key_id: item.school_key_id,
          school_type: item.school_type,
          instr_dys: item.instr_dys,
          hrs_chldrn_sty_schl: item.hrs_chldrn_sty_schl,
          mns_chldrn_sty_schl: item.mns_chldrn_sty_schl,
          hrs_tchrs_sty_schl: item.hrs_tchrs_sty_schl,
          mns_tchrs_sty_schl: item.mns_tchrs_sty_schl,
          cce_impl: item.cce_impl,
          cce_cum: item.cce_cum,
          cce_shared: item.cce_shared
        }
      });


      this.schoolService.saveSchoolDetails(data).subscribe(res => {
        if (res.dataStatus) {
          debugger;
          // this.form.reset();
          // "Student registered successfully"
          this.alertService.success("Records Updated Successfully");
          this.getSchoolDetails();
          // this.form.reset();
        }
        else {
          this.alertService.error(res.message);
        }
      });
      console.log(this.form.value);
      debugger;

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


    console.log(data, "testing");

  }
  dataList() {
    this.clubList = [{
      "value": "-1", "label": "Others"
    },
    {
      "value": "0", "label": "Not Applicable"
    },
    {
      "value": "1", "label": "Scouts & Guides"
    },
    {
      "value": "2", "label": "Junior Red Cross"
    },
    {
      "value": "3", "label": "National Service Scheme"
    },
    {
      "value": "4", "label": "National Cadet Corp"
    },
    {
      "value": "5", "label": "Red Ribbon Club"
    },
    {
      "value": "6", "label": "Eco-Club"
    },
    {
      "value": "7", "label": "Clubs"
    },
    ]

    this.month = [
      { "value": "6", "label": "June" },
      { "value": "7", "label": "July" },
      { "value": "8", "label": "August" },
      { "value": "9", "label": "September" },
      { "value": "10", "label": "October" },
      { "value": "11", "label": "November" },
      { "value": "12", "label": "December" },
      { "value": "1", "label": "January" },
      { "value": "2", "label": "February" },
      { "value": "3", "label": "March" },
      { "value": "4", "label": "April" },
      { "value": "5", "label": "May" }
    ];
    this.trainingCondBy = [
      { "value": "1", "label": "School Teachers" },
      { "value": "2", "label": "Specially Engaged Teachers" },
      { "value": "3", "label": "Both the above" },
      { "value": "4", "label": "NGO" },
    ]
    this.trainingLocation = [
      { "value": "1", "label": "School Premises" },
      { "value": "2", "label": "Other than School Premises" },
      { "value": "3", "label": "Both the above" },
    ];
    this.trainingType = [
      { "value": "1", "label": "Residential" },
      { "value": "2", "label": "Non-Residential" },
      { "value": "3", "label": "Both the above" },
    ];
    this.schoolTypes = [
      { "value": "1", "label": "Pre-Primary School" },
      { "value": "2", "label": "Primary School" },
      { "value": "3", "label": "Middle School" },
      { "value": "4", "label": "High School" },
      { "value": "5", "label": "Higher Secondary School" },
      { "value": "6", "label": "Special School" }

    ];
  }

  trainingAttendChange(Value) {
    if (Value == 1) {
      this.form.controls['train_prov_boys'].setValidators(Validators.required);
      this.form.controls['train_prov_grls'].setValidators(Validators.required);
      this.form.controls['train_cond_by'].setValidators(Validators.required);
      this.form.controls['train_cond_in'].setValidators(Validators.required);
      this.form.controls['train_type'].setValidators(Validators.required);
      this.form.controls['spltrg_py_enrol_b'].setValidators(Validators.required);
      this.form.controls['spltrg_py_enrol_g'].setValidators(Validators.required);
      this.form.controls['spltrg_py_prov_b'].setValidators(Validators.required);
      this.form.controls['spltrg_py_prov_g'].setValidators(Validators.required);
    }
    else {
      this.form.controls['train_prov_boys'].setValue("");
      this.form.controls['train_prov_grls'].setValue("");
      this.form.controls['train_cond_by'].setValue("");
      this.form.controls['train_cond_in'].setValue("");
      this.form.controls['train_type'].setValue("");
      this.form.controls['spltrg_py_enrol_b'].setValue("");
      this.form.controls['spltrg_py_enrol_g'].setValue("");
      this.form.controls['spltrg_py_prov_g'].setValue("");
      this.form.controls['spltrg_py_prov_b'].setValue("");
      this.form.controls['train_prov_boys'].setValidators(null);
      this.form.controls['train_prov_grls'].setValidators(null);
      this.form.controls['train_cond_by'].setValidators(null);
      this.form.controls['train_cond_in'].setValidators(null);
      this.form.controls['train_type'].setValidators(null);
      this.form.controls['spltrg_py_enrol_b'].setValidators(null);
      this.form.controls['spltrg_py_enrol_g'].setValidators(null);
      this.form.controls['spltrg_py_prov_b'].setValidators(null);
      this.form.controls['spltrg_py_prov_g'].setValidators(null);
    }
    this.form.controls['train_prov_boys'].updateValueAndValidity();
    this.form.controls['train_prov_grls'].updateValueAndValidity();
    this.form.controls['train_cond_by'].updateValueAndValidity();
    this.form.controls['train_cond_in'].updateValueAndValidity();
    this.form.controls['train_type'].updateValueAndValidity();
    this.form.controls['spltrg_py_enrol_b'].updateValueAndValidity();
    this.form.controls['spltrg_py_enrol_g'].updateValueAndValidity();
    this.form.controls['spltrg_py_prov_b'].updateValueAndValidity();
    this.form.controls['spltrg_py_prov_g'].updateValueAndValidity();
  }

  addDaysEntry() {
    const dayEntryformArray = this.form.controls.daysHoursInfo as FormArray;
    if (dayEntryformArray.length < this.schoolTypes.length) {
      if (this.form.controls.daysHoursInfo.valid) {
        dayEntryformArray.push(this.createDaysEntry());
      }
      else {
        this.dayEntryInvalid = true;
      }

    }


  }
  removedaysEntry() {
    const dayEntryformArray = this.form.controls.daysHoursInfo as FormArray;
    if (dayEntryformArray.length > 0) {
      this.dayEntryInvalid = false;
      dayEntryformArray.removeAt(dayEntryformArray.length - 1);
    }

  }
  createDaysEntry() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      school_type: new FormControl('', Validators.required),
      instr_dys: new FormControl('', Validators.required),
      hrs_chldrn_sty_schl: new FormControl('', Validators.required),
      mns_chldrn_sty_schl: new FormControl('', Validators.required),
      hrs_tchrs_sty_schl: new FormControl('', Validators.required),
      mns_tchrs_sty_schl: new FormControl('', Validators.required),
      cce_impl: new FormControl('', Validators.required),
      cce_cum: new FormControl('', null),
      cce_shared: new FormControl('', null)
    });
  }
  addClubEntry() {
    const clubEntryformArray = this.form.controls.clubDetails as FormArray;
    if (clubEntryformArray.length < this.clubList.length) {
      if (this.form.controls.clubDetails.valid) {
        clubEntryformArray.push(this.createClubEntry());
      }
      else {
        this.clubEntryInvalid = true;
      }

    }

  }
  removeClubEntry() {

    const clubEntryformArray = this.form.controls.clubDetails as FormArray;
    if (clubEntryformArray.length > 0) {
      this.clubEntryInvalid = false;
      clubEntryformArray.removeAt(clubEntryformArray.length - 1);
    }

  }
  createClubEntry() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      extra_cc: new FormControl('', Validators.required),
      other_cc: new FormControl('', null)
    });
  }
  chooseCategory(event, index) {
    var selectedSchoolType = event.value;

    (<FormArray>this.form.controls['daysHoursInfo']).at(index).patchValue({ school_type: '' });
    debugger;
    const checkAvailable = this.form.value.daysHoursInfo.find(x => x.school_type == selectedSchoolType)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");

    }
    else {
      (<FormArray>this.form.controls['daysHoursInfo']).at(index).patchValue({ school_type: selectedSchoolType });
    }

  }
  chooseClub(event, index) {
    var selectedValue = event.value;
    (<FormArray>this.form.controls['clubDetails']).at(index).patchValue({ extra_cc: '' });
    debugger;
    const isAvailableClub = this.form.value.clubDetails.find(x => x.extra_cc == selectedValue)
    if (isAvailableClub) {
      this.alertService.error("Option Already Selected");
      (<FormArray>this.form.controls['clubDetails']).at(index).patchValue({ extra_cc: '' });
    }
    else {
      (<FormArray>this.form.controls['clubDetails']).at(index).patchValue({ extra_cc: selectedValue });
    }
    /* for validator */
    if (selectedValue == -1) {
      this.isShowOthers = true;
      const totalClubRecordsFormArray = this.form.controls.clubDetails as FormArray;
      debugger;
      this.form.controls['clubDetails']['controls'][index].controls['other_cc'].setValidators(Validators.required);


    }
    else {
      this.isShowOthers = false;
      this.form.controls['clubDetails']['controls'][index].controls['other_cc'].setValue("");
      this.form.controls['clubDetails']['controls'][index].controls['other_cc'].setValidators(null);
      // this.form.controls['other_ans'].setValue('');
    }
    this.form.controls['clubDetails']['controls'][index].controls['other_cc'].updateValueAndValidity();

  }
  selectedClubs(event) {
    //  var selectedItem = event.itemValue;
    this.selectedClubsList = event.value;
    debugger;
    var selectedItem = this.selectedClubsList.find(x => x == '-1');

    if (selectedItem == -1) {
      this.isShowOthers = true;
      const totalClubRecordsFormArray = this.form.controls.clubDetails as FormArray;
      debugger;
      this.form.controls['other_ans'].setValidators(Validators.required);

    }
    else {
      this.isShowOthers = false;
      this.form.controls['other_ans'].setValidators(null);
      this.form.controls['other_ans'].setValue('');
    }
    this.form.controls['other_ans'].updateValueAndValidity();
  }
  trainForGirls(value) {
    if (value == 1) {
      this.form.controls['noslfdfse_trng'].setValidators(Validators.required);

    }
    else {
      this.form.controls['noslfdfse_trng'].setValue("");
      this.form.controls['noslfdfse_trng'].setValidators(null);

    }
    this.form.controls['noslfdfse_trng'].updateValueAndValidity();
  }

  allTeachers(value) {
    {
      if (value == 1) {
        this.form.controls['guidlins_counsling'].setValidators(Validators.required);
        this.form.controls['sensitiz_parnts'].setValidators(Validators.required);
        this.form.controls['awrnss_studscomm'].setValidators(Validators.required);
        this.form.controls['studs_feedbck'].setValidators(Validators.required);
        this.form.controls['safty_sugstn'].setValidators(Validators.required);
        this.form.controls['copies_studs'].setValidators(Validators.required);;
      }
      else {
        this.form.controls['guidlins_counsling'].setValue("");
        this.form.controls['guidlins_counsling'].setValidators(null);
        this.form.controls['sensitiz_parnts'].setValue("");
        this.form.controls['sensitiz_parnts'].setValidators(null);
        this.form.controls['awrnss_studscomm'].setValue("");
        this.form.controls['awrnss_studscomm'].setValidators(null);
        this.form.controls['studs_feedbck'].setValue("");
        this.form.controls['studs_feedbck'].setValidators(null);
        this.form.controls['safty_sugstn'].setValue("");
        this.form.controls['safty_sugstn'].setValidators(null);
        this.form.controls['copies_studs'].setValue("");
        this.form.controls['copies_studs'].setValidators(null);
      }
      this.form.controls['guidlins_counsling'].updateValueAndValidity();
      this.form.controls['sensitiz_parnts'].updateValueAndValidity();
      this.form.controls['awrnss_studscomm'].updateValueAndValidity();
      this.form.controls['studs_feedbck'].updateValueAndValidity();
      this.form.controls['safty_sugstn'].updateValueAndValidity();
      this.form.controls['copies_studs'].updateValueAndValidity();
    }
  }

  txtbkRecdYn(value) {
    if (value == 1) {
      this.form.controls['txtbk_recd_mon'].setValidators(Validators.required);

    }
    else {
      this.form.controls['txtbk_recd_mon'].setValue("");
      this.form.controls['txtbk_recd_mon'].setValidators(null);

    }
    this.form.controls['txtbk_recd_mon'].updateValueAndValidity();
  }

  // onFinalSubmit() {
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
  //     accept: () => {
  //       this.submitted = true;
  //       if (this.form.valid) {
  //         var data = {
  //           "schoolnew_academic_detail": this.form.value,
  //           "schoolnew_training_detail": {
  //             "school_key_id": this.schoolId,
  //             "special_train": this.form.value.special_train,
  //             "stu_councel": this.form.value.stu_councel,
  //             "train_prov_boys": this.form.value.train_prov_boys,
  //             "train_prov_grls": this.form.value.train_prov_grls,
  //             "train_cond_by": this.form.value.train_cond_by,
  //             "train_cond_in": this.form.value.train_cond_in,
  //             "train_type": this.form.value.train_type,
  //             "spltrg_py_enrol_b": this.form.value.spltrg_py_enrol_b,
  //             "spltrg_py_enrol_g": this.form.value.spltrg_py_enrol_g,
  //             "spltrg_py_prov_b": this.form.value.spltrg_py_prov_b,
  //             "spltrg_py_prov_g": this.form.value.spltrg_py_prov_g,
  //             "remedial_tch_enrol": this.form.value.remedial_tch_enrol,
  //           },
  //           "schoolnew_safety_details": {
  //             "school_key_id": this.schoolId,
  //             "sdmp_dev": this.form.value.sdmp_dev,
  //             "sturct_saf": this.form.value.sturct_saf,
  //             "nonsturct_saf": this.form.value.nonsturct_saf,
  //             "cctv_school": this.form.value.cctv_school,
  //             "firext_schl": this.form.value.firext_schl,
  //             "nodtchr_schlsaf": this.form.value.nodtchr_schlsaf,
  //             "dister_trng": this.form.value.dister_trng,
  //             "dister_part": this.form.value.dister_part,
  //             "slfdfse_trng": this.form.value.slfdfse_trng,
  //             "noslfdfse_trng": this.form.value.noslfdfse_trng,

  //             "guidline_disply_brd": this.form.value.guidline_disply_brd,
  //             "grnt_frstlvl_conslrs": this.form.value.grnt_frstlvl_conslrs,
  //             "guidlins_counsling": this.form.value.guidlins_counsling,
  //             "sensitiz_parnts": this.form.value.sensitiz_parnts,
  //             "awrnss_studscomm": this.form.value.awrnss_studscomm,
  //             "studs_feedbck": this.form.value.studs_feedbck,
  //             "safty_sugstn": this.form.value.safty_sugstn,
  //             "copies_studs": this.form.value.copies_studs
  //           },
  //           "schoolnew_extracc_entry": this.form.value.clubDetails,
  //           "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_3": "2" }
  //         }
  //         data['schoolnew_dayswork_entry'] = this.form.value.daysHoursInfo.map(item => {
  //           return {
  //             school_key_id: item.school_key_id,
  //             school_type: item.school_type,
  //             instr_dys: item.instr_dys,
  //             hrs_chldrn_sty_schl: item.hrs_chldrn_sty_schl,
  //             mns_chldrn_sty_schl: item.mns_chldrn_sty_schl,
  //             hrs_tchrs_sty_schl: item.hrs_tchrs_sty_schl,
  //             mns_tchrs_sty_schl: item.mns_tchrs_sty_schl,
  //             cce_impl: item.cce_impl,
  //             cce_cum: item.cce_cum,
  //             cce_shared: item.cce_shared
  //           }
  //         });
  //         this.schoolService.saveSchoolDetails(data).subscribe(res => {
  //           if (res.dataStatus) {
  //             this.alertService.success("Records Updated Successfully");
  //             this.getSchoolDetails();
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

