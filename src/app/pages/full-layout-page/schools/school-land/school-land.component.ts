import { Component, OnInit, ElementRef } from '@angular/core';
import { schoolsService } from '../schools.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-school-land',
  templateUrl: './school-land.component.html',
  styleUrls: ['./school-land.component.css']
})

export class SchoolLandComponent implements OnInit {
  public showplaygroundFacilityDiv: boolean = true;
  public playgroundFacilityOption: string = '1';
  public landFacilitiesOption: string = '2';
  public landFacilitiesDiv: boolean = false;
  public schoolLandDetails: any[] = [];
  public lanOwnership: any[] = [];
  public landOwnRent: boolean = false;
  public landOwnLease: boolean = false;
  form: FormGroup;

  public total_land_sqarefeet; public total_land_acre;
  public playground_sqarefeet; public playground_acre;
  public totalNoOfBuilding: any[] = [];
  schoolId: number;
  schoolTypes: any[] = [];
  libraries: any[] = [];
  boundryWallType: any[] = [];
  reasons: any[] = [];
  constructionList: any[] = [];
  constructionType: any[] = [];
  submitted: boolean;
  landavailablediv: boolean;
  drinkingwater: any[] = [];
  classList: any[] = [];
  LibraryList: any[] = [];
  misMatchTotal: boolean = false;
  dateFormat: any;
  pipe = new DatePipe('en-US');
  classRoomError: boolean = false;
  libraryError: boolean = false;
  constructor(private schoolService: schoolsService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private userSessionService: UserSessionService,
    private el: ElementRef) {
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.initialValidators();
    this.getSchoolDetails();
    this.getData();
  }
  initialValidators() {
    this.form = this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      land_avail_sqft: new FormControl('', null),
      tot_area_1: new FormControl('', Validators.required),
      play_facility: new FormControl('', Validators.required),
      play_area_sqft: new FormControl('', null),
      area_cent_1: new FormControl('', null),
      land_exp_scl: new FormControl('', Validators.required),
      land_ownersip: new FormControl('', Validators.required),
      // land_rent_amt: new FormControl('', null),
      play_land_area: new FormControl('', Validators.required),
      cmpwall_type: new FormControl('', Validators.required),
      land_lease_perid: new FormControl('', null),
      cmpwall_perimtr: new FormControl('', Validators.required),
      valid_upto: new FormControl('', null),
      cmpwall_length: new FormControl('', Validators.required),
      build_block_no: new FormControl('', Validators.required),
      classrm_undr_constr: new FormControl('', Validators.required),
      classrm_desk_studs: new FormControl('', Validators.required),
      ramp_disable_child: new FormControl('', null),
      staffquarter: new FormControl('', Validators.required),
      fulltime_lib: new FormControl('', Validators.required),
      news_subscribe: new FormControl('', Validators.required),
      toil_gents_tot: new FormControl('', Validators.required),
      toil_ladies_tot: new FormControl('', Validators.required),
      urinal_gents_tot: new FormControl('', Validators.required),
      urinals_tot_ladies: new FormControl('', Validators.required),
      toil_bys_inuse: new FormControl('', Validators.required),
      toil_notuse_bys: new FormControl('', Validators.required),
      toil_nonfunc_bys: new FormControl('', Validators.required),
      toil_inuse_grls: new FormControl('', Validators.required),
      toil_notuse_grls: new FormControl('', Validators.required),
      toil_reasn_grls: new FormControl('', Validators.required),
      cwsntoil_inuse_bys: new FormControl('', Validators.required),
      cwsntoil_notuse_bys: new FormControl('', Validators.required),
      cwsntoil_reasn_bys: new FormControl('', Validators.required),
      cwsntoil_inuse_grls: new FormControl('', Validators.required),
      cwsntoil_notuse_grls: new FormControl('', Validators.required),
      cwsntoil_reasn_grls: new FormControl('', Validators.required),
      urinls_inuse_bys: new FormControl('', Validators.required),
      urinls_notuse_bys: new FormControl('', Validators.required),
      urinls_reasn_bys: new FormControl('', Validators.required),
      urinls_inuse_grls: new FormControl('', Validators.required),
      urinls_notuse_grls: new FormControl('', Validators.required),
      urinls_reasn_grls: new FormControl('', Validators.required),
      toil_waterfac_bys: new FormControl('', Validators.required),
      toil_waterfac_grls: new FormControl('', Validators.required),
      urinls_waterfac_bys: new FormControl('', Validators.required),
      urinls_waterfac_grls: new FormControl('', Validators.required),
      toil_sanit_wrks: new FormControl('', Validators.required),
      toil_land_avail: new FormControl('', Validators.required),
      napkin_incin: new FormControl('', Validators.required),
      incinerator: new FormControl('', Validators.required),
      tot_handwash_bys: new FormControl('', Validators.required),
      tot_handwash_grls: new FormControl('', Validators.required),
      drnkwater_avail: new FormControl('', Validators.required),
      overheadtank_avail: new FormControl('', Validators.required),
      waterpuri_avail: new FormControl('', Validators.required),
      schl_rainwtr_hrv: new FormControl('', Validators.required),
      solar_panel: new FormControl('', Validators.required),
      kitchen_garden: new FormControl('', Validators.required),
      electricity: new FormControl('', Validators.required),
      class_dustbin: new FormControl('', Validators.required),
      waste_toilets: new FormControl('', Validators.required),
      waste_kitchen: new FormControl('', Validators.required),
      toil_land_avail_sqft: new FormControl('', Validators.required),
      napkin_avail_no: new FormControl('', null),
      napkin_func_no: new FormControl('', null),
      inci_auto_avail_no: new FormControl('', null),
      inci_auto_func_no: new FormControl('', null),
      inci_man_avail_no: new FormControl('', null),
      inci_man_func_no: new FormControl('', null),
      drnkwater_source: new FormControl('', null),
      ramp_building_yn: new FormControl('', null),
      ramp_handrail: new FormControl('', null),
      water_test: new FormControl('', Validators.required),
      clsrms_dptd: new FormControl('', Validators.required),
      handwash_meal_yn: new FormControl('', Validators.required),  
      toil_handwash_soap  : new FormControl('', Validators.required), 
      classRoomEntry: this.fb.array([]),
      libraryEntry: this.fb.array([]),
      buildingBlocks: this.fb.array([]),
    });
  }
  getData() {
    this.schoolTypes = [
      { "value": "1", "label": "Pre-Primary" },
      { "value": "2", "label": "Primary" },
      { "value": "3", "label": "Upper Primary" },
      { "value": "4", "label": "Secondary" },
      { "value": "5", "label": "Higher Secondary" },
    ];
    this.libraries = [
      { "value": "1", "label": "Library" },
      { "value": "2", "label": "Book Bank" },
      { "value": "3", "label": "Reading Corner" },
      { "value": "4", "label": "Newspapers/Magazines" },
      { "value": "5", "label": "None" },
    ];
    this.boundryWallType = [
      { "value": "1", "label": "Pucca" },
      { "value": "2", "label": "Pucca but broken" },
      { "value": "3", "label": "Barbed wire fencing" },
      { "value": "4", "label": "Hedges" },
      { "value": "5", "label": "No boundry wall" },
      { "value": "6", "label": "Others" },
      { "value": "7", "label": "Partial" },
      { "value": "8", "label": "Under Construction" },
    ];
    this.constructionType = [
      { "value": "1", "label": "Pucca" },
      { "value": "2", "label": "Partially Pucca" },
      { "value": "3", "label": "Kutcha" },
      { "value": "4", "label": "Dilapidated buiding" },
      { "value": "5", "label": "Under Construction" }
    ];

    this.reasons = [
      { "value": "1", "label": "Water Supply" },
      { "value": "2", "label": "Drainage Problem" },
      { "value": "3", "label": "Toilet Damaged" },
      { "value": "4", "label": "Not Applicable" }
    ];
    this.lanOwnership = [
      { "value": "1", "label": "Private" },
      { "value": "2", "label": "Rented/Leased" },
      { "value": "3", "label": "Government" },
      { "value": "4", "label": "Government school in a rent free building" },
      { "value": "5", "label": "No Building" },
      { "value": "7", "label": "Building Under Construction" },
      { "value": "10", "label": "School running in other Department Building" },
    ];
    this.drinkingwater = [
      { "value": "1", "label": "Hand pumps" },
      { "value": "2", "label": "Well" },
      { "value": "3", "label": "Tap water" },
      { "value": "4", "label": "RO purifier" },
      { "value": "5", "label": "Packaged / Bottled water" },
      { "value": "-1", "label": "Others" },
    ];
  }

  getSchoolDetails() {
    debugger;
    this.schoolService.getSchoolDetailsData(this.schoolId).subscribe((res) => {

      this.schoolLandDetails = res.result.schoolinfo;
      this.constructionList = res.result.schoolinfo.natureofconst;
      this.classList = res.result.schoolinfo.classrooms;
      this.LibraryList = res.result.schoolinfo.library;
      this.form.patchValue(this.schoolLandDetails);
      if(this.constructionList.length > 0)
      {
      const buildingFormArray = this.form.controls.buildingBlocks as FormArray;
      while (buildingFormArray.length !== 0) {
        buildingFormArray.removeAt(0)
      }
     
        for (let i = 0; i < this.constructionList.length; i++) {
          debugger;
          var classInUse = this.constructionList[i].tot_classrm_use ? this.constructionList[i].tot_classrm_use : 0;
          var classNotInUse = this.constructionList[i].tot_classrm_nouse ? this.constructionList[i].tot_classrm_nouse : 0;
          var total = +classInUse + +classNotInUse;
          var goodCond = this.constructionList[i].good_condition ? this.constructionList[i].good_condition : 0;
          var minorRepair = this.constructionList[i].need_minorrep ? this.constructionList[i].need_minorrep : 0;
          var majorRepair = this.constructionList[i].need_majorrep ? this.constructionList[i].need_majorrep : 0;
          var totalRooms = +goodCond + +minorRepair + +majorRepair;
          var isValid = total == totalRooms ? true : false;
          buildingFormArray.push(this.fb.group({
            school_key_id: this.schoolId,
            construct_type: this.constructionList[i].construct_type,
            total_flrs: this.constructionList[i].total_flrs,
            tot_classrm_use: this.constructionList[i].tot_classrm_use,
            tot_classrm_nouse: this.constructionList[i].tot_classrm_nouse,
            off_room: this.constructionList[i].off_room,
            lab_room: this.constructionList[i].lab_room,
            library_room: this.constructionList[i].library_room,
            comp_room: this.constructionList[i].comp_room,
            art_room: this.constructionList[i].art_room,
            staff_room: this.constructionList[i].staff_room,
            hm_room: this.constructionList[i].hm_room,
            girl_room: this.constructionList[i].girl_room,
            good_condition: this.constructionList[i].good_condition,
            need_minorrep: this.constructionList[i].need_minorrep,
            need_majorrep: this.constructionList[i].need_majorrep,
            total_room: total,
            total_room_calc: totalRooms,
            isValidTotal: isValid
          }));
        }
      }
      if(this.LibraryList.length > 0)
      {
      const libraryFormArray = this.form.controls.libraryEntry as FormArray;
      while (libraryFormArray.length !== 0) {
        libraryFormArray.removeAt(0)
      }
      for (let i = 0; i < this.LibraryList.length; i++) {
        debugger;
        var ncertBooks = this.LibraryList[i].ncert_books ? this.LibraryList[i].ncert_books : '';
        libraryFormArray.push(this.fb.group({
          school_key_id: this.schoolId,
          num_books: this.LibraryList[i].num_books,
          library_type: this.LibraryList[i].library_type,
          ncert_books: ncertBooks
        }));
   
        this.chooseLibrary(this.form.value.libraryEntry[i].library_type,i);
      }
    }
    if(this.classList.length > 0)
    {

    
      const classRoomFormArray = this.form.controls.classRoomEntry as FormArray;
      while (classRoomFormArray.length !== 0) {
        classRoomFormArray.removeAt(0)
      }
      for (let i = 0; i < this.classList.length; i++) {
        debugger;
        classRoomFormArray.push(this.fb.group({
          school_key_id: this.schoolId,
          school_type: this.classList[i].schooltype,
          num_rooms: this.classList[i].num_rooms
        }));
      }
    }
    if(this.form.value.play_facility)
    {
      this.choosePlayGroundFacl(this.form.value.play_facility);
    }
    if(this.form.value.land_exp_scl)
    {
      this.showlandFacility(this.form.value.land_exp_scl);
    }
if(this.form.value.land_ownersip)
{
  this.landOwnershipDetails(this.form.value.land_ownersip);
}
if(this.form.value.toil_land_avail)
{
  this.additionalToiletLand(this.form.value.toil_land_avail);
}
if(this.form.value.napkin_incin)
{
  this.napkinVendingMachine(this.form.value.napkin_incin);
}
if(this.form.value.incinerator)
{
  this.incinerator(this.form.value.incinerator);
}
if(this.form.value.drnkwater_avail)
{
  this.drinkingWaterAvail(this.form.value.drnkwater_avail);
}
if(this.form.value.ramp_disable_child)
{
  this.chooseRamp(this.form.value.ramp_disable_child);
}
if(this.form.value.ramp_building_yn)
{
  this.rampBuildingExists(this.form.value.ramp_building_yn);
}
      // this.form.controls['tot_area_1'].setValue((this.form.value.land_avail_sqft / 43560).toFixed(1));
      // this.form.controls['area_cent_1'].setValue((this.form.value.play_area_sqft / 43560).toFixed(1));
       this.form.controls['tot_area_1'].setValue((this.form.value.land_avail_sqft / 43560).toFixed(2));
      this.form.controls['area_cent_1'].setValue((this.form.value.play_area_sqft / 43560).toFixed(2));
    })
  }

  choosePlayGroundFacl(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['area_cent_1'].setValidators(Validators.required);

    }
    else {
      this.form.controls['area_cent_1'].setValue("");
      this.form.controls['play_area_sqft'].setValue("");
      this.form.controls['area_cent_1'].setValidators(null);

    }
    this.form.controls['area_cent_1'].updateValueAndValidity();
  }

  showlandFacility(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['play_land_area'].setValidators(Validators.required);

    }
    else {
      this.form.controls['play_land_area'].setValue("");
      this.form.controls['play_land_area'].setValidators(null);

    }
    this.form.controls['play_land_area'].updateValueAndValidity();
  }

  landOwnershipDetails(value) {
    this.submitted = false;
    debugger;
    if (value === '1') {
      // this.form.controls['land_rent_amt'].setValidators(Validators.required);
      this.form.controls['land_lease_perid'].setValue("");
      this.form.controls['valid_upto'].setValue("");
      this.form.controls['land_lease_perid'].setValidators(null);
      this.form.controls['valid_upto'].setValidators(null);
    }
    else if (value === '2') {
      // this.form.controls['land_rent_amt'].setValue("");
      // this.form.controls['land_rent_amt'].setValidators(null);
      this.form.controls['land_lease_perid'].setValidators(Validators.required);
      this.form.controls['valid_upto'].setValidators(Validators.required);
    }
    else {

      // this.form.controls['land_rent_amt'].setValue("");
      this.form.controls['land_lease_perid'].setValue("");
      this.form.controls['valid_upto'].setValue("");
      // this.form.controls['land_rent_amt'].setValidators(null);
      this.form.controls['land_lease_perid'].setValidators(null);
      this.form.controls['valid_upto'].setValidators(null);
    }
    // this.form.controls['land_rent_amt'].updateValueAndValidity();
    this.form.controls['land_lease_perid'].updateValueAndValidity();
    this.form.controls['valid_upto'].updateValueAndValidity();
  }
  additionalToiletLand(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['toil_land_avail_sqft'].setValidators(Validators.required);

    }
    else {
      this.form.controls['toil_land_avail_sqft'].setValue("");
      this.form.controls['toil_land_avail_sqft'].setValidators(null);

    }
    this.form.controls['toil_land_avail_sqft'].updateValueAndValidity();
  }
  napkinVendingMachine(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['napkin_avail_no'].setValidators(Validators.required);
      this.form.controls['napkin_func_no'].setValidators(Validators.required);


    }
    else {
      this.form.controls['napkin_avail_no'].setValue("");
      this.form.controls['napkin_func_no'].setValue("");
      this.form.controls['napkin_avail_no'].setValidators(null);
      this.form.controls['napkin_func_no'].setValidators(null);


    }
    this.form.controls['napkin_avail_no'].updateValueAndValidity();
    this.form.controls['napkin_func_no'].updateValueAndValidity();
  }
  incinerator(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['inci_auto_avail_no'].setValidators(Validators.required);
      this.form.controls['inci_auto_func_no'].setValidators(Validators.required);
      this.form.controls['inci_man_avail_no'].setValidators(Validators.required);
      this.form.controls['inci_man_func_no'].setValidators(Validators.required);


    }
    else {
      this.form.controls['inci_auto_avail_no'].setValue("");
      this.form.controls['inci_auto_func_no'].setValue("");
      this.form.controls['inci_man_avail_no'].setValue("");
      this.form.controls['inci_man_func_no'].setValue("");
      this.form.controls['inci_auto_avail_no'].setValidators(null);
      this.form.controls['inci_auto_func_no'].setValidators(null);
      this.form.controls['inci_man_avail_no'].setValidators(null);
      this.form.controls['inci_man_func_no'].setValidators(null);


    }
    this.form.controls['inci_auto_avail_no'].updateValueAndValidity();
    this.form.controls['inci_auto_func_no'].updateValueAndValidity();
    this.form.controls['inci_man_avail_no'].updateValueAndValidity();
    this.form.controls['inci_man_func_no'].updateValueAndValidity();
  }
  drinkingWaterAvail(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['drnkwater_source'].setValidators(Validators.required);

    }
    else {
      this.form.controls['drnkwater_source'].setValue("");
      this.form.controls['drnkwater_source'].setValidators(null);

    }
    this.form.controls['drnkwater_source'].updateValueAndValidity();
  }
  chooseRamp(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['ramp_building_yn'].setValidators(Validators.required);

    }
    else {
      this.form.controls['ramp_building_yn'].setValue("");
      this.form.controls['ramp_building_yn'].setValidators(null);

    }
    this.form.controls['ramp_building_yn'].updateValueAndValidity();
  }
  
  rampBuildingExists(value) {
    this.submitted = false;
    if (value == 1) {
      this.form.controls['ramp_handrail'].setValidators(Validators.required);

    }
    else {
      this.form.controls['ramp_handrail'].setValue("");
      this.form.controls['ramp_handrail'].setValidators(null);

    }
    this.form.controls['ramp_handrail'].updateValueAndValidity();
  }
  addLibraryEntry() {
    this.submitted = false;
    debugger;
    const formArray = this.form.controls.libraryEntry as FormArray;
    if (formArray.length < this.libraries.length) {
      if (this.form.controls.libraryEntry.valid) {
        formArray.push(this.createItemForLibraryEntry());
      }
      else {
        this.libraryError = true;
      }
    }
  }
  removeLibraryEntry() {
    debugger;
    this.submitted = false;
    const libraryFormArray = this.form.controls.libraryEntry as FormArray;
    if (libraryFormArray.length > 0) {
      this.libraryError = false;
      libraryFormArray.removeAt(libraryFormArray.length - 1);
    }


  }
  addClassRoomEntry() {
    this.submitted = false;
    const classRoomformArray = this.form.controls.classRoomEntry as FormArray;
    if (classRoomformArray.length < this.schoolTypes.length) {
      debugger;
      if (this.form.controls.classRoomEntry.valid) {
        classRoomformArray.push(this.createItemForClassRoomEntry());
      }
      else {
        this.classRoomError = true;
      }

    }
  }
  removeClassRoomEntry() {
    this.submitted = false;
    debugger;

    const formArray = this.form.controls.classRoomEntry as FormArray;
    if (formArray.length > 0) {
      this.classRoomError = false;
      formArray.removeAt(formArray.length - 1);
    }


  }
  createItemForClassRoomEntry() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      school_type: new FormControl('', Validators.required),
      num_rooms: new FormControl('', Validators.required)
    });
  }
  createItemForLibraryEntry() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      library_type: new FormControl(this.schoolId, Validators.required),
      num_books: new FormControl('', Validators.required),
      ncert_books: new FormControl('', null)
    });
  }
  chooseLibrary(value, index) {
    this.submitted = false;
    debugger;
    var selectedLibrary = value;

    (<FormArray>this.form.controls['libraryEntry']).at(index).patchValue({ library_type: '' });
    debugger;
    const isAvailableLibrary = this.form.value.libraryEntry.find(x => x.library_type == selectedLibrary)
    if (isAvailableLibrary) {
      this.alertService.error("Option Already Selected");

    }
    else {
      (<FormArray>this.form.controls['libraryEntry']).at(index).patchValue({ library_type: selectedLibrary });
    }
    if(selectedLibrary == 1 || selectedLibrary == 2)
    {
      this.form.controls['libraryEntry']['controls'][index].controls['ncert_books'].setValidators(Validators.required);
    }
    else {
      this.form.controls['libraryEntry']['controls'][index].controls['ncert_books'].setValidators(null);
    }
    this.form.controls['libraryEntry']['controls'][index].controls['ncert_books'].updateValueAndValidity();

  }
  chooseClass(event, index) {
    this.submitted = false;
    var selectedSchoolType = event.value;

    (<FormArray>this.form.controls['classRoomEntry']).at(index).patchValue({ school_type: '' });
    debugger;
    const isAvailableClass = this.form.value.classRoomEntry.find(x => x.school_type == selectedSchoolType)
    if (isAvailableClass) {
      this.alertService.error("Option Already Selected");

    }
    else {
      (<FormArray>this.form.controls['classRoomEntry']).at(index).patchValue({ school_type: selectedSchoolType });
    }

  }

  convertAcre(sqare_feet) {
    this.submitted = false;
   this.total_land_acre = (sqare_feet / 43560).toFixed(1);
  // this.total_land_acre = (sqare_feet / 43560);
    this.form.controls['tot_area_1'].setValue(this.total_land_acre);

  }

  convertSqureFeet(acre) {
    this.submitted = false;
    this.total_land_sqarefeet = (acre * 43560);
    this.form.controls['land_avail_sqft'].setValue(this.total_land_sqarefeet);
  }

  convertAcrePlayground(sqare_feet) {
    this.submitted = false;
    debugger;
      // this.playground_acre = (sqare_feet / 43560)*10^2/10^2;
     this.playground_acre = Math.round((sqare_feet / 43560)*10^2/10^2);
    this.form.controls['area_cent_1'].setValue(this.playground_acre);
  }
  checkBoundryWall(boundryValue)
  {
    this.submitted = false;
    if(boundryValue > this.form.value.cmpwall_perimtr)
    {
      debugger;
      this.form.controls['cmpwall_length'].setValue("");
    this.alertService.error("Length of boundary wall should be less than perimeter of boundary");
    }
  }

  convertSqureFeetPlayground(acre) {
    this.submitted = false;
    this.playground_sqarefeet = (acre * 43560);
    this.form.controls['play_area_sqft'].setValue(this.playground_sqarefeet);
    if(this.form.value.play_area_sqft > this.form.value.land_avail_sqft)
{
  debugger;
  this.form.controls['play_area_sqft'].setValue("");
  this.form.controls['area_cent_1'].setValue("");
this.alertService.error("Playground Area should be less than Total Land Area");
}
  }



  totalBuildingBlocks(totalList) {
    debugger;
    if (totalList > 0) {
      this.submitted = false;
      const buildingFormArray = this.form.controls.buildingBlocks as FormArray;
      while (buildingFormArray.length !== 0) {
        buildingFormArray.removeAt(0)
      }
      for (let i = 1; i <= totalList; i++) {
        buildingFormArray.push(this.createItem());
        // buildingFormArray.push(this.fb.group({
        //   school_key_id: new FormControl(this.schoolId, Validators.required),
        //   construct_type: new FormControl('', Validators.required),
        //   total_flrs: new FormControl('', Validators.required),
        //   tot_classrm_use: new FormControl('', Validators.required),
        //   tot_classrm_nouse: new FormControl('', Validators.required),
        //   off_room: new FormControl('', Validators.required),
        //   lab_room: new FormControl('', Validators.required),
        //   library_room: new FormControl('', Validators.required),
        //   comp_room: new FormControl('', Validators.required),
        //   art_room: new FormControl('', Validators.required),
        //   staff_room: new FormControl('', Validators.required),
        //   hm_room: new FormControl('', Validators.required),
        //   girl_room: new FormControl('', Validators.required),
        //   good_condition: new FormControl('', Validators.required),
        //   need_minorrep: new FormControl('', Validators.required),
        //   need_majorrep: new FormControl('', Validators.required),
        //   total_room: new FormControl('', Validators.required)
        // }));
      }
    }
  }
  createItem() {
    return this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),
      construct_type: new FormControl('', Validators.required),
      total_flrs: new FormControl('', Validators.required),
      tot_classrm_use: new FormControl('', Validators.required),
      tot_classrm_nouse: new FormControl('', Validators.required),
      off_room: new FormControl('', Validators.required),
      lab_room: new FormControl('', Validators.required),
      library_room: new FormControl('', Validators.required),
      comp_room: new FormControl('', Validators.required),
      art_room: new FormControl('', Validators.required),
      staff_room: new FormControl('', Validators.required),
      hm_room: new FormControl('', Validators.required),
      girl_room: new FormControl('', Validators.required),
      good_condition: new FormControl('', Validators.required),
      need_minorrep: new FormControl('', Validators.required),
      need_majorrep: new FormControl('', Validators.required),
      total_room: new FormControl('', Validators.required),
      total_room_calc : new FormControl('', Validators.required),
      isValidTotal : new FormControl(true, Validators.required),
    });
  }
  cancel() {
    this.form.reset();
  }
  calcTotal(index) {
    debugger;
    var classInUse = this.form.value.buildingBlocks[index].tot_classrm_use ? this.form.value.buildingBlocks[index].tot_classrm_use : 0;
    var classNotInUse = this.form.value.buildingBlocks[index].tot_classrm_nouse ? this.form.value.buildingBlocks[index].tot_classrm_nouse : 0;
    var total = +classInUse + +classNotInUse;
    var goodCond = this.form.value.buildingBlocks[index].good_condition ? this.form.value.buildingBlocks[index].good_condition : 0;
    var minorRepair = this.form.value.buildingBlocks[index].need_minorrep ? this.form.value.buildingBlocks[index].need_minorrep : 0;
    var majorRepair = this.form.value.buildingBlocks[index].need_majorrep ? this.form.value.buildingBlocks[index].need_majorrep : 0;
    var totalRooms = +goodCond + +minorRepair + +majorRepair;
    (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ total_room_calc: totalRooms });
    (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ total_room: total });
    if(total == totalRooms)
    {
      (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ isValidTotal: true });
    }
    else {
      (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ isValidTotal: false });
    }

  }
  calcTotalRooms(index)
  {
  
  }
  checkTotal(index) {
    //     this.misMatchTotal = false;
    // var goodCond = this.form.value.buildingBlocks[index].good_condition ? this.form.value.buildingBlocks[index].good_condition : 0;
    // var majorRepair = this.form.value.buildingBlocks[index].need_majorrep ? this.form.value.buildingBlocks[index].need_majorrep : 0;
    // var minorRepair = this.form.value.buildingBlocks[index].need_minorrep ? this.form.value.buildingBlocks[index].need_minorrep : 0;
    // var enteredTotalClasses = this.form.value.buildingBlocks[index].total_room ? this.form.value.buildingBlocks[index].total_room : 0;
    // var totalClasses = +goodCond + +majorRepair + +minorRepair;
    // if(goodCond != 0 && majorRepair !=0 && minorRepair !=0)
    // {
    //   if(totalClasses != enteredTotalClasses)
    //   {
    //     this.misMatchTotal = true;
    //   this.alertService.error("Total Classrooms does not Match");
    //   // (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ good_condition: '' });
    //   // (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ need_majorrep: '' });
    //   // (<FormArray>this.form.controls['buildingBlocks']).at(index).patchValue({ need_minorrep: '' });
    //   }
    //   else {
    //     this.misMatchTotal = false; 
    //   }
    // }
  }
  calcAcres(event) {
    debugger;
    var landAvailablity = event.target.value;
    var convertToAcre = landAvailablity / 43560;
    this.form.controls['tot_area_1'].setValue(convertToAcre);
  }
  calcAcresPlayground(event) {
    var playGroundArea = event.target.value;
    var groundConvertToAcre = playGroundArea / 43560;
    this.form.controls['area_cent_1'].setValue(groundConvertToAcre);
  }
  save() {
    console.log(this.form.valid);
    debugger;
    this.submitted = true;
    if(this.form.value.tot_area_1 > 0.02) {
    if (this.form.valid) {

const checkInvalidTotal = this.form.value.buildingBlocks.filter(i => i.isValidTotal == false);
 const totalBlockClassRooms= this.form.value.buildingBlocks.reduce((sum, item) => sum + Number(item.tot_classrm_use), 0);
 const totalInstructionalClassRoom = this.form.value.classRoomEntry.reduce((sum, item) => sum + Number(item.num_rooms), 0);
 debugger;
const isValidInstClassRoomCheck = totalBlockClassRooms == totalInstructionalClassRoom ? true : false;
if(checkInvalidTotal.length == 0 && isValidInstClassRoomCheck)
{

  debugger;    
      var data = {
        // "schoolnew_infra_detail":{
        //   "school_key_id":this.schoolId,
        //   "land_avail_tot":this.form.value.land_avail_tot,
        //   "play_facility":this.form.value.play_facility,
        //   "play_area_sqft":this.form.value.play_area_sqft,
        //   "land_exp_scl":this.form.value.land_exp_scl,
        //   "land_ownersip":this.form.value.land_ownersip,
        //   "land_rent_amt":this.form.value.play_facility,
        //   "land_lease_perid":this.form.value.land_lease_perid,
        //   "cmpwall_type":this.form.value.play_facility,
        //   "cmpwall_perimtr":this.form.value.cmpwall_perimtr,
        //   "valid_upto":this.form.value.valid_upto,
        //   "cmpwall_length":this.form.value.cmpwall_length,
        //   "build_block_no":this.form.value.build_block_no,
        //   "classrm_undr_constr":this.form.value.classrm_undr_constr,
        //    "staffquarter":this.form.value.staffquarter,
        //   "fulltime_lib":this.form.value.fulltime_lib,
        //   "news_subscribe":this.form.value.news_subscribe,
        //   // "news_subscribe":this.form.value.news_subscribe,
        //   // "build_block_no":this.form.value.build_block_no,

        // },
        "schoolnew_infra_detail": this.form.value,
        "schoolnew_academic_detail": {
          "school_key_id": this.schoolId,
          "electricity": this.form.value.electricity
        },
        "schoolnew_library_entry": this.form.value.libraryEntry,
        "schoolnew_classroomlevel_entry": this.form.value.classRoomEntry,
        "schoolnew_profilecomplete":{"school_key_id": this.schoolId,"part_5" : "1"}
        //     "schoolnew_training_detail":{
        //       "school_key_id": this.schoolId,
        //       "special_train": this.form.value.special_train,
        //       "stu_councel": this.form.value.stu_councel,
        //       "train_prov_boys": this.form.value.train_prov_boys,
        //       "train_prov_grls": this.form.value.train_prov_grls,
        //       "train_cond_by": this.form.value.trainingCondBy,
        //       "train_cond_in": this.form.value.train_cond_in,
        //       "train_type": this.form.value.train_type
        //    },
        //    "schoolnew_safety_details":{
        //     "school_key_id": this.schoolId,
        //     "sdmp_dev": this.form.value.sdmp_dev,
        //     "sturct_saf":this.form.value.sturct_saf,
        //     "nonsturct_saf": this.form.value.nonsturct_saf,
        //     "cctv_school": this.form.value.cctv_school,
        //     "firext_schl": this.form.value.firext_schl,
        //     "nodtchr_schlsaf": this.form.value.nodtchr_schlsaf,
        //     "dister_trng": this.form.value.dister_trng,
        //     "dister_part": this.form.value.dister_part,
        //     "slfdfse_trng": this.form.value.slfdfse_trng,
        //     "noslfdfse_trng": this.form.value.noslfdfse_trng
        //  }
      }
      data['schoolnew_natureofconst_entry'] = this.form.value.buildingBlocks.map(item => { return { 
        school_key_id: item.school_key_id, 
        construct_type: item.construct_type, 
        total_flrs:item.total_flrs,
        tot_classrm_use:item.tot_classrm_use,
        tot_classrm_nouse:item.tot_classrm_nouse,
        off_room:item.off_room,
        lab_room:item.lab_room,
        library_room:item.library_room,
        comp_room:item.comp_room,
        art_room:item.art_room,
        staff_room:item.staff_room,
        hm_room:item.hm_room,
        girl_room:item.girl_room,
        good_condition:item.good_condition,
        need_minorrep:item.need_minorrep,
        need_majorrep:item.need_majorrep
      }});
      this.schoolService.saveSchoolDetails(data).subscribe(res => {
        if (res.dataStatus) {
          debugger;
          // this.form.reset();
          this.alertService.success("Records Updated Successfully");
         
          this.getSchoolDetails();
        }
        else {
          this.alertService.error(res.message);
        }
      });
    }
    else {
      // const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
      // if (invalidControl) {
      //   invalidControl.focus();
      // }
      if(checkInvalidTotal.length > 0)
      {
        this.alertService.error("Sum of Class room in Good condition, Class room needing Minor Repair and  Class room needing Major Repair  should be equal to Sum of Class room used for Instructional Purpose and  Class room not for Instructional Purpose"); 
      }
      else {
        this.alertService.error("Sum of Classrooms used for Instructional Purpose  by Each Stage/Level  Should be Equal to Sum of Class Room used for Instructional Purpose by Block wise");
      }
      
     
    }
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
      this.alertService.error("Please Fill all the Required Fields");
    }
  }
  else {
    this.alertService.error("Total land availability acre cannot be less than 0.02");
  }
  }


  // onFinalSubmit() {
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
  //     accept: () => {
  //       this.submitted = true;
  //   if (this.form.valid) {
  //     var data = {
  //       "schoolnew_infra_detail": this.form.value,
  //       "schoolnew_academic_detail": {
  //         "school_key_id": this.schoolId,
  //         "electricity": this.form.value.electricity
  //       },
  //       "schoolnew_library_entry": this.form.value.libraryEntry,
  //       "schoolnew_classroomlevel_entry": this.form.value.classRoomEntry,
  //       "schoolnew_natureofconst_entry": this.form.value.buildingBlocks,
  //       "schoolnew_profilecomplete":{"school_key_id": this.schoolId,"part_5" : "2"}
  //     }
  //     this.schoolService.saveSchoolDetails(data).subscribe(res => {
  //       if (res.dataStatus) {
        
          
  //         this.alertService.success("Records Updated Successfully");
         
  //         this.getSchoolDetails();
  //       }
  //       else {
  //         this.alertService.error(res.message);
  //       }
  //     });
  //   }
  //   else {
  //     this.alertService.error("Please Fill all the Required Fields");
  //   }
  //     }
  //   });
  // }


}
