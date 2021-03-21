import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AlertService} from  'src/services/alert.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-self-defense-training',
  templateUrl: './self-defense-training.component.html',
  styleUrls: ['./self-defense-training.component.css']
})
export class SelfDefenseTrainingComponent implements OnInit {
  studentlist : any[];
  trainerlist : any[];
  dataHeader :  any[] = [];
  student_name_list: any;
  trainer_form :FormGroup;
  noDataFound: boolean;
  parentsCheckbox: boolean;
  Specification: { label: string; value: string; }[];
  Qualification: { label: string; value: string; }[];
  submitted: boolean;
  studentslist : string[]=[];
  dataHeader1: { field: string; header: string; }[];
  dataHeader_trainer:{field: string; header: string;widthstyle : string }[];
  studentlist_attendance: any;
  SchoolId: any;
  dataHeader_school: { field: string; header: string; }[];
  schoollist: any;
  Trainer_List: { label: string; value: string; }[];
  exportExcelData: any[] = [];
  userTypeID: any;
  distId: any;
  Attendance_Form: FormGroup;
  classlist: any;
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  class_id: any;
  section: any[];
  section_Id: any;
  Helper_List: any;
  AddForm: boolean;
  Page: number;
  gender: { label: string; value: string; }[];

  constructor( private schoolService : schoolsService,private alertService : AlertService,
    private session : UserSessionService,private fb:FormBuilder,private confirmationService : ConfirmationService) 
  {
    this.SchoolId = this.session.schoolId();
    this.distId  = this.session.districtId();
    console.log(this.distId,"districtId");
    
    this.userTypeID = this.session.userTypeId();
    this.Trainer_List = [
      {label : 'test1',value : '1'},
      {label : 'test2',value : '2'},
      {label : 'test3',value : '3'},
      {label : 'test4',value : '4'}

    ],
    this.Specification = [
      {label : 'Karate',value : '1'},
      {label : 'Silambam',value : '2'},
      {label : 'Boxing',value : '3'},
      {label : 'Karate1',value : '4'}
    ]
    this.student_name_list = [
      {label : 'Test1',value : '1'},
      {label : 'Test2',value : '2'},
      {label : 'Test3',value : '3'},
      {label : 'Test4',value : '4'}
    ]
   }

