import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit ,ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { TabHeadingDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-it-profile',
  templateUrl: './it-profile.component.html',
  styleUrls: ['./it-profile.component.css']
})
export class ItProfileComponent implements OnInit {
  currentyear: any = new Date().getFullYear();
  lasttwodigit : any = new Date().getFullYear().toString().substr(2, 2); 
  currentyearminus = this.currentyear - 1;
  form:FormGroup;
  schlId: any;
  itform: FormGroup;
  class_sec:any;
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  classlist: any;
  classList:any;
  showData: boolean = false;
  section_id: any;
  studentlist: any;
  studentnamelist: any;
  assigned_section1: any;
  submitted1: boolean;
  getHealthData: any;
  submitted: boolean = false;
  isAddData: boolean = true;
  studentid: any;
  classid: any;
  filteredsection: any;
  sectionList: any[]=[];
  filter: any;
  get_value: any;
  itdata: number;
  indexid: any;
  acadamicyear: any = this.currentyearminus + '-' +this.lasttwodigit;  
  data: { records: { IndxID: string; SchlId: any; StudID: any; ClassID: any; AcadmcYr: string; QTxt: string; QAns: any; QTxt1: string; QAns1: string; QTxt2: string; QAns2: string; QTxt3: string; QAns3: string; QTxt4: string; QAns4: string; QTxt5: string; QAns5: string; ActSts: string; }; };
  constructor(private fb: FormBuilder,
    private el: ElementRef,
    private alertService: AlertService,
    private school: schoolsService,
    private session: UserSessionService) {
    this.schlId = this.session.schoolId();
    console.log("sch",this.schlId);
   }

  ngOnInit() { 
    this.initialValidator();
    this.getStudentclasslist();
  }
  initialValidator() {
    this.form = this.fb.group({
      class: ['', Validators.required],
      section: ['', Validators.required],
      studentname: ['', Validators.required]
    })
    this.itform = this.fb.group({
      'devices': new FormControl("",Validators.required),
      'laptop': new FormControl("", null),
      'internet_Facility': new FormControl("",null),
      'desktop': new FormControl("",null),
      'smartphone': new FormControl("",null),
      'television': new FormControl("",null)
    });
  }
  
  //API integration for school list
  getStudentclasslist() {
  debugger
  this.school.getStudentcovid(this.schlId).subscribe(res => {
    if (res) {
      this.class_sec = res.classdetails;
      if (this.class_sec.length > 0) {
        this.classlist = this.class_sec;
        this.classlist.map(i => i['roman'] = this.class_in_roman[i['value']]);
        this.classList = this.classlist.map(l => { return { label: l.roman, value: l.value }; });
      }
    }
  })
}

//class onchange event
  onChangeClass(e) {
    debugger
    this.itform.reset();
    this.showData = false;
    let filteredArary = this.class_sec.filter((element) => element.value == e);
    this.assigned_section1 = filteredArary[0].section;
  }

  //section onchange event
  onChangesection(e, c) {
    debugger;
  this.section_id = e;
  this.itform.reset();
  this.showData = false;
  var data = {
    "records":
    {
      "class_id": c,
      "section": this.section_id,
      "school_id": this.schlId
    }
  }
  this.school.getStudentwiselist(data).subscribe(res => {
    debugger;
    if (res.dataStatus) {
      this.studentlist = res.result;
      this.studentnamelist = [];
      if (this.studentlist.length > 0) {
        this.studentnamelist = this.studentlist.map(l => { return { label: l.name, value: l.id }; });
      }
    }
    else {
      this.studentnamelist = [];
    }
  })
  }
  
  //get data and student change
  onStudentChange(stuId, classId) {
    debugger
    this.itform.reset();
    this.studentid=stuId
    this.classid = classId
   this. getitprofile();
  }

  getitprofile(){
    var data = {
      "records":{
      "StudID":this.studentid
      }
      }
    this.school.getitprofile(data).subscribe(res=>{
      if(res.dataStatus){
        this.get_value = res.result;
        if( this.get_value[0].QAns1 == 0 ){
            this.itform.controls["laptop"].setValue("");          
        }
        if(this.get_value[0].QAns2 == 0){
          this.itform.controls["internet_Facility"].setValue("");
        }
        if(this.get_value[0].QAns3 == 0){
          this.itform.controls["desktop"].setValue("");
        }
        if(this.get_value[0].QAns4 == 0){
          this.itform.controls["smartphone"].setValue("");
        }
        if(this.get_value[0].QAns5 == 0 ){
          this.itform.controls["television"].setValue("");
        }
        this.indexid = this.get_value[0].IndxID
        if( res.result.length != 0){
          this.showData = true;
          this.itdata=2;
            this.itform.controls["devices"].setValue(this.get_value[0].QAns)       
            this.itform.controls["laptop"].setValue(this.itform.value.laptop)      
            this.itform.controls["internet_Facility"].setValue(this.itform.value.internet_Facility)       
            this.itform.controls["desktop"].setValue(this.itform.value.desktop)        
            this.itform.controls["smartphone"].setValue(this.itform.value.smartphone)        
            this.itform.controls["television"].setValue(this.itform.value.television)
        }
      }else{
        this.showData = true;
        this.itdata=1;
      }      
    }) 
  }
   
