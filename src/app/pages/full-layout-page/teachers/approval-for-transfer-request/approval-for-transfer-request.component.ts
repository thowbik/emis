import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
/** Imported - Service Are */
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-approval-for-transfer-request',
  templateUrl: './approval-for-transfer-request.component.html',
  styleUrls: ['./approval-for-transfer-request.component.css']
})

export class ApprovalForTransferRequestComponent implements OnInit {
pipe = new DatePipe('en-US');
parentData: Array<Object> = [];
district: Array<{'value':number,'label':string}>;
selectedStaff: Array<Object> = [];
districtfilter:any;
public sesnId: any;
exportColumns : any[]=[];
parentDatas: any;

public dataHeader: Array<Object> =  [
  { field: 'from_school_udise_code', header: 'Udise Code' ,widthstyle: '10em'},
  { field: 'from_school_name', header: 'Requested School Name' ,widthstyle: '18em'},
  { field: 'from_school_type', header: 'School Type' ,widthstyle: '12em'},
  { field: 'teacher_name', header: 'Name' ,widthstyle: '14em'},
  { field: 'transfer_reason', header: 'Reason' ,widthstyle: '14em'},
  { field: 'transfer', header: 'Transfer' ,widthstyle: '10em'},
  { field: 'action', header: 'Action' ,widthstyle: '8em'}
];

constructor(private session: UserSessionService,private service: TeacherService) { }

ngOnInit() {
    this.sesnId = Number(this.session.userId());
    this.stfTransReqtDistId(this.sesnId);
}

stfTransReqtDistId(dist){
  this.service.stfTransferReqtList(dist).subscribe(
    (res) => { if(res.dataStatus === true){ 
      this.parentData = res.stf_list; 

      this.parentDatas = res.stf_list.map(function(item){ 
        if(item.transfer_reason == 1){
          item.transfer_reason = 'Transferred to school / office'
        } else if(item.transfer_reason == 2){
          item.transfer_reason = 'Retired / VRS'
        } else if(item.transfer_reason == 3){
          item.transfer_reason = 'Resignation'
        } else if(item.transfer_reason == 4){
          item.transfer_reason = 'Expired'
        } else if(item.transfer_reason == 5){
          item.transfer_reason = 'Suspension / Departmental Action'
        } else if(item.transfer_reason == 6){
          item.transfer_reason = 'Other'
        } else if(item.transfer_reason == 7){
          item.transfer_reason = 'Duplicate Entry'
        }
      })
    
    }
             else{ alert(res.message); this.parentData = []; }
    this.district = res.dist_list.length>0?res.dist_list.map(item =>{return{value: item['id'],label:item['district_name']}}):[];  
    this.districtfilter = dist;
  });
}

onRowReject(id){
  console.log(id);
  this.selectedStaff = [];
  this.service.stfTransferReqtRejection(id).subscribe(
    (res) => { if(res.dataStatus === true){ alert(res.message);
                                            this.stfTransReqtDistId(this.districtfilter); }
             else{ alert(res.message); }
  },(err)=>{console.log('rejection '+id,err)});
}
private finalSave : Array<Object>  = [];
onSubmit(){
  this.finalSave = []; 
  if(this.selectedStaff.length>0){
    this.selectedStaff.forEach((val, inx) => {
                  this.finalSave.push({'teacher_uid':val['teacher_uid'],'id':val['id']});
    });
    console.log(this.finalSave);
    if(this.finalSave.length>0){   
      this.service.stfTransferReqtApprovals(this.finalSave).subscribe(
        (res) => { if(res.dataStatus === true){ 
          alert(res.message+' Staffs Transfered To Common Pool');
                     this.stfTransReqtDistId(this.districtfilter); 
                     this.selectedStaff = []; }
                 else{ alert(res.message); }
      },(err)=>{console.log('save',err)});
    }
  }else{
      alert('please select atleast one Staff');
    }

}

//Excel
    exportExcel(data) {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'Approval transfer List' : worksheet }, SheetNames:['Approval transfer List'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer ,('Approval transfer List'));
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

}