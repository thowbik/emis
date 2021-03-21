import { Component, OnInit } from '@angular/core';
import {StateService} from "../state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aidedschooldist',
  templateUrl: './aidedschooldist.component.html',
  styleUrls: ['./aidedschooldist.component.scss']
})
export class AidedschooldistComponent implements OnInit {
  aidedsclList: any[] = [];
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'district_name', header: 'District Name' , widthstyle: ''},
      { field: 'totalschool *', header: 'Total School *', widthstyle: ''},
      { field: 'totalaidedsection', header: 'Total Aided Section' , widthstyle: ''},
      { field: 'totalunaidedsection', header: 'Total UnAided Section' , widthstyle: ''},
      { field: 'notmarkedsections', header: 'Not Marked Sections' , widthstyle: ''},
      { field: 'notmarkedmedium', header: 'Not Marked Medium' , widthstyle: ''},
    ];

  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit() {
    this.stateService.aidedscldictList(true).subscribe(data => {
      this.aidedsclList = data.result.dist_school_details;
    });
  }
  aiadedscl(distname) {
    this.stateService.aidedsclList(distname).subscribe(
      details => {
        this.router.navigate(['/state/aided_school_list'], details.result.school_details);
      }
    );
  }
}
