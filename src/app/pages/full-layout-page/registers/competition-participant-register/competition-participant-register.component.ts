import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { RegistersService } from '../registers.service';


@Component({
  selector: 'app-competition-participant-register',
  templateUrl: './competition-participant-register.component.html',
  styleUrls: ['./competition-participant-register.component.css']
})
export class CompetitionParticipantRegisterComponent implements OnInit {
  dataHeader: { field: string; header: string; widthstyle: string;class:string }[];
  competitionRegister:any
  noData:boolean=false
  schoolId:any
  exportExcelData: any[];
  constructor(private register:RegistersService,private userSessionService:UserSessionService) { 
    this.schoolId = this.userSessionService.schoolId();
  }

  ngOnInit() {
    this.dataHeader = [
      { field: 'EmisID', header: 'EMIS Id', widthstyle: '12em',class:'text-left' },
      { field: 'StudName', header: 'Student Name', widthstyle: '12em',class:'text-left' },
      { field: 'StudCls', header: ' Class', widthstyle: '6em',class:'text-center' },
      { field: 'ClsSec', header: 'Section', widthstyle: '6em',class:'text-center' },
      { field: 'CntsName', header: 'Competition Name', widthstyle: '12em',class:'text-left' },
    ];
    this.getCompetitionRegister()
  }

  getCompetitionRegister()
  {
      this.schoolId = this.userSessionService.schoolId();
       this.register.getCompetitionRegisterData( this.schoolId).subscribe(res => {
        this.competitionRegister = [];
        var competitionRegister=res
        if(competitionRegister.length > 0)
        {
         competitionRegister.map((x) => (x["EmisID"] = x["EmisID"].toString()));
        this.competitionRegister =  competitionRegister
    
        this.noData = false;
      
      }
      else {

        this.noData = true;
      }
    })
  }

  getCompetitionDataReport()
  {
      this.exportExcelData = [];
      this.competitionRegister.map(item => {
          return {
            'EMIS Id': item.EmisID,
            'Student Name': item.StudName,
            'Class': item.StudCls,
            'Section': item.ClsSec,
            "Competition Name": item.CntsName
          }
        
      }).forEach(item => this.exportExcelData.push(item));
      let compReport = [];
      for (let data of this.exportExcelData) {
        compReport.push(data);
      }
      return compReport;
    
  }
 
    exportExcel() {
      if (this.competitionRegister.length > 0) {
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getCompetitionDataReport());
          const workbook = { Sheets: { 'Competition Register': worksheet }, SheetNames: ['Competition Register'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Competition Register");
        });
      }
    }
    saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
    }
  
  

}
