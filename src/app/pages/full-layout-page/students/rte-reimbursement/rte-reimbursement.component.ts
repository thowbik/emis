import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../student.service'; 
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-rte-reimbursement',
  templateUrl: './rte-reimbursement.component.html',
  styleUrls: ['./rte-reimbursement.component.css']
})
export class RteReimbursementComponent implements OnInit {
  
  studentStateListForm : FormGroup;
  studentListForm : FormGroup;
  data:any[]=[];
  amountData:any[]=[];
  statusData:any[]=[];
  studentyear:any;
  stateData : any[]=[];
  colsstate : Array<{'field':string,'header':string}>;
  cols:Array<{'field':string,'header':string}>;
  cols1:Array<{'field':string,'header':string}>;
  cols2:Array<{'field':string,'header':string}>;
  districtId : number;
  studentYear : number;
  confirm_data : any;
  confirm_data1 : any;
  
  emisUsertype1 : number;
  Current_KG_All : number;
  Current_1_8_All : number;
  Submitted_KG: number;
  Submited_1_8 : number;
  exportExcelData : any[]=[];
  AcademicYear : any;
  showDialogBox : boolean=false;
  statelogin : boolean;
  ceodislogin : boolean = false;
  noDataFound : boolean = false;
  from_date : any;
  to_date : any;
  from_date_onload : any;
  to_date_onload : any;
  usertypeId : number;
  school_id : number;
  distId : number;
   pipe = new DatePipe('en-US');

  constructor(private fb:FormBuilder,private studentService : StudentService,private user:UserSessionService,private alertService:AlertService) {     
    this.districtId = this.user.districtId(); 
    this.usertypeId = this.user.userTypeId();
    this.studentyear =[
      {label: '2018-19',value :"'" + '2018-19' + "'" },
      {label: '2019-20', value: "'" + '2019-20' + "'"}
    ]  
  }

  ngOnInit() {
    
    this.getApi(); 
    this.colsstate =[
      {field:"district_name",header : "District Name"},
      {field:"Current_KG_All",header : "Current KG Students"},
      {field:"Current_1_8_All",header : "Current 1-8 Students"},
      {field:"Submitted_KG",header : "Submitted KG STudents"},
      {field:"Submited_1_8",header : "Submitted 1-8 Students"},
      {field:"Submitted_Total",header : "Total Submitted Students"},
    ],

    this.cols =[
   {field : "block_name",header : "Block"},
   {field : "udise_code",header : "UDISE Code"},
   {field : "school_name",header : "School Name"},
   {field : "Current_KG_All",header : "Total KG Students"},
   {field : "Current_1_8_All",header : "Total 1-8 Students"},
   {field : "Current_RTE_KG",header : "Current KG Students"},
   {field : "Current_RTE_1_8",header : "Current 1-8 Students"},
   {field : "Submitted_KG",header : "Submitted KG STudents"},
   {field : "Submited_1_8",header : "Submitted 1-8 Students"},
   {field : "Submitted_Total",header : "Total Submitted Students"},
    ];

    this.cols1 =[
      {field : "block_name",header : "Block"},
      {field : "udise_code",header : "UDISE Code"},
      {field : "school_name",header : "School Name"},
      {field : "Submitted_KG",header : "Submitted KG STudents"},
      {field : "Submited_1_8",header : "Submitted 1-8 Students"},
      {field : "Submitted_Total", header : "Total Submitted Students"},
      {field : "calculated_amount_kg",header : "Reimbursement Claimed KG"},
      {field : "calculated_amount_1_8",header : "Reimbursement Claimed 1-8"},
      {field : "calculated_amount_total",header : "Total Reimbursement Claimed"},
      {field : "from_date",header : "From Date" },
      {field : "to_date",header : "To Date"}
    ]

    this.cols2 =[
      {field : "block_name",header : "Block"},
      {field : "udise_code",header : "UDISE Code"},
      {field : "school_name",header : "School Name"},
      {field : "calculated_amount_kg",header : "Reimbursement Claimed KG"},
      {field : "calculated_amount_1_8",header : "Reimbursement Claimed 1-8"},
      {field : "calculated_amount_total",header : "Total Reimbursement Claimed"},
      {field : "Approved_KG_Amt",header : "Reimbursement Approved KG"},
      {field : "Approved_1_8_Amt",header : "Reimbursement Approved  1-8"},
      {field : "Approved_Total_Amt",header : "Total Reimbursement Approved"},
      {field : "Submission_Status",header : "Submission Status"},
      {field : "Approve_Status",header : "Approved Status"},
      {field : "Reimburse_Status",header : "Reimbursement Status"}
    ];

    this.studentStateListForm = this.fb.group({
      selectedyear : new FormControl('')
    });

    this.studentListForm = this.fb.group({
      selectedyear : new FormControl('')
    })  
  }
   
