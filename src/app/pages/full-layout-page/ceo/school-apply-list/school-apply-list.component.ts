import { Component, OnInit } from '@angular/core';
import { CeoService } from '../ceo.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-school-apply-list',
  templateUrl: './school-apply-list.component.html',
  styleUrls: ['./school-apply-list.component.css']
})
export class SchoolApplyListComponent implements OnInit {
  public dataHeader1 : any[] = [];
  public dataHeader2 : any[] = [];
  public pageStage : number;
  public schoolList : any[] = [];
  public selected_district : any[] = [];
  public State_schoolList : any[] = [];
  public noDataFound1 : any;
  public noDataFound2 :any;
  public count_val:any;
  district_id:any;
  emis_usertype:any;
  constructor(private ceoService:CeoService, private routers : Router, private userSessionService: UserSessionService) { }


  ngOnInit() {
    this.district_id = this.userSessionService.districtId();
    this.emis_usertype = this.userSessionService.userTypeId();
    if( this.emis_usertype==5)
    {
    this.getStateSchoolAppliedList(this.emis_usertype);
    }
    if(this.emis_usertype==9)
    {
      this.getSchoolAppliedList(this.district_id);
    }
   
   
  this.dataHeader1 = [
    {field: 'S.No', header: 'S.NO', widthstyle:'3em'},
    {field: 'Districts', header: 'Districts', widthstyle:'5em'},
    { field: 'Pending Schools', header: 'Pending Schools', widthstyle:'3em' },

  ];
    this.dataHeader2 = [
      {field: '#', header: '#', widthstyle:'5em'},
      {field: 'Application ID', header: 'Application ID', widthstyle:'12em'},
      { field: 'School Name', header: 'School Name', widthstyle:'30em' },
      { field: 'Days Pending', header: 'Days Pending', widthstyle:'15em' },
      { field: 'Status', header: 'Status', widthstyle:'14em' }
 
    ];
   
    
   
  }

  getStateSchoolAppliedList(emis_usertype){
    this.ceoService.getStateApplicationDetails(emis_usertype).subscribe((res) => {
      this.pageStage = 1;
      this.noDataFound1 =1
      console.log(res);
      let state_results = res.List;
      if(state_results.length!=0){
      
        this.State_schoolList = res.List;
        console.log(this.State_schoolList);
      }
      else
      {
      
        this.noDataFound1 =2
      }
    })
  }

   getSchoolAppliedList(district){
this.district_id = district;
     
     this.ceoService.getApplicationDetails(this.district_id,this.emis_usertype).subscribe((res) => {
       this.pageStage = 2;
       this.noDataFound2 =1
       let results = res.List;
        console.log(results);
       
      
     // for (var i=0;i<=)
       if(res.Status_stage !=0)
       {
        for (let i = 0; i <results.length; i++) {
          this.count_val=res.List[0]['pending_date'];
        
        }
         
         this.schoolList = results;
       
       }
       else
       {
       
         this.noDataFound2 =2
       }
     })
   }

   getApplicationCheckListDetails(school_id,app_id)
   {
    this.ceoService.getApplicationCheckDetails(school_id).subscribe((res) => {
      this.pageStage = 2;
      let results = res;
      this.routers.navigate(['/ceo/nocforcbscaffiliation'],{queryParams:{'school_id':school_id,'app_id':app_id,'district_id':this.district_id}})
      console.log(results);
      if(results!=0){
      
       // this.routers.navigate(['/nocforcbsc'])
        this.schoolList = results;
        console.log(this.schoolList);
      }
      else
      {
        this.noDataFound2 =2
      }
    })
   }

}
