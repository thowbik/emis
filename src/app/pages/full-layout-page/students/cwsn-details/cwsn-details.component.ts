import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-cwsn-details',
  templateUrl: './cwsn-details.component.html',
  styleUrls: ['./cwsn-details.component.css']
})
export class CwsnDetailsComponent implements OnInit {
  schooltypedropvalue: { label: string; value: number; }[];
  statelogincwsn: any;
  noDataFound: boolean;
  sch_typ_id: any;
  statelogincwsn_block: any;
  noDataFound1: boolean;
  pageStage: number;
  selected_dist_id: any;
  statelogincwsn_school: any;
  showDialogBox: boolean = false ;
  national_id_yn: boolean ;
  udid_id_yn: boolean  ;
  acc_no_yn: boolean  ;
  noDataFound2: boolean;
  mode_on_transfer: { label: string; value: string; }[];
  student_loca: { label: string; value: string; }[];
  training_type: { label: string; value: string; }[];
  disabledropvalueoptions: any [] = [];
  cwsn_form: FormGroup ;
  ifsc_change: any;
  code: any;
  branch: any;
  bank_name: any;
  popup_bank: any;
  submitted: boolean;
  Usertypeid: any;
  districtid: any;
  selected_stud_id: any;
  percent:  boolean = false ;
  fromdate: string;
  todate: string;
  statelogincwsn_stud: any;
  noDataFound3: boolean;
  selected_blck_id: string;
  blockid: any;
  selected_stud_name: any;
  districtId: string;
  exportExcelData: any;
  disablty: any;
  sample: any;
  grandtotal_CWSN_Student_in_school: any;
  grandtotal_CWSN_CP: any;
  grandtotal_School: any;
  grandtotal_SRP_Center: any;
  grandtotal_Home_Based: any;
  grandtotal_NID: any;
  grandtotal_UDID: any;
  grandtotal_Account_Number: any;
  main_stream_y: boolean;
  selected_sch_id: any;
  selected_type: any;
  visible_mbc: boolean;
  userId : any;
  disrtct_name: any;
  block_name: any;
  school_namee: any;
  districtname: any;

    constructor(private fb: FormBuilder, public usersessionService : UserSessionService, private el: ElementRef, private studentservice: StudentService, private alertService: AlertService) 
    {
      this.Usertypeid = this.usersessionService.userTypeId();
      this.districtid = this.usersessionService.districtId();
      this.districtname = this.usersessionService.districtName();
      this.blockid = this.usersessionService.blockId();
      console.log(this.blockid);
      this.userId = this.usersessionService.userId();
      console.log(this.userId);

    this.schooltypedropvalue = [
      {label:'Goverment', value: 1},
      {label:'Fully Aided', value: 2},
      {label:'Un-aided', value:3},
      {label:'Partially Aided', value:4},
      {label:'Central Govt.', value:5},
      // {label:'All Schools', value:5}
    ];

  //pop-up dropdown values
   this.mode_on_transfer = [
    {label:'Transfer to Aadar Payment Bridge', value: "A"},
    {label:'Transfer to PFMS but non Aadar', value: "P"},
    {label:'Electronic Fund Transfer Directly through Bank', value:"B"},
    {label:'Funds Transfer Through Other Cash/Cheque Etc', value:"C"},
    ];

   this.student_loca = [
      {label:'In School', value: "1"},
      {label:'School Readiness Program Center', value: "2"},
      {label:'Home Based', value:"3"},
      ];

   this.training_type = [
     {label:'Special', value: "1"},
     {label:'Therapy', value: "2"},
     {label:'Both Special Therapy', value:"3"},
     {label:'Not Applicable', value:"4"},
      ];
   }
   
// state login table header

cols : Array<{'field':string,'header':string,'widthstyle':string}> =
[{ field: 'district_name', header: 'District',widthstyle: '13em'},
{ field: 'CWSN_Student_in_school', header: 'Cwsn Student In School',widthstyle: '16em'},
{ field: 'CWSN_CP', header: 'Cwsn Student In Common Pool',widthstyle: '20em'},
{ field: 'School', header: 'Supported In School',widthstyle: '16em'},
{ field: 'SRP_Center', header: 'Supported In SRP center',widthstyle: '16em'},
{ field: 'Home_Based', header: 'Home Based Support' ,widthstyle: '15em'},
{ field: 'NID', header: 'With NID',widthstyle: '15em' },
{ field: 'UDID', header: 'With UDID',widthstyle: '15em' },
{ field: 'Account_Number', header: 'With Account Nubmer',widthstyle: '15em' },
];

