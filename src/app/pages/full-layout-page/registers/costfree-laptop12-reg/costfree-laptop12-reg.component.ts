import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-costfree-laptop12-reg',
  templateUrl: './costfree-laptop12-reg.component.html',
  styleUrls: ['./costfree-laptop12-reg.component.css']
})
export class CostfreeLaptop12RegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  exportExcelData: any;


  constructor(private registersService: RegistersService,
    private userSessionService: UserSessionService) { 
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
      { field: 'class_section', header: 'Section'},
      { field: 'unique_supply', header: 'Serial No' },
      { field: 'distribution_date', header: 'Distribution Date'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCostFreeLaptops12Details(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.Laptops_distribute_details;
      }
    });
  }
  getcostfreelaptop12(){
    this.exportExcelData = [];
    this.data.map(item => {
      return {
        'EMIS No': item.unique_id_no,
        'Student Name': item.name,
        'Gender': item.gender,
        'Class': item.class_studying_id,
        'Section': item.class_section,
        'Serial No': item.unique_supply,
        'Distribution Date': item.distribution_date,


         } 
         }).forEach(item => this.exportExcelData.push(item));
         let laptop12 = [];
         for(let costfreelaptop12 of this.exportExcelData) {
          laptop12.push(costfreelaptop12);
         }
         return laptop12;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getcostfreelaptop12());
        const workbook = { Sheets: { 'Cost Free laptop 12' : worksheet }, SheetNames: ['Cost Free laptop 12'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (Cost Free laptop 12 ) ');
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
