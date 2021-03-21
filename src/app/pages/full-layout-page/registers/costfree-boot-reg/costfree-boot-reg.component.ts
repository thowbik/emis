import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-costfree-boot-reg',
  templateUrl: './costfree-boot-reg.component.html',
  styleUrls: ['./costfree-boot-reg.component.css']
})
export class CostfreeBootRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  exportExcelData: any[];

  constructor(private registersService: RegistersService,
    private userSessionService: UserSessionService,
    private router : Router) {
     this.emis_school_id = this.userSessionService.schoolId();
     }

  ngOnInit() {
    this.getData();
    this.headerData();
  }
  headerData()
  {
    this.cols =[
     
      { field: 'unique_id_no', header: 'EMIS No' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section' },
      { field: 'MEDINSTR_DESC', header: 'Medium' },
      { field: 'scheme_category', header: 'Size'},
      { field: 'distribution_date', header: 'Distribution Date'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
   this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCostFreeBootDetails(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.boot_distribute_details;
      }
    });
  }
  getCostfreebootreg(){
    this.exportExcelData = [];
    this.data.map(item => {
      return {
        'EMIS No': item.unique_id_no,
        'Student Name': item.name,
        'Gender': item.gender,
        'Class': item.class_studying_id,
        'Section': item.class_section,
        'Medium': item.MEDINSTR_DESC,
        'Size': item.scheme_category,
        'Distribution Date': item.distribution_date,

        
         } 
         }).forEach(item => this.exportExcelData.push(item));
         let costfreeboot = [];
         for(let Costfreebootreg of this.exportExcelData) {
          costfreeboot.push(Costfreebootreg);
         }
         return costfreeboot;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCostfreebootreg());
        const workbook = { Sheets: { 'Cost Free Boot Register' : worksheet }, SheetNames: ['Cost Free Boot Register'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (Cost Free Boot Register) ');
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

  onBack(){
  this.router.navigate(['/registers']);
}
}
