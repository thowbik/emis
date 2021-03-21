import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { UserSessionService } from 'src/services/usersession.service';
import { throttleTime } from 'rxjs/operators';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-udise-summary-report',
  templateUrl: './udise-summary-report.component.html',
  styleUrls: ['./udise-summary-report.component.css']
})
export class UdiseSummaryReportComponent implements OnInit {
  exportColumns: any;
  dataHeader1: { field: string; header: string; widthstyle: string; }[];
  dataHeader12: { field: string; header: string; widthstyle: string; }[];
  exportColumns2: { title: string; dataKey: string; }[];
  dataHeader2: { field: string; header: string; widthstyle: string; }[];
  dataHeader3: { field: string; header: string; widthstyle: string; }[];
  dataHeader4: { field: string; header: string; widthstyle: string; }[];
  dataHeader5: { field: string; header: string; widthstyle: string; }[];
  dataHeader6: { field: string; header: string; widthstyle: string; }[];
  dataHeader7: { field: string; header: string; widthstyle: string; }[];
  UdiseVerification_1: any;
  noDataFound1: boolean;
  exportColumns1: { title: string; dataKey: string; }[];
  UdiseVerification_2: any;
  noDataFound2: boolean;
  noDataFound3: boolean;
  exportColumns3: { title: string; dataKey: string; }[];
  UdiseVerification_3: any;
  noDataFound4: boolean;
  exportColumns4: { title: string; dataKey: string; }[];
  UdiseVerification_4: any;
  noDataFound5: boolean;
  exportColumns5: { title: string; dataKey: string; }[];
  UdiseVerification_5: any;
  noDataFound6: boolean;
  exportColumns6: { title: string; dataKey: string; }[];
  UdiseVerification_6: any;
  exportColumns7: { title: string; dataKey: string; }[];
  noDataFound7: boolean;
  UdiseVerification_7: any;
  Current_User_Name: any;
  Current_User_Type_Id: any;
  Current_District_Name: any;
  Current_Block_Name: string;
  Today_date: Date;
  Today: string;
  Current_E_District_Name: any;

  constructor(public reportsService : ReportsService, public UserSessionService : UserSessionService) { 
    this.Current_User_Name = this.UserSessionService.userName();
    this.Current_User_Type_Id = this.UserSessionService.userTypeId();
    this.Current_District_Name = this.UserSessionService.districtName();
    this.Current_Block_Name = this.UserSessionService.blockName();
    this.Current_E_District_Name = this.UserSessionService.edn_dist_name();

  }

