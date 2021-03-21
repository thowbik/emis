import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigationService } from 'src/services/navigation.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-registraion',
  templateUrl: './school-registraion.component.html',
  styleUrls: ['./school-registraion.component.css']
})
export class SchoolRegistraionComponent implements OnInit {
  registration: FormGroup ;
  management_dropdown: { label: string; value: string; }[];
  selected_type_values: any;
  School_Management_ID: any;
  Management_category_ID: any;
  School_Directorate_ID: any;
  submitted: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private alertService: AlertService,
    private userSessionService : UserSessionService,
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder, private el: ElementRef) {
    this.router = router; }

  ngOnInit() {
    this.management_dropdown=[
      {label : " Nursery & Primary Schools " , value : "24 - 3 - 29"},
      {label : " Matricualation Schools " , value : "23 - 3 - 28"}
      // {label : " pla school " , value : "22 - 0 - 0 "}
    ];

    this.registration = this.fb.group({ 
      'school_name': new FormControl('',[Validators.required, Validators.pattern("^[a-z A-Z]*$")]),
      'school_email': new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]),
      'school_mobile': new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'school_management': new FormControl('',Validators.required),
     })
  }

  MangmntTypeOption(value){
   this.selected_type_values = value;
  //  console.log(this.selected_type_values.value);

   let  selected_type_value = this.selected_type_values.value.split('-');
   this.School_Management_ID  = selected_type_value[0];
   this.Management_category_ID = selected_type_value[1];
   this.School_Directorate_ID  = selected_type_value[2];
  //  console.log(this.School_Management_ID);
  //  console.log(this.Management_category_ID);
  //  console.log(this.School_Directorate_ID);

  }

  save_data(){
    this.submitted = true;
    debugger;
    if (this.registration.valid) { 
    let
    school_name=this.registration.value.school_name,
    mobile =this.registration.value.school_mobile,
    email =this.registration.value.school_email;

    let data = {"school_name" : school_name, "mobile" : mobile, "manage_cate_id" : this.Management_category_ID, "sch_management_id" : this.School_Management_ID, "sch_directorate_id" : this.School_Directorate_ID , "email" : email};
    // console.log(data  );
   
    this.authService.School_Registration_API({"records":data}, true).subscribe((res) => {
      if(res != 0){
        this.alertService.success("Registration Successfully");
        this.submitted= false;
        this.registration.reset();
        this.router.navigate(['login']);
      }    
        else {

      }
    })
  }
  else {
    for (const key of Object.keys(this.registration.controls)) {
      if (this.registration.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
  }
}

}
