import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StateService } from '../state.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-ied-teacher',
  templateUrl: './ied-teacher.component.html',
  styleUrls: ['./ied-teacher.component.css']
})
export class IedTeacherComponent implements OnInit {
  teacherDetails : FormGroup;
  data : any;
  data1 : any;
  reportdata :{field:string,header:string}[];
  teacherdata : {field:string,header:string}[];
  types : {label: string,value:string}[];
  specialisation: {label: string,value:string}[];
  specialisation1 : {label: string,value:string}[];
  qualification : {label: string,value:string}[];
  qualification1 : {label: string,value:string}[];
  selectableTable = false;
  selectableTable1 = false;
  userTypeId : number;
  districtId : any;
  distid : any;
  showDialogBox: boolean = false;
  submitted : boolean = false;
  teacherDetails1 : any;
 save_ied_records:any;
  get_dropdown : any;
  teacher_id :any;
  selectedType : any;
  selectedValue : any;
  selectedValue1 : any;
  noDataFound : boolean = false;
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  exportExcelData: any;
  districtName : any;
  iedteacher: any;
  teacherieddata:number;
  indexId: any;

  constructor(private fb:FormBuilder,private el: ElementRef,private stateService : StateService,
    private alertService:AlertService,private userSessionService:UserSessionService) { 
    this.districtId = this.userSessionService.districtId();
    this.userTypeId = this.userSessionService.userTypeId();
  }

  ngOnInit() {
    this.getIedTeacherReport();
    this.iniialValidator();
    this.reportdata=[
      
      {field : "district_name", header :"District"},
      {field : "Therapist", header :"Thearapists"},
      {field : "Special_Educator", header :"Special Educator"},
      {field : "Total", header :"Total"},
      
    ],
    this.dataHeader1 = [{field: 'teacher_id', header: 'Teacher ID',widthstyle: '5em' },
    { field: 'teacher_name', header: 'Special Educator Name',widthstyle: '5em' },
    { field: 'Teacher_Type', header: 'Type' ,widthstyle: '5em'},
      { field: 'specialisation', header: 'Specialization',widthstyle: '5em' },
      { field: 'mbl_nmbr', header: 'Mobile',widthstyle: '5em' },
    ];
    
    this.dataHeader = [{field: 'district_name', header: 'District',widthstyle: '5em' },
    { field: 'Total_Schools', header: 'Therapists',widthstyle: '5em' },
    { field: 'Verified_Schools', header: 'Special Educator' ,widthstyle: '5em'},
      { field: 'Verified_by_BRTE', header: 'Total',widthstyle: '5em' },
    ];

    this.teacherdata = [

      {field : "teacher_id",header :"Teacher ID"},
      {field : "teacher_name", header :"Special Educator Name"},
      {field : "Teacher_Type", header :"Type"},
      {field : "specialisation", header :"Specialization"},
      {field : "mbl_nmbr", header :"Mobile"},
     
    ],

    this.types = [
      {label : 'Special Educator - SSA', value :'1'},
      {label : 'Therapists', value :'2'},
      {label : 'Special Educator - RMSA', value :'3'},
     

    ],
 
    this.specialisation = [
      {label : 'HI', value :'HI'},
      {label : 'VI', value : 'VI'},
      {label : 'MR', value : 'MR'},
      {label : 'CP', value : 'CP'},
      {label : 'LI', value : 'LI'},
      {label : 'DB', value : 'DB'},
      {label : 'ASD', value : 'ASD'},
      {label : 'MD', value : 'MD'},
      {label : 'SLD', value : 'SLD'},
    ],

    // this.specialisation = [
    //   {label : 'HI', value :'HI'},
    //   {label : 'ID(MR),HI',value :'ID(MR),HI'},
    //   {label : 'ID(MR)', value :'ID(MR)'},
    //   {label : 'DB', value : 'DB'},
    //   {label : 'DB,HI', value : 'DB,HI'},
    //   {label : 'HI,VI', value : 'HI,VI'},
    //   {label : 'ASD', value : 'ASD'},
    //   {label : 'MD', value : 'MD'},
    //   {label : 'VI', value : 'VI'},
    //   {label : 'CP', value : 'CP'},
    //   {label : 'LI&CP', value : 'LI&CP'},
    //   {label : 'CP,HI', value : 'CP,HI'},
    //   {label : 'HI&BLIND', value : 'HI&BLIND'},
    //   {label : 'CBR',value : 'CBR'},
    //   {label : 'TB',value : 'TB'},
    //   {label : 'Dip-EI',value : 'Dip-EI'},
    //   {label : 'CP and Locomtor',value : 'CP and Locomtor'},
    //   {label : 'Specific Learning Disability',value : 'Specific Learning Disability'},
    // ],

      this.specialisation1 =[     
      {label : 'Physiotheraphy',value : 'Physiotheraphy'},
      {label : 'Occupational',value : 'Occupational'},
      {label : 'Speech',value : 'Speech'}
    ],

    this.qualification = [
      {label : 'A.S.ED', value : 'A.S.ED'},
      {label : 'B.Ed', value : 'B.Ed'},
      {label : 'D.ED', value : 'D.ED'}, 
      {label : 'PGPD', value : 'PGPD'},
    ],

    this.qualification1 =
    [
      {label : 'BPT', value : 'BPT'},
      {label : 'MPT', value : 'MPT'},

    ]
  }

