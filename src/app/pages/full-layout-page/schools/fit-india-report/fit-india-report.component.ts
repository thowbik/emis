import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-fit-india-report',
  templateUrl: './fit-india-report.component.html',
  styleUrls: ['./fit-india-report.component.css']
})
export class FitIndiaReportComponent implements OnInit {
  reportdetails : FormGroup;
  districtHeader :{field:string,header:string}[];
  BlockHeader : {field: string,header: string}[];
  SchoolHeader : {field : string,header : string}[];
  Date : Date = new Date();
  entry_month : Date;
  month_value : number;
  year_value : number;
  StateData : any;
  districtData : any;
  blkData : any;
  userTypeId : number;
  districtId : number;
  blockId : number;
  Table_one = false;
  Table_two = false;
  Table_three = false;
  exportExcelData : any[]=[];
  exportExcelData1 : any[]=[];
  exportExcelData2 : any[]=[];

  constructor(private fb:FormBuilder,private schl:schoolsService,private user:UserSessionService) {
    this.userTypeId = this.user.userTypeId();
    this.districtId = this.user.districtId();
    this.blockId = this.user.blockId();
   }

  ngOnInit() {
    this.initialValidator();
    this.initialValidator_month();
    this.districtHeader = [
      {field:"district_name",header:"District"},
      {field:"Pri_Total",header:"PS"},
      {field:"Mid_Total",header:"MS"},
      {field:"High_Total",header:"HS"},
      {field:"HSS_Total",header:"HSS"},
      {field:"Pri_Certified",header:"PS"},
      {field:"Mid_Certified",header:"MS"},
      {field:"High_Certified",header:"HS"},
      {field:"HSS_Certified",header:"HSS"},
      {field:"Pri_3star",header:"PS"},
      {field:"Mid_3star",header:"MS"},
      {field:"High_3star",header:"HS"},
      {field:"HSS_3star",header:"HSS"},
      {field:"Pri_5star",header:"PS"},
      {field:"Mid_5star",header:"MS"},
      {field:"High_5star",header:"HS"},
      {field:"HSS_5star",header:"HSS"},
      
    ],
    this.BlockHeader = [
      {field:"block_name",header:"Block"},
      {field:"Pri_Total",header:"PS"},
      {field:"Mid_Total",header:"MS"},
      {field:"High_Total",header:"HS"},
      {field:"HSS_Total",header:"HSS"},
      {field:"Pri_Certified",header:"PS"},
      {field:"Mid_Certified",header:"MS"},
      {field:"High_Certified",header:"HS"},
      {field:"HSS_Certified",header:"HSS"},
      {field:"Pri_3star",header:"PS"},
      {field:"Mid_3star",header:"MS"},
      {field:"High_3star",header:"HS"},
      {field:"HSS_3star",header:"HSS"},
      {field:"Pri_5star",header:"PS"},
      {field:"Mid_5star",header:"MS"},
      {field:"High_5star",header:"HS"},
      {field:"HSS_5star",header:"HSS"},
      
    ],

    this.SchoolHeader = [
      {field : "Sch_Name", header : "School Name"},
      {field : "UDISE", header : "UDOSE Code"},
      {field : "Category", header : "Category"},
      {field : "Certified", header : "Certified"},
      {field : "Participated", header : "Participated"},
      {field : "Students_Participated", header : "Number of Students Participated"},
      {field : "Flags_won", header : "Number of Flags Won"},
      {field : "Rating", header : "Ratings"},
      {field : "Photos", header : "Number of Photos uploaded"},
      {field : "Videos", header : "Number of Videos uploaded"},

    ]

    this.reportdetails=this.fb.group({
        entry_month : new FormControl('')
    });

  }
  initialValidator_month(){
    var emis_id = this.userTypeId;
    var month = 1
    var year =  2020;
    if(this.userTypeId == 5)
    {
    this.schl.get_fitIndia_StateReport(emis_id,month,year).subscribe((result) =>
    {
    this.StateData = result.List;
    })
    }
    else if(this.userTypeId == 9 || this.userTypeId == 10)
    {
      this.Table_two = true;
      var distid = this.districtId;
      this.schl.get_fitIndia_DistrictReport(emis_id,month,year,distid).subscribe((res)=>
    {
      this.districtData = res.List;
     });
   }
    else 
    {
      this.Table_three = true;
      var blkid = this.blockId;
      this.schl.get_fitIndia_BlockReport(emis_id,month,year,blkid).subscribe((res)=>
    {
      this.blkData = res.List;
     })
    }
  }

  initialValidator(){
      if(this.userTypeId == 5){
      var emis_id = this.userTypeId;
      var month = this.month_value;
      var year =  this.year_value;
     this.schl.get_fitIndia_StateReport(emis_id,month,year).subscribe((result) =>
     {
         this.StateData = result.List;
         console.log(this.StateData);
     })
}
      else if(this.userTypeId == 9 || this.userTypeId == 3)
      {
        this.Table_two = true;
        var emis_id = this.userTypeId;
        var month = this.month_value;
        var year = this.year_value;
        var distid = this.districtId;
        this.schl.get_fitIndia_DistrictReport(emis_id,month,year,distid).subscribe((res)=>
        {
          this.districtData = res.List;
          console.log(this.districtData);
        })
      }
      else 
      {
        this.Table_three = true;
        var emis_id = 6;
        var month = this.month_value;
        var year = this.year_value;
        var blkid = this.blockId;
        this.schl.get_fitIndia_BlockReport(emis_id,month,year,blkid).subscribe((res)=>
        {
          this.blkData = res.List;
          console.log(this.blkData);
        })
      }
      };

