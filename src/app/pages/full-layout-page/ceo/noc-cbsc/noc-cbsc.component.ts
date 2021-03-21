import { Component, OnInit, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { CeoService } from '../ceo.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-noc-cbsc',
  templateUrl: './noc-cbsc.component.html',
  styleUrls: ['./noc-cbsc.component.css']
})
export class NocCbscComponent implements OnInit {
  schoolform: FormGroup;
  userform: FormGroup;
  schoolceoform: FormGroup;
  ceoform: FormGroup;

  submitted: boolean;
  uploadedFiles: any[] = [];
  languagedropvalue: { label: string; value: string; }[];
  ceorecommend: { label: string; value: string; }[];

  districtwise: any[] = [];
  schoolId: any;
  schl_id: any;
  school_name: any;
  udise_code: any;
  block_name: any;
  edu_dist_name: any;
  address: any;
  management: any;
  block_id: any;
  edu_dist_id: any;
  pincode: any;
  mgmt_name: any;
  usertype: any;
  school_id:any;
  app_id: any;
  studentstrength: any;
  userTypeID: any;
  districtId: any;
  statelogin: boolean;
  ceologin: boolean = false ;
  stateform: FormGroup;
  statedropdown: { label: string; value: string; }[];
  minoritystatusList: any[]=[];
  stablitycertificateList: any[]=[];
  buildingDocumentList: any[]=[];
  landDetailsList:any[]=[];
  campusList: any[]=[];
  NOCwithCBSE_details: any[]=[];
  buildingLicenseList: any[]=[];
  sanitaryCertificateList: any[]=[];
  fireSafetyList: any[]=[];
  schoolList: any[]=[];
  appType: number;
  appId: number;
  previousRemarks: any[]=[];
  submitted3: boolean;
  closureOrder: any;
  uploadPhoto: any;
  uploadPermisionCerti: any;
  directorUpload: any[]=[];
  docUpload: any[]=[];
  submitted2:any;
  previousRemarksEntry: any[]=[];
  remarksData:any[]=[];
  landRecords: any[]=[];
  getDataforNOC_result: any;
  minDate: Date;
  maxDate: any;
  todayDate: string;
  classList: any[]=[];
  submitted4: boolean;
  uploadPermissionDocs: any[]=[];
  schoolPhotoDocs: any[]=[];
  uploadClosureDocs: any[]=[];
  colSize:any;
  closureRemarks: any[];
  schoolPhotoRemarks: any[];
  uploadPermiRemarks: any[];
  distId: any;
  otherConditionDocs: any[]=[];
  constructor(private route: ActivatedRoute,private CeoService: CeoService,
    private confirmationService: ConfirmationService,
     private router: Router, public UserSessionService :UserSessionService,private alertService :AlertService,
     private dashboardService:StateDashboardService,
    private fb: FormBuilder,private el: ElementRef)
    {
      this.schoolId = this.UserSessionService.schoolId();
      this.usertype = this.UserSessionService.userType();
      this.userTypeID = this.UserSessionService.userTypeId();
      // district_id = this.UserSessionService.districtId();
      this.route.queryParams.subscribe(
        params => {
          // console.log('Got the JWT as: ', params['school_id']);
          this.school_id =  params['school_id'];
          this.app_id =  params['app_id'];
          this.distId =params['district_id'];
        })

      this.languagedropvalue = [
        {label: 'Owned', value: '1'},
        {label: 'Leased', value: '2'},
      ];
      this.ceorecommend = [
        {label: 'Recommended', value: 'R'},
        {label: 'Not Recommended', value: 'RC'},
        {label: 'Request Clarification', value: '2'},
      ];

      this.statedropdown = [
        {label: 'Approve', value: '1'},
        {label: 'Reject', value: '2'},
        {label: 'Request Clarification', value: '2'},
      ];
      this.classList = [
        { "value": "13", "label": "LKG" },
        { "value": "14", "label": "UKG" },
        { "value": "1", "label": "I" },
        { "value": "2", "label": "II" },
        { "value": "3", "label": "III" },
        { "value": "4", "label": "IV" },
        { "value": "5", "label": "V" },
        { "value": "6", "label": "VI" },
        { "value": "7", "label": "VII" },
        { "value": "8", "label": "VIII" }
      ];
     }

     cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
     [
       { field: 'district_name', header: 'Name of Institution', widthstyle: '10em'},
       { field: 'Government', header: 'Place', widthstyle: '10em'},
     ];
     cols1: Array<{'field': string, 'header': string, 'widthstyle': string}> =
     [
       { field: 'district_name', header: 'Class', widthstyle: '10em'},
       { field: 'total_b', header: 'Boys', widthstyle: '10em'},
       { field: 'total_g', header: 'Girls', widthstyle: '10em'},
       { field: 'total', header: 'Total', widthstyle: '10em'},
     ];


  ngOnInit() {
    // const districtId = this.UserSessionService.districtId();
    this.initialValidators();
    this.addSanitary();
    this.addFireSafety();
    this.getSchoolDetails();
    if (this.userTypeID == 5 )
       {
       this.statelogin = true;
         }
     if (this.userTypeID == 9)
   {
     this.ceologin=true;
    }
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
    this.userform =this.fb.group({
      'mgmt_name': new FormControl('',Validators.required),
      'mgmt_address': new FormControl('',Validators.required),
      'mgmt_pincode': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{5}')]),
      'mgmt_register_yn': new FormControl('',Validators.required),
      'mgmt_register_date': new FormControl('',Validators.required),
      'mgmt_register_place': new FormControl('',Validators.required),
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
      'doc_file_num': new FormControl('',Validators.required),
      /* for Issuing Authority in Building License*/
      'doc_inspect_issue_authority': new FormControl('',Validators.required), 
      'doc_file_date': new FormControl('',Validators.required),
      // 'doc_filepath': new FormControl('',Validators.required),
      // 'doc_details':  new FormControl('', ),
      // 'doc_survey_no':  new FormControl('',),
      'doc_issue_place': new FormControl('',Validators.required),
      'ownership_type': new FormControl('',Validators.required),
      'lease_yrs': new FormControl('',null),
      'doc_details': new FormControl('',null),
      // 'plan': new FormControl('',Validators.required),
      'doc_valid_upto_date': new FormControl('',null),
      'docs_engg_class': new FormControl('',Validators.required),
      'students_accomodate_strength1': new FormControl('',Validators.required),
      'closure_order_yn': new FormControl('',Validators.required),
      // 'doc_inspect_date': new FormControl('',Validators.required),
      'students_accomodate_strength2': new FormControl('',Validators.required),
      // 'institutions': new FormControl('',Validators.required),
      // 'Place': new FormControl('',Validators.required),
      // 'filedate': new FormControl('',Validators.required),
      // 'land': new FormControl('',Validators.required),
      // 'survey': new FormControl('',Validators.required),
      // 'lease': new FormControl('',Validators.required),
      // 'document': new FormControl('',Validators.required),
      'bldg_value': new FormControl('',Validators.required),
      'minority_yn': new FormControl('',Validators.required),
      'land_registered': new FormControl('',Validators.required),
      
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
      'closure_remarks': new FormControl('',null),
      'school_photo_remarks': new FormControl('',null),
      'upload_permi_remarks': new FormControl('',null),
       /* fields for Details of Authority issuing Building Stability Certificate  */
      // 'validuptodate': new FormControl('',Validators.required),
      // 'surveynumber': new FormControl('',Validators.required),
      /*Files */
      'minority_certificate': new FormControl('',null),
      'school_photo': new FormControl('',Validators.required),
      'upload_permission': new FormControl('',null),
      'upload_closure': new FormControl('',Validators.required),
      'Landdetails': this.fb.array([]),
      'validupto': new FormArray([]),
      'students': new FormArray([]),
      'building': new FormArray([]),
      'sanitary_certificate': new FormArray([]),
      'fire_safety': new FormArray([]),
    })
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
      'sch2_udise': new FormControl('',Validators.required),
      'sch3_udise': new FormControl('',Validators.required),
      'sch4_udise': new FormControl('',Validators.required),
      'sch5_udise': new FormControl('',Validators.required),
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
    this.ceoform =this.fb.group({
      'inspection_date': new FormControl('',null),
      'ceo_remarks': new FormControl('',Validators.required),
       'status': new FormControl('',Validators.required),
      'remarks': new FormControl('',Validators.required),
      'filedate': new FormControl('',null),
      'order_date': new FormControl('',null),
      'order_rc_num': new FormControl('',null),
      'officer': new FormControl('',null),
      'recommend': new FormControl('',Validators.required),
      'order_valid_from_date': new FormControl('',null),
      'doc_name': new FormControl('',Validators.required)
    })
    this.stateform =this.fb.group({
      'order_valid_from_date': new FormControl('',Validators.required),
      'order_valid_upto_date': new FormControl('',Validators.required),
      'order_from_class': new FormControl('',Validators.required),
      'order_to_class': new FormControl('',Validators.required),
      'recommend': new FormControl('',null),
      'status': new FormControl('',Validators.required),
      'remarks': new FormControl('',Validators.required),
      'order_rc_num': new FormControl('',Validators.required),
      'order_date': new FormControl('',null),
      'officer': new FormControl('',null),
      'order_recog_number': new FormControl('',Validators.required),
      'doc_name': new FormControl('',Validators.required),
      'other_cond_doc_name': new FormControl('',Validators.required),
    })
   }
   getSchoolDetails()
   {
     debugger;
     this.CeoService.GetSchoolDetails(this.distId,this.school_id).subscribe(result => {
      if (result.NOCwithCBSE_details.length > 0) {
        console.log(result);
        debugger;
  this.setData(result);
      }
     });
   }
   setData(result) {
    this.getDataforNOC_result=result.MasterDetails.districtwiseSchools;
    this.appId = result.MasterDetails.appId;
    this.appType = result.MasterDetails.appType;
    this.schoolList = result.MasterDetails.districtwiseSchools;
    this.landDetailsList = result.NOCwithCBSE_surveydetails.Tab1;
    this.campusList = result.NOCwithCBSE_surveydetails.Tab2;
    this.previousRemarks =result.Remarks;
    if(this.previousRemarks.length > 0) {
      this.closureRemarks = this.previousRemarks.filter(i => i.doc_type == '17');
      this.schoolPhotoRemarks = this.previousRemarks.filter(i => i.doc_type == '10');
      this.uploadPermiRemarks = this.previousRemarks.filter(i => i.doc_type == '2');
    }

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
      this.userform.controls['upload_permission'].setValue(this.uploadPermissionDocs[0].doc_name_coded);
    }
    if(this.schoolPhotoDocs[0].doc_name !="") {
      this.userform.controls['school_photo'].setValue(this.schoolPhotoDocs[0].doc_name_coded);
    }
    if(this.uploadClosureDocs[0].doc_name !="") {
      this.userform.controls['upload_closure'].setValue(this.uploadClosureDocs[0].doc_name_coded);
    }
    if(this.landRecords.length > 0) {
      this.userform.controls['doc_details'].setValue(this.landRecords[0].doc_details);
      this.userform.controls['doc_file_date'].setValue(this.landRecords[0].doc_file_date);
      this.userform.controls['doc_issue_place'].setValue(this.landRecords[0].doc_issue_place);
    }
    this.userform.patchValue(this.NOCwithCBSE_details);
    this.schoolceoform.patchValue(this.NOCwithCBSE_details);
    this.userform.controls['docs_engg_class'].setValue(this.NOCwithCBSE_details['docs_engg_class']);
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
          doc_inspect_issue_authority: new FormControl(this.buildingDocumentList[i].doc_inspect_issue_authority,Validators.required),
          doc_file_num: new FormControl(this.buildingDocumentList[i].doc_file_num,Validators.required),
          doc_file_date: new FormControl(this.buildingDocumentList[i].doc_file_date,Validators.required),
          doc_name: new FormControl(this.buildingDocumentList[i].doc_name, Validators.required), 
          user_remarks: new FormControl(this.buildingDocumentList[i].user_remarks, Validators.required),
          doc_name_coded: new FormControl(this.buildingDocumentList[i].doc_name_coded, null),
          previousReamrks:this.getPreviousRemarks(this.buildingDocumentList[i].doc_type,this.buildingDocumentList[i].doc_id)     
        }))
      }
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
          doc_inspect_issue_authority: new FormControl(this.stablitycertificateList[i].doc_inspect_issue_authority,Validators.required),
          doc_file_num: new FormControl(this.stablitycertificateList[i].doc_file_num,Validators.required),
          doc_file_date: new FormControl(this.stablitycertificateList[i].doc_file_date,Validators.required),
          doc_name: new FormControl(this.stablitycertificateList[i].doc_name, Validators.required),
          user_remarks: new FormControl(this.stablitycertificateList[i].user_remarks, Validators.required),
          doc_name_coded: new FormControl(this.stablitycertificateList[i].doc_name_coded, null), 
          previousReamrks:this.getPreviousRemarks(this.stablitycertificateList[i].doc_type,this.stablitycertificateList[i].doc_id)  
        }))
      }
      this.userform.controls['doa_bsc_doc_inspect_issue_authority'].setValue(this.stablitycertificateList[0].doc_inspect_issue_authority);
      this.userform.controls['doa_bsc_doc_file_num'].setValue(this.stablitycertificateList[0].doc_file_num);
      this.userform.controls['doa_bsc_doc_file_date'].setValue(this.stablitycertificateList[0].doc_file_date);
    }
    /*Building License */
    const buildingLicenseArray = this.userform.controls.students as FormArray;
    while (buildingLicenseArray.length !== 0) {
      buildingLicenseArray.removeAt(0)
    }
    if(this.buildingLicenseList.length > 0) {
      debugger;
      for (let i = 0; i < this.buildingLicenseList.length; i++) {
        buildingLicenseArray.push(this.fb.group({
          doc_id: new FormControl(this.buildingLicenseList[i].doc_id, Validators.required),
          doc_survey_no: new FormControl(this.buildingLicenseList[i].doc_survey_no, Validators.required), 
          doc_valid_upto_date: new FormControl(this.buildingLicenseList[i].doc_valid_upto_date, Validators.required),
          doc_inspect_issue_authority: new FormControl(this.buildingLicenseList[i].doc_inspect_issue_authority, Validators.required),  
          doc_name:new FormControl(this.buildingLicenseList[i].doc_name, Validators.required),
          doc_type:new FormControl(this.buildingLicenseList[i].doc_type, Validators.required),
          user_remarks: new FormControl(this.buildingLicenseList[i].user_remarks, Validators.required),
          doc_name_coded: new FormControl(this.buildingLicenseList[i].doc_name_coded, null),
          previousReamrks:this.getPreviousRemarks(this.buildingLicenseList[i].doc_type,this.buildingLicenseList[i].doc_id)    
        })
        )
      }
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
        user_remarks: new FormControl(this.sanitaryCertificateList[i].user_remarks, Validators.required),
        doc_name_coded: new FormControl(this.sanitaryCertificateList[i].doc_name_coded, null), 
        previousReamrks:this.getPreviousRemarks(this.sanitaryCertificateList[i].doc_type,this.sanitaryCertificateList[i].doc_id)   
      })
      )
    }
  }
    /* Fire Safety Certificate */
    const fireSafetyArray = this.userform.controls.fire_safety as FormArray;
    while (fireSafetyArray.length !== 0) {
      fireSafetyArray.removeAt(0)
    }
    if(this.fireSafetyList.length > 0) {
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
          user_remarks: new FormControl(this.fireSafetyList[i].user_remarks, Validators.required),
          doc_name_coded: new FormControl(this.fireSafetyList[i].doc_name_coded, null),
          previousReamrks:this.getPreviousRemarks(this.fireSafetyList[i].doc_type,this.fireSafetyList[i].doc_id)    
        })
        )
      }
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
          user_remarks: new FormControl(this.minoritystatusList[i].user_remarks, Validators.required),
          doc_name_coded: new FormControl(this.minoritystatusList[i].doc_name_coded, null),
          previousReamrks:this.getPreviousRemarks(this.minoritystatusList[i].doc_type,this.minoritystatusList[i].doc_id)     
        }))
      }
    }

    if(this.userform.value.mgmt_register_yn) {
      this.chooseIsthetrustregister(this.userform.value.mgmt_register_yn);
    } 
    console.log(result);
   }
   getStateData() {
    this.CeoService.getStateData(this.app_id).subscribe(result => {
      if (result.NOCwithCBSE_details.length > 0) {
        console.log(result);
        debugger;
  this.setData(result);
      }
     });
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
   getSqfeet(value) {
    var total_land_sqarefeet = (value * 43560);
    return total_land_sqarefeet;
   }
   getPreviousRemarks(docType,docId) {
    
    debugger;
      let arr = new FormArray([])
      if(this.previousRemarks.length > 0) {
        var prev_remarks_record = this.previousRemarks.filter(i => i.doc_type == docType && i.doc_id == docId);
        if(prev_remarks_record.length > 0) {
          prev_remarks_record.forEach(y => {
            arr.push(this.fb.group({
              user_type: y.user_type,
              user_remarks: y.user_remarks,
              doc_id:y.doc_id
            }))
          })
      }
      }
      return arr;
    }
   chooseIsthetrustregister(value) {
    if (value == 1) {
      this.userform.controls['mgmt_register_date'].setValidators(Validators.required);
      this.userform.controls['mgmt_register_place'].setValidators(Validators.required);
    }
    else {
      this.userform.controls['mgmt_register_date'].setValidators(null);
      this.userform.controls['mgmt_register_place'].setValidators(null);
  
    }
  }
  chooseCeoRemarks(value)
  {
    debugger;
    if(value == '2')
    {
      this.ceoform.controls['status'].setValue(2);
      this.ceoform.controls['ceo_remarks'].setValue('Request Clarification');
    }
    else {
      this.ceoform.controls['status'].setValue(3);
      if(value == 'R') 
      this.ceoform.controls['ceo_remarks'].setValue('Recommended');
      else 
      this.ceoform.controls['ceo_remarks'].setValue('Not Recommended');
    }
    
  }
  chooseStateRecommendation(value) {
    if(value == '2')
    {
      this.stateform.controls['status'].setValue(2);
    }
    else {
      this.stateform.controls['status'].setValue(1);
    }
  }
  onSelectFile(event,type) {
    debugger;
   if (event.target.files && event.target.files[0]) {
     var fileName = event.target.files[0].name;
     var splittedName = fileName.split(".");
     if(splittedName[splittedName.length-1] == 'pdf')
     {
       
     if (event.target.files[0].size <= 2000000) {
       if(type == 'otherCondDoc') {
         this.directorUpload.push({
          "filename" : splittedName[0],
          "ext":splittedName[splittedName.length-1],
          "file":event.target.files[0],
          "docId":'1',
          "type":type,
          "docType":'11'
         });
         this.stateform.controls['other_cond_doc_name'].setValue(splittedName[0]);
       }
       else {
        this.docUpload.push({
          "filename" : splittedName[0],
          "ext":splittedName[splittedName.length-1],
          "file":event.target.files[0],
          "docId":'1',
          "type":type,
          "docType":'12'
         });
         if(this.userTypeID == 9) {
          this.ceoform.controls['doc_name'].setValue(splittedName[0]);
         }
         else {
          this.stateform.controls['doc_name'].setValue(splittedName[0]);
         }
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
   onSave() {
     debugger;
     console.log(this.userform.value);
     let remarksArray = [];
     if(this.userform.value.closure_remarks) {
      remarksArray.push({
        "app_id":this.appId,
        "doc_type":17,
        "doc_id":1,
        "user_type_id":this.userTypeID,
        "user_remarks":this.userform.value.closure_remarks
      });
     }
     if(this.userform.value.upload_permi_remarks) {
      remarksArray.push({
        "app_id":this.appId,
        "doc_type":2,
        "doc_id":1,
        "user_type_id":this.userTypeID,
        "user_remarks":this.userform.value.upload_permi_remarks
      });
     }
     if(this.userform.value.school_photo_remarks) {
      remarksArray.push({
        "app_id": this.appId,
        "doc_type":10,
        "doc_id":1,
        "user_type_id":this.userTypeID,
        "user_remarks": this.userform.value.school_photo_remarks
      });
     }
     var buildDoc = this.userform.value.validupto;
    var buliddoc = buildDoc.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(buliddoc.length > 0) {
      for (let i = 0; i < buliddoc.length; i++) {
      remarksArray.push(buliddoc[i]);
      }
    }
   

    var buildStable = this.userform.value.building; 
    debugger;
    var bulidSta = buildStable.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(bulidSta.length > 0) {
      for (let i = 0; i < bulidSta.length; i++) {
        remarksArray.push(bulidSta[i]);
        }
     
    }

    var buildLicense = this.userform.value.students; 
    var bulidLic = buildLicense.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(bulidLic.length > 0) {
      for (let i = 0; i < bulidLic.length; i++) {
        remarksArray.push(bulidLic[i]);
        }
     
      
    }

    var sanitaryCertificate = this.userform.value.sanitary_certificate[0];
    if(sanitaryCertificate.user_remarks != '' && sanitaryCertificate.user_remarks != null){
      remarksArray.push(sanitaryCertificate);
    } 
    
    var fireSafety = this.userform.value.fire_safety[0]; 
    if(fireSafety.user_remarks != '' && fireSafety.user_remarks != null){
      remarksArray.push(fireSafety);
    }
    this.remarksData = remarksArray.map(l => { return { app_id: this.appId, doc_type: l.doc_type, doc_id:l.doc_id,user_type_id:this.userTypeID,user_remarks:l.user_remarks }; });
       var records = {
        "records":this.remarksData} 
    this.CeoService.saveremarks(records,true).subscribe(result => {
          if (result) {
            this.alertService.success(result.message);
          }
        });
    }
    // this.submitted = true;
    // if (this.userform.valid) {
    //     let school_key_id =this.schl_id,
    //     libarary=this.userform.value.library_yn,
    //     books=this.userform.value.books_yn,
    //     labs=this.userform.value.labs_yn,
    //     classroom=this.userform.value.classrooms,
    //     campus=this.userform.value.sch_same_campus_yn,
    //     medium=this.userform.value.em_sch_yn,
    //     school1=this.userform.value.sch1_school_id,
    //     udise1=this.userform.value.sch1_noc_yn,
    //     school2=this.userform.value.sch2_school_id,
    //     udise2=this.userform.value.sch2_noc_yn,
    //     school3=this.userform.value.sch3_school_id,
    //     udise3=this.userform.value.sch3_noc_yn,
    //     school4=this.userform.value.sch4_school_id,
    //     udise4=this.userform.value.sch4_noc_yn,
    //     school5=this.userform.value.sch5_school_id,
    //     udise5=this.userform.value.sch5_noc_yn,
    //     hily=this.userform.value.hilly_yn,
    //     whether=this.userform.value.closure_order_yn,
    //     otherschool=this.userform.value.other_sch_affect_yn,
    //     pictures=this.userform.value.pictures_yn,
    //     security=this.userform.value.security_yn,
    //     arrested=this.userform.value.docs_attested_yn,
    //     forms=this.userform.value.forms_yn;

    //     let datas = {"school_key_id" : school_key_id,
    //      "library_yn" : libarary,
    //      "books_yn" : books,
    //      "labs_yn" : labs,
    //      "classrooms" : classroom,
    //      "sch_same_campus_yn" : campus,
    //      "em_sch_yn" : medium,
    //      "sch1_school_id" : school1,
    //      "sch1_noc_yn" : udise1,
    //      "sch2_school_id" : school2,
    //      "sch2_noc_yn" : udise2,
    //      "sch3_school_id" : school3,
    //      "sch3_noc_yn" : udise3,
    //      "sch4_school_id" : school4,
    //      "sch4_noc_yn" : udise4,
    //      "sch5_school_id" : school5,
    //      "sch5_noc_yn" : udise5,
    //     //  "sch1_noc_yn" : udise1,
    //      "hilly_yn" : hily,
    //      "other_sch_affect_yn" : otherschool,
    //      "closure_order_yn" : whether,
    //      "pictures_yn" : pictures,
    //      "security_yn" : security,
    //      "docs_attested_yn" : arrested,
    //      "forms_yn" : forms,
    //      };

    //      this.CeoService.getnocceodeatailssave({"records":datas}, true).subscribe((res) => {
    //        if(res){
    //         this.alertService.success("Data Save Successfully");
    //        }
    //        else {
    //         this.alertService.error("Please Fill all the Required Fields");
    //       }
    //      })

    //    }
    //   //  else {
    //   //   for (const key of Object.keys(this.userform.controls)) {
    //   //     if (this.userform.controls[key].invalid) {
    //   //        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
    //   //       console.log('invalid keys', key);
    //   //       // invalidControl.focus();
    //   //        break;
    //   //     }
    //   //   }
    //   //   this.alertService.error('Please Fill All Mandatory Fields');
    //   //   //return true;
    //   // }
    onSaveceo(){
      debugger;
       this.submitted3 = true;
      if (this.ceoform.valid) {
        if(this.docUpload && this.docUpload.length > 0) {
          this.uploadFiles(this.docUpload);
         }
         setTimeout(()=>{    //<<<---    using ()=> syntax
          this.saveAllCeoData();
     }, 6000);
    }
    else {
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
  saveAllCeoData() {
    const interDocsFile =[];
     interDocsFile.push({
  "doc_type":"12",
  "doc_id":"1",
  "doc_file_num":"1234"
});
    let data = {"records":
    {
      "app_type":this.appType,
      "app_id":this.app_id,
      "emis_usertype":this.userTypeID,
      "status":this.ceoform.value.status,
      "inspection_date":this.ceoform.value.inspection_date,
      "recommend":this.ceoform.value.recommend,
      "remarks":this.ceoform.value.remarks,
      "ceo_remarks":this.ceoform.value.ceo_remarks
    }
    }
    var docrecords = {"records":{
        "app_id":this.app_id,
        "user_type":this.userTypeID,
        "inter_doc_detls":interDocsFile,
        "files":this.uploadedFiles
    }
  }
    this.CeoService.getnocdeatailssaveceoform(data).subscribe((res) => {
      if(res.dataStatus == true){
        this.CeoService.saveDocUploads(docrecords).subscribe((response) => {
          if(res.dataStatus == true){
  this.alertService.success("Data Updated Successfully");
}
        })
       }
       else if (res.status==204) {
        this.alertService.error(res.message);
      }
      else if (res.status==404) {
        this.alertService.error(res.message);
      }
     })

  }
  onSavestate(){
     this.submitted4 = true;
    if (this.stateform.valid) {
      debugger;
      if(this.directorUpload && this.directorUpload.length > 0) {
        this.uploadFiles(this.directorUpload);
       }
       if(this.docUpload && this.docUpload.length > 0) {
        this.uploadFiles(this.docUpload);
       }
       setTimeout(()=>{    //<<<---    using ()=> syntax
        this.saveAllStateData();
   }, 6000);
      
}
else {
  for (const key of Object.keys(this.stateform.controls)) {
    if (this.stateform.controls[key].invalid) {
       const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
      console.log('invalid keys', key);
       invalidControl.focus();
       break;
    }
  }
  this.alertService.error('Please Fill All Mandatory Fields');
  //return true;
}
  }
saveAllStateData() {
  const interDocsFile =[];
  interDocsFile.push({
"doc_type":"12",
"doc_id":"1",
"user_type":this.userTypeID,
"doc_file_num":"1234"
});
    let data = {"records":
    {
    "app_type":"3",
    "app_id":this.app_id,
    "emis_usertype":this.userTypeID,
    "status":this.stateform.value.status,
    "order_valid_from_date":this.stateform.value.order_valid_from_date,
    "order_valid_upto_date":this.stateform.value.order_valid_upto_date,
    "order_from_class":this.stateform.value.order_from_class,
    "order_to_class":this.stateform.value.order_to_class,
    "recommend":this.stateform.value.recommend,
    "order_rc_num":this.stateform.value.order_rc_num,
    "order_date":this.stateform.value.order_date,
    "remarks":this.stateform.value.remarks,
    "order_recog_number":this.stateform.value.order_recog_number
  }

    }
    var docrecords = {"records":{
      "app_id":this.app_id,
      "inter_doc_detls":interDocsFile,
      "order_condition_doc":this.otherConditionDocs,
      "user_type":this.userTypeID,
      "files":this.uploadedFiles
  }
} 
// {"records":{
//   "app_id":"30000003",
//   "order_condition_doc":[            
//   {        
//          "order_conditions_filepath":"test/test/orderCond/", 
//          "order_conditions_filename":"doc12", 
//          "order_conditions_filename_coded": "da3ec750-d18e-11ea-86d3-bdebda294482_1.pdf"
//   }],
//  "files":[
//         {"doc_type": 12, "doc_id": 1, "doc_name": "doc12", "doc_name_coded": "da3ec750-d18e-11ea-86d3-bdebda294482_1.pdf"}]
// }}
    this.CeoService.getnocdeatailssavestateform(data).subscribe((res) => {
      console.log("check",res)

      if(res.status==200){
        this.CeoService.saveDocUploads(docrecords).subscribe((response) => {
          if(res.dataStatus == true){
  this.alertService.success("File Uploaded Successfully");
}
        })
       }
       else if (res.status==204) {
        this.alertService.error(res.message);
      }
      else if (res.status==404) {
        this.alertService.error(res.message);
      }
     })

  }
uploadFiles(files) {
  debugger;
  var bucketName= "renewalapplicationemis";
  let expiry:number = 300;
  var docId = 1;
  for (let i = 0; i < files.length; i++) {
    // var ext = files[i].ext;
    // var filename = files[i].filename;
    this.dashboardService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
      if (result) {
        let file : File = files[i].file;
        this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
          if(files[i].type == 'docUpload'){
            this.uploadedFiles.push({
              "doc_id":docId,
              "doc_name" : files[i].filename,
              "doc_name_coded":result.key,
              "doc_type":files[i].docType
            })
          }
          else {
            this.otherConditionDocs.push({
              "order_conditions_filename" : files[i].filename,
              "order_conditions_filename_coded":result.key,
              "order_conditions_filepath":''
            })
          }
     
          docId++;
        });
        
        this.alertService.success("File Uploaded Successfully");
      }
      else {
        this.alertService.error("Error in Uploading File please try again");
      }
    });
 
  }
 
}
onSavepreview(){
  this.router.navigate(['/cbsc-pdf']);
}
downloadMyFile(fileName){
  debugger;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.dashboardService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
          // const link = document.createElement('a');
          // link.setAttribute('target', '_blank');
          // link.setAttribute('href',res.url);
          // // link.setAttribute('download', `products.pdf`);
          // document.body.appendChild(link);
          // link.click();
          // link.remove();
        }
        else {
          this.alertService.error("No files are Found");
        }
      })
  }
  else {
    this.alertService.error("No files are Found");
  }

}
getOrderCopy() {
  this.app_id = '30000056';
  window.open('/nocpdf/' + this.app_id, "_blank");
  window.open('/nocpdf-part2/' + this.app_id, "_blank");
  // this.router.navigate(['nocpdf/'+this.app_id]);
}
getorderCopy2() {
  window.open('/nocpdf-part2/' + this.app_id, "_blank");
}
}

