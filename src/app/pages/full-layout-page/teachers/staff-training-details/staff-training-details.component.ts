import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
//import {Teacher,bloodgroupjson,pgjson,ugjson} from '../';
import { Teacher, bloodgroupjson, pgjson, ugjson, regulationjson, studyuptojson, trainingneedjson } from '../../../../../models/teacher';


import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-staff-training-details',
  templateUrl: './staff-training-details.component.html',
  styleUrls: ['./staff-training-details.component.css']
})
export class StaffTrainingDetailsComponent implements OnInit {

  displayDialog: boolean;
  specify_div:boolean = false;
  pipe = new DatePipe('en-US'); 
  
  trainee: any = {};
  selectedTrainee: any;
  newTrainee: boolean;
  trainedstaff: any[];

  cols: any[];

  schoolId : any;
  schoolTypeId : any;
  teachertrainlist: any[];
  trainingtypelist: any[];
  msgs: any [];

  position: string;
  stafflist: any[];
  dialogTitle:string;
  trainedatlist: Array<object> =  [{value:"BRC",label:"BRC",optionhide:1},
                                   {value:"CRC",label:"CRC",optionhide:1},
                                   {value:"DIET",label:"DIET",optionhide:1},
                                   {value:"Others",label:"Others",optionhide:0},
                                   {value:"Education District",label:"Education District",optionhide:1}];
  trainingmodelist: Array<object> =  [{value:"Online",label:"Online"},
                                  {value:"Offline",label:"Offline"}];
  trainedatalterlist: Array<object> =  [];          

  constructor(private confirmationService: ConfirmationService,private fb: FormBuilder,
    private service: TeacherService,
    private userSessionService: UserSessionService, 
    private alertService: AlertService){ 
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
   }
   



  ngOnInit() {
    this.getstafftraineelist();
    
      this.cols = [
          { field: 'teacher_id', header: 'Teacher Code' },
          { field: 'teacher_name', header: 'Teacher Name' },
          { field: 'training_type_with_other', header: 'Training Type' },
          { field: 'trained_at', header: 'Trained at' },
          { field: 'formatted_training_date', header: 'Date' },
          { field: 'training_days', header: 'No of Days In Training' },
          { field: 'training_mode', header: 'Training Mode' },
          // { field: 'id', header: 'Action' }
      ];
  }

  getstafftraineelist(){
    this.service.stftrainlist().subscribe( res => {
      if(res.dataStatus){
            this.teachertrainlist = res.result.teachertrainlist;
            this.teachertrainlist.map(item => { item.training_type_with_other = item.training_type_id == "0" ? 'Others ( '+item.training_other+' )' : item.training_type;
                                                item.formatted_training_date = this.pipe.transform(item.training_date, 'dd-MM-yyyy')
            });
            // console.log('this.teachertrainlist',this.teachertrainlist);
            this.trainingtypelist = res.result.trainingtypelist.map(item => { return {"label": item.training,"value":item.id} });
            this.trainingtypelist.push({"label": "Others","value":"0"});
            this.stafflist = res.result.stafflist.map(item => { return {"label": item.teacher_name,"value":item.teacher_id,"classtaught":item.class_taught} });
      }
      else{
            this.alertService.error(res.message);
      }
     },err => console.log(err));
     
  }
  showDialogToAdd() {
      this.dialogTitle = "Add In-service Training Details";
      this.newTrainee = true;
      this.trainee = {};
      this.displayDialog = true;
  }

