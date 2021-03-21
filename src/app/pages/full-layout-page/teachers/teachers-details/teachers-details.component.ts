import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api'
import {Message} from 'primeng/api';

@Component({
  selector: 'app-teachers-details',
  templateUrl: './teachers-details.component.html',
  styleUrls: ['./teachers-details.component.css']
})

export class TeachersDetailsComponent implements OnInit {
  form: FormGroup;
  data: any;
  noDataFound: boolean;
  teacher_uid: any;
  aadhar: any;
  Aadhar_code: any;
  udise_code: any;
  adhar: any;
  udise_data:any;
  password:any;
  udisecodeschool: any;
  school_name: any;
  schoolname: any;
  student_name: any;
  school_id: any;
  studentname: any;
  student_school_id: any;
  msgs: Message[] = [];
  position: string;
  School_name: any;
  teacher_id: any;
  studentuniq: any;
  school_key_id: any;
  userTypeID: any;
  districtId: any;
  userId: number;
  emisteamlogin: boolean;
  Districtlogin: boolean;
  studentmedium: any;
  medium_name: any;
  medium_drop: any;
  sectionlist: any;
  term: { value: number; label: string; }[];
  medium_id: any;
  sectionList: any;
  medium_udisecode: any;
  id: any;
  deletemediumid: any;
  deleteid: any;
  deleteschoolid: any;
  
  constructor(private fb:FormBuilder,
    private teacherService : TeacherService,
    private userSessionService: UserSessionService,
    private alertService : AlertService,
    private confirmationService: ConfirmationService) {
      this.userTypeID = this.userSessionService.userTypeId();
      this.districtId = this.userSessionService.districtId();
      this.userId = this.userSessionService.userId();  
   }
   cols: Array<{'field':string,'header':string,'widthstyle':string}> =
   [
   { field: 'medium_name', header: 'Medium Name',widthstyle: '12em'},
      ];
  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    if (this.userTypeID == 21 )
    {
    this.emisteamlogin = true; 
    // this.getschoolwithoutdatastate();
  } 
   if (this.userTypeID == 3 ) {
    this.Districtlogin=true;
    this.GetStudentmediumdropdown();
   }
    this.initialValidators();
  }
  initialValidators() {
    this.form = this.fb.group({
      'UDISE_code': new FormControl('',Validators.required),
      'Aadhar_code': new FormControl('',Validators.required),
      'udise_code': new FormControl('',Validators.required),
      'udise_codeschool': new FormControl('',Validators.required),
      'school_name': new FormControl('',Validators.required),
      'Student_name': new FormControl('',Validators.required),
      'student_name': new FormControl('',Validators.required),
      'student_school_id': new FormControl('',Validators.required),
      'UDISE_codemedium': new FormControl('',Validators.required),
      'medium_name': new FormControl('',Validators.required),
      'medium_nameadd': new FormControl('',Validators.required),
    })}
    // Part1
    GetPassword()
    {
      this.udise_code =this.form.value.UDISE_code;
     
      this.teacherService.getudisedata(this.udise_code).subscribe(res =>
        {
         
         this.udise_data = res.result;
       this.password =  this.udise_data[0]['ref'];
       if(res.dataStatus){
        this.alertService.success(res.message);
       }
       else if (res.status==204) {
        this.alertService.error(res.message);
      }
      else if (res.status==404) {
        this.alertService.error(res.message);
      }
    })

    }
  // Part2: 1
    onsaveadhar(){
      debugger;
     this.adhar=this.form.value.Aadhar_code;  
this.teacherService.getteachersdata(this.adhar).subscribe((res) => {
  debugger;
  if(res.result.length>0){
    this.udise_code = res.result[0]['udise_code'];
    this.school_key_id = res.result[0]['school_key_id'];
    this.form.patchValue(this.udise_code);
    if(res.dataStatus){
      this.alertService.success(res.message);
     }
     else if (res.status==204) {
      this.alertService.error(res.message);
    }
    else if (res.status==404) {
      this.alertService.error(res.message);
    }
  }
});
 }
// part2: 2
onSave() {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.teacher_id=this.form.value.Aadhar_code;
        let data = {"school_id" : this.school_key_id,"teacher_uid" : this.teacher_id,"archive":"1",};
         this.teacherService.postteachersave({"records":data}).subscribe((res) => {
           if(res.dataStatus){
            this.alertService.success("Data Admit Successfully");
           }
           else if (res.status==204) {
            this.alertService.error(res.message);
          }
          else if (res.status==404) {
            this.alertService.error(res.message);
          }
         });      }
  });
}
//  3rdsection: 1
getudiseschool(){
  debugger;
 this.udisecodeschool=this.form.value.udise_codeschool;
this.teacherService.getudiseschool(this.udisecodeschool).subscribe((res) => {
debugger;
if(res.result.length>0){
this.school_name = res.result[0]['school_name'];
this.school_id = res.result[0]['school_id'];
this.form.patchValue(this.school_name);
if(res.dataStatus){
  this.alertService.success(res.message);
 }
 else if (res.status==204) {
  this.alertService.error(res.message);
}
else if (res.status==404) {
  this.alertService.error(res.message);
}
}
});
}
// Thirdsection: 2
Onsaveschoolname() {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to Change school name?',
      accept: () => {
        this.School_name=this.form.value.school_name;
        let data = {"school_id" : this.school_id,"school_name" : this.School_name};
        debugger;
         this.teacherService.postschoolnamesave({"records":data}).subscribe((res) => {
           
          if(res.dataStatus){
            this.alertService.success("School Name Updated Succefully");
           }

           else if (res.status==204) {
            this.alertService.error(res.message);
          }
          else if (res.status==404) {
            this.alertService.error(res.message);
          }
         });        }
  });
}

