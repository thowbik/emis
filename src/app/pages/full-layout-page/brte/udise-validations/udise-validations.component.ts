import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-udise-validations',
  templateUrl: './udise-validations.component.html',
  styleUrls: ['./udise-validations.component.css']
})
export class UdiseValidationsComponent implements OnInit {
  cities: { name: string; code: string; }[];
  public dataHeader : any ; 
  public selectedCity : any ; 


  constructor() { }

  ngOnInit() {
    this.cities = [
      {name: 'Primary School ', code: 'PY'},
      {name: 'Middle School', code: 'MD'},
      {name: 'High School', code: 'HS'},
      {name: 'Higher Secondary School', code: 'HSS'},
   ];
   this.dataHeader = [
    {  header: 'Udise' ,widthstyle:'11em'},
    {   header: 'School Name',widthstyle:'11em' },
    {  header: 'Submit Status', widthstyle:'15em' },
    {   header: 'Downloads',widthstyle:'15em' },
    { header: 'Certify status',widthstyle:'15em' },
    ];
  }
  

}
