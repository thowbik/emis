import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-costfree-notebooks-reg',
  templateUrl: './costfree-notebooks-reg.component.html',
  styleUrls: ['./costfree-notebooks-reg.component.css']
})
export class CostfreeNotebooksRegComponent implements OnInit {
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
     
      { field: 'unique_id_no', header: 'EMIS No'},
      { field: 'name', header: 'Student Name'},
      { field: 'gender', header: 'Gender'},
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Medium' },
      { field: 'counts', header: 'Count' },
      { field: 'scat', header: 'Note Category'},
      { field: 'distribution_date', header: 'Distribution Date'},
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCostFreeNotebookDetails(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.note_book_distribute_details;
      }
    });
  }

  getnotebooks(){
    this.exportExcelData = [];
    this.data.map(item =>{
      return{
        'EMIS No':item.unique_id_no,
        'Student Name':item.name,
        'Gender':item.gender,
        'Class':item.class_studying_id,
        'Medium':item.class_section,
        'Count':item.counts,
        'Note Category':item.scat,
        'Distribution Date': item.distribution_date,

      }
  }).forEach(item => this.exportExcelData.push(item));
  let costfreenotebookreg = [];
  for(let Costfreenotebook of this.exportExcelData) {
    Costfreenotebook.push(costfreenotebookreg);
  }
  return costfreenotebookreg;
}

exportExcel() {
import("xlsx").then(xlsx => {
 const worksheet = xlsx.utils.json_to_sheet(this.getnotebooks());
 const workbook = { Sheets: { 'Costfree-Notebooks List' : worksheet }, SheetNames: ['Costfree-Notebooks List List'] };
 const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
 this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (costfree-notebook register list) ');
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