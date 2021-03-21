import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { StudentService } from '../../students/student.service';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-school-bank-details',
  providers: [StudentService],
  templateUrl: './school-bank-details.component.html',
  styleUrls: ['./school-bank-details.component.css']
})
export class SchoolBankDetailsComponent implements OnInit {
  form:FormGroup;
  submitted: boolean = false;
  inValidMsg1:string = '';
  inValidMsg2:string = '';
  scl_id: any;
  displayTransferDialog: boolean;
  detailslist: any;
  ifscode: any;
  bankdetails: any;
  tesst1: any;
  code: any;
  bankdata: number;
  index_id: any;
  ac_num: any;
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private studentservice: StudentService,
    private schoolservice: schoolsService) {
    this.scl_id = this.userSessionService.schoolId();
     }
  
  ngOnInit() {
    this.initialValidator();
    this.getbankdtails();
    // this.confirm();
  }

  confirm() {
    if (this.form.value.SMCAccNo != this.form.value.re_bank_acc) {
      this.alertService.error(" Account number Mismatched"); 
    }else{
      if(this.form.valid)  
      {
        this.submitted = true; 
        this.confirmationService.confirm({
          message: '<p class="font-weight-bold text-center p-2">Are you sure Do you want to Save this Bank-Details?<br/>Make sure the given Bank-Details are correct. It cannot be undone </p>',
          header: 'Delete Confirmation',
          // icon: 'pi pi-info-circle',
          
          accept: () => {
            var data = {"records":
            {
            "IndxID":this.index_id ,
            "SMCBnkBrnch":this.form.value.branch,   
            "SMCBnkNam": this.form.value.bank_name,
            "SMCAccNo":this.form.value.SMCAccNo,
            "SMCIFSC":this.form.value.ifsc_code,
            "SMCAccNam":this.form.value.SMCAccNam
            }
            }
            this.schoolservice.Savesclbankdetails(data).subscribe(res=>{
            })
            this.alertService.success(" Bank-Details Saved");     
  
          },
          reject: () => {
            this.alertService.warning(" Cancelled");     
        }
      });
    }
    }
  
}
  getbankdtails(){
    var data = {"records": {
        "SchoolID":this.scl_id
      }
    }
    this.schoolservice.Getsclbankdetails(data).subscribe(res=>{
      this.index_id = res.records[0].IndxID
      this.ac_num = res.records[0].SMCAccNo
      this.bankdetails =res.records[0];
      this.code = res.records[0].ifsc_code.length;
      if(res.records[0].ifsc_code.length >= 1){
        this.form.patchValue(this.bankdetails);
        this.form.controls["re_bank_acc"].setValue(this.ac_num)
        this.bankdata = 1;
      } else{
        this.bankdata = 2;
      }
    })
  }

  initialValidator() {
    this.form = this.fb.group({
      ifsc_code: ['', Validators.required],
      bank_name: ['', Validators.required],
      branch: ['', Validators.required],
      SMCAccNo: ['', Validators.required],
      SMCAccNam: ['', Validators.required],
      re_bank_acc: ['', Validators.required],
    })
  }

  /** ⇒  validation check with existing (custom)  */
  checkAccno(val){
    if(val !== null || val !== ''){
         this.studentservice.checkAccnoForStudCashIncentive(val).subscribe(res => {
                 if(!res.dataStatus){
                  this.inValidMsg2 = res.message; 
                   this.alertService.info(res.message);
                   this.form.controls['SMCAccNo'].setValue('');
                 }
                 else this.inValidMsg2 = '';
             },err => { console.warn(err); });   
    }
  }

  /** ⇒  to get Bank Details (using ifsc) code  */
  getBankname(val){
    if(val !== null || val !== ''){
      this.studentservice.getCommonTables(val).subscribe(res => {
        if (res.dataStatus) {
            var bank_details = res.result[0];
            this.form.controls['bank_name'].setValue(bank_details.bank_name);
            this.form.controls['branch'].setValue(bank_details.branch);
            // this.form.controls['micr_code'].setValue(bank_details.micr_code);  
            this.inValidMsg1 = '';
        }
        else{
          this.inValidMsg1 = res.message+' For Given IFSC Code ( '+val+' )';
          this.alertService.info(this.inValidMsg1);
          this.form.controls['bank_name'].setValue('');
          this.form.controls['branch'].setValue('');
          // this.form.controls['micr_code'].setValue('');
        }
      }
      
      )}
  }
}