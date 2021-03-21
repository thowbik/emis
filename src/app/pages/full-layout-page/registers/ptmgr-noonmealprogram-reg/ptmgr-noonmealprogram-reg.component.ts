import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-ptmgr-noonmealprogram-reg',
  templateUrl: './ptmgr-noonmealprogram-reg.component.html',
  styleUrls: ['./ptmgr-noonmealprogram-reg.component.css']
})
export class PtmgrNoonmealprogramRegComponent implements OnInit {
  emis_school_id: number;
  data: any[] = [];
  selectedColumns: any[] = [];
  isDataAvailable: boolean;
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
    this.selectedColumns =[
      { field: 'unique_id_no', header: 'EMIS ID' },
      { field: 'name', header: 'Student Name' },
      { field: 'community_name', header: 'Community' },
      { field: 'gender', header: 'Gender'},
      { field: 'class_studying_id', header: 'Class' },
      { field: 'class_section', header: 'Section' },
    
    ];
    this.sampleSelectedColumn =  this.selectedColumns;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getPTMGRMealProgramme(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.ptmgr_noon_meal_program;
       if(this.data.length > 0) {
         this.isDataAvailable = true;
       }
       else {
        this.isDataAvailable = false;
       }
      }
    });
  }

  // getData() {
  //   this.emis_school_id = this.userSessionService.schoolId();
  //   this.registersService.getPTMGRMealProgramme(this.emis_school_id).subscribe((res) => {
  //     if (res) {
  //       this.data = res.result.ptmgr_noon_meal_program;
  //     }
  //   });
  // }

}
