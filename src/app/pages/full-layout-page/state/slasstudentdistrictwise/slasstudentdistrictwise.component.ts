import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { UserSessionService } from 'src/services/usersession.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state.service';
import {NavigationService} from 'src/services/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slasstudentdistrictwise',
  templateUrl: './slasstudentdistrictwise.component.html',
  styleUrls: ['./slasstudentdistrictwise.component.scss']
})
export class SlasstudentdistrictwiseComponent implements OnInit {
  stud_dist: any;
  public studdist : any; 
  studdistDetail: any;
  schliststudDetail: any;
  schliststud: any;
  stud_block: any;
  stud_school: any;
  public noDataFound : number;
  public pageStage : number;
  districtName: any;
  blkname: any;
  total: any;
  distp0: any;
  distp1: any;
  distp2: any;
  distp3: any;
  distp4: any;
  blkp0: any;
  blkp1: any;
  blkp2: any;
  blkp3: any;
  blkp4: any;
  sclp0: any;
  sclp1: any;
  sclp2: any;
  sclp3: any;
  sclp4: any;
  page: any;
  routeData: any;
  exportExcelData : any;
  dataHeader: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: '0 Marks', header: '0 Marks' , widthstyle: ''},{ field: '1-3 Marks', header: '1-3 Marks ', widthstyle: ''},{ field: '4-6 Marks', header: '4-6 Marks ' , widthstyle: ''},{ field: '7-9 Marks', header: '7-9 Marks ' , widthstyle: ''},{ field: '9-12 Marks', header: '9-12 Marks ' , widthstyle: ''}];
  subdataHeader: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: 'district_name', header: 'District' , widthstyle: '15em'},{ field: 'total', header: 'Total Student', widthstyle: '22em'},{ field: 'p0', header: '# ' , widthstyle: '18em'},{ field: 'Per0', header: '% ' , widthstyle: '18em'},{ field: 'Per1', header: '# ' , widthstyle: '18em'},{ field: 'Per2', header: '% ' , widthstyle: '18em'},{ field: 'Per3', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: ''},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'}];
  dataHeader1: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: '0 Marks', header: '0 Marks' , widthstyle: ''},{ field: '1-3 Marks', header: '1-3 Marks ', widthstyle: ''},{ field: '4-6 Marks', header: '4-6 Marks ' , widthstyle: ''},{ field: '7-9 Marks', header: '7-9 Marks ' , widthstyle: ''},{ field: '9-12 Marks', header: '9-12 Marks ' , widthstyle: ''}];
  subdataHeader1: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: 'block_name', header: 'Block' , widthstyle: '15em'},{ field: 'total', header: 'Total Student', widthstyle: '22em'},{ field: 'p0', header: '# ' , widthstyle: '18em'},{ field: 'Per0', header: '% ' , widthstyle: '18em'},{ field: 'Per1', header: '# ' , widthstyle: '18em'},{ field: 'Per2', header: '% ' , widthstyle: '18em'},{ field: 'Per3', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: ''},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'}];
  dataHeader2: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: '0 Marks', header: '0 Marks' , widthstyle: ''},{ field: '1-3 Marks', header: '1-3 Marks ', widthstyle: ''},{ field: '4-6 Marks', header: '4-6 Marks ' , widthstyle: ''},{ field: '7-9 Marks', header: '7-9 Marks ' , widthstyle: ''},{ field: '9-12 Marks', header: '9-12 Marks ' , widthstyle: ''}];
  subdataHeader2: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: 'school_name', header: 'School' , widthstyle: '15em'},{ field: 'total', header: 'Total Student', widthstyle: '22em'},{ field: 'p0', header: '# ' , widthstyle: '18em'},{ field: 'Per0', header: '% ' , widthstyle: '18em'},{ field: 'Per1', header: '# ' , widthstyle: '18em'},{ field: 'Per2', header: '% ' , widthstyle: '18em'},{ field: 'Per3', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: ''},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'}];
  districtId: any;
  districtname: any;

  constructor(private http: HttpClient,private StateService:StateService,
    private dataService: DataService, private userSessionService: UserSessionService, 
    private route: ActivatedRoute,
    private navigationService:NavigationService, private routers : Router) { 
      this.routeData = this.route.snapshot.params;
      this.page = this.routeData.page;
      console.log('hiii'+this.page)
      this.districtId = this.userSessionService.districtId();
      this.districtname = this.userSessionService.districtName();
  }

  ngOnInit() {
    debugger
    // const districtId = this.userSessionService.districtId();
    // const blockId = this.userSessionService.blockId();
    // if(!districtId || !blockId){
    //   this.apilistdistrict();
    // }
    // if(districtId){
    //   this.distwisestudetrep(districtId)
    // }
    // if(blockId){
    //   this.studschool(blockId)
    // }
   
    if(!this.districtId){
    this.apilistdistrict();
    }
    if(this.districtId){
      this.distwisestudetrep(this.districtId, this.districtname)
    }
  }
   
    // Districtwise
  apilistdistrict() {   
    this.StateService.districtdatastudent().subscribe((res) => {
      this.pageStage = 1;
      if(res.osclist.student_migration_details.length>0){
        this.stud_dist=res.osclist.student_migration_details;    
        this.total = this.stud_dist.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
        this.distp0 = this.stud_dist.map(c => c.p0 === '' ? 0 : Number(c.p0)).reduce((sum, current) => sum + current);
        this.distp1 = this.stud_dist.map(c => c.p1 === '' ? 0 : Number(c.p1)).reduce((sum, current) => sum + current);
        this.distp2 = this.stud_dist.map(c => c.p2 === '' ? 0 : Number(c.p2)).reduce((sum, current) => sum + current);
        this.distp3 = this.stud_dist.map(c => c.p3 === '' ? 0 : Number(c.p3)).reduce((sum, current) => sum + current);
        this.distp4 = this.stud_dist.map(c => c.p4 === '' ? 0 : Number(c.p4)).reduce((sum, current) => sum + current);
        
      }
      else
      {
        this.noDataFound = 1;
      }
    });
  }
