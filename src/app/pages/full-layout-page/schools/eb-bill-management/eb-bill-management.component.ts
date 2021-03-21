import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { schoolsService } from '../schools.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { StateDashboardService } from '../../statedashboard/dashboard.services';

@Component({
  selector: 'app-eb-bill-management',
  templateUrl: './eb-bill-management.component.html',
  styleUrls: ['./eb-bill-management.component.css']
})
export class EBBillManagementComponent implements OnInit {
  SchoolName: any;
  SchoolId: any;
  routeData: any;
  EBList: any[];
  form2: FormGroup;
  submit2: boolean;
  Monthdropdown:any[]=[];
  Yeardropdown:any[]=[];
  type:any[]=[];
  paymenttype:any[]=[];
  PageStage: number;
  indexid: any;
  EbBillpatchdata: any[]=[];
  EBbilllistfilter: any[];
  IndxID: any;
  noDataFound: boolean;
  uploadedFiles: any[] = [];
  docUploads: any[]=[];
  saveBtn: boolean = false; 
  updateBtn: boolean = false;
  imageupload: any;
  BillPhoto: any;
  image: any;
  EBLists: any;
  rowdatas: unknown[];
  photo: any;

  constructor(private schoolsService: schoolsService,public dashboardService: StateDashboardService,
    private route : ActivatedRoute,private tl: schoolsService,
    private confirmationService: ConfirmationService,
     private router: Router, 
     public UserSessionService :UserSessionService,private alertService :AlertService,
    private fb: FormBuilder,private el: ElementRef) {
      this.SchoolName = this.UserSessionService.schoolName();
      this.SchoolId = this.UserSessionService.schoolId();  
      this.routeData = this.route.snapshot.params;
     }

