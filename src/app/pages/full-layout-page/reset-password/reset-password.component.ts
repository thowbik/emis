import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserSessionService} from '../../../../services/usersession.service';
import {ResetPasswordService} from './reset-password.service';
import {AlertService} from '../../../../services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordform: FormGroup;
  constructor(private fb: FormBuilder, private userSessionService: UserSessionService,
              public resetpassword: ResetPasswordService, private alertService: AlertService ) { }

  ngOnInit() {
    // this.initialValidator();
    this.passwordform = this.fb.group({
      old_password: new FormControl('', null),
      new_one_password:new FormControl('',[Validators.required, Validators.pattern("^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$")]),
      new_password: new FormControl('',[Validators.required, Validators.pattern("^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$")]),
    });
  }

  save() {
    if (this.passwordform.value.new_one_password === this.passwordform.value.new_password) {
      const oldpassword = this.passwordform.value.old_password,
        newpassword = this.passwordform.value.new_password ;
      const data = {old_password : oldpassword, new_password : newpassword};
      this.resetpassword.resetPasswordAPI(data, true).subscribe((res) => {
        if (res.message === 'Password Reset Successfully!!') {
          this.alertService.success('Password Updated Successfully');
        } else {
          this.alertService.error('Old Password Not Exists! Try Again!!');
        }
      });
    } else {
      this.alertService.error('New Password and Confirm password missmatched');
    }
  }
}
