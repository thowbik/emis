import { Component, OnInit, ɵConsole } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm ,FormArray, Form,FormsModule,ReactiveFormsModule}  from '@angular/forms';
import { schoolsService } from '../schools.service';


@Component({
  selector: 'app-mastertimetable',
  templateUrl: './mastertimetable.component.html',
  styleUrls: ['./mastertimetable.component.css']
})
export class MastertimetableComponent implements OnInit {
  
  timeTable:FormGroup;
  classsection:FormGroup;
  submitform:FormGroup;
  title: any = [];
  classdet :any={classdetails:'',timetabledetails_monday:''};
  classsec:any={classdetails:''};
  monday:any[];
  tuesday:any[];
  wednesday:any[];
  thursday:any[];
  friday:any[];
  saturday:any[];
  sunday:any[];
  teacherlist:any[];
  volunteerteachers:any[];
  classid:any[];
  classlist:any;
  class:any;
  section:any;
  master:any;
  sectionid:any[];
  public schoolId: any;
  items = ['1', '2', '3','4', '5', '6','7', '8'];
  class_in_roman:any = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","LKG","UKG","PREKG"];
  assigned_section:any;
  _pdTeamForm: any;
  _router: any;
  data:any;
  masterclassid: any;
  deputationteachers: any;
  constructor( private cs:FormBuilder,private alertService: AlertService, private fb: FormBuilder,private timetable:schoolsService,private userSessionService: UserSessionService)
   {
    this.schoolId = this.userSessionService.schoolId();
  }

 
  ngOnInit()
 {
  //this.data = {"records":{"school_id":this.schoolId}}
  this.timetable.getclasslist(this.schoolId,true).subscribe(bb=>{console.log(bb)
  this.classsec=bb
  this.classlist=this.classsec['classdetails']

  this.classlist.map(i=> i['roman'] = this.class_in_roman[i['value']]);
  });

  this.data = {"records":{"school_id":this.schoolId,"class_id":'' , "section":''}}
   this.timetable.getmaster(this.data,true).subscribe(aa=>{console.log("Onload getsample",aa)
    // this.fetchOnTimeTable(aa);
    this.classdet=aa;
    this.teacherlist = this.classdet['teacherslist'];
    
    
    });
    this.classsection = this.cs.group(
      {
        class: ['', Validators.required],
        section: ['', Validators.required],
      });  
 this.timeTable = this.fb.group(
        {
            timeTableDays :this.fb.array([]), 
            hidesection:[],
            hideclass:[],
            hidemaster:[]
        });
        this.addTimeTable();
       
}
getSection()
 {
  if(this.classsection.valid)
  {
   // this.data = {"records":{"school_id":3509}}
  // let temparr = this.classsection.value;
  //  temparr["school_id"] = 3509;
  console.log(this.classsection.value);
 // return false;
   let temparr2 = {"forminputs" : this.classsection.value , "school_id" : this.schoolId };
  this.timetable.getmasterdata({"records":temparr2},true).subscribe(
    dataresult => {   
      if(dataresult['dataStatus'] == true) {
     
     
       this.fetchOnTimeTable(dataresult);
    
   
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
      //timeArr.push(this.createTimeTable()); 
      for(let i = 1; i<=7;i++)
        {
        timeArr.push(this.createTimeTable()); 
       // this.title[i] = this.getWeekDay(i,2);
        }
  }
  getWeekDay(i,flag)
 {
    let dayName = '';
    switch(i)
    {
      case 0:
         dayName = 'Monday';
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
 
 
 savemastertimetable()
  {
    var isShow=true;
    if(this.timeTable.valid)
    {
     console.log(this.timeTable.value);
     //return false;
      var timetabledata=this.timeTable.value;
      console.log(timetabledata);
      this.class=timetabledata.hideclass;
      this.section=timetabledata.hidesection;
      this.master=timetabledata.hidemaster;
       if(this.class==null || this.section==null)
      {
        
        this.alertService.info('please choose class And section!');
        return false;
      }
      else
      {
      //console.log(this.class);
     // return false;
     this.data = {"records":{"school_id":this.schoolId,"timetabledata":timetabledata}}
      this.timetable.addmastertimetableDetails( this.data,true).subscribe(
        dataresult => {
      // console.log(dataresult);
          if(dataresult['dataStatus'] == true) {
           
            this.alertService.success('Master Timetable Saved Successfully');
            this.fetchOnTimeTable(dataresult);
           
          
          }
          else {
    
    this.alertService.warning('Something wrong');  
         }
        });
      
     
    }
  }
   // this.dangerModal.hide();
   
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
    
    this.classdet=arg
   console.log( this.classdet,'fetch');
    this.teacherlist = this.classdet['teacherslist'];
    this.volunteerteachers = this.classdet['volunteerteachers'];
    this.deputationteachers = this.classdet['deputationteachers'];
    //console.log(this.teacherlist,'ts');
    this.classid=this.classdet['classid'];
    this.sectionid=this.classdet['sectionid'];
    this.masterclassid=this.classdet['masterclassid'];
    this.timeTable.controls['hideclass'].setValue(this.classid);
    this.timeTable.controls['hidesection'].setValue(this.sectionid);
    this.timeTable.controls['hidemaster'].setValue(this.masterclassid);
   // console.log(this.classid,'classid');
    //console.log(this.sectionid,'sectionid');
    this.monday = this.classdet['timetabledetails_monday'];
    var mlength=this.monday.length;
    console.log(mlength,'len');
    this.tuesday=this.classdet['timetabledetails_tuesday'];
    this.wednesday=this.classdet['timetabledetails_wednesday'];
    this.thursday=this.classdet['timetabledetails_thursday'];
    this.friday=this.classdet['timetabledetails_friday'];
    this.saturday=this.classdet['timetabledetails_saturday'];
    this.sunday=this.classdet['timetabledetails_sunday'];
    var mondaydata = new Array(); 
    if(mlength == 8)
  {
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
  }
  else
  {
    var length = mondaydata.push({'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'},
    
    {'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'},
    
    {'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'},
    
    {'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'},
    
    {'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'},
    
    {'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'},
    
    {'p1':'999'+'-'+'0','p2':'999'+'-'+'0','p3':'999'+'-'+'0','p4':'999'+'-'+'0','p5':'999'+'-'+'0'
    ,'p6':'999'+'-'+'0','p7':'999'+'-'+'0','p8':'999'+'-'+'0'}
   ); 

  }
     console.log('fetched atlast',mondaydata);
     this.timeTable.controls['timeTableDays'].setValue(mondaydata);
    
     
  }
  


}
