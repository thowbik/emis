import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-laptop-distribution',
  templateUrl: './laptop-distribution.component.html',
  styleUrls: ['./laptop-distribution.component.scss']
})
export class LaptopDistributionComponent implements OnInit {
  public noDataFound: number;
  public pageStage: number;
  laptopdistrlist: any[] = [];
  laptopDistributionList: any[] = [];
  laptopDistributionList1: any[] = [];

  laptopDistributionsclCurrentList: any[] = [];
  laptopDistributionsclLastList: any[] = [];
  laptopDistributionsclnextList: any[] = [];
  dist_name: any;
  schoolname: any;

  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'district_name', header: 'District' , widthstyle: '15em'},
      { field: 'enrollment', header: '11th Enrollment', widthstyle: ''},
      { field: 'distributed', header: '11th Distributed' , widthstyle: ''},
      { field: '12enrollment', header: '12th Enrollment' , widthstyle: ''},
      { field: '12distributed', header: '12th Distributed 2018-19' , widthstyle: ''},
      { field: '12distributed20', header: '12th Distributed 2019-20' , widthstyle: ''},
    ];
  colsCode: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'UDISE_code', header: 'UDISE Code' , widthstyle: '9em'},
      { field: 'block_name', header: 'Block Name', widthstyle: '10em'},
      { field: 'education_district_name', header: 'Education District Name' , widthstyle: '10em'},
      { field: 'school_name', header: 'School Name' , widthstyle: '9em'},
      { field: 'enrollment', header: '11th Enrollment', widthstyle: ''},
      { field: 'distributed', header: '11th Distributed' , widthstyle: ''},
      { field: '12enrollment', header: '12th Enrollment' , widthstyle: ''},
      { field: '12distributed', header: '12th Distributed 2018-19' , widthstyle: ''},
      { field: '12distributed20', header: '12th Distributed 2019-20' , widthstyle: ''},
    ];

  colsStudent: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'student_ID', header: 'Student ID' , widthstyle: ''},
      { field: 'student_name', header: 'Student Name', widthstyle: ''},
      { field: 'class', header: 'Class' , widthstyle: ''},
      { field: 'unique_id_no', header: 'Serial No' , widthstyle: ''},
    ];
  districtId: any;
  districtname: any;

  constructor(private stateService: StateService, private router: Router,
    private userSessionService: UserSessionService) { 
    this.districtId = this.userSessionService.districtId();
    this.districtname = this.userSessionService.districtName();
  }

  ngOnInit() {
    if (!this.districtId) {
      this.getlaptopDistrLists();
    } 
    else {
      this.laptopdirst(this.districtId, this.districtname)
    }
    
  }

  getlaptopDistrLists() {
    debugger
    this.stateService.getlaptopdistrlist(true).subscribe(data => {
      this.pageStage = 1;
      const result = data.laptopdistribution;
      if (result.length > 0) {
        this.laptopdistrlist = result;
      } else {
        this.noDataFound = 1;
      }
    });
  }

  laptopdirst(distid,distname) {
    debugger
    this.pageStage = 2;
    this.dist_name = distname;
    this.stateService.getlaptopDistributionDistrList(distid).subscribe(
      details => {
        const result = details.laptopdistribution;
        if (result.length > 0) {
          this.laptopDistributionList = result;
        } else {
          this.noDataFound = 2;
        }
      }
    );
  }

  laptopdirstscl(schid,schname) {
    this.schoolname= schname;
    this.pageStage = 3;
    this.stateService.getlaptopDistributionSclList(schid).subscribe(
      details => {
        // this.router.navigate(['/state/laptop-distribution-school'], details.laptopdistribution);
        const result = details.laptopdistribution;
        if (result.length > 0) {
         // this.laptopDistributionList1 = result;
          // tslint:disable-next-line:max-line-length
          this.laptopDistributionsclCurrentList = result.filter(result => result.class_studying_id === '12' && result.transfer_flag === '0');
          // @ts-ignore
          this.laptopDistributionsclLastList = result.filter(result => result.class_studying_id === '12' && result.transfer_flag === '1');
          // @ts-ignore
          this.laptopDistributionsclnextList = result.filter(result => result.class_studying_id === '11' && result.transfer_flag === '0');
        } else {
          this.noDataFound = 3;
        }
      }
      );

  }


  goBack() {
    this.pageStage = 1;
    this.dist_name = '';
  }
  goBack_b() {
    debugger
    this.pageStage = 2;
    this.schoolname = '';
    
  }

  
}
