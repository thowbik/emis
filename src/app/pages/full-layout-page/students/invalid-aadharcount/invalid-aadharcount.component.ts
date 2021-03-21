import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { AlertService } from 'src/services/alert.service';
import { UidaiValidationService } from 'ng2-uidai-validation';

@Component({
  selector: 'app-invalid-aadharcount',
  templateUrl: './invalid-aadharcount.component.html',
  styleUrls: ['./invalid-aadharcount.component.css']
})
export class InvalidAadharcountComponent implements OnInit {
  data: any;
  dataHeader: any[] = [];
  selectedColumns: any[] = [];
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  exportExcelData: any[];
  constructor(private studentService: StudentService,private alertService : AlertService,private uidaiValidationService : UidaiValidationService) { }
  aadharNo: any;
  ngOnInit() {
    this.sampleData();
    this.getInvalidAadharList();
  }
  sampleData() {
   
  this.dataHeader = [
    // { field: 'id', header: 'Student Id' },
    { field: 'name', header: 'Name' },
    { field: 'gender', header: 'Gender' },
    { field: 'dob', header: 'DOB' },
    { field: 'phone_number', header: 'Phone Number'},
    { field: 'class_studying_id', header: 'Class' },
    { field: 'class_section', header: 'Section' },
    { field: 'aadhaar_uid_number', header: 'Aadhar Number' },
];
this.selectedColumns = this.dataHeader;

  }
  getInvalidAadharList() {
    debugger;
    this.studentService.invalidAadharList().subscribe((res) => {
      debugger;
      if (res) {
        this.data = res.result.map(l => { return {id:l.id,unique_id_no:l.unique_id_no,phone_number:l.phone_number, class_section:l.class_section,dob:l.dob,name:l.name, class_studying_id: this.class_in_roman[l.class_studying_id],aadhaar_uid_number:l.aadhaar_uid_number,gender:l.gender == 1 ? 'Male' : 'Female' }; });
        
      }
    });
  }
  onRowEditSave(data,aadharNo) {
    debugger;
    let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
    if(isValidUidaiNo)
    {
      if(this.checkAadhaarWithExisting(aadharNo)){
        let records = {"aadhar": aadharNo,"studentid":data.unique_id_no};
        this.studentService.updateAadhar(records,true).subscribe((res) => {
          // this.display = false;
          if (res.result == true) {
            this.alertService.success("Aadhaar Updated Successfully");
            this.aadharNo = '';
            this.getInvalidAadharList();
          }
          else this.alertService.error("Details Not Updated");
        });
      }
    } else this.alertService.error("Invalid Aadhaar Number");
  }
  onRowEditInit()
  {

  }
  onRowEditCancel()
  {

  }

  checkAadhaarWithExisting(val):any{
    this.studentService.stucheckaadhar(val).subscribe((res) => {
      if(res.dataStatus){
          let response = res.result;
          this.alertService.error("Given Aadhaar-no is already Existed with "+response[0].unique_id_no+' - '+response[0].name);
          this.aadharNo = "";
          return false;
      }else return true;
    });
  }
  getinvalidadharcount(){
    this.exportExcelData = [];
    this.data.map(item => {
      return {
        'Name': item.name,
        'Gender': item.gender,
        'DOB': item.dob,
        'Phone Number': item.phone_number,
        'Class': item.class_studying_id,
        'Section': item.class_section,
        'Aadhar Number': item.aadhaar_uid_number,


         } 
         }).forEach(item => this.exportExcelData.push(item));
         let Aadharexcel = [];
         for(let invalidaadharcount of this.exportExcelData) {
          Aadharexcel.push(invalidaadharcount);
         }
         return Aadharexcel;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getinvalidadharcount());
        const workbook = { Sheets: { 'Invalid Aadhar Count List' : worksheet }, SheetNames: ['Invalid Aadhar Count List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, ' (Invalid Aadhar Count List ) ');
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
