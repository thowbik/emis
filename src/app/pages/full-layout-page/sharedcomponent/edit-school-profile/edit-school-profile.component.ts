import { Component, OnInit, ElementRef } from '@angular/core';
import { schoolsService } from '../../schools/schools.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-school-profile',
  templateUrl: './edit-school-profile.component.html',
  styleUrls: ['./edit-school-profile.component.css']
})
export class EditSchoolProfileComponent implements OnInit {
  public SchoolList : any[] = [];
  public noDataFound : boolean = false;
  public schoolType : any[] = [];
  public noSchoolType : boolean = false;
  public showDialogBox : boolean = false;
  public SchoolProfileDetails : FormGroup;
  public dialogTitle : string;
  public SchoolManagementList : any[] = [];
  public SchoolDepartmentList : any[] = [];
  public submitted : boolean;
  public loginLevel : boolean = false;

  // DropDown Values
  public SchoolStatus : any[] = [];
  public SchoolCategory : any[] = [];
  public SchoolManagementCategoryOption : any[] = [];
  public SchoolManagementOption : any[] = [];
  public SchoolCategoryLevel : any[] = [];
  public SchoolTypeOption : any[] = [];
  public SchoolMinorityOption : any[] = [];
  public MinorityGroupOption : any[] = [];
  public ClassLevelOption : any[] = [];
  public EducationDistrictOption : any[] = [];
  public BlockNameOption : any[] = [];
  public SchoolSituatedOption : any[] = [];
  public TypeResidentialSchoolOption : any[] = [];
  public SchoolYearLevel : any[] = [];
  public SchoolSpecialEducator: any[] = [];
  public EstablishmentSchoolYear : any[] = [];
  public YearofFirstRecognization : any[] = [];
  public SecondaryYearLevel : any[] = [];
  public UpperPrimaryYearLevel : any[] = [];
  public HigherSecondaryYearLevel : any[] = [];
  public UpperPSecondaryOption : any[] = [];
  public SecondarytoHSecondaryOption : any[] = [];
  public YearOfLastRenewal : any[] = [];
  public DistrictNameOption : any[] = [];
  public LocalBodyOption : any[] = [];
  public LocalBodyAllOption : any[] = [];
  public RuralUrbanOption : any[] = [];
  public ClusterOptions : any[] = [];
  public WardsListOption : any[] = [];
  public AssemblyOption : any[] = [];
  public ParliamentOption : any[] = [];
  public CityOption : any[] = [];
  public AccordionTabShow : number = 1;
  public EditSchoolProfileStatus : number;
  hapitationlist: any;
  listhabitation: any;
  manageCateId: number = 0;
  recognizationshow: boolean = false;
  public pageStageLevel : number;
  public stateSchoolCategoryOption : any[]= [];
  public stateSchoolData : any[] = [];
  public stateNodataFound : number;
  public selectedDisctSchoolList : any[]= [];
  pipe = new DatePipe('en-US');
  userTypeId: number;
  districtId: any = '';
  range : any = [];
  tempDetails: any = [];
  blockList: any = [];
  public loggedInType: boolean = false;
  public deinedurl: any;
  
  public LocalBodyOption_prnt : any[] = [];
  public LocalBodyAllOption_prnt : any[] = [];
  teacherType: number;
  isBRTEuser : boolean = false;
  constructor(private userSessionService: UserSessionService, public schoolService: schoolsService, public fb: FormBuilder, private el: ElementRef, private alertService: AlertService) { 
    this.userTypeId = Number(this.userSessionService.userTypeId());
    this.teacherType= this.userSessionService.teacherType();
    console.log('userSession Data Line No 83 : ',this.userSessionService);
    this.deinedurl= './assets/img/AccessDeniedError.png';

      switch(this.userTypeId){
        case 3:
          this.districtId = this.userSessionService.userId();
          console.info('CEO Type Id is : ',this.userTypeId);
          this.loggedInType = true;
          break;
        // case 5: 
        //   console.info('User Type Id : ',this.userTypeId);
        //   this.loggedInType = true;
        //   break;
        case 9: case 14:
          this.districtId = this.userSessionService.districtId(); 
          console.info('DC AND BRET Type Id : ',this.userTypeId);
          this.loggedInType = true;
          break;
        default:
          this.loggedInType = false;
          console.info('Can`t Found User Type Id : Access Deined (or) Invalid');
          this.alertService.info("Access Deined !");
          break;
      }

  }
  // school/edit-school-profile

  ngOnInit() {
this.isBRTEuser = ((this.userTypeId == 14) && (this.teacherType == 103) ) ? true : false;
// || this.userTypeId === 9
   if(this.userTypeId === 3  || this.userTypeId === 14){
      this.getSchoolProfileList(this.districtId); 
      this.loginLevel = false;
      this.getSchoolEditFormDetails();
      this.getDropDownValues();
   }
   else if(this.userTypeId === 9){
      // this.getStateSchoolProfile();
      this.getSelectedDisctSchool(this.districtId,this.userSessionService.districtName,0);
      this.loginLevel = true;
      this.getSchoolEditFormDetails();
      this.getDropDownValues();
   }
   else{
      alert('Access Denied');
      this.loginLevel = false;
   }
  }

