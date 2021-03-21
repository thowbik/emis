import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';
import { AlertService } from 'src/services/alert.service';
import { FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { StudentAdmissionApproval } from 'src/models/student-registration';

@Component({
  selector: 'app-student-admission-approval',
  templateUrl: './student-admission-approval.component.html',
  styleUrls: ['./student-admission-approval.component.css']
})
export class StudentAdmissionApprovalComponent implements OnInit {

  schoolId: number;
  TeacherID: any;
  StudentList: any;
  districtId: any;
  exportExcelData: any[];
  studlist: any;
  Students: any;
  origin: any;

  constructor(private userSessionService: UserSessionService,
    private studentService: StudentService,
    private fb : FormBuilder,private alertService :AlertService,) { 
      this.schoolId = this.userSessionService.schoolId();
      this.TeacherID = this.userSessionService.teacherId();
      this.districtId = this.userSessionService.districtId();
  }

  ngOnInit() {
    this.getStudentListApproval();
  }

  student: Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'stud_name', header: 'Student Name',widthstyle: '13em'},
   { field: 'class', header: 'Class',widthstyle: '10em'},
   { field: 'sec', header: 'Section',widthstyle: '10em'},
   { field: 'schl_name', header: 'School Name',widthstyle: '30em'},
   { field: 'udise_code', header: 'UDISE Code',widthstyle: '15em'},
   { field: 'aadhaar_uid_number', header: 'AADHAR Number',widthstyle: '15em'},
   { field: 'phone_number', header: 'Phone Number',widthstyle: '15em'},
   { field: 'admison_status', header: 'Status',widthstyle: '15em'},
   { field: 'remrks', header: 'Remarks',widthstyle: '15em'}, 
   { field: '', header: 'Action',widthstyle: '20em'},
   ];
   
   getStudentListApproval() {
    debugger;
    this.studentService.getStudentListApproval().subscribe((res) => {
      if (res) {
        this.StudentList = res.data;   
      }
    });
  }
  onRowEditInit(Studentdata: StudentAdmissionApproval) {
                  
                               }        
  onRowEdit_Save(Studentdata: StudentAdmissionApproval) {
                debugger;
                var records =
                  {"students_child_detail":{"index_id":Studentdata.stud_id,
                "transfer_flag":"0"},
                "student_admit_log":{"schl_id":Studentdata.schl_id,
                "class":Studentdata.class,
                "sec":Studentdata.sec,
                "stud_name":Studentdata.stud_name,
                "admt_date":Studentdata.admt_date,
                "admison_status":"0",
                "remrks":Studentdata.remrks}}
             
                this.studentService.StudentDcApproval(records).subscribe((res) => {
                  debugger;
                if (res.dataStatus == true) {
              this.alertService.success("Student Admission Approval Successfully");
              this.getStudentListApproval();
    
                }
                else{
                  this.alertService.error("Student Admission Already Approved Can't Approve Again");
                  this.getStudentListApproval();
                }
                })
                      }  
                  
                onRowEditCancel(Studentdata: StudentAdmissionApproval) {
if(Studentdata.remrks) {

                  debugger;
                  var records = 
                  {"students_child_detail":{"index_id":Studentdata.stud_id,
                  "transfer_flag":"2"},
                  "student_admit_log":{"schl_id":Studentdata.schl_id,
                  "class":Studentdata.class,
                  "sec":Studentdata.sec,
                  "stud_name":Studentdata.stud_name,
                  "admt_date":Studentdata.admt_date,
                  "admison_status":"2",
                  "remrks":Studentdata.remrks}}
                  
                  this.studentService.StudentDcReject(records).subscribe((res) => {
                    debugger;
                  if (res.dataStatus == true) {
                this.alertService.success("Student Admission Reject Successfully");
                this.getStudentListApproval();
      
                  }
                  else{
                    this.alertService.error("Student Admission Already Rejected Can't Reject Again");
                    this.getStudentListApproval();
                  }
                  })
              
  }
  else {
    this.alertService.warning("Remarks is Required");
    this.getStudentListApproval();
  }

}
// Excel
getStudentListApprovalExcel(){
  this.exportExcelData = [];
  this.origin = this.StudentList.map(function(item){ 
    if(item.admison_status == 0){
      item.admison_status = 'APPROVED'
    } else {
      item.admison_status = 'REJECTED'
    }
  })

  this.StudentList.map(item => {
    return {
      'Student Name': item.stud_name,
      'Class': item.class,
      'Section': item.sec,
      'School Name': item.schl_name,
      'UDISE Code': item.udise_code,
      'AADHAR Number': item.aadhaar_uid_number,
      'Phone Number': item.phone_number,
      'Status': item.admison_status,
      'Remarks': item.remrks,
           }    
       }).forEach(item => this.exportExcelData.push(item));
       let studentlist = [];
       for(let Studentlist of this.exportExcelData) {
        studentlist.push(Studentlist);
       }
       return studentlist;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getStudentListApprovalExcel());
      const workbook = { Sheets: { 'Student Admission Approval' : worksheet }, SheetNames: ['Student Admission Approval'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (Student Admission Approval) ');
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
}