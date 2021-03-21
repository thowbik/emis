import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-kgbv-cwsn-mapping',
  templateUrl: './kgbv-cwsn-mapping.component.html',
  styleUrls: ['./kgbv-cwsn-mapping.component.css']
})
export class KGBVCWSNMappingComponent implements OnInit {
  form: FormGroup;

  header: { field: string; header: string; widthstyle: string; }[];
  list_page: boolean;
  mapping_page: boolean;
  submitted: boolean;
  select_id: any;
  select_name: any;
  allDistrictropvalueoptions: any [] = [];
  school_value_options: any [] = [];
  school_c: boolean;
  detail_header: { field: string; header: string; widthstyle: string; }[];
  // students_detai_beni_api: { student_id: string; student_name: string; school_id: string; }[];
  noDataFound: boolean;
  schoolId: any;
  c_id: any;
  students_list_api: any;
  benefit_value_options: { label: string; value: string; }[];
  benefit_school_options: { label: string; value: string; }[];
  sam_other: boolean;
  S_O_Typ: any;
  manage_id: any;
  studtyp: number;
  dist_collect: boolean;
  dist_collect1: boolean;
  datas: any ;
  districtId: any;
  popup_detail: any;
  got_value: any;
  exportExcelData : any[]=[];

    
    constructor(public usersessionService : UserSessionService,public fb : FormBuilder,private el: ElementRef,public alertService:AlertService,private schoolService : schoolsService, 
    ) { 
      this.schoolId = this.usersessionService.schoolId();
      this.manage_id = this.usersessionService.manage_id();
      this.districtId = this.usersessionService.districtId();
    }


