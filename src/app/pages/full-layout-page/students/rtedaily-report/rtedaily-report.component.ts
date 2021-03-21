import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-rtedaily-report',
  templateUrl: './rtedaily-report.component.html',
  styleUrls: ['./rtedaily-report.component.css'],
  providers:[DatePipe]
})
export class RTEDailyReportComponent implements OnInit {
  form: FormGroup;
  userTypeId: any;
  rtestudentdailyreport: any;
  noDataFound: boolean;
  noDataFound1: boolean;
  udise_code: any;
  udise_data: any;
  password: any;
  Reg_no: any;
  Weaker_section: any;
  Group: any;
  Dg_specila: any;
  Total: any;
  pipe = new DatePipe('en-US');
  sortBy: string;
  sortOrderBy: string;
    pipes= new Date();
    datas : any;
    datas_one : any;
  constructor(private routers:Router,
    private fb:FormBuilder,
    private studentservice:StudentService,
    private alertService : AlertService,
     private userSessionService: UserSessionService,
     private datePipe : DatePipe) { }

  cols: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'Applied_Date', header: 'Date',widthstyle: '8em'},
  { field: 'WS', header: 'Weaker Section',widthstyle: '8em'},
  { field: 'DG', header: 'Disadvantage Group',widthstyle: '10em'},
  { field: 'DG_Special', header: 'DG -Special',widthstyle: '8em'},
  { field: 'Total', header: 'Total',widthstyle: '8em'},
     ];
   
  ngOnInit() {
    const districtName = this.userSessionService.districtName();
    const blockName = this.userSessionService.blockName();
    const schoolName = this.userSessionService.schoolName(); 
    const userId = this.userSessionService.userId();
    this.initialValidators();
    this.getRTEdailyreport();
  }
  // dateFormat(val: any) {
  //   if (val.toString().indexOf('.') > 0) {
  //     return this.datePipe.transform(new Date(val * 1000), 'd-MMM-y');
  //   } else {
  //     val = val.toString() + '.0000';
  //     return this.datePipe.transform(new Date(val * 1000), 'd-MMM-y');
  //   }
  // }
  initialValidators() {
    this.form = this.fb.group({
      'reg_no': new FormControl('',Validators.required),
    })}
  // Firstab:
  getRTEdailyreport(){
    this.studentservice.getRTEdailyreport().subscribe(res=> {  
         if(res != 0){
        this.rtestudentdailyreport = res.result;   
         console.log(this.rtestudentdailyreport);
        this.rtestudentdailyreport.map(item => { 
          item.Applied_Date = this.pipe.transform(item.Applied_Date, 'MM-dd-yyyy');
        });    
        // var dat='1968-11-16T00:00:00';
        // console.log(typeof(dat),"dat.dat");
        // this.pipe.transform(dat, 'MM-dd-yyyy');
        // let newDate = new Date(dat);
        // console.log(typeof(newDate),"newDate.newDate");
        // console.log(newDate,"newDate.newDate");

        // console.log(typeof(this.rtestudentdailyreport[1].Applied_Date),"this.Applied_Date");
         
        this.rtestudentdailyreport.map(item => {item.total = (Number(item.WS) + Number(item.Secondary) + Number(item.Higher_secondary) + Number(item.Graduate)+ Number(item.Post_graduate) + Number(item.MPhil) + Number(item.PhD) + Number(item.PostDoctoral)+Number(item.Total));
});
this.Weaker_section = this.rtestudentdailyreport.map(c => c.WS === '' ? 0 : Number(c.WS)).reduce((sum, current) => sum + current);
this.Group = this.rtestudentdailyreport.map(c => c.DG === '' ? 0 : Number(c.DG)).reduce((sum, current) => sum + current);
this.Dg_specila = this.rtestudentdailyreport.map(c => c.DG_Special === '' ? 0 : Number(c.DG_Special)).reduce((sum, current) => sum + current);
this.Total = this.rtestudentdailyreport.map(c => c.Total === '' ? 0 : Number(c.Total)).reduce((sum, current) => sum + current);
}
      else{
        this.noDataFound = true;
      }
      }
    )
  }
  // secondtab
  GetPassword()
  {
    this.Reg_no =this.form.value.reg_no;
    let data = {"reg_no" : this.Reg_no};
    this.studentservice.getrtestudentpassword({"records":data}, true).subscribe(res =>
      {
       this.Reg_no = res.result;
     this.password =  this.Reg_no[0]['pwd'];
    //  if(res.dataStatus){
    //   this.alertService.success("Application Number Submit Successfully");
    //  }
    //  else if (res.status==204) {
    //   this.alertService.error(res.message);
    // }
    // else if (res.status==404) {
    //   this.alertService.error(res.message);
    // }
  })

  }


  //sorting
  // customSort(event: SortEvent) {
  //   event.data.sort((data1, data2) => {
  //       let value1 = data1[event.field];
  //       let value2 = data2[event.field];
  //       let result = null;

  //       if (value1 == null && value2 != null)
  //           result = -1;
  //       else if (value1 != null && value2 == null)
  //           result = 1;
  //       else if (value1 == null && value2 == null)
  //           result = 0;
  //       else if (typeof value1 === 'string' && typeof value2 === 'string')
  //       {
  //         if ((event.field === 'dd') || (event.field === 'mm') || (event.field === 'yyyyyy')) {
  //           const x = value1.split('/');
  //           const y = value2.split('/');
  //           value1 = x[2] + x[1] + x[0];
  //           value2 = y[2] + y[1] + y[0];
  //           // console.log('x=', value1, x);
  //           // console.log('y=', value2, y);
  //       }
        
  //           result = value1.localeCompare(value2);
  //     }
  //       else 
  //       {
  //           result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  //       }

  //       return (event.order * result);
  //   });
  // }

 
  //excel

  exportExcel(data)
  {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'RTE Daily Report' : worksheet }, SheetNames: ['RTE Daily Report'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer,'(RTE Daily Report)');
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
customSort(event: SortEvent) {
debugger;
  event.data.sort((data1, data2) => {
    debugger;
    this. datas = data1.Applied_Date;
    console.log(this.datas);
    this.datas_one = data2.Applied_Date;
 console.log(this.datas_one);
  if(this.datas && this.datas_one)
  {
    return new Date(this.datas.split('-').reverse().join('-')).valueOf()-new Date(this.datas_one.split('-').reverse().join('-')).valueOf();
  }
   // return new Date(data2.date.split('-').reverse().join('-')).valueOf()-new Date(data3.date.split('-').reverse().join('-')).valueOf();
  });
  console.log(event.data,"sort");
}
// filteredData.sort(function(a, b){
//   return new Date(b.date.split('-').reverse().join('-')) - new Date(a.date.split('-').reverse().join('-'));
// });
//console.log(filteredData);
// event.data.sort((data1, data2) =>
// {
//  let value1 = data1[event.field];
//       let value2 = data2[event.field];
//       let result = null;

//       if (value1 == null && value2 != null)
//           result = -1;
//       else if (value1 != null && value2 == null)
//           result = 1;
//       else if (value1 == null && value2 == null)
//           result = 0;
//       else if (typeof value1 === 'string' && typeof value2 === 'string')
//           result = value1.localeCompare(value2);
//       else
//           result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

//      return (event.order * result);

//   });
// }
}


