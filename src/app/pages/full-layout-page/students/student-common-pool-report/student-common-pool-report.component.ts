import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-common-pool-report',
  templateUrl: './student-common-pool-report.component.html',
  styleUrls: ['./student-common-pool-report.component.css']
})
export class StudentCommonPoolReportComponent implements OnInit {

  public sesnId: any;
  public userTypeId: number;
  public loggedInType: boolean = false;
  public deinedurl: any;
  public districtId: any;
  public pageStage : number;

  schoolTypeDetails: any[] = [];
  transferReasonDetails: any[] = [];
  editableTRDetails: any[] = [];
  schoolTypeDataHeader: Array<{'field':string,'header':string,'widthstyle':string}> = [];
  transferReasonDataHeader : Array<{'field':string,'header':string,'widthstyle':string}> = [];
  editableTRDataHeader : Array<{'field':string,'header':string,'widthstyle':string}> = [];
  paginator: boolean = false ;
  rows : any = "0";
  schoolTypeRpt : number = 1;
  TransferReasonRpt : number = 1;
  tabViewTable :boolean = false;
  singleViewTable :boolean = false;
  transferReasonTab: boolean = false;
  pageTitle1 : string = "Students in Common Pool-District wise";
  pageTitle2 : string = "Students in Common Pool-District wise (Transfer Reason)";
  paginator2: boolean = false ;
  rows2 : any = "0";
  cloned: { [s: string]: any; } = {};
  remarkList: Array<{'value':string,'label':string}> = 
                  [{value:'',label:'Select group'},
                   {value:'Admitted To Another School',label:'Admitted To Another School'},
                   {value:'Moved out of state',label:'Moved out of Town / state'},
                   {value:'Joined ITI/Polytechneic/College/Madrasa',label:'Joined ITI/Polytechnic/College'},
                   {value:'Dropped Out',label:'Dropped Out'},
                   {value:'Duplicate Entry',label:'Duplicate Entry'},
                   {value:'Tutorial After 10th',label:'Tutorial After 10th'},
                   {value:'Student Died',label:'Student Died'},
                   {value:'IED Home based',label:'IED Home based'}];

                   
  reasonList: Array<{'value':string,'label':string}> = 
  [{value:'',label:'Select group'},
   {value:'1',label:'Long Absent'},
   {value:'2',label:'Transfer Request by Parents'},
   {value:'3',label:'Terminal Class'},
   {value:'4',label:'Dropped Out'},
   {value:'5',label:'Student Died'},
   {value:'6',label:'Duplicate EMIS Entry'}]
  exportExcelData: any;
                   

  constructor(private session: UserSessionService,
    private StudentService: StudentService) {
      /* ✦ ID from session */
    this.userTypeId = Number(this.session.userTypeId());
    this.deinedurl= './assets/img/AccessDeniedError.png';

    }

    ngOnInit() { 
      this.headerData();
      switch(this.userTypeId){
        case 2: 
          this.loggedInType = true;
          this.tabViewTable= false;
          this.singleViewTable = true;
          this.nxt_cptr();
          console.info('Block Inprogress type 2 report only');
          break;
        case 3: 
          this.loggedInType = true;
          this.tabViewTable= true;
          this.singleViewTable = false;
          this.transferReasonTab = true;
          this.nxt_st({"district_id":Number(this.session.userId()),"district_name":this.session.userName()},1);
          this.nxt_tr({"district_id":Number(this.session.userId()),"district_name":this.session.userName()},1);
          console.log(this.session);
          console.info('district Inprogress type 1 first type 2 second report');
          break;
        case 6: 
          this.loggedInType = true;
          this.tabViewTable= false;
          this.singleViewTable = true;
          this.nxt_cptr();
          console.info('beo backend Inprogress type 2 report only');
          break;
        case 9: 
           this.loggedInType = true;
           this.tabViewTable= true;
           this.transferReasonTab = true;
           this.singleViewTable = false;
           this.nxt_st({"district_id":Number(this.session.districtId()),"district_name":this.session.districtName()},1);
           this.nxt_tr({"district_id":Number(this.session.districtId()),"district_name":this.session.districtName()},1);
           console.log(this.session);
           console.info('ceo district Inprogress type 1 first type 2 second report');
          break;
        case 10:
          this.loggedInType = true;
          this.tabViewTable= false;
          this.transferReasonTab = true;
          this.singleViewTable = true;
          this.nxt_cptr();
          console.info('deo Inprogress type 2 report only');
          break;
        case 5:
          console.info('state : ',this.userTypeId);
          this.loggedInType = true;
          this.tabViewTable= true;
          this.singleViewTable = false;
          this.transferReasonTab = false;
          this.schoolTypeRpt = 1;
          this.TransferReasonRpt = 1;
          this.getStudentCommonPoolReport();
          this.getStudentCommonPoolTransferReport();
          break;
        default:
          this.loggedInType = false;
          this.tabViewTable= false;
          this.singleViewTable = false;
          this.transferReasonTab = false;
          console.info('Can`t Found User Type Id : Access Deined (or) Invalid');
          break;
      }
      
      
    }
  
