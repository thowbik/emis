import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-invalid-phonecount',
  templateUrl: './invalid-phonecount.component.html',
  styleUrls: ['./invalid-phonecount.component.css']
})
export class InvalidPhonecountComponent implements OnInit {
  data: any;
  dataHeader: any[] = [];
  selectedColumns: any[] = [];
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  isDataAvailable: boolean = false;
  constructor(private studentService: StudentService,private alertService: AlertService) { }
  phoneNo: any;
  ngOnInit() {
    this.sampleData();
    this.getInvalidPhoneNoList();
  }
  sampleData() {
   
  this.dataHeader = [
    { field: 'name', header: 'Name' },
    { field: 'gender', header: 'Gender' },
    { field: 'dob', header: 'DOB' },
    { field: 'aadhaar_uid_number', header: 'Aadhar Number' },
    { field: 'class_studying_id', header: 'Class' },
    { field: 'class_section', header: 'Section' },
    { field: 'phone_number', header: 'Phone Number'},
];
this.selectedColumns = this.dataHeader;

  }
  getInvalidPhoneNoList() {
    debugger;
    this.studentService.invalidPhoneNoList().subscribe((res) => {
      if (res.result && res.result.length > 0) {
        this.isDataAvailable = true;
        this.data = res.result.map(l => { return {phone_number:l.phone_number,unique_id_no:l.unique_id_no, class_section:l.class_section,dob:l.dob,name:l.name, class_studying_id: this.class_in_roman[l.class_studying_id],aadhaar_uid_number:l.aadhaar_uid_number,gender:l.gender == 1 ? 'Male' : 'Female' }; });
        
      }
      else {
        this.isDataAvailable = false;
      }
    });
  }
  onRowEditSave(data,phonenumber) {
    debugger;
    var phoneNo = phonenumber; 
    if(phoneNo.length == 10) {
      let records = {"phoneno": phoneNo,"studentid":data.unique_id_no}
      this.studentService.updatePhoneNo(records,true).subscribe((res) => {
        // this.display = false;
        if (res.result == true) {
       this.alertService.success("Aadhar Updated Successfully");
       this.phoneNo = '';
       this.getInvalidPhoneNoList();
          //this.studentDetail = res.result;
        }
      });
    }
   
    

  }
  onRowEditInit()
  {

  }
  onRowEditCancel()
  {

  }

}

