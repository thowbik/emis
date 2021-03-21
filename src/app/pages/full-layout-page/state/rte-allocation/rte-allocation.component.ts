import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-rte-allocation',
  templateUrl: './rte-allocation.component.html',
  styleUrls: ['./rte-allocation.component.scss']
})
export class RteAllocationComponent implements OnInit {
  public RTEdata : any[] = [];
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public noDataFound : boolean = false;
  public pageStage : number;
  public noDataFound2 : boolean = false;
  public rteDataSchool : any[] = [];
  public districtNames : any;
  public exportExcelData : any[]=[];

  constructor(public stateService:StateService, public routers : Router, private userSessionService: UserSessionService) { }

  ngOnInit() {
    const districtName = this.userSessionService.districtName();
    if(!districtName){
      this.getRTEdata()
    }
    if(districtName){
      this.onSelectedDistrict(districtName)
    }
    this.dataHeader = [{field: 'district_name', header: 'Distict', widthstyle:'12em' },{ field: 'Total Schools', header: 'Total Schools', widthstyle:'8em' },{ field: 'Completed Schools', header: 'Completed Schools', widthstyle:'8em' },{ field: 'RTE Seats', header: 'RTE Seats' , widthstyle:'8em'}];
    this.dataHeader2 = [{field: 'edu_dist_name', header: 'Education District', widthstyle:'14em'},{ field: 'block_name', header: 'Block Name', widthstyle:'13em' },{field: 'udise_code', header: 'UDISE Code', widthstyle:'12em'},{ field: 'school_name', header: 'School Name', widthstyle:'20em' },{field: 'Total Section', header: 'Total Section', widthstyle:'13em'},{ field: 'RTE Seats', header: 'RTE Seats', widthstyle:'15em' },{field: 'Completed Schools', header: 'Completed Schools', widthstyle:'15em'}]
  }

  getRTEdata(){
    this.pageStage = 1;
    this.stateService.getRTEServiceData().subscribe((res) => {
      if(res.allstuds.allstuds.length>0){
        this.RTEdata = res.allstuds.allstuds;
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }
  onSelectedDistrict(rteData){
    this.pageStage = 2;
    this.districtNames = rteData;
    this.stateService.getRTEServiceDistrictData(rteData).subscribe((res) => {
      const result = res.allstuds.allstuds;
      if(result.length>0){
        this.rteDataSchool = result;
        console.log(this.rteDataSchool);
      }
      else
      {
        this.noDataFound2 = true;
      }
    })
  }

  goBack()
  {
    this.districtNames = '';
    this.pageStage =  1;
  }

  //excel
  
  BlockDetails(){
    this.exportExcelData = [];
    this.rteDataSchool .map(item => {
      return {
        'Education District': item.edu_dist_name,
        'Block Name': item.block_name,
        'UDISE Code': item.udise_code ,
        'School Name': item.school_name ,
        'Total Section': item.section_nos ,
        'RTE Seats': item.rte_seats,
        'Completed Schools': item.school_count 
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
        this.saveAsExcelFile(excelBuffer,'(RTE-ALLOCATION List)');
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
