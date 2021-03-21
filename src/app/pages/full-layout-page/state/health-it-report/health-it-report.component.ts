import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StateService } from '../state.service';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-health-it-report',
  providers: [StateService],
  templateUrl: './health-it-report.component.html',
  styleUrls: ['./health-it-report.component.css']
})
export class HealthItReportComponent implements OnInit  {

  selectedCategory: number = 0;
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
  allStudentList: any;
  ShowAbos:boolean = true;
  studentList: any;
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  selectedColumnsPositive: { field: string; header: string; widthstyle: string; class: string; }[];
  getpositivecases: any;
  getpositivecasesdetails: any;
  dataHeader2: { field: string; header: string; widthstyle: string; }[];
  getpositivecasesSummary: any;
  getpositivecasesdetailsSummary: any;
  selectedColumns2: { field: string; header: string; widthstyle: string; class: string; }[];
  relationship: string;
  relation: any = ["Others", "Father", "Mother", "Brother", "Sister", "Uncle", "Aunty", "Grandfather", "Grandmother", "Myself"];
  healthlist: any = ["0","Yes", "No"];
  covidList: any = ["0","Quarantine at home", "Quarantine at center","Currently taking treatment","Discharged","Expired"];
  usertypeId: number;
  total_count: any;
  totally_marked: any;
  total_counts: any;
  affected: any;
  sample: any;
  test: any[]=[];
  positive:boolean=true;
  constructor( private StateService: StateService, 
              private userSessionService: UserSessionService, public fb: FormBuilder,
              public datepipe: DatePipe, 
              ) { 
                this.districtId = this.userSessionService.districtId();
                this.districtNames = this.userSessionService.districtName();
                this.usertypeId = this.userSessionService.userTypeId();
              }
  ngOnInit() {
 if (this.usertypeId==3) {
        debugger
        this.covidUnmarkedReportcountsdist();
        this.covidUnmarkedSummaryReportcountsdist();

      }else{
        this.covidUnmarkedReport();
        this.covidUnmarkedSummaryReport();
      }
 

    this.dataHeader1 = [
        {field: '', header: 'sno',widthstyle: '10em' },
        {field: 'DistNam', header: 'District',widthstyle: '20em' },
        {field: 'TotStrength', header: 'Total Strength',widthstyle: '20em' },
        { field: 'TotMarked', header: 'Updated',widthstyle: '18em' },
    ];

    this.dataHeader2 = [
      {field: '', header: 'sno',widthstyle: '10em' },
      {field: 'district_name', header: 'District',widthstyle: '20em' },
      {field: 'affected_count', header: 'No. of Positive Cases',widthstyle: '20em' },
  ];
    // Stage 2

    this.selectedColumns = [
      { field: 'UDISE', header: 'UDISE code', widthstyle: '10em',class:'text-center'},
      { field: 'SchlNam', header: 'School Name', widthstyle: '10em',class:'text-left' },
      { field: 'TotStrength', header: 'Total Strength', widthstyle: '10em',class:'text-left' },
      { field: 'TotMarked', header: 'Updated', widthstyle: '10em',class:'text-left' },
    ]
    this.selectedColumns2 = [
      { field: 'udise_code', header: 'UDISE code', widthstyle: '10em',class:'text-center'},
      { field: 'stud_name', header: 'Student Name', widthstyle: '10em',class:'text-left' },
      { field: 'class_studying_id', header: 'Class', widthstyle: '10em',class:'text-left' },
      { field: 'school_name', header: 'School', widthstyle: '10em',class:'text-left' },
      { field: 'relationship', header: 'Relationship', widthstyle: '10em',class:'text-left' },
      { field: 'covid_affected', header: 'Covid affected', widthstyle: '10em',class:'text-left' },
      { field: 'covid_status', header: 'Status', widthstyle: '10em',class:'text-left' },

    ]
  }
 goBack() {
   if (this.usertypeId!=3) {
    this.pageStage = 1;
    this.districtName = '';
   }
  }
  covidUnmarkedReport() {
    debugger
    this.pageStage = 1;
    this.StateService.getCovidAfctdUnmrkdReport().subscribe((res) => {
      this.getpositivecases = res.result;
      this.total_count = this.getpositivecases.map(c => c.TotStrength === '' ? 0 : Number(c.TotStrength)).reduce((sum, current) => sum + current);
      this.totally_marked = this.getpositivecases.map(c => c.TotMarked === '' ? 0 : Number(c.TotMarked)).reduce((sum, current) => sum + current);
    });
  }

  covidUnmarkedReportcounts(DistID,Distnam) {
    debugger
    this.pageStage = 2;
    this.districtName = Distnam;
    this.ShowAbos =  true;
    this.positive = false;

    let data = {"records":
      {
        "dist_id": DistID,
      }
    }
    this.StateService.getCovidAfctdUnmrkdReportdetails(data).subscribe((res) => {
      this.getpositivecasesdetails = res.result;
    });
  }
  covidUnmarkedReportcountsdist() {
    debugger
    this.pageStage = 2;
    this.StateService.getCovidAfctdUnmrkdReportdetails(this.districtId).subscribe((res) => {
      this.getpositivecasesdetails = res.result;
    });
  }
  covidUnmarkedSummaryReportcountsdist() {
    debugger
    this.pageStage = 2;
    this.StateService.getCovidAfctdSummaryReportdetails(this.districtId).subscribe((res) => {
    this.getpositivecasesdetailsSummary = res.result;
    this.getpositivecasesdetailsSummary.map(i => i['relationship'] = this.relation[i['relationship']]);
    this.getpositivecasesdetailsSummary.map(i => i['covid_affected'] = this.healthlist[i['covid_affected']]);
    this.getpositivecasesdetailsSummary.map(i => i['covid_status'] = this.covidList[i['covid_status']]);
    });
  }

  

  //tab 2

  covidUnmarkedSummaryReport() {
    debugger
    this.pageStage = 1;
    this.StateService.getCovidAfctdSummaryReport().subscribe((res) => {
      this.getpositivecasesSummary = res.result;
      this.total_counts = this.getpositivecasesSummary.map(c => c.affected_count === '' ? 0 : Number(c.affected_count)).reduce((sum, current) => sum + current);
      this.getpositivecasesSummary.map((x) => (x["affected_count"] = (x.affected_count  ? x.affected_count :0)));
    });
   
  }

  covidUnmarkedSummaryReportcounts(DistID,Distnam) {
    debugger
    this.pageStage = 2;
    this.districtName = Distnam;
    this.ShowAbos =  false;
    this.positive = true;
    

    let data = {"records":
      {
        "dist_id": DistID,
      }
    }
    this.StateService.getCovidAfctdSummaryReportdetails(data).subscribe((res) => {
    this.getpositivecasesdetailsSummary = res.result;
    console.log(res.result,"ioughireughpiwreughpierghpirehgpiergbi");
    this.getpositivecasesdetailsSummary.map(i => i['relationship'] = this.relation[i['relationship']]);
    this.getpositivecasesdetailsSummary.map(i => i['covid_affected'] = this.healthlist[i['covid_affected']]);
    this.getpositivecasesdetailsSummary.map(i => i['covid_status'] = this.covidList[i['covid_status']]);
    });
  }
  
  exportPdf(data,dataHeader) {
    debugger;
    this.exportColumns = dataHeader.map(col => ({title: col.header, dataKey: col.field}));
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, data);
            doc.save('Health Report.pdf');
        })
    })
  }

  exportExcel(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Health Report");
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
