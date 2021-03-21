import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-rte-applicants',
  templateUrl: './rte-applicants.component.html',
  styleUrls: ['./rte-applicants.component.css']
})
export class RteApplicantsComponent implements OnInit {
  schoolId: number;
  studentList: any[]=[];
  dataHeader:any[]=[];
  selectedColumns: any[]=[];
  dataHeader1:any[]=[];
  selectedColumns1: any[]=[];
  exportColumns:any[]=[];
  userTypeID: any;
  studentList1: any;
  public pageStage: number;
  statusId: any;
  disabled: boolean;
  status: any;
  booleanString: boolean = true;
  booleanString1: boolean = false;
  booleanString2: boolean = true;
  booleanString3: boolean = false;
  nodes: any;
  school_name: any;
  allottest: any;
  allotmentStatus: any[];
  dcType: any;
  DC_RTE: boolean = false;
  constructor(private studentService : StudentService,
    private userSessionService : UserSessionService,
    private alertService: AlertService) {
      debugger
    this.schoolId = this.userSessionService.schoolId();
    this.userTypeID = this.userSessionService.userTypeId();
    if(this.userTypeID == 19) {
      this.dcType = this.userSessionService.userName().split('-');
    
     this.DC_RTE = this.dcType[1] == "rte" ? true :false;
    }
    }

