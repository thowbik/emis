// import { Component, OnInit } from '@angular/core';
// import {schoolsService} from '../../schools/schools.service';
// import {StudentService} from '../student.service';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-commonpoolblock',
//   templateUrl: './commonpoolblock.component.html',
//   styleUrls: ['./commonpoolblock.component.css']
// })
// export class CommonpoolblockComponent implements OnInit {
//
//   /** Datatable Column Field And Header */
//   cols: Array<{'field': string, 'header': string, 'widthstyle': string}> =
//     [{ field: 'scheme_name', header: 'Block' , widthstyle: ''},
//       { field: 'status', header: 'Govmnt', widthstyle: ''},
//       { field: 'total_section', header: 'Fully Aided' , widthstyle: ''},
//       { field: 'marked_section', header: 'Partially Aided', widthstyle: '' },
//       { field: 'pending_section', header: 'Un-Aided', widthstyle: '' },
//       { field: 'central_govt', header: 'Central Govt', widthstyle: '' },
//       { field: 'total', header: 'Total', widthstyle: '' }
//     ];
//
//   constructor(private studentService: StudentService) { }
//
//   ngOnInit(): void {
//     // @ts-ignore
//     this.studentService.getCommonPoolBlockdata().subscribe(data => this.alertReceived(data));
//   }
//
//   private alertReceived(data: any) {
//     console.log(data.data, '----------');
//   }
//
//   // getItem() {
//   //   // tslint:disable-next-line:variable-name
//   //   const commonpool_date = localStorage.getItem('DISTRICT');
//   //   console.log(commonpool_date, '--------');
//   //   // @ts-ignore
//   //   this.studentService.getCommonPoolBlockdata(commonpool_date).subscribe(data => {
//   //     console.log(data);
//   //   });
//   // }
//   //
//   // getItems() {
//   //   localStorage.getItem('DISTRICT');
//   // }
// }
