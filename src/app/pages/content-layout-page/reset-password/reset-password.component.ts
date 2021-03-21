import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { ContentService } from '../content.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  routeData: any;
  userType: any;
  userName: any;
  privatekey: string = '764568435';
  constructor(public fb: FormBuilder, private route: ActivatedRoute,private router: Router,
    public contentService: ContentService, private alertService: AlertService) {
      debugger
    this.routeData = this.route.snapshot;
    this.userType = this.routeData.params.usertype.substring(3, this.routeData.params.usertype.length-3);
    this.userName = this.routeData.params.username.substring(3, this.routeData.params.username.length-3);
  }

  ngOnInit() {
    this.initialValidator();
  }


  initialValidator() {
    this.form = this.fb.group({
      'password': new FormControl('', Validators.required),
      'confirmpassword': new FormControl('', Validators.required),
    });
  }


  onSave() {
    debugger
    this.submitted = true;
    if(this.form.valid) {
      if (this.form.value.password === this.form.value.confirmpassword) {
        const data ={
          "emis_username":this.userName,
          "password":this.form.value.password,
          "user_type":this.userType }
        this.contentService.resetPassword(data, true).subscribe((res) => {
          if (res.dataStatus) {
            this.alertService.success('Password Updated Successfully');
            this.router.navigate(['/login']);
          }
          else {
            this.alertService.error('Password Not Updated. Try Again!!');
          }
        });
      } else {
        this.alertService.error('Password and Confirm password missmatched');
      }
    }
   
  }


}
