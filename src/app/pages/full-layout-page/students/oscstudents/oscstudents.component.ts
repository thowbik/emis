import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-oscstudents',
  templateUrl: './oscstudents.component.html',
  styleUrls: ['./oscstudents.component.css']
})
export class OscstudentsComponent implements OnInit {
public OSCStudentsListDisct : any[] = [];
public noDataFound1 : boolean = false;
public noDataFound2 : boolean = false;
public noDataFound3 : boolean = false;
public noDataFound4 : boolean = false;
public pageStage : number;
public OSCStudentsListBlock : any[] = [];
public OSCStudentsListschool: any[] = [];
public OSCStudentsListstudent: any[] = [];
// Droppedoutstudentlist
public DroppedStudentsListDisct: any[] = [];
public OSCStudentsListBlockdrop: any[] = [];
public OSCStudentsListschooldrop: any[] = [];
public OSCStudentsListstudentdrop: any[] = [];
public OSCStudent :boolean = false;
 public OSCStudentdrop: boolean = false;
  userTypeId: any;

  constructor(private routers:Router,private studentservice:StudentService, private userSessionService: UserSessionService) { }
  cols: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'district_name', header: 'District Name',widthstyle: '8em'},
  { field: 'cnt', header: 'Dropped Out',widthstyle: '8em'},
];

  cols2: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'block_name', header: 'Block Name',widthstyle: '8em'},
  { field: 'cnt', header: 'Dropped Out',widthstyle: '8em'},
   ];

   cols3: Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'school_name', header: 'School Name',widthstyle: '8em'},
   { field: 'cnt', header: 'Dropped Out',widthstyle: '8em'},
    ];

    cols4: Array<{'field':string,'header':string,'widthstyle':string}> =
    [{ field: 'name', header: 'Student Name',widthstyle: '8em'},
    { field: 'unique_id_no', header: 'Unique ID',widthstyle: '8em'},
    { field: 'class_studying_id', header: 'Class',widthstyle: '8em'},
    { field: 'class_section', header: 'Section',widthstyle: '8em'},
     ];
    //  Droppedoutstudenlist
    cols5: Array<{'field':string,'header':string,'widthstyle':string}> =
    [{ field: 'district_name', header: 'District Name',widthstyle: '8em'},
    { field: 'cnt', header: 'Dropped Out',widthstyle: '8em'},
  ];

  cols6: Array<{'field':string,'header':string,'widthstyle':string}> =
  [{ field: 'block_name', header: 'Block Name',widthstyle: '8em'},
  { field: 'cnt', header: 'Dropped Out',widthstyle: '8em'},
   ];

   cols7: Array<{'field':string,'header':string,'widthstyle':string}> =
   [{ field: 'school_name', header: 'School Name',widthstyle: '8em'},
   { field: 'cnt', header: 'Dropped Out',widthstyle: '8em'},
    ];

    cols8: Array<{'field':string,'header':string,'widthstyle':string}> =
    [{ field: 'name', header: 'Student Name',widthstyle: '8em'},
    { field: 'unique_id_no', header: 'Unique ID',widthstyle: '8em'},
    { field: 'class_studying_id', header: 'Class',widthstyle: '8em'},
    { field: 'class_section', header: 'Section',widthstyle: '8em'},
     ];
  ngOnInit() {
    const districtName = this.userSessionService.districtName();
    const blockName = this.userSessionService.blockName();
    const schoolName = this.userSessionService.schoolName(); 
    const userId = this.userSessionService.userId();
    
    if(!districtName && !blockName ){
      this.getOSCstudent()
    }
    if(districtName){
      this.onSelectedDistrict(districtName)
    }
    if(userId){
      this.onSelectedblock(userId)
    }
    if(schoolName){
      this.onSelectedschool(schoolName)
    }
    if(!districtName && !blockName ){
      this.getDroppedstudent()
    }
    if(districtName){
      this.onSelectedDistrictdrop(districtName) 
    }
    if(blockName){
      this.onSelectedblockdrop(blockName)
    }
    if(schoolName){
      this.onSelectedschooldrop(schoolName)
    }
  }
  getOSCstudent(){
    this.pageStage = 1 ;
    this.studentservice.getOSCstudent().subscribe(
    res=> {
      if(res != 0){
        this.OSCStudentsListDisct = res.data.OSC_LIST;
        console.log("check1",this.OSCStudentsListDisct)

      }else{
        this.noDataFound1 = true;
      }
      }
    )
  }
  onSelectedDistrict(distwise){
    this.pageStage = 2;
    this.studentservice.getoscstudentdist(distwise).subscribe(
      res=>{
        if(res !=  0){
          this.OSCStudentsListBlock = res.data.OSC_LIST;
        }else{
          this.noDataFound2 = true;
        }
      }
    )
  }
  onSelectedblock(blockwise){
    this.pageStage = 3;
    this.studentservice.getoscstudentblock(blockwise).subscribe(
      res=>{
        if(res !=  0){
          this.OSCStudentsListschool = res.data.OSC_LIST;
        }else{
          this.noDataFound3 = true;
        }
      }
    )
  }
  onSelectedschool(schoolwise){
    this.pageStage = 4;
    this.studentservice.getoscstudentschool(schoolwise).subscribe(
      res=>{
        if(res != 0){
          this.OSCStudentsListstudent = res.data.OSC_LIST;
        }else{
          this.noDataFound4 = true;
        }
      }
    )
  }
  // Droppedout school student
  getDroppedstudent(){
    this.pageStage = 1 ;
    this.studentservice.getDroppedstudent().subscribe(
    res=> {
      if(res != 0){
        this.DroppedStudentsListDisct = res.data.student_osc_dropout;
      }else{
        this.noDataFound1 = true;
      }
      }
    )
  }
  onSelectedDistrictdrop(distwisedrop){
    this.pageStage = 2;
    this.studentservice.getoscstudentdistdrop(distwisedrop).subscribe(
      res=>{
        if(res !=  0){
          this.OSCStudentsListBlockdrop = res.data.student_osc_dropout;
        }else{
          this.noDataFound2 = true;
        }
      }
    )
  }
  onSelectedblockdrop(blockwisedrop){
    this.pageStage = 3;
    this.studentservice.getoscstudentblockdrop(blockwisedrop).subscribe(
      res=>{
        if(res !=  0){
          this.OSCStudentsListschooldrop = res.data.student_osc_dropout;
        }else{
          this.noDataFound3 = true;
        }
      }
    )
  }
  onSelectedschooldrop(schoolwisedrop){
    this.pageStage = 4;
    this.studentservice.getoscstudentschooldrop(schoolwisedrop).subscribe(
      res=>{
        if(res != 0){
          this.OSCStudentsListstudentdrop = res.data.student_osc_dropout;
        }else{
          this.noDataFound4 = true;
        }
      }
    )
  }

}
