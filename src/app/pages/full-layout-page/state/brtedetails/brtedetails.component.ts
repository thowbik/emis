import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { UserSessionService } from 'src/services/usersession.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state.service';
import {NavigationService} from 'src/services/navigation.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-brtedetails',
  templateUrl: './brtedetails.component.html',
  styleUrls: ['./brtedetails.component.scss']
})
export class BRTEdetailsComponent implements OnInit {
  public dataHeader: any[] = [];
  public dataHeader2: any[] = [];
  public BrteDistData: any;
  noDataFound: boolean;
  public pageStage: number;
  public noDataFound2 = false;
  public noDataFound3 = false;
  public BrteBlockData: any[] = [];
  public dataHeader3: any[] = [];
  public BrteSchoolData: any[] = [];
  districtNames  : any;
  teacherName : any;
  exportExcelData : any[]=[];
  usertypeid : any;

  constructor(private http: HttpClient, private StateService: StateService, private dataService: DataService,
              private userSessionService: UserSessionService, private navigationService: NavigationService,
              private routers: Router) {
                this.usertypeid = this.userSessionService.userTypeId();
               }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.userId();
    const user_id = this.userSessionService.userTypeId();
   
   
    if (districtId==""  || districtId==null) {
     
      this.getBrteListData();
    }
   else if (districtId!="" &&  user_id!=2 && districtId!=null) {
   
      this.DistResource(districtId);
    }
    else if(blockId!=null)
    {
     
      this.BlockBasedBRTE(blockId);
    }
    this.dataHeader = [{field: 'district_name', header: 'District' },
      { field: 'total_brte', header: 'Total BRTE' },
      { field: 'assigned_brte', header: 'Assigned BRTE' },
      { field: 'Not Assigned BRTE', header: 'Not Assigned BRTE' },
      { field: 'Status', header: 'Status' }];
    // Stage 2
    this.dataHeader2 = [{field: 'block_name', header: 'Block Name', widthstyle: '16em'},
      { field: 'teacher_code', header: 'Teacher Code', widthstyle: '30em'},
      { field: 'teacher_name', header: 'Teacher Name', widthstyle: '20em'},
      { field: 'appointed_subject', header: 'Appointed Subject', widthstyle: '40em' },
      { field: 'school_name', header: 'School/Block', widthstyle: '25em' },
      { field: 'teacher_count', header: 'Assigned Schools', widthstyle: '40em'}];
    // Stage 3
    this.dataHeader3 = [{field: 'block_name', header: 'Block Name' },
      { field: 'udise_code', header: 'UDISE Code' },
      { field: 'school_name', header: 'School Name' }];
  }
  getBrteListData() {
    this.pageStage = 1;
    this.StateService.getBrteList().subscribe((res) => {
      if (res.result.school_timetable_details.length > 0) {
        this.BrteDistData = res.result.school_timetable_details;
        console.log(this.BrteDistData,"data");

      } else {
        this.noDataFound = true;
      }
    });
  }
  BlockResource(DistID,DistrictName) {
    // alert("BLOCKS"+DistID);
    this.pageStage = 2;
    this.districtNames =DistrictName;
    console.log(this.districtNames);
    this.StateService.BlkResTeacher(DistID).subscribe(
        details => {
          const result = details.result.school_timetable_details;
          if (result.length > 0) {
            this.BrteBlockData = result;
          } else {
            this.noDataFound2 = true;
          }
        }
      );
  }
  DistResource(DistID) {
    
    this.pageStage = 2;
    this.districtNames = DistID;
    this.StateService.BlkResTeacher(DistID).subscribe(
        details => {
          const result = details.result.school_timetable_details;
          if (result.length > 0) {
            this.BrteBlockData = result;
          } else {
            this.noDataFound2 = true;
          }
        }
      );
  }
  BlockBasedBRTE(blockId) {
    this.pageStage = 2;
 
    this.StateService.BlkResTeacherDetails(blockId).subscribe(
        details => {
          console.log(details);
          const result = details.result.school_timetable_details;
          if (result.length > 0) {
            this.BrteBlockData = result;
          } else {
            this.noDataFound2 = true;
          }
        }
      );
  }
  brteAssigned(Databrte_id,teacher_name) {
    this.pageStage = 3;
    this.teacherName = teacher_name;
    this.StateService.BlkAssignedData(Databrte_id).subscribe(
      details => {
        const results = details.result.school_timetable_details;
        if (results.length > 0) {
          this.BrteSchoolData = results;
        } else {
          this.noDataFound3 = true;
        }
      }
    );
  }

  goBack()
  { 
    if(this.usertypeid == 5 && this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
    {
    this.pageStage = 1;
    this.districtNames = '';
    this.teacherName= '';
    }
  }
  goBack1 ()
  {
    this.pageStage = 2;
    this.teacherName = '';
  }

  //excel
  getBlockdetails(){
    this.exportExcelData = [];
    this.BrteBlockData .map(item => {
      return {
        'Block Name': item.block_name,
        'Teacher Code': item.teacher_code,
        'Teacher Name': item.teacher_name ,
        'Appointed Subject':item.appointed_subject,
        'School/Block' :item.school_name ,
        'Assigned Schools': item.teacher_count
        } 
         }).forEach(item => this.exportExcelData.push(item));
         let BlockList = [];
         for(let blocklist of this.exportExcelData) {
          BlockList.push(blocklist);
         }
         return BlockList;
   }
  
   exportExcel(){
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getBlockdetails());
      const workbook = { Sheets: { 'BRTE-Block-Details': worksheet }, SheetNames: ['BRTE-Block-Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Blockdetails");
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

  //school
  getSchoolDeatils(){
    this.exportExcelData=[];
   this.BrteSchoolData.map(item =>
      {
        return {
               'Block Name' : item.block_name,
               'Udise code' : item.udise_code,
               'SchoolName' : item.school_name
        }
       }).forEach(item => this.exportExcelData.push(item));
       let SchoolList = [];
       for(let schlist of this.exportExcelData) {
        SchoolList.push(schlist);
       }
       return SchoolList;
 }
  exportExcel1(){
      import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getSchoolDeatils());
        const workbook = { Sheets: { 'BRTE-School-Details': worksheet }, SheetNames: ['BRTE-School-Details'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "BRTE-SCHOOL DETAILS");
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
    })
  }
}
