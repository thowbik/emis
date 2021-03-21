import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-fixation',
  templateUrl: './staff-fixation.component.html',
  styleUrls: ['./staff-fixation.component.css']
})

export class StaffFixationComponent implements OnInit {
  public dataHeader: any[] = [];
  public staffList: any;
  public sesnId: any;
  public userTypeId: number;
  public deinedurl: any;
  public districtId: any;
  // guidelines:any[] = [];
  displayDialog: boolean;
  dialogTitle : string;
  staffFixationDSEForm: FormGroup;
  AcademicStream : any[] =[];
  em_temparr = [0,0,0,0,0,0];
  tm_temparr = [0,0,0,0,0,0];
  submitted: boolean = false;
  teacherPanelId: string;
  vacantData: any;
  constructor(private session: UserSessionService, 
              private service : TeacherService,
              private alert: AlertService,
              private builder: FormBuilder) { 
    /* ✦ ID from session */
    this.userTypeId = +this.session.userTypeId();
    this.deinedurl= './assets/img/AccessDeniedError.png';
    switch(this.userTypeId){
      case 9:
        console.info('I am In CEO Login',this.userTypeId);
        
        this.districtId = this.session.districtId();
        this.sesnId = this.session.offKeyId(); // here session id is an office key id .............
        break;
      default:
        this.sesnId = '';
        console.info('can`t found usertype id');
        break;
    }
  }

  ngOnInit() {
    this.dataHeader = [{field: 'udise_code', header: 'UDISE Code' },
      { field: 'school_name', header: 'School Name' },
      { field: 'school_name', header: 'Block Name' },
      { field: 'category', header: 'Category' },
      { field: 'school_category_type', header: 'Type' }];
    this.getStaffListData();
    this.initialValidator();
  }

