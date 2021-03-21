import { Component, OnInit } from '@angular/core';
//import { TeacherService } from '../../teachers/teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { schoolsService } from '../schools.service';
import { AlertService } from 'src/services/alert.service';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm ,FormArray, Form,FormsModule,ReactiveFormsModule}  from '@angular/forms';
@Component({
  selector: 'app-teachertimetable',
  templateUrl: './teachertimetable.component.html', 
  styleUrls: ['./teachertimetable.component.css']
})
export class TeachertimetableComponent implements OnInit {
  public schoolId: any;
  teacherdetails:any={teacherlist:''};
  teacherlist: any;
  teacherschedule:any[];
  
  volunteerteachers: any;
  deputationteachers: any;
  items = ['1', '2', '3','4', '5', '6','7', '8'];
  teacherdate: FormGroup;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
 // teacherdata: any;
  constructor(private cs:FormBuilder,private alertService: AlertService,private userSessionService: UserSessionService,private timetable:schoolsService)  
  {
    this.schoolId = this.userSessionService.schoolId();
   }
 
  ngOnInit() {
    this.timetable.getteacherslist(this.schoolId,true).subscribe(td=>{console.log(td)
      this.teacherdetails=td
      this.teacherlist = this.teacherdetails['teacherslist'];
    //this.volunteerteachers = this.teacherdetails['volunteerteachers'];
    //this.deputationteachers = this.teacherdetails['deputationteachers'];
    // console.log(this.teacherdetails);
    // console.log(this.teacherdetails['teacherslist']);
  })
  this.teacherdate = this.cs.group(
    {
      teacher: ['', Validators.required],
      date: ['', Validators.required],
     
    });  
  }

  getteacher()
 {
  if(this.teacherdate.valid)
  {
   
    var teacher_date=this.teacherdate.value;
    //let y=teacher_date['teacher'];
    //let date=teacher_date['date'];
    let temparr2 = {"forminputs" :teacher_date, "school_id" : this.schoolId };
    this.timetable.getweeklyteacherdata({"records":temparr2},true).subscribe(
      dataresult => { if(dataresult['dataStatus'] == true) {
        //alert('Please assign teacher to class');   
       // this.fetchOnTimeTable(dataresult);
       this.teacherschedule=dataresult.result;
       console.log(this.teacherschedule); 
       
      }
      });
    
  }
  else
  {
    this.alertService.info('please choose Teacher And Week!');
  }
 // let temparr2 = {"forminputs" : this.classsection.value , "school_id" : this.schoolId };
  //this.timetable.getweeklydata({"records":temparr2},true).subscribe(
  //  dataresult => { if(dataresult['dataStatus'] == true) {
      //alert('Please assign teacher to class');   
      //this.fetchOnTimeTable(dataresult);
  //  }
  //  });
   

 }

}
