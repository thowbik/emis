import { Component, OnInit } from '@angular/core';
import {CeoService} from '../ceo.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  landingpage: any;
  noDataFound: boolean;
  schoolId: any;
  app_id: any;
  status: any;
  status_stage:any;

  constructor(private router: Router, private Ceoservice: CeoService, private userSessionService: UserSessionService,) { 
    this.schoolId = this.userSessionService.schoolId();

  }

  ngOnInit() {
    this.SchoolDownloadOrder();
    console.log(this.schoolId);
  }
  SchoolDownloadOrder() {
    this.Ceoservice.getnocformstatuslanding(this.schoolId).subscribe((data) => {
       console.log("check",data)
    if (data.Status_stage != 0 || data.Status_stage != "")
     {
      console.log("VIEW"+data);
      this.app_id=data.Status_stage[0]['app_id'];
      this.status=data.Status_stage[0]['status'];
      this.status_stage=data.Status_stage[0]['status_stage'];
      console.log("APP"+this.app_id);
      console.log("Satus"+this.status);
      
      if(this.app_id==null&&this.status==null || this.app_id==0&&this.status==0)
      {
        console.log("STAGE 1");
        this.router.navigate(['/nocforcbscaffiliation'])
      }
     else if(this.app_id!="" && this.status_stage==null || this.status==null || this.status==""|| this.status_stage=="") 
      {
        console.log("STAGE 2");
        this.router.navigate(['/school/nocforcbscaffiliation'])
      }
      else if(this.app_id!=""&& this.status!="" || this.app_id!=0 && this.status!=null) 
      {
        console.log("STAGE 3");
        this.router.navigate(['/nocforcbscaffiliationstatus'])
      }
      // console.log("appid",this.app_id)
      // console.log("staus",this.status)
      this.landingpage =data.Status_stage;
      console.log("nocformdownload",this.landingpage)
    }
     else 
     {
      console.log("STAGE 1");
      this.router.navigate(['/nocforcbscaffiliation'])

     // this.noDataFound = true;
    }
  });
  }
}