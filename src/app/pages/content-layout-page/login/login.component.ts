import { Component, OnInit, ViewEncapsulation, Inject,ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getMaxListeners } from 'process';
import * as CryptoJS from 'crypto-js';

// import { NavigationService } from 'services/navigation.service';
// import { AlertService } from 'services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  forgetForm : FormGroup;
  returnUrl: string;
  checkFormat: boolean;
  emisUserType: number;
  districtId: number;
  images:any[] = [];
  displayDialog: boolean;
  display: boolean = false;
  displayForm : boolean = false;
  displaySideContent : boolean = false;
  submitted: boolean;
  pageStage : any;
  emis_username : any;
  user_type: any;
  userTypeVaue : any;
  get_confirm_records: any;
  select_me : any;
  select_dc : any;
  records : any;
  userEmail : any;
  dcEmail : any;
  teacherEmail : any;
  teacherEmail2 : any;
  userEmail1 : any;
  dcEmail1 : any;
  teacherEmail2_one : any;
  teacherEmail_two : any;
  displaySideContent_one : boolean=false;
  displaySideContent_two : boolean=false;
  privatekey: string = '764568435';
  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private alertService: AlertService,
    private userSessionService : UserSessionService,
    private el : ElementRef,
    @Inject(DOCUMENT) private document: Document) {
    this.router = router;
    // this.schoolTypeId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.authService.logOut();
    this.initializeValidators();
    this.initializeValidatorsForgt();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.getImages();
    this.user_type = [
      {label: 'Teacher', value: '0'},
      {label: 'Others', value: '1'},
    ]
  }

  initializeValidators() {
    this.pageStage = 1;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      newpassword: new FormControl(''),
      confirmpassword: new FormControl('')
    });
  }
  initializeValidatorsForgt() {

    this.forgetForm = new FormGroup({
      user_type : new FormControl('',[Validators.required]),
      emis_username : new FormControl('',[Validators.required]),

    });
  }
  forgotDialog(){
  //  this.display = true;
    this.pageStage = 2;
    this.pageStage != 1;
    // this.displaySideContent = true;
  }
  returntoLogin()
  {
    this.pageStage = 1;
    this.initializeValidators();
    this.displaySideContent = false;
    // this.router.navigate(['login']);
  }

  onForgot() {
   // this.submitted = true;
  }
  usertype_val(e)
  {
    this.userTypeVaue = e.value;
    console.log(this.userTypeVaue);
  }
  onSubmit()
  {
    debugger;
    if (this.forgetForm.valid) 
    { 
    if(this.forgetForm.value.emis_username!="" || this.forgetForm.value.user_type != "")
    {
    //this.displaySideContent_one = true;
    this.displaySideContent = true;
    this.displaySideContent_two = true;
    this.get_confirm_records ={"emis_username":this.forgetForm.value.emis_username,"user_type":this.userTypeVaue}
    console.log(this.get_confirm_records);
    this.authService.getEmail(this.get_confirm_records).subscribe((data) =>
    {
        if(data.dataStatus === true)
        { 
        debugger;
          if(this.forgetForm.value.user_type == "1") {
            this.userEmail = data.details[0].UserEmail;
            this.dcEmail =  data.details[0].DCEmail;  
            this.dcEmail1 = "";
            
  
          for (let i = 0; i <  this. dcEmail .length; i++) {
            if (i > 2 && i<  this. dcEmail .indexOf("@") ) {
              this.dcEmail1 += "*";
              debugger
            } else {
              this.dcEmail1 +=  this. dcEmail [i];
            }
  }
 // console.log(this.dcEmail1,"hiddenEmail");
          }
          else {
          //this.teacherEmail2 = (data.details[0].TeacherEmail != '' || null) ? data.details[0].TeacherEmail : data.details[0].TeacherEmail2;  
           this.teacherEmail2 = data.details[0].TeacherEmail2;
           this. teacherEmail2_one = "";
           for (let i = 0; i <  this. teacherEmail2 .length; i++) {
           if (i > 2 && i<  this. teacherEmail2 .indexOf("@") ) {
           this. teacherEmail2_one += "*";
               debugger
             } else {
             this. teacherEmail2_one +=  this. teacherEmail2 [i];
             }
   }
  //  console.log(hiddenEmail,"hiddenEmail");
           this.teacherEmail = data.details[0].TeacherEmail;
           this.teacherEmail_two = "";
           for (let i = 0; i <  this. teacherEmail .length; i++) {
           if (i > 2 && i<  this. teacherEmail .indexOf("@") ) {
           this. teacherEmail_two += "*";
               debugger
             } else {
             this. teacherEmail_two +=  this. teacherEmail [i];
             }
   }
  //  console.log(this.teacherEmail_two,"hiddenEmail");
          }
        }
});
    }
    else if (this.forgetForm.value.emis_username == "" || this.forgetForm.value.user_type == "")
    {
      this.displaySideContent_one = false;
      this.displaySideContent_two = false;
      this.displaySideContent = true;
    }

  }
  else
{
  for (const key of Object.keys(this.forgetForm.controls)) {
    if (this.forgetForm.controls[key].invalid) {
       const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
      console.log('invalid keys',key);
      invalidControl.focus();
       break;
    }
  }
this.alertService.error("Please Fill all the Required Fields");
}

}
//submit confirm

