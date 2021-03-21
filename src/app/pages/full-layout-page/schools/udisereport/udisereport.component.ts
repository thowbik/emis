import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { schoolsService } from '../schools.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-udisereport',
  templateUrl: './udisereport.component.html',
  styleUrls: ['./udisereport.component.css']
})
export class UdisereportComponent implements OnInit {
  form: FormGroup;
  public udisePdfDetails: any[] = [];
  public fundsPdfDetails: any[] = [];
  schoolTypeId: any;
  schoolId: any;
  schoolDetailsData: any;
  content:any;
  @ViewChild('reportContent',{static: false}) reportContent: ElementRef;
  canvasImage: any;
  canvasImage1: any;


  constructor(private SchoolsService: schoolsService,
    private userSessionService: UserSessionService,
    public fb: FormBuilder) {
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.initialValidator();
    this.getUdisePdfInfo();
  }

  initialValidator() {
    this.form = this.fb.group({
      'udise_code': new FormControl('', null),
      'school_name': new FormControl('', null),
      'latitude': new FormControl('', null),
      'longitude': new FormControl('', null),
      'manage_name': new FormControl('', null),
      'management': new FormControl('', null),
      'department': new FormControl('', null),
      'category_name': new FormControl('', null),
      //  'school_type': new FormControl('', null),
      'low_classes': new FormControl('', null),
      'high_classes': new FormControl('', null),
      'anganwadi': new FormControl('', null),
      'anganwadis': new FormControl('', null),
      'angan_wrks': new FormControl('', null),
      'angan_childs': new FormControl('', null),
      'anganwadi_schl': new FormControl('', null),
      'anganwadi_center': new FormControl('', null),
      'anganwadi_trains': new FormControl('', null),
      'district_name': new FormControl('', null),
      'urbanrurals': new FormControl('', null),
      'zone_type': new FormControl('', null),
      'village_munci': new FormControl('', null),
      'lb_vill_town_muni': new FormControl('', null),
      'cluster_name': new FormControl('', null),
      'panchayat_id': new FormControl('', null),
      'block_name': new FormControl('', null),
      'village_ward': new FormControl('', null),
      'edu_dist_name': new FormControl('', null),
      'assembly_name': new FormControl('', null),
      'parli_name': new FormControl('', null),
      'municipal_id': new FormControl('', null),
      'city_id': new FormControl('', null),
      'pincode': new FormControl('', null),
      'address': new FormControl('', null),
      'corr_name': new FormControl('', null),
      'office_std_code': new FormControl('', null),
      'office_landline': new FormControl('', null),
      'office_mobile': new FormControl('', null),
      'corr_std_code': new FormControl('', null),
      'corr_landlline': new FormControl('', null),
      'corr_mobile': new FormControl('', null),
      'sch_email': new FormControl('', null),
      'website': new FormControl('', null),
      'yr_estd_schl': new FormControl('', null),
      'yr_recgn_first': new FormControl('', null),
      'yr_last_renwl': new FormControl('', null),
      'certifi_no': new FormControl('', null),
      'yr_recogn_schl': new FormControl('', null), /* field missing */
      'yr_rec_schl_elem': new FormControl('', null),
      'yr_rec_schl_sec': new FormControl('', null),
      'yr_rec_schl_hsc': new FormControl('', null),
      'upgrad_pri_to_uprpri': new FormControl('', null), /* field missing */
      'upgrad_uprpri_to_sec': new FormControl('', null), /* field missing */
      'upgrad_sec_to_higsec': new FormControl('', null), /* field missing */
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
      'spl_edtors': new FormControl('', null),


      'minority_sch': new FormControl('', null),
      'minority_grp': new FormControl('', null),
      'minority_yr': new FormControl('', null),
      'mtongue_pri': new FormControl('', null),
      'medium': new FormControl('', null),
      'other_medium': new FormControl('', null),
      'medium_instrut': new FormControl('', null),
      'lang_taught': new FormControl('', null),
      'lang': new FormControl('', null),
      'prevoc_course': new FormControl('', null),
      'trade': new FormControl('', null),   /*field mismatch */
      'stu_councels': new FormControl('', null),
      'board_sec': new FormControl('', null),
      'board_sec_oth': new FormControl('', null),
      'board_sec_no': new FormControl('', null),
      'board_hsec': new FormControl('', null),
      'board_hsec_oth': new FormControl('', null),
      'board_hsec_no': new FormControl('', null),
      'distance_pri': new FormControl('', null),
      'distance_upr': new FormControl('', null),
      'distance_sec': new FormControl('', null),
      'distance_hsec': new FormControl('', null),
      'weather_roads': new FormControl('', null),
      'distance_road': new FormControl('', null),
      'pre_pri_sec': new FormControl('', null),
      'class1_sec': new FormControl('', null),
      'class2_sec': new FormControl('', null),
      'class3_sec': new FormControl('', null),
      'class4_sec': new FormControl('', null),
      'class5_sec': new FormControl('', null),
      'class6_sec': new FormControl('', null),
      'class7_sec': new FormControl('', null),
      'class8_sec': new FormControl('', null),
      'class9_sec': new FormControl('', null),
      'class10_sec': new FormControl('', null),
      'class11_sec': new FormControl('', null),
      'class12_sec': new FormControl('', null),
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
      'grd1_samescl_b': new FormControl('', null),
      'grd1_othscl_b': new FormControl('', null),
      'grd1_angan_b': new FormControl('', null),
      'grd1_girls_below_5': new FormControl('', null),
      'grd1_girls_age_5': new FormControl('', null),
      'grd1_girls_age_6': new FormControl('', null),
      'grd1_girls_age_7': new FormControl('', null),
      'grd1_girls_above_7': new FormControl('', null),
      'grd1_tot_1_girls': new FormControl('', null),
      'grd1_samescl_g': new FormControl('', null),
      'grd1_othscl_g': new FormControl('', null),
      'grd1_angan_g': new FormControl('', null),
      schoolnew_mediumentry_details: this.fb.array([]),
      schoolnew_langtaught_entry_details: this.fb.array([]),
      voc_trade_details: this.fb.array([]),

      'school_type': new FormControl('', null),
      'instr_dys': new FormControl('', null),
      'stud_hrs': new FormControl('', null),
      'teach_hrs': new FormControl('', null),
      'cce_impl': new FormControl('', null),
      'cce_cum': new FormControl('', null),
      'cce_shared': new FormControl('', null),
      'rte_25p_applied': new FormControl('', null),
      'rte_25p_enrolled': new FormControl('', null),
      'rte_pvt_c0_b': new FormControl('', null),
      'rte_pvt_c0_g': new FormControl('', null),
      'rte_pvt_c1_b': new FormControl('', null),
      'rte_pvt_c1_g': new FormControl('', null),
      'rte_pvt_c2_b': new FormControl('', null),
      'rte_pvt_c2_g': new FormControl('', null),
      'rte_pvt_c3_b': new FormControl('', null),
      'rte_pvt_c3_g': new FormControl('', null),
      'rte_pvt_c4_b': new FormControl('', null),
      'rte_pvt_c4_g': new FormControl('', null),
      'rte_pvt_c5_b': new FormControl('', null),
      'rte_pvt_c5_g': new FormControl('', null),
      'rte_pvt_c6_b': new FormControl('', null),
      'rte_pvt_c6_g': new FormControl('', null),
      'rte_pvt_c7_b': new FormControl('', null),
      'rte_pvt_c7_g': new FormControl('', null),
      'rte_pvt_c8_b': new FormControl('', null),
      'rte_pvt_c8_g': new FormControl('', null),
      'rte_bld_c0_b': new FormControl('', null),
      'rte_bld_c0_g': new FormControl('', null),
      'rte_bld_c1_b': new FormControl('', null),
      'rte_bld_c1_g': new FormControl('', null),
      'rte_bld_c2_b': new FormControl('', null),
      'rte_bld_c2_g': new FormControl('', null),
      'rte_bld_c3_b': new FormControl('', null),
      'rte_bld_c3_g': new FormControl('', null),
      'rte_bld_c4_b': new FormControl('', null),
      'rte_bld_c4_g': new FormControl('', null),
      'rte_bld_c5_b': new FormControl('', null),
      'rte_bld_c5_g': new FormControl('', null),
      'rte_bld_c6_b': new FormControl('', null),
      'rte_bld_c6_g': new FormControl('', null),
      'rte_bld_c7_b': new FormControl('', null),
      'rte_bld_c7_g': new FormControl('', null),
      'rte_bld_c8_b': new FormControl('', null),
      'rte_bld_c8_g': new FormControl('', null),
      'rte_ews_c9_b': new FormControl('', null),
      'rte_ews_c9_g': new FormControl('', null),
      'rte_ews_c10_b': new FormControl('', null),
      'rte_ews_c10_g': new FormControl('', null),
      'rte_ews_c11_b': new FormControl('', null),
      'rte_ews_c11_g': new FormControl('', null),
      'rte_ews_c12_b': new FormControl('', null),
      'rte_ews_c12_g': new FormControl('', null),
      'acad_mnth_start': new FormControl('', null),
      'txtbk_recd_yn': new FormControl('', null),
      'txtbk_recd_mon': new FormControl('', null),
      'special_train': new FormControl('', null),
      'train_prov_boys': new FormControl('', null),
      'train_prov_grls': new FormControl('', null),
      'spltrg_py_enrol_b': new FormControl('', null),
      'spltrg_py_enrol_g': new FormControl('', null),
      'spltrg_py_prov_b': new FormControl('', null),
      'spltrg_py_prov_g': new FormControl('', null),
      'train_cond_bys': new FormControl('', null),
      'train_cond_ins': new FormControl('', null),
      'train_types': new FormControl('', null),
      'stu_councel': new FormControl('', null), /*  stu_councels field same */
      'clubs': new FormControl('', null),
      'others_cc': new FormControl('', null),
      'extra_cc': new FormControl('', null),
      'sdmp_devs': new FormControl('', null),
      'sturct_safs': new FormControl('', null),
      'nonsturct_safs': new FormControl('', null),
      'cctv_schools': new FormControl('', null),
      'firext_schls': new FormControl('', null),
      'nodtchr_schlsafs': new FormControl('', null),
      'dister_trngs': new FormControl('', null),
      'dister_parts': new FormControl('', null),
      'slfdfse_trngs': new FormControl('', null),
      'noslfdfse_trng': new FormControl('', null),
      'guidline_disply_brd': new FormControl('', null),
      'grnt_frstlvl_conslrs': new FormControl('', null),
      'guidlins_counsling': new FormControl('', null),
      'sensitiz_parnts': new FormControl('', null),
      'awrnss_studscomm': new FormControl('', null),
      'studs_feedbck': new FormControl('', null),
      'safty_sugstn': new FormControl('', null),
      'copies_studs': new FormControl('', null),
      daysHoursInfo: this.fb.array([]),
      clubDetails: this.fb.array([]),

      'suppliment_prevousyrs': new FormControl('', null),
      'txtbk_curyr_prepris': new FormControl('', null),
      'txtbk_curyr_pris': new FormControl('', null),
      'txtbk_curyr_upps': new FormControl('', null),
      'txtbk_curyr_secs': new FormControl('', null),
      'txtbk_curyr_hsecs': new FormControl('', null),
      'tle_grade_preprims': new FormControl('', null),
      'tle_grade_prims': new FormControl('', null),
      'tle_grde_upps': new FormControl('', null),
      'tle_grde_secs': new FormControl('', null),
      'tle_grde_hsecs': new FormControl('', null),
      'sports_prepris': new FormControl('', null),
      'sports_pris': new FormControl('', null),
      'sports_upps': new FormControl('', null),
      'sports_secs': new FormControl('', null),
      'sports_hsecs': new FormControl('', null),
      'officer_types': new FormControl('', null),
      'purposes': new FormControl('', null),
      'date_inspect': new FormControl('', null),
      'smc_consts': new FormControl('', null),
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
      'smc_weakr_mle': new FormControl('', null),
      'smc_weakr_fmle': new FormControl('', null),
      'smc_const_yr': new FormControl('', null),
      'smc_chair_name': new FormControl('', null),
      'smc_chair_mble': new FormControl('', null),
      'smdc_smc_same_yn': new FormControl('', null),
      'smdc_constitus': new FormControl('', null),
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
      'smdcparents_belong': new FormControl('', null),
      'smdc_const_yr': new FormControl('', null),
      'smdc_no_last_acyr': new FormControl('', null),
      'smdc_sip': new FormControl('', null),
      'smdc_sep_bnkacc': new FormControl('', null),
      'smdc_bnk_name': new FormControl('', null),
      'smdc_bnk_brnch': new FormControl('', null),
      'smdc_acc_no': new FormControl('', null),
      'smdc_acc_name': new FormControl('', null),
      'smdc_ifsc': new FormControl('', null),
      'smdc_contrib_amt': new FormControl('', null),
      'smdc_chair_name': new FormControl('', null),
      'smdc_chair_mble': new FormControl('', null),
      'sbc_const': new FormControl('', null),
      'sbc_const_year': new FormControl('', null),
      'acadecomm_consts': new FormControl('', null),
      'acadecomm_year': new FormControl('', null),
      'pta_consts': new FormControl('', null),
      'pta_no_curyr': new FormControl('', null),
      'pta_est_yr': new FormControl('', null),
      'pta_reg_no': new FormControl('', null),
      'pta_subscri_amt': new FormControl('', null),
      'pta_chair_name': new FormControl('', null),
      'pta_chair_mble': new FormControl('', null),
      inspectionDetails: this.fb.array([]),

      'land_avail_sqft': new FormControl('', null),
      'land_avail_acre': new FormControl('', null),  
      'play_facility': new FormControl('', null),
      'play_area_sqft': new FormControl('', null),
      'area_cent_1': new FormControl('', null),  /* field missing */
      'land_exp_scl': new FormControl('', null),
      'play_land_area': new FormControl('', null),
      'land_ownersips': new FormControl('', null),
      'land_lease_perid': new FormControl('', null),
      'valid_upto': new FormControl('', null),
      'cmpwall_types': new FormControl('', null),
      'cmpwall_perimtr': new FormControl('', null),
      'cmpwall_length': new FormControl('', null),
      'build_block_no': new FormControl('', null),
      'construct_types': new FormControl('', null),
      'total_flrs': new FormControl('', null),
      'off_room': new FormControl('', null),
      'lab_room': new FormControl('', null),
      'library_room': new FormControl('', null),
      'comp_room': new FormControl('', null),
      'art_room': new FormControl('', null),
      'staff_room': new FormControl('', null),
      'hm_room': new FormControl('', null),
      'girl_room': new FormControl('', null),
      'tot_classrm_use': new FormControl('', null),
      'tot_classrm_nouse': new FormControl('', null),
      'good_condition': new FormControl('', null),
      'need_minorrep': new FormControl('', null),
      'need_majorrep': new FormControl('', null),
      'total_room': new FormControl('', null),
      'classrm_undr_constr': new FormControl('', null),
      'clsrms_dptd': new FormControl('', null),
      'classrm_desk_studss': new FormControl('', null),
      //  'school_type': new FormControl('', null),   /* field mismatch */
      'ramp_disable_childs': new FormControl('', null),
      'ramp_building_yn': new FormControl('', null),
      'ramp_handrails': new FormControl('', null),
      'staffquarter': new FormControl('', null),
      'fulltime_libs': new FormControl('', null),
      'news_subscribes': new FormControl('', null),
      'library_types': new FormControl('', null),
      'num_books': new FormControl('', null),
      'ncert_books': new FormControl('', null),
      'toil_gents_tot': new FormControl('', null),
      'toil_ladies_tot': new FormControl('', null),
      'urinal_gents_tot': new FormControl('', null),
      'urinals_tot_ladies': new FormControl('', null),
      'toil_bys_inuse': new FormControl('', null),
      'toil_notuse_bys': new FormControl('', null),
      'toil_nonfunc_byss': new FormControl('', null),
      'toil_inuse_grls': new FormControl('', null),
      'toil_notuse_grls': new FormControl('', null),
      'toil_reasn_grlss': new FormControl('', null),
      'cwsntoil_inuse_bys': new FormControl('', null),
      'cwsntoil_notuse_bys': new FormControl('', null),
      'cwsntoil_reasn_byss': new FormControl('', null),
      'cwsntoil_inuse_grls': new FormControl('', null),
      'cwsntoil_notuse_grls': new FormControl('', null),
      'cwsntoil_reasn_grlss': new FormControl('', null),
      'urinls_inuse_bys': new FormControl('', null),
      'urinls_notuse_bys': new FormControl('', null),
      'urinls_reasn_byss': new FormControl('', null),
      'urinls_inuse_grls': new FormControl('', null),
      'urinls_notuse_grls': new FormControl('', null),
      'urinls_reasn_grlss': new FormControl('', null),
      'toil_waterfac_bys': new FormControl('', null),
      'toil_waterfac_grls': new FormControl('', null),
      'urinls_waterfac_bys': new FormControl('', null),
      'urinls_waterfac_grls': new FormControl('', null),
      'toil_sanit_wrkss': new FormControl('', null),
      'toil_land_avail': new FormControl('', null),
      'toil_land_avail_sqft': new FormControl('', null),
      'napkin_incin': new FormControl('', null),
      'napkin_avail_no': new FormControl('', null),
      'napkin_func_no': new FormControl('', null),
      'incinerator': new FormControl('', null),
      'inci_auto_avail_no': new FormControl('', null),
      'inci_auto_func_no': new FormControl('', null),
      'inci_man_avail_no': new FormControl('', null),
      'inci_man_func_no': new FormControl('', null),
      'toil_handwash_soap': new FormControl('', null),
      'handwash_meal_yn': new FormControl('', null),
      'tot_handwash_bys': new FormControl('', null),
      'tot_handwash_grls': new FormControl('', null),
      'drnkwater_avail': new FormControl('', null),
      'drnkwater_source': new FormControl('', null),
      'water_tests': new FormControl('', null),
      'overheadtank_avails': new FormControl('', null),
      'waterpuri_avails': new FormControl('', null),
      'schl_rainwtr_hrvs': new FormControl('', null),
      'solar_panels': new FormControl('', null),
      'kitchen_gardens': new FormControl('', null),
      'electricitys': new FormControl('', null),
      'class_dustbins': new FormControl('', null),
      'waste_toiletss': new FormControl('', null),
      'waste_kitchens': new FormControl('', null),
      'num_rooms': new FormControl('', null),
      'blockno': new FormControl('', null),
      classroomDetails: this.fb.array([]),
      libraryDetails: this.fb.array([]),
      blockDetails: this.fb.array([]),


      'cals': new FormControl('', null),
      'clab': new FormControl('', null),
      'year_implmnt': new FormControl('', null),
      'ict_labs': new FormControl('', null),
      'model_icts': new FormControl('', null),
      'ict_type': new FormControl('', null),
      // 'electricitys': new FormControl('', null), /* FIELD MISMATCH */
      'lap_nbook_avail': new FormControl('', null),
      'lap_nbook_tot': new FormControl('', null),
      'lap_nbook_func': new FormControl('', null),
      'tablet_avail': new FormControl('', null),
      'tablet_tot': new FormControl('', null),
      'tablet_func': new FormControl('', null),
      'dcomp_avail': new FormControl('', null),
      'dcomp_tot': new FormControl('', null),
      'dcomp_func': new FormControl('', null),
      'PC_avail': new FormControl('', null),
      'PC_tot': new FormControl('', null),
      'PC_func': new FormControl('', null),
      'DB_avail': new FormControl('', null),
      'DB_LMS_tot': new FormControl('', null),
      'DB_func': new FormControl('', null),
      'server_avail': new FormControl('', null),
      'server_tot': new FormControl('', null),
      'server_func': new FormControl('', null),
      'projtr_avail': new FormControl('', null),
      'projtr_tot': new FormControl('', null),
      'projtr_func': new FormControl('', null),
      'lcd_led_plas_avail': new FormControl('', null),
      'lcd_led_plas_tot': new FormControl('', null),
      'lcd_led_plas_func': new FormControl('', null),
      'webcam_avail': new FormControl('', null),
      'webcam_tot': new FormControl('', null),
      'webcam_func': new FormControl('', null),
      'printr_avail': new FormControl('', null),
      'printr_tot': new FormControl('', null),
      'printr_func': new FormControl('', null),
      'gnrtr_invups_avail': new FormControl('', null),
      'gnrtr_invups_tot': new FormControl('', null),
      'gnrtr_invups_func': new FormControl('', null),
      'intrntfac_avail': new FormControl('', null),
      'intrntfac_tot': new FormControl('', null),
      'intrntfac_func': new FormControl('', null),
      'dth_antna_avail': new FormControl('', null),
      'dth_antna_tot': new FormControl('', null),
      'dth_antna_func': new FormControl('', null),
      'econtnt_dig_avail': new FormControl('', null),
      'econtnt_dig_tot': new FormControl('', null),
      'econtnt_dig_func': new FormControl('', null),
      'asst_CWSN_avail': new FormControl('', null),
      'asst_CWSN_tot': new FormControl('', null),
      'asst_CWSN_func': new FormControl('', null),
      'med_ckup_lstyr': new FormControl('', null),
      'deworm_tab': new FormControl('', null),
      'iron_folics': new FormControl('', null),
      'phy_rm_avail': new FormControl('', null),
      'phy_prsnt_cond': new FormControl('', null),
      'chem_rm_avail': new FormControl('', null),
      'chem_prsnt_cond': new FormControl('', null),
      'bio_rm_avail': new FormControl('', null),
      'bio_prsnt_cond': new FormControl('', null),
      'math_rm_avail': new FormControl('', null),
      'math_prsnt_cond': new FormControl('', null),
      'lang_rm_avail': new FormControl('', null),
      'lang_prsnt_cond': new FormControl('', null),
      'geo_rm_avail': new FormControl('', null),
      'geo_prsnt_cond': new FormControl('', null),
      'hom_scnrm_avail': new FormControl('', null),
      'hom_scnprsnt_cond': new FormControl('', null),
      'psy_rm_avail': new FormControl('', null),
      'psy_prsnt_cond': new FormControl('', null),
      'lab_rm_avail': new FormControl('', null),
      'aud_visfac_avail': new FormControl('', null),
      'scien_fac_avail': new FormControl('', null),
      'math_fac_avail': new FormControl('', null),
      'bio_fac_avail': new FormControl('', null),

      'brlbks_elebys': new FormControl('', null),
      'brlbks_elegls': new FormControl('', null),
      'brailbks_secbys': new FormControl('', null),
      'brlbks_secgls': new FormControl('', null),
      'brailbks_hsecbys': new FormControl('', null),
      'brlbks_hsegls': new FormControl('', null),
      'brlkit_elebys': new FormControl('', null),
      'brlkit_elegls': new FormControl('', null),
      'brailkit_secbys': new FormControl('', null),
      'brlkit_secgls': new FormControl('', null),
      'brailkit_hsecbys': new FormControl('', null),
      'brlkit_hsegls': new FormControl('', null),
      'lvnkit_elebys': new FormControl('', null),
      'lvnkit_elegls': new FormControl('', null),
      'lvnkit_secbys': new FormControl('', null),
      'lvnkit_secgls': new FormControl('', null),
      'lvnkit_hsecbys': new FormControl('', null),
      'lvnkit_hsegls': new FormControl('', null),
      'hearaid_elebys': new FormControl('', null),
      'hearaid_elegls': new FormControl('', null),
      'hearaid_secbys': new FormControl('', null),
      'hearaid_secgls': new FormControl('', null),
      'hearaid_hsecbys': new FormControl('', null),
      'hearaid_hsegls': new FormControl('', null),
      'braces_elebys': new FormControl('', null),
      'braces_elegls': new FormControl('', null),
      'braces_secbys': new FormControl('', null),
      'braces_secgls': new FormControl('', null),
      'braces_hsecbys': new FormControl('', null),
      'braces_hsegls': new FormControl('', null),
      'whlchr_elebys': new FormControl('', null),
      'whlchr_elegls': new FormControl('', null),
      'whlchr_secbys': new FormControl('', null),
      'whlchr_secgls': new FormControl('', null),
      'whlchr_hsecbys': new FormControl('', null),
      'whlchr_hsegls': new FormControl('', null),
      'crthes_elebys': new FormControl('', null),
      'crthes_elegls': new FormControl('', null),
      'crthes_secbys': new FormControl('', null),
      'crthes_secgls': new FormControl('', null),
      'crthes_hsecbys': new FormControl('', null),
      'crthes_hsegls': new FormControl('', null),
      'tricyle_elebys': new FormControl('', null),
      'tricyle_elegls': new FormControl('', null),
      'tricyle_secbys': new FormControl('', null),
      'tricyle_secgls': new FormControl('', null),
      'tricyle_hsecbys': new FormControl('', null),
      'tricyle_hsegls': new FormControl('', null),
      'caliper_elebys': new FormControl('', null),
      'caliper_elegls': new FormControl('', null),
      'caliper_secbys': new FormControl('', null),
      'caliper_secgls': new FormControl('', null),
      'caliper_hsecbys': new FormControl('', null),
      'caliper_hsegls': new FormControl('', null),
      'escort_elebys': new FormControl('', null),
      'escort_elegls': new FormControl('', null),
      'escort_secbys': new FormControl('', null),
      'escort_secgls': new FormControl('', null),
      'escort_hsecbys': new FormControl('', null),
      'escort_hsegls': new FormControl('', null),
      'stipend_elebys': new FormControl('', null),
      'stipend_elegls': new FormControl('', null),
      'stipend_secbys': new FormControl('', null),
      'stipend_secgls': new FormControl('', null),
      'stipend_hsecbys': new FormControl('', null),
      'stipend_hsegls': new FormControl('', null),
      'ssacmpste_recept': new FormControl('', null),
      'ssacmpste_expdtre': new FormControl('', null),
      'ssalibg_recept': new FormControl('', null),
      'ssalibg_expdtre': new FormControl('', null),
      'ssaped_recept': new FormControl('', null),
      'ssaped_expdtre': new FormControl('', null),
      'ssamedia_recept': new FormControl('', null),
      'ssamedia_expdtre': new FormControl('', null),
      'ssatrngsmcdc_recept': new FormControl('', null),
      'ssatrngsmcdc_expdtre': new FormControl('', null),
      'ssapreschl_recept': new FormControl('', null),
      'ssapreschl_expdtre': new FormControl('', null),
      'ssagrntmjrrpr_recept': new FormControl('', null),
      'ssagrntmjrrpr_expdtre': new FormControl('', null),
      'ngo_fince': new FormControl('', null),
      'ngo_name': new FormControl('', null),
      'ngo_amt': new FormControl('', null),
      'psu_fince': new FormControl('', null),
      'psu_name': new FormControl('', null),
      'psu_amt': new FormControl('', null),
      'comu_fince': new FormControl('', null),
      'comu_name': new FormControl('', null),
      'comu_amt': new FormControl('', null),
      'othr_fince': new FormControl('', null),
      'othr_name': new FormControl('', null),
      'othr_amt': new FormControl('', null),
      'main_com': new FormControl('', null),
      'sprts_equip': new FormControl('', null),
      'lib_boks': new FormControl('', null),
      'schlevl_cmp': new FormControl('', null),
      'schl_imp': new FormControl('', null),
      'schlreg_pfms': new FormControl('', null)
    });
  }


