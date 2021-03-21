import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AlertService } from "src/services/alert.service";
import { UserSessionService } from "src/services/usersession.service";
import { StateService } from "../state.service";

@Component({
  selector: "app-covid-summary-report",
  templateUrl: "./covid-summary-report.component.html",
  styleUrls: ["./covid-summary-report.component.css"],
})
export class CovidSummaryReportComponent implements OnInit {
  noData: boolean = false;
  // noData2: boolean = false;
  noData2:boolean=false
  exportExcelData: any[];
  usertypeId: any;
  todayDate: string;
  school_type: any;
  covidSummaryReport: FormGroup;
  covidSummaryReportList: any;
  covidSummaryNoList: any;
  quest_id:any
  showNoList:Boolean=false

  pageStage: Number;

  dataHeader:{field:string;header:string;widthstyle:string;class:string}[];
  dataHeader2:{field:string;header:string;widthstyle:string;class:string}[];

  grandTotal_TotSchlCount: any;
  grandTotal_TotMarkdCount: any;
  grandTotal_TotNoCount: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private state: StateService,
    private user: UserSessionService
  ) {
    this.usertypeId = this.user.userTypeId();
    // this.districtid = this.user.districtId();
  }

  ngOnInit() {
    this.todayDate = new Date().toISOString().split("T")[0];
    this.initValidators();
    // School Type Dropdown
    this.school_type = [
      { label: "All School", value: "" },
      { label: "Government", value: "1" },
      { label: "Fully Aided", value: "2" },
      { label: "Unaided", value: "3" },
      { label: "Partially Aided", value: "4" },
      { label: "Central Government", value: "5" },
    ];
    this.dataHeader=[
      {field:"Quest",header:"Questions",widthstyle:"12em",class:"text-left"},
    {field:"RespDate",header:"Response Date",widthstyle:"6em",class:"text-center"},
    {field:"TotSchlCount",header:"Total School Count",widthstyle:"6em",class:"text-center"},
    {field:"TotNoCount",header:"Total No.of Schools Answered No",widthstyle:"6em",class:"text-center"}
  ];

    this.dataHeader2=[
      // {field:"DistName",header:"District",widthstyle:"8em",class:"text-left"},
      {field:"BlckName",header:"Block ",widthstyle:"8em",class:"text-center"},
      {field:"UDISE",header:"UDISE",widthstyle:"6em",class:"text-center"},
      {field:"SchlName",header:"School Name",widthstyle:"12em",class:"text-center"},
      {field:"SchlTyp",header:"School Type",widthstyle:"6em",class:"text-center"}
    ];
    if(this.usertypeId==5)
    {
      this.dataHeader2.splice(0,0,{ field: 'DistName', header: 'District', widthstyle: '10em',class:'text-left' })
    }
    this.covidSummaryReport.patchValue({ date: this.todayDate });
    this.onSubmitCovidSummary();
  }

  // Covid Watch
  initValidators() {
    // Covid Watch
    this.covidSummaryReport = this.fb.group({
      date: new FormControl("", Validators.required),
      schl_type_id: new FormControl(""),
    });
  }
  onSubmitCovidSummary() {
    if (this.covidSummaryReport.valid) {
      if(this.pageStage==2)
      {
       this.redirectToNoMarked(this.quest_id)
      }
      else{
      let districtId = this.user.districtId();
      if (!districtId) {
        this.getCovidSummaryData();
      } else {
        this.getCovidSummaryDataDist(districtId);
      }
    } 
  }else {
      this.alertService.error("Please Select Date");
    }
  
  }
  getCovidSummaryData() {
    this.showNoList = false
    var date = this.covidSummaryReport.value.date;
    var school_type_id = this.covidSummaryReport.value.schl_type_id;
    let covidsummaryreport = {
      records: { "date": date, "schl_type_id": school_type_id },
    };
    
    this.state.getCovidSummaryReport(covidsummaryreport).subscribe((res) => {
      this.pageStage = 1;
      this.covidSummaryReportList = [];
      var covidSummaryReportList = res.data;
      if (covidSummaryReportList.length > 0) {
      
        this.covidSummaryReportList = covidSummaryReportList;
        if(this.usertypeId == 5) {
          this.covidSummaryReportList.splice(17,2);
        }
        
        this.noData = true;
        // this.grandTotal_TotSchlCount = this.covidSummaryReportList
        //   .map((c) => (c.TotSchlCount === "" ? 0 : Number(c.TotSchlCount)))
        //   .reduce((sum, current) => sum + current);
        // this.grandTotal_TotMarkdCount = this.covidSummaryReportList
        //   .map((c) => (c.TotMarkdCount === "" ? 0 : Number(c.TotMarkdCount)))
        //   .reduce((sum, current) => sum + current);
        // this.grandTotal_TotNoCount = this.covidSummaryReportList
        //   .map((c) => (c.TotNoCount === "" ? 0 : Number(c.TotNoCount)))
        //   .reduce((sum, current) => sum + current);
      } else {
        this.noData = false;
      }
    });
  }

  getCovidSummaryDataDist(districtId) {
  
    this.showNoList = false
    var date = this.covidSummaryReport.value.date;
    var school_type_id = this.covidSummaryReport.value.schl_type_id;
    let covidsummaryreport = {
      records: {
        "date": date,
        "schl_type_id": school_type_id,
        "dist_id": districtId,
      },
    };
    this.pageStage = 1;
    this.state.getCovidSummaryReport(covidsummaryreport).subscribe((res) => {
      this.covidSummaryReportList = [];
      var covidSummaryReportDistList = res.data;
      if (covidSummaryReportDistList.length > 0) {

        this.covidSummaryReportList = covidSummaryReportDistList;
        this.noData = true;
        // this.grandTotal_TotSchlCount = this.covidSummaryReportList
        //   .map((c) => (c.TotSchlCount === "" ? 0 : Number(c.TotSchlCount)))
        //   .reduce((sum, current) => sum + current);
        // this.grandTotal_TotMarkdCount = this.covidSummaryReportList
        //   .map((c) => (c.TotMarkdCount === "" ? 0 : Number(c.TotMarkdCount)))
        //   .reduce((sum, current) => sum + current);
        // this.grandTotal_TotNoCount = this.covidSummaryReportList
        //   .map((c) => (c.TotNoCount === "" ? 0 : Number(c.TotNoCount)))
        //   .reduce((sum, current) => sum + current);
      } else {
        this.noData = false;
      }
    });
  }
  
  redirectToNoMarked(Questionid)
  {
    this.showNoList = true;
    var date = this.covidSummaryReport.value.date;
    this.quest_id = Questionid
    var school_type_id = this.covidSummaryReport.value.schl_type_id;
    let covidsummaryreport = {
      records: { "date": date, "quest_id": this.quest_id,"schl_typ_id":school_type_id },
    };
    this.pageStage = 2;
    this.state.getCovidSummaryTotalNoCount(covidsummaryreport).subscribe((res) => {
      this.covidSummaryNoList = [];
      var covidSummaryNoList = res.data;
      debugger
      if (covidSummaryNoList.length > 0) {
        
        this.covidSummaryNoList = covidSummaryNoList;

        this.noData2 = true;
      } else {
        this.noData2 = false;
      }
    });
  }


  // Excel Sheet

  getSummaryListReport() {
    this.exportExcelData = [];
    this.covidSummaryReportList
      .map((item) => {
        return {
          "Questions": item.Quest,
          "Response Date": item.RespDate,
          "Total School Count": item.TotSchlCount,
          // "Total Marked  Count": item.TotMarkdCount,
          "Total No.of Schools Answered No": item.TotNoCount,
        };
      })
      .forEach((item) => this.exportExcelData.push(item));
    let covidWarchReport = [];
    for (let Coviddata of this.exportExcelData) {
      covidWarchReport.push(Coviddata);
    }
    return covidWarchReport;
  }

  exportExcelSummary() {
    if (this.covidSummaryReportList.length > 0) {
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.getSummaryListReport());
        const workbook = {
          Sheets: { "Covid Watch Question Response": worksheet },
          SheetNames: ["Covid Watch Question Response"],
        };
        const excelBuffer: any = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        this.saveAsExcelFileSummary(excelBuffer, "Covid Watch Question Response");
      });
    }
  }
  saveAsExcelFileSummary(buffer: any, fileName: string): void {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  // for No List
  
  getSummarySchoolListReport() {
    this.exportExcelData = [];
    var data;
    this.covidSummaryNoList.map((item) => {
        if(this.usertypeId==5)
        {
          data={
            "District": item.DistName,
          }
        }
      
    var commonData= {
          "Block": item.BlckName,
          "UDISE": item.UDISE,
          "School Name": item.SchlName,
          "School Type": item.SchlTyp,
        };
        if(this.usertypeId==5)
        {
        var mergeData=Object.assign(data,commonData)
        return mergeData
        }
        else{
          return commonData
        }
      })
      .forEach((item) => this.exportExcelData.push(item));
    let covidWatchNoReport = [];
    for (let Coviddata of this.exportExcelData) {
      covidWatchNoReport.push(Coviddata);
    }
    return covidWatchNoReport;
  }

  exportExcelSchoolSummary() {
    if (this.covidSummaryReportList.length > 0) {
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.getSummarySchoolListReport());
        const workbook = {
          Sheets: { "Covid Watch Question Response": worksheet },
          SheetNames: ["Covid Watch Question Response"],
        };
        const excelBuffer: any = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        this.saveAsExcelFileSchoolSummary(excelBuffer, "Covid Watch Question Response");
      });
    }
  }
  saveAsExcelFileSchoolSummary(buffer: any, fileName: string): void {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  goBack_b() {
    this.pageStage = 1;
    this.showNoList = false;
    this.covidSummaryReport.patchValue({ schl_type_id: "" });
    this.onSubmitCovidSummary();
  }
  goBack_sc() {
    this.pageStage = 2;
    this.showNoList = true;
  }
}