  update(){
    debugger
  if( this.itform.value.devices == 1){ 
    this.itform.controls['laptop'].setValidators(Validators.required);
    this.itform.controls['laptop'].updateValueAndValidity();
    this.itform.controls['internet_Facility'].setValidators(Validators.required);
    this.itform.controls['internet_Facility'].updateValueAndValidity();
    this.itform.controls['desktop'].setValidators(Validators.required);
    this.itform.controls['desktop'].updateValueAndValidity();
    this.itform.controls['smartphone'].setValidators(Validators.required);
    this.itform.controls['smartphone'].updateValueAndValidity();
    this.itform.controls['television'].setValidators(Validators.required);
    this.itform.controls['television'].updateValueAndValidity();
    
  }
  else{
    this.itform.controls['laptop'].setValidators(null);
    this.itform.controls['internet_Facility'].setValidators(null);
    this.itform.controls['desktop'].setValidators(null);
    this.itform.controls['smartphone'].setValidators(null);
    this.itform.controls['television'].setValidators(null); 
  }   
  this.submitted = true;
  if(this.itform.valid){
    if( this.itform.value.devices == 1){
      this.data= {"records":
      {
      "IndxID":this.indexid,    
      "SchlId":this.schlId,   
      "StudID":this.studentid,
      "ClassID":this.classid,
      "AcadmcYr": this.acadamicyear,
      "QTxt":"Do you have any smartphone,laptop,computer,tv or other multimedia devices in your home?",
      "QAns":this.itform.value.devices,
      "QTxt1":"Laptop",
      "QAns1":this.itform.value.laptop,
      "QTxt2":"Internet Facility",
      "QAns2":this.itform.value.internet_Facility,
      "QTxt3":"Desktop",
      "QAns3":this.itform.value.desktop,
      "QTxt4":"Smartphone",
      "QAns4":this.itform.value.smartphone,
      "QTxt5":"Television",
      "QAns5":this.itform.value.television,
      "ActSts":"1"
      }
      } 
    }else{
      this.data= {"records":
      {
      "IndxID":this.indexid,    
      "SchlId":this.schlId,   
      "StudID":this.studentid,
      "ClassID":this.classid,
      "AcadmcYr": this.acadamicyear,
      "QTxt":"Do you have any smartphone,laptop,computer,tv or other multimedia devices in your home?",
      "QAns":this.itform.value.devices,
      "QTxt1":"Laptop",
      "QAns1":"",
      "QTxt2":"Internet Facility",
      "QAns2":"",
      "QTxt3":"Desktop",
      "QAns3":"",
      "QTxt4":"Smartphone",
      "QAns4":"",
      "QTxt5":"Television",
      "QAns5":"",
      "ActSts":"1"
      }
      } 
    }
    this.school.saveitprofile(this.data).subscribe(res =>{
      this.alertService.success("Profile Updated Successfully ");
    })
    this.submitted = false;
    }
  else{
    this.alertService.error("Please Fill All The Fields")
  }
  }

  save(){
    debugger
    if( this.itform.value.devices == 1){
      this.itform.controls['laptop'].setValidators(Validators.required);
      this.itform.controls['laptop'].updateValueAndValidity();
      this.itform.controls['internet_Facility'].setValidators(Validators.required);
      this.itform.controls['internet_Facility'].updateValueAndValidity();
      this.itform.controls['desktop'].setValidators(Validators.required);
      this.itform.controls['desktop'].updateValueAndValidity();
      this.itform.controls['smartphone'].setValidators(Validators.required);
      this.itform.controls['smartphone'].updateValueAndValidity();
      this.itform.controls['television'].setValidators(Validators.required);
      this.itform.controls['television'].updateValueAndValidity();
    }
    else{
      this.itform.controls['laptop'].setValidators(null);
      this.itform.controls['internet_Facility'].setValidators(null);
      this.itform.controls['desktop'].setValidators(null);
      this.itform.controls['smartphone'].setValidators(null);
      this.itform.controls['television'].setValidators(null); 
    }   
    this.submitted = true;
    if(this.itform.valid){
    if( this.itform.value.devices == 1){
      this.data = {"records":
      {
      "IndxID":"",    
      "SchlId":this.schlId,   
      "StudID":this.studentid,
      "ClassID":this.classid,
      "AcadmcYr":this.acadamicyear,
      "QTxt":"Do you have any smartphone,laptop,computer,tv or other multimedia devices in your home?",
      "QAns":this.itform.value.devices,
      "QTxt1":"Laptop",
      "QAns1":this.itform.value.laptop,
      "QTxt2":"Internet Facility",
      "QAns2":this.itform.value.internet_Facility,
      "QTxt3":"Desktop",
      "QAns3":this.itform.value.desktop,
      "QTxt4":"Smartphone",
      "QAns4":this.itform.value.smartphone,
      "QTxt5":"Television",
      "QAns5":this.itform.value.television,
      "ActSts":"1"
      }
      } 
    }
    else{
      this.data = {"records":
      {
      "IndxID":"",    
      "SchlId":this.schlId,   
      "StudID":this.studentid,
      "ClassID":this.classid,
      "AcadmcYr":this.acadamicyear,
      "QTxt":"Do you have any smartphone,laptop,computer,tv or other multimedia devices in your home?",
      "QAns":this.itform.value.devices,
      "QTxt1":"Laptop",
      "QAns1":"",
      "QTxt2":"Internet Facility",
      "QAns2":"",
      "QTxt3":"Desktop",
      "QAns3":"",
      "QTxt4":"Smartphone",
      "QAns4":"",
      "QTxt5":"Television",
      "QAns5":"",
      "ActSts":"1"
      }
      } 
    }     
      this.school.saveitprofile(this.data).subscribe(res =>{
        this.alertService.success("Profile Saved Successfully");
        this. getitprofile();
        this.itdata=2;
      })
      this.submitted = false;
    }
  else{
    this.alertService.error("Please Fill All The Fields")
   }
  }
}
