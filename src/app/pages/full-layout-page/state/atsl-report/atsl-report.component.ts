import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from '../state.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-atsl-report',
  templateUrl: './atsl-report.component.html',
  styleUrls: ['./atsl-report.component.css']
})
export class AtslReportComponent implements OnInit {
  form: FormGroup;
  data: any[] = [];
  data1: any[] = [];
  data2: any[] = [];
  selectedColumns: any[] = [];
  selectedColumns1: any[] = [];
  selectedColumns2: any[] = [];
  isDataAvailable: boolean;
  sampleSelectedColumn: Array<Object> = [];
  sampleSelectedColumn1: Array<Object> = [];
  sampleSelectedColumn2: Array<Object> = [];
  mediumlist: any[] = [];
  topiclist: any[] = [];
  medium: any;
  topic: any;
  district: any;
  block: any;
  DropdownVar = 0;
  DropdownVar1 = 0;
  districtId: any;
  blockId: any;
  schoolcatdata: any;
  usertypeId: any
  private Math = Math;
  cateType: any;

  scorecarddata: any;
  school_type_id: number;
  cate_type: any;
  exportExcelData: any[] = [];
  scoredetails: number;
  districtName : any;
  blkname : any;
  pageStage : any;

  constructor(public router: Router, public stateService: StateService,
    private fb: FormBuilder,
    private userSessionService: UserSessionService) {
      debugger
    this.usertypeId = this.userSessionService.userTypeId();
    this.cateType = this.userSessionService.cateType();
    console.log(this.cateType);
    this.districtId = this.userSessionService.districtId();
    this.blockId = this.userSessionService.blockId();
  }

  ngOnInit() {
    this.headerData();
    this.form = this.fb.group(
      {
        medium: ['', Validators.required],
        topic: ['', Validators.required]
      });
    this.mediumlist = [
      { "value": "16", "label": "Tamil" },
      { "value": "19", "label": "English" },
    ];
    this.topiclist = [
      { "value": "Topic1", "label": "Tamil" },
      { "value": "Topic2", "label": "English" },
      { "value": "Topic3", "label": "Logical" },
      { "value": "Topic4", "label": "Numerical" },
      { "value": "Topic5", "label": "Scientific" },
      { "value": "Topic6", "label": "Spatial" },
    ];
    this.form.controls['medium'].setValue("16");
    this.form.controls['topic'].setValue("Topic1");
    this.defaultData();

   
 this.scorecarddata = [
      { field : "name", header : "Student Name"},
      { field : "class_id", header : "Class"},
      { field : "Medium_", header : "Medium "},
      { field : "Topic1", header : "Tamil "},
      { field : "Topic2", header : "English "},
      { field : "Topic3", header : "Logical"},
      { field : "Topic4", header : "Numerical "},
      { field : "Topic5", header : "Scientific "},
      { field : "Topic6", header : "Spatial"},
      { field : "Total", header : "Total"}
   
    ]

  }

  headerData() {
    this.selectedColumns = [
      { field: 'district_name', header: 'District' },
      { field: 'Score_0', header: 'Score 0' },
      { field: 'Score_1_5', header: 'Score 1-5' },
      { field: 'Score_6_10', header: 'Score 6 - 10' },
      { field: 'Score_11_15', header: 'Score 11-15' },

    ];
    this.sampleSelectedColumn = this.selectedColumns;

    this.selectedColumns1 = [
      { field: 'block_name', header: 'Block' },
      { field: 'udise_code', header: 'UDISE Code' },
      { field: 'school_name', header: 'School Name' },
      { field: 'Score_0', header: 'Score 0' },
      { field: 'Score_1_5', header: 'Score 1-5' },
      { field: 'Score_6_10', header: 'Score 6 - 10' },
      { field: 'Score_11_15', header: 'Score 11-15' }
    ];
    this.sampleSelectedColumn1 = this.selectedColumns1;

    this.selectedColumns2 = [
      { field: 'Score_0', header: 'Score 0' },
      { field: 'Score_1_5', header: 'Score 1-5' },
      { field: 'Score_6_10', header: 'Score 6 - 10' },
      { field: 'Score_11_15', header: 'Score 11-15' }
    ];
    this.sampleSelectedColumn2 = this.selectedColumns2;
  }

  defaultData() {
    debugger;
    if (this.usertypeId == 1 && (this.cateType == 'Higher Secondary School' || this.cateType == 'High School')) {
      this.getATSLStudentWisedata();

    }
    if (this.usertypeId == 5) {
      this.medium = this.form.value.medium = 16;
      this.topic = this.form.value.topic = 'Topic1';
      this.stateService.getATSLDistList(this.medium, this.topic).subscribe((res) => {
        if (res) {
          this.data = res.data;
          console.log(this.data);
        }
      });
    } else if (this.usertypeId == 9 || this.usertypeId == 10) {
      this.district = this.districtId;
      this.medium = this.form.value.medium = 16;
      this.topic = this.form.value.topic = 'Topic1';
      this.stateService.getATSLBlockList(this.district, this.medium, this.topic).subscribe((res) => {
        if (res) {
          this.data1 = res.data;
          console.log(this.data);
        }
      });
    } else {
      this.block = this.blockId;
      this.medium = this.form.value.medium = 16;
      this.topic = this.form.value.topic = 'Topic1';
      this.stateService.getATSLSchoolList(this.block, this.medium, this.topic).subscribe((res) => {
        if (res) {
          this.data2 = res.data;
        }
      });
    }
  }

