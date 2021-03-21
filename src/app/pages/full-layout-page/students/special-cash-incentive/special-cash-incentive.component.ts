/** ⇒ imports  */         
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { StudentService } from '../student.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-special-cash-incentive',
  templateUrl: './special-cash-incentive.component.html',
  styleUrls: ['./special-cash-incentive.component.css']
})

export class SpecialCashIncentiveComponent implements OnInit {

  /** ⇒ declarations  */         
  schoolId : any;
  schoolName : any ;
  schoolTypeId : any;
  dialogTitle: string;
  displayDialog: boolean;
  pipe = new DatePipe('en-US'); 
  cashincentive:FormGroup;
  selectedStudent: any;
  trainedstaff: any[];
  cols: any[];
  studcashincentivelist:any[] =[];
  inValidMsg1:string = '';
  inValidMsg2:string = '';
  maxDate: string;
  exportExcelData:any[]=[];
  exportColumns: any;
  available:boolean = false;
  /** ⇒ dropdown list  */         
  studiedList: Array<{ 'value': string, 'label': string }> = [{value:"Government",label:"Government"},
  {value:"Aided",label:"Aided"},
  {value:"Partially Aided",label:"Paritial Aided"},
  {value:"Un-aided",label:"Un Aided"}];

  eligibleList: Array<{ 'value': string, 'label': string }> = [
  {value:'0',label:"Not Eligible"},
  {value:'1',label:"Eligible"}];

  bankaccList: Array<{ 'value': string, 'label': string }> = [
    {value:'1',label:"Active"},
    {value:'2',label:"In Active"}];
    
  studiedList2: Array<{ 'value': string, 'label': string }> = [
      {value:'Aided',label:"Aided"},
      {value:'Self Finance',label:"Self Finance"}];
    
  constructor(private fb: FormBuilder,private eleref: ElementRef,
              private service: StudentService,private session: UserSessionService, 
              private alert: AlertService){  
    this.schoolId = this.session.schoolId();
    this.schoolName = this.session.schoolName();
    this.schoolTypeId = +this.session.schoolTypeId();
  }


  ngOnInit() {
    console.clear();
    this.maxDate = this.pipe.transform(new Date(),'yyyy-MM-dd');
    this.initialValidator();
    this.getStudent();
      this.cols = [
          { field: 'name', header: 'Students Name' }, 
          { field: 'stu_unique_id', header: 'Students ID' },
          { field: 'class_studying', header: 'Class' },
          { field: 'class_section', header: 'Section' },
          { field: 'eligible_label', header: 'Student Eligible' },
          { field: 'phone_number', header: 'Students Mobile Number' },
          { field: 'cash_incentive_status', header: 'Status' },
          // { field: 'study_at_X', header: 'X STD Studied In' },
          // { field: 'study_at_XI', header: 'XI STD Studied In' },
          // { field: 'study_at_XII', header: 'XII STD Studied In' },
          // { field: 'total', header: 'Total' },
          // { field: 'id', header: 'Action' }
      ];
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

      
  }
  /** ⇒  form declarations  */
  initialValidator() {
     this.cashincentive = this.fb.group({
          id:[''],      
          Students_name:[''],
          unique_id_no:[''],
          school_id:[this.schoolId],
          student_eligible:['', Validators.required],
          ifsc_code: [''], 
          micr_code: [''],
          bank_name: [''], 
          branch: [''], 
          bank_acc: [''], 
          bank_acc_open_date: [''], 
          // stu_mobile_no: ['', [Validators.required,Validators.pattern('[6-9]\\d{9}')]], 
          stu_mobile_no: [''],
          bank_acc_status: [''], 
          study_at_X: ['', Validators.required], 
          study_at_X_sec: [''], 
          study_at_XI: ['', Validators.required],
          study_at_XI_sec: [''], 
          study_at_XII: ['', Validators.required], 
          study_at_XII_sec: [''],
        });
        this.handleFormChanges();
  }
  