    headerData() {
      this.schoolTypeDataHeader = [
        { field: 'dynCol', header: 'District' ,widthstyle: '14em'},
        { field: 'government', header: 'Government',widthstyle: '7em' },
        { field: 'fullyaided', header: 'Fully Aided' ,widthstyle: '7em'},
        { field: 'PartiallyAided', header: 'Partially Aided' ,widthstyle: '7em'},
        { field: 'unaided', header: 'Un-Aided' ,widthstyle: '7em'},
        { field: 'CentralGovt', header: 'Central Govt' ,widthstyle: '7em'},
        { field: 'total', header: 'Total' ,widthstyle: '7em'},
      ];
      this.transferReasonDataHeader = [
        { field: 'dynCol', header: 'District' ,widthstyle: '14em'},
        { field: 'Long_Absent', header: 'Long Absent',widthstyle: '7em' },
        { field: 'Transfered_by_Parents', header: 'Transfered By Parents' ,widthstyle: '15em'},
        { field: 'Terminal_Class', header: 'Terminal Class' ,widthstyle: '7em'},
        { field: 'Dropped_Out', header: 'Dropped Out' ,widthstyle: '7em'},
        { field: 'total', header: 'Total' ,widthstyle: '7em'},
      ];

      this.editableTRDataHeader = [
        {field:'unique_id_no',header:'EMIS ID',widthstyle: '12em'},
        {field:'NAME',header:'Name',widthstyle: '14em'},
        {field:'class_studying',header:'Class',widthstyle: '8em'},
        {field:'gender_label',header:'Gender',widthstyle: '8em'},
        {field:'father_name',header:'Father Name',widthstyle: '15em'},
        {field:'phone_number',header:'Phone Number',widthstyle: '15em'},
        {field:'udise_code',header:'UDISE Code',widthstyle: '15em'},
        {field:'Reason',header:'Transfer Reason',widthstyle: '16em'},
        {field:'remarks',header:'Remarks',widthstyle: '30em'}
      ];
    }
    grandtotal_gov : number;
    grandtotal_ua: number;
    grandtotal_pa: number;
    grandtotal_cg: number;
    grandtotal_fa: number;
    grandtotal: number;
    grandtotal_la: number;
    grandtotal_tp: number;
    grandtotal_tc: number;
    grandtotal_do: number;
    grandtotal_tr: number;
    