  getMonth(event){
    var date = event ; 
   this.year_value=date.getFullYear();
   this.month_value= date.getMonth() + 1;
   this.initialValidator();
};

getDistrictDetails(distid,DropdownVar){
  if(this.userTypeId == 9 || this.userTypeId == 3)
  {
  this.Table_two = true;
  var emis_id = this.userTypeId;
  var month = this.month_value;
  var year = this.year_value;
  this.schl.get_fitIndia_DistrictReport(emis_id,month,year,distid).subscribe((res)=>
  {
    this.districtData = res.List;
    console.log(this.districtData);
  })
}
else if(this.userTypeId == 5)
{
  this.Table_two = true;
  const emis_id = 9;
  var month = this.month_value;
  var year = this.year_value;
  this.schl.get_fitIndia_DistrictReport(emis_id,month,year,distid).subscribe((res)=>
  {
    this.districtData = res.List;
    console.log(this.districtData);
  });

}
}

getBlockDetails(blkid){
  if(this.userTypeId == 6)
  {
    this.Table_three = true;
    var emis_id = this.userTypeId;
    var month = this.month_value;
    var year = this.year_value;
    this.schl.get_fitIndia_BlockReport(emis_id,month,year,blkid).subscribe((res)=>
    {
      this.blkData = res.List;
      console.log(this.blkData);
    })
  }
  else if (this.userTypeId == 9 || this.userTypeId == 3){
    const emis_id = 6;
    var month = this.month_value;
    var year = this.year_value;
    this.schl.get_fitIndia_BlockReport(emis_id,month,year,blkid).subscribe((res)=>
    {
      this.blkData = res.List;
      console.log(this.blkData);
    });
  }
  else if(this.userTypeId == 5)
  {
    this.Table_three = true;
    const emis_id = 6;
    var month = this.month_value;
    var year = this.year_value;
    console.log(blkid);
    this.schl.get_fitIndia_BlockReport(emis_id,month,year,blkid).subscribe((res)=>
    {
      this.blkData = res.List;
      console.log(this.blkData);
    })
  }
}

getschoolStatereports(){
  this.exportExcelData = [];
  return this.StateData.map(item =>{
    return{
      'District' : item.district_name,
      'PS':item.Pri_Total,
      'MS':item.Mid_Total,
      'HS':item.High_Total,
      'HSS':item.HSS_Total,
      'School_PS':item.Pri_Certified,
      'School_MS':item.Mid_Certified,
      'School_HS':item.High_Certified,
      'School_HSS':item.HSS_Certified,
      'School_3Star_PS':item.Pri_3star,
      'School_3Star_MS':item.Mid_3star,
      'School_3Star_HS':item.High_3star,
      'School_3Star_HSS':item.HSS_3star,
      'School_5Star_PS':item.Pri_5star,
      'School_5Star_MS':item.Mid_5star,
      'School_5Star_HS':item.High_5star,
      'School_5Star_HSS':item.HSS_5star,
      
    }
  });
}

exportExcel() {
import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschoolStatereports());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
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

getschoolBlockreports(){
  this.exportExcelData1 = [];
  return this.districtData.map(item =>{
    return{
      'Block' : item.block_name,
      'PS':item.Pri_Total,
      'MS':item.Mid_Total,
      'HS':item.High_Total,
      'HSS':item.HSS_Total,
      'School_PS':item.Pri_Certified,
      'School_MS':item.Mid_Certified,
      'School_HS':item.High_Certified,
      'School_HSS':item.HSS_Certified,
      'School_3Star_PS':item.Pri_3star,
      'School_3Star_MS':item.Mid_3star,
      'School_3Star_HS':item.High_3star,
      'School_3Star_HSS':item.HSS_3star,
      'School_5Star_PS':item.Pri_5star,
      'School_5Star_MS':item.Mid_5star,
      'School_5Star_HS':item.High_5star,
      'School_5Star_HSS':item.HSS_5star,
      
    }
  });
}

exportExcel1() {
import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschoolBlockreports());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
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
getschoolreports(){
  this.exportExcelData2 = [];
  return this.blkData.map(item =>{
    return{
      'School Name' : item.Sch_Name,
      'UDISE Code':item.UDISE,
      'Category':item.Category,
      'Certified':item.Certified,
      'Participated':item.Participated,
      'Number of Students Participated' : item.Students_Participated,
      'Number of Flags Won' : item.Flags_won,
      'Ratings' : item.Rating,
      'Number of Photos uploaded' : item.Photos,
      'Number of Videos uploaded' : item.Videos,
    }
  });
}

exportExcel2() {
import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getschoolreports());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
  });
}
saveAsExcelFile2(buffer: any, fileName: string): void {
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
