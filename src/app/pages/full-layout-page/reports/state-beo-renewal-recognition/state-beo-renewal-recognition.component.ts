import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-state-beo-renewal-recognition',
  templateUrl: './state-beo-renewal-recognition.component.html',
  styleUrls: ['./state-beo-renewal-recognition.component.css']
})
export class StateBeoRenewalRecognitionComponent implements OnInit {
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  total_pending_data: any;
  nodateFound: boolean;

  constructor(public reportsService : ReportsService) { }

  ngOnInit() {
    this.dataHeader = [{field: 'district_name', header: 'Distict Name', widthstyle:'8em' },
    { field: 'VI(B)', header: 'Block Name', widthstyle:'8em' },
    { field: 'VI(LV)', header: 'Udise Code', widthstyle:'8em' },
    { field: 'HI', header: 'School Name' , widthstyle:'8em'}, 
    { field: 'SI', header: 'Number of days pending', widthstyle:'12em' },
    ];
    this.getTotalPendingDetails();
  }

  getTotalPendingDetails(){
    let section = 6 ;
    debugger;
    this.reportsService.getbeototalpendinglist(section).subscribe(
      list=>{
        console.log('=======>lis',list.renewal.renewal);
        // this.pageStage = 1;
        if(list.renewal.renewal.length>0){
          this.total_pending_data=list.renewal.renewal
        }
        else
        {
          this.nodateFound = true;
        }
      }
    )
  }

}
