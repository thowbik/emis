import { Component, OnInit, ɵConsole, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { AlertService } from 'src/services/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {
  bloodgroup, religion, community, income, disabilities, disadvantages, schooldist,
  classstudying, mediumofinstruction, groupcate, launguages, caste
} from '../../../../../models/student-registration';

import { MessageService } from 'primeng/api';
import { UidaiValidationService } from 'ng2-uidai-validation';
import { ContentPagesModule } from 'src/app/pages/content-layout-page/content-pages.module';

@Component({
  selector: 'app-migrant-student-list',
  templateUrl: './migrant-student-list.component.html',
  styleUrls: ['./migrant-student-list.component.css']
})
export class MigrantStudentListComponent implements OnInit {

  schoolName: string;
  studentList: any;
  data: any;
  dataHeader: any;
  yearTimeout: any;
  classFilter: any;
  sectionFilter: any;
  yearFilter: number;
  schoolId: number;
  tableStateKey: string;
  getTextLength: any;
  public selectedColumns: any;
  exportColumns: any;

  /** Edit Student and Transfer Student Dialog Ends Here */
  studentRegistrationForm: FormGroup;
  pipe = new DatePipe('en-US');

  submitted: boolean = false;

  displayEditDialog: boolean;
  editDialogTitle: string;

  enddate: any;
  startdate: any;

  religion: religion[];
  bloodgrouparr: bloodgroup[];
  allcommunity: community[];
  allcaste: caste[];
  community: any[];
  casteList: any[];
  subcaste: any[] = [];
  incomes: income[];
  disadvantages: disadvantages[];
  disabilities: any;
  schooldist: schooldist[] = [];
  classstudying: classstudying[];
  mediumofinstruction: mediumofinstruction[];
  groupcate: groupcate[];
  section: any[] = [];
  getalldept: any[] = [];
  managecateid: any[] = [];
  groupcateid: any[] = [];
  launguages: launguages[];
  occupation: any[] = [];
  classListArr: any[] = [];
  allClassesRevalentDetails: any[];
  mediumListArr: any[] = [];
  exportExcelData: any[] = [];
  academic: any[] = [];
  gender: { "label": string; "value": string; }[];

  sectionListArr: Array<{ 'label': string, 'value': string }> = [{ label: 'Select Selction', value: '' },];

  fullDisablitiesList: any;
  groupshow: boolean = false; groupListArr: any[];
  reasonList: Array<{ 'value': string, 'label': string }> = [{ value: "0", label: "Select Reason" },
  { value: "1", label: "Long Absent" },
  { value: "2", label: "Transfer Request by Parent" },
  { value: "3", label: "Terminal Class" },
  { value: "4", label: "Dropped Out" },
  { value: "5", label: "Student Died" },
  { value: "6", label: "Duplicate EMIS Entry" }];

  profileurl: any;

  tempArrForClassAndSection: any;
  inValidAadhar: boolean = false;
  // @ViewChild('input1') inputEl:ElementRef;

