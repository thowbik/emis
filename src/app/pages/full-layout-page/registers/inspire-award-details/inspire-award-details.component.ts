import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { RegistersService } from '../registers.service';

@Component({
  selector: 'app-inspire-award-details',
  templateUrl: './inspire-award-details.component.html',
  styleUrls: ['./inspire-award-details.component.css']
})

export class InspireAwardDetailsComponent implements OnInit {
  schoolId: number;
  data: any[] = [];
  cols: any[] = [];
  isDataAvailable: boolean;
  sampleSelectedColumn  : Array<Object> = [];

  constructor(private userSessionService: UserSessionService,
    private registersService: RegistersService ) {
      this.schoolId = this.userSessionService.schoolId();
        // this.schoolId = 17304;
       }

  ngOnInit() {
    this.getData();
    this.headerData();
  }
  headerData()
  {
    this.cols =[
      {field: 'student_id', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class', header: 'Class Studing'},
      { field: 'community_name', header: 'Community'},
      { field: 'inspire', header: 'Date of issue of the Award' },
      { field: 'remarks', header: 'Remarks' },
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    debugger;
    this.registersService.getInspireAwardDetails(this.schoolId).subscribe((res) => {
      debugger;
      if (res) {
        this.data = res.result.inspire;
       if(this.data.length > 0) {
         this.isDataAvailable = true;
       }
       else {
        this.isDataAvailable = false;
       }
      }
    });
  }
}