  ngOnInit() {  
 
    //this.getStudentList();
    //this.getSchoolTrainerList();
      this.getTrainerList();
    //  this.getStudentAttedance();
   // this.getHelperList();
    this.dataHeader =[
      { field : 'name', header : 'Student List'},
    ]
    this.dataHeader_school =[
      { field : '', header : 'School Name'},
      { field :'', header:'Trainer List'},
      { field : '', header : 'Specialisation'},
      { field :'',header:'Action'}
    ]
    this.dataHeader_trainer=[
      { field : 'TeachNam', header : 'Name',widthstyle: '6em'},
      { field :'Gendr', header:'Gender',widthstyle: '1em'},
      { field : 'MblNo', header : 'Mobile Number',widthstyle: '1em'},
      { field :'Specialistn', header:'Specification',widthstyle: '2em'},
      { field :'Qualifctn', header:'Qualification',widthstyle: '2em'},
      { field :'',header:'Action',widthstyle: '1em'}
    
    ]
    this.dataHeader1 =[
      { field : 'name', header : 'Student List'},
      { field :'', header:'Attendance'}
    ]
    this.gender =[
      {label : 'Male', value : '1'},
      {label : 'Female', value : '2'}],

    this.Specification = [
      {label : 'Karate', value : '1'},
      {label : 'Silambam', value : '2'},
      {label : 'Kungfu', value : '3'},
    ]
    this.Qualification = [
      {label : 'Karate', value : '1'},
      {label : 'Silambam', value : '2'},
      {label : 'Kungfu', value : '3'},
    ]

 this.trainer_form = this.fb.group({
  TeachNam : ['',Validators.required],
  Gendr :['',Validators.required],
  MblNo : ['',Validators.required],
  Specialistn :['',Validators.required],
  Qualifctn : ['',Validators.required],

 })
 this.Attendance_Form = this.fb.group({
  class :[''],
  section : [''],
  AttnDate :[''],
  TrainrID : [''],
  HelpStaffID : ['']

 })
 this.getClass();

 this.studentlist_attendance =
 [
   {
     id : "1",
     name : "Test",
     attendance : "1"
   },
   {
    id : "2",
    name : "Test1",
    attendance : "2"
  },
  {
    id : "3",
    name : "Test2",
    attendance : "1"
  },
  {
    id : "4",
    name : "Test3",
    attendance : "2"
  },
  {
    id : "5",
    name : "Test4",
    attendance : "1"
  },
 ]
  }
//Student-attendance
getClass()
{
    debugger
    this.schoolService.getStudentclasslist(this.SchoolId).subscribe(res => 
    {
      var class_sec = res;
      this.classlist = class_sec['classdetails'];
      this.classlist.map(i => i['roman'] = this.class_in_roman[i['value']]);
    })
}
onChangeClass(e) {
  this.class_id = e;
  let student_cls_data = { "class_id": this.class_id, "school_id": this.SchoolId };
  this.section = [];
  this.schoolService.getStudentSectionlist({ "records": student_cls_data }).subscribe(
    dataresult => {
      if (dataresult['dataStatus'] == true) {
        this.section = dataresult.result.map(l => { return { label: l.section, value: l.section } });
      }
    })
  }
onChangeSection(event)
  {
    this.section_Id = event.value;
  }
  onSubmit(formvalue)
  {
    debugger;
    console.log(formvalue);
    this.studentlist_attendance = [];
    let student_attendance = { "Class": this.class_id, "Section": this.section_Id,"AttnDate":formvalue.AttnDate, "SchlID": this.SchoolId };
    this.schoolService.getStudentAttendanceList({ "records": student_attendance }).subscribe(res => {
    debugger;
    var studentlist = res['result'];
    if (studentlist != "")
    {
      this.studentlist_attendance = studentlist;
      this.class_in_roman = this.studentlist_attendance.map(i => i['roman'] = this.class_in_roman[i['Class']]);
    }
    })
  }
  getHelperList()
  {
    this.schoolService.getHelperlist().subscribe(res =>
      {
        debugger;
        this.Helper_List = res.data.teacher.map(i =>
          { return {label:i.teacher_name,value : i.teacher_id}})

        console.log(this.Helper_List,"helper");
        
      })
  }
  onSelectHelper(event)
  {
    var helper_name = event.value;
  }

// getStudentList()
//   {
//     var data =  {"records": {
//       "school_id": 57204,
//       "class_id": "2",
//       "section": "A"
//     }
// }
//     this.schoolService.getStudentList(data).subscribe(res =>
//       {
//         if(res)
//         {
//           debugger;
//         this.studentlist = res.result;
//         console.log(this.studentlist,"data");
//         if (this.studentlist.length > 0) {
//           this.studentlist = this.studentlist;
//           // this.studentlist.map(x=>x['isChecked'] = (x['name'] != "") ? true : false );
//           this.parentsCheckbox = this.isAllSelected();

//           this.noDataFound = false;
//         }
//         else {
//           this.noDataFound = true;
//         }
//       }
        
//       })
//   }

//school-trainer mapping  
getSchoolTrainerList()
  {
    // debugger;
    // this.schoolService.getSchoolListData().subscribe(res =>
    //   {
    //     var schoollist = res.result.School_List;
    //     // var school_List = this.schoollist['School_List'];
    //      var trainer_List = res.result.Trainer_List;
    //     // console.log(this.schoollist);
    //     this.Trainer_List = trainer_List.map(i =>
    //       {
    //         return {label:i.TeachrNam,value:i.TeachrID};
    //       });
    //       console.log(this.Trainer_List,"teacherList");
    //       this.schoollist = schoollist.concat(trainer_List);
    //       console.log(this.schoollist);      
    //   })
  }
onSubmitSchlTrainer(schlist_trainer)
{
  const school_trainer_insert_data =
  {"records":
  {
    "SchlID":"",
    "TrainrID":"",
    "Status":"1"
  }
  }
  this.schoolService.getSchoolTrainerInsertData(school_trainer_insert_data).subscribe(res =>
  {
  if(res.dataStatus == true)
  {
   this.alertService.success(res.message);
  }
  else
  {
    this.alertService.error(res.message);
  }
  })     
}
onRowEditSave(schlist_trainer)
  {
   const school_trainer_update_data =
    {"records":
    {
    "IndxID":"152",
    "SchlID":"350",
    "TrainrID":"1069",
    "Status":"1"
    }
    }
   this.schoolService.getSchoolTrainerUpdateData(school_trainer_update_data).subscribe(res =>
    {
      if(res.dataStatus == true)
      {
        this.alertService.success(res.message);
      }
      else
      {
        this.alertService.error(res.message);
      }
    }) 
  } 
  onRowEditCancel()
  {
  //   this.confirmationService.confirm({
  //     message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete?</p>',
  //     accept: () => {
  //       // this.IndxID = indexId;
  //       let records = {
  //         "records":
  //         {
  //           "IndxID":""
  //         }
  //         }
  //       this.schoolService.getSchoolTrainerDeleteData(records).subscribe((res) => {
  //         if (res.status == 200) {
  //           if (res.dataStatus) 
  //           {
  //             this.alertService.success(res.message);
  //           }
  //           else
  //           {
  //             this.alertService.error(res.message);
  //           }
  //         }
  //       })
  //      }
  //   })
  // }
  } 
  