  constructor(private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private alertService: AlertService,
    private router: Router,
    public fb: FormBuilder,
    private uidaiValidationService: UidaiValidationService,
    private authService: AuthenticationService,
    private userSessionService: UserSessionService,
    private studentService: StudentService,
    private http: HttpClient,private el: ElementRef) {

    this.schoolName = this.userSessionService.schoolName();
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.sectionFilter = [];
    this.selectedColumns = [];
    this.classFilter = [];
    this.studentList = [];
    this.dataHeader = [];
    this.sampleData();
    this.getStudentLists();
    this.disabilities = [];
    this.gender = [{ "label": "Male", "value": "1" },
    { "label": "Female", "value": "2" }];

    this.studentService.getBloodGroupJSON().subscribe(data => {
      this.bloodgrouparr = data['bloodgroup'];
    });

    this.studentService.getReligionJSON().subscribe(data => {
      this.religion = data['religion'];
    });

    this.studentService.getCommunityJSON().subscribe(data => {
      this.allcommunity = data['community'];
    });

    this.studentService.getCasteJSON().subscribe(data => {
      this.allcaste = data['caste'];
    });

    this.studentService.getOccupationJSON().subscribe(data => {
      this.occupation = data['occupation'].map(l => { return { label: l.occu_name, value: l.id }; });
    });
    this.studentService.getMediumOfInstructionJSON().subscribe(data => {
      data['mediumofinstruction'].map(item => { return { label: item.MEDINSTR_DESC, value: item.MEDINSTR_ID } })
        .forEach(item => this.mediumListArr.push(item));
    });

    this.studentService.getSchoolWiseClassandSection(this.schoolId, true).subscribe(data => {
      this.tempArrForClassAndSection = data['result'];
    });

    this.studentService.getschoolclasses(this.userSessionService.schoolId(), true).subscribe(list => {
      this.allClassesRevalentDetails = list['classlist'];
      let classes = list['classlist'];
      this.classListArr = classes.filter((val, inx) => classes.findIndex(item => item.class_id == val.class_id) === inx).map(list => { return { label: list.class_studying, value: list.class_id }; });


    });

    this.studentService.studentRegistration(this.schoolId).subscribe(list => {
      var masterlist: any = list['result'];
      this.incomes = masterlist['incomes'].map(l => { return { label: l.income_value, value: l.id }; });
      console.log(this.incomes);
      // this.religion =masterlist['religions'];
      this.launguages = masterlist['launguages'].map(l => { return { label: l.MEDINSTR_DESC, value: l.ID }; });
      this.disadvantages = masterlist['disadvantages'];
      this.fullDisablitiesList = masterlist['disabilities'];
      this.academic = masterlist['academic'].map(l => { return { label: l.academic_teacher, value: l.id }; });
      this.disabilities = masterlist['disabilities'].map(l => { return { label: l.da_name, value: l.id }; });
      this.disabilities.push({
        label: 'Not Applicable',
        value: '0'
      })
      this.classstudying = masterlist['classstudying'];
      this.mediumofinstruction = masterlist['mediumofinstruction'];
      this.groupcate = masterlist['groupcate'];
      this.groupcateid = masterlist['groupcateid'];
      this.schooldist = masterlist['schooldist'].map(l => { return { label: l.district_name, value: l.id }; });
      console.log(this.schooldist);
      // console.log(this.disabilities);
      // this.sections = masterlist['sections'];
      // this.bloodgrouparr = masterlist['bloodgroup'];
      // this.getalldept = masterlist['getalldept'];
      // this.managecateid = masterlist['managecateid'];
    });
    this.initialValidator();
  }

  sampleData() {

    this.dataHeader = [
      { field: 'unique_id_no', header: 'Unique Id' },
      { field: 'name_tamil', header: 'Name in Tamil' },
      { field: 'name', header: 'Name in English' },
      { field: 'class_studying', header: 'Class' },
      { field: 'class_section', header: 'Section' },
      { field: 'father_name', header: 'Father Name' },
      { field: 'mother_name', header: 'Mother Name' },
      { field: 'aadhaar_uid_number', header: 'Aadhaar Number' },
      { field: 'phone_number', header: 'Phone Number' }
      // { field: 'dob', header: 'DOB' },
      // { field: 'group', header: 'Blood Group' },
    ];
    this.selectedColumns = [
      { field: 'unique_id_no', header: 'Unique Id' },
      { field: 'name_tamil', header: 'Name in Tamil' },
      { field: 'name', header: 'Name in English' },
      { field: 'class_studying', header: 'Class' },
      { field: 'class_section', header: 'Section' },
    ];

  }


  onReligionChange(e) {
    debugger;
    this.community = this.allcommunity.filter(function (item) { return item.religion_id == +e })
      .map(l => { return { label: l.community_name, value: l.id } });
  }

  stucheckaadhar(e, unique_id_no) {
    this.studentService.stucheckaadhar(e).subscribe((res) => {

      if (res.dataStatus) {
        let response = res.result;
        if (response[0].unique_id_no != unique_id_no) {
          this.alertService.error("Given aadhar-no is already Existed with " + response[0].unique_id_no + ' - ' + response[0].name);
          this.inValidAadhar = true;
        } else this.inValidAadhar = false;
      } else this.inValidAadhar = false;

    });
  }

  onCommunityChange(e) {
    debugger;
    this.casteList = this.allcaste.filter(function (item) { return item.community_id == +e })
      .map(l => { return { label: l.caste_name, value: l.id } });
  }

