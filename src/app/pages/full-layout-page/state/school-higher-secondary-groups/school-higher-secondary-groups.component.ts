import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-school-higher-secondary-groups',
  templateUrl: './school-higher-secondary-groups.component.html',
  styleUrls: ['./school-higher-secondary-groups.component.scss']
})
export class SchoolHigherSecondaryGroupsComponent implements OnInit {
 public SchoolWiseHigherSectionDetails: any;
  dataHeader: { field: string; header: string; widthstyle: string; }[];

  constructor(private router: Router,private stateService : StateService,) { 
    this.SchoolWiseHigherSectionDetails = this.router.getCurrentNavigation().extras;

  }
  ngOnInit() {
    this.dataHeader = [
      {field: 'section', header: 'Class', widthstyle:'13em' },
      { field: 'block_name', header: 'Section', widthstyle:'11em'},
      { field: 'udise_code', header: 'Section Type', widthstyle:'12em' },
      { field: 'school_name', header: 'Medium', widthstyle:'10em' },
      { field: 'meals', header: 'Student Count' , widthstyle:'12em' },
      { field: 'total', header: 'Group (Only XI and XII)', widthstyle:'16em' },
  ];
  }


}
