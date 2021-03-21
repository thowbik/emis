import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { UserSessionService } from 'src/services/usersession.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state.service';
@Component({
  selector: 'app-slasschooldistrictwise',
  templateUrl: './slasschooldistrictwise.component.html',
  styleUrls: ['./slasschooldistrictwise.component.scss']
})
export class SlasschooldistrictwiseComponent implements OnInit {
  stud_dist: any;
  public studdist : any; 
  studdistDetail: any;
  schliststudDetail: any;
  schliststud: any;
  stud_block: any;
  stud_school: any;
  public noDataFound : number;
  public pageStage : number;
  dataHeader: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: '0 per', header: 'Average SLAS Score 0%' , widthstyle: ''},{ field: '0-20 per Marks', header: 'Average SLAS Score 0-20% ', widthstyle: ''},{ field: '20-40 per Marks', header: 'Average SLAS Score 20-40% ' , widthstyle: ''},{ field: '40-60 per', header: 'Average SLAS Score 40-60% ' , widthstyle: ''},{ field: '60-80 per Marks', header: 'Average SLAS Score 60-80% ' , widthstyle: ''},{ field: '80-100 per', header: 'Average SLAS Score 80-100% ' , widthstyle: ''}];
  subdataHeader: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: 'district_name', header: 'District' , widthstyle: '18em'},{ field: 'total', header: 'Total Student', widthstyle: '22em'},{ field: 'p0', header: '# ' , widthstyle: '18em'},{ field: 'Per0', header: '% ' , widthstyle: '18em'},{ field: 'Per1', header: '# ' , widthstyle: '18em'},{ field: 'Per2', header: '% ' , widthstyle: '18em'},{ field: 'Per3', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: ''},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per5', header: '% ' , widthstyle: '18em'},{ field: 'Per6', header: '% ' , widthstyle: '18em'}];
  dataHeader1: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: '0 per', header: 'Average SLAS Score 0%' , widthstyle: ''},{ field: '0-20 per Marks', header: 'Average SLAS Score 0-20% ', widthstyle: ''},{ field: '20-40 per Marks', header: 'Average SLAS Score 20-40% ' , widthstyle: ''},{ field: '40-60 per', header: 'Average SLAS Score 40-60% ' , widthstyle: ''},{ field: '60-80 per Marks', header: 'Average SLAS Score 60-80% ' , widthstyle: ''},{ field: '80-100 per', header: 'Average SLAS Score 80-100% ' , widthstyle: ''}];
  subdataHeader1: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: 'block_name', header: 'Block' , widthstyle: '18em'},{ field: 'total', header: 'Total Student', widthstyle: '22em'},{ field: 'p0', header: '# ' , widthstyle: '18em'},{ field: 'Per0', header: '% ' , widthstyle: '18em'},{ field: 'Per1', header: '# ' , widthstyle: '18em'},{ field: 'Per2', header: '% ' , widthstyle: '18em'},{ field: 'Per3', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: ''},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per5', header: '% ' , widthstyle: '18em'},{ field: 'Per6', header: '% ' , widthstyle: '18em'}];
  dataHeader2: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: '0 per', header: 'Average SLAS Score 0%' , widthstyle: ''},{ field: '0-20 per Marks', header: 'Average SLAS Score 0-20% ', widthstyle: ''},{ field: '20-40 per Marks', header: 'Average SLAS Score 20-40% ' , widthstyle: ''},{ field: '40-60 per', header: 'Average SLAS Score 40-60% ' , widthstyle: ''},{ field: '60-80 per Marks', header: 'Average SLAS Score 60-80% ' , widthstyle: ''},{ field: '80-100 per', header: 'Average SLAS Score 80-100% ' , widthstyle: ''}];
  subdataHeader2: Array<{'field': string, 'header': string, 'widthstyle': string}> = [{ field: 'school_name', header: 'School' , widthstyle: '18em'},{ field: 'total', header: 'Total Student', widthstyle: '22em'},{ field: 'p0', header: '# ' , widthstyle: '18em'},{ field: 'Per0', header: '% ' , widthstyle: '18em'},{ field: 'Per1', header: '# ' , widthstyle: '18em'},{ field: 'Per2', header: '% ' , widthstyle: '18em'},{ field: 'Per3', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: ''},{ field: 'Per4', header: '# ' , widthstyle: '18em'},{ field: 'Per4', header: '% ' , widthstyle: '18em'},{ field: 'Per5', header: '% ' , widthstyle: '18em'},{ field: 'Per6', header: '% ' , widthstyle: '18em'}];

  constructor(private http: HttpClient,private StateService:StateService,private dataService: DataService, private userSessionService: UserSessionService) { 
  }

  ngOnInit() {
    // const districtId = this.userSessionService.districtId();
    // const blockId = this.userSessionService.blockId();
    // if(!districtId || !blockId){
    //   this.apilistdistrict();
    // }
    // if(districtId){
    //   this.distwisestudetrep(districtId)
    // }
    // if(blockId){
    //   this.studschool(blockId)
    // }
    const districtId = this.userSessionService.districtId();
        const blockId = this.userSessionService.blockId();
    if(!districtId){
    this.apilistdistrict();
    }
    if(districtId){
      this.distwisestudetrep(districtId)
    }
    if(blockId){
        this.studschool(blockId)
      }
  }
   
    // Districtwise
  apilistdistrict() {   
    this.StateService.districtdatastudent().subscribe((res) => {
      this.pageStage = 1;
      if(res.osclist.student_migration_details.length>0){
        this.stud_dist=res.osclist.student_migration_details;    
        console.log("Districtwise",this.stud_dist)
      }
      else
      {
        this.noDataFound = 1;
      }
    });
  }
// blockwise
  distwisestudetrep(distid){
    this.pageStage = 2;
    this.StateService.blkwisestudent(distid).subscribe(
      details => {
        if(details.osclist.student_migration_details.length>0)
        {
          this.studdistDetail = details.osclist.student_migration_details
          console.log("Blockwise",this.studdistDetail)

        }
        else 
        {
          this.noDataFound = 2 ;
        }
      }
    ) 
   }

  //  schoolwise
  studschool(blkid){
    this.pageStage = 3;
    this.StateService.schlwisestudent(blkid).subscribe(
      schlblk => {
        if(schlblk.osclist.student_migration_details.length>0)
        {
          this.schliststudDetail = schlblk.osclist.student_migration_details
          console.log("Schoolwise",this.schliststudDetail);

        
        }
        else
        {
          this.noDataFound = 3;
        }
        
      }
    ) 
  }
}