 cols1 : Array<{'field':string,'header':string,'widthstyle':string}> =
 [ { field: 'block_name', header: 'Block Name',widthstyle: '13em'},
  { field: 'CWSN_Student_in_school', header: 'Cwsn Student In School',widthstyle: '16em'},
  { field: 'CWSN_CP', header: 'Cwsn Student In Common Pool',widthstyle: '20em'},
  { field: 'School', header: 'Supported In School',widthstyle: '16em'},
  { field: 'SRP_Center', header: 'Supported In SRP center',widthstyle: '16em'},
  { field: 'Home_Based', header: 'Home Based Support' ,widthstyle: '15em'},
  { field: 'NID', header: 'With NID',widthstyle: '15em' },
  { field: 'UDID', header: 'With UDID',widthstyle: '15em' },
  { field: 'Account_Number', header: 'With Account Nubmer',widthstyle: '15em' },
];


cols2 : Array<{'field':string,'header':string,'widthstyle':string}> =[
  { field: 'udise_code', header: 'UDISE Code',widthstyle: '10em'},
  { field: 'school_name', header: 'School Name',widthstyle: '13em'},
  { field: 'cate_type', header: 'Category',widthstyle: '14em'},
  { field: 'CWSN_Student_in_school', header: 'Cwsn Student In School',widthstyle: '16em'},
  { field: 'CWSN_CP', header: 'Cwsn Student In Common Pool',widthstyle: '20em'},
  { field: 'School', header: 'Supported In School',widthstyle: '16em'},
  { field: 'SRP_Center', header: 'Supported In SRP center',widthstyle: '16em'},
  { field: 'Home_Based', header: 'Home Based Support' ,widthstyle: '15em'},
  { field: 'NID', header: 'With NID',widthstyle: '15em' },
  { field: 'UDID', header: 'With UDID',widthstyle: '15em' },
  { field: 'Account_Number', header: 'With Account Nubmer',widthstyle: '15em' },
];

cols3 : Array<{'field':string,'header':string,'widthstyle':string}> =
[ { field: 'unique_id_no', header: 'Student ID',widthstyle: '13em'},
 { field: 'name', header: 'Student Name',widthstyle: '16em'},
 { field: 'class_studying_id', header: 'Class',widthstyle: '10em'},
 { field: 'da_name', header: 'Disability Type',widthstyle: '12em'},
 { field: 'disable_percentage', header: 'Precentage',widthstyle: '10em'},
 { field: 'nid', header: ' NID',widthstyle: '10em' },
 { field: 'udid', header: ' UDID',widthstyle: '10em' },
 { field: 'Supported_in', header: 'Supported In',widthstyle: '12em'},
 { field: 'EMIS_location', header: 'EMIS Location',widthstyle: '12em'},
 { field: 'unique_id_no', header: 'Action',widthstyle: '10em'},
];



