import { Component,ViewChild, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';
import { UidaiValidationService } from 'ng2-uidai-validation';

@Component({
  selector: 'app-vocational-staff-nsqf-reg',
  templateUrl: './vocational-staff-nsqf-reg.component.html',
  styleUrls: ['./vocational-staff-nsqf-reg.component.css']
})
export class VocationalStaffNsqfRegComponent implements OnInit {

  displayDialog: boolean;
  inValidAadhar:boolean = false;
  pipe = new DatePipe('en-US'); 

  NSQFform:FormGroup;
  selectedVocational: any;
  trainedstaff: any[];
  cols: any[];

  schoolId : any;
  schoolTypeId : any;
  dialogTitle: string;

  nsqfstftrainlist:any[] =[];
  socialcategory: any;
  sector: any;
  classtaught: any;
  genderlist: any;
  appointment: any;
  experience: any;
  professional: any;
  academic: any;

  dobMaxDate: string;


  constructor(private fb: FormBuilder,
    private service: TeacherService,
    private userSessionService: UserSessionService, 
    private uidaiValidationService: UidaiValidationService,
    private alertService: AlertService){ 
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
  }

  

  ngOnInit() {
    console.clear();
    let year = this.pipe.transform(new Date(),'yyyy');
    let monthanddate = this.pipe.transform(new Date(),'MM-dd');
    let dob_max_year = +year-18;
    this.dobMaxDate =  dob_max_year+'-'+monthanddate;
    this.initialValidator();
    this.getNSQFStaffVocational();
      this.cols = [
        { field: 'teacher_name', header: 'Teacher Name' },
        { field: 'gender_label', header: 'Gender' },
        { field: 'convert_dob_format', header: 'Date of Brith' },
        { field: 'appoint_sector_label', header: 'Appointed Sector' },
        { field: 'class_taught_label', header: 'Class Taught' },
          // { field: 'id', header: 'Action' }
      ];
  }

  initialValidator() {
      this.NSQFform = this.fb.group({
          id: [''], 
          teacher_name: ['', Validators.required], 
          gender: ['', Validators.required], 
          dob: ['', Validators.required], 
          mobile: ['', [Validators.required,Validators.pattern('[6-9]\\d{9}')]], 
          aadhaar: ['', Validators.required], 
          soc_cat: ['', Validators.required], 
          qual_acad: ['', Validators.required], 
          qual_prof: ['', Validators.required], 
          appoint_sector: ['', Validators.required], 
          nature_of_appt: ['', Validators.required], 
          class_taught: ['', Validators.required], 
          industry_exp: ['', Validators.required], 
          training_exp: ['', Validators.required],
          inductrain_receive_yn: ['', Validators.required],
          inservtrain_receive_yn: ['', Validators.required],
        });
  }

  getNSQFStaffVocational(){
    
    this.service.getNSQFVocationalStfList().subscribe( res => {
      if(res.dataStatus){
        this.loadDropdown();
        this.socialcategory = res.result.socialcategory.map(item => { return {"label": item.social_cat,"value":item.id}})
        this.sector = res.result.sector.map(item => { return {"label": item.sector,"value":item.id} })
        // this.classtaught = res.result.classtaught.map(item => { return {"label": item.category,"value":item.id} });
        this.nsqfstftrainlist = res.result.nsqfvocationalstafflist; 
        this.nsqfstftrainlist.map(item => { item.training_type_with_other = item.training_type_id == "0" ? 'Others ( '+item.training_other+' )' : item.training_type;
                                            item.convert_dob_format = this.pipe.transform(item.dob, 'dd-MM-yyyy');
                                            item.gender_label =  item.gender == '1' ? 'Male' : item.gender == '2' ? 'Female' : item.gender == '3' ? 'Trans-Gender' : null;
                                            item.appoint_sector_label = item.appoint_sector !== '' ? this.sector.filter(i=>i.value == item.appoint_sector)[0].label : null;
                                            item.class_taught_label =  item.class_taught == "5" ? "Secondary Only" :item.class_taught == "6" ? "Higher Secondary Only" : item.class_taught == "8" ? "Secondary and Higher Secondary Only" : null;
            });
            
      }
      else{
            this.alertService.error(res.message);
      }
     },err => console.log(err));
     
  }

  loadDropdown(){
    this.service.getNSQFStfMasterJSON().subscribe(json => {
      this.genderlist = json['genderlist'];
      this.appointment = json['appointment'];
      this.experience = json['experience'];
      this.professional = json['professional'];
      this.academic = json['academic'];
      this.classtaught = json['classtaught'];
    });
  }

  showDialogToAdd() {
      
      this.NSQFform.reset();
      this.displayDialog = true;
      this.dialogTitle = "NSQF Vocational Training Course - New Register";
  }

  save() {
    let aadharNo = this.NSQFform.value.aadhaar;
    this.inValidAadhar = false;
      // console.log(aadharNo);
      let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
      // console.log(isValidUidaiNo);
      if(!isValidUidaiNo){
      this.alertService.error('Invalid Aadhaar Number');
      this.inValidAadhar = true;
       return true;
      }
    // console.log(this.NSQFform.value);
    
  if (this.NSQFform.valid) {
      
      this.service.saveNSQFVocationalStfList(this.NSQFform.value).subscribe((res) => {
      if (res.dataStatus) {
          this.alertService.success(res.message);
          this.NSQFform.reset();
          this.displayDialog = false;
          this.getNSQFStaffVocational();      
      }
      else this.alertService.error(res.message); 
      },err=>{console.log('error in save',err);this.alertService.error('Error Occur please try again or refresh the page');});
                       
}else{
    this.validateAllFormFields(this.NSQFform);
    this.alertService.warning('Please Fill All Mandatory Fields.!');
    return true;
  }
  // // this.teachertrainlist = tempteachertrainlist;
  
  // this.vocational = null;
  // this.displayDialog = false;

  }


  // delete() {
  //     let index = this.trainedstaff.indexOf(this.selectedVocational);
  //     this.trainedstaff = this.trainedstaff.filter((val, i) => i != index);
  //     this.vocational = null;
  //     this.displayDialog = false;
  // }

  onRowSelect(event) {
      this.NSQFform.patchValue(event.data);
      this.displayDialog = true;
      this.dialogTitle = "NSQF Vocational Training Course - "+event.data.teacher_name+"`S Register";
  }

  delete(id) {
      this.service.deleteNSQFVocationalStf(id).subscribe((res) => {
        if (res.dataStatus) {
          this.alertService.success(res.message);
          this.getNSQFStaffVocational();
        }
        else{
          this.alertService.error(res.message); 
        }
      });
  }
  

  checkAadhar(e){
    this.service.checkNSQFVocationalStfAadhar(e).subscribe((res) => {
      if(res.dataStatus ){
        if(res.result){
          this.alertService.error("Given aadhar-no is already mapped to "+ res.result +"");
          this.NSQFform.controls['aadhaar'].setValue(null);
          this.inValidAadhar = true;  }else this.inValidAadhar = false;
      } else this.inValidAadhar = false;
    });
  }
  
  validateAllFormFields(formGroup: any) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

}

