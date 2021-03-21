import { Component, OnInit } from '@angular/core';
import { CeoService } from '../ceo.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-renewal-application-status',
  templateUrl: './renewal-application-status.component.html',
  styleUrls: ['./renewal-application-status.component.css']
})
export class RenewalApplicationStatusComponent implements OnInit {
  data: any[]=[];
  userTypeID: any;

  constructor(private ceoService:CeoService, public UserSessionService :UserSessionService,
    private router: Router
    ) {
      this.userTypeID = this.UserSessionService.userTypeId();
   }

  ngOnInit() {
    this.getApplicationStatus();
  }

  getApplicationStatus() {
    this.ceoService.getApplicationstateStatus().subscribe((res) => {
      if(res.result.length > 0){
        debugger;
        this.data = res.result;
      }
    })
  }

  goToRenewalList(type) {
    this.router.navigate(['/renewal-list'], { queryParams: { 'type': type }, skipLocationChange: true });
  }
}
