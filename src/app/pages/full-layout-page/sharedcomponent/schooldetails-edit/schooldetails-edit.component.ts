import { Component, OnInit, ElementRef } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { schoolsService } from '../../schools/schools.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schooldetails-edit',
  templateUrl: './schooldetails-edit.component.html',
  styleUrls: ['./schooldetails-edit.component.css']
})
export class SchooldetailsEditComponent implements OnInit {

  public noDataFound: boolean = false;
  public schoolType: any[] = [];
  public noSchoolType: boolean = false;
  public showDialogBox: boolean = false;
  public SchoolProfileDetails: FormGroup;
  public dialogTitle: string;
  public SchoolManagementList: any[] = [];
  public SchoolDepartmentList: any[] = [];
  public submitted: boolean = false;
  public loginLevel: boolean = false;
  renewval: any;

  // DropDown Values
  public SchoolStatus: any[] = [];
  public SchoolCategory: any[] = [];
  public SchoolManagementCategoryOption: any[] = [];
  public SchoolManagementOption: any[] = [];
  public SchoolCategoryLevel: any[] = [];
  public SchoolTypeOption: any[] = [];
  public SchoolMinorityOption: any[] = [];
  public MinorityGroupOption: any[] = [];
  public ClassLevelOption: any[] = [];
  public EducationDistrictOption: any[] = [];
  public BlockNameOption: any[] = [];
  public SchoolSituatedOption: any[] = [];
  public TypeResidentialSchoolOption: any[] = [];
  public SchoolYearLevel: any[] = [];
  public SchoolSpecialEducator: any[] = [];
  public EstablishmentSchoolYear: any[] = [];
  public YearofFirstRecognization: any[] = [];
  public SecondaryYearLevel: any[] = [];
  public UpperPrimaryYearLevel: any[] = [];
  public HigherSecondaryYearLevel: any[] = [];
  public UpperPSecondaryOption: any[] = [];
  public SecondarytoHSecondaryOption: any[] = [];
  public YearOfLastRenewal: any[] = [];
  public DistrictNameOption: any[] = [];
  public LocalBodyOption: any[] = [];
  public LocalBodyAllOption: any[] = [];
  public RuralUrbanOption: any[] = [];
  public ClusterOptions: any[] = [];
  public WardsListOption: any[] = [];
  public AssemblyOption: any[] = [];
  public ParliamentOption: any[] = [];
  public CityOption: any[] = [];
  public AccordionTabShow: number = 1;
  public EditSchoolProfileStatus: number;
  hapitationlist: any;
  listhabitation: any;
  manageCateId: number = 0;
  public pageStageLevel: number;
  public stateSchoolCategoryOption: any[] = [];
  public stateSchoolData: any[] = [];
  public stateNodataFound: number;
  public selectedDisctSchoolList: any[] = [];
  pipe = new DatePipe('en-US');
  userTypeId: number;
  districtId: any = '';
  range: any = [];
  tempDetails: any = [];

  public loggedInType: boolean = false;
  public deinedurl: any;
  public LocalBodyOption_prnt: any[] = [];
  public LocalBodyAllOption_prnt: any[] = [];
  teacherType: number;
  isBRTEuser: boolean = false;
  tempDistid: any;
  tempDistname: any;
  public pageStage: number;
  schoolName: any;



  SchoolList: any;
  editSchoolData: any;
  dropdownDataLists: any;
  schoolManageList: any;
  schoolDeptList: any;
  schoolCateList: any;
  minorityGroupList: any;
  eduDistList: any;
  blockList: any;
  resTypeList: any;
  distList: any;
  localbodyList: any;
  localbodyurbanList: any;
  villageTMList: any;
  habitList: any;
  clustList: any;
  assemblyList: any;
  parlimentList: any;
  tableData: any;
  schoolId: any;
  localbodyListreadonly: any;
  schoolProfile:any;
  schoolStatusList: Array<{ 'label': any, 'value': any }> = [
    { value: "0", label: "Closed" },
    { value: "1", label: "Functional" },
    { value: "2", label: "Merged" },
    { value: "3", label: "Converted to Library" },
    { value: "4", label: "Aided School taken over by Govt" }
  ];

  ManagementCatList: Array<{ 'label': any, 'value': any }> = [
    { value: "1", label: "Government" },
    { value: "2", label: "Fully Aided" },
    { value: "3", label: "Un-aided" },
    { value: "4", label: "Partially Aided" },
    { value: "5", label: "Central Govt" },
  ];

  schoolTypeList: Array<{ 'label': any, 'value': any }> = [
    { value: "Boys", label: "Boys" },
    { value: "Girls", label: "Girls" },
    { value: "Co-Ed", label: "Co-Ed" }
  ];

  minoritySchoolOption: Array<{ 'label': any, 'value': any }> = [
    { value: "1", label: "Yes" },
    { value: "2", label: "No" }
  ];

  minoritySchoolNoOption: Array<{ 'label': any, 'value': any }> = [
    { value: "2", label: "No" }
  ];

  lowclassList: Array<{ 'label': any, 'value': any }> = [
    { value: "15", label: "PreKG" },
    { value: "13", label: "LKG" },
    { value: "14", label: "UKG" },
    { value: "1", label: "I" },
    { value: "6", label: "VI" },
    { value: "9", label: "IX" },
    { value: "11", label: "XI" },
  ];

