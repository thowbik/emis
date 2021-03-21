import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-state-rejected-renewal-recognition',
  templateUrl: './state-rejected-renewal-recognition.component.html',
  styleUrls: ['./state-rejected-renewal-recognition.component.css']
})
export class StateRejectedRenewalRecognitionComponent implements OnInit {
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  Rejected_data: any;
  nodateFound: boolean;

  constructor(public reportsService : ReportsService) { }

  ngOnInit() {
    this.dataHeader = [{field: 'district_name', header: 'Distict Name', widthstyle:'8em' },
    { field: 'VI(B)', header: 'Block Name', widthstyle:'8em' },
    { field: 'VI(LV)', header: 'Udise Code', widthstyle:'8em' },
    { field: 'HI', header: 'School Name' , widthstyle:'8em'}, 
    { field: 'SI', header: 'Remarks', widthstyle:'12em' },
    ];
    this.getRejectionDetails();
  }
  getRejectionDetails(){
    let section = 5 ;
    debugger;
    this.reportsService.getbeototalpendinglist(section).subscribe(
      list=>{
        console.log('=======>lis',list.renewal.renewal_rejected);
        // this.pageStage = 1;
        if(list.renewal.renewal_rejected.length>0){
          this.Rejected_data=list.renewal.renewal_rejected
        }
        else
        {
          this.nodateFound = true;
        }
      }
    )
  }
}
