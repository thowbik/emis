import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StateDashboardService } from '../dashboard.services';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  doc_file: any;
  fileType: any;
  uploadUrl: string | ArrayBuffer;
  image: any;
  constructor(private messageService: MessageService, private dashboardService: StateDashboardService) { }

  ngOnInit() {
  }
  onSelectFile(event) {
    debugger;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 1000000000) {
        this.doc_file =  event.target.files;
        var fileName = event.target.files[0].name;
        var splittedName = fileName.split(".");
        this.fileType = splittedName[1];
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          debugger;
          this.uploadUrl= fileReader.result;
          var bucketName= "renewalapplicationemis";
          var filename = splittedName[0];
          var ext = splittedName[1];
          let expiry:number = 300;
          this.dashboardService.getSignedUrl(bucketName,ext,filename,expiry).subscribe((result) => {
            if (result) {
              // const formData = new FormData();
              // formData.append('file', this.doc_file);
              let files: FileList =this.doc_file;
              let file : File = files[0];
              this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
                debugger;
                this.getUploadedFiles(result.key);
              });
              debugger;
              this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
            }
            else {
              this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
            }
          });
        };
      } else {
        this.messageService.add({severity:'warn', summary: 'File Can`t uploaded because Image size should not exceed 1GB', detail:''});
      }
    }
  }
  getUploadedFiles(filename) {
    debugger;
    var bucketName= "renewalapplicationemis";
    var filename = filename;
    let expiry:number = 1800;
    this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
      if (result) {
        debugger;
        this.image = result.url;
        // this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
      }
      else {
        this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
      }
    });
  }
}
