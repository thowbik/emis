import { Component, OnInit, ElementRef } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TimesheetService } from '../timesheet.service';
import { AlertService } from 'src/services/alert.service';
// import { clear } from 'console';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.css']
})
export class UploadContentComponent implements OnInit {
  upload_content: FormGroup ;
  filename: any;
  application_types: string;
  selectClass: { label: string; value: number; }[];
  videofiles: boolean = false;
  videourls: boolean = false;
  docfiles: boolean = false;
  Medium: { label: string; value: string; }[];
  filetype: { label: string; value: string; }[];
  formvalues:any=[];
  videfile: any;
  subjectOptions: any [] = [];
  chaptrOptions: any []= [];
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  video_types: string;
  Current_User_Type_Id: any;
  Current_User_Type_Id_1: any;
  noDataFound: boolean;
  result_approved_data: any;
  result_Elearn_data: any;
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  noDataFound1: boolean;
  upload_module: boolean;
  approved_content_report: boolean;
  submitted: boolean;
  class_value:any;
  subject_value:any;



  constructor(public timesheetService : TimesheetService, public UserSessionService : UserSessionService, private alertService :AlertService,private fb: FormBuilder,private el: ElementRef) {
    this.Current_User_Type_Id = this.UserSessionService.userTypeId();
    this.Current_User_Type_Id_1 = this.UserSessionService.emisUsertype1();

    this.filetype = [
      {label:'Video', value: "Video"},
      {label:'Link', value: "Link"},
      {label:'Document', value: "Document"},
   ];
   
   this.Medium = [
    {label:'Tamil', value: "Tamil"},
    {label:'English', value: "English"},
 ];
 
   this.selectClass = [
    {label:'I', value: 1},
    {label:'II', value: 2},
    {label:'III', value:3},
    {label:'IV', value:4},
    {label:'V', value:5},
    {label:'VI', value:6},
    {label:'VII', value:7},
    {label:'VIII', value:8},
    {label:'IX', value:9},
    {label:'X', value:10},
    {label:'XI', value:11},
    {label:'XII', value:12},
 ];
   }

  ngOnInit() {

  if(this.Current_User_Type_Id == 21) {  
    if (this.Current_User_Type_Id_1 == 3 ){
     // this.dropdown_subject_chaptr();
      this.upload_module = true;
    }
    if (this.Current_User_Type_Id_1 == 4 ){
    //this.dropdown_subject_chaptr();
      this.upload_module = true;
    }
   }
  if(this.Current_User_Type_Id == 21 &&  this.Current_User_Type_Id_1 == 3) {  
    this.approved_content_report = true;
    this.approved_content();
  }
     this.dataHeader = [
      { field: 'class', header: 'Class', widthstyle: '1em' },
      { field: 'subject', header: 'Subject', widthstyle: '2em' },
      { field: 'chapter', header: 'Chapter' , widthstyle:'2em'},
      { field: 'label', header: 'Label' , widthstyle:'2em'},
      { field: 'content_name', header: 'Content' , widthstyle:'4em'},
      { field: 'Approved', header: 'Approved' , widthstyle:'1em'},
     ];

     this.dataHeader1 = [
      { field: 'class', header: 'Class', widthstyle: '4em' },
      { field: 'subject', header: 'Subject', widthstyle: '4em' },
      { field: 'medium', header: 'Medium' , widthstyle:'4em'},
      { field: 'Videos', header: 'Video' , widthstyle:'4em'},
      { field: 'Links', header: 'Links' , widthstyle:'4em'},
      { field: 'Documents', header: 'Documents' , widthstyle:'5em'},
      { field: 'Total', header: 'Total' , widthstyle:'4em'},
     ];

    this.video_types="video/mp4, video/webm, video/MPG, video/MPEG , video/MP2, video/MPE, video/MPV, video/M4P ,video/M4V,video/AVI,video/WMV";
    this.upload_content = this.fb.group({
      'class' : new FormControl('',Validators.required),
      'medium' : new FormControl('',Validators.required),
      'subject' : new FormControl('',Validators.required),
      'chapter' : new FormControl('',Validators.required),
      'filetype' : new FormControl('',Validators.required),
      'Sfiletype' : new FormControl('',Validators.required),
      'videofile' : new FormControl('',null),
      'videourl' : new FormControl('',null),
      'docfile' : new FormControl('',null),
      });
  }
      
  //Class Dropdown
  onselectclass(event)
  {
    this.class_value=event.value;
    console.log(this.class_value);
     this.timesheetService.getDropdownClassWiseList(this.class_value).subscribe((res) => {
      let resourcename= res.dropdown_list.class_wise;
      this.subjectOptions=[];
      if(resourcename.length>0){
        for(let i=0; i<resourcename.length;i++)
        {
          this.subjectOptions.push({ value: resourcename[i].subject, label: resourcename[i].id+' - '+resourcename[i].subject })
         
        }
        console.log(this.class_value);
        if(this.class_value!=0)
         {
        // console.log("Hi");
      //this.upload_content.controls['subject'].reset();
        //  this.chaptrOptions.push({ value: "", label: "No Data" })
        }
        
      }
      else
      {
        this.subjectOptions.push({ value: "", label: "No Data" })
      }
    
      // if(resourcename.length>0){
      //   for(let i=0; i<resourcename.length;i++){
      //     this.chaptrOptions.push({ value: resourcename[i].chapter, label: resourcename[i].chapter })
      //   }
      // }
      // else
      // {
      //   this.chaptrOptions.push({ value: "", label: "No Data" })
      // }
    })
    
  }

