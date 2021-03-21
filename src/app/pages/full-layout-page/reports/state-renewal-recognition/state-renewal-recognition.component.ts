import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { StudentCountSchoolwiseComponent } from '../../state/student-count-schoolwise/student-count-schoolwise.component';

@Component({
  selector: 'app-state-renewal-recognition',
  templateUrl: './state-renewal-recognition.component.html',
  styleUrls: ['./state-renewal-recognition.component.css']
})
export class StateRenewalRecognitionComponent implements OnInit {
  total_pending_data: any;
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  nodateFound: boolean;

  constructor(public reportsService : ReportsService ) { }

  ngOnInit() {
    this.getTotalPendingDetails();
    this.dataHeader = [{field: 'district_name', header: 'Distict Name', widthstyle:'8em' },
    { field: 'VI(B)', header: 'Block Name', widthstyle:'8em' },
    { field: 'VI(LV)', header: 'Udise Code', widthstyle:'8em' },
    { field: 'HI', header: 'School Name' , widthstyle:'8em'}, 
    { field: 'SI', header: 'Number of days pending', widthstyle:'12em' },
    ];
  }

  getTotalPendingDetails(){
    this.reportsService.gettotalpendinglist().subscribe(
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
