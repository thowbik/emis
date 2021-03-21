import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { schoolsService } from '../schools.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { StateDashboardService } from '../../statedashboard/dashboard.services';

@Component({
  selector: 'app-kgers-mgmt-maintenance',
  templateUrl: './kgers-mgmt-maintenance.component.html',
  styleUrls: ['./kgers-mgmt-maintenance.component.css']
})
export class KgersMgmtMaintenanceComponent implements OnInit {

  form1: FormGroup; 
  submit1: boolean;
  maintenancetype:any[]=[];
  routeData: any;
  pageType: number;
  SchoolId: any;
  SchoolName: any;
  issuephoto: any[] = [];
  quatephoto: any[] = [];
  uploadedFiles: any[] = [];
  doc_file: any;
  fileType: any;
  uploadUrl: string | ArrayBuffer;
  image: any[] = [];
  image1: any[] = [];
  statusType: any[] = [];
  issuephotoupload: any;
  quatephotoupload: any;
  id: number;
  Studentlist: any;
  remarks: any;
  totalRecords: any[] = [];
  Studentlistfilter: any[];
  docUploads: any[]=[];
  allowedtoview: boolean;
  updateData: string;
  result: any;
  quotePhoto: any[]=[];
  img1: string;
  img2: string;
  Get_all_maintanace_value: any [] = [];
  maintanancevalue: any;
  IssuePhto: any;
  photoBtn1: boolean = false;
  IssuePhtos: boolean = false;
  QuotePhotos: boolean = false;
  photoBtn2: boolean = false;
  QuotePhto: any;
  photo: any;
  photo1: any;

  constructor(private schoolsService: schoolsService,
    private route : ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router, 
    public UserSessionService :UserSessionService,private alertService :AlertService,public dashboardService: StateDashboardService,
    private fb: FormBuilder,private el: ElementRef) {
      this.SchoolName = this.UserSessionService.schoolName();
      this.SchoolId = this.UserSessionService.schoolId();  
      this.routeData = this.route.snapshot.params;
      this.pageType = this.routeData.pageTypeId;
      this.id = this.routeData.id;
      {
        this.pageType = 1;
      }

      this.maintenancetype = [
        {label: 'Building repair', value: '1'},
        {label: 'Equipment repair ', value: '2'},
        {label: 'Other', value: '3'},
      ];
  
     }

  ngOnInit() {
    this.initialValidators();
    this.schoolmaintaingetstudentdata();
    this.getmaintanacetype();
  }
   
  //  => Form1 Validation Purpose
  initialValidators() {
    this.form1 = this.fb.group({
      'MantnceType': new FormControl('',Validators.required),
      'Prblms': new FormControl('',Validators.required),
      'ReqAmt': new FormControl('',Validators.required),
      'IssuePhto': new FormControl('',Validators.required),
      'Remrks': new FormControl('',Validators.required),
      'QuotePhto': new FormControl('',Validators.required),
    });
     //  => Form2 Validation Purpose
}
// Patchvalue
schoolmaintaingetstudentdata() {
  this.schoolsService.schoolmaintaingetstudentdata(this.SchoolId).subscribe((data) => {
    this.Studentlist = data.result;
    this.Studentlistfilter = this.Studentlist.filter(
      element => element.IndxID === this.id);
      this.Studentlist = this.Studentlist.map(l => 
        {
        return {
          MantnceType:l.MantnceType,
          ReqAmt:l.ReqAmt,
          Prblms:l.Prblms,
            Remrks:l.Remrks,
          IssuePhto:l.IssuePhto,
          QuotePhto:l.QuotePhto,
        }}) ;
        this.result = this.Studentlistfilter[0];
        this.IssuePhto = this.result.IssuePhto;
        this.QuotePhto = this.result.QuotePhto;
        this.IssuePhtos = true;
        this.QuotePhotos = true;
        this.form1.patchValue(this.result);
    })  
  }
    getUploadedFle() {
      this.photoBtn1 =true;
      debugger;
      var bucketName= "renewalapplicationemis";
      var filename = this.IssuePhto;
      let expiry:number = 1800;
      this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
        
        if (result) {
          debugger;
          this.image = result.url;
        }
        else {
          this.alertService.success("Error in Uploading File please try again");
        }
      });
    }
    getUploadedFles() {
      this.photoBtn2 =true;
      debugger;
      var bucketName= "renewalapplicationemis";
      var filename = this.QuotePhto;
      let expiry:number = 1800;
      this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
        
        if (result) {
          debugger;
          this.image1 = result.url;
        }
        else {
          this.alertService.success("Error in Uploading File please try again");
        }
      });
    }