  initialValidator() {
    this.studentRegistrationForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'id': new FormControl('', Validators.required),
      'unique_id_no': new FormControl('', Validators.required),
      // 'name_id_card': new FormControl('', Validators.required),
      'name_tamil': new FormControl(''),
      // 'name_tamil_id_card': new FormControl('', Validators.required),
      'aadhaar_uid_number': new FormControl(null),
      // 'enrollmentnumber': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'bloodgroup': new FormControl(''),
      'religion_id': new FormControl('', Validators.required),
      'community_id': new FormControl('', Validators.required),
      'subcaste_id': new FormControl('', Validators.required),
      'mothertounge_id': new FormControl('', Validators.required),
      // 'disadvantaged_group' : new FormControl('', Validators.required),
      'differently_abled': new FormControl(''),
      'mother_name': new FormControl(''),
      'father_name': new FormControl(''),
      'guardian_name': new FormControl(''),
      'mother_name_tamil': new FormControl(null),
      'father_name_tamil': new FormControl(null),
      'guardian_name_tamil': new FormControl(null),
      'father_occupation': new FormControl(''),
      'mother_occupation': new FormControl(''),
      'father_qualify': new FormControl(''),
      'mother_qualify': new FormControl(''),
      'guardian_qualify': new FormControl(''),
      'parent_income': new FormControl(''),
      'phone_number': new FormControl('',[Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      'email': new FormControl(''),
      'house_address': new FormControl('', Validators.required),
      'street_name': new FormControl('', Validators.required),
      'area_village': new FormControl('', Validators.required),
      'district_id': new FormControl('', Validators.required),
      'pin_code': new FormControl('', Validators.required),
      'class_studying_id': new FormControl(''),
      'doj': new FormControl('', Validators.required),
      'class_section': new FormControl(''),
      'education_medium_id': new FormControl(''),
      'group_code_id': new FormControl(''),
      'school_admission_no': new FormControl(''),
      'image_name': new FormControl(''),
      'image_data': new FormControl('')
    });
  }

  getStudentLists() {
    debugger;
    this.studentService.getStudentList(this.schoolId, 'MIGRANT_STUDENT', true).subscribe((res) => {
      console.log('migrant');
      console.log(res);
      if (res.dataStatus) {
        this.studentList = res.result;
        this.studentList.forEach(element => {
          this.classFilter.push({
            label: element.class_studying_id,
            value: element.class_studying_id
          })
          this.sectionFilter.push({
            label: element.class_section,
            value: element.class_section
          })
        });
        this.exportColumns = this.dataHeader.map(col => ({ title: col.header, dataKey: col.field }));
      }
      else this.alertService.error(res.message);
    });
  }

  oldStudyingId : any;
  onRowEdit(rowData) {
    console.log(rowData);
    let dtls: any[] = rowData;


    let defaultsformat = 'yyyy-MM-dd';
    this.startdate = this.pipe.transform(rowData.dob, defaultsformat);
    this.enddate = this.pipe.transform(new Date(), defaultsformat);
    this.oldStudyingId  = rowData.class_studying_id;
    this.studentRegistrationForm.patchValue(rowData);
    this.studentRegistrationForm.controls.doj.setValue(rowData.doj == '' ? this.enddate : rowData.doj);
    this.studentRegistrationForm.controls.bloodgroup.setValue(+rowData.bloodgroup);
    this.studentRegistrationForm.controls.religion_id.setValue(+rowData.religion_id);
    this.studentRegistrationForm.controls.community_id.setValue(+rowData.community_id);
    this.studentRegistrationForm.controls.name_tamil.setValue(rowData.name_tamil === null ? '' : rowData.name_tamil);
    this.studentRegistrationForm.controls.mother_name_tamil.setValue(rowData.mother_name_tamil === null ? '' : rowData.mother_name_tamil);
    this.studentRegistrationForm.controls.guardian_name_tamil.setValue(rowData.guardian_name_tamil === null ? '' : rowData.guardian_name_tamil);
    this.studentRegistrationForm.controls.father_name_tamil.setValue(rowData.father_name_tamil === null ? '' : rowData.father_name_tamil);
    this.studentRegistrationForm.controls.image_name.setValue(rowData.photo == '' ? null : rowData.photo);
    this.studentRegistrationForm.controls.education_medium_id.setValue(+rowData.education_medium_id);

    this.editDialogTitle = rowData.name + ' - ' + rowData.unique_id_no;
    // this.inputEl.nativeElement.focus();
    this.onReligionChange(+rowData.religion_id);
    this.onCommunityChange(rowData.community_id);
    this.getSectionForRevalentClass(rowData.class_studying_id,false);
    this.getGroupForRevalentClass();


    if (rowData.photo !== null) {
      let path = 'Students_emis' + '/' + rowData.photo + '';
      this.studentService.getAWSS3Image(path, true).subscribe((res) => {
        if (res.dataStatus) {
          debugger;
          this.profileurl = res.result;
          // console.log(this.profileurl);
        }
        this.displayEditDialog = true;

      });
    }
    else {
      this.profileurl = './assets/media/logos/Placeholder.jpg';
      this.displayEditDialog = true;
    }


  }


