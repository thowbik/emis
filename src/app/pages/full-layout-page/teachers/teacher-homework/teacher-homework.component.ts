import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
  

export interface sectionItem{
  label : string;
  value : number;
}
@Component({
  selector: 'app-teacher-homework',
  templateUrl: './teacher-homework.component.html',
  styleUrls: ['./teacher-homework.component.css']
})
export class TeacherHomeworkComponent implements OnInit {
 
  homeWorkdetails : FormGroup;
  class : any;
  section : any;
  subject : any;
  subject1 : any;
  data: any;
  cols : any;
  submitted : boolean = false;
  noDataFound : boolean = false;
  showDialogBox : boolean = false;
  sectionId : any;
  schoolId : number;
  sectionData : sectionItem[];
  getPopupValue : any;
  save_homework_details : any;
  school_key_id : any;
  teacher_id : number;
  emisUsertype1 : number;
  sectionValue : any;
  constructor(private fb:FormBuilder,private teacherService : TeacherService,private user : UserSessionService,private alertService : AlertService) { 

  
   this.emisUsertype1 = this.user.emisUsertype1();
   console.log(this.emisUsertype1);
   this.teacher_id = this.user.teacherId();
   console.log(this.teacher_id);  
  }
  ngOnInit() {
    this.initialValidator();
    this.getTeacherDetails();
    this.class = [
      {label : "I", value:"1" },
      {label : "II", value:"1"},
      {label : "III", value:"1"},

      {label : "IV", value:"2"},
      {label : "V", value:"2"},
      {label : "VI", value:"2"},
      {label : "VII", value:"2"},
      {label : "VIII", value:"2"},
      {label : "IX", value:"2"},
      {label : "X", value:"2"},
    
    ]

    this.subject = [
      {label:"Tamil",value : "48"}, 
      {label:"English",value : "46"},
      {label:"Urudu",value : "45"},
      {label:"Kannada",value : "96"},
      {label:"Malayalam",value : "94"},
      {label:"Telugu",value : "95"},
    ]
    this.subject1 = [

      {label:"English",value : "46"},
      {label:"Maths",value : "3"},
      {label:"Environmental Science",value : "4"},


    ]

    this.cols = [
      {field : "subject",header :"Subject"},
      {field : "class_id", header :"Assign Class"}
      // {field : "",header :"Edit"},

    ]
  }

  initialValidator(){
 
    this.homeWorkdetails = this.fb.group({
      selectclass : new FormControl(""),
      selectsection : new FormControl(""),
      selectsubject : new FormControl(""),
      description : new FormControl("")
    })
  }

  getdropdown(event)
  {
    this.sectionId = event.value;
    var classid = this.sectionId;
    console.log(this.sectionId);
    var schlid = this.emisUsertype1 ;
     console.log(this.emisUsertype1);
    this.teacherService.getSchlSectionDetails(schlid,classid).subscribe(res =>
      {
        
        this.data = res.result.section;
        this.sectionData = this.data.map(i =>
          { 
            return {label:i.section,value:i.id};
          });
          console.log(this.sectionData,"hwlloy");
      })
      console.log(this.data);
  }
  getsection(event){
     this.sectionValue=event.value;
     console.log(this.sectionValue);
  }
  getpopup(event)
  {
    this.showDialogBox=true; 
    const  school_key_id = "66";
    this.school_key_id = school_key_id;
  }
  
   getTeacherDetails(){
     alert("success");
   var schlid= this.emisUsertype1;
   console.log(schlid);
   var teacherid = this.teacher_id;
    console.log(teacherid);
      this.teacherService.getHomeworkdata(schlid,teacherid).subscribe(res =>
      {
        alert("fbla.nlhhuadcs");
        if(res.result!="")
        {
        this.data = res.result.home_work_detail;
        console.log(this.data);
    }
    else{
      this.noDataFound = true;
    }

  })
}

save(){
//  this.submitted = true;
//   if (this.homeWorkdetails.valid) { 
//     alert("submitted"); 
//   }
  // this.homeWorkdetails.controls['section'].setValue(this.sectionValue);
  // console.log(this.homeWorkdetails.controls['section'].setValue(this.sectionValue));
  
  this.getPopupValue = [
    { 'class_id': this.homeWorkdetails.value.selectclass, 'section': this.homeWorkdetails.value.selectsection,'subject' : this.homeWorkdetails.value.selectsubject,'information' : this.homeWorkdetails.value.description},
  ];
  console.log(this.homeWorkdetails.value);
  console.log(this.getPopupValue);

  this.save_homework_details={"records":{"school_key_id":this.school_key_id,"class_id":this.getPopupValue[0]['class_id'],"teacher_id":this.teacher_id,"subject":this.getPopupValue[0]['subject'],"information": this.getPopupValue[0]['information'],"section": this.getPopupValue[0]['section'],"class_section_id":"","status":'1',"updated_at":""}}   
 console.log(this.getPopupValue[0]['class_id']);
 console.log(this.getPopupValue[0]['subject']);
 console.log(this.getPopupValue[0]['section']);


  console.log(this.save_homework_details);
  this.submitted = true;

  if (this.homeWorkdetails.valid)
  alert('scferds');
   { 
    this.teacherService.getSaveHomeworkdata(this.save_homework_details,true).subscribe((result) =>
    {
      console.log(result);
      if(result.dataStatus)
      {
        this.alertService.success(result.message);
      }
      else 
      {
        this.alertService.warning('Something wrong');
      }
    });
  }
 
}

close_dialog(){
  this.showDialogBox=false;
}
}