    getStudentCommonPoolReport() { 
      this.schoolTypeRpt = 1;
      this.schoolTypeDetails = [];
      this.StudentService.getStudentCommonPoolReport().subscribe(
        (res) => { if(res.dataStatus == true) {   
                      this.schoolTypeDetails = res.student_migration_details;
                      this.schoolTypeDetails.map(item => {item.total = (Number(item.government) + Number(item.fullyaided) + Number(item.PartiallyAided) + Number(item.unaided));
                                                   item.dynCol = item.district_name;
                         });
                      this.grandtotal_gov = this.schoolTypeDetails.map(c => c.government === '' ? 0 : Number(c.government)).reduce((sum, current) => sum + current);
                      this.grandtotal_ua = this.schoolTypeDetails.map(c => c.unaided === '' ? 0 : Number(c.unaided)).reduce((sum, current) => sum + current);
                      this.grandtotal_pa = this.schoolTypeDetails.map(c => c.PartiallyAided === '' ? 0 : Number(c.PartiallyAided)).reduce((sum, current) => sum + current);
                      this.grandtotal_cg = this.schoolTypeDetails.map(c => c.CentralGovt === '' ? 0 : Number(c.CentralGovt)).reduce((sum, current) => sum + current);
                      this.grandtotal_fa = this.schoolTypeDetails.map(c => c.fullyaided === '' ? 0 : Number(c.fullyaided)).reduce((sum, current) => sum + current);
                      this.grandtotal = this.schoolTypeDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
                      // this.grandtotal_net_change = this.schoolTypeDetails.map(c => c.net_change === '' ? 0 : Number(c.net_change)).reduce((sum, current) => sum + current);
                   }
                   else{
                      console.error(res.message);
                   }
                 },(err)=>console.log(err));
    }
    getStudentCommonPoolTransferReport(){
      this.TransferReasonRpt = 1;
      this.transferReasonDetails = [];
      this.StudentService.getStudentCommonPoolTransferReport().subscribe(
        (res) => { if(res.dataStatus == true) {   
                      this.transferReasonDetails = res.student_migration_details;
                      this.transferReasonDetails.map(item => {item.total = (Number(item.Long_Absent) + Number(item.Transfered_by_Parents) + Number(item.Terminal_Class) + Number(item.Dropped_Out));
                                                   item.dynCol = item.district_name;
                         });
                      this.grandtotal_la = this.transferReasonDetails.map(c => c.Long_Absent === '' ? 0 : Number(c.Long_Absent)).reduce((sum, current) => sum + current);
                      this.grandtotal_tp = this.transferReasonDetails.map(c => c.Transfered_by_Parents === '' ? 0 : Number(c.Transfered_by_Parents)).reduce((sum, current) => sum + current);
                      this.grandtotal_tc = this.transferReasonDetails.map(c => c.Terminal_Class === '' ? 0 : Number(c.Terminal_Class)).reduce((sum, current) => sum + current);
                      this.grandtotal_do = this.transferReasonDetails.map(c => c.Dropped_Out === '' ? 0 : Number(c.Dropped_Out)).reduce((sum, current) => sum + current);
                      this.grandtotal_tr = this.transferReasonDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
                   }
                   else{
                      console.error(res.message);
                   }
                 },(err)=>console.log(err));
    }
    
    nxt_st(rowdata,stg) {
      this.grandtotal_gov = 0;
      this.grandtotal_ua = 0;
      this.grandtotal_pa = 0;
      this.grandtotal_cg = 0;
      this.grandtotal_fa = 0;
      this.grandtotal = 0;
      this.schoolTypeDetails = [];
      if(stg == 1){
        
        this.schoolTypeRpt = (this.userTypeId == 3 || this.userTypeId == 9) ? 4 : 2;
      
        this.schoolTypeDataHeader[0]['header']= 'Block';           
        this.pageTitle1 = rowdata.district_name != '' ? "Students in Common Pool - "+rowdata.district_name+"'s Block wise " : "Students in Common Pool - Block wise " ;
        this.paginator = true ;
        this.rows = "10";
        let val = {"records":{ "block_id":rowdata.block_id,"dist_id":rowdata.district_id,"block_name":rowdata.block_name}};
        this.StudentService.getStudentCommonPoolBlockReport(val).subscribe(
          (res) => { if(res.dataStatus == true) {   
                        
                        this.schoolTypeDetails = res.student_migration_details;
                        this.schoolTypeDetails.map(item => {item.total = (Number(item.government) + Number(item.fullyaided) + Number(item.PartiallyAided) + Number(item.unaided));
                                                     item.dynCol = item.block_name;
                        });
                        this.grandtotal_gov = this.schoolTypeDetails.map(c => c.government === '' ? 0 : Number(c.government)).reduce((sum, current) => sum + current);
                        this.grandtotal_ua = this.schoolTypeDetails.map(c => c.unaided === '' ? 0 : Number(c.unaided)).reduce((sum, current) => sum + current);
                        this.grandtotal_pa = this.schoolTypeDetails.map(c => c.PartiallyAided === '' ? 0 : Number(c.PartiallyAided)).reduce((sum, current) => sum + current);
                        this.grandtotal_cg = this.schoolTypeDetails.map(c => c.CentralGovt === '' ? 0 : Number(c.CentralGovt)).reduce((sum, current) => sum + current);
                        this.grandtotal_fa = this.schoolTypeDetails.map(c => c.fullyaided === '' ? 0 : Number(c.fullyaided)).reduce((sum, current) => sum + current);
                        this.grandtotal = this.schoolTypeDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
                     }
                     else{
                        console.error(res.message);
                     }
                   },(err)=>console.log(err));
        
      }
      else if(stg == 2){
        this.schoolTypeRpt = 3;
        this.schoolTypeDataHeader[0]['header']= 'Udise Code';          
        this.pageTitle1 = "Students in Common Pool - "+rowdata.block_name+"`s school wise ";
        this.paginator = true ;
        this.rows = "10"; 
        this.schoolTypeDataHeader.splice(1, 0, { field: 'school_name', header: 'School' ,widthstyle: '20em'})
        let val = {"records":{ "block_id":"","dist_id":rowdata.district_id,"block_name":rowdata.block_name}};

        this.StudentService.getStudentCommonPoolSchoolReport(val).subscribe(
          (res) => { if(res.dataStatus == true) {   
                        
                        this.schoolTypeDetails = res.student_migration_details;
                        this.schoolTypeDetails.map(item => {item.total = (Number(item.government) + Number(item.fullyaided) + Number(item.PartiallyAided) + Number(item.unaided));
                                                     item.dynCol = item.udise_code;
                        });
                        this.grandtotal_gov = this.schoolTypeDetails.map(c => c.government === '' ? 0 : Number(c.government)).reduce((sum, current) => sum + current);
                        this.grandtotal_ua = this.schoolTypeDetails.map(c => c.unaided === '' ? 0 : Number(c.unaided)).reduce((sum, current) => sum + current);
                        this.grandtotal_pa = this.schoolTypeDetails.map(c => c.PartiallyAided === '' ? 0 : Number(c.PartiallyAided)).reduce((sum, current) => sum + current);
                        this.grandtotal_cg = this.schoolTypeDetails.map(c => c.CentralGovt === '' ? 0 : Number(c.CentralGovt)).reduce((sum, current) => sum + current);
                        this.grandtotal_fa = this.schoolTypeDetails.map(c => c.fullyaided === '' ? 0 : Number(c.fullyaided)).reduce((sum, current) => sum + current);
                        this.grandtotal = this.schoolTypeDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
                     }
                     else{
                        console.error(res.message);
                     }
                   },(err)=>console.log(err));
      }
      else if(stg == 4){
        this.tabViewTable= false;
        this.singleViewTable = true;
        this.transferReasonTab = true;
        this.nxt_cptr();
      }
    }
    
