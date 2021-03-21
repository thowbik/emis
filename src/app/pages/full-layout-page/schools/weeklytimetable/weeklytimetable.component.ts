import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm ,FormArray, Form,FormsModule,ReactiveFormsModule}  from '@angular/forms';
import { schoolsService } from '../schools.service';
@Component({
  selector: 'app-weeklytimetable',
  templateUrl: './weeklytimetable.component.html',
  styleUrls: ['./weeklytimetable.component.css']
})
export class WeeklytimetableComponent implements OnInit {

  timeTable:FormGroup;
  classsection:FormGroup;
  submitform:FormGroup;
  public schoolId: any;
  title: any = [];
  classdet :any={classdetails:'',timetabledetails_monday:''};
  classsec:any={classdetails:''};
  classlist:any;
  monday:any[];
  tuesday:any[];
  wednesday:any[];
  thursday:any[];
  friday:any[];
  fromdate:any;
  todate:any;
  saturday:any[];
  sunday:any[];
  teacherlist:any[];
  
  volunteerteachers:any[];
  classid:any[];
  sectionid:any[];
  items = ['1', '2', '3','4', '5', '6','7', '8'];
  assigned_section:any;
  _pdTeamForm: any;
  _router: any;
  data:any;
 
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  deputationteachers: any;
  constructor( private cs:FormBuilder, private alertService: AlertService, private fb: FormBuilder,private timetable:schoolsService,private userSessionService: UserSessionService) {
    this.schoolId = this.userSessionService.schoolId();
  }


  ngOnInit()
 {

 var current = new Date();     // get current date    
var weekstart = current.getDate() - current.getDay() +1;    
var weekend = weekstart + 6;       // end day is the first day + 6 
var monday = new Date(current.setDate(weekstart));  
var sunday = new Date(current.setDate(weekend));
 //console.log(monday);
 //console.log(sunday);
 this.fromdate=monday;
 this.todate=sunday;
  //this.data = {"records":{"school_id":this.schoolId}}
  this.timetable.getclasslist(this.schoolId,true).subscribe(timetabledata=>{console.log(timetabledata)
  this.classsec=timetabledata
  this.classlist=this.classsec['classdetails']
  console.log( this.classlist);
  this.classlist.map(i=> i['roman'] = this.class_in_roman[i['value']]);
  //console.log(this.classlist);
 // for (let i = 0; i < this.classlist.length; i++){
   
       //console.log(i);
       //this.classlist.push(i=> i['roman'] = this.class_in_roman[i['value']])
   
//}


  
  });
  

  this.data = {"records":{"school_id":this.schoolId,"class_id":'' , "section":''}}
  this.timetable.getmaster(this.data,true).subscribe(aa=>{console.log("Onload getsample",aa)
    // this.fetchOnTimeTable(aa);
    this.classdet=aa;
   // this.teacherlist = this.classdet['teacherslist'];
  //  console.log( this.teacherlist,'checkng');
    });
    this.classsection = this.cs.group(
      {
        class: ['', Validators.required],
        section: ['', Validators.required],
       // fromdate:2020-10-11,
       // todate:lastday,
      });  
 this.timeTable = this.fb.group(
        {
            timeTableDays :this.fb.array([]), 
            hidesection:[],
            hideclass:[]
        });
        this.addTimeTable();
       
}
getSection()
 {
  if(this.classsection.valid)
  {
  //var classection=this.classsection.value;
 // console.log(this.classsection.value);
  let temparr2 = {"forminputs" : this.classsection.value , "school_id" : this.schoolId };
  this.timetable.getweeklydata({"records":temparr2},true).subscribe(
    dataresult => { if(dataresult['dataStatus'] == true) {
      //alert('Please assign teacher to class');   
      this.fetchOnTimeTable(dataresult);
    }
    });
    // dataresult => {
      
      // if(dataresult.dataStatus == true) {
        
      //  // Swal('Record Saved Successfully.!','success');
      //   //this._router.navigate(['/setting/pdteam/pdteamlist']);
      // alert('Saved Successfully')
        
      // }
   //  else {
//alert('Something wrong');
        //Swal('Wrong.!');
      //  Swal('Some Thing Wents Wrong Try Again !');
        //this.errorMessage = "Some Thing Wents Wrong Try Again !";
   //   }
    // });
  }
 }

