import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { schoolsService } from '../../full-layout-page/schools/schools.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nocpdf',
  templateUrl: './nocpdf.component.html',
  styleUrls: ['./nocpdf.component.css']
})
export class NocpdfComponent implements OnInit {
  //@ViewChild('printableArea') printableArea:ElementRef;
  @ViewChild('printableArea', { static: false }) printableArea: ElementRef;
  pipe = new DatePipe('en-US');
  public routeParams: any;
  form: FormGroup;
  data: any;
  appdate: string;
  appId: number;
  constructor(private SchoolsService: schoolsService,private route: ActivatedRoute) {
    this.routeParams = route.snapshot.params;
    debugger;
    this.appId = parseInt(this.routeParams.appid);
  }
  ngOnInit() {
    debugger
    var records ={
      "records":{"app_id":this.appId}
    }
    this.SchoolsService.getNocPdfdata(records,true).subscribe(res =>{
     if(res){
       this.data = res.result;
       this.appdate = this.pipe.transform(this.data['app_submit_date'], 'dd-MM-yyyy');
     }
      });
  }

  
  onPdf() {
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
  



    // let data = document.getElementById('printableArea');  
    // html2canvas(data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jspdf('p', 'cm', 'a4'); 
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29);  
    //   pdf.addPage();
    //   pdf.save('Filename.pdf');   
    // }); 
  }
}
