import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-fit-india-form',
  templateUrl: './fit-india-form.component.html',
  styleUrls: ['./fit-india-form.component.css']
})
export class FitIndiaFormComponent implements OnInit {

  studentmonthlyreport : FormGroup;
  month : any[];
  year: any[];
  option1 :any[];
  option2 :any[];
  option3 :any[];
  Date : Date = new Date();
  entry_month :Date;
  selectMonth : boolean= false;
  emisUsertype1 : any;
  save_fitIndia_records : any;
  certified_yn: string;
  participate_yn : any;
  students : any;
  flags : any;
  rating : any;
  videos_upload : any;
  photos_upload : any;
  month_value: any;
  year_value : any;
  schoolId : number;
  userTypeId : number;
  data : any;
  id: any;
  Id : string;
  school_type_id : number;
  constructor(private fb:FormBuilder,private schlService : schoolsService,private alertService:AlertService,private user:UserSessionService) { 
     this.schoolId = this.user.schoolId();
     this.userTypeId = this.user.userTypeId()
  }
  ngOnInit() {
    this.get_studentmonthlyreportform();
    this.year = [
      {label: "2019",value: "2019"},
      {label: "2020",value: "2020"},
    ],

    this.option1 =[
      {label:"Yes",value:'1'},
      {label:"No",value:'2'}
    ],

    this.option2 =[
      {label:"Yes",value:'1'},
      {label:"No",value:"2"}
    ],
  
    this.option3 =[
      {label:"None",value:"None"},
      {label:"3 Star",value:'1'},
      {label:"5 Star",value:"2"}
    ];
  }

  get_studentmonthlyreportform(){
    this.studentmonthlyreport = this.fb.group({
      certified_yn	: new FormControl(''),
      participate_yn : new FormControl('',null),
      students :new FormControl('',null),
      flags : new FormControl('',null),
      rating : new FormControl('',null),
      videos_upload :new FormControl('',null),
      photos_upload : new FormControl('',null),
      id : new FormControl('')
    })
  }
  getData(year,month){
     var emis_id = this.userTypeId;
     console.log(emis_id);
     var schlid = this.schoolId;
     this.schlService.getFitIndiaDetails(emis_id,schlid,month,year).subscribe((res) =>
     {
       this.data = res.List;
       console.log(this.data);
       this.selectMonth = true;

       if(this.data !== undefined)
       {
       this.studentmonthlyreport.patchValue(res.List[0]);
       console.log(this.studentmonthlyreport.value);
       if(this.studentmonthlyreport.value.participate_yn) {
        this.Select_Value(this.studentmonthlyreport.value.participate_yn);
      } 
       }
       else 
       {
         this.get_studentmonthlyreportform();
       }
     })
  }
  
  getMonth(event){
    if(event.target.value)
    {
      let stringToSplit = event.target.value;
      let x = stringToSplit.split("-");
      var year =x[0];
      this.year_value=year;
      console.log(this.year_value);
      var month =x[1];
      this.month_value = month;
      console.log(this.month_value)
      this.selectMonth = true;
      this.getData(year,month);
  }
  else{
      this.selectMonth = false;
  }
}

Select_Value(value){
 
  if(value == 1)
  {
    this.studentmonthlyreport.controls['students'].setValidators(Validators.required);
    this.studentmonthlyreport.controls['flags'].setValidators(Validators.required);
    this.studentmonthlyreport.controls['rating'].setValidators(Validators.required);
    this.studentmonthlyreport.controls['videos_upload'].setValidators(Validators.required);
    this.studentmonthlyreport.controls['photos_upload'].setValidators(Validators.required);
  }
  else {

    this.studentmonthlyreport.controls['students'].setValidators(null);
    this.studentmonthlyreport.controls['flags'].setValidators(null);
    this.studentmonthlyreport.controls['rating'].setValidators(null);
    this.studentmonthlyreport.controls['videos_upload'].setValidators(null);
    this.studentmonthlyreport.controls['photos_upload'].setValidators(null);
    this.studentmonthlyreport.controls['students'].setValue("");
    this.studentmonthlyreport.controls['flags'].setValue("");
    this.studentmonthlyreport.controls['rating'].setValue("");
    this.studentmonthlyreport.controls['videos_upload'].setValue("");
    this.studentmonthlyreport.controls['photos_upload'].setValue("");

  }
  this.studentmonthlyreport.controls['students'].updateValueAndValidity();
  this.studentmonthlyreport.controls['flags'].updateValueAndValidity();
  this.studentmonthlyreport.controls['rating'].updateValueAndValidity();
  this.studentmonthlyreport.controls['videos_upload'].updateValueAndValidity();
  this.studentmonthlyreport.controls['photos_upload'].updateValueAndValidity();

}
Submit(){
  if(this.id !== null)
  {
    
  this.id = this.studentmonthlyreport.value.id;
  this.certified_yn = this.studentmonthlyreport.value.certified_yn;
  this.participate_yn = this.studentmonthlyreport.value.participate_yn;
  this.students =this.studentmonthlyreport.value.students;
  this.flags = this.studentmonthlyreport.value.flags;
  this.rating = this.studentmonthlyreport.value.rating;
  this.videos_upload = this.studentmonthlyreport.value.videos_upload;
  this.photos_upload = this.studentmonthlyreport.value.photos_upload;
  this.save_fitIndia_records ={"records":{"id":this.id,"school_id":this.schoolId,"month":this.month_value,"year":this.year_value,"certified_yn": this.certified_yn,"participate_yn":this.participate_yn,"students":this.students,"flags":this.flags,"rating":this.rating,"photos_upload":this.photos_upload,"videos_upload":this.videos_upload}}
  console.log(this.save_fitIndia_records);
  this.schlService.get_SaveApi(this.save_fitIndia_records).subscribe((res) =>{
    
    if(res.dataStatus)
    {
       this.alertService.success(res.message);
    }
  else 
    {
      this.alertService.warning('Please fill all the fields');
    }
  });   
}
else if(this.id == null)
 {
  this.certified_yn = this.studentmonthlyreport.value.certified_yn;
  this.participate_yn = this.studentmonthlyreport.value.participate_yn;
  this.students =this.studentmonthlyreport.value.students;
  this.flags = this.studentmonthlyreport.value.flags;
  this.rating = this.studentmonthlyreport.value.rating;
  this.videos_upload = this.studentmonthlyreport.value.videos_upload;
  this.photos_upload = this.studentmonthlyreport.value.photos_upload;
  this.save_fitIndia_records ={"records":{"school_id":this.schoolId,"month":this.month_value,"year":this.year_value,"certified_yn": this.certified_yn,"participate_yn":this.participate_yn,"students":this.students,"flags":this.flags,"rating":this.rating,"photos_upload":this.photos_upload,"videos_upload":this.videos_upload}}
  console.log(this.save_fitIndia_records);
  this.schlService.get_SaveApi(this.save_fitIndia_records).subscribe((res) =>{
    
    if(res.dataStatus)
    {
       this.alertService.success(res.message);
    }
  else 
    {
      this.alertService.warning('Please fill all the fields');
    }
  });   
}
}
  }

