import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-school-profile',
  templateUrl: './add-school-profile.component.html',
  styleUrls: ['./add-school-profile.component.css']
})
export class AddSchoolProfileComponent implements OnInit {
  displayBasic2: boolean;
  constructor() { }
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
  [
    { field: 'udise_code', header: 'Education District', widthstyle: '15em'},
    { field: 'school_name', header: 'Block', widthstyle: '8em' },
    { field: 'cate_type', header: 'School Name', widthstyle: '12em' },
    { field: 'in_position_sg', header: 'Applied on', widthstyle: '12em' },
    { field: 'in_position_bt_eng', header: 'Status', widthstyle: '12em'}
  ];
  ngOnInit() {
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

}
