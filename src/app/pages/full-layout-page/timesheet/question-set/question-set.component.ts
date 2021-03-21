import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
// import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {
  display: boolean = false;
  usertypeid: any;
  username: any;
  userid: number;
  question_set: FormGroup;
  classdropvalueoptions: any [] = [];
  subjectdropvalueoptions: any[]=[];
  class_id: any;
  Medium: { label: string; value: string; }[];
  submitted: boolean;
  schl_id: any;
  class: any;

  showDialog() {
    this.display = true;
  }
  constructor(public timesheetService : TimesheetService, public Usersession :UserSessionService,
    // private confirmationService: ConfirmationService,
    private alertService :AlertService,
    private fb: FormBuilder) {
    this.usertypeid=this.Usersession.userTypeId();
    this.username=this.Usersession.userName();
    this.userid=this.Usersession.userId();
    this.Medium = [
      {label:'Tamil', value: '1'},
      {label:'English', value: '2'},
    ];
   }

  ngOnInit() {
    this.initialValidator();
    this.classdropdown();
    this.subjectdropdown();
    this.onSave();
  }
  
  initialValidator() {
    this.question_set = this.fb.group({
      'class': new FormControl('',Validators.required),
      'qset_subject': new FormControl('',Validators.required),
      'qset_medium': new FormControl('',Validators.required),
      'qset_count': new FormControl('',Validators.required),
      'qset_type': new FormControl('',Validators.required),
    });
  }
  // class type drop down
  classdropdown()  {
    this.timesheetService.QuestionsetdropdownAPI().subscribe((data) => {
      let dropDownList = data.result.class_list;
      // Dropdown Values
      if(dropDownList.length>0){
        this.classdropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.classdropvalueoptions.push({ value: dropDownList[i].class, label: dropDownList[i].class })
        }
      }
      else
      {
        this.classdropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }
   // subjet type drop down
   subjectdropdown()  {
    const class_id = this.class;
    this.timesheetService.QuestionsetdropdownsubjectAPI(class_id).subscribe((data) => {
      let dropDownList = data.result.subject_list;
      // Dropdown Values
      if(dropDownList.length>0){
        this.subjectdropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.subjectdropvalueoptions.push({ value: dropDownList[i].subject, label: dropDownList[i].subject })
        }
      }
      else
      {
        this.subjectdropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }
  onSave() {
    this.submitted = true;
    if (this.question_set.valid) {
        let classsec =this.class,
        subject=this.question_set.value.qset_subject,
        medium=this.question_set.value.qset_medium,
        count=this.question_set.value.qset_count,
        type=this.question_set.value.qset_type;

         let datas = {"class" : classsec,
         "qset_subject" : subject,
         "qset_medium" : medium,
         "qset_count" : count,
         "qset_type" : type,
         };
         
         this.timesheetService.getquestionssave({"records":datas}, true).subscribe((res) => {
           if(res){
            this.alertService.success("Data Save Successfully");
           }
           else {
            this.alertService.error("Please Fill all the Required Fields"); 
          }
         })
       }
  
    }
}