  ngOnInit() {
    
    var today = new Date() ,year = today.getFullYear().toString() ,sliceyear = today.getFullYear().toString().slice(-2) , month = today.getMonth().toString() , date = today.getDate().toString(),
    fromyear = today.getFullYear() - 20 ; 

    let fromdates= fromyear + "-" + "01" + "-" + "01" ;  
    let todates= year + "-" + "12" + "-" + "31" ;  
    this.fromdate = fromdates ;
    this.todate = todates ;
    if (!this.districtid) {
      this.statelogincwsndetails();
    } 
    else {
      this.getSelecteddistrictid(this.districtid, this.districtname)
    }
    if(this.Usertypeid == 5) {
      this.statelogincwsndetails();
    }
    if(this.Usertypeid == 9 || this.Usertypeid == 3 || this.Usertypeid == 14) {
      this.ceologincwsndetails();
    }
    else if(this.Usertypeid == 2)
    {
      let schooltype = 1,district_id = '' ,udise_code = '';
      const block_id = this.usersessionService.userId();
      
       this.studentservice.stateloginonloadAPI(schooltype , district_id , block_id, udise_code).subscribe((res) => {
        this.pageStage = 3;
        if(res.result.length>0){
          this.statelogincwsn_school = res.result;
          this.noDataFound2 = false;
  
          this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_school.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
          this.grandtotal_CWSN_CP = this.statelogincwsn_school.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
          this.grandtotal_School = this.statelogincwsn_school.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
          this.grandtotal_SRP_Center = this.statelogincwsn_school.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
          this.grandtotal_Home_Based = this.statelogincwsn_school.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
          this.grandtotal_NID = this.statelogincwsn_school.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
          this.grandtotal_UDID = this.statelogincwsn_school.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
          this.grandtotal_Account_Number = this.statelogincwsn_school.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
       
        }
        else{
          this.noDataFound2 = true;
        }
      })
    }
  
      

    if(this.Usertypeid == 6) {
      this.blocklogincwsndetails();
    }
    this.disable_dropdown();
    this.cwsn_form = this.fb.group({ 
      'disable_type': new FormControl('',Validators.required),
      'med_board_certi_yn': new FormControl('',null),
      'identified_date': new FormControl('',null),
      'nid_yn': new FormControl('',Validators.required),
      'nid': new FormControl('',null),
      'udid_yn': new FormControl('',Validators.required),
      'udid': new FormControl('',null),
      'disable_percentage': new FormControl('',null),
      'support_in': new FormControl('',Validators.required),
      'training_type': new FormControl('',Validators.required),
      'account_yn': new FormControl('',Validators.required),
      'ifs_code': new FormControl(this.code,null),  
      'bank_name': new FormControl('',null),  
      'bank_id': new FormControl('',null),  
      'branch': new FormControl('',null),  
      'account_no': new FormControl('',null),  
      // 'mode_of_transfer': new FormControl('',Validators.required),  
      'mainstream_yn': new FormControl('',Validators.required),  
      'mainstream_date': new FormControl('',null),    
    });
   
  }

  // onchange ifsc code 
  ifsc_cde(event) {  
    this.code=event;
    this.studentservice.get_ifsc_data(this.code).subscribe((res) => {
      if(res.data.length>0){ 
        this.popup_bank = res.data[0];
        this.cwsn_form.patchValue(this.popup_bank); 
      }
    })
  }

  goBack() {
    this.pageStage = 1;
    this.block_name = '';
    this.school_namee = '';
    this.disrtct_name = '';
  }
  goBack_b() {
    this.pageStage = 2;
    this.school_namee = '';
    this.block_name = '';
  }

  goBack_sc() {
    this.pageStage = 3;
    this.school_namee = '';
    
  }


  dis_percnt(){
    debugger
    if( this.cwsn_form.value.disable_percentage < 40 ){
        this.percent= true;
        this.submitted=false;
        debugger;
    }
    else if(this.cwsn_form.value.disable_percentage > 100 ) {
      this.percent = true;
      this.submitted=false;
      debugger;
    }
    else {
      this.percent = false;
    }
  }

