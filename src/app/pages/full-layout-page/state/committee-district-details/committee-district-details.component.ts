import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-committee-district-details',
  templateUrl: './committee-district-details.component.html',
  styleUrls: ['./committee-district-details.component.scss']
})
export class CommitteeDistrictDetailsComponent implements OnInit {
  public dataHeader : any[] = [];
  public committieeDatas : any;
  committieeData : any[] = [] ;
  noDataFound : boolean = false;
  constructor(private stateService:StateService, private routers : Router) { 
    this.committieeDatas = this.routers.getCurrentNavigation().extras;
  }

  ngOnInit() {

    this.dataHeader = [
      {field: 'Block Name', header: 'Block Name', widthstyle:'12em'},
      { field: 'UDISE Code', header: 'UDISE Code', widthstyle:'10em' },
      { field: 'School Name', header: 'School Name', widthstyle:'12em' },
      { field: 'SMC Constituted?', header: 'SMC Constituted?', widthstyle:'14em' },
      { field: 'SMDC Constituted?', header: 'SMDC Constituted?', widthstyle:'14em' },
      { field: 'SBC Constituted?', header: 'SBC Constituted?', widthstyle:'14em' },
      { field: 'AC Constituted?', header: 'AC Constituted?', widthstyle:'14em' },
      { field: 'PTA Constituted?', header: 'PTA Constituted?', widthstyle:'15em' },
      { field: 'PTA Estabilshed Year', header: 'PTA Estabilshed Year', widthstyle:'15em' },
      { field: 'PTA Registration Number', header: 'PTA Registration Number', widthstyle:'15em' },

    ];
    if(this.committieeDatas.length>0){
      this.committieeData = this.committieeDatas;
    }
    else{
      this.noDataFound = true
    }
    
  }

}
