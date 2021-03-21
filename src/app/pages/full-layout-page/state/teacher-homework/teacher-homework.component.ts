import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StateService } from '../state.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-teacher-homework',
  templateUrl: './teacher-homework.component.html',
  styleUrls: ['./teacher-homework.component.css'],

})

export class TeacherHomeworkComponent implements OnInit {
  homework_data : any;
  cols:any;
  class : any;
  subject: any;
  subject1 : any;
  sectionId : any;
  data : any;
  sectionDatas :{label : string,value : string};
  sectionValue : any;
  showDialogBox : boolean=false;
  teacherId : number;
  schlid : number;
  emisUsertype1 : number;
  noDataFound : boolean = false;
  homeWorkdetails :FormGroup;
  sectionName : string;
  getPopupValue :any[]=[];
  save_records : any;
  exportExcelData : any[]=[];
  id : number;
  editPopupValue : any;
  editSectionDatas : any;
  exportColumns: { title: string; dataKey: string; }[];
  exportColumns1 :any[];
  save_edit_records : any;
  updated_at : any;
  class_section_id : number;
  classValue : any;
  class_id : any;
  e : number;
  subjectdropdown: any;
  SubjectValue : any;
  Section : any;
  Information : any;
  ClassId : any;

  constructor(private stateService :StateService,private fb:FormBuilder,private alertService:AlertService,private user:UserSessionService) {
                this.emisUsertype1 = this.user.emisUsertype1();
                this.teacherId = this.user.teacherId();
               }

  ngOnInit() {
    this.getHomeWorkData();
    this.class = [
    {label : "I", value:"1" },
    {label : "II", value:"2"},
    {label : "III", value:"3"},

    {label : "IV", value:"4"},
    {label : "V", value:"5"},
    {label : "VI", value:"6"},
    {label : "VII", value:"7"},
    {label : "VIII", value:"8"},
    {label : "IX", value:"9"},
    {label : "X", value:"10"},
    {label : "XI",value : "11"},
    {label : "XII",value : "12"}
  
  ]
  
  this.subjectdropdown = [
    {label:"Tamil",value : "48"}, 
    {label:"English",value : "46"},
    {label:"Urudu",value : "45"},
    {label:"Kannada",value : "96"},
    {label:"Malayalam",value : "94"},
    {label:"Telugu",value : "95"},
  ];

  this.subject1 = [
    {label:"English",value : "46"},
    {label:"Mathematics",value : "3"},
    {label:"Environmental Science",value : "4"},
  ];

    this.cols=[
      {field : "book_name",header :"Subject"},
      {field : "class_id", header :"Assign class"},   
    ]
   
   this.homeWorkdetails = this.fb.group({
        selectclass : new FormControl(""),
        selectsection : new FormControl(""),
        selectsubject : new FormControl(""),
        description : new FormControl("")
      });
  }
     //GET Table DATA
     getHomeWorkData(){
      var schlid= this.emisUsertype1
      var teacherid = this.teacherId;
      this.stateService.getHomeWorkApi(schlid,teacherid).subscribe((res)=>
      {
        if(res.result!="")
        {
        this.homework_data = res.result.home_work_detail
       console.log(this.homework_data);
        }
        else{
          this.noDataFound = true;
        }
      })
    }
  //Class & Section
    getClassDropdown(e){
      debugger
      this.sectionId = e.value;
      var classid = this.sectionId;
      var schlid = this.emisUsertype1 ;
      this.stateService.getSchlSectionDetails(schlid,classid).subscribe(res =>
        {    
          this.data = res.result.section;
           console.log(this.data);
          this.sectionDatas = this.data.map(i =>
            { 
              return {label:i.section,value:i.section};
  
            })
            })
    }
    
