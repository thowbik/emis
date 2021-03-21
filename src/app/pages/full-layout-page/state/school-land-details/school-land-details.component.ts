import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-school-land-details',
  templateUrl: './school-land-details.component.html',
  styleUrls: ['./school-land-details.component.scss']
})
export class SchoolLandDetailsComponent implements OnInit {
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public schoolLandData : any[] = [];
  public schoolLandBlockData : any[] = [];
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  public pageStage : number;

  constructor(public stateService : StateService, public routers : Router, private userSessionService: UserSessionService) { }

  ngOnInit() {

    const districtId = this.userSessionService.districtId();
    if(!districtId){
      this.getSchoolLandDetails();
    }

    if(districtId){
      this.getEachSchoolLandDetails(districtId)
    }
    this.dataHeader = [
      {field: 'Disctric Name', header: 'Distict', widthstyle:'12em'},
      { field: 'Total School Count', header: 'Total School Count', widthstyle:'8em' }
    ]
    this.dataHeader2 = [
      {field: 'Block', header: 'Block', widthstyle:'20em'},
      { field: 'UDISE Code', header: 'UDISE Code', widthstyle:'12em' },
      {field: 'School Name', header: 'School Name', widthstyle:'12em'},
      { field: 'Land Area in Acre', header: 'Land Area in Acre', widthstyle:'13em' },
      {field: 'Ground Available', header: 'Ground Available', widthstyle:'13em'},
      { field: 'Ground Area in Acre', header: 'Ground Area in Acre', widthstyle:'15em' },
      {field: 'Land Ownership', header: 'Land Ownership', widthstyle:'12em'},
      { field: 'Boundary Wall Type', header: 'Boundary Wall Type', widthstyle:'17em' },
      {field: 'Perimenter of Boundary in Meters', header: 'Perimenter of Boundary in Meters', widthstyle:'22em'},
      { field: 'Length of boundary wall in m', header: 'Length of boundary wall in m', widthstyle:'22em' }
    ]
  }

  getSchoolLandDetails(){
    this.pageStage = 1;
    this.stateService.getSchoolLandDetails().subscribe((res) => {
      let result = res.school_profile_verification.school_land_verification;
      if(result.length>0){
      this.schoolLandData = res.school_profile_verification.school_land_verification;
    }else{
      this.noDataFound = true;
    }
    })
  }

  getEachSchoolLandDetails(landData){
    this.pageStage = 2;
    const disctId = parseInt(landData);
    this.stateService.getEachSchoolLandData(disctId).subscribe((res) => {
      const results = res.school_land_verification.school_land_verification;
      if(results.length>0){
        this.schoolLandBlockData = results;
      }
      else
      {
        this.noDataFound2 = true;
      }
    })
  }

}
