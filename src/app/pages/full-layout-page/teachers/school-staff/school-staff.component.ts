import { Component, OnInit } from '@angular/core';
import { UidaiValidationService } from 'ng2-uidai-validation';
@Component({
  selector: 'app-school-staff',
  templateUrl: './school-staff.component.html',
  styleUrls: ['./school-staff.component.css']
})
export class SchoolStaffComponent implements OnInit {
  property : any;
  constructor(private uidaiValidationService:UidaiValidationService) { }

  ngOnInit() {
  }
  ButtonClickValidate(event)
  {
//     var validator = require('aadhaar-validator');
// validator.isValidNumber(event)
debugger;
let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(event);//true or false
 alert(isValidUidaiNo);
  }

}
