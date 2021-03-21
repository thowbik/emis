import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../registers.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-costfree-textbooks-reg',
  templateUrl: './costfree-textbooks-reg.component.html',
  styleUrls: ['./costfree-textbooks-reg.component.css']
})
export class CostfreeTextbooksRegComponent implements OnInit {
  classsection:FormGroup;
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];
  assigned_section1:any;
  classsec:any={result:''};

  constructor(private registersService: RegistersService,
    private userSessionService: UserSessionService, private cs:FormBuilder) {
      this.emis_school_id = this.userSessionService.schoolId();
     }

  ngOnInit() {
    this.getData();
    this.headerData();
    this.classsection = this.cs.group(
      {
        emis_school_id: [''],
        class_id: ['', Validators.required],
        section: ['', Validators.required]
  
      });
  }
  headerData()
  {
    this.cols =[
     
      { field: '', header: 'EMIS No' },
      { field: '', header: 'Student Name' },
      { field: '', header: 'Gender' },
      { field: '', header: 'Class'},
      { field: '', header: 'Section'},
      { field: '', header: 'Subject' },
      { field: '', header: 'Medium' },
      { field: '', header: 'Distribution Date'}
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    // this.registersService.getCostTextNotebookDetails(this.emis_school_id).subscribe((res) => {
    //   if (res) {
    //     this.data = res.result.student_osc;
    //   }
    // });
  }

  onSelection(e){
    console.log(e);
        // this.assigned_section1 = '';
        // const results = (this.classsec.result).filter(s => s.class_id == e);
        // this.assigned_section1 = results[0].revalent_section;
      }

}
