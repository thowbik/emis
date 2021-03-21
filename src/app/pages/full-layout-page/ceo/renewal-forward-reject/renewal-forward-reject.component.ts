import { Component, OnInit, ElementRef } from '@angular/core';
import { CeoService } from '../ceo.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-renewal-forward-reject',
  templateUrl: './renewal-forward-reject.component.html',
  styleUrls: ['./renewal-forward-reject.component.css']
})
export class RenewalForwardRejectComponent implements OnInit {
  data: any;
  data0: any;
  data1: any;
  data2: any;
  data3 :any;
  data4 :any;
  data5 :any;
  data6 :any;
  data7 :any;
  form: FormGroup;
  prevform: FormGroup;
  submitted4: boolean;
  chooseRecommendations: boolean;
  directorUpload: any[]=[];
  getdatas: any[]=[];
  docUpload: any[]=[];
  uploadedFiles: any[]=[];
  otherCondDoc: any[]=[];
  status: any;
  FormStatus: any[];
  otherConditionDocs: any;
  userTypeID: any;
  BlockName: any;
  app_id: any;
  ceorecommend: any[]=[];
  ceorecommends: any[]=[];
  classList: any[]=[];
  todayDate: string;
  routeData: any;
  schoolId: number;
  school_certi_doc:any[]=[];
  useraction: any;
  recvalue: any;
  stage: any;
  othersCer: any;
  school_certi : FormArray;
  stablitycertificate: any []=[];
  origin: void[];
  schCerti: any;
  closureRemarks: any;
  datevalidUpTo: any;
  fileUploadss: any;
  datasvalue: any;
  index: number;
  save_btn: boolean;
  pdf_btn: boolean;
  userStage: any;
  status_stage: any;
  userStages: any;
  schDirectorateID: any;
  directorate_deo: boolean;
  constructor(private router: Router, private ceoService:CeoService,
    private alertService : AlertService,
    private fb: FormBuilder,
    private el: ElementRef, public UserSessionService :UserSessionService,
    private route: ActivatedRoute) {
      this.userTypeID = this.UserSessionService.userTypeId();
      this.BlockName = this.UserSessionService.blockName();
      this.routeData = this.route.snapshot;
      debugger;
      this.schoolId = this.routeData.queryParams.schoolId;
     }

  ngOnInit() {
    this.initialValidatorss();
    this.getData();
    this.ceorecommend = [
      {label: 'Recommended', value: 'R'},
      {label: 'Request Clarification', value: 'RC'},
      {label: 'Reject', value: 'RJ'},
    ];
    this.ceorecommends = [
      {label: 'Recommended', value: 'R'},
      {label: 'Request Clarification', value: 'RC'},
    ];
    this.classList = [
      { "value": "15", "label": "Pre-KG" },
      { "value": "13", "label": "LKG" },
      { "value": "14", "label": "UKG" },
      { "value": "1", "label": "I" },
      { "value": "2", "label": "II" },
      { "value": "3", "label": "III" },
      { "value": "4", "label": "IV" },
      { "value": "5", "label": "V" },
      { "value": "6", "label": "VI" },
      { "value": "7", "label": "VII" },
      { "value": "8", "label": "VIII" },
      { "value": "9", "label": "IX" },
      { "value": "10", "label": "X" },
      { "value": "11", "label": "XI" },
      { "value": "12", "label": "XII" }
    ];
    this.todayDate = new Date().toISOString().split('T')[0];
  
  }

