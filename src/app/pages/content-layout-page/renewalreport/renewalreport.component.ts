import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../../full-layout-page/schools/schools.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-renewalreport',
  templateUrl: './renewalreport.component.html',
  styleUrls: ['./renewalreport.component.css']
})
export class RenewalreportComponent implements OnInit {
  pdfdata: any;
  form: any;
  origin: any;
  dataDEE: boolean;
  pdfdata2: any;
  dataCEO: boolean;
  dataDEO: boolean;
  dataBEO: boolean;
  pdfdata1: any;
  sch_id: any;
  routeData: any;
  schoolId: any;
  pdfdata3: any;

  constructor(private router: Router, private SchoolsService: schoolsService,
    private route: ActivatedRoute) {
    this.sch_id = this.router.getCurrentNavigation().extras;
    this.routeData = this.route.snapshot;
    this.schoolId = this.routeData.queryParams.schoolId;
   }

  ngOnInit() {
    this.getRenewalpdf();
  }

  getRenewalpdf(){
    var schoolid = this.sch_id;
    var schoolid = this.schoolId;
      console.log(schoolid, '------');
    this.SchoolsService.getRenewalPdfDATA(schoolid).subscribe((res) => {

      this.pdfdata2 = res.result3;
      this.pdfdata3 = res.result3[1];
      if(this.pdfdata2[1].user_type_id == 10){
        this.dataDEO = true; 
      } else {
        this.dataDEO = false;
      }

      if(this.pdfdata2[0].user_type_id == 6){
        this.dataBEO = true; 
      } else {
        this.dataBEO = false;
      }

      this.pdfdata1 = res.result1;


      this.pdfdata = res.result[0];
      if (this.pdfdata.sch_directorate_id == 16 || this.pdfdata.sch_directorate_id == 18 || this.pdfdata.sch_directorate_id == 27 || this.pdfdata.sch_directorate_id == 29 || this.pdfdata.sch_directorate_id == 32 || this.pdfdata.sch_directorate_id == 34){
        this.dataDEE = true; 
      } else {
        this.dataDEE = false; 
      }

      let myArray = res.result;
      if (this.pdfdata.order_from_class == 14){
          const objIndexs = myArray.findIndex((obj => obj.order_from_class == 14));
          myArray[objIndexs].order_from_class = "UKG"
      } else if(this.pdfdata.order_from_class == 13){
          const objIndex = myArray.findIndex((obj => obj.order_from_class == 13));
          myArray[objIndex].order_from_class = "LKG"
      } else if(this.pdfdata.order_from_class == 15){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 15));
        myArray[objIndex].order_from_class = "PKG"
      } else if(this.pdfdata.order_from_class == 1){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 1));
        myArray[objIndex].order_from_class = "I"
      } else if(this.pdfdata.order_from_class == 2){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 2));
        myArray[objIndex].order_from_class = "II"
      } else if(this.pdfdata.order_from_class == 3){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 3));
        myArray[objIndex].order_from_class = "III"
      } else if(this.pdfdata.order_from_class == 4){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 4));
        myArray[objIndex].order_from_class = "IV"
      } else if(this.pdfdata.order_from_class == 5){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 5));
        myArray[objIndex].order_from_class = "V"
      } else if(this.pdfdata.order_from_class == 6){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 6));
        myArray[objIndex].order_from_class = "VI"
      } else if(this.pdfdata.order_from_class == 7){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 7));
        myArray[objIndex].order_from_class = "VII"
      } else if(this.pdfdata.order_from_class == 8){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 8));
        myArray[objIndex].order_from_class = "VIII"
      } else if(this.pdfdata.order_from_class == 9){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 9));
        myArray[objIndex].order_from_class = "IX"
      } else if(this.pdfdata.order_from_class == 10){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 10));
        myArray[objIndex].order_from_class = "X"
      } else if(this.pdfdata.order_from_class == 11){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 11));
        myArray[objIndex].order_from_class = "XI"
      } else if(this.pdfdata.order_from_class == 12){
        const objIndex = myArray.findIndex((obj => obj.order_from_class == 12));
        myArray[objIndex].order_from_class = "XII"
      }
      
      if (this.pdfdata.order_to_class == 14){
        const objIndexs = myArray.findIndex((obj => obj.order_to_class == 14));
        myArray[objIndexs].order_to_class = "UKG"
      } else if(this.pdfdata.order_to_class == 13){
          const objIndex = myArray.findIndex((obj => obj.order_to_class == 13));
          myArray[objIndex].order_to_class = "LKG"
      } else if(this.pdfdata.order_to_class == 15){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 15));
        myArray[objIndex].order_to_class = "PKG"
      } else if(this.pdfdata.order_to_class == 1){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 1));
        myArray[objIndex].order_to_class = "I"
      } else if(this.pdfdata.order_to_class == 2){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 2));
        myArray[objIndex].order_to_class = "II"
      } else if(this.pdfdata.order_to_class == 3){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 3));
        myArray[objIndex].order_to_class = "III"
      } else if(this.pdfdata.order_to_class == 4){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 4));
        myArray[objIndex].order_to_class = "IV"
      } else if(this.pdfdata.order_to_class == 5){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 5));
        myArray[objIndex].order_to_class = "V"
      } else if(this.pdfdata.order_to_class == 6){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 6));
        myArray[objIndex].order_to_class = "VI"
      } else if(this.pdfdata.order_to_class == 7){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 7));
        myArray[objIndex].order_to_class = "VII"
      } else if(this.pdfdata.order_to_class == 8){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 8));
        myArray[objIndex].order_to_class = "VIII"
      } else if(this.pdfdata.order_to_class == 9){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 9));
        myArray[objIndex].order_to_class = "IX"
      } else if(this.pdfdata.order_to_class == 10){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 10));
        myArray[objIndex].order_to_class = "X"
      } else if(this.pdfdata.order_to_class == 11){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 11));
        myArray[objIndex].order_to_class = "XI"
      } else if(this.pdfdata.order_to_class == 12){
        const objIndex = myArray.findIndex((obj => obj.order_to_class == 12));
        myArray[objIndex].order_to_class = "XII"
      }

    })
  }
}
