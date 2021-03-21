import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { studentDetails } from 'src/models/student-registration';
import { schoolsService } from '../schools.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-kgbv-cwsn-tracking',
  templateUrl: './kgbv-cwsn-tracking.component.html',
  styleUrls: ['./kgbv-cwsn-tracking.component.css']
})
export class KGBVCWSNTrackingComponent implements OnInit {
  form: FormGroup;

  header: { field: string; header: string; widthstyle: string; }[];
  list_page: boolean;
  mapping_page: boolean;
  submitted: boolean;
  studentList:any[]=[];
  students_list_api: { student_id: string; student_name: string; school_id: string; school_name: string; school_type: string; }[];
  select_id: any;
  select_name: any;
  todayDate: string;
  detail_header: { field: string; header: string; widthstyle: string; }[];
  students_detai_beni_api: any[]=[];
  clonedProducts: { [s: string]: studentDetails; } = {};
  editing: boolean;
  studentRecords: any[]=[];
  constructor(public fb : FormBuilder,private el: ElementRef,public alertService:AlertService,private schoolsService: schoolsService,
    public datepipe: DatePipe) { }
  Product : studentDetails[];
  products2:studentDetails[];
  exportExcelData :any[]=[];
  noDataFound : boolean = false;
  ngOnInit() {
    this.getAllStudents();
    this.todayDate = new Date().toISOString().split('T')[0];
    this.list_page=true;
    this.mapping_page=false;
    this.header =
    [
      // { field: '', header: 'Student Id',widthstyle: '12em'},
    { field: 'StudentID', header: 'Student Id',widthstyle: '12em'},
    { field: 'studentName', header: 'Student Name',widthstyle: '16em'},
    { field: '', header: 'Action',widthstyle: '11em'},
    // { field: 'DistributeOn', header: 'Distribution Date',widthstyle: '12em'},
    
    ];
    // this.students_list_api=
    // [
    //   {        
    //     "student_id":"12",
    //     "student_name":"Vignesh K",
    //     "school_id":"5",
    //     "school_name":"A K V HSS",
    //     "school_type":"type"
    //   },
    //   {        
    //     "student_id":"13",
    //     "student_name":" Ram Kumar",
    //     "school_id":"7",
    //     "school_name":"A K V HSS",
    //     "school_type":"type"
    //   }
    // ];


  }
  getAllStudents() {
    this.schoolsService.getAllStudentsKGBV().subscribe((data) => {
      debugger;
      console.log("check",data);
    if (data.dataStatus == true) {
      this.studentList = data.result;
      console.log("check",this.studentList);
  
    }
    else if(this.studentList.length < 0)
    {
      this.noDataFound = true;
    }
    })  
  }
  getSelectedStudentDetails(std_id , selct_name){
    debugger;
    this.select_id = std_id;
    this.select_name = selct_name;
    this.getStudentDetails();
   this.form = this.fb.group({
    'student_name': new FormControl(this.select_name,null),
    'student_id': new FormControl(this.select_id,null),
    'distribute_date': new FormControl('',Validators.required),
    'benefit_type': new FormControl('',Validators.required),
  });
  this.detail_header  =
  [
    { field: 'Benefit', header: 'Benefit Type',widthstyle: '12em'},
    { field: '', header: 'Term',widthstyle: '12em'},
    { field: 'DistributeOn', header: 'Distribution Date',widthstyle: '12em'},
    // { field: '', header: 'Collection School',widthstyle: '12em'},
    { field: '', header: 'Action',widthstyle: '8em'}
  ];
  // this.students_detai_beni_api=
  // [
  //   {        
  //     "student_id":"Term 1",
  //     "student_name":"12-09-2020",
  //     "school_id":"A V k HSS",
  //     "distribute_date":""
  //   },
  //   {        
  //     "student_id":"Uniform Set 1",
  //     "student_name":"12-09-2020",
  //     "school_id":"A V k HSS",
  //     "distribute_date":"12-09-2020"
  //   },
  // ];

  debugger;
  // alert(this.select_name);
   this.list_page=false;
   this.mapping_page=true;
  }

getStudentDetails() {
  debugger;
  this.schoolsService.getKGBVStudentDetails(this.select_id).subscribe((result) => {
    debugger;
  if (result.dataStatus == true) {
    this.studentRecords = result.result;
// this.studentRecords = result.result.map(item => {
//   return {
//     student_id:item.student_id,
//     benefit_type: item.benefit_type,
//     term: item.term,
//     distribute_date: this.datepipe.transform(item.distribute_date.dob, 'dd-MM-yyyy'),

//   }
// });
  }
  else 
  {
    this.noDataFound = true;
  }
  })
}
  save_data(){
    this.submitted = true;
   
    if (this.form.valid) { 

    let datas = {
    "student_id" : this.form.value.student_id, 
    "current_sch_id" : this.form.value.current_sch_id, 
    "collection_sch_id" : this.form.value.collection_sch_id,
    "benefit_type" : this.form.value.benefit_type,
    };
    
    console.log(datas);
    
    //  this.registrationservice.school_details_save_API_1({"records":datas}, true).subscribe((res) => {
    //    if(res){
    //    this.alertService.success("Data Save Successfully");
    //    this.submitted = false;
    //   }
    //    else {
    //      this.alertService.error("Please Fill all the Required Fields"); 
    //    }
    //  })
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

  cancle(){
    this.list_page=true;
    this.mapping_page=false;
    this.submitted = false;

  }
  onRowEditInit(product: studentDetails) {
    this.clonedProducts[product.id] = {...product};
}

onRowEditSave(studentData: studentDetails) {
  debugger;
  var records = 
  {"records":
  {
    "id":studentData.id,
    "student_id":studentData.student_id,
  "benefit_type":studentData.benefit_type,
  "term":studentData.term,
  "distribute_date":this.datepipe.transform(studentData.distribute_date, 'yyyy-MM-dd')
}
  }
  this.schoolsService.updateTrackingDetails(records).subscribe((result) => {
    debugger;
  if (result.dataStatus == true) {
this.alertService.success("Records Updated Successfully");
  }
  })
    // if (product.price > 0) {
        // delete this.clonedProducts[product.id];
        // this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    }  
    // else {
    //     // this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    // }
//}

onRowEditCancel(product: studentDetails, index: number) {
    this.products2[index] = this.clonedProducts[product.id];
    delete this.products2[product.id];
}
goBack() {
  this.list_page = true;
  this.mapping_page = false;
}

//excel

getExcelData()
  {
    this.exportExcelData = [];
    this.studentList.map(item => {
      return {
        'Student Id': item.StudentID,
        'Students Name': item.studentName,
     
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
          const workbook = { Sheets: { 'StudentTracking List': worksheet }, SheetNames: ['Student Tracking List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Student Tracking List");
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
