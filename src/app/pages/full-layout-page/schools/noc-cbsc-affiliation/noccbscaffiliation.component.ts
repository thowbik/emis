import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { schoolsService } from '../schools.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
import { RegistrationService } from '../../registration/registration.service';

@Component({
  selector: 'app-noccbscaffiliation',
  templateUrl: './noccbscaffiliation.component.html',
  styleUrls: ['./noccbscaffiliation.component.css']
})
export class NoccbscaffiliationComponent implements OnInit {
  userform: FormGroup;
  submitted: boolean;
  uploadedFiles: any[] = [];
  docsFiles: any[] = [];
  languagedropvalue:any[]=[];
  Landdetails: FormArray;
  Campus: FormArray;
  validupto: FormArray;
  students: FormArray;
  building: FormArray;
  schoollandinvalid: boolean;
  schoolName: any;
  userTypeID: any;
  schl_id: any;
  distrct_id: any;
  doc_file: any;
  fileType: any;
  minority:any[] =[];
  buildingPlan:any[] =[];
  buildingStability:any[] =[];
  buildingLicense:any[] =[];
  sanitaryCertificate:any[] =[];
  fireSafety: any[]=[];
  closureOrder: any[]=[];
  schoolPhotograph: any[]=[];
  build_plan_filename:any;
  build_plan_ext:any;
  build_stab_certi_filename:any;
  build_stab_certi_ext:any;
  build_license_filename:any;
  build_license_ext:any;
  sanitary_certi_filename:any;
  sanitary_certi_ext:any;
  fire_safety_filename:any;
  fire_safety_ext:any;
  sch_photo_filename:any;
  sch_photo_ext:any;
  closure_order_filename:any;
  closure_order_ext:any;
  invalidValidUpto: boolean;
  invalidAddbuilding: boolean;
  studentsInvalid: boolean;
  schoolceoform: FormGroup;
  todate: string;
  Engineerdropvalue:any[]=[];
  appId: number;
  sclName: any;
  supportDoc: any[]=[];
  NOCwithCBSE_details: any;
  surveylandinvalid: boolean;
  UDISE_code: any;
  schoolList: any[]=[];
  invalidUdiseCode1: boolean = false;
  invalidUdiseCode2: boolean  = false;
  invalidUdiseCode3: boolean = false;
  invalidUdiseCode4: boolean = false;
  invalidUdiseCode5: boolean = false;
  submitted2: boolean = false ;
  schoolRecords: any;
  appType: number;
  data: any[]=[];
  campusList: any[]=[];
  landDetailsList: any;
  getDataforNOC_result: any;
  buildingDocumentList: any[]=[];
  stablitycertificateList: any[]=[];
  minoritystatusList: any[]=[];
  buildingLicenseList: any[]=[];
  uploadPermissionDocs: any[]=[];
  schoolPhotoDocs: any[]=[];
  uploadClosureDocs: any[]=[];
  fireSafetyList: any;
  sanitaryCertificateList: any;
  minDate: Date;
  maxDate: any;
  todayDate: string;
  landRecords: any[]=[];
  total_land_acre: string;
  total_land_sqarefeet: number;
  upload_challn_array: any [] = [] ;
  supportDocs: any [] =[];
  ifscc_code: any;
  bank_detail: any;
  constructor(
    private schoolsService: schoolsService,
    private confirmationService: ConfirmationService,
    private dashboardService: StateDashboardService,
    private registrationservice: RegistrationService,
     private router: Router, public UserSessionService :UserSessionService,private alertService :AlertService,
    private fb: FormBuilder,private el: ElementRef
    ) {
      this.schoolName= this.UserSessionService.schoolName();
      this.userTypeID= this.UserSessionService.userTypeId();
      this.schl_id=this.UserSessionService.schoolId();
      this.distrct_id=this.UserSessionService.districtId();
      this.languagedropvalue = [
        {label: 'Owned', value: '1'},
        {label: 'Leased', value: '2'},
      ];
      this.Engineerdropvalue = [
        {label: 'Class I-A', value: '1'},
        {label: 'Class I', value: '2'},
        {label: 'Class II', value: '2'},

      ];
     }

