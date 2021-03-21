import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.scss']
})
export class BuildingDetailsComponent implements OnInit {
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public dataHeader3 : any[] = [];
  public dataHeader4 : any[] = [];
  public pageStage : number;
  public noDataFound : boolean = false
  public noDataFound2 : boolean = false;
  public noDataFound3 : boolean = false;
  public noDataFound4 : boolean = false;
  public buildingDataDisct : any[] = [];
  public buildingDataBlock : any[] = [];
  public buildingDataBlock2 : any[] = [];
  public buildingDataSchool : any[] = [];
  districtName : any;
  BlockName: any;
  SchoolName : any;
  exportExcelData : any[]=[];
  exportExcelData1 : any[]=[];
  exportExcelData2 : any[]=[];
  grandTotal2_kutcha : any;
  grandTotal2_partially_pucca: any;
  grandTotal2_pucca : any;
  grandTotal2_build_block_no : any;
  grandTotal_total_flrs : any;
  grandTotal_tot_classrm_use : any;
  grandTotal_tot_classrm_nouse: any;
  grandTotal_off_room: any;
  grandTotal_lab_room: any;
  grandTotal_library_room: any;
  grandTotal_comp_room : any;
  grandTotal_art_room:any;
  grandTotal_staff_room: any;
  grandTotal_hm_room : any;
  grandTotal_girl_room : any;
  grandTotal_total_room: any;
  districtId: string;
  Exportexcelschool: any;
  usertypeid : any;

  constructor(private stateService:StateService, private routers : Router, private userSessionService: UserSessionService) {
    this.usertypeid = this.userSessionService.userTypeId();
   }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.blockId();
    // Header Row Title
    this.dataHeader = [{field: 'district_name', header: 'District', widthstyle:'12em'},{ field: 'Total School Count', header: 'Total School Count', widthstyle:'8em' }]
    this.dataHeader2 = [{field: 'block_name', header: 'Block', widthstyle:'12em'},{ field: 'Total School Count', header: 'Total School Count', widthstyle:'8em' }]
    this.dataHeader3 = [{field: 'udise_code', header: 'UDISE Code', widthstyle:'12em'},{field: 'school_name', header: 'School Name', widthstyle:'20em' },{field: 'block_name', header: 'Block Name', widthstyle:'16em'},{field: 'Total Block', header: 'Total Block', widthstyle:'12em' },{field: 'Pucca Block', header: 'Pucca Block', widthstyle:'12em'},{field: 'Partially Pucca Block', header: 'Partially Pucca Block', widthstyle:'16em' },{field: 'Kutcha Block', header: 'Kutcha Block', widthstyle:'12em'},{field: 'total', header: 'Total', widthstyle:'7em'}]
    this.dataHeader4 = [{field: 'construct_type', header: 'Construct Type', widthstyle:'12em'},{field: 'total_flrs', header: 'Total Floor', widthstyle:'10em' },{field: 'Total Class Room', header: 'Total Class Room', widthstyle:'15em'},{field: 'Total Class Room Nouse', header: 'Total Class Room Nouse', widthstyle:'20em' },{field: 'Office Room', header: 'Office Room', widthstyle:'12em'},{field: 'Lab Room', header: 'Lab Room', widthstyle:'12em'},{field: 'Library Room', header: 'Library Room', widthstyle:'14em' },{field: 'Computer Room', header: 'Computer Room', widthstyle:'14em'},{field: 'Art Room', header: 'Art Room', widthstyle:'12em'},{field: 'Staff Room', header: 'Staff Room', widthstyle:'12em' },{field: 'HM Room', header: 'HM Room', widthstyle:'12em'},{field: 'Girls Room', header: 'Girls Room', widthstyle:'14em' },{field: 'Total Room', header: 'Total Room', widthstyle:'12em'},{field: 'total', header: 'Total', widthstyle:'7em'}]

    if(!districtId || !blockId){
      this.getBuildingData();
    }
    if(districtId){
      this.getBuildingDetailsBlockWise(districtId,this.districtName)
    }
    if(blockId){
      this.getBuildingDetailsSchoolWise(blockId,this.BlockName)
    }
  }
