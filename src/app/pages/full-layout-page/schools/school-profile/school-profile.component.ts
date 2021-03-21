import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.css']
})
export class SchoolProfileComponent implements OnInit {
  form: FormGroup;
  public dataHeader: any[] = [];
  public categoryList: any[] = [];
  public sectionList: any[] = [];
  public sectionDataHeader: any[] = [];
  public managementList:any[] = [];
  public managementDataHeader: any[] = [];
  public schoolId: number;
  public schoolBasicDetails: any;
  clubList : any[] = [];
  mediumList: any[] = [];
  langList: any[] = [];
  constructor(private schoolService:schoolsService,
    private userSessionService : UserSessionService,
    public fb: FormBuilder,) {
    this.schoolId = this.userSessionService.schoolId();
    this.getSchoolDetail();
   }

  ngOnInit() {
    this.initialValidator();
    this.sampleData();
  }
  sampleData()
  {
    this.categoryList =[
      { "category_name": "Primary only with grades 1 to 5", "code": "1"}, 
      { "category_name": "Upper Primary with grades 1 to 8", "code": "2"},
      { "category_name": "Higher Secondary with grades 1 to 12", "code": "3"},
      { "category_name": "Upper Primary only with grades 6 to 8", "code": "4"},
      { "category_name": "Higher Secondary with grades 6 to 12", "code": "5"},
      { "category_name": "Secondary/Sr. Sec. with grades 1 to 10", "code": "6"},
      { "category_name": "Secondary/Sr. Sec. with grades 6 to 10", "code": "7"},
      { "category_name": "Secondary/Sr. Sec. only with grades 9 & 10", "code": "8"},
      { "category_name": "Higher Secondary with grades 9 to 12", "code": "10"},
      { "category_name": "Hr. Sec. /Jr. College only with grades 11 & 12", "code": "11"}
      ];
      this.sectionList =[
        { "classes": "I", "no_sections": ""}, 
        { "classes": "II", "no_sections": ""}, 
        { "classes": "III", "no_sections": ""}, 
        { "classes": "IV", "no_sections": ""}, 
        { "classes": "V", "no_sections": ""}, 
        { "classes": "VI", "no_sections": ""}, 
        { "classes": "VII", "no_sections": ""}, 
        { "classes": "VIII", "no_sections": ""}, 
        { "classes": "IX", "no_sections": ""}, 
        { "classes": "X", "no_sections": ""}, 
        { "classes": "XI", "no_sections": ""}, 
        { "classes": "XII", "no_sections": ""}, 
        ];
        this.managementList =[
          { "management_details": "Department of Education", "code": "1"}, 
          { "management_details": "Tribal Welfare Department", "code": "2"},
          { "management_details": "Local Body", "code": "3"},
          { "management_details": "Government Aided", "code": "4"},
          { "management_details": "Private Unaided (Recognized)", "code": "5"},
          { "management_details": "Other Govt. managed schools", "code": "6"},
          { "management_details": "Unrecognized", "code": "8"},
          { "management_details": "Social Welfare Department", "code": "90"},
          { "management_details": "Ministry of Labour", "code": "91"},
          { "management_details": "Kendriya Vidyalaya / Central School ", "code": "92"},
          { "management_details": "Jawahar Navodaya Vidyalaya", "code": "93"},
          { "management_details": "Sainik School", "code": "94"},
          { "management_details": "Railway School", "code": "95"},
          { "management_details": "Central Tibetan School", "code": "96"},
          { "management_details": "Madarsa Recognized (by Wakf board /Madarsa Board)", "code": "97"},
          { "management_details": "Madarsa Unrecognized", "code": "98"},
          ];
      this.dataHeader = [
        { field: 'code', header: 'Code' },
        {field: 'category_name', header: 'Details of Category' }   
    ];
    this.managementDataHeader = [
      { field: 'code', header: 'Code' },
      {field: 'management_details', header: 'Details of Management' }   
    ];
    this.sectionDataHeader = [
      { field: 'classes', header: 'Classes' },
      // {field: 'no_sections', header: 'Number of Sections' },
     
  ];
  }
  initialValidator() {
    this.form = this.fb.group({
      'udise_code': new FormControl('', null),
      'latitude': new FormControl('', null),
      'longitude': new FormControl('', null),
       'school_name': new FormControl('', null),
       'block_type': new FormControl('', null),
      'village_ward': new FormControl('', null),
      'village_munci': new FormControl('', null),
       'school_type': new FormControl('', null),
      'pincode': new FormControl('', null),
       'block_name': new FormControl('', null),
       'assembly_name': new FormControl('', null),
       'parli_name': new FormControl('', null),
       'district_name': new FormControl('', null),
       'office_std_code': new FormControl('', null),
       'std_code': new FormControl('', null),
       'office_landline': new FormControl('', null),
       'office_mobile': new FormControl('', null),
       'corr_mobile': new FormControl('', null),
       'sch_email': new FormControl('', null),
       'website': new FormControl('', null),
       'category_code': new FormControl('', null),
       'school_key_id' : new FormControl('', null),
       'low_class': new FormControl('', null),
       'high_class': new FormControl('', null),
      'yr_estd_schl': new FormControl('', null),
      'yr_rec_schl_elem': new FormControl('', null),
      'yr_rec_schl_sec': new FormControl('', null),
      'yr_rec_schl_hsc': new FormControl('', null),
      'cwsn_scl': new FormControl('', null),
      'shftd_schl': new FormControl('', null),
      'typ_resid_schl': new FormControl('', null),
      'anganwadi': new FormControl('', null),
      'anganwadi_center': new FormControl('', null),
      'angan_wrks': new FormControl('', null),
      'angan_childs': new FormControl('', null),
      'land_avail_sqft': new FormControl('', null),
      'play_area_sqft': new FormControl('', null),
      'play_land_area': new FormControl('', null),
      'land_ownersip': new FormControl('', null),
      'land_rent_amt': new FormControl('', null),
      'land_lease_perid': new FormControl('', null),
      'valid_upto': new FormControl('', null),
      'cmpwall_type': new FormControl('', null),
      'cmpwall_perimtr': new FormControl('', null),
      'cmpwall_length': new FormControl('', null),
      'build_block_no': new FormControl('', null),
      'classrm_undr_constr': new FormControl('', null),
      'classrm_desk_studs': new FormControl('', null),
      'ramp_disable_child': new FormControl('', null),
      'ramp_handrail': new FormControl('', null),
      'rooms_staffquartrs': new FormControl('', null),
      'fulltime_lib': new FormControl('', null),
      'toil_gents_tot': new FormControl('', null),
      'toil_ladies_tot': new FormControl('', null),
      'urinal_gents_tot': new FormControl('', null),
      'urinals_tot_ladies': new FormControl('', null),
      'toil_bys_inuse': new FormControl('', null),
      'toil_notuse_bys': new FormControl('', null),
      'toil_nonfunc_bys': new FormControl('', null),
      'toil_inuse_grls': new FormControl('', null),
      'toil_notuse_grls': new FormControl('', null),
      'toil_reasn_grls': new FormControl('', null),
      'cwsntoil_inuse_bys': new FormControl('', null),
      'cwsntoil_notuse_bys': new FormControl('', null),
      'cwsntoil_reasn_bys': new FormControl('', null),
      'cwsntoil_inuse_grls': new FormControl('', null),
      'cwsntoil_notuse_grls': new FormControl('', null),
      'cwsntoil_reasn_grls': new FormControl('', null),
      'urinls_inuse_bys': new FormControl('', null),
      'urinls_notuse_bys': new FormControl('', null),
      'urinls_reasn_bys': new FormControl('', null),
      'urinls_inuse_grls': new FormControl('', null),
      'urinls_notuse_grls': new FormControl('', null),
      'urinls_reasn_grls': new FormControl('', null),
      'toil_waterfac_bys': new FormControl('', null),
      'toil_waterfac_grls': new FormControl('', null),
      'urinls_waterfac_bys': new FormControl('', null),
      'urinls_waterfac_grls': new FormControl('', null),
      'toil_sanit_wrks': new FormControl('', null),
      'toil_land_avail': new FormControl('', null),
      'napkin_avail_no': new FormControl('', null),
      'napkin_func_no': new FormControl('', null),
      'inci_auto_avail_no': new FormControl('', null),
      'inci_auto_func_no': new FormControl('', null),
      'inci_man_avail_no': new FormControl('', null),
      'inci_man_func_no': new FormControl('', null),
      'tot_handwash_bys': new FormControl('', null),
      'tot_handwash_grls': new FormControl('', null),
      'drnkwater_avail': new FormControl('', null),
      'well_top': new FormControl('', null),
      'water_test': new FormControl('', null),
      'overheadtank_avail': new FormControl('', null),
      'waterpuri_avail': new FormControl('', null),
      'schl_rainwtr_hrv': new FormControl('', null),
      'solar_panel': new FormControl('', null),
      'kitchen_garden': new FormControl('', null),
      'class_dustbin': new FormControl('', null),
      'waste_toilets': new FormControl('', null),
      'waste_kitchen': new FormControl('', null),
      'cal': new FormControl('', null),
      'clab': new FormControl('', null),
      'smc_const': new FormControl('', null),
      'smc_acc_no': new FormControl('', null),
      'smc_acc_name': new FormControl('', null),
      'smc_bank': new FormControl('', null),
      'smc_chair_name': new FormControl('', null),
      'smc_chair_mble': new FormControl('', null),
      'smc_tot_mle': new FormControl('', null),
      'smc_tot_fmle': new FormControl('', null),
      'smc_prnts_mle': new FormControl('', null),
      'smc_prnts_fmle': new FormControl('', null),
      'smc_rep_mle': new FormControl('', null),
      'smc_rep_fmle': new FormControl('', null),
      'smc_weakr_mle': new FormControl('', null),
      'smc_weakr_fmle': new FormControl('', null),
      'smc_no_prev_acyr': new FormControl('', null),
      'smc_const_yr': new FormControl('', null),
      'smc_sdp': new FormControl('', null),
      'smdc_constitu': new FormControl('', null),
      'smdc_acc_name': new FormControl('', null),
      'smdc_acc_no': new FormControl('', null),
      'smdc_bank': new FormControl('', null),
      'smdc_tot_mle': new FormControl('', null),
      'smdc_tot_fmle': new FormControl('', null),
      'smdc_parnt_mle': new FormControl('', null),
      'smdc_parnt_fmle': new FormControl('', null),
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
      'smdc_const_yr': new FormControl('', null),
      'smdc_no_last_acyr': new FormControl('', null),
      'smdc_sip': new FormControl('', null),
      'smdc_contrib_amt': new FormControl('', null),
      'smdc_chair_name': new FormControl('', null),
      'sbc_const': new FormControl('', null),
      'smdc_chair_mble': new FormControl('', null),
      'acadecomm_const': new FormControl('', null),
      'pta_const': new FormControl('', null),
      'pta_est_yr': new FormControl('', null),
      'pta_no_curyr': new FormControl('', null),
      'pta_reg_no': new FormControl('', null),
      'pta_subscri_amt': new FormControl('', null),
      'pta_chair_name': new FormControl('', null),
      'pta_chair_mble': new FormControl('', null),
    });
  }
  check()
  {
    alert(this.form.value.udise_code);
  }
  getSchoolDetail()
  {
    debugger;
    this.schoolService.getBasicsList(this.schoolId).subscribe((res) => {
      if (res) {
        debugger;
        this.schoolBasicDetails = res.result.schoolinfo;
        this.mediumList =  this.schoolBasicDetails['medium'];
        this.langList =  this.schoolBasicDetails['langetr'];
        this.clubList =this.schoolBasicDetails['clubs'];
         this.form.patchValue(this.schoolBasicDetails);
      }
    });
  }
}
