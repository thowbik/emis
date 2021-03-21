import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { schoolsService } from '../schools.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { StateDashboardService } from '../../statedashboard/dashboard.services';

@Component({
  selector: 'app-management-maintenance',
  templateUrl: './management-maintenance.component.html',
  styleUrls: ['./management-maintenance.component.css']
})
export class ManagementMaintenanceComponent implements OnInit {
    // => Management Maintanance start table1
    SchoolName: any;
    SchoolId: any;
    Studentlist:any [];
    PageStage: number;
    docUploads: any[]=[];
    uploadedFiles: any[] = [];
    form2: FormGroup;
    submit2: boolean;
    routeData: any;
    id: any;
    IndxID: any[];
    doc_file: FileList;
    fileType: any;
    image: any;
    uploadUrl: string | ArrayBuffer;
    Studentliststatus: any [];
    mainatanenceid: any;
    Studentlistmanagementstatus: any[]=[];
    Studentlistmanagementpatch: any;
    Studentliststatusfilter: any[];
    imageupload: any;
    MaintnceId: any;
    IndxIDstatusdelete: any[]=[];
    indexidupdatedata: any;
    noDataFound: boolean;
    allowedtoview: boolean;
    updateData: string;
   statusType: any[]=[];
  mainatanencetype: { value: string; };
  photoBtn1: boolean = false;
  viewuploadBtn: boolean = false;
  Attchmnt: any;
  photo: any;
  Photo: any;
  
  constructor(private schoolsService: schoolsService,public dashboardService: StateDashboardService,
    private route : ActivatedRoute,private tl: schoolsService,
    private confirmationService: ConfirmationService,
     private router: Router, 
     public UserSessionService :UserSessionService,private alertService :AlertService,
     private fb: FormBuilder,private el: ElementRef) {
      this.SchoolName = this.UserSessionService.schoolName();
      this.SchoolId = this.UserSessionService.schoolId();  
      this.routeData = this.route.snapshot.params;
      this.id = this.routeData.id;
     }

  ngOnInit() {
    this.PageStage= 1;
    this.initialValidators();
    this.statusType =  [
      {label: 'Hold', value: '0'},
      {label: 'Yet to be', value: '1'},
      {label: 'In Progress', value: '2'},
      {label: 'completed ', value: '3'},
    ];
    this.getAllStudentsdata();
  }
  initialValidators() {
     //  => Form2 Validation Purpose
  this.form2 = this.fb.group({
    'Remrks': new FormControl('',Validators.required),
    'Stats': new FormControl('',Validators.required),
    'Photo': new FormControl('', null),
  });
}
  // => Management Maintanance start table1
  student: Array<{'field':string,'header':string,'widthstyle':string}> =
    [
      // { field: 'IndxID', header: 'Indexid',widthstyle: '10em'},
      { field: 'MantnceType', header: 'Maintenance Type',widthstyle: '15em'},
      { field: 'Prblms', header: 'Description Of Work',widthstyle: '15em'},
      { field: 'ReqAmt', header: 'Request Amount',widthstyle: '10em'},
      { field: 'Remrks', header: 'Remarks',widthstyle: '10em'},
      { field: 'Stats', header: 'Status',widthstyle: '10em'},
         { field: '', header: 'Action',widthstyle: '30em'},
    ];

