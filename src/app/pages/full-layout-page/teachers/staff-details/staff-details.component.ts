import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ConfirmationService } from 'primeng';
import { AlertService } from 'src/services/alert.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {

  form: FormGroup;
  selectage: { label: string; value: string; }[];
  submitted: boolean;

  constructor(private fb: FormBuilder,private el: ElementRef,private confirmationService: ConfirmationService,
    private teacherservice: TeacherService,
    private alertService :AlertService) { }

  ngOnInit() {
    this.initialValidators();
    this.selectage = [
      {label: 'Boys', value: '1'},
      {label: 'Girls', value: '2'},
      {label: 'Transgender', value: '3'},
    ];  
  }
  initialValidators() {
    this.form = this.fb.group({
      'techer-Name': new FormControl('',Validators.required),
      'phone_number': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{9}')]),

    })
  }
  // SchoolForm

  /** ⇒  number only validation **/
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  /** ⇒ using ifsc code to get the bank details */         
  getbankdetails(no){
    if(no != ''){
      this.teacherservice.getbankdetails(no).subscribe(td => {
        console.log("checkbranch",td)
        if(td.dataStatus)
        {
        
            var branch=td.result[0].branch;        
            var bankname=td.result[0].bank_name;
            var id=td.result[0].id;
            
            this.form.controls['branch'].setValue(branch);
            this.form.controls['branch'].updateValueAndValidity();
            this.form.controls['branch_id'].setValue(id);
            this.form.controls['branch_id'].updateValueAndValidity();
            this.form.controls['bank_name'].setValue(bankname);
            this.form.controls['bank_name'].updateValueAndValidity();
        }
        else  this.alertService.error(td.message);
      });
    }
  }
  onsave() {
    this.submitted = true;
    if (this.form.valid) {
    }
    else 
    {
      this.alertService.error('Please Fill All Mandatory Fields');

    }

    
  }
}
