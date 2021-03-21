import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-beo-assignment',
  templateUrl: './beo-assignment.component.html',
  styleUrls: ['./beo-assignment.component.css']
})

export class BeoAssignmentComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  beoassignment: any;
  
  constructor(private reportsService: ReportsService) {}

  ngOnInit() {
    this.dataHeader = [{ field: 'udise_code', header: 'UDISE', widthstyle: '10em' }, 
                       { field: 'school_name', header: 'School Name', widthstyle: '10em'}, 
                       { field: 'block_name', header: 'Block Name', widthstyle: '10em'},
                       { field: 'beo_map', header: 'BEO 1' , widthstyle: '5em'},
                       { field: 'beo_map', header: 'BEO 2' , widthstyle: '5em'},
                       { field: 'beo_map', header: 'BEO 3' , widthstyle: '5em'},
                       { field: 'beo_map', header: 'BEO 4' , widthstyle: '5em'},
                       { field: 'beo_map', header: 'BEO 5' , widthstyle: '5em'}];
    this.getbeoassignment();
  }

  getbeoassignment() {
    this.reportsService.getbeoassignment().subscribe((data) => {
      if (data.dataStatus && data.deoschools.length > 0) {
        this.beoassignment = data.deoschools;
      } 
      else{
        alert(data.message);
      }
    });
  }

  beo_assignment_saveform(val) {
    // console.log('beo assignment save',val);
    const filteredArray: any = val.filter(f => f.beo_map !== undefined && f.beo_map !== null && f.beo_map !== "0") as any;
    // console.log('filtered array',filteredArray);

    if(filteredArray.length > 0){
      var arr = new Array();  
      filteredArray.map(item => { return { udise_code: item['udise_code'], beo_map:item['beo_map'] }})
                  .forEach(item => arr.push(item));       
      this.reportsService.getbeoassignmentsave({'records' : arr}).subscribe(result=>{alert(result.message);}); 
    }else{
      alert('please check altest one checkbox');
    }

  }
}

