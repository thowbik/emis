import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-osclist-district-wise',
  templateUrl: './osclist-district-wise.component.html',
  styleUrls: ['./osclist-district-wise.component.scss']
})
export class OsclistDistrictWiseComponent implements OnInit {
 public oscDisctData : any[] = [];
 public oscListCitywiseData : any[] = [];
 public oscListSchoolWiseData : any[] = [];
 public oscStudentListData : any[] = [];
 public noDataFound : number;
 public pageLeval : number;
 public dataHeader: any[] = [];
 public dataHeader2: any[] = [];
  constructor(private stateService : StateService, private routers : Router, private userSessionService: UserSessionService) { }

  ngOnInit() {

    const districtId = this.userSessionService.districtId();
    if(!districtId){
    this.getOSCListData();
    }
    if(districtId){
      this.onSelectedDistrict(districtId)
    }

    this.dataHeader = [
      {field: 'district_name', header: 'District', widthstyle:'30em' },
      { field: 'dropped_out', header: 'Dropped Out', widthstyle:'30em' }
   ];
   this.dataHeader2 = [
    {field: 'block_name', header: 'Block', widthstyle:'30em' },
    { field: 'dropped_out', header: 'Dropped Out', widthstyle:'30em' }
  ];
  this.dataHeader2 = [
    {field: 'school_name', header: 'School Name', widthstyle:'30em' },
    { field: 'dropped_out', header: 'Dropped Out', widthstyle:'30em' }
  ];
  }

  getOSCListData(){
    this.pageLeval = 1;
    this.stateService.getOSCList().subscribe(
      data=>{
        const result = data.osclist.student_migration_details;
        if(result.length>0){
            this.oscDisctData = result;
        }
        else
        {
          this.noDataFound = 1;
        }
      }
    )
  }

  onSelectedDistrict(outStudentValue){
    this.pageLeval = 2;
    this.stateService.getOSCListDistrict(outStudentValue).subscribe(
      data => {
        const result2 = data.osclist.student_migration_details;
        if(result2.length>0){
          this.oscListCitywiseData = result2;
        }
        else
        {
          this.noDataFound = 2;
        }
        // this.routers.navigate(['State/osclist_citywise'], data.osclist.student_migration_details)
      }
    )
    
  }

  onSelectedSchoolwise(outStudents){
    this.pageLeval = 3;
    this.stateService.getOSCListSchoolWise(outStudents).subscribe(
      data=> {
        const result3 = data.osclist.student_migration_details;
        if(result3.length>0){
          this.oscListSchoolWiseData = result3;
        }
        else
        {
          this.noDataFound = 3;
        }
        // this.routers.navigate(['State/osclist_studentsList'], data.result)
      }
    )
  }

  onSelectedoscSchoolWise(outStudents){
    this.pageLeval = 4;
    this.stateService.getOSCListSchoolWise(outStudents).subscribe(
      data=> {
        const result4 = data.result;
        if(result4.length>0){
          this.oscStudentListData = result4;
        }
        else
        {
          this.noDataFound = 4;
        }
        // this.routers.navigate(['State/osclist_studentsList'], data.result)
      }
    )
  }





}
