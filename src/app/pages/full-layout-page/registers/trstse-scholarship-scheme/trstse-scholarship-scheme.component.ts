import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { RegistersService } from '../registers.service';

@Component({
  selector: 'app-trstse-scholarship-scheme',
  templateUrl: './trstse-scholarship-scheme.component.html',
  styleUrls: ['./trstse-scholarship-scheme.component.css']
})
export class TRSTSEScholarshipSchemeComponent implements OnInit {
  schoolId: number;
  data: any[] = [];
  selectedColumns: any[] = [];
  isDataAvailable: boolean;
  sampleSelectedColumn  : Array<Object> = [];

  constructor(private userSessionService: UserSessionService,
    private registersService: RegistersService ) {
       this.schoolId = this.userSessionService.schoolId();
      //  this.schoolId = 3531;
       }

  ngOnInit() {
    this.getData();
    this.headerData();
  }
  headerData()
  {
    this.selectedColumns =[
      {field: 'student_id', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class', header: 'Class Studing'},
      { field: 'community_name', header: 'Community' },
      { field: 'trstse', header: 'TRSTSE' },
    
    ];
    this.sampleSelectedColumn =  this.selectedColumns;
  }

  getData() {
    debugger;
    this.registersService.getTrstseScholarshipData(this.schoolId).subscribe((res) => {
      if (res) {
        this.data = res.result.trstse;
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
