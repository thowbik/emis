import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { UserSessionService } from 'src/services/usersession.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state.service';
import {NavigationService} from 'src/services/navigation.service';

@Component({
  selector: 'app-slasstudentblockwise',
  templateUrl: './slasstudentblockwise.component.html',
  styleUrls: ['./slasstudentblockwise.component.scss']
})
export class SlasstudentblockwiseComponent implements OnInit {
  blkhead: { field: string; header: string; }[];
  blkbody: { field: string; header: string; }[];
  slasheadComp: { field: string; header: string; }[];
  slasComp: { field: string; header: string; }[];
  public studdist : any; 
  studdistDetail: any;


  constructor(private http: HttpClient,private StateService:StateService,private dataService: DataService, private userSessionService: UserSessionService, private navigationService:NavigationService, private routers : Router) {
    this.studdist = this.routers.getCurrentNavigation().extras;
   }

  ngOnInit() {
    this.slasstudentblk();
    // this.slasheader();
    this.studdistDetail = this.studdist;
  }
  slasstudentblk(){
    this.blkhead = [
      { field: '0 Marks', header: '0 Marks' },
      { field: '1-3 Marks', header: '1-3 Marks' },
      { field: '4-6 Marks', header: '4-6 Marks' },
      { field: '7-9 Marks', header: '7-9 Marks' },
      { field: '10-12 Marks', header: '10-12 Marks' },
  ];
  this.blkbody = [
    { field: 'Block', header: 'Block' },
    { field: 'Total student', header: 'Total Student' },
    { field: '#', header: '#' },
    { field: '%', header: '%' },
    { field: '#', header: '#' },
    { field: '%', header: '%' },
    { field: '#', header: '#' },
    { field: '%', header: '%' },
    { field: '#', header: '#' },
    { field: '%', header: '%' },
    { field: '#', header: '#' },
    { field: '%', header: '%' },
];
this.slasheadComp = [
  { field: '0 Marks', header: '0 Marks' },
  { field: '1-3 Marks', header: '1-3 Marks' },
  { field: '4-6 Marks', header: '4-6 Marks' },
  { field: '7-9 Marks', header: '7-9 Marks' },
  { field: '10-12 Marks', header: '10-12 Marks' },
];
this.slasComp = [
{ field: 'district_name', header: 'District' },
{ field: 'total', header: 'Total Student' },
{ field: 'p0', header: '#' },
{ field: 'per0', header: '%' },
{ field: 'p1', header: '#' },
{ field: 'per1', header: '%' },
{ field: 'p2', header: '#' },
{ field: 'per2', header: '%' },
{ field: 'p3', header: '#' },
{ field: 'per3', header: '%' },
{ field: 'p4', header: '#' },
{ field: 'per4', header: '%' },
];

  }

  studschool(disid){
    this.StateService.schlwisestudent(disid).subscribe(
      schlblk => {
        console.log( schlblk);
        this.routers.navigate(['/slasstudentschoolwise'], schlblk.osclist.student_migration_details)
      }
    ) 
  }


}
