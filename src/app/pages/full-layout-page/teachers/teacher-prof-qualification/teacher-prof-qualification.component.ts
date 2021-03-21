import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../teacher.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
@Component({
  selector: 'app-teacher-prof-qualification',
  templateUrl: './teacher-prof-qualification.component.html',
  styleUrls: ['./teacher-prof-qualification.component.css']
})
export class TeacherProfQualificationComponent implements OnInit {

  public dataHeader: any;
  public length: any;
  schoolCode: string;
  noDataFound: boolean;
  userTypeID: number;
  districtId: any;
  proofqualification: any;
  grandtotal_bs: number;
  grandtotal_se: number;
  grandtotal_hs: number;
  grandtotal_gt: number;
  grandtotal_pg: number;
  grandtotal_mp: number;
  grandtotal_phd: number;
  grandtotal_pt: number;
  grandtotal_tot: number;
  appoint_nature_get_value: any;
  school_type_get_val: any;
  arrString: any;
  appoinment: { label: string; value: string; }[];
  school_type: { label: string; value: string; }[];
  exportExcelData: any;
  grandtotal_ptcourse: any;
  constructor(private router: Router, private teacherservice: TeacherService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
    this.districtId = this.userSessionService.districtId();

  }

  ngOnInit() {
    this.arrString =1,2,3,6,90;
    this.appoinment = [
      {label: 'Select Nature of Appointment', value: '0'},
      {label: 'Regular', value: '1'},
      {label: 'Contract', value: '2'},
      {label: 'Part Time', value: '3'}
      ];
      this.school_type = [
        {label: 'Select School Type', value: '0'},
        {label: 'Government', value: '1,2,3,6,90'},
        {label: 'Aided', value: '4'},
        {label: 'Government and Aided', value: '1,2,3,4,6,90'},
        {label: 'Others', value: '5,8,90,92,94,95'}
        ]; 
    const districtId = this.userSessionService.districtId();
    {
    this.dataHeader = [
      { field: 'category', header: 'Category', widthstyle: '8em' },
      {field: 'Diploma_or_certificate_in_TT', header: 'Diplomo Or Certificate in It', widthstyle: '10em' },
      { field: 'BElEd', header: 'BElED', widthstyle: '3em' },
     { field: 'BEd_or_equivalent', header: 'BEd or equivalent', widthstyle: '5em' },
     { field: 'MEd_or_equivalent', header: 'MEd or equivalent', widthstyle: '5em' },
     { field: 'Others', header: 'Others', widthstyle: '4em'},
     { field: 'None', header: 'None', widthstyle: '3em'},
     { field: 'Diploma_degree_in_special_education', header: 'Diploma Degree In Special Education', widthstyle: '5em'},
     { field: 'Pursuing_professional_course', header: 'Pursuing Professional Course', widthstyle: '5em'},
     { field: 'Total', header: 'Total', widthstyle: '4em' }];
  } 
   this.getproofqualification();
  }
  
