import { Component, OnInit, ElementRef } from '@angular/core';
import {MenuItem } from 'primeng/api';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { StateDashboardService } from '../../statedashboard/dashboard.services';

@Component({
  selector: 'app-school-detail-registraion',
  templateUrl: './school-detail-registraion.component.html',
  styleUrls: ['./school-detail-registraion.component.css'],
})
export class SchoolDetailRegistraionComponent implements OnInit {
  form: FormGroup;
  form_3: FormGroup;
  items: MenuItem[];
  get_fire_saft :any;
  buildingDocumentList: any;
  numOfRooms:any;
  numOfBooks: any;
  stablitycertificate: any;
  building_document: FormArray;
  document3: FormArray;
  fire_safety: FormArray;
  building_stability: FormArray;
  building_licence_array: FormArray;
  trust_institution : FormArray;
  activeIndex: number = 0;
  sample: { label: string; value: string; }[];
  submitted: boolean= false;
  registration_page: boolean = false;
  allDistrictropvalueoptions: any [] = [];
  selt_dist_id: any;
  allblockdropvalueoptions: any [] =[];
  urban_rural: { label: string; value: string; }[];
  selt_block_id: any;
  selt_urb_rural_id: any;
  localbody_dropvalueoptions: any [] =[] ;
  selt_local_id: any;
  villageTownMunicipality: any [] =[];
  selt_village_id_id: any;
  VillageWard: any []= [];
  assembly_namedropvalueoptions: any[] = [];
  assembly_id: any;
  parlimentropvalueoptions: any []=[];
  edu_distropvalueoptions: any[]=[];
  reasons: any[] = [];
  lanOwnership: any[] = [];
  boundarywall: any[] = [];
  libraries: any[] = [];
  schoolTypes: any[] = [];
  school_type: { label: string; value: string; }[];
  class_from_to_dropvalue: { label: string; value: string; }[];
  inspection: FormArray;
  inspections: FormArray;
  schlCommiteInvalid: boolean;
  sch_Doc_invalid: boolean;
  minDate: Date;
  maxDate: Date;
  public total_land_acre;
  public total_land_sqarefeet; 
  invalidValidUpto: boolean;
  invalidAddbuilding: boolean;
  schoollandinvalid: boolean;
  building_licnce_Invalid: boolean;
  trust_institute_Invalid: boolean;
  sch_cat: { label: string; value: string; }[];
  invalid_doc_3: boolean;
  ifscc_code: any;
  bank_detail: any;
  user_type: any;
  fromdate: string;
  user_name: any;
  todate: string;
  address_form_1: string;
  todayDate: string;
  buildingPlan:any[] =[];
  buildingStability:any[] =[];
  buildingLicense:any[] =[];
  sanitaryCertificate:any[] =[];
  fireSafety:any[] =[];
  schoolCertificate: any [] =[];
  uploadedFiles: any[] = [];
  supportDoc: any[] = [];
  upload_challn_array: any[]=[];
  school_form_1: any;
  school_form_2: any;
  school_form_3: any;
  get_dist_id: any;
  get_sant_saft: any;
  building_licence: any;
  schl_certifi: any;
  display: boolean;


  constructor(public fb :FormBuilder, public dashboardService: StateDashboardService,
    public UserSessionService : UserSessionService,public alertService:AlertService, public registrationservice : RegistrationService, private el: ElementRef) { 
    this.user_type=this.UserSessionService.userTypeId();
    this.user_name=this.UserSessionService.userName();
  }

  ngOnInit() {
  console.log(this.user_name);
  if(this.user_type == 22){
    debugger;
        this.all_district_dropdown();
        this.steps();
        this.initialValidator();
        this.todayDate = new Date().toISOString().split('T')[0];
        this.getData();
        this.Patch_data();
    }
    else {
      debugger;
      this.alertService.info("User Type Not Allowed Here");
    }
  }

