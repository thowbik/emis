import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { CeoService } from '../ceo.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-pla-inspection',
  templateUrl: './pla-inspection.component.html',
  styleUrls: ['./pla-inspection.component.css']
})
export class PlaInspectionComponent implements OnInit {
  pipe = new DatePipe('en-US');
  // PLA Inspection
  form: FormGroup;
  inspectiondataDist: any;
  inspectiondataBlock: any;
  inspectiondataSchool: any;
  noData:boolean=false;
  exportExcelData: any[];
  usertypeId: any;
  todayDate:string
  grandTotal_BRTE:any;
  grandTotal_BEO:any;
  grandTotal_CEO:any;
  grandTotal_DEO:any;
  grandTotal_Total:any;
  grandTotal_state:any;
  dataHeader: { field: string; header: string; widthstyle: string;class:string }[];
  dataHeader2: { field: string; header: string; widthstyle: string;class:string }[];
  dataHeader3: { field: string; header: string; widthstyle: string;class:string }[];
  result: any;
  pageStage:Number
  attendanceCompleted:any
  noData3:boolean
  noData2:boolean
  dist_id:string=""
  blck_id=""
  districtname:string=""
  schoolname:string=""
  blockname:string=""
  districtid:string=""
  constructor(private fb:FormBuilder,private alertService:AlertService,private ceo:CeoService,private user:UserSessionService) { 
    this.usertypeId = this.user.userTypeId();
    this.districtid = this.user.districtId();
  }

  ngOnInit() {

    
    this.todayDate = new Date().toISOString().split('T')[0];

    // PLA Inspection

    this.initialValidators();
    this.form.patchValue({
      date:this.todayDate
    })

    if(this.usertypeId==6 || this.usertypeId==10)
    {
      this.pageStage=3;
      this.onSubmit()
    }
    else if(this.usertypeId==9 || this.usertypeId==3)
    {
     
         this.pageStage=2
         this.onSubmit()
    }
    else if(this.usertypeId==5)
    {
     
        this.pageStage=1
        this.onSubmit()
    }

    // this.getInspectionData()

     // For State Login
     this.dataHeader = [
      { field: 'District', header: 'District Name', widthstyle: '11em',class:'text-center' },
      { field: 'inspection_DATE', header: ' Inspection Date', widthstyle: '11em',class:'text-center' },
      { field: 'BRTE', header: 'BRTE', widthstyle: '6em', class:'text-center'},
      { field: 'BEO', header: 'BEO', widthstyle: '6em',class:'text-center' },
      { field: 'CEO', header: 'CEO', widthstyle: '6em',class:'text-center' },
      { field: 'DEO', header: 'DEO', widthstyle: '6em',class:'text-center' },
      { field: 'state', header: 'State', widthstyle: '6em',class:'text-center' },
      { field: 'total_count', header: 'Total Count', widthstyle: '9em',class:'text-center' },
    ];  

    
    // For CEO And DC Login
    this.dataHeader2 = [
      { field: 'Block', header: 'Block Name', widthstyle: '11em',class:'text-center' },
      { field: 'inspection_DATE', header: ' Inspection Date', widthstyle: '11em',class:'text-center' },
      { field: 'BRTE', header: 'BRTE', widthstyle: '6em', class:'text-center'},
      { field: 'BEO', header: 'BEO', widthstyle: '6em',class:'text-center' },
      { field: 'CEO', header: 'CEO', widthstyle: '6em',class:'text-center' },
      { field: 'DEO', header: 'DEO', widthstyle: '6em',class:'text-center' },
      { field: 'state', header: 'State', widthstyle: '6em',class:'text-center' },
      { field: 'total_count', header: 'Total Count', widthstyle: '9em',class:'text-center' },
    ];
    // For DEO and BEO Login
    this.dataHeader3 = [
      { field: 'UDISE', header: ' UDISE', widthstyle: '11em',class:'text-center' },
      { field: 'school_name', header: ' School Name', widthstyle: '11em',class:'text-center' },
      { field: 'inspection_DATE', header: ' Inspection Date', widthstyle: '11em',class:'text-center' },
      { field: 'BRTE', header: 'BRTE', widthstyle: '6em', class:'text-center'},
      { field: 'BEO', header: 'BEO', widthstyle: '6em',class:'text-center' },
      { field: 'CEO', header: 'CEO', widthstyle: '6em',class:'text-center' },
      { field: 'DEO', header: 'DEO', widthstyle: '6em',class:'text-center' },
      { field: 'state', header: 'State', widthstyle: '6em',class:'text-center' },
      { field: 'total_count', header: 'Total Count', widthstyle: '9em',class:'text-center' },
    ];


  
  }

  initialValidators() {
    //  =>  PLA Inspection Form Initiate
    this.form = this.fb.group({
      'date': new FormControl('', Validators.required),
      "dist_id":new FormControl(''),
      "blck_id":new FormControl('')
    });
  }

