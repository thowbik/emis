import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-outofscholl-children-reg',
  templateUrl: './outofscholl-children-reg.component.html',
  styleUrls: ['./outofscholl-children-reg.component.css']
})
export class OutofschollChildrenRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];

  constructor(private registersService: RegistersService,
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
     
      { field: 'name', header: 'Student Name' },
      { field: 'unique_id_no', header: 'Unique Id' },
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section' },
      { field: 'pre_stus', header: 'present Status' },
      { field: 'training_type', header: 'Training Type'},
      { field: 'ac_year', header: 'Academic Year'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getOutofSchollChildern(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.student_osc;
      }
    });
  }

}
