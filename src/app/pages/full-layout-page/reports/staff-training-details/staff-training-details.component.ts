import { Component, OnInit } from '@angular/core';
import {ReportsService} from "../reports.service";
import {UserSessionService} from "../../../../../services/usersession.service";

@Component({
  selector: 'app-staff-training-details',
  templateUrl: './staff-training-details.component.html',
  styleUrls: ['./staff-training-details.component.css']
})
export class StaffTrainingDetailsComponent implements OnInit {
 public nodateFound = false;
  managementschool: any[] = [];
  username: any;

  traningDetailsdropvalue: { label: string; value: any; }[];
  constructor(private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.traningDetailsdropvalue = [
      {label: '2017-18', value: 2017+'-'+18},
      {label: '2018-19', value: 2018+'-'+19},
      {label: '2019-20', value: 2019+'-'+20},
      {label: '2020-21', value: 2020+'-'+21}
    ];
  }
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'Date', header: 'Date', widthstyle: '10em'},
      { field: 'training_mode', header: 'Training Mode', widthstyle: '12em' },
      { field: 'trained_at', header: 'Trained At', widthstyle: '12em' },
      { field: 'Training_type', header: 'Training Description', widthstyle: '13em' },
      { field: 'training_days', header: 'Number of Days', widthstyle: '12em'}
    ];

  ngOnInit() {
    this.username = this.userSessionService.userName();
  }

  StateSchoolTypeOption(event) {
    let traningDetails = event.value ;
    let userName = this.username
    this.reportsService.tranningDetailsList(traningDetails, userName).subscribe((data) => {
      const result = data.result;
      // console.log(data, '----------result.length>')
      // console.log(data.result.length > 0, '----------resength>')
      if (data.result.length > 0) { 
        this.managementschool = result;
      } else {
        this.nodateFound = true;
      }
    });
  }
}
