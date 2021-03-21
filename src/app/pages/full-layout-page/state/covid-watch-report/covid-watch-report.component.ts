import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StateService } from '../state.service';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-covid-watch-report',
  templateUrl: './covid-watch-report.component.html',
  styleUrls: ['./covid-watch-report.component.css']
})
export class CovidWatchReportComponent implements OnInit {

  dataHeader: { field: string; header: string; widthstyle: string; }[];
  covidWatchForm: FormGroup;
  public getCovidWatchReport: any;
  noDataFound: boolean;
  public pageStage: number;
  school_type:any;
  school_type_get_val: any;
  arrString: any;
  districtId: any;
  distrctID: any;
  pageCount:any[]=[];
  selectedTotalPage: number;
  selectedColumns:any[]=[];
  selectedColu:any[]=[];
  DirstColumns:any[]=[];
  exportColumns:any[]=[];
  totalRecords: number;
  districtName: any;
  grandTotal_Total_Schools : any;
  grandTotal_Completed_Schools : any;
  getDistCovidwatch: any;
  myDate = new Date();
  myDates: string;
  verifymonitorstate: any;
  grandTotal_Verified_Schools: any;
  date: any;
  selectedDates: string;
  datefilter: string;
  districtIds: any;
  selectDistID: any;
  maxDate: Date;
  minDate: any;
  school_type_get_vals: any;
  school_type_vals: any;
  grandTotal_Not_Completed_Schools: any;
  getDistCovidwatchs: any;
  districtNames: any;
  myDateText: any;
  constructor( private StateService: StateService, 
              private userSessionService: UserSessionService, public fb: FormBuilder,
              public datepipe: DatePipe, 
              ) { 
                this.districtId = this.userSessionService.districtId();
                this.districtNames = this.userSessionService.districtName();
                this.myDates = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
                this.myDateText = this.datepipe.transform(this.myDate, 'dd/MM/yyyy');
              }

  ngOnInit() {
    this.districtId = this.districtId ? this.districtId : 99;
    console.log(this.districtId, 'this.districtId')

    this.selectedTotalPage = 10;
    this.arrString =1;
    this.school_type = [
      {label: 'All School', value: ''},
      {label: 'Government', value: '1'},
      {label: 'Fully Aided', value: '2'},
      {label: 'Unaided', value: '3'},
      {label: 'Partially Aided', value: '4'},
      {label: 'Central Government', value: '5'}]; 
    this.pageCount = [{label: '10', value: '10'},{label: '20', value: '20'},{label: '30', value: '30'}];
    const districtId = this.userSessionService.districtId();
    if (!districtId) {
      this.getverifymonitor();
    } else {
      this.Blockverifylist(this.distrctID);
    }
  
    this.dataHeader = [{field: '', header: 'sno',widthstyle: '10em' },
    {field: 'District', header: 'District',widthstyle: '20em' },
    { field: 'Total_Schools', header: 'Total Schools',widthstyle: '18em' },
    { field: 'Completed_Schools', header: 'Updated Schools' ,widthstyle: '18em'},
    { field: 'NotCompleted', header: 'Not Updated Schools',widthstyle: '17em' },
    ];
    // Stage 2

    this.selectedColumns = [
      { field: 'BlockNam', header: 'Block Name', widthstyle: '10em',class:'text-left'},
      { field: 'UDISE', header: 'UDISE code', widthstyle: '10em',class:'text-center'},
      { field: 'School', header: 'School Name', widthstyle: '10em',class:'text-left' },
      { field: 'Sch_Type', header: 'School Type', widthstyle: '10em',class:'text-left' },
      { field: 'Category', header: 'Category', widthstyle: '10em',class:'text-left' },
      { field: 'Submit_Status', header: 'Status', widthstyle: '10em',class:'text-center'}
    ]

    this.selectedColu = [
      { field: 'UDISE', header: 'UDISE code', widthstyle: '10em',class:'text-center'},
      { field: 'school_name', header: 'School Name', widthstyle: '10em',class:'text-left' },
      { field: 'Sch_Type', header: 'School Type', widthstyle: '10em',class:'text-left' },
      { field: 'Category', header: 'Category', widthstyle: '10em',class:'text-left' },
      { field: 'Submit_Status', header: 'Status', widthstyle: '10em',class:'text-center'}
    ]

    this.DirstColumns = [
      { field: 'BlockNam', header: 'Block Name', widthstyle: '10em',class:'text-left' },
      { field: 'Total_Schools', header: 'Total Schools', widthstyle: '10em',class:'text-left' },
      { field: 'Completed_Schools', header: 'Updated Schools', widthstyle: '10em',class:'text-center'},
      { field: 'Not_Completed_Schools', header: 'Not Updated Schools', widthstyle: '10em',class:'text-left' }
    ]
    this.maxDate = new Date();
    let prevMonth = 0;
    let prevYear = 2020;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
  }

