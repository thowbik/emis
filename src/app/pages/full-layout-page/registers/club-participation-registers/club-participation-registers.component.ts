import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-participation-registers',
  templateUrl: './club-participation-registers.component.html',
  styleUrls: ['./club-participation-registers.component.css']
})
export class ClubParticipationRegistersComponent implements OnInit {
  selectedColumns: { field: string; header: string; }[];
  data : any;
  exportExcelData : any;
  exportColumns: { title: string; dataKey: string; }[];

  constructor(private register :RegistersService, private usser : UserSessionService,private router: Router ) { }

  ngOnInit() {
      this.getApi();
      this.selectedColumns =[
       
        { field: 'EMIS_ID', header: 'EMIS ID ' },
        { field: 'StudName', header: 'Student Name' },
        { field: 'Class', header: 'Class'},
        { field: 'ParticipationIn', header: 'Participating In'},
        { field: 'Detail', header: 'Details'},
        { field: 'AcademicYr', header: 'Academic Year'},
      ];
    }
     
    getApi()
    {
      this.register.getClubParticipationRegister().subscribe((res) =>
      {
        this.data = res.result;
        console.log(this.data);
      })
    }
    getclubparticipationreports()
    {
        this.exportExcelData = [];
        return this.data.map(item =>{
          return{
            'EMIS ID' : item.EMIS_ID ,
            'Student Name' : item.StudName ,
            'Class' : item.Class ,
            'Participating In' : item.ParticipationIn ,
            'Details' : item.Detail ,
            'Academic Year' : item.AcademicYr ,
    }
        });
      }
      
    exportExcel() {
        import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(this.getclubparticipationreports());
         const workbook = { Sheets: { 'Club Participation Details' : worksheet }, SheetNames: ['Club Participation Details'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer,' (Club Participation Details) ');
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
//PDF

exportPdf(){
  this.exportColumns = this.selectedColumns.map(col => ({title: col.header , dataKey: col.field}));
  import("jspdf").then(jsPDF => {
    import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0,0);
        doc.setFontSize(13);
        doc.text('Club Participation Details ', 14, 15);
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.autoTable(this.exportColumns,this.data,
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

  getRegister()
  {
    this.router.navigate(['registers']);
  }
    }

