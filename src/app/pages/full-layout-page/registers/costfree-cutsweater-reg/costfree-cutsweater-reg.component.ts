import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-costfree-cutsweater-reg',
  templateUrl: './costfree-cutsweater-reg.component.html',
  styleUrls: ['./costfree-cutsweater-reg.component.css']
})
export class CostfreeCutsweaterRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  exportExcelData: any;


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
      { field: 'distribution_date', header: 'Distribution Date'}
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
   this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCostFreeCutSweaterDetails(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.sweater_distribute_details;
      }
    });
  }
  getCostfreecutsweater(){
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
         let cutsweater = [];
         for(let Costfreecutsweater of this.exportExcelData) {
          cutsweater.push(Costfreecutsweater);
         }
         return cutsweater;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCostfreecutsweater());
        const workbook = { Sheets: { 'Cost Free Cut Sweater' : worksheet }, SheetNames: ['Cost Free Cut Sweater'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (Cost Free Cut Sweater ) ');
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

  onBack() {
    this.router.navigate(['/registers']);
  }

}
