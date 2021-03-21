import { Component, OnInit } from '@angular/core';
import { TeachersDashboardService } from './teachersdashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-teachersdashboard',
  templateUrl: './teachersdashboard.component.html',
  styleUrls: ['./teachersdashboard.component.css']
})
export class TeachersdashboardComponent implements OnInit {
  teacher: any = {};

  constructor(private teachersService :TeachersDashboardService,
    private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getTeachersData()
  }
  getTeachersData()
{
  debugger;
  this.teachersService.getteachersInfo().subscribe((res: any) => {
    if (res.incenfac.length > 0) {
     this.teacher = res.incenfac[0];
     console.log(this.teacher)
    }
  
  });
}

    doOrDie() {
      console.log('do or die');
      this.router.navigate(['school/edit-school-profile']);
    }
}
