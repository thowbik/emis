import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  styleUrls: ['./health-profile.component.css']
})
export class HealthProfileComponent implements OnInit {
  form: FormGroup;
  schoolDetailForm: FormGroup;
  schlId: any;
  ParentTypelist: { label: string; value: string; }[];
  genderlist: { label: string; value: string; }[];
  healthlist: { label: string; value: string; }[];
  studentsInvalid: boolean;
  mediumEntryInvalid: boolean = false;
  class_sec: any;
  classlist: any;
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  section: any;
  class_id: any;
  section_id: any;
  studentlist: any;
  assigned_section1: any;
  studentnamelist: any;
  submitted: boolean;
  submitted1: boolean;
  classList: any;
  getHealthData: any;
  getdata1: any;
  delIndex: any;
  isAddData: boolean = false;
  covidList: { label: string; value: string; }[];
  showData: boolean = false;
  noSpecial: any = "^[a-zA-Z \b]+$";
  healthStatus:any[] =[];
  constructor(private fb: FormBuilder,
    private el: ElementRef,
    private alertService: AlertService,
    private school: schoolsService,
    private session: UserSessionService) {
    this.schlId = this.session.schoolId();
  }

  ngOnInit() {
    this.initialValidator();
    this.dropdownList();
    this.getStudentclasslist();
  }

  initialValidator() {
    this.form = this.fb.group({
      class: ['', Validators.required],
      section: ['', Validators.required],
      studentname: ['', Validators.required]
    })
    this.schoolDetailForm = this.fb.group({
      schoolnew_mediumentry_details: this.fb.array([]),
    });
  }

