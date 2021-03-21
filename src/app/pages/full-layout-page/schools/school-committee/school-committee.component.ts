import { Component, OnInit, ElementRef } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { schoolsService } from '../schools.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-school-committee',
  templateUrl: './school-committee.component.html',
  styleUrls: ['./school-committee.component.css']
})
export class SchoolCommitteeComponent implements OnInit {
  schoolId: any; schoolTypeId: number;
  schoolBasicDetails: any;
  SchlCommitDrop: any[] = [];
  smcShow = false;
  manageshow = false;
  SMDCfunshow = false;
  constShow = false;
  academicComitshow = false;
  ParentAssocshow = false;
  showbank1 = false;
  bankDetailsShow = false;
  schlCommiteInvalid: boolean;
  SchlCommitINsp: { label: string; value: string; }[];
  SchlinsPurpose: { label: string; value: string; }[];
  totalBooksList: { booksName: string; }[];
  date4: Date;
  invalidDates: Array<Date>;
  // maxDate: any;
  // minDate: Date;
  schoolIdcommit: any;
  schoolTypeIdcomit: number;
  userform: FormGroup;
  public schoolCommiteDetails: any[] = [];
  // tslint:disable-next-line:variable-name
  // public suppliment_prevousyr: string;
  commite: any;
  CommiteDetail: any;
  submitted: boolean;
  smcIfsCode: any[] =[];
  inspection: FormArray;
  smdcIfsCode: any[] = [];
  minDate: Date;

    maxDate: Date;

