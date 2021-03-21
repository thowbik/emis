import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';


@Component({
  selector: 'app-noonmeal-student-report',
  templateUrl: './noonmeal-student-report.component.html',
  styleUrls: ['./noonmeal-student-report.component.scss']
})
export class NoonmealStudentReportComponent implements OnInit {
  public dataHeader: any;
  noonmeal_count_details : any[] = [];
  public pageStage : number;
  dataHeader2: { field: string; header: string; widthstyle: string; }[];
  meal_school_details: any;
  nodateFound2: boolean;
  nodateFound: boolean;
  constructor(private stateService : StateService, private routers : Router, private userSessionService: UserSessionService) { }

  ngOnInit() {
    const districtid = this.userSessionService.districtId();
   
    if(!districtid){
      this.getNoonMealDetails();
    }

    if(districtid){
      this.onSelectedId(districtid)
    }


    this.dataHeader=[];
    this.dataHeader = [
      {field: 'district_name', header: 'District' ,widthstyle:'11em'},
      { field: 'HM', header: 'Total',widthstyle:'11em' },
      { field: 'PGteacher', header: 'Opted For Noon Meals', widthstyle:'11em' },
  ];

  this.dataHeader2 = [
    {field: 'district_name', header: 'District', widthstyle:'13em' },
    { field: 'block_name', header: 'Block Name', widthstyle:'11em'},
    { field: 'udise_code', header: 'UDISE Code', widthstyle:'10em' },
    { field: 'school_name', header: 'School Name', widthstyle:'13em' },
    { field: 'meals', header: 'Opted For Noon Meals' , widthstyle:'15em' },
    { field: 'total', header: 'Total', widthstyle:'9em' },
];
  }

  getNoonMealDetails(){
    this.stateService.getNoonmealCountDetails().subscribe(
      list=>{       
         this.pageStage = 1;
        // console.log('nonmeal',list);
        if( list.result.noonmeal_count_details.length>0){
          this.noonmeal_count_details = list.result.noonmeal_count_details
        }
      else
      {
        this.nodateFound = true;
      }
      }
    )
  }

  onSelectedId(NoonMeal){
    this.stateService.getDistrictwiseNoonmealDetails(NoonMeal).subscribe(
      details => {
        this.pageStage = 2;
        if( details.result.meal_school_details.length>0){
          this.meal_school_details =  details.result.meal_school_details;
        }
        else
        {
          this.nodateFound2 = true;
        }
         //  this.routers.navigate(['/districtwise/noonmeal/student/Report'], details.result.meal_school_details)
      }
    )
  }

}
