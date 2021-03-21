import { Component, OnInit, EventEmitter} from '@angular/core';
import { TeacherService } from './teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  public generatePdf: boolean;
  public sesnId: any;
  public userTypeId: number;

  teacherdetails: any = { teacherlist: '' };
  schoolteacherdetails: any[];
  deputationteacherdetails : any[];
  volunteerteacherdetails: any[];

  colsschstaff: any[];
  colsdeputation: any[];
  colsvolunter: any[];

  staffListDialog: boolean = false; //have
  staffListDialog2: boolean = false; //have
  dataHeader: any; //noneed
  
  dis_blo_school: any[];
  district: any[];
  block: any;// noneed
  public deinedurl: any;
  pipe = new DatePipe('en-US');

  staffTransferForm: FormGroup;
  displayTransferDialog: boolean;
  transferDialogTitle : string;
  reason: {"label":string; "value":string; }[];
  exportExcelData : any[];


  constructor(private tl: TeacherService,
              private userSessionService: UserSessionService, 
              private alertService: AlertService,
              public fb: FormBuilder) 
   { 
     /* ✦ ID from session */
     this.userTypeId = +this.userSessionService.userTypeId();
     this.deinedurl= './assets/img/AccessDeniedError.png';
     switch(this.userTypeId){
       case 1: 
         console.info('teacher list in school login',this.userTypeId);
         this.sesnId = this.userSessionService.schoolId(); // here session id is a school id ...............
         break;
       case 2: case 3: this.sesnId = ''; console.info('staff list in district and block`s',this.userTypeId); break;
       case 5: case 6: case 9: case 10: case 22:
         console.info('staff list in beo,ceo,deo login`s',this.userTypeId);
         console.log(this.userSessionService);
         this.sesnId = this.userSessionService.offKeyId();// here session id is an office key id .............
         break;
       default:
         this.sesnId = ''; // here session id is empty .. In this case access deined image are loaded.
         console.info('can`t found usertype id');
         break;
     }
      
   }

  
  ngOnInit() {
    
    // console.log('max date',this.dobMaxDate);
    // this.data = {"records":{"class_id":6,"section":"A","school_id":2112}}
    // this.data = {"records":{"school_id":this.sesnId,"user_type_id":1,"tmp":""}}

    this.getTeacherList();   
    this.colsschstaff = [
      { field: 'schoolteachers.teacher_name', header: 'Staff Name'},
      { field: 'schoolteachers.category', header: 'Category' },
      { field: 'schoolteachers.desgination', header: 'Designation' },
      // { field: 'schoolteachers.professional', header: 'Professinal' },
      { field: 'schoolteachers.appsub', header: 'Main Subject' },
      { field: 'schoolteachers.formatted_staff_psjoin', header: 'DOJ(Present School)' },
      { field: 'schoolteachers.depute_todate', header: 'Deputation Status' },
      // { field: 'Transfer', header: 'Transfer' },
      // { field: 'Depute', header: 'Depute' },
      // { field: 'Action', header: 'Action' }
    ];
    this.colsdeputation = [
      { field: 'schooldeputeteachers.teacher_name', header: 'Staff Name' },
      { field: 'schooldeputeteachers.category', header: 'Category' },
      { field: 'schooldeputeteachers.type_teacher', header: 'Designation' },
      { field: 'schooldeputeteachers.s1', header: 'Subjects' },
      { field: 'schooldeputeteachers.school_name', header: 'Deputed From' },
      { field: 'schooldeputeteachers.depute_frmdate', header: 'From Date' },
      { field: 'schooldeputeteachers.depute_todate', header: 'To Date' },
    ];
    this.colsvolunter = [
      { field: 'schoolvolunteerteachers.teacher_name', header: 'Staff Name' },
      { field: 'schoolvolunteerteachers.organization_name', header: 'Organization' },
      { field: 'schoolvolunteerteachers.organization_type', header: 'Organization Type' },
      { field: 'schoolvolunteerteachers.s1', header: 'Subjects' },
      { field: 'schoolvolunteerteachers.from_date', header: 'From Date' },
      { field: 'schoolvolunteerteachers.to_date', header: 'To Date' },
      // { field7: 'Action', header7: 'Action' }
    ];

    this.staffTransferForm = this.fb.group({
      'name':new FormControl(''),
      'teacher_uid':new FormControl(''),
      'teacher_type':new FormControl(''),
      'from_school_id':new FormControl(''),
      'transfer_reason': new FormControl('', Validators.required)});
      

      this.reason = [ 
        {"value":"1","label":"Transferred to school / office"},
        {"value":"2","label":"Retired / VRS"},
        {"value":"3","label":"Resignation"},
        {"value":"4","label":"Expired"},
        {"value":"5","label":"Suspension / Departmental Action"},
        {"value":"7","label":"Duplicate Entry"},
        {"value":"6","label":"Other"}];
  }
  

 getTeacherList(){
   debugger
  this.tl.getteacherslist(this.sesnId, true).subscribe(td => {
    // if(td.dataStatus) 
    this.teacherdetails = td ;
    this.schoolteacherdetails = this.teacherdetails['teacherslist'];
    this.schoolteacherdetails.map(item => { 
      item.formatted_staff_psjoin = item.staff_psjoin != null ? item.staff_psjoin != '' ? item.staff_psjoin != '0000-00-00' ? 
                                    this.pipe.transform(item.staff_psjoin, 'dd-MM-yyyy'): null : null : null;
    });
    this.teacherdetails['teacherslist']
    // console.log(this.schoolteacherdetails);
    this.deputationteacherdetails = this.teacherdetails['deputeteachers'];
    this.volunteerteacherdetails = this.teacherdetails['volunteersteachers'];
    // console.log('teacherdetails response',this.teacherdetails);
    // console.log('teacherdetails -> list ',this.teacherdetails['teacherslist']);
  });

 }

  staffListDtls: any[] = [];

  /* ✦ SELECTOR NAME : app-add-edit-staff ( this is a child Component )
       Refer mentioned HTML and TS ->--- add-edit-staff.component.html and add-edit-staff.component.ts  
       Data are passed by "dtls" ([dtls]="staffListDtls")  */
  onEditStaffList(rowdata) {

    this.staffListDialog = true;
    let secondpart = (this.teacherdetails['staffdetailspart2']).filter(a => a.teacher_id == rowdata.teacher_code)
        secondpart = secondpart.length > 0 ? secondpart[0] : []; 
    let regulationpart  = (this.teacherdetails['regulationdata']).filter(b => b.teacher_id == rowdata.teacher_code);

    // console.log((this.teacherdetails['staffdetailspart2']).filter(a => a.teacher_id == rowdata.teacher_code));
    // this.staffListDtls['firstpart'] = rowdata;
    // this.staffListDtls['secondpart'] = secondpart;
    // this.staffListDtls['regulationpart'] = regulationpart;
    this.staffListDtls.push({'firstpart':rowdata,'secondpart':secondpart,'regulationpart':regulationpart});
    
  }

  /* ✦ SELECTOR NAME : app-add-edit-staff ( this is a child Component )
       Refer mentioned HTML and TS ->--- add-edit-staff.component.html and add-edit-staff.component.ts  
       Data are passed by "dtls" ([dtls]="staffListDtls") */
  onAddStaffList() {
    this.staffListDialog = true;
    this.staffListDtls = [];
  }
  
  /* ✦ SELECTOR NAME : app-add-edit-staff ( this is a child Component )
       Refer mentioned HTML and TS ->--- add-edit-staff.component.html and add-edit-staff.component.ts  */
  onCloseStaffList() {
    this.staffListDialog = false;
    this.staffListDtls = [];
    this.getTeacherList();
  }

  onDeputationStaffList(code) {
    console.log(code);
  }

  dupute(id) {
    // this.teacher_id=id;
    var teacherdata = this.teacherdetails['teacherslist'];
    const result = (teacherdata).filter(s => s.u_id == id);
    this.tl.getdropdownsdepute(true).subscribe(bb => {
      console.log(bb)
      this.dis_blo_school = bb
      this.district = this.dis_blo_school['district'];
    });
    //  this.deputeform(result);
    //  this.primaryModal.show();
  }

  onRowTransfer(rowData){
    var resn = (rowData.transfer_reason === null || rowData.transfer_reason === '') ?  '0' : rowData.transfer_reason;
    this.staffTransferForm.controls.name.setValue(rowData.teacher_name);
    this.staffTransferForm.controls.teacher_uid.setValue(rowData.u_id);
    this.staffTransferForm.controls.teacher_type.setValue(rowData.teacher_type);
    this.staffTransferForm.controls.from_school_id.setValue(this.sesnId);
    this.staffTransferForm.controls.transfer_reason.setValue(resn);
    this.transferDialogTitle = rowData.teacher_name;
    this.displayTransferDialog = true;
  }

  onSubmitTransferredStaff(value){

    if(value.transfer_reason == "0"){
      this.alertService.warning('Please Select The Transfer Reason');
     return true;
    }
    console.log(value);

    this.tl.updatestaffTransferDetails(value).subscribe(res => {
      if(res) this.alertService.success(res.message);
      else this.alertService.error('Something went wrong unable To update detail');
      this.getTeacherList();
      this.displayTransferDialog = false;
      console.log(res);
    });
  }



  getTeacherListExcel(){
    this.exportExcelData = [];
    return this.schoolteacherdetails.map(item =>{
      return{
        'Staff Name' : item.teacher_name,
        'TeacherCode' : item.teacher_code,
        'DateofBirth' : item.staff_dob,
        'Category' : item.social_cat,
        'Gender' : item.gender,
        'Social Category' : item.social_category,
        'Surname' : item.suf_name,
        'DisabilityType' : item.disability_type,
        'Types' : item.types_disability,
        'DOJ(Staff)' : item.staff_join,
        'DOJ(Present)' : item.staff_pjoin,
        'DOJ(Present School)' : item.staff_psjoin,
        'GPS' : item.cps_gps,
        'Suffix' : item.suffix,
        'GPS details' : item.cps_gps_details,
         'Appointment' : item.appointment_nature,
         'Academic' : item.academic,
         'Group' : item.group,
         'RecruitmentType' : item.recruit_type,
         'Recruitment Rank' : item.recruit_rank,
         'RecruitmentYear' : item.recruit_year,
         'Emailid' : item.email_id,
         'Mobile Number' : item.mbl_nmbr,
         'Professional' : item.professional,
         'UG' : item.e_ug,
         'PG' : item.e_pg,
         'Sub1' : item.subject1,
         'Sub2' : item.subject2,
         'Sub3' : item.subject3,
         'Sub4' : item.subject4,
         'Sub5' : item.subject5,
         'Sub6' : item.subject6,
         'Sub Allocated' : item.appointed_subject,
         'Designation' : item.desgination,
         'UG Deg' : item.ug_degree,
         'Training Need' : item.trng_needed,
         'Training Received' : item.trng_received,
         'NON-Teach Days' : item.nontch_days,
         'Maths' : item.math_upto,
         'Science' : item.science_upto,
         'English' : item.english_upto,
         'Language Study' : item.lang_study_upto,
         'Social Study' : item.soc_study_upto,
         'Trained CWSN' : item.trained_cwsn,
         'Trained Computer' : item.trained_comp,
         'Class Taught' : item.class_taught,
         'IFSC Code' : item.ifsc_code,
         'BANK Account' : item.bank_acc,
         'PAN no.' : item.pan_no,
         'SSLC' : item.sslc_dop,
         'HigherSecondary' : item.higersec_dop,
         'DOJ Block' : item.doj_block,
         'Prob Id' : item.prob_id,
         'Prob Date' : item.prob_date,
         'DOJ dept' : item.doj_dept,
         'Head Account' : item.head_account,
         'SSLC dop' : item.sslc_dop,
         'HigherSec dop' : item.higersec_dop,
         'Promotion eligibility Date' : item.promo_eligi_date,
      }
    }); 
   }
 
  exportExcel() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getTeacherListExcel());
          const workbook = { Sheets: { 'schoolteacherdetails': worksheet }, SheetNames: ['schoolteacherdetails'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "schoolteacherdetails");
      });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
  }
//DEPUTATION
  exportExcel1(data){
  import ("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Deputationteacherdetails': worksheet }, SheetNames: ['Deputationteacherdetails'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Deputationteacherdetails");
});
}
saveAsExcelFile1(buffer: any, fileName: string): void {
import("file-saver").then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
});
}

exportExcel2(data){
  import ("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Volunteersteacherdetails': worksheet }, SheetNames: ['Volunteersteacherdetails'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Volunteersteacherdetails");
});
}
saveAsExcelFile2(buffer: any, fileName: string): void {
import("file-saver").then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
});
}

}