  ngOnInit() {
    this.noDataFound=false;
    this.list_page=true;  
    this.mapping_page=false;
    this.school_stud_list();
    this.benefit_value_options = [
      {label: 'Textbook', value: '1'},
      {label: 'Uniform', value: '2'},
      {label: 'Stationery', value: '3'},
      {label: 'Notebook', value: '4'},
      {label: 'Footwear', value: '5'},
      ];

    this.benefit_school_options =[
      {label: 'Same School', value: "1"},
      {label: 'Other School', value: "2"},
      ];

    this.header =
      [
        
        { field: 'student_id', header: 'Student Id',widthstyle: '8em'},
        { field: 'student_name', header: 'Student Name',widthstyle: '16em'},
        { field: 'class_studying', header: 'Class',widthstyle: '8em'},
        { field: 'section', header: 'Section',widthstyle: '8em'},
        { field: '', header: 'Action',widthstyle: '12em'},
      ];

    this.detail_header  =
      [
        { field: '', header: 'Benefit Type',widthstyle: '12em'},
        { field: '', header: 'Issued Date',widthstyle: '16em'},
        { field: '', header: 'Collection School',widthstyle: '12em'},
      ];

    if(this.manage_id == 1){
      this.studtyp = 1;
    }
    else{
      this.studtyp = 2;
    }
  }
  school_stud_list(){
    this.schoolService.student_list_API_1(this.schoolId).subscribe((res) => {
      if(res.result.length>0)
      {
        this.students_list_api = res.result; 
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }


  getSelectedStudentDetails(std_id , selct_name){
    this.all_district_dropdown();
    this.select_id = std_id;
    this.select_name = selct_name;
   this.form = this.fb.group({
    'IndexID': new FormControl('',null),
    'StudentID': new FormControl(this.select_id,null),
    'benefit_school': new FormControl('',Validators.required),
    'district_id': new FormControl('',null),
    'CollectSchool': new FormControl('',null),
    'benefit_type': new FormControl('',Validators.required),
  });
  // alert(this.select_name);
   this.list_page=false;
   this.mapping_page=true;
    this.patch_method();
  }
 
  patch_method(){
    this.schoolService.current_stud_detail(this.select_id).subscribe((res) => {
      console.log("res",res.parent[0]);

      this.popup_detail=res.parent[0];
      this.form.patchValue(this.popup_detail); 

      var got_dist_id = res.parent[0].district_id;
      this. district_onchg_id(got_dist_id);

      var coll_sch_id = res.parent[0].CollectSchool;
      /* added by thowfik */
      let stringToSplit = this.form.value.benefit_type;
      var selectedBenefitType = stringToSplit.split(",");
      this.form.controls['benefit_type'].setValue(selectedBenefitType);
         /* added by thowfik */
      if (this.schoolId == coll_sch_id){
        debugger;
        this.form.controls['benefit_school'].setValue("1");
        this.school_c=false;
        this.sam_other=false;
      }
      else
      {
        debugger;
        this.form.controls['benefit_school'].setValue("2");
        this.school_c=true;
        this.sam_other=true;
      }
      this.form.controls['benefit_school'].updateValueAndValidity();
    })
  }

  submit(){
    this.noDataFound=false;
  }
  save_data(){
    this.submitted = true;
   
    if (this.form.valid) { 
      // {"records":{"IndexID":"","StudentID":0000001,"CurrentSchool":0001,"CollectSchool":0001,"StudType":1,"Status":1}}

      var selectedListFromDatabase = this.form.value.benefit_type;
      debugger;
      var benefit_type = selectedListFromDatabase.join(',');
      

    if(this.S_O_Typ == "1"){
      this.datas = {
        "IndexID" : this.form.value.IndexID, 
        "StudentID" : this.form.value.StudentID, 
        "CurrentSchool" : this.schoolId, 
        "CollectSchool" : this.schoolId,
        "StudType" : this.studtyp,
        "Status" : 1,
        "benefit_type" : benefit_type,
        "district_id" :  this.districtId,
        };
        console.log(this.datas,"same");
        this.final_save();
    }
    else{
      this.datas = {
        "IndexID" : this.form.value.IndexID, 
        "StudentID" : this.form.value.StudentID, 
        "CurrentSchool" : this.schoolId, 
        "CollectSchool" : this.form.value.CollectSchool,
        "StudType" : this.studtyp,
        "Status" : 1,
        "benefit_type" : benefit_type,
        "district_id" :  this.form.value.district_id,
        };
        console.log(this.datas,"other");
        this.final_save();
    }
  }
  else{
    for (const key of Object.keys(this.form.controls)) {
      if (this.form.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
  }
  }

  final_save(){
    this.schoolService.mapping_details_save_API_1({"records":this.datas}, true).subscribe((res) => {
      if(res){
      this.alertService.success("Data Save Successfully");
      this.submitted = false;
      this.school_c=false;
      this.sam_other=false;
     }
      else {
        this.alertService.error("Please Fill all the Required Fields"); 
      }
    })
  }
 
  all_district_dropdown()  {
    this.schoolService.all_district_API_1().subscribe((data) => {
      let dropDownList = data.result.schooldist;
      // Dropdown Values
      if(dropDownList.length>0){
        for(let i=0; i<dropDownList.length;i++){
          this.allDistrictropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].district_name })
        }
      }
      else
      {
        this.allDistrictropvalueoptions.push({ value: "", label: "No Data" })
      } 
    });
  }

  district_onchg_id(dist_id)  {
    this.school_value_options=[];
    let c_id = dist_id.value;
    if (c_id == undefined){
      this.got_value=dist_id;
    }
    else{
      this.got_value=c_id;
      // if (c_id != "" || c_id != undefined){
        this.school_c=true;
      // }
    }

  
    debugger;
    this.schoolService.all_school_dist_1(this.got_value).subscribe((data) => {
      let dropDownList = data.schools;
      console.log(dropDownList,"dropDownList");
      // Dropdown Values
      debugger;
      if(dropDownList.length>0){
        for(let i=0; i<dropDownList.length;i++){
          this.school_value_options.push({ value: dropDownList[i].school_id, label: dropDownList[i].school_name })
        }
      }
      else
      {
        this.school_value_options.push({ value: "", label: "No Data" })
      } 
    });
  }

  school_onchg_id(){
    // this.dist_collect1 = true;
  }

  same_other(sam_oth){
    this.S_O_Typ = sam_oth.value;
    if (this.S_O_Typ == "1"){
      this.sam_other=false;
      this.school_c=false;
      this.form.controls['district_id'].setValue("");
      this.form.controls['district_id'].setValidators(null);
      this.form.controls['CollectSchool'].setValue("");
      this.form.controls['CollectSchool'].setValidators(null);
      this.form.controls['benefit_type'].setValue("");
      this.form.controls['benefit_type'].setValidators(Validators.required);
    }
    else{
      this.form.controls['benefit_type'].setValue("");
      this.form.controls['benefit_type'].setValidators(Validators.required);
      this.form.controls['district_id'].setValue("");
      this.form.controls['district_id'].setValidators(Validators.required);
      this.form.controls['CollectSchool'].setValidators(Validators.required);
      if (this.S_O_Typ != "" || this.S_O_Typ != undefined){
        this.sam_other=true;
      }
    }
  this.form.controls['district_id'].updateValueAndValidity();
  this.form.controls['CollectSchool'].updateValueAndValidity();
  }

  cancle(){
    this.list_page=true;
    this.mapping_page=false;
    this.submitted = false;
    this.school_c=false;
    this.sam_other=false;
  }

  Home_page(){
    this.list_page=true;
    this.mapping_page=false;
    this.submitted = false;
    this.school_c=false;
    this.sam_other=false;
  }

  //excel
  getExcelData()
  {
    this.exportExcelData = [];
    this.students_list_api.map(item => {
      return {
        'Student Id': item.student_id,
        'Students Name': item.student_name,
        'Class':item.class_studying,
        'Section':item.section,
      }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  } 
  
  exportExcel()
  {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getExcelData());
          const workbook = { Sheets: { 'Student List': worksheet }, SheetNames: ['Student List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Student List");
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
  }

