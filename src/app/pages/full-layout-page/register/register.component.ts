import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  url: string;
  dataHeader: any[] = [];
  data: any[] = [];
  pageId: any;
  
  constructor(private router : Router) { }

  ngOnInit() {
    this.sampleData()
  }
  sampleData()
  {
    this.dataHeader = [
      {field: 'attendance_reg', header: 'Attendance Register' },
      { field: 'stud_tag_reg', header: 'student Tagging Register' },
      { field: 'stud_sum_reg', header: 'Student Summary Registers' },
      { field: 'welfare_scheme_reg', header: 'Student Welfare Scheme Registers'},
      { field: 'hillstation_', header: 'Hill Station Student Welfare Scheme Registers' },
      { field: 'father_name', header: 'Staff Registers' }
  ];
  // this.data = [{ "attendance_reg": "Student Attendance Register", "stud_tag_reg": "NMMS Scheme", "stud_sum_reg": "Orange", "welfare_scheme_reg": "dsad231ff", "hillstation": "dsad231ff" }
  // ];
}
  navigate(txt:string,id):void{
    debugger;
   console.log(txt);
     this.url = '/'+txt;
     this.pageId = id;
    // url.push("/"+txt);
    // this.router.navigate(['/department']);
    // this.router.navigate([this.url]);
    this.router.navigate([this.url], {queryParams: {'PageId':this.pageId}});
     // this.router.navigate(['reg-parent'],  {queryParams: {'registerNo':this.registerNo}, skipLocationChange: false});
  }

}