  onSubmit()
  {
    debugger
 if (this.form.valid) {
   if(this.usertypeId==5)
   {
   if(this.dist_id=="" && this.blck_id=="")
   {
   this.getInspectionData()
   }
   else if(this.dist_id!="" && this.blck_id==""){
     this.redirectToBlock(this.dist_id,this.districtname)
   }
   else if(this.dist_id!="" && this.blck_id!=""){
     this.redirectToSchool(this.blck_id,this.blockname)
   }
 }
 else  if(this.usertypeId==6 || this.usertypeId==10)
 {
    if(this.dist_id=="" && this.blck_id==""){
     this.redirectToSchool(this.blck_id,this.blockname)
   }
 }
 else  if(this.usertypeId==9 || this.usertypeId==3)
 {
   if(this.dist_id=="" && this.blck_id==""){
     this.redirectToBlock(this.dist_id,this.districtname)
   }
   if(this.dist_id=="" && this.blck_id!=""){
     this.redirectToSchool(this.blck_id,this.blockname)
   }
 }
 }
 else {
   this.alertService.error("Please Select Date");
 }
}
  getInspectionData()
  {
    var date = this.form.value.date;
      let pla_inspection_values = { "records": [{ "date": date,"dist_id":this.dist_id ,"blck_id":this.blck_id}] }
      this.ceo.getPLAInspection(pla_inspection_values).subscribe(res => {
          this.inspectiondataDist = [];
          this.result=res.data;
          this.pageStage=1
          if( this.result.length > 0)
          {
          this.inspectiondataDist =  this.result
          this.noData = false;
          this.grandTotal_BRTE = this.inspectiondataDist.map(c => c.BRTE === '' ? 0 : Number(c.BRTE)).reduce((sum, current) => sum + current);
          this.grandTotal_BEO = this.inspectiondataDist.map(c => c.BEO  === '' ? 0 : Number(c.BEO)).reduce((sum, current) => sum + current);
          this.grandTotal_CEO = this.inspectiondataDist.map(c => c.CEO === '' ? 0 : Number(c.CEO)).reduce((sum, current) => sum + current);
          this.grandTotal_DEO = this.inspectiondataDist.map(c => c.DEO === '' ? 0 : Number(c.DEO)).reduce((sum, current) => sum + current);
          this.grandTotal_state = this.inspectiondataDist.map(c => c.state === '' ? 0 : Number(c.state)).reduce((sum, current) => sum + current);
          this.grandTotal_Total = this.inspectiondataDist.map(c => c.total_count === '' ? 0 : Number(c.total_count)).reduce((sum, current) => sum + current);
        }
        else {

          this.noData = true;
        }
      })
    }

  redirectToBlock(districtid,districtname)
  {
    debugger
    this.dist_id=districtid
    this.districtname=districtname
    var date = this.form.value.date;
    let pla_inspection_values = { "records": [{ "date": date,"dist_id": this.dist_id }] }
    this.ceo.getPLAInspection(pla_inspection_values).subscribe(res => {
        this.inspectiondataBlock = [];
        var inspectionBlockResult=res.data;
        this.pageStage=2
        if(inspectionBlockResult.length > 0)
        {
         
        this.inspectiondataBlock =  inspectionBlockResult
        this.noData2 = false;
        this.grandTotal_BRTE = this.inspectiondataBlock.map(c => c.BRTE === '' ? 0 : Number(c.BRTE)).reduce((sum, current) => sum + current);
        this.grandTotal_BEO = this.inspectiondataBlock.map(c => c.BEO  === '' ? 0 : Number(c.BEO)).reduce((sum, current) => sum + current);
        this.grandTotal_CEO = this.inspectiondataBlock.map(c => c.CEO === '' ? 0 : Number(c.CEO)).reduce((sum, current) => sum + current);
        this.grandTotal_DEO = this.inspectiondataBlock.map(c => c.DEO === '' ? 0 : Number(c.DEO)).reduce((sum, current) => sum + current);
        this.grandTotal_state = this.inspectiondataBlock.map(c => c.state === '' ? 0 : Number(c.state)).reduce((sum, current) => sum + current);
        this.grandTotal_Total = this.inspectiondataBlock.map(c => c.total_count === '' ? 0 : Number(c.total_count)).reduce((sum, current) => sum + current);

      }
      else {

        this.noData2 = true;
      }
    })
  }

