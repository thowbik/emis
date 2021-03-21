import { SelectItem } from 'primeng';
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { MessageService } from 'primeng/api';
import { TimesheetService } from '../timesheet.service';
import * as moment from 'moment';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css'],
  providers: [MessageService]

})
export class ProjectCreationComponent implements OnInit {
  form: FormGroup;
  mediumEntryInvalid: boolean;
  application: any;
  applicationList: any;
  resourcenameList: any;
  roleList: any;
  startdate: any;
  enddate: any;

  validateAllFormFields: any;
  submitted: boolean;
  dropdown: { label: string; value: number; }[];
  schoolId: any;
  timeallotmentvalid: boolean = false;
  timeallotdetails: any[] = [];

  timecommitmentList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Partial', value: '1' },
    { label: 'Full', value: '2' }];


  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.initialValidator();
    this.getDropdownValues();
    const dayEntryformArray1 = this.form.controls.project_creation_details as FormArray;
    if (dayEntryformArray1.length < 1) {
      dayEntryformArray1.push(this.createItem());
    }
  }

  initialValidator() {
    this.form = this.fb.group({
      salary: new FormControl('', Validators.required),
      datedisbur: new FormControl('', Validators.required),
   
    });
  }

  getDropdownValues() {
    this.timesheetService.getDropdownList(true).subscribe((result) => {
      this.application = result;
      this.applicationList = this.application['application_list'].map(item => {
        return {
          label: item.app_name,
          value: item.appli_id
        }
      });
      this.roleList = this.application['role_list'].map(item => {
        return {
          label: item.role_description,
          value: item.role_id
        }
      });
      this.resourcenameList = this.application['resourcer_list'].map(item => {
        return {
          label: item.resource_name,
          value: item.resource_id
        }
      });
    });
  }


  createItem() {
    return this.fb.group({
      resource_id: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
      time_commit: new FormControl('', Validators.required)
    });
  }

  // getProjectCreation(item) {
  //   debugger;
  //   const projectentry = this.form.controls.project_creation_details as FormArray;
  //   const mediumDataValues = item;
  //   if (mediumDataValues.length > 0) {
  //     const projectentry = this.form.controls.project_creation_details as FormArray;
  //     while (projectentry.length !== 0) {
  //       projectentry.removeAt(0)
  //     }
  //   }
  //   for (let i = 0; i < item.length; i++) {
  //     projectentry.push(this.fb.group({
  //       resource_id: item[i].resource_id,
  //       role_id: item[i].role_id,
  //       time_commit: item[i].time_commit,

  //     })
  //     )
  //   }
  // }


  addMediumInstruction(): void {
    debugger
    const projectadd = this.form.controls.project_creation_details as FormArray;
    if ((projectadd.length < this.resourcenameList.length) && (projectadd.length < 10)) {
      if (this.form.controls.project_creation_details.valid) {
        projectadd.push(this.createItem());
      }
      else {
        this.mediumEntryInvalid = true;
      }
    }
  }

  removeMediumInstruction() {
    const projectremove = this.form.controls.project_creation_details as FormArray;
    if (projectremove.length > 0) {
      this.mediumEntryInvalid = false;
      projectremove.removeAt(projectremove.length - 1);
    }
  }



  chooseResourcename(event, index) {
    var selectedResourceName = event.value;
    (<FormArray>this.form.controls['project_creation_details']).at(index).patchValue({ resource_id: '' });
    debugger;
    const checkAvailable = this.form.value.project_creation_details.find(x => x.resource_id == selectedResourceName)
    if (checkAvailable) {
      this.alertService.error("Option Already Selected");
    }
    else {
      (<FormArray>this.form.controls['project_creation_details']).at(index).patchValue({ resource_id: selectedResourceName });
    }
  }

  onSave() {
    debugger
    this.submitted = true;
    this.startdate = moment(this.form.value.start_date).format('YYYY-MM-DD');
    this.enddate = moment(this.form.value.target_completion).format('YYYY-MM-DD');
    var data = {
      "records": [{
        "project_creation": {
          "module_reference": this.form.value.project_id,
          "application": this.form.value.Application_id,
          "module_name": this.form.value.Module_id,  
          "start_date": this.startdate,
          "planned_end_date": this.enddate,
          "module_scope_filepath": this.form.value.document_link,
        }
      },
      {
         "resource_allotment": this.form.value.project_creation_details
      }]
    }
    console.log(data);
    if (this.form.valid) {
      this.timesheetService.saveProjectCreation(data).subscribe(res => {
        debugger
        if (res.dataStatus == true) {
          this.alertService.success(res.message);
        }
        else {
          this.alertService.error(res.message);
        }
      });
    }
  }

  onCancel() {
    this.ngOnInit();
  }

}
