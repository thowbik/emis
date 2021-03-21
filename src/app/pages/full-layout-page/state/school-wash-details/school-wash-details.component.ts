import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-school-wash-details',
  templateUrl: './school-wash-details.component.html',
  styleUrls: ['./school-wash-details.component.scss']
})
export class SchoolWashDetailsComponent implements OnInit {
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public dataHeader3 : any[] = [];
  public SchoolWashDataDisct : any[] = [];
  public schoolWashDataBlock : any[] = [];
  public schoolWashDataSchool : any[] = [];
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  public noDataFound3 : boolean = false;
  public pageStage : number;
  public schoolWashTotal : number;
  districtName : any;
  BlockName : any;
  exportExcelData : any[]=[];
  usertypeid: any;


  constructor(public stateService : StateService, public routers : Router, private userSessionService: UserSessionService) {
    this.usertypeid = this.userSessionService.userTypeId();
   }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.blockId();
    console.log(districtId, blockId, 'test')
    if(!districtId){
      this.getSchoolWashData();
    }
    if(districtId){
      this.getEachSchoolWashData(districtId, this.districtName)
    }
    if(blockId){
      this.getSchoolWiseWashData(blockId,this.BlockName)
    }
    this.dataHeader = [{field: 'district_name', header: 'District', widthstyle:'12em'},{ field: 'total_school_count', header: 'Total School Count', widthstyle:'8em' }];
    this.dataHeader2 = [{field: 'block_name', header: 'Block', widthstyle:'12em'},{ field: 'Total School Count', header: 'Total School Count', widthstyle:'8em' }];
    this.dataHeader3 = [{field: 'block_name', header: 'Block', widthstyle:'12em'},{ field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },{field: 'school_name', header: 'School Name', widthstyle:'20em'},{field: 'Total Boys', header: 'Total Boys', widthstyle:'10em'},{field: 'Boys Toilets in Use', header: 'Boys Toilets in Use', widthstyle:'14em'},{field: 'Boys Toilets Not in Use', header: 'Boys Toilets Not in Use', widthstyle:'15em'},{field: 'Total Girls', header: 'Total Girls', widthstyle:'10em'},{field: 'Girls Toilets in Use', header: 'Girls Toilets in Use', widthstyle:'14em'},{field: 'Girls Toilets Not in Use', header: 'Girls Toilets Not in Use', widthstyle:'17em'},{field: 'Handwash Station in Use', header: 'Handwash Station in Use', widthstyle:'12em'},{field: 'Handwash Station Not in Use', header: 'Handwash Station Not in Use', widthstyle:'12em'},{field: 'Drinking Water Available', header: 'Drinking Water Available', widthstyle:'12em'},{field: 'Water Source', header: 'Water Source', widthstyle:'11em'},{field: 'Incinerator', header: 'Incinerator', widthstyle:'10em'},{field: 'Incinerator Auto Available Count', header: 'Incinerator Auto Avaialbe Count', widthstyle:'18em'},{field: 'Incinerator Manual Avaialbe Count', header: 'Incinerator Manual Avaialbe Count', widthstyle:'18em'},{field: 'Incinerator Auto Functional Count', header: 'Incinerator Auto Functional Count', widthstyle:'18em'},{field: 'Incinerator Manual Functional Count', header: 'Incinerator Manual Functional Count', widthstyle:'20em'}]
  }
  getSchoolWashData(){
    this.pageStage = 1;
    let id = '';
    this.stateService.getSchoolWashDetails(id).subscribe((res) => {
      let result = res.schoollist.school_details;
     if(result.length >0){
       let total_value = 0;
       for(let i=0;i<result.length;i++){
        total_value = total_value + parseInt(result[i].totalschools);
       }
       result.push({'totalschools':total_value, 'district_name' : 'Total'})
      this.SchoolWashDataDisct = result;
    }
    else{
      this.noDataFound = true;
    }
    })
  }
  getEachSchoolWashData(id,name){
    this.pageStage = 2;
    this.districtName = name;
    let parameter = '?grp=BLK&q='+id;
    this.stateService.getSchoolWashDetails(parameter).subscribe((res) => {
      let result = res.schoollist.school_details;
      if(result.length>0){
        let total_value = 0;
       for(let i=0;i<result.length;i++){
        total_value = total_value + parseInt(result[i].totalschools);
       }
       result.push({'totalschools':total_value, 'block_name' : 'Total'})
       this.schoolWashDataBlock = result;
     }
     else{
       this.noDataFound2 = true;
     }
    })
  }

  getSchoolWiseWashData(id,name){
    this.pageStage = 3;
    this.BlockName =  name;
    let parameter = '?grp=SCH&q='+id;
    this.stateService.getSchoolWashDetails(parameter).subscribe((res) => {
      let result = res.schoollist.school_details;
      if(result.length>0){
       this.schoolWashDataSchool = result;
     }
     else{
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
    this.BlockName ='';
  }
}

  goBack1()
  {
    this.pageStage = 2;
    this.BlockName = '';
  }
//excel
getExcelData() {
  this.exportExcelData = [];
  this.schoolWashDataBlock.map(item => {
    return {
      'Block': item.block_name,
      'Total School Count': item.totalschools,

       }
}).forEach(item => this.exportExcelData.push(item));
  let block = [];
  for(let academicDeatils of this.exportExcelData) {
    block.push(academicDeatils);
  }
  return block;
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelData());
      const workbook = { Sheets: { 'School-wash Details' : worksheet }, SheetNames: ['School-wash Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' (School-wash Details) ');
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

getExcelSchlData() {
  this.exportExcelData = [];
  this.schoolWashDataBlock.map(item => {
    return {
      'Block': item.block_name,
      'UDISE Code': item.udise_code,
      'SchoolName': item.school_name,
      'Total Boys': item.total_b,     
      'Boys Toilets Not in Use': item.toil_bys_inuse,
      'Boys Toilets Not in Use Count': item.toil_notuse_bys,
      'Total Girls': item.total_g,     
      'Girls Toilets Not in Use': item.toil_inuse_grls,
      'Girls Toilets Not in Use Count': item.toil_notuse_grls,
      'Handwash Station in Use': item.tot_handwash_bys,
        'Handwash Station Not in Use' : item.tot_handwash_grls,
        'Drinking Water Available' : item.drnkwater,
        'Water Source' : item.drinkingsource,
        'Incinerator' :item.incinerator,
        'Incinerator Auto Available Count' : item.inci_auto_avail_no,
        'Incinerator Manual Available Count' : item.inci_man_avail_no,
        'Incinerator Auto Functional Count' : item.inci_auto_func_no,
        'Incinerator Manual Functional Count' : item.inci_man_func_no

       }
}).forEach(item => this.exportExcelData.push(item));
  let block = [];
  for(let academicDeatils of this.exportExcelData) {
    block.push(academicDeatils);
  }
  return block;
}
exportSchlExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelSchlData());
      const workbook = { Sheets: { 'School-wash Details' : worksheet }, SheetNames: ['School-wash Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' (School-wash Details) ');
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
