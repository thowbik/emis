import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-facilities-provided-children',
  templateUrl: './facilities-provided-children.component.html',
  styleUrls: ['./facilities-provided-children.component.css']
})
export class FacilitiesProvidedChildrenComponent implements OnInit {
public FacilitiesChildren1 : any[] = [];
public FacilitiesChildren2 : any[] = [];
public FacilitiesCWSN : any[] = [];
public rowHeader2 : any[] = [];
public noDataFac1 : boolean = false;
public noDataFac2 : boolean = false;
public noDataFac3 : boolean = false;
  constructor(private reportsService : ReportsService) { }
  
  ngOnInit() {
    this.getFacilities();
    this.rowHeader2 = [
      { row: 'Braille Book' },
      { row: 'Braille Kit' },
      { row: 'Low vision Kit' },
      { row: 'Hearing aid' },
      { row: 'Braces' },
      { row: 'Crutches' },
      { row: 'Wheel Chair' },
      { row: 'Tri-cycle' },
      { row: 'Caliper' },
      { row: 'Escort' },
      { row: 'Stipend' }
    ];
  }

  getFacilities(){
    debugger;
    this.reportsService.getFacilitiesProvidedChildrenAPI().subscribe((res) => {
      console.log('API',res);
      // Primary
      if(res.incenfac.pri.length>0){
        this.FacilitiesChildren1 = res.incenfac.pri; 
      }
      else
      {
        this.noDataFac1 = true
      }
      // Secondary
      if(res.incenfac.upr_pri.length>0){
        this.FacilitiesChildren2 = res.incenfac.upr_pri; 
      }
      else
      {
        this.noDataFac2 = true
      }

      // CWSN 
      if(res.incenfac.cwsn.length>0){
        this.FacilitiesCWSN = res.incenfac.cwsn; 
      }
      else
      {
        this.noDataFac3 = true
      }
    })
  }
}
