import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import {ConfirmationService} from 'primeng/api';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-students-raise-request',
  templateUrl: './students-raise-request.component.html',
  styleUrls: ['./students-raise-request.component.css']
})
export class StudentsRaiseRequestComponent implements OnInit {
  data: any;
  data1: any;
  page: any;
  routeData: any;
  schlId: any;
  exportExcelData: any[] = [];
  showDialogBox: boolean= false;
  noData : boolean = false;
  dataHeader: Array<{ 'field': string, 'header': string, 'widthstyle' : string }>;
  dataHeader1: Array<{ 'field': string, 'header': string, 'widthstyle' : string }>;
  id: any;

  constructor(private school: schoolsService, private router: Router,
     private route: ActivatedRoute,private usser : UserSessionService,
     private confirmationService: ConfirmationService,private alertService: AlertService) {
     this.schlId = this.usser.schoolId();
    this.routeData = this.route.snapshot.params;
    this.page = this.routeData.page;
   // console.log('hiii' + this.page);
    this.dataHeader = [
      { field: 'UniqueId', header: 'EMIS ID',widthstyle: '6em' },
      { field: 'AdmsnNo', header: 'Admission Number', widthstyle: '11em'},
      { field: 'Name', header: 'Name', widthstyle: '12em' },
      { field: 'DOB', header: 'DOB', widthstyle: '6em' },
      { field: 'ClsStdyg', header: 'Class',widthstyle: '6em' },
      { field: 'SchlNam', header: 'Requested School Name', widthstyle: '10em' }
    ],
      this.dataHeader1 = [
        { field: 'StudentId', header: 'Student ID', widthstyle: '6em'},
        { field: 'Name', header: 'Student Name', widthstyle: '10em' },
        { field: 'ClsStdyg', header: 'Class', widthstyle: '4em' },
        { field: 'SchlNam', header: 'School Name', widthstyle: '15em' },
        // { field :'',header : 'Status', widthstyle: '6em'}
      ]
  }
  ngOnInit() {
    this.getReqPendingtStudents();
    this.getReqRaisedStudents();
}
  getReqPendingtStudents() {
    this.school.getreqpendingStd().subscribe(res => {
      if(res)
      {
      this.data = res.result;
    // console.log(this.data, "req");
      }
      else{
        this.noData = true;
      }
    })
  }
  getReqRaisedStudents() {
    this.school.getreqraiseStd(this.schlId).subscribe(res => {
      if(res)
      {
      this.data1 = res.result;
     // console.log(this.data1, "raise");
      }
      else{
        this.noData = true;
      }
    }) 
  }
  getPopop(indexId)
  {
    //debugger;
    this.id = indexId;
    //console.log(this.id,"del");
    this.showDialogBox = true;
  }
  onClickYes()
  {
    //console.log(this.id,"-----");
    this.page = 2;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "stdId": this.id,
          "page" : this.page
        }
      };
    this.router.navigate(['/tcdetails/'+this.page,+this.id]);
  }
  onClickNo()
    {
      debugger;
       var IndxID = this.id;
      // console.log(IndxID);
      let records =
      {
        "IndxID": IndxID,
      }
      this.school.Deletedata({ records }).subscribe((res) => {
        if (res.status == 200) {
          if (res.dataStatus) {
            this.alertService.success(res.message);
            this.getReqPendingtStudents();
          }
          else {
            this.alertService.error(res.message);
          }
        }
      });
      this.showDialogBox = false;
    }
  //excel
  getPendingReqExcel() {
    this.exportExcelData = [];
    this.data.map(item => {
      return {
        'EMIS ID': item.UniqueId,
        'Admission Number': item.AdmsnNo,
        'Name': item.Name,
        'DOB': item.DOB,
        'Class': item.ClsStdyg,
        'Section' :  item.Sec,
        'Requested School Name': item.SchlNam,
      }
    }).forEach(item => this.exportExcelData.push(item));
    let studentlist = [];
    for (let Studentlist of this.exportExcelData) {
      studentlist.push(Studentlist);
    }
    return studentlist;
  }
  exportRequestExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getPendingReqExcel());
      const workbook = { Sheets: { 'Students-PendingRequestList': worksheet }, SheetNames: ['Students-PendingRequestList'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, ' (Students-PendingRequestList) ');
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
  //excel-raise
  getReqRaiseExcel() {
    this.exportExcelData = [];
    this.data1.map(item => {
      return {
        'Student ID': item.StudentId,
        'Student Name': item.Name,
        'Class': item.ClsStdyg,
        'Section' :  item.Sec,
        'School Name': item.SchlNam,
      }
    }).forEach(item => this.exportExcelData.push(item));
    let studentlist = [];
    for (let Studentlist of this.exportExcelData) {
      studentlist.push(Studentlist);
    }
    return studentlist;
  }
  exportRaiseExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getReqRaiseExcel());
      const workbook = { Sheets: { 'Students-ReqRaiseList': worksheet }, SheetNames: ['Students-ReqRaiseList'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, ' (Students-ReqRaiseList) ');
    });
  }
  saveAsExcelFile1(buffer: any, fileName: string): void {
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
