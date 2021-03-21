import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-otherregularstudentsunivexam',
  templateUrl: './otherregularstudentsunivexam.component.html',
  styleUrls: ['./otherregularstudentsunivexam.component.css']
})
export class OtherregularstudentsunivexamComponent implements OnInit {
  userform:FormGroup;
  otherregular: { field: string; header: string; }[];
  otherregularby: { field: string; header: string; }[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.otherreg();
    this.validationinitiator();
  }
  otherreg(){
    this.otherregular = [
      // {field: 'Stream', header: 'Stream' },
      { field: 'Boys', header: 'Boys' },
      { field: 'Girls', header: 'Girls' },
      { field: 'Boys', header: 'Boys' },
      { field: 'Girls', header: 'Girls' },
      { field: 'Boys', header: 'Boys' },
      { field: 'Girls', header: 'Girls' },
      { field: 'Boys', header: 'Boys' },
      { field: 'Girls', header: 'Girls' },
      { field: 'Boys', header: 'Boys' },
      { field: 'Girls', header: 'Girls' },
  ];
  this.otherregularby=[
   { field: 'Boys', header: 'Boys' },
  ];
  }


  validationinitiator(){
    this.userform = this.fb.group({
       'arts_gen_b': new FormControl('', Validators.required),
       'arts_gen_g': new FormControl('', Validators.required),
       'arts_sc_b': new FormControl('', Validators.required),
       'arts_sc_g': new FormControl('', Validators.required),
       'arts_st_b': new FormControl('', Validators.required),
       'arts_st_g': new FormControl('', Validators.required),
       'arts_obc_b': new FormControl('', Validators.required),
       'arts_obc_g': new FormControl('', Validators.required),
       'arts_tot_b': new FormControl('', Validators.required),
       'arts_tot_g': new FormControl('', Validators.required),
       
       'science_gen_b': new FormControl('', Validators.required),
       'science_gen_g': new FormControl('', Validators.required),
       'science_sc_b': new FormControl('', Validators.required),
       'science_sc_g': new FormControl('', Validators.required),
       'science_st_b': new FormControl('', Validators.required),
       'science_st_g': new FormControl('', Validators.required),
       'science_obc_b': new FormControl('', Validators.required),
       'science_obc_g': new FormControl('', Validators.required),
       'science_tot_b': new FormControl('', Validators.required),
       'science_tot_g': new FormControl('', Validators.required),

       'commerce_gen_b': new FormControl('', Validators.required),
       'commerce_gen_g': new FormControl('', Validators.required),
       'commerce_sc_b': new FormControl('', Validators.required),
       'commerce_sc_g': new FormControl('', Validators.required),
       'commerce_st_b': new FormControl('', Validators.required),
       'commerce_st_g': new FormControl('', Validators.required),
       'commerce_obc_b': new FormControl('', Validators.required),
       'commerce_obc_g': new FormControl('', Validators.required),
       'commerce_tot_b': new FormControl('', Validators.required),
       'commerce_tot_g': new FormControl('', Validators.required),

       'vocational_gen_b': new FormControl('', Validators.required),
       'vocational_gen_g': new FormControl('', Validators.required),
       'vocational_sc_b': new FormControl('', Validators.required),
       'vocational_sc_g': new FormControl('', Validators.required),
       'vocational_st_b': new FormControl('', Validators.required),
       'vocational_st_g': new FormControl('', Validators.required),
       'vocational_obc_b': new FormControl('', Validators.required),
       'vocational_obc_g': new FormControl('', Validators.required),
       'vocational_tot_b': new FormControl('', Validators.required),
       'vocational_tot_g': new FormControl('', Validators.required),

       'stream_gen_b': new FormControl('', Validators.required),
       'stream_gen_g': new FormControl('', Validators.required),
       'stream_sc_b': new FormControl('', Validators.required),
       'stream_sc_g': new FormControl('', Validators.required),
       'stream_st_b': new FormControl('', Validators.required),
       'stream_st_g': new FormControl('', Validators.required),
       'stream_obc_b': new FormControl('', Validators.required),
       'stream_obc_g': new FormControl('', Validators.required),
       'stream_tot_b': new FormControl('', Validators.required),
       'stream_tot_g': new FormControl('', Validators.required),
     

       'total_gen_b': new FormControl('', Validators.required),
       'total_gen_g': new FormControl('', Validators.required),
       'total_sc_b': new FormControl('', Validators.required),
       'total_sc_g': new FormControl('', Validators.required),
       'total_st_b': new FormControl('', Validators.required),
       'total_st_g': new FormControl('', Validators.required),
       'total_obc_b': new FormControl('', Validators.required),
       'total_obc_g': new FormControl('', Validators.required),
       'total_tot_b': new FormControl('', Validators.required),
       'total_tot_g': new FormControl('', Validators.required),

       'passed_arts_gen_b': new FormControl('', Validators.required),
       'passed_arts_gen_g': new FormControl('', Validators.required),
       'passed_arts_sc_b': new FormControl('', Validators.required),
       'passed_arts_sc_g': new FormControl('', Validators.required),
       'passed_arts_st_b': new FormControl('', Validators.required),
       'passed_arts_st_g': new FormControl('', Validators.required),
       'passed_arts_obc_b': new FormControl('', Validators.required),
       'passed_arts_obc_g': new FormControl('', Validators.required),
       'passed_arts_tot_b': new FormControl('', Validators.required),
       'passed_arts_tot_g': new FormControl('', Validators.required),
       
       'passed_science_gen_b': new FormControl('', Validators.required),
       'passed_science_gen_g': new FormControl('', Validators.required),
       'passed_science_sc_b': new FormControl('', Validators.required),
       'passed_science_sc_g': new FormControl('', Validators.required),
       'passed_science_st_b': new FormControl('', Validators.required),
       'passed_science_st_g': new FormControl('', Validators.required),
       'passed_science_obc_b': new FormControl('', Validators.required),
       'passed_science_obc_g': new FormControl('', Validators.required),
       'passed_science_tot_b': new FormControl('', Validators.required),
       'passed_science_tot_g': new FormControl('', Validators.required),

       'passed_commerce_gen_b': new FormControl('', Validators.required),
       'passed_commerce_gen_g': new FormControl('', Validators.required),
       'passed_commerce_sc_b': new FormControl('', Validators.required),
       'passed_commerce_sc_g': new FormControl('', Validators.required),
       'passed_commerce_st_b': new FormControl('', Validators.required),
       'passed_commerce_st_g': new FormControl('', Validators.required),
       'passed_commerce_obc_b': new FormControl('', Validators.required),
       'passed_commerce_obc_g': new FormControl('', Validators.required),
       'passed_commerce_tot_b': new FormControl('', Validators.required),
       'passed_commerce_tot_g': new FormControl('', Validators.required),

       'passed_vocational_gen_b': new FormControl('', Validators.required),
       'passed_vocational_gen_g': new FormControl('', Validators.required),
       'passed_vocational_sc_b': new FormControl('', Validators.required),
       'passed_vocational_sc_g': new FormControl('', Validators.required),
       'passed_vocational_st_b': new FormControl('', Validators.required),
       'passed_vocational_st_g': new FormControl('', Validators.required),
       'passed_vocational_obc_b': new FormControl('', Validators.required),
       'passed_vocational_obc_g': new FormControl('', Validators.required),
       'passed_vocational_tot_b': new FormControl('', Validators.required),
       'passed_vocational_tot_g': new FormControl('', Validators.required),

       'passed_stream_gen_b': new FormControl('', Validators.required),
       'passed_stream_gen_g': new FormControl('', Validators.required),
       'passed_stream_sc_b': new FormControl('', Validators.required),
       'passed_stream_sc_g': new FormControl('', Validators.required),
       'passed_stream_st_b': new FormControl('', Validators.required),
       'passed_stream_st_g': new FormControl('', Validators.required),
       'passed_stream_obc_b': new FormControl('', Validators.required),
       'passed_stream_obc_g': new FormControl('', Validators.required),
       'passed_stream_tot_b': new FormControl('', Validators.required),
       'passed_stream_tot_g': new FormControl('', Validators.required),
     

       'passed_total_gen_b': new FormControl('', Validators.required),
       'passed_total_gen_g': new FormControl('', Validators.required),
       'passed_total_sc_b': new FormControl('', Validators.required),
       'passed_total_sc_g': new FormControl('', Validators.required),
       'passed_total_st_b': new FormControl('', Validators.required),
       'passed_total_st_g': new FormControl('', Validators.required),
       'passed_total_obc_b': new FormControl('', Validators.required),
       'passed_total_obc_g': new FormControl('', Validators.required),
       'passed_total_tot_b': new FormControl('', Validators.required),
       'passed_total_tot_g': new FormControl('', Validators.required),
     
     });
  }

}
