import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-parttime-teachername',
  templateUrl: './parttime-teachername.component.html',
  styleUrls: ['./parttime-teachername.component.css']
})
export class ParttimeTeachernameComponent implements OnInit {
  public dataHeader: any[];
  public partTimeTeachersList : any[];
  cloned: { [s: string]: any; } = {};
  pipe = new DatePipe('en-US');
  schoolId: number;
  monthfilterdd: number = 0;
  // { value: 0, label: 'Select Month' },
  monthList: Array<{'value':number,'label':string}> =  [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }];
  constructor(private reportsService: ReportsService,
              private fb: FormBuilder,
              private userSessionService: UserSessionService) {}

  ngOnInit() {

    this.dataHeader = [{field: 'teacher_name', header: 'Part-Time Staff Name', widthstyle: '7em' }, 
                       {field: 'month_label', header: 'Month', widthstyle: '5em' }, 
                       {field: 'paid_yn', header: 'Salary Paid', widthstyle: '5em' }, 
                       {field: 'paid_date', header: 'Distributed On (Date)', widthstyle: '7em' }];
    this.schoolId = this.userSessionService.schoolId();
    let currMonth = this.pipe.transform(new Date(),'M');
    this.monthfilterdd = Number(currMonth)-1;
    this.monthfilterdd = this.monthfilterdd == 0 ? 12 : this.monthfilterdd;
    this.getParttimeTeachersData(this.monthfilterdd);
  }

  // mychange(val)
  // {
  //   this.getParttimeTeachersData(val);
  // }

  // Get Data From API
  getParttimeTeachersData(val) {
    this.reportsService.getparttimeteacher(val).subscribe(
      (data) => { if((data.dataStatus == true) && (data.ptStaffList.length > 0)){
                     this.partTimeTeachersList = data.ptStaffList;          
                     this.partTimeTeachersList.map(item => {
                      item.paid_date_format = item.paid_yn === 2 ? null : this.pipe.transform(item.paid_date,'dd/MM/yyyy');
                      item.month_label = this.monthList.filter(list => list.value == val).map(function(list) { return list.label; })[0];
                      item.paid_yn_label = item.paid_yn !== '' ? Number(item.paid_yn) === 1 ? 'Paid' : 'Not Paid' : '';
                      item.month = this.monthfilterdd;
                      // item.month_label = 'March';
                     });
                     console.log('on display month variousall pt`s',this.partTimeTeachersList);
                  }
                  else{
                    alert(data.message);
                  }
    });
  } 

  onRowEditInit(rowData) {
    this.cloned[rowData.u_id] = {...rowData};
  }
  // hello: any;
  // myFunction() {
  //   console.log(this.hello);
  // }

onRowEditSave(rowData, index: number) {
  console.log('Save Fns rowData',rowData);
  if(rowData.paid_yn === "" || rowData.paid_yn === null){
    console.log('save fns if condition');
    alert('Salary paid is Required');
    return false;
  }
  else if(rowData.paid_yn === "1" && rowData.paid_date === null){
    console.log('save fns elseif condition');
    alert('Date is Required');
    return false;
  }
  else{
      console.log('save fns else condition');
      let data : any = {"records":{'id':rowData.id,
                        "teacher_id":rowData.u_id,
                        "school_id":this.schoolId,
                        "paid_yn":rowData.paid_yn,
                        "month":rowData.month,
                        "paid_date":rowData.paid_yn === "1" ? rowData.paid_date : '',
                        "isactive":1}};
                        console.log('else converted as rowdata to savedata',data);
                        console.log('yes or no',rowData.paid_yn);
      this.reportsService.saveparttimeteacher(data).subscribe(
        (res) => { if(res.dataStatus == true) {
                    this.partTimeTeachersList[index]['id'] = res.id;
                    this.partTimeTeachersList[index]['teacher_id'] = rowData.u_id;
                    this.partTimeTeachersList[index]['school_id'] = this.schoolId;
                    this.partTimeTeachersList[index]['isactive'] = 1;
                    this.partTimeTeachersList[index]['paid_yn_label'] = Number(rowData.paid_yn) === 1 ? 'Paid' : 'Not Paid';
                    this.partTimeTeachersList[index]['paid_date_format'] = Number(rowData.paid_yn) === 1 ? this.pipe.transform(rowData.paid_date,'dd/MM/yyyy'): '';
                    console.log('after api called all list',this.partTimeTeachersList);
                    }
                    else{
                      this.onRowEditCancel(rowData, index);
                    }
      });
    }
}

onRowEditCancel(rowData, index: number) {
  this.partTimeTeachersList[index] = this.cloned[rowData.u_id];
  delete this.cloned[rowData.u_id];
}

}
