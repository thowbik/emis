import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-nmmsschemereg',
  templateUrl: './nmmsschemereg.component.html',
  styleUrls: ['./nmmsschemereg.component.css']
})
export class NmmsschemeregComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];

  constructor(private registersService: RegistersService, private cs:FormBuilder,
    private userSessionService: UserSessionService) { 
      this.emis_school_id = this.userSessionService.schoolId();
    }

  ngOnInit() {
    this.getData();
    this.headerData();
    
  }
  headerData()
  {
    this.cols =[
     
      { field: 'student_id', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender'},
      { field: 'class', header: 'Class Studying' },
      { field: 'section', header: 'Section' },
      { field: 'community_name', header: 'Community' },
      { field: 'nmmsexam_passed', header: 'NMMS Exam Passed On'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getNMMSScheme(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.nmms;
      }
    });
  }

 

}
