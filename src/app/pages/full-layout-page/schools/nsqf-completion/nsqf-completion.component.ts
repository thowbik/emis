import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { schoolsService } from '../schools.service';

@Component({
  selector: 'app-nsqf-completion',
  templateUrl: './nsqf-completion.component.html',
  styleUrls: ['./nsqf-completion.component.css']
})
export class NsqfCompletionComponent implements OnInit {
  form: FormGroup;
  schoolId: number;

  constructor(private fb: FormBuilder,
    private userSessionService : UserSessionService,
    private schoolService : schoolsService) {
    this.schoolId = this.userSessionService.schoolId();
   }

  ngOnInit() {
    this.initialValidators();
this.getData();
  }
  initialValidators() {
    this.form = this.fb.group({
      nqsfcompletion: this.fb.array([]),  
    });
  }
  createItem() {
    return this.fb.group({
      IndxID: new FormControl('', null),
      SchlID: new FormControl(this.schoolId, null),
      Class  : new FormControl('', Validators.required),
      JobRole  : new FormControl('', Validators.required),
      FEBWrkDays  : new FormControl('', Validators.required),
      MARWrkDays  : new FormControl('', Validators.required),
      APRWrkDays  : new FormControl('', Validators.required),
      TheoryHrs  : new FormControl('', Validators.required),
      TheoryPC  : new FormControl('', Validators.required),
      PractclHrs  : new FormControl('', Validators.required),
      PractclPC  : new FormControl('', Validators.required)
    });
  }
  getData() {
  var records =  {"records":
{
    "school_id":this.schoolId
}
};

this.schoolService.getSylabusDetails(records).subscribe(res => {
      if (res.dataStatus) {
        debugger;
        
      }
      else {
        const ngsfCompletion = this.form.controls.nqsfcompletion as FormArray;
        debugger;
        // while (ngsfCompletion.length !== 0) {
        //   ngsfCompletion.removeAt(0)
        // }
        for (let i = 0; i <= 3; i++) {
          ngsfCompletion.push(this.createItem());
        } 
      }
    });
  }
  save() {
    var records =  {"records":this.form.value.nqsfcompletion
    };
    this.schoolService.getSylabusDetails(records).subscribe(res => {
      if (res.dataStatus) {
        debugger;
        this.getData();
      }
      else {
        const ngsfCompletion = this.form.controls.nqsfcompletion as FormArray;
        debugger;
        // while (ngsfCompletion.length !== 0) {
        //   ngsfCompletion.removeAt(0)
        // }
        for (let i = 0; i <= 3; i++) {
          ngsfCompletion.push(this.createItem());
        } 
      }
    });
  }
}