  initialValidator() {
    this.staffFixationDSEForm = this.builder.group({
      'id': new FormControl(''),
      'school_id': new FormControl(''),
      'class_1_5_em': new FormControl(''),
      'class_6_em': new FormControl(''),
      'class_7_em': new FormControl(''),
      'class_8_em': new FormControl(''),
      'class_9_em': new FormControl(''),
      'class_10_em': new FormControl(''),
      'class_6_8_em_total': new FormControl(''),
      'class_9_10_em_total': new FormControl(''),
      'class_6_10_em_total': new FormControl(''),
      'class_1_5_tm': new FormControl(''),
      'class_6_tm': new FormControl(''),
      'class_7_tm': new FormControl(''),
      'class_8_tm': new FormControl(''),
      'class_9_tm': new FormControl(''),
      'class_10_tm': new FormControl(''),
      'class_6_8_tm_total': new FormControl(''),
      'class_9_10_tm_total': new FormControl(''),
      'class_6_10_tm_total': new FormControl(''),
      'section_1_5': new FormControl(''),
      'section_6_8': new FormControl(''),
      'section_9_10': new FormControl(''),
      'section_6_10': new FormControl(''),
      'posts_by_tt': new FormControl(''),
      'elig_sg': new FormControl(''),
      'elig_bt_sci': new FormControl(''),
      'elig_bt_mat': new FormControl(''),
      'elig_bt_eng': new FormControl(''),
      'elig_bt_tam': new FormControl(''),
      'elig_bt_ss': new FormControl(''),
      'elig_bt_total': new FormControl(''),
      'elig_total': new FormControl(''),
      'pg_period_sg': new FormControl(''),
      'pg_period_bt_sci': new FormControl(''),
      'pg_period_bt_mat': new FormControl(''),
      'pg_period_bt_eng': new FormControl(''),
      'pg_period_bt_tam': new FormControl(''),
      'pg_period_bt_ss': new FormControl(''),
      'pg_period_bt_total': new FormControl(''),
      'pg_period_total': new FormControl(''),
      'net_sg': new FormControl(''),
      'net_bt_sci': new FormControl(''),
      'net_bt_mat': new FormControl(''),
      'net_bt_eng': new FormControl(''),
      'net_bt_tam': new FormControl(''),
      'net_bt_ss': new FormControl(''),
      'net_bt_total': new FormControl(''),
      'net_total': new FormControl(''),
      'sanc_sg': new FormControl(''),
      'sanc_bt_sci': new FormControl(''),
      'sanc_bt_mat': new FormControl(''),
      'sanc_bt_eng': new FormControl(''),
      'sanc_bt_tam': new FormControl(''),
      'sanc_bt_ss': new FormControl(''),
      'sanc_bt_total': new FormControl(''),
      'sanc_total': new FormControl(''),
      'surplus_sg': new FormControl(''),
      'surplus_bt_sci': new FormControl(''),
      'surplus_bt_mat': new FormControl(''),
      'surplus_bt_eng': new FormControl(''),
      'surplus_bt_tam': new FormControl(''),
      'surplus_bt_ss': new FormControl(''),
      'surplus_bt_total': new FormControl(''),
      'surplus_total': new FormControl(''),
      'need_sg': new FormControl(''),
      'need_bt_sci': new FormControl(''),
      'need_bt_mat': new FormControl(''),
      'need_bt_eng': new FormControl(''),
      'need_bt_tam': new FormControl(''),
      'need_bt_ss': new FormControl(''),
      'need_bt_total': new FormControl(''),
      'need_total': new FormControl(''),
      'in_position_sg': new FormControl(''),
      'in_position_bt_sci': new FormControl(''),
      'in_position_bt_mat': new FormControl(''),
      'in_position_bt_eng': new FormControl(''),
      'in_position_bt_tam': new FormControl(''),
      'in_position_bt_ss': new FormControl(''),
      'in_position_bt_total': new FormControl(''),
      'in_position_total': new FormControl(''),
      'vacant_sg': new FormControl(''),
      'vacant_bt_sci': new FormControl(''),
      'vacant_bt_mat': new FormControl(''),
      'vacant_bt_eng': new FormControl(''),
      'vacant_bt_tam': new FormControl(''),
      'vacant_bt_ss': new FormControl(''),
      'vac_4':  new FormControl('', Validators.required),
      'vacant_bt_total': new FormControl(''),
      'vacant_total': new FormControl(''),
      'status': new FormControl(''),
      "tbl_name": new FormControl('staffix_dse_sg_bt',null),
      // updated_at
    });
    
  }
  
  
  getStaffListData() {
    this.service.getSchoolListForStaffFixation(this.districtId).subscribe((res) => {
      if (res.dataStatus) {
        this.staffList = res['result'];
      } else { this.alert.warning(res['message']);}
    },err=>{this.alert.error(err)});
  }
  is_hrsec_school: boolean;
  onDialog(rowdata){
    debugger;
    this.submitted = false;
  //  console.log('rowdata',rowdata.catty_id);
  if(Number(rowdata.catty_id) == 4){
    this.is_hrsec_school = false;
  }else{
    this.is_hrsec_school = true;
  }

   this.staffFixationDSEForm.reset();
   this.em_temparr = [0,0,0,0,0,0];
   this.tm_temparr = [0,0,0,0,0,0];
   this.elig_sg_temparr = [0,0,0,0,0,0];
   this.pg_period_sg_temparr = [0,0,0,0,0,0];
   this.net_sg_temparr = [0,0,0,0,0,0];
   this.sanc_sg_temparr = [0,0,0,0,0,0];
   this.surplus_sg_temparr = [0,0,0,0,0,0];
   this.need_sg_temparr = [0,0,0,0,0,0];
   this.in_position_sg_temparr = [0,0,0,0,0,0];
   this.vacant_sg_temparr = [0,0,0,0,0,0];
   this.staffFixationDSEForm.controls['school_id'].setValue(rowdata.school_id);
   this.staffFixationDSEForm.controls['id'].setValue(rowdata.id);
   this.staffFixationDSEForm.controls['status'].setValue(1);
   this.dialogTitle = "Staff Fixation Entry for "+rowdata.school_name+" ("+rowdata.udise_code+"), "+rowdata.district_name+"";
   this.service.getDSEStaffFixationDetails(rowdata.school_id).subscribe((res) => {
    if (res.status == 200){
      this.teacherPanelId = "0";
      if(res.result.teacher_panel.length > 0) {
        const teacherPanelData = res.result.teacher_panel
        this.teacherPanelId = teacherPanelData[0].id;
        var vac_4 = teacherPanelData[0].vac_4 ? teacherPanelData[0].vac_4 : ""; 
        this.staffFixationDSEForm.controls['vac_4'].setValue(vac_4);
                }
      if(res.result.staff_fixation.length > 0){
        let result = res.result.staff_fixation;
        this.staffFixationDSEForm.patchValue(result);
        // this.staffFixationDSEForm.controls['status'].setValue(2);
        // result.forEach((key,val) => { if(result[key] == null || result[key] == ''){ val = 0 }});
        
        this.em_temparr[1] = result['class_6_em'];this.em_temparr[2] = result['class_7_em'];
        this.em_temparr[3] = result['class_8_em'];this.em_temparr[4] = result['class_9_em'];
        this.em_temparr[5] = result['class_10_em'];this.tm_temparr[1] = result['class_6_tm'];
        this.tm_temparr[2] = result['class_7_tm'];this.tm_temparr[3] = result['class_8_tm'];
        this.tm_temparr[4] = result['class_9_tm'];this.tm_temparr[5] = result['class_10_tm'];

        this.esValidation();
        
        this.elig_sg_temparr[0] =  result['elig_sg'];
        this.elig_sg_temparr[1] =  result['elig_bt_tam'];
        this.elig_sg_temparr[2] =  result['elig_bt_eng'];
        this.elig_sg_temparr[3] =  result['elig_bt_mat'];
        this.elig_sg_temparr[4] =  result['elig_bt_sci'];
        this.elig_sg_temparr[5] =  result['elig_bt_ss'];

        this.pg_period_sg_temparr[0] =  result['pg_period_sg'];
        this.pg_period_sg_temparr[4] =  result['pg_period_bt_sci'];
        this.pg_period_sg_temparr[3] =  result['pg_period_bt_mat'];
        this.pg_period_sg_temparr[2] =  result['pg_period_bt_eng'];
        this.pg_period_sg_temparr[1] =  result['pg_period_bt_tam'];
        this.pg_period_sg_temparr[5] =  result['pg_period_bt_ss'];
        
        this.net_sg_temparr[0] =result['net_sg'];
        this.net_sg_temparr[4] =result['net_bt_sci'];
        this.net_sg_temparr[3] =result['net_bt_mat'];
        this.net_sg_temparr[2] =result['net_bt_eng'];
        this.net_sg_temparr[1] =result['net_bt_tam'];
        this.net_sg_temparr[5] =result['net_bt_ss'];
        
        this.sanc_sg_temparr[0] = result['sanc_sg']
        this.sanc_sg_temparr[4] = result['sanc_bt_sci'];
        this.sanc_sg_temparr[3] = result['sanc_bt_mat'];
        this.sanc_sg_temparr[2] = result['sanc_bt_eng'];
        this.sanc_sg_temparr[1] = result['sanc_bt_tam'];
        this.sanc_sg_temparr[5] = result['sanc_bt_ss'];
        
        this.surplus_sg_temparr[0] = result['surplus_sg'];
        this.surplus_sg_temparr[4] = result['surplus_bt_sci'];
        this.surplus_sg_temparr[3] = result['surplus_bt_mat'];
        this.surplus_sg_temparr[2] = result['surplus_bt_eng'];
        this.surplus_sg_temparr[1] = result['surplus_bt_tam'];
        this.surplus_sg_temparr[5] = result['surplus_bt_ss'];
        
        this.need_sg_temparr[0] = result['need_sg'];
        this.need_sg_temparr[4] =result['need_bt_sci']
        this.need_sg_temparr[3] =result['need_bt_mat']
        this.need_sg_temparr[2] =result['need_bt_eng']
        this.need_sg_temparr[1] =result['need_bt_tam']
        this.need_sg_temparr[5] =result['need_bt_ss']
        
        this.in_position_sg_temparr[0] =result['in_position_sg'];
        this.in_position_sg_temparr[4] =result['in_position_bt_sci'];
        this.in_position_sg_temparr[3] =result['in_position_bt_mat'];
        this.in_position_sg_temparr[2] =result['in_position_bt_eng'];
        this.in_position_sg_temparr[1] =result['in_position_bt_tam'];
        this.in_position_sg_temparr[5] =result['in_position_bt_ss'];

        
        this.vacant_sg_temparr[0] = result['vacant_sg'];
        this.vacant_sg_temparr[4] = result['vacant_bt_sci'];
        this.vacant_sg_temparr[3] = result['vacant_bt_mat'];
        this.vacant_sg_temparr[2] = result['vacant_bt_eng'];
        this.vacant_sg_temparr[1] = result['vacant_bt_tam'];
        this.vacant_sg_temparr[5] = result['vacant_bt_ss'];
    } 
  }
    else { this.alert.warning(res['message']);}
    this.displayDialog = true;
   },err=>{this.alert.error(err)}); 
  }
  
