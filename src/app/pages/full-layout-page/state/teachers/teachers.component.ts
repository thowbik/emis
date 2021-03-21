import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
 
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
teachersList : any[] = [];
teachersList1: any[] = [];
teachersList2: any[] = [];
public dataHeader: any;
dataHeader1: any;
dataHeader2: any;
usertypeId: any;
DropdownVar = 0;
DropdownVar1 = 0;
blockId:any;
districtId: any;
userId : any;

  constructor(private stateService : StateService, 
    private userSessionService: UserSessionService,
    private routers : Router) { 
      this.usertypeId = this.userSessionService.userTypeId();
      this.userId = this.userSessionService.userId();
      console.log(this.userId);
    }

  ngOnInit() {
    this.getTeachersDetails();
    if(this.usertypeId == 9 || this.usertypeId == 10){
      this.getDistrict();
    }
    if(this.usertypeId == 6 || this.usertypeId == 2){
      this.getBlock();
    }
    this.dataHeader = [
      {field: 'district_name', header: 'District' },
      { field: 'HM', header: 'HM' },
      { field: 'PGteacher', header: 'PG-Teacher', widthstyle:'10em' },
      { field: 'BTteacher', header: 'BT-Teacher', widthstyle:'10em'},
      { field: 'SGteacher', header: 'SG-Teacher', widthstyle:'10em' },
      { field: 'Govteacher', header: 'Govt-Teacher', widthstyle:'13em' },
      { field: 'Others', header: 'Others' },
  ];
  this.dataHeader1 = [
    {field: 'block', header: 'Block' },
    { field: 'HM', header: 'HM' },
    { field: 'PGteacher', header: 'PG-Teacher', },
    { field: 'BTteacher', header: 'BT-Teacher'},
    { field: 'SGteacher', header: 'SG-Teacher' },
    { field: 'Govteacher', header: 'Govt-Teacher', widthstyle:'13em' },
    { field: 'Others', header: 'Others' },
];

this.dataHeader2 = [
  {field: 'udisecode', header: 'Udise Code', widthstyle:'10em'},
  { field: 'schools', header: 'Schools', widthstyle:'8em'},
  { field: 'HM', header: 'HM', widthstyle:'6em' },
  { field: 'PGteacher', header: 'PG-Teacher', widthstyle:'10em' },
  { field: 'BTteacher', header: 'BT-Teacher', widthstyle:'10em'},
  { field: 'SGteacher', header: 'SG-Teacher', widthstyle:'10em' },
  { field: 'Govteacher', header: 'Govt-Teacher', widthstyle:'11em' },
  { field: 'Others', header: 'Others', widthstyle:'8em' },
];
  }

  getTeachersDetails(){
    this.stateService.getTeachersListDetails().subscribe(
      list=>{
        this.teachersList = list.teacherdistrictdetails;
      }
    )
  }

  getDistrict() {
    this.districtId = this.userSessionService.districtId();
    const dist ={
      dist_id : this.districtId
    };
    this.stateService.getTeacherDetails(dist).subscribe(
      res => {
        this.teachersList1 = res.details;
      }
    )
  }

  getBlock() {
    this.userId = this.userSessionService.userId();
    const block = {
      block_id : this.userId
      };
    console.log(block);
    this.stateService.getTeacherDetailsSchool(block).subscribe(
      data => {
        this.teachersList2 = data.details;
        console.log(this.teachersList2);
      }
    )
  }
 

  onDistrict(e, DropdownVar) {
    debugger;
    const dist ={
      dist_id : e.dist_id
    };
    const drop = DropdownVar;
    console.log(drop);
    this.stateService.getTeacherDetails(dist).subscribe(
      res => {
        this.teachersList1 = res.details;
      }
    )
  }


  onBlock(e,DropdownVar1) {
    const block ={
      block_id : e.block_id
    };
    console.log(DropdownVar1);
    console.log(e.block_id);
    this.stateService.getTeacherDetailsSchool(block).subscribe(
      data => {
        this.teachersList2 = data.details;
      }
    )
  }

  
  onSelectedId(teachers){
    
    this.stateService.getTeacherDetails(teachers).subscribe(
      details => {
        this.routers.navigate(['/State/emis_teacher_classwise_district'], details.details)
      }
    )
  }

}
