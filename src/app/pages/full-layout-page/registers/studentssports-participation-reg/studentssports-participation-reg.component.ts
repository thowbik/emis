import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-studentssports-participation-reg',
  templateUrl: './studentssports-participation-reg.component.html',
  styleUrls: ['./studentssports-participation-reg.component.css']
})
export class StudentssportsParticipationRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  

  constructor(private registersService: RegistersService,private cs:FormBuilder,
    private userSessionService: UserSessionService) {
      this.emis_school_id = this.userSessionService.schoolId();
     }

  ngOnInit() {
    this.getData();
    this.headerData();
   
      this.emis_school_id = this.userSessionService.schoolId();
    // this.classsection.controls['emis_school_id'].setValue(this.emis_school_id);
      
  }
  headerData()
  {
    this.cols =[
      { field: 'unique_id_no', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section' },
      { field: 'game_participating', header: 'Game Participating' },
      { field: 'last_participating_date', header: 'Participating Date'},
      { field: 'last_participating_level', header: 'Played Level'},
      { field: 'winner_level_details', header: 'Winner Level Details'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    const classsection ={
     
        emis_school_id : this.emis_school_id
     
    };
      this.registersService.getStudentSportsParticipation(classsection,true).subscribe((res) => {
        if (res) {
          this.data = res.result.student_tag1;
        }
      });
    }
    
   

}
