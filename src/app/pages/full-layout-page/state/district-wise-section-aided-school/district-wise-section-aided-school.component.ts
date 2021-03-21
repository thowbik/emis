import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-district-wise-section-aided-school',
  templateUrl: './district-wise-section-aided-school.component.html',
  styleUrls: ['./district-wise-section-aided-school.component.scss']
})
export class DistrictWiseSectionAidedSchoolComponent implements OnInit {
  items: MenuItem[];
    
  home: MenuItem;
  public dataHeader : any ; 
  public district_wise_section_aided_details: any;
  pageStage: number;
  dataHeader2: { field: string; header: string; widthstyle: string; }[];
  block_wise_section_aided_details: any;
  dataHeader3: { field: string; header: string; widthstyle: string; }[];
  school_wise_section_aided_details: any;
  nodateFound: boolean;
  nodateFound2: boolean;
  nodateFound3: boolean;
  districtName : any;
  districtid : any;
  schoolName : any;
  exportExcelData : any;
  usertypeid : any;
  constructor(private stateService : StateService, private routers : Router, private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.getDistricSectionAidedSchoolDetails();
    this.items = [
     
      {label: 'Back To Private Schools'},
     
  ];
  
  this.home = {icon: 'pi pi-home'};
  
    const districtid = this.userSessionService.districtId();
    const blockid = this.userSessionService.blockId();
    this.usertypeid = this.userSessionService.userTypeId();
    const blockname = this.userSessionService.blockName();

    if(districtid=="" || blockid==""){
      this.getDistricSectionAidedSchoolDetails();
    }

    if(districtid!=""){
      this.onSelectedId(districtid,this.districtName)
    }

    if(blockid){
      this.onSelectedSchoolId(blockid,this.schoolName )
    }

    this.dataHeader = [
     // { field: 'sno', header: 'S.NO', widthstyle:'4em' },
      {field: 'district_name', header: 'District Name' ,widthstyle:'13em'},
      { field: 'total_school', header: 'Total School',widthstyle:'11em' },
      { field: 'aided', header: 'Total Aided Section', widthstyle:'15em' },
      { field: 'self_financed', header: 'Total UnAided Section',widthstyle:'18em' },
      { field: 'unmarked', header: 'Not Marked Sections',widthstyle:'15em' },
      { field: 'unmediummarked', header: 'Not Marked Medium',widthstyle:'15em' },
     ];
     this.dataHeader2 = [
    //  { field: 'sno', header: 'S.NO', widthstyle:'4em' },
      { field: 'district_name', header: 'District Name', widthstyle:'13em' },
      { field: 'block_name', header: 'Block Name', widthstyle:'11em'},
      { field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },
      { field: 'school_name', header: 'School Name', widthstyle:'16em' },
      { field: 'school_type', header: 'School Type', widthstyle:'10em' },
      { field: 'aided', header: 'Aided Section', widthstyle:'11em' },
      { field: 'self_finance', header: 'UnAided Section',widthstyle:'13em' },
      { field: 'unmarked', header: 'Not Marked Sections',widthstyle:'15em' },
      { field: 'unmediummarked', header: 'Not Marked Medium',widthstyle:'15em' },
    
    ];
    this.dataHeader3 = [
      //{ field: 'sno', header: 'S.NO', widthstyle:'4em' },
      { field: 'class_id', header: 'Class', widthstyle:'13em' },
      { field: 'section', header: 'Section', widthstyle:'11em'},
      // { field: 'udise_code', header: 'Section Type	', widthstyle:'10em' },
      { field: 'MEDINSTR_DESC', header: 'Medium', widthstyle:'13em' },
      { field: 'student_count', header: 'Student Count', widthstyle:'11em' },
    ];
  }
  // Status()
  // {
  //   this.pageStage = 2;
  // }
  getDistricSectionAidedSchoolDetails(){
    this.stateService.getDistrictWiseSectionAidedDetails().subscribe(
      list=>{
        this.pageStage = 1;
        if(list.result.dist_school_details.length>0) {
          
          this.district_wise_section_aided_details =list.result.dist_school_details;
         console.log(this.district_wise_section_aided_details,"data");
        }
        else
        {
          this.nodateFound = true;
        }
      }
    )
  }
  onSelectedId(districtwise,distname)

  {
    this.districtName = distname;
    if(this.districtid!= '')
   
    this.stateService.getblockwiseWiseSectionAidedDetails(districtwise).subscribe(
      details => {
        this.pageStage = 2;
        if(details.result.school_details.length>0) {
          this.block_wise_section_aided_details = details.result.school_details;
         console.log(this.block_wise_section_aided_details,"data1");
        }
        else
        {
          this.nodateFound2 = true;
        }
          //  this.routers.navigate(['blockwise/section/aided/schools'], details.result.school_details)
      }
    )
  }
  onSelectedSchoolId(schoolid,schoolname)  {

    this.schoolName = schoolname;
     this.stateService.getschoolwiseSectionAidedDetails(schoolid).subscribe(
     details => { 
      this.pageStage = 3;
      if(details.result.school_class_details.length>0) {
        this.school_wise_section_aided_details = details.result.school_class_details;
        console.log(this.school_wise_section_aided_details);
      
      }
      else
      {
        this.nodateFound3 = true;
      }
        //  this.router.navigate(['schoolwise/section/aided/schools'], details.result.school_class_details)
     }
   )
 }

 goBack(){
  if(this.usertypeid == 5 && this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
  {
   this.pageStage = 1;
   this.districtName = '';
   this.schoolName = '';
 }
}
 goBack1(){
   this.pageStage = 2;
   this.schoolName = '';
 }

 //excel
 getExcelDataBlock() {
  this.exportExcelData = [];
  this.block_wise_section_aided_details.map(item => {
    return {
      'Class': item.district_name,
      'Section': item.block_name,
      'Medium': item.udise_code,
      'Student Count': item.school_name,
       }
}).forEach(item => this.exportExcelData.push(item));
  let school = [];
  for(let privateSchl of this.exportExcelData) {
    school.push(privateSchl);
  }
  return school;
}
 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelDataBlock());
      const workbook = { Sheets: { 'Blockwise-Private school' : worksheet }, SheetNames: ['Blockwise-Private school'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' (Blockwise-Private school) ');
  });
}

saveAsExcelFile1(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

//School excel
getExcelDataSchool() {
  this.exportExcelData = [];
  this.school_wise_section_aided_details.map(item => {
    return {
      'Class': item.class_id,
      'Section': item.section,
      'Medium': item.MEDINSTR_DESC,
      'StudentCount': item.student_count,

       }
}).forEach(item => this.exportExcelData.push(item));
  let school = [];
  for(let privateSchl of this.exportExcelData) {
    school.push(privateSchl);
  }
  return school;
}
exportSchlExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelDataSchool());
      const workbook = { Sheets: { 'Schoolwise-Private school' : worksheet }, SheetNames: ['Schoolwise-Private school'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' (Schoolwise-Private school) ');
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