  initialValidator() {
    this.covidWatchForm = this.fb.group({
       'date': new FormControl('',null),
      });
  }

  goBack() {
    this.pageStage = 1;
    this.districtName = '';
  }

  goBack2(){
    this.pageStage = 2;
    this.Blockverifylist(this.distrctID);
  }
  getMonth(event){
    this.date = event ; 
    this.selectedDates = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    const districtId = this.userSessionService.districtId();
    if (!districtId) {
      this.getverifymonitor();
    } else {
      this.Blockverifylist(this.distrctID);
    }
  };

  school_type_val(event)
  {
    debugger;
    this.school_type_get_val = event.value;
  }

  getverifymonitor() {
    debugger
    this.pageStage = 1;
    console.log(this.selectedDates, 'selectedDates');
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates
    }

    this.school_type_vals = this.school_type_get_val;

    let data =  {"records":
    {
        "date":this.datefilter,
        "School_typeid":this.school_type_vals
    }
    }

    this.StateService.getCovidWatchReportList(data).subscribe((res) => {
      debugger
      const result = res.result;
        if (result.length > 0) {
            this.verifymonitorstate = result;
            this.totalRecords=this.verifymonitorstate.length;
            this.grandTotal_Total_Schools = this.verifymonitorstate.map(c => c.Total_Schools === '' ? 0 : Number(c.Total_Schools)).reduce((sum, current) => sum + current);
            this.grandTotal_Completed_Schools = this.verifymonitorstate.map(c => c.Completed_Schools  === '' ? 0 : Number(c.Completed_Schools)).reduce((sum, current) => sum + current);
            this.grandTotal_Not_Completed_Schools = this.verifymonitorstate.map(c => c.NotCompleted  === '' ? 0 : Number(c.NotCompleted)).reduce((sum, current) => sum + current);
        } 
        else {
        this.noDataFound = true;
      }
    })
  }

  getDate(event){
    this.date = event ; 
    this.selectedDates = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.Blockverifylist(this.distrctID);
  };

  Blockverifymonitors(distrctID,districtName) {
    this.pageStage = 2;
    this.districtIds = distrctID;
    this.districtName =districtName;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates;
    }
    
    this.school_type_vals = this.school_type_get_val;

    let data = {"records":
      {
        "date":this.datefilter,
        "district_id":this.districtIds,
        "Level":"1",
        "School_typeid":this.school_type_vals
      }
    }
    this.StateService.getCovidWatchReportList(data).subscribe((res) => {
      this.getDistCovidwatch = res.result;
    });
  }

 
  Blockverifymonitor(distrctID) {
    this.pageStage = 2;
    this.districtIds = distrctID;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates;
    }

    this.selectDistID = this.districtId;

    this.school_type_vals = this.school_type_get_val;

    let data = {"records":
    {
        "date":this.datefilter,
        "district_id":this.selectDistID,
        "Level":"1",
        "School_typeid":this.school_type_vals
    }
    }
    
    this.StateService.getCovidWatchReportList(data).subscribe((res) => {
      this.getDistCovidwatch = res.result;
    });
  }

  Blockverifylists(event) {
    if(event.index == 1){
      this.Blockverifymonitor(this.distrctID);
    } else {
      this.Blockverifylist(this.distrctID);
    }
  }

  Blockverifylist(distrctID) {
    debugger
    this.pageStage = 2;
    this.districtIds = distrctID;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates;
    }

    this.selectDistID = this.districtId;

    this.school_type_vals = this.school_type_get_val;

    let data = {"records":
      {
        "date":this.datefilter,
        "district_id":this.selectDistID,
        "Level":"2",
        "School_typeid":this.school_type_vals
      }
    }
    this.StateService.getCovidWatchReportList(data).subscribe((res) => {
      this.getDistCovidwatch = res.result;
    });
  }

  BlockIdMonitors(BlockID){
    this.pageStage = 3;
    if(this.selectedDates == undefined){
      this.datefilter = this.myDates;
    } else {
      this.datefilter = this.selectedDates;
    }

    this.selectDistID = this.districtId;

    this.school_type_vals = this.school_type_get_val;

    let data = {"records":
      {
        "date":this.datefilter,
        "Level":"3",
        "block_id":BlockID,
        "School_typeid":this.school_type_vals
      }
    }
    this.StateService.getCovidWatchReportList(data).subscribe((res) => {
      this.getDistCovidwatchs = res.result;
    });
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
