import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-aadhar',
  templateUrl: './aadhar.component.html',
  styleUrls: ['./aadhar.component.scss']
})
export class AadharComponent implements OnInit {
  public aadharListDataDistrict: any[] = [];
  public aadharListDataBlock: any[] = [];
  public aadharListDataSchool: any[] = [];
  public noDataFound: number;
  public pageStage: number;
  usertypeId: any;
  blockId: any;
  districtName: any;
  Schoolname: any;
  Aadharin: any;
  NonAadharin: any;
  total: any;
  AadharinBlk: any;
  NonAadharinBlk: any;
  totalBlk: any;
  exportExcelData : any[]=[];


  dataHeader: Array<{ 'field': string, 'header': string, 'widthstyle': string }> = [{ field: 'district_name', header: 'District Name', widthstyle: '18em' }, { field: 'student_aadhar', header: 'Students With Valid Aadhar ', widthstyle: '18em' }, { field: 'valid_aadhar', header: 'Students With Invalid Aadhar / WithOut Aadhar ', widthstyle: '' }, { field: 'totalstudent', header: 'Total', widthstyle: '' }];
  dataHeader2: Array<{ 'field': string, 'header': string, 'widthstyle': string }> = [{ field: 'block_name', header: 'Block', widthstyle: '15em' }, { field: 'udise_code', header: 'UDISE Code', widthstyle: '10em' }, { field: 'school_type', header: 'School Type', widthstyle: '10em' }, { field: 'school_name', header: 'School Name', widthstyle: '20em' }, { field: 'Stu_With_aadhar ', header: 'Students With Aadhar ', widthstyle: '8em' }, { field: 'Stu_Without_aadhar ', header: 'Students WithOut Aadhar', widthstyle: '8em' }, { field: 'totalstudent', header: 'Total', widthstyle: '' }];
  dataHeader3: Array<{ 'field': string, 'header': string, 'widthstyle': string }> = [{ field: 'unique_id_no', header: 'EMIS No', widthstyle: '12em' }, { field: 'name', header: 'Name', widthstyle: '' }, { field: 'gender', header: 'Gender', widthstyle: '' }, { field: 'dob', header: 'DOB', widthstyle: '' }, { field: 'class', header: 'Class', widthstyle: '' }, { field: 'section', header: 'Section', widthstyle: '' }];
  districtId: any;
  districtname: any;
  blockid: any;

  constructor(private stateService: StateService, private router: Router, private userSessionService: UserSessionService) {
    this.usertypeId = this.userSessionService.userTypeId();
    this.blockId = this.userSessionService.userId();
    this.districtId = this.userSessionService.districtId();
    this.districtname = this.userSessionService.districtName();
    this.blockid = this.userSessionService.blockId();
    
  }

  ngOnInit() {

    if (!this.districtId) {
      this.getAadharDataDisctWise();
    } 
    else {
      this.getAadharDataBlockWise(this.districtId, this.districtname)
    }

    if (this.usertypeId == 2) {
      this.pageStage = 2;
      this.stateService.getBlockAadharDetails(this.blockId).subscribe(
        details => {
          let result = details.result.aadhar_school_details;
          if (result.length > 0) {
            this.aadharListDataBlock = result;
            console.log(this.aadharListDataBlock);
          }
          else {
            this.noDataFound = 2;
          }
        }
      );
    }
  }