  ngOnInit() {
    this.UdiseVerification1();
    this.UdiseVerification2();
    this.UdiseVerification3();
    this.UdiseVerification4();
    this.UdiseVerification5();
    this.UdiseVerification6();
    this.UdiseVerification7();

    this.Today_date = new Date();
    let year = this.Today_date.getFullYear() ;
    let month = this.Today_date.getMonth() ;
    let date = this.Today_date.getDate() ;
    let day = this.Today_date.getDay() ;
    let hrs = this.Today_date.getHours() ;
    let min = this.Today_date.getMinutes() ;
    let sec = this.Today_date.getSeconds() ;
    this.Today= "Date"+" "+":"+" "+date+ "-" + month + "-" +year+" "+"Time"+" "+":"+" "+ hrs + ":"+min+":"+sec

    this.dataHeader1=[
      { field: 'Schools', header: 'Schools',widthstyle: '6em'},
      { field: 'Govt', header: 'Govt',widthstyle: '6em'},
      { field: 'Aided', header: 'Aided',widthstyle: '6em'},
      { field: 'Unaided', header: 'Unaided',widthstyle: '6em'},
      { field: 'Central', header: 'Central',widthstyle: '6em'},
      { field: 'Others', header: 'Others',widthstyle: '6em'},
      { field: 'Total', header: 'Total',widthstyle: '6em'},
    ];

    this.dataHeader2  =
    [
      { field: 'Staff', header: 'Staff',widthstyle: '5em'},
      { field: 'Regular', header: 'Regular',widthstyle: '5em'},
      { field: 'Contract', header: 'Contract',widthstyle: '5em'},
      { field: 'Part_Time', header: 'Part Time',widthstyle: '5em'},
      { field: 'Teaching', header: 'Total',widthstyle: '5em'},
      { field: 'Non_Teaching', header: 'Non Teaching',widthstyle: '5em'},
    ];

    this.dataHeader3  =
    [
      { field: 'Students', header: 'Students',widthstyle: '6em'},
      { field: 'Boys', header: 'Boys',widthstyle: '6em'},
      { field: 'Girls', header: 'Girls',widthstyle: '6em'},
      { field: 'Transgender', header: 'Transgender',widthstyle: '6em'},
      { field: 'CWSN', header: 'CWSN',widthstyle: '6em'},
      { field: 'Total', header: 'Total',widthstyle: '6em'},
    ];

  this.dataHeader4 =
  [
    { field: 'Students', header: 'Students',widthstyle: '6em'},
    { field: 'General', header: 'General',widthstyle: '6em'},
    { field: 'OBC', header: 'OBC',widthstyle: '6em'},
    { field: 'SC', header: 'SC',widthstyle: '6em'},
    { field: 'ST', header: 'ST',widthstyle: '6em'},
    { field: '', header: 'Others',widthstyle: '6em'},
    { field: 'Total', header: 'Total',widthstyle: '6em'},
  ]; 

  this.dataHeader5 =
  [
    { field: 'School_Type', header: 'Schools Type',widthstyle: '6em'},
    { field: 'Govt', header: 'Govt',widthstyle: '6em'},
    { field: 'Aided', header: 'Aided',widthstyle: '6em'},
    { field: 'Unaided', header: 'Unaided',widthstyle: '6em'},
    { field: 'Central', header: 'Central',widthstyle: '6em'},
    { field: 'Others', header: 'Others',widthstyle: '6em'},
    { field: 'Total', header: 'Total',widthstyle: '6em'},
  ]; 

  this.dataHeader6 =
    [
      { field: 'Labs_in_Higher_Secondary_Schools', header: 'Labs in Higher Secondary Schools',widthstyle: '6em'},
      { field: 'Govt', header: 'Govt',widthstyle: '6em'},
      { field: 'Aided', header: 'Aided',widthstyle: '6em'},
      { field: 'Unaided', header: 'Unaided',widthstyle: '6em'},
      { field: 'Central', header: 'Central',widthstyle: '6em'},
      { field: 'Others', header: 'Others',widthstyle: '6em'},
      { field: 'Total', header: 'Total',widthstyle: '6em'},
    ];

    this.dataHeader7 =
    [
      { field: 'Verification_Parameters', header: 'Verification Parameters',widthstyle: '6em'},
      { field: 'Govt', header: 'Govt',widthstyle: '6em'},
      { field: 'Aided', header: 'Aided',widthstyle: '6em'},
      { field: 'Unaided', header: 'Unaided',widthstyle: '6em'},
      { field: 'Central', header: 'Central',widthstyle: '6em'},
      { field: 'Others', header: 'Others',widthstyle: '6em'},
      { field: 'Total', header: 'Total',widthstyle: '6em'},
    ];
  }

  UdiseVerification1(){
    this.reportsService.UdiseVerification1_API().subscribe((res) => {
      if(res.result.Udise_Verification_1_report != 0){
        const result  = res.result.Udise_Verification_1_report;
          let Govt = 0,Aided = 0, Unaided = 0,Central = 0, Others = 0,Total = 0;   
        for (let i = 0; i < result.length; i++) {
          Govt = Govt + parseInt(result[i].Govt);
          Aided = Aided + parseInt(result[i].Aided);
          Unaided = Unaided + parseInt(result[i].Unaided);
          Central = Central + parseInt(result[i].Central);
          Others = Others + parseInt(result[i].Others);
          Total = Total + parseInt(result[i].Total);
        }
        result.push({Govt, Aided, Unaided, Central, Others, Total, Schools : 'Total'});
        this.UdiseVerification_1 = result;

        this.noDataFound1 = false;        
        this.exportColumns1 = this.dataHeader1.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound1 = true;
      }
    })
  } 