 //Adding Trainer 
  getTrainerList()
  {
    this.Page = 0;
    this.AddForm = false;
    this.trainerlist =[];
    this.schoolService.getTrainerListData(this.distId).subscribe(res=>
      {
        this.trainerlist = res.result;
        console.log(this.trainerlist);
      })
  }
  onInsertTrainer()
  {
    this.AddForm = true;
    this.Page = 1;
    this.Page != 0;
    
  }
  onSubmitTrainer(trainer_list)
  {
    debugger;
    const trainer_insert_data ={"records":
    {
    "TeachNam":trainer_list.TeachNam,
    "Gendr":trainer_list.Gendr,
    "MblNo":trainer_list.MblNo,
    "Specialistn":trainer_list.Specialistn,
    "Qualifctn":trainer_list.Qualifctn,
    "DistrictID":this.distId,
    "Stats":"1"
    }
    }
    this.schoolService.getTrainerListInsert(trainer_insert_data).subscribe(res =>
      {
        if(res.dataStatus == true)
        {
        this.alertService.success(res.message);
        this.getTrainerList();
        }
        else
        {
          this.alertService.error(res.message);
        }
      })
  }
  onCancelTrainer()
  {
    this.Page = 0;
  }
  onRowEditInit(data) {
    debugger
     console.log('Row edit initialized');
  }
  onRowEdit_Save(trainerlist)
  {
    debugger;
      const trainer_list_data = {"records":
      {
      "IndxID":trainerlist.IndxID,  
      "TeachNam":trainerlist.TeachNam,
      "Gendr":trainerlist.Gendr,
      "MblNo":trainerlist.MblNo,
      "Specialistn":trainerlist.Specialistn1,
      "Qualifctn":trainerlist.Qualifctn,
      "DistrictID": this.distId,
      "Stats":"1"
     }
     }
     this.schoolService.getTrainerListUpdate(trainer_list_data).subscribe(res =>
        {
          if(res.dataStatus == true)
          {
            this.alertService.success(res.message);
          }
          else 
          {
            this.alertService.error(res.message);
          }
        })
  }

    
onRowEdit_Cancel(data,index) {   
  debugger;
  this.confirmationService.confirm({
    message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete?</p>',
    accept: () => {
      // this.IndxID = indexId;
      let records = {
        "records":
        {
          "IndxID": data.IndxID
        }
      }
      this.schoolService.getTrainerListDelete(records).subscribe((res) => {
        if (res.status == 200) {
          if (res.dataStatus) 
          {
            this.alertService.success(res.message);
            this.getTrainerList();
          }
          else
          {
            this.alertService.error(res.message);
          }
        }
      })
     }
  })
}

//dropdown select
  onSelectTraining(event)
  {
    console.log(event,"event");
    
  }
//studentlist submit
//   onSubmit(studentlist)
//   {
// console.log(studentlist);

//   }
  //attendance submit
  onStdSubmit(formvalue,data)
  {
    console.log(formvalue);
    console.log(data);

    
  }
 //checkbox
  parentToggle(check_val) {
    console.log('i am in par function', check_val);
    this.studentlist.forEach(row => row.isChecked = check_val);
   this.studentlist.forEach(row => row.Status = (row.isChecked == true) ? '1' : '2');
    this.parentsCheckbox = this.isAllSelected();

  }
  childToggle(e, data) {
    debugger;
    console.log(data.name);
    data.isChecked = e;
    data.Status = (data.isChecked == true) ? "1" : "2";
    this.parentsCheckbox = this.isAllSelected();
  }
  isAllSelected() {
    let numRows = this.studentlist.length;
    let is_opted_count = 0;
    let not_opted_count = 0;
    this.studentlist.forEach((item) => {
      if (item.Status == true) is_opted_count++;
      else not_opted_count++;
    });
    // console.info('opted count :', is_opted_count);
    // console.info('not opted count :', not_opted_count);
    // console.info('total count :', numRows);
    return is_opted_count === numRows ? true : false;
  }




//EXCEL
getExcel() {
  this.exportExcelData = [];
  return this.schoollist.map(i => {
    return {
      'SchoolName': i.StudentName,
      'Trainer': i.Class,
      'Specification': i.Section,
    }
  })
}
exportExcel() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.getExcel());
    const workbook = { Sheets: { 'School-Mapping-Details': worksheet }, SheetNames: ['School-Mapping-Details'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "School-Mapping-Details");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
//trainer-excel
getExcel1() {
  this.exportExcelData = [];
  return this.schoollist.map(i => {
    return {
      'TrainerName': i.TeachNam,
      'Gender': i.Gendr,
      'Mobile no.': i.MblNo,
      'Specification': i.Specialistn,
      'Qualification' : i.Qualifctn
    }
  })
}
exportExcel1() {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.getExcel1());
    const workbook = { Sheets: { 'Trainer-Details': worksheet }, SheetNames: ['Trainer-Details'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile1(excelBuffer, "Trainer-Details");
  });
}
saveAsExcelFile1(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

//Row Edit

//onRowEditSave(data) {
  // debugger;
  // const data_save ={
  //   school_id:this.SchoolId,
  //   register_no : data.Reg_No,
  //   allot_status: data.allot_status
  // };
  // const scl_id = data_save.school_id
  // this.schoolService.getDCRteApplicantSave(data_save,true).subscribe((res) => {
  //     if(res.dataStatus == true) {
  //      this.alertService.success("Updated Successfully");
     
  //     }
  //     else {
  //       this.alertService.error(res.message);
  //     }
  //   });
    //} 
}
