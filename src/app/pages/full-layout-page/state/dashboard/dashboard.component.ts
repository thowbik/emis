import { Component, OnInit } from '@angular/core';
import {UserSessionService} from 'src/services/usersession.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  selectstate : string;
  selecttype : string;
  state : any;
  schoolType : any;
  block : any;
  userTypeId : number;
  constructor(private user:UserSessionService) {
      this.userTypeId = this.user.userTypeId();
   }

  ngOnInit() {

    this.state =[
      {label :'Dharmapuri',value : 'Dharmapuri'},
      {label :'Tirpur',value : 'Tirpur'},
      {label :'Salem',value : 'Salem'},
      {label :'Erode',value : 'Erode'},
      {label :'Coimbatore',value : 'Coimbatore'}

    ],
    this.schoolType =[
      {label : 'Government',value : 'Government'},
      {label : 'Aided',value : 'Aided'},
      {label : 'Unaided',value : 'Unaided'},
      {label : 'Central Government',value : 'Central Government'},
    ],
     this.block = [
       {label : 'A',value :'A'},
       {label : 'B',value :'B'},
       {label : 'C',value :'C'},
       {label : 'D',value :'D'},
       {label : 'E',value :'E'},

     ]
  }

}
