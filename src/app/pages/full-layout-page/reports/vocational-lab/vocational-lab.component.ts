import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-vocational-lab',
  templateUrl: './vocational-lab.component.html',
  styleUrls: ['./vocational-lab.component.css']
})
export class VocationalLabComponent implements OnInit {
  public VocationalLab : any[] = [];
  public dataHeader : any[] = [];
  public VocationalData : any[] = [];

  constructor(private reportsService : ReportsService) { }

  ngOnInit() {
    this.getVocationalLab();
  }

  getVocationalLab(){
    debugger;
    this.reportsService.getVocationalLabAPI().subscribe((res) => {
      // this.VocationalLab = res;
    })
    this.dataHeader = [
      { sector: 'Sector1' },
      { sector: 'Sector2' },
      { sector: 'Sector3' },
      { sector: 'Sector4' }
    ];

    this.VocationalLab = [
      { sector: 'Sector1' },
      { sector: 'Sector2' },
      { sector: 'Sector3' },
      { sector: 'Sector4' }
    ];
  
    let newDataMarge = this.VocationalLab.map((item, i) => Object.assign({}, item, this.dataHeader[i]));
    this.VocationalData = newDataMarge; 
  }

  

}
