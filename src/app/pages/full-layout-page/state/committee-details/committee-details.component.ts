import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-committee-details',
  templateUrl: './committee-details.component.html',
  styleUrls: ['./committee-details.component.scss']
})
export class CommitteeDetailsComponent implements OnInit {
  public committeeData : any[] = [];
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  public pageStage : number;
  public committieeData : any[] = [];
  districtName : any;
  exportExcelData : any[]=[];
  usertypeid : any;
  constructor(private stateService:StateService, private routers : Router, private userSessionService: UserSessionService) { 
    this.usertypeid = this.userSessionService.userTypeId();
  }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();

    if(!districtId){
    this.getCommitteeData();
    }
    if(districtId){
      this.getEachSchoolCommitteeDetails(districtId,this.districtName)
    }
    this.dataHeader = [
      {field: 'Disctric Name', header: 'District', widthstyle:'12em'},
      { field: 'Total School Count', header: 'Total School Count', widthstyle:'8em' }
    ]

    this.dataHeader2 = [
      {field: 'Block Name', header: 'Block Name', widthstyle:'12em'},
      { field: 'UDISE Code', header: 'UDISE Code', widthstyle:'10em' },
      { field: 'School Name', header: 'School Name', widthstyle:'20em' },
      { field: 'SMC Constituted?', header: 'SMC Constituted?', widthstyle:'14em' },
      { field: 'SMDC Constituted?', header: 'SMDC Constituted?', widthstyle:'14em' },
      { field: 'SBC Constituted?', header: 'SBC Constituted?', widthstyle:'14em' },
      { field: 'AC Constituted?', header: 'AC Constituted?', widthstyle:'14em' },
      { field: 'PTA Constituted?', header: 'PTA Constituted?', widthstyle:'15em' },
      { field: 'PTA Estabilshed Year', header: 'PTA Estabilshed Year', widthstyle:'15em' },
      { field: 'PTA Registration Number', header: 'PTA Registration Number', widthstyle:'15em' },

    ];
  }

  getCommitteeData(){
    this.stateService.getCommitteeDetails().subscribe((res) => {
      this.pageStage = 1;
      let results = res.school_committee_verification_district_wise.school_committee_verification_district_wise;
      if(results.length>0){
        this.committeeData = results;
      }
      else
      {
        this.noDataFound =true
      }
    })
  }

  getEachSchoolCommitteeDetails(committe,name){
    this.pageStage = 2;
    this.districtName = name;
    this.stateService.getCommitteeEachDetails(committe).subscribe((res)=>{
      let result = res.school_committee_verification_district.school_committee_verification_district
      // this.routers.navigate(['State/committee-district-details'], result)
      if(result.length>0){
        this.committieeData = result;
      }
      else
      {
        this.noDataFound2 = true;
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
  getCommitteData(){
    this.exportExcelData = [];
    this.committieeData.map(item => {
      return {
        'Block Name': item.block_name,
        'UDISE Code': item.udise_code,
        'School Name': item.school_name,
        'SMC Constituted?': item.smc_const,
        'SMDC Constituted?': item.smdc_constitu,
        'SBC Constituted?': item.sbc_const,
        'AC Constituted?': item.acadecomm_const,
        'PTA Constituted?': item.pta_const,
        'PTA Estabilshed Year': item.pta_est_yr,
        'PTA Registration Number': item.pta_reg_no,
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let CommitteeList = [];
         for(let committeelist of this.exportExcelData) {
          CommitteeList.push(committeelist);
         }
         return CommitteeList;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCommitteData());
        const workbook = { Sheets: { 'Committee Details List' : worksheet }, SheetNames: ['Committee Details List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer,'(Committee Details List)');
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

}
