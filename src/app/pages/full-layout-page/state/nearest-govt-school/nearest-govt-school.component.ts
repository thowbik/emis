import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-nearest-govt-school',
  templateUrl: './nearest-govt-school.component.html',
  styleUrls: ['./nearest-govt-school.component.css']
})
export class NearestGovtSchoolComponent implements OnInit {
  data : any;
  cols : {field : string,header : string}[];
  exportExcelData : any[]=[];
  govtSchoolForm : FormGroup;
  school : {label:string,value:string}[];
  schlTypeid : number;
  schoolTypeIdValue : any;
  userTypeId : number;
  teacherType : number;
  showDialogBox: boolean = false;
  teacher_id : any;
  submitted : boolean = false;
  save_schl_records:any;
  getpopup : any;
  school_key_id : any;
  usertypeId : number;
  decimalpattern :any = '[0-9]+.[0-9]$';
  savedata: any;
  distance_pri : number;
  distance_upr : number;
  distance_sec : number;
  distance_hsec : number;
  All_Weather_Road : any;
  userId : any;

  constructor(private stateService:StateService,private fb:FormBuilder,private routers : Router,private userSessionService:UserSessionService,private alertService : AlertService) {
   
    this.userTypeId = this.userSessionService.userTypeId();
    this.teacherType = this.userSessionService.teacherType();
    this.userId = this.userSessionService.userId();
    console.log(this.userId);

    this.school =[
      {label : "Government", value : "1"},
      {label : "Fully Aided", value : "2"},
      {label : "Unaided", value : "3"},
      {label : "Partially Aided", value : "4"},
      {label : "Central Government", value : "5"},

    ]
   }

  ngOnInit() {
    this.getgovtschoolreport();
    this.cols = [
      {field : 'block_name',header : 'Block'},
      {field : 'udise_code',header :  'UDISE Code'},
      {field : 'school_name',header : 'School Name'},
      {field : 'school_type',header : 'School Type'},
      {field : 'cate_type',header : 'Category'},
      {field : 'latitude',header : 'Latitude'},
      {field : 'longitude',header : 'Longitude'},
      {field : 'distance_pri',header : 'Distance from Primary School in km'},
      {field : 'distance_upr',header : 'Distance from UpperPrimary School in km'},
      {field : 'distance_sec',header : 'Distance from Secondary School in km'},
      {field : 'distance_hsec',header : 'Distance from Hr Secondary School in km'},
      {field : 'All_Weather_Road',header : 'Connected by All Weather Road'}

    ];

    this.govtSchoolForm = this.fb.group({
      distance_pri : new FormControl('',[Validators.required,Validators.pattern(this.decimalpattern)]), 
      distance_upr :  new FormControl('',[Validators.required,Validators.pattern(this.decimalpattern)]),
      distance_sec :  new FormControl('',[Validators.required,Validators.pattern(this.decimalpattern)]),
      distance_hsec : new FormControl('',[Validators.required,Validators.pattern(this.decimalpattern)]), 
      All_Weather_Road : new FormControl('', Validators.required),
      distance_road: new FormControl('', null),
    });
  }




  get f() { 
    return this.govtSchoolForm.controls; 
  }
  
  getgovtschoolreport()
  {
    const schltypeid = 1;
    this.stateService.getSchlReportData(schltypeid).subscribe(res =>{
      this.data = res.result.nearest_school_list;
      console.log(this.data);
    })

  }

  getschoolreports(){
    this.exportExcelData = [];
    return this.data.map(item =>{
      return{
        'Block' : item.block_name,
        'UDISE Code':item.udise_code,
        'School Name':item.school_name,
        'School Type':item.school_type,
        'Category':item.cate_type,
        'Latitude':item.latitude,
        'Longitude' :item.longitude,
        'Distance from Primary School in km' :item.distance_pri,
        'Distance from UpperPrimary School in km' :item.distance_upr,
        'Distance from Secondary School in km' :item.distance_sec,
        'Distance from Hr Secondary School in km': item.distance_hsec,
        'Connected by All Weather Road': item.All_Weather_Road,
      }
    });
  }
exportExcel() {
  import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getschoolreports());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "primengTable");
    });
}


saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}

schltypevalues(event){
  this.schoolTypeIdValue=event.value;
  console.log(this.schoolTypeIdValue);
}

getData(){ 
  this.stateService.getSchlReportData(this.schoolTypeIdValue).subscribe(res =>{
    this.data = res.result.nearest_school_list;
    console.log(this.data);
  })
} 
getschoolpopup(school_key_id,distance_pri,distance_upr,distance_sec,distance_hsec,All_Weather_Road){
  if(this.usertypeId == 5)
  {
    this.showDialogBox=false;
  }
  else
  {
  this.showDialogBox=true;
  this.school_key_id= school_key_id;
  this.govtSchoolForm.controls['distance_pri'].setValue(distance_pri);
  this.govtSchoolForm.controls['distance_upr'].setValue(distance_upr);
  this.govtSchoolForm.controls['distance_sec'].setValue(distance_sec);
  this.govtSchoolForm.controls['distance_hsec'].setValue(distance_hsec);
  this.govtSchoolForm.controls['All_Weather_Road'].setValue(All_Weather_Road);
}
}

onRoadReset(value) {
  if (value == 2) {
    this.govtSchoolForm.controls['distance_road'].setValidators(Validators.required);
  }
  else {
    this.govtSchoolForm.controls['distance_road'].setValue("");
    this.govtSchoolForm.controls['distance_road'].setValidators(null);
  }
  this.govtSchoolForm.controls['distance_road'].updateValueAndValidity();
}


save(){
  
  // this.submitted = true;
  // if (this.govtSchoolForm.valid) { 
  //   alert("submitted"); 
  // }

  this.getpopup = [
    { 'distance_pri': this.govtSchoolForm.value.distance_pri, 'distance_upr': this.govtSchoolForm.value.distance_upr, 'distance_sec': this.govtSchoolForm.value.distance_sec, 'distance_hsec' : this.govtSchoolForm.value.distance_hsec,'All_Weather_Road': this.govtSchoolForm.value.All_Weather_Road,'distance_road': this.govtSchoolForm.value.distance_road},
  ];
  this.save_schl_records={"records":{"school_key_id":this.school_key_id,"distance_pri":this.getpopup[0]['distance_pri'],"distance_upr":this.getpopup[0]['distance_upr'],"distance_sec":this.getpopup[0]['distance_sec'],"distance_hsec": this.getpopup[0]['distance_hsec'],"All_Weather_Road": this.getpopup[0]['All_Weather_Road'],"distance_road": this.getpopup[0]['distance_road']}}   
 console.log(this.save_schl_records);
  this.submitted = true;
  if (this.govtSchoolForm.valid) { 
    this.stateService.getSchlDetails(this.save_schl_records).subscribe((result) =>{
      console.log(result);
      
      if(result.dataStatus){
        this.alertService.success(result.message); 
         this.getgovtschoolreport();
       
      }
      else {
        this.alertService.warning('Something wrong');
      }
      
    });
  }
  }


close_dialog(){
  this.showDialogBox=false;
  }
}