// Disct Wise
  getBuildingData(){
    this.pageStage = 1;
    let id = '';
    this.stateService.getBuildingDetails(id).subscribe((res) => {
      if(res.schoollist.school_details.length>0){
      this.buildingDataDisct = res.schoollist.school_details;
      }
    else{
      this.noDataFound = true;
    }
    })
  }
  // Block Wise Data
  getBuildingDetailsBlockWise(id,name){
    this.pageStage = 2;
    this.districtName = name;
    let parms = '?grp=BLK&q='+id
    this.stateService.getBuildingDetails(parms).subscribe((res) => {
      const results = res.schoollist.school_details;
      if(results.length>0){
        this.buildingDataBlock = results;
      }
      else
      {
        this.noDataFound2 = true;
      }
    })
  }
  // School Wise Data
  getBuildingDetailsSchoolWise(id,name){
    this.pageStage = 3;
    this.BlockName = name;
    let parms = '?grp=SCH&q='+id
    this.stateService.getBuildingDetails(parms).subscribe((res) => {
      this.buildingDataBlock2 = res.schoollist.school_details;
      const result = res.schoollist.school_details;
      if(result.length>0){
        this.buildingDataBlock2 = result;
        this.grandTotal2_build_block_no = this.buildingDataBlock2.map(c => c.build_block_no === '' ? 0 : Number(c.build_block_no)).reduce((sum, current) => sum + current);
        this.grandTotal2_pucca = this.buildingDataBlock2.map(c => c.pucca === '' ? 0 : Number(c.pucca)).reduce((sum, current) => sum + current);
        this.grandTotal2_partially_pucca = this.buildingDataBlock2.map(c => c.partially_pucca === '' ? 0 : Number(c.partially_pucca)).reduce((sum, current) => sum + current);
        this.grandTotal2_kutcha = this.buildingDataBlock2.map(c => c.kutcha === '' ? 0 : Number(c.kutcha)).reduce((sum, current) => sum + current);
        
      }
      else
      {
        this.noDataFound3 = true;
      }
    })
  }
  // Selected School
  getEachSchoolUDISE(id,name){
    this.pageStage = 4;
    this.SchoolName= name;
    let parms = '?grp=SCH&q='+id
    this.stateService.getBuildingDetails(parms).subscribe((res) => {
      const result = res.schoollist.school_details;
      if(result.length>0){
        this.buildingDataSchool = result;
        console.log(this.buildingDataSchool);
        this.grandTotal_total_flrs = this.buildingDataSchool.map(c => c.total_flrs  === '' ? 0 : Number(c.total_flrs )).reduce((sum, current) => sum + current);
        this.grandTotal_tot_classrm_use = this.buildingDataSchool.map(c => c.tot_classrm_use  === '' ? 0 : Number(c.tot_classrm_use )).reduce((sum, current) => sum + current);
        this.grandTotal_tot_classrm_nouse = this.buildingDataSchool.map(c => c.tot_classrm_nouse  === '' ? 0 : Number(c.tot_classrm_nouse)).reduce((sum, current) => sum + current);
        this.grandTotal_off_room = this.buildingDataSchool.map(c => c.off_room === '' ? 0 : Number(c.off_room)).reduce((sum, current) => sum + current);
        this.grandTotal_lab_room = this.buildingDataSchool.map(c => c.lab_room === '' ? 0 : Number(c.lab_room)).reduce((sum, current) => sum + current);
        this.grandTotal_library_room = this.buildingDataSchool.map(c => c.library_room === '' ? 0 : Number(c.library_room)).reduce((sum, current) => sum + current);
        this.grandTotal_comp_room = this.buildingDataSchool.map(c => c.comp_room === '' ? 0 : Number(c.comp_room)).reduce((sum, current) => sum + current);
        this.grandTotal_art_room = this.buildingDataSchool.map(c => c.art_room === '' ? 0 : Number(c.art_room)).reduce((sum, current) => sum + current);
        this.grandTotal_staff_room = this.buildingDataSchool.map(c => c.staff_room === '' ? 0 : Number(c.staff_room)).reduce((sum, current) => sum + current);
        this.grandTotal_hm_room = this.buildingDataSchool.map(c => c.hm_room  === '' ? 0 : Number(c.hm_room )).reduce((sum, current) => sum + current);
        this.grandTotal_girl_room = this.buildingDataSchool.map(c => c.girl_room  === '' ? 0 : Number(c.girl_room )).reduce((sum, current) => sum + current);
        this.grandTotal_total_room = this.buildingDataSchool.map(c => c.total_room === '' ? 0 : Number(c.total_room)).reduce((sum, current) => sum + current);

        // this.grandTotal_total = this.RTEStudentsListDisct.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);

      }
      else
      {
        this.noDataFound3 = true;
      }
    })
  }

  goBack()
  {  
    if(this.usertypeid == 5 && this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
    {
    this.pageStage = 1;
    this.districtName = '';
    this.BlockName = '';
    this.SchoolName = '';
  }
}
  goBack1()
  {
    this.pageStage = 2;
    this.BlockName = '';
    this.SchoolName = '';
  }
  goBack2()
  {
    this.pageStage = 3;
    this.SchoolName = '';

  }

  //excel

  BlockDetails(){
    this.exportExcelData = [];
    this.buildingDataBlock .map(item => {
      return {
        'Block Name': item.block_name,
        'Total Count': item.totalschools,
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let BlockList = [];
         for(let blocklist of this.exportExcelData) {
          BlockList.push(blocklist);
         }
         return BlockList;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.BlockDetails());
        const workbook = { Sheets: {'Block List' : worksheet }, SheetNames: ['Block List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer,'(Block List)');
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

  // SchoolDetails(){
  Getschoolwisedetails(){
  this.exportExcelData = [];
  this.buildingDataBlock2.map(item => {
    return {
      'UDISE CODE': item.udise_code,
      'School Name': item.school_name,
      'Block Name': item.block_name,
      'Total Block': item.build_block_no,
      'Pucca Block': item.pucca,
      'Partially Pucca Block': item.partially_pucca,
      'Kutcha Block': item.kutcha,
      'Total' : item.result
           }    

       }).forEach(item => this.exportExcelData.push(item));
       let studentlist = [];
       for(let Studentlist of this.exportExcelData) {
        studentlist.push(Studentlist);
       }
       return studentlist;
 }

 Exportexcelschooldetailas() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.Getschoolwisedetails());
      const workbook = { Sheets: { 'Schoolwise List' : worksheet }, SheetNames: ['Schoolwise List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileschool(excelBuffer, this.districtId +' (Schoolwise List) ');
  });
}
saveAsExcelFileschool(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
// Excelbuildingwise
Getschoolwisedetailsdata(){
  this.exportExcelData = [];
  this.buildingDataSchool.map(item => {
    return {
      'Construct Type': item.construct_type,
              'Total Floor': item.total_flrs,
              'Total Class room': item.tot_classrm_use,
              'Total Class room Nouse': item.tot_classrm_nouse,
              'Office Room': item.off_room,
              'Lab Room': item.lab_room,
              'Library Room': item.library_room,
              'Computer Room': item.comp_room,
              'Art Room ': item.art_room,
              'Staff Room': item.staff_room,
              'HM Room': item.hm_room,
              'Girls Room': item.girl_room,
              'Total Room': item.total_room,
           }    

       }).forEach(item => this.exportExcelData.push(item));
       let studentlist = [];
       for(let Studentlist of this.exportExcelData) {
        studentlist.push(Studentlist);
       }
       return studentlist;
 }

 Exportexcelschooldetailasdata() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.Getschoolwisedetailsdata());
      const workbook = { Sheets: { 'Building List' : worksheet }, SheetNames: ['Building List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileschooldata(excelBuffer, this.districtId +' (Building List) ');
  });
}
saveAsExcelFileschooldata(buffer: any, fileName: string): void {
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
