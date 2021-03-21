import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { UserSessionService } from 'src/services/usersession.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state.service';
import {NavigationService} from 'src/services/navigation.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-verficationstatusmonitoring',
  templateUrl: './verficationstatusmonitoring.component.html',
  styleUrls: ['./verficationstatusmonitoring.component.css']
})
export class VerficationstatusmonitoringComponent implements OnInit {

  // public dataHeader: any[] = [];
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  public dataHeader2: any[] = [];
  public verifymonitorstate: any;
  noDataFound: boolean;
  public pageStage: number;
  public noDataFound2 = false;
  public verifymonitorBlockData: any[] = [];
  public BrteSchoolData: any[] = [];
  school_type:any;
  school_type_get_val: any;
  arrString: any;
  userTypeID: any;
  districtId: any;
  distrctID: any;
  pageCount:any[]=[];
  selectedTotalPage: number;
  selectedColumns:any[]=[];
  first = 0;
  exportColumns:any[]=[];
  totalRecords: number;
  headerTitle: string;
  headerDesc: string;
  districtName: any;
  grandTotal_district_name : any;
  grandTotal_Total_Schools : any;
  grandTotal_Verified_Schools : any;
  grandTotal_Verified_by_BRTE : any;
  grandTotal_Verified_by_BEO : any;
  grandTotal_Verified_by_DC_CEO : any;
  constructor(private http: HttpClient, private StateService: StateService, private dataService: DataService,
              private userSessionService: UserSessionService, private navigationService: NavigationService,
              public datepipe: DatePipe
              ) { 
                this.userTypeID = this.userSessionService.userTypeId();
                this.districtId = this.userSessionService.districtId();
              }

