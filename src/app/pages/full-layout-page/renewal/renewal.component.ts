import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RenewalService } from '../renewal/renewal.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavigationService } from 'src/services/navigation.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { DatePipe, formatDate } from '@angular/common';
import {MessagesModule} from 'primeng/messages';
import { Router } from '@angular/router';
import { StateDashboardService } from '../statedashboard/dashboard.services';


@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit {
  public SchoolEdu: { name: string; code: string; }[];
  renewalForm: FormGroup;
  getForm: FormGroup;
  exsitsRTE:any;
  last_year_renewal_date:any;
  renewalDate:any;
  exist_msg:any;
  files:any;
  msgs = [];
  others:any;
  date_renewal:any;
  MB:any;
  school_key_id:any;
  ifsc_get_code:any;
  bank_code:any;
  TotalFileSize :any;
  udis_code:any;
  pending_days:any;
  status_user:any;
  app_submit_date:any;
  app_id: any;
  addr:any;
  school_name:any;
  Ifsc_code:any;
  filesource:any;
  formvalues:any=[];
  name:any = [];
  pipe = new DatePipe('en-US');
  school_id:any;
  file_event_length:any;
  submitted = false;
  appointmentTime  = new Date();
  limitChar_amount:any;
  limitChar_year_digit:any;
  manage_name:any;
  management:any;
  departement:any;
  key:any;
  pattern:any;
  accept_types:any;
  createddate: string;
  date: string;
  docUploads: any[]=[];
  uploadedFiles: any[]=[];
  distId: number;
  schDirectorateId: any;
  schMgmtId: any;
  schCateId: any;
  docsData: any[]=[];
  reportdata: any;
  public pageStage: number;
  userStatus: any;
  districtwise: any[] = [];
  districtwises: any[] = [];
  status_users: any;
  statuss: any;
  ifscc_code: any;
  bank_detail: any;
  minDate: Date;
  maxDate: any;
  todayDate: string;
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  Renewalstatus: any;
  origin: any;
  save_btn: boolean;
  userTypeID: any;
  appIds: any;
  conditioncopy: any;
  fileStatus: any;

  constructor(public router:Router,public AlertService:AlertService,private el: ElementRef,
    public form:FormBuilder,
    public RenewalService:RenewalService,public userSessionService:UserSessionService) {
    this.distId = this.userSessionService.districtId();
    this.school_id = this.userSessionService.schoolId();
    this.userTypeID = this.userSessionService.userTypeId();
  }

  ngOnInit() {
    this. GetAlreadyExistRenewal();
    this.accept_types="application/pdf,image/png, image/jpeg";
    this. GetSchoolDetails();
    this.getRenewalSchoolList();
    this.getDocsRenewal();
    this.getstatusData();
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
    this.Ifsc_code ="^[A-Za-z]{4}0[A-Z0-9a-z]{6}$";
    this.limitChar_amount = "5";
    this.limitChar_year_digit="4";
    
    this.SchoolEdu = [
      {name: 'Directorate of School Education', code: '1'},
      {name: 'Directorate of School', code: '2'},
      {name: 'School Education', code: '3'}
    ];

    this.pattern = "^[A-Z]{4}[0][A-Z0-9]{6}$";
    this.renewalForm = this.form.group({
      'school_name': new FormControl('',null),
      'udise_code': new FormControl('',null),
      'address1': new FormControl('',null),
      'address2': new FormControl('',null),
      'management_category': new FormControl('',null),
      'year_last_renewal': new FormControl('',null),
      'condition': new FormControl('',Validators.required),
      'challan': new FormControl('',null),
      'challan_date': new FormControl('',Validators.required),
      'challan_no': new FormControl('',Validators.required),
      'amount': new FormControl('',Validators.required),
      'ifsc_code': new FormControl('',[Validators.required,Validators.pattern(this.pattern)]),
      'category': new FormControl('',null),
      'affiliation': new FormControl('',null),
      'last_renewal_year': new FormControl('',null),
      // 'last_renewal_file': new FormControl('',Validators.required),
      'renewal_fileSource': new FormControl('',null),
      /*file upload */
      'building_stability': new FormControl('',Validators.required),
      'building_licence': new FormControl('',Validators.required),
      'sanitary': new FormControl('',Validators.required),
      'fire_safety': new FormControl('',Validators.required),
      'building_plan': new FormControl('',Validators.required),
      'other_files': new FormControl('',null),
      'upload_challan': new FormControl('',Validators.required),
      'renewal_order': new FormControl('',Validators.required),
      'endowment_bank_branch': new FormControl('',null),
      'endowment_bank_name': new FormControl('',null),
    });
    this.dataHeader = [
      { field: 'app_id', header: ' Action', widthstyle: '6em' },
     { field: 'app_submit_date', header: 'BY' , widthstyle: '5em'},
     { field: 'status_user', header: 'TO', widthstyle: '5em' },
     { field: 'pending_days', header: 'Date', widthstyle: '4em' },
     { field: 'pending_days', header: 'Remarks', widthstyle: '4em' },
    ];
    
  }
  
  onSelectFile(event,type) {
    debugger;

   if (event.target.files && event.target.files[0]) {
     var fileName = event.target.files[0].name;
     var splittedName = fileName.split(".");
     if(splittedName[splittedName.length-1] == 'pdf')
     {
       
     if (event.target.files[0].size <= 8000000) {
       switch(type){
         case 'building_stability':
           this.docUploads.push({
             "filename" : splittedName[0],
             "ext":splittedName[splittedName.length-1],
             "file":event.target.files[0],
             "docId":"1",
             "docType":"6"
           });
           this.renewalForm.controls['building_stability'].setValue(splittedName[0]);
           break;
           case 'building_licence':
             this.docUploads.push({
               "filename" : splittedName[0],
               "ext":splittedName[splittedName.length-1],
               "file":event.target.files[0],
               "docId":'1',
               "docType":"7"
             });
             this.renewalForm.controls['building_licence'].setValue(splittedName[0]);
             
             break;

             case 'sanitary':
               debugger;
             this.docUploads.push({
               "filename" : splittedName[0],
               "ext":splittedName[splittedName.length-1],
               "file":event.target.files[0],
               "docId":'1',
               "docType":"8"
             });
             this.renewalForm.controls['sanitary'].setValue(splittedName[0]);
             break;
   
         case 'fire_safety':
           this.docUploads.push({
             "filename" :splittedName[0],
             "ext" : splittedName[splittedName.length-1],
             "file":event.target.files[0],
             "docId":"1",
             "docType":"9"
           });
           this.renewalForm.controls['fire_safety'].setValue(splittedName[0]);
           break;
         case 'building_plan':
            this.docUploads.push({
            "filename":splittedName[0],
            "ext":splittedName[splittedName.length-1],
            "file":event.target.files[0],
            "docId":"1",
            "docType":"5"
            });
            this.renewalForm.controls['building_plan'].setValue(splittedName[0]);
           break;
         case 'other_files':
             this.docUploads.push({
               "filename" : splittedName[0],
               "ext":splittedName[splittedName.length-1],
               "file":event.target.files[0],
               "docId":"1",
               "docType":"99"
             });
             this.renewalForm.controls['other_files'].setValue(splittedName[0]);
             break;
             case 'upload_challan':
              this.docUploads.push({
                "filename" : splittedName[0],
                "ext":splittedName[splittedName.length-1],
                "file":event.target.files[0],
                "docId":"1",
                "docType":"13"
              });
              this.renewalForm.controls['upload_challan'].setValue(splittedName[0]);
              break;
              case 'renewal_order':
                this.docUploads.push({
                  "filename" : splittedName[0],
                  "ext":splittedName[splittedName.length-1],
                  "file":event.target.files[0],
                  "docId":"1",
                  "docType":"3"
                });
                this.renewalForm.controls['renewal_order'].setValue(splittedName[0]);
                break;
         default:
           break;
       }
       const fileReader: FileReader = new FileReader();
       fileReader.readAsDataURL(event.target.files[0]);
       fileReader.onload = (event: Event) => {

       };
     } else {
       this.AlertService.error("File Can`t uploaded because Image size should not exceed 2MB");
     }
   }
     else {
       this.AlertService.error("Only Pdf files are allowed to Upload");
     }
   }
 }
  get eval() { return this.renewalForm.controls; }
  eventHandler(event)
  {
    this.key = event.target.value;
    // console.log(this.key);
   if(this.key == this.bank_code)
   {
      this.msgs.push({severity:'info', summary:'BANK Details<BR>', detail:this.ifsc_get_code});
    //  console.log(this.key);
    // console.log(this.ifsc_get_code);
   }
  }

  SaveRenewal()
  {
    this.submitted = true;
        if(this.name['last_renewal'][0] || this.name['certificate_1'][0] || this.name['certificate_2'][0] || this.name['certificate_3'][0] || this.name['certificate_4'][0] || this.name['certificate_5'][0] ||this.name['challan'][0]) 
        {
           if(!this.name['certificate_6'])
           {
            this.others = 0;
            console.log(this.others);

           }
           else
           {
            this.others = this.name['certificate_6'][0].size;
            console.log(this.others);
           }
          this.TotalFileSize = this.name['last_renewal'][0].size + this.name['certificate_1'][0].size + this.name['certificate_2'][0].size + this.name['certificate_3'][0].size + this.name['certificate_4'][0].size + this.name['certificate_5'][0].size + this.others + this.name['challan'][0].size;
          console.log(this.TotalFileSize+'TOTAL');
          console.log(this.others+'others');
          console.log(this.TotalFileSize/1024/1024);
          this.MB = this.TotalFileSize/1024/1024;
          if(this.TotalFileSize > 8388608)
          {
            this.AlertService.error("Total Files Size Should Not be More Than 8 MB!!");
            return false;
          }
        } 
        if (this.renewalForm.invalid)
        {
          console.log(this.renewalForm);
          this.renewalForm.markAllAsTouched();
          this.scrollToFirstInvalidControl();
         return false;
    }
    this.date = new Date().toLocaleDateString();
    if(this.name['certificate_6'])
    {
      this.formvalues = {'schoolnew_renewal':{'id':'','school_key_id': this.school_id,'condsatisfied':this.renewalForm.value.condition,"createddate":this.date,"auth":"0","lastrenewal_filename":"","lastrenewal_filepath":""},"schoolnew_renewcategory":{"renewal_id":"","applied_category":"0","amount":this.renewalForm.value.amount,"challan_no":this.renewalForm.value.challan_no,"challan_date":this.pipe.transform(this.renewalForm.value.challan_date, 'yyyy-MM-dd'),"ifsc_code":this.renewalForm.value.ifsc_code,"challan_filename":"","challan_filepath":""},"schoolnew_renewalfiles":[{"renewal_id":"","certificate_id":"1","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"2","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"3","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"4","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"5","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"6","certificate_filename":"","certificate_filepath":"","auth":""}]}
    }
    if(!this.name['certificate_6'])
    {
      this.formvalues = {'schoolnew_renewal':{'id':'','school_key_id':  this.school_id,'condsatisfied':this.renewalForm.value.condition,"createddate":this.date,"auth":"0","lastrenewal_filename":"","lastrenewal_filepath":""},"schoolnew_renewcategory":{"renewal_id":"","applied_category":"0","amount":this.renewalForm.value.amount,"challan_no":this.renewalForm.value.challan_no,"challan_date":this.pipe.transform(this.renewalForm.value.challan_date, 'yyyy-MM-dd'),"ifsc_code":this.renewalForm.value.ifsc_code,"challan_filename":"","challan_filepath":""},"schoolnew_renewalfiles":[{"renewal_id":"","certificate_id":"1","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"2","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"3","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"4","certificate_filename":"","certificate_filepath":"","auth":""},{"renewal_id":"","certificate_id":"5","certificate_filename":"","certificate_filepath":"","auth":""}]}
    }

  console.log(this.formvalues); 
   //console.log(this.name['certificate_1'][0]);
    const formData = new FormData();
    if(this.name['last_renewal'])
    {
      formData.append('lastrenewal', this.name['last_renewal'][0]);
    }
    if(this.name['certificate_1'])
    {
      formData.append('certificate_1', this.name['certificate_1'][0]);
    }
    if(this.name['certificate_2'])
    {
      formData.append('certificate_2', this.name['certificate_2'][0]);
    }
    if(this.name['certificate_3'])
    {
      formData.append('certificate_3', this.name['certificate_3'][0]);
    }
    if(this.name['certificate_4'])
    {
      formData.append('certificate_4', this.name['certificate_4'][0]);
    }
    if(this.name['certificate_5'])
    {
      formData.append('certificate_5', this.name['certificate_5'][0]);
    }
    if(this.name['certificate_6'])
    {
      formData.append('certificate_6', this.name['certificate_6'][0]);
    }
    if(this.name['challan'])
    {
      formData.append('challan', this.name['challan'][0]);
    }
    formData.append('records', JSON.stringify(this.formvalues));
     this.RenewalService.SaveRenewal(formData).subscribe((result) => {
      if (result.dataStatus == true ) {
        this.AlertService.success("Renewal Application Saved SuccessFully!!");
        this.router.navigate(['/dashboard']);
        window.location.reload();
      }
      else
      {
        this.AlertService.error("Unable to Save data");
      }
    });
  }
  public scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector("form .ng-invalid");
    firstInvalidControl.focus(); //without smooth behavior
  }
 
  //Number only event
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //Get School Details
  GetSchoolDetails()
  {
    this.RenewalService.GetSchoolDetails(this.school_id,1).subscribe((result) => {
      if (result) {
        // console.log(result,"detail");
       this.school_name=result.result.schoolinfo.school_name;
       this.udis_code = result.result.schoolinfo.udise_code;
       this.manage_name=result.result.schoolinfo.manage_name;
       this.management=result.result.schoolinfo.management;
       this.departement = result.result.schoolinfo.department;
       this.ifsc_get_code = result.result.schoolinfo.smc_bank;
       this.bank_code=result.result.schoolinfo.smc_ifsc;
       this.last_year_renewal_date = result.result.schoolinfo.yr_last_renwl;
       this.schDirectorateId =result.result.schoolinfo.sch_directorate_id; 
       this.schMgmtId =result.result.schoolinfo.sch_management_id; 
       this.schCateId =result.result.schoolinfo.sch_cate_id; 
       let newValue = result.result.schoolinfo.address.replace("\\\n"," ");
       this.addr = newValue;
      }
    });
  }
  getDocsRenewal() {
    this.RenewalService.getDocsRenewal().subscribe((result) => {
      if (result.result.basic.length > 0) {
        debugger;
    this.docsData = result.result.basic;
    this.renewalForm.controls['challan_date'].setValue(this.docsData[0].challan_date);
    this.renewalForm.controls['challan_no'].setValue(this.docsData[0].challan_no);
    this.renewalForm.controls['amount'].setValue(this.docsData[0].fee_paid);
    this.renewalForm.controls['ifsc_code'].setValue(this.docsData[0].ifs_code);
      }
    }); 
  }

  getstatusData() {
    var schoolId = this.school_id;
    this.RenewalService.getschoolstatusData(schoolId).subscribe((data) => {
      if(data.result == '' ){
        this.pageStage = 1;
      } else {
        this.pageStage = 2;
      }

        debugger;
        this.districtwises = data;
        this.Renewalstatus = data.result;
    });
  }

  getRenewalSchoolList() {
    this.RenewalService.getRenewalSchoolList().subscribe((result) => {
      if (result.result.basic.length > 0) {
        this.conditioncopy = result.result.basic[0].order_conditions_filename_coded;
        this.fileStatus = result.result.basic[0].status;
      }
    });
  }

  GetAlreadyExistRenewal()
  {
    debugger;
    this.RenewalService.GetAlreadyExistsRenewal().subscribe((result) => {
      if (result.renewal.length > 0) {
        this.exsitsRTE=result.renewal[0]['school_key_id'];
        this.renewalDate= this.pipe.transform(result.renewal[0]['createddate'], 'dd-MM-yyyy ');
      }
    });
  }

  onSave() {
    this.submitted = true;
     if (this.renewalForm.valid) {
        this.save_btn = true;
        if(this.docUploads && this.docUploads.length > 0) {
          for (let i = 0; i < this.docUploads.length; i++) {
            debugger;
          this.uploadFiles(this.docUploads[i]);
          }
        }
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.saveAllData();
        }, 30000);
    }

  }
  saveAllData() {
    var records = {
      "mgmt_app_status":[{
        "district_id":this.distId,
        "school_id":this.school_id,
        "sch_directorate_id":this.schDirectorateId,
        "sch_mgmt_id":this.schMgmtId,
        "sch_cate_id":this.schCateId,
        "app_id":"",
        "app_type":"1",
        "status":"0",
        "status_user":"",
        "status_stage":"",
        "app_submit_date":""
      }]
    }
    
 
  
    this.RenewalService.schoolRenewalSubmit(records).subscribe((res) => {
      if(res){
        debugger;
        var appId = res.result.app_id;
        for (let i = 0; i < this.uploadedFiles.length; i++) {
          this.uploadedFiles[i].app_id = appId;
        }
        var docRecords =  {  "mgmt_app_doc_uploads": this.uploadedFiles} ;
        var trackingrecords = {
          "mgmt_app_tracking":[{
            "app_id": appId,
            "app_type":"1",
            "user_type_id_from":"",
            "user_action":"0",
            "user_type_id_to":"",
            "recommend":"",
            "remarks":"",
            "action_time":""
          }], 
        }
        this.RenewalService.schoolRenewalDocsSubmit(docRecords).subscribe((response) => {
          if(response){
          if(response.dataStatus == true){
            this.RenewalService.schoolRenewalSubmit(trackingrecords).subscribe((response) => {
              if(response.dataStatus == true){
                this.AlertService.success("Data Saved Successfully");
                this.getstatusData();
              }
            })
          }
        }
         else {
          this.AlertService.error("Please Fill all the Required Fields");
        }
       })
      }
    })
  }
  uploadFiles(files) {
    debugger;
    var bucketName= "renewalapplicationemis";
    let expiry:number = 300;
      // var ext = files[i].ext;
      // var filename = files[i].filename;
      this.RenewalService.getSignedUrl(bucketName,files.ext,files.filename,expiry).subscribe((result) => {
        if (result) {
          // const formData = new FormData();
          // formData.append('file', this.doc_file);
          // let files: FileList =this.doc_file;
          // let file : File = files[0];
          let pdfFile : File = files.file;
          this.RenewalService.uploadFile(result.url,pdfFile).subscribe((res) => {
            // console.log("check",res)
            debugger;
              this.uploadedFiles.push({
                "doc_id":files.docId,
                "doc_name" : files.filename,
                "doc_name_coded":result.key,
                "doc_type":files.docType,
                "ifs_code":this.renewalForm.value.ifsc_code,
                "challan_date":this.renewalForm.value.challan_date,
                "challan_no":this.renewalForm.value.challan_no,
                "fee_paid":this.renewalForm.value.amount,
                "isactive": "1",
                "user_type":this.userTypeID,
              })
          });
          
          // this.AlertService.success("File Uploaded Successfully");
        }
        else {
          this.AlertService.error("Error in Uploading File please try again");
        }
      });
   
  }

  schoolPDFView(){
    var SchoolID = this.school_id;
    this.router.navigate(['/renewal-pdf'], SchoolID);
  }
  // ifsccode
  ifsc_cde(ifscc){
      this.ifscc_code=ifscc;
      this.RenewalService.get_ifsc_data(this.ifscc_code).subscribe((res) => {
      this.bank_detail = res.data[0];
      if(this.renewalForm.value.ifsc_code == this.ifscc_code)
         {
          this.renewalForm.controls['endowment_bank_name'].setValue(this.bank_detail.bank_name);
          this.renewalForm.controls['endowment_bank_branch'].setValue(this.bank_detail.branch);
         }
    })
  }

  redriect(){
    this.pageStage = 1;
  }

  downloadMyFile(e){
    debugger;
    var fileName = e;
    if(fileName) {
      var bucketName= "renewalapplicationemis";
      let expiry:number = 1800;
          this.RenewalService.getUploadedFiles(bucketName,fileName,expiry).subscribe((res) => {
          if (res) {
            window.open(res.url, "_blank");
          }
          else {
            this.AlertService.error("No files are Found");
          }
        })
    }
    else {
      this.AlertService.error("No files are Found");
    }
  }
}
