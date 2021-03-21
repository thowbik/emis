import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-children-with-special-need',
  templateUrl: './children-with-special-need.component.html',
  styleUrls: ['./children-with-special-need.component.scss']
})
export class ChildrenWithSpecialNeedComponent implements OnInit {
  public dataHeader: any;
  childrenDetails: any[] = [];
  public noDataFound: boolean = false;
  public noDataFound2: boolean = false;
  public noDataFound3: boolean = false;
  public pageStage: number;
  public CWSNlistDetail: any = [];
  public dataHeader2: any;
  public dataHeader3: any;
  public CWSNlistDetailSchool: any[] = [];
  districtName: any;
  blkname: any;
  VIB: any;
  VILV: any;
  HI: any;
  SI: any;
  LI: any;
  MR: any;
  LD: any;
  CP: any;
  Aut: any;
  MD: any;
  Mus_dyp: any;
  LC: any;
  Dwar: any;
  ID: any;
  IntDis: any;
  CNC: any;
  MS: any;
  Tha: any;
  Hemo: any;
  SCD: any;
  AAV: any;
  PD: any;
  total: any;

  page: any;
  routeData: any;
  districtid: any;
  districtname: any;
  exportExcelData: any;


  constructor(private stateService: StateService, private route: ActivatedRoute,
    private routers: Router, private userSessionService: UserSessionService, ) {
      this.routeData = this.route.snapshot.params;
    this.page = this.routeData.page;
    console.log('hiii'+this.page)
    this.districtid = this.userSessionService.districtId();
      this.districtName = this.userSessionService.districtName();
     }