  iniialValidator(){
    this.teacherDetails = this.fb.group({
      selectedType : new FormControl('',Validators.required),
      selectedValue : new FormControl('',Validators.required), 
      selectedValue1 :  new FormControl('',Validators.required),
    })
}

getIedTeacherReport(){
        if(this.userTypeId == 5){
          this.selectableTable = true;
          this.selectableTable1 = false;
    this.stateService.getDistrictDetails().subscribe(res =>
      {
        if(res.result!="")
        {
          this.data = res.result.IED_teacher_details;
          console.log(this.data);        
        }
        else
        {
          this.noDataFound = true;
        }
      })
  }
    
    else
    {  
      if(this.userTypeId == 9 || this.userTypeId ==3)
       { 
         console.log(this.userTypeId);
         this.districtId = this.userSessionService.districtId();
         this.selectableTable1 = true;
         this.stateService.getTeacherDetailsData(this.distid).subscribe(result =>
          {
            if(result.result!="")
            {
              this.data1 = result.result.IED_teacher_details;
            }
            else
            {
              this.noDataFound = true;
            }
          })
      }
    }
  }

  getTeacherDetails(distid,distname){
   
    if(this.userTypeId == 9 || this.userTypeId == 3 || this.userTypeId == 5)   
    {
      this.selectableTable1 = true;  
      this.districtName = distname;
      this.stateService.getTeacherDetailsData(distid).subscribe(result =>
      {
        if(result.result!="")
            {
              this.data1 = result.result.IED_teacher_details;
            }
            else
            {
              this.noDataFound = true;
            }
      })
    }
  }

  getdropdown(teacher_id){
    this.showDialogBox=true;
    this.submitted = false;
    this.teacher_id = teacher_id;
    this.teacherDetails.reset();
    this.getiedteachers();
  }

  getiedteachers(){
    this.stateService.getiedteachers(this.teacher_id).subscribe(res =>{
      if(res.result.length !=0){
        this.iedteacher = res.result.Teacher_det[0]
          this.indexId = this.iedteacher.id;
          this.teacherieddata = 2;
          this.teacherDetails.controls["selectedType"].setValue(this.iedteacher.teacher_ied_type)
          this.teacherDetails.controls["selectedValue"].setValue(this.iedteacher.specialisation)
          this.teacherDetails.controls["selectedValue1"].setValue(this.iedteacher.qualification)
      }else{
        this.teacherieddata = 1;
      }

    })
  }
  update(){
    debugger
    this.submitted = true; 
    this.selectedType = this.teacherDetails.value.selectedType, this.selectedValue = this.teacherDetails.value.selectedValue, this.selectedValue1 = this.teacherDetails.value.selectedValue1
    this.save_ied_records={"records":{"id":this.indexId,"teacher_id":this.teacher_id,"qualification":this.selectedValue1,"teacher_ied_type":this.selectedType,"specialisation":this.selectedValue}}  
    this.stateService.getSavedIedTeacherDetails(this.save_ied_records,true).subscribe((data) =>
      {
        if(data ['dataStatus'] == true)
        {
          this.alertService.success("Successfully Updated");
            }
            else 
            {
               this.alertService.warning('Something wrong');
            }
          }) 

  }

  save(){
    this.submitted = true; 
    this.selectedType = this.teacherDetails.value.selectedType, this.selectedValue = this.teacherDetails.value.selectedValue, this.selectedValue1 = this.teacherDetails.value.selectedValue1
    this.save_ied_records={"records":{"teacher_id":this.teacher_id,"qualification":this.selectedValue1,"teacher_ied_type":this.selectedType,"specialisation":this.selectedValue}}  
    this.stateService.getSavedIedTeacherDetails(this.save_ied_records,true).subscribe((data) =>
      {
        if(data ['dataStatus'] == true)
        {
          this.alertService.success("Successfully Saved");
          this.getiedteachers();
            }
            else 
            {
               this.alertService.warning('Something wrong');
            }
          })         
        }
          
  close_dialog(){
    this.showDialogBox=false;
    }
    getteacherdata(){
      this.exportExcelData = [];
      this.data.map(item => {
        return {
          'District': item.district_name,
          'Thearapists': item.Therapist,
          'Special Educator': item.Special_Educator,
          'Total': item.Total,
           } 
           }).forEach(item => this.exportExcelData.push(item));
           let teacherreportacademic = [];
           for(let acdamicreport of this.exportExcelData) {
            teacherreportacademic.push(acdamicreport);
           }
           return teacherreportacademic;
     }
    
     exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getteacherdata());
          const workbook = { Sheets: { 'IED Teachers' : worksheet }, SheetNames: ['IED Teachers'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer,'IED Teachers');
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
    getteacherblock(){
      this.exportExcelData = [];
      this.data1.map(item => {
        return {
          'Teacher ID': item.teacher_id,
          'Special Educator Name': item.teacher_name,
          'Type': item.Teacher_Type,
          'Specialization': item.specialisation,
          'Mobile': item.mbl_nmbr,
          }
           }).forEach(item => this.exportExcelData.push(item));
           let schoolwithoutdatastate = [];
           for(let schoolwithoutdata of this.exportExcelData) {
            schoolwithoutdatastate.push(schoolwithoutdata);
           }
           return schoolwithoutdatastate;
     }
    
     ExportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getteacherblock());
          const workbook = { Sheets: { 'IED Teacher' : worksheet }, SheetNames: ['IED Teacher'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer,'IED Teacher');
      });
    }
    
    saveAsExcelFilestate(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
      });
    } 
      

    goBack()
    {
      if(this.userTypeId == 5 || (this.userTypeId != 9 && this.userTypeId != 10 && this.userTypeId != 6)  )
      {
      this.selectableTable1 = false;
      this.districtName ='';
    }
  }   
}

