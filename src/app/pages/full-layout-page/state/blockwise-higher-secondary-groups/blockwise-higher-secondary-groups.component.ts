import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';
 @Component({
  selector: 'app-blockwise-higher-secondary-groups',
  templateUrl: './blockwise-higher-secondary-groups.component.html',
  styleUrls: ['./blockwise-higher-secondary-groups.component.scss']
})
export class BLockwiseHigherSecondaryGroupsComponent implements OnInit {
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  blockwiseSchoolWiseHigherSectionDetails: any;
  
  constructor(private router: Router,private stateService : StateService,) { 
    this.blockwiseSchoolWiseHigherSectionDetails = this.router.getCurrentNavigation().extras;

  }

  ngOnInit() {
    this.dataHeader = [
      {field: 'district_name', header: 'District', widthstyle:'13em' },
      { field: 'block_name', header: 'Block Name', widthstyle:'11em'},
      { field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },
      { field: 'school_name', header: 'School Name', widthstyle:'13em' },
      { field: 'meals', header: 'Hr.Sec Sections' , widthstyle:'15em' },
      { field: 'total', header: 'DGE Groups Assigned', widthstyle:'15em' },
  ];
  }
  onSelectedId(blockwise) 
  {
     this.stateService.getschoolwiseSchoolWiseHigherSectionDetails(blockwise).subscribe(
      details => {
           this.router.navigate(['school_higher_secondary/groups'], details.result.school_class_details)
      }
    )
  }

}