  medValidation(event,inx,flag,tmp_arr,key_arr){
    
    let value = Number(event);
    flag == 1 ? tmp_arr[inx] = value : '';
    let ttl_6to8 = 0; 
    let ttl_9and10 = 0; 
    let overall_ttl = 0;
    ttl_6to8 = Number(tmp_arr[1])+Number(tmp_arr[2])+Number(tmp_arr[3]);
    ttl_9and10 = Number(tmp_arr[4])+Number(tmp_arr[5]);
    overall_ttl = ttl_6to8 + ttl_9and10;
    
    if(flag == 1){
      this.staffFixationDSEForm.controls[key_arr[0]].setValue(ttl_6to8);
      this.staffFixationDSEForm.controls[key_arr[1]].setValue(ttl_9and10);
      this.staffFixationDSEForm.controls[key_arr[2]].setValue(overall_ttl);
    }
    else if(flag == 2){ 
      
      if(ttl_6to8 != 0){
        if (value > ttl_6to8){
          alert('The sum of class VI TO VIII is '+ttl_6to8+' but Given value is'+Number(value));
          this.staffFixationDSEForm.controls[key_arr[0]].setValue(ttl_6to8);
    
            let _ff = Number(this.staffFixationDSEForm.get(key_arr[0]).value);
            let _sf = Number(this.staffFixationDSEForm.get(key_arr[1]).value);
            let _tf = Number(_ff+_sf);
            overall_ttl = ttl_6to8 + ttl_9and10;
            if(_tf != overall_ttl){
              let message = "Alert ! The Sum of Class VI,VIII,VIII,IX And X is "+overall_ttl+"<br/> But You Entered in Total VI to VIII is"+_ff+" along with Total IX and X is "+_sf+"<br/> Grand Total is "+_tf+"<br/> So Overwrite Existing Data ( "+overall_ttl+" into "+_tf+" ) in Total VI to X Field!";
              console.log(message);// alert(message);
              overall_ttl = _tf;
            }
        }
        else{
            let _ff = Number(this.staffFixationDSEForm.get(key_arr[0]).value);
            let _sf = Number(this.staffFixationDSEForm.get(key_arr[1]).value);
            let _tf = Number(_ff+_sf);
            overall_ttl = value + ttl_9and10;
            if(_tf != overall_ttl){
              let message = "Alert ! The Sum of Class VI,VIII,VIII,IX And X is "+overall_ttl+"<br/> But You Entered in Total VI to VIII is"+_ff+" along with Total IX and X is "+_sf+"<br/> Grand Total is "+_tf+"<br/> So Overwrite Existing Data ( "+overall_ttl+" into "+_tf+" ) in Total VI to X Field!"
              console.log(message);// alert(message);
              overall_ttl = _tf;
            }
        }
        this.staffFixationDSEForm.controls[key_arr[2]].setValue(overall_ttl);
      }
    }
    else if(flag == 3){
      if(ttl_9and10 != 0){
        if (value > ttl_9and10){
          alert('The sum of class IX and X is '+ttl_9and10+' but Given value is '+value);
          this.staffFixationDSEForm.controls[key_arr[1]].setValue(ttl_9and10);
            let _ff = Number(this.staffFixationDSEForm.get(key_arr[0]).value);
            let _sf = Number(this.staffFixationDSEForm.get(key_arr[1]).value);
            let _tf = Number(_ff+_sf);
            overall_ttl = ttl_6to8 + ttl_9and10;
            if(_tf != overall_ttl){
              let message = "Alert ! The Sum of Class VI,VIII,VIII,IX And X is "+overall_ttl+"<br/> But You Entered in Total XI and X is"+_sf+" along with Total VI and VIII is "+_ff+"<br/> Grand Total is "+_tf+"<br/> So Overwrite Existing Data ( "+overall_ttl+" into "+_tf+" ) in Total VI to X Field!"
              console.log(message);// alert(message);
              overall_ttl = _tf;
            }
        }
        else{
          let _ff = Number(this.staffFixationDSEForm.get(key_arr[0]).value);
          let _sf = Number(this.staffFixationDSEForm.get(key_arr[1]).value);
          let _tf = Number(_ff+_sf);
          overall_ttl = ttl_6to8 + value;
          if(_tf != overall_ttl){
            let message = "Alert ! The Sum of Class VI,VIII,VIII,IX And X is "+overall_ttl+"<br/> But You Entered in Total XI and X is"+_sf+" along with Total VI and VIII is "+_ff+"<br/> Grand Total is "+_tf+"<br/> So Overwrite Existing Data ( "+overall_ttl+" into "+_tf+" ) in Total VI to X Field!"
            console.log(message);// alert(message);
            overall_ttl = _tf;
          }
        }
        this.staffFixationDSEForm.controls[key_arr[2]].setValue(overall_ttl);
      }
    }
  }
  esValidation(){
    let section6To8 =  this.staffFixationDSEForm.controls['section_6_8'].value != '' ? Number(this.staffFixationDSEForm.controls['section_6_8'].value) : 0;
    let section9To10 =  this.staffFixationDSEForm.controls['section_9_10'].value != '' ? Number(this.staffFixationDSEForm.controls['section_9_10'].value) : 0;
    let total = section6To8+section9To10;
    this.staffFixationDSEForm.controls['section_6_10'].setValue(total);
  }