  redirectToSchool(blockid,blockname)
  {
    debugger
    this.blck_id=blockid
    this.blockname=blockname
    var date = this.form.value.date;
    let pla_inspection_values = { "records": [{ "date": date,"blck_id":this.blck_id }] }
    this.ceo.getPLAInspection(pla_inspection_values).subscribe(res => {
        this.inspectiondataSchool = [];
        var inspectionSchoolResult=res.data;
        this.pageStage=3
        if(inspectionSchoolResult.length > 0)
        {
         
        this.inspectiondataSchool =  inspectionSchoolResult
        this.noData3 = false;
        this.grandTotal_BRTE = this.inspectiondataSchool.map(c => c.BRTE === '' ? 0 : Number(c.BRTE)).reduce((sum, current) => sum + current);
        this.grandTotal_BEO = this.inspectiondataSchool.map(c => c.BEO  === '' ? 0 : Number(c.BEO)).reduce((sum, current) => sum + current);
        this.grandTotal_CEO = this.inspectiondataSchool.map(c => c.CEO === '' ? 0 : Number(c.CEO)).reduce((sum, current) => sum + current);
        this.grandTotal_DEO = this.inspectiondataSchool.map(c => c.DEO === '' ? 0 : Number(c.DEO)).reduce((sum, current) => sum + current);
        this.grandTotal_state = this.inspectiondataSchool.map(c => c.state === '' ? 0 : Number(c.state)).reduce((sum, current) => sum + current);
        this.grandTotal_Total = this.inspectiondataSchool.map(c => c.total_count === '' ? 0 : Number(c.total_count)).reduce((sum, current) => sum + current);
      }
      else {
        this.noData3= true;
      }
    })
  }
  

 //excel
 getInspectiondetailsDist(){
  this.exportExcelData = [];
  this.inspectiondataDist.map(item => {
    return {
      'District Name':item.District,
      'Inspection Date': item.inspection_DATE,
      'BRTE': item.BRTE,
      'BEO': item.BEO ,
      'CEO':item.CEO,
      'DEO' :item.DEO ,
      'State' :item.state ,
      'Total Count': item.total_count
    }
  }).forEach(item => this.exportExcelData.push(item));
  let inspectiondataDistReport = [];
  for (let schoolwithoutdata of this.exportExcelData) {
    inspectiondataDistReport.push(schoolwithoutdata);
  }
  return inspectiondataDistReport;
 }
 getInspectiondetailsBlock(){
  this.exportExcelData = [];
  this.inspectiondataBlock.map(item => {
    return {
      'Block Name':item.Block,
      'Inspection Date': item.inspection_DATE,
      'BRTE': item.BRTE,
      'BEO': item.BEO ,
      'CEO':item.CEO,
      'DEO' :item.DEO ,
      'State' :item.state ,
      'Total Count': item.total_count
    }
  }).forEach(item => this.exportExcelData.push(item));
  let inspectiondataBlockReport = [];
  for (let schoolwithoutdata of this.exportExcelData) {
    inspectiondataBlockReport.push(schoolwithoutdata);
  }
  return inspectiondataBlockReport;
 }
 getInspectiondetailsSchool(){
  this.exportExcelData = [];
  this.inspectiondataSchool.map(item => {
    return {
      'UDISE':item.UDISE,
      'School Name':item.school_name,
      'Inspection Date': item.inspection_DATE,
      'BRTE': item.BRTE,
      'BEO': item.BEO ,
      'CEO':item.CEO,
      'DEO' :item.DEO ,
      'State' :item.state ,
      'Total Count': item.total_count
    }
  }).forEach(item => this.exportExcelData.push(item));
  let inspectiondataSchoolReport = [];
  for (let schoolwithoutdata of this.exportExcelData) {
    inspectiondataSchoolReport.push(schoolwithoutdata);
  }
  return inspectiondataSchoolReport;
 }

exportExcel(){
  if(this.inspectiondataDist.length > 0 ) {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getInspectiondetailsDist());
      const workbook = { Sheets: { 'PLA-Inspection Reports': worksheet }, SheetNames: ['PLA-Inspection Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "PLA-Inspection Reports");
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
exportExcelBlock(){
  if(this.inspectiondataBlock.length > 0 ) {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getInspectiondetailsBlock());
      const workbook = { Sheets: { 'PLA-Inspection Reports': worksheet }, SheetNames: ['PLA-Inspection Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileBlock(excelBuffer, "PLA-Inspection Reports");
  });
  }
}
saveAsExcelFileBlock(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
exportExcelSchool(){
  if(this.inspectiondataSchool.length > 0 ) {
    import ("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getInspectiondetailsSchool());
      const workbook = { Sheets: { 'PLA-Inspection Reports': worksheet }, SheetNames: ['PLA-Inspection Reports'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileSchool(excelBuffer, "PLA-Inspection Reports");
  });
  }
}
saveAsExcelFileSchool(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
goBack() {
  debugger

  this.pageStage = 1;
  this.blockname = '';
  this.schoolname = '';
  this.districtname = '';
  this.dist_id=""
  this.blck_id=""
  this.getInspectionData()
}
goBack_b() {
  this.pageStage = 2;
  this.schoolname = '';
  this.blockname = '';
  this.blck_id=""
  this.redirectToBlock(this.dist_id,this.districtname)
}

goBack_sc() {
  this.pageStage = 3;
  this.schoolname = '';
  this.redirectToSchool(this.blck_id,this.blockname)
  
}


}