  ngOnInit() {
    this.dataHeader = [
      { field: 'Reg_No', header: 'Register Number', widthstyle: '10em',class:'text-left'},
      { field: 'Applicant', header: 'Student Name', widthstyle: '12em',class:'text-left'},
      { field: 'DOB', header: 'DOB', widthstyle: '8em',class:'text-center' },
      { field: 'Gender', header: 'Gender', widthstyle: '6em',class:'text-left' },
      { field: 'Applied_Class', header: 'Applied Class', widthstyle: '6em',class:'text-left' },
      { field: 'Category', header: 'Category', widthstyle: '6em',class:'text-center'},
      { field: 'Sub_Category', header: 'Sub Category', widthstyle: '6em' },
      { field: 'Mobile', header: 'Mobile', widthstyle: '10em' },
      { field: 'Parent_Guardian', header: 'Parent/Gaurdian', widthstyle: '12em' },
      { field: 'Address', header: 'Address', widthstyle: '12em' },
      { field: 'PIN', header: 'PIN', widthstyle: '6em' },
      { field: 'Status', header: 'Status', widthstyle: '12em' },
      { field: 'Reason', header: 'Reason', widthstyle: '12em' },
      { field: 'Remarks', header: 'Remarks', widthstyle: '12em' }
    ];
    this.allotmentStatus = [ 
      { label: 'Alloted', value: '1'},
      { label: 'Not Alloted', value: '0'},
      { label: 'Waiting List', value: '2'}];
    //this.selectedColumns = this.dataHeader;
    this.selectedColumns = [
      { field: 'Reg_No', header: 'Register Number', widthstyle: '10em',class:'text-left'},
      { field: 'Applicant', header: 'Student Name', widthstyle: '12em',class:'text-left'},
      { field: 'DOB', header: 'DOB', widthstyle: '8em',class:'text-center' },
       { field: 'Gender', header: 'Gender', widthstyle: '6em',class:'text-left' },
      { field: 'Applied_Class', header: 'Applied Class', widthstyle: '6em',class:'text-left' },
      { field: 'Category', header: 'Category', widthstyle: '6em',class:'text-center'},
      { field: 'Sub_Category', header: 'Sub Category', widthstyle: '6em' },
      // { field: 'Mobile', header: 'Mobile', widthstyle: '10em' },
      // { field: 'Parent_Guardian', header: 'Parent/Gaurdian', widthstyle: '12em' },
      // { field: 'Address', header: 'Address', widthstyle: '12em' },
      // { field: 'PIN', header: 'PIN', widthstyle: '6em' },
      // { field: 'Status', header: 'Status', widthstyle: '12em' },
      // { field: 'Reason', header: 'Reason', widthstyle: '12em' },
      // { field: 'Remarks', header: 'Remarks', widthstyle: '12em' }
    ];
    this.dataHeader1 = [
      { field: 'udise_code', header: 'UDISE Code'},
      { field: 'school_name', header: 'School Name'},
      { field: 'block_name', header: 'Block Name',},

    ];
    this.selectedColumns1 = this.dataHeader1;
    if( this.userTypeID == '3' || this.userTypeID == '19') {
      this.pageStage = 1;
      this.getSchoolList();
      
    } else {
      this.pageStage = 2;
      this.getApplicantData();
    }
     
   
 
}

getSchoolList() {
  debugger;
  this.studentService.getSchoolData().subscribe((res) => {
    debugger;
    if (res.dataStatus) {
      this.studentList1 = res.result;
     
    }
   
  });

}
getDCSchoollist(e,sclname) {
  debugger
  this.school_name = sclname;
  this.pageStage = 2;
  this.schoolId =e;
  this.studentService.getRteApplicantData(this.schoolId).subscribe((res) => {
    debugger;
    if (res.dataStatus) {
      this.studentList = res.result;
      
    }
    else this.alertService.error(res.message);
  });
}

getApplicantData() {
  debugger;
  this.studentService.getRteApplicantData(this.schoolId).subscribe((res) => {
    debugger;
    if (res.dataStatus) {
      this.studentList = res.result;
    }
    else this.alertService.error(res.message);
  });
}
// exportPdf(data,dataHeader) {
//   debugger;
//   this.exportColumns = dataHeader.map(col => ({title: col.header, dataKey: col.field}));
//   import("jspdf").then(jsPDF => {
//       import("jspdf-autotable").then(x => {
//           const doc = new jsPDF.default(0,0);
//           doc.autoTable(this.exportColumns, data);
//           doc.save('RTE-Applicants.pdf');
//       })
//   })
// }
exportExcel(data) {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "RTE-Applicants");
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

onRowEditInit(data) {
  debugger
   console.log('Row edit initialized');
}

onRowEditSave(data) {
debugger;
const rtesave ={
  school_id:this.schoolId,
  register_no : data.Reg_No,
  allot_status: data.allot_status
};
const scl_id = rtesave.school_id
this.studentService.getDCRteApplicantSave(rtesave,true).subscribe((res) => {
    if(res.dataStatus == true) {
     this.alertService.success("Updated Successfully");
     this.getRTESrudentFromSchool(); 
    }
    else {
      this.alertService.error(res.message);
    }
  });
  }  
  // else {
  //     // this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
  // }
//}
getRTESrudentFromSchool() {
  this.studentService.getRteApplicantData(this.schoolId).subscribe((res1) => {
    debugger;
    if (res1.dataStatus) {
      // this.studentListTemp = res1.result;
      this.studentList = res1.result;
      // this.alertService.success(res.message);
    }
  });
}
onRowEditCancel(data,index) {
  debugger;
   this.getRTESrudentFromSchool();
  
}

handleChangeEcoclub(e,data) {
  debugger
  var isChecked = e.checked;
//  var isChecked = e.checked == true ? 1 : 0;
  if (isChecked == false ) {
    this.statusId = 0;
    this.booleanString = true;
  }
  else {
    this.statusId = 1;
     isChecked = false;
     this.booleanString1 = false;
  }
  const rtesave ={
    school_id:this.schoolId,
    register_no : data.Reg_No,
    allot_status:  this.statusId
  };
  const scl_id = rtesave.school_id;
  this.studentService.getDCRteApplicantSave(rtesave,true).subscribe((res) => {
      if(res.dataStatus == true) {
       this.alertService.success(res.message);
        this.studentService.getRteApplicantData(scl_id).subscribe((res1) => {
          debugger;
          if (res.dataStatus) {
            this.studentList = res1.result;
            this.alertService.success(res.message);
          }
        });
        
      }
      else {
        this.alertService.error(res.message);
      }
    });
}

getDCData(e) {

  this.studentService.getRteApplicantData(e).subscribe((res) => {
    debugger;
    if (res.dataStatus) {
      this.studentList = res.result;
     
    }
    //else this.alertService.error(res.message);
  });
}
goBack() {
  this.pageStage = 1;
  this.school_name = '';
  
}


}
