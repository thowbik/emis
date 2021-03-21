import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';
import { FormGroup } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-school-summary',
  templateUrl: './school-summary.component.html',
  styleUrls: ['./school-summary.component.css']
})
export class SchoolSummaryComponent implements OnInit {
  form: FormGroup;
  udisedatalist: Array<Object> = [];
  udisedatalist1: Array<Object> = [];
  udisedatalist2: Array<Object> = [];
  selectedColumnUdiseData: any[] = [];
  selectedColumnUdiseData1: any[] = [];
  selectedColumnUdiseData2: any[] = [];
  districtName : any;
  blkname : any;
  pageStage : any;
  show: boolean= true;
show1:any = false;

isShow: boolean;
DropdownVar = 0;
DropdownVar1 = 0;
exportExcelData : any[]=[];

  schoolcatdata: any;
  usertypeId: any

  constructor(public router: Router, public stateService: StateService,
    private userSessionService: UserSessionService) {
    this.usertypeId = this.userSessionService.userTypeId();
   }

  ngOnInit() {
    if(this.usertypeId == 2){
    this.selectedColumnUdiseData2 = this.udisedatalist2;
    }
    debugger;
    this.schoolSummaryData();
    this.stateService.getSchoolSummary().subscribe((res) => {
      if (res) {
        this.schoolcatdata = res.schoolsummary;
      }
    });
  }

