import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-board-xam-cordinator',
  templateUrl: './board-xam-cordinator.component.html',
  styleUrls: ['./board-xam-cordinator.component.css']
})
export class BoardXamCordinatorComponent implements OnInit {
  board_xam_form: FormGroup ;
  showDialogBox: boolean = false ;
  noDataFound: boolean;
  sch_student_list: any;
  selected_roll_no: any;
  popupdetails: any;
  session_sch_name: any;
  contact_detals: any;
  noDataFound1: boolean;
  teacher_name_options: any [] = [];
  selected_name: any;
  selected_class: any;
  pop_header: string;
  emis_id_teacher: boolean = false;
  teachers_data: any;
  select_teacher: any;
  teacher_id: any;
  teacher_assigned: any;
  teacher_phone: any;
  submitted: boolean;
  block_name_options: any [] = [] ;
  select_block_id: any;
  sch_name_options: any [] = [] ;
  new_sch__id: any;
  new_sch_udise: any;
  mobile1: any;
  mobile1_relation: any;
  mobile2: any;
  mobile2_relation: any;
  mobile3: any;
  mobile3_relation: any;
  new_sch_name: any;
  exportExcelData: any[];

  constructor(private fb: FormBuilder, 
    public usersessionService : UserSessionService,
     private el: ElementRef, private studentservice: StudentService, private alertService: AlertService) { 
      this.session_sch_name = this.usersessionService.schoolName();

     }

  col : Array<{'field':string,'header':string,'widthstyle':string}> =
  [
  { field: 'ROLLNO', header: 'Roll No',widthstyle: '8em'},
  { field: 'NAME', header: 'Name',widthstyle: '16em'},
  { field: 'class', header: 'Class',widthstyle: '7em'},
  { field: 'Containment_Zone', header: 'In containment Zone ?',widthstyle: '11em'},
  { field: 'Transport_Reqd', header: 'Require Transport ?' ,widthstyle: '11em'},
  { field: 'teacher_assigned', header: 'Teacher Assigned',widthstyle: '13em' },
  { field: 'Assigned_Exam_Centre', header: 'Assigned Exam Center',widthstyle: '16em'},
  { field: '', header: 'Action',widthstyle: '15em' },
  ];
  

  cols1 : Array<{'field':string,'header':string,'widthstyle':string}> =
  [
    { field: 'district_name', header: 'Mobile',widthstyle: '12em'},
    { field: 'CWSN_Student_in_school', header: 'Relationship',widthstyle: '16em'},
  ];

  ngOnInit() {
    this.student_list();

    this.board_xam_form = this.fb.group({ 
      'school_name': new FormControl(this.session_sch_name,null),
      'Same_City': new FormControl('',null),
      'Containment_Zone': new FormControl('',null),
      'Transport_Reqd': new FormControl('',null),
      'address': new FormControl('',null),
      'pincode': new FormControl('',null),
      'select_teacher' : new FormControl('',Validators.required),
      'teacher_emis_id' : new FormControl('',null),
      'teacher_name' : new FormControl('',null),
      'mbl_nmbr' : new FormControl('',null),
      'school_namee' : new FormControl('',null),
      'block_name' : new FormControl('',null),
    });
  }

  student_list(){
    this.studentservice.student_list_API().subscribe((res) => {
      // console.log(res.result.Teacher_Assigment,'this.sch_student_list');
      if(res.result != 0){
        this.sch_student_list = res.result.Teacher_Assigment;
        // console.log(this.sch_student_list,'this.sch_student_list');
        this.noDataFound = false;
      }
      else {
        this.noDataFound = true; 
      }
    })
  }
 
  block_id(event){
    this.select_block_id=event.value;

    this.studentservice.block_detail_API(this.select_block_id).subscribe((res) => {
      let dropDownList = res.result.school_details;
      if(dropDownList.length>0){
        this.sch_name_options.push({ value: "", label: "Choose" })
        for(let i=0; i<dropDownList.length;i++){
          this.sch_name_options.push({ value: dropDownList[i].school_id + "-" + dropDownList[i].udise_code + "-" + dropDownList[i].school_name, label: dropDownList[i].school_name })
        }
      }
      else
      {
        this.sch_name_options.push({ value: "", label: "No Data" })
      } 
  
    })
  }

