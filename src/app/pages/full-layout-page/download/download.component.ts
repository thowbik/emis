import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StateDashboardService } from '../statedashboard/dashboard.services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  
  col: any;
  cities:any;
  public fileUrl;
  downloadData: any[] = [];
  level_of_report:any;
  report_value:any;
  updated_details:any;
  Mystring:any;
  arrString:any;
  date =  new Date();
  
  constructor(private sanitizer: DomSanitizer,
    private dashboardService: StateDashboardService) { }


    cols : Array<{'field':string,'header':string,'widthstyle':string}> =
    [{ field: '#', header: '#',widthstyle: '0.3em'},
    { field: 'Name of the Report', header: 'Name of the Report',widthstyle: '4em'},
    { field: 'Description', header: 'Description',widthstyle: '6em'},
    { field: 'Updated', header: 'Updated',widthstyle: '2em'},
    { field: 'Download', header: 'Download',widthstyle: '3em'},
    ];
  ngOnInit() {
    
    this.level_of_report = [
      {label: 'Select Level of Report', value: '0'},
      {label: 'School Report', value: '1'},
      {label: 'Student Report', value: '2'},
      {label: 'Teacher Report', value: '3'},
      {label: 'UDISE+ 2019-20',value:'4'},

      ];
    
  
    this.getData();
    // this.col = [
    //   {header:'#'},
    //   {header:'Name of the report'},
    //   {header: 'Fields'},
    //   {header: 'Click to download'}

    // ];

   //const blob = new Blob([this.cols.route], { type: 'application/octet-stream' });
   //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  getData()
  {
    
    this.dashboardService.getDownloadData().subscribe((res) => {
      if (res.dataStatus == true) 
        {
          this.downloadData = res.result;       
        //   this.downloadData.forEach(function (value) {
          
        //    this.updated_details = value['report_name'].split("-", 3);
        //    console.log(this.updated_details);
        // });
        }
    });
  }
  levelCheck(event)
  {
    this.report_value = event.value; 
    this.dashboardService.getDownloadDataByValue(this.report_value).subscribe((res) => {
        if (res.dataStatus == true) {
          this.downloadData = res.result;
        }

  });
  }
 
  
}