  highclassList: Array<{ 'label': any, 'value': any }> = [
    { value: "14", label: "UKG" },
    { value: "5", label: "V" },
    { value: "8", label: "VIII" },
    { value: "10", label: "X" },
    { value: "12", label: "XII" },
  ];

  SchoolSituatedList: Array<{ 'label': any, 'value': any }> = [
    { value: "1", label: "In Forest/Hill area" },
    { value: "2", label: "Near Forest/Hill area" },
    { value: "3", label: "Near the High ways" },
    { value: "4", label: "Near Coastal Area" },
    { value: "0", label: "Not Applicable" },
  ];

  ruralUrbanOption: Array<{ 'label': any, 'value': any }> = [
    { value: "1", label: "Rural" },
    { value: "2", label: "Urban" },
  ];

  SchoolSpecialEducatorList: Array<{ 'label': any, 'value': any }> = [
    { value: "1", label: "Dedicated" },
    { value: "2", label: "At cluster level" },
    { value: "3", label: "No" },
  ];
  sampleSelectedColumn: Array<Object> = [];
  selectedColumns: any[] = [];

  constructor(private userSessionService: UserSessionService,
    public schoolService: schoolsService, public fb: FormBuilder,
    private el: ElementRef, private alertService: AlertService) {
    this.districtId = this.userSessionService.districtId();
    this.userTypeId = Number(this.userSessionService.userTypeId());
  }

  ngOnInit() {
    this.pageStage = 1;
    this.headerData();
    this.initialValidators();
    this.getEditSchoolData();
    this.getDropdownData();

  }
  headerData() {
    this.selectedColumns = [
      { field: 'udise_code', header: 'UDISE Code' },
      { field: 'SchoolName', header: 'School Name' },
      { field: 'SchoolType', header: 'School Type' },
      { field: 'MiniorityStatus', header: 'Minority' },
      { field: 'SchoolRTEStatus', header: 'RTE' },

    ];
    this.sampleSelectedColumn = this.selectedColumns;
  }

