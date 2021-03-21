import { DataService } from 'src/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
    pipe = new DatePipe('en-US');
    // submitted: boolean = false;
    // inValidAadhar: boolean = false;
    form: FormGroup;
    data: any;
    FlagStatus:any;
    teacherName:any;
    dialogTitle:any;
    teacherDetails:any;
    SchoolId:any;
    update_data:any;
    public tableHeader: any[] = [];
    public searchMessage: string = '';
    public searchList:any[] = [];
    public searchedStaffDetails: any[] = [];
    public searchedSchoolDetails = [];
    maxLength: number;
    userTypeId: number;
    type : number = 0;
    dobMaxDate: string;
    displayTransferDialog: boolean;
    pageTitle: string = '';
    tableTitle: string = '';
    placeholder: string = '';
    isSelectedDesignation : boolean = false;
    isSelectedUdise: boolean = false;
    isSelectedDatePicker: boolean = false;
    isSelectedDistrict : boolean = false;
    isSelectedBlock : boolean = false;
    isSelectedSchool : boolean = false;
    isSelectedSchoolUdise : boolean = false;
    techList: Array<object> = [];
    nontechList: Array<object> = [];
    allschList: Array<object> = [];
    buttonList: Array<{'label':string, 'class':string, 'flag':number}> = []; 
    classList: Array<{'label':string, 'value':string}> = [];
    cateList: Array<{'label':string, 'value':number}> = [{label:'Select Staff Category', value:0},{label:'Teaching Staff', value:1},{label:'Non Teaching Staff', value:2}];
    designationList: Array<{'label':string, 'value':string}> = [{label:'Select Staff Designation', value:''},];
    distList: Array<{'label':string, 'value':string}> = [{label:'Select District', value:''},];
    blockList: Array<{'label':string, 'value':string}> = [{label:'Select Block', value:''},];
    schoolList: Array<{'label':string, 'value':string}> = [{label:'Select School', value:''},];
    
    
    constructor(public fb: FormBuilder,
                private alertService: AlertService,
                public service:DataService,
                private session: UserSessionService, 
                private router: Router) {
        this.userTypeId = +this.session.userTypeId();
        this.SchoolId = +this.session.schoolId();
      }
  
    ngOnInit() {
   
      console.log(this.router.url);
      this.getMasterList();
      this.dialogTitle="Staff Transfer";
      switch(this.router.url){
        case '/schoolsearch': console.log('schoolsearch'); 
              this.type = 1;
              this.pageTitle = 'Search School Details';
              switch(this.userTypeId){
                case 5: this.searchList =[{name: 'UDISE', value: 'udise_code'},{name: 'District', value: 'udise_code'}]; break;
                case 3: this.searchList =[{name: 'UDISE', value: 'udise_code'},{name: 'Block', value: 'udise_code'}]; break;
                case 9: this.searchList =[{name: 'UDISE', value: 'udise_code'},{name: 'Block', value: 'udise_code'}]; break;
                default : this.searchList =[{name: 'UDISE', value: 'udise_code'},{name: 'School', value: 'udise_code'}]; break;
              }
              this.buttonList =[{label:"Search",class:"ui-button-info flex-gap-right",flag:3}];
              this.getschool(0,'school');
        break;
        case '/studentsearch': console.log('studentsearch'); 
              this.type = 2;
              this.pageTitle = 'Search Student Details';
              this.searchList =[{name: 'EMIS ID', value: 'unique_id_no'},{name: 'Name',value:'name'},{name: 'Adhaar Number', value: 'aadhaar_uid_number'},{name: 'Phone Number', value: 'phone_number'},{name: 'UDISE', value: 'udise_code'},{name: 'DOB', value: 'dob'}];
              this.tableHeader =[{ field: 'unique_id_no', header: 'EMIS ID' },{ field: 'name', header: 'Name' },{ field: 'school_name', header: 'School Name' },{ field: 'school_admission_no', header: 'Admission Number' },{ field: 'class_studying_id', header: 'Class'},{ field: 'class_section', header: 'Section' }];
                              // { field: 'dob', header: 'DOB' },// { field: 'group', header: 'Blood Group' },
              this.dobMaxDate = this.pipe.transform(new Date(),'yyyy-MM-dd');
              this.buttonList =[{label:"Search",class:"ui-button-info flex-gap-right",flag:1},{label:"Search Archive",class:"ui-button-secondary flex-gap-right",flag:0}];
              this.getClassLists();
        break;
        case '/staffsearch': console.log('staffsearch'); 
              this.type = 3;
              this.pageTitle = 'Search Staff Details';
              this.searchList =[{name: 'Staff EMIS ID', value: 'teacher_id'},{name: 'Staff Name', value: 'teacher_name'},{name: 'Aadhar Number', value: 'aadhar_no'},{name: 'Phone Number', value: 'mbl_nmbr'},{name: 'UDISE', value: 'udise_code'},{name: 'DOB', value: 'staff_dob'}];
              this.tableHeader =[{ field: 'teacher_id', header: 'Staff EMIS ID' },{ field: 'teacher_name', header: 'Name' },{ field: 'desgination', header: 'Designation' },{ field: 'school_name', header: 'School Name'},{ field: 'udise_code', header: 'UDISE Code'},{ field: 'district_name', header: 'District'}];
                              //{field:'gender_label', header:'Gender' },//{ field:'status_label', header:'Status'},
              let year = this.pipe.transform(new Date(),'yyyy');
              let monthanddate = this.pipe.transform(new Date(),'MM-dd');
              let dob_max_year = +year-18;
              this.dobMaxDate =  dob_max_year+'-'+monthanddate;
              this.buttonList =[{label:"Search",class:"ui-button-info flex-gap-right",flag:1},{label:"Search in Common Pool",class:"ui-button-secondary flex-gap-right",flag:0}];
        break;
      }
      this.searchValidator();
    }
    getMasterList(){
     
      this.service.getData('/api/searchMasterDetails',true).subscribe((res) => {
        if(res.dataStatus) {
         
          let mast = res.masterDetails
          this.techList = mast['Teaching'];
          this.nontechList = mast['Non Teaching'];
          this.allschList = mast['Schools'];
          mast['District'].map(item => { return { value: item['id'], label:item['district_name'] }}).forEach(item => this.distList.push(item));
          mast['Block'].map(item => { return { value: item['id'], label:item['block_name'] }}).forEach(item => this.blockList.push(item));
          // res.teacher_type.map(item => { return { value: item['id'], label:item['type_teacher'] }}).forEach(item => this.designationList.push(item));       
        }
      });
    }

    searchValidator() {
      this.form = new FormGroup({
        search_data: new FormControl('', [Validators.required]),
        db_col: new FormControl('', [Validators.required]),
        db_sub_col: new FormControl('', null),
        class_id: new FormControl('', null),
      });
    }
    radioSelect(name,value)
    {
        debugger;
        this.form.controls['search_data'].setValue("");
        this.placeholder = "Enter "  + name;
        this.isSelectedDatePicker = false;
        this.isSelectedDesignation = false;
        this.isSelectedUdise =  false;
        if(this.type == 3){
              if(value == 'udise_code'){this.maxLength = 16;}
              else if(value == 'mbl_nmbr'){this.maxLength = 10;}
              else if(value == 'teacher_id'){this.maxLength = 12;}
              else if(value == 'staff_dob'){this.isSelectedDatePicker = true;}
              else if(value == 'aadhar_no'){this.isSelectedDesignation = true;}
              else if(value == 'teacher_name'){this.maxLength = 35;}
        }else if(this.type == 2){
              if(value == 'udise_code'){
                  this.form.controls['db_sub_col'].setValue('class_studying_id');
                  this.isSelectedUdise = true;  
                  this.maxLength = 16;
              }
              else{
                  if(value == 'dob'){this.isSelectedDatePicker = true;}
                  this.form.controls['db_sub_col'].setValue("");
                  this.form.controls['class_id'].setValue(-1);
                  this.isSelectedUdise = false;  
                  if(value == 'aadhaar_uid_number'){this.maxLength = 12;}
                  else if(value == 'phone_number'){this.maxLength = 10;}
                  else if(value == 'unique_id_no'){this.maxLength = 20;}
              }
        }else if(this.type == 1){ 

          if(name == 'UDISE'){this.maxLength = 16;
            this.isSelectedSchoolUdise = true;
            this.isSelectedDistrict = false;
            this.isSelectedBlock = false;
            this.isSelectedSchool = false; 
            
          }
          else if(name == 'District'){ 
            this.isSelectedSchoolUdise = false;
            this.isSelectedDistrict = true;
            this.isSelectedBlock = false;
            this.isSelectedSchool = true; 
          }
          else if(name == 'Block'){ 
            this.isSelectedSchoolUdise = false;
            this.isSelectedDistrict = false;
            this.isSelectedBlock = true;
            this.isSelectedSchool = true; 
          }
          else if(name == 'School'){ 
            this.isSelectedSchoolUdise = false;
            this.isSelectedDistrict = false;
            this.isSelectedBlock = false;
            this.isSelectedSchool = true; 
          }
        }

      }

          
      selectClass(event)
      {
        debugger;
        this.form.controls['class_id'].setValue(event.value.value);
      }

      getschool(event,string){
        console.log('getschool',event.value,string);
        console.log(this.allschList);
        this.allschList = [];
        if(string == 'distschool'){
          this.allschList.filter(item => item['district_id'] === event).map(item => { return { value: item['udise_code'], label:item['school_name'] }}).forEach(item => this.schoolList.push(item));
        }
        else if(string == 'blockschool'){
          this.allschList.filter(item => item['block_id'] === event).map(item => { return { value: item['udise_code'], label:item['school_name'] }}).forEach(item => this.schoolList.push(item));
        }else if(string == 'school'){
          this.allschList.map(item => { return { value: item['udise_code'], label:item['school_name'] }}).forEach(item => this.schoolList.push(item));
        }  
      }
  
      search(event)
      {
        
        debugger;
        this.searchedStaffDetails = [];
        this.searchedSchoolDetails =[];
        
        if (this.form.valid) {

          if(this.type == 2){
            var searchData =this.form.value.search_data;
            var dbCol = this.form.value.db_col;
            var subDbCol =this.form.value.db_sub_col;
            var classId =this.form.value.class_id;
            if(dbCol == 'dob'){
              searchData = this.pipe.transform(searchData, 'yyyy-MM-dd');
            }
            this.data = {"records":{"search_data": searchData,"db_col":dbCol,"db_sub_col":subDbCol,"class_id":classId}}
            console.log(this.data);
            if(event == 1)
            {
              debugger;
              this.service.post('/api/searchStudentDetails',this.data).subscribe((res) => {
                if (res.dataStatus) {
                  debugger;
                  this.tableTitle = 'Student List';    
                  this.searchMessage = '';
                  this.searchedStaffDetails = res.result;
                  console.log(this.searchedStaffDetails);
              }
              else{
                this.tableTitle = ' ';    
                this.searchMessage = res.message;
                this.searchedStaffDetails = [];
                this.alertService.info(res.message);
              }  
            },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});
          }
          else {
            this.service.post('/api/searchArchiveStudentDetails',this.data).subscribe((res) => {
              if (res.dataStatus) {
              
                debugger;
                this.tableTitle = 'Student List ';    
                this.searchMessage = '';
                this.searchedStaffDetails = res.result;
              }
              else{
                this.tableTitle = res.message+' ( '+res.total_staff+' ) ';    
                this.searchMessage = res.message;
                this.searchedStaffDetails = [];
                this.alertService.info(res.message);
              }
            },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});
          }
          }
          if(this.type == 3){
            var searchData =this.form.value.search_data;
            
            
            var dbCol = this.form.value.db_col;  
            if(dbCol == 'staff_dob'){
              searchData = this.pipe.transform(searchData, 'yyyy-MM-dd');
            }
           
            this.data = {"records":{"search_data": searchData,"db_col":dbCol,"archive_flag":event}}
          
            var temp = ['','Male','Female','Transgender','','Active','In-active'];
            
            this.service.post('/api/searchStaffDetails',this.data).subscribe((res) => {
              if(res.dataStatus) {
                if(event==0)
                {
                 
                 this.FlagStatus=event;
                }
               else if(event==1)
                {
                 
                 this.FlagStatus=1;
                }
               
                  this.searchMessage = '';
                  this.tableTitle = res.message+' ( '+res.total_staff+' ) ';    
                  this.searchedStaffDetails = res.search_result;
              }else{
                  this.searchMessage = res.message;
                  this.tableTitle = '';
                  this.searchedStaffDetails = [];
                  this.alertService.info(res.message);
              }  
            },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});
          }
          if(this.type == 1){
            var searchData =this.form.value.search_data;
            var dbCol = this.form.value.db_col;
            this.data = {"records":{"search_data": searchData,"db_col":dbCol,"db_sub_col":'',"id":''}}

            this.service.post('/api/searchSchoolDetails',this.data).subscribe((res) => {
              if(res.dataStatus) {
                  this.searchMessage = '';
                  this.searchedSchoolDetails = res.search_result.length > 0 ? res.search_result : [] ;
                  console.log(res.search_result);
                  console.log(res.search_result[0]);
                  console.log(res.search_result.length);
              }else{
                  this.searchMessage = res.message;
                  this.searchedSchoolDetails = [];
                  this.alertService.info(res.message);
              }  
            },error => {console.error(error);this.alertService.error('Error Occur! Please Try again or refresh the page.');});

          }
          
        }else{
            this.validateAllFormFields(this.form);
            this.alertService.warning('Please Fill All Fields!');
            return true;
        }
  }
  
    selectdesignation(event)
    {
      this.designationList = [{label:'Select Staff Designation', value:''}];
      var e = Number(event.value);
      if(e == 1){
        this.techList.map(item => { return { value: item['id'], label:item['type_teacher'] }}).forEach(item => this.designationList.push(item));       
      }
      else if(e == 2){  
        this.nontechList.map(item => { return { value: item['id'], label:item['type_teacher'] }}).forEach(item => this.designationList.push(item));       
      }
      else this.alertService.info("please Select Staff Catgeory");
      // this.service.getData('/api/staffDesignationList?category='+e,true).subscribe((res) => {
      //   if(res.dataStatus) {
      //     res.teacher_type.map(item => { return { value: item['id'], label:item['type_teacher'] }}).forEach(item => this.designationList.push(item));       
      //   }
      // });
      
    }

    // selectSchool(event,params)
    // {
    //   this.schoolList = [{label:'Select School', value:''}];
    //   var e = Number(event.value);
    //   if(e != 0){
    //   this.service.getData('/api/SchoolList?'+params+'='+e,true).subscribe((res) => {
    //     if(res.dataStatus) {
    //       res.teacher_type.map(item => { return { value: item['id'], label:item['type_teacher'] }}).forEach(item => this.designationList.push(item));       
    //     }
    //   });
    //   }else this.alertService.info("please Select Staff Catgeory");
    // }

    
    getClassLists()
  {
    this.service.getJSON('../../../../assets/json/classlist.json').subscribe((res) => {
      if (res) {
        console.log(res);
        this.classList =res;
      }
    });
  }

   onRowSelect(event)
 {
  
   if(this.FlagStatus==0)
   {
     
    this.displayTransferDialog=true;
    this.teacherDetails=event;
    this.teacherName=event.data.teacher_name;
   }
   
  // this.FlagStatus =1;
     
 }
 OnUpdate_teacherTransfer()
 {
   
  this.update_data={"records":{"name":"","school_id":this.SchoolId,"u_id":this.teacherDetails.data.u_id}}
  
  
  this.service.post('/api/stftransfer',this.update_data).subscribe((res) => {
   
    debugger;
    if (res.dataStatus) {
     this.alertService.info("Data Updated SuccessFully!!!");
      this.displayTransferDialog=false;
      this.search(0);
  
      
      
    }
    else{
      this.alertService.warning("Unable To Update!!");
      this.displayTransferDialog=false;
    }
  });
 }
 
  
    // validate all form group and form array fields
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