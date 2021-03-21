import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
import { CeoService } from '../ceo.service';

@Component({
  selector: 'app-competation-reports',
  templateUrl: './competation-reports.component.html',
  styleUrls: ['./competation-reports.component.css']
})
export class CompetationReportsComponent implements OnInit {
  userTypeId: number;
  dataHeader1: any[] = [];
  districtid: any
  blockid: any
  eduDistId: any
  competitionForm: FormGroup
  competitionNames: any
  competitionResults
  exportExcelData: any[];
  RankSelection: any[]
  noData: boolean = false
  editing:boolean=false
  id:any
  competitionData: any;
  doc_file: any;
  fileType: any;
  uploadUrl: string | ArrayBuffer;
  image: any;
  displayEditDialog:boolean=false
  schoolId:any
  constructor(
    private userSessionService: UserSessionService,
    private ceo: CeoService,
    private fb: FormBuilder,
    private alertService:AlertService,
    private dashboardService:StateDashboardService,
    private confirmationService:ConfirmationService
  ) {
    this.userTypeId = this.userSessionService.userTypeId();
    this.districtid = this.userSessionService.districtId()
    this.blockid = this.userSessionService.blockId()
    this.eduDistId = this.userSessionService.eduDistId()
    this.schoolId = this.userSessionService.schoolId();
    console.log("this.districtid",this.districtid,"this.blockid",this.blockid, "this.eduDistId",this.eduDistId);
  }

  ngOnInit() {

    this.initVaidators()
    this.dropdownList()
    

  }
  dropdownList() {
    this.competitionNames = [
      { label: "Essay Tamil", value: "1" },
      { label: "Speech Tamil", value: "2" },
      { label: "Quiz", value: "3" },
      { label: "Wall Painting", value: "4" },
      { label: "Yoga Olympiad", value: "5" },
      { label: "Rangotsav", value: "6" }
    ];

    this.RankSelection = [
      { label: 'Participation Only', value: 0 },
      { label: 'First prize', value: 1 },
      { label: 'Second prize', value: 2 },
      { label: 'Third  prize', value: 3 },
      { label: 'Fourth  prize', value: 4 },
      { label: 'Fifth  prize', value: 5 }
    ];
  }
  initVaidators() {
    this.competitionForm = this.fb.group({
      contestid: ["", Validators.required]
    })
  }


  
  onChangeComp() {
    if (this.competitionForm.valid) {
      this.getCompetitionReports()
    }
  }