  handleClick(roll_no , name, standard){
    this.selected_roll_no=roll_no
    this.selected_name=name
    this.selected_class=standard
    this.pop_header = this.selected_name + "-" + "Standard" + " " + this.selected_class

    let block_id="";
    this.studentservice.block_detail_API(block_id).subscribe((res) => {

    let dropDownList = res.result.block_details;
    if(dropDownList.length>0){
      this.block_name_options.push({ value: "", label: "Choose" })
      for(let i=0; i<dropDownList.length;i++){
        this.block_name_options.push({ value: dropDownList[i].block_id, label: dropDownList[i].block_name })
      }
    }
    else
    {
      this.block_name_options.push({ value: "", label: "No Data" })
    } 

  })


    this.studentservice.popup_detail_API(this.selected_roll_no).subscribe((res) => {
      // console.log(res.result.list,'popup');
      if(res.result != 0){
        this.popupdetails = res.result.list.roll_no_list[0];
        this.board_xam_form.patchValue(this.popupdetails);

        if(res.result.list != 0){

          this.mobile1=res.result.list.roll_no_list[0].mobile1;
          this.mobile2=res.result.list.roll_no_list[0].mobile2;
          this.mobile3=res.result.list.roll_no_list[0].mobile3;
          this.mobile3_relation=res.result.list.roll_no_list[0].mobile3_relation;
          this.mobile2_relation=res.result.list.roll_no_list[0].mobile2_relation;
          this.mobile1_relation=res.result.list.roll_no_list[0].mobile1_relation;

          // console.log(this.mobile1,"conctr");
          this.noDataFound1 = false;
        }
        else
        {
          this.noDataFound1 = true;
        }
        this.showDialogBox=true;

          // Dropdown Values
          let dropDownList = res.result.list.teacher_list;
        if(dropDownList.length>0){
          this.teacher_name_options.push({ value: "", label: "Choose" })
          for(let i=0; i<dropDownList.length;i++){
            this.teacher_name_options.push({ value: dropDownList[i].teacher_id + "-" + dropDownList[i].teacher_name + "-" +  dropDownList[i].mbl_nmbr, label: dropDownList[i].teacher_name })
          }
          this.teacher_name_options.push({value : "00", label : "Others"})
        }
        else
        {
          this.teacher_name_options.push({ value: "", label: "No Data" })
        } 
      }
      else {
        this.alertService.warning("Roll No Not Found");
      }
    })

  }

  teacher_option(event){
    this.select_teacher = event.value

     if(this.select_teacher == "00" )
     {
      this.board_xam_form.controls['teacher_emis_id'].setValidators(Validators.required);
      this.emis_id_teacher= true;
     }
     else {
      this.board_xam_form.controls['teacher_emis_id'].setValidators(null);
      this.emis_id_teacher= false;
     }

  }

  search_teacher(event){
    let teacher_emis_id = event;
    // let teacher_emis_id = this.board_xam_form.value.teacher_emis_id
    this.select_teacher;

    let data = {"teacher_id" : teacher_emis_id, "teacher_get_id" : this.select_teacher};
    this.studentservice.popup_teacher_detail_API({"records":data}, true).subscribe((res) => {
      // console.log(res.result.get_Teacher_det,"res");
      if(res.result != 0){
        this.teachers_data=res.result.get_Teacher_det[0];
        this.board_xam_form.patchValue(this.teachers_data);
      }
      else {  
      }
    });
  }

