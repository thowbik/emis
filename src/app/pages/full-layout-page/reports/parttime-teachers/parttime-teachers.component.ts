import { Component, OnInit } from '@angular/core';
import {StateService} from '../../state/state.service';
import {ReportsService} from '../reports.service';
import {UserSessionService} from "../../../../../services/usersession.service";

@Component({
  selector: 'app-parttime-teachers',
  templateUrl: './parttime-teachers.component.html',
  styleUrls: ['./parttime-teachers.component.css']
})
export class ParttimeTeachersComponent implements OnInit {

  districtwise: any[] = [];
  blockwiseDetails: any[] = [];
  public nodateFound = false;
  public nodateFound2 = false;
  public pageStage: number;
  districtId : any;
  user_id : any;
  districtName : any;
  usertypeid : any;

  constructor(private reportsService: ReportsService, private userSessionService: UserSessionService) { 
    this. usertypeid = this.userSessionService.userTypeId();
  }
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'district_name', header: 'District', widthstyle: '38em'},
      { field: 'total', header: 'Part Time Teachers', widthstyle: '37em'},
    ];
  cols2: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [
      { field: 'block_name', header: 'Block Name', widthstyle: '10em'},
      { field: 'udise_code', header: 'UDISE Code', widthstyle: '12em'},
      { field: 'school_name', header: 'School Name' , widthstyle: '7em'},
      { field: 'school_type', header: 'Type', widthstyle: '7em' },
      { field: 'cate_type', header: 'Category', widthstyle: '7em' },
      { field: 'total', header: 'Part Time Teachers', widthstyle: '15em' },
    ];

  ngOnInit() {

    this. districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.userId();
    this. user_id = this.userSessionService.userTypeId();

    if (this.user_id == 5) {
      this.getPartTeachersDetails();
     }
    else {
      this.BlockListPartTec(blockId);
     }
    // if (!this.districtId) {
     
    //   this.getPartTeachersDetails();
    // }

    // else if (districtId!="" && user_id!=2) {
     
    //   this.onSelectedId(districtId);
    // }
    // else if(blockId!=null && this.user_id==2)
    // {
     
    //   this.BlockListPartTec(blockId);
    // }
  }
  getPartTeachersDetails() {
    this.reportsService.getPartTeachersList().subscribe(
      data => {
        this.pageStage = 1;
        if (data.data.length > 0) {
          this.districtwise = data.data;
        } else {
          this.nodateFound = true;
        }
      }
    );
  }
  onSelectedId(distwise,distname) {
    
    if (this.districtId!="" && this.user_id!=2) {
    this.reportsService.getPartTeachersDetails(distwise).subscribe(
      details => {
      
        this.pageStage = 2;
        this.districtName = distname;
        if (details.data.length > 0) {
          this.blockwiseDetails = details.data;

        } else {
          this.nodateFound2 = true;
        }
      }
    );
  }
}
  BlockListPartTec(block)
  {
    this.reportsService.getPartTeachersBlockDetails(block).subscribe(
      details => {
      
        this.pageStage = 2;
        if (details.data.length > 0) {
          this.blockwiseDetails = details.data;
        } else {
          this.nodateFound2 = true;
        }
      }
    );
  }

  goBack()
  {

    if(this.usertypeid == 5 &&  this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
    {
    this.pageStage = 1;
    this.districtName = '';
    this.ngOnInit();
  }
}
  
  //excel

  exportExcel(data)
  {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'Parttime teachers-List': worksheet }, SheetNames: ['Parttime teachers-List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,"Parttime teachers-List");
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
  exportExcelBlk(data)
  {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'Parttime teachers-List': worksheet }, SheetNames: ['Parttime teachers-List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Parttime teachers-List" + this.districtName);
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
  
}
