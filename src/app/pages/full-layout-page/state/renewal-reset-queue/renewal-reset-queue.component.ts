import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-renewal-reset-queue',
  templateUrl: './renewal-reset-queue.component.html',
  styleUrls: ['./renewal-reset-queue.component.scss']
})
export class RenewalResetQueueComponent implements OnInit {

  constructor(private stateService : StateService) { }

  public dataHeader : any[] = [];
  public RenewalData : any[] = [];

  ngOnInit() {
    this.getRenewalResetData();
    this.dataHeader = [
      {field: 'Distict', header: 'Distict', widthstyle:'12em' },
      { field: 'Edu-Distict', header: 'Edu-Distict', widthstyle:'8em' },
      { field: 'Block', header: 'Block', widthstyle:'8em' },
      { field: 'School', header: 'School' , widthstyle:'8em'},
      { field: 'Type', header: 'Type', widthstyle:'8em' },
      { field: 'Management', header: 'Management', widthstyle:'8em' },
      { field: 'Reason', header: 'Reason', widthstyle:'8em' },
      { field: 'Option', header: 'Option' , widthstyle:'8em'},
  ];
  }

  getRenewalResetData(){
    // this.stateService.getRenewalResetQueueData().subscribe((res) => {
    //   this.RenewalData = res;
    // })
  }

}
