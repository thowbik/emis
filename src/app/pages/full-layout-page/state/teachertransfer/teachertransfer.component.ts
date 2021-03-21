import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm} from '@angular/forms';

import { Router } from '@angular/router';
import { StateService } from '../state.service';
import { isNgTemplate } from '@angular/compiler';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-teachertransfer',
  templateUrl: './teachertransfer.component.html',
  styleUrls: ['./teachertransfer.component.scss']
})
export class TeachertransferComponent implements OnInit {
  districtdetails:any={districtlist:''};
  blockdetails:any={blocklist:''};
  schooldetails:any={schoollist:''};
  teachertype:any;
  filterblocklist:any;
  filterschoollist:any;
  filternewschoollist:any;
  teacherlist:any;
  school_id:any;
  teache_type:any;
  typeteacher:any;
  deputetype:any;
  teacher_name:any;
  data:any;
  listteacher: any;
  teachertransferForm:FormGroup;
  transfertype: Array<{'value':string,'label':string}> = [ {value:"",label:"Transfer Type"},
                                                          {value:"Administrative Transfer",label:"Administrative Transfer"},
                                                          {value:"General Transfer",label:"General Transfer"},
                                                          {value:"Offline",label:"Offline"},
                                                          {value:"Serious Illness",label:"Serious Illness"},
                                                          {value:"Spouse Death",label:"Spouse Death"},
                                                          {value:"Deputation",label:"Deputation"},
                                                          {value:"Promotion",label:"Promotion"},
                                                          {value:"Deployment",label:"Deployment"},
                                                          {value:"Others",label:"Others"}];
                                                          
  deputelist: Array<{'value':string,'label':string}> = [ {value:"",label:"Choose"},
                                                          {value:"1",label:"School"},
                                                          {value:"2",label:"Office"},
                                                          ];
  filternewblocklist: any;
  newdistrict_id: any;
  officedetails: any;
  officelist: any;
  transferby:any;
  transferbyofficers: any;
  transfer: any;
  districtId: number;
                                              
  constructor(private router: Router,private fb: FormBuilder, private stateService : StateService,private alertService: AlertService,
    private usersessionService :UserSessionService) {
      this.districtId = this.usersessionService.districtId();
      
     }

  ngOnInit() {
    
    this.stateService.getteachertransferdropdown(true).subscribe(td=>{console.log(td);
     // this.districtdetails[0] = {
     //   label:'Select District',
    //    value: '0'
    //  }
     // this.districtdetails=td['districtlist'].foreach((l,inx) => { l[inx+1] =  { label: l.district_name, value: l.district_id }; });
     
      //this.districtdetails=td['districtlist'].map(l => { return { label: l.district_name, value: l.id }; });
      this.blockdetails=td['blocklist'];
      this.schooldetails=td['schoollist'];
      this.officedetails=td['officelist'];
      this.transferby=td['transceotypes'];
      
      this.teachertype=td['teachertypelist'];
      this.typeteacher=this.teachertype.map(tt => { return { label: tt.type_teacher, value: tt.id }; });
      /* based on login */
      if(this.districtId !=undefined)
      {
       const result2 = (td['districtlist']).filter(a => a.id == this.districtId);
       this.districtdetails=result2.map(d => { return { label: d.district_name, value: d.id }; });
       const result3 = (td['transceotypes']).filter(b => b.district_id == this.districtId);
       this.transferbyofficers=result3.map(to => { return { label: to.office_type+'-'+to.office_name, value: to.id  }; });
      }
      else
      {
        this.districtdetails=td['districtlist'].map(l => { return { label: l.district_name, value: l.id }; });
        this.transferbyofficers=this.transferby.map(to => { return { label: to.office_type+'-'+to.office_name, value: to.id }; });
      }
      /* end of based login */
     })
     this.teachertransferForm = this.fb.group({
      'p_district': new FormControl('', Validators.required),
      'n_district': new FormControl('', Validators.required),

      'p_block': new FormControl('', Validators.required),
      'n_block': new FormControl('', Validators.required),

      'p_school': new FormControl('', Validators.required),
      'n_school': new FormControl('', Validators.required),

      'p_teachertype': new FormControl('', Validators.required),
      'n_designation': new FormControl('', Validators.required),

      'teachername': new FormControl('', Validators.required),
      'transfertype': new FormControl('', Validators.required),
      'remarks': new FormControl(''),
      'deputetype': new FormControl('', Validators.required),
      'transferdate': new FormControl('', Validators.required),
      'transferby': new FormControl('', Validators.required)
     
    })         
  }
  /* present school function */
      selectdistrict(districtid)
      {
      const result2 = (this.blockdetails).filter(a => a.district_id == districtid);
      this.filterblocklist=result2.map(b => { return { label: b.block_name, value: b.block_id }; });
    
      }
      selectblock(blockid)
      {
        
      const result3 = (this.schooldetails).filter(b => b.block_id == blockid);
      this.filterschoollist=result3.map(s => { return { label: s.school_name, value: s.school_id }; });
      
      }
      selectschool(schoolid)
        {
        this.school_id=schoolid;
        }
        selectteachertype(ttype)
        {
        this.teache_type=ttype;
       
        this.stateService.getteacherlist(this.school_id,this.teache_type).subscribe(ta=>{console.log(ta)
          this.teacherlist=ta['teacherlist'];
          console.log(this.teacherlist);
          this.listteacher=this.teacherlist.map(lt => { return { label: lt.teacher_name, value: lt.u_id }; });
          //console.log(this.teacherlist);
        })
        }
     teachername(u_id)
       {
  const result2 = (this.teacherlist).filter(c => c.u_id == u_id);
  console.log(result2,'tname');
  this.teacher_name=result2[0].teacher_name;
 
  }
  selecttransfertype(transfertype)
  {
   this.transfer=transfertype;
  }
  /* end of present school function */