  // Disablity type drop down
  disable_dropdown()  {
    this.studentservice.getdropdowdata().subscribe((data) => {
      let dropDownList = data.result;
      // Dropdown Values
      if(dropDownList.length>0){
        this.disabledropvalueoptions.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.disabledropvalueoptions.push({ value: dropDownList[i].da_code, label: dropDownList[i].da_name })
        }
      }
      else
      {
        this.disabledropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }

  Choose_ac_avali(value){
    if(value == 1)
    {
      this.acc_no_yn = true ;
      this.cwsn_form.controls['ifs_code'].setValidators(Validators.required);
      this.cwsn_form.controls['account_no'].setValidators([Validators.required, Validators.pattern("^[0-9a-zA-z]*$")]);

    }
    else {
      this.acc_no_yn = false ;
      this.cwsn_form.controls['ifs_code'].setValue("");
      this.cwsn_form.controls['ifs_code'].setValidators(null);
      this.cwsn_form.controls['account_no'].setValue("");
      this.cwsn_form.controls['account_no'].setValidators(null);
    }
    this.cwsn_form.controls['ifs_code'].updateValueAndValidity();
    this.cwsn_form.controls['account_no'].updateValueAndValidity();
  }

  Choose_nec_id(value){
    if(value == 1)
    {
      this.national_id_yn = true ;
      this.cwsn_form.controls['nid'].setValidators([Validators.required, Validators.pattern("^[0-9a-zA-z]*$")]);
      this.cwsn_form.controls['disable_percentage'].setValidators([Validators.required, Validators.pattern("^[0-9]*$")]);
    }
    else {
      this.national_id_yn = false ;
      this.cwsn_form.controls['nid'].setValue("");
      this.cwsn_form.controls['nid'].setValidators(null);
      this.cwsn_form.controls['disable_percentage'].setValue("");
      this.cwsn_form.controls['disable_percentage'].setValidators(null);
    }
    this.cwsn_form.controls['nid'].updateValueAndValidity();
    this.cwsn_form.controls['disable_percentage'].updateValueAndValidity();
  }


  Choose_rec_udid(value)
  {
  if(value == 1)
  {
    this.udid_id_yn = true ;
    this.cwsn_form.controls['udid'].setValidators([Validators.required, Validators.pattern("^[0-9a-zA-z]*$")]);
  }
  else {
    this.udid_id_yn = false ;
    this.cwsn_form.controls['udid'].setValue("");
    this.cwsn_form.controls['udid'].setValidators(null);
  }
  this.cwsn_form.controls['udid'].updateValueAndValidity();
  }

  Choose_mainstreamed(value)
  {
  if(value == 1)
  {
    this.main_stream_y = true ;
    this.cwsn_form.controls['mainstream_date'].setValidators([Validators.required]);
  }
  else {
    this.main_stream_y = false ;
    this.cwsn_form.controls['mainstream_date'].setValue("");
    this.cwsn_form.controls['mainstream_date'].setValidators(null);
  }
  this.cwsn_form.controls['mainstream_date'].updateValueAndValidity();
  }

  save(){
    this.submitted = true;

    
    if (this.cwsn_form.valid) { 
      
    let stu_id = this.selected_stud_id,
    disable_type = this.cwsn_form.value.disable_type,
    cwsn_date=this.cwsn_form.value.identified_date,
    national_id=this.cwsn_form.value.nid_yn,
    national_id_no=this.cwsn_form.value.nid,
    recived_udid=this.cwsn_form.value.udid_yn,
    udid_no=this.cwsn_form.value.udid,
    disabl_percntage=this.cwsn_form.value.disable_percentage,
    stud_location=this.cwsn_form.value.support_in,
    training_type=this.cwsn_form.value.training_type,
    acc_no_avali=this.cwsn_form.value.account_yn,
    ifsc_code=this.cwsn_form.value.ifs_code,
    bank_id=this.cwsn_form.value.bank_id,
    bank_name=this.cwsn_form.value.bank_name,
    branch=this.cwsn_form.value.branch,
    acc_no=this.cwsn_form.value.account_no,
    // mode_of_transfer=this.cwsn_form.value.mode_of_transfer, "transfer_mode" : mode_of_transfer, 
    main_stream_yn=this.cwsn_form.value.mainstream_yn,
    main_stream=this.cwsn_form.value.mainstream_date,
    med_board_certi_yn=this.cwsn_form.value.med_board_certi_yn;

    let datas = {"id" : stu_id, "differently_abled" : disable_type, "med_board_certi_yn" : med_board_certi_yn,
    "disable_percentage" : disabl_percntage,"identified_date" : cwsn_date,"nid_yn" : national_id,"nid" : national_id_no,"udid_yn" : recived_udid,"udid" : udid_no,
    "support_in" : stud_location,"training_type" : training_type,"account_yn" : acc_no_avali,"bank_id" : bank_id,"ifsc_code" : ifsc_code,"account_no" : acc_no,
    "mainstream_yn" : main_stream_yn,"mainstream_date" : main_stream };
    
     this.studentservice.student_edit_save_API({"records":datas}, true).subscribe((res) => {
       if(res){
       this.alertService.success("Data Save Successfully");
       this.cwsn_form.reset();
       this.submitted = false;
       this.national_id_yn=false;
       this.udid_id_yn=false;
       this.acc_no_yn=false;
       this.visible_mbc= false;
       this.main_stream_y=false;
       this.getSelected_udise(this.selected_sch_id,"");
      }
       else {
         this.alertService.error("Please Fill all the Required Fields"); 
       }
     })
     this.showDialogBox = false;
    }
    else{
      for (const key of Object.keys(this.cwsn_form.controls)) {
        if (this.cwsn_form.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all the Required Fields");
    }
  }

  close_dialog(){
    this.cwsn_form.reset();
    this.submitted = false;
    this.national_id_yn=false;
    this.udid_id_yn=false;
    this.acc_no_yn=false;
    this.main_stream_y=false;    
    this.showDialogBox=false;
    this.visible_mbc= false;
  }

  blocklogincwsndetails(){
    let schooltype = 1 , district_id = '', block_id = ' ', udise_code ='' ;
     this.studentservice.stateloginonloadAPI(schooltype, district_id, block_id , udise_code).subscribe((res) => {
      this.pageStage = 3;
      if(res.result.length>0){
        this.statelogincwsn_school = res.result;
        this.noDataFound2 = false;
      
      this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_school.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
      this.grandtotal_CWSN_CP = this.statelogincwsn_school.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
      this.grandtotal_School = this.statelogincwsn_school.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
      this.grandtotal_SRP_Center = this.statelogincwsn_school.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
      this.grandtotal_Home_Based = this.statelogincwsn_school.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
      this.grandtotal_NID = this.statelogincwsn_school.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
      this.grandtotal_UDID = this.statelogincwsn_school.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
      this.grandtotal_Account_Number = this.statelogincwsn_school.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
   
      }
      else{
        this.noDataFound2 = true;
      }
    })

  }

  ceologincwsndetails(){

    let schooltype = 1 ,district_id = '' , block_id = '', udise_code = '';
    this.sch_typ_id = schooltype ;
    this.studentservice.stateloginonloadAPI(schooltype, district_id, block_id, udise_code).subscribe((res) => {
      this.pageStage = 2;
      if(res.result.length>0){
        this.statelogincwsn_block = res.result;
        console.log(this.statelogincwsn_block);

        this.noDataFound1 = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_block.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn_block.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn_block.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn_block.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn_block.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn_block.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn_block.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn_block.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
      }
      else{
        this.noDataFound1 = true;
      }
    })
  }

  statelogincwsndetails(){
    let schooltype = 1, district_id = '' , block_id = '' , udise_code = '';
    this.sch_typ_id = schooltype ;
    this.studentservice.stateloginonloadAPI(schooltype, district_id , block_id , udise_code).subscribe((res) => {
      this.pageStage = 1;
      if(res.result.length>0){
        this.statelogincwsn = res.result;
        console.log(this.statelogincwsn,"result");
        this.noDataFound = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
       }    
        else {
        this.noDataFound = true;
      }
    })
  }

  getSelecteddistrictid(district_id,district_name){
    this.disrtct_name = district_name;
    let schooltype = this.sch_typ_id ,  block_id = '', udise_code = " " ;
    this.selected_dist_id = district_id ;
    this.studentservice.stateloginonloadAPI(schooltype, district_id , block_id ,udise_code).subscribe((res) => {
      this.pageStage = 2;
      if(res.result.length>0){
        this.statelogincwsn_block = res.result;
        this.noDataFound1 = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_block.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn_block.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn_block.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn_block.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn_block.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn_block.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn_block.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn_block.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
     
      }
      
      else{
        this.noDataFound1 = true;
      }
    })
  }

  getSelected_blockid(block_id,b_name){
    this.block_name=b_name;
    let schooltype = this.sch_typ_id ,district_id = '' ,udise_code = '';
    this.selected_blck_id = block_id ;
    
     this.studentservice.stateloginonloadAPI(schooltype , district_id , this.selected_blck_id , udise_code).subscribe((res) => {
      this.pageStage = 3;
      if(res.result.length>0){
        this.statelogincwsn_school = res.result;
        this.noDataFound2 = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_school.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn_school.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn_school.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn_school.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn_school.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn_school.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn_school.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn_school.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
     
      }
      else{
        this.noDataFound2 = true;
      }
    })
  }

  getSelected_udise(udise_code,s_name){
    this.school_namee=s_name;
    let schooltype = this.sch_typ_id ,district_id = '' ,block_id = '' ;
    this.selected_sch_id=udise_code
    this.studentservice.stateloginonloadAPI(schooltype , district_id , block_id , this.selected_sch_id).subscribe((res) => {
     this.pageStage = 4;
     if(res.result.length>0){
       this.statelogincwsn_stud = res.result;
       this.noDataFound3 = false;
     }
     else{
       this.noDataFound3 = true;
     }
   })
  }
 

   // on select  school type value
   StateSchoolTypeOption (event){
    let schooltype = event.value , district_id = '' , block_id = '', udise_code = '';
    this.sch_typ_id = schooltype ;
    this.studentservice.stateloginonloadAPI(schooltype, district_id, block_id, udise_code).subscribe((res) => {
      if(res.result.length>0){
        this.statelogincwsn = res.result;
        this.noDataFound = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
     
      }
      else {
        this.noDataFound = true;
      }
    })
  }

  blockSchoolTypeOption(event){
    let schooltype = event.value  , block_id ='', udise_code = '';
    this.sch_typ_id = schooltype ;
    if(this.selected_dist_id == undefined)
    {
      this.studentservice.stateloginonloadAPI(schooltype, this.districtid, block_id, udise_code).subscribe((res) => {
        if(res.result.length>0){
          this.statelogincwsn_block = res.result;
          this.noDataFound1 = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_block.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn_block.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn_block.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn_block.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn_block.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn_block.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn_block.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn_block.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
     
        }
        else{
          this.noDataFound1 = true;
        }
      })
    }
    else {
      this.studentservice.stateloginonloadAPI(schooltype, this.selected_dist_id, block_id, udise_code).subscribe((res) => {
        if(res.result.length>0){
          this.statelogincwsn_block = res.result;
          this.noDataFound1 = false;

        this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_block.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
        this.grandtotal_CWSN_CP = this.statelogincwsn_block.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
        this.grandtotal_School = this.statelogincwsn_block.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
        this.grandtotal_SRP_Center = this.statelogincwsn_block.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
        this.grandtotal_Home_Based = this.statelogincwsn_block.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
        this.grandtotal_NID = this.statelogincwsn_block.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
        this.grandtotal_UDID = this.statelogincwsn_block.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
        this.grandtotal_Account_Number = this.statelogincwsn_block.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
     
        }
        
        else{
          this.noDataFound1 = true;
        }
      })
    }
  }

  SchSchoolTypeOption(event){
    let schooltype = event.value, district_id='', udise_code = '';
    this.sch_typ_id = schooltype ;
    if(this.selected_blck_id == undefined){
      this.studentservice.stateloginonloadAPI(schooltype, district_id, this.blockid, udise_code).subscribe((res) => {
        if(res.result.length>0){
          this.statelogincwsn_school = res.result;
          this.noDataFound2 = false;

          this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_school.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
          this.grandtotal_CWSN_CP = this.statelogincwsn_school.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
          this.grandtotal_School = this.statelogincwsn_school.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
          this.grandtotal_SRP_Center = this.statelogincwsn_school.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
          this.grandtotal_Home_Based = this.statelogincwsn_school.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
          this.grandtotal_NID = this.statelogincwsn_school.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
          this.grandtotal_UDID = this.statelogincwsn_school.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
          this.grandtotal_Account_Number = this.statelogincwsn_school.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
       
        }
      
        else{
          this.noDataFound2 = true;
        }
      })
    }
    else {
      this.studentservice.stateloginonloadAPI(schooltype, district_id, this.selected_blck_id, udise_code).subscribe((res) => {
        if(res.result.length != 0){
          this.statelogincwsn_school = res.result;
          this.noDataFound2 = false;

          this.grandtotal_CWSN_Student_in_school = this.statelogincwsn_school.map(c => c.CWSN_Student_in_school === '' ? 0 : Number(c.CWSN_Student_in_school)).reduce((sum, current) => sum + current);
          this.grandtotal_CWSN_CP = this.statelogincwsn_school.map(c => c.CWSN_CP === '' ? 0 : Number(c.CWSN_CP)).reduce((sum, current) => sum + current);
          this.grandtotal_School = this.statelogincwsn_school.map(c => c.School === '' ? 0 : Number(c.School)).reduce((sum, current) => sum + current);
          this.grandtotal_SRP_Center = this.statelogincwsn_school.map(c => c.SRP_Center === '' ? 0 : Number(c.SRP_Center)).reduce((sum, current) => sum + current);
          this.grandtotal_Home_Based = this.statelogincwsn_school.map(c => c.Home_Based === '' ? 0 : Number(c.Home_Based)).reduce((sum, current) => sum + current);
          this.grandtotal_NID = this.statelogincwsn_school.map(c => c.NID === '' ? 0 : Number(c.NID)).reduce((sum, current) => sum + current);
          this.grandtotal_UDID = this.statelogincwsn_school.map(c => c.UDID === '' ? 0 : Number(c.UDID)).reduce((sum, current) => sum + current);
          this.grandtotal_Account_Number = this.statelogincwsn_school.map(c => c.Account_Number === '' ? 0 : Number(c.Account_Number)).reduce((sum, current) => sum + current);
       
        }
        else{
          this.noDataFound2 = true;
        }
      })
    }
  
  }
  handleClick(id ,name, da_name) {
    this.selected_stud_id=id;
    this.selected_stud_name=name;
    this.disablty=da_name
    this.cwsn_form.controls['disable_type'].setValue(this.disablty);
    this.studentservice.get_popup_data(this.selected_stud_id).subscribe((res) => {
      if(res.data.length>0){ 
        this.popup_bank = res.data[0];
        console.log(this.popup_bank);
        console.log(this.popup_bank.nid_yn);
          if (this.popup_bank.nid_yn == 1)
          {
            this.national_id_yn=true;
          }
          else{
            this.national_id_yn=false;
          }
          if (this.popup_bank.udid_yn == 1)
          {
            this.udid_id_yn=true;
          }
          else{
            this.udid_id_yn=false;
          }
          if (this.popup_bank.account_yn == 1)
          {
            this.acc_no_yn=true;
          }
          else{
            this.acc_no_yn=false;
          }
          if (this.popup_bank.mainstream_yn == 1)
          {
            this.main_stream_y=true;
          }
          else{
            this.main_stream_y=false;
          }
        this.cwsn_form.patchValue(this.popup_bank); 
      }
    })
    // this.alertService.success(this.popup_bank.nid_yn);
    if(this.disablty == 7) {
      this.cwsn_form.controls['med_board_certi_yn'].setValidators(Validators.required);
    }
    else{
     this.cwsn_form.controls['med_board_certi_yn'].setValue("");
     this.cwsn_form.controls['med_board_certi_yn'].setValidators(null);
    }
    this.showDialogBox= true;    
  }

  disble_typ(selected_type){
   this.selected_type=selected_type.value;
  //  this.alertService.success(this.selected_type);
   if(this.selected_type == 7) {
     this.visible_mbc= true;
     debugger;
     this.cwsn_form.controls['med_board_certi_yn'].setValidators(Validators.required);
     debugger;
  }
  else{
    this.disablty=this.selected_type;
    this.visible_mbc= false;
   this.cwsn_form.controls['med_board_certi_yn'].setValidators(null);
   this.cwsn_form.controls['med_board_certi_yn'].setValue("");
  }
  }

  getstudentstatedata(){
    this.exportExcelData = [];
    this.statelogincwsn.map(item => {
      return {
        'District': item.district_name,
        'Cwsn Student In School': item.CWSN_Student_in_school,
        'Cwsn Student In Common Pool': item.CWSN_CP,
        ' Supported In School': item.School,
        'Supported In SRP center': item.SRP_Center,
        'Home Based Support': item.Home_Based,
        'With NID': item.NID,
        ' With UDID': item.UDID,
        ' With Account Nubmer': item.Account_Number,

         } 
         }).forEach(item => this.exportExcelData.push(item));
         let studentdatastate = [];
         for(let schooldata of this.exportExcelData) {
          studentdatastate.push(schooldata);
         }
         return studentdatastate;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedata());
        const workbook = { Sheets: { 'Student Data in state' : worksheet }, SheetNames: ['Student Data in state'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'CWSN District Wise List');
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  } 
  // PageStage2 Excel
  getstudentstatedatablock(){
    this.exportExcelData = [];
    this.statelogincwsn_block.map(item => {
      return {
        'Block': item.block_name,
        'Cwsn Student In School': item.CWSN_Student_in_school,
        'Cwsn Student In Common Pool': item.CWSN_CP,
        ' Supported In School': item.School,
        'Supported In SRP center': item.SRP_Center,
        'Home Based Support': item.Home_Based,
        'With NID': item.NID,
        ' With UDID': item.UDID,
        ' With Account Nubmer': item.Account_Number,

         } 
         }).forEach(item => this.exportExcelData.push(item));
         let studentdatablock = [];
         for(let studentblock of this.exportExcelData) {
          studentdatablock.push(studentblock);
         }
         return studentdatablock;
   }
  
   ExportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedatablock());
        const workbook = { Sheets: { 'Student Data in Blockwise' : worksheet }, SheetNames: ['Student Data in Blockwise'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFileblock(excelBuffer,'CWSN Blockwise Wise List');
    });
  }
  
  saveAsExcelFileblock(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  } 
  // PageStage3 Excel
  getstudentstatedataschoolstudent(){
    this.exportExcelData = [];
    this.statelogincwsn_school.map(item => {
      return {
        'UDISE code': item.udise_code,
        'School Name': item.school_name,
        'Category': item.cate_type,
        'Cwsn Student In School': item.CWSN_Student_in_school,
        'Cwsn Student In Common Pool': item.CWSN_CP,
        ' Supported In School': item.School,
        'Supported In SRP center': item.SRP_Center,
        'Home Based Support': item.Home_Based,
        'With NID': item.NID,
        ' With UDID': item.UDID,
        ' With Account Nubmer': item.Account_Number,

         } 
         }).forEach(item => this.exportExcelData.push(item));
         let studentdatastudent = [];
         for(let studentstudent of this.exportExcelData) {
          studentdatastudent.push(studentstudent);
         }
         return studentdatastudent;
   }
  
   Exportexcelschool() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedataschoolstudent());
        const workbook = { Sheets: { 'Student Data in schoolwise' : worksheet }, SheetNames: ['Student Data in schoolwise'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFilestudent(excelBuffer,'CWSN SchoolWise List');
    });
  }
  
