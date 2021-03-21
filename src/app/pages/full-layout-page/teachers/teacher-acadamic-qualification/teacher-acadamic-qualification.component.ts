import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../teacher.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-teacher-acadamic-qualification',
  templateUrl: './teacher-acadamic-qualification.component.html',
  styleUrls: ['./teacher-acadamic-qualification.component.css']
})
export class TeacherAcadamicQualificationComponent implements OnInit {

  public dataHeader: any;
  public length: any;
  public data: any;
  schoolCode: string;
  userTypeID: number;
  districtId: any;
  acdamicqualification: any;
  grandtotal_bs: number;
  grandtotal_se: number;
  grandtotal_hs: number;
  grandtotal_gt: number;
  grandtotal_pg: number;
  grandtotal_mp: number;
  grandtotal_phd: number;
  grandtotal_pt: number;
  grandtotal_tot: number;
  appoinment:any;
  school_type: { label: string; value: string; }[];
  arrString: any;
  appoint_nature_get_value: any;
  school_type_get_val: any;
  exportExcelData: any;
  noDataFound: boolean;


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
      { field: 'category', header: 'Category', widthstyle: '7em' },
      {field: 'Below_secondary', header: 'Below Secondary', widthstyle: '5em' },
      { field: 'Secondary', header: 'Secondary', widthstyle: '5em' },
     { field: 'Higher_secondary', header: 'Higher Secondary', widthstyle: '6em' },
     { field: 'Graduate', header: 'Graduate', widthstyle: '4em' },
     { field: 'Post_graduate', header: 'Post Graduate', widthstyle: '4em'},
     { field: 'MPhil', header: 'MPhil', widthstyle: '3em'},
     { field: 'PhD', header: 'PhD', widthstyle: '3em'},
     { field: 'PostDoctoral', header: 'Post Doctoral', widthstyle: '4em'},
     { field: 'Total', header: 'Total', widthstyle: '4em' }];
     
  } 
   this.getverificationstatusmonitoring();
  }
  
  getverificationstatusmonitoring() {
    const distrctID = this.districtId;
    this.teacherservice.getAcdamicqualification(1,this.arrString,distrctID).subscribe((data) => {
      if (data.result.teacher_academy_details.length > 0) {
     this.noDataFound = false;
     this.acdamicqualification = data.result.teacher_academy_details;
     debugger;
        if(!this.noDataFound){
        this.acdamicqualification.map(item => {item.total = (Number(item.Below_secondary) + Number(item.Secondary) + Number(item.Higher_secondary) + Number(item.Graduate)+ Number(item.Post_graduate) + Number(item.MPhil) + Number(item.PhD) + Number(item.PostDoctoral)+Number(item.Total));
});
this.grandtotal_bs = this.acdamicqualification.map(c => c.Below_secondary === '' ? 0 : Number(c.Below_secondary)).reduce((sum, current) => sum + current);
this.grandtotal_se = this.acdamicqualification.map(c => c.Secondary === '' ? 0 : Number(c.Secondary)).reduce((sum, current) => sum + current);
this.grandtotal_hs = this.acdamicqualification.map(c => c.Higher_secondary === '' ? 0 : Number(c.Higher_secondary)).reduce((sum, current) => sum + current);
this.grandtotal_gt = this.acdamicqualification.map(c => c.Graduate === '' ? 0 : Number(c.Graduate)).reduce((sum, current) => sum + current);
this.grandtotal_pg = this.acdamicqualification.map(c => c.Post_graduate === '' ? 0 : Number(c.Post_graduate)).reduce((sum, current) => sum + current);
this.grandtotal_mp = this.acdamicqualification.map(c => c.MPhil === '' ? 0 : Number(c.MPhil)).reduce((sum, current) => sum + current);
this.grandtotal_phd = this.acdamicqualification.map(c => c.PhD === '' ? 0 : Number(c.PhD)).reduce((sum, current) => sum + current);
this.grandtotal_pt= this.acdamicqualification.map(c => c.PostDoctoral === '' ? 0 : Number(c.PostDoctoral)).reduce((sum, current) => sum + current);
this.grandtotal_tot = this.acdamicqualification.map(c => c.Total === '' ? 0 : Number(c.Total)).reduce((sum, current) => sum + current);
        }
}
else {
     this.noDataFound = true;
}
    });
}
nature_of_post(event)
  {
    this.appoint_nature_get_value = event.value;

    
  }
  school_type_val(event)
  {
    this.school_type_get_val = event.value;
  }
  SearchData()
  {
    debugger;
    this.teacherservice.getAcdamicqualification(this.appoint_nature_get_value,this.school_type_get_val,this.districtId).subscribe((data) => {
      if (data.result.teacher_academy_details.length > 0) {
        this.acdamicqualification = data.result.teacher_academy_details;
        this.acdamicqualification.map(item => {item.total = (Number(item.Below_secondary) + Number(item.Secondary) + Number(item.Higher_secondary) + Number(item.Graduate)+ Number(item.Post_graduate) + Number(item.MPhil) + Number(item.PhD) + Number(item.PostDoctoral)+Number(item.Total));
});
this.grandtotal_bs = this.acdamicqualification.map(c => c.Below_secondary === '' ? 0 : Number(c.Below_secondary)).reduce((sum, current) => sum + current);
this.grandtotal_se = this.acdamicqualification.map(c => c.Secondary === '' ? 0 : Number(c.Secondary)).reduce((sum, current) => sum + current);
this.grandtotal_hs = this.acdamicqualification.map(c => c.Higher_secondary === '' ? 0 : Number(c.Higher_secondary)).reduce((sum, current) => sum + current);
this.grandtotal_gt = this.acdamicqualification.map(c => c.Graduate === '' ? 0 : Number(c.Graduate)).reduce((sum, current) => sum + current);
this.grandtotal_pg = this.acdamicqualification.map(c => c.Post_graduate === '' ? 0 : Number(c.Post_graduate)).reduce((sum, current) => sum + current);
this.grandtotal_mp = this.acdamicqualification.map(c => c.MPhil === '' ? 0 : Number(c.MPhil)).reduce((sum, current) => sum + current);
this.grandtotal_phd = this.acdamicqualification.map(c => c.PhD === '' ? 0 : Number(c.PhD)).reduce((sum, current) => sum + current);
this.grandtotal_pt= this.acdamicqualification.map(c => c.PostDoctoral === '' ? 0 : Number(c.PostDoctoral)).reduce((sum, current) => sum + current);
this.grandtotal_tot = this.acdamicqualification.map(c => c.Total === '' ? 0 : Number(c.Total)).reduce((sum, current) => sum + current);

}
    });
  }
  getTeacherAcdamic(){
    this.exportExcelData = [];
    this.acdamicqualification.map(item => {
      return {
        'Category': item.category,
        'Below Secondary': item.Below_secondary,
        'Secondary': item.Secondary,
        'Higher Secondary': item.Higher_secondary,
        'Graduate': item.Graduate,
        'Post Graduate': item.Post_graduate,
        'Mphil': item.MPhil,
        ' PHP': item.PhD,
        'PostDoctaral': item.PostDoctoral,
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
        const workbook = { Sheets: { 'Teacher Academic Qualification' : worksheet }, SheetNames: ['Teacher Academic Qualification'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.districtId +' (Teacher Academic Qualification) ');
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