// blockwise
  distwisestudetrep(distid,distname){
    this.districtName =distname;
    this.pageStage = 2;
    this.StateService.blkwisestudent(distid).subscribe(
      details => {
        if(details.osclist.student_migration_details.length>0)
        {
          this.studdistDetail = details.osclist.student_migration_details
          this.total = this.studdistDetail.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
          this.blkp0 = this.studdistDetail.map(c => c.p0 === '' ? 0 : Number(c.p0)).reduce((sum, current) => sum + current);
          this.blkp1 = this.studdistDetail.map(c => c.p1 === '' ? 0 : Number(c.p1)).reduce((sum, current) => sum + current);
          this.blkp2 = this.studdistDetail.map(c => c.p2 === '' ? 0 : Number(c.p2)).reduce((sum, current) => sum + current);
          this.blkp3 = this.studdistDetail.map(c => c.p3 === '' ? 0 : Number(c.p3)).reduce((sum, current) => sum + current);
          this.blkp4 = this.studdistDetail.map(c => c.p4 === '' ? 0 : Number(c.p4)).reduce((sum, current) => sum + current);
        }
        else 
        {
          this.noDataFound = 2 ;
        }
      }
    ) 
   }

  //  schoolwise
  studschool(blkid,blname){
    this.blkname = blname;
    this.pageStage = 3;
    this.StateService.schlwisestudent(blkid).subscribe(
      schlblk => {
        if(schlblk.osclist.student_migration_details.length>0)
        {
          this.schliststudDetail = schlblk.osclist.student_migration_details
          this.total = this.schliststudDetail.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
          this.sclp0 = this.schliststudDetail.map(c => c.p0 === '' ? 0 : Number(c.p0)).reduce((sum, current) => sum + current);
          this.sclp1 = this.schliststudDetail.map(c => c.p1 === '' ? 0 : Number(c.p1)).reduce((sum, current) => sum + current);
          this.sclp2 = this.schliststudDetail.map(c => c.p2 === '' ? 0 : Number(c.p2)).reduce((sum, current) => sum + current);
          this.sclp3 = this.schliststudDetail.map(c => c.p3 === '' ? 0 : Number(c.p3)).reduce((sum, current) => sum + current);
          this.sclp4 = this.schliststudDetail.map(c => c.p4 === '' ? 0 : Number(c.p4)).reduce((sum, current) => sum + current);
        
        }
        else
        {
          this.noDataFound = 3;
        }
        
      }
    ) 
  }

  goBack() {
    this.pageStage = 1;
    this.districtName = '';
    this.blkname = '';
  }
  goBackBlock() {
    this.pageStage = 2;
    this.blkname = '';
  }

  //excel
  getDistrictdetails(){
    this.exportExcelData = [];
    this.stud_dist .map(item => {
      return {
        'District Name': item.district_name,
        'Total Students': item.total,
        '0-Marks-#': item.p0 ,
        '0-Marks-%':item.per0,
        '1 to 3 -Marks-#' :item.p1 ,
        '1 to 3-Marks-%': item.per1,
        '4 to 6-Marks-#': item.p2 ,
        '4 to 6 -Marks-%':item.per2,
        '7 to 9-Marks-#' :item.p3 ,
        '7 to 9-Marks-%': item.per3,
        '9 to 12-Marks-#': item.p4 ,
        '9 to 12-Marks-%':item.per4,
      
        } 
         }).forEach(item => this.exportExcelData.push(item));
         let DistList = [];
         for(let blocklist of this.exportExcelData) {
          DistList.push(blocklist);
         }
         return DistList;
   }
  
   exportExcel(){
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getDistrictdetails());
      const workbook = { Sheets: { 'SLAS2019-District-Details': worksheet }, SheetNames: ['SLAS2019-District-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "SLAS2019 District REPORT");
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
//block
  getBlockdetails(){
    this.exportExcelData = [];
    this.studdistDetail .map(item => {
      return {
        'Block Name': item.block_name,
        'Total Students': item.total,
        '0-Marks-#': item.p0 ,
        '0-Marks-%':item.per0,
        '1 to 3 -Marks-#' :item.p1 ,
        '1 to 3-Marks-%': item.per1,
        '4 to 6-Marks-#': item.p2 ,
        '4 to 6 -Marks-%':item.per2,
        '7 to 9-Marks-#' :item.p3 ,
        '7 to 9-Marks-%': item.per3,
        '9 to 12-Marks-#': item.p4 ,
        '9 to 12-Marks-%':item.per4,
      
        } 
         }).forEach(item => this.exportExcelData.push(item));
         let BlockList = [];
         for(let blocklist of this.exportExcelData) {
          BlockList.push(blocklist);
         }
         return BlockList;
   }
  
   exportExcelBlk(){
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getBlockdetails());
      const workbook = { Sheets: { 'SLAS2019-Block-Details': worksheet }, SheetNames: ['SLAS2019-Block-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "SLAS2019 BLOCKREPORT");
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

  //school

  getSchldetails(){
    this.exportExcelData = [];
    this.schliststudDetail .map(item => {
      return {
        'Block Name': item.school_name,
        'Total Students': item.total,
        '0-Marks-#': item.p0 ,
        '0-Marks-%':item.per0,
        '1 to 3 -Marks-#' :item.p1 ,
        '1 to 3-Marks-%': item.per1,
        '4 to 6-Marks-#': item.p2 ,
        '4 to 6 -Marks-%':item.per2,
        '7 to 9-Marks-#' :item.p3 ,
        '7 to 9-Marks-%': item.per3,
        '9 to 12-Marks-#': item.p4 ,
        '9 to 12-Marks-%':item.per4,
      
        } 
         }).forEach(item => this.exportExcelData.push(item));
         let BlockList = [];
         for(let blocklist of this.exportExcelData) {
          BlockList.push(blocklist);
         }
         return BlockList;
   }
  
   exportExcelSchl(){
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getSchldetails());
      const workbook = { Sheets: { 'SLAS2019-School-Details': worksheet }, SheetNames: ['SLAS2019-School-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "SLAS2019 School Report");
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
