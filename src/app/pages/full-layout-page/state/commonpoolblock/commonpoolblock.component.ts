import { Component, OnInit } from '@angular/core';
import {StateService} from '../state.service';
import {Router} from '@angular/router';
import {StateModel} from '../../../../../models/state.model';

@Component({
  selector: 'app-commonpoolblock',
  templateUrl: './commonpoolblock.component.html',
  styleUrls: ['./commonpoolblock.component.scss']
})
export class CommonpoolblockComponent implements OnInit {
  blockId: string;
  districtId: string;
  blockName: string;
  commonpoolblock: StateModel[];
  commonpoolblocks: any[] = [];
  /** Datatable Column Field And Header */
  cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
    [{ field: 'scheme_name', header: 'District' , widthstyle: '8em'},
      { field: 'status', header: 'Govmnt', widthstyle: '11em'},
      { field: 'total_section', header: 'Fully Aided' , widthstyle: '10em'},
      { field: 'marked_section', header: 'Partially Aided', widthstyle: '13em' },
      { field: 'pending_section', header: 'Un-Aided', widthstyle: '10em' },
      { field: 'central_govt', header: 'Central Govt', widthstyle: '12em' },
    ];

  constructor(private stateService: StateService, private router: Router) {
   this.blockId  = localStorage.getItem('BLOCKID');
   this.districtId = localStorage.getItem('DISTRICTID');
   this.blockName = localStorage.getItem('BLOCKNAME');
   this.getItem();

  }
  ngOnInit() {
  }

  getItem() {
    this.stateService.getCommonPoolBlockdata(this.blockId, this.districtId, this.blockName).subscribe(data => {
    this.commonpoolblocks = data.details;

    });
  }
}
