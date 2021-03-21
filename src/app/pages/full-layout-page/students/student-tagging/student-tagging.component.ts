import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { StudentService } from '../student.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-student-tagging',
  templateUrl: './student-tagging.component.html',
  styleUrls: ['./student-tagging.component.css']
})
export class StudentTaggingComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  dataHeader: Array<Object> = [];
  selectedColumns: Array<Object> = [];
  studentList: Array<Object> = [];
  clonedStudentList: any;
  class_id: any;
  displayDialog: boolean = false;
  nmmsExamPassedOn: any;
  trstseExamPassedOn: any;
  awardTopic: any;
  studentName: any;
  classList: any[] = [];
  isShowTable: boolean = false;
  data: any;
  schoolId: any;
  schoolTypeId: number;
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  assigned_section: string;
  sectionList: any[] = [];
  classId: any;
  sectionId: number;
  rteType: any;
  rte: any[] = [];
  cwseList: any[] = [];
  benefitList: any[] = [];
  presentStatus: any[] = [];
  sectorList: any[] = [];
  jobRoleList: any[] = [];
  sportsList: any[] = [];
  providedByList: any[] = [];
  playedLevelList: any[] = [];
  studentFullTaggingData: any;
  studentNSSTaggingData: any;
  selectedStudentIndex: number;
  acadYearList: any[] = [];
  acadYearLists: any[] = [];
  classList_val: any[] = [];
  winnerLevelList: any[] = [];
  TrainingTypeList: any[] = [];
  isShowRteType: boolean;
  isShowRte: boolean;
  sele_cls_id: any;
  class_id_list: any;
  sele_sect_id: any;
  sele_sch_id: any;
  section_sc: any[] = [];
  checked1: boolean = false;
  checked2: boolean = false;
  checked3: boolean = false;
  checked4: boolean = false;
  checked5: boolean = false;
  checked6: boolean = false;
  ParticipationTypeId1: any;
  ParticipationTypeId2: any;
  ParticipationTypeId3: any;
  ParticipationTypeId4: any;
  ParticipationTypeId5: any;
  checked: boolean = false;
  stu_id: any;
  rte_typ_val: any;
  OnchangeYear: any;
  CurrentYear: any;
  Participationlevels4: any;

  constructor(private messageService: MessageService, private studentService: StudentService, private userSessionService: UserSessionService,
    public fb: FormBuilder, private alertService: AlertService) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = this.userSessionService.schoolTypeId();
  }

  ngOnInit() {
    debugger
    this.sampleData();
    this.getClassLists();
    this.getRteType();
    this.initialValidator();
    this.onNssTagging();
  }
  initialValidator() {
    this.form = this.fb.group({
      'school_id': new FormControl(this.schoolId, Validators.required),
      'unique_id_no': new FormControl('', Validators.required),
      'class_id': new FormControl('', Validators.required),
      'section': new FormControl('', Validators.required),
      'rte': new FormControl('', null),
      'rte_type': new FormControl('', null),
      'cwsn': new FormControl('', null),
      'nation_id': new FormControl('', null),
      'benefit': new FormControl('', null),
      'provided_by': new FormControl('', null),
      'academic_year': new FormControl('', null),
      'nmms_exam_passed': new FormControl('', null),
      'trstse_exam_passed': new FormControl('', null),
      'inspire_award_date': new FormControl('', null),
      'inspire_award_topic': new FormControl('', null),
      'student_name': new FormControl('', null),
      'present_status': new FormControl('', null),
      'training_type': new FormControl('', null),
      'ac_year': new FormControl('', null),
      'sector': new FormControl('', null),
      'jobrole': new FormControl('', null),
      'gender': new FormControl('', null),
      'community_id': new FormControl('', null),
      'acyear': new FormControl('', Validators.required),
      'participate_subtype_id1': new FormControl('', null),
      'participate_subtype_id2': new FormControl('', null),
      'participate_subtype_id3': new FormControl('', null),
      'participate_subtype_id4': new FormControl('', null),
      'participate_subtype_id5': new FormControl('', null),
      'Participationlevel4': new FormControl('', null),
    });
  }
  sampleData() {
    this.dataHeader = [
      { field: 'name', header: 'Name' },
      // { field: 'gender', header: 'Name in Tamil' },
      // { field: 'nmms_exam_passed_on', header: 'NMMS Exam Passed on' },
      // { field: 'trstse_exam_passed_on', header: 'TRSTSE Exam Passed on'},
      // { field: 'award_date', header: 'Inspire Award date' },
      // { field: 'award_topic', header: 'Inspire Award Topic' },
    ];
    this.selectedColumns = this.dataHeader;
    this.rte = [{ "label": "Yes", "value": "Yes" }, { "label": "No", "value": "No" }];
    this.providedByList = [{ "label": "ALIMCO", "value": "ALIMCO" }, { "label": "NON-ALIMCO", "value": "NON-ALIMCO" }, { "label": "DDAWO", "value": "DDAWO" }, { "label": "Others", "value": "Others" }];

    this.acadYearList = [{ "label": "2019-2020", "value": "2019-2020" }, { "label": "2018-2019", "value": "2018-2019" }];
    this.acadYearLists = [{ "label": "2020-2021", "value": "2021" }, { "label": "2019-2020", "value": "2020" }, { "label": "2018-2019", "value": "2019" }];
    this.playedLevelList = [{ "label": "School", "value": 1 },
    { "label": "Zone", "value": 2 },
    { "label": "Division", "value": 3 },
    { "label": "Block", "value": 4 },
    { "label": "District", "value": 5 },
    { "label": "State", "value": 6 }];
    this.winnerLevelList = [{ "label": "First (Gold)", "value": 1 },
    { "label": "Second(Silver)", "value": 2 },
    { "label": "Third(Bronze)", "value": 3 }];
    this.TrainingTypeList = [{ "label": "Non - residential Special training centres", "value": "Non - residential Special training centres" },
    { "label": "Residential special training centes", "value": "Residential special training centes" },
    { "label": "KGBVs", "value": "KGBVs" }];
  }
  getClassLists() {
    this.studentService.getClassesBySchoolId(this.schoolId, true).subscribe((res) => {

      if (res) {
        // debugger;
        // console.log("test",res);
        // this.classList = res.result;
        // // console.log("class",this.classList);
        // // this.classList.map(i=> i['label'] = this.class_in_roman[i['value']]);
        // this.classList_val = this.classList.map(l => { return { label: l.class_studying, value: l.class_id + "-" +l.revalent_section}; });
        // console.log(this.classList,"sele");
        // var Slet_cls_section = this.classList_val.split("-");
        // console.log(Slet_cls_section,"Slet_cls_section");
        // debugger;
        // let datas = {"id" : id, "district_id" : this.get_dist_id  }
        debugger;
        let dropDownList = res.result;
        console.log("class", dropDownList);

        this.classList_val = [];
        if (dropDownList.length > 0) {
          for (let i = 0; i < dropDownList.length; i++) {
            this.classList_val.push({ value: dropDownList[i].class_id + "-" + dropDownList[i].revalent_section + "-" + dropDownList[i].school_key_id, label: dropDownList[i].class_studying })
          }

          this.classList_val.push({ value: 0 + "-" + dropDownList[9].revalent_section + "-" + dropDownList[9].school_key_id, label: "Past XII Students" });

          console.log(this.classList_val);

        }
        else {
          this.classList_val.push({ value: "", label: "No Data" })
        }
      }
    });
  }
  getRteType() {
    debugger
    this.studentService.getRteType().subscribe(data => {
      // console.log(data);
      this.rteType = data['rteType'];
      this.rte_typ_val = [];
      console.log("legth" + this.rteType.length);
      // this.rteType.push({ id: '0', label: 'Not Applicable' });
      for (let i = 0; i < this.rteType.length; i++) {
        this.rte_typ_val.push({ value: this.rteType[i].id, label: this.rteType[i].label })
      }

    });
  }
  onStudentSelect(list: any, index: any) {
    debugger;
    var studentId = list.unique_id_no;
    this.form.controls['unique_id_no'].setValue(studentId);
    this.form.controls['student_name'].setValue(list.name);
    this.form.controls['community_id'].setValue(list.community_id);
    this.form.controls['gender'].setValue(list.gender);
    this.selectedStudentIndex = index;
    this.displayDialog = true;
    this.onTaggingEdit();


  }

  onTaggingEdit() {

    this.ParticipationTypeId1 = 0;
    this.ParticipationTypeId2 = 0;
    this.ParticipationTypeId3 = 0;
    this.ParticipationTypeId4 = 0;
    this.ParticipationTypeId5 = 0;
    this.Participationlevels4 = 0;
    var selectedStudentRecords = { "records": { "class_id": this.sele_cls_id, "school_id": this.schoolId, "student_id": this.form.value.unique_id_no } }
    this.studentService.getStudentTaggingData(selectedStudentRecords, true).subscribe((res) => {
      if (res) {
        debugger;
        this.studentFullTaggingData = res.result.student_tag1[0];

        this.form.patchValue(this.studentFullTaggingData);
        if (this.studentFullTaggingData.rte != 'Yes') { this.form.controls['rte_type'].setValue(""); }
        this.onNssTagging();
      }
    });
  }
  onRowEditSave(list: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student List is updated' });
    // if (list.year > 0) {
    //     delete this.clonedStudentList[list.vin];
    //     this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
    // }
    // else {
    //     this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
    // }
  }
  onRowEditCancel(list: any, index: number) {
    this.clonedStudentList[index] = this.clonedStudentList[list.name];
    delete this.clonedStudentList[list.name];
  }
  onChangeClass(event) {
    debugger;

    this.classId = event.value;


    var data_selec = this.classId.split("-");
    this.sele_cls_id = data_selec[0];
    this.sele_sect_id = data_selec[1];
    this.sele_sch_id = data_selec[2];



    // This will return an array with strings "1", "2", etc.

    // this.section_sc = split_sec.push({ label: 'All', value: '0' });
    let split_sec = this.sele_sect_id.split(',');


    let dropDownList = split_sec;


    this.section_sc = [];

    if (dropDownList != 0) {
      for (let i = 0; i < dropDownList.length; i++) {

        this.section_sc.push({ value: dropDownList[i], label: dropDownList[i] })

      }
    }
    else {
      this.section_sc.push({ value: "", label: "No Data" })
    }


    if (this.sele_cls_id == 0) {

      this.class_id_list = 12;
      this.sectionId = 0;
      this.acadYearLists = [{ "label": "2018-2019", "value": "2019" }];


    }
    else {

      this.acadYearLists = [{ "label": "2020-2021", "value": "2021" }, { "label": "2019-2020", "value": "2020" }, { "label": "2018-2019", "value": "2019" }];

      this.class_id_list = this.sele_cls_id;
    }

    var records = { "records": { "class_id": this.class_id_list, "school_id": this.schoolId } }
    this.studentService.getSectionList(records, true).subscribe((res) => {
      if (res) {
        debugger;
        this.sectionList = res.result.map(l => { return { label: l.section, value: l.section }; });
        //  console.log("list",this.sectionList);
        this.sectionList.push({ label: 'All', value: '0' });
        // this.sectionList =res.result;

      }
    });
  }
  onChangeSection(event) {
    debugger;

    this.sectionId = event.value;
  }
  submit() {
    debugger;

    var studentRecords = {
      "records": {
        "school_id": this.schoolId,
        "class_id": this.sele_cls_id,
        "section": this.sectionId
      }

    }
    this.class_id = studentRecords['records']['class_id'];

    this.isShowTable = true;
    this.studentService.getStudentTaggingList(studentRecords, true).subscribe((res) => {
      if (res) {
        debugger;
        this.studentList = res.result.studentlist;
        this.displayDialog = false;
        this.cwseList = res.result.cwse.map(l => { return { label: l.da_name, value: l.da_code }; });
        this.cwseList.push({ label: 'Not Applicable', value: '0' });//console.log(this.cwseList);
        this.benefitList = res.result.benefit.map(l => { return { label: l.benefit, value: l.id }; });
        this.presentStatus = res.result.present_status.map(l => { return { label: l.child_status, value: l.id }; });
        this.sectorList = res.result.sector_list.map(l => { return { label: l.sector, value: l.id }; });
        this.sectorList.push({ label: 'Not Applicable', value: '0' }); //console.log(this.sectorList);
        this.jobRoleList = res.result.job_role_list.map(l => { return { label: l.job_role, value: l.id }; });
        this.sportsList = res.result.sportslist.map(l => { return { label: l.sport_name, value: l.id }; });
        // sportslist

      }
    });
  }
  saveRTE() {
    // console.log('save RTE fUN',this.isShowRteType);
    //validation rte 
    if (this.form.value.rte == '') {
      this.alertService.error('Please Select RTE'); return true;
    } else if (this.form.value.rte == 'Yes' && this.form.value.rte_type == '') {
      this.alertService.error('Please Select RTE Type'); return true;
    }

    // console.log('all this.form.value',this.form.value);
 var records =  {"school_id":this.schoolId,"unique_id_no":this.form.value.unique_id_no,"class_id":this.sele_cls_id,"section":this.sectionId,"rte":this.form.value.rte,"rte_type":this.form.value.rte_type}

    this.studentService.saveRte(records, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success(res.message);
        this.onTaggingEdit();
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }

  saveCWSN() {

    this.studentService.saveCwsn(this.form.value, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success(res.message);
        this.onTaggingEdit();
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }

  saveTaggingAwards() {
    this.studentService.saveAwards(this.form.value, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success('res.message');
        this.onTaggingEdit();
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }

  saveSports() {
    this.studentService.saveSports(this.form.value, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success('res.message');
        this.onTaggingEdit();
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }

  saveOSC() {
    this.studentService.saveOsc(this.form.value, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success("OSC Saved Successfully");
        this.onTaggingEdit();
      }
    });
  }

  saveVocation() {

    if (this.form.value.sector == '') {
      this.alertService.error('Please Select Sector'); return true;
    }
    if (this.form.value.sector != '0' && this.form.value.jobrole == '') {
      this.alertService.error('Please Select Job Role'); return true;
    }
    else if (this.form.value.sector == '0') {
      this.form.value.jobrole = '';
    }
    this.studentService.saveVocation(this.form.value, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success(res.message);
        this.onTaggingEdit();
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }


  onNssTagging() {
    this.ParticipationTypeId1 = 0;
    this.ParticipationTypeId2 = 0;
    this.ParticipationTypeId3 = 0;
    this.ParticipationTypeId4 = 0;
    this.ParticipationTypeId5 = 0;
    this.checked1 = false;
    this.checked2 = false;
    this.checked3 = false;
    this.checked4 = false;
    this.checked5 = false;
    this.checked6 = false;

    let StudentId = this.studentFullTaggingData.stu_id;

    if (this.OnchangeYear) {

      this.CurrentYear = this.OnchangeYear;


    }
    else if (this.OnchangeYear == '' || this.OnchangeYear == undefined) {
      this.CurrentYear = '2020';

    }

    this.studentService.getStudentNssTagging(StudentId, this.CurrentYear, true).subscribe((res) => {

      if (res.result.length > 0) {
        debugger;
        this.studentNSSTaggingData = res.result;
        this.form.patchValue(this.studentNSSTaggingData[0]);

        for (var value of this.studentNSSTaggingData) {

          if (value.participate_subtype_id == "1") {
            this.checked1 = true;
            this.ParticipationTypeId1 = 1;
          }
          // else {
          //   this.checked1 = false;
          // }
          if (value.participate_subtype_id == "2") {
            this.checked2 = true;
            this.ParticipationTypeId2 = 2;
          }
          // else {
          //   this.checked2 = false;
          // }


          if (value.participate_subtype_id == "3") {
            this.checked3 = true;
            this.ParticipationTypeId3 = 3;
          }
          // else {
          //   this.checked3 = false;
          // }
          if (value.participate_subtype_id == "4") {
            this.checked4 = true;
            this.ParticipationTypeId4 = 4;
            if (value.participate_level == "1") {
              debugger;
              this.checked6 = false;
            }
            else if (value.participate_level == "2") {
              debugger;
              this.checked6 = true;
            }
            else {
              this.checked6 = false;
            }

          }
          if (value.participate_subtype_id == "5") {
            this.checked5 = true;
            this.ParticipationTypeId5 = 5;

          }

          // else {
          //   this.checked4 = false;
          // }

        }

      }
      else {
        //this.form.controls['acyear'].setValue("0");
        this.checked1 = false;
        this.checked2 = false;
        this.checked3 = false;
        this.checked4 = false;
        this.checked5 = false;
        this.checked6 = false;
      }
    });
  }
  ChangeYear(e) {
    this.OnchangeYear = e.value;

    let StudentId = this.studentFullTaggingData.stu_id;

    this.studentService.getAcademicSStudentNssTagging(StudentId, this.OnchangeYear, true).subscribe((res) => {
      debugger;

      if (res.result != 0) {

        this.onNssTagging();
        this.OnchangeYear = '';
        //this.alertService.success("Retrived Succesffully!!");

        // this.onTaggingEdit();
      }
      else {

        this.ParticipationTypeId1 = 0;
        this.ParticipationTypeId2 = 0;
        this.ParticipationTypeId3 = 0;
        this.ParticipationTypeId4 = 0;
        this.ParticipationTypeId5 = 0;
        this.checked1 = false;
        this.checked2 = false;
        this.checked3 = false;
        this.checked4 = false;
        this.checked5 = false;
        this.checked6 = false;
        // this.alertService.error("Please Fill CLub Details"); 
      }
    });
  }
  handleChangeEcoclub(e) {
    let isChecked = e.checked;
    if (isChecked == false) {
      this.ParticipationTypeId1 = 0;
    }
    else {
      this.ParticipationTypeId1 = 1;
      isChecked = false;
    }
  }

  handleChangeNSS(e) {
    let isChecked = e.checked;
    if (isChecked == false) {
      this.ParticipationTypeId2 = 0;
    }
    else {
      this.ParticipationTypeId2 = 2;

    }
  }

  handleChangeJRC(e) {
    let isChecked = e.checked;
    if (isChecked == false) {
      this.ParticipationTypeId3 = 0;
    }
    else {
      this.ParticipationTypeId3 = 3;

    }
  }

  handleChangeNCC(e) {
    let isChecked = e.checked;
    if (isChecked == false) {
      this.ParticipationTypeId4 = 0;
      this.Participationlevels4 = 0;
      // this.form.controls['Participationlevel4'].setValue("");
      this.form.controls['Participationlevel4'].setValidators(null);
      this.form.controls['Participationlevel4'].updateValueAndValidity();
    }
    else {
      this.ParticipationTypeId4 = 4;
      this.Participationlevels4 = 1;
      this.form.controls['Participationlevel4'].setValidators(Validators.required);
      this.form.controls['Participationlevel4'].updateValueAndValidity();
    }

  }
  handleChangeNCCLevel(e) {
    let isChecked = e.checked;
    if (isChecked == false) {
      this.Participationlevels4 = 1;
    }
    else {
      this.Participationlevels4 = 2;
    }
  }

  handleChangeScoutsGuide(e) {
    let isChecked = e.checked;
    if (isChecked == false) {
      this.ParticipationTypeId5 = 0;
    }
    else {
      this.ParticipationTypeId5 = 5;

    }
  }
  get f() { return this.form.controls; }

  submitclubs() {
    this.submitted = true;

    if (this.form.invalid) {
      this.alertService.error("Academic Year is Required");
      return;
    }
    var student = this.studentFullTaggingData.stu_id;

    var ClassStudy = this.studentFullTaggingData.class_studying_id;
    var ClassSection = this.studentFullTaggingData.class_section;
    var accYear = this.form.value.acyear;
    var ParticipationTypeId1 = this.ParticipationTypeId1;
    var ParticipationTypeId2 = this.ParticipationTypeId2;
    var ParticipationTypeId3 = this.ParticipationTypeId3;
    var ParticipationTypeId4 = this.ParticipationTypeId4;
    var ParticipationTypeId5 = this.ParticipationTypeId5;
    var Participationlevel4 = this.Participationlevels4;
    debugger;
    // console.log(this.form.value)
    var records = {
      "records": [{ "StudentId": student, "ClassStudy": ClassStudy, "ClassSection": ClassSection, "ParticipationTypeIds": "1", "ParticipationsubId": ParticipationTypeId1, "Participationlevel": "0", "AcademicYear": accYear },
      { "StudentId": student, "ClassStudy": ClassStudy, "ClassSection": ClassSection, "ParticipationTypeIds": "1", "ParticipationsubId": ParticipationTypeId2, "Participationlevel": "0", "AcademicYear": accYear },
      { "StudentId": student, "ClassStudy": ClassStudy, "ClassSection": ClassSection, "ParticipationTypeIds": "1", "ParticipationsubId": ParticipationTypeId3, "Participationlevel": "0", "AcademicYear": accYear },
      { "StudentId": student, "ClassStudy": ClassStudy, "ClassSection": ClassSection, "ParticipationTypeIds": "1", "ParticipationsubId": ParticipationTypeId4, "Participationlevel": Participationlevel4, "AcademicYear": accYear },
      { "StudentId": student, "ClassStudy": ClassStudy, "ClassSection": ClassSection, "ParticipationTypeIds": "1", "ParticipationsubId": ParticipationTypeId5, "Participationlevel": "0", "AcademicYear": accYear }]
    }
    this.studentService.saveClubs(records, true).subscribe((res) => {
      debugger;
      if (res) {
        this.alertService.success("Save Successfully");

        this.onTaggingEdit();
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }
}
