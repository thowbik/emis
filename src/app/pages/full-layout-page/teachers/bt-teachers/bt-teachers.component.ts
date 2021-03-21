import { Component, OnInit } from '@angular/core';
import {UserSessionService} from '../../../../../services/usersession.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-bt-teachers',
  templateUrl: './bt-teachers.component.html',
  styleUrls: ['./bt-teachers.component.css']
})
export class BTTeachersComponent implements OnInit {
  schoolverificationdetail: FormGroup;
  schoolverificationdetails: FormGroup;
  districtwise: any[] = [];
  blockwiseDetails: any[] = [];
  blockList:any;
  public nodateFound = false;
  public nodateFound2 = false;
  public pageStage: number;
  schooltypedropvalue: { label: string; value: number; }[];
  languagedropvalue: { label: string; value: number; }[];
  selt_lang: any;
  sch_typ_id: any;
  selt_dist_id: any;
  report_id: any;
  Session_districtId: any;
  usertypeid: any;
  exportExcelData: any;
  districtId: string;
  blockId:any;
  districtName : any;

  constructor(private teacherservice: TeacherService, private userSessionService: UserSessionService,
              private fb: FormBuilder) {
    this.schooltypedropvalue = [
      {label: 'Government', value: 1},
      {label: 'Fully Aided', value: 2},
      // {label: 'Un-aided', value: 3},
      {label: 'Partially Aided', value: 4},
      // {label: 'Central Government.', value: 5}
    ];
    this.languagedropvalue = [
      {label: 'English', value: 46},
      {label: 'Tamil', value: 48},
      {label: 'Maths', value: 3},
      {label: 'Science', value: 7},
      {label: 'Social Science', value: 8},
      {label: 'Telugu', value: 95},
      {label: 'Kannada', value: 96},
      {label: 'Urdu', value: 45},
      {label: 'Malayalam', value: 94},
    ];
  }
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'district_name', header: 'District Name', widthstyle: '10em'},
      { field: 'Government', header: 'Government', widthstyle: '10em'},
      { field: 'Fully_Aided', header: 'Fully Aided', widthstyle: '10em'},
      { field: 'Partially_Aided', header: 'Partially Aided', widthstyle: '10em'},
      { field: 'Total', header: 'BT Teachers', widthstyle: '10em'},
    ];
  cols2: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'teacher_name', header: 'Teacher Name', widthstyle: '18em'},
      { field: 'udise_code', header: 'UDISE Code', widthstyle: '18em'},
      { field: 'school_name', header: 'School Name' , widthstyle: '18em'},
      { field: 'cate_type', header: 'School Type', widthstyle: '19em' },
      { field: 'subjects', header: 'Appointed Subjects', widthstyle: '14em' },
      { field: 'mbl_nmbr', header: 'Mobile Number', widthstyle: '22em' },
    ];

  ngOnInit() {
    this.sch_typ_id =1,2,4;
    this.Session_districtId = this.userSessionService.districtId();
    this.usertypeid = this.userSessionService.userTypeId();
    this.blockId = this.userSessionService.userId();
    
    if (this.usertypeid == 9 || this.usertypeid == 3 || this.usertypeid == 2) {
      this.pageStage = 2;
    }
    if(this.blockId!="" || this.blockId!=null)
    {
     
          }

    this.schoolverificationdetail = this.fb.group({
      schooltype: new FormControl('', null),
      language: new FormControl('', null),
    });
    this.schoolverificationdetails = this.fb.group({
      schooltype: new FormControl('', null),
      language: new FormControl('', null),
    });
  }

  BTTeachersDetails(value) {
    this.selt_lang = value.language;
    this.sch_typ_id = value.schooltype;
    this.report_id = value.reportid;


    this.teacherservice.BTTeachersList(this.selt_lang, this.sch_typ_id, this.report_id).subscribe(
      data => {
        // alert(this.selt_dist_id)
        this.pageStage = 1;
        if (data !=0) {
          this.districtwise = data.result.BT_Teachers_Subject;
          console.log(this.districtwise);
        } else {
          this.nodateFound = true;
        }
      }
    );
  }

  onSelectedId(dist_id,dist_name) {
    this.selt_dist_id = dist_id;
    this.sch_typ_id = 1,2,4;
    this.districtName = dist_name;
    console.log(this.districtId);
    // alert(this.selt_dist_id)
    this.teacherservice.BTTeachersDetails(this.selt_lang, this.sch_typ_id, dist_id,this.report_id).subscribe(
      details => {
        this.pageStage = 2;
        if (details != 0) {
          this.blockwiseDetails = details.result.BT_Teachers_Subject;
          console.log(this.blockwiseDetails);
        } else {
          this.nodateFound = true;
        }
      }
    );
  }
 

  BTteachers(value) {
    const selt_lang = value.language;
    
    const sch_typ_id = value.schooltype;

    if (this.usertypeid == 9 || this.usertypeid == 3) {
      this.Session_districtId;
      this.teacherservice.BTTeachersDetails(selt_lang, sch_typ_id , this.Session_districtId,this.report_id).subscribe(
      data => {
        // alert(this.selt_dist_id)
        this.pageStage = 2;
        if (data !=0) {
          this.blockwiseDetails = data.result.BT_Teachers_Subject;
        } else {
          this.nodateFound = true;
        }
      }
    );
    } else {
      this.teacherservice.BTTeachersDetails(selt_lang, sch_typ_id , this.selt_dist_id,this.report_id).subscribe(
        data => {
          // alert(this.selt_dist_id)
          this.pageStage = 2;
          if (data != 0) {
            this.blockwiseDetails = data.result.BT_Teachers_Subject;
          } else {
            this.nodateFound = true;
          }
        }
      );
    }

    if(this.usertypeid == 2)
    {
     // this.sch_typ_id = 1,2,4;
  
    this.teacherservice.BlockBTTeachersDetails(selt_lang, sch_typ_id, this.blockId,this.report_id).subscribe(
      details => {
        this.pageStage = 2;
        if (details != 0) {
          this.blockList = details.result.BT_Teachers_Subject;
          console.log(this.blockwiseDetails);
        } else {
          this.nodateFound = true;
        }
      }
    );
    }
  }

   getschooldata(){
     this.exportExcelData = [];
     this.blockwiseDetails.map(item => {
       return {
         'Teacher Name': item.teacher_name,
       'UDISE code': item.udise_code,
         'School Name': item.school_name,
         'Category Type': item.cate_type,
         'Appointed Subjects': item.subjects,
         'Mobile Number': item.mbl_nmbr,
          } 
    
          }).forEach(item => this.exportExcelData.push(item));
          let teacherreportacademic = [];
          for(let acdamicreport of this.exportExcelData) {
        teacherreportacademic.push(acdamicreport);
          }
          return teacherreportacademic;
    }
  
    exportExcelceo() {
     import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(this.getschooldata());
         const workbook = { Sheets: { 'BT Teachers Appointed Subject' : worksheet }, SheetNames: ['BT Teachers Appointed Subject'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, this.districtId +' (BT Teachers Appointed Subject) ');
     });
   }
  
   saveAsExcelFileceo(buffer: any, fileName: string): void {
     import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
         const data: Blob = new Blob([buffer], {
           type: EXCEL_TYPE
         });
         FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  } 
  getparttimesalary() {
    this.exportExcelData = [];
    this.districtwise.map(item => {
      return {
        'District Name': item.district_name,
        'Government': item.Government,
        'Fully Aided': item.Fully_Aided,
        'Partially Aided': item.Partially_Aided,
        'BT Teachers': item.Total,
         }
  }).forEach(item => this.exportExcelData.push(item));
    let staffs = [];
    for(let Teacherssalary of this.exportExcelData) {
      staffs.push(Teacherssalary);
    }
    return staffs;
  }
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getparttimesalary());
        const workbook = { Sheets: { 'Teachers Appointment Subject' : worksheet }, SheetNames: ['Teachers Appointment Subject'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.districtId +' (Teachers Appointment Subject) ');
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

goBack(){
  if(this.usertypeid == 5 && this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
  {
  this.pageStage = 1;
  this.districtName = '';
}
}
  }

