import { Component, OnInit, ElementRef } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { schoolsService } from '../schools.service';
import {ConfirmationService} from 'primeng/api';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

export interface sectionItem{
  label : string;
  value : number;
}

@Component({
  selector: 'app-student-promotion',
  templateUrl: './student-promotion.component.html',
  styleUrls: ['./student-promotion.component.css']
})
export class StudentPromotionComponent implements OnInit {
  studentList : FormGroup;
  targetStudentList : FormGroup;
  studentNameList : any;
  selectedStudentNameList : any[];
  selectedStudentNameListss : any[];
  class : any[];
  section : any;
  sctionid : any;
  msgs : any;
  class_id : any;
  data : any;
  data_medium : any;
  sectionData : any[];
  mediumData : sectionItem[];
  sourceId : any[];
  classData : any[];
  classid : any;
  schoolid : any;
  highclass : any;
  class_record : any;
  classId : any;
  classLabel : any;
  mediumId : any;
  class_Label : any;
  classDataTarget : any[];
  sectionDataTarget : sectionItem[];
  mediumDataTarget : sectionItem[];
  classIdTarget : any;
  classLabelTarget : any;
  class_record_target : any;
  mediumIdTarget : any;
  promoted_Student_List : any;
  id : string;
  class_studying_id : string;
  class_section : string ;
  education_medium_id : string ;
  target_medium:any;
  school_key_id : string ;
  student_id : string;
  from_class : number;
  to_class :  number;
  section_target : any;
  Id : any;
  InsertList : any;
  UpdateList : any;
  public schoolId: any;
  targ_val: any;
  targ_rom_val: any;
  disable: boolean =false;
  submitted: boolean;
  group_name_1: any;
  medium_name_1: any;
  group_id_1: any;
  mediumID: any;
  school_medium_id_1: any;

  constructor(private el: ElementRef, private schlService : schoolsService,private fb : FormBuilder,private confirmationService: ConfirmationService,
    private alertService: AlertService, private user :UserSessionService) { 
    this.schoolId = this.user.schoolId();
    this.highclass = this.user.highClass();
  }

  ngOnInit() {
    this.getClassApi();
      this.studentList = this.fb.group({
      'class_id_l': new FormControl('',Validators.required),
      'section_l': new FormControl('',Validators.required),
      'group_name_1': new FormControl('',null),
      'medium_name_1': new FormControl('',null),
      'group_id_1': new FormControl('',null),
      'group_id': new FormControl('',null),
      'medium_name': new FormControl('',null),
      'group_name': new FormControl('',null),
      'class_id': new FormControl('',Validators.required),
      'section': new FormControl('',Validators.required),
    });
  }

