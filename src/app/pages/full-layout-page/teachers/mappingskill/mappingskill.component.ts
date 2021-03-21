import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { TeacherService } from '../teacher.service';


@Component({
  selector: 'app-mappingskill',
  templateUrl: './mappingskill.component.html',
  styleUrls: ['./mappingskill.component.css']
})
export class MappingskillComponent implements OnInit {
  form:FormGroup;
  submitted:boolean = false;
  teacher_id: any;
  data: { records: ({ teacher_id: any; q_id: string; q_type: string; response_int: any; response_char: string; isactive: string; } | { teacher_id: any; q_id: string; q_type: string; response_int: string; response_char: any; isactive: string; })[]; };
  get_value: any;
  bankdata:number;
  id: any[]=[];
  datas: { records: ({ id: any; teacher_id: any; q_id: string; q_type: string; response_int: any; response_char: string; isactive: string; } | { teacher_id: any; q_id: string; q_type: string; response_int: any; response_char: any; isactive: string; id?: undefined; })[]; };
  constructor(private teacherservice: TeacherService,private fb: FormBuilder, private alert: AlertService, private userSessionService: UserSessionService) { 
  this.teacher_id = this.userSessionService.userId();    
  }

  ngOnInit() {
   this.initialValidator();
   this.getdetails();
  }

  initialValidator() {
    this.form = this.fb.group({
      training: ['', Validators.required],
      additional_orientation: ['', Validators.required],
      technique_in_classroom: ['', Validators.required],
      positive_changes: ['', Validators.required],
      useful_programme: ['', Validators.required],
      technic_obtained: ['', Validators.required],
      feedback: ['', Validators.required],
      additional_material: ['', Validators.required],
      remarks: ['', Validators.required],
      innovated_methodology: ['', Validators.required],
      materials_need:["",null]
    })
  }

  getdetails(){    
    this.teacherservice.getmappingskill(this.teacher_id).subscribe(res=>{
      this.get_value = res.result
      for(var i=0; i<this.get_value.length;i++){
        this.id.push({ value: this.get_value[i].id})
      }
      if( res.result.length != 0){
        this.bankdata=2;
        if(this.get_value[0].q_id == 1){
          this.form.controls["training"].setValue(this.get_value[0].response_int)
        }
          if(this.get_value[1].q_id == 2){
            this.form.controls["additional_orientation"].setValue(this.get_value[1].response_int)
        }
         if(this.get_value[2].q_id == 3){
          this.form.controls["technique_in_classroom"].setValue(this.get_value[2].response_int)
        }
         if(this.get_value[3].q_id == 4){
          this.form.controls["positive_changes"].setValue(this.get_value[3].response_int)
        }
         if(this.get_value[4].q_id == 5){
          this.form.controls["useful_programme"].setValue(this.get_value[4].response_int)
        }
         if(this.get_value[5].q_id == 6){
          this.form.controls["technic_obtained"].setValue(this.get_value[5].response_char)
        }
         if(this.get_value[6].q_id == 7){
          this.form.controls["feedback"].setValue(this.get_value[6].response_char)
        }
          if(this.get_value[7].q_id == 8){
            this.form.controls["additional_material"].setValue(this.get_value[7].response_int)
            this.form.controls["materials_need"].setValue(this.get_value[7].response_char)
        }
         if(this.get_value[8].q_id == 9){
          this.form.controls["remarks"].setValue(this.get_value[8].response_char)
        }
         if(this.get_value[9].q_id == 10){
          this.form.controls["innovated_methodology"].setValue(this.get_value[9].response_char)
        }
      }else{
        this.bankdata=1;
      }
    })
  }

