import { Component, OnInit } from '@angular/core';
import { BrteService } from '../brte.service';
import { UserSessionService } from "../../../../../services/usersession.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-summary-reports',
  templateUrl: './summary-reports.component.html',
  styleUrls: ['./summary-reports.component.css']
})
export class SummaryReportsComponent implements OnInit {
  public data: any[] = [];
  public Studentdata: any;
  public Teacherdata: any;
  dataHeader: any[];
  studentdata: any;
  teacherdata: any;
  Data: any;
  dataHeaderTeacher: { field: string, header: string }[];
  dataHeaderStudent: { field: string, header: string }[];
  pageStage: any;
  schoolName: any;
  exportColumns: any[] = [];
  exportExcelData: any[] = [];
  noDataFound: boolean = false;
  BlockOption: any[] = [];
  totalRecords: any[] = [];
  form: FormGroup;
  PageStage: number;
  teacherdatalist: any;
  IndxID: any;
  IndexID : any;
  StudentdataList: any;
  noData: boolean = false;
  DeleteTeacheid: any;
  deleteusertype: any;
  parentsCheckbox: boolean = false;
  showDropdown: boolean = false;
  showSubmit: boolean = false;
  arr: any;
  techerlist: any;
  teacher_list_value: any[] = [];
  Teacherlist: any;
  isChecked: boolean = false;
  private finalSaveArr: Array<Object> = [];
  private finalSaveStdArr: Array<Object> = [];
  VoluntrId: any;
  Id: any[]=[];
  constructor(private brte: BrteService, private user: UserSessionService,
    private fb: FormBuilder, private router: Router, private tl: BrteService, private alertService: AlertService,
    private confirmationService: ConfirmationService) {
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      block: new FormControl("", Validators.required)
    })
    this.dataHeader = [
      { field: 'school_name', header: 'School Name', widthstyle: '20em' },
      { field: 'totstaff', header: 'No of Teachers', widthstyle: '5em' },
      { field: 'total', header: 'No of Students', widthstyle: '5em' }
    ],

      this.dataHeaderTeacher = [
        { field: 'TeacherNam', header: 'Teacher Name' },
        { field: 'Gendr', header: 'Gender' },
        { field: 'BookIssued', header: 'Guide Books' },
        { field: 'Mobile', header: 'Call' }
      ],

      this.dataHeaderStudent = [
        { field: 'StudNam', header: 'Student Name' },
        { field: 'Gendr', header: 'Gender' },
        { field: 'BookIssued', header: 'Primer' },
        {field : 'TeacherName', header : 'Assigned Teacher'},
        { field: 'Mobile', header: 'Call' }
      ],
      this.getBlockApi();

  }

  getBlockApi() {
    this.brte.BlockApi().subscribe((data) => {
      let dropDownList = data.blockList;
      // console.log(data,"block");
      if (data.message == "Success") {
        this.BlockOption = data.blockList.map(list => { return { label: list.block_name, value: list.block_id } });
        this.form.controls['block'].setValue(this.BlockOption[0].value);
        this.getSchool(this.BlockOption[0].value);
      }
    });
  }

  OnBlockChange(block_id) {
    console.log(block_id);
    this.data = this.totalRecords.filter(
      element => element.BlckID === block_id);
    if (this.data.length > 0) {
     
      this.noData = false;
    }
    else {
    
      this.noData = true;
    }
  }

  getSchool(id) {
    debugger;
    this.pageStage = 1;
    this.brte.getSchoolData().subscribe(res => {
      this.totalRecords = res.result;
      // console.log(this.data);
      if (this.totalRecords.length > 0) {
        this.data = this.totalRecords;
        this.data = this.totalRecords.filter(
          element => element.BlckID === id);
        this.noData = false;
      }
      else {
        this.noData = true;
      }

    })
  }
  getTeacherData(schId, schName) {
    debugger;
    this.pageStage = 2;
    this.brte.getTeacherData(schId).subscribe(res => {
      this.Teacherdata = [];
      this.teacherdata = res.result.teacher_volunteers;
      this.schoolName = schName;
      //  console.log(this.Teacherdata);
      if (this.teacherdata.length > 0) {
        this.Teacherdata = this.teacherdata;
        this.Teacherdata.map(x=>x['isChecked'] = (x['BookIssued'] == '1') ? true : false );
        this.parentsCheckbox = this.isAllSelected();
        this.noDataFound = false;
      }
      else {
        this.noDataFound = true;
      }
    })
  }

  getStudentData(schId, schName) {
    this.pageStage = 3;
    debugger;
    this.brte.getStudentData(schId).subscribe(res => {
      this.schoolName = schName;
      this.Studentdata = [];
      this.studentdata = res.result.students_non_formal;
      // console.log(this.Studentdata);
      if (this.studentdata.length > 0) {
        this.Studentdata = this.studentdata;
        this.Studentdata.map(x=>x['isChecked'] = (x['BookIssued'] == '1') ? true : false );
        this.parentsCheckbox = this.isAllSelected();
       }
      else {
        this.noDataFound = true;
      }
    })
  }
  goBack() {
    this.pageStage = 1;
  }

  //update teacher submit
  onTeachSubmit(Arr): void {
    debugger;
    if (Arr.length > 0) {
      Arr.forEach((val, inx) => {
        this.finalSaveArr.push({
          "IndxID": val['IndxID'],
          "UsrType": '2',
          "BookIssued": val['BookIssued']
        });
      });
      if (this.finalSaveArr.length > 0) {
        this.brte.updateTeacherList('/api/PrimerGuideBookUpdate', { "records": this.finalSaveArr }).subscribe(
          result => {
            this.alertService.success(result['message']);
            this.getTeacherData(Arr[0].SchlID,Arr[0].SchlName);
          });
      }
      this.finalSaveArr = [];
    }
    else {
     // console.info('Nothing To Save');
      this.alertService.error('Checkbox are Not Select Please Check alteast One Checkbox');
    }
  }