  UdiseVerification2(){
    this.reportsService.UdiseVerification2_API().subscribe((res) => {
      if(res.result.Udise_Verification_2_report != 0){
        this.UdiseVerification_2 = res.result.Udise_Verification_2_report;
        this.noDataFound2 = false;        
        this.exportColumns2 = this.dataHeader2.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound2 = true;
      }
    })
  } 

  UdiseVerification3(){
    this.reportsService.UdiseVerification3_API().subscribe((res) => {
      if(res.result.Udise_Verification_3_report != 0){
        this.UdiseVerification_3 = res.result.Udise_Verification_3_report;
        this.noDataFound3 = false;        
        this.exportColumns3 = this.dataHeader3.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound3 = true;
      }
    })
  } 

  UdiseVerification4(){
    this.reportsService.UdiseVerification4_API().subscribe((res) => {
      if(res.result.Udise_Verification_4_report != 0){
        const result  = res.result.Udise_Verification_4_report;
        let General = 0,OBC = 0, SC = 0,  ST= 0, Others = " ",Total = 0;  
      for (let i = 0; i < result.length; i++) {
        General = General + parseInt(result[i].General);
        OBC = OBC + parseInt(result[i].OBC);
        SC = SC + parseInt(result[i].SC);
        ST = ST + parseInt(result[i].ST);
        // Others = Others + parseInt(result[i].Others);
        Total = Total + parseInt(result[i].Total);
      }
      result.push({General, OBC, SC, ST, Others, Total, Students : 'Total'});
      this.UdiseVerification_4 = result;
        this.noDataFound4 = false;        
        this.exportColumns4 = this.dataHeader4.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound4 = true;
      }
    })
  } 

  UdiseVerification5(){
    this.reportsService.UdiseVerification5_API().subscribe((res) => {
      if(res.result.Udise_Verification_5_report != 0){

        const result  = res.result.Udise_Verification_5_report;
        let Govt = 0,Aided = 0, Unaided = 0,Central = 0, Others = 0,Total = 0;   
      for (let i = 0; i < result.length; i++) {
        Govt = Govt + parseInt(result[i].Govt);
        Aided = Aided + parseInt(result[i].Aided);
        Unaided = Unaided + parseInt(result[i].Unaided);
        Central = Central + parseInt(result[i].Central);
        Others = Others + parseInt(result[i].Others);
        Total = Total + parseInt(result[i].Total);
      }
      result.push({Govt, Aided, Unaided, Central, Others, Total, School_Type	 : 'Total'});
      this.UdiseVerification_5 = result;

        this.noDataFound5 = false;        
        this.exportColumns5 = this.dataHeader5.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound5 = true;
      }
    })
  } 

  UdiseVerification6(){
    this.reportsService.UdiseVerification6_API().subscribe((res) => {
      if(res.result.Udise_Verification_6_report != 0){
        this.UdiseVerification_6 = res.result.Udise_Verification_6_report;
        this.noDataFound6 = false;        
        this.exportColumns6 = this.dataHeader6.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound6 = true;
      }
    })
  } 

  UdiseVerification7(){
    this.reportsService.UdiseVerification7_API().subscribe((res) => {
      if(res.result.Udise_Verification_7_report != 0){
        this.UdiseVerification_7 = res.result.Udise_Verification_7_report;
        this.noDataFound7 = false;        
        this.exportColumns7 = this.dataHeader7.map(col => ({title: col.header, dataKey: col.field}));
      }
      else{
        this.noDataFound7 = true;
      }
    })
  } 

  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
           