  update(){
    if(this.form.value.additional_material == 1){
      this.form.controls['materials_need'].setValidators(Validators.required);
      this.form.controls['materials_need'].updateValueAndValidity();
    }else{
      this.form.controls['materials_need'].setValidators(null);
    }
    this.submitted = true;   
    if(this.form.valid){      
        if(this.form.value.additional_material == 1){
              this.datas = {"records":
              [{
              "id":this.id[0].value,
              "teacher_id":this.teacher_id,
              "q_id":"1",
              "q_type":"1",
              "response_int":this.form.value.training,
              "response_char":"",
              "isactive":"1"
              },{
              "id":this.id[1].value,
              "teacher_id":this.teacher_id,
              "q_id":"2",
              "q_type":"1",
              "response_int":this.form.value.additional_orientation,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[2].value, 
              "teacher_id":this.teacher_id,
              "q_id":"3",
              "q_type":"1",
              "response_int":this.form.value.technique_in_classroom,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[3].value,
              "teacher_id":this.teacher_id,
              "q_id":"4",
              "q_type":"1",
              "response_int":this.form.value.positive_changes,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[4].value,
              "teacher_id":this.teacher_id,
              "q_id":"5",
              "q_type":"1",
              "response_int":this.form.value.useful_programme,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[5].value,
              "teacher_id":this.teacher_id,
              "q_id":"6",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.technic_obtained,
              "isactive":"1"
              },{
                "id":this.id[6].value,
              "teacher_id":this.teacher_id,
              "q_id":"7",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.feedback,
              "isactive":"1"
              },{
                "id":this.id[7].value,
              "teacher_id":this.teacher_id,
              "q_id":"8",
              "q_type":"3",
              "response_int":this.form.value.additional_material,
              "response_char":this.form.value.materials_need,
              "isactive":"1"
              },{
                "id":this.id[8].value,
              "teacher_id":this.teacher_id,
              "q_id":"9",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.remarks,
              "isactive":"1"
              },{
                "id":this.id[9].value,
              "teacher_id":this.teacher_id,
              "q_id":"10",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.innovated_methodology,
              "isactive":"1"
              }] 
              }
              }else{
              this.datas= {"records":
              [{
                "id":this.id[0].value,
              "teacher_id":this.teacher_id,
              "q_id":"1",
              "q_type":"1",
              "response_int":this.form.value.training,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[1].value,
              "teacher_id":this.teacher_id,
              "q_id":"2",
              "q_type":"1",
              "response_int":this.form.value.additional_orientation,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[2].value,
              "teacher_id":this.teacher_id,
              "q_id":"3",
              "q_type":"1",
              "response_int":this.form.value.technique_in_classroom,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[3].value,
              "teacher_id":this.teacher_id,
              "q_id":"4",
              "q_type":"1",
              "response_int":this.form.value.positive_changes,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[4].value,
              "teacher_id":this.teacher_id,
              "q_id":"5",
              "q_type":"1",
              "response_int":this.form.value.useful_programme,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[5].value,
              "teacher_id":this.teacher_id,
              "q_id":"6",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.technic_obtained,
              "isactive":"1"
              },{
                "id":this.id[6].value,
              "teacher_id":this.teacher_id,
              "q_id":"7",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.feedback,
              "isactive":"1"
              },{
                "id":this.id[7].value,
              "teacher_id":this.teacher_id,
              "q_id":"8",
              "q_type":"3",
              "response_int":this.form.value.additional_material,
              "response_char":"",
              "isactive":"1"
              },{
                "id":this.id[8].value,
              "teacher_id":this.teacher_id,
              "q_id":"9",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.remarks,
              "isactive":"1"
              },{
                "id":this.id[9].value,
              "teacher_id":this.teacher_id,
              "q_id":"10",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.innovated_methodology,
              "isactive":"1"
              }] 
              }
              }
    this.teacherservice.updatemappingskill(this.datas).subscribe(res=>{
    this.alert.success(res.message) 
    this.ngOnInit(); 
    })            
    }else{
     this.alert.error("Please Fill All The Fields")
    }
  }

  save(){    
    if(this.form.value.additional_material == 1){
      this.form.controls['materials_need'].setValidators(Validators.required);
      this.form.controls['materials_need'].updateValueAndValidity();
    }else{
      this.form.controls['materials_need'].setValidators(null);
    }
    this.submitted = true;   
    if(this.form.valid){ 
        if(this.form.value.additional_material == 1){
              this.data = {"records":
              [{
              "teacher_id":this.teacher_id,
              "q_id":"1",
              "q_type":"1",
              "response_int":this.form.value.training,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"2",
              "q_type":"1",
              "response_int":this.form.value.additional_orientation,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"3",
              "q_type":"1",
              "response_int":this.form.value.technique_in_classroom,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"4",
              "q_type":"1",
              "response_int":this.form.value.positive_changes,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"5",
              "q_type":"1",
              "response_int":this.form.value.useful_programme,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"6",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.technic_obtained,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"7",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.feedback,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"8",
              "q_type":"3",
              "response_int":this.form.value.additional_material,
              "response_char":this.form.value.materials_need,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"9",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.remarks,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"10",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.innovated_methodology,
              "isactive":"1"
              }] 
              }
              }else{
              this.data = {"records":
              [{
              "teacher_id":this.teacher_id,
              "q_id":"1",
              "q_type":"1",
              "response_int":this.form.value.training,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"2",
              "q_type":"1",
              "response_int":this.form.value.additional_orientation,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"3",
              "q_type":"1",
              "response_int":this.form.value.technique_in_classroom,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"4",
              "q_type":"1",
              "response_int":this.form.value.positive_changes,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"5",
              "q_type":"1",
              "response_int":this.form.value.useful_programme,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"6",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.technic_obtained,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"7",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.feedback,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"8",
              "q_type":"3",
              "response_int":this.form.value.additional_material,
              "response_char":"",
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"9",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.remarks,
              "isactive":"1"
              },{
              "teacher_id":this.teacher_id,
              "q_id":"10",
              "q_type":"2",
              "response_int":"",
              "response_char":this.form.value.innovated_methodology,
              "isactive":"1"
              }] 
              }
              }
    this.teacherservice.savemappingskill(this.data).subscribe(res=>{
    this.alert.success("Feedback Submitted Successfully")  ;
    this.ngOnInit(); 
    })
            
    }else{
     this.alert.error("Please Fill All The Fields")
    }
  }
}