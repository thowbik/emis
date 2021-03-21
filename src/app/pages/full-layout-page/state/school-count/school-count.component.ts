import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { UserSessionService } from 'src/services/usersession.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state.service';
import {NavigationService} from 'src/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-count',
  templateUrl: './school-count.component.html',
  styleUrls: ['./school-count.component.scss']
})
export class SchoolCountComponent implements OnInit {
  schcount: Array<Object> = [];
  public noDataFound: number;
  public pageStage: number;
  schoolsService: any;
  managementdet: any[] = [];
  distList: any[] = [];
  management: any;
  manage: any;
  s_cnt: any;
  DistSchlDetail: any[] = [];
  districtname: { field: string; header: string; }[];
  disSchlname: { field: string; header: string; }[];
  public districtId : number;
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private StateService: StateService, private dataService: DataService, private userSessionService: UserSessionService, private navigationService: NavigationService, private routers: Router) {
  }

  ngOnInit() {
    this.distlevel();
    this.distschllist();
    this.schoolcountlist();
    this.schoolcount();
    this.districtId = this.userSessionService.districtId();
   }

  schoolcount() {
    this.schcount = [
      {field: 'management', header: 'Management' },
      { field: 's_cnt', header: 'Total School' },
    ];
  }

  distlevel() {
    this.districtname = [
      {field: 'district_name', header: 'District Name' },
      { field: 's_cnt', header: 'Total School' },
    ];
  }

  distschllist() {
    this.disSchlname = [
      {field: 'block_name', header: 'Block Name' },
      { field: 'udise_code', header: 'Udise Code' },
      { field: 'school_name', header: 'School Name' },
      { field: 'school_type', header: 'School Type' },
      { field: 'teacher_name', header: 'Teacher Name' },
      { field: 'mbl_nmbr', header: 'Phone Number' },
    ];
  }

  schoolcountlist() {
    this.StateService.getschoolcountData().subscribe(data => {
      this.pageStage = 1;
      const result = data.schoollist.schoolcount;
      if (result.length > 0) {
        this.managementdet = result;
      } else {
        this.noDataFound = 1;
      }
    });
  }

  schooldistrictwiselist(dataid) {
    this.pageStage = 2;
    this.StateService.schoolCountDistrict(dataid).subscribe(
      details => {
        const result = details.schooldetails.countdistdetails;
        if (result.length > 0) {
          this.distList = result;
        } else {
          this.noDataFound = 2;
        }
      }
    );
  }

  DistSchlList(id, manageId) {
    this.pageStage = 3;
    this.StateService.DistCountSchool(id, manageId).subscribe(
      details => {
        const result = details.schooldetails.total_count_details;
        if (result.length > 0) {
          this.DistSchlDetail = result;
        } else {
          this.noDataFound = 3;
        }
      }
    );
  }
}
