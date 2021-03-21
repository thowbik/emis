import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-costfree-bicycle-reg',
  templateUrl: './costfree-bicycle-reg.component.html',
  styleUrls: ['./costfree-bicycle-reg.component.css']
})
export class CostfreeBicycleRegComponent implements OnInit {
  public pageStage: number;
  cols: any[] = [];
  cols1: any[] = [];
  cols2: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  sampleSelectedColumn1  : Array<Object> = [];

  exportExcelData: any;
  distrctID: any;
  BlockID: any;
  userTypeId: number;
  datas: any;
  schId: any;
  cycleList: any;
  SchName: any;
  school_name: any;
  sclId: string;
  blkId: any;
  block_id: any;  

  constructor(private registersService: RegistersService,
    private userSessionService: UserSessionService) { 
      this.emis_school_id = this.userSessionService.schoolId();
      this.userTypeId = this.userSessionService.userTypeId();
      this.blkId = this.userSessionService.userId();
    }

  ngOnInit() {
  
    this.headerData1();
    if (this.userTypeId == 3 || this.userTypeId == 9  ) {
      this.getData();

    }
    else if (this.userTypeId == 2 || this.userTypeId == 6  ) {
      this.getDatas();
    }
    else{
      this.viewStudentsListofSchool();
    }
  }

  headerData1()
  {
    this.cols1 =[
      { field: 'EmisID', header: 'EMIS ID'  },
      { field: 'StudName', header: 'Student Name' },
      { field: 'StuGnd', header: 'Student Gender' },
      { field: 'StudCls', header: 'Class'},
      { field: 'ClsSec', header: 'Section'},
    ];
    this.sampleSelectedColumn1 =  this.cols1;

    this.cols2 =[
      { field: 'UdiseCd', header: 'Udise code'  },
      { field: 'SchName', header: 'School Name' },
      { field: 'SchType', header: 'School Type' },
      { field: 'C11Str', header: 'Total Students'},
      { field: 'Updtd', header: 'Updated'}
    ];
    this.sampleSelectedColumn =  this.cols2;
  }
  
  getData() {
    debugger
    this.pageStage = 1;
    this.distrctID = this.userSessionService.districtId();
    this.sclId ="0";
    this.blkId ="0";
    this.registersService.getCostFreeBicycleDetails(this.sclId,this.distrctID,this.blkId ).subscribe((res) => {
      if (res) {
        this.datas = res;
      }
    });
  }
  getDatas() {
    debugger
    this.pageStage = 1;
    this.BlockID = this.userSessionService.blockId();
    this.sclId ="0";
    this.distrctID ="0";
    this.registersService.getCostFreeBicycleDetails(this.sclId,this.distrctID,this.blkId ).subscribe((res) => {
      if (res) {
        this.datas = res;
      }
    });
  }

  viewStudentsListofSchool(){
    this.pageStage = 2;  
    this.distrctID = this.userSessionService.districtId();
    this.BlockID = this.userSessionService.blockId();
    this.registersService.getCostFreeBicycleDetails(this.emis_school_id,0,0).subscribe((res) =>{
      this.cycleList= res;
    });
  }
  viewStudentsList(school_id,school_name){
    this.pageStage = 2;
    this.schId = school_id;
    this.school_name = school_name; 
    this.distrctID = this.userSessionService.districtId();
    this.BlockID = this.userSessionService.blockId();
    this.registersService.getCostFreeBicycleDetails(this.schId,0,0).subscribe((res) =>{
      this.cycleList= res;
    });
  }
  goBack(){
    this.pageStage = 1;
  }
  getCostFreeBicycleDetails(){
    this.exportExcelData = [];
    this.datas.map(item => {
      return {
        'Udise Code': item.UdiseCd,
        'School Name': item.SchName,
        'School Type': item.SchType,
        'Total Students': item.C11Str,
        'Updated': item.Updtd,
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let bicycle = [];
         for(let costfreebicycle of this.exportExcelData) {
          bicycle.push(costfreebicycle);
         }
         return bicycle;
   }

   getCostFreeBicycleDetailsofSchool(){
    this.exportExcelData = [];
    this.cycleList.map(item => {
      return {
        'EMIS ID': item.EmisID,
        'Student Name': item.StudName,
        'Student Gender': item.StuGnd,
        'Class': item.StudCls,
        'Section': item.ClsSec,
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let bicycle = [];
         for(let costfreebicycle of this.exportExcelData) {
          bicycle.push(costfreebicycle);
         }
         return bicycle;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCostFreeBicycleDetails());
        const workbook = { Sheets: { 'Cost Free bicycle' : worksheet }, SheetNames: ['Cost Free bicycle'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'Cost Free bicycle School List');
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

  exportExcels() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCostFreeBicycleDetailsofSchool());
        const workbook = { Sheets: { 'Cost Free bicycle' : worksheet }, SheetNames: ['Cost Free bicycle'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'Cost Free bicycle Student List');
    });
  }
  
  saveAsExcelFiles(buffer: any, fileName: string): void {
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