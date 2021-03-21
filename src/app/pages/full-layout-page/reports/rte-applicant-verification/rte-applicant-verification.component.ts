import { Component, OnInit, ElementRef } from '@angular/core';
import { ReportsService } from '../reports.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-rte-applicant-verification',
  templateUrl: './rte-applicant-verification.component.html',
  styleUrls: ['./rte-applicant-verification.component.css']
})
export class RTEApplicantVerificationComponent implements OnInit {
  studentverificationdetail: FormGroup ;
  verificationstudentlistapi: any;
  noDataFound: boolean;
  showDialogBox:  boolean = false   ;
  studentsverification: { label: string; value: string; }[];
  popup_detail: any;
  reason_for_not_eligible: boolean = false ;
  studentsverificationReason: { label: string; value: string; }[];
  submitted: boolean;
  photo_filepath: any;
  proof_of_birth_filepath: any;
  parent_id_filepath: any;
  address_proof_filepath: any;
  other_certifi_filepath: any;
  studentName: any;
  images:any[] = [];
  RegisterNumber: any;
  student_list: boolean;
  Header_value: string;
  districtId: string;
  exportExcelData: any;
  districName: any;
  dob_pop: any;
  class_s: any;
  cond_tr: boolean;

  

  constructor(public reportsService : ReportsService, private fb: FormBuilder,  private router: Router, private alertService :AlertService,private el: ElementRef, private userSessionService: UserSessionService) {
    this.districName = this.userSessionService.districtName();

    
    this.studentsverificationReason = [
      {label: 'Invalid Document', value: '1'},
      {label: 'Incorrect Residence', value: '2'},
      {label: 'Others', value: '3'},
      ];
  }
  cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'student_name', header: 'Student Name',widthstyle: '12em'},
  { field: 'map_address', header: 'Address',widthstyle: '16em'},
  { field: 'category', header: 'Category',widthstyle: '12em'},
  { field: 'verify_status', header: 'Verify Status',widthstyle: '11em'},
  { field: 'reason', header: 'Reason',widthstyle: '15em'},
  { field: 'remarks', header: 'Remarks' ,widthstyle: '15em'},
  ];

  ngOnInit() {
   this.rtestudentlist();
   this.studentverificationdetail = this.fb.group({
    'student_name' : new FormControl(this.studentName,null),
    'verify_status' : new FormControl('',Validators.required),
    'reason' : new FormControl('',null),
    'remarks': new FormControl('',Validators.required),
    'register_no': new FormControl('',null),
    'gender': new FormControl('',null),
    'class': new FormControl('',null),
    'dob': new FormControl('',null),
    'category': new FormControl('',null),
    'sub_category': new FormControl('',null),
    'mobile': new FormControl('',null),
    'map_address': new FormControl('',null),
    'address': new FormControl('',null),
    'verified_by': new FormControl('',Validators.required), 
    });

  }
  // close dialog
  close_dialog(){
    this.showDialogBox = false;
  }
  save(){
    this.submitted = true;
    debugger;
    if (this.studentverificationdetail.valid) { 

    let register_no =this.studentverificationdetail.value.register_no,
    verify_status =this.studentverificationdetail.value.verify_status ,
    reason = this.studentverificationdetail.value.reason ,
    remarks = this.studentverificationdetail.value.remarks,
    verified_by = this.studentverificationdetail.value.verified_by ;

    let datas = {"register_no" : register_no, "verify_status" : verify_status,"remarks" : remarks,"reason" : reason, "verified_by" : verified_by };
    debugger;
    this.reportsService.studentverifiactionsaveAPI({"records":datas}, true).subscribe((res) => {
      if(res){
      }
      this.alertService.success(res.message);
      this.Home_page();
    })
   }
   else
    {
      for (const key of Object.keys(this.studentverificationdetail.controls)) {
        if (this.studentverificationdetail.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys',key);
          invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all the Required Fields");
    }

  }
  rtestudentlist(){
    this.student_list=true;
    let reg_no = " " ;
    this.reportsService.rteverifiactionlistAPI(reg_no).subscribe((res) => {
      console.log(res.result);
      if(res.result.length>0)
      {
        this.verificationstudentlistapi = res.result; 
        var test =this.verificationstudentlistapi;

        for (var i in test) {
          if (test[i].reason == 1) {
            test[i].reason = 'Invalid Document' 
          } 
          else if(test[i].reason == 2){
            test[i].reason = 'Incorrect Residence' 
          }
          else if(test[i].reason == 3){
            test[i].reason = 'Others' 
          }
          else {
            test[i].reason = '' 
          }
        }

        for (var i in test) {
          console.log("tes",test[i].verify_status);
          if (test[i].verify_status == 3) {
            test[i].verify_status = 'Not Eligible' 
          } 
          else if(test[i].verify_status == 2){
            test[i].verify_status = 'Missing Document' 
          }
          else if(test[i].verify_status == 1){
            test[i].verify_status = 'Eligible' 
          }
          else {
            test[i].verify_status = ' ' 
          }
        }

      }
      else
      {
        this.noDataFound = true;
      }
    })
  }
  getcolor(){
   
  }
  getSelectedStudentDetails(reg_no){
    this.reportsService.rteverifiactionlistAPI(reg_no).subscribe((res) => {
      this.popup_detail = res.result[0];
        this.dob_pop = res.result[0].dob;
        this.class_s=res.result[0].class;
      if(this.dob_pop <= "2015-07-31" && this.class_s == 13){
        this.cond_tr=true;
        this.studentsverification = [
          {label: 'Not Eligible', value: '3'},
          ];
      }
      else {
        debugger
        this.cond_tr=false;
        this.studentsverification = [
          {label: 'Eligible', value: '1'},
          {label: 'Not Eligible', value: '3'},
          {label: 'Missing Document', value: '2'},
          ];
      }
// dob <= '2015-07-31' and class =13
      this.studentName = res.result[0].student_name;
      this.RegisterNumber = res.result[0].register_no;

      this.Header_value =  this.studentName + " - " + "(" +  this.RegisterNumber + ")"

      this.photo_filepath = res.result[0].photo_filepath;
      
      this.proof_of_birth_filepath = res.result[0].proof_of_birth_filepath;
      this.parent_id_filepath = res.result[0].parent_id_filepath;
      this.address_proof_filepath = res.result[0].address_proof_filepath;
      this.other_certifi_filepath = res.result[0].other_certifi_filepath;
      this.studentverificationdetail.patchValue(this.popup_detail); 

      if(res.result[0].class == 1)
      {
        this.studentverificationdetail.controls['class'].setValue("I");
      }
      else if (res.result[0].class == 13)
      {
        this.studentverificationdetail.controls['class'].setValue("LKG");
      }
      
    if(this.proof_of_birth_filepath != null && this.parent_id_filepath != null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath != null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":this.parent_id_filepath},
        {"img":this.address_proof_filepath},
        {"img":this.other_certifi_filepath}, 
      ];
    }
    else if (this.proof_of_birth_filepath == null && this.parent_id_filepath != null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath != null){
      this.images = [
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":this.parent_id_filepath},
        {"img":this.address_proof_filepath},
        {"img":this.other_certifi_filepath}, 
      ];
    }
    else if (this.proof_of_birth_filepath != null && this.parent_id_filepath == null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath != null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":this.address_proof_filepath},
        {"img":this.other_certifi_filepath}, 
      ];
    }
    else if (this.proof_of_birth_filepath != null && this.parent_id_filepath != null &&  this.address_proof_filepath == null &&  this.other_certifi_filepath != null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":this.parent_id_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":this.other_certifi_filepath}, 
      ];
    }
    else if (this.proof_of_birth_filepath != null && this.parent_id_filepath != null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath == null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":this.parent_id_filepath},
        {"img":this.address_proof_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"}, 
      ];
    }
    else if (this.proof_of_birth_filepath == null && this.parent_id_filepath == null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath == null){
      this.images = [
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":"../../../../../assets/img/no_image_available.png"},
        {"img":this.address_proof_filepath},
        {"img":this.other_certifi_filepath},         
      ];
    }
    else if (this.proof_of_birth_filepath == null && this.parent_id_filepath != null &&  this.address_proof_filepath == null &&  this.other_certifi_filepath != null){
      this.images = [
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":this.parent_id_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"},
        {"img":this.other_certifi_filepath},         
      ];
    }
    else if (this.proof_of_birth_filepath != null && this.parent_id_filepath == null &&  this.address_proof_filepath == null &&  this.other_certifi_filepath != null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":"../../../../../assets/img/no_image_available.png"},
        {"img":this.other_certifi_filepath},         
      ];
    }
    else if (this.proof_of_birth_filepath != null && this.parent_id_filepath != null &&  this.address_proof_filepath == null &&  this.other_certifi_filepath == null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":this.parent_id_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":"../../../../../assets/img/no_image_available.png"},
      ];
    }
    else if (this.proof_of_birth_filepath == null && this.parent_id_filepath != null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath == null){
      this.images = [
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":this.parent_id_filepath},
        {"img":this.address_proof_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"},
      ];
    }
    else if (this.proof_of_birth_filepath != null && this.parent_id_filepath == null &&  this.address_proof_filepath != null &&  this.other_certifi_filepath == null){
      this.images = [
        {"img":this.proof_of_birth_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"}, 
        {"img":this.address_proof_filepath},
        {"img":"../../../../../assets/img/no_image_available.png"},
      ];
    }
    else {
    this.images = [
      {"img":"../../../../../assets/img/no_image_available.png"}, 
      {"img":"../../../../../assets/img/no_image_available.png"}, 
      {"img":"../../../../../assets/img/no_image_available.png"}, 
      {"img":"../../../../../assets/img/no_image_available.png"},
      ];
     }  
    })
    this.showDialogBox=true;
    this.student_list=false;
  }
  Home_page(){
    this.showDialogBox=false;
    this.rtestudentlist();
  }
  StudentVerificationType(event){
    let verify_status = event.value ;
    if (verify_status == '3'){
      debugger;
      this.reason_for_not_eligible = true ;
      this.studentverificationdetail.controls['reason'].setValidators(Validators.required);
      this.studentverificationdetail.controls['remarks'].setValidators(Validators.required);
    } 
    else if (verify_status == '2' || verify_status == '1'){
      debugger;
      this.reason_for_not_eligible = false ;
      this.studentverificationdetail.controls['reason'].setValidators(null);
      this.studentverificationdetail.controls['reason'].setValue("");
      this.studentverificationdetail.controls['remarks'].setValidators(Validators.required);
    } 
    else {
      this.studentverificationdetail.controls['reason'].updateValueAndValidity();
      this.studentverificationdetail.controls['remarks'].updateValueAndValidity();
    }    
  }
// Excelfiledownload
getRteData(){
  this.exportExcelData = [];
  this.verificationstudentlistapi.map(item => {
    return {
      'Student Name': item.student_name,
      'Map Address': item.map_address,
      'Address': item.address,
      'Category': item.category,
      'Verify Status': item.verify_status,
      'Reason': item.reason,
      'Remarks': item.remarks,
       } 
       }).forEach(item => this.exportExcelData.push(item));
       let Rtestudentlist = [];
       for(let studentlist of this.exportExcelData) {
        Rtestudentlist.push(studentlist);
       }
       return Rtestudentlist;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getRteData());
      const workbook = { Sheets: { 'RTE Students List' : worksheet }, SheetNames: ['RTE Students List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districName +' (RTE Students List) ');
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
  });
} 
}
