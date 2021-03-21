import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-costfree-bags-reg',
  templateUrl: './costfree-bags-reg.component.html',
  styleUrls: ['./costfree-bags-reg.component.css']
})
export class CostfreeBagsRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  exportExcelData : any[]=[];

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
      { field: 'MEDINSTR_DESC', header: 'Medium' },
      { field: 'scheme_category', header: 'Size' },
      { field: 'distribution_date', header: 'Distribution Date'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCostFreeBagsDetails(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.bags_distribute_details;
      }
    });
  }

  getcostfreebags(){
    this.exportExcelData = [];
    this.data.map(item =>{
      return{
        'EMIS No' : item.unique_id_no,
        'Student Name' : item.name,
        'Gender' : item.gender,
        'Class' : item.class_studying_id,
        'Section' : item.class_section,
        'Medium' : item.MEDINSTR_DESC,
        'Size' : item.scheme_category,
        'Distribution Date' : item.distribution_date,

      }
    }).forEach(item => this.exportExcelData.push(item));
  let costfreebagsreg = [];
  for(let Costfreebagsreg of this.exportExcelData) {
    Costfreebagsreg.push(costfreebagsreg);
  }
  return costfreebagsreg;
}

exportExcel() {
import("xlsx").then(xlsx => {
 const worksheet = xlsx.utils.json_to_sheet(this.getcostfreebags());
 const workbook = { Sheets: { 'Costfree-Bags List' : worksheet }, SheetNames: ['Costfree-Bags List'] };
 const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
 this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (costfree-bags register list) ');
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