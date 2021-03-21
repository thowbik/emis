import { Component, ElementRef, OnInit } from '@angular/core';
import { schoolsService } from '../../full-layout-page/schools/schools.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SortEvent } from 'primeng/api';
import { registerOutsideClick } from 'ngx-bootstrap';

@Component({
  selector: 'app-teachersassessmentreport',
  providers: [schoolsService],
  templateUrl: './teachersassessmentreport.component.html',
  styleUrls: ['./teachersassessmentreport.component.css']
})
export class TeachersassessmentreportComponent implements OnInit {
  classid: any[];
  groupid: any[];
  mediaumid: any[];
  questions: any;
  number: any;
  schoolId: any;
  result: any;
  form: FormGroup;
  table: boolean = true;
  nodata: boolean = true;
  submitted: boolean = false;
  classbasegroup: boolean = true;
  classList: any;
  groupList: any;
  mediumList: any;
  class: any
  group: any
  medium: any
  dataHeader: Array<{ 'field': string, 'header': string, 'widthstyle': string, "textalign": string }> = [
    { field: 'lo_desc', header: 'Learning Outcome', widthstyle: '15em', textalign: "center" },
    { field: 'subject', header: 'Subject', widthstyle: '4em', textalign: "center" },
    { field: 'correct_answer_percentage', header: 'Percentage Of Students Answered Correctly', widthstyle: '6em', textalign: "" },
    { field: 'wrong_answer_percentage', header: 'Percentage Of Students Answered Incorrectly', widthstyle: '6em', textalign: "" }
  ];
  correctpercentage: any;
  mediumbasegroup: any;
  Medium: any;
  subject: any;
  uniq_subject: number;
  subjectverify: any;
  subjects: any;
  subjectfilter: any;
  subjectlist: any;
  Subject:boolean=true;
  completeData: any[]=[];
  selectedOption: any;

  constructor(private schoolsservice: schoolsService, private el: ElementRef, private fb: FormBuilder, private alert: AlertService, private userSessionService: UserSessionService) {
    this.schoolId = this.userSessionService.schoolId();
    console.log("schoolid", this.schoolId)
  }

  ngOnInit() {
    this.initialValidator();
    this.getClassSectionData();
    this.classId();
  }

  classId() {
    this.classList = [
      // { label: 'I', value: '1' },
      // { label: 'II', value: '2' },
      // { label: 'III', value: '3' },
      // { label: 'IV', value: '4' },
      // { label: 'V', value: '5' },
      // { label: 'VI', value: '6' },
      // { label: 'VII', value: '7' },
      // { label: 'VIII', value: '8' },
      { label: 'IX', value: '9' },
      { label: 'X', value: '10' },
      { label: 'XI', value: '11' },
      { label: 'XII', value: '12' },
    ];
  }

  initialValidator() {
    this.form = this.fb.group({
      classId: ['', Validators.required],
      groupId: ['', null],
      mediumId: ['', Validators.required],
    })
  }

  getClassSectionData() {
    this.schoolsservice.getschoolclasses(this.schoolId, true).subscribe(list => {
      console.log("check", list)
      if (list.dataStatus) {
        this.mediumList = list['mediumdetails'].map(item => { return { "label": item.MEDINSTR_DESC, "value": item.MEDINSTR_ID } });
        console.log(this.mediumList, "mediumList");
      }
    })
  }

  onChangeMedium(medium_label) {
    this.mediumbasegroup = (this.groupList).filter(res => res.mediumm == medium_label);
  }
  onChangeSubject(event){
    if(event["subject"]=="ALL SUBJECT"){
      this.result = this.completeData;     
    }else{
      this.result = (this.subjectlist).filter(res=> res.subject == event.subject );
    }
   
  }
  onChangeClass(cls_id) {
    if (cls_id == "11" || cls_id == "12") {
      this.classbasegroup = false;
      this.class = cls_id
      var data = {
        "records": {
          "schl_id": this.schoolId,
          "class_id": this.class
        }
      }
      this.schoolsservice.getgruopusingclass(data).subscribe(res => {
        this.groupList = res.data.map(item => { return { "label": item.group_name, "value": item.group_id, "mediumm": item.medium } });
        for (var i = 0; i < this.groupList.length; i++) {
          this.Medium = this.groupList[i].mediumm;
        }
      })
    } else {
      this.classbasegroup = true;
    }
  }

  save() {
    debugger
    if (this.form.value.classId.value == 11 || this.form.value.classId.value == 12) {
      this.form.controls['groupId'].setValidators(Validators.required);
      this.form.controls['groupId'].updateValueAndValidity();
    } else {
      this.form.controls['groupId'].setValidators(null);
    }
    this.submitted = true;
    if (!this.form.valid) {
      for (const key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
    }
    else {
      this.class = this.form.value.classId.value;
      this.group = this.form.value.groupId.value;
      this.medium = this.form.value.mediumId.value;
      if (this.class == "11" || this.class == "12") {
        debugger
        var data = {
          classId: this.class,
          groupId: this.group,
          mediumId: this.medium
        }
      } else if (this.class == "10") {
        debugger
        this.group = "10"
        var data = {
          classId: this.class,
          groupId: this.group,
          mediumId: this.medium
        }
      }
      else if (this.class == "9") {
        debugger
        this.group = "9"
        var data = {
          classId: this.class,
          groupId: this.group,
          mediumId: this.medium
        }
      }
      this.schoolsservice.getteachersassessmentreport(this.schoolId, data).subscribe((res) => {
        if (res.length != 0) {
          this.table = false;
          this.nodata = true;
          this.completeData = res;
          this.result = res;

          this.subjectlist = res.map(item => { return {"lo_desc":item.lo_desc, "subject":item.subject,"correct_answer_percentage":item.correct_answer_percentage,"wrong_answer_percentage":item.wrong_answer_percentage} });
          this.subject = this.result.map(item => item.subject);
          this.subjectverify = this.subject
          var mySet = new Set(this.subjectverify);      
          this.subjectverify = [...mySet];
          this.subjects = this.subjectverify.map(item => { return { "subject":item } }); 
        this.subjects.push({"subject":"ALL SUBJECT"})
        this.selectedOption = "";
        } else {
          this.nodata = false
          this.table = true;
        }
      }
      )
    }
  }

  exportPdf() {
    window.print();
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      return (event.order * result);
    });
  }

}