  getAadharDataDisctWise() {
    debugger
    this.stateService.getAadharList(true).subscribe(data => {
      this.pageStage = 1;
      let result = data.result.dist_aadhar_details;
      if (result.length > 0) {
        this.aadharListDataDistrict = result;
        this.aadharListDataDistrict.map(item => { item.nonAadharin = (Number(item.totalstudent) - Number(item.aadharin)); });
        this.Aadharin = this.aadharListDataDistrict.map(c => c.aadharin === '' ? 0 : Number(c.aadharin)).reduce((sum, current) => sum + current);
        this.NonAadharin = this.aadharListDataDistrict.map(c => c.nonAadharin === '' ? 0 : Number(c.nonAadharin)).reduce((sum, current) => sum + current);
        this.total = this.aadharListDataDistrict.map(c => c.totalstudent === '' ? 0 : Number(c.totalstudent)).reduce((sum, current) => sum + current);

      }
      else {
        this.noDataFound = 1;
      }
    });

  }
  getAadharDataBlockWise(id, distname) {
    debugger
    this.pageStage = 2;
    this.districtName = distname;
    this.stateService.getBlockAadharDetails(id).subscribe(
      details => {
        let result = details.result.aadhar_school_details;
        if (result.length > 0) {
          this.aadharListDataBlock = result;
          this.aadharListDataBlock.map(item => { item.nonAadharinBlk = (Number(item.totalstudent) - Number(item.aadharin)); });
          this.AadharinBlk = this.aadharListDataBlock.map(c => c.aadharin === '' ? 0 : Number(c.aadharin)).reduce((sum, current) => sum + current);
          this.NonAadharinBlk = this.aadharListDataBlock.map(c => c.nonAadharinBlk === '' ? 0 : Number(c.nonAadharinBlk)).reduce((sum, current) => sum + current);
          this.totalBlk = this.aadharListDataBlock.map(c => c.totalstudent === '' ? 0 : Number(c.totalstudent)).reduce((sum, current) => sum + current);
        }
        else {
          this.noDataFound = 2;
        }
      }
    );
  }
  getAadharListSchool(id, schoolname) {
    this.pageStage = 3;
    this.Schoolname = schoolname;
    this.stateService.getStudentWithoutAadhar(id).subscribe(
      details => {
        let result = details.result.notinaadhar_schoolbase_details
        if (result.length > 0) {
          this.aadharListDataSchool = result;
        }
        else {
          this.noDataFound = 3;
        }
      }
    );
  }

  goBack() {
    this.pageStage = 1;
    this.districtName = '';
  }
  goBackBlock() {
    this.pageStage = 2;
    this.Schoolname = '';
  }

  //exceldist

  getAAdharDistDetails() {
    
    this.exportExcelData = [];
    this.aadharListDataDistrict.map(i => {
      return {
              'District Name' : i.district_name,
              'Students With AAdhar' : i.Stu_With_aadhar,
            'Students Without AAdhar': i.Stu_Without_aadhar,
            'Total' : i.totalstudent
            }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }  

  exportExcelDist(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getAAdharDistDetails());
        const workbook = { Sheets: { 'AAdhar list': worksheet }, SheetNames: ['AAdhar list'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "AAdharList");
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
  //excel-block

  getAAdharDetails() {
    
    this.exportExcelData = [];
    this.aadharListDataBlock.map(i => {
      return {
              'Block' : i.block_name,
              'UDISE Code' : i.udise_code,
              'SchoolType' : i.school_type,
              'SchoolName.' : i.school_name ,
              'Students With AAdhar' : i.Stu_With_aadhar,
            'Students Without AAdhar': i.Stu_Without_aadhar,
            'Total' : i.totalstudent
            }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }  

  exportExcelBlock(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getAAdharDetails());
        const workbook = { Sheets: { 'AAdhar Blocklist': worksheet }, SheetNames: ['AAdhar Blocklist'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "AAdhar Blocklist");
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

  //ExcelSchool

  getSchlAAdharDetails() {
    
    this.exportExcelData = [];
    this.aadharListDataSchool.map(i => {
      return {
              'EMIS No' : i.unique_id_no,
              'Name' : i.name,
              'Gender': i.gender,
              'DOB' : i.dob,
              'Class.' : i.class ,
              'Section' : i.section
            }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }  

  exportExcelSchool(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getSchlAAdharDetails());
        const workbook = { Sheets: { 'AAdhar Schllist': worksheet }, SheetNames: ['AAdhar Schllist'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "AAdharSchlList");
    });
  }
  saveAsExcelFile2(buffer: any, fileName: string): void {
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