  //EXCEL TAB-1

  getRteStudentlist(){
    this.exportExcelData = [];
    return this.data.map(item =>{
      return{
        "Block" : item.block_name,
        "UDISE Code" : item.udise_code ,
        "School Name" : item.school_name ,
        "Total KG Students" : item.Current_KG_All ,
        "Total 1-8 Students" : item. Current_1_8_All,
        "Current KG Students" : item.Current_RTE_KG ,
        "Current 1-8 Students" : item.Current_RTE_1_8 ,
        "Submitted KG STudents" : item.Submitted_KG ,
        "Submitted 1-8 Students" : item.Submited_1_8 ,
        "Total Submitted Students" : item.Submitted_Total
      }
    });
  }
  exportExcel() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getRteStudentlist());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
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
          FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
  }

  //EXCEL TAB 2

  getAmountConfirmationlist(){
    this.exportExcelData = [];
    return this.amountData.map(item =>{
      return{
        "Block" : item.block_name,
        "UDISE Code" : item.udise_code ,
        "School Name" : item.school_name ,
        "Submitted KG STudents" : item.Submitted_KG ,
        "Submitted 1-8 Students" : item.Submited_1_8 ,
        "Total Submitted Students" : item.Submitted_Total,
        "Reimbursement Claimed KG":item.calculated_amount_kg ,
        "Reimbursement Claimed 1-8":item.calculated_amount_1_8 ,
        "Total Reimbursement Claimed":item. calculated_amount_total,
        "From Date":item.Submission_Status ,
        "To Date":item.Submission_Status     
      }
    });
  }
  exportExcel1() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getAmountConfirmationlist());
          const workbook = { Sheets: { 'amountData': worksheet }, SheetNames: ['amountData'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcel1File(excelBuffer, "primengTable");
      });
  }
  saveAsExcel1File(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
  }

  //EXCEL TAB-3

  getStatuslist(){
    this.exportExcelData = [];
    return this.statusData.map(item =>{
      return{
        "Block" : item.block_name,
        "UDISE Code" : item.udise_code ,
        "School Name" : item.school_name ,
        "Reimbursement Claimed KG":item.calculated_amount_kg ,
        "Reimbursement Claimed 1-8":item.calculated_amount_1_8 ,
        "Total Reimbursement Claimed":item. calculated_amount_total,
        "Reimbursement Approved KG" : item.Approved_KG_Amt,
        "Reimbursement Approved  1-8" : item.Approved_1_8_Amt,
        "Total Reimbursement Approved" : item.Approved_Total_Amt,
        "Submission Status" : item.Submission_Status,
        "Approved Status" : item.Approve_Status,
        "Reimbursement Status":item.Reimburse_Status        
      }
    });
  }
  exportExcel2() {
    import ("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getAmountConfirmationlist());
          const workbook = { Sheets: { 'statusData': worksheet }, SheetNames: ['statusData'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcel1File(excelBuffer, "primengTable");
      });
  }
  saveAsExcel2File(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      });
  }
//dropdown select//
  studenttypevalue(event){
    this.studentYear = event.value;
    console.log(this.studentYear);
    const distid = this.districtId;
    const year = this.studentYear;
    if(this.usertypeId == 5){
     this.statelogin = true;
      this.studentService.getStatestudentsData(year).subscribe((res) =>{
        if(res.result!="")
        {
          this.stateData = res.result.no_of_student; 
          console.log(this.data);        
        }
        else
        {
          this.noDataFound = true;
        }
  })
}
  else{
    if(this.usertypeId == 9 || this.usertypeId ==3)
    {
      this.ceodislogin = true;
//tab1
    this.studentService.getNumberofstudents(distid,year).subscribe((res) =>{
      if(res.result!="")
      {
        this.data = res.result.no_of_student;            
        console.log(this.data);        
      }
      else
      {
        this.noDataFound = true;
      }   
     });
//tab2
     this.studentService.getReimbursementAmount(distid,year).subscribe((res) =>{
      if(res.result!="")
      {
      this.amountData = res.result.amount_confirm; 
      }
      else
      {
        this.noDataFound = true;
      } 
    });
//tab3
    this.studentService.getReimbursementStatus(distid,year).subscribe((res) =>{
      if(res.result != "")
      {
      this.statusData = res.result.Reimbursement_Status; 
      }
      else{
        this.noDataFound = true;
      }
  });
}
}
  }