// => Form1 Imageupload
onSelectFile(event,type) {
 if (event.target.files && event.target.files[0]) {
   var fileName = event.target.files[0].name;
   var splittedName = fileName.split(".");
   {
      switch(type){
       case 'issuephto':
         this.docUploads.push({
           "fileName" : splittedName[0],
           "ext":splittedName[splittedName.length-1],
           "file":event.target.files[0],
         });
          this.form1.controls['IssuePhto'].setValue(splittedName[0]);
         break;

         case 'quotePhtos':
           this.quotePhoto.push({
             "filename" : splittedName[0],
             "ext":splittedName[splittedName.length-1],
             "file":event.target.files[0],
           });
            this.form1.controls['QuotePhto'].setValue(splittedName[0]);
              break;
       default:
         break;
     }
     const fileReader: FileReader = new FileReader();
     fileReader.readAsDataURL(event.target.files[0]);
     fileReader.onload = (event: Event) => {

     };
   } 
    //  this.alertService.success("File Upload Successfully");
 }
}
uploadFiles(files) {
  debugger;
  var bucketName= "renewalapplicationemis";
  let expiry:number = 300;
  for (let i = 0; i < files.length; i++) {
    this.dashboardService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
      debugger;
      if (result) {
        let filename : File = files[i].filename;
        let file : File = files[i].file;
        this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
            this.uploadedFiles.push({
              "doc_name" : files[i].filename,
              "doc_name_coded":result.key,            
            })
        });
        this.alertService.success("File Uploaded Successfully");
        this.submit1= false;
      }
      else {
        this.alertService.error("Error in Uploading File please try again");
      }
    });
  }
}
// =>Form1 Onsave Function 
OnSaveForm1()
{
  this.submit1= true;
if(this.form1.valid) {
  if(this.docUploads && this.docUploads.length > 0) {
    this.uploadFiles(this.docUploads);
   }
   if(this.quotePhoto && this.quotePhoto.length > 0) {
    this.uploadFiles(this.quotePhoto);
   }
   setTimeout(()=>{ 
    this.saveAllData();
}, 2000);
}
else {
  this.alertService.error("Please Fill all the Required Fields");
}
}
saveAllData() {  
  let records = {}
  if(this.id == 0) {
   
 records =
    {
    "SchlID":this.SchoolId,
    "MantnceType":this.form1.value.MantnceType,
    "Prblms":this.form1.value.Prblms,
    "IssuePhto":this.uploadedFiles[0].doc_name_coded,
    "QuotePhto":this.uploadedFiles[1].doc_name_coded,
    "ReqAmt":this.form1.value.ReqAmt,
    "Remrks":this.form1.value.Remrks,
    }
  }
  else {
    if(this.uploadedFiles.length == 0){
      this.photo = this.IssuePhto;
      this.photo1 = this.QuotePhto;
    } else {
      this.photo = this.uploadedFiles[0].doc_name_coded
      this.photo1 = this.uploadedFiles[1].doc_name_coded
    }

 records =
    {
      "IndxID":this.id,
    "SchlID":this.SchoolId,
    "MantnceType":this.form1.value.MantnceType,
    "Prblms":this.form1.value.Prblms,
    "IssuePhto":this.photo,
    "QuotePhto":this.photo1,
    "ReqAmt":this.form1.value.ReqAmt,
    "Remrks":this.form1.value.Remrks,
  
    } 
  }

    this.schoolsService.Schoolmgmtsave({records}).subscribe((res) => {
  if(res.dataStatus == true){
      this.alertService.success(res.message);
      this.form1.reset();
      this.router.navigate(['/schoolmaintainance-home']);
      this.submit1= false;
        }
  else 
{
  this.alertService.error(res.message);
}
})
}

// =>Form1 Onsave Function 

onCancel(){
  debugger
  this.router.navigate(['/schoolmaintainance-home']);
}
   // Getmaintanacetype
  getmaintanacetype(){
    debugger;
    this.schoolsService.getmaintanacetype().subscribe((res) => {
      if (res) {
        this.maintanancevalue = res.result;
        let dropDownList = this.maintanancevalue;
        if(dropDownList.length > 0) {
          this.Get_all_maintanace_value = dropDownList.map(list => { return {label: list.MaintnceType,value:list.MaintnceID}});
        }
        else
        {
          this.maintanancevalue.push({ value: "", label: "No Data Found" })
        } 
      }
    });
  }
}
