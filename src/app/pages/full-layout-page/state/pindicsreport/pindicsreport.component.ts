import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-pindicsreport',
  templateUrl: './pindicsreport.component.html',
  styleUrls: ['./pindicsreport.component.scss']
})
export class PindicsreportComponent implements OnInit {

  teacherpindicsreport: any[] = [];
  hmpindicsreport: any[] = [];
  public pageStage: number;
  exportColumns: any[] = [];
  grandTotal_teach_staff : any;
  grandTotal_teach_completed : any;
  grandTotal_hm_completed :any;
  grandTotal_brte_completed : any;
  exportExcelData : any[]=[];



  dataHeader: { field: string; header: string; widthstyle: string; }[];
  cols: Array<{ 'field': string, 'header': string, 'widthstyle': string }> =
    [{ field: 'district_name', header: 'District Name', widthstyle: '12em' },
    { field: 'teach_staff', header: 'Total Teacher ', widthstyle: '12em' },
    { field: 'teach_completed', header: 'Teacher Completed', widthstyle: '12em' },
    { field: 'teacherpending', header: 'Teacher Pending', widthstyle: '12em' },
    { field: 'hm_completed', header: 'HM Completed', widthstyle: '12em' },
    { field: 'HMpending', header: 'HM Pending', widthstyle: '12em' },
    { field: 'brte_completed', header: 'BRTE Completed', widthstyle: '12em' },
    { field: 'BRTEpending', header: 'BRTE Pending', widthstyle: '12em' }
    ];
  cols1: Array<{ 'field': string, 'header': string, 'widthstyle': string }> =
    [{ field: 'block_name', header: ' Block Name', widthstyle: '12em' },
    { field: 'teach_staff', header: 'Total Teacher ', widthstyle: '12em' },
    { field: 'teach_completed', header: 'Teacher Completed', widthstyle: '12em' },
    { field: 'teacherpending', header: 'Teacher Pending', widthstyle: '12em' },
    { field: 'hm_completed', header: 'HM Completed', widthstyle: '12em' },
    { field: 'HMpending', header: 'HM Pending', widthstyle: '12em' },
    { field: 'brte_completed', header: 'BRTE Completed', widthstyle: '12em' },
    { field: 'BRTEpending', header: 'BRTE Pending', widthstyle: '12em' }
    ];


  page: any;
  routeData: any;
  

  constructor(private stateService: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private usersessionservice: UserSessionService) {
debugger
    const districtId = this.usersessionservice.districtId();
    const blockId = this.usersessionservice.userId();
    const user_id = this.usersessionservice.userTypeId();
    if (districtId == null || districtId == undefined) {
      this.StateWisePindictReport();
    }
    else if (districtId != null && user_id != 2 && districtId != undefined) {
      this.districtWisePindictReport();
    }
    else if (blockId != null || blockId != 0) {
      this.blockWisePindictReport();
    }
    this.routeData = this.route.snapshot.params;
    this.page = this.routeData.page;
    console.log('hiii'+this.page)
  }

  ngOnInit() {
debugger

    this.dataHeader = [
      { field: 'district_name', header: 'District Name', widthstyle: '12em' },
      { field: 'teach_staff', header: 'Total Teacher ', widthstyle: '' },
      { field: 'teach_completed', header: 'Teacher Completed', widthstyle: '' },
      { field: 'teacherpending', header: 'Teacher Pending', widthstyle: '' },
      { field: 'hm_completed', header: 'HM Completed', widthstyle: '' },
      { field: 'HMpending', header: 'HM Pending', widthstyle: '' },
      { field: 'brte_completed', header: 'BRTE Completed', widthstyle: '' },
      { field: 'BRTEpending', header: 'BRTE Pending', widthstyle: '' }
    ];
    
  }


