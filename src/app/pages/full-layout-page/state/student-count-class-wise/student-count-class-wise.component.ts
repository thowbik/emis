import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-student-count-class-wise',
  templateUrl: './student-count-class-wise.component.html',
  styleUrls: ['./student-count-class-wise.component.scss']
})
export class StudentCountClassWiseComponent implements OnInit {
  schooltypedropvalue: { label: string; value: number; }[];
  teacherdetails: any = {district_wise: ''};
  district_wise: any[] = [];
  blockSpecial: RegExp = /^[^<>*!]+$/
  blockSpace: RegExp = /[^\s]/;
  ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
  cc: string;
 schoolType:any;
 final_school_type:any;
Prkg:any;
LKG:any;
UKG:any;
class_1:any;
class_2:any;
class_3:any;
class_4:any;
class_5:any;
class_6:any;
class_7:any;
class_8:any;
class_9:any;
class_10:any;
class_11:any;
class_12:any;
  public nodateFound : boolean = false;
  public nodateFound2 : boolean = false;
  public nodateFound3 : boolean = false;
  public pageStage : number;
  public blockwiseDetails : any[] = [];
  public studentsList : any[] = [];
  

  constructor(private stateService:StateService,private userSessionService: UserSessionService,private routers : Router,
    private route: ActivatedRoute,
    private router: Router ) { 
      this.schooltypedropvalue = [
        {label:'Goverment', value: 1},
        {label:'Fully Aided', value: 2},
        {label:'Un-aided', value:3},
        {label:'Partially Aided', value:4},
        {label:'Central Govt', value:5},
        // {label:'All Schools', value:5}
      ];
    }
    public schemesListArr: any[]= [];
    


    

    cols: Array<{'field':string,'header':string,'widthstyle':string}> =
    [
    { field: 'district_name', header: 'District',widthstyle: '10em'},
    { field: 'Prkg', header: 'Pre-Kg',widthstyle: '8em'},
    { field: 'LKG', header: 'LKG' ,widthstyle: '7em'},
    { field: 'UKG', header: 'UKG',widthstyle: '7em' },
    { field: 'class_1', header: 'I',widthstyle: '7em' },
    { field: 'class_2', header: 'II',widthstyle: '7em' },
    { field: 'class_3', header: 'III',widthstyle: '7em' },
    { field: 'class_4', header: 'IV',widthstyle: '7em' },
    { field: 'class_5', header: 'V',widthstyle: '7em' },
    { field: 'class_6', header: 'VI',widthstyle: '7em' },
    { field: 'class_7', header: 'VII',widthstyle: '7em' },
    { field: 'class_8', header: 'VIII',widthstyle: '7em' },
    { field: 'class_9', header: 'IX',widthstyle: '7em' },
    { field: 'class_10', header: 'X',widthstyle: '7em' },
    { field: 'class_11', header: 'XI',widthstyle: '7em' },
    { field: 'class_12', header: 'XII',widthstyle: '7em' },
    { field: 'total', header: 'TOTAL',widthstyle: '7em' },
    ];

    // stage 2

    cols2: Array<{'field':string,'header':string,'widthstyle':string}> =
    [
    { field: 'block_name', header: 'Block',widthstyle: '10em'},
    { field: 'Prkg', header: 'Pre-Kg',widthstyle: '8em'},
    { field: 'LKG', header: 'LKG' ,widthstyle: '7em'},
    { field: 'UKG', header: 'UKG',widthstyle: '7em' },
    { field: 'class_1', header: 'I',widthstyle: '7em' },
    { field: 'class_2', header: 'II',widthstyle: '7em' },
    { field: 'class_3', header: 'III',widthstyle: '7em' },
    { field: 'class_4', header: 'IV',widthstyle: '7em' },
    { field: 'class_5', header: 'V',widthstyle: '7em' },
    { field: 'class_6', header: 'VI',widthstyle: '7em' },
    { field: 'class_7', header: 'VII',widthstyle: '7em' },
    { field: 'class_8', header: 'VIII',widthstyle: '7em' },
    { field: 'class_9', header: 'IX',widthstyle: '7em' },
    { field: 'class_10', header: 'X',widthstyle: '7em' },
    { field: 'class_11', header: 'XI',widthstyle: '7em' },
    { field: 'class_12', header: 'XII',widthstyle: '7em' },
    { field: 'total', header: 'TOTAL',widthstyle: '7em' },
    ];

    // Stage 3