  elig_sg_temparr = [0,0,0,0,0,0];
  pg_period_sg_temparr = [0,0,0,0,0,0];
  net_sg_temparr = [0,0,0,0,0,0];
  sanc_sg_temparr = [0,0,0,0,0,0];
  surplus_sg_temparr = [0,0,0,0,0,0];
  need_sg_temparr = [0,0,0,0,0,0];
  in_position_sg_temparr = [0,0,0,0,0,0];
  vacant_sg_temparr = [0,0,0,0,0,0];

  postValidation(event,inx,flag,tmp_arr,key_arr){
    debugger;
    let value = Number(event);
    flag == 1 ? tmp_arr[inx] = value : '';
    let bt_ttl = 0; 
    let overall_ttl = 0;
    bt_ttl = Number(tmp_arr[1])+Number(tmp_arr[2])+Number(tmp_arr[3])+ Number(tmp_arr[4])+Number(tmp_arr[5]);
    if(flag == 1){
      this.staffFixationDSEForm.controls[key_arr[0]].setValue(bt_ttl);
      overall_ttl = bt_ttl+Number(tmp_arr[0]);
      this.staffFixationDSEForm.controls[key_arr[1]].setValue(overall_ttl);
    }
    if(flag == 2){ 
      if(bt_ttl != 0){
        if (value > bt_ttl){
          alert('The sum of BT is '+bt_ttl+' but Given value is '+value);
          this.staffFixationDSEForm.controls[key_arr[0]].setValue(bt_ttl);
          overall_ttl = bt_ttl+Number(tmp_arr[0]);
        }
        else{
          overall_ttl = value+Number(tmp_arr[0]);
        }
        this.staffFixationDSEForm.controls[key_arr[1]].setValue(overall_ttl);
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit(val){
    debugger;
    this.submitted = true;
    if(this.staffFixationDSEForm.valid) {
    var pgchem_vac =val.vac_4;
    delete val.vac_4;
    if(this.teacherPanelId == "0") {
      this.vacantData = {
        "records": {
        "school_key_id": val.school_id,
        "vac_4": pgchem_vac,
        "tbl_name":"teacher_panel4"
        }
      }
    }
    else {
      this.vacantData = {
        "records": {
          "id":this.teacherPanelId,
        "school_key_id": val.school_id,
        "vac_4": pgchem_vac,
        "tbl_name":"teacher_panel4"
        }
      }
    }

    debugger;
    this.service.saveDSEStaffFixationDetails(this.vacantData).subscribe((res) => {
      if(res.dataStatus == true){ this.alert.success(res.message);} 
      else{this.alert.error(res.message);}
      this.displayDialog = false;
      this.staffFixationDSEForm.reset();
     },err=>{this.alert.error(err)}); 
    
    
  }
}
}