onYes()
{
  this.displaySideContent = true;
  this.displaySideContent_one = false;
  this.displaySideContent_two = true;
}
onNo()
{
  this.displaySideContent_one = false;
  this.displaySideContent = false;
}
//users confirm
onClickUser()
{
  this.select_me ={"user_email":this.userEmail,"emis_username":this.forgetForm.value.emis_username,"user_type": this.forgetForm.value.user_type}
  // this.select_me ={"user_email":this.teacherEmail2_one || this.teacherEmail_two ,"emis_username":this.encryptedUserName,"user_type": this.encryptedUserType}
  this.authService.getSelectEmail1(this.select_me).subscribe((data) =>
  
  {
    console.log(data);
  
      if(data.dataStatus === true)
      {
        this.alertService.success("Email will be sent to this mail id");      
        }
      });
     this.displaySideContent = false;
     this.forgetForm.reset();
    //  this.ngOnInit();
}
onClickDC()
{
  this.select_dc ={"emis_username":this.forgetForm.value.emis_username,"dc_email":this.dcEmail1,"user_type": this.forgetForm.value.user_type}
  this.authService.getSelectEmail2(this.select_dc).subscribe((data) =>
  {
      if(data.dataStatus === true)
      {
        this.alertService.success("Email will be sent to this mail id");      
        }
      });
      this.displaySideContent = false;
      this.forgetForm.reset();
      // this.ngOnInit();
    }
  getImages()
  {
    this.images = [
      // {"img":"safety1"},
      // {"img":"safety2"},
      // {"img":"safety3"},
      // {"img":"safety4"},
      // {"img":"safety5"},
      // {"img":"safety6"},
      // {"img":"safety7"},
      {"img":"precaution1"},
      {"img":"precaution2"},
      {"img":"precaution3"},
      {"img":"precaution4"},
    ];
    this.displayDialog = false;
  }

  onLogin() {
    debugger;
    if (this.loginForm.valid) {
//         if (this.loginForm.value.email.indexOf('_') > -1)
// {
//   alert("_ is present");
// }
// else {
//   alert("_ is absent");
// }

      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data) => {
        debugger;
        if(data.dataStatus) {
      debugger;
            this.emisUserType = this.userSessionService.userTypeId();
            if(this.emisUserType == 17) {
            this.alertService.error("Invalid Username or Password");
           }
           else if(this.emisUserType == 5 || this.emisUserType == 6 || this.emisUserType == 9 || this.emisUserType == 10 || this.emisUserType == 2 || this.emisUserType == 19)
           {
            this.router.navigate(['/statedashboard'])
           }
           else if(this.emisUserType == 14 || this.emisUserType == 8)
           {
            this.router.navigate(['/teachers-dashboard'])
           }
           else if(this.emisUserType == 20)
           {
            this.router.navigate(['/admin'])
           }
           else if(this.emisUserType == 21)
           {
            this.router.navigate(['/elearn/content/reports'])
           }
           else if(this.emisUserType == 22)
           {
            this.router.navigate(['/statedashboard'])
           }
            else {
            this.districtId = localStorage.districtId;
            this.router.navigate([this.returnUrl])
          }

        }
        else {
        this.alertService.error(data.message);
        }

      });
    } else {
      this.validateFormControl();
    }
  }


  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }


  // On registration link click
  onRegister() {
    this.router.navigate(['/register']);
  }
  // test() {
  //   this.router.navigate(['/reset-password/U2FsdGVkX19nSB3NcFDWlHlC0C7HGn5NDu9sfQZE5uQ=/0']);
  //   // this.router.navigate(['reset-password'],  {queryParams: {'registerNo':this.registerNo}, skipLocationChange: false});
  // }
  openAddFileDialog() {

  }

}