  save()
  {
    this.submitted = true;
    debugger;
    if (this.board_xam_form.valid) { 

     let sch_details=this.board_xam_form.value.school_namee;

      let  school = sch_details.toString().split('-');
      this.new_sch__id = school[0];
      this.new_sch_udise = school[1];
      this.new_sch_name = school[2];

  if(this.select_teacher !== "00"){
      let
      rollno=this.selected_roll_no,
      techer_details=this.board_xam_form.value.select_teacher;

    let  teacher = techer_details.toString().split('-');
      this.teacher_id = teacher[0];
      this.teacher_assigned = teacher[1];
      this.teacher_phone = teacher[2];
    
      if(sch_details == ''){
          let data = {"ROLLNO" : rollno, "teacher_phone" : this.teacher_phone, "teacher_assigned" : this.teacher_assigned, "teacher_id" : this.teacher_id };
          // console.log(data,"res");
          this.studentservice.popup_teacher_detail_API({"records":data}, true).subscribe((res) => {
            // console.log(res.result.get_Teacher_det,"res");
            if(res.result != 0){ 
              this.alertService.success("Data Saved Successfully");
              this.showDialogBox=false;
            }
            else {  
              this.alertService.error("Data Not Saved");
            }
          })
      }
      else {
          let data = {"ROLLNO" : rollno, "teacher_phone" : this.teacher_phone, "teacher_assigned" : this.teacher_assigned, "teacher_id" : this.teacher_id ,"new_center_school_id" : this.new_sch__id ,"new_center_udise" :  this.new_sch_udise, "new_center_name": this.new_sch_name};
      // console.log(data,"res");
      this.studentservice.popup_teacher_detail_API({"records":data}, true).subscribe((res) => {
        // console.log(res.result.get_Teacher_det,"res");
        if(res.result != 0){ 
          this.alertService.success("Data Saved Successfully");
          this.showDialogBox=false;
        }
        else {  
          this.alertService.error("Data Not Saved");
        }
      })
      }
  }
  else {
      let
      rollno=this.selected_roll_no;
      this.teacher_id =this.board_xam_form.value.teacher_emis_id;
      this.teacher_assigned =this.board_xam_form.value.teacher_name;
      this.teacher_phone =this.board_xam_form.value.mbl_nmbr;

      if (sch_details == '')
      {
      let data = {"ROLLNO" : rollno, "teacher_phone" : this.teacher_phone, "teacher_assigned" : this.teacher_assigned, "teacher_id" : this.teacher_id};
        // console.log(data,"res");

        this.studentservice.popup_teacher_detail_API({"records":data}, true).subscribe((res) => {
          // console.log(res.result.get_Teacher_det,"res");
          if(res.result != 0){
            this.alertService.success("Data Saved Successfully");
            this.showDialogBox=false;
          }
          else {  
            this.alertService.error("Data Not Saved");
          }
        })
      }    
      else {
      let data = {"ROLLNO" : rollno, "teacher_phone" : this.teacher_phone, "teacher_assigned" : this.teacher_assigned, "teacher_id" : this.teacher_id, "new_center_school_id" : this.new_sch__id ,"new_center_udise" :  this.new_sch_udise ,"new_center_name": this.new_sch_name};
      // console.log(data,"res");

      this.studentservice.popup_teacher_detail_API({"records":data}, true).subscribe((res) => {
        // console.log(res.result.get_Teacher_det,"res");
        if(res.result != 0){
          this.alertService.success("Data Saved Successfully");
          this.showDialogBox=false;
        }
        else {  
          this.alertService.error("Data Not Saved");
        }
      })
      }
     }
   }  
    else{
      for (const key of Object.keys(this.board_xam_form.controls)) {
        if (this.board_xam_form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          // console.log('invalid keys',key);
          invalidControl.focus();
          break;
        }
      }
    this.alertService.error("Please Fill all the Required Fields");
    }
  }

  close_dialog(){
    this.showDialogBox=false;
  }


  getstudentstatedata(){
    this.exportExcelData = [];
    this.sch_student_list.map(item => {

      return {
          'ROLL NO': item.ROLLNO,
          'NAME': item.NAME,
          'class': item.class,
          'In containment Zone': item.Containment_Zone,
          'Require Transport': item.Transport_Reqd,
          'Teacher Assigned': item.teacher_assigned,
          'Assigned Exam Center': item.Assigned_Exam_Centre,

         } 
         }).forEach(item => this.exportExcelData.push(item));
         let studentdatastate = [];
         for(let schooldata of this.exportExcelData) {
          studentdatastate.push(schooldata);
         }
         return studentdatastate;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getstudentstatedata());
        const workbook = { Sheets: { 'Board Exam Students' : worksheet }, SheetNames: ['Board Exam Students'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'Board Exam Students');
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

}