    nxt_tr(rowdata,stg) {
      this.grandtotal_la = 0;
      this.grandtotal_tp = 0;
      this.grandtotal_tc = 0;
      this.grandtotal_do = 0;
      this.grandtotal_tr = 0;
      if(stg == 1){
        this.TransferReasonRpt =  (this.userTypeId == 3 || this.userTypeId == 9) ? 4 : 2;
        this.transferReasonDetails = [];
        this.transferReasonDataHeader[0]['header']= 'Block';           
        this.pageTitle2 = "Students in Common Pool - "+rowdata.district_name+"'s Block wise (Transfer Reason)";
        this.paginator2 = true ;
        this.rows2 = "10";
        let val = {"records":{ "block_id":rowdata.block_id,"dist_id":rowdata.district_id,"block_name":rowdata.block_name}};
        console.log()
        this.StudentService.getStudentCommonPoolTransferBlockReport(val).subscribe(
          (res) => { if(res.dataStatus == true) {   
                        
                        this.transferReasonDetails = res.student_migration_details;
                        this.transferReasonDetails.map(item => {item.total = (Number(item.Long_Absent) + Number(item.Transfered_by_Parents) + Number(item.Terminal_Class) + Number(item.Dropped_Out));
                                                     item.dynCol = item.block_name;
                        });
                        this.grandtotal_la = this.transferReasonDetails.map(c => c.Long_Absent === '' ? 0 : Number(c.Long_Absent)).reduce((sum, current) => sum + current);
                      this.grandtotal_tp = this.transferReasonDetails.map(c => c.Transfered_by_Parents === '' ? 0 : Number(c.Transfered_by_Parents)).reduce((sum, current) => sum + current);
                      this.grandtotal_tc = this.transferReasonDetails.map(c => c.Terminal_Class === '' ? 0 : Number(c.Terminal_Class)).reduce((sum, current) => sum + current);
                      this.grandtotal_do = this.transferReasonDetails.map(c => c.Dropped_Out === '' ? 0 : Number(c.Dropped_Out)).reduce((sum, current) => sum + current);
                      this.grandtotal_tr = this.transferReasonDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
                     }
                     else{
                        console.error(res.message);
                     }
                   },(err)=>console.log(err));
        
      }
      else if(stg == 2){
        this.TransferReasonRpt = 3;
        this.transferReasonDetails = [];
        this.transferReasonDataHeader[0]['header']= 'Udise Code';          
        this.pageTitle2 = "Students in Common Pool - "+rowdata.block_name+"`s school wise (Transfer Reason)";
        this.paginator2 = true ;
        this.rows2 = "10"; 
        this.transferReasonDataHeader.splice(1, 0, { field: 'school_name', header: 'School' ,widthstyle: '20em'})
        let val = {"records":{ "block_id":"","dist_id":rowdata.district_id,"block_name":rowdata.block_name}};

        this.StudentService.getStudentCommonPoolTransferSchoolReport(val).subscribe(
          (res) => { if(res.dataStatus == true) {     
                        this.transferReasonDetails = res.student_migration_details;
                        this.transferReasonDetails.map(item => {item.total = (Number(item.Long_Absent) + Number(item.Transfered_by_Parents) + Number(item.Terminal_Class) + Number(item.Dropped_Out));
                                                     item.dynCol = item.udise_code;
                        });
                        this.grandtotal_la = this.transferReasonDetails.map(c => c.Long_Absent === '' ? 0 : Number(c.Long_Absent)).reduce((sum, current) => sum + current);
                        this.grandtotal_tp = this.transferReasonDetails.map(c => c.Transfered_by_Parents === '' ? 0 : Number(c.Transfered_by_Parents)).reduce((sum, current) => sum + current);
                        this.grandtotal_tc = this.transferReasonDetails.map(c => c.Terminal_Class === '' ? 0 : Number(c.Terminal_Class)).reduce((sum, current) => sum + current);
                        this.grandtotal_do = this.transferReasonDetails.map(c => c.Dropped_Out === '' ? 0 : Number(c.Dropped_Out)).reduce((sum, current) => sum + current);
                        this.grandtotal_tr = this.transferReasonDetails.map(c => c.total === '' ? 0 : Number(c.total)).reduce((sum, current) => sum + current);
                     }
                     else{
                        console.error(res.message);
                     }
                   },(err)=>console.log(err));
      }
      else if(stg == 3){
        this.getStudentCommonPoolTransferReport();
      }
      else if(stg == 4){
        this.tabViewTable= false;
        this.singleViewTable = true;
        this.nxt_cptr();
      }
    }

