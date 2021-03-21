import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-academic-details',
  templateUrl: './academic-details.component.html',
  styleUrls: ['./academic-details.component.scss']
})
export class AcademicDetailsComponent implements OnInit {
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public academicData : any[] = [];
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  public pageStage : number;
  public academicDataDisct : any[] = [];
  public academicDataBlock : any[] = [];
  districtName : any;
  exportExcelData : any[]=[];
  usertypeid: any;

  constructor(private stateService:StateService, private routers : Router, private userSessionService: UserSessionService) { 
    this.usertypeid = this.userSessionService.userTypeId();
  }

  ngOnInit() {

    const districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.blockId();
    if(!districtId){
      this.getAcademicDetails()
    }
    if(districtId){
      this.getEachAcademicDetails(districtId,this.districtName)
    }
    this.dataHeader = [{field: 'Distict Name', header: 'Distict Name', widthstyle:'15em' },{ field: 'Total School Coount', header: 'Total School Count', widthstyle:'10em' }];
    this.dataHeader2 = [{field: 'block', header: 'Block', widthstyle:'12em'},{ field: 'UDISE Code', header: 'UDISE Code', widthstyle:'12em' },{ field: 'School Name', header: 'School Name', widthstyle:'20em' },{ field: 'School Category', header: 'School Category', widthstyle:'15em'},{ field: 'Lowest Class', header: 'Lowest Class', widthstyle:'12em' },{ field: 'Highest Class', header: 'Highest Class', widthstyle:'12em' },{ field: 'School Type', header: 'School Type', widthstyle:'13em' },{ field: 'Minority Status', header: 'Minority Status', widthstyle:'14em' },{ field: 'Anganwadi Attached', header: 'Anganwadi Attached', widthstyle:'15em' }];
  }
  getAcademicDetails(){
    this.pageStage = 1;
    this.stateService.getAcademicData().subscribe((res)=>{
      let result = res.school_profile_verification.school_profile_verification;
      if(result.length>0){
        this.academicData = res.school_profile_verification.school_profile_verification;
        console.log(this.academicData);
      }
      else{
        this.noDataFound = true
      }
    })
  }
  getEachAcademicDetails(academic,district_name){
    this.pageStage = 2;
    this.districtName=district_name;
    this.stateService.getAcademicDataDistrict(academic).subscribe((res) => {
      if(res.school_profile_verification.school_profile_verification.length>0){
        this.academicDataDisct =  res.school_profile_verification.school_profile_verification;
      }
      else
      {
        this.noDataFound2= true;
      }
    })
  }
  goBack()
  {
    if(this.usertypeid == 5 && this.usertypeid != 9 && this.usertypeid != 10 && this.usertypeid != 6)
    {
    this.pageStage = 1;
    this.districtName = '';
  }
}
 //excel
 getExcelData() {
  this.exportExcelData = [];
  this.academicDataDisct.map(item => {
    return {
      'Block name': item.block_name,
      'UDISE Code': item.udise_code,
      'School Name': item.school_name,
      'Category': item.category,
      'Lowest Class': item.low_class,
      'Highest Class': item.high_class,
      'School Type': item.sch_typ,
      'Minority Status': item.minority_sch,
      'Anganwadi Attached':item.anganwadi,
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
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelData());
      const workbook = { Sheets: { 'Academic Details' : worksheet }, SheetNames: ['Academic Details'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' (Academic Details) ');
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
