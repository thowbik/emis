import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
import { IfStmt, THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-kgbv-student-banking-details',
  templateUrl: './kgbv-student-banking-details.component.html',
  styleUrls: ['./kgbv-student-banking-details.component.css']
})
export class KgbvStudentBankingDetailsComponent implements OnInit {
  form: FormGroup;
  AcconutForm: FormGroup;
  TransacAcconutForm: FormGroup;
  public student_list: any[] = [];
  student_account_detais: any;
  class: { label: string; value: string; }[];
  section: { label: string; value: string; }[];
  dataHeader: (FormGroup | { field: string; header: string; widthstyle: string; })[];
  Page: number;
  exportExcelData: any[] = [];
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  schlId: any;
  class_in_roman: any = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG"];
  cls_id: any;
  classlist: any;
  class_sec: any;
  assigned_section: string;
  class_id: any;
  sectionList: any;
  section_Id: any;
  name: any;
  StudentAccountData: any;
  noData: boolean;
  sec: any;
  cls_Id: any;
  balance: any;
  ifsc_code: any;
  bank_detail: any;
  pattern = "^[A-Za-z]{4}0[A-Z0-9a-z]{6}$";
  IndexId: any;
  student_bankId: any;
  Prv_bal: any;
  DateOfCheckd: any;
  current_bal: any;
  remarks: any;
  IndxID: any;
  student_name_list: any;
  submitted: boolean;
  student_name: any;
  student_Id_Value: any;
  shownValue: boolean;
  student_list_data: any;
  Index_id: any;
  Student_Id: any;
  Student_bank_id: any;
  Edit_Index_Id: any;
  Edit_Student_Id: any;
  Edit_StudentBank_Id: any;
  Edit_CurntBalnc: any;
  Trans_student_id: any;
  Trans_current_bal: any;
  Trans_student_bankId: any;
  class_in_romans: any;
  showForm: boolean;
  student_class: any;
  student_section: any;
  acc_num: any;
  docUploads: any[] = [];
  uploadedFiles: any[] = [];
  imageupload: any;
  showFormData: boolean;
  studentID: any;
  StdBankID: any;
  image: string;
  updateBtn: boolean;
  PassBookImg: any;
  showField: boolean;
  saveBtn: boolean;
  Student_branch_id: any;
  StdBranchId: any;
  update: boolean;
  data: any;
  studentlist: any;
  cols: any[];
  filename: any;
  show_image: boolean;
  photo: any;
  ifsc: any;
  show_Field: boolean;
  student_Name: any;
  show_Field_std: boolean;
  // StudBankId: any;
  constructor(private fb: FormBuilder, public dashboardService: StateDashboardService, private el: ElementRef, private confirmationService: ConfirmationService, private alertService: AlertService, private school: schoolsService, private session: UserSessionService) {
    this.schlId = this.session.schoolId();
  }
  ngOnInit() {
    this.showForm = true;
    this.getClassBySchoolid();
    this.dataHeader =
      [
        { field: 'StudentName', header: 'Student Name', widthstyle: '15em' },
        { field: 'roman', header: 'Class', widthstyle: '3em' },
        { field: 'Section', header: 'Section', widthstyle: '3em' },
        { field: 'CurrentBalance', header: 'Opening Balance', widthstyle: '4em' },
        { field: '', header: 'Action', widthstyle: '6em' }
      ];
    this.dataHeader1 =
      [
        { field: '', header: 'Transaction Date', widthstyle: '20em' },
        { field: '', header: 'Amount', widthstyle: '5em' },
      ]

    this.form = this.fb.group({
      class: ['', Validators.required],
      section: ['', Validators.required],
    })
    this.AcconutForm = this.fb.group({
      Class: ['', Validators.required],
      StudentID: ['', Validators.required],
      Section: ['', Validators.required],
      // DOJ: ['', Validators.required],
      AccNum: ['', Validators.required, Validators.pattern["[0-9]{9,18}"]],
      ifsc_code: ['', null],
      branch: ['', null],
      bank_name: ['', null],
      PassBookImg: ['', Validators.required]
    })
    this.TransacAcconutForm = this.fb.group({
      Class: ['', Validators.required],
      StudentID: ['', Validators.required],
      Section: ['', Validators.required],
      DOJ: ['', Validators.required],
      CurrentBal: ['', Validators.required],
      Remarks: ['', Validators.required],
    })
  }


