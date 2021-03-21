import { Component, OnInit, Inject } from '@angular/core';
import { CeoService } from '../ceo.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-rte-intake-capacity',
  templateUrl: './rte-intake-capacity.component.html',
  styleUrls: ['./rte-intake-capacity.component.css']
})
export class RteIntakeCapacityComponent implements OnInit {
  schoolId: number;
//  data: any[] = [];
  data: any[] = [];
  selectedColumns: any[] = [];
  isDataAvailable: boolean;
  sampleSelectedColumn: Array<Object> = [];
  query: any;
  classList: any[] = [];
 


  constructor(public ceoService: CeoService, public router: Router,
    public alertService: AlertService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.getData();
    this.headerData();
    this.classList = [
      { "value": "1", "label": "I" },
      { "value": "13", "label": "LKG" },
    
    ];
  }

  headerData() {
    this.selectedColumns = [
      { field: 'block_name', header: 'Block Name' },
      { field: 'udise_code', header: 'UDISE Code' },
      { field: 'school_name', header: 'School Name' },
      { field: 'entry_class', header: 'Entry Class' },
      { field: 'section_nos', header: 'Number of sections in Entry Class' },
      { field: 'total_seats', header: 'Total Seats in Entry Class' },
      { field: 'rte_seats', header: 'Allotted for RTE(25%)' },
      { field: 'latitude', header: 'Latitude' },
      { field: 'longitude', header: 'Longitude' },
    ];
    this.sampleSelectedColumn = this.selectedColumns;
  }

  getData() {
    debugger;
    this.ceoService.getRteIntakeCapacity().subscribe((res) => {
      if (res) {
        this.data = res.school_RTE_list
      }
    });
  }

  onRowEditInit1(e) {
    debugger;
    const long = e.longitude
    const lat = e.latitude;
    const querys = lat + ',' + long;
    const url = 'https://www.google.com/maps/search/?api=1&query=';
    const id = querys;
    const myurl = `${url}${id}`;
   //this.document.location.href = myurl;
    window.open(myurl);
  }

  onRowEditInit(book) {
    console.log('Row edit initialized');
  }
  onRowEditSave(e) {
    debugger
    const rtesave ={
      id : e.id,
      section_nos:e.section_nos,
      total_seats : e.total_seats,
      rte_seats: e.total_seats/4,
      entry_class:e.entry_class
    };
    if(e.section_nos != '' && e.total_seats != ''){
      this.ceoService.getRteIntakeCapacitySave(rtesave,true).subscribe((res) => {
        if(res.dataStatus == true) {
          this.alertService.success(res.message);
          this.ngOnInit();
        }
        else {
          this.alertService.error(res.message);
        }
      });
    }
    else {
      this.alertService.error('Please give valid data');
    }
    
  }

}
