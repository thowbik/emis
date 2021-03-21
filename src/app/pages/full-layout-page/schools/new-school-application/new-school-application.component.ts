import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';

@Component({
  selector: 'app-new-school-application',
  templateUrl: './new-school-application.component.html',
  styleUrls: ['./new-school-application.component.css']
})
export class NewSchoolApplicationComponent implements OnInit {

  colsschl: any[];
  sales: any[];
  saless: any[];
  public noDataFound = false;

  constructor(private schoolsService: schoolsService,) { }

  ngOnInit() {
    this.newschoollist();
    this.colsschl = [
      { field: 'teacher_name', header: 'Stage',widthstyle: '6em' },
      { field: 'category', header: 'Status',widthstyle: '10em' },
      { field: 'desgination', header: 'Count',widthstyle: '4em' },
    ];

    this.sales = [
      { brand: 'New', lastYearSale: 'New Application received', thisYearSale: '10' },
      { brand: 'Inprogress', lastYearSale: 'Pending with BEO', thisYearSale: '10'},
      { lastYearSale: 'Pending with DEO', thisYearSale: '9' },
      { lastYearSale: 'Pending with CEO', thisYearSale: '4'},
      { lastYearSale: 'Pending with Director', thisYearSale: '2' },
      { brand: 'Completed', lastYearSale: 'Total Apporved till date', thisYearSale: ' 12' },
      { lastYearSale: 'Total Rejected till date', thisYearSale: '10' },
    ];
  }

  newschoollist() {
    this.schoolsService.getnewschoolData().subscribe(data => {
      const result = data.data;
      console.log(result, '-------')
      if (result.length > 0) {
        this.saless = result;
        console.log(this.saless, '-----------')
      } else {
        this.noDataFound = true;
      }
    });
  }
}