  //Subject Dropdwon
  onselectsubject(events)
{
  console.log(events);
  this.subject_value=events.value;
  let string_val_subject = JSON.stringify(this.subject_value);
   this.timesheetService.getDropdownSubjectWiseList(this.class_value,string_val_subject).subscribe((res) => {
    let resourcename= res.dropdown_list.subject_wise;
    this.chaptrOptions=[];
    if(resourcename.length>0){
      for(let i=0; i<resourcename.length;i++)
      {
        this.chaptrOptions.push({ value: resourcename[i].chapter, label: resourcename[i].chapter })
       
      }
      console.log(this.subject_value);
      // if(this.class_value!=0)
      // {
      //   console.log("Hi");
      //  // this.upload_content.controls['subject'].setValue("");
      //  this.chaptrOptions.push({ value: "", label: "No Data" })
      // }
      
    }
    else
    {
      this.chaptrOptions.push({ value: "", label: "No Data" })
    }
  })
}
  // dropdown resource 
 

  onselcecttype(event){
    let filetypeselected=event.value;
    if (filetypeselected == "Video"){
      this.upload_content.controls['videofile'].setValidators(Validators.required);
      this.upload_content.controls['videourl'].setValidators(null);
      this.upload_content.controls['videourl'].setValue("");
      this.upload_content.controls['docfile'].setValidators(null);
      this.upload_content.controls['docfile'].setValue("");
      this.videofiles=true;
      this.videourls=false;
      this.docfiles=false;
    }
    if (filetypeselected == "Link"){
      this.upload_content.controls['videourl'].setValidators(Validators.required);
      this.upload_content.controls['videofile'].setValidators(null);
      this.upload_content.controls['videofile'].setValue("");
      this.upload_content.controls['docfile'].setValidators(null);
      this.upload_content.controls['docfile'].setValue("");
      this.videofiles=false;
      this.videourls=true;
      this.docfiles=false;   
    }
    if (filetypeselected == "Document"){
      this.upload_content.controls['docfile'].setValidators(Validators.required);
      this.upload_content.controls['videofile'].setValidators(null);
      this.upload_content.controls['videofile'].setValue("");
      this.upload_content.controls['videourl'].setValidators(null);
      this.upload_content.controls['videourl'].setValue("");
      this.videofiles=false;
      this.videourls=false;
      this.docfiles=true;
    }
  }

  onselcectedfile(event)
  {
   this.filename =  event.target.files;    
   debugger;
   console.log(this.filename,"sdsds");
  }

  onSelectedId(approved_id,id){
    if(approved_id == 1) {
    let datas = {"id" : id, "isactive" : 2 };
    this.timesheetService.get_approved_status_api({"approve_id":datas}, true).subscribe((res) => {
      if(res.status == 200){
        this.alertService.success("Rejected"); 
        this.approved_content();
    }
    else{
      this.alertService.error("Not Rejected"); 
    }
  })
  }
  if(approved_id == 0) {
    let datas = {"id" : id, "isactive" : 1 };
    this.timesheetService.get_approved_status_api({"approve_id":datas}, true).subscribe((res) => {
    if(res.status == 200){
      this.alertService.success("Approved"); 
      this.approved_content();
    }
    else{
      this.alertService.error("Not Approved"); 
    }
  })
  }
  if(approved_id == 2) {
    let datas = {"id" : id, "isactive" : 1 }; 
    this.timesheetService.get_approved_status_api({"approve_id":datas}, true).subscribe((res) => {
    if(res.status == 200){
      this.alertService.success("Approved"); 
      this.approved_content();
    }
    else{
      this.alertService.error("Not Approved"); 
    }
  })
  }
}

  approved_content(){
    this.timesheetService.get_approved_content_api().subscribe((res) => {
     if(res.data != 0){
       this.result_approved_data = res.data;
       this.noDataFound = false;
     }
     else{
       this.noDataFound = true;
     }
   })
  }

  submit(){
    this.submitted = true;
    debugger;
    if (this.upload_content.valid) { 
    let  Class=this.upload_content.value.class,
    Medium=this.upload_content.value.medium,
    Subject=this.upload_content.value.subject,
    Chapter=this.upload_content.value.chapter,
    TypeFile=this.upload_content.value.filetype,
    SelectFileType=this.upload_content.value.Sfiletype,
    url=this.upload_content.value.videourl;
    // "docs":this.filename[0],
    this.formvalues = {"class" : Class, "medium" : Medium,"subject" : Subject,"chapter" : Chapter,"label" : TypeFile,"file_type" : SelectFileType,"content_name" : url,"isactive": "0" };
    this.timesheetService.get_approved_status_api({"records": this.formvalues }, true).subscribe((res) => {
     if(res.status == 200){
      this.alertService.success("Uploaded Successfully");
      this.upload_content.reset();
      this.submitted = false;
     }
     else 
     {
      this.alertService.error("Error In Uploading");
     }
   })
    }
    else
    {
      for (const key of Object.keys(this.upload_content.controls)) {
        if (this.upload_content.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all the Required Fields");
    }
  }
}