  /** ⇒  details for table list  */
  getStudent(){
    
    this.service.getStudCashIncentiveList().subscribe( res => {
      if(res.dataStatus){
        this.studcashincentivelist = res.result; 
        this.studcashincentivelist.map(item => { 
                                            item.cash_incentive_status = item.id != null ? 'Updated' : item.id == null ? 'Not Updated' : null;
                                            item.eligible_label =  item.student_eligible === '0' ? 'Not Eligible' : item.student_eligible === '1' ? 'Eligible'  : null;
            });

      }
      else{
            this.alert.error(res.message);
      }
     },err => console.warn(err));
     
  }

  
/** ⇒  for new details  */
  // showDialogToAdd() {  
  //     this.cashincentive.reset();
  //     this.displayDialog = true;
  //     this.dialogTitle = "";
  // }

/** ⇒  to save the details based on student_eligible */
  save() {
  if (this.cashincentive.valid) {
    if(this.cashincentive.value.bank_name === '' || this.cashincentive.value.branch === '' || this.cashincentive.value.micr_code === ''){
          this.alert.error('Please give Correct IFSC Code because Bank Name,Branch Location and MCIR Code Fields are empty !');
          return true;
    }
    delete this.cashincentive.value.micr_code;
    delete this.cashincentive.value.bank_name;
    // if(this.cashincentive.value.student_eligible === '0'){
    //   delete this.cashincentive.value.ifsc_code;
    //   delete this.cashincentive.value.branch;
    //   delete this.cashincentive.value.bank_acc;
    //   delete this.cashincentive.value.bank_acc_open_date;
    //   delete this.cashincentive.value.bank_acc_status;
    //   delete this.cashincentive.value.stu_mobile_no;
    //   delete this.cashincentive.value.study_at_X;
    //   delete this.cashincentive.value.study_at_X_sec;
    //   delete this.cashincentive.value.study_at_XI;
    //   delete this.cashincentive.value.study_at_XI_sec;
    //   delete this.cashincentive.value.study_at_XII;
    //   delete this.cashincentive.value.study_at_XII_sec;
    // }
      this.service.saveCashIncentivedtl(this.cashincentive.value).subscribe((res) => {
      if (res.dataStatus) {
          this.alert.success(res.message);
          this.cashincentive.reset();
          this.displayDialog = false;
          this.getStudent();      
      }
      else this.alert.error(res.message); 
      },err=>{console.warn('error in save',err);this.alert.error('Error Occur please try again or refresh the page');});
                       
}else{
    this.validateAllFormFields(this.cashincentive);
    //for focus
    for (const key of Object.keys(this.cashincentive.controls)) {
      if (this.cashincentive.controls[key].invalid) {
          const invalidControl = this.eleref.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.info(invalidControl);
          invalidControl.focus();
          break;
      }
    }  
    this.alert.warning('Please Fill All Mandatory Fields.!');
    return true;
  }
  this.displayDialog = false;
  }

  /** ⇒  to edit the existing details  */
  onRowSelect(event) {
      this.cashincentive.reset();
      this.cashincentive.patchValue(event.data);
      this.available = event.data.student_eligible === '1' ? true : false;
      if(!event.data.stu_mobile_no) this.cashincentive.controls.stu_mobile_no.setValue(event.data.phone_number);
      this.cashincentive.controls.Students_name.setValue(event.data.name);
      this.cashincentive.controls.unique_id_no.setValue(event.data.stu_unique_id);
      this.displayDialog = true;
      this.dialogTitle = event.data.name+" - "+event.data.stu_unique_id;
      
  }

  
/** ⇒  to change Function - form fields  */
  handleFormChanges() {            
    this.cashincentive.get('student_eligible').valueChanges.subscribe(mode => {
      if(mode === '1'){
        this.available = true;
        this.cashincentive.controls['ifsc_code'].setValidators([Validators.required]);
        this.cashincentive.controls['bank_acc'].setValidators([Validators.required]);
        this.cashincentive.controls['bank_acc_open_date'].setValidators([Validators.required]);
        this.cashincentive.controls['bank_acc_status'].setValidators([Validators.required]);
      }
      else{
        this.available = false;
        this.cashincentive.controls['ifsc_code'].clearValidators();
        this.cashincentive.controls['bank_acc'].clearValidators();
        this.cashincentive.controls['bank_acc_open_date'].clearValidators();
        this.cashincentive.controls['bank_acc_status'].clearValidators();
      }
        this.cashincentive.controls['ifsc_code'].updateValueAndValidity();
        this.cashincentive.controls['bank_acc'].updateValueAndValidity();
        this.cashincentive.controls['bank_acc_open_date'].updateValueAndValidity();
        this.cashincentive.controls['bank_acc_status'].updateValueAndValidity();
    });     
    this.cashincentive.get('study_at_X').valueChanges.subscribe(mode => {
          if (mode==='Partially Aided') {
            this.cashincentive.controls['study_at_X_sec'].setValidators([Validators.required]);
          } else {
             this.cashincentive.controls['study_at_X_sec'].clearValidators();
             this.cashincentive.controls['study_at_X_sec'].setValue('');
          } 
          this.cashincentive.controls['study_at_X_sec'].updateValueAndValidity();
    });      
    this.cashincentive.get('study_at_XI').valueChanges.subscribe(mode => {
      if (mode==='Partially Aided') {
        this.cashincentive.controls['study_at_XI_sec'].setValidators([Validators.required]);
      } else {
         this.cashincentive.controls['study_at_XI_sec'].clearValidators();
         this.cashincentive.controls['study_at_XI_sec'].setValue('');
      } 
      this.cashincentive.controls['study_at_XI_sec'].updateValueAndValidity();
    });
    this.cashincentive.get('study_at_XII').valueChanges.subscribe(mode => {
      if (mode==='Partially Aided') {
        this.cashincentive.controls['study_at_XII_sec'].setValidators([Validators.required]);
      } else {
         this.cashincentive.controls['study_at_XII_sec'].clearValidators();
         this.cashincentive.controls['study_at_XII_sec'].setValue('');
      } 
      this.cashincentive.controls['study_at_XII_sec'].updateValueAndValidity();
    });            

  }

