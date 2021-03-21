import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { AlertService } from 'src/services/alert.service';


@Component({
  selector: 'app-training-conducted',
  templateUrl: './training-conducted.component.html',
  styleUrls: ['./training-conducted.component.css']
})
export class TrainingConductedComponent implements OnInit {
  display: boolean = false;
  trainingcondecuted: { label: string; value: string; }[];
  trainingmode: { label: string; value: string; }[];
  training_form: FormGroup ;
  submitted: boolean;
  teacherdetails: FormArray;
  inspection: FormArray;
  schlCommiteInvalid: boolean;
  noDataFound: any;
  trainingConductedList: any;
  trainingUpdatedList: any;
  emisId: any;
  teacher_name: any;
  displayEditDialog: boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder,private TeacherService: TeacherService,
    private alertService: AlertService,private el: ElementRef) {
    this.trainingcondecuted = [
      {label:'BRC', value: 'BRC'},
      {label:'CRC', value: 'CRC'},
      {label:'DIET', value: 'DIET'},
      {label:'Education District', value: 'Education District'},
      {label:'Others', value: 'Others'},
    ];
    this.trainingmode = [
      {label:'Online', value: 'Online'},
      {label:'Offline', value: 'Offline'},
    ];
   }

  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'training_date', header: 'Training Date', widthstyle: '12em' },
      { field: 'trained_at', header: 'Training At', widthstyle: '12em' },
      { field: 'training_mode', header: 'Training Mode', widthstyle: '12em' },
      { field: 'training_days', header: 'No of Days In Training', widthstyle: '12em' },
      { field: 'teacher_count', header: 'Teachers Count', widthstyle: '12em' },
      { field: 'action', header: 'Action', widthstyle: '12em' },
    ];

    
  showDialog() {
    this.display = true;
  }

  close_dialog(){
    this.training_form.reset();
    this.submitted = false;
    this.display = false;
  }

  ngOnInit() {
    this.initialValidator();
    this.getTrainingConductedList();
    this.fetchData();
  }

  initialValidator() {
    this.training_form = this.fb.group({
      'inspection': new FormArray([this.createItem()]),
      'training_conducted':  new FormControl('',),
      'training_mode':  new FormControl('', ),
      'training_date':  new FormControl('', ),
      'teacher_id':  new FormControl('', ),
      'training_days':  new FormControl('',),
      'teacher_name':  new FormControl(this.emisId,null),

      'trained_at':  new FormControl('',),
    });
  }


  getTrainingConductedList(){
    this.TeacherService.getTrainingConductedListAPI().subscribe((res) => {
      if(res.result.length>0){
        this.trainingConductedList = res.result;
     }
     else{
       this.noDataFound = true;
     }
   })
  }

  onEditConductedList(rowdata){ 
    const id =rowdata.training_id
    // console.log(id, '------------id')
    this.displayEditDialog = true;
    this.TeacherService.editTrainingConductedListAPI(id).subscribe((data) => {
      console.log(data.staffTrainingConductList, 'oooooooooooooooooo');
        this.trainingUpdatedList = data.staffTrainingConductList;
        // console.log(this.trainingUpdatedList, '0---------')
        this.training_form.patchValue(this.trainingUpdatedList);
    })
  }

  onDeleteconductedList(rowdata){
    const id =rowdata.id
    this.TeacherService.deleteTrainingConductedListAPI(id).subscribe((res) => {
      this.fetchData();
      this.alertService.success("Records Deleted Successfully");
    })
  }

  fetchData() {
    this.TeacherService.getTrainingConductedListAPI().subscribe(data =>{
        this.trainingConductedList = data.result;
    });
  }

  teacher_emis_id(event) {  
    this.emisId=event;
    this.TeacherService.get_teacher_details(this.emisId).subscribe((res) => {
       // console.log(res, '----------')
      if(res.result.length>0){ 
        this.teacherdetails = res.result[0];
        // console.log(this.teacherdetails, '--------ddddddddd')
        this.training_form.patchValue(this.teacherdetails); 
      }
    })
  }

  save(){
    this.submitted = true;
    var data = {
      "records": {
        "trained_at": this.training_form.value.trained_at,
        "training_mode": this.training_form.value.training_mode,
        "training_date": this.training_form.value.training_date,
        "attended_by": this.training_form.value.inspection,
      }
    };
    if (this.training_form.valid) {
      this.TeacherService.savestafftrainingconducted(data).subscribe(data => {
        if (data.dataStatus == true) {
          this.alertService.success("Records Updated Successfully");
          this.training_form.reset();
          this.fetchData();
          this.display = false;
        }
        else {
          this.alertService.error(data.message);
        }

      });
    }
    else {
      // this.validateAllFormFields(this.userform);
      for (const key of Object.keys(this.training_form.controls)) {
        if (this.training_form.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log('invalid keys', key);
          // invalidControl.focus();
           break;
        }
      }
      this.alertService.error('Please Fill All Mandatory Fields');
      //return true;
    }
  }

  addMediumInstruction(): void {
    this.inspection = this.training_form.get('inspection') as FormArray;
    if (this.inspection.length < 999) {
      if (this.training_form.controls.inspection.valid) {
        this.inspection.push(this.createItem());
      }
    } else {
      this.schlCommiteInvalid = true;
    }
  }

  createItem() {
    return this.fb.group({
      teacher_id: new FormControl('', Validators.required),
      training_days: new FormControl('', Validators.required),
    });
  }

  removeMediumInstruction() {
    if (this.inspection.length > 0) {
      this.schlCommiteInvalid = false;
      const control = <FormArray>this.training_form.controls['inspection'];
      control.removeAt(control.length - 1);
    }
  }

  getMediumInstruction(item) {
    debugger;
    const inspectionentry = this.training_form.controls.inspection as FormArray;
    const mediumDataValues = item.inspection;
    if (mediumDataValues.length > 0) {
      const inspectionentry = this.training_form.controls.inspection as FormArray;
      while (inspectionentry.length !== 0) {
        inspectionentry.removeAt(0)
      }
    }
    for (let i = 0; i < mediumDataValues.length; i++) {
      inspectionentry.push(this.fb.group({
        teacher_id: mediumDataValues[i].teacher_id,
        training_days: mediumDataValues[i].training_days,
      })
      )
    }

    this.inspection = this.training_form.get('inspection') as FormArray;
    this.inspection.push(this.createItem());
    const control = <FormArray>this.training_form.controls['inspection'];
    control.removeAt(control.value.length - 1);
  }

  chooseOfficer(event, index) {
    var inspection = event.value;
    (<FormArray>this.training_form.controls['inspection']).at(index).patchValue({ teacher_id: '' });
    debugger;
    {
      (<FormArray>this.training_form.controls['inspection']).at(index).patchValue({ teacher_id: inspection });
    }
  }

  choosePurpose(event, index) {
    var inspection = event.value;
    (<FormArray>this.training_form.controls['inspection']).at(index).patchValue({ training_days: '' });
    debugger;
    {
      (<FormArray>this.training_form.controls['inspection']).at(index).patchValue({ training_days: inspection });
    }

  }
}