//select student submit
  onSelectVolunter(Arr) {
  debugger;
    console.log(Arr, "submit");
    var schlId = Arr[0].SchlID;
    this.showDropdown = true;
    this.brte.getTeacherDropdown(schlId).subscribe(res => {
    this.Teacherlist = res.result;
    //console.log(this.Teacherlist, "dropteacher");
    if (this.Teacherlist != 0) {
        this.teacher_list_value = this.Teacherlist.map(list => { return { label: list.TeachNam, value: list.VoluntrID } });
      }
    else {
        this.teacher_list_value.push({ value: "", label: "NO Data Found" })
      }
    });
  }
  //selectdropdown
  onSelectTeach(teach_id) {
    console.log(teach_id, 'teacherdrop'),
    this.showDropdown = true;
    this.VoluntrId = teach_id;
  }
//update  std submit
  onSubmitStudentTeacher(Arr): void {
    debugger;
     if (Arr.length > 0) {
       let filteredArary = Arr.filter((element) => element.isChecked == true);
       let teachStudData = filteredArary.map( l =>
          {
            return {
              "id" : l.IndxID,
              "volunteer_id": this.VoluntrId
            }
          })
      if (teachStudData.length > 0) {
        this.brte.saveTeacherList('/api/AssignTeacher', { "records": teachStudData }).subscribe(
         result => {
            console.info(result['message']);
            this.alertService.success(result['message']);
            this.brte.getStudentData(Arr[0].SchlID).subscribe(res => {
            this.Studentdata = [];
            this.studentdata = res.result.students_non_formal;
              // console.log(this.Studentdata);
            if (this.studentdata.length > 0) {
                this.Studentdata = this.studentdata;
                this.Studentdata.map(x=>x['isChecked'] = (x['BookIssued'] == '1') ? true : false );
                this.parentsCheckbox = this.isAllSelected();
               }
            else {
                this.noDataFound = true;
              }
            });
           });
      }
      teachStudData = [];
    }
     
    else {
      this.alertService.error('Checkbox are Not Select Please Check alteast One Checkbox');
    }
  }