            if(this.Current_User_Type_Id ==  9 || this.Current_User_Type_Id == 3 )     //CEO , DC 
            {   
              doc.setFontSize(13);
              doc.text(this.Current_District_Name + ' District UDISE+ 2019-20 Validation Report', 14, 15);
              doc.setFontSize(8);
              doc.setTextColor(100);
              doc.text(this.Today, 14, 20);
            }
            if(this.Current_User_Type_Id ==  5){   //state
              doc.setFontSize(13);
              doc.text(this.Current_User_Name + ' UDISE+ 2019-20 Validation Report', 14, 15);
              doc.setFontSize(8);
              doc.setTextColor(100);
              doc.text(this.Today, 14, 20);
           }
           if(this.Current_User_Type_Id ==  10){   //DEO
              doc.setFontSize(13);
              doc.text(this.Current_E_District_Name + ' Education District UDISE+ 2019-20 Validation Report', 14, 15);
              doc.setFontSize(8);
              doc.setTextColor(100);
              doc.text(this.Today, 14, 20);
           }

           if(this.Current_User_Type_Id ==  6){   //BEO
            doc.setFontSize(13);
            doc.text(this.Current_Block_Name + ' Block UDISE+ 2019-20 Validation Report', 14, 15);
            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(this.Today, 14, 20);
         }

      doc.autoTable(this.exportColumns1,this.UdiseVerification_1,
      {
      theme:'grid',
      fontStyle:'bold',
      fontSize: 8,
      styles: { halign: 'center' , fontStyle:'bold' } ,
      // margin:{ top:10 },
      showHead:'everyPage',
      startY: 23,
      });

      doc.autoTable(this.exportColumns2,this.UdiseVerification_2,
        {
        theme:'grid',
        fontStyle:'bold',
        fontSize: 8,
        styles: { halign: 'center' , fontStyle:'bold' } ,
        });  

      doc.autoTable(this.exportColumns3,this.UdiseVerification_3,{
        theme:'grid',
        fontStyle:'bold',
        fontSize: 8,
        styles: { halign: 'center' , fontStyle:'bold' } 
      });

      doc.autoTable(this.exportColumns4,this.UdiseVerification_4,{
        theme:'grid',
        fontStyle:'bold',
        fontSize: 8,
        styles: { halign: 'center' , fontStyle:'bold' } 
      });

      doc.autoTable(this.exportColumns5,this.UdiseVerification_5,{
        theme:'grid',
        fontStyle:'bold',
        fontSize: 8,
        styles: { halign: 'center' , fontStyle:'bold' } 
      });

      doc.autoTable(this.exportColumns6,this.UdiseVerification_6,{
        theme:'grid',
        fontStyle:'bold',
        fontSize: 8,
        styles: { halign: 'center' , fontStyle:'bold' } 
      });
      
      doc.autoTable(this.exportColumns7,this.UdiseVerification_7,{
        theme:'grid',
        fontStyle:'bold',
        fontSize: 8,
        styles: { halign: 'center' , fontStyle:'bold' } ,
      });

       if(this.Current_User_Type_Id ==  9 || this.Current_User_Type_Id == 3 )     //CEO , DC 
       {   
         doc.save(this.Current_District_Name + ' District UDISE+ 2019-20 Validation Report');
       }
       if(this.Current_User_Type_Id ==  5){   //state
        doc.save(this.Current_User_Name + ' UDISE+ 2019-20 Validation Report');              
      }
      if(this.Current_User_Type_Id ==  6){   //BEO
        doc.save(this.Current_Block_Name + ' Block UDISE+ 2019-20 Validation Report');
      }
      if(this.Current_User_Type_Id ==  10){   //DEO
        doc.save(this.Current_E_District_Name + ' Education District UDISE+ 2019-20 Validation Report');
      }
      })
    })
  }
}