  ngOnInit() {
    this.selectedTotalPage = 10;
    this.arrString =1;
    this.school_type = [
      {label: 'Select School Type', value: '0'},
      {label: 'Government', value: '1'},
      {label: 'Fully Aided', value: '2'},
      {label: 'Unaided', value: '3'},
      {label: 'Partially Aided', value: '4'},
      {label: 'Central Government', value: '5'}]; 
      this.pageCount = [{label: '10', value: '10'},{label: '20', value: '20'},{label: '30', value: '30'}];
    const districtId = this.userSessionService.districtId();
    if (!districtId) {
      this.getverifymonitor();
    }
  
    this.dataHeader = [{field: 'district_name', header: 'District',widthstyle: '10em' },
    { field: 'Total_Schools', header: 'Total Schools',widthstyle: '10em' },
    { field: 'Verified_Schools', header: 'Verifed Schools' ,widthstyle: '10em'},
      { field: 'Verified_by_BRTE', header: 'Verifed by BRTE',widthstyle: '10em' },
      { field: 'Verified_by_BEO', header: 'Verified by BEO',widthstyle: '10em' },
      { field: 'Verified_by_DC_CEO', header: 'Verifed by DC/CEO',widthstyle: '10em' },
     { field: '', header: 'Total',widthstyle : '10em'},
    ];
    // Stage 2
    this.dataHeader2 = [
      {field: 'block_name', header: 'Block Name', widthstyle: '10em',class:'text-left'},
      { field: 'udise_code', header: 'UDISE code', widthstyle: '10em',class:'text-center'},
      { field: 'school_name', header: 'School Name', widthstyle: '10em',class:'text-left'},
      { field: 'school_type', header: 'School Type', widthstyle: '10em',class:'text-left'},
      { field: 'School_Status', header: 'School Status', widthstyle: '10em',class:'text-left'},
      { field: 'BRTE_Status', header: 'Verfied by BRTE', widthstyle: '10em',class:'text-center'},
      { field: 'BEO_Status', header: 'Verified by BEO', widthstyle: '10em',class:'text-center' },
      { field: 'DC_CEO_Status', header: 'Verified by DC/CEO', widthstyle: '10em',class:'text-center'},
    ];
    this.selectedColumns = [
    { field: 'block_name', header: 'Block Name', widthstyle: '10em',class:'text-left'},
    { field: 'udise_code', header: 'UDISE code', widthstyle: '10em',class:'text-center'},
    { field: 'school_name', header: 'School Name', widthstyle: '10em',class:'text-left' },
    { field: 'school_type', header: 'School Type', widthstyle: '10em',class:'text-left' },
    { field: 'School_Status', header: 'School Status', widthstyle: '10em',class:'text-left' },
    { field: 'BRTE_Status', header: 'Verfied by BRTE', widthstyle: '10em',class:'text-center'}
    // { field: 'BEO_Status', header: 'Verified by BEO', widthstyle: '6em' },
    // { field: 'DC_CEO_Status', header: 'Verified by DC/CEO', widthstyle: '6em' }
  ]
  }
  goBack() {
    this.pageStage = 1;
    this.districtName = '';
  }
  getverifymonitor() {
    this.pageStage = 1;
    this.headerTitle = "Verification Status Monitoring Reports| District Wise";
    this.headerDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    debugger;
    this.StateService.getverificationstatusmonitoring(2).subscribe((data) => {
      debugger;
      const result = data.result.udise_reports_verifystatus
debugger;
        if (result.length > 0) {
        //   let Total_Schools = 0;
        //   let Verified_Schools = 0;
        //   let Verified_by_BRTE = 0;
        //   let Verified_by_BEO = 0;
        //   let Verified_by_DC_CEO = 0;
        //   let Total = 0;
        //   for (let i = 0; i < result.length; i++) {
        //     Total_Schools = Total_Schools + parseInt(result[i].Total_Schools);
        //     Verified_Schools = Verified_Schools + parseInt(result[i].Verified_Schools);
        //     Verified_by_BRTE = Verified_by_BRTE + parseInt(result[i].Verified_by_BRTE);
        //     Verified_by_BEO = Verified_by_BEO + parseInt(result[i].Verified_by_BEO);
        //     Verified_by_DC_CEO = Verified_by_DC_CEO + parseInt(result[i].Verified_by_DC_CEO);
        //     Total = Total + parseInt(result[i].Total);
        //   }
        //   result.push({Total_Schools, Verified_Schools, Verified_by_BRTE, Verified_by_BEO, Verified_by_DC_CEO,Total, district_name : 'Total'});
           this.verifymonitorstate = result;
          this.totalRecords=this.verifymonitorstate.length;

          //this.grandTotal_district_name = this.verifymonitorstate.map(c => c.district_name === '' ? 0 : Number(c.district_name)).reduce((sum, current) => sum + current);
          this.grandTotal_Total_Schools = this.verifymonitorstate.map(c => c.Total_Schools === '' ? 0 : Number(c.Total_Schools)).reduce((sum, current) => sum + current);
          this.grandTotal_Verified_Schools = this.verifymonitorstate.map(c => c.Verified_Schools  === '' ? 0 : Number(c.Verified_Schools)).reduce((sum, current) => sum + current);
          this.grandTotal_Verified_by_BRTE = this.verifymonitorstate.map(c => c.Verified_by_BRTE === '' ? 0 : Number(c.Verified_by_BRTE)).reduce((sum, current) => sum + current);
          this.grandTotal_Verified_by_BEO = this.verifymonitorstate.map(c => c.Verified_by_BEO === '' ? 0 : Number(c.Verified_by_BEO)).reduce((sum, current) => sum + current);
          this.grandTotal_Verified_by_DC_CEO = this.verifymonitorstate.map(c => c.Verified_by_DC_CEO === '' ? 0 : Number(c.Verified_by_DC_CEO)).reduce((sum, current) => sum + current);
        } 
        else {
        this.noDataFound = true;
      }
    }
    )
  }
  Blockverifymonitor(distrctID,districtName) {
    this.pageStage = 2;
    this.districtName =districtName;
    this.headerTitle = "Verification Status Monitoring Reports | Block Wise";
    this.headerDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    this.districtId = distrctID;
    // console.log("test1",this.districtId);
    debugger;
    // console.log("page2",this.school_type_get_val)
    this.StateService.getverificationstatusmonitoringblock(distrctID,1).subscribe((details) => 
        {
          debugger;
          const result = details.result.udise_reports_verifystatus;
          debugger;
          if (result.length > 0) {
            this.verifymonitorBlockData = result.map(l => { return { block_name: l.block_name, udise_code: l.udise_code,school_name: l.school_name,school_type: l.school_type,School_Status: this.datepipe.transform(l.School_Status, 'dd-MM-yyyy'),BRTE_Status: l.BRTE_Status,BEO_Status: l.BEO_Status,DC_CEO_Status: l.DC_CEO_Status}; });;
            // console.log("check",result)
          } else {
            this.noDataFound2 = true;
          }


        }
      );
  }
  school_type_val(event)
  {
    debugger;
    this.school_type_get_val = event.value;
    // console.log("schooltypeval",this.school_type_get_val);

    
  }
  SearchData()
  {
    this.StateService.getverificationstatusmonitoringblock(this.districtId,this.school_type_get_val).subscribe((data) => {
      if (data.result.udise_reports_verifystatus) 
      {
        // console.log(data.result)
       this.verifymonitorBlockData = data.result.udise_reports_verifystatus;
      }
    });
  }
  selectedPageCount(event)
  {
debugger;
this.selectedTotalPage = event.value;
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

