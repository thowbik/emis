import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../reports.service';
import {Router} from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
@Component({
  selector: 'app-schoolmaster',
  templateUrl: './schoolmaster.component.html',
  styleUrls: ['./schoolmaster.component.css']
})
export class SchoolmasterComponent implements OnInit {
  public dataHeader: any;
  public length: any;
  schoolCode: string;
  public noDataFound = false;
  userTypeID: number;
  districtId: any;
  schoolmasterreport: any;
  exportExcelData: any;
  selectedColumns:any[]=[];
  blockId : any;
  constructor(private router: Router, private reportsService: ReportsService, private userSessionService: UserSessionService, ) {
    this.userTypeID = this.userSessionService.userTypeId();
  
    this.districtId = this.userSessionService.districtId();
    this.blockId = this.userSessionService.userId();
  }

  ngOnInit() {
    if(this.districtId != "" && this.userTypeID !=2){
   
     this.Districtschoolmaster(this.districtId);
    }
    else if(this.blockId!=""){
      this.Blockschoolmaster(this.blockId);
    }

     this.selectedColumns = [
  { field: 'Block', header: 'Block',widthstyle: '15em'},
  { field: 'Education_District', header: 'Education District',widthstyle: '10em'},
  { field: 'UDISE_Code', header: 'UDISE Code',widthstyle: '10em'},
  // { field: 'MHRD_UDISE_Code', header: 'MHRD UDISE Code',widthstyle: '10em'},
  { field: 'School_Name', header: 'School Name',widthstyle: '15em'},
  { field: 'Management', header: 'Management' ,widthstyle: '15em'},
]
  }
    cols : Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'Block', header: 'Block',widthstyle: '13em'},
  { field: 'Education_District', header: 'Education District',widthstyle: '13em'},
  { field: 'UDISE_Code', header: 'UDISE Code',widthstyle: '13em'},
  // { field: 'MHRD_UDISE_Code', header: 'MHRD UDISE Code',widthstyle: '13em'},
  { field: 'School_Name', header: 'School Name',widthstyle: '13em'},
  { field: 'Management', header: 'Management' ,widthstyle: '13em'},
  { field: 'Management_Type', header: 'Management Type',widthstyle: '14em' },
  { field: 'Category', header: 'Category',widthstyle: '13em' },
  { field: 'Category_Group', header: 'Category Group',widthstyle: '13em' },
  { field: 'Locality', header: 'Locality',widthstyle: '13em' },
  { field: 'Pre_Primary', header: 'Pre-Primary Other than Anganwadi',widthstyle: '13em' },
  { field: 'Anganwadi', header: 'Anganwadi',widthstyle: '13em' },
  { field: 'Directorate', header: 'Directorate',widthstyle: '13em' },
  { field: 'LocalBody', header: 'LocalBody',widthstyle: '13em' },
  { field: 'Town_Munici_Village_Corp', header: 'Town Munici Village Corp',widthstyle: '13em' },
  { field: 'Habitation_Ward', header: 'Habitation Ward',widthstyle: '13em' },
  { field: 'Cluster', header: 'Cluster',widthstyle: '13em' },
  { field: 'Latitute', header: 'Latitute',widthstyle: '13em' },
  { field: 'Longitude', header: 'Longitude',widthstyle: '13em' },
  { field: 'Assembly', header: 'Assembly',widthstyle: '13em' },
  { field: 'Parliament', header: 'Parliament',widthstyle: '13em' },
];

Districtschoolmaster(dist) {
//const distrctID = this.districtId;

      this.reportsService.getStateschoolmasterreport(dist).subscribe((data) => {
        if (data != 0) {
          this.noDataFound = false;
        this.schoolmasterreport = data.result.School_Master_Report;
        console.log(this.schoolmasterreport);
      } else {
        this.noDataFound = true;
      }
    });
}
Blockschoolmaster(block) {
  //const distrctID = this.districtId;
  
        this.reportsService.getBlockschoolmasterreport(block).subscribe((data) => {
          if (data != 0) {
            this.noDataFound = false;
          this.schoolmasterreport = data.result.School_Master_Report;
          console.log(this.schoolmasterreport);
        } else {
          this.noDataFound = true;
        }
      });
  }

getschoolmasterreport(){
  this.exportExcelData = [];
  this.schoolmasterreport.map(item => {

    return {
      'Block': item.Block,
      'Education District': item.Education_District,
      'UDISE Code': item.UDISE_Code,
      // 'MHRD UDISE Code': item.MHRD_UDISE_Code,
      'School Name': item.School_Name,
      'Management': item.Management,
      'Management Type': item.Management_Type,
      'Category': item.Category,
      'Category Group': item.Category_Group,
      'Locality': item.Locality,
      'Pre-Primary Other than Anganwadi': item.Pre_Primary,
      'Anganwadi': item.Anganwadi,
      'Directorate': item.Directorate,
      'LocalBody': item.LocalBody,
      'Town Munici Village Corp': item.Town_Munici_Village_Corp,
      'Habitation Ward': item.Habitation_Ward,
      'Cluster': item.Cluster,
      'Latitute': item.Latitute,
      'Longitude': item.Longitude,
      'Assembly': item.Assembly,
      'Parliament': item.Parliament,
           }

       }).forEach(item => this.exportExcelData.push(item));
       let schoolmaster = [];
       for(let masterreport of this.exportExcelData) {
        schoolmaster.push(masterreport);
       }
       return schoolmaster;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschoolmasterreport());
      const workbook = { Sheets: { 'School Master Report' : worksheet }, SheetNames: ['School Master Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (School Master Report) ');
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
