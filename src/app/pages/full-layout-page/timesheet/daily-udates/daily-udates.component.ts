import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { TimesheetService } from '../timesheet.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-daily-udates',
  templateUrl: './daily-udates.component.html',
  styleUrls: ['./daily-udates.component.css']
})
export class DailyUdatesComponent implements OnInit {
  dailyupdates: FormGroup;
  dropdown: { label: string; value: number; }[];
  submitted: boolean;
  username: any;
  duration: { label: string; value: number; }[];
  tasktypeOptions: any [] = [] ;
  taskrefOptions: any [] = [] ;
  userid: any;

  constructor(private fb: FormBuilder,public timesheetService : TimesheetService, public Usersession :UserSessionService,private el: ElementRef,private alertService :AlertService,) {
    this.username=this.Usersession.userName();
    this.userid=this.Usersession.userId();
    this.dropdown = [
      {label: 'Goverment', value: 1},
      {label: 'Fully Aided', value: 2},
      {label: 'Un-aided', value: 3},
      {label: 'Partially Aided', value: 4},
      {label: 'Central Govt.', value: 5}
  ];
  this.duration = [
    {label: '1', value: 1},
    {label: '1.25', value: 1.25},
    {label: '1.5', value: 1.5},
    {label: '1.75', value: 1.75},
    {label: '2', value: 2},
    {label: '2.25', value: 2.25},
    {label: '2.5', value: 2.5},
    {label: '2.75', value: 2.75},
    {label: '3', value: 3}, 
    {label: '3.25', value: 3.25},
    {label: '3.5', value: 3.5},
    {label: '3.75', value: 3.75},
    {label: '4', value: 4},
    {label: '4.25', value: 4.25},
    {label: '4.5', value: 4.5},
    {label: '4.75', value: 4.75},
    {label: '5', value: 5},
    {label: '5.25', value: 5.25},
    {label: '5.5', value: 5.5},
    {label: '5.75', value: 5.75},
    {label: '6', value: 6},
    {label: '6.25', value: 6.25},
    {label: '6.5', value: 6.5},
    {label: '6.75', value: 6.75},
    {label: '7', value: 7},
    {label: '7.25', value: 7.25},
    {label: '7.5', value: 7.5},
    {label: '7.75', value: 7.75},
    {label: '8', value: 8},
    {label: '8.25', value: 8.25},
    {label: '8.5', value: 8.5},
    {label: '8.75', value: 8.75},
    {label: '9', value: 9},
    {label: '9.25', value: 9.25},
    {label: '9.5', value: 9.5},
    {label: '9.75', value: 9.75},
    {label: '10', value: 10},
];
   }

  ngOnInit() {
    this.dailyupdates = this.fb.group({
      name: new FormControl(this.username, null),
      userid: new FormControl(this.userid, null),
      date: new FormControl('', Validators.required),
      taskid: new FormControl('', Validators.required),
      tasktype: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      remarks: new FormControl('', null),
    });
    this.gettaskdetails();
  }

  gettaskdetails(){
    this.timesheetService.taskdetailAPI().subscribe((res) => {
    let tasktype = res.tasktype_list , taskreferenceid = res.allotment_list;

      // Dropdown Values
    if(tasktype.length>0){
      for(let i=0; i<tasktype.length;i++){
        this.tasktypeOptions.push({ value: tasktype[i].task_id, label: tasktype[i].task_description })
      }
    }
    else
    {
      this.tasktypeOptions.push({ value: "", label: "No Data" })
    }
   //taskreferenceid 
    if(taskreferenceid.length>0){
      for(let i=0; i<taskreferenceid.length;i++){
        this.taskrefOptions.push({ value: taskreferenceid[i].module_id, label: taskreferenceid[i].module_id })
      }
    }
    else
    {
      this.taskrefOptions.push({ value: "", label: "No Data" })
    } 
    })
    
  }

  save() {
    this.submitted = true;
    if (this.dailyupdates.valid) {
      let resource_id = this.dailyupdates.value.userid,
      timesheet_date=this.dailyupdates.value.date,
      module_id=this.dailyupdates.value.taskid,
      task_type_id=this.dailyupdates.value.tasktype,
      duration_hrs=this.dailyupdates.value.duration,
      remarks=this.dailyupdates.value.remarks;
       let datas = {"resource_id" : resource_id, "timesheet_date" : timesheet_date,"module_id" : module_id,"task_type_id" : task_type_id,"duration_hrs" : duration_hrs,"remarks" : remarks, };
        this.timesheetService.dailyupdatesaveAPI({"records":datas}, true).subscribe((res) => {
         if(res){
           this.alertService.success("Data Save Successfully");
         }
       })
    } 
    else {
      for (const key of Object.keys(this.dailyupdates.controls)) {
        if (this.dailyupdates.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys',key);
          invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all the Required Fields"); }
  }
}
