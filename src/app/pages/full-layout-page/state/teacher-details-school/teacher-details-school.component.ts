import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-teacher-details-school',
  templateUrl: './teacher-details-school.component.html',
  styleUrls: ['./teacher-details-school.component.scss']
})
export class TeacherDetailsSchoolComponent implements OnInit {
  public dataHeader: any;
public teachersList : any; 
teacherDetail : any[] = [];
  constructor(private router: Router, private stateService : StateService) {
    this.teachersList = this.router.getCurrentNavigation().extras;
   }

  ngOnInit() {
    this.dataHeader=[];
    this.dataHeader = [
      {field: 'udisecode', header: 'Udise Code', widthstyle:'10em'},
      { field: 'schools', header: 'Schools', widthstyle:'8em'},
      { field: 'HM', header: 'HM', widthstyle:'6em' },
      { field: 'PGteacher', header: 'PG-Teacher', widthstyle:'10em' },
      { field: 'BTteacher', header: 'BT-Teacher', widthstyle:'10em'},
      { field: 'SGteacher', header: 'SG-Teacher', widthstyle:'10em' },
      { field: 'Govteacher', header: 'Govt-Teacher', widthstyle:'11em' },
      { field: 'Others', header: 'Others', widthstyle:'8em' },
  ];
  this.teacherDetail = this.teachersList;
  }

}
