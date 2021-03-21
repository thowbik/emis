import { Component, OnInit, ElementRef } from '@angular/core';
import { ReportsService } from '../reports.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-school-profile-verification-reports',
  templateUrl: './school-profile-verification-reports.component.html',
  styleUrls: ['./school-profile-verification-reports.component.css']
})
export class SchoolProfileVerificationReportsComponent implements OnInit {
  schoolverificationdetail: FormGroup ;
  verificationschoollistapi: any;
  selectedCity: any;
  schooltypedropvalue: { label: string; value: number; }[];
  noDataFound: boolean;
  showDialogBox:  boolean = false;
  finyear: string;
  selected_schl_id: any;
  userTypeID: number;
  statelogin: boolean = false;
  schoollogin: boolean = false ;
  udise_cd: any;
  schl_id: any;
  schoolName: any;
  schoolDeclarationDetails: any;
  crclogin: boolean  = false ;
  beologin: boolean = false;
  ceologin: boolean = false ;
  hmlink: any;
  brtelink: any;
  distrct_id: any;
  Blockdropvalueoptions: any [] = [];
  selectedschooltypes: any;
  design_options: { label: string; value: string; }[];
  selectedblockid: any;
  fromdate: any;
  todate: any;
  submitted: boolean;
  beo_ceo_selected_sch_id: any;
  beo_data: any [] = [];
  beo_api: any;

