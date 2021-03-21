import { Component, OnInit } from '@angular/core';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm ,FormArray, Form,FormsModule,ReactiveFormsModule}  from '@angular/forms';
import { PipeTransform, Pipe } from '@angular/core';
import { schoolsService } from '../schools.service';
@Component({
  selector: 'app-todaytimetable',
  templateUrl: './todaytimetable.component.html',
  styleUrls: ['./todaytimetable.component.css']
})
@Pipe({name: 'keys'})
export class TodaytimetableComponent implements OnInit {
  classsec:any[];
  todaytimeTable:FormGroup;
  todays_teacherleave:any;
  teacherlist:any[];
  volunteerteachers:any[];
  teacherdata:any[];
  holidayflag : any = false;
  items = ['1', '2', '3','4', '5', '6','7', '8'];
  teacherclasses:any;
  data:any;
  public schoolId: any;
  deputationteachers: any;
  constructor(private fb: FormBuilder,private alertService: AlertService, private timetable:schoolsService,private userSessionService: UserSessionService) { 
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    console.clear();
    // var len :any;
    //this.data = {"records":{"school_id":this.schoolId}} 
      this.timetable.gettoday(this.schoolId,true).subscribe(bb=>{
        
          this.classsec=bb;
         console.log(this.classsec);
          //return false;
          
          this.teacherlist = this.classsec['teacherslist'];
         
          this.volunteerteachers = this.classsec['volunteerteachers'];
          this.deputationteachers = this.classsec['deputationteachers'];
          setTimeout(()=>{    //<<<---    using ()=> syntax
          
        
         },2000);
        //  console.log('today',todays_timetable);
          var leave_status = this.classsec['leavestatus'][0].count;
         // console.log(leave_status,'leave');
        if(leave_status>0)
          {
            var todays_timetable = '';
            this.holidayflag = true;
           // return false;
          }
        else
        {
          var todays_timetable = this.classsec['timetabledetails_today'];
          console.log(todays_timetable);
         // var todays_teacherleave = this.classsec['timetabledetails_today_attstatus'];
        
         // this.holidayresult='';
          this.holidayflag = false;
        }
         
          // len = Object.keys(arraylength).length;
          this.fetchTimeTable(todays_timetable);
           //this.fetchOnTimeTable(arraylength);
      });

      //this.data = {"records":{"school_id":this.schoolId}} 
      this.timetable.gettodayteacherclasses(this.schoolId,true).subscribe(cc=>{
        //console.log(cc);
        this.teacherclasses=cc
     
        this.teacherdata= this.teacherclasses['teacher_data'];
        console.log( this.teacherdata);
       // this.transform(value,this.teacherclasses['teacher_data']);
        console.log(this.teacherdata,'grouping');
      });
      this.todaytimeTable = this.fb.group(
      {
          timeTableDays :this.fb.array([]), 
          holiday:[],
          
      });
      // setTimeout(()=>{    //<<<---    using ()=> syntax
      //   this.addTimeTable(len);
     
      // },2000);
      
      
  }
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
  createTimeTable()
  {
      return this.fb.group(
        {
            class:[''],
            attstatus1:[''],
            p1:[''],
            attstatus2:[''],
            p2:[''],
           attstatus3:[''],
            p3:[''],
            attstatus4:[''],
            p4:[''],
           attstatus5:[''],
            p5:[''],
           attstatus6:[''],
            p6:[''],
           attstatus7:[''],
            p7:[''],
           attstatus8:[''],
            p8:[''],
        });
  }

  fetchTimeTable(todays_arr)
  {
     
      var len = Object.keys(todays_arr).length;
      var keys = Object.keys(todays_arr);
      var value = Object.values(todays_arr);
      for(let i = 0; i<=(len-1);i++){
        value[i]['class'] = keys[i];
      }
      // console.log(keys)
      // console.log('AFTER Values',value);
      const timeArr = this.todaytimeTable.get('timeTableDays') as FormArray;
      for(let i = 1; i<=len;i++)
      {
          timeArr.push(this.createTimeTable()); 
      }
      this.todaytimeTable.controls['timeTableDays'].setValue(value);
     
   }

   savetodaytimetable()
   {
     
     if(this.todaytimeTable.valid)
     {
      // console.log(this.todaytimeTable.value);
      // return false;
     // this.data = {"records":{"school_id":this.schoolId}} 
     
       var timetabledata=this.todaytimeTable.value;
       this.data = {"records":{"school_id":this.schoolId,"timetabledata":timetabledata}}
       //let temparr2 = {"forminputs" : this.todaytimeTable.value , "school_id" : 3509 };
       this.timetable.savetodaytimetableDetails(this.data,true).subscribe(
         dataresult => {
        console.log(dataresult,'today');
      //  console.log('testing');
           if(dataresult['dataStatus'] == true) {
            
            // this.fetchTimeTable(dataresult);
            this.alertService.success('Today Timetable Saved Successfully');
            this.ngOnInit();
           }
           else {
            this.alertService.warning('Something Wrong');
            
          }
         }); 
     
    
   }
   //this.alertService.success('Today Timetable Saved Successfully');
  // alert('Saved Successfully');
  
  //this.ngOnInit()
   
}

}