    cols3: Array<{'field':string,'header':string,'widthstyle':string}> =
  [
    { field: 'SNO', header: 'S.NO',widthstyle: '5em'},
    { field: 'district_name', header: 'School',widthstyle: '14em'},
    { field: 'udise', header: 'Udise Code',widthstyle: '10em'},
    { field: 'Prkg', header: 'Pre-Kg',widthstyle: '8em'},
    { field: 'LKG', header: 'LKG' ,widthstyle: '7em'},
    { field: 'UKG', header: 'UKG',widthstyle: '7em' },
    { field: 'class_1', header: 'I',widthstyle: '7em' },
    { field: 'class_2', header: 'II',widthstyle: '7em' },
    { field: 'class_3', header: 'III',widthstyle: '7em' },
    { field: 'class_4', header: 'IV',widthstyle: '7em' },
    { field: 'class_5', header: 'V',widthstyle: '7em' },
    { field: 'class_6', header: 'VI',widthstyle: '7em' },
    { field: 'class_7', header: 'VII',widthstyle: '7em' },
    { field: 'class_8', header: 'VIII',widthstyle: '7em' },
    { field: 'class_9', header: 'IX',widthstyle: '7em' },
    { field: 'class_10', header: 'X',widthstyle: '7em' },
    { field: 'class_11', header: 'XI',widthstyle: '7em' },
    { field: 'class_12', header: 'XII',widthstyle: '7em' },
    { field: 'total', header: 'TOTAL',widthstyle: '7em' },
  ];

  ngOnInit() {


    // Set district Id

    const districtId = this.userSessionService.districtId();
    const blockId = this.userSessionService.userId();
    const user_id = this.userSessionService.userTypeId();
   
if(districtId==null || districtId==""){
     
      this.getStudentDetails();
    }

  else if(districtId!="" && user_id!=2 && districtId!=null){
  
      this.onSelectedId(districtId);
    }
    else if(blockId!=null)
    {
    
      this.onSelectedSchoolId(blockId);
    }

   }

   StateSchoolTypeOption(event)
   {
     console.log(event.value);
     this.schoolType=event.value;
    this.stateService.getStatedistrictlistClasses(event.value).subscribe(
      list=>{
        this.pageStage = 1;
        if(list.classcount.length>0){
            this.district_wise = list.classcount
            this.Prkg = this.district_wise.map(c => c.Prkg === '' ? 0 : Number(c.Prkg)).reduce((sum, current) => sum + current);
            this.LKG = this.district_wise.map(c => c.LKG === '' ? 0 : Number(c.LKG)).reduce((sum, current) => sum + current);
            this.UKG = this.district_wise.map(c => c.UKG === '' ? 0 : Number(c.UKG)).reduce((sum, current) => sum + current);
            this.class_1 = this.district_wise.map(c => c.class_1 === '' ? 0 : Number(c.class_1)).reduce((sum, current) => sum + current);
            this.class_2 = this.district_wise.map(c => c.class_2 === '' ? 0 : Number(c.class_2)).reduce((sum, current) => sum + current);
            this.class_3 = this.district_wise.map(c => c.class_3 === '' ? 0 : Number(c.class_3)).reduce((sum, current) => sum + current);
            this.class_4 = this.district_wise.map(c => c.class_4 === '' ? 0 : Number(c.class_4)).reduce((sum, current) => sum + current);
            this.class_5 = this.district_wise.map(c => c.class_5 === '' ? 0 : Number(c.class_5)).reduce((sum, current) => sum + current);
            this.class_6 = this.district_wise.map(c => c.class_6 === '' ? 0 : Number(c.class_6)).reduce((sum, current) => sum + current);
            this.class_7 = this.district_wise.map(c => c.class_7 === '' ? 0 : Number(c.class_7)).reduce((sum, current) => sum + current);
            this.class_8 = this.district_wise.map(c => c.class_8 === '' ? 0 : Number(c.class_8)).reduce((sum, current) => sum + current);
            this.class_9 = this.district_wise.map(c => c.class_9 === '' ? 0 : Number(c.class_9)).reduce((sum, current) => sum + current);
            this.class_10 = this.district_wise.map(c => c.class_10 === '' ? 0 : Number(c.class_10)).reduce((sum, current) => sum + current);
            this.class_11 = this.district_wise.map(c => c.class_11 === '' ? 0 : Number(c.class_11)).reduce((sum, current) => sum + current);
            this.class_12 = this.district_wise.map(c => c.class_12 === '' ? 0 : Number(c.class_12)).reduce((sum, current) => sum + current);
          }
        else
        {
          this.nodateFound = true;
        }
      }
    )
   }
  
