import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {StateService} from '../state.service';

@Component({
  selector: 'app-commonpool',
  templateUrl: './commonpool.component.html',
  styleUrls: ['./commonpool.component.scss']
})
export class CommonpoolComponent implements OnInit {
  teacherdetails: any = {commonDistList: ''};
  public schemesListArr: any[] = [];
  commonDistList: any[] = [];
  commonDistListTransfer: any[] = [];
  exportColumns: any[];
  public pageStage: number;
  /** Datatable Column Field And Header */
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'district', header: 'District' , widthstyle: ''},
      { field: 'govmnt', header: 'Govt', widthstyle: ''},
      { field: 'Fully_aided', header: 'Fully Aided' , widthstyle: ''},
      { field: 'partially_aided', header: 'Partially Aided', widthstyle: '12em' },
      { field: 'un_aided', header: 'Un-Aided', widthstyle: '' },
      { field: 'central_govt', header: 'Central Govt', widthstyle: '11em' },
    ];

  col: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'district', header: 'District' , widthstyle: ''},
      { field: 'long_absent', header: 'Long Absent', widthstyle: '12em'},
      { field: 'transfered_by_parents', header: 'Transfered by Parents' , widthstyle: ''},
      { field: 'terminal_class', header: 'Terminal Class', widthstyle: '12em' },
      { field: 'dropped_out', header: 'Dropped Out', widthstyle: '12em' },
      { field: ' total', header: ' Total', widthstyle: '' },
    ];
  schoolId: number;
  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit() {
    this.getcommonpoolblockDistrict();
  }

  editForm(id, param, param2) {
    // @ts-ignore
    localStorage.setItem('DISTRICTID', id);
    localStorage.setItem('BLOCKID', param);
    localStorage.setItem('BLOCKNAME', param2);
    this.router.navigate(['/commonpoolblock']);
  }

  getcommonpoolblockDistrict() {
    this.stateService.CommonDist(true).subscribe(data => {
      this.pageStage = 1;
      const result = data.student_migration_details;
      if (result.length > 0) {
        this.commonDistList = result;
      }
    });
    this.stateService.CommonDistTransfer(true).subscribe(data => {
      this.pageStage = 1;
      const result = data.student_migration_details;
      if (result.length > 0) {
      this.commonDistListTransfer = result;
        }
    });
  }

  onSelectedId(distname) {
    this.stateService.getcommonpoolblocktransfer(distname).subscribe(
      details => {
        this.router.navigate(['/commonpool_block_transfer'], details.details);
      }
    );
  }

}
