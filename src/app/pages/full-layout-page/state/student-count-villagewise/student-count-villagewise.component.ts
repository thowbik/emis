import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';


@Component({
  selector: 'app-student-count-villagewise',
  templateUrl: './student-count-villagewise.component.html',
  styleUrls: ['./student-count-villagewise.component.scss']
})
export class StudentCountVillagewiseComponent implements OnInit {
  public studentsList : any; 
  studentDetail : any[] = [];
  school_total : any[] = [];
  teacher_total : any[] = [];
  nonteaching_total : any[] = [];
  

  constructor(private router: Router, private routers : Router,private stateService:StateService,) {
    this.studentsList = this.router.getCurrentNavigation().extras;
   }
  cols: Array<{'field':string,'header':string,'widthstyle':string}> = 
  [
  { field: 'block_name', header: 'Block',widthstyle: '10em'},
  { field: 'Prkg', header: 'Pre-Kg',widthstyle: '8em'},
  { field: 'LKG', header: 'LKG' ,widthstyle: '7em'},
  { field: 'UKG', header: 'UKG',widthstyle: '7em' },
  { field: 'class_1', header: 'I',widthstyle: '7em' },
  { field: 'class_2', header: 'II',widthstyle: '7em' },
  { field: 'class_3', header: 'III',widthstyle: '7em' },
  { field: 'class_4', header: 'IV',widthstyle: '7em' },
  { field: 'class_5', header: 'V',widthstyle: '7em' },
  { field: 'class_6', header: 'VI',widthstyle: '7em' },
  { field: 'class_7', header: 'VII',widthstyle: '7em' },
  { field: 'class_8', header: 'VIII',widthstyle: '7em' },
  { field: 'class_9', header: 'IX',widthstyle: '7em' },
  { field: 'class_10', header: 'X',widthstyle: '7em' },
  { field: 'class_11', header: 'XI',widthstyle: '7em' },
  { field: 'class_12', header: 'XII',widthstyle: '7em' },
  { field: 'total', header: 'TOTAL',widthstyle: '7em' },
  ];

  ngOnInit() {
    this.studentDetail = this.studentsList;

  }
  onSelectedSchoolId(blockwise) 
  {
     this.stateService.getschoolStudentDetails(blockwise,1).subscribe(
      details => {
        this.routers.navigate(['/class/schoolwise/count'], details.details)
      }
    )
  }
   
}