//update student submit
  onStdBookSubmit(Arr): void {
    debugger;
    if (Arr.length > 0) {
      Arr.forEach((val) => {
        this.finalSaveStdArr.push({
          "IndxID": val['IndxID'],
          "UsrType": '1',
          "BookIssued" : val['BookIssued']
                });
      });
      if (this.finalSaveStdArr.length > 0) {
        this.brte.updateStudentList('/api/PrimerGuideBookUpdate', { "records": this.finalSaveStdArr }).subscribe(
        res => {
        //console.log(res['message']);
          this.alertService.success(res['message']);
          this.brte.getStudentData(Arr[0].SchlID).subscribe(res => {
          this.Studentdata = [];
          this.studentdata = res.result.students_non_formal;
          if (this.studentdata.length > 0) {
              this.Studentdata = this.studentdata;
              this.Studentdata.map(x=>x['isChecked'] = (x['BookIssued'] == '1') ? true : false );
              this.parentsCheckbox = this.isAllSelected();
              }
          else {
                this.noDataFound = true;
              }
            })
                    });
      this.finalSaveStdArr = [];
    }
     else {
      this.alertService.error('Checkbox are Not Select Please Check alteast One Checkbox');
    }
    this.showSubmit = false;
    }
  }
//teacher checkbox
  parentToggle(check_val) {
    console.log('i am in par function', check_val);
    this.Teacherdata.forEach(row => row.isChecked = check_val);
    this.Teacherdata.forEach(row => row.BookIssued = (row.isChecked == true) ? '1' : '2');
    this.parentsCheckbox = this.isAllSelected();
    this.showSubmit = true;
  }

  childToggle(e, data) {
    debugger;
    console.log(data.BookIssued);
    data.isChecked = e;
    data.BookIssued = (data.isChecked == true) ? "1" : "2";
    this.parentsCheckbox = this.isAllSelected();
    this.showSubmit = true;
  }

  isAllSelected() {
    let numRows = this.Teacherdata.length;
    let is_opted_count = 0;
    let not_opted_count = 0;
    this.Teacherdata.forEach((item, index) => {
      if (item.BookIssued == true) is_opted_count++;
      else not_opted_count++;
    });
    // console.info('opted count :', is_opted_count);
    // console.info('not opted count :', not_opted_count);
    // console.info('total count :', numRows);
    return is_opted_count === numRows ? true : false;
  }
//student checkbox
  parentStdToggle(check_val) {
    this.Studentdata.forEach(row => row.isChecked = check_val);
    this.Studentdata.forEach(row => row.BookIssued = (row .isChecked == true) ? '1' : '2');
    this.parentsCheckbox = this.isAllSelectedStd();
    this.showSubmit = true;
  }
  childStdToggle(e, data) : void {
    //debugger;
    data.isChecked = e;
    data.BookIssued = (data.isChecked == true) ? "1" : "2";
    this.parentsCheckbox = this.isAllSelectedStd();
    this.showSubmit = true;
    //console.log(this.IndexID,"id");
  }
  isAllSelectedStd() {
    let numRows = this.Studentdata.length;
    let is_opted_count = 0;
    let not_opted_count = 0;
    this.Studentdata.forEach((item, index) => {
      if (item.BookIssued == true) is_opted_count++;
      else not_opted_count++;
    });
    return is_opted_count === numRows ? true : false;
  }
