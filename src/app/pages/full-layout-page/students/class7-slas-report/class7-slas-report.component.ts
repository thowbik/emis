import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-class7-slas-report',
  templateUrl: './class7-slas-report.component.html',
  styleUrls: ['./class7-slas-report.component.css']
})
export class Class7SlasReportComponent implements OnInit {
  schoolId: number;
  data: any[] = [];
  selectedColumns: any[] = [];
  isDataAvailable: boolean;
  constructor(private userSessionService: UserSessionService,
    private StudentService: StudentService) {
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    
    this.headerData();
    this.GetslasReportList();
  }
  headerData() {
    this.selectedColumns = [

      { field: 'name', header: 'Name' },
      { field: 'tamil', header: 'Tamil(out of 12)' },
      { field: 'english', header: 'English(out of 12)' },
      { field: 'maths', header: 'Maths(out of 12)' },
      { field: 'science', header: 'Science(out of 12)' },
      { field: 'social', header: 'Social(out of 12)' },
      { field: 'total_marks', header: 'Total(out of 60)' },

    ];
  }
  GetslasReportList() {
   
    this.StudentService.getclass7Report(this.schoolId).subscribe((res) => {
      console.log(res)
      if (res.dataStatus == true) {   
        this.data = res.result;
        console.log("class7report",this.data);
      }
    });
  }
}