  getClassApi(){
    
    var schlId = this.schoolId;
    this.studentNameList = [];
    this.schlService.getSchoolClassDetails(schlId).subscribe((res)=> {
      this.class = res.result;
      
      // console.log(this.class);
    
      this.classData = this.class.map(list => {return { label : list.class_studying, value : list.class_id};
      })
         this.class_Label = this.classData[0].label;
        //Target
        this.classDataTarget = this.class.map(list => {return { label : list.class_studying, value : list.class_id};
      })
         this.class_Label = this.classDataTarget[0].label;
  });
}

getClassSelect(cls) {
  if (this.highclass == 12) {
    if (cls == 12 ) {
      this.disable = true;
     } else {
      this.disable = false;
     }
  }
  else if(this.highclass == 10){
    if (cls == 10 ) {
      this.disable = true;
     } else {
      this.disable = false;
     }
  }
  else if(this.highclass == 8){
    if (cls == 8 ) {
      this.disable = true;
     } else {
      this.disable = false;
     }
  }

  if (cls == 15 ) {
    this.targ_val = parseInt(cls) - 2;
  }
  else if(cls == 14) {
    this.targ_val = parseInt(cls) - 13;
  }
  else {
    this.targ_val = parseInt(cls) + 1;
  }

  if (this.targ_val == 1 ) {
    this.targ_rom_val = 'I';
  }
  else if(this.targ_val == 2) {
    this.targ_rom_val = 'II';
  }
  else if(this.targ_val == 3){
    this.targ_rom_val = 'III';
  }
  else if(this.targ_val == 4){
    this.targ_rom_val = 'IV';
  }
  else if(this.targ_val == 5){
    this.targ_rom_val = 'V';
  }
  else if(this.targ_val == 6){
    this.targ_rom_val = 'VI';
  }
  else if(this.targ_val == 7){
    this.targ_rom_val = 'VII';
  }
  else if(this.targ_val == 8){
    this.targ_rom_val = 'VIII';
  }
  else if(this.targ_val == 9){
    this.targ_rom_val = 'IX';
  }
  else if(this.targ_val == 10){
    this.targ_rom_val = 'X';
  }
  else if(this.targ_val == 11){
    this.targ_rom_val = 'XI';
  }
  else if(this.targ_val == 12){
    this.targ_rom_val = 'XII';
  }
  else if(this.targ_val == 13){
    this.targ_rom_val = 'LKG';
  }
  else if(this.targ_val == 14){
    this.targ_rom_val = 'UKG';
  }
  else if(this.targ_val == 15){
    this.targ_rom_val = 'PRE-KG';
  }

  this.classDataTarget = [];
  var test = this.targ_val
  if(this.targ_val == 1){
    var I = this.targ_val
  } else if(this.targ_val == 2){
    var II = this.targ_val
  }
  this.classDataTarget = [
    {label: this.targ_rom_val, value: this.targ_val},
    ];
    
  this.classId = [];
  this.classId = this.class.filter(i => i.class_id == cls).map(list => { return {label :list.class_id}}); 
  this.classLabel = this.classId[0].label;
  this.schoolid = this.schoolId;
  this.class_record = {"records":{"class_id": this.classLabel, "school_id":this.schoolid}}
  // console.log(this.class_record, '-------------this.class_record')
  debugger
  this.studentNameList = [];
  this.studentList.controls['section_l'].setValue('');
  this.studentList.controls['section_l'].updateValueAndValidity();
  this.studentList.controls['class_id'].setValue('');
  this.studentList.controls['class_id'].updateValueAndValidity();
  this.studentList.controls['section'].setValue('');
  this.studentList.controls['section'].updateValueAndValidity();
  this.studentList.controls['medium_name'].setValue('');
  this.studentList.controls['medium_name'].updateValueAndValidity();
  this.studentList.controls['medium_name_1'].setValue('');
  this.studentList.controls['medium_name_1'].updateValueAndValidity();
  this.studentList.controls['group_name'].setValue('');
  this.studentList.controls['group_name'].updateValueAndValidity();
  this.studentList.controls['group_name_1'].setValue('');
  this.studentList.controls['group_name_1'].updateValueAndValidity();
  this.schlService.getSchoolSectionDetails(this.class_record).subscribe((res) =>
  {
    this.data = res.result;
    this.sectionData = this.data.map(i =>
      { 
        return {label:i.section,value:i.section};
      });
  })
}
getSectionSelect(event)
{
  this.section= event;
  var classid= this.classLabel;
  var section = this.section;
  var schlId = this.schoolId;
  this.studentNameList = [];
  this.studentList.controls['class_id'].setValue('');
  this.studentList.controls['class_id'].updateValueAndValidity();
  this.studentList.controls['section'].setValue('');
  this.studentList.controls['section'].updateValueAndValidity();
  this.studentList.controls['medium_name'].setValue('');
  this.studentList.controls['medium_name'].updateValueAndValidity();
  this.studentList.controls['medium_name_1'].setValue('');
  this.studentList.controls['medium_name_1'].updateValueAndValidity();
  this.studentList.controls['group_name'].setValue('');
  this.studentList.controls['group_name'].updateValueAndValidity();
  this.studentList.controls['group_name_1'].setValue('');
  this.studentList.controls['group_name_1'].updateValueAndValidity();
  this.schlService.getSchoolMediumList(classid,section,schlId).subscribe((result =>
    {
      this.data_medium = result.result;
      this.mediumID=this.data_medium[0]['school_medium_id'];
      this.mediumData = this.data_medium.map(i =>
        {
          return {label:i.medium_name,value:i.school_medium_id};
        });
        this.mediumId = this.mediumData[0].value;
        this.getSectiongroupname(event);
    }))
}
getSectiongroupname(event) {
  this.section= event;
  var classid= this.classLabel;
  var section = this.section;
  var schlId = this.schoolId;
  this.schlService.getSchoolMediumList(classid,section,schlId).subscribe((result =>
    {
      this.data_medium = result.result;
      this.studentList.patchValue(this.data_medium[0]);
    }))
}

submit(){
  var classid = this.studentList.value.class_id_l;
  var section = this.studentList.value.section_l;
  var schlId = this.schoolId;
    this.schlService.getStudentNameList(classid,section,schlId).subscribe((res) =>
    {
      if(res.result.length>0){
        this.studentNameList = res.result;
        this.selectedStudentNameList =[];
      }
        else {
        this.alertService.warning('Data not Found');
      }
    })
  }

//TARGET
getClassSelectTarget(cls) {
  // console.log(cls);
  this.classIdTarget = [];
  this.classIdTarget = this.class.filter(i => i.class_id == cls).map(list => { return {label :list.class_id}}); 
  this.classLabelTarget = this.classIdTarget[0].label;
  this.schoolid = this.schoolId;
    this.class_record_target = {"records":{"class_id": this.targ_val, "school_id":this.schoolid}}


    this.schlService.getSchoolSectionDetails(this.class_record_target).subscribe((res) =>
    {
      this.data = res.result;
    
      this.sectionDataTarget = this.data.map(i =>
        { 
          return {label:i.section,value:i.section};
        });
    })
}

getSectionSelectTarget(event)
{
  this.section_target= event;
  var classid= this.classLabelTarget;
  var section = this.section_target;
  var schlId = this.schoolId;
  debugger;
  this.schlService.getSchoolMediumList(classid,section,schlId).subscribe((result =>
    {
      this.data_medium = result.result;
      // console.log(this.data_medium);
      this.target_medium=this.data_medium[0]['school_medium_id'];
      this.mediumDataTarget = this.data_medium.map(i =>
        {
          return {label:i.medium_name_1,value:i.school_medium_id};
        });
       
        this.mediumIdTarget = this.mediumData[0].value;
        this.getSectiongroupnameTarget(event);
    }))
}

getSectiongroupnameTarget(event) {
  this.section_target= event;
  var classid= this.classLabelTarget;
  var section = this.section_target;
  var schlId = this.schoolId;
  this.schlService.getSchoolMediumList(classid,section,schlId).subscribe((result =>
    {
      this.data_medium = result.result;
      this.group_name_1 =this.data_medium[0].group_name;
      this.group_id_1 =this.data_medium[0].group_id;
      this.school_medium_id_1 =this.data_medium[0].school_medium_id;
      this.medium_name_1 =this.data_medium[0].medium_name;
      this.studentList.controls['medium_name_1'].setValue(this.medium_name_1);
      this.studentList.controls['group_name_1'].setValue(this.group_name_1);
      this.studentList.controls['medium_name_1'].updateValueAndValidity();
      this.studentList.controls['group_name_1'].updateValueAndValidity();
      // console.log(this.data_medium[0], 'this.data_medium[0]this.data_medium[0]')
    }))
}

confirm() {
  this.submitted = true;
   
    if (this.studentList.valid) { 

    this.id = this.Id;
    this.class_studying_id =this.classLabelTarget;
    this.class_section =this.section_target ;
    this.education_medium_id = this.target_medium;
    this.school_key_id = this.schoolId ;
    this.student_id = this.Id;
    var to_class = this.targ_val;
    var from_class = this.classLabel;
    var from_section = this.section;
    var to_section = this.section_target;
    var studentinsertlist = this.selectedStudentNameList;
    this.studentNameList = studentinsertlist.map(l => { return { school_key_id: l.school_id, student_id : l.id, from_class : from_class, to_class : to_class, from_section:from_section, to_section:to_section }; });
    

    var studentupdatetlist = this.selectedStudentNameList;
    this.selectedStudentNameListss = studentupdatetlist.map(l => { return { id: l.id, class_studying_id : to_class, class_section : to_section, education_medium_id : this.education_medium_id, group_code_id:this.group_id_1}; });
    

    this.promoted_Student_List = {"records":{"update_list":this.selectedStudentNameListss, "insert_list":this.studentNameList}}

    this.selectedStudentNameList.forEach(x =>  {
      x.class_studying_id = x.class_studying_id ? '' || this.class_studying_id : this.class_studying_id,
      x.class_section = x.class_section ? '' || this.class_section : this.class_section
   });

   this.confirmationService.confirm({
      message: 'Are you sure you want to promote '+this.selectedStudentNameListss.length+' students?',
      accept: () => {
        this.schlService.PromoteStudentList(this.promoted_Student_List).subscribe((res) =>
        {
          if(res.status==200){
            this.studentNameList = [];
            this.selectedStudentNameList = [];
            this.studentList.reset();
            this.alertService.success("Student promoted Successfully");
          }
           else if (res.status==204) {
            this.alertService.error(res.message);
          }
          else if (res.status==404) {
            this.alertService.error(res.message);
          } 
          else {
            this.alertService.error(res.message);
          }
        })
      },
      reject: () => {
        this.alertService.error("Rejected successfully");
      }
    });
  }
  else{
    for (const key of Object.keys(this.studentList.controls)) {
      if (this.studentList.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        console.log("invalidControl",invalidControl);
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
  }
  }
}