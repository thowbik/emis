import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-state-approved-renewal-recognition',
  templateUrl: './state-approved-renewal-recognition.component.html',
  styleUrls: ['./state-approved-renewal-recognition.component.css']
})
export class StateApprovedRenewalRecognitionComponent implements OnInit {
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  nodateFound: boolean = false;
  approved_data: any;
  pageStage: number;
  district_wise_data: any;
  nodateFound1: boolean;
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  block_wise_data: any;
  dataHeader2: { field: string; header: string; widthstyle: string; }[];
  schol_wise_data: any;
  dataHeader3: { field: string; header: string; widthstyle: string; }[];
  nodateFound2: boolean;
  nodateFound3: boolean;

  constructor(public reportsService : ReportsService) {  }

  ngOnInit() {
    this.dataHeader = [
      { field: 'Educational District', header: 'District', widthstyle:'8em' },
      { field: 'Count', header: 'Count', widthstyle:'8em' },
    ];
    this.dataHeader1 = [
      { field: 'Educational District', header: 'Educational District', widthstyle:'8em' },
      { field: 'Count', header: 'Count', widthstyle:'8em' },
    ];
    this.dataHeader2 = [
      { field: 'Educational District', header: 'Block', widthstyle:'8em' },
      { field: 'Count', header: 'Count', widthstyle:'8em' },
    ];
    this.dataHeader3 = [
      { field: 'Educational District', header: 'School', widthstyle:'8em' },
      { field: 'Count', header: 'Order', widthstyle:'8em' },
    ];
    this.getApprovedDetails();
  }

  getApprovedDetails(){
    let section = 1 ;
    debugger;
    this.reportsService.getbeototalpendinglist(section).subscribe(
      list=>{
        console.log('=======>liwws',list.renewal.renewal);
        this.pageStage = 1;
        if(list.renewal.renewal.length >=0 ){
          this.approved_data=list.renewal.renewal
        }
        else
        {
          this.nodateFound = true;
        }
      }
    )    
  }
  onSelectedId(districtwise)
  {   
    let section = 1 , group = "EDU", q = districtwise ;
    debugger;
    this.reportsService.getdistrictwiseRenwalData(section, group , q).subscribe(
      details => {
        this.pageStage = 2;
        console.log('name',details.renewal.renewal);
        if(details.renewal.renewal.length > 0) {
          this.district_wise_data = details.renewal.renewal
        }
        else
        {
          this.nodateFound1 = true;
        }
          //  this.routers.navigate(['blockwise/section/aided/schools'], details.result.school_details)
      }
    )
  }
  onSelectedEduId(districtwise)
  {   
    let section = 1 , group = "BLK", q = districtwise ;
    debugger;
    this.reportsService.getdistrictwiseRenwalData(section, group , q).subscribe(
      details => {
        this.pageStage = 3;
        console.log('names',details.renewal.renewal);
        if(details.renewal.renewal.length > 0) {
          this.block_wise_data = details.renewal.renewal
        }
        else
        {
          this.nodateFound2 = true;
        }
          //  this.routers.navigate(['blockwise/section/aided/schools'], details.result.school_details)
      }
    )
  }
  onSelectedSchoolId(districtwise)
  {   
    let section = 1 , group = "SCH", q = districtwise ;
    debugger;
    this.reportsService.getdistrictwiseRenwalData(section, group , q).subscribe(
      details => {
        this.pageStage = 4;
        console.log('namess',details.renewal.renewal);
        if(details.renewal.renewal.length > 0) {
          this.schol_wise_data = details.renewal.renewal
        }
        else
        {
          this.nodateFound3 = true;
        }
          //  this.routers.navigate(['blockwise/section/aided/schools'], details.result.school_details)
      }
    )
  }

}
