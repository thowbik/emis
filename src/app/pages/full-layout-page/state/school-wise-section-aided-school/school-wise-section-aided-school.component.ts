import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-school-wise-section-aided-school',
  templateUrl: './school-wise-section-aided-school.component.html',
  styleUrls: ['./school-wise-section-aided-school.component.scss']
})
export class SchoolWiseSectionAidedSchoolComponent implements OnInit {
  public school_wise_section_aided_details: any ;
  public dataHeader: { field: string; header: string; widthstyle: string; }[];

  constructor(private router: Router,private stateService : StateService,) { 
    this.school_wise_section_aided_details = this.router.getCurrentNavigation().extras;
  }

  ngOnInit() {
    this.dataHeader = [
      { field: 'district_name', header: 'Class', widthstyle:'13em' },
      { field: 'block_name', header: 'Section', widthstyle:'11em'},
      { field: 'udise_code', header: 'Section Type	', widthstyle:'10em' },
      { field: 'school_name', header: 'Medium', widthstyle:'13em' },
      { field: 'PGteacher', header: 'Student Count', widthstyle:'11em' },
    ];
    console.log('================>school',this.school_wise_section_aided_details);
  }
}