  getStateSchoolProfile(){
    this.pageStageLevel = 1;
    const id = '';
    this.schoolService.getStateSchoolProfileData(id).subscribe((res) => {
      if(res.schoollist.length>0){
        this.stateSchoolData = res.schoollist;
      }
      else
      {
        this.stateNodataFound = 1;
      }
      if(res.schoolcate.length>0){
        this.stateSchoolCategoryOption = res.schoolcate;
      }
    })
  }
  tempDistid : any = '';
  tempDistname; any = '';
  getSelectedDisctSchool(id,name,flag){
    debugger;
    this.pageStageLevel = 2;
    this.selectedDisctSchoolList = [];
    this.schoolService.getSelecteddisctSchool(id).subscribe((res) => {
      console.log(res, 'state')
      if(res.dataStatus){
         if(res.schoollist.length>0){
           this.selectedDisctSchoolList = res.schoollist;
           flag == 0 ? this.getDropdownValues(res):'';
           this.tempDistid = id;
           this.tempDistname = name;
           console.log('getSelectedDisctSchool flag',flag);
          }else{
            this.alertService.warning('Data Not Found');
            this.stateNodataFound = 2;
          }}
      else
      {
        this.alertService.warning(res.message)
        this.stateNodataFound = 2;
      }
    })
  }

  // Get CEO and District Login (School Profile List)
  getSchoolProfileList(districtId){
    debugger
    this.pageStageLevel = 3;
    const id = '';
    let params = '?district_id='+districtId;
    this.schoolService.getSchoolProfileData(params).subscribe((res) => {
      debugger;
      console.log(res , 'SchoolProfileData BRTE and District');
      this.getDropdownValues(res)
      if(res.schoollist.length>0){
        this.SchoolList = res.schoollist;
      }
      else
      {
        this.noDataFound = true;
      }
      // Get School Type List 
      if(res.schoolcate.length>0){
        this.schoolType = res.schoolcate;
      }
      else{
        this.noSchoolType = true;
      }
      if(res.block.length > 0 && this.userTypeId == 14){
        this.blockList = res.block;
      }
    })
  }


  // Dropdonws list
  getDropdownValues(res){
    // Get School Management
    if(res.schoolmanagement.length>0){
      this.SchoolManagementList = res.schoolmanagement;
    }

    // Get School Department
    if(res.schooldepartment.length>0){
      this.SchoolDepartmentList = res.schooldepartment;
    }

    // Get School Category
    if(res.category.length>0){
      const schlCategory = res.category
      this.SchoolCategoryLevel.push({ value: "", label: "Choose" })
      for (let i = 0; i < schlCategory.length; i++) {
        this.SchoolCategoryLevel.push({ value: schlCategory[i].id, label: schlCategory[i].category_name })
      }
    }

    // Minority School Group
    if(res.minority_list.length>0){
      const minorityList = res.minority_list
      this.MinorityGroupOption.push({ value: "", label: "Choose" })
      for (let i = 0; i < minorityList.length; i++) {
        this.MinorityGroupOption.push({ value: minorityList[i].id, label: minorityList[i].minority })
      }
    }

    // Education District Name
    if(res.edu_dist_details.length>0){
      const eduDistDetails = res.edu_dist_details
      this.EducationDistrictOption.push({ value: "", label: "Choose" })
      for (let i = 0; i < eduDistDetails.length; i++) {
        this.EducationDistrictOption.push({ value: eduDistDetails[i].edu_dist_id, label: eduDistDetails[i].edu_dist_name })
      }
    }

    // Education District Name
    if(res.block.length>0){
      const blockName = res.block
      this.BlockNameOption.push({ value: "", label: "Choose" })
      for (let i = 0; i < blockName.length; i++) {
        this.BlockNameOption.push({ value: blockName[i].id, label: blockName[i].block_name })
      }
    }

    // Type of Residential School
    if(res.resitype.length>0){
      const resType = res.resitype
      this.TypeResidentialSchoolOption.push({ value: "", label: "Choose" })
      for (let i = 0; i < resType.length; i++) {
        this.TypeResidentialSchoolOption.push({ value: resType[i].RESITYPE_ID, label: resType[i].RESITYPE_DESC })
      }
    }

    // Cluster
    if(res.cluster.length>0){
      const clusterType = res.cluster
      this.ClusterOptions.push({ value: "", label: "Choose" })
      for (let i = 0; i < clusterType.length; i++) {
        this.ClusterOptions.push({ value: clusterType[i].clus_code, label: clusterType[i].clus_name })
      }
    }

    // Year List
    var present = new Date().getFullYear(), previos = 1800;
    this.SchoolYearLevel.push({ value: "", label: "Choose" });
    this.SchoolYearLevel.push({ value: "0", label: "Not Applicable" });
      for(let i = previos; i<=present; i++){
        let yrValue = i.toString();
        this.SchoolYearLevel.push({ value: yrValue, label: yrValue });
      }
      console.log('this.SchoolYearLevel',this.SchoolYearLevel);
      var previos1 = 1800;
      this.EstablishmentSchoolYear.push({ value: "", label: "Choose" });
      for(let i = previos1; i<=present; i++){
       let yrValue = i.toString();
        this.EstablishmentSchoolYear.push({ value: yrValue, label: yrValue });
      }

      // District Name
        const districtId = res.district
        this.DistrictNameOption.push({ value: "", label: "Choose" })
        this.DistrictNameOption.push({ value: districtId.id, label: districtId.district_name })

      // Local Body
      this.LocalBodyOption_prnt = res.local_body
      this.LocalBodyOption.push({ value: "", label: "Choose" })
      for(let i=0; i<this.LocalBodyOption_prnt.length;i++){
        this.LocalBodyOption.push({ value: this.LocalBodyOption_prnt[i].zone_type_id, label: this.LocalBodyOption_prnt[i].localbody_name })
      }

      // Local Body All
      this.LocalBodyAllOption_prnt = res.local_bodyall
      this.LocalBodyAllOption.push({ value: "", label: "Choose" })
      for(let i=0; i<this.LocalBodyAllOption_prnt.length;i++){
        this.LocalBodyAllOption.push({ value: this.LocalBodyAllOption_prnt[i].id, label: this.LocalBodyAllOption_prnt[i].name })
      }

      // Assembly Option
      const assemblyId = res.assembly
      this.AssemblyOption.push({ value: "", label: "Choose" })
      for(let i=0; i<assemblyId.length;i++){
        this.AssemblyOption.push({ value: assemblyId[i].id, label: assemblyId[i].assembly_name })
      }

      // Parliament Option
      const parliamentId = res.parliament
      this.ParliamentOption.push({ value: "", label: "Choose" })
      for(let i=0; i<parliamentId.length;i++){
        this.ParliamentOption.push({ value: parliamentId[i].id, label: parliamentId[i].parli_name })
      }

      // City List
      const cityId = res.city
      this.CityOption.push({ value: "", label: "Choose" })
      for(let i=0; i<cityId.length;i++){
        this.CityOption.push({ value: cityId[i].id, label: cityId[i].city_name })
      }
  }

