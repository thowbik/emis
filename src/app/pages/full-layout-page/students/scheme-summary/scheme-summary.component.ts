import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/** Interface */
import { schemeList } from '../../../../../models/schemes.model';
/** Imported - Schemes Service  */
import { StudentService } from '../student.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-scheme-summary',
  templateUrl: './scheme-summary.component.html',
  styleUrls: ['./scheme-summary.component.css']
})
export class SchemeSummaryComponent implements OnInit {

  /** Declarations */
  // public schemesListArr: schemeList[] = []; 
  public schemesListArr: any[]= []; 

      /** Datatable Column Field And Header */
      cols: Array<{'field':string,'header':string,'widthstyle':string}> = 
      [{ field: 'scheme_name', header: 'Name' ,widthstyle: '16em'},
      { field: 'status', header: 'Status',widthstyle: '8em'},
      { field: 'total_section', header: 'Total Section' ,widthstyle: ''},
      { field: 'marked_section', header: 'Marked Section',widthstyle: '' },
      { field: 'pending_section', header: 'Pending Section',widthstyle: '' }
      ];
  schoolId: number;


  constructor(private studentService:StudentService,private userSessionService: UserSessionService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    console.clear();
    this.schoolId = this.userSessionService.schoolId();
    this.studentService.getSchemesListWithApplicableClasses(this.schoolId,true).subscribe(
        scheme=>{ 
                  this.schemesListArr = scheme['result'];
                  console.log(this.schemesListArr);
                  this.schemesListArr.forEach(element => {
                    switch(element.id){
                      case '1' :  element['route'] = "/uniform"; break;
                      case '11' : element['route'] = "/laptop"; break;
                      case '15' : element['route'] = "/noonmeal"; break;
                      default : element['route'] = "";break;
                    }
                  });
                  // this.schemesListArr.map(x=>x['route'] = "/noonmeal");
                  // if (x > 1 && x < 10){
                  this.schemesListArr.push({"id": "19","scheme_name": "TextBook for Primary","appli_lowclass": "1","appli_highclass": "8","route":"/textbook"});
                // }
                  
                  this.schemesListArr.push({"id": "20","scheme_name": "TextBook for Secondary","appli_lowclass": "9","appli_highclass": "10","route":"/textbook_sec"});
                  this.schemesListArr.push({"id": "21","scheme_name": "TextBook for Hr.Secondary","appli_lowclass": "11","appli_highclass": "12","route":"/textbook_hrsec"});
                }
      );
  }

}