  getData() {
    debugger;
    if (this.usertypeId == 5) {
      this.medium = this.form.value.medium,
        this.topic = this.form.value.topic
      this.stateService.getATSLDistList(this.medium, this.topic).subscribe((res) => {
        if (res) {
          this.data = res.data;
          console.log(this.data);
        }
      });
    } else if (this.usertypeId == 9 || this.usertypeId == 10) {
      this.district = this.districtId;
      this.medium = this.form.value.medium,
        this.topic = this.form.value.topic
      this.stateService.getATSLBlockList(this.district, this.medium, this.topic).subscribe((res) => {
        if (res) {
          this.data1 = res.data;
          console.log(this.data);
        }
      });
    } else {
      this.block = this.blockId;
      this.medium = this.form.value.medium,
        this.topic = this.form.value.topic
      this.stateService.getATSLSchoolList(this.block, this.medium, this.topic).subscribe((res) => {
        if (res) {
          this.data2 = res.data;
        }
      });
    }
  }

  getBlockData(e, DropdownVar,name) {
    this.districtName = name;
    this.pageStage = 2;
    this.district = e.district_id;
    this.medium = this.form.value.medium,
      this.topic = this.form.value.topic
    this.stateService.getATSLBlockList(this.district, this.medium, this.topic).subscribe((res) => {
      if (res) {
        this.data1 = res.data;
      }
    });
  
  }

  getSchoolData(e, DropdownVar,name) {
    this.pageStage = 3;
    this.block = e.block_id;
    this.blkname = name;
    this.medium = this.form.value.medium,
      this.topic = this.form.value.topic
    this.stateService.getATSLSchoolList(this.block, this.medium, this.topic).subscribe((res) => {
      if (res) {
        this.data2 = res.data;
      }
    });
  }

  /* by kamala*/
  getDistrictreports(){
    this.exportExcelData = [];
    return this.data.map(item =>{
      return{
        'District Name' : item.district_name,
        'Score-0-#' : item.Score_0,
        'Score-0-%':(item.Score_0/item.Total*100).toFixed(),
        'Score-1to5-#':item.Score_1_5,
        'Score-1to5-%':(item.Score_1_5/item.Total*100).toFixed(),
        'Score-6to10-#':item.Score_6_10,
        'Score-6to10-%':(item.Score_6_10/item.Total*100).toFixed(),
        'Score-11to15-#':item.Score_11_15,
        'Score-11to15-%':(item.Score_11_15/item.Total*100).toFixed(),
        'Total':item.Total,
        'Total-%':(item.Total/item.Total*100).toFixed()
       

      }
    });
  }

  exportExcel() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getDistrictreports());
          const workbook = { Sheets: { 'District List': worksheet }, SheetNames: ['District List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ATSL-DistrictList");
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
//EXCEL BLOCK

getBlockreports(){
  this.exportExcelData = [];
  return this.data1.map(item =>{
    return{
      'Block Name' : item.block_name,
      'UDISE Code' : item.udise_code,
      'School Name' : item.school_name,
      'Score-0-#' : item.Score_0,
      'Score-0-%':(item.Score_0/item.Total*100).toFixed(),
      'Score-1to5-#':item.Score_1_5,
      'Score-1to5-%':(item.Score_1_5/item.Total*100).toFixed(),
      'Score-6to10-#':item.Score_6_10,
      'Score-6to10-%':(item.Score_6_10/item.Total*100).toFixed(),
      'Score-11to15-#':item.Score_11_15,
      'Score-11to15-%':(item.Score_11_15/item.Total*100).toFixed(),
      'Total':item.Total,
      'Total-%':(item.Total/item.Total*100).toFixed()
     

    }
  });
}

exportBlkExcel() {
  import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getBlockreports());
        const workbook = { Sheets: { 'Block List': worksheet }, SheetNames: ['Block List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ATSL-BlockList");
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

//School

getSchlreports(){
  this.exportExcelData = [];
  return this.data2.map(item =>{
    return{
      'Score-0-#' : item.Score_0,
      'Score-0-%':(item.Score_0/item.Total*100).toFixed(),
      'Score-1to5-#':item.Score_1_5,
      'Score-1to5-%':(item.Score_1_5/item.Total*100).toFixed(),
      'Score-6to10-#':item.Score_6_10,
      'Score-6to10-%':(item.Score_6_10/item.Total*100).toFixed(),
      'Score-11to15-#':item.Score_11_15,
      'Score-11to15-%':(item.Score_11_15/item.Total*100).toFixed(),
      'Total':item.Total,
      'Total-%':(item.Total/item.Total*100).toFixed()
    }
  });
}

exportSchlExcel() {
  import ("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getSchlreports());
        const workbook = { Sheets: { 'School List': worksheet }, SheetNames: ['School List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ATSL-SchoolList");
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


 getATSLStudentWisedata(){
   debugger;
    this.stateService.getStudentData().subscribe(res =>{
      this.scorecarddata = res.data.ATLS_std_Report;
      console.log(this.scorecarddata);
    })
}

goBack()
{
  if(this.usertypeId == 5 && this.usertypeId != 9 && this.usertypeId != 10 && this.usertypeId != 6)
  {
  this.pageStage = 1 ;
  this.districtName = '';
  this.blkname = '';
  }
}

goBack1()
{
  this.pageStage = 2
  this.blkname =  '';
 
}
}