  // State

  getSelectedchoolTypeState(event){
    const id = event.value.id;
    this.schoolService.getStateSchoolProfileData(id).subscribe((res) => {
      if(res.schoollist.length>0){
        this.stateSchoolData = res.schoollist;
      }
      else
      {
        this.stateNodataFound = 1;
      }
    })
  }

  // Ceo
  blkid = '';
  schty = '';
  getSelectedchoolType(event,flag){
    debugger
    const districtId = localStorage.getItem("districtId");
    if(flag == 1){ this.blkid = event.value.id;}
    else if(flag == 2){ this.schty = event.value.id; }
    let params = '?district_id='+districtId+'&schoolcat='+this.schty+'&block='+this.blkid;
    this.schoolService.getSchoolProfileData(params).subscribe((res) => {
      if(res.schoollist.length>0){
        this.SchoolList = res.schoollist;
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }

  getSchoolEditFormDetails(){
    const loginLevel = this.loginLevel;
    console.log('form Loaded ',loginLevel);
    this.SchoolProfileDetails = this.fb.group({
      id:new FormControl('', null),
      curr_stat: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      school_id: new FormControl({value: '', disabled: loginLevel}),
      curstat_date: new FormControl({value: '', disabled: loginLevel}),
      school_name: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      sch_shortname: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      manage_cate_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      sch_management_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      sch_directorate_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      sch_cate_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      school_type: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      minority_sch: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      minority_grp: new FormControl({value: '', disabled: loginLevel}, null),
      minority_yr: new FormControl({value: '', disabled: loginLevel}, null),
      rte: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      low_class: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      high_class: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      latitude: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      longitude: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      edu_dist_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      block_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      // School Details
      sch_email: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      hill_frst: new FormControl(''),
      resid_schl: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      typ_resid_schl: new FormControl({value: '', disabled: loginLevel}, null),
      anganwadi: new FormControl({value: '', disabled: loginLevel}, null),
      anganwadi_schl:new FormControl({value: '', disabled: loginLevel}, null),
      anganwadi_center: new FormControl({value: '', disabled: loginLevel}, null),
      angan_wrks: new FormControl({value: '', disabled: loginLevel}, null),
      anganwadi_stu_b: new FormControl({value: '', disabled: loginLevel}, null),
      anganwadi_stu_g: new FormControl({value: '', disabled: loginLevel}, null),
      shftd_schl: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      cwsn_scl: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      // Location Details
      district_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      urbanrural: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      local_body_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      lb_vill_town_muni: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      cluster_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      panchayat_id: new FormControl('', null),
      lb_habitation_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      assembly_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      parliament_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      // city_id: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      pincode: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      address: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      // Establishment Details
      yr_estd_schl: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      upgrad_prito_uprpri: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      upgrad_uprprito_sec: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      upgrad_secto_higsec: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      spl_edtor: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      ceo_comments: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      state_comments: new FormControl('', null),
      /* created by tamilbala */
      yr_recgn_first:new FormControl({value: '', disabled: loginLevel}, null),
      yr_rec_schl_elem:new FormControl({value: '', disabled: loginLevel}, null),
      yr_rec_schl_hsc:new FormControl({value: '', disabled: loginLevel}, null),
      yr_last_renwl: new FormControl({value: '', disabled: loginLevel}, null),
      certifi_no: new FormControl({value: '', disabled: loginLevel}, null),
      schl_situated: new FormControl({value: '', disabled: loginLevel}, Validators.required),
      yr_recogn_schl: new FormControl({value: '', disabled: loginLevel}, null),
      yr_rec_schl_sec: new FormControl({value: '', disabled: loginLevel}, null),

    /*        */

    })
  }

// State
  getSelectedStateSchoolDetails(schoolData,stringFlag){
    
    this.SchoolProfileDetails.patchValue([]);
    let arrData = [];

    if(stringFlag == 'state'){ arrData = this.selectedDisctSchoolList; }
    else if(stringFlag == 'ceo'){ arrData = this.SchoolList; }
    console.log(arrData,arrData);

    const selected_School = arrData.filter(data => data.udise_code == schoolData.udise_code);
    if(stringFlag == 'state'){  this.tempDetails = selected_School[0]; }
    
    this.dialogTitle = selected_School[0].school_name;
    this.manageCateId = Number(selected_School[0].manage_cate_id);
    this.recognizationshow = (this.manageCateId===2 || this.manageCateId===3 || this.manageCateId===4) ? true : false;
    
    
    this.SchoolProfileDetails.controls['curr_stat'].setValue(selected_School[0].curr_stat);

    if(selected_School[0].curr_stat !== '1'){this.schoolStatusChange()}
    this.EditSchoolProfileStatus = selected_School[0].app_status;

    this.SchoolProfileDetails.controls['id'].setValue(selected_School[0].id);
    this.SchoolProfileDetails.controls['school_id'].setValue(selected_School[0].school_id);
    this.SchoolProfileDetails.controls['school_type'].setValue(selected_School[0].school_type);
    this.SchoolProfileDetails.controls['minority_sch'].setValue(selected_School[0].minority_sch);
    this.SchoolProfileDetails.controls['rte'].setValue(selected_School[0].rte);
    this.SchoolProfileDetails.controls['low_class'].setValue(selected_School[0].low_class);
    this.SchoolProfileDetails.controls['high_class'].setValue(selected_School[0].high_class);
    this.SchoolProfileDetails.controls['hill_frst'].setValue(selected_School[0].hill_frst);
    this.SchoolProfileDetails.controls['resid_schl'].setValue(selected_School[0].resid_schl);
    this.SchoolProfileDetails.controls['typ_resid_schl'].setValue(selected_School[0].typ_resid_schl);
    this.SchoolProfileDetails.controls['anganwadi'].setValue(selected_School[0].anganwadi);
    this.SchoolProfileDetails.controls['shftd_schl'].setValue(selected_School[0].shftd_schl);
    this.SchoolProfileDetails.controls['cwsn_scl'].setValue(selected_School[0].cwsn_scl);
    this.SchoolProfileDetails.controls['angan_wrks'].setValue(selected_School[0].angan_wrks);
    this.SchoolProfileDetails.controls['yr_estd_schl'].setValue(selected_School[0].yr_estd_schl);
    this.SchoolProfileDetails.controls['upgrad_prito_uprpri'].setValue(Number(selected_School[0].upgrad_prito_uprpri));
    this.SchoolProfileDetails.controls['upgrad_uprprito_sec'].setValue(Number(selected_School[0].upgrad_uprprito_sec));
    this.SchoolProfileDetails.controls['upgrad_secto_higsec'].setValue(Number(selected_School[0].upgrad_secto_higsec));
    this.SchoolProfileDetails.controls['spl_edtor'].setValue(selected_School[0].spl_edtor);
    this.SchoolProfileDetails.controls['district_id'].setValue(selected_School[0].district_id);
    
      
    
          if(selected_School[0].minority_yr && stringFlag == 'state'){
            selected_School[0].minority_yr = Number(this.pipe.transform(selected_School[0].minority_yr, 'yyyy'));
          }
          if(selected_School[0].minority_yr && stringFlag == 'ceo'){
            selected_School[0].minority_yr = Number(selected_School[0].minority_yr);
          }
          if(this.manageCateId){
            this.SchoolManagementCategorysts(this.manageCateId);
            this.SchoolManagementDepartment(selected_School[0].sch_management_id);
          }
          if(selected_School[0].curstat_date){
            selected_School[0].curstat_date = this.pipe.transform(selected_School[0].curstat_date, 'yyyy-MM-dd');
          }
  
            // Assgin value on load
            
        
        if(selected_School[0].yr_estd_schl){
          this.schoolEstablishmentYear(selected_School[0].yr_estd_schl == "0" ? 1800 : selected_School[0].yr_estd_schl);
        }
        if(selected_School[0].yr_recogn_schl){
          this.schoolRecognizationYear(selected_School[0].yr_recogn_schl == "0" ? 1800 : selected_School[0].yr_recogn_schl);
        }
        
        if(selected_School[0].yr_recgn_first){
          this.yearPrimaryChange(selected_School[0].yr_recgn_first == "0" ? 1800 : selected_School[0].yr_recgn_first);
        }
        
        if(selected_School[0].yr_rec_schl_elem){
          this.yearUpperPrimaryChange(selected_School[0].yr_rec_schl_elem == "0" ? 1800 :selected_School[0].yr_rec_schl_elem);
        }
        
        if(selected_School[0].yr_rec_schl_sec){
          this.yearSecondaryChange(selected_School[0].yr_rec_schl_sec == "0" ? 1800 :selected_School[0].yr_rec_schl_sec);
        }
        
        if(selected_School[0].upgrad_prito_uprpri){
          this.primaryToUPrimaryChange(selected_School[0].upgrad_prito_uprpri == "0" ? 1800 : selected_School[0].upgrad_prito_uprpri);
        }
        
        if(selected_School[0].upgrad_uprprito_sec){
          this.UprimaryToSecondaryChange(selected_School[0].upgrad_uprprito_sec == "0" ? 1800 : selected_School[0].upgrad_uprprito_sec);
        }
        if(selected_School[0].curstat_date){
          selected_School[0].curstat_date = this.pipe.transform(selected_School[0].curstat_date, 'yyyy-MM-dd');
        }
          // Assgin value on load
          if(selected_School[0].district_id){this.getLocalBody(selected_School[0].district_id);}
          if(selected_School[0].local_body_id){this.getLocalBodyAll(selected_School[0].local_body_id);}
          if(selected_School[0].lb_vill_town_muni){this.gethabitation(selected_School[0].lb_vill_town_muni);}      
          this.SchoolProfileDetails.patchValue(selected_School[0]);
          
          this.showDialogBox = true;
          
      

  }


  getDropDownValues(){
    this.SchoolStatus = [
      { value : "", label : "Choose" },
      { "value": "0", "label": "Closed" },
      { "value": "1", "label": "Functional" },
      { "value": "2", "label": "Merged" },
      { "value": "3", "label": "Converted to Library" },
      { "value": "4", "label": "Aided School taken over by Govt" }
    ];

    this.SchoolCategory = [
      { value : "", label : "Choose" },
      { "value": "1", "label": "Government" },
      { "value": "2", "label": "Fully Aided" },
      { "value": "3", "label": "Un-aided" },
      { "value": "4", "label": "Partially Aided" },
      { "value": "5", "label": "Central Govt" },
    ];

    this.SchoolTypeOption = [
      { value : "", label : "Choose" },
      { value : "Boys", label : "Boys" },
      { value : "Girls", label : "Girls" },
      { value : "Co-Ed", label : "Co-Ed" }
    ];

    this.SchoolMinorityOption = [
      { value : "", label : "Choose" },
      { value : "1", label : "Yes" },
      { value : "2", label : "No" }
    ];

    this.ClassLevelOption = [
      { value : "", label : "Choose" },
      { value : "13", label : "LKG" },
      { value : "14", label : "UKG" },
      { value : "15", label : "PreKG" },
      { value : "1", label : "I" },
      { value : "2", label : "II" },
      { value : "3", label : "III" },
      { value : "4", label : "IV" },
      { value : "5", label : "V" },
      { value : "6", label : "VI" },
      { value : "7", label : "VII" },
      { value : "8", label : "VIII" },
      { value : "9", label : "IX" },
      { value : "10", label : "X" },
      { value : "11", label : "XI" },
      { value : "12", label : "XII" },
    ];

    this.SchoolSituatedOption = [
      { value : "", label : "Choose" },
      { value : "1", label : "In Forest/Hill area" },
      { value : "2", label : "Near Forest/Hill area" },
      { value : "3", label : "Near the High ways" },
      { value : "4", label : "Near Coastal Area" },
      { value : "0", label : "Not Applicable" },
    ];

    this.SchoolSpecialEducator = [
      { value : "", label : "Choose" },
      { value : "1", label : "Dedicated" },
      { value : "2", label : "At cluster level" },
      { value : "3", label : "No" },
    ];

    this.RuralUrbanOption = [
      { value : "", label : "Choose" },
      { value : "1", label : "Rural" },
      { value : "2", label : "Urban" },
    ];

    var year = new Date().getFullYear();

    this.range.push({ value: "", label: "Choose" });
for (var i = 0; i < 50; i++) {
    this.range.push({
      label: year + i,
      value: parseInt(String(year + i))
    });
}



    
  }

  EducationDistrict(){
    const disctId = localStorage.getItem("districtId");
    const educationDisctId = this.SchoolProfileDetails.value.edu_dist_id;
    let params = '?district_id='+disctId+'&schoolcat='+educationDisctId;
    this.schoolService.getSchoolProfileData(params).subscribe((res) => {
      this.BlockNameOption = [];
      if(res.block.length>0){
        const blockName = res.block
        for (let i = 0; i < blockName.length; i++) {
          this.BlockNameOption.push({ value: blockName[i].id, label: blockName[i].block_name })
        }
      }
    })
  }

  SchoolManagementCategorysts(id){
    console.log('minority_grp id',id)
    this.SchoolManagementCategoryOption = [];
    if(id>0){
    var selectedManageName = id;
    }
    else{
      var selectedManageName = this.SchoolProfileDetails.value.manage_cate_id;
      console.log('selectedManageName',selectedManageName);
      this.manageCateId = Number(this.SchoolProfileDetails.value.manage_cate_id);
    }
    this.recognizationshow = (Number(selectedManageName)===2 || Number(selectedManageName)===3 || Number(selectedManageName)===4) ? true : false;
    const filteredSchoolManagement = (this.SchoolManagementList).filter(data => data.mana_cate_id == selectedManageName)
    this.SchoolManagementCategoryOption.push({ value: "", label: "Choose" });
    for (let i = 0; i < filteredSchoolManagement.length; i++) {
      this.SchoolManagementCategoryOption.push({ "value": filteredSchoolManagement[i].id, "label": filteredSchoolManagement[i].management })
    }
    this.SchoolTypeChange(selectedManageName);
  }

  SchoolManagementDepartment(id){
    
    this.SchoolManagementOption = [];
    if(id>0){
      var selectedDepartmentName = id
    }
    else
    {
      var selectedDepartmentName = this.SchoolProfileDetails.value.sch_management_id;
    }
    
    const filteredSchoolDepartment = (this.SchoolDepartmentList).filter(data => data.school_mana_id == selectedDepartmentName);
    console.log('filteredSchoolDepartment',filteredSchoolDepartment);
    this.SchoolManagementOption.push({ value: "", label: "Choose" });
    for (let i = 0; i < filteredSchoolDepartment.length; i++) {
      this.SchoolManagementOption.push({ "value": filteredSchoolDepartment[i].id, "label": filteredSchoolDepartment[i].department });
    }
    console.log('SchoolManagementOption',this.SchoolManagementOption);
  }

  // School Status Change 

  schoolStatusChange(){
    const schoolStauts = Number(this.SchoolProfileDetails.value.curr_stat);
    this.submitted = false;
    if (schoolStauts == 1) {
      this.SchoolProfileDetails.controls['curstat_date'].setValue("");
      this.SchoolProfileDetails.controls['curstat_date'].setValidators(null);
    }
    else {
      this.SchoolProfileDetails.controls['curstat_date'].setValidators(Validators.required);
    }
    this.SchoolProfileDetails.controls['curstat_date'].updateValueAndValidity();
  }


  // Minority School Statu

  MinoritySchoolStatus(){
    const minorityStatus = this.SchoolProfileDetails.value.minority_sch;
    const rteStatus = this.SchoolProfileDetails.value.rte;

    if (minorityStatus == 1) {
      this.SchoolProfileDetails.controls['minority_grp'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['minority_yr'].setValidators(Validators.required);
      if(rteStatus == 1){
      this.SchoolProfileDetails.controls['rte'].setValue("0");
      }
    }
    else {
      this.SchoolProfileDetails.controls['minority_grp'].setValue("");
      this.SchoolProfileDetails.controls['minority_grp'].setValidators(null);
      this.SchoolProfileDetails.controls['minority_yr'].setValue("");
      this.SchoolProfileDetails.controls['minority_yr'].setValidators(null);     
    }
    this.SchoolProfileDetails.controls['minority_grp'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['minority_yr'].updateValueAndValidity();
  }

  RTEChangedStatus(){

    const rteStatus = this.SchoolProfileDetails.value.rte;
    if(rteStatus == 1){
      if(rteStatus == 1){
        this.SchoolProfileDetails.controls['minority_grp'].setValue("");
        this.SchoolProfileDetails.controls['minority_grp'].setValidators(null);
        this.SchoolProfileDetails.controls['minority_yr'].setValue("");
        this.SchoolProfileDetails.controls['minority_yr'].setValidators(null);
        }
    }
    this.SchoolProfileDetails.controls['minority_grp'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['minority_yr'].updateValueAndValidity();
  }

  // Residential School
  ResidentialSchoolType(){
    const resid_school = this.SchoolProfileDetails.value.resid_schl;
    if (resid_school == 1) {
      this.SchoolProfileDetails.controls['typ_resid_schl'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['typ_resid_schl'].setValue("");
      this.SchoolProfileDetails.controls['typ_resid_schl'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['typ_resid_schl'].updateValueAndValidity();
  }

  // Anganwadi is Attached

  AnganwadiisAttached(){

    const anganwadiId = this.SchoolProfileDetails.value.anganwadi;
    if (anganwadiId == 1) {
      this.SchoolProfileDetails.controls['anganwadi_center'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['angan_wrks'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['anganwadi_stu_b'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['anganwadi_stu_g'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['anganwadi_center'].setValue("");
      this.SchoolProfileDetails.controls['angan_wrks'].setValue("");
      this.SchoolProfileDetails.controls['anganwadi_stu_b'].setValue("");
      this.SchoolProfileDetails.controls['anganwadi_stu_g'].setValue("");
      this.SchoolProfileDetails.controls['anganwadi_center'].setValidators(null);
      this.SchoolProfileDetails.controls['angan_wrks'].setValidators(null);
      this.SchoolProfileDetails.controls['anganwadi_stu_b'].setValidators(null);
      this.SchoolProfileDetails.controls['anganwadi_stu_g'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['anganwadi_center'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['angan_wrks'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['anganwadi_stu_b'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['anganwadi_stu_g'].updateValueAndValidity();

  }

  SchoolTypeChange(id){

    if(Number(id)===5 || Number(id)===3){
      this.SchoolProfileDetails.controls['anganwadi'].setValue('');
      this.SchoolProfileDetails.controls['anganwadi'].setValidators(null);
      this.SchoolProfileDetails.controls['anganwadi_schl'].setValue('');
      this.SchoolProfileDetails.controls['anganwadi_schl'].setValidators(null);
      this.AnganwadiisAttached();
    }
    else {
      this.SchoolProfileDetails.controls['anganwadi'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['anganwadi_schl'].setValidators(Validators.required);
    }


    if(Number(id)===2 || Number(id)===3 || Number(id)===4){
      this.SchoolProfileDetails.controls['yr_recgn_first'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['yr_rec_schl_elem'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['yr_rec_schl_hsc'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['yr_last_renwl'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['certifi_no'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['schl_situated'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['yr_recogn_schl'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['yr_rec_schl_sec'].setValidators(Validators.required);
    }
    else{
      this.SchoolProfileDetails.controls['yr_recgn_first'].setValue('');
      this.SchoolProfileDetails.controls['yr_rec_schl_elem'].setValue('');
      this.SchoolProfileDetails.controls['yr_rec_schl_hsc'].setValue('');
      this.SchoolProfileDetails.controls['yr_last_renwl'].setValue('');
      this.SchoolProfileDetails.controls['certifi_no'].setValue('');
      this.SchoolProfileDetails.controls['schl_situated'].setValue('');
      this.SchoolProfileDetails.controls['yr_recogn_schl'].setValue('');
      this.SchoolProfileDetails.controls['yr_rec_schl_sec'].setValue('');
      this.SchoolProfileDetails.controls['yr_recgn_first'].setValidators(null);
      this.SchoolProfileDetails.controls['yr_rec_schl_elem'].setValidators(null);
      this.SchoolProfileDetails.controls['yr_rec_schl_hsc'].setValidators(null);
      this.SchoolProfileDetails.controls['yr_last_renwl'].setValidators(null);
      this.SchoolProfileDetails.controls['certifi_no'].setValidators(null);
      this.SchoolProfileDetails.controls['schl_situated'].setValidators(null);
      this.SchoolProfileDetails.controls['yr_recogn_schl'].setValidators(null);
      this.SchoolProfileDetails.controls['yr_rec_schl_sec'].setValidators(null);
    }
      this.SchoolProfileDetails.controls['yr_recgn_first'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['yr_rec_schl_elem'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['yr_rec_schl_hsc'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['yr_last_renwl'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['certifi_no'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['schl_situated'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['yr_recogn_schl'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['yr_rec_schl_sec'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['anganwadi'].updateValueAndValidity();
      this.SchoolProfileDetails.controls['anganwadi_schl'].updateValueAndValidity();
  }


  getLocalBody(value){
    console.log(value);
    this.LocalBodyOption =[];
    this.LocalBodyAllOption = [];
    this.listhabitation = [];
    const LocalBodyOption_child = (this.LocalBodyOption_prnt).filter(data => Number(data.district_id) == Number(value));
    if(LocalBodyOption_child.length > 0){
    this.LocalBodyOption.push({ value: "", label: "Choose" })
      for(let i=0; i<LocalBodyOption_child .length;i++){
        this.LocalBodyOption.push({ value: LocalBodyOption_child[i].id, label: LocalBodyOption_child [i].localbody_name ,zone_type: LocalBodyOption_child[i].zone_type_id})
      }
      console.log(this.LocalBodyOption);}
  }

  getLocalBodyAll(value){
    console.log(this.LocalBodyOption_prnt);
    const localbody = (this.LocalBodyOption_prnt).filter(data => Number(data.id) === Number(value));
    if(localbody.length > 0){
    console.log(localbody);
    const zone_type_id = localbody[0].zone_type_id;
    this.LocalBodyAllOption = [];
    this.listhabitation = [];
    // Local Body All
    
    let district_id = this.SchoolProfileDetails.get('district_id').value;
    const LocalBodyAllOption_child = (this.LocalBodyAllOption_prnt).filter(data => Number(data.district_id) == Number(district_id) && Number(data.zone_type_id) == Number(zone_type_id));
    
    this.LocalBodyAllOption.push({ value: "", label: "Choose" })
    for(let i=0; i<LocalBodyAllOption_child.length;i++){
      this.LocalBodyAllOption.push({ value: LocalBodyAllOption_child[i].id, label: LocalBodyAllOption_child[i].name })
    }}
    console.log('All',this.LocalBodyAllOption);
  }

  gethabitation(id)
  {
   console.log('Habitational',id);
    let localid=id;
        this.schoolService.gethabitationlist(localid).subscribe(ta=>{
          console.log(ta);
          console.log('testing');
          this.hapitationlist=ta['hapitation'];
          this.listhabitation=this.hapitationlist.map(lt => { return { label: lt.name, value: lt.id }; });
        })
  }

  schoolEstablishmentYear(val){
    this.YearofFirstRecognization = [];
    const yerEstablished = val;
    console.log(typeof val);
    this.YearofFirstRecognization.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.EstablishmentSchoolYear.length;i++){
      if(yerEstablished<=this.EstablishmentSchoolYear[i].value){
      this.YearofFirstRecognization.push({ value: this.EstablishmentSchoolYear[i].value, label: this.EstablishmentSchoolYear[i].value }) 
    }
  }
  }

  schoolRecognizationYear(val){
    this.YearOfLastRenewal = [];
    const yerrecognization = val;
    this.YearOfLastRenewal.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.YearofFirstRecognization.length;i++){
      if(yerrecognization<=this.YearofFirstRecognization[i].value && this.YearofFirstRecognization[i].value !== '0'){
      this.YearOfLastRenewal.push({ value: this.YearofFirstRecognization[i].value, label: this.YearofFirstRecognization[i].value }) 
    }
  }
  }

  yearPrimaryChange(val){
    this.UpperPrimaryYearLevel = [];
    const yaerprimary = val;
    this.UpperPrimaryYearLevel.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.SchoolYearLevel.length;i++){
      if(yaerprimary<=this.SchoolYearLevel[i].value && this.SchoolYearLevel[i].value !== '0'){
      this.UpperPrimaryYearLevel.push({ value: this.SchoolYearLevel[i].value, label: this.SchoolYearLevel[i].value }) 
    }
  }
  }

  yearUpperPrimaryChange(val){
    this.SecondaryYearLevel = [];
    const year_upperprimary = val;
    this.SecondaryYearLevel.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.UpperPrimaryYearLevel.length;i++){
      if(year_upperprimary<=this.UpperPrimaryYearLevel[i].value && this.UpperPrimaryYearLevel[i].value !== '0' ){
      this.SecondaryYearLevel.push({ value: this.UpperPrimaryYearLevel[i].value, label: this.UpperPrimaryYearLevel[i].value }) 
    }
  }
  }

  yearSecondaryChange(val){

    this.HigherSecondaryYearLevel = [];
    const year_secondary = val;
    this.HigherSecondaryYearLevel.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.SecondaryYearLevel.length;i++){
      if(year_secondary<=this.SecondaryYearLevel[i].value && this.SecondaryYearLevel[i].value !== '0'){
      this.HigherSecondaryYearLevel.push({ value: this.SecondaryYearLevel[i].value, label: this.SecondaryYearLevel[i].value }) 
    }
  }
  }

  primaryToUPrimaryChange(val){
    this.UpperPSecondaryOption = [];
    const year_priTopri = val;
    console.log('year_priTopri (field value)',year_priTopri,typeof this.SchoolProfileDetails.value.upgrad_prito_uprpri);
    this.UpperPSecondaryOption.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.SchoolYearLevel.length;i++){
      if(year_priTopri<=this.SchoolYearLevel[i].value && this.SchoolYearLevel[i].value !== '0'){
      this.UpperPSecondaryOption.push({ value: this.SchoolYearLevel[i].value, label: this.SchoolYearLevel[i].value }) 
    }
    else{
      console.log('else');
    }
    
  }
  console.log('Final Array',this.UpperPSecondaryOption);
  }

  UprimaryToSecondaryChange(val){
    this.SecondarytoHSecondaryOption = [];
    const year_secTosec = val;
    this.SecondarytoHSecondaryOption.push({ value: "", label: "Choose" }, { value: "0", label: "Not Applicable" })
    for(let i=1;i<this.UpperPSecondaryOption.length;i++){
      if(year_secTosec<=this.UpperPSecondaryOption[i].value && this.UpperPSecondaryOption[i].value !== '0'){
      this.SecondarytoHSecondaryOption.push({ value: this.UpperPSecondaryOption[i].value, label: this.UpperPSecondaryOption[i].value }) 
    }
  }
  }

    // On Submit

    updateSchoolManagement(){
      this.submitted = true;
      var SchoolDetails=this.SchoolProfileDetails.value;      
     if (this.SchoolProfileDetails.valid) {
        
        
        //return false;
       this.schoolService.updateSchoolProfileData({"records":SchoolDetails},true).subscribe(
         dataresult => {
      
           if(dataresult['dataStatus'] == true) {
            // this.fetchTimeTable(dataresult);
            this.alertService.success(dataresult.message);
            this.showDialogBox = false;
            this.getSchoolProfileList(this.districtId);
            //this.ngOnInit();
           }
           else {
            this.alertService.warning(dataresult.message);
          }
         }); 
     
      }
      else {
        let i = 0;
        for (const key of Object.keys(this.SchoolProfileDetails.controls)) {
          i = i + 1;
          if (this.SchoolProfileDetails.controls[key].invalid) {
             const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('invalid keys',key, invalidControl);
            invalidControl.focus();
             break;
          }
          if(i>=1 && i<=19){
            this.AccordionTabShow = 1;
          }
          if(i>=20 && i<=30){
            this.AccordionTabShow = 2;
          }
          if(i>=31 && i<=43){
            this.AccordionTabShow = 3;
          }
          if(i>=44 && i<=57){
            this.AccordionTabShow = 4;
          }
        }
        // this.alertService.error("Please Fill all the Required Fields");
      }
    }

    approveSchoolManagement(form){
      debugger;
      console.log(this.tempDetails);
      let data = {'id':form.value.id,'school_id':this.tempDetails['school_id'],'state_comments':form.value.state_comments,'emis_reg_sch_old_status':this.tempDetails['curr_stat'],'emis_reg_sch_status':this.tempDetails['curr_stat'],'school_type':this.tempDetails['school_type']};
      this.schoolService.SchoolProfileApproval({"records":data}).subscribe(
        dataresult => {
          debugger;
          if(dataresult['dataStatus'] == true) {
           this.alertService.success(dataresult.message);
           this.showDialogBox = false;
           this.getSelectedDisctSchool(this.tempDistid,this.tempDistname,1);
          }
          else {
           this.alertService.warning(dataresult.message);
         }
        }); 
    }
    SchoolDetails(SchoolDetails: any, arg1: boolean) {
      throw new Error("Method not implemented.");
    }

    rejectSchoolManagement(form)
		{
      console.log(this.tempDetails);
			   if(form.value.id !=''){    
				   if (form.value.state_comments==='' || form.value.state_comments===null){
                 this.alertService.info("Please Enter State Comments !");
                 return true;
            }
            let data = {'id':form.value.id,'school_id':this.tempDetails['school_id'],'state_comments':form.value.state_comments};
            console.log('reject data',data);
            this.schoolService.SchoolProfileRejection({"records":data}).subscribe(
              dataresult => {
                if(dataresult['dataStatus'] == true) {
                // this.fetchTimeTable(dataresult);
                this.alertService.success(dataresult.message);
                this.showDialogBox = false;
                this.getSelectedDisctSchool(this.tempDistid,this.tempDistname,1);
                //this.ngOnInit();
                }
                else {
                this.alertService.warning(dataresult.message);
              }
              }); 
          }     
		}

}
