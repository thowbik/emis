import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from '../timesheet.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-add-branch-details',
  templateUrl: './add-branch-details.component.html',
  styleUrls: ['./add-branch-details.component.css']
})
export class AddBranchDetailsComponent implements OnInit {
  bankdetails : FormGroup ;
  Bankdidropvalueoptions: any [] = [];
  userTypeID: any;
  districtDrop: boolean = false ;
  bank_id_splited: any;
  bank_name_splited: any;
  submitted: boolean;
  Distdropvalueoptions: any [] = [];
  
  constructor(private fb: FormBuilder,public timesheetService : TimesheetService, public UserSessionService :UserSessionService,private el: ElementRef,private alertService :AlertService,) {
    this.userTypeID= this.UserSessionService.userTypeId();
    
   }

  ngOnInit() {
    if (this.userTypeID == 20){
      this.districtDrop = true;
      this.distlist();
      this.bankdetails = this.fb.group({ 
        'bank_id': new FormControl('',Validators.required),
        'district': new FormControl('',Validators.required),
        'branch_name': new FormControl('',Validators.required),
        'bank_address': new FormControl('',Validators.required),  
        'ifsc': new FormControl('',[Validators.required, Validators.pattern("^[0-9a-zA-Z]*$")]),
        'micr': new FormControl('',[Validators.required, Validators.pattern("^[0-9a-zA-Z]*$")]),
        'city': new FormControl('',Validators.required),
        'contact_no': new FormControl('',null),
  
      });
    }
    if (this.userTypeID == 3){
      this.bank_dropdown();
      this.bankdetails = this.fb.group({ 
        'bank_id': new FormControl('',Validators.required),
        'district': new FormControl('',null),
        'branch_name': new FormControl('',Validators.required),
        'bank_address': new FormControl('',Validators.required),  
        'ifsc': new FormControl('',[Validators.required, Validators.pattern("^[0-9a-zA-Z]*$")]),
        'micr': new FormControl('',[Validators.required, Validators.pattern("^[0-9a-zA-Z]*$")]),
        'city': new FormControl('',Validators.required),
        'contact_no': new FormControl('',null),
  
      });
    }
  
  }
  distlist(){
    this.timesheetService.getdropdowdatafordistr().subscribe((data) => {
      let bankList = data.result.district_det;
       // Dist emis admin Dropdown Values
       let distList = data.result.district_det;
       if(distList.length>0){
        this.Distdropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<distList.length;i++){
          this.Distdropvalueoptions.push({ value: distList[i].id, label: distList[i].bank_dist })
        }
      }
      else
      {
        this.Distdropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }
  bank_dropdown()  { 
    this.timesheetService.getdropdowdataforbank().subscribe((data) => {
      let bankList = data.result.bank_details;
      // Bank Dropdown Values
      if(bankList.length>0){
        this.Bankdidropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<bankList.length;i++){
          this.Bankdidropvalueoptions.push({ value: bankList[i].id + "-" +bankList[i].bank, label: bankList[i].bank })
        }
      }
      else
      {
        this.Bankdidropvalueoptions.push({ value: "", label: "No Data" })
      }
    });
  }
  bank_save(){

    // {"records":{"bank_id":"","bank_name":"","branch":"","branch_add":"","contact_no":"","city":"","ifsc_code":"VIJB022323006809","micr_code":"605029069090903"}}
    this.submitted = true;
    debugger;
    if (this.bankdetails.valid) { 

    let
    bank_id_name=this.bankdetails.value.bank_id,
    district=this.bankdetails.value.district,
    branch_name=this.bankdetails.value.branch_name,
    bank_address=this.bankdetails.value.bank_address,
    ifsc=this.bankdetails.value.ifsc,
    micr=this.bankdetails.value.micr,
    city=this.bankdetails.value.city,
    contact_no=this.bankdetails.value.contact_no;

    let  bank_name = bank_id_name.toString().split('-');
    this.bank_id_splited = bank_name[0];
    this.bank_name_splited = bank_name[1];

    let datas = {"bank_id" : this.bank_id_splited,"bank_name" : this.bank_name_splited,"branch_add" : bank_address,"branch" : branch_name,"ifsc_code" : ifsc,"micr_code" : micr,"city" : city,"contact_no" : contact_no,};
    console.log(datas,"log");
    this.timesheetService.districtloginsaveAPI({"records":datas}, true).subscribe((res) => {
      if(res){
        console.log(datas,"ressss");
        this.alertService.success("Data Save Successfully");
      }
      else {
        this.alertService.error("Please Fill all the Required Fields"); 
      }
    })
    // this.alertService.success("Data Save Successfully");
   }

   else{
    for (const key of Object.keys(this.bankdetails.controls)) {
      if (this.bankdetails.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
   }
  }

  selecteddistrict(event)
  {
    let distid = event.value;

    this.timesheetService.getdropdowdataforemisbank(distid).subscribe((data) => {
      let bankList = data.result.bank_details;
      console.log(bankList,"bankList");
      
      // Bank Dropdown Values
      if(bankList.length>0){
        this.Bankdidropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<bankList.length;i++){
          this.Bankdidropvalueoptions.push({ value: bankList[i].id + "-" +bankList[i].bank, label: bankList[i].bank })
        }
      }
      else
      {
        this.Bankdidropvalueoptions.push({ value: "", label: "No Data" })
      }
    });  }

}


