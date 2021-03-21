import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

@Component({
  selector: 'app-statistical-report',
  templateUrl: './statistical-report.component.html',
  styleUrls: ['./statistical-report.component.css']
})
export class StatisticalReportComponent implements OnInit {
  public nodateFound = false;
  statisticalschool: any[] = [];
  statisticalteacher: any[] = [];
  statisticalStudent: any[] = [];
  statistical: any[] = [];
  constructor(private reportsService: ReportsService, private userSessionService: UserSessionService) { }
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'block_name', header: 'No Of Schools', widthstyle: '12em'},
      { field: 'Pre_Primary_School', header: 'Pre-Primary School', widthstyle: '15em' },
      { field: 'Primary_School', header: 'Primary School', widthstyle: '12em' },
      { field: 'Middle_School', header: 'Middle School', widthstyle: '12em' },
      { field: 'High_School', header: 'High School', widthstyle: '10em'},
      { field: 'Hr_Sec_School', header: 'Hr Secondary School' , widthstyle: '15em'},
      { field: 'Special_School', header: 'Special School', widthstyle: '12em' },
      { field: 'Total', header: 'Grand Total', widthstyle: '10em' },
    ];

  cols1: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'block_name', header: 'No Of Teachers', widthstyle: '12em'},
      { field: 'Pre_Primary_School', header: 'Pre-Primary School', widthstyle: '15em' },
      { field: 'Primary_School', header: 'Primary School', widthstyle: '12em' },
      { field: 'Middle_School', header: 'Middle School', widthstyle: '12em' },
      { field: 'High_School', header: 'High School', widthstyle: '10em'},
      { field: 'Hr_Sec_School', header: 'Hr Secondary School' , widthstyle: '15em'},
      { field: 'Special_School', header: 'Special School', widthstyle: '12em' },
      { field: 'Total', header: 'Grand Total', widthstyle: '10em' },
    ];
  cols2: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'block_name', header: 'No Of Students', widthstyle: '12em'},
      { field: 'Pre_Primary_School', header: 'Pre-Primary School', widthstyle: '15em' },
      { field: 'Primary_School', header: 'Primary School', widthstyle: '12em' },
      { field: 'Middle_School', header: 'Middle School', widthstyle: '12em' },
      { field: 'High_School', header: 'High School', widthstyle: '10em'},
      { field: 'Hr_Sec_School', header: 'Hr Secondary School' , widthstyle: '15em'},
      { field: 'Special_School', header: 'Special School', widthstyle: '12em' },
      { field: 'Total', header: 'Grand Total', widthstyle: '10em' },
    ];
  cols3: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'school_type', header: 'Students by Class', widthstyle: '15em'},
      { field: 'KG_Students', header: 'KG Students', widthstyle: '10em'},
      { field: 'I_V_Students', header: 'I-V Students' , widthstyle: '10em'},
      { field: 'VI_VIII_Students', header: 'VI-VIII Students', widthstyle: '12em' },
      { field: 'IX_X_Students', header: 'IX-X Students', widthstyle: '12em' },
      { field: 'XI_XII_Students', header: 'XI-XII Students', widthstyle: '12em' },
      { field: 'total', header: 'Total', widthstyle: '10em' },
    ];
  ngOnInit() {
    this.StatisticsSchoolDetails();
    this.StatisticsStudentDetail();
    this.StatisticsTeacherDetail();
    this.StatisticsClassWiseDetail();
  }
  StatisticsSchoolDetails() {
    this.reportsService.StatisticsSchoolList().subscribe(
      data => {
        const result = data.result.school_count;
        if (result.length > 0) {
          let High_School = 0;
          let Hr_Sec_School = 0;
          let Middle_School = 0;
          let Pre_Primary_School = 0;
          let Primary_School = 0;
          let Special_School = 0;
          let Total = 0;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < result.length; i++) {
            High_School = High_School + parseInt(result[i].High_School);
            Hr_Sec_School = Hr_Sec_School + parseInt(result[i].Hr_Sec_School);
            Middle_School = Middle_School + parseInt(result[i].Middle_School);
            Pre_Primary_School = Pre_Primary_School + parseInt(result[i].Pre_Primary_School);
            Primary_School = Primary_School + parseInt(result[i].Primary_School);
            Special_School = Special_School + parseInt(result[i].Special_School);
            Total = Total + parseInt(result[i].Total);
          }
          result.push({High_School, Hr_Sec_School, Middle_School, Pre_Primary_School, Primary_School, Special_School, Total, school_type : 'Total'});
          this.statisticalschool = result;
        } else {
          this.nodateFound = true;
        }
      }
    );
  }
  StatisticsStudentDetail() {
    this.reportsService.StatisticsStudentList().subscribe(
      data => {
        const result = data.result.student_count
        if (result.length > 0) {
          let High_School = 0;
          let Hr_Sec_School = 0;
          let Middle_School = 0;
          let Pre_Primary_School = 0;
          let Primary_School = 0;
          let Special_School = 0;
          let Total = 0;
          for (let i = 0; i < result.length; i++) {
            High_School = High_School + parseInt(result[i].High_School);
            Hr_Sec_School = Hr_Sec_School + parseInt(result[i].Hr_Sec_School);
            Middle_School = Middle_School + parseInt(result[i].Middle_School);
            Pre_Primary_School = Pre_Primary_School + parseInt(result[i].Pre_Primary_School);
            Primary_School = Primary_School + parseInt(result[i].Primary_School);
            Special_School = Special_School + parseInt(result[i].Special_School);
            Total = Total + parseInt(result[i].Total);
          }
          result.push({High_School, Hr_Sec_School, Middle_School, Pre_Primary_School, Primary_School, Special_School, Total, school_type : 'Total'});
          this.statisticalStudent = result;
        } else {
          this.nodateFound = true;
        }
      }
    );
  }

  StatisticsTeacherDetail() {
    this.reportsService.StatisticsTeacherList().subscribe(
      data => {
        const result = data.result.teacher_count
        if (result.length > 0) {
          let High_School = 0;
          let Hr_Sec_School = 0;
          let Middle_School = 0;
          let Pre_Primary_School = 0;
          let Primary_School = 0;
          let Special_School = 0;
          let Total = 0;
          for (let i = 0; i < result.length; i++) {
            High_School = High_School + parseInt(result[i].High_School);
            Hr_Sec_School = Hr_Sec_School + parseInt(result[i].Hr_Sec_School);
            Middle_School = Middle_School + parseInt(result[i].Middle_School);
            Pre_Primary_School = Pre_Primary_School + parseInt(result[i].Pre_Primary_School);
            Primary_School = Primary_School + parseInt(result[i].Primary_School);
            Special_School = Special_School + parseInt(result[i].Special_School);
            Total = Total + parseInt(result[i].Total);
          }
          result.push({High_School, Hr_Sec_School, Middle_School, Pre_Primary_School, Primary_School, Special_School, Total, school_type : 'Total'});
          this.statisticalteacher = result;
        } else {
          this.nodateFound = true;
        }
      }
    );
  }

  StatisticsClassWiseDetail() {
    this.reportsService.StatisticsClassWiseList().subscribe(
      data => {
        const result = data.result.class_wise_count
        if (result.length > 0) {
          let KG_Students = 0;
          let I_V_Students = 0;
          let VI_VII_Students = 0;
          let IX_X_Students = 0;
          let XI_XII_Students = 0;
          let Total = 0;
          for (let i = 0; i < result.length; i++) {
            KG_Students = KG_Students + parseInt(result[i].KG_Students);
            I_V_Students = I_V_Students + parseInt(result[i].I_V_Students);
            VI_VII_Students = VI_VII_Students + parseInt(result[i].VI_VII_Students);
            IX_X_Students = IX_X_Students + parseInt(result[i].IX_X_Students);
            XI_XII_Students = XI_XII_Students + parseInt(result[i].XI_XII_Students);
            Total = Total + parseInt(result[i].Total);
          }
          result.push({KG_Students, I_V_Students, VI_VII_Students, IX_X_Students, XI_XII_Students, Total, school_type : 'Total'});
          this.statistical = result;
        } else {
          this.nodateFound = true;
        }
      }
    );
  }
}
