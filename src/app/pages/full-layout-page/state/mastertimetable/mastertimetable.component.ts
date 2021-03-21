import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-mastertimetable',
  templateUrl: './mastertimetable.component.html',
  styleUrls: ['./mastertimetable.component.scss']
})
export class MastertimetableComponent implements OnInit {
  emis_loggedin:any;
  classlist: any;
  masterlist: any;

  data: any[] = [];
  selectedColumns: any[] = [];
  isDataAvailable: boolean;
  sampleSelectedColumn  : Array<Object> = [];

  classlist1: Array<{ 'label': any, 'value': any }> = [
    { label: 'Pre-Primary School', value: '0' },
    { label: 'Primary School', value: '1' },
    { label: 'Middle School', value: '2' },
    { label: 'High School', value: '3' },
    { label: 'Higher Secondary School', value: '4' },
    { label: 'Special School', value: '5' }];

  constructor(public stateService: StateService) { }

  ngOnInit() {
    
    this.headerData();
    this.getData();
    // this.emis_loggedin= 'Active';
    // this.stateService.getMasterTimetableDropdown(this.emis_loggedin).subscribe((res) => {
    //   if (res) {
    //     this.classlist = res.result.getsctype;
    //     this.masterlist = res.result.getsctypeschool_timetable_details
       
    //   }
    // });
  }
  headerData()
  {
    this.selectedColumns =[
      {field: 'district_name', header: 'District' },
      { field: 'sumsection', header: 'Total Sections' },
      { field: 'summarked', header: 'Assigned Sections' },
      { field: 'nomarked', header: 'Not Assigned Section'},
      { field: 'status', header: 'Status' },
      
    
    ];
    this.sampleSelectedColumn =  this.selectedColumns;
  }

  getData() {
    this.emis_loggedin= 'Active';
    this.stateService.getMasterTimetableDropdown(this.emis_loggedin).subscribe((res) => {
      if (res) {
        this.data = res.result.school_timetable_details;
      }
    });
  }

  onSubmit() {

  }
}
