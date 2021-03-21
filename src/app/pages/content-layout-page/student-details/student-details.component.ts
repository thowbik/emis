import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentForm : FormGroup;
  smartcardlist: any;
  studentname: any;
  dob: any;
  Bloodgroup: any;
  image: any;
  origin: any;
  phonenumber: any;
  profileurl: any;
  smartid: any;
  constructor(private fb:FormBuilder,public contentService: ContentService,private router: Router) { }

  ngOnInit() {
this.GetSmartCardDetails();

    this.studentForm = this.fb.group(
      {
        TamilName : [''],
         SclName : [''],
         UniqueId :[''],
         Gender : [''],
         BloodGrp : [''],
         MothTungName :[''],
         DiffAbled : [''],
         FathNam : [''],
         MothNam : [''],
         FatherOcc :[''],
         MotherOcc : [''],
         GuardName :[''],
         HouseAdds :[''],
         StrName :[''],
         AreaVillage : [''],
         DistName :[''],
         PinCode :[''],
         PhoneNum :[''],
         Email :[''],
         DOJ : [''],
         ClsSec :[''],
         MEDINSTR :[''],
         SclAdmNo :[''],
         image_name :[''],    
      }
    )
  }
  // Smartcardservicegetapi:
  GetSmartCardDetails(){
    debugger;
  this.contentService.Smartcardgetapi().subscribe((res) => {
      this.smartcardlist = res.result[0];
      this.studentname = res.result[0].Name;
      this.dob = res.result[0].BOD;
      this.Bloodgroup = res.result[0].BloodGrp;
      this.phonenumber = res.result[0].PhoneNum;
      this.profileurl = res.result[0].Img;
      this.smartid = res.result[0].SmartID;
      this.studentForm.patchValue(this.smartcardlist);        
    });
    // var id = this.smartid;
    // this.router.navigate(['/http://localhost:4200/student-qr' + id]);
  }
  
}