  getcopylastweek()
  {
   if(this.classsection.valid)
   {
   var classection=this.classsection.value;
   console.log(this.classsection.value);
   let temparr2 = {"forminputs" : this.classsection.value , "school_id" : this.schoolId };
  this.timetable.getlastweekdata({"records":temparr2},true).subscribe(
  
    dataresult => {
      

         if(dataresult['dataStatus'] == true) {
        // window.location.reload();
          this.fetchOnTimeTable(dataresult);

        }
         else {
         alert('Not Created Timetable Lastweek In This Class. You have must created timetable Everyweek and Everyclass');
       }
      });
  }
 }

createTimeTable()
  {
      return this.fb.group(
        {
          
            p1:[''],
            p2:[''],
            p3:[''],
            p4:[''],
            p5:[''],
            p6:[''],
            p7:[''],
            p8:[''],
        });
  }


  addTimeTable()
  {
   
      const timeArr = this.timeTable.get('timeTableDays') as FormArray;
      for(let i = 1; i<=7;i++)
        {
          timeArr.push(this.createTimeTable()); 
        //this.title[i] = this.getWeekDay(i);
        }
  }
  getWeekDay(i,flag)
 {
    let dayName = '';
   // let header='';
    switch(i)
    {
      case 0:
        dayName = 'Monday';
      //  header='Days'
        break;
      case 1:
        dayName = 'Tuesday';
          break;
      case 2:
        dayName  = 'Wednesday';
          break;
      case 3:
        dayName = 'Thursday';
          break;
      case 4:
        dayName = 'Friday';
          break;
      case 5:
          dayName = 'Saturday';
        break;
    case 6:
          dayName = 'Sunday';
        break;
                                
    }
    if(flag == 1) return dayName;
 }
 
 
 saveweeklytimetable()
  {
  
    if(this.timeTable.valid)
    {
      console.log(this.timeTable.value);
      //return false;
      var timetabledata=this.timeTable.value;
      var classid=timetabledata['hideclass'];
      var sectionid=timetabledata['hidesection'];
      this.data = {"records":{"school_id":this.schoolId,"timetabledata":timetabledata}}
      //console.log(classid);
      //console.log(sectionid);
      if(classid==null || sectionid==null)
      {
      //  alert('please choose class And section');
        this.alertService.info('please choose class And section!');
        return false;
      }
      else
    {
      this.timetable.addweeklytimetableDetails(this.data,true).subscribe(
        dataresult => {
       
        
          if(dataresult['dataStatus'] == true) {
            this.alertService.success('Weekly Timetable Saved Successfully');
            this.fetchOnTimeTable(dataresult);
           
          
          }
          else {
            this.alertService.warning('Something Wrong!');
           
         }
        });
     
      }
    }
  
  }
  onSelection(e){
    this.assigned_section = '';
    const result = (this.classsec.classdetails).filter(s => s.value == e);
    this.assigned_section = result[0].section;
  }
  submit()
  {
    if(this.submitform.valid)
    {
      console.log(this.submitform.value);
      
     // alert('weekly timetable saved Successfully');
    }
   
  }

