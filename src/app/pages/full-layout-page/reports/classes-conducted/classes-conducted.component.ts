import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-classes-conducted',
  templateUrl: './classes-conducted.component.html',
  styleUrls: ['./classes-conducted.component.css']
})
export class ClassesConductedComponent implements OnInit {
  public classesConducated : any[] = [];
  public noDataFound : boolean = false;

  constructor(private reportsService : ReportsService) { }

  ngOnInit() {
    this.getClassesConducted();
  }

  getClassesConducted(){
    this.reportsService.getClassesConductedAPI().subscribe((res) => {
      if(res.length<0){
      }
      else{
        this.noDataFound = true;
      }
      // this.classesConducated = res;
    })
  }

}