  save() {
  
       let tempteachertrainlist = [...this.teachertrainlist];
       console.log(Object.entries(this.trainee).length);
  if(Object.entries(this.trainee).length === 0){
    this.alertService.error('Fields Are Empty');
    return true;  
  }

  console.log(this.trainee);

if(this.trainee.hasOwnProperty('teacher_id') && this.trainee.hasOwnProperty('training_type') || this.trainee.hasOwnProperty('trained_at')){
  if((this.trainee['teacher_id'] === null || this.trainee['teacher_id'] === '') || 
     (this.trainee['training_days'] === 0 || this.trainee['training_days'] === '')||
     (this.trainee['training_date'] === null || this.trainee['training_date'] === 0 || this.trainee['training_date'] === '')||
     (this.trainee['training_type'] === null || this.trainee['training_type'] === '') || 
     (this.trainee['trained_at'] === null || this.trainee['trained_at'] === '')){
       this.alertService.error('Please Check Name, Type and Trained-At,Trained-Days,Trained-Date');
       return true;  
  }
}
else{
  this.alertService.error('Please Check Name, Type and Trained-At,Trained-Days,Trained-Date');
  return true;  
}
//   if(this.trainee['trained_at'] === null || this.trainee['trained_at'] === ''){
//     this.alertService.error('Please Check Trained-At');
//     return true;  
//   }
// // teacher_id: "11010619742017030"
// // training_type_id: "2"
// // trained_at: "DIET"
// if(this.trainee['teacher_id'] === null || this.trainee['teacher_id'] === ''){
//   this.alertService.error('Please Check Name');
//   return true;  
// }
// if(this.trainee['training_type_id'] === null || this.trainee['training_type_id'] === ''){
//   this.alertService.error('Please Check Type');
//   return true;  
// }
  if(+this.trainee['training_type_id'] == 0  && ( this.trainee['training_other'] === '' || this.trainee['training_other'] === null)){
    this.alertService.error('Please Check Specify Training Type');
    return true;  
  }


  // Object.keys(this.trainee).forEach((key) => (this.trainee[key] == null) && delete this.trainee[key]);  
  
  let _id = this.trainee.hasOwnProperty('id') ? this.trainee['id'] : null ;
  let _code = this.trainee.hasOwnProperty('teacher_id') ? this.trainee['teacher_id'] : null; ;
  let _type = this.trainee.hasOwnProperty('training_type_id') ? this.trainee['training_type_id'] : null; 
  let _type_other = this.trainee.hasOwnProperty('training_other') ? this.trainee['training_other'] : null; 
  let _mode = this.trainee.hasOwnProperty('training_mode') ? this.trainee['training_mode'] : null; ;
  let _trained_at = this.trainee.hasOwnProperty('trained_at') ? this.trainee['trained_at'] : null;
  let _trained_date = this.trainee.hasOwnProperty('training_date') ? this.pipe.transform(this.trainee['training_date'], 'yyyy-MM-dd') : null;
  let _days = this.trainee.hasOwnProperty('training_days') ? this.trainee['training_days'] : 0;
  
  
  this.trainee = {"id":_id, "teacher_id":_code, "training_type":_type, "training_other":_type_other, "trained_at":_trained_at, "training_date":_trained_date, "training_days":_days,"training_mode":_mode};
  // , acyear, isactive, createdat, updatedat
  var pattern = "[0-9]+.[0-9]$";
    if(this.trainee['training_days'] ===0)
    {
      this.alertService.error('Days Field Empty!!');
      return true;  
    }
   
    // else if(this.trainee['training_days'])
    // {
    //   console.log(this.trainee['training_days']);
    //   this.alertService.error('Valodation OK');
    //   return true;  
    // }
   
  console.log(this.trainee);
  /** if for Add and else for edit */
  // tempteachertrainlist.push(this.trainee);
  // if(this.newTrainee) Object.keys(records).forEach((key) => (records[key] == null) && delete records[key]);  
  // else alert('reocrds')
  this.service.savetrainlist(this.trainee).subscribe((res) => {
  if (res.dataStatus) {
      this.alertService.success(res.message);
      this.getstafftraineelist();
  }
  else this.alertService.error(res.message); 
  },err=>{console.log('error in save',err);this.alertService.error('Error Occur please try again or refresh the page');});
                       

  // this.teachertrainlist = tempteachertrainlist;
  
  this.trainee = null;
  this.displayDialog = false;

}


  // delete() {
  //     let index = this.trainedstaff.indexOf(this.selectedTrainee);
  //     this.trainedstaff = this.trainedstaff.filter((val, i) => i != index);
  //     this.trainee = null;
  //     this.displayDialog = false;
  // }

  onRowSelect(event) {
    console.log('onRowSelect(',event.data);
      this.displayspecifydiv(event.data.training_type_id);
      this.loadDropdownData(event.data.teacher_id);
    // console.log('onRowSelect(',this.pipe.transform(event.data.training_date, 'dd-MM-yyyy'));
      this.dialogTitle = "Edit In-service Training Details";
      this.newTrainee = false;
      this.trainee = this.cloneCar(event.data);
      this.displayDialog = true;
  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    
      return false;
      
    }
    
    return true;
    
  }
  delete(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.deletetrainee(id).subscribe((res) => {
          if (res.dataStatus) {
            this.alertService.success(res.message);
            this.getstafftraineelist();
          }
          else{
            this.alertService.error(res.message); 
          }
        });
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
}
  // delete(id) {
  //   // debugger;
   
  // }

  cloneCar(c: any): any {
      let trainee = {};
      for (let prop in c) {
          trainee[prop] = c[prop];
      }
      return trainee;
  }

  displayspecifydiv(event){
    this.specify_div = event == "0" ? true : false;
    var v =event
    console.log(v,"event");
    // console.log(this.displayspecifydiv,"event");
    
  }

  loadDropdownData(event){
    
    let serve = this.stafflist.find(x => x.value === event);
    if(serve !== undefined) {
        // You can access Id or Name of the found server object.
        console.log(serve.classtaught);
        if(serve.classtaught == 1||serve.classtaught == 2||serve.classtaught == 3||serve.classtaught == 8||serve.classtaught == 9){
          // this.trainedatalterlist =  this.trainedatlist.filter(request => request['optionhide'] !== 1);
          this.trainedatalterlist =  this.trainedatlist;
        }
        else if(serve.classtaught === null || serve.classtaught === ''){
          // this.alertService.warning('There is No Class Taught Details. Please Update Staff Profile for Selected Staff ');
          // this.trainedatalterlist = [];
          // return true;
          this.trainedatalterlist =  this.trainedatlist;
        }
        else{
          this.trainedatalterlist =  this.trainedatlist;
        }
    }
    else{
      this.alertService.error('There No Staff Details !');
      this.trainedatalterlist = [];
      return true;
    }
  }

}