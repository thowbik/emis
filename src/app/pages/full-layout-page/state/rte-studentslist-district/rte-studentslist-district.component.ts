import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';
import { UserSessionService } from 'src/services/usersession.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-rte-studentslist-district',
  templateUrl: './rte-studentslist-district.component.html',
  styleUrls: ['./rte-studentslist-district.component.scss']
})
export class RteStudentslistDistrictComponent implements OnInit {
public RTEStudentsListDisct : any[] = [];
public BlockList : any[] = [];
public noDataFound : boolean = false;
public noDataFound2 : boolean = false;
public pageStage : number;
public RTEStudentsListBlock : any[] = [];
  exportExcelData: any[];
  grandTotal_prkg : any;
  grandTotal_lkg : any;
  grandTotal_ukg : any;
  grandTotal_class1 : any;
  grandTotal_class2 : any;
  grandTotal_class3 : any;
  grandTotal_class4 : any;
  grandTotal_class5 : any;
  grandTotal_class6 : any;
  grandTotal_class7 : any;
  grandTotal_class8 : any;
  grandTotal_total  : any;
  districtNames : any;
  grandTotal2_pre_kg : any;
  grandTotal2_lkg : any;
  grandTotal2_ukg : any;
  grandTotal2_c1 : any;
  grandTotal2_c2 : any;
  grandTotal2_c3 : any;
  grandTotal2_c4 : any;
  grandTotal2_c5 : any;
  grandTotal2_c6 : any;
  grandTotal2_c7 : any;
  grandTotal2_c8 : any;
  usertypeid : any;