   //$this->db->SELECT(  class_1, class_2, class_3, class_4, class_5, class_6,class_7,
   // class_8,class_9,class_10,class_11,class_12, Prkg, LKG, UKG)
  

  getStudentDetails(){
    this.stateService.getstudentdistrictlistClasses().subscribe(
      list=>{
        this.pageStage = 1;
        if(list.classcount.length>0){
            this.district_wise = list.classcount

            this.Prkg = this.district_wise.map(c => c.Prkg === '' ? 0 : Number(c.Prkg)).reduce((sum, current) => sum + current);
            this.LKG = this.district_wise.map(c => c.LKG === '' ? 0 : Number(c.LKG)).reduce((sum, current) => sum + current);
            this.UKG = this.district_wise.map(c => c.UKG === '' ? 0 : Number(c.UKG)).reduce((sum, current) => sum + current);
            this.class_1 = this.district_wise.map(c => c.class_1 === '' ? 0 : Number(c.class_1)).reduce((sum, current) => sum + current);
            this.class_2 = this.district_wise.map(c => c.class_2 === '' ? 0 : Number(c.class_2)).reduce((sum, current) => sum + current);
            this.class_3 = this.district_wise.map(c => c.class_3 === '' ? 0 : Number(c.class_3)).reduce((sum, current) => sum + current);
            this.class_4 = this.district_wise.map(c => c.class_4 === '' ? 0 : Number(c.class_4)).reduce((sum, current) => sum + current);
            this.class_5 = this.district_wise.map(c => c.class_5 === '' ? 0 : Number(c.class_5)).reduce((sum, current) => sum + current);
            this.class_6 = this.district_wise.map(c => c.class_6 === '' ? 0 : Number(c.class_6)).reduce((sum, current) => sum + current);
            this.class_7 = this.district_wise.map(c => c.class_7 === '' ? 0 : Number(c.class_7)).reduce((sum, current) => sum + current);
            this.class_8 = this.district_wise.map(c => c.class_8 === '' ? 0 : Number(c.class_8)).reduce((sum, current) => sum + current);
            this.class_9 = this.district_wise.map(c => c.class_9 === '' ? 0 : Number(c.class_9)).reduce((sum, current) => sum + current);
            this.class_10 = this.district_wise.map(c => c.class_10 === '' ? 0 : Number(c.class_10)).reduce((sum, current) => sum + current);
            this.class_11 = this.district_wise.map(c => c.class_11 === '' ? 0 : Number(c.class_11)).reduce((sum, current) => sum + current);
            this.class_12 = this.district_wise.map(c => c.class_12 === '' ? 0 : Number(c.class_12)).reduce((sum, current) => sum + current);
            
          }
        else
        {
          this.nodateFound = true;
        }
      }
    )
  }

