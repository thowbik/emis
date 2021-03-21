import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-stafflogindetail',
  templateUrl: './stafflogindetail.component.html',
  styleUrls: ['./stafflogindetail.component.css']
})
export class StafflogindetailComponent implements OnInit {
  schoolId: number;
  data: any[] = [];
  selectedColumns: any[] = [];
  isDataAvailable: boolean;
  isAllowedToView: boolean;

  constructor(private userSessionService: UserSessionService,
    private teacherService: TeacherService) { 
      this.schoolId = this.userSessionService.schoolId();
      this.isAllowedToView = false;
    
  }

  ngOnInit() {
    // this.getData();
    // this.headerData();
  }
  headerData()
  {
    this.selectedColumns =[
     
      { field: 'teacher_name', header: 'Teacher Name' },
      { field: 'emis_username', header: 'User Name' },
      { field: 'ref', header: 'Password'},
    
    ];
  }

  getData() {
    debugger;
    this.teacherService.getstafflogindetails().subscribe((res) => {
      if (res) {
        this.data = res.logindetails;
      }
    });
  }

}