  ngOnInit() {
    this.EBList =[];
    this.PageStage= 1;
    this.initialValidators();
    this.getAlldatafromEB();
    this.Monthdropdown = [
      {label: 'January', value: '1'},
      {label: 'February', value: '2'},
      {label: 'March', value: '3'},
      {label: 'April', value: '4'},
      {label: 'May', value: '5'},
      {label: 'June', value: '6'},
      {label: 'July', value: '7'},
      {label: 'August', value: '8'},
      {label: 'September', value: '9'},
      {label: 'October', value: '10'},
      {label: 'November', value: '11'},
      {label: 'December', value: '12'},
    ];
    this.Yeardropdown = [
      {label: '2011', value: '2011'},
      {label: '2012', value: '2012'},
      {label: '2013', value: '2013'},
      {label: '2014', value: '2014'},
      {label: '2015', value: '2015'},
      {label: '2016', value: '2016'},
      {label: '2017', value: '2017'},
      {label: '2018', value: '2018'},
      {label: '2019', value: '2019'},
      {label: '2020', value: '2020'},
    ];
    this.type = [
      {label: 'Paid', value: '0'},
      {label: 'Unpaid', value: '1'},
    ];
    this.paymenttype = [
      {label: 'EB Bill', value: '0'},
      {label: 'Water Bill', value: '1'},
    ];
  }
  // => Management Maintanance start table1
  EBbill: Array<{'field':string,'header':string,'widthstyle':string}> =
  [
    // { field: 'IndxID', header: 'Indexid',widthstyle: '10em'},
    { field: 'Typ', header: 'Type',widthstyle: '10em'},
    { field: 'BillMonth', header: 'Month',widthstyle: '8em'},
    { field: 'BillYear', header: 'Date',widthstyle: '8em'},
    { field: 'BillAmt', header: 'Bill Amount',widthstyle: '8em'},
    { field: 'Remrks', header: 'Remarks',widthstyle: '10em'},
    { field: 'Status', header: 'Status',widthstyle: '10em'}
  ];
  //  => Form1 Validation Purpose
  initialValidators() {
   //  => Form2 Validation Purpose
  this.form2 = this.fb.group({
    'BillMonth': new FormControl('',Validators.required),
    'BillYear': new FormControl('',Validators.required),
    'Typ': new FormControl('',Validators.required),
    'BillPhoto': new FormControl('',Validators.required),
    'BillAmt': new FormControl('',Validators.required),
    'Status': new FormControl('',Validators.required),
    'Remrks': new FormControl('',Validators.required),
  });
}

getAlldatafromEB() {
  this.schoolsService.Ebbillgetdata(this.SchoolId).subscribe((data) => {
    debugger;
    console.log(data.result, '-------')
    this.EBList = data.result.map(l => { return { Typ: l.Typ == "0" ? "EB Bill" : "Water Bill", BillPhoto: l.BillPhoto,BillAmt: l.BillAmt ,BillMonth:l.BillMonth == "1" ? "Jan" :l.BillMonth == "2" ? "Feb" :l.BillMonth == "3" ? "Mar" :l.BillMonth == "4" ? "April" :l.BillMonth == "5" ? "May" :l.BillMonth == "6" ? "June" :l.BillMonth == "7" ? "July" :l.BillMonth == "8" ? "Aug" :l.BillMonth == "9" ? "Sep" :l.BillMonth == "10" ? "Oct" :l.BillMonth == "11" ? "Nov" : "Dec",IndxID:l.IndxID,BillYear:l.BillYear,Remrks: l.Remrks, Status: l.Status == "0" ? "Paid" : "Unpaid"}; });;
  })  
}

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
          this.form2.controls['BillPhoto'].setValue(splittedName[0]);
        default:
          break;
      }
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (event: Event) => {
      };
    } 
  }
 }
 uploadFiles(files) {
  debugger;
  var bucketName= "renewalapplicationemis";
  let expiry:number = 300;
  for (let i = 0; i < files.length; i++) {
    this.dashboardService.getSignedUrl(bucketName,files[i].ext,files[i].filename,expiry).subscribe((result) => {
      if (result) {
        let file : File = files[i].file;
        let filename : File = files[i].filename;       
        this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
            this.uploadedFiles.push({
              "doc_name" : files.filename,
              "doc_name_coded":result.key,            
            })
        });
        this.alertService.success("File Uploaded Successfully");
        this.imageupload = result.key;
        // this.submit2= false;
       }
      else {
        this.alertService.error("Error in Uploading File please try again");
      }
    });
  }
}

  // saveforminsertandupdate
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
    let records =
    {
      "SchlID":this.SchoolId,
      "BillMonth":this.form2.value.BillMonth,
      "BillYear":this.form2.value.BillYear,
      "Typ":this.form2.value.Typ,
      "BillAmt":this.form2.value.BillAmt,
      "BillPhoto":this.uploadedFiles[0].doc_name_coded,
      "Status":this.form2.value.Status,
      "TrnsactnSts":"0",
      "DataSts":"1",
      "Remrks":this.form2.value.Remrks
    }
    this.schoolsService.Ebbillsavedata({records}).subscribe((res) => {
      if(res){
        this.alertService.success("Data Saved Successfully");
        this.form2.reset();
        this.PageStage= 1;
        this.getAlldatafromEB();
      }
      else {
        this.alertService.error(res.message);
      }
    })
  };
  OnSaveFormupdate()
  {
    this.submit2= true;

    if(this.form2.valid) {
      if(this.docUploads && this.docUploads.length > 0) {
        this.uploadFiles(this.docUploads);
      }
      setTimeout(()=>{ 
        this.saveAllUpdate();
      }, 2000);
        }
    else {
      this.alertService.error("Please Fill all the Required Fields");
    }
  }
  saveAllUpdate() {  
    if(this.uploadedFiles.length == 0){
      this.photo = this.BillPhoto
    } else {
      this.photo = this.uploadedFiles[this.uploadedFiles.length -1].doc_name_coded
    }
    let records =
    {
      "IndxID":this.indexid,
      "SchlID":this.SchoolId,
      "BillMonth":this.form2.value.BillMonth,
      "BillYear":this.form2.value.BillYear,
      "Typ":this.form2.value.Status,
      "BillAmt":this.form2.value.BillAmt,
      "BillPhoto":this.photo,
      "Status":this.form2.value.Typ,
      "TrnsactnSts":"0",
      "DataSts":"1",
      "Remrks":this.form2.value.Remrks
    }
    this.schoolsService.Ebbillsavedata({records}).subscribe((res) => {
        if(res.dataStatus == true){
          this.alertService.success("Data Save Successfully");
          this.form2.reset();
          this.PageStage= 1;
          this.getAlldatafromEB();
        }
        else {
          this.alertService.error(res.message);
        }
    })
  }
  onAddEBBill(){
    this.form2.reset();
    this.saveBtn = true; 
    this.updateBtn = false; 
    this.PageStage= 2;
  }
  oncancel(){
    this.PageStage= 1;
  }
  onCancelfirstpage()
  {
    this.PageStage= 1;
  }
  // Oneditstudentadata
  oneditebbill(rowData) {
    this.image ="";
    this.updateBtn = true;
    this.saveBtn = false; 
    this.PageStage= 2;
    this.indexid = rowData.IndxID;
    this.BillPhoto = rowData.BillPhoto;
    console.log(rowData, '-------this.BillPhoto');
    var rowdatas = [rowData];
    this.EBLists = rowdatas.map(l => { return { Typ: l.Typ == "EB Bill" ? "0" : "1", BillPhoto: l.BillPhoto,BillAmt: l.BillAmt ,BillMonth:l.BillMonth == "Jan" ? "1" :l.BillMonth == "Feb" ? "2" :l.BillMonth == "Mar" ? "3" :l.BillMonth == "April" ? "4" :l.BillMonth == "May" ? "5" :l.BillMonth == "June" ? "6" :l.BillMonth == "July" ? "7" :l.BillMonth == "Aug" ? "8" :l.BillMonth == "Sep" ? "9" :l.BillMonth == "Oct" ? "10" :l.BillMonth == "Nov" ? "11" : "12",IndxID:l.IndxID,BillYear:l.BillYear,Remrks: l.Remrks, Status: l.Status == "Paid" ? "0" : "1"}; });;
    this.form2.patchValue(this.EBLists[0]); 
  }
  // Delete Teacher data
  OnDeleteEbBill(rowData) {
    debugger;
    this.confirmationService.confirm({
      message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete this Name?</p>',
      accept: () => {
        this.IndxID = rowData;
        let records =
        {
          "IndxID": this.IndxID,
        }
        this.schoolsService.EBBilldeletedata({records}).subscribe((res) => {
          debugger;
          if (res.dataStatus == true) {
            this.alertService.success(res.message);
            this.getAlldatafromEB();
              }
          else {
            this.alertService.error(res.message);
            this.getAlldatafromEB();
          }
        });
      }
    });
  }
  getUploadedFle() {
    debugger;
    var bucketName= "renewalapplicationemis";
    var filename = this.BillPhoto;
    let expiry:number = 1800;
    this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
      console.log(result, '---');
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