  getClassBySchoolid() {
    debugger
    this.school.getStudentclasslist(this.schlId).subscribe(res => {
      this.class_sec = res;
      this.classlist = this.class_sec['classdetails'];
      this.classlist.map(i => i['roman'] = this.class_in_roman[i['value']]);
    })
  }
  onChangeClass(e) {
    this.class_id = e;
    let student_cls_data = { "class_id": this.class_id, "school_id": this.schlId };
    this.section = [];
    this.school.getStudentSectionlist({ "records": student_cls_data }).subscribe(
      dataresult => {
        if (dataresult['dataStatus'] == true) {
          this.section = dataresult.result.map(l => { return { label: l.section, value: l.section } });
        }
        if (this.Page === 3) {
          var section = this.AcconutForm.value.Section;
          if (section != null) {
            let student_list_data =
              { "class_id": this.class_id, "section": section, "school_id": this.schlId };
            this.school.getStudentlist({ "records": student_list_data }).subscribe(res => {
              if (res.dataStatus === true) {
                debugger;
                var student_name = res.result;
                this.student_name_list = student_name.map(item => { return { label: item.name, value: item.id } });
                console.log(this.student_name_list);
              }
              else {
                this.student_name_list.push({ label: 'No Student', value: '0' });
              }
            })
          }
        }
      });
  }
  onChangeSection(event) {
    debugger;
    this.section_Id = event.value;
    if (this.Page === 3) {
      this.student_name_list = [];
      let student_list_data =
        { "class_id": this.class_id, "section": this.section_Id, "school_id": this.schlId };
      this.school.getStudentlist({ "records": student_list_data }).subscribe(res => {
        if (res.dataStatus === true) {
          debugger;
          // this.data = [];
          // this.data = res.result;
          var student_name = res.result;
          this.student_name_list = student_name.map(item => { return { label: item.name, value: item.id } });
          console.log(this.student_name_list);
        }
        else {
          this.student_name_list.push({ label: 'No Student', value: '0' });
        }
      })
    }
  }
  //submit
  getStudentList() {
    debugger;
    this.Page = 1;
    this.data = [];
    let student_list_data = { "ClassId": this.class_id, "Section": this.section_Id, "SchoolId": this.schlId };
    this.school.getStudentBanklist({ "records": student_list_data }).subscribe(res => {
      debugger;
      this.studentlist = res['result'];
      if (this.studentlist != "") {
        this.data = this.studentlist;
        this.class_in_romans = this.data.map(i => i['roman'] = this.class_in_roman[i['Class']]);
      }
    })
  }
  getCurrentStdDetails(studentlist) {
    debugger;
    this.showForm = false;
    const StudentId = studentlist.StudentID;
    //console.log(StudentId);
    this.school.getStdCurrentData(StudentId).subscribe(res => {
      if (res.dataStatus == true) {
        this.student_account_detais = res.result;
      }
      else {
        this.noData = true;
      }
    })
    this.Page = 2;
    this.name = studentlist.StudentName;
    this.sec = studentlist.Section;
    this.cls_Id = studentlist.roman;
    console.log(this.cls_Id, "loooo");

    this.balance = studentlist.CurrentBal;
  }
  //insert
  onAddAccount() {
    debugger;
    this.showFormData = true;
    this.showForm = false;
    this.showField = true;
    this.show_Field_std= true;
    this.show_Field = false;
    this.saveBtn = true;
    this.updateBtn = false;
    this.show_image = false;
    this.Page = 3;
    this.AcconutForm.reset();
    this.getClassBySchoolid();
    this.submitted = false;
  }
  //student-dropdown
  getStudent_list_dropdown(e) {
    debugger;
    console.log(e, "namelist");
    this.Student_Id = e.value;
  }
  //getIFSC Code
  ifsc_cde(ifscc) {
    debugger;
    this.ifsc_code = ifscc;
    this.school.get_ifsc_data(this.ifsc_code).subscribe((res) => {
      if (res.dataStatus == true) {
        this.bank_detail = res.data[0];
        this.Student_bank_id = this.bank_detail.bank_id;
        this.Student_branch_id = this.bank_detail.id;
        if (this.AcconutForm.value.ifsc_code == this.ifsc_code) {
          this.AcconutForm.controls['bank_name'].setValue(this.bank_detail.bank_name);
          this.AcconutForm.controls['branch'].setValue(this.bank_detail.branch);
        }
      }
      else {
        this.alertService.error("There is no bank details for Given IFSC Code");
      }
    })
  }
  //insert-save
  onSaveAccountInsert() {
    debugger;
    this.submitted = true;
    if (this.AcconutForm.valid) {
      if (this.docUploads && this.docUploads.length > 0) {
        this.uploadFiles(this.docUploads);
      }
      setTimeout(() => {
        this.saveAllData(this.AcconutForm.value);

      }, 1500);
    }
    else {
      this.alertService.error("Please Fill all the Required Fields");
    }
  }
  saveAllData(form_value) {
    debugger;
    let form_values =
    {
      "StudID": this.Student_Id, "BankID": this.Student_bank_id, "BrnchID": this.Student_branch_id, "PassBookImg": this.uploadedFiles[0].doc_name_coded,
      "AccNo": form_value.AccNum, "AccTyp": "1"
    }
    this.school.saveAccountData({ "records": form_values }).subscribe(res => {
      if (res.status == 200) {
        this.alertService.success(res.message);
        this.getStudentList();
        this.Page = 1;
        this.showForm = true;
        this.submitted = false;
      }
      else {
        this.alertService.error(res.message);
      }
    });
  }
  //edit account data
  onEditAccount(studentlist) {
    debugger
    this.Page = 3;
    this.showForm = false;
    this.showField = false;
    this.show_Field = true;
    this.show_Field_std = false;
    this.image = "";
    this.updateBtn = true;
    this.show_image = false;
    this.saveBtn = false;
    this.student_class = studentlist.roman;
    this.student_section = studentlist.Section;
    this.IndxID = studentlist.IndexId;
    this.student_Name = studentlist.StudentName;
    this.studentID = studentlist.StudentID;
    this.StdBankID = studentlist.StudBankId;
    this.StdBranchId = studentlist.BranchId;
    this.PassBookImg = studentlist.PassBookImg;
    //  let student_list_data = 
    //  { "class_id": this.student_class, "section": this.student_section, "school_id": this.schlId };
    //  this.school.getStudentlist({ "records": student_list_data }).subscribe(res => 
    //   {
    //    if (res.dataStatus == true) 
    //    {
    //      debugger;
    //      var student_name = res.result;
    //      this.student_name_list = student_name.map(item => { return { label: item.name, value: item.id } });
    //      console.log(this.student_name_list);      
    //    }
    //    else 
    //    {
    //      this.student_name_list.push({ label: 'No Student', value: '0' });
    //    }
    //  })
    this.AcconutForm.patchValue(studentlist);
  }
  //edit account save
  onUpdateAccount() {
    debugger;
    this.submitted = true;
    this.AcconutForm.controls['ifsc_code'].setValue(this.ifsc);
    if (this.AcconutForm.valid) {
      if (this.docUploads && this.docUploads.length > 0) {
        this.uploadFiles(this.docUploads);
      }
      setTimeout(() => {
        this.onSaveEditAccount(this.AcconutForm.value);
      }, 2000);
    }
    else {
      this.alertService.error("Please Fill all the Required Fields");
    }
  }
  onSaveEditAccount(formvalue) {
    if (this.uploadedFiles.length == 0) {
      this.photo = this.PassBookImg
    } else {
      // const lastItem = colors[colors.length - 1]
      this.photo = this.uploadedFiles[this.uploadedFiles.length - 1].doc_name_coded
    }
    let edit_account_values =
    {
      "IndxID": this.IndxID, "StudID": this.studentID, "BankID": this.StdBankID, "BrnchID": this.StdBranchId,
      "PassBookImg": this.photo,
      "AccNo": formvalue.AccNum, "AccTyp": "1"
    }
    this.school.saveEditFormDatas({ "records": edit_account_values }).subscribe(res => {
      if (res.status == 200) {
        this.alertService.success(res.message);
        this.data = [];
        let student_list_data = { "ClassId": this.class_id, "Section": this.section_Id, "SchoolId": this.schlId };
        this.school.getStudentBanklist({ "records": student_list_data }).subscribe(res => {
          debugger;
          this.studentlist = res['result'];
          if (this.studentlist != "") {
            this.data = this.studentlist;
            this.class_in_romans = this.data.map(i => i['roman'] = this.class_in_roman[i['Class']]);
          }
        })
      }
    });
    this.Page = 1;
    this.showForm = true;
    this.updateBtn = false;
  }

