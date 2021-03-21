import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-migration-report',
  templateUrl: './student-migration-report.component.html',
  styleUrls: ['./student-migration-report.component.css']
})
export class StudentMigrationReportComponent implements OnInit {

  public sesnId: any;
  public userTypeId: number;
  public loggedInType: boolean = false;
  public deinedurl: any;
  public districtId: any;
  public pageStage : number;

  parentData: any[] = [];
  childData: any[] = [];
  dataHeader: Array<{'field':string,'header':string,'widthstyle':string}> = [];
  dataHeader2 : Array<{'field':string,'header':string,'widthstyle':string}> = [];
  paginator: boolean = false ;
  rows : any = "0";
  exportExcelData: any;
  

  constructor(private session: UserSessionService,
    private StudentService: StudentService) {
      /* ✦ ID from session */
    this.userTypeId = Number(this.session.userTypeId());
    this.deinedurl= './assets/img/AccessDeniedError.png';
      switch(this.userTypeId){
        case 2: case 3: case 6:
          console.info('User Type Id : ',this.userTypeId);
          this.loggedInType = true;
          break;
        case 9: case 5: case 10:
          console.info('User Type Id : ',this.userTypeId);
          this.loggedInType = true;
          break;
        default:
          this.loggedInType = false;
          console.info('Can`t Found User Type Id : Access Deined (or) Invalid');
          break;
      }
    }

  ngOnInit() { 
    this.headerData();
    this.getStudentMigrationReport();
  }

  headerData() {
    this.dataHeader = [
      { field: 'block_name', header: 'Block' ,widthstyle: '14em'},
      { field: 'gtofa', header: 'Gov-Aid',widthstyle: '6em' },
      { field: 'gtoua', header: 'Gov-Pvt' ,widthstyle: '6em'},
      { field: 'gtopa', header: 'Gov-Otr' ,widthstyle: '6em'},
      { field: 'total_outflow', header: 'Total Outflow' ,widthstyle: '6em'},
      { field: 'uatog', header: 'Pvt-Gov' ,widthstyle: '6em'},
      { field: 'fatog', header: 'Aid-Gov' ,widthstyle: '6em'},
      { field: 'patog', header: 'Otr-Gov' ,widthstyle: '6em'},
      { field: 'total_inflow', header: 'Total Inflow' ,widthstyle: '6em'},
      { field: 'net_change', header: 'Net Change' ,widthstyle: '6em'},
    ];
    this.dataHeader2 = [
      { field: 'district_name', header: 'District' ,widthstyle: '15em'},
      { field: 'EMIS_ID', header: 'EMIS ID' ,widthstyle: '15em'},
      { field: 's_name', header: 'Name' ,widthstyle: '15em'},
      { field: 'udise1', header: 'UDISE Code' ,widthstyle: '15em'},
      { field: 'schname1', header: 'Transfer School Name' ,widthstyle: '25em'},
      { field: 'udise2', header: 'UDISE Code' ,widthstyle: '15em'},
      { field: 'schname2', header: 'Admitted School Name' ,widthstyle: '25em'},
  ];
  switch(this.userTypeId){
    case 2: case 6:
      this.dataHeader[0] = { field: 'schname2', header: 'School' ,widthstyle: '14em'};
      this.paginator = true ;
      this.rows = "10";
      this.dataHeader2[0] = { field: 'block_name', header: 'Block' ,widthstyle: '14em'};
      break;
    case 5:
      this.dataHeader[0] = { field: 'district_name', header: 'District' ,widthstyle: '14em'};
      break;
    case 10:
      this.dataHeader[0] = { field: 'district_name', header: 'District' ,widthstyle: '14em'};
      this.dataHeader2[0] = { field: 'block_name', header: 'District' ,widthstyle: '14em'};
      break;
  }
  console.log(this.dataHeader);
  console.log(this.dataHeader2);
  }
  grandtotal_gtofa : number;
  grandtotal_gtoua: number;
  grandtotal_gtopa: number;
  grandtotal_outflow: number;
  grandtotal_uatog: number;
  grandtotal_fatog: number;
  grandtotal_patog: number;
  grandtotal_inflow: number;
  grandtotal_net_change: number;

  getStudentMigrationReport() { 
    this.pageStage = 1;
    this.parentData = [];
    this.StudentService.getStudentMigrationReport().subscribe(
      (res) => { if(res.dataStatus == true) {   
                    this.parentData = res.migrationDetails;
                    this.parentData.map(item => {item.total_outflow = (Number(item.gtofa)+Number(item.gtoua)+Number(item.gtopa));
                                                 item.total_inflow = (Number(item.fatog)+Number(item.uatog)+Number(item.patog));
                                                 item.net_change= (Number(item.total_inflow)-Number(item.total_outflow));
                    });
                    this.grandtotal_gtofa = this.parentData.map(c => c.gtofa === '' ? 0 : Number(c.gtofa)).reduce((sum, current) => sum + current);
                    this.grandtotal_gtoua = this.parentData.map(c => c.gtoua === '' ? 0 : Number(c.gtoua)).reduce((sum, current) => sum + current);
                    this.grandtotal_gtopa = this.parentData.map(c => c.gtopa === '' ? 0 : Number(c.gtopa)).reduce((sum, current) => sum + current);
                    this.grandtotal_outflow = this.parentData.map(c => c.total_outflow === '' ? 0 : Number(c.total_outflow)).reduce((sum, current) => sum + current);
                    this.grandtotal_uatog = this.parentData.map(c => c.uatog === '' ? 0 : Number(c.uatog)).reduce((sum, current) => sum + current);
                    this.grandtotal_fatog = this.parentData.map(c => c.fatog === '' ? 0 : Number(c.fatog)).reduce((sum, current) => sum + current);
                    this.grandtotal_patog = this.parentData.map(c => c.patog === '' ? 0 : Number(c.patog)).reduce((sum, current) => sum + current);
                    this.grandtotal_inflow = this.parentData.map(c => c.total_inflow === '' ? 0 : Number(c.total_inflow)).reduce((sum, current) => sum + current);
                    this.grandtotal_net_change = this.parentData.map(c => c.net_change === '' ? 0 : Number(c.net_change)).reduce((sum, current) => sum + current);
                 }
                 else{
                    alert(res.message);
                 }
               },(err)=>console.log(err));
 }
 secondPageTitle : string = '';
 nxt(from,to){
  this.pageStage = 2;
  this.childData = [];
  this.secondPageTitle = "( "+from+" To "+to+" )";
  this.StudentService.getStudentMigrationReport2(from,to).subscribe((res) => { if(res.dataStatus == true) {   this.childData = res.migrationDetails; }else{ alert(res.message); }},(err)=>console.log(err));
 }
//  Excel
getStudentmigrationreport(){
  this.exportExcelData = [];
  this.parentData.map(item => {
    return {
      'Block': item.block_name,
      'Gov-Aid': item.gtofa,
      'Gov-Pvt': item.gtoua,
      'Gov-Otr': item.gtopa,
      'total Outflow': item.total_outflow,
      'Pvt-Gov': item.uatog,
      'Aid-Gov': item.fatog,
      'Otr-Gov': item.patog,
      'total Inflow': item.total_inflow,
      'net change': item.net_change,

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
      const worksheet = xlsx.utils.json_to_sheet(this.getStudentmigrationreport());
      const workbook = { Sheets: { 'Student Migration Report' : worksheet }, SheetNames: ['Student Migration Report'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.districtId +' (Student Migration Report) ');
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