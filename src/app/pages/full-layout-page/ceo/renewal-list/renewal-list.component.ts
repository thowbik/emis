import { Component, OnInit } from '@angular/core';
import { CeoService } from '../ceo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-renewal-list',
  templateUrl: './renewal-list.component.html',
  styleUrls: ['./renewal-list.component.css']
})
export class RenewalListComponent implements OnInit {
  public dataHeader1 : any[] = [];
  public dataHeader2 : any[] = [];
  public dataHeader3 : any[] = [];
  public dataHeader4 : any[] = [];
  public pageStage : number;
  public schoolList : any[] = [];
  public selected_district : any[] = [];
  public State_schoolList : any[] = [];
  public noDataFound1 : any;
  public noDataFound2 :any;
  public count_val:any;
  district_id:any;
  emis_usertype:any;
  userId: number;
  data: any[]=[];
  routeData: any;
  statusType: any;
  approved: boolean;
  totalApp: boolean;
  BEOpendinglist: boolean;
  DEOpendinglist: boolean;
  dataBEO: any;
  dataDEO: boolean;
  totalApplication: boolean;
  datasDEO: boolean;
  datasBEO: boolean;
  datasCEO: boolean;
  dataCEO: boolean;
  datassCEO: boolean;
  constructor(private ceoService:CeoService, private routers : Router, private userSessionService: UserSessionService, private route: ActivatedRoute) {
    this.routeData = this.route.snapshot;
    debugger;
    this.statusType = this.routeData.queryParams.type;
   }



  ngOnInit() {
    debugger;
    this.district_id = this.userSessionService.districtId();
    this.emis_usertype = this.userSessionService.userTypeId();
    this.userId = this.userSessionService.userId();
    

    if( this.emis_usertype == 5)
    {
      this.getRenewalListState();
    } else if(this.emis_usertype == 6){
      this.getRenewalList();
    } else {
      this.getRenewalDEOCEOList();
    }

    this.dataHeader1 = [
      {field: 'S.No', header: 'S.NO', widthstyle:'1em'},
      {field: 'district_name', header: 'District Name', widthstyle:'3em'},
      { field: 'block_name', header: 'Block Name', widthstyle:'3em' },
      {field: 'udise_code', header: 'UDISE Code', widthstyle:'3em' },
      { field: 'school_name', header: 'School Name', widthstyle:'3em' },
    ];

    this.dataHeader3 = [
      {field: 'S.No', header: 'S.NO', widthstyle:'1em'},
      // {field: 'district_name', header: 'District Name', widthstyle:'3em'},
      { field: 'block_name', header: 'Block Name', widthstyle:'3em' },
      { field: 'total', header: 'Total School', widthstyle:'3em' },
    ];

    this.dataHeader4 = [
      {field: 'S.No', header: 'S.NO', widthstyle:'1em'},
            {field: 'district_name', header: 'District Name', widthstyle:'3em'},
      // { field: 'block_name', header: 'Block Name', widthstyle:'3em' },
      {field: 'udise_code', header: 'Total Schools', widthstyle:'3em' },
    ];
  }

  getRenewalList(){
    debugger;
    if(this.statusType == "Beo Pending") {

      var data ="6"
    } else if(this.statusType == "Deo Pending") {
      var data ="10"
    } else if(this.statusType == "Ceo Pending") {
      var data ="9"
    } else if(this.statusType == "Approved Application") {
      var data ="1"
    } else if(this.statusType == "Rejected Application") {
      var data ="2"
    } 

    if(this.emis_usertype ==6 && this.statusType == 'Beo Pending'){
      this.datasBEO = true; 
    } else {
      this.datasBEO = false;
    }
    console.log(this.datasBEO, 'datasBEO');
 
    this.ceoService.getRenewalListDATA(data).subscribe((res) => {
      this.pageStage = 1;
      this.noDataFound1 =1
      if(res.renewal.renewal.length > 0){
          this.data = res.renewal.renewal;
      }
      else
      {
        this.noDataFound1 =2
      }
    })
  }

