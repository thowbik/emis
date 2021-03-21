import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReportsService} from '../reports.service';
import {UserSessionService} from '../../../../../services/usersession.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-receipts-and-expenditure',
  templateUrl: './receipts-and-expenditure.component.html',
  styleUrls: ['./receipts-and-expenditure.component.css']
})
export class ReceiptsAndExpenditureComponent implements OnInit {
  public rowHeader: any[] = [];
  public getGrantsReceivedandExpenditure: any;
  schoolCode: string;
  isDisabled = true;
  public noDataFound : boolean = false;
  

  userform: FormGroup;
  acayear: string;
  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, private fb: FormBuilder) {
    this.schoolCode = this.userSessionService.userName();
  }

  ngOnInit() {
    this.getCurrentFinancialYear();
    this.initialValidator();
    this.getGrantsReceived();
    this.rowHeader = [
      { row: 'Composite School Grant' },
      { row: '' },
      { row: '' },
      { row: '' },
      { row: '' },
      { row: '' },
      { row: '' },
    ];
  }
  getCurrentFinancialYear() {
    var acdyear = "";
     var today = new Date();
     if ((today.getMonth() + 1) <= 3) {
      acdyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().slice(-2)
    } else {
      acdyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
     }
      this.acayear = acdyear
  }

  getGrantsReceived() {
     let acyear =this.acayear, datasclservice = this.schoolCode;
    // console.log('this.acayeasssr',this.acayear);
    this.reportsService.getGrantsReceived(acyear, datasclservice).subscribe((data) => {
       if(data.safety.length>0)
      {
        this.getGrantsReceivedandExpenditure = data.safety;
        this.userform.patchValue(data.safety[0]);
      }
      else {
        this.noDataFound = true;
       }
      
    });
  }

  initialValidator() {

    this.userform = this.fb.group({
      'ngo_asst_yn': new FormControl(''),
      'ngo_asst_name': new FormControl(''),
      'ngo_asst_rcvd': new FormControl(''),

      'psu_asst_yn': new FormControl(''),
      'psu_asst_name': new FormControl(''),
      'psu_asst_rcvd': new FormControl(''),

      'comm_asst_yn': new FormControl(''),
      'comm_asst_name': new FormControl(''),
      'comm_asst_rcvd': new FormControl(''),

      'oth_asst_yn': new FormControl(''),
      'oth_asst_name': new FormControl(''),
      'oth_asst_rcvd': new FormControl(''),

      'ict_reg_yn': new FormControl(''),
      'sport_reg_yn': new FormControl(''),
      'lib_reg_yn': new FormControl(''),
    });
  }


}
