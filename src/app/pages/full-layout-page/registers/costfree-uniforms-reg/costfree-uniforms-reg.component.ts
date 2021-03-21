import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-costfree-uniforms-reg',
  templateUrl: './costfree-uniforms-reg.component.html',
  styleUrls: ['./costfree-uniforms-reg.component.css']
})
export class CostfreeUniformsRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  exportExcelData :any[]=[];
  constructor(private registersService: RegistersService,
    private userSessionService: UserSessionService) {
      this.emis_school_id = this.userSessionService.schoolId();
     
     }

  ngOnInit() {
  
    this.headerData();
    this.emis_school_id = this.userSessionService.schoolId();
    const classsection ={
        emis_school_id : this.emis_school_id,
        set : '1'
    };
 
    this.registersService.getCostFreeUniformsDetails(classsection,true).subscribe((res) => {
      if(res) {
         this.data = res.result.uniform_distribute_details;
        // this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      }

    });
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
      { field: 'sets', header: 'Sets' },
      { field: 'distribution_date', header: 'Distribution Date'}
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  // getData() {
  //   this.emis_school_id = this.userSessionService.schoolId();
  //   // this.registersService.getOutofSchollChildern(this.emis_school_id).subscribe((res) => {
  //   //   if (res) {
  //   //     this.data = res.result.student_osc;
  //   //   }
  //   // });
  // }

getuniform(){
  this.exportExcelData =[];
  this.data.map(item =>{
    return{
      'EMIS No':item.unique_id_no,
      'Student Name':item.name,
      'Gender':item.gender,
      'Class':item.class_studying_id,
      'Section' : item.class_section,
      'Medium':item.MEDINSTR_DESC,
      'Size':item.scheme_category,
      'Sets':item.sets,
      'Distribution Date': item.distribution_date,

    }
}).forEach(item => this.exportExcelData.push(item));
let costfreeuniformreg = [];
for(let Costfreeuniformreg of this.exportExcelData) {
  Costfreeuniformreg.push(costfreeuniformreg);
}
return costfreeuniformreg;
}

exportExcel() {
import("xlsx").then(xlsx => {
const worksheet = xlsx.utils.json_to_sheet(this.getuniform());
const workbook = { Sheets: { 'Costfree-Uniform List' : worksheet }, SheetNames: ['Costfree-Uniform List'] };
const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (costfree-Uniform register list) ');
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