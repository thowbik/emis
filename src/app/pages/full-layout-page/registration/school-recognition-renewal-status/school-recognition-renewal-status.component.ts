import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { RegistrationService } from '../registration.service';
import { UserSessionService } from 'src/services/usersession.service';
import { StateDashboardService } from '../../statedashboard/dashboard.services';

@Component({
  selector: 'app-school-recognition-renewal-status',
  templateUrl: './school-recognition-renewal-status.component.html',
  styleUrls: ['./school-recognition-renewal-status.component.css']
})
export class SchoolRecognitionRenewalStatusComponent implements OnInit {
  form : FormGroup;
  inter_inspection: FormArray;
  final_condition: FormArray;
  uploadedFiles: any[] = [];
  Selected_School_Name: any;
  Listtypedropvalue: { label: string; value: number; }[];
  Selected_School_Id: any;
  noDataFound: boolean;
  school_list: any;
  headerss: any;
  building_docu:any[]=[];
  building_lic:any[]=[];
  school_certi_doc:any[]=[];
  fire_safety:any[]=[];
  sanitary_certificate:any[]=[];
  remarksData:any[]=[];
  userTypeID: any;
  clonedCars: any;
  details_page: boolean;
  school_list_page: boolean;
  interm_inspct: any []=[];
  final_conditin: any []=[];
  buildingDocumentList: any;
  stablitycertificate: any;
  building_licence: any;
  get_fire_saft: any;
  get_sant_saft: any;
  schl_certifi: any;
  // currnt_stage: any;
  // final_stage: any;
  recommend: { label: string; value: string; }[];
  submitted: boolean;
  class_from_to_dropvalue: { label: string; value: string; }[];
  app_typ: string;
  final_Data: any []=[];
  int_Data : any []=[];
  approving_authority: any;
  final_stage: boolean;
  dist_list: any;
  noDataFound_dist: boolean;
  district_list_page: boolean;
  inter_stage: boolean;
  selct_status_usr: any;
  button_disable: boolean;
  button_enable: boolean;
  msgs: { severity: string; summary: string; detail: string; }[];
  select_dist_id: any;
  display: boolean;
  constructor(public fb :FormBuilder,private dashboardService:StateDashboardService,
    public usersessionservice : UserSessionService,public alertService:AlertService, public registrationservice : RegistrationService, private el: ElementRef) { 
    this.userTypeID= this.usersessionservice.userTypeId();
  }

  cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: '', header: 'School Name / UDISE Code',widthstyle: '10em'},
  { field: '', header: 'School Profile',widthstyle: '4em'},
  { field: '', header: 'Days Pending',widthstyle: '3em'},
  { field: '', header: 'Waiting For',widthstyle: '3em'},
  // { field: '', header: 'Status',widthstyle: '3em'},
  ];

  dist_cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: '', header: 'District',widthstyle: '4em'},
  { field: '', header: 'Email',widthstyle: '4em'},
  ];

  detail_cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: '', header: 'Certificate / Orders',widthstyle: '3em'},
  { field: '', header: ' Fees / Details',widthstyle: '3em'},
  { field: '', header: 'Files / Validity',widthstyle: '3em'},
  { field: '', header: 'Comments / Remarks',widthstyle: '3em'},
  { field: '', header: 'Action',widthstyle: '3em'},
  ];

 
  ngOnInit() {
    // this.confirm1();
    if(this.userTypeID == 5) {
     this.district_list();
    }
    else{
      this.getschoollist();
    }
    // this.getschoolname(20000000,"vignesh");
    this.app_typ = "2"
    this.recommend = [
      {label: 'Recommended', value: 'R'},
      {label: 'Not Recommended', value: 'RC'},
      {label: 'Request Clarification', value: '2'},
    ];
  
    this.Listtypedropvalue = [
      {label:' Waiting/Not Viewd', value: 1},
      {label:'Approved', value: 2},
      {label:'Rejected', value:3},
      {label:'In Reset Queue', value:4},
      {label:'Send To Reset Queue', value:5},
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
  }

  get_dist_id(dist_id){
    this.district_list_page=false; 
    this.school_list_page=true; 
    debugger
    this.select_dist_id = dist_id;
    debugger
    // this.alertService.success(dist_id);
    var dist_records = {
      "dist_id": dist_id,
      // "inter_doc_detls":this.int_Data,
    }
  this.registrationservice.schools_list_API({"records":dist_records} , true).subscribe((res) => {
      console.log("disrt detail",res.schl_list);
      if(res.schl_list.length > 0 ) {
        this.school_list = res.schl_list;
        this.noDataFound = false;
      }
      else { 
        this.noDataFound = true;
      }
    })
  }

  district_list(){
    this.district_list_page=true; 
    this.registrationservice.all_district_API_1().subscribe((res) => {
      console.log("disrt detail",res.result.schooldist);
  
      if(res.result.schooldist.length > 0 ) {
        this.dist_list = res.result.schooldist;
        this.noDataFound_dist = false;
      }
      else { 
        this.noDataFound_dist = true;
      }
    })
  }
  createitem_inter_inspection(docId) { 
    return this.fb.group({
      doc_id: new FormControl(docId, null),
      user_type: new FormControl(this.userTypeID, Validators.required),
      doc_type: new FormControl('12', Validators.required),
      inspection_date: new FormControl('', Validators.required),
      doc_file_num: new FormControl('', Validators.required),
      recommend: new FormControl('', Validators.required),
      remarks: new FormControl('', Validators.required),
      doc_name: new FormControl('',Validators.required),
    });
  }
  createitem_final_conditon(docId) { 
    return this.fb.group({
      doc_id: new FormControl(docId, null),
      user_type: new FormControl(this.userTypeID, Validators.required),
      doc_type: new FormControl('11', Validators.required),
      from_cls: new FormControl('', Validators.required),
      to_cls: new FormControl('', Validators.required),
      doc_valid_from_date: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_name: new FormControl('',  Validators.required),
      order_date: new FormControl('', Validators.required),
      order_recog_number: new FormControl('', Validators.required),
      order_rc_num: new FormControl('', Validators.required),
    });
  }

  save_1(doc_typ, app_id){
    // this.alertService.success(doc_typ);
    // this.alertService.warning(app_id);
  }

  save_inspecion_data(status){
    this.submitted = true;

    if (this.form.valid) { 
    this.display=true;
    if(this.interm_inspct && this.interm_inspct.length > 0) {
      this.uploadFiles(this.interm_inspct,12);
     }
     if(this.final_conditin && this.final_conditin.length > 0) {
      this.uploadFiles(this.final_conditin,11);
     }
     setTimeout(()=>{ 
        this.save_inspect_data(status);
     }, 3000 );
    }
    else{
    this.display=false;
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

  save_inspect_data(status){
 // "status":"1", Approve 1 ,reject 2
 if(this.approving_authority === this.userTypeID){
   
     let final_data_array = [];
          var final_data_filter = this.uploadedFiles; 
        debugger;
          debugger
        var finadoc = final_data_filter.filter(item=> item.doc_type == 11);
        if(finadoc.length > 0) {
          for (let i = 0; i < finadoc.length; i++) {
            final_data_array.push(finadoc[i]);
            }
          }
          else{
            console.log("doc tp not found");
          }
          this.final_Data = final_data_array.map(l => { return { order_conditions_filepath:"", order_conditions_filename:l.doc_name,  order_conditions_filename_coded:l.doc_name_coded }; });
      let inter_data_array = [];
            var inter_inspect_filter = this.form.value.inter_inspection; 
          debugger;
          var intdoc = inter_inspect_filter.filter(item=> item.doc_file_num != '' && item.doc_file_num != null);
          if(intdoc.length > 0) {
            for (let i = 0; i < intdoc.length; i++) {
              inter_data_array.push(intdoc[i]);
              }
            }
            this.int_Data = inter_data_array.map(l => { return { doc_type: l.doc_type, doc_id:l.doc_id,  doc_file_num:l.doc_file_num, user_type: this.userTypeID, doc_inspect_date:l.inspection_date  }; });
       

  var final_doc_records = {
    "app_id": this.Selected_School_Id,
    "inter_doc_detls":this.int_Data,
    "order_condition_doc":this.final_Data,
    "files":this.uploadedFiles,
  }

  var final_records = {
    "app_type": this.app_typ,    
    "app_id":this.Selected_School_Id, 
    "emis_usertype":this.userTypeID,   
    "status": status, //forward  or reject
    // "file_num":this.form.value.inter_inspection[0].doc_file_num,
    "recommend":this.form.value.inter_inspection[0].recommend,
    "remarks":this.form.value.inter_inspection[0].remarks,
    "order_valid_from_date":this.form.value.final_condition[0].doc_valid_from_date,
    "order_valid_upto_date":this.form.value.final_condition[0].doc_valid_upto_date,
    "order_from_class":this.form.value.final_condition[0].from_cls,
    "order_to_class":this.form.value.final_condition[0].to_cls,
    "order_date":this.form.value.final_condition[0].order_date,
    "order_recog_number":this.form.value.final_condition[0].order_recog_number,
    "order_rc_num":this.form.value.final_condition[0].order_rc_num,
   }
  console.log(final_records,"final_records");
  console.log(final_doc_records,"final_doc_records");
 
  this.registrationservice.school_details_Doc_API_3({"records":final_doc_records}, true).subscribe((res) => {
    if(res){
       this.registrationservice.final_approval_data_API({"records":final_records}, true).subscribe((res) => {
       if(res.status != 200){
        this.alertService.error(res.message);
        this.display=false;
       }
       else {
        this.alertService.success("Data Saved Successfully");
        this.display=false;
        this.get_dist_id(this.select_dist_id );
        this.submitted = false;
      }
     })
    }
    else {
      this.alertService.error(res.message);
      this.display=false;
    }
  })
 }
else {
  let inter_data_array = [];
      var inter_inspect_filter = this.form.value.inter_inspection; 
    debugger;
    var bulidoc = inter_inspect_filter.filter(item=> item.doc_file_num != '' && item.doc_file_num != null);
    if(bulidoc.length > 0) {
      for (let i = 0; i < bulidoc.length; i++) {
        inter_data_array.push(bulidoc[i]);
        }
      }
      this.remarksData = inter_data_array.map(l => { return { doc_type: l.doc_type, doc_id:l.doc_id,  doc_file_num:l.doc_file_num ,doc_inspect_date:l.inspection_date }; });
 
      var doc_records = {
    "app_id": this.Selected_School_Id,
    "inter_doc_detls":this.remarksData,
    "files":this.uploadedFiles,
    // "inspection_date":this.form.value.inter_inspection[0].inspection_date,
  }
  var intermediate_records = {
    "app_type": this.app_typ,    
    "app_id":this.Selected_School_Id, 
    "emis_usertype":this.userTypeID,   
    "status": status,  //forward 3 or reject 2
    "recommend":this.form.value.inter_inspection[0].recommend,
    "remarks":this.form.value.inter_inspection[0].remarks,
    // "ceo_remarks":"",
    }
    console.log(intermediate_records,"inter_inspections");
    console.log(doc_records,"inter_doc_detls");

    this.registrationservice.school_details_Doc_API_3({"records":doc_records}, true).subscribe((res) => {
      if(res){
        console.log("success doc data");
         this.registrationservice.Forwrd_reject_data_API({"records":intermediate_records}, true).subscribe((res) => {
         if(res.status != 200){
           debugger;
          this.alertService.error(res.message);
          this.display=false;
         }
         else {
          this.alertService.success("Data Saved Successfully");
          this.display=false;
          this.getschoollist();
          this.submitted = false;
        }
       })
      }
      else {
        debugger;
        this.alertService.error(res.message);
        this.display=false;
      }
    })
   }
  }

  Home_page(){
    this.getschoollist();
    this.details_page=false;
  }

  Dist_Home_page(){
    this.district_list();
    this.details_page=false;
    this.school_list_page=false; 
  }

  getschoollist(){
    this.school_list_page=true; 
    this.registrationservice.school_list_API().subscribe((res) => {
    console.log("sch detail",res.schl_list);

    if(res.schl_list.length > 0 ) {
      this.school_list = res.schl_list;
      this.noDataFound = false;
    }
    else { 
      this.noDataFound = true;
    }
  })
 }

  doc_remark_sav(){
    let remarksArray = [];
    var schcertDoc = this.form.value.school_certi_doc;
    var schcertiDoc = schcertDoc.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(schcertiDoc.length > 0) {
      for (let i = 0; i < schcertiDoc.length; i++) {
      remarksArray.push(schcertiDoc[i]);
      }
    }

    var builddoc = this.form.value.building_document; 
    debugger;
    var bulidoc = builddoc.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(bulidoc.length > 0) {
      for (let i = 0; i < bulidoc.length; i++) {
        remarksArray.push(bulidoc[i]);
        }
      }

    var buildStable = this.form.value.building_stab_certi; 
    debugger;
    var bulidSta = buildStable.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(bulidSta.length > 0) {
      for (let i = 0; i < bulidSta.length; i++) {
        remarksArray.push(bulidSta[i]);
        }
      }

    var buildLicense = this.form.value.building_licence; 
    var bulidLic = buildLicense.filter(item=> item.user_remarks != '' && item.user_remarks != null);
    if(bulidLic.length > 0) {
      for (let i = 0; i < bulidLic.length; i++) {
        remarksArray.push(bulidLic[i]);
        }
      }

    var sanitaryCertificate = this.form.value.sanitary_certificate[0];
    if(sanitaryCertificate.user_remarks != '' && sanitaryCertificate.user_remarks != null){
      remarksArray.push(sanitaryCertificate);
     } 
    
    var fireSafety = this.form.value.fire_safety[0]; 
    if(fireSafety.user_remarks != '' && fireSafety.user_remarks != null){
      remarksArray.push(fireSafety);
     }
    console.log(this.remarksData,"this.remarksData1");

    this.remarksData = remarksArray.map(l => { return { app_id: this.Selected_School_Id, doc_type: l.doc_type, doc_id:l.doc_id,user_type_id:this.userTypeID,user_remarks:l.user_remarks }; });
       var records = {
        "records":this.remarksData} 
        console.log(this.remarksData,"this.remarksData");
        
    this.registrationservice.saveremarks(records,true).subscribe(result => {
          if (result) {
            this.alertService.success(result.message);
          }
        });
      }
  getschoolname(id,name,status_usr){
    this.school_list_page=false;
    this.details_page=true;
    this.Selected_School_Name=name;
    this.Selected_School_Id=id;
    this.selct_status_usr = status_usr;

    this.headerss=this.Selected_School_Name + " ( " + this.Selected_School_Id + " ) "; 
  if (this.details_page) {
    if( this.selct_status_usr == this.userTypeID){
      debugger;
      this.button_disable= false;
      this.button_enable= true;
    }
    else {
      debugger;
      this.button_disable= true;
      this.button_enable= false;
    }
    this.inter_stage=true;
    this.final_stage=false;
    debugger;
    this.form = this.fb.group({ 
      'inter_inspection': new FormArray([this.createitem_inter_inspection(1)]),
      'final_condition': new FormArray([]),

      'from_cls': new FormControl('',null),
      'to_cls': new FormControl('',null),
      'doc_valid_from_date': new FormControl('',null),
      'doc_valid_upto_date': new FormControl('',null),
      'Condition_remarks': new FormControl('',null),
      'order_date': new FormControl('',null),
      'order_recog_number': new FormControl('',null),
      'order_rc_num': new FormControl('',null),

      'doc_name': new FormControl('',null),
      'recommend': new FormControl('',null),
      'remarks': new FormControl('',null),
      'doc_file_num': new FormControl('',null),
      'inspection_date': new FormControl('',null),
     
      'building_document': new FormArray([]),
      'building_licence': new FormArray([]),
      'building_stab_certi': new FormArray([]),
      'school_certi_doc': new FormArray([]),
      'fire_safety': new FormArray([]),
      'sanitary_certificate': new FormArray([]),
    });
    debugger;
  }
  else{
    this.alertService.info("Details Page Not Open");
  }
   this.registrationservice.get_saved_doc_details(this.Selected_School_Id).subscribe((res) => {
    debugger
    console.log("sch details",res.docs);

    this.approving_authority=res.docs.application_status.approving_authority;
    // this.currnt_stage=res.docs.application_status.currnt_stage;
    // this.final_stage=res.docs.application_status.final_stage;
    
    console.log("this.userTypeID",this.userTypeID);
    console.log("this.userTypeID1",this.approving_authority);
    
              
      if (this.approving_authority === this.userTypeID){
        debugger;
        this.inter_stage = false;
        this.final_stage = true; 
    this.form = this.fb.group({ 
      'inter_inspection': new FormArray([this.createitem_inter_inspection(1)]),
      'final_condition': new FormArray([this.createitem_final_conditon(1)]),

      'from_cls': new FormControl('',null),
      'to_cls': new FormControl('',null),
      'doc_valid_from_date': new FormControl('',null),
      'doc_valid_upto_date': new FormControl('',null),
      'Condition_remarks': new FormControl('',null),
      'order_date': new FormControl('',null),
      'order_recog_number': new FormControl('',null),
      'order_rc_num': new FormControl('',null),

      'doc_name': new FormControl('',null),
      'recommend': new FormControl('',null),
      'remarks': new FormControl('',null),
      'doc_file_num': new FormControl('',null),
      'inspection_date': new FormControl('',null),
     
      'building_document': new FormArray([]),
      'building_licence': new FormArray([]),
      'building_stab_certi': new FormArray([]),
      'school_certi_doc': new FormArray([]),
      'fire_safety': new FormArray([]),
      'sanitary_certificate': new FormArray([]),
    });
  }

    /*Building Documents */
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
                 doc_inx_id: new FormControl(this.buildingDocumentList[i].doc_inx_id, null),
                 doc_id: new FormControl(this.buildingDocumentList[i].doc_id, null),
                 doc_details: new FormControl(this.buildingDocumentList[i].doc_details, null),
                 doc_valid_upto_date: new FormControl(this.buildingDocumentList[i].doc_valid_upto_date,null),
                 doc_name: new FormControl(this.buildingDocumentList[i].doc_name, null),  
                 doc_name_coded: new FormControl(this.buildingDocumentList[i].doc_name_coded, null),   
                user_remarks: new FormControl(this.buildingDocumentList[i].user_remarks, null),
               }))
             }
           }
     }
 /*Building Licence */
 this.building_licence = res.docs.building_license;
    const LicenceFormArray = this.form.controls.building_licence as FormArray;
    while (LicenceFormArray.length !== 0) {
      LicenceFormArray.removeAt(0)
    }
    if(this.building_licence.length > 0) {
      debugger;
      for (let i = 0; i < this.building_licence.length; i++) {
        LicenceFormArray.push(this.fb.group({
          doc_type: new FormControl(this.building_licence[i].doc_type, null),
          doc_survey_no: new FormControl(this.building_licence[i].doc_survey_no, null),
          doc_id: new FormControl(this.building_licence[i].doc_id, null),
          doc_details: new FormControl(this.building_licence[i].doc_details, null),
          doc_valid_upto_date: new FormControl(this.building_licence[i].doc_valid_upto_date,null),
          doc_inspect_issue_authority: new FormControl(this.building_licence[i].doc_inspect_issue_authority,null),
          doc_name: new FormControl(this.building_licence[i].doc_name, null), 
          user_remarks: new FormControl(this.building_licence[i].user_remarks, null),
          doc_name_coded: new FormControl(this.building_licence[i].doc_name_coded, null),   
        }))
      }
    }
     /*Building Stablity */
     this.stablitycertificate = res.docs.building_stab_certi;
     const stablityFormArray = this.form.controls.building_stab_certi as FormArray;
     while (stablityFormArray.length !== 0) {
      stablityFormArray.removeAt(0)
     }
     if(this.stablitycertificate.length > 0) {
       debugger;
       for (let i = 0; i < this.stablitycertificate.length; i++) {
        stablityFormArray.push(this.fb.group({
           doc_type: new FormControl(this.stablitycertificate[i].doc_type, null),
           doc_survey_no: new FormControl(this.stablitycertificate[i].doc_survey_no, null),
           doc_id: new FormControl(this.stablitycertificate[i].doc_id, null),
           doc_details: new FormControl(this.stablitycertificate[i].doc_details, null),
           doc_valid_upto_date: new FormControl(this.stablitycertificate[i].doc_valid_upto_date,null),
           doc_inspect_issue_authority: new FormControl(this.stablitycertificate[i].doc_inspect_issue_authority,null),
           doc_name: new FormControl(this.stablitycertificate[i].doc_name,null), 
           user_remarks: new FormControl(this.stablitycertificate[i].user_remarks,null),
           doc_name_coded: new FormControl(this.stablitycertificate[i].doc_name_coded, null),   
         }))
       }
     }
     

      /*School Certificate  building_lic*/
      this.schl_certifi = res.docs.schl_certifi_detls;
      const schcertiFormArray = this.form.controls.school_certi_doc as FormArray;
      while (schcertiFormArray.length !== 0) {
        schcertiFormArray.removeAt(0)
      }
      if(this.schl_certifi.length > 0) {
        debugger;
        for (let i = 0; i < this.schl_certifi.length; i++) {
          schcertiFormArray.push(this.fb.group({
            doc_type: new FormControl(this.schl_certifi[i].doc_type, null),
            doc_file_num: new FormControl(this.schl_certifi[i].doc_file_num, null),
            doc_survey_no: new FormControl(this.schl_certifi[i].doc_survey_no, null),
            doc_issue_place: new FormControl(this.schl_certifi[i].doc_issue_place, null),
            doc_file_date: new FormControl(this.schl_certifi[i].doc_file_date, null),
            doc_id: new FormControl(this.schl_certifi[i].doc_id, null),
            doc_details: new FormControl(this.schl_certifi[i].doc_details,null),
            doc_valid_upto_date: new FormControl(this.schl_certifi[i].doc_valid_upto_date,null),
            doc_inspect_issue_authority: new FormControl(this.schl_certifi[i].doc_inspect_issue_authority,null),
            doc_name: new FormControl(this.schl_certifi[i].doc_name, null), 
            user_remarks: new FormControl(this.schl_certifi[i].user_remarks, null),
            doc_name_coded: new FormControl(this.schl_certifi[i].doc_name_coded, null),   
          }))
        }
      }

       /*Sanitory Certificate  building_lic*/
       this.get_sant_saft = res.docs.sanitary_certi ;
       const SanitoryFormArray = this.form.controls.sanitary_certificate as FormArray;
       while (SanitoryFormArray.length !== 0) {
        SanitoryFormArray.removeAt(0)
       }
       if(this.get_sant_saft.length > 0) {
         debugger;
         for (let i = 0; i < this.get_sant_saft.length; i++) {
          SanitoryFormArray.push(this.fb.group({
             doc_type: new FormControl(this.get_sant_saft[i].doc_type, null),
            doc_file_num: new FormControl(this.get_sant_saft[i].doc_file_num, null),
            doc_file_date: new FormControl(this.get_sant_saft[i].doc_file_date, null),
            doc_inspect_date: new FormControl(this.get_sant_saft[i].doc_inspect_date, null),
             doc_id: new FormControl(this.get_sant_saft[i].doc_id, null),
             doc_details: new FormControl(this.get_sant_saft[i].doc_details, null),
             doc_valid_upto_date: new FormControl(this.get_sant_saft[i].doc_valid_upto_date,null),
             doc_inspect_issue_authority: new FormControl(this.get_sant_saft[i].doc_inspect_issue_authority,null),
             doc_name: new FormControl(this.get_sant_saft[i].doc_name, null), 
             user_remarks: new FormControl(this.get_sant_saft[i].user_remarks,null),
             doc_name_coded: new FormControl(this.get_sant_saft[i].doc_name_coded, null),   
           }))
         }
       }

        /*Fire Certificate  building_lic*/
        this.get_fire_saft = res.docs.fire_safety ;
        console.log(this.get_fire_saft,"this.get_fire_saft");        
      const FireFormArray = this.form.controls.fire_safety as FormArray;
      while (FireFormArray.length !== 0) {
        FireFormArray.removeAt(0)
      }
      if(this.get_fire_saft.length > 0) {
        debugger;
        for (let i = 0; i < this.get_fire_saft.length; i++) {
          FireFormArray.push(this.fb.group({
            doc_type: new FormControl(this.get_fire_saft[i].doc_type, null),
            doc_file_num: new FormControl(this.get_fire_saft[i].doc_file_num, null),
            doc_file_date: new FormControl(this.get_fire_saft[i].doc_file_date, null),
            doc_inspect_date: new FormControl(this.get_fire_saft[i].doc_inspect_date, null),
            doc_id: new FormControl(this.get_fire_saft[i].doc_id, null),
            doc_details: new FormControl(this.get_fire_saft[i].doc_details, null),
            doc_valid_upto_date: new FormControl(this.get_fire_saft[i].doc_valid_upto_date,null),
            doc_inspect_issue_authority: new FormControl(this.get_fire_saft[i].doc_inspect_issue_authority,null),
            doc_name: new FormControl(this.get_fire_saft[i].doc_name, null), 
            user_remarks: new FormControl(this.get_fire_saft[i].user_remarks, null),
            doc_name_coded: new FormControl(this.get_fire_saft[i].doc_name_coded, null),   
          }))
        }
      }
    })
  }
  uploadFiles(files, docType) {
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
              case 'interm_inpsection_file':
                debugger
                this.interm_inspct.push({
                  "filename" : splittedName[0],
                  "ext":splittedName[splittedName.length-1],
                  "file":event.target.files[0],
                  "docId":1
                });
                (<FormArray>this.form.controls['inter_inspection']).at(index).patchValue({doc_name: splittedName[0]});
                break;
                case 'finals_condition':
                  this.final_conditin.push({
                    "filename" : splittedName[0],
                    "ext":splittedName[splittedName.length-1],
                    "file":event.target.files[0],
                    "docId":1
                  });
                  (<FormArray>this.form.controls['final_condition']).at(index).patchValue({doc_name: splittedName[0]});
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






}


