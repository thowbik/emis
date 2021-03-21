import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-costfree-cwsnstudentbenefits-reg',
  templateUrl: './costfree-cwsnstudentbenefits-reg.component.html',
  styleUrls: ['./costfree-cwsnstudentbenefits-reg.component.css']
})
export class CostfreeCWSNstudentbenefitsRegComponent implements OnInit {
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
     
      { field: 'unique_id_no', header: 'Student Id' },
      { field: 'name', header: 'Student Name' },
      { field: 'gender', header: 'Gender'},
      { field: 'class_studying_id', header: 'Class'},
      { field: 'class_section', header: 'Section'},
      { field: 'da_name', header: 'CWSN' },
      { field: 'national_id', header: 'National Id'},
      { field: 'bf', header: 'Benefits'},
      { field: 'provided_by', header: 'Provided By'},
      { field: 'acad_year', header: 'Academic Year'},



    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getCwsnStudentBenefitRegister(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.cwsn_benefit;
      }
    });
  }
  getcostfreecwsn(){
    this.exportExcelData = [];
    this.data.map(item => {
      return {
        'Student Id': item.unique_id_no,
        'Student Name': item.name,
        'Gender': item.gender,
        'Class': item.class_studying_id,
        'Section': item.class_section,
        'CWSN': item.da_name,
        'National Id': item.national_id,
        'Benefits': item.bf,
        'Provided By': item.provided_by,
        'Academic Year': item.acad_year,




         } 
         }).forEach(item => this.exportExcelData.push(item));
         let cwsn = [];
         for(let costfreecwsnstudent of this.exportExcelData) {
          cwsn.push(costfreecwsnstudent);
         }
         return cwsn;
   }
  
   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getcostfreecwsn());
        const workbook = { Sheets: { 'Cost Free Cwsnstudent Benefits' : worksheet }, SheetNames: ['Cost Free Cwsnstudent Benefits'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.emis_school_id +' (Cost Free Cwsnstudent Benefits ) ');
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