  // tslint:disable-next-line:max-line-length
  constructor(private userSessionService: UserSessionService,
    private fb: FormBuilder,
    private SchoolsService: schoolsService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private el: ElementRef) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
    this.totalBooksList = [
      { booksName: '' }
    ];

  }

  ngOnInit() {
    debugger
    this.initialValidator();
    this.SchlCommitDropDown();
    this.schoolInspect();
    this.schoolInspectPurpose();
    this.getBasicInfo();
   
    //  this.formvalidation();   
    //this.getCommiteInfo();
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = 0;
    const prevYear = 2018;
    const nextMonth = (month === 11) ? 0 : month;
    const nextYear = (nextMonth === 0) ? year : year;
    this.minDate = new Date();
    this.minDate.setDate(1);
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear); // alert(this.minDate );
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
    const invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];

    this.schoolIdcommit = this.userSessionService.schoolId();
    this.schoolTypeIdcomit = this.userSessionService.schoolTypeId();
    // console.log(this.schoolTypeIdcomit,"Commitieeshcl");

    // let today = new Date();
    //     let month = today.getMonth();
    //     let year = today.getFullYear();
    //     let prevMonth = (month === 0) ? 11 : month -1;
    //     let prevYear = (prevMonth === 11) ? year - 1 : year;
    //     let nextMonth = (month === 11) ? 0 : month + 1;
    //     let nextYear = (nextMonth === 0) ? year + 1 : year;
    //     this.minDate = new Date();
    //     this.minDate.setMonth(prevMonth);
    //     this.minDate.setFullYear(prevYear);
    //     this.maxDate = new Date();
    //     this.maxDate.setMonth(nextMonth);
    //     this.maxDate.setFullYear(nextYear);
    this.userform.controls['txtbk_curyr_pri'].updateValueAndValidity();
  }

  initialValidator() {
    this.userform = this.fb.group({
      'inspection': new FormArray([this.createItem()]),
      'suppliment_prevousyr': new FormControl(null, Validators.required),
      'txtbk_curyr_prepri': new FormControl(null, Validators.required),
      'txtbk_curyr_pri': new FormControl(null, Validators.required),
      'txtbk_curyr_upp': new FormControl(null, Validators.required),
      'txtbk_curyr_sec': new FormControl(null, Validators.required),
      'txtbk_curyr_hsec': new FormControl(null, Validators.required),
      'tle_grade_preprim': new FormControl(null, Validators.required),
      'tle_grade_prim': new FormControl(null, Validators.required),
      'tle_grde_upp': new FormControl(null, Validators.required),
      'tle_grde_sec': new FormControl(null, Validators.required),
      'tle_grde_hsec': new FormControl(null, Validators.required),
      'sports_prepri': new FormControl(null, Validators.required),
      'sports_pri': new FormControl(null, Validators.required),
      'sports_upp': new FormControl(null, Validators.required),
      'sports_sec': new FormControl(null, Validators.required),
      'sports_hsec': new FormControl(null, Validators.required),

      'smc_const': new FormControl(null, Validators.required),
      'smc_tot_mle': new FormControl('', null),
      'smc_tot_fmle': new FormControl('', null),
      'smc_prnts_mle': new FormControl('', null),
      'smc_prnts_fmle': new FormControl('', null),
      'smc_par_sc': new FormControl('', null),
      'smc_par_st': new FormControl('', null),
      'smc_par_ews': new FormControl('', null),
      'smc_par_min': new FormControl('', null),
      'smc_rep_mle': new FormControl('', null),
      'smc_rep_fmle': new FormControl('', null),
      'smc_tch_m': new FormControl('', null),
      'smc_tch_f': new FormControl('', null),
      'smc_trained_m': new FormControl('', null),
      'smc_trained_f': new FormControl('', null),
      'smc_no_prev_acyr': new FormControl('', null),
      'smc_sdp': new FormControl('', null),
      'smc_sep_bnkacc': new FormControl('', null),
      'smc_bnk_nme': new FormControl('', null),
      'smc_bnk_brnch': new FormControl('', null),
      'smc_acc_no': new FormControl('', null),
      'smc_acc_name': new FormControl('', null),
      'smc_ifsc': new FormControl('', null),

      'smdc_smc_same_yn': new FormControl('', null),
      'smdc_constitu': new FormControl('', null),
      'smdc_tot_mle': new FormControl('', null),
      'smdc_tot_fmle': new FormControl('', null),
      'smdc_parnt_mle': new FormControl('', null),
      'smdc_parnt_fmle': new FormControl('', null),
      'smdc_par_ews_m': new FormControl('', null),
      'smdc_par_ews_f': new FormControl('', null),
      'smdc_lb_mle': new FormControl('', null),
      'smdc_lb_fmle': new FormControl('', null),
      'smdc_minori_mle': new FormControl('', null),
      'smdc_minori_fmle': new FormControl('', null),
      'smdc_women': new FormControl('', null),
      'smdc_scst_mle': new FormControl('', null),
      'smdc_scst_fmle': new FormControl('', null),
      'smdc_deo_mle': new FormControl('', null),
      'smdc_deo_fmle': new FormControl('', null),
      'smdc_audit_mle': new FormControl('', null),
      'smdc_audit_fmle': new FormControl('', null),
      'smdc_exprt_mle': new FormControl('', null),
      'smdc_exprt_fmle': new FormControl('', null),
      'smdc_techrs_mle': new FormControl('', null),
      'smdc_techrs_fmle': new FormControl('', null),
      'smdc_hm_mle': new FormControl('', null),
      'smdc_hm_fmle': new FormControl('', null),
      'smdc_prnci_mle': new FormControl('', null),
      'smdc_prnci_fmle': new FormControl('', null),
      'smdc_chair_mle': new FormControl('', null),
      'smdc_chair_fmle': new FormControl('', null),
      'smdc_trained_m': new FormControl('', null),
      'smdc_trained_f': new FormControl('', null),
      'smdc_no_last_acyr': new FormControl('', null),
      'smdc_sip': new FormControl('', null),
      'smdc_sep_bnkacc': new FormControl('', null),
      'smdc_bnk_name': new FormControl('', null),
      'smdc_bnk_brnch': new FormControl('', null),
      'smdc_acc_no': new FormControl('', null),
      'smdc_acc_name': new FormControl('', null),
      'smdc_ifsc': new FormControl('', null),

      'sbc_const': new FormControl(null, Validators.required),

      'sbc_const_year': new FormControl('', null),
      'acadecomm_const': new FormControl(null, Validators.required),

      'acadecomm_year': new FormControl('', null),
      'pta_const': new FormControl(null, Validators.required),

      'pta_no_curyr': new FormControl('', null),
      'pta_est_yr': new FormControl('', null),
      'pta_reg_no': new FormControl('', null),
      'pta_subscri_amt': new FormControl('', null),
      'pta_chair_name': new FormControl('', null),
      'pta_chair_mble': new FormControl('', null),

      'officer_type': new FormControl(null),
      'purpose': new FormControl(null),
      'date_inspect': new FormControl(null),
      'smc_weakr_fmle': new FormControl("", null),
      'smc_weakr_mle': new FormControl("", null),
      'smc_const_yr': new FormControl("", null),
      'smc_chair_name': new FormControl("", null),
      'smc_chair_mble': new FormControl("", null),
      'smdcparents_belong': new FormControl("", null),
      'smdc_const_yr': new FormControl("", null),
      'smdc_contrib_amt': new FormControl("", null),
      'smdc_chair_name': new FormControl("", null),
      'smdc_chair_mble': new FormControl('', null),
    });
  }

  SchlCommitDropDown() {
    this.SchlCommitDrop = [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '2' },
      { label: 'Not Applicable', value: '0' },
    ];
  }
  schoolInspect() {
    this.SchlCommitINsp = [
      { label: 'CEO', value: '1' },
      { label: 'DEO', value: '2' },
      { label: 'BEO/BRC', value: '3' },
      { label: 'DDRO', value: '4' },
      { label: 'Educational Officer(Corporation)', value: '5' },
      { label: 'Asst. Educational Officer(Corporation)', value: '6' },
      { label: 'CRC', value: '7' },
      { label: 'Not Applicable', value: '0' },
    ];
  }
  schoolInspectPurpose() {
    this.SchlinsPurpose = [
      { label: 'Audit', value: '1' },
      { label: 'Academic', value: '2' },
      { label: 'Non-Academic', value: '3' },
    ];
  }

  getBasicInfo() {
    debugger;
    this.SchoolsService.getschoolDetails(this.schoolId, true).subscribe(data => {
      this.schoolBasicDetails = data.result.schoolinfo;
      this.userform.patchValue(this.schoolBasicDetails);
      console.log(this.schoolBasicDetails);
      this.getMediumInstruction(data.result.schoolinfo);
      // this.SCHOOLMANAGEMENTCOMMITTEE(this.userform.value.smc_const);
      // this.SchoolManagementCommittees(this.userform.value.smdc_smc_same_yn);
      // this.SchoolDevelopmentCommittee(this.userform.value.smdc_constitu);
      // this.SchoolBuildingCommittee(this.userform.value.sbc_const);
      // if(this.userform.value.smc_ifsc)
      // {
      //   this.getBankDetailsforSmc(this.userform.value.smc_ifsc)
      // }
      // if(this.userform.value.smdc_ifsc)
      // {
      //   this.getBankDetailsforSmdc(this.userform.value.smdc_ifsc)
      // }
    });
  }
  //  // tslint:disable-next-line:variable-name
  // addElement(officer000_0, officer00_0, datefn) {
  //   console.log(officer000_0,"testing");
  //   if (officer000_0 !== '' && officer00_0 !== '' && datefn !== '' ) {
  //    const newBooksList = { booksName : '' };
  //    this.totalBooksList.push(newBooksList);
  //   } else {
  //    const newBooksList = { booksName : '' };
  //    // alert('All Values Are Required!');
  //    this.alertService.error("All Values Are Required!");
  //   }
  //
  //  }
  //  removeElement(indexValue) {
  //    if (this.totalBooksList.length > 1) {
  //      const newBooksList = [];
  //      this.totalBooksList.forEach((field, index) => {
  //          if (index !== indexValue) {
  //              newBooksList.push(field);
  //            }
  //          this.totalBooksList = newBooksList;
  //      });
  //    }
  //  }
  // smc(values) {
  //   if (values === 1) {
  //     this.smcShow = true;
  //   } else {
  //     this.smcShow = false;
  //     this.showbank1 = false;
  //   }
  // }
  // bankAct1(val) {
  //   if (val === 1) {
  //     this.showbank1 = true;
  //   } else {
  //     this.showbank1 = false;
  //   }
  // }

  // 2
  // SMDCfun(val1) {
  //   if (val1 === 2) {
  //     this.SMDCfunshow = true;
  //   } else {
  //     this.SMDCfunshow = false;
  //     this.manageshow = false;
  //   }
  // }
  // ScholManage(vals) {
  //   if (vals === 1) {
  //     this.manageshow = true;
  //   } else {
  //     this.manageshow = false;
  //   }
  // }
  // bankDetails(val2) {
  //   if (val2 === 1) {
  //     this.bankDetailsShow = true;
  //   } else {
  //     this.bankDetailsShow = false;
  //   }
  // }
  // 3
  // smcConst(indexval) {
  //   if (indexval === 1) {
  //     this.constShow = true;
  //   } else {
  //     this.constShow = false;
  //   }
  // }
  // 4
  // academicComit(indexval1) {
  //   if (indexval1 === 1) {
  //     this.academicComitshow = true;
  //   } else {
  //     this.academicComitshow = false;
  //   }
  // }
  // 5
  // ParentAssoc(indexval2) {
  //   if (indexval2 === 1) {
  //     this.ParentAssocshow = true;
  //   } else {
  //     this.ParentAssocshow = false;
  //   }
  // }


  // If yes show validation

  ParentTeacherAssoc(value) {
    if (value == 1) {
      this.userform.controls['pta_no_curyr'].setValidators(Validators.required);
      this.userform.controls['pta_est_yr'].setValidators(Validators.required);
      this.userform.controls['pta_reg_no'].setValidators(Validators.required);
      this.userform.controls['pta_subscri_amt'].setValidators(Validators.required);
      this.userform.controls['pta_chair_name'].setValidators(Validators.required);
      this.userform.controls['pta_chair_mble'].setValidators(Validators.required);
    }
    else {
      this.userform.controls['pta_no_curyr'].setValue("");
      this.userform.controls['pta_no_curyr'].setValidators(null);
      this.userform.controls['pta_est_yr'].setValue("");
      this.userform.controls['pta_est_yr'].setValidators(null);
      this.userform.controls['pta_reg_no'].setValue("");
      this.userform.controls['pta_reg_no'].setValidators(null);
      this.userform.controls['pta_subscri_amt'].setValue("");
      this.userform.controls['pta_subscri_amt'].setValidators(null);
      this.userform.controls['pta_chair_name'].setValue("");
      this.userform.controls['pta_chair_name'].setValidators(null);
      this.userform.controls['pta_chair_mble'].setValue("");
      this.userform.controls['pta_chair_mble'].setValidators(null);

    }
    this.userform.controls['pta_no_curyr'].updateValueAndValidity();
    this.userform.controls['pta_est_yr'].updateValueAndValidity();
    this.userform.controls['pta_reg_no'].updateValueAndValidity();
    this.userform.controls['pta_subscri_amt'].updateValueAndValidity();
    this.userform.controls['pta_chair_name'].updateValueAndValidity();
    this.userform.controls['pta_chair_mble'].updateValueAndValidity();
  }

  // Academic Committee

  AcademicCommittee(value) {
    console.log(this.userform.controls['acadecomm_year'], '------->')

    if (value == 1) {
      this.userform.controls['acadecomm_year'].setValidators(Validators.required);

    }
    else {
      this.userform.controls['acadecomm_year'].setValue("");
      this.userform.controls['acadecomm_year'].setValidators(null);

    }
    this.userform.controls['acadecomm_year'].updateValueAndValidity();
  }

  // School Building Committee

  SchoolBuildingCommittee(value) {
    if (value == 1) {
      this.userform.controls['sbc_const_year'].setValidators(Validators.required);

    }
    else {
      this.userform.controls['sbc_const_year'].setValue("");
      this.userform.controls['sbc_const_year'].setValidators(null);

    }
    this.userform.controls['sbc_const_year'].updateValueAndValidity();
  }

  SchoolManagementCommittees(value) {
    if (value == 2) {
      this.userform.controls['smdc_constitu'].setValidators(Validators.required);

    }
    else {
      this.userform.controls['smdc_constitu'].setValue("");
      this.userform.controls['smdc_constitu'].setValidators(null);

    }
    this.userform.controls['smdc_constitu'].updateValueAndValidity();
  }

  // School Management and Development Committee

  SchoolDevelopmentCommittee(value) {
    if (value === 1) {
      this.userform.controls['smdc_tot_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_tot_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_parnt_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_parnt_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_par_ews_m'].setValidators(Validators.required);
      this.userform.controls['smdc_par_ews_f'].setValidators(Validators.required);
      this.userform.controls['smdc_lb_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_lb_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_minori_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_minori_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_women'].setValidators(Validators.required);
      this.userform.controls['smdc_scst_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_scst_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_deo_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_deo_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_audit_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_audit_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_exprt_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_exprt_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_techrs_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_techrs_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_hm_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_hm_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_prnci_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_prnci_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_chair_mle'].setValidators(Validators.required);
      this.userform.controls['smdc_chair_fmle'].setValidators(Validators.required);
      this.userform.controls['smdc_trained_m'].setValidators(Validators.required);
      this.userform.controls['smdc_trained_f'].setValidators(Validators.required);
      this.userform.controls['smdcparents_belong'].setValidators(Validators.required);
      this.userform.controls['smdc_const_yr'].setValidators(Validators.required);
      this.userform.controls['smdc_no_last_acyr'].setValidators(Validators.required);
      this.userform.controls['smdc_sip'].setValidators(Validators.required);
      this.userform.controls['smdc_sep_bnkacc'].setValidators(Validators.required);
      this.userform.controls['smdc_contrib_amt'].setValidators(Validators.required);
      this.userform.controls['smdc_chair_name'].setValidators(Validators.required);
      this.userform.controls['smdc_chair_mble'].setValidators(Validators.required);
    } else {
      this.userform.controls['smdc_tot_mle'].setValue("");
      this.userform.controls['smdc_tot_fmle'].setValue("");
      this.userform.controls['smdc_parnt_mle'].setValue("");
      this.userform.controls['smdc_parnt_fmle'].setValue("");
      this.userform.controls['smdc_par_ews_m'].setValue("");
      this.userform.controls['smdc_par_ews_f'].setValue("");
      this.userform.controls['smdc_lb_mle'].setValue("");
      this.userform.controls['smdc_lb_fmle'].setValue("");
      this.userform.controls['smdc_minori_mle'].setValue("");
      this.userform.controls['smdc_minori_fmle'].setValue("");
      this.userform.controls['smdc_women'].setValue("");
      this.userform.controls['smdc_scst_mle'].setValue("");
      this.userform.controls['smdc_scst_fmle'].setValue("");
      this.userform.controls['smdc_deo_mle'].setValue("");
      this.userform.controls['smdc_deo_fmle'].setValue("");
      this.userform.controls['smdc_audit_mle'].setValue("");
      this.userform.controls['smdc_audit_fmle'].setValue("");
      this.userform.controls['smdc_exprt_mle'].setValue("");
      this.userform.controls['smdc_exprt_fmle'].setValue("");
      this.userform.controls['smdc_techrs_mle'].setValue("");
      this.userform.controls['smdc_techrs_fmle'].setValue("");
      this.userform.controls['smdc_hm_mle'].setValue("");
      this.userform.controls['smdc_hm_fmle'].setValue("");
      this.userform.controls['smdc_prnci_mle'].setValue("");
      this.userform.controls['smdc_prnci_fmle'].setValue("");
      this.userform.controls['smdc_chair_mle'].setValue("");
      this.userform.controls['smdc_chair_fmle'].setValue("");
      this.userform.controls['smdc_trained_m'].setValue("");
      this.userform.controls['smdc_trained_f'].setValue("");
      this.userform.controls['smdcparents_belong'].setValue("");
      this.userform.controls['smdc_const_yr'].setValue("");
      this.userform.controls['smdc_no_last_acyr'].setValue("");
      this.userform.controls['smdc_sip'].setValue("");
      this.userform.controls['smdc_sep_bnkacc'].setValue("");
      this.userform.controls['smdc_contrib_amt'].setValue("");
      this.userform.controls['smdc_chair_name'].setValue("");
      this.userform.controls['smdc_chair_mble'].setValue("");
      this.userform.controls['smdc_tot_mle'].setValidators(null);
      this.userform.controls['smdc_tot_fmle'].setValidators(null);
      this.userform.controls['smdc_parnt_mle'].setValidators(null);
      this.userform.controls['smdc_parnt_fmle'].setValidators(null);
      this.userform.controls['smdc_par_ews_m'].setValidators(null);
      this.userform.controls['smdc_par_ews_f'].setValidators(null);
      this.userform.controls['smdc_lb_mle'].setValidators(null);
      this.userform.controls['smdc_lb_fmle'].setValidators(null);
      this.userform.controls['smdc_minori_mle'].setValidators(null);
      this.userform.controls['smdc_minori_fmle'].setValidators(null);
      this.userform.controls['smdc_women'].setValidators(null);
      this.userform.controls['smdc_scst_mle'].setValidators(null);
      this.userform.controls['smdc_scst_fmle'].setValidators(null);
      this.userform.controls['smdc_deo_mle'].setValidators(null);
      this.userform.controls['smdc_deo_fmle'].setValidators(null);
      this.userform.controls['smdc_audit_mle'].setValidators(null);
      this.userform.controls['smdc_audit_fmle'].setValidators(null);
      this.userform.controls['smdc_exprt_mle'].setValidators(null);
      this.userform.controls['smdc_exprt_fmle'].setValidators(null);
      this.userform.controls['smdc_techrs_mle'].setValidators(null);
      this.userform.controls['smdc_techrs_fmle'].setValidators(null);
      this.userform.controls['smdc_hm_mle'].setValidators(null);
      this.userform.controls['smdc_hm_fmle'].setValidators(null);
      this.userform.controls['smdc_prnci_mle'].setValidators(null);
      this.userform.controls['smdc_prnci_fmle'].setValidators(null);
      this.userform.controls['smdc_chair_mle'].setValidators(null);
      this.userform.controls['smdc_chair_fmle'].setValidators(null);
      this.userform.controls['smdc_trained_m'].setValidators(null);
      this.userform.controls['smdc_trained_f'].setValidators(null);
      this.userform.controls['smdcparents_belong'].setValidators(null);
      this.userform.controls['smdc_const_yr'].setValidators(null);
      this.userform.controls['smdc_no_last_acyr'].setValidators(null);
      this.userform.controls['smdc_sip'].setValidators(null);
      this.userform.controls['smdc_sep_bnkacc'].setValidators(null);
      this.userform.controls['smdc_contrib_amt'].setValidators(null);
      this.userform.controls['smdc_chair_name'].setValidators(null);
      this.userform.controls['smdc_chair_mble'].setValidators(null);

    }
    this.userform.controls['smdc_tot_mle'].updateValueAndValidity();
    this.userform.controls['smdc_tot_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_parnt_mle'].updateValueAndValidity();
    this.userform.controls['smdc_parnt_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_par_ews_m'].updateValueAndValidity();
    this.userform.controls['smdc_par_ews_f'].updateValueAndValidity();
    this.userform.controls['smdc_lb_mle'].updateValueAndValidity();
    this.userform.controls['smdc_lb_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_minori_mle'].updateValueAndValidity();
    this.userform.controls['smdc_minori_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_women'].updateValueAndValidity();
    this.userform.controls['smdc_scst_mle'].updateValueAndValidity();
    this.userform.controls['smdc_scst_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_deo_mle'].updateValueAndValidity();
    this.userform.controls['smdc_deo_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_audit_mle'].updateValueAndValidity();
    this.userform.controls['smdc_audit_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_exprt_mle'].updateValueAndValidity();
    this.userform.controls['smdc_exprt_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_techrs_mle'].updateValueAndValidity();
    this.userform.controls['smdc_techrs_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_hm_mle'].updateValueAndValidity();
    this.userform.controls['smdc_hm_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_prnci_mle'].updateValueAndValidity();
    this.userform.controls['smdc_prnci_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_chair_mle'].updateValueAndValidity();
    this.userform.controls['smdc_chair_fmle'].updateValueAndValidity();
    this.userform.controls['smdc_trained_m'].updateValueAndValidity();
    this.userform.controls['smdc_trained_f'].updateValueAndValidity();
    this.userform.controls['smdcparents_belong'].updateValueAndValidity();
    this.userform.controls['smdc_const_yr'].updateValueAndValidity();
    this.userform.controls['smdc_no_last_acyr'].updateValueAndValidity();
    this.userform.controls['smdc_sip'].updateValueAndValidity();
    this.userform.controls['smdc_sep_bnkacc'].updateValueAndValidity();
    this.userform.controls['smdc_contrib_amt'].updateValueAndValidity();
    this.userform.controls['smdc_chair_name'].updateValueAndValidity();
    this.userform.controls['smdc_chair_mble'].updateValueAndValidity();
  }



  BankAccountDetails(value) {
    if (value == 1) {
      this.userform.controls['smdc_bnk_name'].setValidators(Validators.required);
      this.userform.controls['smdc_bnk_brnch'].setValidators(Validators.required);
      this.userform.controls['smdc_acc_no'].setValidators(Validators.required);
      this.userform.controls['smdc_acc_name'].setValidators(Validators.required);
      this.userform.controls['smdc_ifsc'].setValidators(Validators.required);

    }
    else {
      this.userform.controls['smdc_bnk_name'].setValue("");
      this.userform.controls['smdc_bnk_name'].setValidators(null);
      this.userform.controls['smdc_bnk_brnch'].setValue("");
      this.userform.controls['smdc_bnk_brnch'].setValidators(null);
      this.userform.controls['smdc_acc_no'].setValue("");
      this.userform.controls['smdc_acc_no'].setValidators(null);
      this.userform.controls['smdc_acc_name'].setValue("");
      this.userform.controls['smdc_acc_name'].setValidators(null);
      this.userform.controls['smdc_ifsc'].setValue("");
      this.userform.controls['smdc_ifsc'].setValidators(null);

    }
    this.userform.controls['smdc_bnk_name'].updateValueAndValidity();
    this.userform.controls['smdc_bnk_brnch'].updateValueAndValidity();
    this.userform.controls['smdc_acc_no'].updateValueAndValidity();
    this.userform.controls['smdc_acc_name'].updateValueAndValidity();
    this.userform.controls['smdc_ifsc'].updateValueAndValidity();
  }

  SCHOOLMANAGEMENTCOMMITTEE(value) {

    if (value == 1) {
      console.log(value)
      this.userform.controls['smc_tot_mle'].setValidators(Validators.required);
      this.userform.controls['smc_tot_fmle'].setValidators(Validators.required);
      this.userform.controls['smc_prnts_mle'].setValidators(Validators.required);
      this.userform.controls['smc_prnts_fmle'].setValidators(Validators.required);
      this.userform.controls['smc_par_sc'].setValidators(Validators.required);
      this.userform.controls['smc_par_st'].setValidators(Validators.required);
      this.userform.controls['smc_par_ews'].setValidators(Validators.required);
      this.userform.controls['smc_par_min'].setValidators(Validators.required);
      this.userform.controls['smc_rep_mle'].setValidators(Validators.required);
      this.userform.controls['smc_rep_fmle'].setValidators(Validators.required);
      this.userform.controls['smc_tch_m'].setValidators(Validators.required);
      this.userform.controls['smc_tch_f'].setValidators(Validators.required);
      this.userform.controls['smc_trained_m'].setValidators(Validators.required);
      this.userform.controls['smc_trained_f'].setValidators(Validators.required);
      this.userform.controls['smc_no_prev_acyr'].setValidators(Validators.required);
      this.userform.controls['smc_sdp'].setValidators(Validators.required);
      this.userform.controls['smc_sep_bnkacc'].setValidators(Validators.required);
      this.userform.controls['smc_weakr_mle'].setValidators(Validators.required);
      this.userform.controls['smc_weakr_fmle'].setValidators(Validators.required);
      this.userform.controls['smc_const_yr'].setValidators(Validators.required);
      this.userform.controls['smc_chair_name'].setValidators(Validators.required);
      this.userform.controls['smc_chair_mble'].setValidators(Validators.required);

    }
    else {
      console.log(value, 'test2')
      this.userform.controls['smc_tot_mle'].setValue("");
      this.userform.controls['smc_tot_fmle'].setValue("");
      this.userform.controls['smc_prnts_mle'].setValue("");
      this.userform.controls['smc_prnts_fmle'].setValue("");
      this.userform.controls['smc_par_sc'].setValue("");
      this.userform.controls['smc_par_st'].setValue("");
      this.userform.controls['smc_par_ews'].setValue("");
      this.userform.controls['smc_par_min'].setValue("");
      this.userform.controls['smc_rep_mle'].setValue("");
      this.userform.controls['smc_rep_fmle'].setValue("");
      this.userform.controls['smc_tch_m'].setValue("");
      this.userform.controls['smc_tch_f'].setValue("");
      this.userform.controls['smc_trained_m'].setValue("");
      this.userform.controls['smc_trained_f'].setValue("");
      this.userform.controls['smc_no_prev_acyr'].setValue("");
      this.userform.controls['smc_sdp'].setValue("");
      this.userform.controls['smc_sep_bnkacc'].setValue("");
      this.userform.controls['smc_weakr_mle'].setValue("");
      this.userform.controls['smc_weakr_fmle'].setValue("");
      this.userform.controls['smc_const_yr'].setValue("");
      this.userform.controls['smc_chair_name'].setValue("");
      this.userform.controls['smc_chair_mble'].setValue("");
      this.userform.controls['smc_tot_mle'].setValidators(null);
      this.userform.controls['smc_tot_fmle'].setValidators(null);
      this.userform.controls['smc_prnts_mle'].setValidators(null);
      this.userform.controls['smc_prnts_fmle'].setValidators(null);
      this.userform.controls['smc_par_sc'].setValidators(null);
      this.userform.controls['smc_par_st'].setValidators(null);
      this.userform.controls['smc_par_ews'].setValidators(null);
      this.userform.controls['smc_par_min'].setValidators(null);
      this.userform.controls['smc_rep_mle'].setValidators(null);
      this.userform.controls['smc_rep_fmle'].setValidators(null);
      this.userform.controls['smc_tch_m'].setValidators(null);
      this.userform.controls['smc_tch_f'].setValidators(null);
      this.userform.controls['smc_trained_m'].setValidators(null);
      this.userform.controls['smc_trained_f'].setValidators(null);
      this.userform.controls['smc_no_prev_acyr'].setValidators(null);
      this.userform.controls['smc_sdp'].setValidators(null);
      this.userform.controls['smc_sep_bnkacc'].setValidators(null);
      this.userform.controls['smc_weakr_mle'].setValidators(null);
      this.userform.controls['smc_weakr_fmle'].setValidators(null);
      this.userform.controls['smc_const_yr'].setValidators(null);
      this.userform.controls['smc_chair_name'].setValidators(null);
      this.userform.controls['smc_chair_mble'].setValidators(null);

    }
    console.log(value, 'test3')
    this.userform.controls['smc_tot_mle'].updateValueAndValidity();
    this.userform.controls['smc_tot_fmle'].updateValueAndValidity();
    this.userform.controls['smc_prnts_mle'].updateValueAndValidity();
    this.userform.controls['smc_prnts_fmle'].updateValueAndValidity();
    this.userform.controls['smc_par_sc'].updateValueAndValidity();
    this.userform.controls['smc_par_st'].updateValueAndValidity();
    this.userform.controls['smc_par_ews'].updateValueAndValidity();
    this.userform.controls['smc_par_min'].updateValueAndValidity();
    this.userform.controls['smc_rep_mle'].updateValueAndValidity();
    this.userform.controls['smc_rep_fmle'].updateValueAndValidity();
    this.userform.controls['smc_tch_m'].updateValueAndValidity();
    this.userform.controls['smc_tch_f'].updateValueAndValidity();
    this.userform.controls['smc_trained_m'].updateValueAndValidity();
    this.userform.controls['smc_trained_f'].updateValueAndValidity();
    this.userform.controls['smc_no_prev_acyr'].updateValueAndValidity();
    this.userform.controls['smc_sdp'].updateValueAndValidity();
    this.userform.controls['smc_sep_bnkacc'].updateValueAndValidity();
    this.userform.controls['smc_weakr_mle'].updateValueAndValidity();
    this.userform.controls['smc_weakr_fmle'].updateValueAndValidity();
    this.userform.controls['smc_const_yr'].updateValueAndValidity();
    this.userform.controls['smc_chair_name'].updateValueAndValidity();
    this.userform.controls['smc_chair_mble'].updateValueAndValidity();
  }

  SeparateBankAccountSMC(value) {
    if (value == 1) {
      this.userform.controls['smc_bnk_nme'].setValidators(Validators.required);
      this.userform.controls['smc_bnk_brnch'].setValidators(Validators.required);
      this.userform.controls['smc_acc_no'].setValidators(Validators.required);
      this.userform.controls['smc_acc_name'].setValidators(Validators.required);
      this.userform.controls['smc_ifsc'].setValidators(Validators.required);
    }
    else {
      this.userform.controls['smc_bnk_nme'].setValue("");
      this.userform.controls['smc_bnk_nme'].setValidators(null);
      this.userform.controls['smc_bnk_brnch'].setValue("");
      this.userform.controls['smc_bnk_brnch'].setValidators(null);
      this.userform.controls['smc_acc_no'].setValue("");
      this.userform.controls['smc_acc_no'].setValidators(null);
      this.userform.controls['smc_acc_name'].setValue("");
      this.userform.controls['smc_acc_name'].setValidators(null);
      this.userform.controls['smc_ifsc'].setValue("");
      this.userform.controls['smc_ifsc'].setValidators(null);

    }
    this.userform.controls['smc_bnk_nme'].updateValueAndValidity();
    this.userform.controls['smc_bnk_brnch'].updateValueAndValidity();
    this.userform.controls['smc_acc_no'].updateValueAndValidity();
    this.userform.controls['smc_acc_name'].updateValueAndValidity();
    this.userform.controls['smc_ifsc'].updateValueAndValidity();
  }

  // If yes show validation

  // mobile validation
  // mobilevalid(mob){
  //   alert(mob);
  // }


  
  


  save() {
    // console.log(this.userform.value, 'test')
    debugger;
    this.submitted = true;
    var data = {
      "schoolnew_committee_detail": {
        "school_key_id": this.schoolId,
        "suppliment_prevousyr": this.userform.value.suppliment_prevousyr,
        "smc_const": this.userform.value.smc_const,
        "smc_tot_mle": this.userform.value.smc_tot_mle,
        "smc_tot_fmle": this.userform.value.smc_tot_fmle,
        "smc_prnts_mle": this.userform.value.smc_prnts_mle,
        "smc_prnts_fmle": this.userform.value.smc_prnts_fmle,
        "smc_rep_mle": this.userform.value.smc_rep_mle,
        "smc_rep_fmle": this.userform.value.smc_rep_fmle,
        "smc_tch_m": this.userform.value.smc_tch_m,
        "smc_tch_f": this.userform.value.smc_tch_f,
        "smc_trained_m": this.userform.value.smc_trained_m,
        "smc_trained_f": this.userform.value.smc_trained_f,
        "smc_no_prev_acyr": this.userform.value.smc_no_prev_acyr,
        "smc_sdp": this.userform.value.smc_sdp,
        "smc_sep_bnkacc": this.userform.value.smc_sep_bnkacc,
        "smc_bnk_nme": this.userform.value.smc_bnk_nme,
        "smc_bnk_brnch": this.userform.value.smc_bnk_brnch,
        "smc_acc_no": this.userform.value.smc_acc_no,
        "smc_acc_name": this.userform.value.smc_acc_name,
        "smc_ifsc": this.userform.value.smc_ifsc,
        "smc_chair_name": this.userform.value.smc_chair_name,
        "smc_chair_mble": this.userform.value.smc_chair_mble, 
        "smdc_smc_same_yn": this.userform.value.smdc_smc_same_yn,
        "smdc_constitu": this.userform.value.smdc_constitu,
        "smdc_tot_mle": this.userform.value.smdc_tot_mle,
        "smdc_tot_fmle": this.userform.value.smdc_tot_fmle,
        "smdc_parnt_mle": this.userform.value.smdc_parnt_mle,
        "smdc_parnt_fmle": this.userform.value.smdc_parnt_fmle,
        "smdc_par_ews_m": this.userform.value.smdc_par_ews_m,
        "smdc_par_ews_f": this.userform.value.smdc_par_ews_f,
        "smdc_lb_mle": this.userform.value.smdc_lb_mle,
        "smdc_lb_fmle": this.userform.value.smdc_lb_fmle,
        "smdc_minori_mle": this.userform.value.smdc_minori_mle,
        "smdc_minori_fmle": this.userform.value.smdc_minori_fmle,
        "smdc_women": this.userform.value.smdc_women,
        "smdc_scst_mle": this.userform.value.smdc_scst_mle,
        "smdc_scst_fmle": this.userform.value.smdc_scst_fmle,
        "smdc_deo_mle": this.userform.value.smdc_deo_mle,
        "smdc_deo_fmle": this.userform.value.smdc_deo_fmle,
        "smdc_audit_mle": this.userform.value.smdc_audit_mle,
        "smdc_audit_fmle": this.userform.value.smdc_audit_fmle,
        "smdc_exprt_mle": this.userform.value.smdc_exprt_mle,
        "smdc_exprt_fmle": this.userform.value.smdc_exprt_fmle,
        "smdc_techrs_mle": this.userform.value.smdc_techrs_mle,
        "smdc_techrs_fmle": this.userform.value.smdc_techrs_fmle,
        "smdc_hm_mle": this.userform.value.smdc_hm_mle,
        "smdc_hm_fmle": this.userform.value.smdc_hm_fmle,
        "smdc_prnci_mle": this.userform.value.smdc_prnci_mle,
        "smdc_prnci_fmle": this.userform.value.smdc_prnci_fmle,
        "smdc_chair_mle": this.userform.value.smdc_chair_mle,
        "smdc_chair_fmle": this.userform.value.smdc_chair_fmle,
        "smdc_trained_m": this.userform.value.smdc_trained_m,
        "smdc_trained_f": this.userform.value.smdc_trained_f,

        "smdc_no_last_acyr": this.userform.value.smdc_no_last_acyr,
        "smdc_sip": this.userform.value.smdc_sip,
        "smdc_sep_bnkacc": this.userform.value.smdc_sep_bnkacc,
        "smdc_bnk_name": this.userform.value.smdc_bnk_name,
        "smdc_bnk_brnch": this.userform.value.smdc_bnk_brnch,
        "smdc_acc_no": this.userform.value.smdc_acc_no,
        "smdc_acc_name": this.userform.value.smdc_acc_name,
        "smdc_ifsc": this.userform.value.smdc_ifsc,

        "sbc_const": this.userform.value.sbc_const,
        "sbc_const_year": this.userform.value.sbc_const_year,
        "acadecomm_const": this.userform.value.acadecomm_const,
        "acadecomm_year": this.userform.value.acadecomm_year,
        "pta_const": this.userform.value.pta_const,
        "pta_no_curyr": this.userform.value.pta_no_curyr,
        "pta_est_yr": this.userform.value.pta_est_yr,
        "pta_reg_no": this.userform.value.pta_reg_no,
        "pta_subscri_amt": this.userform.value.pta_subscri_amt,
        "pta_chair_name": this.userform.value.pta_chair_name,
        "pta_chair_mble": this.userform.value.pta_chair_mble,
        "smc_par_sc": this.userform.value.smc_par_sc,
        "smc_par_st": this.userform.value.smc_par_st,
        "smc_par_ews": this.userform.value.smc_par_ews,
        "smc_par_min": this.userform.value.smc_par_min,
        "smdc_contrib_amt": this.userform.value.smdc_contrib_amt,
        "smdc_chair_name": this.userform.value.smdc_chair_name,
        "smdc_chair_mble": this.userform.value.smdc_chair_mble,
        "smdcparents_belong": this.userform.value.smdcparents_belong,
        "smdc_const_yr": this.userform.value.smdc_const_yr,
        "smc_const_yr": this.userform.value.smc_const_yr,
        "smc_weakr_mle": this.userform.value.smc_weakr_mle,
        "smc_weakr_fmle": this.userform.value.smc_weakr_fmle
      },
      "schoolnew_textbook_detail": {
        "school_key_id": this.schoolId,
        "txtbk_curyr_prepri": this.userform.value.txtbk_curyr_prepri,
        "txtbk_curyr_pri": this.userform.value.txtbk_curyr_pri,
        "txtbk_curyr_upp": this.userform.value.txtbk_curyr_upp,
        "txtbk_curyr_sec": this.userform.value.txtbk_curyr_sec,
        "txtbk_curyr_hsec": this.userform.value.txtbk_curyr_hsec,
        "tle_grade_preprim": this.userform.value.tle_grade_preprim,
        "tle_grade_prim": this.userform.value.tle_grade_prim,
        "tle_grde_upp": this.userform.value.tle_grde_upp,
        "tle_grde_sec": this.userform.value.tle_grde_sec,
        "tle_grde_hsec": this.userform.value.tle_grde_hsec,
        "sports_prepri": this.userform.value.sports_prepri,
        "sports_pri": this.userform.value.sports_pri,
        "sports_upp": this.userform.value.sports_upp,
        'sports_sec': this.userform.value.sports_sec,
        "sports_hsec": this.userform.value.sports_hsec,
      },
      "schoolnew_inspection_entry": this.userform.value.inspection,
      "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_4": "1" }
    };
    console.log(this.userform);
    debugger;
    if (this.userform.valid) {
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
      // this.validateAllFormFields(this.userform);
      for (const key of Object.keys(this.userform.controls)) {
        if (this.userform.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys', key);
          // invalidControl.focus();
           break;
        }
      }
      this.alertService.error('Please Fill All Mandatory Fields');
      //return true;
    }

  }

  getCommiteInfo() {
    this.SchoolsService.getSchoolDetailsData(this.commite).subscribe((res) => {

      this.schoolCommiteDetails = res.result.schoolinfo; console.log(this.schoolCommiteDetails, "123");
      // this.userform.controls['txtbk_curyr_pri'].setValue('1');
      this.userform.patchValue(this.schoolCommiteDetails);
      // @ts-ignore
      this.CommiteDetail = this.schoolCommiteDetails.txtbk_curyr_prepri;
    });

  }

  // ** ⇒  validate all form group and form array fields ** //
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

  // IFSC Code Validation
  getBankDetailsforSmc(value) {
    debugger;
      var searchedIfsCode = value;
      
      // this.SchoolsService.getIFSCCodeDetails(searchedIfsCode).subscribe((res) => {
      //   if(res.length > 0)
      //   {
      //     this.smcIfsCode = res;
      //     var bankName= this.smcIfsCode[0].bank_name; 
      //     var branchName= this.smcIfsCode[0].branch; 
      //     this.userform.controls['smc_bnk_nme'].setValue(bankName);
      //     this.userform.controls['smc_bnk_brnch'].setValue(branchName);
      //   }
      //   else {
      //     this.alertService.error("Invalid IFS Code");
      //     this.userform.controls['smc_bnk_nme'].setValue("");
      //     this.userform.controls['smc_bnk_brnch'].setValue("");
      //   }
       
      // })
  }
  getBankDetailsforSmdc(value) {
    var searchedIfsCode = value;
      
    // this.SchoolsService.getIFSCCodeDetails(searchedIfsCode).subscribe((res) => {
    //   if(res.length > 0)
    //   {
    //     this.smdcIfsCode = res;
    //     var bankName= this.smdcIfsCode[0].bank_name; 
    //     var branchName= this.smdcIfsCode[0].branch; 
    //     this.userform.controls['smdc_bnk_name'].setValue(bankName);
    //     this.userform.controls['smdc_bnk_brnch'].setValue(branchName);
    //   }
    //   else {
    //     this.alertService.error("Invalid IFS Code");
    //     this.userform.controls['smdc_bnk_name'].setValue("");
    //     this.userform.controls['smdc_bnk_brnch'].setValue("");
    //   }
     
    // })
  }

  addMediumInstruction(): void {
    this.inspection = this.userform.get('inspection') as FormArray;
    if (this.inspection.length < 999) {
      if (this.userform.controls.inspection.valid) {
        this.inspection.push(this.createItem());
      }
    } else {
      this.schlCommiteInvalid = true;
    }
  }

  createItem() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      purpose: new FormControl('', Validators.required),
      officer_type: new FormControl('', Validators.required),
      date_inspect: new FormControl('', Validators.required),
    });
  }

  removeMediumInstruction() {
    if (this.inspection.length > 0) {
      this.schlCommiteInvalid = false;
      const control = <FormArray>this.userform.controls['inspection'];
      control.removeAt(control.length - 1);
    }
  }

  getMediumInstruction(item) {
    debugger;
    const inspectionentry = this.userform.controls.inspection as FormArray;
    const mediumDataValues = item.inspection;
    if (mediumDataValues.length > 0) {
      const inspectionentry = this.userform.controls.inspection as FormArray;
      while (inspectionentry.length !== 0) {
        inspectionentry.removeAt(0)
      }
    }
    for (let i = 0; i < mediumDataValues.length; i++) {
      inspectionentry.push(this.fb.group({
        school_key_id: this.schoolId,
        purpose: mediumDataValues[i].purpose,
        officer_type: mediumDataValues[i].officer_type,
        date_inspect: mediumDataValues[i].date_inspect,
      })
      )
    }

    // Sundar
    this.inspection = this.userform.get('inspection') as FormArray;
    this.inspection.push(this.createItem());
    const control = <FormArray>this.userform.controls['inspection'];
    control.removeAt(control.value.length - 1);
  }

  Committeefun(index) {
    var smctotal_male = this.userform.value.smc_tot_mle ? this.userform.value.smc_tot_mle : 0;
    var smctotal_female = this.userform.value.smc_tot_fmle ? this.userform.value.smc_tot_fmle : 0;
    var smcprnts_male = this.userform.value.smc_prnts_mle ? this.userform.value.smc_prnts_mle : 0;
    var smcprnts_female = this.userform.value.smc_prnts_fmle ? this.userform.value.smc_prnts_fmle : 0;
    var smcpar_sc = this.userform.value.smc_par_sc ? this.userform.value.smc_par_sc : 0;
    var smcpar_st = this.userform.value.smc_par_st ? this.userform.value.smc_par_st : 0;
    var smcpar_ews = this.userform.value.smc_par_ews ? this.userform.value.smc_par_ews : 0;
    var smcpar_min = this.userform.value.smc_par_min ? this.userform.value.smc_par_min : 0;
    var smcrep_male = this.userform.value.smc_rep_mle ? this.userform.value.smc_rep_mle : 0;
    var smcrep_female = this.userform.value.smc_rep_fmle ? this.userform.value.smc_rep_fmle : 0;

    var smctch_m = this.userform.value.smc_tch_m ? this.userform.value.smc_tch_m : 0;
    var smctch_f = this.userform.value.smc_tch_f ? this.userform.value.smc_tch_f : 0;
    var smctrained_male = this.userform.value.smc_trained_m ? this.userform.value.smc_trained_m : 0;
    var smctrained_female = this.userform.value.smc_trained_f ? this.userform.value.smc_trained_f : 0;

    var total = +smctotal_male + +smctotal_female + +smcprnts_male + +smcprnts_female + +smcpar_sc + +smcpar_st + +smcpar_min + +smcpar_ews + +smcrep_male + +smcrep_female + +smctrained_male + +smctrained_female + +smctch_m + +smctch_f;

    if (total >= 21) {
      this.alertService.error("Equality or less than 20 members");
    }
  }

  smdcfun() {
    var smdctot_male = this.userform.value.smdc_tot_mle ? this.userform.value.smdc_tot_mle : 0;
    var smdctot_femle = this.userform.value.smdc_tot_fmle ? this.userform.value.smdc_tot_fmle : 0;
    var smdcparnt_male = this.userform.value.smdc_parnt_mle ? this.userform.value.smdc_parnt_mle : 0;
    var smdcparnt_female = this.userform.value.smdc_parnt_fmle ? this.userform.value.smdc_parnt_fmle : 0;
    var smdcpar_ews_m = this.userform.value.smdc_par_ews_m ? this.userform.value.smdc_par_ews_m : 0;
    var smdc_par_ews_f = this.userform.value.smdc_par_ews_f ? this.userform.value.smdc_par_ews_f : 0;
    var smdclb_male = this.userform.value.smdc_lb_mle ? this.userform.value.smdc_lb_mle : 0;
    var smdclb_female = this.userform.value.smdc_lb_fmle ? this.userform.value.smdc_lb_fmle : 0;
    var smdcminori_male = this.userform.value.smdc_minori_mle ? this.userform.value.smdc_minori_mle : 0;
    var smdcminori_female = this.userform.value.smdc_minori_fmle ? this.userform.value.smdc_minori_fmle : 0;
    var smdcwomen = this.userform.value.smdc_women ? this.userform.value.smdc_women : 0;
    var smdcscst_male = this.userform.value.smdc_scst_mle ? this.userform.value.smdc_scst_mle : 0;
    var smdcscst_female = this.userform.value.smdc_scst_fmle ? this.userform.value.smdc_scst_fmle : 0;
    var smdcdeo_male = this.userform.value.smdc_deo_mle ? this.userform.value.smdc_deo_mle : 0;
    var smdcdeo_female = this.userform.value.smdc_deo_fmle ? this.userform.value.smdc_deo_fmle : 0;
    var smdcaudit_male = this.userform.value.smdc_audit_mle ? this.userform.value.smdc_audit_mle : 0;
    var smdcaudit_female = this.userform.value.smdc_audit_fmle ? this.userform.value.smdc_audit_fmle : 0;
    var smdcexprt_male = this.userform.value.smdc_exprt_mle ? this.userform.value.smdc_exprt_mle : 0;
    var smdc_exprt_female = this.userform.value.smdc_exprt_fmle ? this.userform.value.smdc_exprt_fmle : 0;
    var smdc_techrs_male = this.userform.value.smdc_techrs_mle ? this.userform.value.smdc_techrs_mle : 0;
    var smdctechrs_female = this.userform.value.smdc_techrs_fmle ? this.userform.value.smdc_techrs_fmle : 0;
    var smdc_hm_male = this.userform.value.smdc_hm_mle ? this.userform.value.smdc_hm_mle : 0;
    var smdc_hm_female = this.userform.value.smdc_hm_fmle ? this.userform.value.smdc_hm_fmle : 0;
    var smdc_prnci_male = this.userform.value.smdc_prnci_mle ? this.userform.value.smdc_prnci_mle : 0;
    var smdc_prnci_female = this.userform.value.smdc_prnci_fmle ? this.userform.value.smdc_prnci_fmle : 0;
    var smdc_chair_male = this.userform.value.smdc_chair_mle ? this.userform.value.smdc_chair_mle : 0;
    var smdc_chair_female = this.userform.value.smdc_chair_fmle ? this.userform.value.smdc_chair_fmle : 0;
    var smdctrained_male = this.userform.value.smdc_trained_m ? this.userform.value.smdc_trained_m : 0;
    var smdctrained_female = this.userform.value.smdc_trained_f ? this.userform.value.smdc_trained_f : 0;
    var smdcparents_belong = this.userform.value.smdcparents_belong ? this.userform.value.smdcparents_belong : 0;
    var total = +smdctot_male + +smdctot_femle + +smdcparnt_male + +smdcparnt_female + +smdcpar_ews_m + +smdc_par_ews_f + +smdclb_male +
      +smdclb_female + +smdcminori_male + +smdcminori_female + +smdcwomen + +smdcscst_male + +smdcscst_female + +smdcdeo_male +
      +smdcdeo_female + +smdcaudit_male + +smdcaudit_female + +smdcexprt_male + +smdc_exprt_female + +smdc_techrs_male +
      +smdctechrs_female + +smdc_hm_male + +smdc_hm_female + +smdc_prnci_male + +smdc_prnci_female + +smdc_chair_male +
      +smdc_chair_female + +smdctrained_male + +smdctrained_female + +smdcparents_belong;

    if (total >= 6) {
      this.alertService.error("Equality or less than 5 members");
    }
  }

  chooseOfficer(event, index) {
    var inspection = event.value;
    (<FormArray>this.userform.controls['inspection']).at(index).patchValue({ officer_type: '' });
    debugger;
    {
      (<FormArray>this.userform.controls['inspection']).at(index).patchValue({ officer_type: inspection });
    }
  }

  choosePurpose(event, index) {
    var inspection = event.value;
    (<FormArray>this.userform.controls['inspection']).at(index).patchValue({ purpose: '' });
    debugger;
    {
      (<FormArray>this.userform.controls['inspection']).at(index).patchValue({ purpose: inspection });
    }

  }

  // onFinalSubmit() {
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
  //     accept: () => {
  //       this.submitted = true;
  //       var data = {
  //         "schoolnew_committee_detail": {
  //           "school_key_id": this.schoolId,
  //           "suppliment_prevousyr": this.userform.value.suppliment_prevousyr,
  //           "smc_const": this.userform.value.smc_const,
  //           "smc_tot_mle": this.userform.value.smc_tot_mle,
  //           "smc_tot_fmle": this.userform.value.smc_tot_fmle,
  //           "smc_prnts_mle": this.userform.value.smc_prnts_mle,
  //           "smc_prnts_fmle": this.userform.value.smc_prnts_fmle,
  //           "smc_rep_mle": this.userform.value.smc_rep_mle,
  //           "smc_rep_fmle": this.userform.value.smc_rep_fmle,
  //           "smc_tch_m": this.userform.value.smc_tch_m,
  //           "smc_tch_f": this.userform.value.smc_tch_f,
  //           "smc_trained_m": this.userform.value.smc_trained_m,
  //           "smc_trained_f": this.userform.value.smc_trained_f,
  //           "smc_no_prev_acyr": this.userform.value.smc_no_prev_acyr,
  //           "smc_sdp": this.userform.value.smc_sdp,
  //           "smc_sep_bnkacc": this.userform.value.smc_sep_bnkacc,
  //           "smc_bnk_nme": this.userform.value.smc_bnk_nme,
  //           "smc_bnk_brnch": this.userform.value.smc_bnk_brnch,
  //           "smc_acc_no": this.userform.value.smc_acc_no,
  //           "smc_acc_name": this.userform.value.smc_acc_name,
  //           "smc_ifsc": this.userform.value.smc_ifsc,

  //           "smdc_smc_same_yn": this.userform.value.smdc_smc_same_yn,
  //           "smdc_constitu": this.userform.value.smdc_constitu,
  //           "smdc_tot_mle": this.userform.value.smdc_tot_mle,
  //           "smdc_tot_fmle": this.userform.value.smdc_tot_fmle,
  //           "smdc_parnt_mle": this.userform.value.smdc_parnt_mle,
  //           "smdc_parnt_fmle": this.userform.value.smdc_parnt_fmle,
  //           "smdc_par_ews_m": this.userform.value.smdc_par_ews_m,
  //           "smdc_par_ews_f": this.userform.value.smdc_par_ews_f,
  //           "smdc_lb_mle": this.userform.value.smdc_lb_mle,
  //           "smdc_lb_fmle": this.userform.value.smdc_lb_fmle,
  //           "smdc_minori_mle": this.userform.value.smdc_minori_mle,
  //           "smdc_minori_fmle": this.userform.value.smdc_minori_fmle,
  //           "smdc_women": this.userform.value.smdc_women,
  //           "smdc_scst_mle": this.userform.value.smdc_scst_mle,
  //           "smdc_scst_fmle": this.userform.value.smdc_scst_fmle,
  //           "smdc_deo_mle": this.userform.value.smdc_deo_mle,
  //           "smdc_deo_fmle": this.userform.value.smdc_deo_fmle,
  //           "smdc_audit_mle": this.userform.value.smdc_audit_mle,
  //           "smdc_audit_fmle": this.userform.value.smdc_audit_fmle,
  //           "smdc_exprt_mle": this.userform.value.smdc_exprt_mle,
  //           "smdc_exprt_fmle": this.userform.value.smdc_exprt_fmle,
  //           "smdc_techrs_mle": this.userform.value.smdc_techrs_mle,
  //           "smdc_techrs_fmle": this.userform.value.smdc_techrs_fmle,
  //           "smdc_hm_mle": this.userform.value.smdc_hm_mle,
  //           "smdc_hm_fmle": this.userform.value.smdc_hm_fmle,
  //           "smdc_prnci_mle": this.userform.value.smdc_prnci_mle,
  //           "smdc_prnci_fmle": this.userform.value.smdc_prnci_fmle,
  //           "smdc_chair_mle": this.userform.value.smdc_chair_mle,
  //           "smdc_chair_fmle": this.userform.value.smdc_chair_fmle,
  //           "smdc_trained_m": this.userform.value.smdc_trained_m,
  //           "smdc_trained_f": this.userform.value.smdc_trained_f,

  //           "smdc_no_last_acyr": this.userform.value.smdc_no_last_acyr,
  //           "smdc_sip": this.userform.value.smdc_sip,
  //           "smdc_sep_bnkacc": this.userform.value.smdc_sep_bnkacc,
  //           "smdc_bnk_name": this.userform.value.smdc_bnk_name,
  //           "smdc_bnk_brnch": this.userform.value.smdc_bnk_brnch,
  //           "smdc_acc_no": this.userform.value.smdc_acc_no,
  //           "smdc_acc_name": this.userform.value.smdc_acc_name,
  //           "smdc_ifsc": this.userform.value.smdc_ifsc,

  //           "sbc_const": this.userform.value.sbc_const,
  //           "sbc_const_year": this.userform.value.sbc_const_year,
  //           "acadecomm_const": this.userform.value.acadecomm_const,
  //           "acadecomm_year": this.userform.value.acadecomm_year,
  //           "pta_const": this.userform.value.pta_const,
  //           "pta_no_curyr": this.userform.value.pta_no_curyr,
  //           "pta_est_yr": this.userform.value.pta_est_yr,
  //           "pta_reg_no": this.userform.value.pta_reg_no,
  //           "pta_subscri_amt": this.userform.value.pta_subscri_amt,
  //           "pta_chair_name": this.userform.value.pta_chair_name,
  //           "pta_chair_mble": this.userform.value.pta_chair_mble,
  //           "smc_par_sc": this.userform.value.smc_par_sc,
  //           "smc_par_st": this.userform.value.smc_par_st,
  //           "smc_par_ews": this.userform.value.smc_par_ews,
  //           "smc_par_min": this.userform.value.smc_par_min,
  //           "smdc_contrib_amt": this.userform.value.smdc_contrib_amt,
  //           "smdc_chair_name": this.userform.value.smdc_chair_name,
  //           "smdc_chair_mble": this.userform.value.smdc_chair_mble,
  //           "smdcparents_belong": this.userform.value.smdcparents_belong,
  //           "smdc_const_yr": this.userform.value.smdc_const_yr,
  //         },
  //         "schoolnew_textbook_detail": {
  //           "school_key_id": this.schoolId,
  //           "txtbk_curyr_prepri": this.userform.value.txtbk_curyr_prepri,
  //           "txtbk_curyr_pri": this.userform.value.txtbk_curyr_pri,
  //           "txtbk_curyr_upp": this.userform.value.txtbk_curyr_upp,
  //           "txtbk_curyr_sec": this.userform.value.txtbk_curyr_sec,
  //           "txtbk_curyr_hsec": this.userform.value.txtbk_curyr_hsec,
  //           "tle_grade_preprim": this.userform.value.tle_grade_preprim,
  //           "tle_grade_prim": this.userform.value.tle_grade_prim,
  //           "tle_grde_upp": this.userform.value.tle_grde_upp,
  //           "tle_grde_sec": this.userform.value.tle_grde_sec,
  //           "tle_grde_hsec": this.userform.value.tle_grde_hsec,
  //           "sports_prepri": this.userform.value.sports_prepri,
  //           "sports_pri": this.userform.value.sports_pri,
  //           "sports_upp": this.userform.value.sports_upp,
  //           'sports_sec': this.userform.value.sports_sec,
  //           "sports_hsec": this.userform.value.sports_hsec,
  //         },
  //         "schoolnew_inspection_entry": this.userform.value.inspection,
  //         "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_4": "2" }
  //       };
  //       for (const key of Object.keys(this.userform.controls)) {
  //         if (this.userform.controls[key].invalid) {
  //         }
  //       }
  //       if (this.userform.valid) {
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
  //         this.validateAllFormFields(this.userform);
  //         this.alertService.warning('Please Fill All Mandatory Fields.!');
  //         return true;
  //       }
  //     }
  //   });
  // }

}
