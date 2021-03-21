import { Component, OnInit } from '@angular/core';
import {ReportsService} from "../reports.service";
import {UserSessionService} from "../../../../../services/usersession.service";

@Component({
  selector: 'app-staff-fixation',
  templateUrl: './staff-fixation.component.html',
  styleUrls: ['./staff-fixation.component.css']
})
export class StaffFixationComponent implements OnInit {
  public nodateFound = false;
  one :any;
  test :any;
  two :any;
  managementschool: any[] = [];
  managementteacher: any[] = [];
  managementStudent: any[] = [];
  management: any[] = [];
  staffFixationdropvalue: { label: string; value: number; }[];
  districtId: string;
  exportExcelData: any;
  constructor(private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.staffFixationdropvalue = [
      {label: 'Eligible', value: 1},
      {label: 'Sanctioned', value: 2},
      {label: 'Position', value: 3},
      {label: 'Vacancy', value: 4},
      {label: 'Surplus', value: 5},
      {label: 'Needed', value: 6}
    ];
  }
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'udise_code', header: 'UDISE Code', widthstyle: '12em'},
      { field: 'school_name', header: 'School Name', widthstyle: '15em' },
      { field: 'cate_type', header: 'Category', widthstyle: '12em' },
      { field: 'in_position_sg', header: 'SG Teachers', widthstyle: '12em' },
      { field: 'in_position_bt_eng', header: 'BT - English', widthstyle: '10em'},
      { field: 'in_position_bt_mat', header: 'BT - Maths' , widthstyle: '15em'},
      { field: 'in_position_bt_sci', header: 'BT - Science', widthstyle: '12em' },
      { field: 'in_position_bt_ss', header: 'BT - Social', widthstyle: '12em' },
      { field: 'in_position_bt_tam', header: 'BT - Tamil', widthstyle: '12em' },
      { field: 'in_position_bt_total', header: 'BT - Total', widthstyle: '12em' },
    ];

  ngOnInit() {}

  StaffFixationTypeOption(event) {
    let StaffFixation = event.value ;
    this.test = StaffFixation;
    this.reportsService.staffFixationList(StaffFixation).subscribe((data) => {

      const result = data.result.staff_fixation_report;
      if(StaffFixation==1){
        if (result.length > 0) {
          let elig_sg = 0;
          let elig_bt_eng = 0;
          let elig_bt_mat = 0;
          let elig_bt_sci = 0;
          let elig_bt_ss = 0;
          let elig_bt_tam = 0;
          let elig_bt_total = 0;
          for (let i = 0; i < result.length; i++) {
            elig_sg = elig_sg + parseInt(result[i].elig_sg);
            elig_bt_eng = elig_bt_eng + parseInt(result[i].elig_bt_eng);
            elig_bt_mat = elig_bt_mat + parseInt(result[i].elig_bt_mat);
            elig_bt_sci = elig_bt_sci + parseInt(result[i].elig_bt_sci);
            elig_bt_ss = elig_bt_ss + parseInt(result[i].elig_bt_ss);
            elig_bt_tam = elig_bt_tam + parseInt(result[i].elig_bt_tam);
            elig_bt_total = elig_bt_total + parseInt(result[i].elig_bt_total);
              }
              result.push({elig_sg, elig_bt_eng, elig_bt_mat, elig_bt_sci, elig_bt_ss, elig_bt_tam, elig_bt_total, cate_type : 'Total'});
        this.managementschool = result;
        } else {
          this.nodateFound = true;
        }
      } else if (StaffFixation==2) {
        if (result.length > 0) {
          let sanc_sg = 0;
          let sanc_bt_eng = 0;
          let sanc_bt_mat = 0;
          let sanc_bt_sci = 0;
          let sanc_bt_ss = 0;
          let sanc_bt_tam = 0;
          let sanc_bt_total = 0;
          for (let i = 0; i < result.length; i++) {
            sanc_sg = sanc_sg + parseInt(result[i].sanc_sg);
            sanc_bt_eng = sanc_bt_eng + parseInt(result[i].sanc_bt_eng);
            sanc_bt_mat = sanc_bt_mat + parseInt(result[i].sanc_bt_mat);
            sanc_bt_sci = sanc_bt_sci + parseInt(result[i].sanc_bt_sci);
            sanc_bt_ss = sanc_bt_ss + parseInt(result[i].sanc_bt_ss);
            sanc_bt_tam = sanc_bt_tam + parseInt(result[i].sanc_bt_tam);
            sanc_bt_total = sanc_bt_total + parseInt(result[i].sanc_bt_total);
              }
              result.push({sanc_sg, sanc_bt_eng, sanc_bt_mat, sanc_bt_sci, sanc_bt_ss, sanc_bt_tam, sanc_bt_total, cate_type : 'Total'});
        this.managementschool = result;
        } else {
          this.nodateFound = true;
        }
      } else if (StaffFixation==3) {
        if (result.length > 0) {
          let in_position_sg = 0;
          let in_position_bt_eng = 0;
          let in_position_bt_mat = 0;
          let in_position_bt_sci = 0;
          let in_position_bt_ss = 0;
          let in_position_bt_tam = 0;
          let in_position_bt_total = 0;
          for (let i = 0; i < result.length; i++) {
            in_position_sg = in_position_sg + parseInt(result[i].in_position_sg);
            in_position_bt_eng = in_position_bt_eng + parseInt(result[i].in_position_bt_eng);
            in_position_bt_mat = in_position_bt_mat + parseInt(result[i].in_position_bt_mat);
            in_position_bt_sci = in_position_bt_sci + parseInt(result[i].in_position_bt_sci);
            in_position_bt_ss = in_position_bt_ss + parseInt(result[i].in_position_bt_ss);
            in_position_bt_tam = in_position_bt_tam + parseInt(result[i].elig_bt_tam);
            in_position_bt_total = in_position_bt_total + parseInt(result[i].in_position_bt_total);
              }
              result.push({in_position_sg, in_position_bt_eng, in_position_bt_mat, in_position_bt_sci, in_position_bt_ss, in_position_bt_tam, in_position_bt_total, cate_type : 'Total'});
        this.managementschool = result;
        } else {
          this.nodateFound = true;
        }
      } else if (StaffFixation==4) {
        if (result.length > 0) {
          let vacant_sg = 0;
          let vacant_bt_eng = 0;
          let vacant_bt_mat = 0;
          let vacant_bt_sci = 0;
          let vacant_bt_ss = 0;
          let vacant_bt_tam = 0;
          let vacant_bt_total = 0;
          for (let i = 0; i < result.length; i++) {
            vacant_sg = vacant_sg + parseInt(result[i].vacant_sg);
            vacant_bt_eng = vacant_bt_eng + parseInt(result[i].vacant_bt_eng);
            vacant_bt_mat = vacant_bt_mat + parseInt(result[i].vacant_bt_mat);
            vacant_bt_sci = vacant_bt_sci + parseInt(result[i].vacant_bt_sci);
            vacant_bt_ss = vacant_bt_ss + parseInt(result[i].vacant_bt_ss);
            vacant_bt_tam = vacant_bt_tam + parseInt(result[i].vacant_bt_tam);
            vacant_bt_total = vacant_bt_total + parseInt(result[i].vacant_bt_total);
              }
              result.push({vacant_sg, vacant_bt_eng, vacant_bt_mat, vacant_bt_sci, vacant_bt_ss, vacant_bt_tam, vacant_bt_total, cate_type : 'Total'});
        this.managementschool = result;
        } else {
          this.nodateFound = true;
        }
      } else if (StaffFixation==5) {
        if (result.length > 0) {
          let surplus_sg = 0;
          let surplus_bt_eng = 0;
          let surplus_bt_mat = 0;
          let surplus_bt_sci = 0;
          let surplus_bt_ss = 0;
          let surplus_bt_tam = 0;
          let surplus_bt_total = 0;
          for (let i = 0; i < result.length; i++) {
            surplus_sg = surplus_sg + parseInt(result[i].surplus_sg);
            surplus_bt_eng = surplus_bt_eng + parseInt(result[i].surplus_bt_eng);
            surplus_bt_mat = surplus_bt_mat + parseInt(result[i].surplus_bt_mat);
            surplus_bt_sci = surplus_bt_sci + parseInt(result[i].surplus_bt_sci);
            surplus_bt_ss = surplus_bt_ss + parseInt(result[i].surplus_bt_ss);
            surplus_bt_tam = surplus_bt_tam + parseInt(result[i].surplus_bt_tam);
            surplus_bt_total = surplus_bt_total + parseInt(result[i].surplus_bt_total);
              }
              result.push({surplus_sg, surplus_bt_eng, surplus_bt_mat, surplus_bt_sci, surplus_bt_ss, surplus_bt_tam, surplus_bt_total, cate_type : 'Total'});
        this.managementschool = result;
        } else {
          this.nodateFound = true;
        }
      } else if (StaffFixation==6) {
        if (result.length > 0) {
          let need_sg = 0;
          let need_bt_eng = 0;
          let need_bt_mat = 0;
          let need_bt_sci = 0;
          let need_bt_ss = 0;
          let need_bt_tam = 0;
          let need_bt_total = 0;
          for (let i = 0; i < result.length; i++) {
            need_sg = need_sg + parseInt(result[i].need_sg);
            need_bt_eng = need_bt_eng + parseInt(result[i].need_bt_eng);
            need_bt_mat = need_bt_mat + parseInt(result[i].need_bt_mat);
            need_bt_sci = need_bt_sci + parseInt(result[i].need_bt_sci);
            need_bt_ss = need_bt_ss + parseInt(result[i].need_bt_ss);
            need_bt_tam = need_bt_tam + parseInt(result[i].need_bt_tam);
            need_bt_total = need_bt_total + parseInt(result[i].need_bt_total);
              }
              result.push({need_sg, need_bt_eng, need_bt_mat, need_bt_sci, need_bt_ss, need_bt_tam, need_bt_total, cate_type : 'Total'});
        this.managementschool = result;
        } else {
          this.nodateFound = true;
        }
      }
    });
  }
  getstaffreport(){
    this.exportExcelData = [];
    
    this.managementschool.map(item => {
      return {
        'UDISE Code': item.udise_code,
        'School Name': item.school_name,
        'Category': item.cate_type,
        'SG Teachers': item.in_position_sg,
        'BT - English': item.in_position_bt_eng,
        'BT - Maths': item.in_position_bt_mat,
        'BT - Science': item.in_position_bt_sci,
        'BT - Social': item.in_position_bt_ss,
        'BT - Tamil': item.in_position_bt_tam,
        'BT - Total': item.in_position_bt_total,

        }
         }).forEach(item => this.exportExcelData.push(item));
         let staffdata = [];
         for(let staff of this.exportExcelData) {
          staffdata.push(staff);
         }
         return staffdata;
   }
  
   ExportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstaffreport());
        const workbook = { Sheets: { 'Staff Fixation Report' : worksheet }, SheetNames: ['Staff Fixation Report'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
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