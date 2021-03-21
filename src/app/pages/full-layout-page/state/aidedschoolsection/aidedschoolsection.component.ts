import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StateService} from "../state.service";

@Component({
  selector: 'app-aidedschoolsection',
  templateUrl: './aidedschoolsection.component.html',
  styleUrls: ['./aidedschoolsection.component.scss']
})
export class AidedschoolsectionComponent implements OnInit {

  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'class', header: 'Class' , widthstyle: ''},
      { field: 'section', header: 'Section' , widthstyle: ''},
      { field: 'sectiontype', header: 'Section Type', widthstyle: ''},
      { field: 'medium *', header: 'Medium', widthstyle: ''},
      { field: 'studentCount', header: 'Student Count' , widthstyle: ''},
    ];

  public Aidedschoolsectionlist: any;

  constructor(private router: Router, private stateService: StateService) {
    this.Aidedschoolsectionlist = this.router.getCurrentNavigation().extras;
  }

  ngOnInit() {
  }

}
