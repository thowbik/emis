import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent implements OnInit {
  schoolCode: string;
  Applicationdata: any;
  public noDataFound = false;
  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService) {
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
    this.getenrollmentcategory();
  }
  getenrollmentcategory() {
  }
}