  onAccountCancel() {
    this.Page = 1;
    this.showForm = true;
    this.updateBtn = false;
  }
  onDeleteAccount(Student_list) {
    debugger;
    var Std_iD = Student_list.StudID;
    this.confirmationService.confirm({
      message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete?</p>',
      accept: () => {
        // this.IndxID = indexId;
        let records = {
          "records":
          {
            "IndxID": Student_list.IndexId
          }
        }
        this.school.DeleteAcc_data(records).subscribe((res) => {
          if (res.status == 200) {
            if (res.dataStatus) {
              this.alertService.success(res.message);
              this.data = [];
              let student_list_data = { "ClassId": Student_list.Class, "Section": Student_list.Section, "SchoolId": this.schlId };
              this.school.getStudentBanklist({ "records": student_list_data }).subscribe(res => {
                debugger;
                this.studentlist = res['result'];
                if (this.studentlist != "") {
                  this.data = this.studentlist;
                  this.class_in_romans = this.data.map(i => i['roman'] = this.class_in_roman[i['Class']]);
                }
              })
            }
            else {
              this.alertService.error(res.message);
            }
            // this.Page = 2;
          }
        })
      }
    })
  }
  //file upload
  onSelectFile(event, type) {
    if (event.target.files && event.target.files[0]) {
      var fileName = event.target.files[0].name;
      var splittedName = fileName.split(".");
      {
        switch (type) {
          case 'photo':
            this.docUploads.push({
              "filename": splittedName[0],
              "ext": splittedName[splittedName.length - 1],
              "file": event.target.files[0],
            });
            this.AcconutForm.controls['PassBookImg'].setValue(splittedName[0]);
            console.log(this.AcconutForm.value.PassBookImg, "this.form.controls['PassBookImg'])");
          default:
            break;
        }
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onload = (event: Event) => {
        };
      }
      // this.alertService.success("File Upload Successfully");   
    }
  }
  uploadFiles(files) {
    debugger;
    var bucketName = "renewalapplicationemis";
    let expiry: number = 300;
    for (let i = 0; i < files.length; i++) {
      this.dashboardService.getSignedUrl(bucketName, files[i].ext, files[i].filename, expiry).subscribe((result) => {
        if (result) {
          let file: File = files[i].file;
          let filename: File = files[i].filename;
          this.dashboardService.uploadFile(result.url, file).subscribe((res) => {
            this.uploadedFiles.push({
              "doc_name": files.filename,
              "doc_name_coded": result.key,
            })
          });
          this.alertService.success("File Uploaded Successfully");
          this.imageupload = result.key;
          console.log(this.imageupload, "image");
          this.submitted = false;
        }
        else {
          this.alertService.error("Error in Uploading File please try again");
        }
      });
    }
  }
  getUploadedFle() {
    debugger;
    var bucketName = "renewalapplicationemis";
    var filename = this.PassBookImg;
    let expiry: number = 1800;
    this.dashboardService.getUploadedFiles(bucketName, filename, expiry).subscribe((result) => {
      if (result) {
        debugger;
        this.image = result.url;
        this.show_image = true;
      }
      else {
        this.alertService.success("Error in Uploading File please try again");
      }
    });
  }