  ngOnInit() {
 this.initialValidators();
 this.addSanitary();
 this.addFireSafety();
 this.addLandSurvey();
 this.addvalidupto();
 this.addLandSurveyceo();
 this.addbuilding();
 this.addstudents();
 this.getData();
 this.todayDate = new Date().toISOString().split('T')[0];
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
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
   }
   initialValidators() {
    this.userform = this.fb.group({

      'challan_ifsc': new FormControl('',Validators.required),
      'sch_app_fee_bank_bank': new FormControl('',null),
      'sch_app_fee_bank_branch': new FormControl('',null),
      'challan_amount': new FormControl('',Validators.required),
      'challan_number': new FormControl('',Validators.required),
      'challan_date': new FormControl('',Validators.required),
      'challlen_upload': new FormControl('',null),

      'mgmt_name': new FormControl('',Validators.required),
      'mgmt_address': new FormControl('',Validators.required),
      'mgmt_pincode': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{5}')]),
      'mgmt_register_yn': new FormControl('',Validators.required),
      'mgmt_register_date': new FormControl('',null),
      'mgmt_register_place': new FormControl('',null),
      'other_inst_name1': new FormControl('',null),
      'other_inst_place1': new FormControl('',null),
      'other_inst_name2': new FormControl('',null),
      'other_inst_place2': new FormControl('',null),
      'other_inst_name3': new FormControl('',null),
      'other_inst_place3': new FormControl('',null),
      'other_inst_name4': new FormControl('',null),
      'other_inst_place4': new FormControl('',null),
      'other_inst_name5': new FormControl('',null),
      'other_inst_place5': new FormControl('',null),
      'doc_file_num': new FormControl('',null),
      /* for Issuing Authority in Building License*/
      'doc_inspect_issue_authority': new FormControl('',Validators.required), 
      'doc_file_date': new FormControl('',Validators.required),
      // 'doc_filepath': new FormControl('',Validators.required),
      // 'doc_details':  new FormControl('', ),
      // 'doc_survey_no':  new FormControl('',),
      'doc_issue_place': new FormControl('',Validators.required),
      'ownership_type': new FormControl('',Validators.required),
      'lease_yrs': new FormControl('',null),
      // 'plan': new FormControl('',Validators.required),
      'doc_valid_upto_date': new FormControl('',null),
      'docs_engg_class': new FormControl('',Validators.required),
      'students_accomodate_strength1': new FormControl('',Validators.required),
      'closure_order_yn': new FormControl('',Validators.required),
      // 'doc_inspect_date': new FormControl('',Validators.required),
      'students_accomodate_strength2': new FormControl('',Validators.required),
      'minority_yn': new FormControl('',Validators.required),
      // 'institutions': new FormControl('',Validators.required),
      // 'Place': new FormControl('',Validators.required),
      // 'filedate': new FormControl('',Validators.required),
      // 'land': new FormControl('',Validators.required),
      // 'survey': new FormControl('',Validators.required),
      // 'lease': new FormControl('',Validators.required),
      // 'document': new FormControl('',Validators.required),
      'bldg_value': new FormControl('',Validators.required),
      // 'plan': new FormControl('',Validators.required),
      // 'certificate': new FormControl('',Validators.required),
      // 'accomodated': new FormControl('',Validators.required),
      // 'Authority': new FormControl('',Validators.required),
      // 'number': new FormControl('',Validators.required),
      // 'project_id': new FormControl('',Validators.required),
      // 'salary': new FormControl('',Validators.required),
      // 'datedisbur': new FormControl('',Validators.required),
      // 'status': new FormControl('',Validators.required),
      // 'language': new FormControl('',Validators.required),
      'hilly_yn': new FormControl('',Validators.required),
      'minority_status': new FormArray([]),
      /* fields for Details of Authority issuing Building Stability Certificate  */
      'doa_bsc_doc_inspect_issue_authority': new FormControl('',Validators.required),
      'doa_bsc_doc_file_num': new FormControl('',Validators.required),
      'doa_bsc_doc_file_date': new FormControl('',Validators.required),
      // new field
      'land_registered': new FormControl('',Validators.required),
      /*Sale Deed Document/Lease Document Number*/
      'doc_details': new FormControl('',Validators.required),
       /* fields for Details of Authority issuing Building Stability Certificate  */
      // 'validuptodate': new FormControl('',Validators.required),
      // 'surveynumber': new FormControl('',Validators.required),
      /*Files */
      'minority_certificate': new FormControl('',null),
      'school_photo': new FormControl('',Validators.required),
      'upload_closure': new FormControl('',Validators.required),
      'upload_permission': new FormControl('',null),
      'Landdetails': this.fb.array([]),
      'validupto': new FormArray([]),
      'students': new FormArray([]),
      'building': new FormArray([]),
      'sanitary_certificate': new FormArray([]),
      'fire_safety': new FormArray([]),
    });
    this.schoolceoform = this.fb.group({
      // Checklistverifications
      'library_yn': new FormControl('',Validators.required),
      'books_yn': new FormControl('',Validators.required),
      'labs_yn': new FormControl('',Validators.required),
      'sch_same_campus_yn': new FormControl('',Validators.required),
      'classrooms': new FormControl('',Validators.required),
      'em_sch_yn': new FormControl('',Validators.required),
      'sch1_school_id': new FormControl('',null),
      'sch2_school_id': new FormControl('',null),
      'sch3_school_id': new FormControl('',null),
      'sch4_school_id': new FormControl('',null),
      'sch5_school_id': new FormControl('',null),
      'sch1_udise': new FormControl('',Validators.required),
      'sch2_udise': new FormControl('',null),
      'sch3_udise': new FormControl('',null),
      'sch4_udise': new FormControl('',null),
      'sch5_udise': new FormControl('',null),
      'sch1_name': new FormControl('',null),
      'sch2_name': new FormControl('',null),
      'sch3_name': new FormControl('',null),
      'sch4_name': new FormControl('',null),
      'sch5_name': new FormControl('',null),
      'sch1_noc_yn': new FormControl('',Validators.required),
      'other_sch_affect_yn': new FormControl('',Validators.required),
      'address': new FormControl('',null),
      'Sch_name_1': new FormControl('',null),
      'Campus': this.fb.array([]),

    });
   }
   getData() {
    this.schoolsService.getDataforNOC(this.distrct_id,this.schl_id).subscribe((result) => {
      debugger;
      // if (result.dataStatus == true) {
        console.log(result);
        debugger;
        this.getDataforNOC_result=result.MasterDetails.districtwiseSchools;
        this.appId = result.MasterDetails.appId;
        this.appType = result.MasterDetails.appType;
        if(result.NOCwithCBSE_details.length > 0) {
        this.schoolList = result.MasterDetails.districtwiseSchools;
        this.landDetailsList = result.NOCwithCBSE_surveydetails.Tab1;
        this.campusList = result.NOCwithCBSE_surveydetails.Tab2;
        this.buildingDocumentList = result.NOCwithCBSE_docs.building_doc;
        this.stablitycertificateList = result.NOCwithCBSE_docs.building_stab_certi;
        this.NOCwithCBSE_details = result.NOCwithCBSE_details[0];
        this.minoritystatusList = result.NOCwithCBSE_docs.minority_status;
        this.buildingLicenseList = result.NOCwithCBSE_docs.building_license;
        this.sanitaryCertificateList =result.NOCwithCBSE_docs.sanitary_certi;
        this.fireSafetyList =result.NOCwithCBSE_docs.fire_safety;
        this.landRecords=result.NOCwithCBSE_docs.land_details;
        this.uploadPermissionDocs=result.NOCwithCBSE_docs.upload_permi_certi;
        this.schoolPhotoDocs=result.NOCwithCBSE_docs.upload_sch_photo;
        this.uploadClosureDocs=result.NOCwithCBSE_docs.closure_order;
        if(this.uploadPermissionDocs[0].doc_name !="") {
          this.userform.controls['upload_permission'].setValue(this.uploadPermissionDocs[0].doc_name);
        }
        if(this.schoolPhotoDocs[0].doc_name !="") {
          this.userform.controls['school_photo'].setValue(this.schoolPhotoDocs[0].doc_name);
        }
        if(this.uploadClosureDocs[0].doc_name !="") {
          this.userform.controls['upload_closure'].setValue(this.uploadClosureDocs[0].doc_name);
        }
        if(this.landRecords.length > 0) {
          this.userform.controls['doc_details'].setValue(this.landRecords[0].doc_details);
          this.userform.controls['doc_file_date'].setValue(this.landRecords[0].doc_file_date);
          this.userform.controls['doc_issue_place'].setValue(this.landRecords[0].doc_issue_place);
        }
        this.userform.patchValue(this.NOCwithCBSE_details);
        this.schoolceoform.patchValue(this.NOCwithCBSE_details);
        if(this.schoolceoform.value.em_sch_yn) {
          this.isNearBySchool(this.schoolceoform.value.em_sch_yn)
        }
        this.userform.controls['docs_engg_class'].setValue(this.NOCwithCBSE_details.docs_engg_class);
        
        const campusFormArray = this.schoolceoform.controls.Campus as FormArray;
        while (campusFormArray.length !== 0) {
          campusFormArray.removeAt(0)
        }
        const landDetailsFormArray = this.userform.controls.Landdetails as FormArray;
        while (landDetailsFormArray.length !== 0) {
          landDetailsFormArray.removeAt(0)
        }
        if(this.campusList.length > 0) {
          for (let i = 0; i < this.campusList.length; i++) {
            campusFormArray.push(this.fb.group({
              survey_inx_id: new FormControl(this.campusList[i].survey_inx_id, null),
              details_type: new FormControl(this.campusList[i].details_type, Validators.required),
              survey_number: new FormControl(this.campusList[i].survey_number, Validators.required),
              area: new FormControl(this.campusList[i].area, Validators.required),
              sqfeet: this.getSqfeet(this.campusList[i].area)
            }))
          }
        }
        else {
          this.addLandSurveyceo();
        }
        if(this.landDetailsList.length > 0) {
          debugger;
          for (let i = 0; i < this.landDetailsList.length; i++) {
            landDetailsFormArray.push(this.fb.group({
              survey_inx_id: new FormControl(this.landDetailsList[i].survey_inx_id, null),
              details_type: new FormControl(this.landDetailsList[i].details_type, Validators.required),
              survey_number: new FormControl(this.landDetailsList[i].survey_number, Validators.required),
              area: new FormControl(this.landDetailsList[i].area, Validators.required),
              sqfeet: this.getSqfeet(this.landDetailsList[i].area)
            }))
          }
        }
        else {
          this.addLandSurvey();
        }
        /*Building Documents */
        const validuptoFormArray = this.userform.controls.validupto as FormArray;
        while (validuptoFormArray.length !== 0) {
          validuptoFormArray.removeAt(0)
        }
        if(this.buildingDocumentList.length > 0) {
          debugger;
          for (let i = 0; i < this.buildingDocumentList.length; i++) {
            validuptoFormArray.push(this.fb.group({
              doc_type: new FormControl(this.buildingDocumentList[i].doc_type, null),
              doc_id: new FormControl(this.buildingDocumentList[i].doc_id, Validators.required),
              doc_details: new FormControl(this.buildingDocumentList[i].doc_details, Validators.required),
              doc_valid_upto_date: new FormControl(this.buildingDocumentList[i].doc_valid_upto_date,Validators.required),
              doc_name: new FormControl(this.buildingDocumentList[i].doc_name, Validators.required), 
              doc_name_coded: new FormControl(this.buildingDocumentList[i].doc_name_coded, null),
               
            }))
          }
        }
        else {
          this.addvalidupto();
        }
        /* Building Stablity Certificate*/
        const buildingFormArray = this.userform.controls.building as FormArray;
        while (buildingFormArray.length !== 0) {
          buildingFormArray.removeAt(0)
        }
        if(this.stablitycertificateList.length > 0) {
          debugger;
          for (let i = 0; i < this.stablitycertificateList.length; i++) {
            buildingFormArray.push(this.fb.group({
              doc_type: new FormControl(this.stablitycertificateList[i].doc_type, null),
              doc_id: new FormControl(this.stablitycertificateList[i].doc_id, Validators.required),
              doc_details: new FormControl(this.stablitycertificateList[i].doc_details, Validators.required),
              doc_valid_upto_date: new FormControl(this.stablitycertificateList[i].doc_valid_upto_date,Validators.required),
              doc_name: new FormControl(this.stablitycertificateList[i].doc_name, Validators.required),
              doc_name_coded: new FormControl(this.stablitycertificateList[i].doc_name_coded, null), 
            }))
          }
          this.userform.controls['doa_bsc_doc_inspect_issue_authority'].setValue(this.stablitycertificateList[0].doc_inspect_issue_authority);
          this.userform.controls['doa_bsc_doc_file_num'].setValue(this.stablitycertificateList[0].doc_file_num);
          this.userform.controls['doa_bsc_doc_file_date'].setValue(this.stablitycertificateList[0].doc_file_date);
        }
        else {
          this.addbuilding();
        }
        /*Building License */
        const buildingLicenseArray = this.userform.controls.students as FormArray;
        while (buildingLicenseArray.length !== 0) {
          buildingLicenseArray.removeAt(0)
        }
        if(this.buildingLicenseList.length > 0) {
          debugger;
          this.userform.controls['doc_inspect_issue_authority'].setValue(this.buildingLicenseList[0].doc_inspect_issue_authority);
          const buildingLicenseArray = this.userform.controls.students as FormArray;
          for (let i = 0; i < this.buildingLicenseList.length; i++) {
            buildingLicenseArray.push(this.fb.group({
              doc_id: new FormControl(this.buildingLicenseList[i].doc_id, Validators.required),
              doc_survey_no: new FormControl(this.buildingLicenseList[i].doc_survey_no, Validators.required), 
              doc_valid_upto_date: new FormControl(this.buildingLicenseList[i].doc_valid_upto_date, Validators.required), 
              doc_name:new FormControl(this.buildingLicenseList[i].doc_name, Validators.required),
              doc_type:new FormControl(this.buildingLicenseList[i].doc_type, Validators.required),
              doc_name_coded: new FormControl(this.buildingLicenseList[i].doc_name_coded, null),  
            })
            )
          }
        }
        else {
          this.addstudents();
        }
        /* sanitary certificate */
        const sanitaryArray = this.userform.controls.sanitary_certificate as FormArray;
        while (sanitaryArray.length !== 0) {
          sanitaryArray.removeAt(0)
        }
        if(this.sanitaryCertificateList.length > 0) {
      
        for (let i = 0; i < this.sanitaryCertificateList.length; i++) {
          sanitaryArray.push(this.fb.group({
            doc_id: new FormControl(this.sanitaryCertificateList[i].doc_id,null),
            doc_name: new FormControl(this.sanitaryCertificateList[i].doc_name,null),
            doc_inspect_issue_authority: new FormControl(this.sanitaryCertificateList[i].doc_inspect_issue_authority,Validators.required),
            doc_inspect_date: new FormControl(this.sanitaryCertificateList[i].doc_inspect_date,Validators.required),
            doc_file_num: new FormControl(this.sanitaryCertificateList[i].doc_file_num,Validators.required),
            doc_file_date: new FormControl(this.sanitaryCertificateList[i].doc_file_date,Validators.required),
            doc_valid_upto_date: new FormControl(this.sanitaryCertificateList[i].doc_valid_upto_date,Validators.required),
            doc_type:new FormControl(this.sanitaryCertificateList[i].doc_type, Validators.required),
            doc_name_coded: new FormControl(this.sanitaryCertificateList[i].doc_name_coded, null), 
          })
          )
        }
      }
      else {
        this.addSanitary();
      }
        /* Fire Safety Certificate */
        const fireSafetyArray = this.userform.controls.fire_safety as FormArray;
        while (fireSafetyArray.length !== 0) {
          fireSafetyArray.removeAt(0)
        }
        if(this.fireSafetyList.length > 0) {
          const fireSafetyArray = this.userform.controls.fire_safety as FormArray;
          for (let i = 0; i < this.fireSafetyList.length; i++) {
            fireSafetyArray.push(this.fb.group({
              doc_id: new FormControl(this.fireSafetyList[i].doc_id,null),
              doc_name: new FormControl(this.fireSafetyList[i].doc_name,null),
              doc_inspect_issue_authority: new FormControl(this.fireSafetyList[i].doc_inspect_issue_authority,Validators.required),
              doc_inspect_date:new FormControl(this.fireSafetyList[i].doc_inspect_date,Validators.required),
              doc_file_num: new FormControl(this.fireSafetyList[i].doc_file_num,Validators.required),
              doc_file_date: new FormControl(this.fireSafetyList[i].doc_file_date,Validators.required),
              doc_valid_upto_date: new FormControl(this.fireSafetyList[i].doc_valid_upto_date,Validators.required),
              doc_type:new FormControl(this.fireSafetyList[i].doc_type, Validators.required),
              doc_name_coded: new FormControl(this.fireSafetyList[i].doc_name_coded, null), 
            })
            )
          }
        }
        else {
          this.addFireSafety();
        }
        /* minority Status */
        const minoritystatusFormArray = this.userform.controls.minority_status as FormArray;
        while (minoritystatusFormArray.length !== 0) {
          minoritystatusFormArray.removeAt(0)
        }
        if(this.minoritystatusList.length > 0) {
          debugger;
          for (let i = 0; i < this.minoritystatusList.length; i++) {
            minoritystatusFormArray.push(this.fb.group({
              doc_type: new FormControl(this.minoritystatusList[i].doc_type, null),
              doc_id: new FormControl(this.minoritystatusList[i].doc_id, Validators.required),
              doc_inspect_issue_authority: new FormControl(this.minoritystatusList[i].doc_inspect_issue_authority, Validators.required),
              doc_file_num: new FormControl(this.minoritystatusList[i].doc_file_num,Validators.required),
              doc_file_date: new FormControl(this.minoritystatusList[i].doc_file_date, Validators.required),
              doc_name: new FormControl(this.minoritystatusList[i].doc_name, Validators.required),
              doc_name_coded: new FormControl(this.minoritystatusList[i].doc_name_coded, null),  
            }))
          }
        }

        if(this.userform.value.mgmt_register_yn) {
          this.chooseIsthetrustregister(this.userform.value.mgmt_register_yn);
        } 
      
      }
    });
   }
   getSqfeet(value) {
    var total_land_sqarefeet = (value * 43560);
    return total_land_sqarefeet;
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
          case 'minority':
            this.minority.push({
              "filename" : splittedName[0],
              "ext":splittedName[splittedName.length-1],
              "file":event.target.files[0],
              "docId":docId+1
            });
            (<FormArray>this.userform.controls['minority_status']).at(index).patchValue({doc_name: splittedName[0]});
            break;
            case 'uploadPermission':
              this.supportDoc.push({
                "filename" : splittedName[0],
                "ext":splittedName[splittedName.length-1],
                "file":event.target.files[0],
                "docId":'1'
              });
              this.userform.controls['upload_permission'].setValue(splittedName[0]);
              
              break;

              case 'Challlen_File':
                debugger;
              this.supportDocs.push({
                "filename" : splittedName[0],
                "ext":splittedName[splittedName.length-1],
                "file":event.target.files[0],
                "docId":'1'
              });
              this.userform.controls['challlen_upload'].setValue(splittedName[0]);
                console.log(this.userform.value.challlen_upload,"this.form.controls['challlen_upload'])");
              break;
    
          case 'buildingPlan':
            this.buildingPlan.push({
              "filename" :splittedName[0],
              "ext" : splittedName[splittedName.length-1],
              "file":event.target.files[0],
              "docId":docId+1
            });
            (<FormArray>this.userform.controls['validupto']).at(index).patchValue({doc_name: splittedName[0]});
            break;
          case 'buildingStability':
this.buildingStability.push({
  "filename":splittedName[0],
  "ext":splittedName[splittedName.length-1],
  "file":event.target.files[0],
  "docId":docId+1
});
(<FormArray>this.userform.controls['building']).at(index).patchValue({doc_name: splittedName[0]});
            break;
            case 'buildingLicense':
              this.buildingLicense.push({
                "filename" : splittedName[0],
                "ext":splittedName[splittedName.length-1],
                "file":event.target.files[0],
                "docId":docId+1
              });
              (<FormArray>this.userform.controls['students']).at(index).patchValue({doc_name: splittedName[0]});
              break;
              case 'sanitaryCertificate':
                this.sanitaryCertificate.push({
                  "filename" : splittedName[0],
                  "ext":splittedName[splittedName.length-1],
                  "file":event.target.files[0],
                  "docId":'1'
                });
                (<FormArray>this.userform.controls['sanitary_certificate']).at(index).patchValue({doc_name: splittedName[0]});
                break;
                case 'fireSafety':
                  this.fireSafety.push({
                    "filename" : splittedName[0],
                    "ext":splittedName[splittedName.length-1],
                    "file":event.target.files[0],
                    "docId":'1'
                  });
                  (<FormArray>this.userform.controls['fire_safety']).at(index).patchValue({doc_name: splittedName[0]});
                  break;
                  case 'closureOrder':
                    this.closureOrder.push({
                      "filename" : splittedName[0],
                      "ext":splittedName[splittedName.length-1],
                      "file":event.target.files[0],
                      "docId":'1'
                    })
                    this.userform.controls['upload_closure'].setValue(splittedName[0]);
                    break;
                    case 'schoolPhotograph':
                      this.schoolPhotograph.push({
                        "filename" : splittedName[0],
                        "ext":splittedName[splittedName.length-1],
                        "file":event.target.files[0],
                        "docId":'1'
                      });
                      this.userform.controls['school_photo'].setValue(splittedName[0]);
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

  onSavepreview(){
    this.router.navigate(['/cbsc-pdf']);
  }
  onSave(Type) {
    this.submitted = true;
      if (this.userform.valid) {
        var submitType = Type == "submit" ? 0 :"";
        this.uploadPermissionDocs=[];
        this.upload_challn_array=[];
        this.landRecords=[];
        this.schoolPhotoDocs=[];
        this.uploadClosureDocs=[];
        this.landRecords.push({
          "doc_type":4,
          "doc_id":1,
          "doc_details":this.userform.value.doc_details,
          "doc_file_date":this.userform.value.doc_file_date,
          "doc_issue_place":this.userform.value.doc_issue_place,
        })
     if( this.userform.value.upload_permission) {
       this.uploadPermissionDocs.push({
        "doc_type":2,
        "doc_id":1,
       })
     };
     if( this.userform.value.challlen_upload) {
       debugger
      this.upload_challn_array.push({
       "doc_type":"13",
       "doc_id":1,
      //  "doc_inx_id":'',
      })
      debugger
    };
     if( this.userform.value.school_photo) {
      this.schoolPhotoDocs.push({
       "doc_type":10,
       "doc_id":1,
      })
    };
    if( this.userform.value.upload_closure) {
      this.uploadClosureDocs.push({
       "doc_type":17,
       "doc_id":1,
      })
    };
        this.userform.value.students.forEach(x => {
    x.doc_inspect_issue_authority = this.userform.value.doc_inspect_issue_authority
        });
        this.userform.value.building.forEach(x => {
          x.doc_inspect_issue_authority = this.userform.value.doa_bsc_doc_inspect_issue_authority,
          x.doc_file_num = this.userform.value.doa_bsc_doc_file_num,
          x.doc_file_date = this.userform.value.doa_bsc_doc_file_date
              });
        if(this.minority && this.minority.length > 0) {
          this.uploadFiles(this.minority,1);
         }
         if(this.supportDoc && this.supportDoc.length > 0) {
          this.uploadFiles(this.supportDoc,2);
         }
         if(this.supportDocs && this.supportDocs.length > 0) {
           debugger
          this.uploadFiles(this.supportDocs,13);
         }
        if(this.buildingPlan && this.buildingPlan.length > 0) {
          this.uploadFiles(this.buildingPlan,5);
         }
          if(this.buildingStability && this.buildingStability.length > 0 ) {
          this.uploadFiles(this.buildingStability,6);
         }
         if(this.buildingLicense && this.buildingLicense.length > 0 ) {
          this.uploadFiles(this.buildingLicense,7);
         }
         if(this.sanitaryCertificate && this.sanitaryCertificate.length > 0 ) {
          this.uploadFiles(this.sanitaryCertificate,8);
         }
         if(this.fireSafety && this.fireSafety.length > 0 ) {
          this.uploadFiles(this.fireSafety,9);
         }
         if(this.closureOrder && this.closureOrder.length > 0 ) {
          this.uploadFiles(this.closureOrder,17);
         }
         if(this.schoolPhotograph && this.schoolPhotograph.length > 0 ) {
          this.uploadFiles(this.schoolPhotograph,10);
         }
         setTimeout(()=>{    //<<<---    using ()=> syntax
          this.saveAllData(submitType);
     }, 30000);
         }
      else {
        for (const key of Object.keys(this.userform.controls)) {
          if (this.userform.controls[key].invalid) {
             const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('invalid keys', key);
            // invalidControl.focus();
             //break;
          }
        }
        this.alertService.error('Please Fill All Mandatory Fields');
        //return true;
      }
 
    }
    saveAllData(submitType) {

         let noc_details = {
          "app_id":this.appId,
          "app_type":1,
         "school_id" : this.schl_id,
         "mgmt_name" : this.userform.value.mgmt_name,
         "mgmt_address" : this.userform.value.mgmt_address,
         "mgmt_pincode" : this.userform.value.mgmt_pincode,
         "mgmt_register_yn" : this.userform.value.mgmt_register_yn,
         "mgmt_register_date" : this.userform.value.mgmt_register_date,
         "mgmt_register_place" : this.userform.value.mgmt_register_place,
         "other_inst_name1" : this.userform.value.other_inst_name1,
         "other_inst_place1" :  this.userform.value.other_inst_place1,
         "other_inst_name2" :  this.userform.value.other_inst_name2,
         "other_inst_place2" : this.userform.value.other_inst_place2,
         "other_inst_name3" : this.userform.value.other_inst_name3,
         "other_inst_place3" :  this.userform.value.other_inst_place3,
         "other_inst_name4" :  this.userform.value.other_inst_name4,
         "other_inst_place4" :  this.userform.value.other_inst_place4,
         "other_inst_name5" :  this.userform.value.other_inst_name5,
         "other_inst_place5" :  this.userform.value.other_inst_place5,
         "minority_yn" :  this.userform.value.minority_yn,   
        //  new
        "land_registered" : this.userform.value.land_registered,
         "ownership_type" :  this.userform.value.ownership_type,
         "lease_yrs" :  this.userform.value.lease_yrs,
         "docs_engg_class" :  this.userform.value.docs_engg_class,
         "students_accomodate_strength1" :  this.userform.value.students_accomodate_strength1,
         "students_accomodate_strength2" :  this.userform.value.students_accomodate_strength2,
         "closure_order_yn" :  this.userform.value.closure_order_yn,
         "hilly_yn":this.userform.value.hilly_yn,
         "bldg_value":this.userform.value.bldg_value,
         "survey":this.userform.value.Landdetails,

      'challan_ifsc':this.userform.value.challan_ifsc,
      'challan_amount':this.userform.value.challan_amount,
      'challan_number':this.userform.value.challan_number,
      'challan_date':this.userform.value.challan_date,
        //  "flag":submitType
         };
         var doc_records = {
          "app_id":this.appId,
          "app_type":1,
          "minority_status":this.userform.value.minority_status,
           "land_details":this.landRecords,
          "building_doc":this.userform.value.validupto,
          "building_stab_certi":this.userform.value.building,
          "building_license":this.userform.value.students,
          "sanitary_certi":this.userform.value.sanitary_certificate,
          "fire_safety":this.userform.value.fire_safety,
          "upload_permi_certi":this.uploadPermissionDocs,
          "upload_sch_photo":this.schoolPhotoDocs,
          "closure_order":this.uploadClosureDocs,
          "files":this.uploadedFiles,
          "schl_appli_fee_detls":this.upload_challn_array,
         };
        console.log(":doc_records",doc_records);
        
         this.schoolsService.schoolcbscformsaveApi({"records":noc_details}, true).subscribe((res) => {
           if(res){
            this.schoolsService.schoolcbscdocssaveApi({"records":doc_records}, true).subscribe((res) => {
              if(res){
                
               this.alertService.success("Data Saved Successfully");
              }
              else {
               this.alertService.error("Please Fill all the Required Fields");
             }
            })
           }
         })
    }
    onSaveschool(Type) {
      var submitType = Type == "submit" ? 0 :"";
      debugger;
      this.submitted2 = true;
      if (this.schoolceoform.valid) {
          let school_key_id =this.schl_id,
          libarary=this.schoolceoform.value.library_yn,
          books=this.schoolceoform.value.books_yn,
          labs=this.schoolceoform.value.labs_yn,
          classroom=this.schoolceoform.value.classrooms,
          campus=this.schoolceoform.value.sch_same_campus_yn,
          medium=this.schoolceoform.value.em_sch_yn,
          school1=this.schoolceoform.value.sch1_school_id,
          udise1=this.schoolceoform.value.sch1_noc_yn,
          school2=this.schoolceoform.value.sch2_school_id,
          school3=this.schoolceoform.value.sch3_school_id,
          school4=this.schoolceoform.value.sch4_school_id,
          school5=this.schoolceoform.value.sch5_school_id,
          otherschool=this.schoolceoform.value.other_sch_affect_yn;

          let datas = {
            "app_id":this.appId,
            "app_type":this.appType,
            "school_id" : school_key_id,
           "library_yn" : libarary,
           "books_yn" : books,
           "labs_yn" : labs,
           "classrooms" : classroom,
           "sch_same_campus_yn" : campus,
           "em_sch_yn" : medium,
           "sch1_school_id" : school1,
           "sch2_school_id" : school2,
           "sch3_school_id" : school3,
           "sch4_school_id" : school4,
           "sch5_school_id" : school5,
           "sch1_noc_yn" : udise1,
           "other_sch_affect_yn" : otherschool,
           "survey":this.schoolceoform.value.Campus,
            "flag":submitType
           };

           this.schoolsService.getnocceodeatailssave({"records":datas}, true).subscribe((res) => {
             if(res){
              this.alertService.success("Data Save Successfully");
             }
             else {
              this.alertService.error("Please Fill all the Required Fields");
            }
           })

         }
         else {
          for (const key of Object.keys(this.schoolceoform.controls)) {
            if (this.schoolceoform.controls[key].invalid) {
               const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
              console.log('invalid keys', key);
              // invalidControl.focus();
              // break;
            }
          }
          this.alertService.error('Please Fill All Mandatory Fields');
          //return true;
        }
      }

    uploadFiles(files,docType) {
      debugger;
      var bucketName= "renewalapplicationemis";
      let expiry:number = 300;
      for (let i = 0; i < files.length; i++) {
        // var ext = files[i].ext;
        // var filename = files[i].filename;
        this.dashboardService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
          if (result) {
            // const formData = new FormData();
            // formData.append('file', this.doc_file);
            let file : File = files[i].file;
            this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
              this.uploadedFiles.push({
                "doc_id":files[i].docId,
                "doc_name" : files[i].filename,
                "doc_name_coded":result.key,
                "doc_type":docType
              })
            });
            
            this.alertService.success("File Uploaded Successfully");
          }
          else {
            this.alertService.success("Error in Uploading File please try again");
          }
        });
     
      }
     
    }
    chooseMinority(value)
    {
      debugger;
  if(value == '1') {
    this.addMinorityStatus();
  }
  else {
    this.removeMinorityStatus()
  }
    }
    addMinorityStatus(): void {
      const minorityStatus = this.userform.get('minority_status') as FormArray;
      while (minorityStatus.length !== 0) {
        minorityStatus.removeAt(0)
      }
      minorityStatus.push(this.fb.group({
        doc_type: new FormControl('1', Validators.required),
        doc_id: new FormControl('1', Validators.required),
        doc_inspect_issue_authority: new FormControl('',  Validators.required),
        doc_file_num: new FormControl('', Validators.required),
        doc_file_date: new FormControl('', Validators.required),
        doc_name: new FormControl('', Validators.required),
       // area: new FormControl('', Validators.required)
      }));
      }
      removeMinorityStatus() {
        const control = <FormArray>this.userform.controls['minority_status'];
        control.removeAt(control.length - 1);
      }
      addSanitary(): void {
        const sanitaryCertificate = this.userform.get('sanitary_certificate') as FormArray;
        sanitaryCertificate.push(this.fb.group({
          doc_type: new FormControl('8', Validators.required),
          doc_id: new FormControl('1', Validators.required),
          doc_inspect_issue_authority: new FormControl('',  Validators.required),
          doc_inspect_date: new FormControl('', Validators.required),
          doc_file_num: new FormControl('', Validators.required),
          doc_file_date: new FormControl('', Validators.required),
          doc_valid_upto_date: new FormControl('', Validators.required),
          doc_name: new FormControl('', Validators.required)
        }));
        }
        removeSanitary() {
          const control = <FormArray>this.userform.controls['sanitary_certificate'];
          control.removeAt(control.length - 1);
        }
        addFireSafety(): void {
          const fireSafetyCertificate = this.userform.get('fire_safety') as FormArray;
          fireSafetyCertificate.push(this.fb.group({
            doc_type: new FormControl('9', Validators.required),
            doc_id: new FormControl('1', Validators.required),
            doc_inspect_issue_authority: new FormControl('',  Validators.required),
            doc_inspect_date: new FormControl('', Validators.required),
            doc_file_num: new FormControl('', Validators.required),
            doc_file_date: new FormControl('', Validators.required),
            doc_valid_upto_date: new FormControl('', Validators.required),
            doc_name: new FormControl('', Validators.required)
          }));
          }
          removeFireSafety() {
            const control = <FormArray>this.userform.controls['fire_safety'];
            control.removeAt(control.length - 1);
          }
  addLandSurvey(): void {
    this.schoollandinvalid = false;
    this.Landdetails = this.userform.get('Landdetails') as FormArray;
    if (this.Landdetails.length < 5) {
    if (this.userform.controls.Landdetails.valid) {
    this.Landdetails.push(this.createItem());
     }
     else
     {
     this.schoollandinvalid = true;
   }
    }

  }
  ifsc_cde(ifscc){
    this.ifscc_code=ifscc;
    this.registrationservice.get_ifsc_data(this.ifscc_code).subscribe((res) => {
      if(res.data.length>0){ 
        this.bank_detail = res.data[0];
         if(this.userform.value.challan_ifsc == this.ifscc_code)
         {
          this.userform.controls['sch_app_fee_bank_bank'].setValue(this.bank_detail.bank_name);
          this.userform.controls['sch_app_fee_bank_branch'].setValue(this.bank_detail.branch);
         }
         else
         {
           this.alertService.error("IFSC Field is not Fetch in on change");
         }
      }
    })
  }
  createItem() {
    return this.fb.group({
      survey_inx_id: new FormControl('', null),
      details_type: new FormControl('1', Validators.required),
      survey_number: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      sqfeet: new FormControl('', Validators.required)
    });
  }

  removeLandSurvey() {
    if (this.Landdetails.length > 1) {
      this.schoollandinvalid = false;
      const control = <FormArray>this.userform.controls['Landdetails'];
      control.removeAt(control.length - 1);
    }
  }
  addvalidupto() {
    
    this.invalidValidUpto = false;
    this.validupto = this.userform.get('validupto') as FormArray;
    if (this.validupto.length < 5) {
      if (this.userform.controls.validupto.valid) {
        
        this.validupto.push(this.createItemvalid(this.validupto.length+1));
      }
      else {
        this.invalidValidUpto = true;
      }
    }
  }

  createItemvalid(docId) {
    return this.fb.group({
      doc_type: new FormControl('5', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      doc_details: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
       doc_name: new FormControl('', Validators.required),
    });
  }

  removevalidupto() {
    if (this.validupto.length > 1) {
      const control = <FormArray>this.userform.controls['validupto'];
      control.removeAt(control.length - 1);
    }
  }
  addstudents(): void {
    this.studentsInvalid = false;
    this.students = this.userform.get('students') as FormArray;
    if (this.students.length < 5) {
      if (this.userform.controls.students.valid) {
        this.students.push(this.createItemstudents(this.students.length+1));
      }
      else {
        this.studentsInvalid = true;
      }
    }
  }

  createItemstudents(docId) {
    return this.fb.group({
      doc_type: new FormControl('7', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      // doc_inspect_issue_authority: new FormControl('', Validators.required),
      doc_survey_no: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),
    });
  }

  removestudents() {
    if (this.students.length > 1) {
      this.schoollandinvalid = false;
      const control = <FormArray>this.userform.controls['students'];
      control.removeAt(control.length - 1);
    }
  }
  addbuilding(): void {
    this.invalidAddbuilding = false;
    this.building = this.userform.get('building') as FormArray;
    if (this.building.length < 5) {
      if (this.userform.controls.building.valid) {
        this.building.push(this.createItembuilding(this.building.length+1));
      }
      else {
        this.invalidAddbuilding = true;
      }
    }
  }

  createItembuilding(docId) {
    return this.fb.group({
      // accomodated: new FormControl('', Validators.required),
      doc_type: new FormControl('6', Validators.required),
      doc_id: new FormControl(docId, Validators.required),
      doc_details: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('', Validators.required),

    });
  }

  removebuilding() {
    if (this.building.length > 1) {
      this.schoollandinvalid = false;
      const control = <FormArray>this.userform.controls['building'];
      control.removeAt(control.length - 1);
    }
  }

  chooseOfficer(event, index) {
    var Landdetails = event.value;
    (<FormArray>this.userform.controls['Landdetails']).at(index).patchValue({ doc_details: '' });
    
    {
      (<FormArray>this.userform.controls['Landdetails']).at(index).patchValue({ doc_details: Landdetails });
    }
  }

  choosePurpose(event, index) {
    var Landdetails = event.value;
    (<FormArray>this.userform.controls['Landdetails']).at(index).patchValue({ doc_survey_no: '' });
    
    {
      (<FormArray>this.userform.controls['Landdetails']).at(index).patchValue({ doc_survey_no: Landdetails });
    }

  }

chooseIsthetrustregister(value) {
  if (value == 1) {
    this.userform.controls['mgmt_register_date'].setValidators(Validators.required);
    this.userform.controls['mgmt_register_place'].setValidators(Validators.required);
  }
  else {
    this.userform.controls['mgmt_register_date'].setValidators(null);
    this.userform.controls['mgmt_register_place'].setValidators(null);
    this.userform.controls['mgmt_register_date'].setValue("");
    this.userform.controls['mgmt_register_place'].setValue("");
  }
  this.userform.controls['mgmt_register_date'].updateValueAndValidity();
  this.userform.controls['mgmt_register_place'].updateValueAndValidity();
}

chooseminoritystatus(value) {
  if (value == 1) {
    this.userform.controls['doc_inspect_issue_authority'].setValidators(Validators.required);
    this.userform.controls['doc_file_date'].setValidators(Validators.required);
    this.userform.controls['doc_filepath'].setValidators(Validators.required);
  }
  else {
    this.userform.controls['doc_inspect_issue_authority'].setValidators(null);
    this.userform.controls['doc_file_date'].setValidators(null);
    this.userform.controls['doc_filepath'].setValidators(null);
  }
}
// schoolformceo
addLandSurveyceo(): void {
  this.surveylandinvalid = false;
  this.Campus = this.schoolceoform.get('Campus') as FormArray;
  if (this.Campus.length < 3) {
  if (this.schoolceoform.controls.Campus.valid) {
  this.Campus.push(this.createItemceo());
   }
   else
   {
   this.surveylandinvalid = true;
 }
  }

}
isNearBySchool(value) {
  debugger;
if(value == '1')
{
  this.schoolceoform.controls['sch1_udise'].setValidators(Validators.required);
}
else {
  this.schoolceoform.controls['sch1_udise'].setValidators(null);
  this.schoolceoform.controls['sch1_udise'].setValue("");
}
this.schoolceoform.controls['sch1_udise'].updateValueAndValidity();
}
getSchoolName(value,type){
  debugger;
  this.schoolRecords = this.schoolList.find(i => i.udise_code == value);
  debugger;
  switch(type){
    case '1':
if(this.schoolRecords) {
  debugger;
  this.schoolceoform.controls['sch1_school_id'].setValue(this.schoolRecords.school_id);
  this.schoolceoform.controls['sch1_name'].setValue(this.schoolRecords.school_name);
}
else {
  this.invalidUdiseCode1 = true;
}
      break;
      case '1':
        if(this.schoolRecords) {
          debugger;
          this.schoolceoform.controls['sch1_school_id'].setValue(this.schoolRecords.school_id);
          this.schoolceoform.controls['sch1_name'].setValue(this.schoolRecords.school_name);
        }
        else {
          this.invalidUdiseCode1 = true;
        }
              break;
              case '2':
                if(this.schoolRecords) {
                  debugger;
                  this.schoolceoform.controls['sch2_school_id'].setValue(this.schoolRecords.school_id);
                  this.schoolceoform.controls['sch2_name'].setValue(this.schoolRecords.school_name);
                }
                else {
                  this.invalidUdiseCode2 = true;
                }
                      break;
                      case '3':
                        if(this.schoolRecords) {
                          debugger;
                          this.schoolceoform.controls['sch3_school_id'].setValue(this.schoolRecords.school_id);
                          this.schoolceoform.controls['sch3_name'].setValue(this.schoolRecords.school_name);
                        }
                        else {
                          this.invalidUdiseCode3 = true;
                        }
                              break;
                              case '4':
                                if(this.schoolRecords) {
                                  debugger;
                                  this.schoolceoform.controls['sch4_school_id'].setValue(this.schoolRecords.school_id);
                                  this.schoolceoform.controls['sch4_name'].setValue(this.schoolRecords.school_name);
                                }
                                else {
                                  this.invalidUdiseCode4 = true;
                                }
                                      break;
                                      case '5':
                                        if(this.schoolRecords) {
                                          debugger;
                                          this.schoolceoform.controls['sch5_school_id'].setValue(this.schoolRecords.school_id);
                                          this.schoolceoform.controls['sch5_name'].setValue(this.schoolRecords.school_name);
                                        }
                                        else {
                                          this.invalidUdiseCode5 = true;
                                        }
                                              break;
    default:
      break;
  }
}

createItemceo() {
  return this.fb.group({
    survey_inx_id: new FormControl('', null),
    details_type: new FormControl('2', null),
    survey_number: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    sqfeet: new FormControl('', Validators.required) 
  });
}

removeLandSurveyceo() {
  if (this.Campus.length > 1) {
    this.surveylandinvalid = false;
    const control = <FormArray>this.schoolceoform.controls['Campus'];
    control.removeAt(control.length - 1);
  }

}
chooseIstheschoolcamppus(value) {
  if (value == 1) {
    this.addLandSurveyceo();
  }
  else {
    const control = <FormArray>this.schoolceoform.controls['Campus'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  }
}
convertSqureFeet(value,index,type) {
  debugger;
  var total_land_sqarefeet = (value * 43560);
  if(type == 'Land')
  {
    (<FormArray>this.userform.controls['Landdetails']).at(index).patchValue({sqfeet: total_land_sqarefeet});
  }
  else {
    (<FormArray>this.schoolceoform.controls['Campus']).at(index).patchValue({sqfeet: total_land_sqarefeet});
  }
 
}
// convertSqureFeet(acre,index) {
//   debugger;
//   this.submitted = false;
//   this.total_land_sqarefeet = (acre * 43560);
//   alert(this.total_land_sqarefeet)
//   this.userform.controls['area'].setValue(this.total_land_sqarefeet);
//     (<FormArray>this.userform.controls['Landdetails']).at(index).patchValue({ total_land_sqarefeet: '' });

//   }


}