    nxt_cptr(){      
        this.StudentService.getAlternative().subscribe(
          (res) => { if(res.dataStatus == true) {   
                        this.editableTRDetails = res.student_migration_details;
                        this.editableTRDetails.map(item => {item.gender_label =  (item.gender == 1) ?  'Male' : (item.gender == 2) ?  'Female' : '' ;
                        });
                     }
                     else{
                        console.error(res.message);
                     }
                   },(err)=>console.log(err));
      
    }

    onRowEditInit(rowData) {
      this.cloned[rowData.id] = {...rowData};
    }
    
    onRowEditSave(rowData, index: number) {
    console.log('Save Fns rowData',rowData);
    let data : any =  {'id':rowData.id,'remarks':rowData.remarks,'transfer_reason':rowData.Reason,'unique_id_no':rowData.unique_id_no};
    console.log('converted as rowdata to savedata',data);
        this.StudentService.savestudenttransferreason(data).subscribe(
          (res) => { if(res.dataStatus == true) {
            // this.editableTRDetails[index]['id'] = res.id;
                      console.log(res);
                      console.log('after api called all list',this.editableTRDetails);
                      }
                      else{
                        this.onRowEditCancel(rowData, index);
                      }
        });
  }
  
  onRowEditCancel(rowData, index: number) {
    this.editableTRDetails[index] = this.cloned[rowData.id];
    delete this.cloned[rowData.id];
  }

  // goBack(){
  //   this. loggedInType = true;
  //   this.tabViewTable = true;
  //   this.singleViewTable = false;
  //   this.paginator = true;
  // }

  // Excel
GetStudentscommonpoolreport(){
  this.exportExcelData = [];

  this.editableTRDetails.map(item => {
    return {
      'EMIS ID': item.unique_id_no,
      'Class': item.class_studying,
      'Gender': item.gender_label,
      'Father Name': item.father_name,
      'Phone Number': item.phone_number,
      'UDISE Code': item.udise_code,
      'Transfer Reason': item.Reason,
      'Status': item.admison_status,
      'remarks': item.remarks,
           }    
       }).forEach(item => this.exportExcelData.push(item));
       let studentlist = [];
       for(let Studentlist of this.exportExcelData) {
        studentlist.push(Studentlist);
       }
       return studentlist;
 }

 exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.GetStudentscommonpoolreport());
      const workbook = { Sheets: { 'Students Common Pool Report' : worksheet }, SheetNames: ['Students Common Pool Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (Students Common Pool Report) ');
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
// Firsttable

  }
  