import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import { RegistersService } from '../registers.service';

@Component({
  selector: 'app-vocationalstudent-nsqf-reg',
  templateUrl: './vocationalstudent-nsqf-reg.component.html',
  styleUrls: ['./vocationalstudent-nsqf-reg.component.css']
})
export class VocationalstudentNSQFRegComponent implements OnInit {
  cols: any[] = [];
  emis_school_id: number;
  data: any[] = [];
  sampleSelectedColumn  : Array<Object> = [];

  constructor(private registersService: RegistersService,
    private userSessionService: UserSessionService) { 
      this.emis_school_id = this.userSessionService.schoolId();
    }

  ngOnInit() {
    this.getData();
    this.headerData();
  }
  headerData()
  {
    this.cols =[
     
      { field: 'job_role', header: 'Job Role' },
      { field: 'job_sector', header: 'Job Sector' },
      { field: 'cnt_b', header: 'Boys Total'}, { field: 'cnt_g', header: 'Girls Total' },
      { field: 'PREKG_b', header: 'PreKG-Boys' }, { field: 'PREKG_g', header: 'PreKG-Girls'},
      { field: 'LKG_b', header: 'LKG-Boys'},{ field: 'LKG_g', header: 'LKG-Girls'},
      { field: 'UKG_b', header: 'UKG-Boys'},{ field: 'UKG_g', header: 'UKG-Girls'},    
      { field: 'c1_b', header: 'I-Boys'}, { field: 'c1_g', header: 'I-Girls'}, 
      { field: 'c2_b', header: 'II-Boys'},{ field: 'c2_g', header: 'II-Girls'},     
      { field: 'c3_b', header: 'III-Boys'},{ field: 'c3_g', header: 'III-Girls'}, 
      { field: 'c4_b', header: 'IV-Boys'},{ field: 'c4_g', header: 'IV-Girls'},      
      { field: 'c5_b', header: 'V-Boys'},{ field: 'c5_g', header: 'V-Girls'},     
      { field: 'c6_b', header: 'VI-Boys'},{ field: 'c6_g', header: 'VI-Girls'},
      { field: 'c7_b', header: 'VII-Boys'},{ field: 'c7_g', header: 'VII-Girls'},  
      { field: 'c8_b', header: 'VIII-Boys'},{ field: 'c8_g', header: 'VIII-Girls'},
      { field: 'c9_b', header: 'IX-Boys'},{ field: 'c9_g', header: 'IX-Girls'},
      { field: 'c10_b', header: 'X-Boys'},{ field: 'c10_g', header: 'X-Girls'},
      { field: 'c11_b', header: 'XI-Boys'},{ field: 'c11_g', header: 'XI-Girls'},
      { field: 'c12_b', header: 'XII-Boys'}, { field: 'c12_g', header: 'XII-Girls'}
     
    
    ];
    this.sampleSelectedColumn =  this.cols;
  }

  getData() {
    this.emis_school_id = this.userSessionService.schoolId();
    this.registersService.getVocationalStudentNSQF(this.emis_school_id).subscribe((res) => {
      if (res) {
        this.data = res.result.school_community;
      }
    });
  }
}
