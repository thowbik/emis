import { Component, OnInit, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { CeoService } from '../ceo.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-noc-for-cbsc',
  templateUrl: './noc-for-cbsc.component.html',
  styleUrls: ['./noc-for-cbsc.component.css']
})
export class NocForCbscComponent implements OnInit {
  schl_id: any;
  sch_mgmt_id: any;
  sch_cate_id: any;


  constructor(
    private CeoService: CeoService, 
    private confirmationService: ConfirmationService,
     private router: Router, public UserSessionService :UserSessionService,private alertService :AlertService) {
    this.schl_id=this.UserSessionService.schoolId();
    this.sch_cate_id=this.UserSessionService.cate_id();
    this.sch_mgmt_id=this.UserSessionService.manage_id();

   }

  ngOnInit() {
  
  console.log("this.schl_id",this.schl_id);
  console.log("this.cat_id",this.sch_cate_id);
  console.log("this.mamanage_id",this.sch_mgmt_id);
  }

  onSave(){
  let school_key_id =this.schl_id,
  school_mgmtid =this.sch_mgmt_id,
  school_catid =this.sch_cate_id;
   let data = {"school_id" : school_key_id,"sch_mgmt_id" : school_mgmtid,"sch_cate_id" : school_catid,"app_type":"3",};
   this.CeoService.getnocdeatailssave({"records":data}, true).subscribe((res) => {
     if(res){
      this.alertService.success("Data Save Successfully");
      this.router.navigate(['/school/nocforcbscaffiliation']);
     }
   });
 }
}