import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { StudentService } from '../student.service';
import { AlertService } from 'src/services/alert.service';
@Component({
  selector: 'app-student-common-pool',
  templateUrl: './student-common-pool.component.html',
  styleUrls: ['./student-common-pool.component.css']
})
export class StudentCommonPoolComponent implements OnInit {
  form: FormGroup;
  data: any;
  studentDetail: any;
  searchList:any;
  selectedItem: any;
  public canSearch: boolean = false;
  public dataHeader: any;
  classList: any;
  isSelectedUdise: boolean = false;
  constructor(private router: Router,private studentService: StudentService,private alertService : AlertService) {

  }
  ngOnInit() {
    this.initializeValidators();
    this.getClassLists();
    this.dataHeader=[];
    this.classList = [];
    this.searchList =[
    {name: 'Unique Number', value: 'unique_number'},
    {name: 'Adhaar Number', value: 'aadhaar_uid_number'},
    {name: 'Phone Number', value: 'phone_number'},
    {name: 'UDISE', value: 'udise_code'},
    {name: 'DOB', value: 'dob'}
    ];
    this.dataHeader = [
      {field: 'name', header: 'Name' },
      { field: 'school_name', header: 'School Name' },
      { field: 'school_admission_no', header: 'Admission Number' },
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section' }
      // { field: 'dob', header: 'DOB' },
      // { field: 'group', header: 'Blood Group' },
  ];
  }
  initializeValidators() {
    this.form = new FormGroup({
      search_data: new FormControl('', [Validators.required]),
      db_col: new FormControl('', null),
      db_sub_col: new FormControl('', null),
      class_id: new FormControl('', null),
    });
  }
getClassLists()
{
  this.studentService.getClassList().subscribe((res) => {
    if (res) {
      this.classList =res;
    }
  });
}

  goToAdmission()
  {
    debugger;
    this.router.navigate(['/admission']);
  }
  radioSelect(name,value)
  {
    this.form.controls['search_data'].setValue("");
    this.selectedItem = "Enter"  +name;
    if(value == 'udise_code')
    {
      this.form.controls['db_sub_col'].setValue('class_studying_id');
    this.isSelectedUdise = true;  
    }
    else {
      this.form.controls['db_sub_col'].setValue("");
      this.form.controls['class_id'].setValue(-1);
      this.isSelectedUdise = false;  
    }
  }
  selectClass(event)
  {
    debugger;
    this.form.controls['class_id'].setValue(event.value.value);
  }
  goToCommonPool()
  {
    this.router.navigate(['/commonpool']);
    this.canSearch = true;
  }
  search()
  {
    this.studentDetail =[];
  var searchData =this.form.value.search_data;
  var dbCol = this.form.value.db_col;
  var subDbCol =this.form.value.db_sub_col;
  var classId =this.form.value.class_id;
  
  
  this.data = {"records":{"search_data": searchData,"db_col":dbCol,"db_sub_col":subDbCol,"class_id":classId}}
  this.studentService.getStudentDetail(this.data,true).subscribe((res) => {
    if (res.dataStatus) {
      //debugger;
      this.studentDetail = res.result;
    }
    else{
      this.studentDetail =[];
      this.alertService.info(res.message);
    }
  });
}
  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

}