  /** ⇒  Export pdf (Data-tables)  */
  // exportPdf() {
  //   debugger;
  //   import("jspdf").then(jsPDF => {
  //       import("jspdf-autotable").then(x => {
  //           const doc = new jsPDF.default(0,0);
  //           doc.autoTable(this.exportColumns, this.studcashincentivelist);
  //           // doc.text(20, 20, 'Hello world!');
  //           // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
  //           doc.save(this.schoolName+'( Cash Incentive - Student List ).pdf');
  //       })
  //   })
  // }
  /** ⇒  Export xl (custom)  */
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getxldata());
        const workbook = { Sheets: { 'special cash incentive': worksheet }, SheetNames: ['special cash incentive'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.schoolName +' ( Cash Incentive ) ');
    });
}
/** ⇒  Export xl data gathering (custom)  */
  getxldata() {
    this.exportExcelData = [];
    this.studcashincentivelist.map(item => {
      return {
        'Unique Id': item.stu_unique_id,
        'Name': item.name,
        'Class':item.class_studying,
        'Section':item.class_section,
        'Phone Number': item.phone_number,
        'Data of Birth': item.dob,
        'Study at X':item.study_at_X,
         'Study at X Section':item.study_at_X_sec,
          'Study at XI':item.study_at_XI,
          'Study at XI Section':item.study_at_XI_sec,
          'Study at XII':item.study_at_XII,
          'Study at XII Section':item.study_at_XII_sec,
          'Status Of Student':item.eligible_label,
          'XII TH Result Status':item.result_XII,
          'MICR code':item.micr_code,
          'Bank Name':item.bank_name,
          'Branch':item.branch,
          'IFSC':item.ifsc_code,
          'Account Number':item.bank_acc,
          'Account Opening Date':item.bank_acc_open_date,
          'Account Status':item.bank_acc_status == '1' ? 'Active' : item.bank_acc_status == '2' ? 'In Active' : item.bank_acc_status,
          'Total Amount (₹)': item.total
      }
  }).forEach(item => this.exportExcelData.push(item));
    return this.exportExcelData;
  }

  /** ⇒  Export xl save (custom)  */
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName +' '+ new Date().getTime() + EXCEL_EXTENSION);
    });
}
 
/** ⇒  validation check with existing (custom)  */
  checkAccno(val){
    if(val !== null || val !== ''){
         this.service.checkAccnoForStudCashIncentive(val).subscribe(res => {
                 if(!res.dataStatus){
                  this.inValidMsg2 = res.message; 
                   this.alert.info(res.message);
                   this.cashincentive.controls['bank_acc'].setValue('');
                 }
                 else this.inValidMsg2 = '';
             },err => { console.warn(err); });   
    }
  }

  /** ⇒  to get Bank Details (using ifsc) code  */
  getBankname(val){
    if(val !== null || val !== ''){
      this.service.getCommonTables(val).subscribe(res => {
        if (res.dataStatus) {
            var bank_details = res.result[0];
            this.cashincentive.controls['bank_name'].setValue(bank_details.bank_name);
            this.cashincentive.controls['branch'].setValue(bank_details.branch);
            this.cashincentive.controls['micr_code'].setValue(bank_details.micr_code);  
            this.inValidMsg1 = '';
        }
        else{
          this.inValidMsg1 = res.message+' For Given IFSC Code ( '+val+' )';
          this.alert.info(this.inValidMsg1);
          this.cashincentive.controls['bank_name'].setValue('');
          this.cashincentive.controls['branch'].setValue('');
          this.cashincentive.controls['micr_code'].setValue('');
        }
          this.cashincentive.controls['bank_name'].updateValueAndValidity();
          this.cashincentive.controls['branch'].updateValueAndValidity();
          this.cashincentive.controls['micr_code'].updateValueAndValidity();
      },err => console.warn(err));
    }
  }

  /** ⇒  validation all Form Field (custom)  */
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
/**  Ends  */
}

