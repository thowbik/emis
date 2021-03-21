import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserSessionService } from 'src/services/usersession.service';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
import { schoolsService } from '../schools.service';
@Component({
  selector: 'app-school-grants',
  templateUrl: './school-grants.component.html',
  styleUrls: ['./school-grants.component.css']
})
export class SchoolGrantsComponent implements OnInit {
  doc_file: any;
  fileType: any;
  uploadUrl: string | ArrayBuffer;
  image: any;
  schoolId: any;
  isPhotoAvailable: boolean = false;
  id:any;
  headerData: any[]=[];
  smcType: number;
  ActionPlanImageKey: any;
  resolutionImageKey: any;
  resolutionIndexID: any;
  actionPlanIndexID: any;
  showImage: boolean;
  products:any[]=[];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
responsiveOptions2:any[] = [
  {
      breakpoint: '1500px',
      numVisible: 5
  },
  {
      breakpoint: '1024px',
      numVisible: 3
  },
  {
      breakpoint: '768px',
      numVisible: 2
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
];
displayBasic: boolean;

displayBasic2: boolean;

displayCustom: boolean;

activeIndex: number = 0;
  showPdfViewer: boolean;
  constructor(private messageService: MessageService, private dashboardService: StateDashboardService,
    private schoolService : schoolsService,
    private userSessionService : UserSessionService) {
      this.schoolId = this.userSessionService.schoolId();
     }

  ngOnInit() {
    this.resolutionIndexID = "0";
    this.actionPlanIndexID = "0";
    this.image = "";
    this.getUploadedFiles();
    this.products =[{
      "label":"Test"
    }]
  }
  onSelectFile(event) {
    debugger;
    var type = this.smcType;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 1000000) {
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
                var records = {};
                var image = result.key;
                if(this.smcType == 1) {
                  this.resolutionImageKey = image;
                  if(this.resolutionIndexID == "0") {
                    records= {"records":{"SchlID":this.schoolId,"FileNam":image,"Typ":type}};
                  }
                  else {
                    records= {"records":{"IndxID":this.resolutionIndexID,"SchlID":this.schoolId,"FileNam":image,"Typ":type}}; 
                  }
                }
                else {
                  this.resolutionImageKey = image;
                  if(this.actionPlanIndexID == "0") {
                    records= {"records":{"SchlID":this.schoolId,"FileNam":image,"Typ":type}};
                  }
                  else {
                    records= {"records":{"IndxID":this.actionPlanIndexID,"SchlID":this.schoolId,"FileNam":image,"Typ":type}}; 
                  }
                } 
                this.schoolService.saveGrants(records).subscribe((res) => {
                  debugger;
                  if(res){
                    this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
                    this.getUploadedFiles();
                 }
                  else {
                    this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
                  }
                })
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

  
  getUploadedFiles() {
    debugger;
    this.schoolService.getGrants(this.schoolId).subscribe((res) => {
      console.log(res.result);
if(res.result && res.result.length > 0) {
  const resolutionData = res.result.filter(element => element.Typ == '1');
  const actionPlanData = res.result.filter(element => element.Typ == '2');
  if(resolutionData.length > 0) {
    this.resolutionImageKey = resolutionData[0].FileNam;
    this.resolutionIndexID = resolutionData[0].IndxId;
  }
  if(actionPlanData.length > 0) {
    this.ActionPlanImageKey = actionPlanData[0].FileNam;
    this.actionPlanIndexID = actionPlanData[0].IndxId;
  }
}
    });
  }
  viewUploadedFile(filename) {
    debugger;
    if(filename) {
    var bucketName= "renewalapplicationemis";
    let expiry:number = 1800;
    this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
      if (result) {
        debugger;
        this.image = result.url;
        const stringToSplit = filename;
        const extension = stringToSplit.split('.');
        if(extension[1] == "PDF") {
          this.showPdfViewer = true;
        }
        else {
          this.showPdfViewer = false;
        }
        this.showImage = true;
      }
      else {
        this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
      }
    });
  }
  else {
    this.messageService.add({severity:'warn', summary: 'No Files Found!', detail:''});
  }
}
  openFile(type){
    this.smcType = type;
    document.querySelector("input").click();
  }
}