  getCompetitionReports() {
    var districtid: any
    var eduDistId: any
    var blockid: any
    var schoolId:any
    debugger
    if(this.userTypeId==5 ||  this.userTypeId==3 || this.userTypeId==9 || this.userTypeId==6 || this.userTypeId==10)
    {
     if (this.districtid != undefined) {
      districtid = this.districtid
    }
    else {
      districtid = 0
    }
    if (this.eduDistId != undefined) {
      eduDistId = this.eduDistId
    }
    else {
      eduDistId = 0
    }
    if (this.blockid != undefined) {
      blockid = this.blockid
    }
    else {
      blockid = 0
    }
    if(this.schoolId != undefined)
    {
      schoolId=this.schoolId
    }
    else{
      schoolId = 0
    }
  }
  else if(this.userTypeId == 1)
  {
     districtid= 0
     eduDistId=0
     blockid=0
     schoolId=this.schoolId
  }
  var contestid = this.competitionForm.value.contestid
    this.ceo.getCompetitionReports(districtid,eduDistId,blockid,schoolId, contestid).subscribe(res => {
      this.competitionResults=[]
      this.competitionData=[]
      var competitionData = res
      competitionData.map((x) => (x["EmisID"] = x["EmisID"].toString()));
      competitionData.map((x) => (x["UDISE"] = x["UDISE"].toString()));
      this.competitionData=competitionData
      debugger
      if (this.competitionData.length > 0) {
        this.noData = false;
        // District Login
        if(this.userTypeId==3)
        {
          debugger
          this.competitionData.map((x) => (x["rank"] = x["DstRnk"] ));
          this.competitionData.map((x) => (x["filename"] = x["dist_file_name"] ));
        }
          // ceo Login
        else if(this.userTypeId==9)
        {
          debugger
          this.competitionData.map((x) => (x["rank"] = x["DstRnk"] ));
          this.competitionData.map((x) => (x["filename"] = x["dist_file_name"] ));
        }
        // State Login
        else if(this.userTypeId==5)
        {
          this.competitionData.map((x) => (x["rank"] = x["StatRnk"] ));
        }
        // deo Login
        else if(this.userTypeId==10)
        {
          debugger
          this.competitionData.map((x) => (x["rank"] = x["EduRnk"] ));
          this.competitionData.map((x) => (x["filename"] = x["edu_dist_file_name"] ));
        }
        // beo Login
        else if(this.userTypeId==6)
        {
          this.competitionData.map((x) => (x["rank"] = x["BlkRnk"] ));
        }
        else if(this.userTypeId==1)
        {
          this.competitionData.map((x) => (x["rank"] = x["SchRnk"] ));
        }
        this.competitionResults = this.competitionData;


      }
      else {
        this.noData = true;
      }

    })
  }
  getCompetitionDataReport() {
    this.exportExcelData = [];
    this.competitionResults.map(item => {

      if (this.userTypeId == 5) {
        return {
          'District Name': item.DistName,
          'Education District Name': item.EduDist,
          'Block Name': item.BlkName,
          'UDISE': item.UDISE,
          "School Name": item.SchName,
          'Emis Id': item.EmisID,
          'Student Name': item.StdName,
          'Class': item.ClassID,
          "CntsID": item.CntsID,
          'State Prize': item.StatRnk,
        }
      }
      else if (this.userTypeId == 9  || this.userTypeId == 3) {
        return {
          'Education District Name': item.EduDist,
          'Block Name': item.BlkName,
          'UDISE': item.UDISE,
          "School Name": item.SchName,
          'Emis Id': item.EmisID,
          'Student Name': item.StdName,
          'Class': item.ClassID,
          "CntsID": item.CntsID,
          'District Prize': item.DstRnk,
        }
      }
      else if (this.userTypeId == 10) {
        return {
          'Block Name': item.BlkName,
          'UDISE': item.UDISE,
          "School Name": item.SchName,
          'Emis Id': item.EmisID,
          'Student Name': item.StdName,
          'Class': item.ClassID,
          "CntsID": item.CntsID,
          'Education District Prize': item.EduRnk,
        }
      }
      else if (this.userTypeId == 6) {
        return {
          'UDISE': item.UDISE,
          "School Name": item.SchName,
          'Emis Id': item.EmisID,
          'Student Name': item.StdName,
          'Class': item.ClassID,
          "CntsID": item.CntsID,
          'Block Prize': item.BlkRnk,
        }
      }
      else if (this.userTypeId == 1) {
        return {
          'Emis Id': item.EmisID,
          'Student Name': item.StdName,
          'Class': item.ClassID,
          "CntsID": item.CntsID,
          'School Prize': item.SchRnk,
        }
      }
    }).forEach(item => this.exportExcelData.push(item));
    let compReport = [];
    for (let data of this.exportExcelData) {
      compReport.push(data);
    }
    return compReport;
  }
  exportExcel() {
    if (this.competitionResults.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCompetitionDataReport());
        const workbook = { Sheets: { 'Competition Reports': worksheet }, SheetNames: ['Competition Reports'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Competition Reports");
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

  savingWinner(comp) {

    var id=comp.indxId
    var Rank=comp.rank
    var winnerRank
   
    if(this.userTypeId==3 || this.userTypeId == 9 || this.userTypeId==10)
    {
      if(Rank>0)
      {
      winnerRank = { "records": { "ID": id,"Rank":Rank,"filename":comp.filename } }
      }
      else{
        winnerRank = { "records": { "ID": id,"Rank":Rank,filename:null } }
      }
    }
    else{
      winnerRank = { "records": { "ID": id,"Rank":Rank } }
    }
  
 

    this.ceo.updateCompetitionRank(winnerRank).subscribe(res => {
      this.alertService.success(res["message"]);
      this.onChangeComp()
  })

  }

  // File Upload
  onSelectFile(event,filedata) {

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
               
                filedata.filename = result.key ;
                
              
                this.savingWinner(filedata)
              });
              
            this.alertService.success("File Uploaded Successfully")
           
            }
            else {
              this.alertService.error("Error in Uploading File please try again")
           
            }
          });
        };
      } else {
        this.alertService.error("File Can`t uploaded because Image size should not exceed 1GB")
        // this.messageService.add({severity:'warn', summary: 'File Can`t uploaded because Image size should not exceed 1GB', detail:''});
      }
    }
  }
  getUploadedFiles(getfilename) {
    var bucketName= "renewalapplicationemis";
    var filename = getfilename.filename;
    let expiry:number = 1800;
    if(filename!=null && filename!="")
    {
    this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
      if (result) {
        debugger;
        this.image = result.url;
        this.displayEditDialog=true
        // this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
      }
      else {
        this.alertService.warning("Error in Uploading File please try again")
        // this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
      }
    });
  }
  else{
    this.alertService.error("Please Upload a File")
  }
  }

 
  removeUploadedFiles(data) {
    if(data.filename!=null && data.filename!="")
    {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        data.filename =null ;
        this.savingRemoveImage(data)
       }
  });
}
else{
  this.alertService.error("Please Upload a File")
}
  }

  savingRemoveImage(comp)
 {

    var id=comp.indxId
    var Rank=comp.rank
    var winnerRank
   
    if(this.userTypeId==3 || this.userTypeId == 9 || this.userTypeId==10)
    {
      if(Rank>0)
      {
      winnerRank = { "records": { "ID": id,"Rank":Rank,"filename":comp.filename } }
      }
      else{
        winnerRank = { "records": { "ID": id,"Rank":Rank,filename:null } }
      }
    }
    else{
      winnerRank = { "records": { "ID": id,"Rank":Rank } }
    }
    this.ceo.updateCompetitionRank(winnerRank).subscribe(res => {
      this.alertService.success("File Removed Successfully")
      this.alertService.success(res["message"]);
      this.onChangeComp()
  })

  }
}