  constructor(private routers:Router,private stateService:StateService, private userSessionService: UserSessionService) { 
    this.usertypeid = this.userSessionService.userTypeId();
  }
  cols: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'district_name', header: 'District',widthstyle: '14em'},{ field: 'prkg', header: 'Pre-Kg',widthstyle: '8em'},{ field: 'lkg', header: 'LKG' ,widthstyle: '7em'},{ field: 'ukg', header: 'UKG',widthstyle: '7em' },{ field: 'class1', header: 'I',widthstyle: '7em' },{ field: 'class2', header: 'II',widthstyle: '7em' },{ field: 'class3', header: 'III',widthstyle: '7em' },{ field: 'class4', header: 'IV',widthstyle: '7em' },{ field: 'class5', header: 'V',widthstyle: '7em' },{ field: 'class6', header: 'VI',widthstyle: '7em' },{ field: 'class7', header: 'VII',widthstyle: '7em' }, { field: 'class8', header: 'VIII',widthstyle: '7em' },{ field: 'total', header: 'Total',widthstyle: '7em' }];
  
  cols2: Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'udise_code', header: 'UDISE Code',widthstyle: '10em'},{ field: 'block_name', header: 'Block Name',widthstyle: '14em'},{ field: 'school_name', header: 'School Name',widthstyle: '20em'},{ field: 'schoolType', header: 'School Type',widthstyle: '10em'},{ field: 'pre_kg ', header: 'Pre-Kg',widthstyle: '8em'},{ field: 'lkg', header: 'LKG' ,widthstyle: '7em'},{ field: 'ukg', header: 'UKG',widthstyle: '7em' },{ field: 'c1', header: 'I',widthstyle: '7em' },{ field: 'c2', header: 'II',widthstyle: '7em' },{ field: 'c3', header: 'III',widthstyle: '7em' },{ field: 'c4', header: 'IV',widthstyle: '7em' },{ field: 'c5', header: 'V',widthstyle: '7em' },{ field: 'c6', header: 'VI',widthstyle: '7em' },{ field: 'c7', header: 'VII',widthstyle: '7em' },{ field: 'c8', header: 'VIII',widthstyle: '7em' },
   { field: 'total', header: 'Total',widthstyle: '7em' },
   ];

  ngOnInit() {
    const districtName = this.userSessionService.districtName();
    const districtID = this.userSessionService.districtId();
    const blockName = this.userSessionService.blockName();
    const blockId = this.userSessionService.userId();
    const user_id = this.userSessionService.userTypeId();
    if(user_id == 5){
      this.getRTEStudentList()
    } else if(user_id == 9 || user_id == 19 || user_id == 3) {
      this.onSelectedDistrict(districtID)
    }
    
  //   if(!districtName && !blockName){
  //     this.getRTEStudentList()
  //   }
  //  else if(districtName!="" && user_id!=2 && districtName!=null)
  //   {
  //     this.onSelectedDistrict(districtName)
  //   }
  //   else if(blockId!=null && user_id==2)
  //   {
  //     this.BlockRTE(blockId)
  //   }
  }
  getRTEStudentList(){
    this.pageStage = 1 ;
    this.stateService.getRTEStudentListData().subscribe(
      data=> {
        if(data.result.allstuds.length>0){
        this.RTEStudentsListDisct = data.result.allstuds;
        console.log(this.RTEStudentsListDisct,"result");

        this.grandTotal_prkg = this.RTEStudentsListDisct.map(c => c.prkg === '' ? 0 : Number(c.prkg)).reduce((sum, current) => sum + current);
        this.grandTotal_lkg = this.RTEStudentsListDisct.map(c => c.lkg === '' ? 0 : Number(c.lkg)).reduce((sum, current) => sum + current);
        this.grandTotal_ukg = this.RTEStudentsListDisct.map(c => c.ukg  === '' ? 0 : Number(c.ukg)).reduce((sum, current) => sum + current);
        this.grandTotal_class1 = this.RTEStudentsListDisct.map(c => c.class1 === '' ? 0 : Number(c.class1)).reduce((sum, current) => sum + current);
        this.grandTotal_class2 = this.RTEStudentsListDisct.map(c => c.class2 === '' ? 0 : Number(c.class2)).reduce((sum, current) => sum + current);
        this.grandTotal_class3 = this.RTEStudentsListDisct.map(c => c.class3 === '' ? 0 : Number(c.class3)).reduce((sum, current) => sum + current);
        this.grandTotal_class4 = this.RTEStudentsListDisct.map(c => c.class4 === '' ? 0 : Number(c.class4)).reduce((sum, current) => sum + current);
        this.grandTotal_class5 = this.RTEStudentsListDisct.map(c => c.class5 === '' ? 0 : Number(c.class5)).reduce((sum, current) => sum + current);
        this.grandTotal_class6 = this.RTEStudentsListDisct.map(c => c.class6 === '' ? 0 : Number(c.class6)).reduce((sum, current) => sum + current);
        this.grandTotal_class7 = this.RTEStudentsListDisct.map(c => c.class7 === '' ? 0 : Number(c.class7)).reduce((sum, current) => sum + current);
        this.grandTotal_class8 = this.RTEStudentsListDisct.map(c => c.class8 === '' ? 0 : Number(c.class8)).reduce((sum, current) => sum + current);
        // this.grandTotal_total = this.RTEStudentsListDisct.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);

      }else{
        this.noDataFound = true;
      }
      }
    )
  }
  onSelectedDistrict(distwise){
    debugger;
    this.pageStage = 2;
    this.districtNames = distwise;
    this.stateService.getSelectedRTEList(distwise).subscribe(
      data=>{
        if(data.result.allstuds.length>0){
          this.RTEStudentsListBlock = data.result.allstuds;
          console.log(this.RTEStudentsListBlock);

          this.grandTotal2_pre_kg = this.RTEStudentsListBlock.map(c => c.pre_kg === '' ? 0 : Number(c.pre_kg)).reduce((sum, current) => sum + current);
        this.grandTotal2_lkg = this.RTEStudentsListBlock.map(c => c.lkg === '' ? 0 : Number(c.lkg)).reduce((sum, current) => sum + current);
        this.grandTotal2_ukg = this.RTEStudentsListBlock.map(c => c.ukg === '' ? 0 : Number(c.ukg)).reduce((sum, current) => sum + current);
        this.grandTotal2_c1 = this.RTEStudentsListBlock.map(c => c.c1 === '' ? 0 : Number(c.c1)).reduce((sum, current) => sum + current);
        this.grandTotal2_c2 = this.RTEStudentsListBlock.map(c => c.c2 === '' ? 0 : Number(c.c2)).reduce((sum, current) => sum + current);
        this.grandTotal2_c3 = this.RTEStudentsListBlock.map(c => c.c3 === '' ? 0 : Number(c.c3)).reduce((sum, current) => sum + current);
        this.grandTotal2_c4 = this.RTEStudentsListBlock.map(c => c.c4 === '' ? 0 : Number(c.c4)).reduce((sum, current) => sum + current);
        this.grandTotal2_c5 = this.RTEStudentsListBlock.map(c => c.c5 === '' ? 0 : Number(c.c5)).reduce((sum, current) => sum + current);
        this.grandTotal2_c6 = this.RTEStudentsListBlock.map(c => c.c6 === '' ? 0 : Number(c.c6)).reduce((sum, current) => sum + current);
        this.grandTotal2_c7 = this.RTEStudentsListBlock.map(c => c.c7 === '' ? 0 : Number(c.c7)).reduce((sum, current) => sum + current);
        this.grandTotal2_c8 = this.RTEStudentsListBlock.map(c => c.c8 === '' ? 0 : Number(c.c8)).reduce((sum, current) => sum + current);
    
        }else{
          this.noDataFound2 = true;
        }
      }
    )
  }
  BlockRTE(block){
    this.pageStage = 3;
    this.stateService.getBlockRTEList(block).subscribe(
      data=>{
        console.log(data);
        if(data.result.allstuds.length>0){
          this.BlockList = data.result.allstuds;
        }else{
          this.noDataFound2 = true;
        }
      }
    )
  }



// Excelfiledownload
getRteData(){
  this.exportExcelData = [];
  this.RTEStudentsListBlock.map(item => {
    return {
      'UDISE CODE': item.udise_code,
      'School Name': item.school_name,
      'School_Type': item.school_type,
      'PRE-KG': item.pre_kg,
      'LKG': item.lkg,
      'UKG': item.ukg,
      'I': item.c1,
      'II': item.c2,
      'III': item.c3,
      'IV': item.c4,
      'V': item.c5,
      'VI': item.c6,
      'VII': item.c7,
      'VIII': item.c8,
      'Total': (item.pre_kg*1) + (item.lkg*1) + (item.ukg*1) + (item.c1*1) + (item.c2*1)+ (item.c3*1)+ (item.c4*1)+ (item.c5*1)+ (item.c6*1)+ (item.c7*1)+ (item.c8*1),
       } 
       }).forEach(item => this.exportExcelData.push(item));
       let Rtestudentlist = [];
       for(let studentlist of this.exportExcelData) {
        Rtestudentlist.push(studentlist);
       }
       return Rtestudentlist;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getRteData());
      const workbook = { Sheets: { 'RTE Students List' : worksheet }, SheetNames: ['RTE Students List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,'(RTE Students List)');
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

goBack()
{
  if(this.usertypeid == 5 && this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
  {
this.pageStage = 1 ;
this.districtNames = '';
  }

}
}