//Api calls

  getApi(){
    if(this.usertypeId == 5)
    { 
      this.statelogin = true;
        this.studentService.getStatestudentsData1().subscribe((res) =>
       {
        //  if(res.result="")
        //  {
          this.stateData = res.result.no_of_student;       
        // }
        //  else
        //  {
        //    this.noDataFound = true;
        //  }
       })
     }
     else
     {
      if(this.usertypeId == 3 || this.usertypeId == 9){
        this.ceodislogin = true;
        const distid = this.districtId;
        this.studentService.getNumberofstudents1(distid).subscribe((res) =>{
          if(res.result!="")
          {
            this.data = res.result.no_of_student;            
            console.log(this.data);        
          }
          else
          {
            this.noDataFound = true;
          }   
  });
  
        this.studentService.getReimbursementAmount1(distid).subscribe((res) =>{
          if(res.result!="")
          {
          this.amountData = res.result.amount_confirm; 
          }
          else
          {
            this.noDataFound = true;
          } 
  });
  
        this.studentService.getReimbursementStatus1(distid).subscribe((res) =>{
          if(res.result != "")
          {
          this.statusData = res.result.Reimbursement_Status; 
          }
          else{
            this.noDataFound = true;
          }
  }); 
  
     }
    }
  }
 //Click to getDistrict ID in STATE //

  getDistrictData(district_id){
    this.distId = district_id;
     if(this.usertypeId = 5){
      this.ceodislogin = true;
      const distid = this.distId;
      this.studentService.getNumberofstudents1(distid).subscribe((res) =>{
        if(res.result!="")
        {
          this.data = res.result.no_of_student;            
          console.log(this.data);        
        }
        else
        {
          this.noDataFound = true;
        }   
});

this.studentService.getReimbursementAmount1(distid).subscribe((res) =>{
  if(res.result!="")
  {
  this.amountData = res.result.amount_confirm; 
  }
  else
  {
    this.noDataFound = true;
  } 
});

this.studentService.getReimbursementStatus1(distid).subscribe((res) =>{
  if(res.result != "")
  {
  this.statusData = res.result.Reimbursement_Status; 
  }
  else{
    this.noDataFound = true;
  } 
});
  }
}

//clicking Confirm col//

  getData(Current_KG_All,Current_1_8_All,Current_RTE_KG,Current_RTE_1_8,school_id)
    {
    this.confirm_data = { "records" : {"all_students_kg" :Current_KG_All ,"all_students_1_8":Current_1_8_All ,"rte_students_kg":Current_RTE_KG ,"rte_students_1_8":Current_RTE_1_8 ,"acyear":(this.studentYear|| this.AcademicYear) ,"isactive":"1" ,"calculated_amount_kg": "","calculated_amount_1_8":"" ,"calculated_amount_total":"","created_at": "","school_id":school_id }}
    this.studentService.getFirstTabApi(this.confirm_data).subscribe((result) =>{ 
      if(result.dataStatus){
        this.alertService.success(result.message);  
     }
     else {
       this.alertService.warning('Something wrong');
     }
   });
 }
 
 //Datepicker events

 assignTheDistributionFromDate(event)
 {
  this.from_date = event.target.value;
}

assignTheDistributionToDate(event)
{
 this.to_date = event.target.value;
}

  //dialogbox//
  
  getDialog(from_date,to_date,school_id)
    {
    this.from_date_onload = from_date;
    this.to_date_onload = to_date;
    this.school_id = school_id;
    this.showDialogBox= true;
  }
  
  //Clicking Yes//
 Yes(){

  if(this.from_date == undefined && this.to_date == undefined)
    {
      
      this.confirm_data1 = { "records" : {"from_date":this.from_date_onload,"to_date" :this.to_date_onload,"submit_status" : "1","school_id":this.school_id,"acyear":"2018-19"}}    
      console.log(this.confirm_data1);
      this.studentService.getSecApiConfirm(this.confirm_data1).subscribe((result) =>
      {  
        if(result.dataStatus)
        {
          this.alertService.success(result.message); 
       }
       else 
       {
         this.alertService.warning('Something wrong');
       }
       
     })
    }
    else
    { 
       this.confirm_data1 = { "records" : {"from_date":this.from_date,"to_date" :this.to_date,"submit_status" : "1","school_id":this.school_id,"acyear":(this.studentYear|| this.AcademicYear) }}
       this.studentService.getSecApiConfirm(this.confirm_data1).subscribe((result) =>{
       if(result.dataStatus)
       {
         this.alertService.success(result.message);    
       }
  else
   {
    this.alertService.warning('Something wrong');
  }
  
})
  }
}
close_dialog(){
  this.showDialogBox=false;
  }

}