  districtWisePindictReport() {
    this.stateService.getpindicsreport(true).subscribe(data => {
      this.pageStage = 2;
      this.hmpindicsreport = data.result;
      console.log(this.hmpindicsreport);
    });

  }
  blockWisePindictReport() {
    this.stateService.getpindicsreport(true).subscribe(data => {
      this.pageStage = 3;
      this.hmpindicsreport = data.result;
      console.log(this.hmpindicsreport);
    });

  }
  StateWisePindictReport() {
    this.stateService.getpindicsreport(true).subscribe(data => {
      this.pageStage = 1;
      this.hmpindicsreport = data.result;
      console.log(this.hmpindicsreport);
      this.grandTotal_teach_staff= this.hmpindicsreport.map(c => c.teach_staff === '' ? 0 : Number(c.teach_staff)).reduce((sum, current) => sum + current);
      this.grandTotal_teach_completed = this.hmpindicsreport.map(c => c.teach_completed === '' ? 0 : Number(c.teach_completed)).reduce((sum, current) => sum + current);
      this.grandTotal_teach_staff= this.hmpindicsreport.map(c => c.teach_staff  === '' ? 0 : Number(c.teach_staff)).reduce((sum, current) => sum + current);
      this.grandTotal_hm_completed = this.hmpindicsreport.map(c => c.hm_completed === '' ? 0 : Number(c.hm_completed)).reduce((sum, current) => sum + current);
      this.grandTotal_teach_staff= this.hmpindicsreport.map(c => c.teach_staff === '' ? 0 : Number(c.teach_staff)).reduce((sum, current) => sum + current);
      this.grandTotal_brte_completed = this.hmpindicsreport.map(c => c.brte_completed  === '' ? 0 : Number(c.brte_completed )).reduce((sum, current) => sum + current);
      this.grandTotal_teach_staff = this.hmpindicsreport.map(c => c.teach_staff === '' ? 0 : Number(c.teach_staff)).reduce((sum, current) => sum + current);
    });

  }


  customSort(event: SortEvent) {
    debugger
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  exportPdf(data, dataHeader) {
    debugger;
    this.exportColumns = dataHeader.map(col => ({ title: col.header, dataKey: col.field }));
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, data);
        doc.save('Verificationstatus.pdf');
      })
    })
  }

  //excel

  getReportdeatils(){
    this.exportExcelData =[];
    this.hmpindicsreport.map(item =>
      {
        return {
          'District Name': item.district_name,
         'Total Teacher': item.teach_staff,
         'Teacher Completed': item.teach_completed ,
         'Teacher Pending': item.teach_staff - item.teach_completed ,
         'HM Completed': item.hm_completed ,
         'HM Pending': item.teach_staff-item.hm_completed ,
         'BRTE Completed': item.brte_completed ,
         'BRTE Pending': item.teach_staff - item.brte_completed,

        }
      }).forEach(item => this.exportExcelData.push(item));
      let distList = [];
      for(let distreport of this.exportExcelData) {
        distList.push(distreport);
      }
      return distList;
}
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getReportdeatils());
      const workbook = { Sheets: { 'District List': worksheet }, SheetNames: ['District List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "PINDICS Report");
    });
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

  //block
  getBlockdeatils(){
    this.exportExcelData =[];
    this.hmpindicsreport.map(item =>
      {
        return {
         'Block Name': item.block_name,
         'Total Teacher': item.teach_staff,
         'Teacher Completed': item.teach_completed ,
         'Teacher Pending': item.teach_staff - item.teach_completed ,
         'HM Completed': item.hm_completed ,
         'HM Pending': item.teach_staff-item.hm_completed ,
         'BRTE Completed': item.brte_completed ,
         'BRTE Pending': item.teach_staff - item.brte_completed,

        }
      }).forEach(item => this.exportExcelData.push(item));
      let distList = [];
      for(let distreport of this.exportExcelData) {
        distList.push(distreport);
      }
      return distList;
}
  exportExcel1() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getBlockdeatils());
      const workbook = { Sheets: { 'Block List': worksheet }, SheetNames: ['Block List'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "PINDICS-Block Report");
    });
  }
  saveAsExcelFile1(buffer: any, fileName: string): void {
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