  getUdisePdfInfo() {
    debugger
    let sch_id = '';
    this.SchoolsService.getUdisePdf(sch_id).subscribe(res => {
      this.udisePdfDetails = res.result.schoolinfo;
      this.form.patchValue(this.udisePdfDetails);
      this.fundsPdfDetails = res.result.schoolinfo.udiseplus;
      this.form.patchValue(this.fundsPdfDetails);
      this.getMediumInstruction(res.result.schoolinfo.medium);
      this.getLanguageList(res.result.schoolinfo.langetr);
      this.getVocationList(res.result.schoolinfo.trade);
      this.dayWorkInfo(res.result.schoolinfo.daywork_school_type);
      this.totalClubRecords(res.result.schoolinfo.clubs);
      this.getInspection(res.result.schoolinfo.inspection);
      this.getClassRoom(res.result.schoolinfo.classrooms);
      this.getLibrary(res.result.schoolinfo.library);
      this.getBlock(res.result.schoolinfo.natureofconst);



      /* school info */

      if (this.udisePdfDetails['anganwadi_schl'] == 1) {
        this.form.controls['anganwadi_schl'].setValue("YES");
      }
      else {
        this.form.controls['anganwadi_schl'].setValue("NO");
      }

      if (this.udisePdfDetails['shftd_schl'] == 1) {
        this.form.controls['shftd_schl'].setValue("YES");
      }
      else {
        this.form.controls['shftd_schl'].setValue("NO");
      }

      if (this.udisePdfDetails['cwsn_scl'] == 1) {
        this.form.controls['cwsn_scl'].setValue("YES");
      }
      else {
        this.form.controls['cwsn_scl'].setValue("NO");
      }

      if (this.udisePdfDetails['resid_schl'] == 1) {
        this.form.controls['resid_schl'].setValue("YES");
      }
      else {
        this.form.controls['resid_schl'].setValue("NO");
      }

      if (this.udisePdfDetails['typ_resid_schl'] == 1) {
        this.form.controls['typ_resid_schl'].setValue("Ashram (Govt.)");
      }
      else if (this.udisePdfDetails['typ_resid_schl'] == 2) {
        this.form.controls['typ_resid_schl'].setValue("Non-ashram (Govt.)");
      }
      else if (this.udisePdfDetails['typ_resid_schl'] == 3) {
        this.form.controls['typ_resid_schl'].setValue("Private");
      }
      else if (this.udisePdfDetails['typ_resid_schl'] == 4) {
        this.form.controls['typ_resid_schl'].setValue("Others");
      }
      else if (this.udisePdfDetails['typ_resid_schl'] == 6) {
        this.form.controls['typ_resid_schl'].setValue("KGBV");
      }
      else if (this.udisePdfDetails['typ_resid_schl'] == 7) {
        this.form.controls['typ_resid_schl'].setValue("Model School");
      }
      else if (this.udisePdfDetails['typ_resid_schl'] == 8) {
        this.form.controls['typ_resid_schl'].setValue("Eklavya Model Residential School");
      } else {
        this.form.controls['typ_resid_schl'].setValue("-");
      }

      if (this.udisePdfDetails['boarding_pri_yn'] == 1) {
        this.form.controls['boarding_pri_yn'].setValue("YES");
      }
      else {
        this.form.controls['boarding_pri_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['boarding_upr_yn'] == 1) {
        this.form.controls['boarding_upr_yn'].setValue("YES");
      }
      else {
        this.form.controls['boarding_upr_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['boarding_sec_yn'] == 1) {
        this.form.controls['boarding_sec_yn'].setValue("YES");
      }
      else {
        this.form.controls['boarding_sec_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['boarding_hsec_yn'] == 1) {
        this.form.controls['boarding_hsec_yn'].setValue("YES");
      }
      else {
        this.form.controls['boarding_hsec_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['hill_frst'] == 1) {
        this.form.controls['hill_frst'].setValue("In Forest/Hill area");
      }
      else if (this.udisePdfDetails['hill_frst'] == 2) {
        this.form.controls['hill_frst'].setValue("Near Forest/Hill area");
      }
      else if (this.udisePdfDetails['hill_frst'] == 3) {
        this.form.controls['hill_frst'].setValue("Near the High ways");
      }
      else if (this.udisePdfDetails['hill_frst'] == 4) {
        this.form.controls['hill_frst'].setValue("Near Coastal Area");
      }
      else if (this.udisePdfDetails['hill_frst'] == 0) {
        this.form.controls['hill_frst'].setValue("Not Applicable");
      }
      else {
        this.form.controls['hill_frst'].setValue("-");
      }

      /* funds */

      if (this.fundsPdfDetails['ngo_fince'] == 1) {
        this.form.controls['ngo_fince'].setValue("YES");
      }
      else {
        this.form.controls['ngo_fince'].setValue("NO");
      }
      if (this.fundsPdfDetails['psu_fince'] == 1) {
        this.form.controls['psu_fince'].setValue("YES");
      }
      else {
        this.form.controls['psu_fince'].setValue("NO");
      }
      if (this.fundsPdfDetails['comu_fince'] == 1) {
        this.form.controls['comu_fince'].setValue("YES");
      }
      else {
        this.form.controls['comu_fince'].setValue("NO");
      }
      if (this.fundsPdfDetails['othr_fince'] == 1) {
        this.form.controls['othr_fince'].setValue("YES");
      }
      else {
        this.form.controls['othr_fince'].setValue("NO");
      }
      if (this.fundsPdfDetails['main_com'] == 1) {
        this.form.controls['main_com'].setValue("YES");
      }
      else {
        this.form.controls['main_com'].setValue("NO");
      }
      if (this.fundsPdfDetails['sprts_equip'] == 1) {
        this.form.controls['sprts_equip'].setValue("YES");
      }
      else {
        this.form.controls['sprts_equip'].setValue("NO");
      }
      if (this.fundsPdfDetails['lib_boks'] == 1) {
        this.form.controls['lib_boks'].setValue("YES");
      }
      else {
        this.form.controls['lib_boks'].setValue("NO");
      }
      if (this.fundsPdfDetails['schlevl_cmp'] == 1) {
        this.form.controls['schlevl_cmp'].setValue("YES");
      }
      else {
        this.form.controls['schlevl_cmp'].setValue("NO");
      }
      if (this.fundsPdfDetails['schl_imp'] == 1) {
        this.form.controls['schl_imp'].setValue("YES");
      }
      else {
        this.form.controls['schl_imp'].setValue("NO");
      }
      if (this.fundsPdfDetails['schlreg_pfms'] == 1) {
        this.form.controls['schlreg_pfms'].setValue("YES");
      }
      else {
        this.form.controls['schlreg_pfms'].setValue("NO");
      }

      /* inventory */

      if (this.udisePdfDetails['clab'] == 1) {
        this.form.controls['clab'].setValue("YES");
      }
      else {
        this.form.controls['clab'].setValue("NO");
      }

      if (this.udisePdfDetails['ict_type'] == 1) {
        this.form.controls['ict_type'].setValue("Full Time");
      }
      else if (this.udisePdfDetails['ict_type'] == 2) {
        this.form.controls['ict_type'].setValue("Part Time");
      }
      else if (this.udisePdfDetails['ict_type'] == 3) {
        this.form.controls['ict_type'].setValue("Not Available");
      }
      else {
        this.form.controls['ict_type'].setValue("-");
      }

      if (this.udisePdfDetails['lap_nbook_avail'] == 1) {
        this.form.controls['lap_nbook_avail'].setValue("YES");
      }
      else {
        this.form.controls['lap_nbook_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['tablet_avail'] == 1) {
        this.form.controls['tablet_avail'].setValue("YES");
      }
      else {
        this.form.controls['tablet_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['dcomp_avail'] == 1) {
        this.form.controls['dcomp_avail'].setValue("YES");
      }
      else {
        this.form.controls['dcomp_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['PC_avail'] == 1) {
        this.form.controls['PC_avail'].setValue("YES");
      }
      else {
        this.form.controls['PC_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['DB_avail'] == 1) {
        this.form.controls['DB_avail'].setValue("YES");
      }
      else {
        this.form.controls['DB_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['server_avail'] == 1) {
        this.form.controls['server_avail'].setValue("YES");
      }
      else {
        this.form.controls['server_avail'].setValue("NO");
      }
      if (this.udisePdfDetails['projtr_avail'] == 1) {
        this.form.controls['projtr_avail'].setValue("YES");
      }
      else {
        this.form.controls['projtr_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['lcd_led_plas_avail'] == 1) {
        this.form.controls['lcd_led_plas_avail'].setValue("YES");
      }
      else {
        this.form.controls['lcd_led_plas_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['webcam_avail'] == 1) {
        this.form.controls['webcam_avail'].setValue("YES");
      }
      else {
        this.form.controls['webcam_avail'].setValue("NO");
      }
      if (this.udisePdfDetails['printr_avail'] == 1) {
        this.form.controls['printr_avail'].setValue("YES");
      }
      else {
        this.form.controls['printr_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['gnrtr_invups_avail'] == 1) {
        this.form.controls['gnrtr_invups_avail'].setValue("YES");
      }
      else {
        this.form.controls['gnrtr_invups_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['dth_antna_avail'] == 1) {
        this.form.controls['dth_antna_avail'].setValue("YES");
      }
      else {
        this.form.controls['dth_antna_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['econtnt_dig_avail'] == 1) {
        this.form.controls['econtnt_dig_avail'].setValue("YES");
      }
      else {
        this.form.controls['econtnt_dig_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['asst_CWSN_avail'] == 1) {
        this.form.controls['asst_CWSN_avail'].setValue("YES");
      }
      else {
        this.form.controls['asst_CWSN_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['deworm_tab'] == 1) {
        this.form.controls['deworm_tab'].setValue("Complete (Two Doses");
      }
      else if (this.udisePdfDetails['deworm_tab'] == 2) {
        this.form.controls['deworm_tab'].setValue("Partially (One Dose)");
      }
      else if (this.udisePdfDetails['deworm_tab'] == 3) {
        this.form.controls['deworm_tab'].setValue("Not Given");
      }
      else {
        this.form.controls['deworm_tab'].setValue("-");
      }


      if (this.udisePdfDetails['phy_rm_avail'] == 1) {
        this.form.controls['phy_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['phy_rm_avail'].setValue("NO");
      }
      if (this.udisePdfDetails['chem_rm_avail'] == 1) {
        this.form.controls['chem_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['chem_rm_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['bio_rm_avail'] == 1) {
        this.form.controls['bio_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['bio_rm_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['math_rm_avail'] == 1) {
        this.form.controls['math_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['math_rm_avail'].setValue("NO");
      }
      if (this.udisePdfDetails['lang_rm_avail'] == 1) {
        this.form.controls['lang_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['lang_rm_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['geo_rm_avail'] == 1) {
        this.form.controls['geo_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['geo_rm_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['hom_scnrm_avail'] == 1) {
        this.form.controls['hom_scnrm_avail'].setValue("YES");
      }
      else {
        this.form.controls['hom_scnrm_avail'].setValue("NO");
      }


      if (this.udisePdfDetails['psy_rm_avail'] == 1) {
        this.form.controls['psy_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['psy_rm_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['psy_rm_avail'] == 1) {
        this.form.controls['psy_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['psy_rm_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['lab_rm_avail'] == 1) {
        this.form.controls['lab_rm_avail'].setValue("YES");
      }
      else {
        this.form.controls['lab_rm_avail'].setValue("NO");
      }


      if (this.udisePdfDetails['phy_prsnt_cond'] == 1) {
        this.form.controls['phy_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['phy_prsnt_cond'] == 2) {
        this.form.controls['phy_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['phy_prsnt_cond'] == 3) {
        this.form.controls['phy_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['phy_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['chem_prsnt_cond'] == 1) {
        this.form.controls['chem_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['chem_prsnt_cond'] == 2) {
        this.form.controls['chem_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['chem_prsnt_cond'] == 3) {
        this.form.controls['chem_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['chem_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['bio_prsnt_cond'] == 1) {
        this.form.controls['bio_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['bio_prsnt_cond'] == 2) {
        this.form.controls['bio_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['bio_prsnt_cond'] == 3) {
        this.form.controls['bio_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['bio_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['math_prsnt_cond'] == 1) {
        this.form.controls['math_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['math_prsnt_cond'] == 2) {
        this.form.controls['math_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['math_prsnt_cond'] == 3) {
        this.form.controls['math_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['math_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['lang_prsnt_cond'] == 1) {
        this.form.controls['lang_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['lang_prsnt_cond'] == 2) {
        this.form.controls['lang_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['lang_prsnt_cond'] == 3) {
        this.form.controls['lang_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['lang_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['geo_prsnt_cond'] == 1) {
        this.form.controls['geo_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['geo_prsnt_cond'] == 2) {
        this.form.controls['geo_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['geo_prsnt_cond'] == 3) {
        this.form.controls['geo_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['geo_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['hom_scnprsnt_cond'] == 1) {
        this.form.controls['hom_scnprsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['hom_scnprsnt_cond'] == 2) {
        this.form.controls['hom_scnprsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['hom_scnprsnt_cond'] == 3) {
        this.form.controls['hom_scnprsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['hom_scnprsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['psy_prsnt_cond'] == 1) {
        this.form.controls['psy_prsnt_cond'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['psy_prsnt_cond'] == 2) {
        this.form.controls['psy_prsnt_cond'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['psy_prsnt_cond'] == 3) {
        this.form.controls['psy_prsnt_cond'].setValue("Not equipped");
      }
      else {
        this.form.controls['psy_prsnt_cond'].setValue("-");
      }

      if (this.udisePdfDetails['aud_visfac_avail'] == 1) {
        this.form.controls['aud_visfac_avail'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['aud_visfac_avail'] == 2) {
        this.form.controls['aud_visfac_avail'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['aud_visfac_avail'] == 3) {
        this.form.controls['aud_visfac_avail'].setValue("Not equipped");
      }
      else {
        this.form.controls['aud_visfac_avail'].setValue("-");
      }

      if (this.udisePdfDetails['scien_fac_avail'] == 1) {
        this.form.controls['scien_fac_avail'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['scien_fac_avail'] == 2) {
        this.form.controls['scien_fac_avail'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['scien_fac_avail'] == 3) {
        this.form.controls['scien_fac_avail'].setValue("Not equipped");
      }
      else {
        this.form.controls['scien_fac_avail'].setValue("-");
      }


      if (this.udisePdfDetails['math_fac_avail'] == 1) {
        this.form.controls['math_fac_avail'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['math_fac_avail'] == 2) {
        this.form.controls['math_fac_avail'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['math_fac_avail'] == 3) {
        this.form.controls['math_fac_avail'].setValue("Not equipped");
      }
      else {
        this.form.controls['math_fac_avail'].setValue("-");
      }

      if (this.udisePdfDetails['bio_fac_avail'] == 1) {
        this.form.controls['bio_fac_avail'].setValue("Fully equipped");
      }
      else if (this.udisePdfDetails['bio_fac_avail'] == 2) {
        this.form.controls['bio_fac_avail'].setValue("Partially equipped");
      }
      else if (this.udisePdfDetails['bio_fac_avail'] == 3) {
        this.form.controls['bio_fac_avail'].setValue("Not equipped");
      }
      else {
        this.form.controls['bio_fac_avail'].setValue("-");
      }

      if (this.udisePdfDetails['intrntfac_avail'] == 1) {
        this.form.controls['intrntfac_avail'].setValue("YES");
      }
      else if (this.udisePdfDetails['intrntfac_avail'] == 2) {
        this.form.controls['intrntfac_avail'].setValue("NO");
      }

      

      /* commitee */

      if (this.udisePdfDetails['smdc_smc_same_yn'] == 1) {
        this.form.controls['smdc_smc_same_yn'].setValue("YES");
      }
      else if (this.udisePdfDetails['smdc_smc_same_yn'] == 2) {
        this.form.controls['smdc_smc_same_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['sbc_const'] == 1) {
        this.form.controls['sbc_const'].setValue("YES");
      }
      else if (this.udisePdfDetails['sbc_const'] == 2) {
        this.form.controls['sbc_const'].setValue("NO");
      }


      /* school details */


      if (this.udisePdfDetails['minority_sch'] == 1) {
        this.form.controls['minority_sch'].setValue("YES");
      }
      else {
        this.form.controls['minority_sch'].setValue("NO");
      }

      if (this.udisePdfDetails['mtongue_pri'] == 1) {
        this.form.controls['mtongue_pri'].setValue("YES");
      }
      else {
        this.form.controls['mtongue_pri'].setValue("NO");
      }
      if (this.udisePdfDetails['prevoc_course'] == 1) {
        this.form.controls['prevoc_course'].setValue("YES");
      }
      else if (this.udisePdfDetails['prevoc_course'] == 2) {
        this.form.controls['prevoc_course'].setValue("NO");
      }

      if (this.udisePdfDetails['board_sec'] == 1) {
        this.form.controls['board_sec'].setValue("CBSE");
      }
      else if (this.udisePdfDetails['board_sec'] == 2) {
        this.form.controls['board_sec'].setValue("State Board");
      }
      else if (this.udisePdfDetails['board_sec'] == 3) {
        this.form.controls['board_sec'].setValue("ICSE");
      }
      else if (this.udisePdfDetails['board_sec'] == 4) {
        this.form.controls['board_sec'].setValue("International Board");
      }
      else if (this.udisePdfDetails['board_sec'] == 5) {
        this.form.controls['board_sec'].setValue("Others");
      }
      else if (this.udisePdfDetails['board_sec'] == 6) {
        this.form.controls['board_sec'].setValue("Both CBSE & State Board");
      }
      else if (this.udisePdfDetails['board_sec'] == 9) {
        this.form.controls['board_sec'].setValue("Not Applicable");
      }

      if (this.udisePdfDetails['board_hsec'] == 1) {
        this.form.controls['board_hsec'].setValue("CBSE");
      }
      else if (this.udisePdfDetails['board_hsec'] == 2) {
        this.form.controls['board_hsec'].setValue("State Board");
      }
      else if (this.udisePdfDetails['board_hsec'] == 3) {
        this.form.controls['board_hsec'].setValue("ICSE");
      }
      else if (this.udisePdfDetails['board_hsec'] == 4) {
        this.form.controls['board_hsec'].setValue("International Board");
      }
      else if (this.udisePdfDetails['board_hsec'] == 5) {
        this.form.controls['board_hsec'].setValue("Others");
      }
      else if (this.udisePdfDetails['board_hsec'] == 6) {
        this.form.controls['board_hsec'].setValue("Both CBSE & State Board");
      }
      else if (this.udisePdfDetails['board_hsec'] == 9) {
        this.form.controls['board_hsec'].setValue("Not Applicable");
      }

      if (this.udisePdfDetails['weather_roads'] == 1) {
        this.form.controls['weather_roads'].setValue("YES");
      }
      else if (this.udisePdfDetails['weather_roads'] == 2) {
        this.form.controls['weather_roads'].setValue("NO");
      }


      if (this.udisePdfDetails['minority_grp'] == 1) {
        this.form.controls['minority_grp'].setValue("Muslim");
      }
      else if(this.udisePdfDetails['minority_grp'] == 2){
        this.form.controls['minority_grp'].setValue("Sikh");
      }
      else if(this.udisePdfDetails['minority_grp'] == 3) {
        this.form.controls['minority_grp'].setValue("Jain");
      }
      else if (this.udisePdfDetails['minority_grp'] == 4) {
        this.form.controls['minority_grp'].setValue("Christian");
      }
      else if (this.udisePdfDetails['minority_grp'] == 5) {
        this.form.controls['minority_grp'].setValue("Parsi");
      }
      else if (this.udisePdfDetails['minority_grp'] == 6) {
        this.form.controls['minority_grp'].setValue("Buddhist");
      }
      else if (this.udisePdfDetails['minority_grp'] == 7) {
        this.form.controls['minority_grp'].setValue("Any Other");
      }
      else if (this.udisePdfDetails['minority_grp'] == 8) {
        this.form.controls['minority_grp'].setValue("Linguistic Minority");
      }



      /* training details */

      if (this.udisePdfDetails['acad_mnth_start'] == 1) {
        this.form.controls['acad_mnth_start'].setValue("January");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 2) {
        this.form.controls['acad_mnth_start'].setValue("February");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 3) {
        this.form.controls['acad_mnth_start'].setValue("March");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 4) {
        this.form.controls['acad_mnth_start'].setValue("April");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 5) {
        this.form.controls['acad_mnth_start'].setValue("May");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 6) {
        this.form.controls['acad_mnth_start'].setValue("June");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 7) {
        this.form.controls['acad_mnth_start'].setValue("July");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 8) {
        this.form.controls['acad_mnth_start'].setValue("August");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 9) {
        this.form.controls['acad_mnth_start'].setValue("September");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 10) {
        this.form.controls['acad_mnth_start'].setValue("October");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 11) {
        this.form.controls['acad_mnth_start'].setValue("November");
      }
      else if (this.udisePdfDetails['acad_mnth_start'] == 12) {
        this.form.controls['acad_mnth_start'].setValue("December");
      }
      else {
        this.form.controls['bio_fac_avail'].setValue("-");
      }


      if (this.udisePdfDetails['txtbk_recd_yn'] == 1) {
        this.form.controls['txtbk_recd_yn'].setValue("YES");
      }
      else if (this.udisePdfDetails['txtbk_recd_yn'] == 2) {
        this.form.controls['txtbk_recd_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['special_train'] == 1) {
        this.form.controls['special_train'].setValue("YES");
      }
      else if (this.udisePdfDetails['special_train'] == 2) {
        this.form.controls['special_train'].setValue("NO");
      }

      if (this.udisePdfDetails['txtbk_recd_mon'] == 1) {
        this.form.controls['txtbk_recd_mon'].setValue("January");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 2) {
        this.form.controls['txtbk_recd_mon'].setValue("February");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 3) {
        this.form.controls['txtbk_recd_mon'].setValue("March");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 4) {
        this.form.controls['txtbk_recd_mon'].setValue("April");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 5) {
        this.form.controls['txtbk_recd_mon'].setValue("May");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 6) {
        this.form.controls['txtbk_recd_mon'].setValue("June");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 7) {
        this.form.controls['txtbk_recd_mon'].setValue("July");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 8) {
        this.form.controls['txtbk_recd_mon'].setValue("August");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 9) {
        this.form.controls['txtbk_recd_mon'].setValue("September");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 10) {
        this.form.controls['txtbk_recd_mon'].setValue("October");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 11) {
        this.form.controls['txtbk_recd_mon'].setValue("November");
      }
      else if (this.udisePdfDetails['txtbk_recd_mon'] == 12) {
        this.form.controls['txtbk_recd_mon'].setValue("December");
      }
      else {
        this.form.controls['txtbk_recd_mon'].setValue("-");
      }


      if (this.udisePdfDetails['stu_councel'] == 1) {
        this.form.controls['stu_councel'].setValue("YES");
      }
      else if (this.udisePdfDetails['stu_councel'] == 2) {
        this.form.controls['stu_councel'].setValue("NO");
      }

      if (this.udisePdfDetails['guidline_disply_brd'] == 1) {
        this.form.controls['guidline_disply_brd'].setValue("YES");
      }
      else if (this.udisePdfDetails['guidline_disply_brd'] == 2) {
        this.form.controls['guidline_disply_brd'].setValue("NO");
      }

      if (this.udisePdfDetails['grnt_frstlvl_conslrs'] == 1) {
        this.form.controls['grnt_frstlvl_conslrs'].setValue("YES");
      }
      else if (this.udisePdfDetails['grnt_frstlvl_conslrs'] == 2) {
        this.form.controls['grnt_frstlvl_conslrs'].setValue("NO");
      }

      if (this.udisePdfDetails['guidlins_counsling'] == 1) {
        this.form.controls['guidlins_counsling'].setValue("YES");
      }
      else if (this.udisePdfDetails['guidlins_counsling'] == 2) {
        this.form.controls['guidlins_counsling'].setValue("NO");
      }

      if (this.udisePdfDetails['sensitiz_parnts'] == 1) {
        this.form.controls['sensitiz_parnts'].setValue("YES");
      }
      else if (this.udisePdfDetails['sensitiz_parnts'] == 2) {
        this.form.controls['sensitiz_parnts'].setValue("NO");
      }

      if (this.udisePdfDetails['awrnss_studscomm'] == 1) {
        this.form.controls['awrnss_studscomm'].setValue("YES");
      }
      else if (this.udisePdfDetails['awrnss_studscomm'] == 2) {
        this.form.controls['awrnss_studscomm'].setValue("NO");
      }

      if (this.udisePdfDetails['studs_feedbck'] == 1) {
        this.form.controls['studs_feedbck'].setValue("YES");
      }
      else if (this.udisePdfDetails['studs_feedbck'] == 2) {
        this.form.controls['studs_feedbck'].setValue("NO");
      }

      if (this.udisePdfDetails['safty_sugstn'] == 1) {
        this.form.controls['safty_sugstn'].setValue("YES");
      }
      else if (this.udisePdfDetails['safty_sugstn'] == 2) {
        this.form.controls['safty_sugstn'].setValue("NO");
      }

      if (this.udisePdfDetails['copies_studs'] == 1) {
        this.form.controls['copies_studs'].setValue("YES");
      }
      else if (this.udisePdfDetails['copies_studs'] == 2) {
        this.form.controls['copies_studs'].setValue("NO");
      }

      if (this.udisePdfDetails['cce_impl'] == 1) {
        this.form.controls['cce_impl'].setValue("YES");
      }
      else if (this.udisePdfDetails['cce_impl'] == 2) {
        this.form.controls['cce_impl'].setValue("NO");
      }


      /* land */

      if (this.udisePdfDetails['play_facility'] == 1) {
        this.form.controls['play_facility'].setValue("YES");
      }
      else if (this.udisePdfDetails['play_facility'] == 2) {
        this.form.controls['play_facility'].setValue("NO");
      }

      if (this.udisePdfDetails['land_exp_scl'] == 1) {
        this.form.controls['land_exp_scl'].setValue("YES");
      }
      else if (this.udisePdfDetails['land_exp_scl'] == 2) {
        this.form.controls['land_exp_scl'].setValue("NO");
      }

      if (this.udisePdfDetails['ramp_building_yn'] == 1) {
        this.form.controls['ramp_building_yn'].setValue("YES");
      }
      else if (this.udisePdfDetails['ramp_building_yn'] == 2) {
        this.form.controls['ramp_building_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['staffquarter'] == 1) {
        this.form.controls['staffquarter'].setValue("YES");
      }
      else if (this.udisePdfDetails['staffquarter'] == 2) {
        this.form.controls['staffquarter'].setValue("NO");
      }

      if (this.udisePdfDetails['toil_land_avail'] == 1) {
        this.form.controls['toil_land_avail'].setValue("YES");
      }
      else if (this.udisePdfDetails['toil_land_avail'] == 2) {
        this.form.controls['toil_land_avail'].setValue("NO");
      }

      if (this.udisePdfDetails['napkin_incin'] == 1) {
        this.form.controls['napkin_incin'].setValue("YES");
      }
      else if (this.udisePdfDetails['napkin_incin'] == 2) {
        this.form.controls['napkin_incin'].setValue("NO");
      }

      if (this.udisePdfDetails['incinerator'] == 1) {
        this.form.controls['incinerator'].setValue("YES");
      }
      else if (this.udisePdfDetails['incinerator'] == 2) {
        this.form.controls['incinerator'].setValue("NO");
      }

      if (this.udisePdfDetails['toil_handwash_soap'] == 1) {
        this.form.controls['toil_handwash_soap'].setValue("YES");
      }
      else if (this.udisePdfDetails['toil_handwash_soap'] == 2) {
        this.form.controls['toil_handwash_soap'].setValue("NO");
      }

      if (this.udisePdfDetails['handwash_meal_yn'] == 1) {
        this.form.controls['handwash_meal_yn'].setValue("YES");
      }
      else if (this.udisePdfDetails['handwash_meal_yn'] == 2) {
        this.form.controls['handwash_meal_yn'].setValue("NO");
      }

      if (this.udisePdfDetails['drnkwater_avail'] == 1) {
        this.form.controls['drnkwater_avail'].setValue("YES");
      }
      else if (this.udisePdfDetails['drnkwater_avail'] == 2) {
        this.form.controls['drnkwater_avail'].setValue("NO");
      }

    });
  }


  getMediumInstruction(item) {
    const mediumentry = this.form.controls.schoolnew_mediumentry_details as FormArray;
    for (let i = 0; i < item.length; i++) {
      mediumentry.push(this.fb.group({
        school_key_id: this.schoolId,
        medium_instrut: item[i].medium_instrut,
        other_medium: item[i].other_medium,
        medium: item[i].medium,
      })
      )
    }
  }

  getLanguageList(items) {
    const langtaught_entry = this.form.controls.schoolnew_langtaught_entry_details as FormArray;
    for (let i = 0; i < items.length; i++) {
      langtaught_entry.push(this.fb.group({
        school_key_id: this.schoolId,
        lang_taught: items[i].langtaught,
        lang: items[i].lang
      })
      )
    }
  }

  getVocationList(data) {
    debugger;
    const vocation_entry = this.form.controls.voc_trade_details as FormArray;
    for (let i = 0; i < data.length; i++) {
      vocation_entry.push(this.fb.group({
        school_key_id: this.schoolId,
        voc_trade: data[i].voc_trade,
        trade: data[i].trade,
      })
      )
    }
  }

  dayWorkInfo(datas) {
    const dayWorkInfoFormArray = this.form.controls.daysHoursInfo as FormArray;
    for (let i = 0; i < datas.length; i++) {
      dayWorkInfoFormArray.push(this.fb.group({
        school_type: datas[i].school_type,
        instr_dys: datas[i].instr_dys,
        stud_hrs: datas[i].stud_hrs,
        teach_hrs: datas[i].teach_hrs,
        cce_impl: datas[i].cce_impl,
        cce_cum: datas[i].cce_cum,
        cce_shared: datas[i].cce_shared,
      })
      )
    }
  }

  totalClubRecords(clubs) {
    const clubInfoFormArray = this.form.controls.clubDetails as FormArray;
    for (let i = 0; i < clubs.length; i++) {
      clubInfoFormArray.push(this.fb.group({
        school_key_id: this.schoolId,
        extra_cc: clubs[i].extra_cc,
        others_cc: clubs[i].others_cc,
        clubs: clubs[i].clubs
      })
      )
    }
  }

  getInspection(ins) {
    const inspectionFormArray = this.form.controls.inspectionDetails as FormArray;
    for (let i = 0; i < ins.length; i++) {
      inspectionFormArray.push(this.fb.group({
        school_key_id: this.schoolId,
        officer_types: ins[i].officer_types,
        purposes: ins[i].purposes,
        date_inspect: ins[i].date_inspect
      })
      )
    }
  }


  getClassRoom(classdata) {
    const classFormArray = this.form.controls.classroomDetails as FormArray;
    for (let i = 0; i < classdata.length; i++) {
      classFormArray.push(this.fb.group({
        school_key_id: this.schoolId,
        category_name: classdata[i].category_name,
        num_rooms: classdata[i].num_rooms,
      })
      )
    }
  }

  getLibrary(libdata) {
    const libFormArray = this.form.controls.libraryDetails as FormArray;
    for (let i = 0; i < libdata.length; i++) {
      libFormArray.push(this.fb.group({
        school_key_id: this.schoolId,
        library_types: libdata[i].library_types,
        num_books: libdata[i].num_books,
        ncert_books: libdata[i].ncert_books
      })
      )
    }
  }

  getBlock(blockdata) {
    debugger;
    const blockFormArray = this.form.controls.blockDetails as FormArray;
    for (let i = 0; i < blockdata.length; i++) {
      blockFormArray.push(this.fb.group({
        school_key_id: this.schoolId,
        construct_types: blockdata[i].construct_types,
        total_flrs: blockdata[i].total_flrs,
        off_room: blockdata[i].off_room,
        lab_room: blockdata[i].lab_room,
        library_room: blockdata[i].library_room,
        comp_room: blockdata[i].comp_room,
        art_room: blockdata[i].art_room,
        staff_room: blockdata[i].staff_room,
        hm_room: blockdata[i].hm_room,
        girl_room: blockdata[i].girl_room,
        tot_classrm_use: blockdata[i].tot_classrm_use,  
        tot_classrm_nouse: blockdata[i].tot_classrm_nouse, 
        good_condition: blockdata[i].good_condition,
        need_minorrep: blockdata[i].need_minorrep,
        need_majorrep: blockdata[i].need_majorrep,
        total_room: blockdata[i].tot_classrm_use +  blockdata[i].tot_classrm_nouse,
        blockno: blockdata[i].blockno,
      })
      )
    }
  }


  pdfGenerate() {
    const doc =new jspdf.default(0,0);
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    // var content = document.getElementById('wrapper');
     this.content = this.reportContent.nativeElement;
     console.log(this.content.innerHTML);

    doc.fromHTML(this.content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('udise' + '.pdf');
  };

  onpdfGenerate() {
    debugger;
    var data = document.getElementById('wrapper');
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    html2canvas(data).then(canvas => {
      this.canvasImage = canvas;
      // Few necessary setting options
    });
    var data1 = document.getElementById('wrapper1');
    html2canvas(data1).then(canvas1 => {
      this.canvasImage1 = canvas1;
      // Few necessary setting options
    });
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = this.canvasImage.height * imgWidth / this.canvasImage.width;
    var imgHeight1 = this.canvasImage1.height * imgWidth / this.canvasImage1.width;
    var heightLeft = imgHeight;

    const contentDataURL = this.canvasImage.toDataURL('image/png');
    const contentDataURL1= this.canvasImage1.toDataURL('image/png')
  
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight,pageHeight)
    pdf.addPage();
    pdf.addImage(contentDataURL1, 'PNG', 0, position, imgWidth, imgHeight1,pageHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF 
  }


  exportAsPDF()
      {
        debugger;
        let data = document.getElementById('MyDIv');  
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jspdf('p', 'cm', 'a4'); 
          pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29);  
          pdf.save('Filename.pdf');   
        }); 
        let data1 = document.getElementById('MyDIv1'); 
        html2canvas(data1).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jspdf('p', 'cm', 'a4'); 
          pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29);  
          pdf.save('Filename.pdf');   
        }); 
      }

      convert(){
  debugger; 
  // let testcolumns = ["TestCol1", "TestCol2"];
  //   let testrows = [["test item 1", "test item 2"]];
  //   let doc = new jspdf();
  //   doc.autoTable(testcolumns, testrows);
  //   doc.save('sample.pdf');
  //     }
        var item = {
          "Name" : "XYZ",
          "Age" : "22",
          "Gender" : "Male"
        };
        var doc = new jspdf();
        var col = ["", ""];
        var rows = [];
    
        for(var key in item){
            var temp = [key, item[key]];
            rows.push(temp);
        }
    
        doc.autoTable(col, rows);
        doc.save('Test.pdf');
      }
      

      makePdf() { 
        debugger;
        let doc = new jspdf();
        doc.addHTML(this.reportContent.nativeElement, function() {
           doc.save("obrz.pdf");
        });
      }

      onPrint() {
        window.print();
      }

      printDiv(divName) {
        debugger;

        var printContents = document.getElementById(divName).innerHTML;
          var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
       
        window.print();
        document.body.innerHTML = originalContents;
   }
  
}