  initialValidators() {
    this.SchoolProfileDetails = this.fb.group({
      curr_stat_edit: new FormControl('', null),
      curr_stat: new FormControl('', Validators.required),
      curstat_date: new FormControl('', null),
      SchoolName: new FormControl('', Validators.required),
      SchoolShortName: new FormControl('', Validators.required),
      ManagementCategoryId_edit: new FormControl('', null),
      ManagementCategoryId: new FormControl('', Validators.required),
      management: new FormControl('', null),
      SchoolManagementId: new FormControl('', Validators.required),
      department: new FormControl('', null),
      SchoolDirectorateId: new FormControl('', Validators.required),
      category_name: new FormControl('', null),
      SchoolCategoryId: new FormControl('', Validators.required),
      SchoolType: new FormControl('', Validators.required),
      MiniorityStatus_edit: new FormControl('', null),
      MiniorityStatus: new FormControl('', Validators.required),
      MniorityGroup_edit: new FormControl('', null),
      MniorityGroup: new FormControl('', null),
      MiniorityValidUpto: new FormControl('', null),
      SchoolRTEStatus_edit: new FormControl('', null),
     // SchoolRTEStatus: new FormControl('', Validators.required),
      LowestClass_edit: new FormControl('', null),
      LowestClass: new FormControl('', Validators.required),
      HigestClass_edit: new FormControl('', null),
      HigestClass: new FormControl('', Validators.required),
      // Latitude: new FormControl('', Validators.required),
      // Longitude: new FormControl('', Validators.required),
      edn_dist_name: new FormControl('', null),
      EducationaldstId: new FormControl('', Validators.required),
      block_name: new FormControl('', null),
      BlockId: new FormControl('', Validators.required),

      SchoolInHillArea_edit:new FormControl('', null),
      SchoolInHillArea: new FormControl('', Validators.required),
      SchoolEmail: new FormControl('', Validators.required),
      ResidentialSchoolStatus_edit:new FormControl('', null),
      ResidentialSchoolStatus: new FormControl('', Validators.required),
      ResidentialSchoolType: new FormControl('', null),
      Anganwadi_edit: new FormControl('', null),
      Anganwadi: new FormControl('', Validators.required),
      AnganwadiLocation: new FormControl('', null),
      AnganwadiLocation_edit: new FormControl('', null),
      AnganwadiNumber: new FormControl('', null),
      AnganwadiWorkerCount: new FormControl('', null),
      AnganwadiBoysCount: new FormControl('', null),
      AnganwadiGirlsCount: new FormControl('', null),
      ShiftSchoolStatus_edit: new FormControl('', null),
      ShiftSchoolStatus: new FormControl('', Validators.required),
      SpecialCWSNSchoolStatus_edit: new FormControl('', null),
      SpecialCWSNSchoolStatus: new FormControl('', Validators.required),

      district_name: new FormControl('', null),
      DistrictId: new FormControl('', null),
      RuralUrbanStatus_edit: new FormControl('', null),
      RuralUrbanStatus: new FormControl('', Validators.required),
      localbody_name: new FormControl('', null),
      // LocaBodyId: new FormControl('', Validators.required),
      LocaBodyId: new FormControl('', null),
      localbodyallname: new FormControl('', null),
      // LocalBodyId: new FormControl('', Validators.required),
      LocalBodyId: new FormControl('', null),
      habitationname: new FormControl('', null),
      // VillageWard: new FormControl('', Validators.required),
      VillageWard: new FormControl('', null),
      clus_name: new FormControl('', null),
      ClusterId: new FormControl('', Validators.required),
      assembly_name: new FormControl('', null),
      AssemblyId: new FormControl('', Validators.required),
      parli_name: new FormControl('', null),
      ParlimentId: new FormControl('', Validators.required),
      Pincode: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),

      SchEstablishmentyear: new FormControl('', Validators.required),
      SchfirstRecogYear: new FormControl('', Validators.required),
      LastRenewalYear: new FormControl('', null),
      RenewalCertificateNumber: new FormControl('', null),
      PriRecogFirstYear: new FormControl('', Validators.required),
      UppPriRecogFirstYear: new FormControl('', Validators.required),
      SceRecogFirstYear: new FormControl('', Validators.required),
      HrSecRecogFirstYear: new FormControl('', Validators.required),
      PritoUppPriUpgradationYear: new FormControl('', Validators.required),
      UppPritoSecUpgradationYear: new FormControl('', Validators.required),
      SectoHrSecUpgradationYear: new FormControl('', Validators.required),
      SpecialEducatorStatus_edit: new FormControl('', null),
      SpecialEducatorStatus: new FormControl('', Validators.required),
    });
  }

  getEditSchoolData() {
    this.schoolService.getEditSchoolProfileAllData().subscribe(getdata => {
      this.SchoolList = getdata.result;

    });
  }

  getDropdownData() {
    this.schoolService.getEditDropdownData(this.districtId).subscribe(dropdownList => {
      this.dropdownDataLists = dropdownList;

      this.schoolManageList = this.dropdownDataLists['schoolmanagement'].map(item => {
        return {
          label: item.management,
          value: item.management_code
        }
      });

      this.minorityGroupList = this.dropdownDataLists['minority_list'].map(item => {
        return {
          label: item.minority,
          value: item.id
        }
      });

      this.eduDistList = this.dropdownDataLists['edu_dist_details'].map(item => {
        return {
          label: item.edu_dist_name,
          value: item.edu_dist_id
        }
      });

      this.blockList = this.dropdownDataLists['block'].map(item => {
        return {
          label: item.block_name,
          value: item.id
        }
      });

      this.resTypeList = this.dropdownDataLists['resitype'].map(item => {
        return {
          label: item.RESITYPE_DESC,
          value: item.RESITYPE_ID
        }
      });

      // this.distList = this.dropdownDataLists['district'].map(item => {
      //   return {
      //     label: item.district_name,
      //     value: item.id
      //   }
      // });

      this.clustList = this.dropdownDataLists['cluster'].map(item => {
        return {
          label: item.clus_name,
          value: item.clus_code
        }
      });

      this.assemblyList = this.dropdownDataLists['assembly'].map(item => {
        return {
          label: item.assembly_name,
          value: item.id
        }
      });

      this.parlimentList = this.dropdownDataLists['parliament'].map(item => {
        return {
          label: item.parli_name,
          value: item.id
        }
      });

      this.schoolDeptList = this.dropdownDataLists['schooldepartment'].map(item => {
        return {
          label: item.department,
          value: item.id
        }
      });

      this.schoolCateList = this.dropdownDataLists['category'].map(item => {
        return {
          label: item.category_name,
          value: item.id
        }
      });

      this.localbodyListreadonly = this.dropdownDataLists['local_body'].map(item => {
        return {
          label: item.localbody_name,
          value: item.id
        }
      });

      var getLocalBodyRuralData = this.dropdownDataLists['local_body'].filter(element => element.localbody_name == 'Village Panchayat');
      this.localbodyList = getLocalBodyRuralData.map(item => {
        return {
          label: item.localbody_name,
          value: item.id
        }
      });

      var getLocalBodyuUrbanData = this.dropdownDataLists['local_body'].filter(element => element.localbody_name != 'Village Panchayat');
      this.localbodyurbanList = getLocalBodyuUrbanData.map(item => {
        return {
          label: item.localbody_name,
          value: item.id
        }
      });

      this.villageTMList = this.dropdownDataLists['local_bodyall'].map(item => {
        return {
          label: item.name,
          value: item.id
        }
      });

    });
  }



  schoolStatusListChange(e) {
    if (e.value != '1') {
      this.SchoolProfileDetails.controls['curstat_date'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['curstat_date'].setValue("");
      this.SchoolProfileDetails.controls['curstat_date'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['curstat_date'].updateValueAndValidity();
  }


  SchoolManagementChange(e) {
    debugger
    var id = e.value;
    console.log('e' + id)
    var getSchoolManageData = this.dropdownDataLists['schoolmanagement'].filter(element => element.mana_cate_id == id);
    this.schoolManageList = getSchoolManageData.map(item => {
      return {
        label: item.management,
        value: item.management_code
      }
    });

   
    if (e.value == '1') {
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValue("");
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['AnganwadiLocation'].updateValueAndValidity();


    if (e.value != '1' && e.value != '5') {
      this.SchoolProfileDetails.controls['LastRenewalYear'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['LastRenewalYear'].setValue("");
      this.SchoolProfileDetails.controls['LastRenewalYear'].setValidators(null);
      this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValue("");
      this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['LastRenewalYear'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['RenewalCertificateNumber'].updateValueAndValidity();

  }

  schoolDeptChange(e) {
    var id = e.value;
    console.log('e' + id)
    var getSchoolDeptData = this.dropdownDataLists['schooldepartment'].filter(element => element.school_mana_id == id);
    this.schoolDeptList = getSchoolDeptData.map(item => {
      return {
        label: item.department,
        value: item.id
      }
    });
  }

  // schoolCateChange(e) {
  //   var id = e.value;
  //   console.log('e' + id)
  //   var getSchoolCateData = this.dropdownDataLists['category'].filter(element => element.category_code == id);
  //   this.schoolCateList = getSchoolCateData.map(item => {
  //     return {
  //       label: item.category_name,
  //       value: item.id
  //     }
  //   });
  // }

  minorityGroupChange(e) {
    if (e.value == '1') {
      this.SchoolProfileDetails.controls['MniorityGroup'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['MiniorityValidUpto'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['MniorityGroup'].setValue("");
      this.SchoolProfileDetails.controls['MniorityGroup'].setValidators(null);
      this.SchoolProfileDetails.controls['MiniorityValidUpto'].setValue("");
      this.SchoolProfileDetails.controls['MiniorityValidUpto'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['MniorityGroup'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['MiniorityValidUpto'].updateValueAndValidity();
  }

  resSchoolTypeChange(e) {
    if (e.value == '1') {
      this.SchoolProfileDetails.controls['ResidentialSchoolType'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['ResidentialSchoolType'].setValue("");
      this.SchoolProfileDetails.controls['ResidentialSchoolType'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['ResidentialSchoolType'].updateValueAndValidity();
  }

  anganwadiChange(e) {
    if (e.value == '1') {
      this.SchoolProfileDetails.controls['AnganwadiNumber'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['AnganwadiWorkerCount'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['AnganwadiBoysCount'].setValidators(Validators.required);
      this.SchoolProfileDetails.controls['AnganwadiGirlsCount'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['AnganwadiNumber'].setValue("");
      this.SchoolProfileDetails.controls['AnganwadiNumber'].setValidators(null);
      this.SchoolProfileDetails.controls['AnganwadiWorkerCount'].setValue("");
      this.SchoolProfileDetails.controls['AnganwadiWorkerCount'].setValidators(null);
      this.SchoolProfileDetails.controls['AnganwadiBoysCount'].setValue("");
      this.SchoolProfileDetails.controls['AnganwadiBoysCount'].setValidators(null);
      this.SchoolProfileDetails.controls['AnganwadiGirlsCount'].setValue("");
      this.SchoolProfileDetails.controls['AnganwadiGirlsCount'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['AnganwadiNumber'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['AnganwadiWorkerCount'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['AnganwadiBoysCount'].updateValueAndValidity();
    this.SchoolProfileDetails.controls['AnganwadiGirlsCount'].updateValueAndValidity();
  }

  // getLocalBodyChange(e) {
  //   var id = e.value;
  //   console.log('e' + id)

  //   var getLocalBodyRuralData = this.dropdownDataLists['local_body'].filter(element => element.localbody_name == 'Village Panchayat');
  //   this.localbodyList = getLocalBodyRuralData.map(item => {
  //     return {
  //       label: item.localbody_name,
  //       value: item.id
  //     }
  //   });

  //   var getLocalBodyuUrbanData = this.dropdownDataLists['local_body'].filter(element => element.localbody_name != 'Village Panchayat');
  //   this.localbodyurbanList = getLocalBodyuUrbanData.map(item => {
  //     return {
  //       label: item.localbody_name,
  //       value: item.id
  //     }
  //   });
  // }

  getLocalBodyAllChange(e) {
    var id = e.value;
    console.log('e' + id)
    var getSchoolCateData = this.dropdownDataLists['local_bodyall'].filter(element => element.localbody_code == id);
    this.villageTMList = getSchoolCateData.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    });
  }

  gethabitationChange(e) {
    var id = e.value;
    this.schoolService.gethabitationlist(id).subscribe(habitdata => {
      this.editSchoolData = habitdata;
      this.habitList = this.editSchoolData['hapitation'].map(item => {
        return {
          label: item.name,
          value: item.id
        }
      });
    });
  }

  editSchoolDetails(e) {
    debugger


    this.schoolId = e.school_id;
    var localbodyId = e.LocaBodyId
    this.schoolService.gethabitationlist(localbodyId).subscribe(habitdata => {
      this.editSchoolData = habitdata;
      this.habitList = this.editSchoolData['hapitation'].map(item => {
        return {
          label: item.name,
          value: item.id
        }
      });
      // this.pageStage = 2;
      // this.SchoolProfileDetails.patchValue(e);
    });  

   this.getSaveSchoolData();
  }



  getSaveSchoolData() {
    debugger

    this.schoolService.getEditSchoolProfileData(this.schoolId).subscribe(getdata => {
      if (getdata) {
        this.schoolProfile = getdata.result[0];
        console.log('schooldata' + this.editSchoolData);
        this.SchoolProfileDetails.patchValue(this.schoolProfile);
        this.pageStage = 2;


        if (this.schoolProfile['curr_stat'] == 0) {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("Closed");
        }
        else if (this.schoolProfile['curr_stat'] == 1) {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("Functional");
        }
        else if (this.schoolProfile['curr_stat'] == 2) {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("Merged");
        }
        else if (this.schoolProfile['curr_stat'] == 3) {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("Converted to Library");
        }
        else if (this.schoolProfile['curr_stat'] == 4) {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("Aided School taken over by Govt");
        }
        else {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("");
        }
    
    
        if (this.schoolProfile['ManagementCategoryId'] == 1) {
          this.SchoolProfileDetails.controls['ManagementCategoryId_edit'].setValue("Government");
        }
        else if (this.schoolProfile['ManagementCategoryId'] == 2) {
          this.SchoolProfileDetails.controls['ManagementCategoryId_edit'].setValue("Fully Aided");
        }
        else if (this.schoolProfile['ManagementCategoryId'] == 3) {
          this.SchoolProfileDetails.controls['ManagementCategoryId_edit'].setValue("Un-aided");
        }
        else if (this.schoolProfile['ManagementCategoryId'] == 4) {
          this.SchoolProfileDetails.controls['ManagementCategoryId_edit'].setValue("Partially Aided");
        }
        else if (this.schoolProfile['ManagementCategoryId'] == 5) {
          this.SchoolProfileDetails.controls['ManagementCategoryId_edit'].setValue("Central Govt");
        }
        else {
          this.SchoolProfileDetails.controls['curr_stat_edit'].setValue("");
        }
    
       
        if (this.schoolProfile['MiniorityStatus'] == 1) {
          this.SchoolProfileDetails.controls['MiniorityStatus_edit'].setValue("Yes");
        }
        else if (this.schoolProfile['MiniorityStatus'] == 2) {
          this.SchoolProfileDetails.controls['MiniorityStatus_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['MiniorityStatus_edit'].setValue("");
        }
    
        // if (this.schoolProfile['SchoolRTEStatus'] == 1) {
        //   this.SchoolProfileDetails.controls['SchoolRTEStatus_edit'].setValue("Yes");
        // }
        // else if (this.schoolProfile['SchoolRTEStatus'] == 2) {
        //   this.SchoolProfileDetails.controls['SchoolRTEStatus_edit'].setValue("No");
        // }
        // else {
        //   this.SchoolProfileDetails.controls['SchoolRTEStatus_edit'].setValue("");
        // }
    
        if (this.schoolProfile['LowestClass'] == 15) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("PreKG");
        }
        else if (this.schoolProfile['LowestClass'] == 13) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("LKG");
        }
        else if (this.schoolProfile['LowestClass'] == 14) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("UKG");
        }
        else if (this.schoolProfile['LowestClass'] == 1) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("I");
        }
        else if (this.schoolProfile['LowestClass'] == 6) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("VI");
        }
        else if (this.schoolProfile['LowestClass'] == 9) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("IX");
        }
        else if (this.schoolProfile['LowestClass'] == 11) {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("XI");
        }
        else {
          this.SchoolProfileDetails.controls['LowestClass_edit'].setValue("");
        }
      
    
        if (this.schoolProfile['HigestClass'] == 14) {
          this.SchoolProfileDetails.controls['HigestClass_edit'].setValue("UKG");
        }
        else if (this.schoolProfile['HigestClass'] == 5) {
          this.SchoolProfileDetails.controls['HigestClass_edit'].setValue("V");
        }
        else if (this.schoolProfile['HigestClass'] == 8) {
          this.SchoolProfileDetails.controls['HigestClass_edit'].setValue("VIII");
        }
        else if (this.schoolProfile['HigestClass'] == 10) {
          this.SchoolProfileDetails.controls['HigestClass_edit'].setValue("X");
        }
        else if (this.schoolProfile['HigestClass'] == 12) {
          this.SchoolProfileDetails.controls['HigestClass_edit'].setValue("XII");
        }
        else {
          this.SchoolProfileDetails.controls['HigestClass_edit'].setValue("");
        }

       
        if (this.schoolProfile['SchoolInHillArea'] == 1) {
          this.SchoolProfileDetails.controls['SchoolInHillArea_edit'].setValue("In Forest/Hill area");
        }
        else if (this.schoolProfile['SchoolInHillArea'] == 2) {
          this.SchoolProfileDetails.controls['SchoolInHillArea_edit'].setValue("Near Forest/Hill area");
        }
        else if (this.schoolProfile['SchoolInHillArea'] == 3) {
          this.SchoolProfileDetails.controls['SchoolInHillArea_edit'].setValue("Near the High ways");
        }
        else if (this.schoolProfile['SchoolInHillArea'] == 4) {
          this.SchoolProfileDetails.controls['SchoolInHillArea_edit'].setValue("Near Coastal Area");
        }
        else if (this.schoolProfile['SchoolInHillArea'] == 0) {
          this.SchoolProfileDetails.controls['SchoolInHillArea_edit'].setValue("Not Applicable");
        }
        else {
          this.SchoolProfileDetails.controls['SchoolInHillArea_edit'].setValue("");
        }


        if (this.schoolProfile['ResidentialSchoolStatus'] == 1) {
          this.SchoolProfileDetails.controls['ResidentialSchoolStatus_edit'].setValue("Yes");
        }
        else if (this.schoolProfile['ResidentialSchoolStatus'] ==2) {
          this.SchoolProfileDetails.controls['ResidentialSchoolStatus_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['ResidentialSchoolStatus_edit'].setValue("");
        }
        
        if (this.schoolProfile['Anganwadi'] == 1) {
          this.SchoolProfileDetails.controls['Anganwadi_edit'].setValue("Yes");
        }
        else if (this.schoolProfile['Anganwadi'] == 2) {
          this.SchoolProfileDetails.controls['Anganwadi_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['Anganwadi_edit'].setValue("");
        }
        

        if (this.schoolProfile['AnganwadiLocation'] == '1') {
          this.SchoolProfileDetails.controls['AnganwadiLocation_edit'].setValue("Yes");
        }
        else if (this.schoolProfile['AnganwadiLocation'] == '2') {
          this.SchoolProfileDetails.controls['AnganwadiLocation_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['AnganwadiLocation_edit'].setValue("");
        }

        
        if (this.schoolProfile['ShiftSchoolStatus'] == 1) {
          this.SchoolProfileDetails.controls['ShiftSchoolStatus_edit'].setValue("Yes");
        }
        else if (this.schoolProfile['ShiftSchoolStatus'] == 2) {
          this.SchoolProfileDetails.controls['ShiftSchoolStatus_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['ShiftSchoolStatus_edit'].setValue("");
        }

        if (this.schoolProfile['SpecialCWSNSchoolStatus'] == 1) {
          this.SchoolProfileDetails.controls['SpecialCWSNSchoolStatus_edit'].setValue("Yes");
        }
        else if (this.schoolProfile['SpecialCWSNSchoolStatus'] == 2) {
          this.SchoolProfileDetails.controls['SpecialCWSNSchoolStatus_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['SpecialCWSNSchoolStatus_edit'].setValue("");
        }

        if (this.schoolProfile['RuralUrbanStatus'] == 1) {
          this.SchoolProfileDetails.controls['RuralUrbanStatus_edit'].setValue("Rural");
        }
        else if (this.schoolProfile['RuralUrbanStatus'] == 2) {
          this.SchoolProfileDetails.controls['RuralUrbanStatus_edit'].setValue("Urban");
        }
        else {
          this.SchoolProfileDetails.controls['RuralUrbanStatus_edit'].setValue("");
        }

       
        if (this.schoolProfile['SpecialEducatorStatus'] == 1) {
          this.SchoolProfileDetails.controls['SpecialEducatorStatus_edit'].setValue("Dedicated");
        }
        else if (this.schoolProfile['SpecialEducatorStatus'] == 2) {
          this.SchoolProfileDetails.controls['SpecialEducatorStatus_edit'].setValue("At cluster level");
        }
        else if (this.schoolProfile['SpecialEducatorStatus'] == 3) {
          this.SchoolProfileDetails.controls['SpecialEducatorStatus_edit'].setValue("No");
        }
        else {
          this.SchoolProfileDetails.controls['SpecialEducatorStatus_edit'].setValue("");
        }


      }
    });


  

    // this.schoolService.getEditSchoolProfileData(this.schoolId).subscribe(getdata => {
    //   if (getdata) {
    //     this.editSchoolData = getdata.result[0];
    //     console.log('schooldata' + this.editSchoolData);
    //     this.SchoolProfileDetails.patchValue(this.editSchoolData);
    //   }
    // });
  }


  onSave() {
    debugger
    if (this.SchoolProfileDetails.controls.ManagementCategoryId.value == '1' && this.SchoolProfileDetails.controls.ManagementCategoryId.value == '5') {
      this.SchoolProfileDetails.controls['LastRenewalYear'].setValue(0);
      this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValue(0);
    }

    if (this.SchoolProfileDetails.controls.ManagementCategoryId.value != '1') {
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValue(0);
    }

    if (this.SchoolProfileDetails.controls.ManagementCategoryId.value == '1') {
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValidators(Validators.required);
    }
    else {
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValue("");
      this.SchoolProfileDetails.controls['AnganwadiLocation'].setValidators(null);
    }
    this.SchoolProfileDetails.controls['AnganwadiLocation'].updateValueAndValidity();
    // if (this.SchoolProfileDetails.controls.curstat_date.value == '0000-00-00' || this.SchoolProfileDetails.controls.curstat_date.value == 'null') {
    //   this.SchoolProfileDetails.controls['curstat_date'].setValue("");
    // }

    if (this.SchoolProfileDetails.controls.ManagementCategoryId.value != '1' && this.SchoolProfileDetails.controls.ManagementCategoryId.value != '5') {
    this.SchoolProfileDetails.controls['LastRenewalYear'].setValidators(Validators.required);
    this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValidators(Validators.required);
  }
  else {
    this.SchoolProfileDetails.controls['LastRenewalYear'].setValue("");
    this.SchoolProfileDetails.controls['LastRenewalYear'].setValidators(null);
    this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValue("");
    this.SchoolProfileDetails.controls['RenewalCertificateNumber'].setValidators(null);
  }
  this.SchoolProfileDetails.controls['LastRenewalYear'].updateValueAndValidity();
  this.SchoolProfileDetails.controls['RenewalCertificateNumber'].updateValueAndValidity();
  
    this.submitted = true;
    var data = {
      "schoolnew_basicinfo":
        [{
          "school_id": this.schoolId,
          "curr_stat": this.SchoolProfileDetails.value.curr_stat,
          "curstat_date": this.SchoolProfileDetails.value.curstat_date,
          "school_name": this.SchoolProfileDetails.value.SchoolName,
          "sch_shortname": this.SchoolProfileDetails.value.SchoolShortName,
          "manage_cate_id": this.SchoolProfileDetails.value.ManagementCategoryId,
          "sch_management_id": this.SchoolProfileDetails.value.SchoolManagementId,
          "sch_directorate_id": this.SchoolProfileDetails.value.SchoolDirectorateId,
          "sch_cate_id": this.SchoolProfileDetails.value.SchoolCategoryId,
          // "latitude": this.SchoolProfileDetails.value.Latitude,
          // "longitude": this.SchoolProfileDetails.value.Longitude,
          "edu_dist_id": this.SchoolProfileDetails.value.EducationaldstId,
          "block_id": this.SchoolProfileDetails.value.BlockId,
          "sch_email": this.SchoolProfileDetails.value.SchoolEmail,
          "district_id": this.districtId,
          "urbanrural": this.SchoolProfileDetails.value.RuralUrbanStatus,
          "local_body_id": this.SchoolProfileDetails.value.LocaBodyId,
          "lb_vill_town_muni": this.SchoolProfileDetails.value.LocalBodyId,
          "lb_habitation_id": this.SchoolProfileDetails.value.VillageWard,
          "cluster_id": this.SchoolProfileDetails.value.ClusterId,
          "assembly_id": this.SchoolProfileDetails.value.AssemblyId,
          "parliament_id": this.SchoolProfileDetails.value.ParlimentId,
          "pincode": this.SchoolProfileDetails.value.Pincode,
          "address": this.SchoolProfileDetails.value.address,
          "modified_date": ""
        }],

      "schoolnew_academic_detail":
        [{
          "school_type": this.SchoolProfileDetails.value.SchoolType,
          "minority_sch": this.SchoolProfileDetails.value.MiniorityStatus,
          "minority_grp": this.SchoolProfileDetails.value.MniorityGroup,
          "minority_yr": this.SchoolProfileDetails.value.MiniorityValidUpto,
          // "rte": this.SchoolProfileDetails.value.SchoolRTEStatus,
          "low_class": this.SchoolProfileDetails.value.LowestClass,
          "high_class": this.SchoolProfileDetails.value.HigestClass,
          "hill_frst": this.SchoolProfileDetails.value.SchoolInHillArea,
          "resid_schl": this.SchoolProfileDetails.value.ResidentialSchoolStatus,
          "typ_resid_schl": this.SchoolProfileDetails.value.ResidentialSchoolType,
          "shftd_schl": this.SchoolProfileDetails.value.ShiftSchoolStatus,
          "cwsn_scl": this.SchoolProfileDetails.value.SpecialCWSNSchoolStatus,
          "yr_estd_schl": this.SchoolProfileDetails.value.SchEstablishmentyear,
          "yr_recogn_schl": this.SchoolProfileDetails.value.SchfirstRecogYear,
          "yr_last_renwl": this.SchoolProfileDetails.value.LastRenewalYear,
          "certifi_no": this.SchoolProfileDetails.value.RenewalCertificateNumber,
          "yr_recgn_first": this.SchoolProfileDetails.value.PriRecogFirstYear,
          "yr_rec_schl_elem": this.SchoolProfileDetails.value.UppPriRecogFirstYear,
          "yr_rec_schl_sec": this.SchoolProfileDetails.value.SceRecogFirstYear,
          "yr_rec_schl_hsc": this.SchoolProfileDetails.value.HrSecRecogFirstYear,
          "upgrad_prito_uprpri": this.SchoolProfileDetails.value.PritoUppPriUpgradationYear,
          "upgrad_uprprito_sec": this.SchoolProfileDetails.value.UppPritoSecUpgradationYear,
          "upgrad_secto_higsec": this.SchoolProfileDetails.value.SectoHrSecUpgradationYear,
          "spl_edtor": this.SchoolProfileDetails.value.SpecialEducatorStatus,
          "modified_date": ""
        }],
      "schoolnew_training_detail":
        [{
          "anganwadi": this.SchoolProfileDetails.value.Anganwadi,
          "anganwadi_schl": this.SchoolProfileDetails.value.AnganwadiLocation,
          "anganwadi_center": this.SchoolProfileDetails.value.AnganwadiNumber,
          "angan_wrks": this.SchoolProfileDetails.value.AnganwadiWorkerCount,
          "anganwadi_stu_b": this.SchoolProfileDetails.value.AnganwadiBoysCount,
          "anganwadi_stu_g": this.SchoolProfileDetails.value.AnganwadiGirlsCount,
          "modified_date": ""
        }],
      "schoolnew_basic_info_history":
        [{
          "curr_stat": this.SchoolProfileDetails.value.curr_stat,
          "curstat_date": this.SchoolProfileDetails.value.curstat_date,
          "school_name": this.SchoolProfileDetails.value.SchoolName,
          "sch_shortname": this.SchoolProfileDetails.value.SchoolShortName,
          "manage_cate_id": this.SchoolProfileDetails.value.ManagementCategoryId,
          "sch_management_id": this.SchoolProfileDetails.value.SchoolManagementId,
          "sch_directorate_id": this.SchoolProfileDetails.value.SchoolDirectorateId,
          "sch_cate_id": this.SchoolProfileDetails.value.SchoolCategoryId,
          // "latitude": this.SchoolProfileDetails.value.Latitude,
          // "longitude": this.SchoolProfileDetails.value.Longitude,
          "edu_dist_id": this.SchoolProfileDetails.value.EducationaldstId,
          "block_id": this.SchoolProfileDetails.value.BlockId,
          "sch_mail": this.SchoolProfileDetails.value.SchoolEmail,
          "district_id": this.districtId,
          "urbanrural": this.SchoolProfileDetails.value.RuralUrbanStatus,
          "local_body_id": this.SchoolProfileDetails.value.LocaBodyId,
          "lb_vill_town_muni": this.SchoolProfileDetails.value.LocalBodyId,
          "lb_habitation_id": this.SchoolProfileDetails.value.VillageWard,
          "cluster_id": this.SchoolProfileDetails.value.ClusterId,
          "assembly_id": this.SchoolProfileDetails.value.AssemblyId,
          "parliament_id": this.SchoolProfileDetails.value.ParlimentId,
          "pincode": this.SchoolProfileDetails.value.Pincode,
          "address": this.SchoolProfileDetails.value.address,
          "school_type": this.SchoolProfileDetails.value.SchoolType,
          "minority": this.SchoolProfileDetails.value.MiniorityStatus,
          "minority_group": this.SchoolProfileDetails.value.MniorityGroup,
          "minority_valid": this.SchoolProfileDetails.value.MiniorityValidUpto,
          // "rte": this.SchoolProfileDetails.value.SchoolRTEStatus,
          "low_class": this.SchoolProfileDetails.value.LowestClass,
          "high_class": this.SchoolProfileDetails.value.HigestClass,
          "schl_situated": this.SchoolProfileDetails.value.SchoolInHillArea,
          "resid_scl": this.SchoolProfileDetails.value.ResidentialSchoolStatus,
          "resid_type": this.SchoolProfileDetails.value.ResidentialSchoolType,
          "schl_shift": this.SchoolProfileDetails.value.ShiftSchoolStatus,
          "schl_cwsn": this.SchoolProfileDetails.value.SpecialCWSNSchoolStatus,
          "yr_estd_schl": this.SchoolProfileDetails.value.SchEstablishmentyear,
          "yr_recogn_schl": this.SchoolProfileDetails.value.SchfirstRecogYear,
          "last_renewal": this.SchoolProfileDetails.value.LastRenewalYear,
          "certi_no": this.SchoolProfileDetails.value.RenewalCertificateNumber,
          "yr_recgn_first": this.SchoolProfileDetails.value.PriRecogFirstYear,
          "yr_rec_schl_elem": this.SchoolProfileDetails.value.UppPriRecogFirstYear,
          "yr_rec_schl_sec": this.SchoolProfileDetails.value.SceRecogFirstYear,
          "yr_rec_schl_hsc": this.SchoolProfileDetails.value.HrSecRecogFirstYear,
          "upgrad_prito_uprpri": this.SchoolProfileDetails.value.PritoUppPriUpgradationYear,
          "upgrad_uprprito_sec": this.SchoolProfileDetails.value.UppPritoSecUpgradationYear,
          "upgrad_secto_higsec": this.SchoolProfileDetails.value.SectoHrSecUpgradationYear,
          "spl_edtor": this.SchoolProfileDetails.value.SpecialEducatorStatus,
          "angan": this.SchoolProfileDetails.value.Anganwadi,
          "anganwadi_schl": this.SchoolProfileDetails.value.AnganwadiLocation,
          "angan_code": this.SchoolProfileDetails.value.AnganwadiNumber,
          "anagan_wrks": this.SchoolProfileDetails.value.AnganwadiWorkerCount,
          "anganwadi_stu_b": this.SchoolProfileDetails.value.AnganwadiBoysCount,
          "anganwadi_stu_g": this.SchoolProfileDetails.value.AnganwadiGirlsCount,
          "ceo_comments": "",
          "state_comments": "",
          "ceo_date": "",
          "updated_date": ""
        }],
    };
    // if ((this.SchoolProfileDetails.controls.curstat_date.value != '' && this.SchoolProfileDetails.controls.curr_stat.value != '1') || this.SchoolProfileDetails.controls.curr_stat.value == '1') {
      if (this.SchoolProfileDetails.valid) {
        this.schoolService.saveEditSchoolDetails(data).subscribe(res => {
          if (res.dataStatus == true) {
            this.alertService.success("Records Updated Successfully");
            this.getSaveSchoolData();
          }
          else {
            this.alertService.error(res.message);
          }
        });
      }
      else {
        this.alertService.error("Please Fill all the Required Fields");
        for (const key of Object.keys(this.SchoolProfileDetails.controls)) {
          if (this.SchoolProfileDetails.controls[key].invalid) {
             const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('invalid keys', key);
            //  invalidControl.focus();
            //  break;
          }
        }
      }
    // }
    // else {
    //   this.alertService.error("Please Fill Date in School Management Details");
    // }

  }

  goBack() {
    this.pageStage = 1;
    this.getEditSchoolData();
  }

}