  detailsbm2d() {
    this.isShow = !this.isShow;  
    this.show1 == true;
    // this.show = !this.show;
    // this.show1 = !this.show1;
    console.log('2 Days Bangalore Mysore is clicked');
  }
  schoolSummaryData() {
    this.udisedatalist = [
      { field: 'District', header: 'District Name' },
      { field: 'Govt_Pre_Primary_School', header: 'PrePri' },
      { field: 'Govt_Primary_School', header: 'Pri' },
      { field: 'Govt_Middle_School', header: 'Mid' },
      { field: 'Govt_High_School', header: 'High' },
      { field: 'Govt_Higher_Secondary', header: 'HrSec' },
      { field: 'Aid_Pre_Primary_School', header: 'PrePri' },
      { field: 'Aid_Primary_School', header: 'Pri' },
      { field: 'Aid_Middle_School', header: 'Mid' },
      { field: 'Aid_High_School', header: 'High' },
      { field: 'Aid_Higher_Secondary', header: 'HrSec' },
      { field: 'Unaided_Pre_Primary_School', header: 'PrePri' },
      { field: 'Unaided_Primary_School', header: 'Pri' },
      { field: 'Unaided_Middle_School', header: 'Mid' },
      { field: 'Unaided_High_School', header: 'High' },
      { field: 'Unaided_Higher_Secondary', header: 'HrSec' },
      { field: 'Part_Aid_Pre_Primary_School', header: 'PrePri' },
      { field: 'Part_Aid_Primary_School', header: 'Pri' },
      { field: 'Part_Aid_Middle_School', header: 'Mid' },
      { field: 'Part_Aid_High_School', header: 'High' },
      { field: 'Part_Aid_Higher_Secondary', header: 'HrSec' },
      { field: 'Central_Pre_Primary_School', header: 'PrePri' },
      { field: 'Central_Primary_School', header: 'Pri' },
      { field: 'Central_Middle_School', header: 'Mid' },
      { field: 'Central_High_School', header: 'High' },
      { field: 'Central_Higher_Secondary', header: 'HrSec' }, 
      { field: 'Total_Pre_Primary_School', header: 'PrePri' },
      { field: 'Total_Primary_School', header: 'Pri' },
      { field: 'Total_Middle_School', header: 'Mid' },
      { field: 'Total_High_School', header: 'High' },
      { field: 'Total_Higher_Secondary', header: 'HrSec' },
      { field: 'Special_School', header: 'Special School' },
      { field: 'Total_School_Count', header: 'Grant Total' },
    
    ];
     this.selectedColumnUdiseData = this.udisedatalist;

     this.udisedatalist1 = [
      { field: 'block_name', header: 'Block Name' },
      { field: 'Govt_Pre_Primary_School', header: 'PrePri' },
      { field: 'Govt_Primary_School', header: 'Pri' },
      { field: 'Govt_Middle_School', header: 'Mid' },
      { field: 'Govt_High_School', header: 'High' },
      { field: 'Govt_Higher_Secondary', header: 'HrSec' },
      { field: 'Aid_Pre_Primary_School', header: 'PrePri' },
      { field: 'Aid_Primary_School', header: 'Pri' },
      { field: 'Aid_Middle_School', header: 'Mid' },
      { field: 'Aid_High_School', header: 'High' },
      { field: 'Aid_Higher_Secondary', header: 'HrSec' },
      { field: 'Unaided_Pre_Primary_School', header: 'PrePri' },
      { field: 'Unaided_Primary_School', header: 'Pri' },
      { field: 'Unaided_Middle_School', header: 'Mid' },
      { field: 'Unaided_High_School', header: 'High' },
      { field: 'Unaided_Higher_Secondary', header: 'HrSec' },
      { field: 'Part_Aid_Pre_Primary_School', header: 'PrePri' },
      { field: 'Part_Aid_Primary_School', header: 'Pri' },
      { field: 'Part_Aid_Middle_School', header: 'Mid' },
      { field: 'Part_Aid_High_School', header: 'High' },
      { field: 'Part_Aid_Higher_Secondary', header: 'HrSec' },
      { field: 'Central_Pre_Primary_School', header: 'PrePri' },
      { field: 'Central_Primary_School', header: 'Pri' },
      { field: 'Central_Middle_School', header: 'Mid' },
      { field: 'Central_High_School', header: 'High' },
      { field: 'Central_Higher_Secondary', header: 'HrSec' }, 
      { field: 'Total_Pre_Primary_School', header: 'PrePri' },
      { field: 'Total_Primary_School', header: 'Pri' },
      { field: 'Total_Middle_School', header: 'Mid' },
      { field: 'Total_High_School', header: 'High' },
      { field: 'Total_Higher_Secondary', header: 'HrSec' },
      { field: 'Special_School', header: 'Special School' },
      { field: 'Total_School_Count', header: 'Grant Total' },
    
    ];
     this.selectedColumnUdiseData1 = this.udisedatalist1;

     this.udisedatalist2 = [
      { field: 'school_name', header: 'School Name' },
      { field: 'Govt_Pre_Primary_School', header: 'PrePri' },
      { field: 'Govt_Primary_School', header: 'Pri' },
      { field: 'Govt_Middle_School', header: 'Mid' },
      { field: 'Govt_High_School', header: 'High' },
      { field: 'Govt_Higher_Secondary', header: 'HrSec' },
      { field: 'Aid_Pre_Primary_School', header: 'PrePri' },
      { field: 'Aid_Primary_School', header: 'Pri' },
      { field: 'Aid_Middle_School', header: 'Mid' },
      { field: 'Aid_High_School', header: 'High' },
      { field: 'Aid_Higher_Secondary', header: 'HrSec' },
      { field: 'Unaided_Pre_Primary_School', header: 'PrePri' },
      { field: 'Unaided_Primary_School', header: 'Pri' },
      { field: 'Unaided_Middle_School', header: 'Mid' },
      { field: 'Unaided_High_School', header: 'High' },
      { field: 'Unaided_Higher_Secondary', header: 'HrSec' },
      { field: 'Part_Aid_Pre_Primary_School', header: 'PrePri' },
      { field: 'Part_Aid_Primary_School', header: 'Pri' },
      { field: 'Part_Aid_Middle_School', header: 'Mid' },
      { field: 'Part_Aid_High_School', header: 'High' },
      { field: 'Part_Aid_Higher_Secondary', header: 'HrSec' },
      { field: 'Central_Pre_Primary_School', header: 'PrePri' },
      { field: 'Central_Primary_School', header: 'Pri' },
      { field: 'Central_Middle_School', header: 'Mid' },
      { field: 'Central_High_School', header: 'High' },
      { field: 'Central_Higher_Secondary', header: 'HrSec' }, 
      { field: 'Total_Pre_Primary_School', header: 'PrePri' },
      { field: 'Total_Primary_School', header: 'Pri' },
      { field: 'Total_Middle_School', header: 'Mid' },
      { field: 'Total_High_School', header: 'High' },
      { field: 'Total_Higher_Secondary', header: 'HrSec' },
      { field: 'Special_School', header: 'Special School' },
      { field: 'Total_School_Count', header: 'Grant Total' },
    
    ];
     this.selectedColumnUdiseData2 = this.udisedatalist2;
  }