  saveAsExcelFilestudent(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  } 

  // PageStage Excel
  getstudentstatedatastudent(){
    this.exportExcelData = [];
    this.statelogincwsn_stud.map(item => {
      [ { field: 'unique_id_no', header: 'Student ID',widthstyle: '13em'},
        { field: 'name', header: 'Student Name',widthstyle: '16em'},
        { field: 'class_studying_id', header: 'Class',widthstyle: '10em'},
        { field: 'da_name', header: 'Disability Type',widthstyle: '12em'},
        { field: 'disable_percentage', header: 'Precentage',widthstyle: '10em'},
        { field: 'nid', header: ' NID',widthstyle: '10em' },
        { field: 'udid', header: ' UDID',widthstyle: '10em' },
        { field: 'Supported_in', header: 'Supported In',widthstyle: '12em'},
        { field: 'EMIS_location', header: 'EMIS Location',widthstyle: '12em'},
        { field: '', header: 'Action',widthstyle: '10em'},
        ];

      return {
        'Student ID': item.unique_id_no,
        'Student Name': item.name,
        'Class': item.class_studying_id,
        'Disability Type': item.da_name,
        'Precentage': item.disable_percentage,
        ' NID': item.nid,
        'UDID': item.udid,
        'Supported In': item.Supported_in,
        'EMIS Location': item.EMIS_location,
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let studentdatastudent = [];
         for(let studentschoolstu of this.exportExcelData) {
          studentdatastudent.push(studentschoolstu);
         }
         return studentdatastudent;
   }
  
   Exportexcelstudent() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedatastudent());
        const workbook = { Sheets: { 'Student Data in student' : worksheet }, SheetNames: ['Student Data in student'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFilestudent(excelBuffer,'CWSN Students data');
    });
  }
  
  saveAsExcelFilesstudent(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  } 
}
