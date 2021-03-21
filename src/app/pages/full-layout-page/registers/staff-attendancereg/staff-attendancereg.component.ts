import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import * as moment from 'moment';

@Component({
  selector: 'app-staff-attendancereg',
  templateUrl: './staff-attendancereg.component.html',
  styleUrls: ['./staff-attendancereg.component.css']
})
export class StaffAttendanceregComponent implements OnInit {
  cols: any[];
  classsection:FormGroup;
  assigned_section1:any;
  classsec:any={result:''};
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  attendance:any;
  classlist: any;
  public schoolId: any;
  date: Date;
  sample: any;
  staffattendacereglist: any[] = [];
  exportColumns: { title: any; dataKey: any; }[];
  sampleSelectedColumn  : Array<Object> = [];


  constructor(private registersService: RegistersService, private cs:FormBuilder,
    private userSessionService: UserSessionService) { 
      this.schoolId = this.userSessionService.schoolId();
    }

  ngOnInit() {

    this.cols = [];
    this.cols = [
    //  { field: 'sno' , header: 'S.No' },
      { field: 'teacher_name', header: 'Staff Name'},
      { field: '1', header: '1' }, { field: '2', header: '2' }, { field: '3', header: '3' },
      { field: '4', header: '4' }, { field: '5', header: '5' }, { field: '6', header: '6' },
      { field: '7', header: '7' }, { field: '8', header: '8' }, { field: '9', header: '9' },
      { field: '10', header: '10' }, { field: '11', header: '11' }, { field: '12', header: '12' },
      { field: '13', header: '13' }, { field: '14', header: '14' }, { field: '15', header: '15' },
      { field: '16', header: '16' }, { field: '17', header: '17' }, { field: '18', header: '18' },
      { field: '19', header: '19' }, { field: '20', header: '20' }, { field: '21', header: '21' },
      { field: '22', header: '22' }, { field: '23', header: '23' }, { field: '24', header: '24' },
      { field: '25', header: '25' }, { field: '26', header: '26' }, { field: '27', header: '27' },
      { field: '28', header: '28' }, { field: '29', header: '29' }, { field: '30', header: '30' },
      { field: '31', header: '31' }
  ];
  this.sampleSelectedColumn =  this.cols;
  this.classsection = this.cs.group(
    {
      emis_school_id: [''],
     date: ['', Validators.required]

    });
    // this.cols = [
      
    //     { field: '1', header: '1' }, { field: '2', header: '2' }, { field: '3', header: '3' },
    //     { field: '4', header: '4' }, { field: '5', header: '5' }, { field: '6', header: '6' },
    //     { field: '7', header: '7' }, { field: '8', header: '8' }, { field: '9', header: '9' },
    //     { field: '10', header: '10' }, { field: '11', header: '11' }, { field: '12', header: '12' },
    //     { field: '13', header: '13' }, { field: '14', header: '14' }, { field: '15', header: '15' },
    //     { field: '16', header: '16' }, { field: '17', header: '17' }, { field: '18', header: '18' },
    //     { field: '19', header: '19' }, { field: '20', header: '20' }, { field: '21', header: '21' },
    //     { field: '22', header: '22' }, { field: '23', header: '23' }, { field: '24', header: '24' },
    //     { field: '25', header: '25' }, { field: '26', header: '26' }, { field: '27', header: '27' },
    //     { field: '28', header: '28' }, { field: '29', header: '29' }, { field: '30', header: '30' },
    //     { field: '31', header: '31' }
    // ];
    // this.classsection = this.cs.group(
    //   {
    //     emis_school_id: [''],
    //     date: ['', Validators.required],
  
    //   });
  }

  getStaffDetails()
  {  
   this.sample = moment(this.classsection.value.date).format('MM-YY');
   this.classsection.controls['emis_school_id'].setValue(this.schoolId);
   this.classsection.value.date=this.sample;
   if(this.classsection.valid)
   {
     this.registersService.getStaffAttendanceRegister(this.classsection.value,true).subscribe((res) => {
       if(res) {
         this.staffattendacereglist = res.result.teacher_absent_list;
         console.log(this.staffattendacereglist);
       }
 
     });
   }
 }

}
