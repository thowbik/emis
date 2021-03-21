import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { BrteService } from '../brte.service';
import { AlertService } from 'src/services/alert.service';
import { UidaiValidationService } from 'ng2-uidai-validation';
import { TeacherStudentComponent } from '../../teachers/teacher-student/teacher-student.component';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.css']
})
export class VolunteerDetailsComponent implements OnInit {
  forms : FormGroup;
  form : FormGroup;
  index: number = 0;
  gender: any [];
  submitted: boolean;
  schl_id: any;
  VolunteerCategory: any [];
  AcademicOption : any [] =[];
  SocialOption: any [] = [];
  BlockOption: any  []= [];
  BlockSchoolOption: any [] = [];
  teacherId: any;
  Gendertype: { label: string; value: string; }[];
  ParentType: { label: string; value: string; }[];
  Districtlist: any;
  mothertongue: { name: string; id: string; }[];
  mother_tongue: { name: string; id: string; }[];
  MotherLang: { label: string; value: string; }[];
  StudiedUpto: { label: string; value: string; }[];
  all_district_value: any [] = [];
  all_differntly_value: any [] = [];
  all_socialcategory_value: any [] = [];
  socialcategory: any;
  differntlyabled: any;
  ParentTypelist: { label: string; value: string; }[];
  submitted1: boolean;
  PageStage: number;
  all_age_value: any [] = [];
  schoolDrop: boolean;
  BlockSchoolOption1: any[]=[];
  schoolDrop1: boolean;
  todayDate: string;
  inValidAadhar: boolean;
  inValidAadhar1: boolean;
  all_district_values: any [] = [];
  id: any;
  teacherdatalist: any;
  IndxID: any;
  Teacherdetailslist: any;
  routeData: any;
  userType: any;
  studentDetails: any;
  studentData: any[]=[];
  updateData: any;
  allowedtoview: boolean;
    constructor( private fb: FormBuilder,private el: ElementRef,
    private uidaiValidationService: UidaiValidationService,
    private router: Router, public UserSessionService :UserSessionService,private alertService :AlertService,
    private BrteService: BrteService,
    private route: ActivatedRoute)
   {
    this.schl_id=this.UserSessionService.schoolId();
    this.teacherId=this.UserSessionService.teacherId();
    this.routeData = this.route.snapshot.params;
    debugger;
    this.userType = this.routeData.type;
    this.id = this.routeData.id;
    
    // this.id = this.router.getCurrentNavigation().extras;
    // console.log("this.id",this.id)
    }

  ngOnInit() {
    this.initialValidators();
    // console.log(this.index,"index");
    this.GetAge();
  
    this.getDistrictdropdownlist();
    this.getDifferntlyabledlist();
    this.getSocialCategory();
    this.PageStage=1;
    this.todayDate = new Date().toISOString().split('T')[0];
    this.gender=[
      {label : "Male" , value : "1"},
      {label : "Female" , value : "2"},
      {label : "Transgender" , value : "3"},
    ];
    this.VolunteerCategory=[
      {label : "Student Volunteers" , value : "1"},
      {label : "Regular Teachers" , value : "3"},
      {label : "Retired Persons" , value : "4"},
      {label : "Other Volunteers" , value : "2"},
    ];
    this.BrteService.AcademicOptionApi().subscribe((data) => {
      let dropDownList = data.result;
      // console.log(data,"block");
      // Dropdown Values
      debugger;
      if(dropDownList.length>0){
        
        // this.AcademicOption.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          if(dropDownList[i]['Visiblty'] == 0)
          {
            // console.log(dropDownList[i]['Visiblty']);
            this.AcademicOption.push({ value: dropDownList[i].IndxID, label: dropDownList[i].AcadmicTeachr })
     
          }
              }
      }
      else
      {
        this.AcademicOption.push({ value: "", label: "No Data" })
      } 
    });
    this.BrteService.SocialCategryApi().subscribe((data) => {
      let dropDownList = data.data;
      // console.log(data,"block");
      // Dropdown Values
      debugger;
      if(dropDownList.length>0){
        // this.AcademicOption.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.SocialOption.push({ value: dropDownList[i].IndxID, label: dropDownList[i].SocialCat })
        }
      }
      else
      {
        this.SocialOption.push({ value: "", label: "No Data" })
      } 
    });