  fetchOnTimeTable(arg){
   
    console.log('Fetched',arg);
   
    this.classdet=arg
    this.teacherlist = this.classdet['teacherslist'];
   
    this.volunteerteachers = this.classdet['volunteerteachers'];
    this.deputationteachers = this.classdet['deputationteachers'];
    console.log(this.deputationteachers,'ts');
   
    this.classid=this.classdet['classid'];
    this.sectionid=this.classdet['sectionid'];
    this.monday = this.classdet['timetabledetails_monday'];
    this.tuesday=this.classdet['timetabledetails_tuesday']; 
    this.wednesday=this.classdet['timetabledetails_wednesday'];
    this.thursday=this.classdet['timetabledetails_thursday'];
    this.friday=this.classdet['timetabledetails_friday'];
    this.saturday=this.classdet['timetabledetails_saturday'];
    this.sunday=this.classdet['timetabledetails_sunday'];
    //console.log('testleave',this.monday);
    var leavemonday=this.monday[0].leavestatus;
    var leavetuesday=this.tuesday[0].leavestatus;
    var leavewednesday=this.wednesday[0].leavestatus;
    var leavethursday=this.thursday[0].leavestatus;
    var leavefriday=this.friday[0].leavestatus;
    var leavesaturday=this.saturday[0].leavestatus;
    var leavesunday=this.sunday[0].leavestatus;
    if(leavemonday=="yes")
    {
      this.monday[0].PS='888'; 
      this.monday[0].PT='leave';
      this.monday[1].PS='888'; 
      this.monday[1].PT='leave';
      this.monday[2].PS='888'; 
      this.monday[2].PT='leave';
      this.monday[3].PS='888'; 
      this.monday[3].PT='leave';
      this.monday[4].PS='888'; 
      this.monday[4].PT='leave';
      this.monday[5].PS='888'; 
      this.monday[5].PT='leave';
      this.monday[6].PS='888'; 
      this.monday[6].PT='leave';
      this.monday[7].PS='888'; 
      this.monday[7].PT='leave';
      //this.teacherlist = [];
    }
    if(leavetuesday=="yes")
    {
      this.tuesday[0].PS='888'; 
      this.tuesday[0].PT='leave';
      this.tuesday[1].PS='888'; 
      this.tuesday[1].PT='leave';
      this.tuesday[2].PS='888'; 
      this.tuesday[2].PT='leave';
      this.tuesday[3].PS='888'; 
      this.tuesday[3].PT='leave';
      this.tuesday[4].PS='888'; 
      this.tuesday[4].PT='leave';
      this.tuesday[5].PS='888'; 
      this.tuesday[5].PT='leave';
      this.tuesday[6].PS='888'; 
      this.tuesday[6].PT='leave';
      this.tuesday[7].PS='888'; 
      this.tuesday[7].PT='leave';
      //this.teacherlist = [];
    }
    if(leavewednesday=="yes")
    {
      this.wednesday[0].PS='888'; 
      this.wednesday[0].PT='leave';
      this.wednesday[1].PS='888'; 
      this.wednesday[1].PT='leave';
      this.wednesday[2].PS='888'; 
      this.wednesday[2].PT='leave';
      this.wednesday[3].PS='888'; 
      this.wednesday[3].PT='leave';
      this.wednesday[4].PS='888'; 
      this.wednesday[4].PT='leave';
      this.wednesday[5].PS='888'; 
      this.wednesday[5].PT='leave';
      this.wednesday[6].PS='888'; 
      this.wednesday[6].PT='leave';
      this.wednesday[7].PS='888'; 
      this.wednesday[7].PT='leave';
      //this.teacherlist = [];
    }
    if(leavethursday=="yes")
    {
      this.thursday[0].PS='888'; 
      this.thursday[0].PT='leave';
      this.thursday[1].PS='888'; 
      this.thursday[1].PT='leave';
      this.thursday[2].PS='888'; 
      this.thursday[2].PT='leave';
      this.thursday[3].PS='888'; 
      this.thursday[3].PT='leave';
      this.thursday[4].PS='888'; 
      this.thursday[4].PT='leave';
      this.thursday[5].PS='888'; 
      this.thursday[5].PT='leave';
      this.thursday[6].PS='888'; 
      this.thursday[6].PT='leave';
      this.thursday[7].PS='888'; 
      this.thursday[7].PT='leave';
      //this.teacherlist = [];
    }
    if(leavefriday=="yes")
    {
      this.friday[0].PS='888'; 
      this.friday[0].PT='leave';
      this.friday[1].PS='888'; 
      this.friday[1].PT='leave';
      this.friday[2].PS='888'; 
      this.friday[2].PT='leave';
      this.friday[3].PS='888'; 
      this.friday[3].PT='leave';
      this.friday[4].PS='888'; 
      this.friday[4].PT='leave';
      this.friday[5].PS='888'; 
      this.friday[5].PT='leave';
      this.friday[6].PS='888'; 
      this.friday[6].PT='leave';
      this.friday[7].PS='888'; 
      this.friday[7].PT='leave';
      //this.teacherlist = [];
    }
    if(leavesaturday=="yes")
    {
      this.saturday[0].PS='888'; 
      this.saturday[0].PT='leave';
      this.saturday[1].PS='888'; 
      this.saturday[1].PT='leave';
      this.saturday[2].PS='888'; 
      this.saturday[2].PT='leave';
      this.saturday[3].PS='888'; 
      this.saturday[3].PT='leave';
      this.saturday[4].PS='888'; 
      this.saturday[4].PT='leave';
      this.saturday[5].PS='888'; 
      this.saturday[5].PT='leave';
      this.saturday[6].PS='888'; 
      this.saturday[6].PT='leave';
      this.saturday[7].PS='888'; 
      this.saturday[7].PT='leave';
      //this.teacherlist = [];
    }
    if(leavesunday=="yes")
    {
      this.sunday[0].PS='888'; 
      this.sunday[0].PT='leave';
      this.sunday[1].PS='888'; 
      this.sunday[1].PT='leave';
      this.sunday[2].PS='888'; 
      this.sunday[2].PT='leave';
      this.sunday[3].PS='888'; 
      this.sunday[3].PT='leave';
      this.sunday[4].PS='888'; 
      this.sunday[4].PT='leave';
      this.sunday[5].PS='888'; 
      this.sunday[5].PT='leave';
      this.sunday[6].PS='888'; 
      this.sunday[6].PT='leave';
      this.sunday[7].PS='888'; 
      this.sunday[7].PT='leave';
      //this.teacherlist = [];
    }
    
   
    var mondaydata = new Array(); 
    var length = mondaydata.push({'p1':this.monday[0].PS+'-'+this.monday[0].PT,'p2':this.monday[1].PS+'-'+this.monday[1].PT
          ,'p3':this.monday[2].PS+'-'+this.monday[2].PT,'p4':this.monday[3].PS+'-'+this.monday[3].PT,'p5':this.monday[4].PS+'-'+this.monday[4].PT
          ,'p6':this.monday[5].PS+'-'+this.monday[5].PT,'p7':this.monday[6].PS+'-'+this.monday[6].PT,'p8':this.monday[7].PS+'-'+this.monday[7].PT}
          
          ,{'p1':this.tuesday[0].PS+'-'+this.tuesday[0].PT,'p2':this.tuesday[1].PS+'-'+this.tuesday[1].PT
          ,'p3':this.tuesday[2].PS+'-'+this.tuesday[2].PT,'p4':this.tuesday[3].PS+'-'+this.tuesday[3].PT,'p5':this.tuesday[4].PS+'-'+this.tuesday[4].PT
          ,'p6':this.tuesday[5].PS+'-'+this.tuesday[5].PT,'p7':this.tuesday[6].PS+'-'+this.tuesday[6].PT,'p8':this.tuesday[7].PS+'-'+this.tuesday[7].PT},
          
          {'p1':this.wednesday[0].PS+'-'+this.wednesday[0].PT,'p2':this.wednesday[1].PS+'-'+this.wednesday[1].PT
          ,'p3':this.wednesday[2].PS+'-'+this.wednesday[2].PT,'p4':this.wednesday[3].PS+'-'+this.wednesday[3].PT,'p5':this.wednesday[4].PS+'-'+this.wednesday[4].PT
          ,'p6':this.wednesday[5].PS+'-'+this.wednesday[5].PT,'p7':this.wednesday[6].PS+'-'+this.wednesday[6].PT,'p8':this.wednesday[7].PS+'-'+this.wednesday[7].PT}
          
          ,{'p1':this.thursday[0].PS+'-'+this.thursday[0].PT,'p2':this.thursday[1].PS+'-'+this.thursday[1].PT
          ,'p3':this.thursday[2].PS+'-'+this.thursday[2].PT,'p4':this.thursday[3].PS+'-'+this.thursday[3].PT,'p5':this.thursday[4].PS+'-'+this.thursday[4].PT
          ,'p6':this.thursday[5].PS+'-'+this.thursday[5].PT,'p7':this.thursday[6].PS+'-'+this.thursday[6].PT,'p8':this.thursday[7].PS+'-'+this.thursday[7].PT}
          
          ,{'p1':this.friday[0].PS+'-'+this.friday[0].PT,'p2':this.friday[1].PS+'-'+this.friday[1].PT
          ,'p3':this.friday[2].PS+'-'+this.friday[2].PT,'p4':this.friday[3].PS+'-'+this.friday[3].PT,'p5':this.friday[4].PS+'-'+this.friday[4].PT
          ,'p6':this.friday[5].PS+'-'+this.friday[5].PT,'p7':this.friday[6].PS+'-'+this.friday[6].PT,'p8':this.friday[7].PS+'-'+this.friday[7].PT}
          
          ,{'p1':this.saturday[0].PS+'-'+this.saturday[0].PT,'p2':this.saturday[1].PS+'-'+this.saturday[1].PT
          ,'p3':this.saturday[2].PS+'-'+this.saturday[2].PT,'p4':this.saturday[3].PS+'-'+this.saturday[3].PT,'p5':this.saturday[4].PS+'-'+this.saturday[4].PT
          ,'p6':this.saturday[5].PS+'-'+this.saturday[5].PT,'p7':this.saturday[6].PS+'-'+this.saturday[6].PT,'p8':this.saturday[7].PS+'-'+this.saturday[7].PT}
          
          ,{'p1':this.sunday[0].PS+'-'+this.sunday[0].PT,'p2':this.sunday[1].PS+'-'+this.sunday[1].PT
          ,'p3':this.sunday[2].PS+'-'+this.sunday[2].PT,'p4':this.sunday[3].PS+'-'+this.sunday[3].PT,'p5':this.sunday[4].PS+'-'+this.sunday[4].PT
          ,'p6':this.sunday[5].PS+'-'+this.sunday[5].PT,'p7':this.sunday[6].PS+'-'+this.sunday[6].PT,'p8':this.sunday[7].PS+'-'+this.sunday[7].PT}
         ); 
     console.log('fetched atlast',mondaydata);
     this.timeTable.controls['timeTableDays'].setValue(mondaydata);
     this.timeTable.controls['hideclass'].setValue(this.classid);
     this.timeTable.controls['hidesection'].setValue(this.sectionid);
     
    
  }
//   onDisableUser(){
//     this.isDisable = true;
// }
  

}