  //insert transaction data
  onAddTransaction(studenlist) {
    debugger;
    this.submitted =false;
    this.showFormData = false;
    this.showForm = false;
    this.Page = 4;
    this.saveBtn = true;
    this.update = false;
    this.name = studenlist.StudentName;
    this.cls_Id = studenlist.roman;
    //console.log(this.cls_Id);
    this.sec = studenlist.Section;
    this.Trans_student_id = studenlist.StudentID;
    this.Trans_current_bal = studenlist.CurrentBalance;
    this.Trans_student_bankId = studenlist.StudBankId;
    this.TransacAcconutForm.patchValue(studenlist);
    var StudentID = studenlist.StudentID;
    this.getStudentLastTransactionData(StudentID);
  }
  getStudentLastTransactionData(StudentID) {
    this.school.getStdLastTransactionData(StudentID).subscribe(res => {
    var row_data = res.result;
    if (res.result != '') 
    {
      this.TransacAcconutForm.controls['CurrentBal'].setValue(row_data[0].CurntBalnc);
      this.TransacAcconutForm.controls['Remarks'].setValue(row_data[0].Remrks);
      this.TransacAcconutForm.controls['DOJ'].setValue(row_data[0].DateOfCheckd);
        // this.TransacAcconutForm.patchValue(row_data);
      }
    else 
    {
      this.TransacAcconutForm.controls['CurrentBal'].setValue(""); 
      this.TransacAcconutForm.controls['Remarks'].setValue("");
      this.TransacAcconutForm.controls['DOJ'].setValue("");
    }
    })
  }
  //insert-transaction-save
  onSaveTransactionData(formvalue) {
    debugger;
    this.submitted = true;
    if (this.TransacAcconutForm.valid) 
    {
      let form_values =
      {
        "StudID": this.Trans_student_id, "StuBankID": this.Trans_student_bankId, "DateOfCheckd": formvalue.DOJ, "PrevBalnc": "",
        "CurntBalnc": formvalue.CurrentBal, "Remrks": formvalue.Remarks
      }
      this.school.saveFormDatas({ "records": form_values }).subscribe(res => {
      if (res.status == 200) 
      {
          this.alertService.success(res.message);
          this.data = [];
          let student_list_data = { "ClassId": formvalue.Class, "Section": formvalue.Section, "SchoolId": this.schlId };
          this.school.getStudentBanklist({ "records": student_list_data }).subscribe(res => {
          debugger;
          this.studentlist = res['result'];
          if (this.studentlist != "") 
          {
          this.data = this.studentlist;
          this.class_in_romans = this.data.map(i => i['roman'] = this.class_in_roman[i['Class']]);
          }
          });
          // this.TransacAcconutForm.reset();
          // this.onSubmit();
      }
      else {
          this.alertService.error(res.message);
        }
      });
      this.Page = 1;
      this.showForm = true;
      this.submitted = false;
    }
    else {
      this.alertService.warning('Please Fill All Mandatory Fields.!');
    }
  }
  //transaction edit
  onEditTransactionData(studen_Acc_list) {
    debugger;
    this.submitted = false;
    this.StudentAccountData = studen_Acc_list;
    // //console.log(this.StudentAccountData);
    // this.TransacAcconutForm.patchValue(this.StudentAccountData);
    this.name;
    this.cls_Id;
    this.sec;
    this.TransacAcconutForm.controls['Class'].setValue(this.cls_Id);
    this.TransacAcconutForm.controls['Section'].setValue(this.sec);
    this.TransacAcconutForm.controls['StudentID'].setValue(studen_Acc_list.StudID);
    this.TransacAcconutForm.controls['CurrentBal'].setValue(studen_Acc_list.CurntBalnc);
    this.TransacAcconutForm.controls['Remarks'].setValue(studen_Acc_list.Remrks);
    this.TransacAcconutForm.controls['DOJ'].setValue(studen_Acc_list.DateOfCheckd);
    this.Edit_Index_Id = this.StudentAccountData.IndxId;
    this.Edit_Student_Id = this.StudentAccountData.StudID;
    this.Edit_StudentBank_Id = this.StudentAccountData.StuBankID;
    this.Edit_CurntBalnc = this.StudentAccountData.CurntBalnc;
    this.Page = 4;
    this.shownValue = false;
    this.saveBtn = false;
    this.update = true;
  }
  //edit save
  onSaveEditedTransaction(formvalue) {
    debugger;
    console.log(formvalue, "hoyhd");
    var DateOfCheckd = formvalue.DOJ;
    var current_bal = formvalue.CurrentBal;
    var remarks = formvalue.Remrks;
    if (this.TransacAcconutForm.valid) {
      let form_values_insert =
      {
        "IndxID": this.Edit_Index_Id, "StudID": this.Edit_Student_Id, "StuBankID": this.Edit_StudentBank_Id, "DateOfCheckd": formvalue.DOJ, "PrevBalnc": this.Edit_CurntBalnc,
        "CurntBalnc": formvalue.CurrentBal, "Remrks": formvalue.Remarks
      }
      this.school.saveEditDatas({ "records": form_values_insert }).subscribe(res => {
        if (res.status == 200) {
          this.alertService.success(res.message);
          this.getStdCurrentList(this.Edit_Student_Id)
        }
      })
      this.Page = 2;
    }
    else {
      this.alertService.warning('Please Fill All Mandatory Fields.!');
    }
  }
  //delete
  onDeleteTransactionData(Student_list) {
    debugger;
    var Std_iD = Student_list.StudID;
    this.confirmationService.confirm({
      message: '<p class="font-weight-bold text-center p-2">Are you sure that you want to Delete?</p>',
      accept: () => {
        // this.IndxID = indexId;
        let records =
        {
          "records":
          {
            "IndxID": Student_list.IndxId
          }
        }
        this.school.Delete_data(records).subscribe((res) => {
          if (res.status == 200) {
            if (res.dataStatus) {
              this.alertService.success(res.message);
              this.getStdCurrentList(Std_iD);
            }
            else {
              this.alertService.error(res.message);
            }
            // this.Page = 2;
          }
        })
      }
    })
  }
  onUpdateTransactionCancel() {
    this.saveBtn = true;
    this.update = false;
    this.showForm =true;
    this.Page = 1;
  }
  onEditTransactionCancel() {
    this.Page = 2;
    this.update = true;
    this.saveBtn = false;
  }
  //getstdlist
  getStdCurrentList(stdId) {
    this.school.getStdCurrentData(stdId).subscribe(res => {
      if (res) {
        this.student_account_detais = res.result;
      }
    });
  }
  GoBack() {
    this.Page = 1;
    this.showForm = true;
  }
  GoBack1() {
    this.Page = 2;
  }
  //excel 
  getExcel() {
    this.exportExcelData = [];
    return this.data.map(i => {
      return {
        'StudentName': i.StudentName,
        'Class': i.Class,
        'Section': i.Section,
        'Opening Balance': i.CurrentBal
      }
    })
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcel());
      const workbook = { Sheets: { 'Student-Banking-Details': worksheet }, SheetNames: ['Student-Banking-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Student-Banking-Details");
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
  //account details
  getAccountExcel() {
    this.exportExcelData = [];
    return this.student_account_detais.map(i => {
      return {
        'Transaction Date': i.DateOfCheckd,
        'Amount': i.CurntBalnc
      }
    })
  }
  exportExcel1() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getAccountExcel());
      const workbook = { Sheets: { 'Student-Banking-Details': worksheet }, SheetNames: ['Student-Banking-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Student-Banking-Details");
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
}

