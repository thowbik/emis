import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { BrteService } from '../brte.service';



@Component({
  selector: 'app-brte-remarks',
  templateUrl: './brte-remarks.component.html',
  styleUrls: ['./brte-remarks.component.css']
})
export class BrteRemarksComponent implements OnInit {
  Blocklist:  { name: string; value: string; }[];
  School: { name: string; value: string; }[];
  Teacher: { name: string; value: string; }[];
  Designing: { name: string; value: string; }[];
  Knowledge : { name: string; value: string; }[];
  Strategy : { name: string; value: string; }[];
  Interpersonal : { name: string; value: string; }[];
  Professional : { name: string; value: string; }[];
  Schoolatte : { name: string; value: string; }[];
  Teacheratten : { name: string; value: string; }[];
  Promoting : { name: string; value: string; }[];
  public selectedCity : any;
  Blockid: any;
  districtId: any;
  result: any;
  breteinfo: any;
  
  evaluationList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Below Expectations', value: '1' },
    { label: 'Closest to Expectations', value: '2' },
    { label: 'Meets Expectations', value: '3' },
    { label: 'Exceeds Expectations', value: '4' }];
    
  constructor(private userSessionService: UserSessionService, private BrteService: BrteService,) {
    this.districtId = this.userSessionService.districtId();
    
   }

  ngOnInit() {
    this.BrteService.getbrteremarks(this.districtId).subscribe((res) => {
      console.log('brtelist',res)
      if (res) {
        this.Blocklist = res.blocklist;
        console.log("brte",this.Blocklist)
      }
    });
    
  }
 
}