//excel
  getExcel() {
    this.exportExcelData = [];
    return this.data.map(i => {
      return {
        'SchoolName': i.school_name,
        'Teachers': i.totstaff,
        'Students': i.total
      }
    })
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcel());
      const workbook = { Sheets: { 'Summary-Report': worksheet }, SheetNames: ['Summary-Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Summary-Report");
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
//teacher excel
  getTeacherExcel() {
    this.exportExcelData = [];
    return this.Teacherdata.map(i => {
      return {
        'Teacher Name': i.TeachNam,
        'Gender': i.Gendr,
        'Mobile': i.MblNo
      }
    })
  }
  exportTeacherExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getTeacherExcel());
      const workbook = { Sheets: { 'Teacher-Summary-Report': worksheet }, SheetNames: ['Teacher-Summary-Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Teacher-Summary-Report");
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
//std excel
  getStudentExcel() {
    this.exportExcelData = [];
    return this.Studentdata.map(i => {
      return {
        'Student Name': i.StudNam,
        'Gender': i.Gendr,
        'Mobile': i.Mobile
      }
    })
  }
  exportStudentExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getStudentExcel());
      const workbook = { Sheets: { 'Student-Summary-Report': worksheet }, SheetNames: ['Student-Summary-Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Student-Summary-Report");
    });
  }
  saveAsExcelFile2(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  onSelectteacherdata(schId, TeachNam) {
    // this.router.navigate(['/volunteer/details']);
    debugger;
    this.brte.getTeacherDatalist(TeachNam).subscribe(res => {
      this.teacherdatalist = res.result;
      this.IndxID = TeachNam;
      //  console.log(this.teacherdatalist);
      //  console.log("teacherlist",this.teacherdatalist)
      this.tl.activate.next(this.teacherdatalist);
      var id = this.IndxID;
      this.router.navigate(['/karpom-eluduvom/2/' + id]);

    })
  }
  onSelectstudentdata(schId, StudNam) {
    // console.log("studentname",StudNam)
    // this.router.navigate(['/volunteer/details']);
    debugger;
    // this.studentdatalist = 
    this.brte.getStudentDatalist(StudNam).subscribe(res => {
      this.Studentdata = res.result;
      this.IndxID = StudNam;
      //  console.log(this.Studentdata);
      //  console.log("teacherlist",this.Studentdata)
      this.tl.activate.next(this.Studentdata);
      var id = this.IndxID;
      //  console.log("checkid",this.IndxID)
      this.router.navigate(['/karpom-eluduvom/1/' + id]);
    })
  }
  learnerlist() {
    this.router.navigate(['/karpom-eluduvom/1/0']);
  }
  volunteerteacher() {
    this.router.navigate(['/karpom-eluduvom/2/0']);
  }
  // summaryreport(){
  //   this.router.navigate(['/karpom-eluduvom/1/0']);
  //  }

  // DeleteStudentdata
  //  OnDeleteStudentData(rowData)
  //  {
  OnDeleteStudentData(rowData) {
    this.confirmationService.confirm({
      // message: 'Are you sure that you want to Delete this Name?',
      message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete this Name?</p>',
      accept: () => {
        this.IndxID = rowData;
        let records =
        {
          "IndxID": this.IndxID,
          "UsrType": '1',
        }
        this.brte.Deletedata({ records }).subscribe((res) => {
          if (res.status == 200) {
            if (res.dataStatus) {
              this.alertService.success(res.message);
              this.getBlockApi();
            }
            else {
              this.alertService.error(res.message);
            }
          }
        });
      }
    });
  }
// DeleteTeacherData
  OnDeleteTeacherData(rowData) {
    this.confirmationService.confirm({
      message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete this Name?</p>',
      accept: () => {
        this.IndxID = rowData;
        let records =
        {
          "IndxID": this.IndxID,
          "UsrType": '2',
        }
        this.brte.Deletedata({ records }).subscribe((res) => {
          if (res.status == 200) {
            if (res.dataStatus) {
              this.alertService.success(res.message);
              this.getBlockApi();
            }
            else {
              this.alertService.error(res.message);
            }
          }
        });
      }
    });
  }
}