  getRenewalDEOCEOList() {
    if(this.statusType == "Beo Pending") {
      var data ="6"
    } else if(this.statusType == "Deo Pending") {
      var data ="10"
    } else if(this.statusType == "Ceo Pending") {
      var data ="9"
    } else if(this.statusType == "Approved Application") {
      var data ="1"
    } else if(this.statusType == "Rejected Application") {
      var data ="2"
    }
   this.ceoService.getRenewalListDATA(data).subscribe((res) => {
      this.pageStage = 4;
      this.noDataFound1 =1
      if(res.renewal.renewal.length > 0){
          this.data = res.renewal.renewal;
      }
      else
      {
        this.noDataFound1 =2
      }
    })
  }

  getRenewalListState(){
    debugger;
    if(this.statusType == "Beo Pending") {
      var data ="6"
    } else if(this.statusType == "Deo Pending") {
      var data ="10"
    } else if(this.statusType == "Ceo Pending") {
      var data ="9"
    } else if(this.statusType == "Approved Application") {
      var data ="1"
    } else if(this.statusType == "Rejected Application") {
      var data ="2"
    } 
    this.ceoService.getRenewalListDATA(data).subscribe((res) => {
      this.pageStage = 3;
      this.noDataFound1 =1
      if(res.renewal.renewal.length > 0){
        this.data = res.renewal.renewal;
      }
      else
      {
        this.noDataFound1 =2
      }
    })
  }

   goToNextStep(schoolId) {
    this.routers.navigate(['/renewal-forward/reject'], { queryParams: { 'schoolId': schoolId }, skipLocationChange: false });
   }

   getOrderCopy(schoolId){
    this.routers.navigate(['/renewal-pdf'], { queryParams: { 'schoolId': schoolId }, skipLocationChange: false });
  
  }

   getdiswisescllist(e) {
    if(this.statusType == "Beo Pending") {
      var data ="6"
    } else if(this.statusType == "Deo Pending") {
      var data ="10"
    } else if(this.statusType == "Ceo Pending") {
      var data ="9"
    } else if(this.statusType == "Approved Application") {
      var data ="1"
    } else if(this.statusType == "Rejected Application") {
      var data ="2"
    }
    var dirID = e; 
    this.ceoService.getDistSclList(data,dirID).subscribe((res) => {
      this.pageStage = 4;
      this.noDataFound1 =1
      if(res.renewal.renewal.length > 0){
          this.data = res.renewal.renewal;
      }
      else
      {
        this.noDataFound1 =2
      }
    })
   }

   getblockwisescllist(e) {
    if(this.statusType == "Beo Pending") {
      var data ="6"
    } else if(this.statusType == "Deo Pending") {
      var data ="10"
    } else if(this.statusType == "Ceo Pending") {
      var data ="9"
    } else if(this.statusType == "Approved Application") {
      var data ="1"
    } else if(this.statusType == "Rejected Application") {
      var data ="2"
    }
    
    this.BEOpendinglist = (this.emis_usertype ==10 || this.statusType == 'Beo Pending')
    
    if(this.emis_usertype ==10 && this.statusType == 'Beo Pending'){
      this.dataBEO = true; 
    } else {
      this.dataBEO = false;
    }

    if(this.emis_usertype ==10 && this.statusType == 'Deo Pending'){
      this.dataDEO = true; 
    } else {
      this.dataDEO = false;
    }

    if(this.emis_usertype ==10 && this.statusType == 'Ceo Pending'){
      this.dataCEO = true; 
    } else {
      this.dataCEO = false;
    }

    if(this.emis_usertype == 9 && this.statusType == 'Ceo Pending'){
      this.datassCEO = true; 
    } else {
      this.datassCEO = false;
    }

    console.log(this.statusType, 'this.statusType')
    console.log(this.dataBEO, '---dataBEO---------------')
    console.log(this.dataCEO, '---dataCEO---------------')
    console.log(this.dataDEO, '---dataDEO---------------')
    console.log(this.datassCEO, '-------datassCEO')

    var blockID = e; 
    this.ceoService.getBlockSclList(data, blockID).subscribe((res) => {
      this.pageStage = 1;
      this.noDataFound1 =1
      if(res.renewal.renewal.length > 0){
          this.data = res.renewal.renewal;
      }
      else
      {
        this.noDataFound1 =2
      }
    })
   }
   previouspage(){
    this.routers.navigate(['/renewal-application-status']);
  }
  Blockpreviouspage()
  {
    this.pageStage = 4;
  }
  previouspagedistrict()
    {
this.pageStage = 3;
    }
  
}