  getSectionForRevalentClass(cls,status){
    if(status){
    this.studentRegistrationForm.controls.class_section.setValue(null);
    }
    this.sectionListArr = [];
    this.sectionListArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == cls)
      .map(list => { return { label: list.section, value: list.section } });

  }
  isAadharCheck(aadhar) {
    console.log(aadhar);
  }

  getGroupForRevalentClass() {

    let itsclass = this.studentRegistrationForm.get('class_studying_id').value;
    let itssection = this.studentRegistrationForm.get('class_section').value;
    this.groupListArr = [];

    let filteredArr = this.allClassesRevalentDetails.filter(item => item['class_id'] == itsclass && item['section'] == itssection);

    if (itsclass == 11 || itsclass == 12) {
      this.groupshow = true;
      this.groupListArr = filteredArr.map(l => { return { label: l.group_name, value: l.group_id }; });
    } else {
      this.groupListArr = [{ label: "Choose Group", value: "" }];
      this.groupshow = false;
    }

    // let med: number = filteredArr.map(l => {return +l.school_medium_id})[0];
    // this.studentRegistrationForm.controls.education_medium_id.setValue(med);

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target);
      console.log(event);
      console.log(event.target.files[0]);
      // if (event.target.files[0].size < 4.6302083333 * 3.96875){// Checking height * width
      if (event.target.files[0].size <= 25600) {// checking size here - 2MB}
        const fileReader: FileReader = new FileReader();

        fileReader.readAsDataURL(event.target.files[0]); // read file as data url

        fileReader.onload = (event: Event) => {// called once readAsDataURL is completed
          this.profileurl = fileReader.result;
          this.studentRegistrationForm.controls.image_data.setValue(fileReader.result);
        };
      } else {
        this.alertService.warning('Image Can`t uploaded because Image size should have less than or equal to 25kb');
      }
      //  } else{
      //   this.alertService.warning('Image should have 175px width and 150px height');
      //  }

    }
  }

  onSubmit(value) {
    this.inValidAadhar = false;
    this.submitted = true;
    let aadharNo = this.studentRegistrationForm.value.aadhaar_uid_number;
    if (aadharNo != '') {
      if (+aadharNo != 0) {
        let isValidUidaiNo = this.uidaiValidationService.isValidUidaiNumber(aadharNo);
        if (!isValidUidaiNo) {
          this.alertService.error('Invalid Aadhaar Number');
          this.inValidAadhar = true;
          return true;
        }
      }
    }
    if(value.class_studying_id) this.studentRegistrationForm.controls['class_section'].setValidators([Validators.required]);
    else this.studentRegistrationForm.controls['class_section'].clearValidators();
    this.studentRegistrationForm.controls['class_section'].updateValueAndValidity();

    if(value.father_name) this.studentRegistrationForm.controls['father_qualify'].setValidators([Validators.required]);
    else this.studentRegistrationForm.controls['father_qualify'].clearValidators();
    this.studentRegistrationForm.controls['father_qualify'].updateValueAndValidity();

    if(value.mother_name) this.studentRegistrationForm.controls['mother_qualify'].setValidators([Validators.required]);
    else this.studentRegistrationForm.controls['mother_qualify'].clearValidators();
    this.studentRegistrationForm.controls['mother_qualify'].updateValueAndValidity();

    if(value.guardian_name) this.studentRegistrationForm.controls['guardian_qualify'].setValidators([Validators.required]);
    else this.studentRegistrationForm.controls['guardian_qualify'].clearValidators();
    this.studentRegistrationForm.controls['guardian_qualify'].updateValueAndValidity();

    for (const key of Object.keys(this.studentRegistrationForm.controls)) {
      if (this.studentRegistrationForm.controls[key].invalid) {
        // const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys = ',key);
        // invalidControl.focus();
        // break;
     }
    }
    if (this.studentRegistrationForm.valid) {
      // delete value.education_medium_id;
      let toSTD = value.class_studying_id; //newStudyingId
      let fromSTD = this.oldStudyingId;
      let students_promote_history : any;
      if(fromSTD !== toSTD){
        students_promote_history = {
         'school_key_id' : this.schoolId,
         'student_id' : value.id,
         'from_class' : fromSTD,
         'to_class' : toSTD
         }
        // console.log('they are diff ',fromSTD,toSTD);
      }
      else{
        // console.log('they are same ',fromSTD.toSTD);
        students_promote_history = {}
      }
      if (value.class_studying_id != 11 || value.class_studying_id != 12) delete value.group_code_id;
      value.dob = this.pipe.transform(value.dob, 'yyyy-MM-dd');
      value.doj = this.pipe.transform(value.doj, 'yyyy-MM-dd');
      value.transfer_flag = 0;
      value.status = "Active";
      value.updated_at = this.pipe.transform(new Date(), 'yyyy-MM-dd');

      this.studentService.updateStudentRegistrationData({ "records": value,"promote_history":students_promote_history, "constant": 'MIGRANT_STUDENT' }).subscribe(res => {
        if (res.dataStatus == true) {
          this.alertService.success(res.message);
          this.getStudentLists();
          this.displayEditDialog = false;
        }
        else this.alertService.info(res.message);
        // this.redirectTo(this.router.url);
      });


    }
    else {
      return true;
    }

    // this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  exportPdf() {
    debugger;
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.studentList);
        // doc.text(20, 20, 'Hello world!');
        // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.save(this.schoolName+' Migrant Student List.pdf');
      })
    })
  }

  getstudents() {
    this.exportExcelData = [];
    this.studentList.map(item => {
      return {
        'Unique Id': item.unique_id_no,
        'Name': item.name,
        'Name in Tamil': item.name_tamil,
        'Class':item.class_studying,
        'Section':item.class_section,
        'Father Name': item.father_name,
        'Mother Name': item.mother_name,
        'Aadhaar Number': item.aadhaar_uid_number,
        'Phone Number': item.phone_number,
        'Data of Birth': item.dob,
        'Gender': item.gender !== "" ? this.xlfilter(this.gender,item.gender): '',
        'Data of joining' : item.doj,
        'Address': item.house_address+' '+item.street_name+' '+item.area_village+' '+this.schooldist.filter(l=>l.value == item.district_id)[0].label,
        'Pin code': item.pin_code,
        'Blood Group':item.group,
        'Religion':item.religion_name,
        'Medium of Instruction':item.MEDINSTR_DESC,
        'Admission Number':item.school_admission_no,
        'Community':this.allcommunity.filter(l=>l.id == item.community_id)[0].community_name,
        'Caste':item.caste_name,
        'Disability Group Name':item.differently_abled !== "" ? this.xlfilter(this.disabilities,item.differently_abled) : '',
        'GroupCode':(item.class_studying_id == '11' || item.class_studying_id == '12') && item.group_code_id !== null ? (item.group_code_id !== '0' || item.group_code_id !== '') 
                                    ? this.groupcate.filter(l => l.id == item.group_code_id)[0].group_name
                                    : '' : '',
        'Mother Tounge':item.mothertounge_id !== "" ? this.xlfilter(this.mediumListArr,item.mothertounge_id) : ''
      }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }
  
  // 'Disability Group Name':this.disabilities.filter(l=> l.value ==  item.differently_abled)[0].label,
        // 'Group Code':(item.class_studying_id == '11' || item.class_studying_id == '12') ? this.allClassesRevalentDetails.filter(item => item['class_id'] == item.class_studying_id && item['section'] == item.class_section && item['group_id'] == item.group_code_id)[0].group_name : null ,
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudents());
        const workbook = { Sheets: { 'all Migrant student list' : worksheet }, SheetNames: ['all Migrant student list'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.schoolName +' ( Migrant Student List ) ');
    });
  }

  xlfilter(arr,val){
    let ar = arr.filter(l => l.value == val);
    if(ar.length > 0){
     return ar[0].label;
    }
    else{
     return '';
    }
  }

}