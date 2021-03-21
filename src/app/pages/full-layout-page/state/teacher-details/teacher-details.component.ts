import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
public dataHeader: any;
public teachersList : any; 
teacherDetail : any[] = [];
  constructor(private router: Router, private stateService : StateService) {
    this.teachersList = this.router.getCurrentNavigation().extras;
   }

  ngOnInit() {
    this.dataHeader=[];
    this.dataHeader = [
      {field: 'block', header: 'Block' },
      { field: 'HM', header: 'HM' },
      { field: 'PGteacher', header: 'PG-Teacher', },
      { field: 'BTteacher', header: 'BT-Teacher'},
      { field: 'SGteacher', header: 'SG-Teacher' },
      { field: 'Govteacher', header: 'Govt-Teacher', widthstyle:'13em' },
      { field: 'Others', header: 'Others' },
  ];
  this.teacherDetail = this.teachersList;
  }

  onSelectedCity(teachers){
    this.stateService.getTeacherDetailsSchool(teachers).subscribe(
      data => {
        this.router.navigate(['State/emis_teacher_classwise_block'], data.details)
      }
    )
  }
}