  //excel
  getblkreports(){
    this.exportExcelData = [];
    return this.schoolcatdata.map(item =>{
      return{
        'Block Name' : item.block_name,
        'Govt-PrePri':item.Govt_Pre_Primary_School,
        'Govt-Pri':item.Govt_Primary_School,
        'Govt-Mid':item.Govt_Middle_School,
        'Govt-High':item.Govt_High_School,
        'Govt-HrSec':item.Govt_Higher_Secondary,
        'Aided-PrePri':item.Aid_Pre_Primary_School,
        'Aided-Pri':item.Aid_Primary_School,
        'Aided-Mid':item.Aid_Middle_School,
        'Aided-High':item.Aid_High_School,
        'Aided-HrSec':item.Aid_Higher_Secondary,
        'Unaided-PrePri':item.Unaided_Pre_Primary_School,
        'Unaided-Pri':item.Unaided_Primary_School,
        'Unaided-Mid':item.Unaided_Middle_School,
        'Unaided-High':item.Unaided_High_School,
        'Unaided-HrSec':item.Unaided_Higher_Secondary,
        'Partialy-PrePri':item.Part_Aid_Pre_Primary_School,
        'Partialy-Pri':item.Part_Aid_Primary_School,
        'Partialy-Mid':item.Part_Aid_Middle_School,
        'Partialy-High':item.Part_Aid_High_School,
        'Partialy-HrSec':item.Part_Aid_Higher_Secondary,
        'Centarl-Govt-PrePri':item.Central_Pre_Primary_School,
        'Centarl-Govt-Pri':item.Central_Primary_School,
        'Centarl-Govt-Mid':item.Central_Middle_School,
        'Centarl-Govt-High':item.Central_High_School,
        'Centarl-Govt-HrSec':item.Central_Higher_Secondary,
        'Total-PrePri':item.Total_Pre_Primary_School,
        'Total-Pri':item.Total_Primary_School,
        'Total-Mid':item.Total_Middle_School,
        'Total-High':item.Total_High_School,
        'Total-HrSec':item.Total_Higher_Secondary,
        'Special School':item.Special_School,
        'Grant Total':item.Total_School_Count,


      }
    });
  }

  exportExcel() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getblkreports());
          const workbook = { Sheets: { 'School-summary-Block-List': worksheet }, SheetNames: ['School-summary-Block-List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "primengTable");
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

  //school excel

  getschlreports(){
    this.exportExcelData = [];
    return this.schoolcatdata.map(item =>{
      return{
        'School Name' : item.school_name,
        'Govt-PrePri':item.Govt_Pre_Primary_School,
        'Govt-Pri':item.Govt_Primary_School,
        'Govt-Mid':item.Govt_Middle_School,
        'Govt-High':item.Govt_High_School,
        'Govt-HrSec':item.Govt_Higher_Secondary,
        'Aided-PrePri':item.Aid_Pre_Primary_School,
        'Aided-Pri':item.Aid_Primary_School,
        'Aided-Mid':item.Aid_Middle_School,
        'Aided-High':item.Aid_High_School,
        'Aided-HrSec':item.Aid_Higher_Secondary,
        'Unaided-PrePri':item.Unaided_Pre_Primary_School,
        'Unaided-Pri':item.Unaided_Primary_School,
        'Unaided-Mid':item.Unaided_Middle_School,
        'Unaided-High':item.Unaided_High_School,
        'Unaided-HrSec':item.Unaided_Higher_Secondary,
        'Partialy-PrePri':item.Part_Aid_Pre_Primary_School,
        'Partialy-Pri':item.Part_Aid_Primary_School,
        'Partialy-Mid':item.Part_Aid_Middle_School,
        'Partialy-High':item.Part_Aid_High_School,
        'Partialy-HrSec':item.Part_Aid_Higher_Secondary,
        'Centarl-Govt-PrePri':item.Central_Pre_Primary_School,
        'Centarl-Govt-Pri':item.Central_Primary_School,
        'Centarl-Govt-Mid':item.Central_Middle_School,
        'Centarl-Govt-High':item.Central_High_School,
        'Centarl-Govt-HrSec':item.Central_Higher_Secondary,
        'Total-PrePri':item.Total_Pre_Primary_School,
        'Total-Pri':item.Total_Primary_School,
        'Total-Mid':item.Total_Middle_School,
        'Total-High':item.Total_High_School,
        'Total-HrSec':item.Total_Higher_Secondary,
        'Special School':item.Special_School,
        'Grant Total':item.Total_School_Count,


      }
    });
  }

  exportSchlExcel() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getschlreports());
          const workbook = { Sheets: { 'School-summary-School-List': worksheet }, SheetNames: ['School-summary-School-List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile1(excelBuffer, "primengTable");
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



  getBlock(e,name)
  {
this.districtName = name;
this.pageStage = 2;
  }
  getSchl(e,name)
  {
this.blkname = name;
this.pageStage =3;
  }

  goBack()
  {
    this.pageStage = 1;
    this.districtName = '';
    this.blkname ='';
  }

  goBack1()
  {
    this.pageStage = 2;
    this.blkname ='';
    }
}
