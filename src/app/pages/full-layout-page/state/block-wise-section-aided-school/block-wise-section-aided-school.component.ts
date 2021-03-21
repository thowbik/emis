import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-block-wise-section-aided-school',
  templateUrl: './block-wise-section-aided-school.component.html',
  styleUrls: ['./block-wise-section-aided-school.component.scss']
})
export class BlockWiseSectionAidedSchoolComponent implements OnInit {
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  public block_wise_section_aided_details: any;

  constructor(private router: Router,private stateService : StateService,) { 
    this.block_wise_section_aided_details = this.router.getCurrentNavigation().extras;

  }

  ngOnInit() {
    this.dataHeader = [
      { field: 'district_name', header: 'District Name', widthstyle:'13em' },
      { field: 'block_name', header: 'Block Name', widthstyle:'11em'},
      { field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },
      { field: 'school_name', header: 'School Name', widthstyle:'13em' },
      { field: 'PGteacher', header: 'Aided Section', widthstyle:'11em' },
      { field: 'Total UnAided Section', header: 'UnAided Section',widthstyle:'13em' },
      { field: 'Not Marked Sections', header: 'Not Marked Sections',widthstyle:'15em' },
      { field: 'Not Marked Medium', header: 'Not Marked Medium',widthstyle:'15em' },
    
    ];

  }
//   onSelectedId(blockwise)  {
//     this.stateService.getschoolwiseSectionAidedDetails(blockwise).subscribe(
//      details => {
//            this.router.navigate(['schoolwise/section/aided/schools'], details.result.school_class_details)
//      }
//    )
//  }

}