  Patch_data(){
    this.registrationservice.get_saved_details(this.user_name).subscribe((res) => {
      console.log(res,"get res");
      if(res.screen_1.length>0){ 
          if (this.activeIndex == 0){ 
            this.school_form_1 = res.screen_1[0];
            this.form.patchValue(this.school_form_1);
            this.get_dist_id=this.school_form_1.district_id
            this.Selected_dist_Option(this.school_form_1.district_id); 
            this.Selected_urb_Option(this.school_form_1.urbanrural); 
            this.Selected_local_Option(this.school_form_1.local_body_type_id); 
            this.Selected_village_Option(this.school_form_1.village_panchayat_id); 
            this.Selected_ward_Option(this.school_form_1.district_id); 
            this.Selected_parli_Option(this.school_form_1.district_id); 
            this.Selected_assembly_Option(this.school_form_1.assembly_id);
            // this.form.controls['urbanrural'].setValue(this.school_form_1.urbanrural);
            var res = this.school_form_1.address.split(",");
            this.form.controls['addressline_1'].setValue(res[0]);
            this.form.controls['addressline_2'].setValue(res[1]);
          }
       
        else if (this.activeIndex == 1){ 
          this.school_form_2 = res.screen_2.detailsland[0];
      console.log(res,"get res 2");
          this.form.patchValue(this.school_form_2);
          if(res.screen_2.classroomlevel_entry.length>0){ 
            this.numOfRooms = res.screen_2.classroomlevel_entry;
            const validuptoFormArray = this.form.controls.inspection as FormArray;
                  while (validuptoFormArray.length !== 0) {
                    validuptoFormArray.removeAt(0)
                  }
                  if(this.numOfRooms) {
                    debugger;
                    for (let i = 0; i < this.numOfRooms.length; i++) {
                      validuptoFormArray.push(this.fb.group({
                          classroomlevel_entry_inx_id: new FormControl(this.numOfRooms[i].classroomlevel_entry_inx_id, null),
                          school_type: new FormControl(this.numOfRooms[i].school_type, Validators.required),
                          num_rooms: new FormControl(this.numOfRooms[i].num_rooms, Validators.required)
                      }))
                    }
                 }
          }
          if(res.screen_2.library_entry.length>0){ 
            this.numOfBooks = res.screen_2.library_entry;
            const validuptoFormArray = this.form.controls.inspections as FormArray;
                 while (validuptoFormArray.length !== 0) {
                   validuptoFormArray.removeAt(0)
                  }
                  if(this.numOfBooks) {
                    debugger;
                    for (let i = 0; i < this.numOfBooks.length; i++) {
                      validuptoFormArray.push(this.fb.group({
                        library_entry_inx_id: new FormControl(this.numOfBooks[i].library_entry_inx_id, null),
                        library_type: new FormControl(this.numOfBooks[i].library_type, Validators.required),
                        num_books: new FormControl(this.numOfBooks[i].num_books, Validators.required)
                      }))
                   }
                 }
          }
        }
      
        else if (res.screen_3.length>0){ 
          if(this.activeIndex == 2){ 
            console.log(res.screen_3[0],"get res [3]");
            this.school_form_3 = res.screen_3[0];
            this.form.patchValue(this.school_form_3);
            this.ifsc_cde(this.school_form_3.endowment_ifsc); 
            this.ifsc_cde(this.school_form_3.corpus_ifsc);
            this.ifsc_cde(this.school_form_3.challan_ifsc);
         }
       }
      }
    })
    if (this.activeIndex == 2){ 
    this.registrationservice.get_saved_doc_details(this.user_name).subscribe((res) => {
      
      // if(this.upload_challn_array[0].doc_name !="") {
      //   this.form.controls['challlen_upload'].setValue(this.upload_challn_array[0].doc_name);
      // }
    
      debugger;
      
      if(res.docs.building_doc.length>0){ 
         this.buildingDocumentList = res.docs.building_doc;
         const validuptoFormArray = this.form.controls.building_document as FormArray;
              while (validuptoFormArray.length !== 0) {
                validuptoFormArray.removeAt(0)
              }
              if(this.buildingDocumentList) {
                debugger;
                for (let i = 0; i < this.buildingDocumentList.length; i++) {
                  validuptoFormArray.push(this.fb.group({
                    doc_type: new FormControl(this.buildingDocumentList[i].doc_type, null),
                    // doc_inx_id: new FormControl(this.buildingDocumentList[i].doc_inx_id, null),
                    doc_id: new FormControl(this.buildingDocumentList[i].doc_id, Validators.required),
                    doc_details: new FormControl(this.buildingDocumentList[i].doc_details, Validators.required),
                    doc_valid_upto_date: new FormControl(this.buildingDocumentList[i].doc_valid_upto_date,Validators.required),
                    doc_name: new FormControl(this.buildingDocumentList[i].doc_name, Validators.required),  
                  }))
                }
              }
        }
      if(res.docs.building_stab_certi.length>0){ 
        this.stablitycertificate = res.docs.building_stab_certi;
          const buildingFormArray = this.form.controls.building_stability as FormArray;
              while (buildingFormArray.length !== 0) {
                buildingFormArray.removeAt(0)
             }
          if(this.stablitycertificate) {
            debugger;
            for (let i = 0; i < this.stablitycertificate.length; i++) {
              buildingFormArray.push(this.fb.group({
                doc_type: new FormControl(this.stablitycertificate[i].doc_type, null),
                // doc_inx_id: new FormControl(this.stablitycertificate[i].doc_inx_id, null),
                doc_id: new FormControl(this.stablitycertificate[i].doc_id, Validators.required),
                doc_survey_no: new FormControl(this.stablitycertificate[i].doc_survey_no, Validators.required),
                doc_valid_upto_date: new FormControl(this.stablitycertificate[i].doc_valid_upto_date,Validators.required),
                doc_name: new FormControl(this.stablitycertificate[i].doc_name, Validators.required),  
              }))
            }
          }
        }
      if(res.docs.building_license.length>0){ 
        this.building_licence = res.docs.building_license;
        const buildingFormArray = this.form.controls.building_licence_array as FormArray;
          while (buildingFormArray.length !== 0) {
            buildingFormArray.removeAt(0)
          }
          if(this.building_licence) {
            debugger;
            for (let i = 0; i < this.building_licence.length; i++) {
              buildingFormArray.push(this.fb.group({
                doc_type: new FormControl(this.building_licence[i].doc_type, null),
                // doc_inx_id: new FormControl(this.building_licence[i].doc_inx_id, null),
                doc_id: new FormControl(this.building_licence[i].doc_id, Validators.required),
                doc_survey_no: new FormControl(this.building_licence[i].doc_survey_no, Validators.required),
                doc_inspect_issue_authority: new FormControl(this.building_licence[i].doc_survey_no, Validators.required),
                doc_valid_upto_date: new FormControl(this.building_licence[i].doc_valid_upto_date,Validators.required),
                doc_name: new FormControl(this.building_licence[i].doc_name, Validators.required),  
              }))
            }
          }
        }
      if(res.docs.schl_certifi_detls.length>0){ 
        this.schl_certifi = res.docs.schl_certifi_detls;
        const schl_certifi_FormArray = this.form.controls.document3 as FormArray;
          while (schl_certifi_FormArray.length !== 0) {
            schl_certifi_FormArray.removeAt(0)
          }
          if(this.schl_certifi) {
            debugger;
            for (let i = 0; i < this.schl_certifi.length; i++) {
              schl_certifi_FormArray.push(this.fb.group({
                doc_type: new FormControl(this.schl_certifi[i].doc_type, null),
                // doc_inx_id: new FormControl(this.schl_certifi[i].doc_inx_id, null),
                doc_id: new FormControl(this.schl_certifi[i].doc_id, Validators.required),
                doc_file_num: new FormControl(this.schl_certifi[i].doc_file_num, Validators.required),
                doc_file_date: new FormControl(this.schl_certifi[i].doc_file_date, Validators.required),
                doc_issue_place: new FormControl(this.schl_certifi[i].doc_issue_place,Validators.required),
                doc_survey_no: new FormControl(this.schl_certifi[i].doc_survey_no, Validators.required),  
                doc_name: new FormControl(this.schl_certifi[i].doc_name, Validators.required),  
              }))
            }
          }
        }
      if(res.docs.fire_safety.length>0){ 
          this.get_fire_saft = res.docs.fire_safety ;
          console.log(this.get_fire_saft,"get_fire_saft");
          const fire_safety_FormArray = this.form.controls.fire_safety as FormArray;
            while (fire_safety_FormArray.length !== 0) {
              fire_safety_FormArray.removeAt(0)
            }
            if(this.get_fire_saft) {
              debugger;
              for (let i = 0; i < this.get_fire_saft.length; i++) {
                fire_safety_FormArray.push(this.fb.group({
                  doc_id: new FormControl(this.get_fire_saft[i].doc_id,null),
                  // doc_inx_id: new FormControl(this.get_fire_saft[i].doc_inx_id, null),
                  doc_name: new FormControl(this.get_fire_saft[i].doc_name,null),
                  doc_inspect_issue_authority: new FormControl(this.get_fire_saft[i].doc_inspect_issue_authority,Validators.required),
                  doc_inspect_date:new FormControl(this.get_fire_saft[i].doc_inspect_date,Validators.required),
                  doc_file_num: new FormControl(this.get_fire_saft[i].doc_file_num,Validators.required),
                  doc_file_date: new FormControl(this.get_fire_saft[i].doc_file_date,Validators.required),
                  doc_valid_upto_date: new FormControl(this.get_fire_saft[i].doc_valid_upto_date,Validators.required),
                  doc_type:new FormControl(this.get_fire_saft[i].doc_type, Validators.required),
                }))
              }
            }
          }
        if(res.docs.sanitary_certi.length>0){ 
          this.get_sant_saft = res.docs.sanitary_certi ;
          console.log(this.get_sant_saft,"get_sant_saft");
          const san_certi_FormArray = this.form.controls.sanitary_certificate as FormArray;
            while (san_certi_FormArray.length !== 0) {
              san_certi_FormArray.removeAt(0)
            }
            if(this.get_sant_saft) {
              debugger;
              for (let i = 0; i < this.get_sant_saft.length; i++) {
                san_certi_FormArray.push(this.fb.group({
                  doc_id: new FormControl(this.get_sant_saft[i].doc_id,null),
                  // doc_inx_id: new FormControl(this.get_sant_saft[i].doc_inx_id, null),
                  doc_name: new FormControl(this.get_sant_saft[i].doc_name,null),
                  doc_inspect_issue_authority: new FormControl(this.get_sant_saft[i].doc_inspect_issue_authority,Validators.required),
                  doc_inspect_date: new FormControl(this.get_sant_saft[i].doc_inspect_date,Validators.required),
                  doc_file_num: new FormControl(this.get_sant_saft[i].doc_file_num,Validators.required),
                  doc_file_date: new FormControl(this.get_sant_saft[i].doc_file_date,Validators.required),
                  doc_valid_upto_date: new FormControl(this.get_sant_saft[i].doc_valid_upto_date,Validators.required),
                  doc_type:new FormControl(this.get_sant_saft[i].doc_type, Validators.required), 
                }))
              }
            }
        }
    })
    }
  }