    getSectionEventValue(event){
      debugger;
      console.log(event);
    this.sectionName = event.originalEvent.target.innerText;
    this.sectionValue = event.value;

   }
  //Create
    getAddDialog(){
     this.showDialogBox = true;
     this.homeWorkdetails.controls['selectsubject'].setValue("");
     this.homeWorkdetails.controls['selectclass'].setValue("");
     this.homeWorkdetails.controls['selectsection'].setValue("");
     this.homeWorkdetails.controls['description'].setValue("");
    }
  //UPDATE
    getNewDataSave(){
      debugger;    
      this.SubjectValue = this.homeWorkdetails.value.selectsubject,this.Section = this.homeWorkdetails.value.selectsection,this.Information = this.homeWorkdetails.value.description, this.ClassId = this.homeWorkdetails.value.selectclass;
      this.save_records={"records":{"school_key_id":this.emisUsertype1,"class_id":this.ClassId,"teacher_id":this.teacherId,"subject":this.SubjectValue,"information": this.Information,"section": this.Section,"class_section_id":this.class_section_id,"status":1,"updated_at":""}}   
      console.log(this.save_records);
      debugger;
    if (this.homeWorkdetails.valid)
     { 
      
      this.stateService.getSaveHomeworkdata(this.save_records).subscribe((result) =>
      {
      
        if(result.dataStatus)
        {
        
          this.alertService.success(result.message);
          this.getHomeWorkData();
        }
        else 
        {
          this.alertService.warning('Something wrong');
        }
      });
    }
      }
  //EDIT POPUP
  getEditPopup(school_key_id,id,teacher_id,subject,information,class_id,section,class_section_id,status)
  {
     this.showDialogBox = true;
     this.id=id;
     console.log(this.id);
     this.subject = subject;
     this.class_id = class_id;
     this.class_section_id = class_section_id;
     var schlid = this.emisUsertype1 ;
     var classid = this.class_id;
     this.stateService.getSchlSectionDetails(schlid,classid).subscribe(res =>
        {    
          this.data = res.result.section;
           console.log(this.data);
          this.sectionDatas = this.data.map(i =>
            { 
              return {label:i.section,value:i.section};
  
            })
            })
     this.homeWorkdetails.controls['selectsubject'].setValue(subject);
     this.homeWorkdetails.controls['selectclass'].setValue(class_id);
     this.homeWorkdetails.controls['selectsection'].setValue(section);
     this.homeWorkdetails.controls['description'].setValue(information);
  }
  //DELETE
  getDelete(){
    var id = this.id;
    var  schlid= this.emisUsertype1;
    var teacherid = this.teacherId;
    this.stateService.getDeleteApi(schlid,teacherid,id).subscribe((res) =>
  {
    if(res.dataStatus)
    {
      this.alertService.success(res.message);
      this.getHomeWorkData();
    }
    else 
    {
      this.alertService.warning('Something wrong');
    }
    this.showDialogBox = false;
  })
  }
  //CLOSE POPUP
  close_dialog(){
    this.showDialogBox = false;
  }
  
  //excel
  
  getClassExcelData() {
    this.exportExcelData = [];
    return this.homework_data.map(i =>{
      return{
        'Subject' : i.book_name,
        'Assign class' : i.class_id,
        'Section' : i.section
      }
    });
  }
  exportExcel() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getClassExcelData());
          const workbook = { Sheets: { 'datahome': worksheet }, SheetNames: ['datahome'] };
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
          FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
      });
  }
  
  // PDF
  exportPdf(){
    this.exportColumns = this.cols.map(col => ({title: col.header , dataKey: col.field}));
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default(0,0);
          doc.setFontSize(13);
          doc.text('HomeWork Details', 14, 15);
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.autoTable(this.exportColumns,this.homework_data,
            {
            theme:'grid',
            fontStyle:'bold',
            fontSize: 8,
            styles: { halign: 'center' , fontStyle:'bold' } ,
            // margin:{ top:10 },
            showHead:'everyPage',
            startY: 23,
            });
            doc.save('Homework.pdf');
  
        })
      })
    }
}