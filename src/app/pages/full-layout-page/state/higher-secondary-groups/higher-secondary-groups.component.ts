import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-higher-secondary-groups',
  templateUrl: './higher-secondary-groups.component.html',
  styleUrls: ['./higher-secondary-groups.component.scss']
})
export class HigherSecondaryGroupsComponent implements OnInit {
  public dataHeader: any;
   higher_secondary_groups_details : any;
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  blockwiseSchoolWiseHigherSectionDetails: any;
  pageStage: number;
  SchoolWiseHigherSectionDetails: any;
   dataHeader2: { field: string; header: string; widthstyle: string; }[];
  nodateFound: boolean;
  nodateFound1: boolean;
  nodateFound2: boolean;
  constructor( private stateService : StateService, private routers : Router, private userSessionService: UserSessionService) { }

  ngOnInit() {


    const districtid = this.userSessionService.districtId();
    const blockid = this.userSessionService.blockId();
    // const blockname = this.userSessionService.blockName();
//  alert(blockid);
//  alert(blockname);


    if(!districtid || !blockid){
      this.getDistrictHigherSecondaryDetails();
    }

    if(districtid){
      this.onSelectedId(districtid)
    }


     this.dataHeader = [
      {field: 'district_name', header: 'District' ,widthstyle:'11em'},
      { field: 'HM', header: 'Total School',widthstyle:'11em' },
      { field: 'PGteacher', header: 'Groups in Hr.Sec', widthstyle:'11em' },
      { field: 'HM', header: 'DGE Groups Assigned',widthstyle:'11em' },
      
  ];
  this.dataHeader1 = [
    {field: 'district_name', header: 'District', widthstyle:'13em' },
    { field: 'block_name', header: 'Block Name', widthstyle:'11em'},
    { field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },
    { field: 'school_name', header: 'School Name', widthstyle:'13em' },
    { field: 'meals', header: 'Hr.Sec Sections' , widthstyle:'15em' },
    { field: 'total', header: 'DGE Groups Assigned', widthstyle:'15em' },
];
this.dataHeader2 = [
  {field: 'section', header: 'Class', widthstyle:'13em' },
  { field: 'block_name', header: 'Section', widthstyle:'11em'},
  { field: 'udise_code', header: 'Section Type', widthstyle:'12em' },
  { field: 'school_name', header: 'Medium', widthstyle:'10em' },
  { field: 'meals', header: 'Student Count' , widthstyle:'12em' },
  { field: 'total', header: 'Group (Only XI and XII)', widthstyle:'16em' },
];
  }
  getDistrictHigherSecondaryDetails(){
    this.stateService.getDistrictSchoolWiseHigherSectionDetails().subscribe(
      list=>{
        this.pageStage = 1;
        if(list.result.dist_school_details.length>0){
          this.higher_secondary_groups_details =list.result.dist_school_details
        }
      else
      {
        this.nodateFound = true;
      }
        // console.log('listlistlist',list)
      }
    )
  }
  onSelectedId(districtwise){
    this.stateService.getblockwiseSchoolWiseHigherSectionDetails(districtwise).subscribe(
      details => {
        this.pageStage = 2;
        if(details.result.school_details.length>0){
          this.blockwiseSchoolWiseHigherSectionDetails = details.result.school_details
        }
      else
      {
        this.nodateFound1 = true;
      }
                console.log('listlistlist',details.result.school_details )
          // this.routers.navigate(['block_higher_secondary/groups'], details.result.school_details)
      }
    )
  }
  onSelectedschoolId(blockwise) 
  {
     this.stateService.getschoolwiseSchoolWiseHigherSectionDetails(blockwise).subscribe(
      details => {
        this.pageStage = 3;
        if(details.result.school_class_details.length>0){
          this.SchoolWiseHigherSectionDetails = details.result.school_class_details
        }
      else
      {
        this.nodateFound2 = true;
      }
          //  this.router.navigate(['school_higher_secondary/groups'], details.result.school_class_details)
      }
    )
  }

}
