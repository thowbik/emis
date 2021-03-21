import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-newadmission',
  templateUrl: './students-newadmission.component.html',
  styleUrls: ['./students-newadmission.component.css']
})
export class StudentsNewadmissionComponent implements OnInit {
  schoolId: number;
  
  sales: { brand: string; lastYearSale: string;   }[];
  
  
  constructor( ) { }

  ngOnInit() {
    this.sales = [
      { brand: 'Boys', lastYearSale: '',   },
      { brand: 'Girls', lastYearSale: '',    }
  ];
  
 
  }

}
