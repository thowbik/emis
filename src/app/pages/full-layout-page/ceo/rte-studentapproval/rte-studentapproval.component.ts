import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { StaffListApproval } from 'src/models/student-registration';
import { CeoService } from '../ceo.service';
@Component({
  selector: 'app-rte-studentapproval',
  templateUrl: './rte-studentapproval.component.html',
  styleUrls: ['./rte-studentapproval.component.css']
})
export class RteStudentapprovalComponent implements OnInit {

    schoolId: number;
    TeacherID: any;
    StaffList: any;
    districtId: any;
    exportExcelData: any[];
    studlist: any;
    Students: any;
    origin: any;
  
    constructor(private userSessionService: UserSessionService,
      private ceoservice: CeoService,
      private fb : FormBuilder,private alertService :AlertService,) { 
        this.schoolId = this.userSessionService.schoolId();
        this.TeacherID = this.userSessionService.teacherId();
        this.districtId = this.userSessionService.districtId();
    }
  
    ngOnInit() {
      this.getStudentListApproval();
      // this.StaffList = [
      //   {
      //     "id": "1", 
      //     "user_id": "12345", 
      //     "old_field_value": "SELVA", 
      //     "new_field_value": "SELVA.S", 
      //     "approval_status": "1", 
      //     "approval_flag": "0", 
      //     "approving_authority_type": "12"
      //     }, 
      //     {
      //       "id": "1", 
      //     "user_id": "12345", 
      //     "old_field_value": "Vicky", 
      //     "new_field_value": "Vicky.K", 
      //     "approval_status": "1", 
      //     "approval_flag": "0", 
      //     "approving_authority_type": "12"
      //     }, 
      //     ]
    }
  
    staff: Array<{'field':string,'header':string,'widthstyle':string}> =
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
      this.ceoservice.getStudentListApproval().subscribe((res) => {
        if (res) {
          this.StaffList = res.data;   
        }
      });
    }
    onRowEditInit(Staffdata: StaffListApproval) {
        
                                 }        
    onRowEdit_Save(Staffdata: StaffListApproval) {
                  debugger;
                  var records =
                      {
                      "students_child_detail":{
                      "index_id":Staffdata.stud_id,
                      "transfer_flag":"0"},
                      "student_admit_log":{"schl_id":Staffdata.schl_id,
                      "class":Staffdata.class,
                      "sec":Staffdata.sec,
                      "stud_name":Staffdata.stud_name,
                      "admt_date":Staffdata.admt_date,
                      "admison_status":"0",
                      "remrks":Staffdata.remrks
                  }
                  }
               
                  this.ceoservice.RteStudentDcApproval(records).subscribe((res) => {
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
                    
                  onRowEditCancel(Staffdata: StaffListApproval) {
  if(Staffdata.remrks) {
  
                    debugger;
                    var records = 
                    {"students_child_detail":{"index_id":Staffdata.stud_id,
                    "transfer_flag":"2"},
                    "student_admit_log":{"schl_id":Staffdata.schl_id,
                    "class":Staffdata.class,
                    "sec":Staffdata.sec,
                    "stud_name":Staffdata.stud_name,
                    "admt_date":Staffdata.admt_date,
                    "admison_status":"2",
                    "remrks":Staffdata.remrks}}
                    
                    this.ceoservice.RteStudentDcReject(records).subscribe((res) => {
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
  // getStudentListApprovalExcel(){
  //   this.exportExcelData = [];
  //   this.origin = this.StaffList.map(function(item){ 
  //     if(item.admison_status == 0){
  //       item.admison_status = 'APPROVED'
  //     } else {
  //       item.admison_status = 'REJECTED'
  //     }
  //   })
  
  //   this.StaffList.map(item => {
  //     return {
  //       'Student Name': item.stud_name,
  //       'Class': item.class,
  //       'Section': item.sec,
  //       'School Name': item.schl_name,
  //       'UDISE Code': item.udise_code,
  //       'AADHAR Number': item.aadhaar_uid_number,
  //       'Phone Number': item.phone_number,
  //       'Status': item.admison_status,
  //       'Remarks': item.remrks,
  //            }    
  //        }).forEach(item => this.exportExcelData.push(item));
  //        let studentlist = [];
  //        for(let Studentlist of this.exportExcelData) {
  //         studentlist.push(Studentlist);
  //        }
  //        return studentlist;
  //  }
  
  //  exportExcel() {
  //   import("xlsx").then(xlsx => {
  //       const worksheet = xlsx.utils.json_to_sheet(this.getStudentListApprovalExcel());
  //       const workbook = { Sheets: { 'Student Admission Approval' : worksheet }, SheetNames: ['Student Admission Approval'] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       this.saveAsExcelFile(excelBuffer, this.districtId +' (Student Admission Approval) ');
  //   });
  // }
  
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import("file-saver").then(FileSaver => {
  //       let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //       let EXCEL_EXTENSION = '.xlsx';
  //       const data: Blob = new Blob([buffer], {
  //           type: EXCEL_TYPE
  //       });
  //       FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
  //   });
  // }
  }