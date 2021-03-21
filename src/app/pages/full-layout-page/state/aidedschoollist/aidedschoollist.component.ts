import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StateService} from "../state.service";

@Component({
  selector: 'app-aidedschoollist',
  templateUrl: './aidedschoollist.component.html',
  styleUrls: ['./aidedschoollist.component.scss']
})
export class AidedschoollistComponent implements OnInit {

  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'district_name', header: 'District Name' , widthstyle: ''},
    { field: 'block', header: 'Block' , widthstyle: ''},
      { field: 'code *', header: 'Udise Code *', widthstyle: ''},
      { field: 'schoolname *', header: 'School Name', widthstyle: ''},
      { field: 'aidedsection', header: 'Aided Sections' , widthstyle: ''},
      { field: 'unaidedsection', header: 'UnAided Sections' , widthstyle: ''},
      { field: 'notmarkedsections', header: 'Not Marked Sections' , widthstyle: ''},
      { field: 'notmarkedmedium', header: 'Not Marked Medium' , widthstyle: ''},
    ];

  public Aidedschoollist: any;

  constructor(private router: Router, private stateService: StateService) {
    this.Aidedschoollist = this.router.getCurrentNavigation().extras;
  }

  ngOnInit() {
  }

  aidedschoolseclist(distname) {
    this.stateService.aidedsclsecList(distname).subscribe(
      details => {
        this.router.navigate(['/state/aided_school_section'], details.result.school_class_details);
      }
    );
  }
}
