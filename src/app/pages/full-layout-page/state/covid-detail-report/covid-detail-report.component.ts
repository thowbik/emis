import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StateService } from '../state.service';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-covid-detail-report',
  templateUrl: './covid-detail-report.component.html',
  styleUrls: ['./covid-detail-report.component.css']
})
export class CovidDetailReportComponent implements OnInit {
  school_type: { label: string; value: string; }[];
  districtId: any;
  districtNames: any;
  myDates: string;
  myDate = new Date();
  pageStage: number;
  datefilter: any;
  noDataFound: boolean;
  coviddetaillist: any;
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  date: any;
  selectedDates: string;
  exportColumns: any;
  maxDate: Date;
  minDate: any;
  districtIds: any;
  coviddetailDislist: any;
  school_type_get_val: any;
  school_type_vals: any;
  coviddetailBlocklist: any;
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  dataHeader2: { field: string; header: string; widthstyle: string; }[];
  
  constructor(private StateService: StateService, 
    private userSessionService: UserSessionService, 
    public datepipe: DatePipe,) {this.districtId = this.userSessionService.districtId();
    this.districtNames = this.userSessionService.districtName();
    this.myDates = this.datepipe.transform(this.myDate, 'yyyy-MM-dd'); }

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    
    if (!districtId) {
      this.getverifymonitor();
    } else {
      this.Dicverifymonitors(districtId);
    }
    this.school_type = [
      {label: 'Select School Type', value: '0'},
      {label: 'Government', value: '1'},
      {label: 'Fully Aided', value: '2'},
      {label: 'Unaided', value: '3'},
      {label: 'Partially Aided', value: '4'},
      {label: 'Central Government', value: '5'}];

    this.dataHeader = [
    { field: 'Quest', header: 'Questions',widthstyle: '28em' },
    { field: 'TotSchlCount', header: 'Total School Count',widthstyle: '10em' },
    { field: 'TotNoCount', header: 'Marked as No' ,widthstyle: '12em'},
    ];

    this.dataHeader1 = [{field: 'Block', header: 'Block',widthstyle: '12em' },
    { field: 'Qustn', header: 'Questions',widthstyle: '28em' },
    { field: 'Count', header: 'Count',widthstyle: '10em' },
    { field: 'UDISE', header: 'UDISE' ,widthstyle: '12em'},
    { field: 'SchlTyp', header: 'School Type',widthstyle: '12em' },
    { field: 'SchlNam', header: 'School Name',widthstyle: '17em' },
    ];

    this.dataHeader2 = [{field: 'Block', header: 'Block',widthstyle: '12em' },
    { field: 'Qustn', header: 'Questions',widthstyle: '28em' },
    { field: 'Count', header: 'Count',widthstyle: '10em' },
    { field: 'UDISE', header: 'UDISE' ,widthstyle: '12em'},
    { field: 'SchlTyp', header: 'School Type',widthstyle: '12em' },
    { field: 'SchlNam', header: 'School Name',widthstyle: '17em' },
    
    ];

    this.maxDate = new Date();
    const prevMonth = 0;
    const prevYear = 2020;
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);

  }

  getMonth(event){
    this.date = event ; 
    this.selectedDates = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    const districtId = this.userSessionService.districtId();
    if (!districtId) {
      this.getverifymonitor();
    } else {
      this.Dicverifymonitors(districtId);
    }
  };
  
  school_type_val(event)
  {
    this.school_type_get_val = event.value;
  }
  
  goBack() {
    this.pageStage = 1;
  }

  goBack2(){
    this.pageStage = 2;
  }

  getverifymonitor() {
    this.pageStage = 1;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates
    }
    this.school_type_vals = this.school_type_get_val;
    let data =  {"records":
      { "date":this.datefilter,
        "schl_type_id":this.school_type_vals
      }
    }

    this.StateService.getCovidDetailsReport(data).subscribe((res) => {
      const result = res.data;
        if (result.length > 0) {
            this.coviddetaillist = result;
        } 
        else {
        this.noDataFound = true;
      }
    })
  }

  Dicverifymonitors(DistId) {
    this.pageStage = 1;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates
    }
    this.school_type_vals = this.school_type_get_val;
    this.pageStage = 2;
    console.log(DistId, '-------DistId');
    
    // if(districtId){

    // }
    this.districtIds = DistId;
    let data =  {"records":
      { "date":this.datefilter,
        "dist_id":this.districtIds,
        "schl_type_id":this.school_type_vals
      }
    }

    this.StateService.getCovidDetailsReport(data).subscribe((res) => {
      const result = res.data;
        if (result.length > 0) {
            this.coviddetailDislist = result;
        } 
        else {
        this.noDataFound = true;
      }
    })
  }

  Blockverifymonitors(DistId, blckID) {
    this.pageStage = 1;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates
    }
    this.school_type_vals = this.school_type_get_val;
    this.pageStage = 3;
    this.districtIds = DistId;
    let data =  {"records":
      { "date":this.datefilter,
        "dist_id":this.districtIds,
        "blck_id":blckID,
        "schl_type_id":this.school_type_vals
      }
    }

    this.StateService.getCovidDetailsReport(data).subscribe((res) => {
      const result = res.data;
        if (result.length > 0) {
            this.coviddetailBlocklist = result;
        } 
        else {
        this.noDataFound = true;
      }
    })
  }

  exportPdf(data,dataHeader) {
    debugger;
    this.exportColumns = dataHeader.map(col => ({title: col.header, dataKey: col.field}));
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, data);
            doc.save('Verificationstatus.pdf');
        })
    })
  }

  exportExcel(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Verificationstatus");
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
  customSort(event: SortEvent) {
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
}
