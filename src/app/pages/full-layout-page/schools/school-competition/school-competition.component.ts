import { Component, OnInit } from "@angular/core";
import {FormBuilder,FormControl,FormGroup, Validators,
} from "@angular/forms";
import { MessageService } from "primeng";
import { AlertService } from "src/services/alert.service";
import { UserSessionService } from "src/services/usersession.service";
import { StateDashboardService } from "../../statedashboard/dashboard.services";
import { schoolsService } from "../schools.service";


@Component({
  selector: "app-school-competition",
  templateUrl: "./school-competition.component.html",
  styleUrls: ["./school-competition.component.css"],
})
export class SchoolCompetitionComponent implements OnInit {
  competitionForm: FormGroup;
  value:boolean=false
  valuefile:boolean=false
  competitionNames: any;
  classNames: any;
  classnames: any;
  doc_file: any;
  fileType: any;
  uploadUrl: string | ArrayBuffer;
  image: any;
  isactive: any;
  data: any;
  parentsCheckbox: boolean = false;
  dataHeader: {field: string;header: string;widthstyle: string;class: string;}[];
  competitionReportList: any;
  displayEditDialog: boolean = false;
  displayuploadDialog:boolean =false
  schoolId: any;
  catty_id:any
  classId: any;
  noDataFound: boolean = false;
  classNamesandSections: any;
  assigned_section1: any;
  // private Arraylist: Array<Object> = [];
  private Arraylist: any[] = [];
  private finalSaveArr:any[] = [];
  class_in_roman: any = ["0",  "I",  "II",  "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "LKG", "UKG", "PREKG",
  ];
  Arraylistsample: any;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dashboardService: StateDashboardService,
    private schoolservice: schoolsService,
    private userSessionService: UserSessionService,
    private alertService: AlertService
  ) {
    this.schoolId = this.userSessionService.schoolId();
    this.catty_id = this.userSessionService.catty_id();
  }

  ngOnInit() {
    this.initValidators();
    this.dropdownList();
    this.getClassNames();
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
    this.dataHeader = [
      {field: "name",header: "Student Name",widthstyle: "11em",class: "text-center"},
      {  field: "gender",  header: " Gender", widthstyle: "5em",class: "text-center"},
      { field: "isactive",header: "Participating",widthstyle: "7em",class: "text-center" },
      // {
      //   field: "file",
      //   header: "Upload File",
      //   widthstyle: "19em",
      //   class: "text-center",
      // },
    ];
  }

  initValidators() {
    this.competitionForm = this.fb.group({
      SubCatID: new FormControl("", Validators.required),
      class_id: new FormControl("", Validators.required),
      section: new FormControl("", Validators.required),
    });
  }

  getClassNames() {
    this.schoolservice.getStudentclasslistUsingCattyId(this.schoolId,this.catty_id).subscribe((res) => {
      if (res) {
        var classNamesandSections = res.classdetails;
        console.log(classNamesandSections)
        debugger
        if(this.catty_id==2)
        {
          var result1 =  classNamesandSections
          var result2 = [
            { value: "1"},
            { value: "2"},
            { value: "3" },
            { value: "4" },
            { value: "5" }
          ];
          let result = result1.filter(o1 => result2.some(o2 => o1.value === o2.value));
           this.classNamesandSections= result
        
        }
       else if(this.catty_id==3)
        {
          var result1 =  classNamesandSections
          var result2 = [
            { value: "1"},
            { value: "2"},
            { value: "3" },
            { value: "4" },
            { value: "5"},
            { value: "6"},
            { value: "7" },
            { value: "8" }
          ];
          let result = result1.filter(o1 => result2.some(o2 => o1.value === o2.value));
           this.classNamesandSections= result
        
        }
       else if(this.catty_id==4)
        {
          var result1 =  classNamesandSections
          var result2 = [
            { value: "9"},
            { value: "10"},
          
          ];
          let result = result1.filter(o1 => result2.some(o2 => o1.value === o2.value));
           this.classNamesandSections= result
          
        }
       else if(this.catty_id==5)
        {
          var result1 =  classNamesandSections
          var result2 = [
            { value: "9"},
            { value: "10"},
            { value: "11" },
            { value: "12" }
          ];
          let result = result1.filter(o1 => result2.some(o2 => o1.value === o2.value));
           this.classNamesandSections= result
       
        }
        console.log(result1)
        console.log(result2)
        console.log(this.classNamesandSections)
        if (this.classNamesandSections.length > 0) {
          this.classNames = this.classNamesandSections;
          this.classNames.map(
            (i) => (i["roman"] = this.class_in_roman[i["value"]])
          );
          this.classnames = this.classNames.map((l) => {
            return { label: l.roman, value: l.value };
          });
        } else {
          this.noDataFound = true;
        }
      } else {
        this.noDataFound = true;
      }
    });
  }

  // on changing Competition
  onChangeComp(e) {
  
    this.onsubmit();
  }

  //class onchange event
  onChangeClass(e) {
    let filteredArary = this.classNamesandSections.filter(
      (element) => element.value == e
    );
    console.log(filteredArary);
    var assigned_section1 = filteredArary[0].section;
    var split=assigned_section1.split(",");
    for (let index = 0; index < split.length; index++) {
      split[index] = split[index].trim();
    }
    this.assigned_section1=split.sort()
    console.log(split)
    this.onsubmit();
  }

  onSectionChange(e) {
    this.onsubmit();
  }
  onsubmit() {
      if (this.competitionForm.valid) {
        var results = {
          records: {
            sub_cate_id:this.competitionForm.value.SubCatID,
            class_id: this.competitionForm.value.class_id,
            section: this.competitionForm.value.section.trim(),
            school_id: this.schoolId,
          },
        };
        this.schoolservice.getCompetition(results).subscribe((res) => {
          if (res) {
            this.competitionReportList =[];
    
            var competitionReportList =res.result;
          
            if (competitionReportList.length > 0) {
              // var subCate = this.competitionForm.value.SubCatID;
              //  for (let index = 0; index < competitionReportList.length; index++) {
              //    if(competitionReportList[index].sub_category_id==subCate)
              //    {
              //   competitionReportList.map((x) => (x["isactive"] = x["isactive"] == '1' ? true : false));
              //    }
              //    else {
              //     competitionReportList[index].isactive = false;
              //    }
              //  }
              // competitionReportList.map(x=>x['status'] = (x['is_opted'] == '1') ? true : false );
                competitionReportList.map((x) => (x["status"] = x["isactive"] == "1" ? true : false));
             //   this.competitionReportList = competitionReportList.filter(k => k.sub_category_id == subCate && k.isactive == 1);
               this.competitionReportList = competitionReportList;
            }
          }
        });
      }
    }
  // checkbox selection
  childToggle(e, data) {
    console.log(data)
    console.log("i am in child function", e);
    // this.isactive = e;
    // this.data = data;
    // data.isactive = e;
    data.isactive = data.status == true ? "1" : "0";
    // var dataCheck = data.isactive == true ? "1" : "0";
    debugger
    if(this.competitionForm.value.SubCatID!="4" && this.competitionForm.value.SubCatID!="6")
    {
    if (this.Arraylist && this.Arraylist.length > 0) {
      var index = this.Arraylist.findIndex((element) => element.id == data.id);
      if (index != -1) {
        this.Arraylist[index].isactive = data.isactive;
      } else {
        this.Arraylist.push(data);
      }
    } else {
      this.Arraylist.push(data);
    }
  }
  else{
  debugger
    if (this.Arraylist && this.Arraylist.length > 0) {
      var index = this.Arraylist.findIndex((element) => element.id == data.id);
      if (index != -1) {
        this.Arraylist[index].isactive = data.isactive;
        if(data.isactive=="0")
        {
          this.Arraylist[index].attachment_file_name = "";
        }
      } else {
        if(data.isactive=="0")
        {
          data.attachment_file_name=""
        }
        this.Arraylist.push(data);
      }
    } else {
      if(data.isactive=="0")
      {
        data.attachment_file_name=""
      }
      this.Arraylist.push(data);
    }
  }
    console.log(this.Arraylist);
  }


  onSubmitData() {
    console.log(this.Arraylist);
    this.Arraylist.forEach((val, inx) => {
      if (val["scp_id"] != null) {
        this.finalSaveArr.push({
          IndxId: val["scp_id"],
          SchlID: this.schoolId,
          Gendr: val["gender"],
          StudID: val["id"],
          ClassID: val["class_studying_id"],
          SubCatID: val["contest_id"],
          ActivSts: val["isactive"],
          PartcptnTyp: "",
          Section: val["class_section"],
          FileNam: val["attachment_file_name"]
        });
      } else {
        this.finalSaveArr.push({
          SchlID: this.schoolId,
          Gendr: val["gender"],
          StudID: val["id"],
          ClassID: val["class_studying_id"],
          // SubCatID: this.competitionForm.value.SubCatID,
          SubCatID:  this.competitionForm.value.SubCatID,
          ActivSts: val["isactive"],
          PartcptnTyp: "",
          Section: val["class_section"],
          FileNam: val["attachment_file_name"]
        });
      }
    });
    if (this.finalSaveArr.length>0) {
      console.log(this.finalSaveArr)
      this.finalSaveArr.filter(k => k.ActivSts == "1" && k.ActivSts == "0" );
      var records = { records: this.finalSaveArr };
      this.schoolservice
        .getStudentParticipateCom(records)
        .subscribe((result) => {
          if (result) {
            this.alertService.success(result["message"]);
            this.Arraylist = [];
            this.finalSaveArr = [];
            this.Arraylist.length = 0;
            this.finalSaveArr.length = 0;
            this.onsubmit();
            // this.toGetBicylceDetails(this.schoolId);
            //this.childToggle(this.status,this.data);
          } else {
            console.info(result["message"]);
            this.alertService.error(result["message"]);
          }
          // console.log("Valu",this.finalSaveArr);
        });
    } else {
      // console.info('Nothing To Save');
      this.alertService.error(
        // "Checkbox are Not Select Please Check alteast One Checkbox"
        "No Changes Made"
      );
    }
  }
  onSelectFile(event,studentvalue) {
    debugger
    if(studentvalue.attachment_file_name=="" || studentvalue.attachment_file_name==null)
    {
      this.value=false
    }
    else{
      this.value=true
    }
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
                ;
                // this.getUploadedFiles(result.key);
                if(this.value==true)
                {
                  if(this.Arraylist.length>0)
                    {
                      for (let index = 0; index < this.Arraylist.length; index++) {
                         if(this.Arraylist[index].id==studentvalue.id)
                         {
                            this.Arraylist[index].attachment_file_name=result.key
                         }
                      }
                    }
                    else{
                      studentvalue.attachment_file_name=result.key
                      this.Arraylist.push(studentvalue)
                    }
                }
                else{
                  if(this.Arraylist.length>0)
                  {
                    var index = this.Arraylist.findIndex((element) => element.id == studentvalue.id);
                    if (index != -1) {
                      this.Arraylist[index].attachment_file_name=result.key
                    } else {
                      studentvalue.attachment_file_name=result.key
                        this.Arraylist.push(studentvalue)
                    }
                  }
                  else{
                    studentvalue.attachment_file_name=result.key
                    this.Arraylist.push(studentvalue)
                  }
                }
              });
              this.alertService.success(
                "File Uploaded Successfully"
              );
              // this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
            }
            else {
              this.alertService.warning(
                "Error in Uploading File please try again"
              );
              // this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
            }
          });
        };
      } else {
        this.alertService.warning(
          'File Can`t uploaded because Image size should not exceed 1GB'
        );
        // this.messageService.add({severity:'warn', summary: 'File Can`t uploaded because Image size should not exceed 1GB', detail:''});
      }
    }
  }
  getUploadedFiles(getfile) {
    debugger
    var filename=getfile.attachment_file_name
    if(filename=="" ||filename==null)
    {
      this.valuefile=false
    }
    else{
      this.valuefile=true
    }
    var bucketName= "renewalapplicationemis";
    var filename = filename;
    let expiry:number = 1800;
    if(filename!="" && filename!=null)
    {
    this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
      if (result) {
        if(this.valuefile==true)
        {
          this.displayEditDialog=true
        this.image = result.url;
        }
        else
        {
          if(this.Arraylist.length>0)
          {
            // for (let index = 0; index < this.Arraylist.length; index++) {
            //    if(this.Arraylist[index].id==getfile.id)
            //    {
            //       this.image = result.url;
            //      this.displayEditDialog=true
               
            //    }
            //    else{
            //     this.displayEditDialog=false
            //     this.alertService.error(
            //       "Please Upload a file"
            //     );
            //    }
             
            // }
            var indexvalue = this.Arraylist.findIndex((elementfile) => elementfile.id == getfile.id);
            if (indexvalue != -1) {
              this.image = result.url;
              this.displayEditDialog=true
            }
            else{
              this.displayEditDialog=false
              this.alertService.error(
                "Please Upload a file"
              );
            }
          }
          else{
            this.displayEditDialog=false
            this.alertService.error(
              "Please Upload a file"
            );
           }
        }
        // this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
      }
      else {
        this.alertService.error(
          "'Error in Uploading File please try again"
        );
        // this.messageService.add({severity:'warn', summary: 'Error in Uploading File please try again', detail:''});
      }
    });
  }
  else{
    this.displayEditDialog=false
    this.alertService.error(
      "Please Upload a file"
    );
  }
  }

 


}
