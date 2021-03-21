import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-districtwise-noonmeal-student-report',
  templateUrl: './districtwise-noonmeal-student-report.component.html',
  styleUrls: ['./districtwise-noonmeal-student-report.component.scss']
})
export class DistrictwiseNoonmealStudentReportComponent implements OnInit {
   public meal_school_details : any; 
   public dataHeader: any;


  constructor(private router: Router) {
    this.meal_school_details = this.router.getCurrentNavigation().extras;
   }

  ngOnInit() {
    this.dataHeader = [
      {field: 'district_name', header: 'District', widthstyle:'13em' },
      { field: 'block_name', header: 'Block Name', widthstyle:'11em'},
      { field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },
      { field: 'school_name', header: 'School Name', widthstyle:'13em' },
      { field: 'meals', header: 'Opted For Noon Meals' , widthstyle:'15em' },
      { field: 'total', header: 'Total', widthstyle:'9em' },
  ];
  }

}