// end
    this.BrteService.BlockApi().subscribe((data) => {
      let dropDownList = data.blockList;
      // console.log(data,"block");
      // Dropdown Values
      debugger;
      if(data.message == "Success"){
        // this.AcademicOption.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          debugger;
          this.BlockOption.push({ value: dropDownList[i].block_id, label: dropDownList[i].block_name })
        }
      }
      else
      {
        this.BlockOption.push({ value: "", label: "No Data" })
      } 
    });

    this.Gendertype = [
      {label: 'Male', value: '1'},
      {label: 'Female', value: '2'},
      {label: 'Transgender', value: '3'},
    ];
    this.ParentTypelist = [
      {label: 'Father', value: '1'},
      {label: 'Mother', value: '2'},
      {label: 'Husband', value: '3'},
      {label: 'Daughter', value: '4'},
      {label: 'Son', value: '5'},
      {label: 'Not Applicable', value: '0'},

    ];
    this.MotherLang = [
      {label: 'Tamil', value: '16'},
      {label: 'Hindi', value: '4'},
      {label: 'Kannada', value: '5'},
      {label: 'malayalam', value: '8'},
      {label: 'Telugu', value: '17'},
      {label: 'Urdu', value: '18'},
      {label: 'Other', value: '0'},
    ];
    this.StudiedUpto = [
      {label: 'No Schooling', value: '0'},
      {label: 'Less Class III', value: '1'},
    ];

    if (this.id == 0){
      this.updateData = ''
      this.allowedtoview = false;

    } else {
      this.updateData = this.id;
      this.allowedtoview = true;

    }
   
    // console.log(this.updateData , '---------tes----')

    if(this.id != 0) {
      if(this.userType == 1) {
        this.learnerlist();
        setTimeout(() => {
          this.getStudentDetails(this.id);  
        }, 2000);
      
      }
      else {
        this.volunteerteacher();
        setTimeout(() => {
        this.getTeacherDetails(this.id);
      }, 2000);
      }
     
    }
    
  }
  initialValidators() {
      this.forms = this.fb.group({
        'StudNam': new FormControl('',[Validators.required, Validators.pattern('^[a-z A-Z 0-9]*$')]),
        'Gendr': new FormControl('',Validators.required),
        // 'DOB': new FormControl('',Validators.required),     
         'Aadhar': new FormControl('',null),
        // 'Aadhar': new FormControl('',[Validators.required, Validators.pattern('^[0-9]*$')]),
        'ParentType': new FormControl('',Validators.required),
        'ParentName': new FormControl('',[Validators.required, Validators.pattern('^[a-z A-Z 0-9]*$')]),
        'Address': new FormControl('',Validators.required),
        'DistrictId': new FormControl('',Validators.required),
        'NativeDistrictId': new FormControl('',Validators.required),
        'Pincode': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{5}')]),
        'Mobile': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{9}')]),
        'DOJ': new FormControl('',Validators.required),
        'SchlID': new FormControl('',Validators.required),
        'Disability': new FormControl('',Validators.required),
        'SocialCategory': new FormControl('',Validators.required),
        'MotherTongue': new FormControl('',Validators.required),
        'AcademicQualify': new FormControl('',Validators.required),
        'AGE': new FormControl('',Validators.required),
        'Block': new FormControl('',null),
      });
      this.form = this.fb.group({
        'TeachNam': new FormControl('',[Validators.required, Validators.pattern('^[a-z A-Z 0-9]*$')]),
        'AGE': new FormControl('',Validators.required),
        'Gendr': new FormControl('',Validators.required),
        // 'StaffDOB': new FormControl('',Validators.required),
        'Email': new FormControl('',null),
        'Aadhar': new FormControl('',null),
        // 'Aadhar': new FormControl('',[Validators.required, Validators.pattern('^[0-9]*$')]),
        'MblNo': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{9}')]),
        // 'MblNo': new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
        'StaffJoin': new FormControl('',Validators.required),
        'Block': new FormControl('',null),
        'SchlID': new FormControl('',Validators.required),
        'Academic': new FormControl('',Validators.required),
        'SclCategory': new FormControl('',Validators.required),
        'VolunteerCategory': new FormControl('',Validators.required),
      });
    }

  //  tab_index(indexs){
  //  console.log(indexs.index,"index");
  //  this.index=indexs.index;
  //  this.initialValidators();
  //  if(this.index == 0){
  //   this.submitted1 = false;
  //  }
  //  else{
  //    this.submitted = false;
  //  }
  //  }

   OnBlockChange(BlockId){
    this.BlockSchoolOption1=[];
    this.BlockSchoolOption=[];
    this.BrteService.BlockSchoolApi(BlockId).subscribe((data) => {
      let dropDownList = data.result;
      // console.log(data,"blockSchool");
      // Dropdown Values
      debugger;
      if(dropDownList.length>0){
        // this.AcademicOption.push({ value: "", label: "Choose" })
          if(this.PageStage==1){
           this.schoolDrop1 = true;
           this.BlockSchoolOption1 =  dropDownList.map(list => { return {label: list.school_name,value:list.school_id}});
          }
          if(this.PageStage==2){
           this.schoolDrop = true;
           this.BlockSchoolOption =  dropDownList.map(list => { return {label: list.school_name,value:list.school_id}});
          }
      }
      else
      {
        this.BlockSchoolOption.push({ value: "", label: "No Data" })
      } 
    });
   }
  
   save_brte() {
    debugger;
    this.submitted1 = true;
    if (this.form.valid) {
      let aadharNo = this.form.value.Aadhar;
    if(aadharNo != '' ){
      if(+aadharNo != 0) {
        let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
        if(!isValidUidaiNo){
        this.alertService.error('Invalid Aadhaar Number');
        this.inValidAadhar = true;
        return true;
        }
        }
      }
        let datas = [{
         "SchlID" : this.form.value.SchlID,
         "TeachNam" : this.form.value.TeachNam,
         "TeachCod" : this.teacherId,
         "Aadhar" : this.form.value.Aadhar,
         "Email" : this.form.value.Email,
         "Gendr" : this.form.value.Gendr,
        //  "StaffDOB" : this.form.value.StaffDOB,
         "StaffJoin" : this.form.value.StaffJoin,
         "MblNo" : this.form.value.MblNo,
         "SclCategory" : this.form.value.SclCategory,
         "VolunteerCategory" : this.form.value.VolunteerCategory,
         "Academic":this.form.value.Academic,
         "AGE" : this.form.value.AGE,
         "OrgTyp" : "",
         "OrgNam" : "",
         "E_UG":"",
         "E_PG":"",
         "Profsnl":"",
         "IndxID" : this.updateData,
         }];
        //  console.log(datas,"datas");
         
         this.BrteService.SaveBrte({"teacher_volunteers":datas}, true).subscribe((res) => {
           if(res){
            this.alertService.success("Data Save Successfully");
            this.submitted1= false;
            this.form.reset();
           }
           else {
            this.alertService.error("Please Fill all the Required Fields");
          }
         })

       }
       else {
        for (const key of Object.keys(this.form.controls)) {
          if (this.form.controls[key].invalid) {
             const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('invalid keys', key);
            // invalidControl.focus();
            // break;
          }
        }
        this.alertService.error('Please Fill All Mandatory Fields');
        //return true;
      }
    }


   getDistrictdropdownlist(){
    debugger;
    this.BrteService.getDistrictdropdownlist().subscribe((res) => {
      if (res) {
        this.Districtlist = res.result;

        let dropDownList = this.Districtlist;
        if(dropDownList.length > 0) {
        this.all_district_value = dropDownList.map(list => { return {label: list.DistNam,value:list.IndxID}});
        this.all_district_values = dropDownList.map(list => { return {label: list.DistNam,value:list.IndxID}});
        this.all_district_values.push({ value: 0, label: "Other State" })
        }
      }
    });
  }
  getDifferntlyabledlist(){
    debugger;
    this.BrteService.getDifferntlyabledlist().subscribe((res) => {
      if (res) {
        this.differntlyabled = res.data;
// console.log("differntlyabled",this.differntlyabled)
        let dropDownList = this.differntlyabled;

        if(dropDownList.length > 0) {
          this.all_differntly_value = dropDownList.map(list => { return {label: list.DAName,value:list.IndxID}});
          this.all_differntly_value.push({ value: "0", label: "Not Applicable" })
        }
        else
        {
          this.all_differntly_value.push({ value: "", label: "NO Data Found" })
        } 
      }
    });
  }
   
  GetAge(){
    // for (let i=19 ; i <100 ;i++) {
    // let dropDownList = this.differntlyabled;
      // if(dropDownList.length > 0) {
        for(let i=15 ; i < 100 ;i++)
        {
          this.all_age_value.push({ value: i, label: i })
        }
      // }
      // else
      // {
        // this.differntlyabled.push({ value: "0", label: "Other" })
      // } 
    // }

  }

  // Socialcategory
  getSocialCategory(){
    debugger;
    this.BrteService.getSocialCategory().subscribe((res) => {
      if (res) {
        this.socialcategory = res.data;

        let dropDownList = this.socialcategory;

        if(dropDownList.length > 0) {
          this.all_socialcategory_value = dropDownList.map(list => { return {label: list.SocialCat,value:list.IndxID}});
        }
        else
        {
          this.socialcategory.push({ value: "", label: "No Data Found" })
        } 
      }
    });
  }
 // Teacherlist
 getTeacherDetails(id){
  this.BrteService.getTeacherDatalist(id).subscribe((res) => {
      this.Teacherdetailslist = res.result[0];
      // console.log("this.Teacherdetailslist",this.Teacherdetailslist)
      this.form.patchValue(this.Teacherdetailslist);   
      if (this.Teacherdetailslist['Aadhar'] == 0)
      {
       this.form.controls['Aadhar'].setValue("");
       this.form.controls['Aadhar'].updateValueAndValidity();

    //  console.log("studentdata",this.Teacherdetailslist)
     }      
    });
}
getStudentDetails(id){
  // console.log("iddddddd",id)
  debugger;
  this.BrteService.getStudentInfo(id).subscribe((res) => {
    // console.log("iddddddd",id)

      this.studentData = res.result[0];
      // let getBlock = 
      // console.log("studentdata",this.studentData)
      this.forms.patchValue(this.studentData);   
    
      if (this.studentData['Aadhar'] == 0)
       {
        this.forms.controls['Aadhar'].setValue("");
        this.forms.controls['Aadhar'].updateValueAndValidity();

      // console.log("studentdata",this.studentData)
      }
    });
}

  onSaveschool() {
    debugger;
    this.submitted = true;
    // console.log(this.updateData , '-------------')
    if (this.forms.valid) {

      let aadharNo = this.forms.value.Aadhar;
      if(aadharNo != '' ){
        if(+aadharNo != 0) {
          let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
          if(!isValidUidaiNo){
          this.alertService.error('Invalid Aadhaar Number');
          this.inValidAadhar1 = true;
          return true;
          }
          }
        }

        let studentname=this.forms.value.StudNam,
        gender=this.forms.value.Gendr,
        // dob=this.forms.value.DOB,
        Adhar=this.forms.value.Aadhar,
        parentType=this.forms.value.ParentType,
        Addresss=this.forms.value.Address,
        districtId=this.forms.value.DistrictId,
        NativedistrictId=this.forms.value.NativeDistrictId,
        pincode=this.forms.value.Pincode,
        mobile=this.forms.value.Mobile,
        dOJ=this.forms.value.DOJ,
        parentname=this.forms.value.ParentName,
        schoolleaner=this.forms.value.SchlID,
        SoCategory=this.forms.value.SocialCategory,
        Mothertong=this.forms.value.MotherTongue,
        differntly=this.forms.value.Disability,
        academicQualify=this.forms.value.Disability,
        age=this.forms.value.AGE;
        let datas = 
          [{"SchlID":schoolleaner,
          "StudNam":studentname,
          "Gendr":gender, 
          "Disability":differntly, 
          "ParentType":parentType, 
          "ParentName":parentname,
          "MotherTongue":Mothertong,
          "AcademicQualify":academicQualify,
          "Aadhar":Adhar, 
          "Mobile":mobile,
          "SocialCategory":SoCategory,
          "Address":Addresss,
          "Pincode":pincode,
          "DistrictId":districtId,
          "NativeDistrictId":NativedistrictId,
          // "DOB":dob,
          "DOJ":dOJ,
          "AGE":age,
          "IndxID" : this.updateData,
          // "IndxID" : this.id,

        }]
         
        this.BrteService.Poststudentvolunteerlist({"students_non_formal":datas}, true).subscribe((res) => {
          if(res){
           this.alertService.success("Data Save Successfully");
           this.submitted= false;
           this.forms.reset();
          }
          else {
           this.alertService.error("Please Fill all the Required Fields");
         }
        })

       }
       else {
        for (const key of Object.keys(this.forms.controls)) {
          if (this.forms.controls[key].invalid) {
             const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            console.log('invalid keys', key);
            // invalidControl.focus();
            // break;
          }
        }
        this.alertService.error('Please Fill All Mandatory Fields');
        //return true;
      }
    }
    
  learnerlist()
  {
    this.PageStage=1;
    this.submitted = false;
  }
  volunteerteacher()
  {
    this.PageStage=2;
    this.submitted1 = false;
  }
  summaryreport(){
    this.router.navigate(['/brte-summary-reports']);
   }
  //  teacherlistpatch
 
}