// Fourthsection: 1

GetStudentname(){
  debugger;
 this.studentname=this.form.value.Student_name;
this.teacherService.getstudentname(this.studentname).subscribe((res) => {
debugger;
if(res.result.length>0){
  this.student_name = res.result[0]['student_name'];
  this.form.patchValue(this.student_name);
if(res.dataStatus){
  this.alertService.success(res.message);
 }
 else if (res.status==204) {
  this.alertService.error(res.message);
}
else if (res.status==404) {
  this.alertService.error(res.message);
}
}
});
}
// Fouthsection; 2
Onsaveschoolid() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to reset TC for this student?',
      accept: () => {
        this.studentuniq=this.form.value.Student_name;

        let data = {"student_unique_id" : this.studentuniq,"hm_tc_flag" :0 };
         this.teacherService.postschoolid({"records":data}).subscribe((res) => {
           if(res.dataStatus){
            this.alertService.success("TC reset successfully");
           }
           else if (res.status==204) {
            this.alertService.error(res.message);
          }
          else if (res.status==404) {
            this.alertService.error(res.message);
          }
         });
       }      
  });
}
// Newfiled
GetStudentmedium(){
  debugger;
 this.studentmedium=this.form.value.UDISE_codemedium;
 debugger;
this.teacherService.getstudentmedium(this.studentmedium).subscribe((res) => {
  this.medium_name = res.result;
debugger;
if(res.result.length>0){
  this.school_id = res.result[0]['school_id'];
  this.medium_id = res.result;
  this.id = res.result;
  this.medium_name = res.result;
  this.form.patchValue(this.medium_name);
// if(res.dataStatus){
//   this.alertService.success("Data Submit Successfully");
//  }
//  else if (res.status==204) {
//   this.alertService.error(res.message);
// }
// else if (res.status==404) {
//   this.alertService.error(res.message);
// }
}
});
}
// mediumdropdown
GetStudentmediumdropdown(){
  debugger;
this.teacherService.getstudentmediumdropdown().subscribe((res) => {
debugger;
this.sectionlist = res['result'];

this.sectionlist = [{"value": 3,"label": "Gujarati"},
{"value": 4,"label": "Hindi"},
{"value": 5,"label": "Kannada"},
{"value": 8,"label": "Malayalam"},
{"value": 15,"label": "Sindhi"},
{"value": 16,"label": "Tamil"},
{"value": 17,"label": "Telugu"},
{"value": 18,"label": "Urdu"},
{"value": 19,"label": "English"},
{"value": 31,"label": "Arabic"},
];
});
}
// Update section
Onsaveaddmedium() {
  debugger
  this.medium_id=this.form.value.medium_nameadd;
  debugger;
  this.medium_udisecode=this.form.value.UDISE_codemedium;
        let data = {"school_key_id" :this.school_id, "medium_instrut" :this.medium_id, "udise_code" :this.medium_udisecode,};
         this.teacherService.updatesectionpost({"records":data}).subscribe((res) => {
          if (res.status == 200) {
            if(!res.dataStatus) {
             debugger;
             this.alertService.error("Medium Already Available in School");
             this.GetStudentmedium();
            }
            else {
             this.alertService.success("Medium Saved Successfully"); 
             this.GetStudentmedium();
            }
          }
          else {
           this.alertService.error(res.message);
           this.GetStudentmedium();
          }
         });
       }      
       onChangeClass(event) {
        debugger;
        this.medium_id = event.value;
      }
//       // Newfiled
//       OnDeletemedium(id){
//         this.deletemediumid = this.medium_id,
//         this.deleteid = id.id,
//         this.deleteschoolid = this.school_id,

//   this.teacherService.Deletemedium(this.deletemediumid,this.deleteid,this.deleteschoolid).subscribe((res) => {
//   console.log("delete",res)
// if (res.status == 200) {
//   console.log(res.dataStatus,"res.data");
//   if(!res.dataStatus) {
//    debugger;
//    this.alertService.error("res.data");
//    console.log("log 1");
//    this.GetStudentmedium();
//   }
//   else {
//    debugger;
//    this.alertService.success(res.message); 
//    console.log("log 2");
//    this.GetStudentmedium();
//   }
// }
// else {
//  debugger;
//  this.alertService.error(res.message);
//  console.log("log 3");
//  this.GetStudentmedium();
// }
// });
// }
// deletemedium
OnDeletemedium(rowData)
  {
    this.deletemediumid = rowData[0].medium_id;
    this.deleteid = rowData[0].id;
    this.deleteschoolid = rowData[0].school_id;
    // console.log("deletemediumid", this.deletemediumid)
    // console.log("deleteid", this.deleteid)
    // console.log("deleteschoolid", this.deleteschoolid)
    this.teacherService.Deletemedium(this.deletemediumid,this.deleteid,this.deleteschoolid).subscribe((res) => {
      if (res.status == 200) {
        if(!res.dataStatus) {
         debugger;
         this.alertService.error("Cannot delete medium because the medium is assigned to a section");
         this.GetStudentmedium();
        }
        else {
         debugger;
         this.alertService.success("Medium Deleted Successfully"); 
         this.GetStudentmedium();
        }
      }
    });    
  }
}