   /*new school school function */
  selectdepute(depute)
  {
  this.deputetype=depute;
  
  }
   selectnewdistrict(districtid)
  {
    this.newdistrict_id=districtid;  
      const result2 = (this.blockdetails).filter(a => a.district_id == districtid);
      this.filternewblocklist=result2.map(b => { return { label: b.block_name, value: b.block_id }; });
    
      }
 
  selectnewblock(blockid)
  {
  
   if(this.deputetype==1)
   {
   
   const result2 = (this.schooldetails).filter(b => b.block_id == blockid);
   this.filternewschoollist=result2.map(s => { return { label: s.school_name, value: s.school_id }; });
   
   }
   else
   {
   
    const resultoff = (this.officedetails).filter(o => o.district_id == this.newdistrict_id);
  
      this.filternewschoollist=resultoff.map(ol => { return { label: ol.office_name, value: ol.off_key_id }; });
      console.log(this.filternewschoollist);
  }

}
teachertransfer(a)
{
  if (this.teachertransferForm.valid) {
  var teachertransferdata=this.teachertransferForm.value;
  //console.log(teachertransferdata);
 // return false;
  /* deputation part */
     if(this.transfer=='Deputation')
     {
    this.data = {"records":teachertransferdata}
     this.stateService.savetransferdepute(this.data,true).subscribe(
       dataresult => {
      
        if(dataresult['dataStatus'] == true) {
        alert('saved successfully');
          this.alertService.success('Teacher Transfer Successfully');
        }
        else {
   
   this.alertService.warning('Something wrong'); 
             }
       });
   
  }
  /* end of deputation */

  /*others transfertype */
  else
  {
   
  this.data = {"records":teachertransferdata}
  this.stateService.saveteachertransfer(this.data,true).subscribe(
    dataresult => {
   console.log(dataresult,'dataresult');
   console.log(dataresult['dataStatus'],'dataresu21');
     if(dataresult['dataStatus'] === true) {
      alert('saved successfully');
       //this.alertService.success('Teacher Transfer Successfully');
     }
     else {

      this.alertService.warning('Something wrong'); 
          }
    });
   
  }
   /* end of deputation */

  }

else
{
  this.validateAllFormFields(this.teachertransferForm);
  this.alertService.warning('Please Fill All Mandatory Fields.!');
  alert('all field is required');
  return;
}
}
validateAllFormFields(formGroup: any) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    } 
  });
}
}
