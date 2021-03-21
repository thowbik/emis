import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-udise-monitoring-reports',
  templateUrl: './udise-monitoring-reports.component.html',
  styleUrls: ['./udise-monitoring-reports.component.css']
})
export class UdiseMonitoringReportsComponent implements OnInit {
  MonitoringReportsList: any;
  districtId: any;
  cities: { name: string; code: string; }[];
  public schoolTypeOptions: any[] = [];
  public StateschoolTypeOptions: any[] = [];
  public noDataFound : boolean = false;
  public ceologin :boolean = false;
  stateProfileCompletion: any;
  public ProfileCompletionStatus : any;
  BlockProfileCompletion: any;
  noDataFound3: boolean;
  noDataFound1: boolean;
  pageStage: number;
  SchoolwiseProfileCompletion: any;
  noDataFound2: boolean;
  districtName : any;
  BlockName : any;
  usertypeId : any;
  exportExcelData : any[]=[];

  constructor(private reportsService : ReportsService,private userSessionService : UserSessionService) {
    this.districtId = this.userSessionService.districtId();
    this.usertypeId = this.userSessionService.userTypeId();

   }

  cols : Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'uside_code', header: 'UDISE Code',widthstyle: '10em'},
   { field: 'schoolName', header: 'School Name',widthstyle: '18em'},
   { field: 'block_name', header: 'Block Name',widthstyle: '10em'},
   { field: 'schoolType', header: 'Basic',widthstyle: '10em'},
   { field: 'Prkg', header: 'School',widthstyle: '8em'},
   { field: 'LKG', header: 'Training' ,widthstyle: '10em'},
   { field: 'UKG', header: 'Committee',widthstyle: '10em' },
   { field: 'class_1', header: 'Land',widthstyle: '7em' },
   { field: 'class_2', header: 'Inventory',widthstyle: '10em' },
   { field: 'class_3', header: 'Funds & Fees',widthstyle: '12em' },
   ];

  ngOnInit() {
    const districtId = this.userSessionService.districtId();
    const userTypeId = this.userSessionService.userTypeId();
    if(userTypeId == "9"){
      this.ceologin = true ;
      this.getMonitoringReports();
    }
    if(userTypeId == "5"){
      this.getStateProfilestatusDetails();
    }
  }
  getStateProfilestatusDetails() {
    this.pageStage = 1;
    this.ceologin = false;
    let  school_type='';
 this.reportsService.getProfileCompletedStatusState(school_type).subscribe((data) => {
  let dropDownList = data.school_type;
   if(data.state_profile_completion_status.length>0){
    this.stateProfileCompletion = data.state_profile_completion_status;
  }
  else
  {
    this.noDataFound = true;
  }
    // Dropdown Values
    if(dropDownList.length>0){
      this.StateschoolTypeOptions.push({ value: "", label: "Choose" })
      for(let i=0; i<dropDownList.length;i++){
        this.StateschoolTypeOptions.push({ value: dropDownList[i].id, label: dropDownList[i].manage_name })
      }
    }
    else
    {
      this.StateschoolTypeOptions.push({ value: "", label: "No Data" })
    }
  });
}
  getBlockhData(distname,name){
    this.pageStage = 2;
    this.districtName = name;
    if(!this.ProfileCompletionStatus){
      this.ProfileCompletionStatus = '';
    }
    this.reportsService.getProfileCompletedBlockState(distname , this.ProfileCompletionStatus).subscribe((res) => {
       if(res.district_profile_completion_status.length>0){
       this.BlockProfileCompletion = res.district_profile_completion_status;
     }
     else{
       this.noDataFound1 = true;
     }

    })
  }
  getschoolData(distname,name){
    this.pageStage = 3;
    this.BlockName = name;
    if(!this.ProfileCompletionStatus){
      this.ProfileCompletionStatus = '';
    }
    this.reportsService.getProfileCompletedSchoolStatus(this.ProfileCompletionStatus, distname).subscribe((res) => {
       if(res.block_profile_completion_status.length>0){
       this.SchoolwiseProfileCompletion = res.block_profile_completion_status;
     }
     else{
       this.noDataFound2 = true;
     }

    })
  }
  getMonitoringReports(){
     let distrctID=this.districtId, school_type='';
    this.reportsService.getMonitoringReportsList(distrctID , school_type ).subscribe(
      data=> {
        let results = data.profile_completion_status;
        let dropDownList = data.school_type;
        // Fetch data
        if(results.length>0){
          this.MonitoringReportsList = results
        }
        else{
          this.noDataFound = true;
        }
        // Dropdown Values
        if(dropDownList.length>0){
          this.schoolTypeOptions.push({ value: "", label: "Choose" })
          for(let i=0; i<dropDownList.length;i++){
            this.schoolTypeOptions.push({ value: dropDownList[i].id, label: dropDownList[i].manage_name })
          }
        }
        else
        {
          this.schoolTypeOptions.push({ value: "", label: "No Data" })
        }
     }
    )
  }

    // State on select
    StateSchoolTypeOption (event){
      const school_type = event.value;
      this.ProfileCompletionStatus = school_type;
       // const districtId = localStorage.getItem("districtId");
       this.reportsService.getProfileCompletedStatusState(school_type).subscribe((res) => {
        if(res.state_profile_completion_status.length>0){
          this.stateProfileCompletion = res.state_profile_completion_status;
        }
        else
        {
          this.noDataFound = true;
        }
      })
    }

  // on select
  SchoolTypeOption (event){
    const school_type = event.value;
    let distrctID=this.districtId;
    // const districtId = localStorage.getItem("districtId");
    this.reportsService.getMonitoringReportsList(distrctID , school_type ).subscribe((res) => {
      if(res.profile_completion_status.length>0){
        this.MonitoringReportsList = res.profile_completion_status;
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }

  goBack()
  {
    if(this.usertypeId == 5 && this.usertypeId != 9 && this.usertypeId != 10 && this.usertypeId != 6)
    {
    this.pageStage = 1;
    this.districtName = '';
    this.BlockName = '';
  }
}

  goBack1()
  {
    this.pageStage = 2;
    this.BlockName = '';
  }

  //excel
  getExcelData() {
    this.exportExcelData = [];
    this.stateProfileCompletion.map(item => {
      return {
        'District Name': item.district_name,
        'Total School  ': item.total_school,
        'Basic-NotStarted': item.f1notsave,
        'Basic-Saved': item.f1save,
        'Basic-Submit': item.f1finalsubmit,
        'School-NotStarted': item.f2notsave,
        'School-Saved': item.f2save,
        'School-Submit': item.f2finalsubmit,
        'Training-NotStarted': item.f3notsave,
        'Training-Saved': item.f3save,
        'Training-Submit' : item.f3finalsubmit,
        'Committee-NotStarted' : item.f4notsave,
        'Committee-Saved' : item.f4save,
        'Committee-Submit' : item.f4finalsubmit,
        'Land-NotStarted' : item.f5notsave,
        'Land-Saved' : item.f5save,
        'Land-Submit' : item.f5finalsubmit,
        'Inventory-NotStarted' : item.f6notsave,
        'Inventory-Saved' : item.f6save,
        'Inventory-Submit' : item.f6finalsubmit,
        'Funds&fees-NotStarted' : item.f7notsave,
        'Funds&fees-Saved' : item.f7save,
        'Funds&fees-Submit' : item.f7finalsubmit,
        'Funds-NotStarted' : item.f8notsave,
        'Funds-Saved' : item.f8save,
        'Funds-Submit' : item.f8finalsubmit,
        

      
         }
  }).forEach(item => this.exportExcelData.push(item));
    let report = [];
    for(let reportData of this.exportExcelData) {
      report.push(reportData);
    }
    return report;
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getExcelData());
        const workbook = { Sheets: { 'Profile Completion status' : worksheet }, SheetNames: ['Profile Completion status'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer,' (Udise+ Completion status) ');
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

//Block

getExcelBlkData() {
  this.exportExcelData = [];
  this.BlockProfileCompletion.map(item => {
    return {
      'BLock Name': item.block_name,
      'Total School  ': item.total_school,
      'Basic-NotStarted': item.f1notsave,
      'Basic-Saved': item.f1save,
      'Basic-Submit': item.f1finalsubmit,
      'School-NotStarted': item.f2notsave,
      'School-Saved': item.f2save,
      'School-Submit': item.f2finalsubmit,
      'Training-NotStarted': item.f3notsave,
      'Training-Saved': item.f3save,
      'Training-Submit' : item.f3finalsubmit,
      'Committee-NotStarted' : item.f4notsave,
      'Committee-Saved' : item.f4save,
      'Committee-Submit' : item.f4finalsubmit,
      'Land-NotStarted' : item.f5notsave,
      'Land-Saved' : item.f5save,
      'Land-Submit' : item.f5finalsubmit,
      'Inventory-NotStarted' : item.f6notsave,
      'Inventory-Saved' : item.f6save,
      'Inventory-Submit' : item.f6finalsubmit,
      'Funds&fees-NotStarted' : item.f7notsave,
      'Funds&fees-Saved' : item.f7save,
      'Funds&fees-Submit' : item.f7finalsubmit,
      'Funds-NotStarted' : item.f8notsave,
      'Funds-Saved' : item.f8save,
      'Funds-Submit' : item.f8finalsubmit,
      

    
       }
}).forEach(item => this.exportExcelData.push(item));
  let report = [];
  for(let reportData of this.exportExcelData) {
    report.push(reportData);
  }
  return report;
}
exportExcelBlk() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelBlkData());
      const workbook = { Sheets: { 'Block-wise data' : worksheet }, SheetNames: ['Block-wise data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile1(excelBuffer,' (Udise+ Completion status) ');
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

//school 
getExcelSchlData() {
  this.exportExcelData = [];
  this.SchoolwiseProfileCompletion.map(item => {
    return {
      'Udise': item.udise_code,
      'Total School  ': item.total_school,
      'Basic-NotStarted': item.f1notsave,
      'Basic-Saved': item.f1save,
      'Basic-Submit': item.f1finalsubmit,
      'School-NotStarted': item.f2notsave,
      'School-Saved': item.f2save,
      'School-Submit': item.f2finalsubmit,
      'Training-NotStarted': item.f3notsave,
      'Training-Saved': item.f3save,
      'Training-Submit' : item.f3finalsubmit,
      'Committee-NotStarted' : item.f4notsave,
      'Committee-Saved' : item.f4save,
      'Committee-Submit' : item.f4finalsubmit,
      'Land-NotStarted' : item.f5notsave,
      'Land-Saved' : item.f5save,
      'Land-Submit' : item.f5finalsubmit,
      'Inventory-NotStarted' : item.f6notsave,
      'Inventory-Saved' : item.f6save,
      'Inventory-Submit' : item.f6finalsubmit,
      'Funds&fees-NotStarted' : item.f7notsave,
      'Funds&fees-Saved' : item.f7save,
      'Funds&fees-Submit' : item.f7finalsubmit,
      'Funds-NotStarted' : item.f8notsave,
      'Funds-Saved' : item.f8save,
      'Funds-Submit' : item.f8finalsubmit,
      

    
       }
}).forEach(item => this.exportExcelData.push(item));
  let report = [];
  for(let reportData of this.exportExcelData) {
    report.push(reportData);
  }
  return report;
}
exportExcelSchl() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcelSchlData());
      const workbook = { Sheets: { 'Schoolwise data' : worksheet }, SheetNames: ['Schoolwise data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' (Udise+ Completion status) ');
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
})
}

}