  getproofqualification() {
    const distrctID = this.districtId;
    this.teacherservice.getproofqualification(1,this.arrString,distrctID).subscribe((data) => {
      if (data.result.teacher_prof_details.length > 0) {
        this.noDataFound = false;
        this.proofqualification = data.result.teacher_prof_details;
        if(!this.noDataFound){
        this.proofqualification.map(item => {item.total = (Number(item.category) + Number(item.Diploma_or_certificate_in_TT) + Number(item.BElEd) + Number(item.BEd_or_equivalent)+ Number(item.MEd_or_equivalent) + Number(item.Others) + Number(item.None) + Number(item.Diploma_degree_in_special_education)+Number(item.Pursuing_professional_course+Number(item.Total)));
});
this.grandtotal_se = this.proofqualification.map(c => c.Diploma_or_certificate_in_TT === '' ? 0 : Number(c.Diploma_or_certificate_in_TT)).reduce((sum, current) => sum + current);
this.grandtotal_hs = this.proofqualification.map(c => c.BElEd === '' ? 0 : Number(c.BElEd)).reduce((sum, current) => sum + current);
this.grandtotal_gt = this.proofqualification.map(c => c.BEd_or_equivalent === '' ? 0 : Number(c.BEd_or_equivalent)).reduce((sum, current) => sum + current);
this.grandtotal_pg = this.proofqualification.map(c => c.MEd_or_equivalent === '' ? 0 : Number(c.MEd_or_equivalent)).reduce((sum, current) => sum + current);
this.grandtotal_mp = this.proofqualification.map(c => c.Others === '' ? 0 : Number(c.Others)).reduce((sum, current) => sum + current);
this.grandtotal_phd = this.proofqualification.map(c => c.None === '' ? 0 : Number(c.None)).reduce((sum, current) => sum + current);
this.grandtotal_pt= this.proofqualification.map(c => c.Diploma_degree_in_special_education === '' ? 0 : Number(c.Diploma_degree_in_special_education)).reduce((sum, current) => sum + current);
this.grandtotal_ptcourse= this.proofqualification.map(c => c.Pursuing_professional_course === '' ? 0 : Number(c.Pursuing_professional_course)).reduce((sum, current) => sum + current);
this.grandtotal_tot = this.proofqualification.map(c => c.Total === '' ? 0 : Number(c.Total)).reduce((sum, current) => sum + current);

}
      }
      else{
        this.noDataFound = true;

      }
    });
}
nature_of_post(event)
  {
    debugger;
    this.appoint_nature_get_value = event.value;
  }
  school_type_val(event)
  {
    debugger;
    this.school_type_get_val = event.value;
  }
  SearchData()
  {
    debugger;
    this.teacherservice.getproofqualification(this.appoint_nature_get_value,this.school_type_get_val,this.districtId).subscribe((data) => {
      if (data.result.teacher_prof_details.length > 0) {
        this.proofqualification = data.result.teacher_prof_details;
        this.proofqualification.map(item => {item.total = (Number(item.category) + Number(item.Diploma_or_certificate_in_TT) + Number(item.BElEd) + Number(item.BEd_or_equivalent)+ Number(item.MEd_or_equivalent) + Number(item.Others) + Number(item.None) + Number(item.Diploma_degree_in_special_education)+Number(item.Pursuing_professional_course+Number(item.Total)));
});
this.grandtotal_se = this.proofqualification.map(c => c.Diploma_or_certificate_in_TT === '' ? 0 : Number(c.Diploma_or_certificate_in_TT)).reduce((sum, current) => sum + current);
this.grandtotal_hs = this.proofqualification.map(c => c.BElEd === '' ? 0 : Number(c.BElEd)).reduce((sum, current) => sum + current);
this.grandtotal_gt = this.proofqualification.map(c => c.BEd_or_equivalent === '' ? 0 : Number(c.BEd_or_equivalent)).reduce((sum, current) => sum + current);
this.grandtotal_pg = this.proofqualification.map(c => c.MEd_or_equivalent === '' ? 0 : Number(c.MEd_or_equivalent)).reduce((sum, current) => sum + current);
this.grandtotal_mp = this.proofqualification.map(c => c.Others === '' ? 0 : Number(c.Others)).reduce((sum, current) => sum + current);
this.grandtotal_phd = this.proofqualification.map(c => c.None === '' ? 0 : Number(c.None)).reduce((sum, current) => sum + current);
this.grandtotal_pt= this.proofqualification.map(c => c.Diploma_degree_in_special_education === '' ? 0 : Number(c.Diploma_degree_in_special_education)).reduce((sum, current) => sum + current);
this.grandtotal_ptcourse= this.proofqualification.map(c => c.Pursuing_professional_course === '' ? 0 : Number(c.Pursuing_professional_course)).reduce((sum, current) => sum + current);
this.grandtotal_tot = this.proofqualification.map(c => c.Total === '' ? 0 : Number(c.Total)).reduce((sum, current) => sum + current);
}
    });
  }
  getTeacherAcdamic(){
    this.exportExcelData = [];
    this.proofqualification.map(item => {
      return {
        'Category': item.category,
        'Diplomo Or Certificate in It': item.Diploma_or_certificate_in_TT,
        'BElED': item.BElED,
        'BEd or equivalent': item.BEd_or_equivalent,
        'MEd or equivalent': item.MEd_or_equivalent,
        'Others': item.Others,
        'None': item.None,
        ' Diploma Degree In Special Education': item.Diploma_degree_in_special_education,
        'Pursuing Professional Course': item.Pursuing_professional_course,
        'Total': item.Total,


        
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let teacherreportacademic = [];
         for(let acdamicreport of this.exportExcelData) {
          teacherreportacademic.push(acdamicreport);
         }
         return teacherreportacademic;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getTeacherAcdamic());
        const workbook = { Sheets: { 'Teacher Professional Reporrt' : worksheet }, SheetNames: ['Teacher Professional Reporrt'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.districtId +' (Teacher Professional Reporrt) ');
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

