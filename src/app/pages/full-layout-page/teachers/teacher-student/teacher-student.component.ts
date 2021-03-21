import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { TeacherService } from '../teacher.service';
import { AlertService } from 'src/services/alert.service';
import { FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { teacherDetails } from 'src/models/student-registration';
import { DatePipe } from '@angular/common';
import { callTracking } from 'src/models/student-registration';
@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.css']
})
export class TeacherStudentComponent implements OnInit {
  Form : FormGroup;
  schoolId: number;
  AssignTeacher: { label: string; value: string; }[];
  TeacherID: any;
  teacherlist_val: any[]=[];
  AssignTeach: any;
  Teacherlis: { [s: string]: teacherDetails; } = {};
  Teacher : teacherDetails[];
  Teacher1:teacherDetails[];
  Form1: FormGroup;
  teacherlist: any[]=[];
  RoleID: any;
  Teacherdropvalue: { label: string; value: number; }[];
  pipe = new DatePipe('en-US');
  completeTeachersList: any[]=[];

  constructor(private userSessionService: UserSessionService,
    private teacherService: TeacherService, private fb : FormBuilder,private alertService :AlertService,public datepipe: DatePipe) { 
      this.schoolId = this.userSessionService.schoolId();
      this.TeacherID = this.userSessionService.teacherId();
      this.Teacherdropvalue = [
        {label: 'Yet to respond ', value: 0},
        {label: 'Doubt Clarified', value: 1},
        {label: 'Blank / Incorrect call', value: 2},
        {label: 'Incorrect Subject', value: 3},
        {label: 'Incorrect Class', value: 4},
        {label: 'Student Unavailable', value: 5},
      ];
       this.Form = this.fb.group({
        'AssignTeacher' : new FormControl('',null),    
       })
  }

  ngOnInit() {
    this.getteacherdropdownlist();
    this.gettecherlist();
  }

  coordinate: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'IndexID', header: 'Call ID',widthstyle: '7em'},
  { field: 'RecDate', header: 'Call Date',widthstyle: '9em'},
  { field: 'PhoneNo', header: 'Phone Number',widthstyle: '12em'},
  { field: 'AssignedSub', header: 'Subject',widthstyle: '8em'},
  { field: 'AssignedCls', header: 'Class',widthstyle: '7em'},
  { field: '', header: 'Assigned Teacher',widthstyle: '15em'},
  { field: '', header: 'Action',widthstyle: '8em'},
  ];
   callsupport: Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'IndexID', header: 'Call ID',widthstyle: '10em'},
   { field: 'RecDate', header: 'Call Date',widthstyle: '10em'},
   { field: 'PhoneNo', header: 'Phone Number',widthstyle: '15em'},
   { field: 'AssignedSub', header: 'Subject',widthstyle: '10em'},
   { field: 'AssignedCls', header: 'Class',widthstyle: '10em'},
   { field: 'RespoDate', header: 'Response Date',widthstyle: '12em'},
   { field: 'CallStatus', header: 'Status',widthstyle: '20em'},
   { field: 'NoOfCalls', header: 'No Of Calls',widthstyle: '10em'},
   { field: 'CallRemarks', header: 'Remarks',widthstyle: '10em'},
   { field: '', header: 'Action',widthstyle: '10em'},
   ];
  
  gettecherlist() {
    debugger;
    this.teacherService.getteacherlist().subscribe((res) => {
      if (res) {
        this.teacherlist = res.result2;
      //   for (let i = 0; i < this.teacherlist.length; i++) {
      //     debugger
      //     var teacherClass = this.teacherlist[i].AssignedCls;
      //     var teacherSubject = this.teacherlist[i].AssignedSub;
      //  var dropdownList = this.teacherlist_val.filter(i => i.class == teacherClass && i.subject == teacherSubject);
      //  this.teacherlist['dropdownValues'] = dropdownList.map(item => { return { label: item.teacher_id, value:item.teacher_id }});
      //   }
        this.RoleID=res.result[0]['RoleID'];
        this.teacherlist.map(item => { 
          item.RecDate = this.pipe.transform(item.RecDate, 'dd-MM-yyyy');
          item.RespoDate = this.pipe.transform(item.RespoDate, 'dd-MM-yyyy');
        });        
      }
    });
  }
  
  getteacherdropdownlist(){
    debugger;
    this.teacherService.getteacherdropdownlist().subscribe((res) => {
      if (res) {
        debugger;
        this.completeTeachersList = res.result;
        this.teacherlist_val = this.completeTeachersList;

        // this.teacherlist_val=[];
        // if(dropDownList.length>0){
        //   for(let i=0; i<dropDownList.length;i++){
        //     this.teacherlist_val.push({ value: dropDownList[i].id + "-" + dropDownList[i].teacher_id + "-" + dropDownList[i].teacher_name , label: dropDownList[i].teacher_name })
        //       }
        // }
        
      }
    });
  }
  onChangeteacher(event) {
    debugger;
    this.AssignTeacher = event.value;
  }
 
 onRowEditInit(Teacher: teacherDetails) {
debugger;
this.teacherlist_val = this.completeTeachersList;
this.Teacherlis[Teacher.IndexID] = {...Teacher};
var teacherClass = Teacher['AssignedCls'];
var teacherSubject = Teacher['AssignedSub'];
              
             
              var teacherList = this.teacherlist_val.filter(i => i.class == teacherClass && i.subject == teacherSubject);
                this.teacherlist_val = teacherList.map(item => { return { label: item.teacher_name, value:item.teacher_id }});
          }

          onRowEdit_Save(teacherdata: teacherDetails) {
            debugger;
            debugger
            var records = 
            {"records":{
            "IndexID": teacherdata.IndexID,
            "AssignTeach":  this.AssignTeacher,
            }
            }
            this.teacherService.postteacherdetails(records).subscribe((res) => {
              debugger;
            if (res.dataStatus == true) {
          this.alertService.success("Records Updated Successfully");
          this.gettecherlist();

            }
            else{
              this.alertService.warning(res.message);
            }
            })
                  }  
          
          onRowEditSave(teacherdata: teacherDetails) {
            debugger;
            var records = 
            {"records":
            {
              "IndexID":teacherdata.IndexID,
            "CallStatus":teacherdata.CallStatus,
            "NoOfCalls":teacherdata.NoOfCalls,
            "CallRemarks":teacherdata.CallRemarks,
          }
            }
            this.teacherService.updateCallsupport(records).subscribe((result) => {
              debugger;
            if (result.dataStatus == true) {
          this.alertService.success("Records Updated Successfully");
            }
            else{
              this.alertService.warning(result.message);
            }
            })
                  }  
              
          onRowEditCancel(Teacher: teacherDetails, index: number) {
              // this.Teacher1[index] = this.Teacherlis[Teacher.IndexID];
              // delete this.Teacher1[Teacher.IndexID];
          }
                   
  }

