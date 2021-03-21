import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CeoService } from '../ceo.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-pla-attendance',
  templateUrl: './pla-attendance.component.html',
  styleUrls: ['./pla-attendance.component.css']
})
export class PLAAttendanceComponent implements OnInit {
  data: any;
  form: FormGroup;
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  noData: boolean;
  usertypeId: any;
  exportExcelData: any[];
  date: Date[];
  invalidDates: Array<Date>;
  showDropdown: boolean;
  BlockOption: any[] = [];
  block_id: any;
  teacherType: any;
  todayDate: string;
  pipe = new DatePipe('en-US');
  constructor(private ceo: CeoService, private fb: FormBuilder, private user: UserSessionService, private alertService: AlertService) {
    this.usertypeId = this.user.userTypeId();
    this.teacherType = this.user.teacherType();
  }

  ngOnInit() {
    this.initialValidators();
    this.todayDate = new Date().toISOString().split('T')[0];
    if (this.usertypeId == 14 && this.teacherType == 103) {
      this.getBlockList();
      this.showDropdown = true;
    }
    else {
      this.showDropdown = false;
    }

    this.dataHeader = [
      { field: 'Block', header: 'Block', widthstyle: '10em' },
      { field: 'UDISE', header: 'UDISE', widthstyle: '10em' },
      { field: 'SclName', header: 'School Name', widthstyle: '10em' },
      { field: 'Volunteer_Name', header: 'Volunteer Name', widthstyle: '10em' },
      { field: 'Marked_Status', header: 'Status', widthstyle: '10em' },
      { field: 'VolunteerAttend', header: ' Volunteer Attendance', widthstyle: '10em' },
      { field: 'Learners_Present', header: 'Learners Present', widthstyle: '10em' },
      { field: 'Learners_Absent', header: 'Learners Absent', widthstyle: '10em' },
    ];
    let today = new Date();
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];

  }
  initialValidators() {
    //  => Form2 Validation Purpose
    this.form = this.fb.group({
      'date': new FormControl('', null),
      'Block': new FormControl('', null)
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.getApiData()
    }
    else {
      this.alertService.error("Please Select Date");
    }
  }
  getApiData() {
    debugger;
    var date = this.form.value.date;
    if (this.usertypeId == 14 && this.teacherType == 103) {
      let pla_attendance_brte_values = { "records": { "date": this.pipe.transform(this.form.value.date, 'yyyy-MM-dd'), "block_id": this.block_id } }
      this.ceo.getPLAAttendance(pla_attendance_brte_values).subscribe(res => {
        if (res) {
          this.data = res.result;
          console.log(this.data);
        }
        else {
          this.noData = true;
        }
      })
    }
    else {
      let pla_attendance_values = { "records": { "date": date } }

      this.ceo.getPLAAttendance(pla_attendance_values).subscribe(res => {
        if (res) {
          this.data = res.result;
          console.log(this.data);
        }
        else {
          this.noData = true;
        }
      })
    }
  }

  getBlockList() {
    this.ceo.BlockApi().subscribe((data) => {
      let dropDownList = data.blockList;
      debugger;
      if (data.message == "Success") {
        for (let i = 0; i < dropDownList.length; i++) {
          debugger;
          this.BlockOption.push({ value: dropDownList[i].block_id, label: dropDownList[i].block_name })
        }
      }
      else {
        this.BlockOption.push({ value: "", label: "No Data" })
      }
    });
  }

  OnBlockChange(event) {
    this.block_id = event;
  }
  //excel
  getExcel() {
    this.exportExcelData = [];
    return this.data.map(i => {
      return {
        'Block': i.Block,
        'UDISE': i.UDISE,
        'School Name': i.SclName,
        'Volunteer Name': i.Volunteer_Name,
        'Status': i.Marked_Status,
        'Voluneer Attendance': i.VolunteerAttend,
        'Learners Present': i.Learners_Present,
        'Learners Absent': i.Learners_Absent,
      }
    })
  }
  ExportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcel());
      const workbook = { Sheets: { 'PLA-Reporrts': worksheet }, SheetNames: ['PLA-Reporrts'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "PLA-Reporrts");
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