  onSelectedId(distwise)
  {
    if( this.schoolType!=undefined)
    {
     this.final_school_type = this.schoolType;
    }
    else
    {
      this.final_school_type = 1;
    }
    this.stateService.getStudentDetails(distwise,this.final_school_type).subscribe(
      details => {
        this.pageStage = 2;
        console.log(details);
        if(details.details.length>0){
          this.blockwiseDetails = details.details;
          this.Prkg = this.blockwiseDetails.map(c => c.PREKG === '' ? 0 : Number(c.PREKG)).reduce((sum, current) => sum + current);
            this.LKG = this.blockwiseDetails.map(c => c.LKG === '' ? 0 : Number(c.LKG)).reduce((sum, current) => sum + current);
            this.UKG = this.blockwiseDetails.map(c => c.UKG === '' ? 0 : Number(c.UKG)).reduce((sum, current) => sum + current);
            this.class_1 = this.blockwiseDetails.map(c => c.class_1 === '' ? 0 : Number(c.class_1)).reduce((sum, current) => sum + current);
            this.class_2 = this.blockwiseDetails.map(c => c.class_2 === '' ? 0 : Number(c.class_2)).reduce((sum, current) => sum + current);
            this.class_3 = this.blockwiseDetails.map(c => c.class_3 === '' ? 0 : Number(c.class_3)).reduce((sum, current) => sum + current);
            this.class_4 = this.blockwiseDetails.map(c => c.class_4 === '' ? 0 : Number(c.class_4)).reduce((sum, current) => sum + current);
            this.class_5 = this.blockwiseDetails.map(c => c.class_5 === '' ? 0 : Number(c.class_5)).reduce((sum, current) => sum + current);
            this.class_6 = this.blockwiseDetails.map(c => c.class_6 === '' ? 0 : Number(c.class_6)).reduce((sum, current) => sum + current);
            this.class_7 = this.blockwiseDetails.map(c => c.class_7 === '' ? 0 : Number(c.class_7)).reduce((sum, current) => sum + current);
            this.class_8 = this.blockwiseDetails.map(c => c.class_8 === '' ? 0 : Number(c.class_8)).reduce((sum, current) => sum + current);
            this.class_9 = this.blockwiseDetails.map(c => c.class_9 === '' ? 0 : Number(c.class_9)).reduce((sum, current) => sum + current);
            this.class_10 = this.blockwiseDetails.map(c => c.class_10 === '' ? 0 : Number(c.class_10)).reduce((sum, current) => sum + current);
            this.class_11 = this.blockwiseDetails.map(c => c.class_11 === '' ? 0 : Number(c.class_11)).reduce((sum, current) => sum + current);
            this.class_12 = this.blockwiseDetails.map(c => c.class_12 === '' ? 0 : Number(c.class_12)).reduce((sum, current) => sum + current);
 
        }
        else
        {
          this.nodateFound2 = true;
        }
        //  this.routers.navigate(['/class/blockwise/count'], details.details)
      }
    )
  }

  onSelectedSchoolId(blockwise)
  {
    if( this.schoolType!=undefined)
    {
     this.final_school_type = this.schoolType;
    }
    else
    {
      this.final_school_type = 1;
    }
    console.log(this.final_school_type);
     this.stateService.getschoolStudentDetails(blockwise,this.final_school_type).subscribe(
      details => {
        console.log(details);
        this.pageStage = 3;
        if(details.details.length>0){
          this.studentsList = details.details;
          this.Prkg = this.studentsList.map(c => c.PREKG === '' ? 0 : Number(c.PREKG)).reduce((sum, current) => sum + current);
          this.LKG = this.studentsList.map(c => c.LKG === '' ? 0 : Number(c.LKG)).reduce((sum, current) => sum + current);
          this.UKG = this.studentsList.map(c => c.UKG === '' ? 0 : Number(c.UKG)).reduce((sum, current) => sum + current);
          this.class_1 = this.studentsList.map(c => c.class_1 === '' ? 0 : Number(c.class_1)).reduce((sum, current) => sum + current);
          this.class_2 = this.studentsList.map(c => c.class_2 === '' ? 0 : Number(c.class_2)).reduce((sum, current) => sum + current);
          this.class_3 = this.studentsList.map(c => c.class_3 === '' ? 0 : Number(c.class_3)).reduce((sum, current) => sum + current);
          this.class_4 = this.studentsList.map(c => c.class_4 === '' ? 0 : Number(c.class_4)).reduce((sum, current) => sum + current);
          this.class_5 = this.studentsList.map(c => c.class_5 === '' ? 0 : Number(c.class_5)).reduce((sum, current) => sum + current);
          this.class_6 = this.studentsList.map(c => c.class_6 === '' ? 0 : Number(c.class_6)).reduce((sum, current) => sum + current);
          this.class_7 = this.studentsList.map(c => c.class_7 === '' ? 0 : Number(c.class_7)).reduce((sum, current) => sum + current);
          this.class_8 = this.studentsList.map(c => c.class_8 === '' ? 0 : Number(c.class_8)).reduce((sum, current) => sum + current);
          this.class_9 = this.studentsList.map(c => c.class_9 === '' ? 0 : Number(c.class_9)).reduce((sum, current) => sum + current);
          this.class_10 = this.studentsList.map(c => c.class_10 === '' ? 0 : Number(c.class_10)).reduce((sum, current) => sum + current);
          this.class_11 = this.studentsList.map(c => c.class_11 === '' ? 0 : Number(c.class_11)).reduce((sum, current) => sum + current);
          this.class_12 = this.studentsList.map(c => c.class_12 === '' ? 0 : Number(c.class_12)).reduce((sum, current) => sum + current);

  
        }
        else
        {
          this.nodateFound3 = true;
        }
        // this.routers.navigate(['/class/schoolwise/count'], details.details)
      }
    )
  }


}