  page_stage(id){
    // console.log(id, 'ddd')
   this.index = id
  }
  initialValidatorss() {
    this.prevform =this.fb.group({
      'yr_last_renwl': new FormControl('',null),
      'prev_cond_status': new FormControl('',null),
    })
  }
  initialValidators() {
    if(this.userStage == 2){
      this.form =this.fb.group({
        'school_certi': new FormArray([this.createitem_inter_inspection(1)]),
        'user_remarks': new FormControl('',null),
        'doc_inspect_date': new FormControl('',Validators.required),
        'order_valid_from_date': new FormControl('',Validators.required),
        'order_valid_upto_date': new FormControl('',Validators.required),
        'order_from_class': new FormControl('',Validators.required),
        'order_to_class': new FormControl('',Validators.required),
        'recommend': new FormControl('',null),
        'status': new FormControl('',null),
        'remarks': new FormControl('',Validators.required),
        'docUpload': new FormControl('',Validators.required),
        'otherCondDoc': new FormControl('',Validators.required),
        'order_rc_num': new FormControl('',Validators.required),
        'order_date': new FormControl('',Validators.required),
        'officer': new FormControl('',null),
        'order_recog_number': new FormControl('',null),
        'doc_name': new FormControl('',null),
        'other_cond_doc_name': new FormControl('',null),
        'doc_valid_upto_date': new FormControl('',null),
      })
    }
    else {
      this.form =this.fb.group({
        'school_certi': new FormArray([this.createitem_inter_inspection(1)]),
        'user_remarks': new FormControl('',null),
        'doc_inspect_date': new FormControl('',Validators.required),
        'order_valid_from_date': new FormControl('',null),
        'order_valid_upto_date': new FormControl('',null),
        'order_from_class': new FormControl('',null),
        'order_to_class': new FormControl('',null),
        'recommend': new FormControl('',null),
        'status': new FormControl('',null),
        'remarks': new FormControl('',Validators.required),
        'docUpload': new FormControl('',Validators.required),
        'otherCondDoc': new FormControl('',null),
        'order_rc_num': new FormControl('',Validators.required),
        'order_date': new FormControl('',Validators.required),
        'officer': new FormControl('',null),
        'order_recog_number': new FormControl('',null),
        'doc_name': new FormControl('',null),
        'other_cond_doc_name': new FormControl('',null),
        'doc_valid_upto_date': new FormControl('',null),
      })
    }
  }
  createitem_inter_inspection(docId) { 
    return this.fb.group({
      user_remarks: new FormControl('', Validators.required),
      doc_valid_upto_date: new FormControl('', Validators.required),
      doc_description: new FormControl('', null),
      doc_name_coded: new FormControl('', null),
      doc_id: new FormControl(docId, null),
      doc_type: new FormControl('', null),
    });
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
         this.form.controls['other_cond_doc_name'].setValue(splittedName[0]);
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
          this.form.controls['doc_name'].setValue(splittedName[0]);
         }
         else {
          this.form.controls['doc_name'].setValue(splittedName[0]);
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


  getData(){
    var schoolId = this.schoolId;
    this.ceoService.checkSubmission(schoolId).subscribe((res) => {
      this.userStage = res.result[0].status_stage;
      this.stage = res.result[0].status_stage;
      this.getdatas = res.result1;
      this.othersCer = res.result1.length;
      
      if(this.stage == 1 && this.userTypeID == 10){
          this.directorate_deo = true;
        } else {
          this.directorate_deo = false;
        }

      if(res.result[0].status_stage == 2){
        this.initialValidators();
      } else {
        this.initialValidators();
      }

      this.stablitycertificate = res.result1;
      const stablityFormArray = this.form.controls.school_certi as FormArray;
      while (stablityFormArray.length !== 0) {
       stablityFormArray.removeAt(0)
      }
      if(this.stablitycertificate.length > 0) {
        debugger;
        for (let i = 0; i < this.stablitycertificate.length; i++) {
         stablityFormArray.push(this.fb.group({
            app_id: new FormControl(this.stablitycertificate[i].app_id, null),
            doc_type: new FormControl(this.stablitycertificate[i].doc_type, null),
            doc_description: new FormControl(this.stablitycertificate[i].doc_description, null),
            doc_id: new FormControl(this.stablitycertificate[i].doc_id, null),
            // doc_details: new FormControl(this.stablitycertificate[i].doc_details, null),
            // doc_valid_upto_date: new FormControl(this.stablitycertificate[i].doc_valid_upto_date,null),
            // doc_inspect_issue_authority: new FormControl(this.stablitycertificate[i].doc_inspect_issue_authority,null),
            // doc_name: new FormControl(this.stablitycertificate[i].doc_name,null), 
            // user_remarks: new FormControl('',null),
            doc_name_coded: new FormControl(this.stablitycertificate[i].doc_name_coded, null),   
            user_type: new FormControl(this.stablitycertificate[i].user_type, null),   
            user_remarks: new FormControl('', null),   
            doc_valid_upto_date: new FormControl('', null),
            user_type_id: new FormControl('', null),
            id: new FormControl(this.stablitycertificate[i].id, null),
          }))
        }
      }

      if(res.result1.length > 0){
        this.data = res.result[0];
        this.data0 = res.result1[0];
        this.data1 = res.result1[1];
        this.data2 = res.result1[2];
        this.data3 = res.result1[3];
        this.data4 = res.result1[4];
        this.data5 = res.result1[5];
        this.data6 = res.result1[6];
        this.data7 = res.result1[7];
        this.prevform.patchValue(this.data)

        if (this.data['prev_cond_status'] == 1) {
          this.prevform.controls['prev_cond_status'].setValue("Fully Statisfied");
        }
        else if(this.data['prev_cond_status'] == 2){
          this.prevform.controls['prev_cond_status'].setValue("Partly Statisfied");
        }
        else if(this.data['prev_cond_status'] == 3){
          this.prevform.controls['prev_cond_status'].setValue("None Statisfied");
        }
        else {
          this.prevform.controls['prev_cond_status'].setValue("Not Applicable");
        }
      }
    })
  }
  onSave(formStatus){
    this.save_btn = true;
    // console.log(this.save_btn, '----------')
    this.FormStatus = formStatus;
    this.submitted4 = true;

      if (this.form.valid) {
        debugger;
        if(this.directorUpload && this.directorUpload.length > 0) {
         this.uploadFiless(this.directorUpload);
        }
        if(this.docUpload && this.docUpload.length > 0) {
         this.uploadFiles(this.docUpload);
        }
        setTimeout(()=>{    
         this.saveAllStateData();
        }, 6000);
      }
      else {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log('invalid keys', key);
          // invalidControl.focus();
          break;
        }
      }
      this.alertService.error('Please Fill All Mandatory Fields');
      this.save_btn = false;
      //return true;
      }
  }
  saveAllStateData() {

    this.app_id = this.getdatas[0].app_id;
    this.schCerti = this.form.value.school_certi;
    this.fileUploadss = this.schCerti.map(i => { return { app_id: i.app_id, doc_type: i.doc_type, doc_id: i.doc_id, user_type_id: i.user_type_id, user_remarks: i.user_remarks}} );
    this.datevalidUpTo = this.schCerti.map(i => { return { app_id: i.app_id, id: i.id, doc_valid_upto_date: i.doc_valid_upto_date, user_type:i.user_type,}} );


    if(this.stage != 1){
        this.datasvalue = {"mgmt_app_tracking": [{"app_id":this.app_id, "app_type":"1","user_type_id_from":this.userTypeID,"user_action":this.FormStatus,
                                      "user_type_id_to":this.FormStatus,"recommend":this.form.value.recommend,"remarks":this.form.value.remarks,"action_time":"" }],
                          "mgmt_app_status":[{"app_id":this.app_id, "status":this.FormStatus,"status_user":"","status_stage":"","order_filepath":"","order_filename":"",
                                              "order_filename_coded":"","order_conditions_filepath":"","order_conditions_filename":this.otherCondDoc[0].doc_name,
                                              "order_conditions_filename_coded":this.otherCondDoc[0].doc_name_coded,"order_rc_num":this.form.value.order_rc_num,"order_date":this.form.value.order_date,"order_valid_from_date":this.form.value.order_valid_from_date,
                                              "order_valid_upto_date":this.form.value.order_valid_upto_date,"order_from_class":this.form.value.order_from_class,"order_to_class":this.form.value.order_to_class,"updated_at":""}],
                          "mgmt_app_doc_remarks":this.fileUploadss, 
                          }
    } else {
      this.datasvalue = {"mgmt_app_tracking": [{"app_id":this.app_id, "app_type":"1","user_type_id_from":this.userTypeID,"user_action":this.FormStatus,
                                            "user_type_id_to":this.FormStatus,"recommend":this.form.value.recommend,"remarks":this.form.value.remarks,"action_time":"" }],
                        "mgmt_app_status":[{"app_id":this.app_id,"status":this.FormStatus,"status_user":"","status_stage":"","order_filepath":"","order_filename":"",
                                          "order_filename_coded":"","order_conditions_filepath":"","order_conditions_filename":"",
                                          "order_conditions_filename_coded":"","order_rc_num":this.form.value.order_rc_num,"order_date":this.form.value.order_date,"order_valid_from_date":this.form.value.order_valid_from_date,
                                          "order_valid_upto_date":this.form.value.order_valid_upto_date,"order_from_class":this.form.value.order_from_class,"order_to_class":this.form.value.order_to_class,"updated_at":""}],
                        "mgmt_app_doc_remarks":this.fileUploadss, 
                      }
    }

    var validdaterecord = {"mgmt_app_doc_uploads":this.datevalidUpTo}

    var docrecords ={"mgmt_app_doc_uploads":{"app_id":this.getdatas[0].app_id,"doc_type":this.uploadedFiles[0].doc_type,"doc_id":"1","doc_filepath":"","user_type":this.userTypeID,
                      "doc_name":this.uploadedFiles[0].doc_name,"doc_name_coded":this.uploadedFiles[0].doc_name_coded,"doc_inspect_issue_authority":"","doc_inspect_date":this.form.value.doc_inspect_date,
                      "doc_issue_date":"","doc_file_num":this.form.value.order_rc_num,"doc_file_date":this.form.value.order_date,"doc_valid_from_date":"",
                      "doc_valid_upto_date":"","doc_issue_place":this.BlockName,"doc_survey_no":"","doc_details":this.form.value.remarks,
                      "isactive":"1"}}
  
    this.ceoService.saveRenewalData(this.datasvalue).subscribe((res) => {
      if(res.status==200){
        this.ceoService.saveRenewalDocs(validdaterecord).subscribe((response) => {
          if(response.dataStatus == true){
            this.ceoService.saveRenewalDocs(docrecords).subscribe((response) => {
              if(response.dataStatus == true){
                console.log(response.dataStatus)
              }
            })
          }
        })
        this.alertService.success("File Uploaded Successfully");
        if(this.userStage == 1){
          this.router.navigate(['/renewal-application-status'])
        }
        // this.router.navigate(['/renewal-application-status'])
        this.save_btn = false;
        // console.log(this.save_btn, '----------')
        this.pdf_btn = true;
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
      this.ceoService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
        if (result) {
          let file : File = files[i].file;
          this.ceoService.uploadFile(result.url,file).subscribe((res) => {
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

  uploadFiless(files) {
    debugger;
    var bucketName= "renewalapplicationemis";
    let expiry:number = 300;
    var docId = 1;
    for (let i = 0; i < files.length; i++) {
      this.ceoService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
        if (result) {
          let file : File = files[i].file;
          this.ceoService.uploadFile(result.url,file).subscribe((res) => {
            if(files[i].type == 'otherCondDoc'){
              this.otherCondDoc.push({
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

downloadMyFile(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

downloadMyFile1(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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


downloadMyFile2(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

downloadMyFile3(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

downloadMyFile4(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

downloadMyFile5(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

downloadMyFile6(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

downloadMyFile7(e){
  debugger;
  var fileName = e;
  if(fileName) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
        this.ceoService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
        if (res) {
          window.open(res.url, "_blank");
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

chooseRecommendation(value) {
  this.chooseRecommendations = true;
  this.recvalue = value;
}

getOrderCopy(){
  var schoolId = this.schoolId;
  this.router.navigate(['/renewal-pdf'], { queryParams: { 'schoolId': schoolId }, skipLocationChange: false });

}
}

