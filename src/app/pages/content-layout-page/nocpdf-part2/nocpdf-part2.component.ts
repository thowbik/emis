import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { schoolsService } from '../../full-layout-page/schools/schools.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nocpdf-part2',
  templateUrl: './nocpdf-part2.component.html',
  styleUrls: ['./nocpdf-part2.component.css']
})
export class NocpdfPart2Component implements OnInit {
  pipe = new DatePipe('en-US');

  form: FormGroup;
  data: any;
  appdate: string;
  date: any;
 
  constructor(private SchoolsService: schoolsService) { 
    
  }

  ngOnInit() {
    debugger
    this.date = this.pipe.transform(new Date(),'dd-MM-yyyy');
    this.data={
      "records":{"app_id":"30000000"}
    }
    this.SchoolsService.getNocPdfdata(this.data,true).subscribe(res =>{
     if(res){
       this.data = res.result;
       this.appdate = this.pipe.transform(this.data['app_submit_date'], 'dd-MM-yyyy');
     }
      });
  }

  onPdf() {
    // let data = document.getElementById('printableArea');  
    // html2canvas(data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jspdf('p', 'cm', 'a4'); 
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29);  
    //   pdf.save('Filename.pdf');   
    // }); 
    let data = document.getElementById('printableArea');
    html2canvas(data).then(canvas => {
    var imgData = canvas.toDataURL('image/png');
    var imgWidth = 215;
    var pageHeight = 296;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    var doc = new jspdf('p', 'mm', "a4");
    var position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+10);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+10);
        heightLeft -= pageHeight;
    }
  doc.save("filename.pdf");
  });
  
  }

}
