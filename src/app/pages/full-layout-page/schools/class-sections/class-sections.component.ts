import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-class-sections',
  templateUrl: './class-sections.component.html',
  styleUrls: ['./class-sections.component.css'],
  providers: [ConfirmationService]
})
export class ClassSectionsComponent implements OnInit {
  classList: Array<Object> = [];
  singleClass = {};
  public schoolId: any;

  data: any;
  cols: any[];
  colsd: any[];
  colsv: any[];

  schollclasses: any = { classlist: '' };
  sampleDataHeader: Array<Object> = [];
  sampleSelectedColumn: Array<Object> = [];
  newclassList: boolean;
  displayDialog: boolean;
  yearTimeout: any;
  classes: any[] = [];
  groupList: any[] = [];
  filteredGroupList: any[] = [];
  schoolType: any[] = [];
  mediumList: any[] = [];
  teacherdata: any;
  schoolCategoryId: number;
  schoolTypeId: number;
  pipe = new DatePipe('en-US');
  dialogTitle: string;
  readmode: boolean;
  lowclass: number;
  highclass: number;
  teachernamelistdata: any;
  exportColumnsData : any[]=[];
  exportExcelData: any[];


  constructor(private fb: FormBuilder,
    private schoolservice: schoolsService,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private confirmationService: ConfirmationService
  ) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
    this.lowclass = +this.userSessionService.lowClass();
    this.highclass = +this.userSessionService.highClass();
  }

  ngOnInit() {
    // this.data = {"records":{"school_id":this.schoolId}}
    this.sampleData();
    this.getClassSectionData();
    this.getclassdtls(this.lowclass, this.highclass);
    this.teachernamelist();

  }

  sampleData() {
    this.sampleDataHeader = [
      { field: 'std', header: 'Standard', widthstyle: '1em' },
      { field: 'section', header: 'Section', widthstyle: '1em' },
      { field: 'group', header: 'Group' },
      { field: 'medium', header: 'Medium of Instruction' },
      { field: 'teacher_name', header: 'Class Teacher' }
    ];

    this.sampleSelectedColumn = this.sampleDataHeader;

    this.schoolType = [{ "label": "Aided", "value": "1" },
    { "label": "Self Financed", "value": "2" }];
  }

  getClassSectionData() {
    debugger
    this.schoolservice.getschoolclasses(this.schoolId, true).subscribe(list => {
      console.log("check", list)
      if (list.dataStatus) {
        this.classList = list['classlist'].map(item => { return { "id": item.id, "stdId": item.class_id, "std": item.class_studying, "section": item.section, "group_id": item.group_id, "group": item.group_name, "medium": item.MEDINSTR_DESC, "school_type": item.school_type, "medium_id": item.school_medium_id, "students": item.students, "teacher_name": item.teacher_name, "teacher_id": item.teacher_id } });
        console.log(this.classList,"excel");
        this.groupList = list['groupdetails'].map(item => { return { "label": item.group_name, "value": item.id, "description": item.group_description } });
        this.mediumList = list['mediumdetails'].map(item => { return { "label": item.MEDINSTR_DESC, "value": item.MEDINSTR_ID } });
        this.schoolCategoryId = list['schoolcate'][0].manage_cate_id;
      }
      // this.schollclasses=classlist
      // console.log(this.schollclasses['classlist']);
      // this.classList = classlist
      // console.log(this.teacherdetails['teacherslist']); 
    })
  }

  teachernamelist() {
    debugger
    this.schoolservice.getteacherlist().subscribe(teacherlist => {
      this.teachernamelistdata = teacherlist.data;
      this.teacherdata = this.teachernamelistdata['teacher'].map(teachitem => { return { "label": teachitem.teacher_name, "value": teachitem.teacher_id } });
    });
  }


  getclassdtls(lowclass, highclass) {
    console.log('lowclass' + lowclass)
    console.log('highclass' + highclass)
    this.schoolservice.getclassStudyingJSON().subscribe(data => {
      let inx = 0;
      if (+lowclass == 15 && +highclass != 13 && +highclass != 14 && +highclass != 15) {
        this.classes[inx] = { label: 'Pre-KG', value: '15' };
        this.classes[inx + 1] = { label: 'LKG', value: '13' };
        this.classes[inx + 2] = { label: 'UKG', value: '14' };
        inx = inx + 3;
        for (let i = 1; i <= +highclass; i++) {
          this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
          inx++;
        }
      }
      else if (+lowclass == 13 && +highclass != 14 && +highclass != 15 && +highclass != 13) {
        this.classes[inx] = { label: 'LKG', value: '13' };
        this.classes[inx + 1] = { label: 'UKG', value: '14' };
        inx = inx + 2;
        for (let i = 1; i <= +highclass; i++) {
          this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
          inx++;
        }
      }
      else if (+lowclass == 14 && +highclass != 14 && +highclass != 15 && +highclass != 13) {
        this.classes[inx] = { label: 'UKG', value: '14' };
        inx = inx + 1;
        for (let i = 1; i <= +highclass; i++) {
          this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
          inx++;
        }
      }
      else if (+lowclass == 15) {
        if(+highclass == 13) {
          this.classes = [{ "label": "Pre-KG", "value": "15" },
          { "label": "UKG", "value": "14" }
          ];
        }
        else if(+highclass == 14) {
          this.classes = [{ "label": "Pre-KG", "value": "15" },
          { "label": "LKG", "value": "13" },
          { "label": "UKG", "value": "14" },
          ];
        }
        else {
          this.classes = [{ "label": "Pre-KG", "value": "15" }];
        }
        // if (+highclass == 13 || +highclass == 14 || +highclass == 15) {
        //   for (let i = +lowclass; i >= +highclass; i--) {
        //     this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
        //     inx++;
        //   }
        // }
      }
      else if (+lowclass == 13) {
        if(+highclass == 14) {
          this.classes = [{ "label": "LKG", "value": "13" },
          { "label": "UKG", "value": "14" }
          ];
        }
        else {
          this.classes = [{ "label": "LKG", "value": "13" },
          ];
        }
      }
      else {
        for (let i = +lowclass; i <= +highclass; i++) {
          this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
          inx++;
        }
      }
      // if (+lowclass == 15) {
      //   if (+highclass != 13 && +highclass != 14 && +highclass != 15) {
      //     this.classes[inx] = { label: 'Pre-KG', value: '15' };
      //     this.classes[inx + 1] = { label: 'LKG', value: '13' };
      //     this.classes[inx + 2] = { label: 'UKG', value: '14' };
      //     inx = inx + 3;
      //     for (let i = 1; i <= +highclass; i++) {
      //       this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
      //       inx++;
      //     }
      //   }
      // } 
      // else if (+lowclass == 13) {
      //   if (+highclass != 14 && +highclass != 15 && +highclass != 13) {
      //     this.classes[inx] = { label: 'LKG', value: '13' };
      //     this.classes[inx + 1] = { label: 'UKG', value: '14' };
      //     inx = inx + 2;
      //     for (let i = 1; i <= +highclass; i++) {
      //       this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
      //       inx++;
      //     }
      //   }
      // }
      // else if (+lowclass == 14) {
      //   if (+highclass != 14 && +highclass != 15 && +highclass != 13) {
      //     this.classes[inx] = { label: 'UKG', value: '14' };
      //     inx = inx + 1;
      //     for (let i = 1; i <= +highclass; i++) {
      //       this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
      //       inx++;
      //     }
      //   }
      // }
      // else if (+lowclass == 15 || +lowclass == 14 || +lowclass == 13) {
      //   if (+highclass == 13 || +highclass == 14 ||+highclass == 15) {
      //   for (let i = +lowclass; i >= +highclass; i--) {
      //     this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
      //     inx++;
      //   }
      // }
      // }
      // else {
      //   for (let i = +lowclass; i <= +highclass; i++) {
      //     this.classes[inx] = { label: data['classstudying'][i - 1]['class_studying'], value: data['classstudying'][i - 1]['id'] };
      //     inx++;
      //   }
      // }
      // console.log(this.classes);
    });
  }


  // onYearChange(event, dt) {
  //   if (this.yearTimeout) {
  //       clearTimeout(this.yearTimeout);
  //   }

  //   this.yearTimeout = setTimeout(() => {
  //       dt.filter(event.value, 'year', 'gt');
  //   }, 250);
  // }
  // onRowSelectCrud(event) {
  //   this.newCar = false;
  //   this.car = this.cloneCar(event.data);
  //   this.displayDialog = true;
  // }
  _exist_sec: any = '';
  onRowSelect(event) {
    debugger;
    this._exist_sec = '';
    this.newclassList = false;
    this.singleClass = this.cloneClassList(event.data);
    this._exist_sec = this.singleClass['section'];
    console.log(this.singleClass);
    this.groupfilter(this.singleClass['stdId']);
    this.displayDialog = true;
    this.dialogTitle = "Edit Class Details";
    this.readmode = true;
  }

  addClassSection() {
    this.newclassList = true;
    this.singleClass = {};
    this.displayDialog = true;
    this.dialogTitle = "Class Details";
    this.readmode = false;
  }

  groupfilter(cls_id) {
    console.log(cls_id);
    if (cls_id == "11" || cls_id == "12") {
      console.log('2', cls_id);
      let desc = cls_id == "12" ? "1" : cls_id == "11" ? "1" : "0";
      this.filteredGroupList = this.groupList.filter(l => l.description == desc);
    }
  }

  save() {
    debugger
    let tempClassList = [...this.classList];

    if ((this.singleClass['stdId'] === null || this.singleClass['stdId'] === '' || this.singleClass['stdId'] === undefined) || (this.singleClass['section'] == null || this.singleClass['section'] === '' || this.singleClass['section'] === undefined) || (this.singleClass['medium_id'] === null || this.singleClass['medium_id'] === '' || this.singleClass['medium_id'] === undefined)) {
      this.alertService.error('Please check Class, Section and Medium');
      return true;
    }

    if ((+this.schoolTypeId == 2 || +this.schoolTypeId == 4) && (this.singleClass['school_type'] == null || this.singleClass['school_type'] == '')) {
      this.alertService.error('Please check Section type');
      return true;
    }

    if ((this.singleClass['stdId'] == '11' || this.singleClass['stdId'] == '12') && this.singleClass['group_id'] == null) {
      this.alertService.error('Please check Group');
      return true;
    }
    else {
      this.singleClass['group_id'] = (this.singleClass['stdId'] == '11' || this.singleClass['stdId'] == '12') ? this.singleClass['group_id'] : null;
      console.log(this.singleClass['group_id'])
    }

    Object.keys(this.singleClass).forEach((key) => (this.singleClass[key] == null) && delete this.singleClass[key]);
    debugger
    let _id = this.singleClass.hasOwnProperty('id') ? this.singleClass['id'] : null;
    let _std = this.singleClass.hasOwnProperty('stdId') ? this.singleClass['stdId'] : null;
    let _medid = this.singleClass['medium_id'];
    let _edumed = this.singleClass.hasOwnProperty('medium_id') ? this.mediumList.find(x => x.value == this.singleClass['medium_id']).label : null;
    let _teachid = this.singleClass['teacher_id'];
    let _teachername = this.singleClass.hasOwnProperty('teacher_id') ? this.teacherdata.find(x => x.value == this.singleClass['teacher_id']).label : null;
    let _stdinroman = this.singleClass.hasOwnProperty('stdId') ? this.classes.find(x => x.value == this.singleClass['stdId']).label : null;
    let _grp = this.singleClass.hasOwnProperty('group_id') ? this.singleClass['group_id'] : null;
    let _grpname = this.singleClass.hasOwnProperty('group_id') ? this.groupList.find(x => x.value == this.singleClass['group_id']).label : null;

    let _type = this.singleClass.hasOwnProperty('school_type') ? this.singleClass['school_type'] : null;
    let _sec = this.singleClass['section'];
    let _studcnt = this.singleClass['students'];
    // if(this.newclassList){}
    if (_std != '' && _sec != '' && this.newclassList) {
      var getinx = this.classList.findIndex(x => x['stdId'] == _std && x['section'] == _sec && x['medium_id'] == _medid);
      // console.log(getinx);
      if (getinx >= 0) {
        this.alertService.warning('Medium Already Exist');
        this.singleClass['medium_id'] = '';
        return true;
      }
    } else {
      //else part for edit if current and exist section different means section already exist validation.
      if (_sec != this._exist_sec) {
        var getinx = this.classList.findIndex(x => x['stdId'] == _std && x['section'] == _sec && x['medium_id'] == _medid);
        if (getinx >= 0) {
          this.alertService.warning('Medium Already Exist');
          this.singleClass['medium_id'] = '';
          return true;
        }
      }
    }




    this.singleClass = { "stdId": _std, "std": _stdinroman, "section": _sec, "group_id": _grp, "group": _grpname, "medium": _edumed, "school_type": _type, "students": _studcnt, "teacher_id": _teachid, "teacher_name": _teachername };

    /** if for Add and else for edit */
    if (this.newclassList) {
      tempClassList.push(this.singleClass);
      var records = {
        "records": {
          "school_key_id": this.schoolId,
          "class_id": _std, "section": _sec, "group_id": _grp,
          "school_type": _type, "school_medium_id": _medid,
          "class_teacher_id": _teachid,
          "created_date": this.pipe.transform(new Date(), 'yyyy/MM/dd')
        }
      }
      Object.keys(records).forEach((key) => (records[key] == null) && delete records[key]);
      this.schoolservice.addClassSection(records, true).subscribe((res) => {
        debugger
        if (res.dataStatus == true) {
          this.alertService.success(res.message);
          this.getClassSectionData();
          this.teachernamelist();
        }
        else this.alertService.error(res.message);
      });
    }
    else {
      var update_records = {
        "records": {
          "school_key_id": this.schoolId, "class_id": _std,
          "section": _sec, "group_id": _grp, "school_type": _type,
          "school_medium_id": _medid, "class_teacher_id": _teachid,
        },
        "id": _id
      }

      this.confirmationService.confirm({
        message: 'There are ' + _studcnt + ' students in ' + _stdinroman + ' - `' + _sec + '` section. Do you want to apply this medium (' + _edumed + ') to all these students?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.schoolservice.editClassSection(update_records, true).subscribe((res) => {
            if (res.dataStatus == true) {
              this.alertService.success(res.message);
              this.getClassSectionData();
              this.teachernamelist();
            }
            else this.alertService.error(res.message);
          });
        },
        reject: () => {
          // alert('Rejected,Please Try Again!');
        }
      });
    }

    this.classList = tempClassList;

    this.singleClass = null;
    this.displayDialog = false;

  }

  // saveClassSection() {

  //   let tempClassList = [...this.classList];

  //   let _std = this.singleClass.hasOwnProperty('stdId') ? this.singleClass['stdId'] : null;
  //   let _medid = this.singleClass['medium_id']; 
  //   let _edumed = this.singleClass.hasOwnProperty('medium_id') ? this.mediumList.find(x=>x.value == this.singleClass['medium_id']).label : null;
  //   let _stdinroman = this.singleClass.hasOwnProperty('stdId') ? this.classes.find(x=>x.value == this.singleClass['stdId']).label : null;
  //   let _grp = this.singleClass.hasOwnProperty('group') ? this.singleClass['group'] : null;
  //   let _grpname = this.singleClass.hasOwnProperty('group') ? this.groupList.find(x=>x.value ==  this.singleClass['group']).label : null;
  //   let _type = this.singleClass.hasOwnProperty('school_type') ? this.singleClass['school_type'] : null;
  //   let _sec = this.singleClass['section'];

  //   this.singleClass = {"stdId":_std,
  //                       "std": _stdinroman, 
  //                       "section": _sec,
  //                       "group": _grpname, 
  //                       "medium": _edumed,
  //                       "school_type": _type };
  //   if (this.newclassList){
  //      tempClassList.push(this.singleClass);
  //      var records = {"records":{"school_key_id":this.schoolId, 
  //                       "class_id":_std, 
  //                       "section":_sec, 
  //                       "group_id":_grp, 
  //                       "school_type":_type, 
  //                       "school_medium_id":_medid, 
  //                       "created_date":this.pipe.transform(new Date(),'yyyy/MM/dd')}}
  //      Object.keys(records).forEach((key) => (records[key] == null) && delete records[key]);  
  //      this.schoolservice.addClassSection(records,true).subscribe((res) => {
  //       if (res.dataStatus == true) {
  //         this.alertService.success(res.message);
  //         this.getClassSectionData();
  //       }
  //       else{
  //         this.alertService.error(res.message); 
  //       } 
  //     });
  //   }
  //   else
  //      tempClassList[this.classList.indexOf(this.selectedClassSection)] = this.singleClass;

  //   this.classList = tempClassList;

  //   this.singleClass = null;
  //   this.displayDialog = false;

  // }

  keyPress(event: any) {
    console.log(event);
    const pattern = /[A-Za-z0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // checkWithExisting(std,sec){
  //   if(std == undefined || std == null || std == '' || std == 0){
  //     alert('Please Choose The Class');
  //     return true;
  //   }
  //   if(sec == undefined || sec == null || sec == '' || sec == 0){
  //     alert('Please Enter the Section');
  //     return true;
  //   }

  //   if(std != '' && sec != ''){
  //     console.log(std);
  //     console.log(sec);
  //     var getinx =  this.classList.findIndex(x => x['stdId'] == std && x['section'] == sec );
  //     console.log(getinx);
  //     if(getinx >= 0){
  //       alert('Section Already Exist');
  //       this.singleClass['section'] = '';
  //     }
  //   }
  // }

  // save() {
  //   let cars = [...this.cars];
  //   if (this.newCar)
  //       cars.push(this.car);
  //   else
  //       cars[this.cars.indexOf(this.selectedCar)] = this.car;

  //   this.cars = cars;
  //   this.car = null;
  //   this.displayDialog = false;
  // }

  delete(data) {
    // debugger;

    var records = { "records": { "class": data.stdId, "section": data.section, "deletedid": data.id, "school_id": this.schoolId } }
    this.schoolservice.deleteClassSection(records, true).subscribe((res) => {
      if (res.dataStatus == true) {
        this.alertService.success(res.message);
        this.getClassSectionData();
        this.teachernamelist();
        // debugger;
        // console.log(res);
      }
      else {
        this.alertService.error(res.message);
      }
    });
    // alert("hi");
    // let index = this.classList.indexOf(this.selectedClassSection);
    // this.classList = this.classList.filter((val, i) => i != index);
    // this.singleClass = null;
    // this.displayDialog = false;
  }

  selectedClassSection(selecselectedClassSectiontedCar: any) {
    throw new Error("Method not implemented.");
  }



  cloneClassList(c: any): any {
    let list = {};
    for (let ind in c) {
      list[ind] = c[ind];
    }
    return list;
  }

  confirm() {

  }

  //excel
  getclssecDetails() {
    
    this.exportExcelData = [];
    this.classList.map(i => {
      return {
              'Standard' : i['std'],
              'Section' : i['section'],
              'Group' : i['group'],
              'Medium of Instuction.' : i['medium'] ,
              'Class Teacher' : i['teacher_name']
            
            }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }  

  exportExcel(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getclssecDetails());
        const workbook = { Sheets: { 'ClassSec list': worksheet }, SheetNames: ['ClassSec list'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ClassSec");
    });
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


}