    public changePage(index: number): void {
       this.activeIndex += index;
       this.initialValidator();
       this.Patch_data();
       debugger;
    }
  initialValidator() {
    if (this.activeIndex == 0){ 
      console.log(this.activeIndex,"tab");
      this.submitted = false;
      this.form = this.fb.group({
  // form 1 start
        'school_name': new FormControl('',Validators.required),
        'district_id':  new FormControl('',Validators.required),
        'block_id': new FormControl('',Validators.required),
        'urbanrural': new FormControl('',Validators.required),
        'local_body_type_id': new FormControl('',Validators.required),
        'village_panchayat_id':  new FormControl('',Validators.required),
        'vill_habitation_id':  new FormControl('',Validators.required),
        'assembly_id': new FormControl('',Validators.required),
        'parliament_id':  new FormControl('',Validators.required),
        'edu_dist_id': new FormControl('',Validators.required),
        'addressline_1':  new FormControl('',Validators.required),
        'addressline_2': new FormControl('',Validators.required),
        'pincode': new FormControl('',[Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]),
        'school_stdcode':  new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
        'school_landline': new FormControl('',[Validators.required, Validators.pattern("^[1-9][0-9]*$")]),
        'corr_hm_stdcode':  new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
        'corr_hm_landline':  new FormControl('',[Validators.required, Validators.pattern("^[1-9][0-9]*$")]),
        'mobile': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
        'corr_hm_mobile':  new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]), 
        'email': new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")]),
        'website':  new FormControl('',Validators.required),
        'schoolcat': new FormControl('',Validators.required),
        'low_class': new FormControl('',Validators.required),
        'high_class':  new FormControl('',Validators.required),
        'schooltype': new FormControl('',Validators.required),
        // 'details_inx_id': new FormControl('',null)
  // form 1 end
        // 'docno': new FormControl('',Validators.required),
        // 'surveyno': new FormControl('',Validators.required),
        // 'place_reg': new FormControl('',Validators.required),
        // 'date_reg': new FormControl('',Validators.required),
      });
    }

    if (this.activeIndex == 1){
      this.submitted = false;
      console.log(this.activeIndex,"tab");
      this.form = this.fb.group({
      'inspection': new FormArray([this.createItem()]),
      'inspections': new FormArray([this.createItems()]),
      'totland_sq': new FormControl('',null),
      'totland_acre': new FormControl('',[Validators.required, Validators.pattern("^\\d+(\\.\\d+)*$")]),
      // 'schoolfaci': new FormControl('',Validators.required),
      'schoolfaci': new FormControl('',null),
      'playgroundfacil': new FormControl('',null),
      'playground_sq': new FormControl('',null),
      'playground_acre': new FormControl('',[Validators.required, Validators.pattern("^\\d+(\\.\\d+)*$")]),
      'landowner': new FormControl('',null),
      'wall_type': new FormControl('',null),
      'peri_bound': new FormControl('',[Validators.required, Validators.pattern("^\\d+(\\.\\d+)*$")]),
      'land_bound': new FormControl('',[Validators.required, Validators.pattern("^\\d+(\\.\\d+)*$")]),
      'total_block': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'class_und_con': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'desk': new FormControl('',null),
      'ramp': new FormControl('',null),
      'quater_room': new FormControl('',null),
      'gent_toil_staff': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'ladie_toil_staff': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'gent_uri_staff': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'ladie_uri_staff': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'tot_inuse_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'tot_notuse_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'reason_notuse_boys': new FormControl('',null),
      // 'tot_inuse_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'tot_inuse_girls': new FormControl('',null),
      'tot_notuse_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'reason_notuse_girls': new FormControl('',null),
      'cswn_inuse_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'cswn_notuse_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'cwsn_reasonnotuse_boys': new FormControl('',null),
      'cwsn_inuse_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'cwsn_notuse_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'cwsn_reasonnotuse_girls': new FormControl('',null),
      'urinals_inuse_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'urinals_notuse_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'urinal_reasonnotuse_boys': new FormControl('',null),
      'urinals_inuse_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'urinals_notuse_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'urinal_reasonnotuse_girls': new FormControl('',null),
      'toi_flush_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'toi_flush_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'urinal_faci_boys': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'urinal_faci_girls': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'sanitory': new FormControl('',null),
      'additional_toilet': new FormControl('',null),
      'incen': new FormControl('',null),
      'tot_tap_avail': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'tot_tap_func': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),

      'detailsland_inx_id': new FormControl('',null),
      'schooltank': new FormControl('',null),
      'waterpurifier': new FormControl('',null),
      'rainwater': new FormControl('',null),
      'drinkingwater': new FormControl('',null),
      'school_type': new FormControl('',null),
      'num_rooms': new FormControl('',null),
      // 'num_rooms': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      'library_type': new FormControl('',null),
      'num_books': new FormControl('',null),
    });
  }

    if (this.activeIndex == 2){
      console.log(this.activeIndex,"tab");
    this.submitted = false;
    this.form = this.fb.group({
    // form 3 start 
      'building_licence_array': new FormArray([this.createItemstudents(1)]),
      // 'trust_institution': new FormArray([this.createItemstust()]),
      'building_stability': new FormArray([this.createItembuilding(1)]),
      // 'building_licence': new FormControl('',Validators.required),
      'building_document': new FormArray([this.create_building_doc(1)]),
      'document3': new FormArray([this.createitem_doc(1)]),
      'fire_safety': new FormArray([this.createitem_fire(1)]),
      'sanitary_certificate': new FormArray([this.createitem_sanitry(1)]),
      'same_campus_yn': new FormControl('',Validators.required),
      'doc_file_num': new FormControl('',null),
      // 'trustentry_inx_id': new FormControl('',null),
      'doc_survey_no': new FormControl('',null),
      'doc_issue_place': new FormControl('',null),
      'doc_file_date': new FormControl('',null),     
      'challlen_upload': new FormControl('',null),
      'trustname': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      'trustplace': new FormControl('',Validators.required),
      'pincode': new FormControl('',[Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]),
      'trust_register_yn': new FormControl('',Validators.required),
      'challan_ifsc': new FormControl('',[Validators.required, Validators.pattern("^[A-Za-z]{4}0[A-Z0-9]{6}$")]),
      'challan_amount': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      'challan_number': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      'challan_date': new FormControl('',Validators.required),
      'endowment_ifsc': new FormControl('',[Validators.required, Validators.pattern("^[A-Za-z]{4}0[A-Z0-9]{6}$")]),
      'endowment_certi': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      'endowment_dep_date': new FormControl('',Validators.required),
      'endowment_mature_date': new FormControl('',Validators.required),
      'endowment_amount': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      'corpus_ifsc': new FormControl('',[Validators.required, Validators.pattern("^[A-Za-z]{4}0[A-Z0-9]{6}$")]),
      'corpus_amount': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      'corpus_date': new FormControl('',Validators.required),
      'corpus_account': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      // 'sanitary_doc_inspect_issue_authority': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      // 'sanitary_doc_inspect_date': new FormControl('', Validators.required),
      // 'sanitary_doc_file_num': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      // 'sanitary_doc_file_date': new FormControl('', Validators.required),
      // 'sanitary_doc_valid_upto_date': new FormControl('', Validators.required),
      'doc_inspect_issue_authority': new FormControl('', null),
      'doc_inspect_date': new FormControl('', null),
      // 'fire_doc_inspect_issue_authority': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      // 'fire_doc_inspect_date': new FormControl('', Validators.required),
      // 'fire_doc_file_num': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      // 'fire_doc_file_date': new FormControl('', Validators.required),
      // 'fire_doc_valid_upto_date': new FormControl('', Validators.required),
      'doc_details': new FormControl('', null),
      'doc_name': new FormControl('', null),
      'doc_valid_upto_date': new FormControl('', null),
      // 'lic_doc_survey_no': new FormControl('',null),
      // 'lic_doc_valid_upto_date': new FormControl('', null),
      // 'lic_doc_inspect_issue_authority': new FormControl('', null),
      // 'stab_doc_survey_no': new FormControl('', null),
      // 'stab_doc_valid_upto_date': new FormControl('',null),
      'student_strength1': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      'student_strength2': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      'bldg_value1': new FormControl('',[Validators.required, Validators.pattern("^[0-9]+")]),
      'endowment_bank_name': new FormControl('',null),
      'endowment_bank_branch': new FormControl('',null),
      'corpus_bank_name': new FormControl('',null),
      'corpus_bank_branch': new FormControl('',null),
      'sch_app_fee_bank_bank': new FormControl('',null),
      'sch_app_fee_bank_branch': new FormControl('',null),
  // form 3 end
     });
    }
    if (this.activeIndex == 3){
    this.submitted = false;
    this.form = this.fb.group({
      'final_flag': new FormControl('',Validators.required),
     });
    }
  }

  ifsc_cde(ifscc){
    this.ifscc_code=ifscc;
    this.registrationservice.get_ifsc_data(this.ifscc_code).subscribe((res) => {
      if(res.data.length>0){ 
        this.bank_detail = res.data[0];
         if(this.form.value.endowment_ifsc == this.ifscc_code)
         {
          this.form.controls['endowment_bank_name'].setValue(this.bank_detail.bank_name);
          this.form.controls['endowment_bank_branch'].setValue(this.bank_detail.branch);
         }
         if(this.form.value.corpus_ifsc == this.ifscc_code)
         {
          this.form.controls['corpus_bank_name'].setValue(this.bank_detail.bank_name);
          this.form.controls['corpus_bank_branch'].setValue(this.bank_detail.branch);
         }
         if(this.form.value.challan_ifsc == this.ifscc_code)
         {
          this.form.controls['sch_app_fee_bank_bank'].setValue(this.bank_detail.bank_name);
          this.form.controls['sch_app_fee_bank_branch'].setValue(this.bank_detail.branch);
         }
      }
    })
  }

  createitem_doc(docId){
    return this.fb.group({
          doc_type: new FormControl('4', Validators.required),
          doc_id: new FormControl(docId, Validators.required),
          // doc_inx_id: new FormControl('', null),
          doc_file_num: new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
          doc_survey_no: new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
          doc_issue_place: new FormControl('', Validators.required),
          doc_file_date: new FormControl('', Validators.required),
          doc_name: new FormControl('', Validators.required),
        });
  }
  add_docs_3() {
    this.document3 = this.form.get('document3') as FormArray;
    if (this.document3.length < 5) {
      if (this.form.controls.document3.valid) {
        this.document3.push(this.createitem_doc(this.document3.length+1));
      }
      else {
        this.invalid_doc_3 = true;
      }
    }
  }
  remove_docs_3() {
    console.log(this.document3.length,"dinaso");
    if (this.document3.length > 1) {
      this.invalid_doc_3 = false;
      const control = <FormArray>this.form.controls['document3'];
      control.removeAt(control.length - 1);
    }
  }

  createitem_fire(docId) { 
    return this.fb.group({
      doc_type: new FormControl('9', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      // doc_inx_id: new FormControl('', null),
      doc_inspect_issue_authority: new FormControl('', Validators.required),
      doc_inspect_date: new FormControl('', Validators.required),
      doc_file_date: new FormControl('', Validators.required),
      doc_file_num: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),
    });
  }

  createitem_sanitry(docId) { 
    return this.fb.group({
      doc_type: new FormControl('8', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      // doc_inx_id: new FormControl('', null),
      doc_inspect_issue_authority: new FormControl('', Validators.required),
      doc_inspect_date: new FormControl('', Validators.required),
      doc_file_date: new FormControl('', Validators.required),
      doc_file_num: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),
    });
  }

  onSelectFile(event,type,index) {
    debugger;
    var docId = index;
   if (event.target.files && event.target.files[0]) {
     var fileName = event.target.files[0].name;
     var splittedName = fileName.split(".");
     if(splittedName[splittedName.length-1] == 'pdf')
     {
       
     if (event.target.files[0].size <= 2000000) {
       switch(type){

          case 'schoolCertificate':
           this.schoolCertificate.push({
             "filename" :splittedName[0],
             "ext" : splittedName[splittedName.length-1],
             "file":event.target.files[0],
             "docId":docId+1
           });
           (<FormArray>this.form.controls['document3']).at(index).patchValue({doc_name: splittedName[0]});
           console.log(this.form.value.document3,"this.form.controls['document3'])");
          break;

          case 'Challlen_File':
          debugger;
          this.supportDoc.push({
            "filename" : splittedName[0],
            "ext":splittedName[splittedName.length-1],
            "file":event.target.files[0],
            "docId":docId+1
          });
          this.form.controls['challlen_upload'].setValue(splittedName[0]);
            console.log(this.form.value.challlen_upload,"this.form.controls['challlen_upload'])");
          break;

         case 'buildingPlan':
           this.buildingPlan.push({
             "filename" :splittedName[0],
             "ext" : splittedName[splittedName.length-1],
             "file":event.target.files[0],
             "docId":docId+1
           });
           (<FormArray>this.form.controls['building_document']).at(index).patchValue({doc_name: splittedName[0]});
           console.log(this.form.value.building_document,"this.form.controls['building_document'])");
           
           break;
         case 'buildingStability':
              this.buildingStability.push({
              "filename":splittedName[0],
              "ext":splittedName[splittedName.length-1],
              "file":event.target.files[0],
              "docId":docId+1
              });
          (<FormArray>this.form.controls['building_stability']).at(index).patchValue({doc_name: splittedName[0]});
          console.log(this.form.value.building_stability,"this.form.controls['building_stability'])");

           break;
           case 'buildingLicense':
             this.buildingLicense.push({
               "filename" : splittedName[0],
               "ext":splittedName[splittedName.length-1],
               "file":event.target.files[0],
               "docId":docId+1
             });
             (<FormArray>this.form.controls['building_licence_array']).at(index).patchValue({doc_name: splittedName[0]});
             console.log(this.form.value.building_licence_array,"this.form.controls['building_licence_array'])");
             break;
             case 'sanitaryCertificate':
               this.sanitaryCertificate.push({
                 "filename" : splittedName[0],
                 "ext":splittedName[splittedName.length-1],
                 "file":event.target.files[0],
                 "docId":1
                });
               (<FormArray>this.form.controls['sanitary_certificate']).at(index).patchValue({doc_name: splittedName[0]});
               console.log(this.form.value.sanitary_certificate,"this.form.controls['sanitary_certificate'])");
               break;
               case 'fireSafety':
                 this.fireSafety.push({
                   "filename" : splittedName[0],
                   "ext":splittedName[splittedName.length-1],
                   "file":event.target.files[0],
                   "docId":1
                 });
                 (<FormArray>this.form.controls['fire_safety']).at(index).patchValue({doc_name: splittedName[0]});
             console.log(this.form.value.fire_safety,"this.form.controls['fire_safety'])");

                 break;
             default:
           break;
       }
       const fileReader: FileReader = new FileReader();
       fileReader.readAsDataURL(event.target.files[0]);
       fileReader.onload = (event: Event) => {

       };
     } else {
       this.alertService.error("File Can`t uploaded because Image size should not exceed 2MB");
     }
   }
     else {
       this.alertService.error("Only Pdf files are allowed to Upload");
     }
   }
 }

 uploadFiles(files,docType) {
  debugger;
  var bucketName= "renewalapplicationemis";
  let expiry:number = 300;
  var docId = 1;
  for (let i = 0; i < files.length; i++) {
    this.dashboardService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
      if (result) {
        let file : File = files[i].file;
        this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
          this.uploadedFiles.push({
            "doc_id":files[i].docId,
            "doc_name" : files[i].filename,
            "doc_name_coded":result.key,
            "doc_type":docType
          })
          docId++;
        });
        console.log("this.uploadedFiles",this.uploadedFiles);
        this.alertService.success("File Uploaded Successfully");
      }
      else {
        this.alertService.success("Error in Uploading File please try again");
      }
    });
 
  }
 
}

  create_building_doc(docId) {
    return this.fb.group({
      doc_type: new FormControl('5', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      // doc_inx_id: new FormControl('', null),
      doc_details: new FormControl('', [Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),
    });
  }

  add_building_doc() {
    this.building_document = this.form.get('building_document') as FormArray;
    if (this.building_document.length < 5) {
      if (this.form.controls.building_document.valid) {
        this.building_document.push(this.create_building_doc(this.building_document.length+1));
      }
      else {
        this.invalidValidUpto = true;
      }
    }
  }

  remove_building_doc() {
    if (this.building_document.length > 1) {
      this.invalidValidUpto = false;
      const control = <FormArray>this.form.controls['building_document'];
      control.removeAt(control.length - 1);
    }
  }
  
  add_building_stability(): void {
    this.building_stability = this.form.get('building_stability') as FormArray;
    if (this.building_stability.length < 5) {
      if (this.form.controls.building_stability.valid) {
        this.building_stability.push(this.createItembuilding(this.building_stability.length+1));
      }
      else {
        this.invalidAddbuilding = true;
      }
    } 
  }

  createItembuilding(docId) {
    return this.fb.group({
      doc_type: new FormControl('6', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      // doc_inx_id: new FormControl('', null),
      doc_survey_no: new FormControl('', [Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),
    });
  }

  remove_building_stability() {
    if (this.building_stability.length > 1) {
      this.invalidAddbuilding = false;
      const control = <FormArray>this.form.controls['building_stability'];
      control.removeAt(control.length - 1);
    }
  }
 
  add_institution_trust(): void {
    this.trust_institute_Invalid = false;
    this.trust_institution = this.form.get('trust_institution') as FormArray;
    if (this.trust_institution.length < 5) {
      if (this.form.controls.trust_institution.valid) {
        this.trust_institution.push(this.createItemstust());
      }
      else {
        this.trust_institute_Invalid = true;
      }
    }
  }

  createItemstust() {
    return this.fb.group({
      samp_plan: new FormControl('', Validators.required),
      // doc_valid_upto_date: new FormControl('', Validators.required),
    });
  }

  remove_institution_trust() {
    if (this.trust_institution.length > 1) {
      this.schoollandinvalid = false;
      const control = <FormArray>this.form.controls['trust_institution'];
      control.removeAt(control.length - 1);
    }
  }
  add_building_licence(): void {
    this.building_licence_array = this.form.get('building_licence_array') as FormArray;
    if (this.building_licence_array.length < 5) {
      if (this.form.controls.building_licence_array.valid) {
        this.building_licence_array.push(this.createItemstudents(this.building_licence_array.length+1));
      }
      else {
        this.building_licnce_Invalid = true;
      }
    }
  }

  createItemstudents(docId) {
    return this.fb.group({
      doc_type: new FormControl('7', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      // doc_inx_id: new FormControl('', null),
      doc_survey_no: new FormControl('', [Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),
      doc_inspect_issue_authority: new FormControl('', [Validators.required, Validators.pattern("^[a-z A-Z 0-9]+")]),
    });
  }

  remove_building_licence() {
    if (this.building_licence_array.length > 1) {
      this.building_licnce_Invalid = false;
      const control = <FormArray>this.form.controls['building_licence_array'];
      control.removeAt(control.length - 1);
    }
  }
  getData() {
    this.urban_rural = [
      {label: 'Urban', value: '1'},
      {label: 'Rural', value: '2'},
    ];
    this.sch_cat= [
      {label: 'Primary Only (I-V)', value: '1'},
      {label: 'Middle School (I-VIII)', value: '2'},
      {label: 'Nursery & Primary (Pre-KG -V)', value: '11'},
      {label: 'Nursery Only (Pre-KG -UKG)', value: '12'},
    ];
    this.class_from_to_dropvalue=[
      {label:'PRE-KG', value:"15"},
      {label:'LKG', value:"13"},
      {label:'UKG', value:"14"},
      {label:'1', value:"1"},
      {label:'2', value:"2"},
      {label:'3', value:"3"},
      {label:'4', value:"4"},
      {label:'5', value:"5"},
      {label:'6', value:"6"},
      {label:'7', value:"7"},
      {label:'8', value:"8"},
      {label:'9', value:"9"},
      {label:'10', value:"10"},
      {label:'11', value:"11"},
      {label:'12', value:"12"},
    ]
    
    this.school_type = [
      {label: 'Boys', value: '1'},
      {label: 'Girls', value: '2'},
      {label: 'Co-Ed', value: '3'},
    ];
    
    this.sample = [
      {label: 'sampl1', value: '1'},
      {label: 'sampl2', value: '2'},
      {label: 'Others', value: '3'},
    ];
    this.reasons = [
      { value: "1", label: "Water Supply" },
      { value: "2", label: "Drainage Problem" },
      { value: "3", label: "Toilet Damaged" },
      { value: "4", label: "Not Applicable" }
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
    this.boundarywall = [
      { "value": "1", "label": "Pucca" },
      { "value": "2", "label": "Pucca but broken" },
      { "value": "3", "label": "Barbed wire fencing" },
      { "value": "4", "label": "Hedges" },
      { "value": "5", "label": "No boundry wall" },
      { "value": "6", "label": "Others" },
      { "value": "7", "label": "Partial" },
    ];
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
  }

  all_district_dropdown()  {
    this.registrationservice.all_district_API_1().subscribe((data) => {
      let dropDownList = data.result.schooldist;
      // console.log(data,"block");
      // Dropdown Values
     
      debugger;
      if(dropDownList.length>0){
        this.allDistrictropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.allDistrictropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].district_name })
        }
      }
      else
      {
        this.allDistrictropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }

  Selected_dist_Option(district_id)
  {
   let  id="2";
   this.selt_dist_id=district_id.value;

   this.villageTownMunicipality=[];
   this.VillageWard=[];
   this.localbody_dropvalueoptions=[];
   this.assembly_namedropvalueoptions=[];
   this.parlimentropvalueoptions=[];
  //  this.urban_rural=[];
   this.edu_distropvalueoptions=[];
   if(!this.selt_dist_id){
    let datas = {"id" : id, "district_id" : district_id }
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
    let dropDownList = data.result;
    this.allblockdropvalueoptions=[];
    if(dropDownList.length>0){
      for(let i=0; i<dropDownList.length;i++){
        this.allblockdropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].block_name })
      }}
    else
    {
      this.allblockdropvalueoptions.push({ value: "", label: "No Data" })
    } 
    });console.log(!this.selt_dist_id,"selt_dist_id");
  }
  else {
    debugger
      let datas = {"id" : id, "district_id" : this.selt_dist_id }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
      let dropDownList = data.result;
      this.allblockdropvalueoptions=[];
      if(dropDownList.length>0){
        for(let i=0; i<dropDownList.length;i++){
          this.allblockdropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].block_name })
        }
      }
      else
      {
        this.allblockdropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
    }
  }

  Selected_block_Option(block_id)
  {
   this.selt_block_id=block_id.value;
  }

  Selected_ward_Option(district_id)
  {
    let  id="6";
  if(!this.selt_dist_id)
  {
    let datas = {"id" : id, "district_id" : this.get_dist_id  }
    debugger;
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
      let dropDownList = data.result;
      this.assembly_namedropvalueoptions=[];
      if(dropDownList.length>0){
        for(let i=0; i<dropDownList.length;i++){
          this.assembly_namedropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].assembly_name })
        }
      }
      else
      {
        this.assembly_namedropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }
  else{
    let datas = {"id" : id, "district_id" : this.selt_dist_id }
    debugger;
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
      let dropDownList = data.result;
      this.assembly_namedropvalueoptions=[];
      if(dropDownList.length>0){
        for(let i=0; i<dropDownList.length;i++){
          this.assembly_namedropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].assembly_name })
        }
      }
      else
      {
        this.assembly_namedropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
}
   
  }
  Selected_assembly_Option(assembly_id){
    this.assembly_id=assembly_id.value;
    let  id="7";
    if(!this.assembly_id)
    {
      let datas = {"id" : id, "assembly_id" : assembly_id }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
        let dropDownList = data.result;
        this.parlimentropvalueoptions=[];
        if(dropDownList.length>0){
          for(let i=0; i<dropDownList.length;i++){
            this.parlimentropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].parli_name })
          }
        }
        else
        {
          this.parlimentropvalueoptions.push({ value: "", label: "No Data" })
        } 
       });
    }
    else
    {
      let datas = {"id" : id, "assembly_id" : this.assembly_id }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
        let dropDownList = data.result;
        this.parlimentropvalueoptions=[];
        if(dropDownList.length>0){
          for(let i=0; i<dropDownList.length;i++){
            this.parlimentropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].parli_name })
          }
        }
        else
        {
          this.parlimentropvalueoptions.push({ value: "", label: "No Data" })
        } 
       });
    }
  }
  Selected_parli_Option(district_id){
    let  id="8";
    this.selt_dist_id=district_id.value;
    if(!this.selt_dist_id)    {
      let datas = {"id" : id, "district_id" : district_id }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
        let dropDownList = data.result;
        this.edu_distropvalueoptions=[];
        if(dropDownList.length>0){
          for(let i=0; i<dropDownList.length;i++){
            this.edu_distropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].edn_dist_name })
          }
        }
        else
        {
          this.edu_distropvalueoptions.push({ value: "", label: "No Data" })
        } 
       });
    }
    else {
      let datas = {"id" : id, "district_id" : this.selt_dist_id }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
        let dropDownList = data.result;
        this.edu_distropvalueoptions=[];
        if(dropDownList.length>0){
          for(let i=0; i<dropDownList.length;i++){
            this.edu_distropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].edn_dist_name })
          }
        }
        else
        {
          this.edu_distropvalueoptions.push({ value: "", label: "No Data" })
        } 
       });
    }
  }
  Selected_urb_Option(urb_id )
  {
    debugger
    let  id="3";
   this.selt_urb_rural_id=urb_id.value;
   if(!this.selt_urb_rural_id)
   {
    let datas = {"id" : id, "district_id" : this.get_dist_id,"urbanrural": urb_id }
    debugger;
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
     let dropDownList = data.result;
     this.localbody_dropvalueoptions=[];
     if(dropDownList.length>0){
       for(let i=0; i<dropDownList.length;i++){
         this.localbody_dropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].zone_type })
       }
     }
     else
     {
       this.localbody_dropvalueoptions.push({ value: "", label: "No Data" })
     } 
    });
   }
   else
   {
     debugger;
    let datas = {"id" : id, "district_id" : this.selt_dist_id ,"urbanrural": this.selt_urb_rural_id   }
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
    debugger;
     let dropDownList = data.result;
     this.localbody_dropvalueoptions=[];
     if(dropDownList.length>0){
       for(let i=0; i<dropDownList.length;i++){
         this.localbody_dropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].zone_type })
       }
     }
     else
     {
       this.localbody_dropvalueoptions.push({ value: "", label: "No Data" })
     } 
    });
   }
  }

  Selected_local_Option(local_id){
    let  id="4";
   this.selt_local_id=local_id.value;
   if (!this.selt_local_id) 
   {
    let datas = {"id" : id, "district_id" : this.get_dist_id ,"local_body_type_id": local_id   }
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
     let dropDownList = data.result;
     this.villageTownMunicipality=[];
     if(dropDownList.length>0){
       for(let i=0; i<dropDownList.length;i++){
         this.villageTownMunicipality.push({ value: dropDownList[i].id, label: dropDownList[i].name })
       }
     }
     else
     {
       this.villageTownMunicipality.push({ value: "", label: "No Data" })
     } 
    });
   }
   else 
   {
    let datas = {"id" : id, "district_id" : this.selt_dist_id ,"local_body_type_id": this.selt_local_id   }
    this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
     let dropDownList = data.result;
     this.villageTownMunicipality=[];
     if(dropDownList.length>0){
       for(let i=0; i<dropDownList.length;i++){
         this.villageTownMunicipality.push({ value: dropDownList[i].id, label: dropDownList[i].name })
       }
     }
     else
     {
       this.villageTownMunicipality.push({ value: "", label: "No Data" })
     } 
    });
   }
  }

  Selected_village_Option(village_id){
    this.selt_village_id_id=village_id.value;
     let  id="5";
     if (!this.selt_village_id_id){
      let datas = {"id" : id, "village_panchayat_id": village_id  }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
       let dropDownList = data.result;
       this.VillageWard=[];
       if(dropDownList.length>0){
         for(let i=0; i<dropDownList.length;i++){
           this.VillageWard.push({ value: dropDownList[i].id, label: dropDownList[i].name })
         }
       }
       else
       {
         this.VillageWard.push({ value: "", label: "No Data" })
       } 
      });
     }
     else{
      let datas = {"id" : id, "village_panchayat_id": this.selt_village_id_id   }
      this.registrationservice.all_block_API_1({"records":datas}, true).subscribe((data) => {
       let dropDownList = data.result;
       this.VillageWard=[];
       if(dropDownList.length>0){
         for(let i=0; i<dropDownList.length;i++){
           this.VillageWard.push({ value: dropDownList[i].id, label: dropDownList[i].name })
         }
       }
       else
       {
         this.VillageWard.push({ value: "", label: "No Data" })
       } 
      });
     }
  
   }

  steps(){
    this.items = [{
      label: 'step2',
      command: (event: any) => {
          this.activeIndex = 0;
          // this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
      },
      {
          label: '',
          command: (event: any) => {
              this.activeIndex = 1;
              // this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
          }
      },
      {
          label: '',
          command: (event: any) => {
              this.activeIndex = 2;
              // this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
          }
      },
      {
          label: '',
          command: (event: any) => {
              this.activeIndex = 3;
              // this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
          }
      }];
  }

  save_1(){
    this.submitted = true;
   
    if (this.form.valid) { 
    let  
    school_name = this.form.value.school_name,
    district_id = this.form.value.district_id,
    block_id = this.form.value.block_id,
    urbanrural = this.form.value.urbanrural,
    local_body_type_id = this.form.value.local_body_type_id,
    village_panchayat_id = this.form.value.village_panchayat_id,
    vill_habitation_id = this.form.value.vill_habitation_id,
    assembly_id = this.form.value.assembly_id,
    parliament_id = this.form.value.parliament_id,
    edu_dist_id = this.form.value.edu_dist_id,
    addressline_1 = this.form.value.addressline_1,
    addressline_2 = this.form.value.addressline_2,
    address_form_1=  this.form.value.addressline_1 + "," + this.form.value.addressline_2,
    pincode = this.form.value.pincode,
    school_stdcode = this.form.value.school_stdcode,
    school_landline = this.form.value.school_landline,
    corr_hm_stdcode = this.form.value.corr_hm_stdcode,
    corr_hm_landline = this.form.value.corr_hm_landline,
    mobile = this.form.value.mobile,
    corr_hm_mobile = this.form.value.corr_hm_mobile,
    email = this.form.value.email,
    website = this.form.value.website,
    schoolcat = this.form.value.schoolcat,
    low_class = this.form.value.low_class,
    high_class = this.form.value.high_class,
    schooltype = this.form.value.schooltype;
    // details_inx_id = this.form.value.details_inx_id;

    let datas = {"part":"1","temp_id":this.user_name,"school_name" : school_name, "district_id" : district_id, "address" : address_form_1, 
    "block_id" : block_id,"urbanrural" : urbanrural,"local_body_type_id" : local_body_type_id,"village_panchayat_id" : village_panchayat_id,
    "vill_habitation_id" : vill_habitation_id,"assembly_id" : assembly_id,
    "parliament_id" : parliament_id,"edu_dist_id" : edu_dist_id,"addressline_1" : addressline_1,"addressline_2" : addressline_2,
    "pincode" : pincode,"school_stdcode" : school_stdcode,
    "school_landline" : school_landline,"corr_hm_stdcode" : corr_hm_stdcode,"corr_hm_landline" : corr_hm_landline,"mobile" : mobile,
    "corr_hm_mobile" : corr_hm_mobile,"email" : email,"website" : website,"schoolcat" : schoolcat,
    "low_class" : low_class ,"high_class" : high_class,"schooltype" : schooltype };
    
    console.log(datas);
    
     this.registrationservice.school_details_save_API_1({"records":datas}, true).subscribe((res) => {
       if(res){
       this.alertService.success("Data Save Successfully");
      }
       else {
         this.alertService.error("Please Fill all the Required Fields"); 
       }
     })
  }
  else{
    for (const key of Object.keys(this.form.controls)) {
      if (this.form.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
  }
}


convertAcre(sqare_feet) {
  this.submitted = false;
 this.total_land_acre = (sqare_feet / 43560).toFixed(1);
  this.form.controls['totland_acre'].setValue(this.total_land_acre);
}

convertSqureFeet(acre) {
  this.submitted = false;
  this.total_land_sqarefeet = (acre * 43560);
  this.form.controls['totland_sq'].setValue(this.total_land_sqarefeet);
}

convertplayAcre(sqare_feet) {
  this.submitted = false;
 this.total_land_acre = (sqare_feet / 43560).toFixed(1);
  this.form.controls['playground_acre'].setValue(this.total_land_acre);
}

convertplaySqureFeet(acre) {
  this.submitted = false;
  this.total_land_sqarefeet = (acre * 43560);
  this.form.controls['playground_sq'].setValue(this.total_land_sqarefeet);
}

addMediumInstruction(): void {
  this.inspection = this.form.get('inspection') as FormArray;
  if (this.inspection.length < 999) {
    if (this.form.controls.inspection.valid) {
      this.inspection.push(this.createItem());
    }
  } else {
    this.schlCommiteInvalid = true;
  }
}

createItem() {
  return this.fb.group({
    classroomlevel_entry_inx_id: new FormControl('', null),
    school_type: new FormControl('', Validators.required),
    num_rooms: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });
}

removeMediumInstruction() {
  if (this.inspection.length > 0) {
    this.schlCommiteInvalid = false;
    const control = <FormArray>this.form.controls['inspection'];
    control.removeAt(control.length - 1);
  }
}

getMediumInstruction(item) {
  debugger;
  const inspectionentry = this.form.controls.inspection as FormArray;
  const mediumDataValues = item.inspection;
  if (mediumDataValues.length > 0) {
    const inspectionentry = this.form.controls.inspection as FormArray;
    while (inspectionentry.length !== 0) {
      inspectionentry.removeAt(0)
    }
  }
  for (let i = 0; i < mediumDataValues.length; i++) {
    inspectionentry.push(this.fb.group({
      school_type: mediumDataValues[i].school_type,
      num_rooms: mediumDataValues[i].num_rooms,
    })
    )
  }

  this.inspection = this.form.get('inspection') as FormArray;
  this.inspection.push(this.createItem());
  const control = <FormArray>this.form.controls['inspection'];
  control.removeAt(control.value.length - 1);
}

classroom_stage(event, index) {

  var classroomstage = event.value;
    (<FormArray>this.form.controls['inspection']).at(index).patchValue({ school_type: '' });
    debugger;
    const checkAvailable = this.form.value.inspection.find(x => x.school_type == classroomstage)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");
    }
    else {
      (<FormArray>this.form.controls['inspection']).at(index).patchValue({ school_type: classroomstage });
    }
}

howManyRooms(event, index) {
  var inspection = event.value;
  (<FormArray>this.form.controls['inspection']).at(index).patchValue({ num_rooms: '' });
  debugger;
  {
    (<FormArray>this.form.controls['inspection']).at(index).patchValue({ num_rooms: inspection });
  }

}

addMediumInstructions(): void {
  this.inspections = this.form.get('inspections') as FormArray;
  if (this.inspections.length < 999) {
    if (this.form.controls.inspections.valid) {
      this.inspections.push(this.createItems());
    }
  } else {
    this.schlCommiteInvalid = true;
  }
}

createItems() {
  return this.fb.group({
    library_entry_inx_id: new FormControl('', null),
    library_type: new FormControl('', Validators.required),
    num_books: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });
}

removeMediumInstructions() {
  if (this.inspections.length > 0) {
    this.schlCommiteInvalid = false;
    const control = <FormArray>this.form.controls['inspections'];
    control.removeAt(control.length - 1);
  }
}

getMediumInstructions(item) {
  debugger;
  const inspectionentry = this.form.controls.inspections as FormArray;
  const mediumDataValues = item.inspections;
  if (mediumDataValues.length > 0) {
    const inspectionentry = this.form.controls.inspections as FormArray;
    while (inspectionentry.length !== 0) {
      inspectionentry.removeAt(0)
    }
  }
  for (let i = 0; i < mediumDataValues.length; i++) {
    inspectionentry.push(this.fb.group({
      library_type: mediumDataValues[i].library_type,
      num_books: mediumDataValues[i].num_books,
    })
    )
  }

  this.inspections = this.form.get('inspections') as FormArray;
  this.inspections.push(this.createItems());
  const control = <FormArray>this.form.controls['inspections'];
  control.removeAt(control.value.length - 1);
}

schoolLibrary(event, index) {
  var classroomstage = event.value;
    (<FormArray>this.form.controls['inspections']).at(index).patchValue({ library_type: '' });
    debugger;
    const checkAvailable = this.form.value.inspections.find(x => x.library_type == classroomstage)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");
    }
    else {
      (<FormArray>this.form.controls['inspections']).at(index).patchValue({ library_type: classroomstage });
    }
}

totalBook(event, index) {
  var inspections = event.value;
  (<FormArray>this.form.controls['inspections']).at(index).patchValue({ num_books: '' });
  debugger;
  {
    (<FormArray>this.form.controls['inspections']).at(index).patchValue({ num_books: inspections });
  }

}

save_23() {
  debugger;
  this.submitted = true;
  debugger;
  if (this.form.valid) {
  debugger;

    var data = {
      "records": {
        "app_id": this.user_name,
        "part":"1",
        
        "totland_sq": this.form.value.totland_sq,
        "totland_acre": this.form.value.totland_acre,
        "schoolfaci": this.form.value.schoolfaci,
        "playgroundfacil": this.form.value.playgroundfacil,
        "playground_sq": this.form.value.playground_sq,
        "playground_acre": this.form.value.playground_acre,
        "landowner": this.form.value.landowner,
        "wall_type": this.form.value.wall_type,
        "peri_bound": this.form.value.peri_bound,
        "land_bound": this.form.value.land_bound,
        "total_block": this.form.value.total_block,
        "class_und_con": this.form.value.class_und_con,
        "desk": this.form.value.desk,
        "ramp": this.form.value.ramp,

        "quater_room": this.form.value.quater_room,
        "gent_toil_staff": this.form.value.gent_toil_staff,
        "ladie_toil_staff": this.form.value.ladie_toil_staff,
        "gent_uri_staff": this.form.value.gent_uri_staff,
        "ladie_uri_staff": this.form.value.ladie_uri_staff,
        "tot_inuse_boys": this.form.value.tot_inuse_boys,
        "tot_notuse_boys": this.form.value.tot_notuse_boys,
        "reason_notuse_boys": this.form.value.reason_notuse_boys,
        "tot_inuse_girls": this.form.value.tot_inuse_girls,
        "tot_notuse_girls": this.form.value.tot_notuse_girls,
        "reason_notuse_girls": this.form.value.reason_notuse_girls,
        "cswn_inuse_boys": this.form.value.cswn_inuse_boys,
        "cswn_notuse_boys": this.form.value.cswn_notuse_boys,
        "cwsn_reasonnotuse_boys": this.form.value.cwsn_reasonnotuse_boys,
        "cwsn_inuse_girls": this.form.value.cwsn_inuse_girls,
        "cwsn_notuse_girls": this.form.value.cwsn_notuse_girls,
        "cwsn_reasonnotuse_girls": this.form.value.cwsn_reasonnotuse_girls,
        "urinals_inuse_boys": this.form.value.urinals_inuse_boys,
        "urinals_notuse_boys": this.form.value.urinals_notuse_boys,
        "urinal_reasonnotuse_boys": this.form.value.urinal_reasonnotuse_boys,
        "urinals_inuse_girls": this.form.value.urinals_inuse_girls,
        "urinals_notuse_girls": this.form.value.urinals_notuse_girls,
        "urinal_reasonnotuse_girls": this.form.value.urinal_reasonnotuse_girls,
        "toi_flush_boys": this.form.value.toi_flush_boys,
        "toi_flush_girls": this.form.value.toi_flush_girls,
        "urinal_faci_boys": this.form.value.urinal_faci_boys,
        "urinal_faci_girls": this.form.value.urinal_faci_girls,
        "sanitory": this.form.value.sanitory,
        "additional_toilet": this.form.value.additional_toilet,
        "incen": this.form.value.incen,
        "tot_tap_avail": this.form.value.tot_tap_avail,
        "tot_tap_func": this.form.value.tot_tap_func,
        "schooltank": this.form.value.schooltank,
        "waterpurifier": this.form.value.waterpurifier,
        "rainwater": this.form.value.rainwater,
        "drinkingwater": this.form.value.drinkingwater,

        "newschool_classroomlevel_entry": this.form.value.inspection,
        "newschool_library_entry": this.form.value.inspections,

        "detailsland_inx_id": this.form.value.detailsland_inx_id,
      }
    };
    console.log(data, 'Form 2 data')
    if (this.form.valid) {
      this.registrationservice.saveSchoolDetailsTwo(data).subscribe(data => {
        if (data.dataStatus == true) {
          this.alertService.success("Data Save Successfully");
        }
        else {
          this.alertService.error(data.message);
        }

      });
    }
  }
    else{
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
           console.log('invalid keys', key);
           invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all Required Fields");
    }
}
save_3(){
  this.submitted = true;
    if (this.form.valid) { 
      this.display=true;
      this.upload_challn_array=[];
      if( this.form.value.challlen_upload) {
        this.upload_challn_array.push({
         "doc_type":"13",
         "doc_id":1,
        //  "doc_inx_id":'',
        })
      };

      // schoolCertificate 4
      // supportDoc 13
      // buildingPlan 5
      // buildingStability 6
      // buildingLicense 7
      // sanitaryCertificate 8
      // fireSafety 9

      if(this.schoolCertificate && this.schoolCertificate.length > 0) {
        this.uploadFiles(this.schoolCertificate, 4);
       }
       if(this.supportDoc && this.supportDoc.length > 0) {
        this.uploadFiles(this.supportDoc,13);
       }
       if(this.buildingPlan && this.buildingPlan.length > 0) {
        this.uploadFiles(this.buildingPlan,5);
       }
       if(this.buildingStability && this.buildingStability.length > 0) {
        this.uploadFiles(this.buildingStability,6);
       }
       if(this.buildingLicense && this.buildingLicense.length > 0) {
        this.uploadFiles(this.buildingLicense,7);
       }
       if(this.sanitaryCertificate && this.sanitaryCertificate.length > 0) {
        this.uploadFiles(this.sanitaryCertificate,8);
       }
       if(this.fireSafety && this.fireSafety.length > 0) {
        this.uploadFiles(this.fireSafety,9);
       }
       setTimeout(()=>{ 
        this.save_form_3();
   }, 25000);
  }
  else{
    for (const key of Object.keys(this.form.controls)) {
      if (this.form.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
         console.log('invalid keys', key);
         invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all Required Fields");
  }
}

save_form_3(){
  let  
  part = "3",
  temp_id = this.user_name,
  same_campus_yn = this.form.value.same_campus_yn,
  trustname = this.form.value.trustname,
  trustplace = this.form.value.trustplace,
  pincode = this.form.value.pincode,
  trust_register_yn = this.form.value.trust_register_yn,
  challan_ifsc = this.form.value.challan_ifsc,
  challan_amount = this.form.value.challan_amount,
  challan_number = this.form.value.challan_number,
  challan_date = this.form.value.challan_date,
  endowment_ifsc = this.form.value.endowment_ifsc,
  endowment_certi = this.form.value.endowment_certi,
  endowment_dep_date = this.form.value.endowment_dep_date,
  endowment_mature_date = this.form.value.endowment_mature_date,
  endowment_amount = this.form.value.endowment_amount,
  corpus_ifsc = this.form.value.corpus_ifsc,
  corpus_amount = this.form.value.corpus_amount,
  corpus_date = this.form.value.corpus_date,
  corpus_account = this.form.value.corpus_account,
  bldg_value1 = this.form.value.bldg_value1,
  student_strength1 = this.form.value.student_strength1,
  student_strength2 = this.form.value.student_strength2;
  // trustentry_inx_id = this.form.value.trustentry_inx_id;


  let form_3_data = {"part": part,"temp_id":temp_id,"same_campus_yn" : same_campus_yn, "trustname" : trustname,
  // "trustentry_inx_id" : trustentry_inx_id,  
  "trustplace" : trustplace,"trust_register_yn" : trust_register_yn,"challan_ifsc" : challan_ifsc,
  "challan_amount" : challan_amount,"challan_number" : challan_number,"challan_date" : challan_date,
  "endowment_ifsc" : endowment_ifsc,"endowment_certi" : endowment_certi,"endowment_dep_date" : endowment_dep_date,
  "endowment_mature_date" : endowment_mature_date,"pincode" : pincode,"endowment_amount" : endowment_amount,
  "corpus_ifsc" : corpus_ifsc,"corpus_amount" : corpus_amount,"corpus_date" : corpus_date,"corpus_account" : corpus_account,
  "bldg_value1" : bldg_value1,"student_strength1" : student_strength1,"student_strength2" : student_strength2
  };
  

  var doc_records = {
    "app_id": this.user_name,
    "schl_certifi_detls":this.form.value.document3,
    "schl_appli_fee_detls":this.upload_challn_array,
    "building_doc":this.form.value.building_document,
    "building_stab_certi":this.form.value.building_stability,
    "building_license":this.form.value.building_licence_array,
    "sanitary_certi":this.form.value.sanitary_certificate,
    "fire_safety":this.form.value.fire_safety,
    "files":this.uploadedFiles,

  }
  console.log("Doc1",doc_records);
  console.log("Form 3 data1",form_3_data);
  this.registrationservice.school_details_save_API_3({"records":form_3_data}, true).subscribe((res) => {
    if(res){
      console.log("Form 3 data1",form_3_data);
       this.registrationservice.school_details_Doc_API_3({"records":doc_records}, true).subscribe((res) => {
       if(res.status != 200){
        console.log("Doc1",doc_records);
        this.alertService.error("Required",res.message);
        this.display=false;
       }
       else {
        this.display=false;
        this.alertService.success("Data Saved Successfully");
      }
     })
    }
  })
}

save_4() {
  debugger;
  this.submitted = true;
  debugger;
  if (this.form.valid) {
  debugger;

    var data = {
      "records": {
        "temp_id": this.user_name,
        "part":"4",
      }
    };
    console.log(data, '444444444444data')
    if (this.form.valid) {
      this.registrationservice.saveSchoolDetailsFour(data).subscribe(data => {
        if (data.dataStatus == true) {
          this.alertService.success("Data Save Successfully");
        }
        else {
          this.alertService.error(data.message);
        }

      });
    }
  }
    else{
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
           console.log('invalid keys', key);
           invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all Required Fields");
    }
}
}