  ngOnInit() {
    debugger
    const districtName = this.userSessionService.districtName();
    const blockName = this.userSessionService.blockName();
    if (!districtName || !blockName) {
      this.getChildrenSpecialNeed();
    }
    if (districtName) {
      this.selectedCWSN(districtName)
    }
    if (blockName) {
      this.selectedCWSNBlock(blockName)
    }
    this.dataHeader = [{ field: 'district_name', header: 'District', widthstyle: '14em' }, { field: 'VI(B)', header: 'VI(B)', widthstyle: '8em' }, { field: 'VI(LV)', header: 'VI(LV)', widthstyle: '8em' }, { field: 'HI', header: 'HI', widthstyle: '8em' }, { field: 'SI', header: 'SI', widthstyle: '8em' }, { field: 'LI', header: 'LI', widthstyle: '8em' }, { field: 'MR', header: 'MR', widthstyle: '8em' }, { field: 'SLD', header: 'SLD', widthstyle: '8em' }, { field: 'CP', header: 'CP', widthstyle: '8em' }, { field: 'Aut', header: 'Aut', widthstyle: '8em' }, { field: 'MD', header: 'MD', widthstyle: '8em' }, { field: 'Mus_dyp', header: 'Mus_dyp', widthstyle: '10em' }, { field: 'LC', header: 'LC', widthstyle: '8em' }, { field: 'DWAR', header: 'DWAR', widthstyle: '8em' }, 
    { field: 'IntDis', header: 'ID', widthstyle: '8em' }, 
    { field: 'CNC', header: 'CNC', widthstyle: '8em' }, { field: 'MS', header: 'MS', widthstyle: '8em' }, { field: 'Tha', header: 'Tha', widthstyle: '8em' }, { field: 'Hemo', header: 'Hemo', widthstyle: '8em' }, { field: 'SCD', header: 'SCD', widthstyle: '8em' }, { field: 'AAV', header: 'AAV', widthstyle: '8em' }, { field: 'PD', header: 'PD', widthstyle: '8em' }, { field: 'Total', header: 'Total', widthstyle: '8em' }];
    // Stage 2
    this.dataHeader2 = [{ field: 'block_name', header: 'Block', widthstyle: '14em' },
    { field: 'VIB', header: 'VI(B)', widthstyle: '8em' },
    { field: 'VILV', header: 'VI(LV)', widthstyle: '8em' },
    { field: 'HI', header: 'HI', widthstyle: '8em' },
    { field: 'SI', header: 'SI', widthstyle: '8em' },
    { field: 'LI', header: 'LI', widthstyle: '8em' },
    { field: 'MR', header: 'MR', widthstyle: '8em' },
    { field: 'LD', header: 'SLD', widthstyle: '8em' },
    { field: 'CP', header: 'CP', widthstyle: '8em' },
    { field: 'Aut', header: 'Aut', widthstyle: '8em' },
    { field: 'MD', header: 'MD', widthstyle: '8em' },
    { field: 'Mus_dyp', header: 'Mus_dyp', widthstyle: '10em' },
    { field: 'LC', header: 'LC', widthstyle: '8em' },
    { field: 'DWAR', header: 'DWAR', widthstyle: '8em' },
    { field: 'ID', header: 'ID', widthstyle: '8em' },
    { field: 'CNC', header: 'CNC', widthstyle: '8em' },
    { field: 'MS', header: 'MS', widthstyle: '8em' },
    { field: 'Tha', header: 'Tha', widthstyle: '8em' },
    { field: 'Hemo', header: 'Hemo', widthstyle: '8em' },
    { field: 'SCD', header: 'SCD', widthstyle: '8em' },
    { field: 'AAV', header: 'AAV', widthstyle: '8em' },
    { field: 'PD', header: 'PD', widthstyle: '8em' },
    { field: 'Total', header: 'Total', widthstyle: '8em' }];
    // Stage 3
    this.dataHeader3 = [{ field: 'udise_code', header: 'UDISE Code', widthstyle: '12em' },
    { field: 'school_name', header: 'School', widthstyle: '20em' },
    { field: 'school_type', header: 'School Type', widthstyle: '12em' },
    { field: 'VI(B)', header: 'VI(B)', widthstyle: '8em' },
    { field: 'VI(LV)', header: 'VI(LV)', widthstyle: '8em' },
    { field: 'HI', header: 'HI', widthstyle: '8em' },
    { field: 'SI', header: 'SI', widthstyle: '8em' },
    { field: 'LI', header: 'LI', widthstyle: '8em' },
    { field: 'MR', header: 'MR', widthstyle: '8em' },
    { field: 'SLD', header: 'SLD', widthstyle: '8em' },
    { field: 'CP', header: 'CP', widthstyle: '8em' },
    { field: 'Aut', header: 'Aut', widthstyle: '8em' },
    { field: 'MD', header: 'MD', widthstyle: '8em' },
    { field: 'Mus_dyp', header: 'Mus_dyp', widthstyle: '8em' },
    { field: 'LC', header: 'LC', widthstyle: '8em' },
    { field: 'DWAR', header: 'DWAR', widthstyle: '8em' },
    { field: 'ID', header: 'ID', widthstyle: '8em' },
    { field: 'CNC', header: 'CNC', widthstyle: '8em' },
    { field: 'MS', header: 'MS', widthstyle: '8em' },
    { field: 'Tha', header: 'Tha', widthstyle: '8em' },
    { field: 'Hemo', header: 'Hemo', widthstyle: '8em' },
    { field: 'SCD', header: 'SCD', widthstyle: '8em' },
    { field: 'AAV', header: 'AAV', widthstyle: '8em' },
    { field: 'PD', header: 'PD', widthstyle: '8em' }, {
      field: 'Total', header: 'Total', widthstyle: '8em'
    }];
  }
  getChildrenSpecialNeed() {
    this.pageStage = 1;
    this.stateService.getChildrenSpecialNeedData().subscribe(
      data => {
        if (data.result.allstuds.length > 0) {
          this.childrenDetails = data.result.allstuds;
          this.childrenDetails.map(item => {
            item.total = (
              Number(item.VIB) +
              Number(item.VILV) +
              Number(item.HI) +
              Number(item.SI) +
              Number(item.LI) +
              Number(item.MR) +
              Number(item.LD) +
              Number(item.CP) +
              Number(item.Aut) +
              Number(item.MD) +
              Number(item.Mus_dyp) +
              Number(item.LC) +
              Number(item.Dwar) +
              Number(item.CNC) +
              Number(item.MS) +
              Number(item.Tha) +
              Number(item.Hemo) +
              Number(item.SCD) +
              Number(item.AAV) +
              Number(item.PD)
            );
          });

          this.VIB = this.childrenDetails.map(c => c.VIB === '' ? 0 : Number(c.VIB)).reduce((sum, current) => sum + current);
          this.VILV = this.childrenDetails.map(c => c.VILV === '' ? 0 : Number(c.VILV)).reduce((sum, current) => sum + current);
          this.HI = this.childrenDetails.map(c => c.HI === '' ? 0 : Number(c.HI)).reduce((sum, current) => sum + current);
          this.SI = this.childrenDetails.map(c => c.SI === '' ? 0 : Number(c.SI)).reduce((sum, current) => sum + current);
          this.LI = this.childrenDetails.map(c => c.LI === '' ? 0 : Number(c.LI)).reduce((sum, current) => sum + current);
          this.MR = this.childrenDetails.map(c => c.MR === '' ? 0 : Number(c.MR)).reduce((sum, current) => sum + current);
          this.LD = this.childrenDetails.map(c => c.LD === '' ? 0 : Number(c.LD)).reduce((sum, current) => sum + current);
          this.CP = this.childrenDetails.map(c => c.CP === '' ? 0 : Number(c.CP)).reduce((sum, current) => sum + current);
          this.Aut = this.childrenDetails.map(c => c.Aut === '' ? 0 : Number(c.Aut)).reduce((sum, current) => sum + current);
          this.MD = this.childrenDetails.map(c => c.MD === '' ? 0 : Number(c.MD)).reduce((sum, current) => sum + current);
          this.Mus_dyp = this.childrenDetails.map(c => c.Mus_dyp === '' ? 0 : Number(c.Mus_dyp)).reduce((sum, current) => sum + current);
          this.LC = this.childrenDetails.map(c => c.LC === '' ? 0 : Number(c.LC)).reduce((sum, current) => sum + current);
          this.Dwar = this.childrenDetails.map(c => c.Dwar === '' ? 0 : Number(c.Dwar)).reduce((sum, current) => sum + current);
          this.IntDis = this.childrenDetails.map(c => c.IntDis === '' ? 0 : Number(c.IntDis)).reduce((sum, current) => sum + current);
          this.CNC = this.childrenDetails.map(c => c.CNC === '' ? 0 : Number(c.CNC)).reduce((sum, current) => sum + current);
          this.MS = this.childrenDetails.map(c => c.MS === '' ? 0 : Number(c.MS)).reduce((sum, current) => sum + current);
          this.Tha = this.childrenDetails.map(c => c.Tha === '' ? 0 : Number(c.Tha)).reduce((sum, current) => sum + current);
          this.Hemo = this.childrenDetails.map(c => c.Hemo === '' ? 0 : Number(c.Hemo)).reduce((sum, current) => sum + current);
          this.SCD = this.childrenDetails.map(c => c.SCD === '' ? 0 : Number(c.SCD)).reduce((sum, current) => sum + current);
          this.AAV = this.childrenDetails.map(c => c.AAV === '' ? 0 : Number(c.AAV)).reduce((sum, current) => sum + current);
          this.PD = this.childrenDetails.map(c => c.PD === '' ? 0 : Number(c.PD)).reduce((sum, current) => sum + current);
          this.total = this.childrenDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);

        }
        else {
          this.noDataFound = true;
        }
      }
    )
  }
  selectedCWSN(childrens) {
    debugger
    this.pageStage = 2;
    this.districtName = childrens;
    this.stateService.getSelectedCWSN(childrens).subscribe(
      data => {
        if (data.result.allstuds.length > 0) {
          console.log("2", data.result.allstuds);
          this.CWSNlistDetail = data.result.allstuds;
          this.CWSNlistDetail.map(item => {
            item.total = (
              Number(item.VIB) +
              Number(item.VILV) +
              Number(item.HI) +
              Number(item.SI) +
              Number(item.LI) +
              Number(item.MR) +
              Number(item.LD) +
              Number(item.CP) +
              Number(item.Aut) +
              Number(item.MD) +
              Number(item.Mus_dyp) +
              Number(item.LC) +
              Number(item.Dwar) +
              Number(item.ID) +
              Number(item.CNC) +
              Number(item.MS) +
              Number(item.Tha) +
              Number(item.Hemo) +
              Number(item.SCD) +
              Number(item.AAV) +
              Number(item.PD)
            );
          });

          this.VIB = this.CWSNlistDetail.map(c => c.VIB === '' ? 0 : Number(c.VIB)).reduce((sum, current) => sum + current);
          this.VILV = this.CWSNlistDetail.map(c => c.VILV === '' ? 0 : Number(c.VILV)).reduce((sum, current) => sum + current);
          this.HI = this.CWSNlistDetail.map(c => c.HI === '' ? 0 : Number(c.HI)).reduce((sum, current) => sum + current);
          this.SI= this.CWSNlistDetail.map(c => c.SI === '' ? 0 : Number(c.SI)).reduce((sum, current) => sum + current);
          this.LI= this.CWSNlistDetail.map(c => c.LI === '' ? 0 : Number(c.LI)).reduce((sum, current) => sum + current);
          this.MR= this.CWSNlistDetail.map(c => c.MR === '' ? 0 : Number(c.MR)).reduce((sum, current) => sum + current);
          this.LD= this.CWSNlistDetail.map(c => c.LD === '' ? 0 : Number(c.LD)).reduce((sum, current) => sum + current);
          this.CP= this.CWSNlistDetail.map(c => c.CP === '' ? 0 : Number(c.CP)).reduce((sum, current) => sum + current);
          this.Aut = this.CWSNlistDetail.map(c => c.Aut === '' ? 0 : Number(c.Aut)).reduce((sum, current) => sum + current);
          this.MD = this.CWSNlistDetail.map(c => c.MD === '' ? 0 : Number(c.MD)).reduce((sum, current) => sum + current);
          this.Mus_dyp = this.CWSNlistDetail.map(c => c.Mus_dyp === '' ? 0 : Number(c.Mus_dyp)).reduce((sum, current) => sum + current);
          this.LC = this.CWSNlistDetail.map(c => c.LC === '' ? 0 : Number(c.LC)).reduce((sum, current) => sum + current);
          this.Dwar = this.CWSNlistDetail.map(c => c.Dwar === '' ? 0 : Number(c.Dwar)).reduce((sum, current) => sum + current);
          this.ID = this.CWSNlistDetail.map(c => c.ID === '' ? 0 : Number(c.ID)).reduce((sum, current) => sum + current);
          this.CNC = this.CWSNlistDetail.map(c => c.CNC === '' ? 0 : Number(c.CNC)).reduce((sum, current) => sum + current);
          this.MS = this.CWSNlistDetail.map(c => c.MS === '' ? 0 : Number(c.MS)).reduce((sum, current) => sum + current);
          this.Tha = this.CWSNlistDetail.map(c => c.Tha === '' ? 0 : Number(c.Tha)).reduce((sum, current) => sum + current);
          this.Hemo = this.CWSNlistDetail.map(c => c.Hemo === '' ? 0 : Number(c.Hemo)).reduce((sum, current) => sum + current);
          this.SCD = this.CWSNlistDetail.map(c => c.SCD === '' ? 0 : Number(c.SCD)).reduce((sum, current) => sum + current);
          this.AAV = this.CWSNlistDetail.map(c => c.AAV === '' ? 0 : Number(c.AAV)).reduce((sum, current) => sum + current);
          this.PD = this.CWSNlistDetail.map(c => c.PD === '' ? 0 : Number(c.PD)).reduce((sum, current) => sum + current);
          this.total = this.CWSNlistDetail.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
          
        }
        else {
          this.noDataFound2 = true;
        }
      }
    )
  }
  selectedCWSNBlock(childrens) {
    debugger
    this.pageStage = 3;
    this.blkname = childrens;
    this.stateService.getSelectedCWSNBlock(childrens).subscribe(
      data => {
        if (data.result.allstuds.length > 0) {
          console.log("3", data.result.allstuds);
          this.CWSNlistDetailSchool = data.result.allstuds
          this.CWSNlistDetailSchool.map(item => {
            item.total = (
              Number(item.VIB) +
              Number(item.VILV) +
              Number(item.HI) +
              Number(item.SI) +
              Number(item.LI) +
              Number(item.MR) +
              Number(item.LD) +
              Number(item.CP) +
              Number(item.Aut) +
              Number(item.MD) +
              Number(item.Mus_dyp) +
              Number(item.LC) +
              Number(item.Dwar) +
              Number(item.ID) +
              Number(item.CNC) +
              Number(item.MS) +
              Number(item.Tha) +
              Number(item.Hemo) +
              Number(item.SCD) +
              Number(item.AAV) +
              Number(item.PD)
            );
          });

          this.VIB = this.CWSNlistDetailSchool.map(c => c.VIB === '' ? 0 : Number(c.VIB)).reduce((sum, current) => sum + current);
          this.VILV = this.CWSNlistDetailSchool.map(c => c.VILV === '' ? 0 : Number(c.VILV)).reduce((sum, current) => sum + current);
          this.HI = this.CWSNlistDetailSchool.map(c => c.HI === '' ? 0 : Number(c.HI)).reduce((sum, current) => sum + current);
          this.SI = this.CWSNlistDetailSchool.map(c => c.SI === '' ? 0 : Number(c.SI)).reduce((sum, current) => sum + current);
          this.LI = this.CWSNlistDetailSchool.map(c => c.LI === '' ? 0 : Number(c.LI)).reduce((sum, current) => sum + current);
          this.MR = this.CWSNlistDetailSchool.map(c => c.MR === '' ? 0 : Number(c.MR)).reduce((sum, current) => sum + current);
          this.LD = this.CWSNlistDetailSchool.map(c => c.LD === '' ? 0 : Number(c.LD)).reduce((sum, current) => sum + current);
          this.CP = this.CWSNlistDetailSchool.map(c => c.CP === '' ? 0 : Number(c.CP)).reduce((sum, current) => sum + current);
          this.Aut = this.CWSNlistDetailSchool.map(c => c.Aut === '' ? 0 : Number(c.Aut)).reduce((sum, current) => sum + current);
          this.MD = this.CWSNlistDetailSchool.map(c => c.MD === '' ? 0 : Number(c.MD)).reduce((sum, current) => sum + current);
          this.Mus_dyp = this.CWSNlistDetailSchool.map(c => c.Mus_dyp === '' ? 0 : Number(c.Mus_dyp)).reduce((sum, current) => sum + current);
          this.LC = this.CWSNlistDetailSchool.map(c => c.LC === '' ? 0 : Number(c.LC)).reduce((sum, current) => sum + current);
          this.Dwar = this.CWSNlistDetailSchool.map(c => c.Dwar === '' ? 0 : Number(c.Dwar)).reduce((sum, current) => sum + current);
          this.ID = this.CWSNlistDetailSchool.map(c => c.ID === '' ? 0 : Number(c.ID)).reduce((sum, current) => sum + current);
          this.CNC = this.CWSNlistDetailSchool.map(c => c.CNC === '' ? 0 : Number(c.CNC)).reduce((sum, current) => sum + current);
          this.MS = this.CWSNlistDetailSchool.map(c => c.MS === '' ? 0 : Number(c.MS)).reduce((sum, current) => sum + current);
          this.Tha = this.CWSNlistDetailSchool.map(c => c.Tha === '' ? 0 : Number(c.Tha)).reduce((sum, current) => sum + current);
          this.Hemo = this.CWSNlistDetailSchool.map(c => c.Hemo === '' ? 0 : Number(c.Hemo)).reduce((sum, current) => sum + current);
          this.SCD = this.CWSNlistDetailSchool.map(c => c.SCD === '' ? 0 : Number(c.SCD)).reduce((sum, current) => sum + current);
          this.AAV = this.CWSNlistDetailSchool.map(c => c.AAV === '' ? 0 : Number(c.AAV)).reduce((sum, current) => sum + current);
          this.PD = this.CWSNlistDetailSchool.map(c => c.PD === '' ? 0 : Number(c.PD)).reduce((sum, current) => sum + current);
          this.total = this.CWSNlistDetailSchool.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
        }
        else {
          this.noDataFound3 = true;
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
// Excel
getcwsnblocklevelExcel(){
  this.exportExcelData = [];
  this.CWSNlistDetail.map(item => {
     // Stage 2
    return {
      'Block Name': item.block_name,
      'VI(B)': item.VIB,
      'VI(LV)': item.VILV,
      'HI': item.HI,
      'SI': item.SI,
      'LI': item.LI,
      'MR': item.MR,
      'LD': item.LD,
      'CP': item.CP,
      'Aut': item.Aut,
      'MD': item.MD,
      'MUS DYP': item.Mus_dyp,
      'LC': item.LC,
      'DWAR': item.Dwar,
      'ID': item.ID,
      'CNC': item.CNC,
      'MS': item.MS,
      'Tha': item.Tha,
      'Hemo': item.Hemo,
      'SCD': item.SCD,
      'AAV': item.AAV,
      'PD': item.PD,
      'Total': item.total,
           }    
       }).forEach(item => this.exportExcelData.push(item));
       let studentlist = [];
       for(let Studentlist of this.exportExcelData) {
        studentlist.push(Studentlist);
       }
       return studentlist;
 }

 exportExcelBlock() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getcwsnblocklevelExcel());
      const workbook = { Sheets: { 'CWSN Reports' : worksheet }, SheetNames: ['CWSN Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtid +' (CWSN Reports) ');
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
// Excelschoolleve
getcwsnschoollevelExcel(){
  this.exportExcelData = [];
  this.CWSNlistDetailSchool.map(item => {
     
    return {
      'School Name': item.school_name,
      'School Type': item.school_type,
      'VIB': item.VIB,
      'VILV': item.VILV,
      'HI': item.HI,
      'SI': item.SI,
      'LI': item.LI,
      'MR': item.MR,
      'LD': item.LD,
      'CP': item.CP,
      'Aut': item.Aut,
      'MD': item.MD,
      'MUS DYDP': item.Mus_dyp,
      'LC': item.LC,
      'Dwar': item.Dwar,
      'ID': item.ID,
      'CNC': item.CNC,
      'MS': item.MS,
      'Tha': item.Tha,
      'Hemo': item.Hemo,
      'SCD': item.SCD,
      'AAV': item.AAV,
      'PD': item.PD,
      'Total': item.total,
           }    
       }).forEach(item => this.exportExcelData.push(item));
       let studentlist = [];
       for(let Studentlist of this.exportExcelData) {
        studentlist.push(Studentlist);
       }
       return studentlist;
 }

 exportExcelSchool() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getcwsnschoollevelExcel());
      const workbook = { Sheets: { 'CWSN Reports' : worksheet }, SheetNames: ['CWSN Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFiles(excelBuffer, this.districtid +' (CWSN Reports) ');
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