  dropdownList() {
    this.ParentTypelist = [
      { label: 'Myself', value: '9' },
      { label: 'Father', value: '1' },
      { label: 'Mother', value: '2' },
      { label: 'Brother', value: '3' },
      { label: 'Sister', value: '4' },
      { label: 'Uncle', value: '5' },
      { label: 'Aunty', value: '6' },
      { label: 'Grandfather', value: '7' },
      { label: 'Grandmother', value: '8' },
      { label: 'Other', value: '0' },
    ];
    this.genderlist = [
      { label: 'Male', value: '1' },
      { label: 'Female', value: '2' },
    ];
    this.healthlist = [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '2' },
    ];
    this.healthStatus = [
      { label: 'Healthy', value: '1' },
      { label: 'Not Healthy', value: '2' },
    ];
    this.covidList = [
      { label: 'Quarantine at home', value: '1' },
      { label: 'Quarantine at center', value: '2' },
      { label: 'Currently taking treatment', value: '3' },
      { label: 'Discharged', value: '4' },      
      { label: 'Expired', value: '5' }

    ];
  }

  //update validity for health issue
  onHealthChange(value, index) {
    debugger
    if (value == 2) {
      this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['HealthDetls'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['HealthDetls'].setValidators(null);
      this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['HealthDetls'].setValue("");
    }
    this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['HealthDetls'].updateValueAndValidity();
  }

  //update validity for covid 19
  onCovidChange(e, index) {
    if (e == 1) {
      this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['CovidStats'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['CovidStats'].setValidators(null);
      this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['CovidStats'].setValue("");
    }
    this.schoolDetailForm.controls['schoolnew_mediumentry_details']['controls'][index].controls['CovidStats'].updateValueAndValidity();
  }

  // add item for formarray
  addMediumInstruction(): void {
    debugger
    this.submitted = false;
    this.isAddData = false;
    this.submitted1 = true;
    if (this.form.valid) {
      const mediumadd = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
      if (this.schoolDetailForm.controls.schoolnew_mediumentry_details.valid) {
        mediumadd.push(this.createItem(this.form.value.studentname));
      }
      else {
        // this.mediumEntryInvalid = true;
      }
    }
    else {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys', key);
          invalidControl.focus();
          break;
        }
      }
      this.alertService.error("Please fill class, section and student name");
    }
  }

  //remove item from formarray
  removeMediumInstruction() {
    debugger
    const mediumremove = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
    if (mediumremove.length > 1) {
      this.mediumEntryInvalid = false;
      mediumremove.removeAt(mediumremove.length - 1);
    }
  }

  //create formgroup for formarray
  createItem(e) {
    return this.fb.group({
      ProfileTyp: new FormControl(1, null),
      UniqID: new FormControl(e, null),
      Name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.noSpecial)])),
      Relationshp: new FormControl('', Validators.required),
      Gendr: new FormControl('', Validators.required),
      Age: new FormControl('', Validators.required),
      HealthStats: new FormControl('', Validators.required),
      HealthDetls: new FormControl('', null),
      CovidAffctd: new FormControl('', Validators.required),
      CovidStats: new FormControl('', null),
      IsActive: new FormControl(1, null)
    });
  }

  //API integration for school list
  getStudentclasslist() {
    debugger
    this.school.getStudentcovid(this.schlId).subscribe(res => {
      if (res) {
        console.log(res)
        this.class_sec = res.classdetails;
        if (this.class_sec.length > 0) {
          this.classlist = this.class_sec;
          this.classlist.map(i => i['roman'] = this.class_in_roman[i['value']]);
          this.classList = this.classlist.map(l => { return { label: l.roman, value: l.value }; });
        }
      }
    })
  }

  //class onchange event
  onChangeClass(e) {
    debugger
    let filteredArary = this.class_sec.filter((element) => element.value == e);
    console.log(filteredArary)
    this.assigned_section1 = filteredArary[0].section;
  }

  //section onchange event
  onChangesection(e, c) {
    debugger
    this.section_id = e;
    var data = {
      "records":
      {
        "class_id": c,
        "section": this.section_id,
        "school_id": this.schlId
      }
    }
    this.school.getStudentwiselist(data).subscribe(res => {
      debugger;
      if (res.dataStatus) {
        this.studentlist = res.result;
        this.studentnamelist = [];
        if (this.studentlist.length > 0) {
          this.studentnamelist = this.studentlist.map(l => { return { label: l.name, value: l.id }; });
        }
      }
      else {
        this.studentnamelist = [];
      }

    })
  }

  //save health profile data
  onSaveschool() {
    debugger
    this.submitted = true;
    var subData = this.schoolDetailForm.value.schoolnew_mediumentry_details;
    // let filteredIndexArray = subData.filter((element) => element.IndxID == '' || element.IndxID == undefined);
    console.log(subData)
    if (this.schoolDetailForm.valid) {
      this.school.savestudentdata({ "records": subData }).subscribe((res) => {
        if (res.dataStatus) {
          this.alertService.success(res.message);
          var data = {
            "records":
            {
              "SchlID": this.schlId,
              "ClassID": this.form.value.class,
              "SectionID": this.form.value.section,
              "StudUniqID": this.form.value.studentname
            }
          }
          this.getHealthData = [];
          this.school.getHealthProfileData(data).subscribe((res) => {
            if (res.dataStatus) {
              this.getHealthData = res.result;
              if (this.getHealthData.length > 0) {
                this.getMediumInstruction(this.getHealthData);
              }
            }
            else {
              this.alertService.error(res.message);
            }
          })
          
        }
        else {
          this.alertService.error(res.message);
        }
      })
    }
    else {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys', key);
          invalidControl.focus();
          break;
        }
      }
      this.alertService.error('Please Fill all the Required Fields');
    }
  }

  //get updated data
  getMediumInstruction(item) {
    debugger;

    const mediumentry = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
    const mediumDataValues = item;

    if(item) {
      if (mediumDataValues.length > 0) {
        const mediumentry = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
        while (mediumentry.length !== 0) {
          mediumentry.removeAt(0)
        }
      }
      for (let i = 0; i < item.length; i++) {
        mediumentry.push(this.fb.group({
          IndxID: item[i].IndxID,
          ProfileTyp: item[i].ProfileTyp,
          UniqID: item[i].UniqID,
          Name: item[i].Name,
          Relationshp: item[i].Relationshp,
          Gendr: item[i].Gendr,
          Age: item[i].Age,
          HealthStats: item[i].HealthStats,
          HealthDetls: item[i].HealthDetls,
          CovidAffctd: item[i].CovidAffctd,
          CovidStats: item[i].CovidStats,
          IsActive: item[i].isActive,
        })
        )
      }
    }
   
  }

  //get data and student change
  onStudentChange(stuId, classId, secId) {
    debugger
   // this.schoolDetailForm.controls['schoolnew_mediumentry_details'] = this.fb.array([]);
    var data = {
      "records":
      {
        "SchlID": this.schlId,
        "ClassID": classId,
        "SectionID": secId,
        "StudUniqID": stuId
      }
    }
    this.getHealthData = [];
    this.school.getHealthProfileData(data).subscribe((res) => {
      this.showData = true;
      if (res.dataStatus) {
        this.getHealthData = res.result;
        if (this.getHealthData.length > 0) {
          this.getMediumInstruction(this.getHealthData);
          this.isAddData = false;
        }
        else 
        {
       this.isAddData = true;
        const mediumentrylevel = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
        while (mediumentrylevel.length !== 0) {
          mediumentrylevel.removeAt(0)
        }
        }
      }
      else {
        this.alertService.error(res.message);
      }
    })
  }
  
  //edit
  onEdit(data) {
    debugger
    var editdata = {};
    if (data.value.IndxID) {
       editdata = {
        "records":
        {
          "IndxID": data.value.IndxID,
          "ProfileTyp": data.value.ProfileTyp,
          "UniqID": data.value.UniqID,
          "Relationshp": data.value.Relationshp,
          "Name": data.value.Name,
          "Gendr": data.value.Gendr,
          "Age": data.value.Age,
          "HealthStats": data.value.HealthStats,
          "HealthDetls": data.value.HealthDetls,
          "CovidAffctd": data.value.CovidAffctd,
          "CovidStats": data.value.CovidStats,
          "IsActive": data.value.IsActive,
        }
      }
    }
    else {
       editdata = {
        "records":
        [{
          "IndxID": data.value.IndxID,
          "ProfileTyp": data.value.ProfileTyp,
          "UniqID": data.value.UniqID,
          "Relationshp": data.value.Relationshp,
          "Name": data.value.Name,
          "Gendr": data.value.Gendr,
          "Age": data.value.Age,
          "HealthStats": data.value.HealthStats,
          "HealthDetls": data.value.HealthDetls,
          "CovidAffctd": data.value.CovidAffctd,
          "CovidStats": data.value.CovidStats,
          "IsActive": data.value.IsActive,
        }]
      }
    }
      this.school.savestudentdata(editdata).subscribe((res) => {
        if (res.dataStatus) {
          this.alertService.success(res.message);
          var data = {
            "records":
            {
              "SchlID": this.schlId,
              "ClassID": this.form.value.class,
              "SectionID": this.form.value.section,
              "StudUniqID": this.form.value.studentname
            }
          }
          this.getHealthData = [];
          this.school.getHealthProfileData(data).subscribe((res) => {
            if (res.dataStatus) {
              this.getHealthData = res.result;
              if (this.getHealthData.length > 0) {
                this.getMediumInstruction(this.getHealthData);
              }
            }
            else {
              this.alertService.error(res.message);
            }
          })
        }
        else {
          this.alertService.error(res.message);
        }
      })

    }

  //delete
  onDelete(data) {
    debugger;
    if (data.value.IndxID == undefined) {
      this.alertService.error('Please Save Data');
    }
    else {
      this.delIndex = data.value.IndxID;
      // var deletedata = {
      //   "records":
      //   {
      //     "IndxID": this.delIndex
      //   }
      // }
      var deletedata = {"records":{"delete":{"IndxID":this.delIndex}}}

        
      this.school.savestudentdata(deletedata).subscribe(res => {
        if (res) {
          this.alertService.success(res.message);
          var data = {
            "records":
            {
              "SchlID": this.schlId,
              "ClassID": this.form.value.class,
              "SectionID": this.form.value.section,
              "StudUniqID": this.form.value.studentname
            }
          }
          this.getHealthData = [];
          this.school.getHealthProfileData(data).subscribe((res) => {
            if (res.dataStatus) {
              this.getHealthData = res.result;
              if (this.getHealthData.length > 0) {
                this.getMediumInstruction(this.getHealthData);
              }
              else {
                
                const healthFormArray = this.schoolDetailForm.controls.schoolnew_mediumentry_details as FormArray;
                while (healthFormArray.length !== 0) {
                  healthFormArray.removeAt(0)
                }
              }
            }
            else {
              this.alertService.error(res.message);
            }
          })
        }
        else {
          this.alertService.error(res.message);
        }
      })
    }
  }

}