     // => Management Maintanance start table2
  studentstatus: Array<{'field':string,'header':string,'widthstyle':string}> =
  [
    { field: 'MantnceType', header: 'Maintenance Type',widthstyle: '13em'},
  { field: 'Remrks', header: 'Remarks',widthstyle: '10em'},
  { field: 'Stats', header: 'Status',widthstyle: '10em'},
  { field: '', header: 'Action',widthstyle: '20em'},
  ];
// Api Calls
  getAllStudentsdata() {
  this.schoolsService.schoolmaintaingetstudentdata(this.SchoolId).subscribe((data) => {
    debugger;
    this.Studentlist = data.result;
  })  
}

// Oneditstudentadata
oneditstudendata(rowData) {
  this.schoolsService.schoolmaintaingetstudentdata(this.SchoolId).subscribe(res => {
    this.Studentlist = res.result;
    this.IndxID = rowData;
    this.tl.activate.next(this.Studentlist);
    var id = this.IndxID;
    this.router.navigate(['/school-maintenance/1/'+id]);
  })
}
// Delete Teacher data
OnDeleteStudentData(rowData) {
  this.confirmationService.confirm({
    message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete this Name?</p>',
    accept: () => {
      this.IndxID = rowData;
      let records =
      {
        "IndxID": this.IndxID,
      }
      this.schoolsService.Schoolmgmtdeletedata({records}).subscribe((res) => {
        debugger;
        if (res.status == 200) {
          if (res.dataStatus) {
            this.alertService.success(res.message);
            this.getAllStudentsdata();
          }
          else {
            this.alertService.error(res.message);
            this.getAllStudentsdata();
          }
        }
      });
    }
  });
}
gottonextpage(rowData,MantnceType)
{
    this.photoBtn1= false
    this.mainatanenceid = rowData;
    this.mainatanencetype = MantnceType;
    this.schoolsService.schoolmaintaingetstudentpatch(this.mainatanenceid).subscribe((data) => {
      if (data.result.length > 0) {
        this.noDataFound = true;
        this.Studentlistmanagementstatus = data.result;
        if(!this.noDataFound){
          this.Studentlistmanagementstatus = data.result;
        }
      }
      else {
        this.noDataFound = true;
      }
    })  
    this.PageStage= 2;
}
gottonextpage3(rowData)
{
  this.viewuploadBtn= true;
  debugger;
    this.indexidupdatedata = rowData.IndxID;
    this.form2.patchValue(rowData);  
     this.Photo = rowData.Attchmnt;
     console.log(this.Photo, 'AttchmntAttchmnt')
    this.PageStage= 3;
  }
    onAddStudent(){
      this.router.navigate(['/school-maintenance/1/0']);
    }
    onAddStudentstatus()
      {
        this.viewuploadBtn= false;
        this.form2.reset();
        this.PageStage= 3;
      }
// Fileupload
// => Form2 Imageupload
onSelectFile(event,type) {
  if (event.target.files && event.target.files[0]) {
    var fileName = event.target.files[0].name;
    var splittedName = fileName.split(".");
    {
      switch(type){
        case 'photo':
          this.docUploads.push({
            "filename" : splittedName[0],
            "ext":splittedName[splittedName.length-1],
            "file":event.target.files[0],
          });
          this.form2.controls['Photo'].setValue(splittedName[0]);
        default:
          break;
      }
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event: Event) => {
 
      };
    } 
      // this.alertService.success("File Upload Successfully");
    
  }
 }
 uploadFiles(files) {
   debugger;
   var bucketName= "renewalapplicationemis";
   let expiry:number = 300;
   for (let i = 0; i < files.length; i++) {

     this.dashboardService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
       if (result) {
        let filename : File = files[i].filename;
        let file : File = files[i].file;        
         this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
             this.uploadedFiles.push({
               "doc_name" : files.filename,
               "doc_name_coded":result.key,            
             })
         });
         this.alertService.success("File Uploaded Successfully");
         this.imageupload = result.key;
         this.submit2= false;
        }
       else {
         this.alertService.error("Error in Uploading File please try again");
       }
     });
    }
 }
  OnSaveForm2()
  {
    this.submit2= true;
    if(this.form2.valid) {
    if(this.docUploads && this.docUploads.length > 0) {
      this.uploadFiles(this.docUploads);
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
    let records ={};    
    if(this.Studentlistmanagementstatus.length >= 1) {
      if(this.uploadedFiles.length == 0){
        this.photo = this.Photo;
      } else {
        this.photo = this.uploadedFiles[0].doc_name_coded
      }
     records =
    {
    "IndxID":this.indexidupdatedata,
    "MaintnceId":this.mainatanenceid,
    "Photo":this.photo,
    "Remrks":this.form2.value.Remrks,
    "Stats":this.form2.value.Stats,
    }
  }
  else {
     records =
    {
      "MaintnceId":this.mainatanenceid,
      "Photo":this.uploadedFiles[0].doc_name_coded,
      "Remrks":this.form2.value.Remrks,
      "Stats":this.form2.value.Stats,
      }
  }
  this.schoolsService.Schoolmgmtlistsave({records}).subscribe((res) => {
    if(res.dataStatus == true){
      this.alertService.success(res.message);
      this.getAllStudentsdata();
      this.form2.reset();
      this.PageStage = 1;
      this.submit2= false;
    }
  else {
    this.alertService.error(res.message);
  }
  })
  };
  onCancel(){
    this.PageStage= 1;
  }
  onCancelback3(){
    this.photoBtn1 =false;
    this.PageStage= 2;
  }
  // Delete student teacher data
OnDeleteStudentDatastatus(rowData) {
  debugger;
  this.confirmationService.confirm({
    message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete this Name?</p>',
    accept: () => {
      this.IndxIDstatusdelete = rowData;
      let records =
      {
        "IndxID": this.IndxIDstatusdelete,
      }
      this.schoolsService.Schoolmgmtdeletedatastatus({records}).subscribe((res) => {
        debugger;
        if (res.status == 200) {
          if (res.dataStatus) {
            this.alertService.success(res.message);
            this.PageStage= 1;
            this.getAllStudentsdata();
          }
          else {
            this.alertService.error(res.message);
          }
        }
      });
    }
  });
}
  getUploadedFle() {
    this.photoBtn1 =true;
    debugger;
    var bucketName= "renewalapplicationemis";
    var filename = this.Photo;
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
}
    // => Management Maintanance Form end
    