  constructor(public reportsService : ReportsService, private router: Router, public UserSessionService :UserSessionService,private alertService :AlertService,
    private fb: FormBuilder,private el: ElementRef) { 
    this.schoolName= this.UserSessionService.schoolName();
    this.userTypeID= this.UserSessionService.userTypeId();
    this.udise_cd=this.UserSessionService.userName();
    this.schl_id=this.UserSessionService.schoolId();
    this.distrct_id=this.UserSessionService.districtId();
    this.selectedCity;
    this.schooltypedropvalue = [
      {label:'Goverment', value: 1},
      {label:'Fully Aided', value: 2},
      {label:'Un-aided', value:3},
      {label:'Partially Aided', value:4},
      {label:'Central Govt.', value:5}
   ];

   this.design_options = [
    {label:'Principal', value: "Principal"},
    {label:'Vice-Principal', value: "Vice-Principal"},
    {label:'Head Teacher', value:"Head Teacher"},
    {label:'Senior Most Teacher', value:"Senior Most Teacher"},
 ];
   
  }
   col : Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'block_name', header: 'Block',widthstyle: '10em'},
   { field: 'udise_code', header: 'UDISE Code',widthstyle: '12em'},
   { field: 'school_name', header: 'School Name',widthstyle: '25em'},
   { field: 'category', header: 'Category',widthstyle: '12em'},
   { field: 'dcf_certify_by_school_auth_date', header: 'HM Submission Status',widthstyle: '17em'},
   { field: '', header: 'Download Profile' ,widthstyle: '15em'},
   { field: 'dcf_certify_by_crc_auth_name', header: 'Verification Status',widthstyle: '15em' },
   { field: 'dcf_certify_by_crc_auth_date', header: 'Verification Date',widthstyle: '15em' },
   ];

  ngOnInit() {  
    var today = new Date() , year = today.getFullYear().toString() , month = today.getMonth().toString() , date = today.getDate().toString() ;

    let fromdates= year + "-" + month + "-" + date ;  
    this.fromdate = fromdates ;


  if (this.userTypeID == 5  || this.userTypeID == 9 || this.userTypeID == 3 )
  {
    this.statelogin= true;
    this.schoolverifiactionresult();

    if(this.userTypeID == 9 || this.userTypeID == 3){
      this.ceologin=true;
    }
  }
 
  //beo login
   if(this.userTypeID == 6) {
    this.statelogin= true;
    this.beologin=true;
    this.beo_login();
  }

  //deo login
  if(this.userTypeID == 10) {
    this.statelogin= true;
    this.deo_login();
  }
  

  if(this.userTypeID == 14  ) {
 
    this.block_dropdown();
    // this.schoolverifiactionresult();
    // this.brte_schoolverifiactionresult();  
    this.statelogin= true;
    this.crclogin=true;
    this.brtelink='https://shorturl.at/hsMOP';
  }

  if (this.userTypeID == 1)
  {
    this.hmlink='https://shorturl.at/hijBP';
    this.schoollogin= true;
    this.schoolverifiactionrHm(); 
  }
    this.getCurrentFinancialYear(); 

    this.schoolverificationdetail = this.fb.group({ 
      // 'crcblockselect': new FormControl('',null),
      // 'crcschtypeselect': new FormControl('',null),
      'name': new FormControl('',Validators.required),
      'desig': new FormControl('',Validators.required),
      'place': new FormControl('',Validators.required),
      'date': new FormControl('',Validators.required),  
      'dcf_certify_by_school_auth_name': new FormControl('',null),
      'dcf_certify_by_school_auth_desig': new FormControl('',null),
      'dcf_certify_by_school_auth_place': new FormControl('',null),
      'dcf_certify_by_school_auth_date': new FormControl('',null),  
      'school-name': new FormControl(this.schoolName,null),  
    });
  }

  block_dropdown()  {
    this.reportsService.getdropdowdataforblock().subscribe((data) => {
      let dropDownList = data.blocklist;
      // console.log(data,"block");
      // Dropdown Values
      if(dropDownList.length>0){
        this.Blockdropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.Blockdropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].block_name })
        }
      }
      else
      {
        this.Blockdropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }


  schoolverifiactionrHm(){
    this.reportsService.schoolverifiactionrHmAPI().subscribe((res) => { 
      this.schoolDeclarationDetails = res.result[0];
      //  this.schoolverificationdetail.('dcf_certify_by_school_auth_date').patchValue(res.result[0].dcf_certify_by_school_auth_date);
      // 'dcf_certify_by_school_auth_date'= new FormControl('',null) ;
      this.schoolverificationdetail.patchValue(this.schoolDeclarationDetails);
      // console.log(res.result[0]);    
    })
  }

  brte_schoolverifiactionresult(){
    let schooltype= "",
    block_id ='';
    this.reportsService.schoolverifiactionresultsAPI(schooltype , block_id).subscribe((res) => {
      if(res.schoollist.length>0){
        this.verificationschoollistapi = res.schoollist;
      }
      else{
        this.noDataFound = true;
      }
    })
  } 

  beo_login()
  {
    let schooltype= 3 ;
    this.reportsService.schoolverifiactionresultAPI(schooltype).subscribe((res) => {
      if(res.schoollist.length>0){
        this.beo_api = res.schoollist;
        debugger;
        // console.log(this.beo_api,"beo_api");
        for(let i=0; i < this.beo_api.length; i++){
          // console.log(this.beo_api[i].category,"test");
          // console.log(i,"test");
          if(this.beo_api[i].category == "Primary Only (I-V)"){
            debugger;
            // High Schools (I-X) Primary Only (I-V)	Hr.Sec School (VI-XII)	Middle School (I-VIII)	
            this.beo_data.push(this.beo_api[i]);
          }
          if (this.beo_api[i].category == "Middle School (I-VIII)"){
            debugger;
            this.beo_data.push(this.beo_api[i]);
          }
        }
        // console.log(this.beo_data,"sample12");
        this.verificationschoollistapi = this.beo_data;
      }
      else{
        this.noDataFound = true;
      }
    })
   }

  deo_login()
  {
    let schooltype= 3 ;
    this.reportsService.schoolverifiactionresultAPI(schooltype).subscribe((res) => {
      if(res.schoollist.length>0){
        this.beo_api = res.schoollist;
        debugger;
        // console.log(this.beo_api,"beo_api");
        for(let i=0; i < this.beo_api.length; i++){
          // console.log(this.beo_api[i].category,"test");
          // console.log(i,"test");
          if(this.beo_api[i].category == "High Schools (I-X)"){
            debugger;
            // High Schools (I-X) Primary Only (I-V)	Hr.Sec School (VI-XII)	Middle School (I-VIII)	
            this.beo_data.push(this.beo_api[i]);
          }
          else if (this.beo_api[i].category == "Hr.Sec School (VI-XII)"){
            this.beo_data.push(this.beo_api[i]);
          }
        }
        // console.log(this.beo_data,"sample12");
        this.verificationschoollistapi = this.beo_data;
      }
      else{
        this.noDataFound = true;
      }
    })
   }

  schoolverifiactionresult(){
    let schooltype= 3 ;
    this.reportsService.schoolverifiactionresultAPI(schooltype).subscribe((res) => {
      if(res.schoollist.length>0){
        this.verificationschoollistapi = res.schoollist;
      }
      else{
        this.noDataFound = true;
      }
    })
  }    

  getCurrentFinancialYear() {
    var fiscalyear = "2018-19";
     var today = new Date();
     if ((today.getMonth() + 1) <= 6) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
    }
      this.finyear = fiscalyear
  }

  crc_save(){
    this.submitted = true;
    debugger;
    if (this.schoolverificationdetail.valid) { 
   let school_key_id =this.selected_schl_id,
   ac_year =this.finyear,
   dcf_certify_by_crc_auth_name=this.schoolverificationdetail.value.name,
   dcf_certify_by_crc_auth_desig=this.schoolverificationdetail.value.desig,
   dcf_certify_by_crc_auth_place=this.schoolverificationdetail.value.place,
   dcf_certify_by_crc_auth_date=this.schoolverificationdetail.value.date;
    let datas = {"school_key_id" : school_key_id, "ac_year" : ac_year,"dcf_certify_by_crc_auth_name" : dcf_certify_by_crc_auth_name,"dcf_certify_by_crc_auth_desig" : dcf_certify_by_crc_auth_desig,"dcf_certify_by_crc_auth_place" : dcf_certify_by_crc_auth_place,"dcf_certify_by_crc_auth_date" : dcf_certify_by_crc_auth_date, };
    // console.log(datas,"datas");
    this.reportsService.schoolverifiactionsaveAPI({"records":datas}, true).subscribe((res) => {
      if(res){
      this.alertService.success("Data Save Successfully");
      }
      else {
        this.alertService.error("Please Fill all the Required Fields"); 
      }
    })
    this.showDialogBox = false;
  }
  else {
    for (const key of Object.keys(this.schoolverificationdetail.controls)) {
      if (this.schoolverificationdetail.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        // console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
  }
}


  beo_save(){
    if(this.userTypeID == 6 || this.userTypeID == 10){
      this.schoolverificationdetail.controls['place'].setValidators(null);
      this.schoolverificationdetail.controls['place'].setValue("");
    }
    this.submitted = true;
    debugger;
    if (this.schoolverificationdetail.valid) { 
    let school_key_id =this.selected_schl_id,
    ac_year =this.finyear,
    dcf_certify_by_block_auth_name=this.schoolverificationdetail.value.name,
    dcf_certify_by_block_auth_desig=this.schoolverificationdetail.value.desig,
    dcf_certify_by_block_auth_date=this.schoolverificationdetail.value.date;
     let datas = {"school_key_id" : school_key_id, "ac_year" : ac_year,"dcf_certify_by_block_auth_name" : dcf_certify_by_block_auth_name,"dcf_certify_by_block_auth_desig" : dcf_certify_by_block_auth_desig,"dcf_certify_by_block_auth_date" : dcf_certify_by_block_auth_date, };
    //  console.log(datas,"beo");
     this.reportsService.schoolverifiactionsaveAPI({"records":datas}, true).subscribe((res) => {
       if(res){
       this.alertService.success("Data Save Successfully");
       }
       else {
         this.alertService.error("Please Fill all the Required Fields"); 
       }
     })
     this.showDialogBox = false;
    }
    else{
     for (const key of Object.keys(this.schoolverificationdetail.controls)) {
       if (this.schoolverificationdetail.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        //  console.log('invalid keys',key);
         invalidControl.focus();
          break;
       }
     }
   this.alertService.error("Please Fill all the Required Fields");
    }
   }

  ceo_save(){
    if(this.userTypeID == 9 || this.userTypeID == 3){
      this.schoolverificationdetail.controls['place'].setValidators(null);
      this.schoolverificationdetail.controls['place'].setValue("");
    }
    this.submitted = true;
    debugger;
    if (this.schoolverificationdetail.valid) { 
    let school_key_id =this.selected_schl_id,
    ac_year =this.finyear,
    dcf_certify_by_ceo_auth_name=this.schoolverificationdetail.value.name,
    dcf_certify_by_ceo_auth_desig=this.schoolverificationdetail.value.desig,
    dcf_certify_by_ceo_auth_date=this.schoolverificationdetail.value.date;
     let datas = {"school_key_id" : school_key_id, "ac_year" : ac_year,"dcf_certify_by_ceo_auth_name" : dcf_certify_by_ceo_auth_name,"dcf_certify_by_ceo_auth_desig" : dcf_certify_by_ceo_auth_desig,"dcf_certify_by_ceo_auth_date" : dcf_certify_by_ceo_auth_date, };
    //  console.log(datas,"datas");
     this.reportsService.schoolverifiactionsaveAPI({"records":datas}, true).subscribe((res) => {
       if(res){
        // this.schoolverifiactionresult();
        this.alertService.success("Data Save Successfully");
       }
       else {
         this.alertService.error("Please Fill all the Required Fields"); 
       }
     })
     this.showDialogBox = false;
   }
   else{
    for (const key of Object.keys(this.schoolverificationdetail.controls)) {
      if (this.schoolverificationdetail.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        // console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
   }
  }
  

  sch_save(){
    let school_key_id =this.schl_id,
    udise=this.udise_cd,
    ac_year =this.finyear,
    name=this.schoolverificationdetail.value.dcf_certify_by_school_auth_name,
    desig=this.schoolverificationdetail.value.dcf_certify_by_school_auth_desig,
    place=this.schoolverificationdetail.value.dcf_certify_by_school_auth_place,
    date=this.schoolverificationdetail.value.dcf_certify_by_school_auth_date;   
     let datas = {"school_key_id" : school_key_id,"udise_sch_code" :udise, "ac_year" : ac_year,"dcf_certify_by_school_auth_name" : name,"dcf_certify_by_school_auth_desig" : desig,"dcf_certify_by_school_auth_place" : place,"dcf_certify_by_school_auth_date" : date, };
     
     this.reportsService.schoolverifiactionsaveAPI({"records":datas}, true).subscribe((res) => {
       if(res){
        this.alertService.success("Data Save Successfully");
       }
     })
   }
  handleClick(distwise) {
    // this.goToExternalPrint('/udisereportprintpdf');
    this.router.navigate(['/udisereportprintpdf'], distwise)
    }
    goToExternalPrint(url) {
    window.open(url, "_blank");
}

  // close dialog
  close_dialog(){
    this.showDialogBox = false;
  }
  // on select  block value
  BlockOption (event){
    let block_id = event.value ;
    this.selectedblockid = block_id;

    let schooltype= this.selectedschooltypes ;
    // block_id = 1 ;
    if (schooltype == undefined){

      let schooltype= 3 ;
      this.reportsService.schoolverifiactionresultsAPI(schooltype , block_id).subscribe((res) => {
        if(res.schoollist.length>0){
          this.verificationschoollistapi = res.schoollist;
          this.noDataFound = false;
        }
        else{
          this.noDataFound = true;
        }
      })
    }
    else{
      let schooltype= this.selectedschooltypes ;
      this.reportsService.schoolverifiactionresultsAPI(schooltype , block_id).subscribe((res) => {
        if(res.schoollist.length>0){
          this.verificationschoollistapi = res.schoollist;
          this.noDataFound = false;
        }
        else{
          this.noDataFound = true;
        }
      })
    }
  }
  //on select crc schtype 
  crcSchoolTypeOption(event){
    let schooltype = event.value ;
    this.selectedschooltypes = schooltype;

    let block_id= this.selectedblockid ;

    if (block_id == undefined){
      let block_id = " " ;
      this.reportsService.schoolverifiactionresultsAPI(schooltype , block_id).subscribe((res) => {
        if(res.schoollist.length>0){
          this.verificationschoollistapi = res.schoollist;
          this.noDataFound = false;
        }
        else{
          this.noDataFound = true;
        }
      })
    }
    else{
      let schooltype= this.selectedschooltypes ;
      this.reportsService.schoolverifiactionresultsAPI(schooltype , block_id).subscribe((res) => {
        if(res.schoollist.length>0){
          this.verificationschoollistapi = res.schoollist;
          this.noDataFound = false;
        }
        else{
          this.noDataFound = true;
        }
      })
    }
  }

  // on select  school type value
    StateSchoolTypeOption (event){
      let schooltype = event.value ;
      this.beo_ceo_selected_sch_id=schooltype;
      this.reportsService.schoolverifiactionresultAPI(this.beo_ceo_selected_sch_id).subscribe((res) => {
        if(res.schoollist.length>0){
          this.verificationschoollistapi = res.schoollist;
          this.noDataFound = false;
        }
        else{
          this.noDataFound = true;
        }
      })
    }
    // on selected school 
    getSelectedSchoolDetails(school_id){
      this.showDialogBox = true;
      this.selected_schl_id=school_id;
    }
}
