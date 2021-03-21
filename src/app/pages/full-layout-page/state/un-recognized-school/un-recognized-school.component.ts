import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-un-recognized-school',
  templateUrl: './un-recognized-school.component.html',
  styleUrls: ['./un-recognized-school.component.scss']
})
export class UnRecognizedSchoolComponent implements OnInit {
  public unRecognized : any[] = [];
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public noDataFound : boolean = false;
  public noDataFound2 : boolean = false;
  public pageStage :number;
  public UnRecongnizedData : any[] = [];
  districtNames : any;
  exportExcelData : any[]=[];
  usertypeid : any;

  constructor(public stateService:StateService, private routers:Router, private userSessionService: UserSessionService) { 
    this.usertypeid = this.userSessionService.userTypeId();
  }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    console.log(districtId);
    if(!districtId){
      this.UnRecognizedData();
    }
    if(districtId!="" && districtId!=null)
    {
      this.UnRecognizedDistric(districtId,this.districtNames)
    }
    this.dataHeader = [{field: 'Distict', header: 'District', widthstyle:'12em' },{ field: 'Un-Recognized School', header: 'Un-Recognized School', widthstyle:'8em' }];
  this.dataHeader2 = [{field: 'block', header:'Block', widthstyle:'12em'},{ field: 'UDISE Code', header: 'UDISE-Code', widthstyle:'8em' },{ field: 'School Name', header: 'School-Name', widthstyle:'8em' }]
  }
  UnRecognizedData(){
    this.pageStage = 1;
    this.stateService.getUnRecognizedData().subscribe((res) => {
     let result = res.school_land_verification.student_unrecognized_details;
     if(result.length>0)
     {
      this.unRecognized = res.school_land_verification.student_unrecognized_details;
      console.log(this.unRecognized);
     }
     else
     {
       this.noDataFound = true;
     }
    })
  }
  UnRecognizedDistric(unrecognized,name){
    this.pageStage = 2;
    this.districtNames = name;
    this.stateService.getUnRecognizedDistric(unrecognized).subscribe((res) =>{
      const result = res.student_unrecognized_details.student_unrecognized_details;
      if(result.length>0){
        this.UnRecongnizedData = result;
        console.log(this.UnRecongnizedData);
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
    this.districtNames ='';
  }
  }
  //excel

  SchoolDetails(){
    this.exportExcelData = [];
    this.UnRecongnizedData .map(item => {
      return {
        'Block Name': item.block_name,
        'UDISE Code': item.udise_code,
        'School Name': item.school_name 
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
        const worksheet = xlsx.utils.json_to_sheet(this.SchoolDetails());
        const workbook = { Sheets: {'SchoolDetails List' : worksheet }, SheetNames: ['SchoolDetails List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer,'(SchoolDetails List)');
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
