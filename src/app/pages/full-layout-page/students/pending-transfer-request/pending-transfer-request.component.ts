
  import { Component, OnInit} from '@angular/core';
  import { DatePipe } from '@angular/common';
  /** Imported - Service Are */
  import { UserSessionService } from 'src/services/usersession.service';
  import { StudentService } from '../student.service';
  import { AlertService } from 'src/services/alert.service';

  @Component({
    selector: 'app-pending-transfer-request',
    templateUrl: './pending-transfer-request.component.html',
    styleUrls: ['./pending-transfer-request.component.css']
  })

export class PendingTransferRequestComponent implements OnInit {
  pipe = new DatePipe('en-US');
  parentData: Array<Object> = [];
  district: Array<{'value':number,'label':string}>;
  selectedStudents: Array<Object> = [];
  districtfilter:any;
  public sesnId: any;
  districtId : number;
  exportExcelData : any[]=[];
  public dataHeader: Array<Object> =  [
    { field: 'sno', header: 'S.no' ,widthstyle: '6em'},
    { field: 'name', header: 'Name' ,widthstyle: '15em'},
    { field: 'unique_id_no', header: 'EMIS Id' ,widthstyle: '12em'},
    { field: 'dob', header: 'DOB' ,widthstyle: '8em'},
    { field: 'class_studying_id', header: 'Class' ,widthstyle: '7em'},
    { field: 'old_school', header: 'Current School' ,widthstyle: '20em'},
    { field: 'school_name', header: 'Previous School' ,widthstyle: '20em'},
    { field: 'request_date', header: 'Requested Date' ,widthstyle: '14em'},
    { field: 'transfer', header: 'Transfer' ,widthstyle: '8em'},
    { field: 'action', header: 'Action' ,widthstyle: '10em'}
  ];
  
  constructor(private session: UserSessionService,private service: StudentService) { 
     this.districtId = this.session.districtId();
     console.log(this.districtId,"id");
  }

  ngOnInit() {
      this.sesnId = Number(this.session.userId());
     // this.studPendingTransReqt(this.sesnId);
     this.studPendingTransReqt();
  }

  studPendingTransReqt(){
    this.service.studPendingTransReqt(this.districtId).subscribe(
      (res) => { if(res.dataStatus === true){ this.parentData = res.stud_list; }
               else{ alert(res.message); this.parentData = []; }
      this.district = res.dist_list.length>0?res.dist_list.map(item =>{return{value: item['id'],label:item['district_name']}}):[];  
      this.districtfilter = this.districtId;
    });
  }

  onRowReject(id){
    console.log(id);
    this.service.studPendingTransReqtReject(id).subscribe(
      (res) => { if(res.dataStatus === true){ alert(res.message);
                                              this.studPendingTransReqt(); }
               else{ alert(res.message); }
    },(err)=>{console.log('rejection '+id,err)});
  }
  private finalSave : Array<Object>  = [];
  onSubmit(){
    this.finalSave = []; 
    if(this.selectedStudents.length>0){
      this.selectedStudents.forEach((val, inx) => {
                    this.finalSave.push({
                          'unique_id_no':val['unique_id_no'],
                          'school_id_transfer':val['school_id'],
                          'class_studying_id':val['class_studying_id'],
                          'process_type':1,
                          'admission_no':val['school_admission_no'],
                          'medium_of_ins':val['education_medium_id'],
                          'transfer_reason':2,
                          'label':'Transfer Request by Parent'
                        });
      });
              
      if(this.finalSave.length>0){   
        this.service.studPendingTransReqtSave(this.finalSave).subscribe(
          (res) => { if(res.dataStatus === true){ 
                       alert(res.message+' Students Transfered To Common Pool');
                       this.studPendingTransReqt(); 
                       this.selectedStudents = []; }
                   else{ alert(res.message); }
        },(err)=>{console.log('save',err)});
      }}else{
        alert('please select atleast one students');
      }

  }

  //xcel
  gettransferlist()
  {
    this.exportExcelData = [];
    this.parentData.map(item => {
      return {
     
        'Name': item['name'],
        'EMIS Id': item['unique_id_no'],
        'DOB':item['dob'],
        'Class':item['class_studying_id'],
        'Current School':item['old_school'],
        'Previous School':item['school_name'],
        'Requested Date' : item['request_date']
      }
  }).forEach(item => this.exportExcelData.push(item));
    let students = [];
    for(let stud of this.exportExcelData) {
        students.push(stud);
    }
    return students;
  }  
  
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.gettransferlist());
        const workbook = { Sheets: { 'Transfer-Req List': worksheet }, SheetNames: ['Transfer-Req List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Transfer-Req List");
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
}