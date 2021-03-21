import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-regularstudentsuniversityexam',
  templateUrl: './regularstudentsuniversityexam.component.html',
  styleUrls: ['./regularstudentsuniversityexam.component.css']
})
export class RegularstudentsuniversityexamComponent implements OnInit {
  userForm:FormGroup;
  schuniv: { field: string; header: string; }[];
  schunivby: { field: string; header: string; }[];
  userform: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.schooluniversitystudent();
    this.validationinitiator();
  }


  schooluniversitystudent() {
    this.schuniv = [
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
  this.schunivby = [
    {field: 'Arts ', header: 'Arts '},
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

  appeared_students(index){
    if(index=="1" || index=="3" || index=="5" || index=="7"){
      var artsgen_b= this.userform.controls.arts_gen_b.value? this.userform.controls.arts_gen_b.value : 0;
      var artssc_b = this.userform.controls.arts_sc_b.value? this.userform.controls.arts_sc_b.value : 0;
      var artsst_b = this.userform.controls.arts_st_b.value? this.userform.controls.arts_st_b.value : 0;
      var artsobc_b = this.userform.controls.arts_obc_b.value? this.userform.controls.arts_obc_b.value : 0;
      var artstotal_b= +artsgen_b + +artssc_b + +artsst_b + +artsobc_b;
      this.userform.patchValue({ arts_tot_b: artstotal_b });
    }
    if(index=="2" || index=="4" || index=="6" || index=="8"){
      var artsgen_g= this.userform.controls.arts_gen_g.value? this.userform.controls.arts_gen_g.value : 0;
      var artssc_g = this.userform.controls.arts_sc_g.value? this.userform.controls.arts_sc_g.value : 0;
      var artsst_g = this.userform.controls.arts_st_g.value? this.userform.controls.arts_st_g.value : 0;
      var artsobc_g = this.userform.controls.arts_obc_g.value? this.userform.controls.arts_obc_g.value : 0;
      var artstotal_g= +artsgen_g + +artssc_g + +artsst_g + +artsobc_g;
      this.userform.patchValue({ arts_tot_g: artstotal_g });
    }
    if(index=="9" || index=="11" || index=="13" || index=="15"){
      var science_gen_boys= this.userform.controls.science_gen_b.value? this.userform.controls.science_gen_b.value : 0;
      var science_sc_boys = this.userform.controls.science_sc_b.value? this.userform.controls.science_sc_b.value : 0;
      var science_st_boys= this.userform.controls.science_st_b.value? this.userform.controls.science_st_b.value : 0;
      var science_obc_boys= this.userform.controls.science_obc_b.value? this.userform.controls.science_obc_b.value : 0;
      var science_total_boys= +science_gen_boys + +science_sc_boys + +science_st_boys + +science_obc_boys;
      this.userform.patchValue({ science_tot_b: science_total_boys });
    }
    if(index=="10" || index=="12" || index=="14" || index=="16"){
      var science_gen_girls= this.userform.controls.science_gen_g.value? this.userform.controls.science_gen_g.value : 0;
      var science_sc_girls = this.userform.controls.science_sc_g.value? this.userform.controls.science_sc_g.value : 0;
      var science_st_girls= this.userform.controls.science_st_g.value? this.userform.controls.science_st_g.value : 0;
      var science_obc_girls= this.userform.controls.science_obc_g.value? this.userform.controls.science_obc_g.value : 0;
      var arts_total_girls= +science_gen_girls + +science_sc_girls + +science_st_girls + +science_obc_girls;
      this.userform.patchValue({ science_tot_g: arts_total_girls });
    }
    if(index=="17" || index=="19" || index=="21" || index=="23"){
      var commerce_gen_boys= this.userform.controls.commerce_gen_b.value? this.userform.controls.commerce_gen_b.value : 0;
      var commerce_sc_boys = this.userform.controls.commerce_sc_b.value? this.userform.controls.commerce_sc_b.value : 0;
      var commerce_st_boys= this.userform.controls.commerce_st_b.value? this.userform.controls.commerce_st_b.value : 0;
      var commerce_obc_boys= this.userform.controls.commerce_obc_b.value? this.userform.controls.commerce_obc_b.value : 0;
      var commerce_total_boys= +commerce_gen_boys + +commerce_sc_boys + +commerce_st_boys + +commerce_obc_boys;
      this.userform.patchValue({ commerce_tot_b: commerce_total_boys });
    }
    if(index=="18" || index=="20" || index=="22" || index=="24"){
      var commerce_gen_girls= this.userform.controls.commerce_gen_g.value? this.userform.controls.commerce_gen_g.value : 0;
      var commerce_sc_girls = this.userform.controls.commerce_sc_g.value? this.userform.controls.commerce_sc_g.value : 0;
      var commerce_st_girls= this.userform.controls.commerce_st_g.value? this.userform.controls.commerce_st_g.value : 0;
      var commerce_obc_girls= this.userform.controls.commerce_obc_g.value? this.userform.controls.commerce_obc_g.value : 0;
      var commerce_total_girls= +commerce_gen_girls + +commerce_sc_girls + +commerce_st_girls + +commerce_obc_girls;
      this.userform.patchValue({ commerce_tot_g: commerce_total_girls });
    }
    if(index=="25" || index=="27" || index=="29" || index=="31"){
      var vocational_gen_boys= this.userform.controls.vocational_gen_b.value? this.userform.controls.vocational_gen_b.value : 0;
      var vocational_sc_boys = this.userform.controls.vocational_sc_b.value? this.userform.controls.vocational_sc_b.value : 0;
      var vocational_st_boys= this.userform.controls.vocational_st_b.value? this.userform.controls.vocational_st_b.value : 0;
      var vocational_obc_boys= this.userform.controls.vocational_obc_b.value? this.userform.controls.vocational_obc_b.value : 0;
      var vocational_total_boys= +vocational_gen_boys + +vocational_sc_boys + +vocational_st_boys + +vocational_obc_boys;
      this.userform.patchValue({ vocational_tot_b: vocational_total_boys });
    }
    if(index=="26" || index=="28" || index=="30" || index=="32"){
      var vocational_gen_girls= this.userform.controls.vocational_gen_g.value? this.userform.controls.vocational_gen_g.value : 0;
      var vocational_sc_girls = this.userform.controls.vocational_sc_g.value? this.userform.controls.vocational_sc_g.value : 0;
      var vocational_st_girls= this.userform.controls.vocational_st_g.value? this.userform.controls.vocational_st_g.value : 0;
      var vocational_obc_girls= this.userform.controls.vocational_obc_g.value? this.userform.controls.vocational_obc_g.value : 0;
      var vocational_total_girls= +vocational_gen_girls + +vocational_sc_girls + +vocational_st_girls + +vocational_obc_girls;
      this.userform.patchValue({ vocational_tot_g: vocational_total_girls });
    }
    if(index=="33" || index=="35" || index=="37" || index=="39"){
      var stream_gen_boys= this.userform.controls.stream_gen_b.value? this.userform.controls.stream_gen_b.value : 0;
      var stream_sc_boys = this.userform.controls.stream_sc_b.value? this.userform.controls.stream_sc_b.value : 0;
      var stream_st_boys= this.userform.controls.stream_st_b.value? this.userform.controls.stream_st_b.value : 0;
      var stream_obc_boys= this.userform.controls.stream_obc_b.value? this.userform.controls.stream_obc_b.value : 0;
      var stream_total_boys= +stream_gen_boys + +stream_sc_boys + +stream_st_boys + +stream_obc_boys;
      this.userform.patchValue({ stream_tot_b: stream_total_boys });
    }
    if(index=="34" || index=="36" || index=="38" || index=="40"){
      var stream_gen_girls= this.userform.controls.stream_gen_g.value? this.userform.controls.stream_gen_g.value : 0;
      var stream_sc_girls = this.userform.controls.stream_sc_g.value? this.userform.controls.stream_sc_g.value : 0;
      var stream_st_girls= this.userform.controls.stream_st_g.value? this.userform.controls.stream_st_g.value : 0;
      var stream_obc_girls= this.userform.controls.stream_obc_g.value? this.userform.controls.stream_obc_g.value : 0;
      var stream_total_girls= +stream_gen_girls + +stream_sc_girls + +stream_st_girls + +stream_obc_girls;
      this.userform.patchValue({ stream_tot_g: stream_total_girls });
    }
    if(index=="1" || index=="9" || index=="17" || index=="25" || index=="33"){ 
      var artsgen_boys = this.userform.controls.arts_gen_b.value? this.userform.controls.arts_gen_b.value : 0;
      var sciencegen_boys = this.userform.controls.science_gen_b.value? this.userform.controls.science_gen_b.value : 0;
      var commercegen_boys = this.userform.controls.commerce_gen_b.value? this.userform.controls.commerce_gen_b.value : 0;
      var vocational_gen_boys = this.userform.controls.vocational_gen_b.value? this.userform.controls.vocational_gen_b.value : 0;
      var stream_gen_boys = this.userform.controls.stream_gen_b.value? this.userform.controls.stream_gen_b.value : 0;

      var gentotal_boys= +artsgen_boys + +sciencegen_boys + +commercegen_boys + +vocational_gen_boys + +stream_gen_boys;
      this.userform.patchValue({ total_gen_b: gentotal_boys });
    }
    if(index=="2" || index=="10" || index=="18" || index=="26" || index=="34"){ 
      var artsgen_girls= this.userform.controls.arts_gen_g.value? this.userform.controls.arts_gen_g.value : 0;
      var sciencegen_girls = this.userform.controls.science_gen_g.value? this.userform.controls.science_gen_g.value : 0;
      var commercegen_girls = this.userform.controls.commerce_gen_g.value? this.userform.controls.commerce_gen_g.value : 0;
      var vocational_gen_girls = this.userform.controls.vocational_gen_g.value? this.userform.controls.vocational_gen_g.value : 0;
      var stream_gen_girls = this.userform.controls.stream_gen_g.value? this.userform.controls.stream_gen_g.value : 0;
      var gentotal_girls= +artsgen_girls + +sciencegen_girls + +commercegen_girls + +vocational_gen_girls + +stream_gen_girls;
      this.userform.patchValue({ total_gen_g: gentotal_girls });
    }
    if(index=="3" || index=="11" || index=="19" || index=="27" || index=="35"){ 
      var artssc_boys= this.userform.controls.arts_sc_b.value? this.userform.controls.arts_sc_b.value : 0;
    var sciencesc_boys = this.userform.controls.science_sc_b.value? this.userform.controls.science_sc_b.value : 0;
    var commercesc_boys = this.userform.controls.commerce_sc_b.value? this.userform.controls.commerce_sc_b.value : 0;
    var vocationalsc_boys = this.userform.controls.vocational_sc_b.value? this.userform.controls.vocational_sc_b.value : 0;
    var streamsc_boys = this.userform.controls.stream_sc_b.value? this.userform.controls.stream_sc_b.value : 0;
    var sctotal_boys= +artssc_boys + +sciencesc_boys + +commercesc_boys + +vocationalsc_boys + +streamsc_boys;
    this.userform.patchValue({ total_sc_b: sctotal_boys });
    }
    if(index=="4" || index=="12" || index=="20" || index=="28" || index=="36"){ 
      var artssc_girls= this.userform.controls.arts_sc_g.value? this.userform.controls.arts_sc_g.value : 0;
      var sciencesc_girls = this.userform.controls.science_sc_g.value? this.userform.controls.science_sc_g.value : 0;
      var commercesc_girls = this.userform.controls.commerce_sc_g.value? this.userform.controls.commerce_sc_g.value : 0;
      var vocationalsc_girls = this.userform.controls.vocational_sc_g.value? this.userform.controls.vocational_sc_g.value : 0;
      var streamsc_girls = this.userform.controls.stream_sc_g.value? this.userform.controls.stream_sc_g.value : 0;
      var sctotal_girls= +artssc_girls + +sciencesc_girls + +commercesc_girls + +vocationalsc_girls + +streamsc_girls;
      this.userform.patchValue({ total_sc_g: sctotal_girls });
    }
    if(index=="5" || index=="13" || index=="21" || index=="29" || index=="37"){ 
      var artsst_boys= this.userform.controls.arts_st_b.value? this.userform.controls.arts_st_b.value : 0;
      var sciencest_boys = this.userform.controls.science_st_b.value? this.userform.controls.science_st_b.value : 0;
      var commercest_boys = this.userform.controls.commerce_st_b.value? this.userform.controls.commerce_st_b.value : 0;
      var vocationalst_boys = this.userform.controls.vocational_st_b.value? this.userform.controls.vocational_st_b.value : 0;
      var streamst_boys = this.userform.controls.stream_st_b.value? this.userform.controls.stream_st_b.value : 0;
      var sttotal_boys= +artsst_boys + +sciencest_boys + +commercest_boys + +vocationalst_boys + +streamst_boys;
      this.userform.patchValue({ total_st_b: sttotal_boys });
    }
    if(index=="6" || index=="14" || index=="22" || index=="30" || index=="38"){ 
      var artsst_girls= this.userform.controls.arts_st_g.value? this.userform.controls.arts_st_g.value : 0;
        var sciencest_girls = this.userform.controls.science_st_g.value? this.userform.controls.science_st_g.value : 0;
        var commercest_girls = this.userform.controls.commerce_st_g.value? this.userform.controls.commerce_st_g.value : 0;
        var vocationalst_girls = this.userform.controls.vocational_st_g.value? this.userform.controls.vocational_st_g.value : 0;
        var streamst_girls = this.userform.controls.stream_st_g.value? this.userform.controls.stream_st_g.value : 0;
        var sttotal_girls= +artsst_girls + +sciencest_girls + +commercest_girls + +vocationalst_girls + +streamst_girls;
        this.userform.patchValue({ total_st_g: sttotal_girls });
    }
    if(index=="7" || index=="15" || index=="23" || index=="31" || index=="39"){ 
      var artsobc_boys= this.userform.controls.arts_obc_b.value? this.userform.controls.arts_obc_b.value : 0;
    var scienceobc_boys = this.userform.controls.science_obc_b.value? this.userform.controls.science_obc_b.value : 0;
    var commerceobc_boys = this.userform.controls.commerce_obc_b.value? this.userform.controls.commerce_obc_b.value : 0;
    var vocationalobc_boys = this.userform.controls.vocational_obc_b.value? this.userform.controls.vocational_obc_b.value : 0;
    var streamobc_boys = this.userform.controls.stream_obc_b.value? this.userform.controls.stream_obc_b.value : 0;
    var obctotal_boys= +artsobc_boys + +scienceobc_boys + +commerceobc_boys + +vocationalobc_boys + +streamobc_boys;
    this.userform.patchValue({ total_obc_b: obctotal_boys });
    }
    if(index=="8" || index=="16" || index=="24" || index=="32" || index=="40"){ 
      var artsobc_girls= this.userform.controls.arts_obc_g.value? this.userform.controls.arts_obc_g.value : 0;
      var scienceobc_girls = this.userform.controls.science_obc_g.value? this.userform.controls.science_obc_g.value : 0;
      var commerceobc_girls = this.userform.controls.commerce_obc_g.value? this.userform.controls.commerce_obc_g.value : 0;
      var vocationalobc_girls = this.userform.controls.vocational_obc_g.value? this.userform.controls.vocational_obc_g.value : 0;
      var streamobc_girls = this.userform.controls.stream_obc_g.value? this.userform.controls.stream_obc_g.value : 0;
      var obctotal_girls= +artsobc_girls + +scienceobc_girls + +commerceobc_girls + +vocationalobc_girls + +streamobc_girls;
      this.userform.patchValue({ total_obc_g: obctotal_girls });
    }

    var arts_tot_b= this.userform.controls.arts_tot_b.value? this.userform.controls.arts_tot_b.value : 0;
    var science_tot_b = this.userform.controls.science_tot_b.value? this.userform.controls.science_tot_b.value : 0;
    var commerce_tot_b = this.userform.controls.commerce_tot_b.value? this.userform.controls.commerce_tot_b.value : 0;
    var vocational_tot_b = this.userform.controls.vocational_tot_b.value? this.userform.controls.vocational_tot_b.value : 0;
    var stream_tot_b= this.userform.controls.stream_tot_b.value? this.userform.controls.stream_tot_b.value : 0;
    var total_boys= +arts_tot_b + +science_tot_b + +commerce_tot_b + +vocational_tot_b + +stream_tot_b;

this.userform.patchValue({ total_tot_b: total_boys });

var arts_tot_g= this.userform.controls.arts_tot_g.value? this.userform.controls.arts_tot_g.value : 0;
var science_tot_g= this.userform.controls.science_tot_g.value? this.userform.controls.science_tot_g.value : 0;
var commerce_tot_g = this.userform.controls.commerce_tot_g.value? this.userform.controls.commerce_tot_g.value : 0;
var vocational_tot_g= this.userform.controls.vocational_tot_g.value? this.userform.controls.vocational_tot_g.value : 0;
var stream_tot_g= this.userform.controls.stream_tot_g.value? this.userform.controls.stream_tot_g.value : 0;
var total_girls= +arts_tot_g + +science_tot_g + +commerce_tot_g + +vocational_tot_g + +stream_tot_g;

this.userform.patchValue({ total_tot_g: total_girls });
  }




  // appeared_gengirls(){
  //   var artsgen_girls= this.userform.controls.arts_gen_g.value? this.userform.controls.arts_gen_g.value : 0;
  //   var sciencegen_girls = this.userform.controls.science_gen_g.value? this.userform.controls.science_gen_g.value : 0;
  //   var commercegen_girls = this.userform.controls.commerce_gen_g.value? this.userform.controls.commerce_gen_g.value : 0;
  //   var vocational_gen_girls = this.userform.controls.vocational_gen_g.value? this.userform.controls.vocational_gen_g.value : 0;
  //   var stream_gen_girls = this.userform.controls.stream_gen_g.value? this.userform.controls.stream_gen_g.value : 0;
  //   var gentotal_girls= +artsgen_girls + +sciencegen_girls + +commercegen_girls + +vocational_gen_girls + +stream_gen_girls;
  //   this.userform.patchValue({ total_gen_g: gentotal_girls });
  // }
  
  // appeared_scboys(){
  //   var artssc_boys= this.userform.controls.arts_sc_b.value? this.userform.controls.arts_sc_b.value : 0;
  //   var sciencesc_boys = this.userform.controls.science_sc_b.value? this.userform.controls.science_sc_b.value : 0;
  //   var commercesc_boys = this.userform.controls.commerce_sc_b.value? this.userform.controls.commerce_sc_b.value : 0;
  //   var vocationalsc_boys = this.userform.controls.vocational_sc_b.value? this.userform.controls.vocational_sc_b.value : 0;
  //   var streamsc_boys = this.userform.controls.stream_sc_b.value? this.userform.controls.stream_sc_b.value : 0;
  //   var sctotal_boys= +artssc_boys + +sciencesc_boys + +commercesc_boys + +vocationalsc_boys + +streamsc_boys;
  //   this.userform.patchValue({ total_sc_b: sctotal_boys });
  // }

  // appeared_scgirls(){
  //   var artssc_girls= this.userform.controls.arts_sc_g.value? this.userform.controls.arts_sc_g.value : 0;
  //   var sciencesc_girls = this.userform.controls.science_sc_g.value? this.userform.controls.science_sc_g.value : 0;
  //   var commercesc_girls = this.userform.controls.commerce_sc_g.value? this.userform.controls.commerce_sc_g.value : 0;
  //   var vocationalsc_girls = this.userform.controls.vocational_sc_g.value? this.userform.controls.vocational_sc_g.value : 0;
  //   var streamsc_girls = this.userform.controls.stream_sc_g.value? this.userform.controls.stream_sc_g.value : 0;
  //   var sctotal_girls= +artssc_girls + +sciencesc_girls + +commercesc_girls + +vocationalsc_girls + +streamsc_girls;
  //   this.userform.patchValue({ total_sc_g: sctotal_girls });
  // }

  // appeared_stboys(){
  //   var artsst_boys= this.userform.controls.arts_st_b.value? this.userform.controls.arts_st_b.value : 0;
  //   var sciencest_boys = this.userform.controls.science_st_b.value? this.userform.controls.science_st_b.value : 0;
  //   var commercest_boys = this.userform.controls.commerce_st_b.value? this.userform.controls.commerce_st_b.value : 0;
  //   var vocationalst_boys = this.userform.controls.vocational_st_b.value? this.userform.controls.vocational_st_b.value : 0;
  //   var streamst_boys = this.userform.controls.stream_st_b.value? this.userform.controls.stream_st_b.value : 0;
  //   var sttotal_boys= +artsst_boys + +sciencest_boys + +commercest_boys + +vocationalst_boys + +streamst_boys;
  //   this.userform.patchValue({ total_st_b: sttotal_boys });
  // }

  // appeared_stgirls(){
  //   var artsst_girls= this.userform.controls.arts_st_g.value? this.userform.controls.arts_st_g.value : 0;
  //   var sciencest_girls = this.userform.controls.science_st_g.value? this.userform.controls.science_st_g.value : 0;
  //   var commercest_girls = this.userform.controls.commerce_st_g.value? this.userform.controls.commerce_st_g.value : 0;
  //   var vocationalst_girls = this.userform.controls.vocational_st_g.value? this.userform.controls.vocational_st_g.value : 0;
  //   var streamst_girls = this.userform.controls.stream_st_g.value? this.userform.controls.stream_st_g.value : 0;
  //   var sttotal_girls= +artsst_girls + +sciencest_girls + +commercest_girls + +vocationalst_girls + +streamst_girls;
  //   this.userform.patchValue({ total_st_g: sttotal_girls });
  // }
  // appeared_obcboys(){
  //   var artsobc_boys= this.userform.controls.arts_obc_b.value? this.userform.controls.arts_obc_b.value : 0;
  //   var scienceobc_boys = this.userform.controls.science_obc_b.value? this.userform.controls.science_obc_b.value : 0;
  //   var commerceobc_boys = this.userform.controls.commerce_obc_b.value? this.userform.controls.commerce_obc_b.value : 0;
  //   var vocationalobc_boys = this.userform.controls.vocational_obc_b.value? this.userform.controls.vocational_obc_b.value : 0;
  //   var streamobc_boys = this.userform.controls.stream_obc_b.value? this.userform.controls.stream_obc_b.value : 0;
  //   var obctotal_boys= +artsobc_boys + +scienceobc_boys + +commerceobc_boys + +vocationalobc_boys + +streamobc_boys;
  //   this.userform.patchValue({ total_obc_b: obctotal_boys });
  // }
  // appeared_obcgirls(){
  //   var artsobc_girls= this.userform.controls.arts_obc_g.value? this.userform.controls.arts_obc_g.value : 0;
  //   var scienceobc_girls = this.userform.controls.science_obc_g.value? this.userform.controls.science_obc_g.value : 0;
  //   var commerceobc_girls = this.userform.controls.commerce_obc_g.value? this.userform.controls.commerce_obc_g.value : 0;
  //   var vocationalobc_girls = this.userform.controls.vocational_obc_g.value? this.userform.controls.vocational_obc_g.value : 0;
  //   var streamobc_girls = this.userform.controls.stream_obc_g.value? this.userform.controls.stream_obc_g.value : 0;
  //   var obctotal_girls= +artsobc_girls + +scienceobc_girls + +commerceobc_girls + +vocationalobc_girls + +streamobc_girls;
  //   this.userform.patchValue({ total_obc_g: obctotal_girls });
  // }

  qualified_boys(indexvalue){
    if(indexvalue=="1" || indexvalue=="3" || indexvalue=="5" || indexvalue=="7"){
      var passedarts_gen_boys= this.userform.controls.passed_arts_gen_b.value? this.userform.controls.passed_arts_gen_b.value : 0;
      var passedarts_sc_boys = this.userform.controls.passed_arts_sc_b.value? this.userform.controls.passed_arts_sc_b.value : 0;
      var passedarts_st_boys = this.userform.controls.passed_arts_st_b.value? this.userform.controls.passed_arts_st_b.value : 0;
      var passedarts_obc_boys = this.userform.controls.passed_arts_obc_b.value? this.userform.controls.passed_arts_obc_b.value : 0;
      var passedarts_total_boys= +passedarts_gen_boys + +passedarts_sc_boys + +passedarts_st_boys + +passedarts_obc_boys;
      this.userform.patchValue({ passed_arts_tot_b: passedarts_total_boys });
    }
    if(indexvalue=="2" || indexvalue=="4" || indexvalue=="6" || indexvalue=="8"){
      var passedarts_gen_girls= this.userform.controls.passed_arts_gen_g.value? this.userform.controls.passed_arts_gen_g.value : 0;
      var passedarts_sc_girls = this.userform.controls.passed_arts_sc_g.value? this.userform.controls.passed_arts_sc_g.value : 0;
      var passedarts_st_girls = this.userform.controls.passed_arts_st_g.value? this.userform.controls.passed_arts_st_g.value : 0;
      var passedarts_obc_girls = this.userform.controls.passed_arts_obc_g.value? this.userform.controls.passed_arts_obc_g.value : 0;
      var passedarts_total_girls= +passedarts_gen_girls + +passedarts_sc_girls + +passedarts_st_girls + +passedarts_obc_girls;
      this.userform.patchValue({ passed_arts_tot_g: passedarts_total_girls });
    }
    if(indexvalue=="9" || indexvalue=="11" || indexvalue=="13" || indexvalue=="15"){
      var passedscience_gen_boys= this.userform.controls.passed_science_gen_b.value? this.userform.controls.passed_science_gen_b.value : 0;
      var passedscience_sc_boys = this.userform.controls.passed_science_sc_b.value? this.userform.controls.passed_science_sc_b.value : 0;
      var passedscience_st_boys= this.userform.controls.passed_science_st_b.value? this.userform.controls.passed_science_st_b.value : 0;
      var passedscience_obc_boys= this.userform.controls.passed_science_obc_b.value? this.userform.controls.passed_science_obc_b.value : 0;
      var passedscience_total_boys= +passedscience_gen_boys + +passedscience_sc_boys + +passedscience_st_boys + +passedscience_obc_boys;
      this.userform.patchValue({ passed_science_tot_b: passedscience_total_boys });
    }
    if(indexvalue=="10" || indexvalue=="12" || indexvalue=="14" || indexvalue=="16"){
      var passedscience_gen_girls= this.userform.controls.passed_science_gen_g.value? this.userform.controls.passed_science_gen_g.value : 0;
      var passedscience_sc_girls = this.userform.controls.passed_science_sc_g.value? this.userform.controls.passed_science_sc_g.value : 0;
      var passedscience_st_girls= this.userform.controls.passed_science_st_g.value? this.userform.controls.passed_science_st_g.value : 0;
      var passedscience_obc_girls= this.userform.controls.passed_science_obc_g.value? this.userform.controls.passed_science_obc_g.value : 0;
      var passedarts_total_girls= +passedscience_gen_girls + +passedscience_sc_girls + +passedscience_st_girls + +passedscience_obc_girls;
      this.userform.patchValue({ passed_science_tot_g: passedarts_total_girls });
    }
    if(indexvalue=="17" || indexvalue=="19" || indexvalue=="21" || indexvalue=="23"){
      var passedcommerce_gen_boys= this.userform.controls.passed_commerce_gen_b.value? this.userform.controls.passed_commerce_gen_b.value : 0;
      var passedcommerce_sc_boys = this.userform.controls.passed_commerce_sc_b.value? this.userform.controls.passed_commerce_sc_b.value : 0;
      var passedcommerce_st_boys= this.userform.controls.passed_commerce_st_b.value? this.userform.controls.passed_commerce_st_b.value : 0;
      var passedcommerce_obc_boys= this.userform.controls.passed_commerce_obc_b.value? this.userform.controls.passed_commerce_obc_b.value : 0;
      var passedcommerce_total_boys= +passedcommerce_gen_boys + +passedcommerce_sc_boys + +passedcommerce_st_boys + +passedcommerce_obc_boys;
      this.userform.patchValue({ passed_commerce_tot_b: passedcommerce_total_boys });
    }
    if(indexvalue=="18" || indexvalue=="20" || indexvalue=="22" || indexvalue=="24"){
      var passedcommerce_gen_girls= this.userform.controls.passed_commerce_gen_g.value? this.userform.controls.passed_commerce_gen_g.value : 0;
      var passedcommerce_sc_girls = this.userform.controls.passed_commerce_sc_g.value? this.userform.controls.passed_commerce_sc_g.value : 0;
      var passedcommerce_st_girls= this.userform.controls.passed_commerce_st_g.value? this.userform.controls.passed_commerce_st_g.value : 0;
      var passedcommerce_obc_girls= this.userform.controls.passed_commerce_obc_g.value? this.userform.controls.passed_commerce_obc_g.value : 0;
      var passedcommerce_total_girls= +passedcommerce_gen_girls + +passedcommerce_sc_girls + +passedcommerce_st_girls + +passedcommerce_obc_girls;
      this.userform.patchValue({ passed_commerce_tot_g: passedcommerce_total_girls });
    }
    if(indexvalue=="25" || indexvalue=="27" || indexvalue=="29" || indexvalue=="31"){
      var passedvocational_gen_boys= this.userform.controls.passed_vocational_gen_b.value? this.userform.controls.passed_vocational_gen_b.value : 0;
      var passedvocational_sc_boys = this.userform.controls.passed_vocational_sc_b.value? this.userform.controls.passed_vocational_sc_b.value : 0;
      var passedvocational_st_boys= this.userform.controls.passed_vocational_st_b.value? this.userform.controls.passed_vocational_st_b.value : 0;
      var passedvocational_obc_boys= this.userform.controls.passed_vocational_obc_b.value? this.userform.controls.passed_vocational_obc_b.value : 0;
      var passedvocational_total_boys= +passedvocational_gen_boys + +passedvocational_sc_boys + +passedvocational_st_boys + +passedvocational_obc_boys;
      this.userform.patchValue({ passed_vocational_tot_b: passedvocational_total_boys });
    }
    if(indexvalue=="26" || indexvalue=="28" || indexvalue=="30" || indexvalue=="32"){
      var passedvocational_gen_girls= this.userform.controls.passed_vocational_gen_g.value? this.userform.controls.passed_vocational_gen_g.value : 0;
      var passedvocational_sc_girls = this.userform.controls.passed_vocational_sc_g.value? this.userform.controls.passed_vocational_sc_g.value : 0;
      var passedvocational_st_girls= this.userform.controls.passed_vocational_st_g.value? this.userform.controls.passed_vocational_st_g.value : 0;
      var passedvocational_obc_girls= this.userform.controls.passed_vocational_obc_g.value? this.userform.controls.passed_vocational_obc_g.value : 0;
      var passedvocational_total_girls= +passedvocational_gen_girls + +passedvocational_sc_girls + +passedvocational_st_girls + +passedvocational_obc_girls;
      this.userform.patchValue({ passed_vocational_tot_g: passedvocational_total_girls });
    }
    if(indexvalue=="33" || indexvalue=="35" || indexvalue=="37" || indexvalue=="39"){
      var passedstream_gen_boys= this.userform.controls.passed_stream_gen_b.value? this.userform.controls.passed_stream_gen_b.value : 0;
      var passedstream_sc_boys = this.userform.controls.passed_stream_sc_b.value? this.userform.controls.passed_stream_sc_b.value : 0;
      var passedstream_st_boys= this.userform.controls.passed_stream_st_b.value? this.userform.controls.passed_stream_st_b.value : 0;
      var passedstream_obc_boys= this.userform.controls.passed_stream_obc_b.value? this.userform.controls.passed_stream_obc_b.value : 0;
      var passedstream_total_boys= +passedstream_gen_boys + +passedstream_sc_boys + +passedstream_st_boys + +passedstream_obc_boys;
      this.userform.patchValue({ passed_stream_tot_b: passedstream_total_boys });
    }
    if(indexvalue=="34" || indexvalue=="36" || indexvalue=="38" || indexvalue=="40"){
      var passedstream_gen_girls= this.userform.controls.passed_stream_gen_g.value? this.userform.controls.passed_stream_gen_g.value : 0;
      var passedstream_sc_girls = this.userform.controls.passed_stream_sc_g.value? this.userform.controls.passed_stream_sc_g.value : 0;
      var passedstream_st_girls= this.userform.controls.passed_stream_st_g.value? this.userform.controls.passed_stream_st_g.value : 0;
      var passedstream_obc_girls= this.userform.controls.passed_stream_obc_g.value? this.userform.controls.passed_stream_obc_g.value : 0;
      var passedstream_total_girls= +passedstream_gen_girls + +passedstream_sc_girls + +passedstream_st_girls + +passedstream_obc_girls;
      this.userform.patchValue({ passed_stream_tot_g: passedstream_total_girls });
    }
    if(indexvalue=="1" || indexvalue=="9" || indexvalue=="17" || indexvalue=="25" || indexvalue=="33"){ 
      var passedarts_gen_boys= this.userform.controls.passed_arts_gen_b.value? this.userform.controls.passed_arts_gen_b.value : 0;
      var passedscience_gen_boys = this.userform.controls.passed_science_gen_b.value? this.userform.controls.passed_science_gen_b.value : 0;
      var passedcommerce_gen_boys = this.userform.controls.passed_commerce_gen_b.value? this.userform.controls.passed_commerce_gen_b.value : 0;
      var passedvocational_gen_boys = this.userform.controls.passed_vocational_gen_b.value? this.userform.controls.passed_vocational_gen_b.value : 0;
      var passedstream_gen_boys= this.userform.controls.passed_stream_gen_b.value? this.userform.controls.passed_stream_gen_b.value : 0;
      var passedgen_total_boys= +passedarts_gen_boys + +passedscience_gen_boys + +passedcommerce_gen_boys + +passedvocational_gen_boys + +passedstream_gen_boys;
      this.userform.patchValue({ passed_total_gen_b: passedgen_total_boys });
    }
    if(indexvalue=="2" || indexvalue=="10" || indexvalue=="18" || indexvalue=="26" || indexvalue=="34"){ 
      var passedarts_gen_girls= this.userform.controls.passed_arts_gen_g.value? this.userform.controls.passed_arts_gen_g.value : 0;
      var passedscience_gen_girls = this.userform.controls.passed_science_gen_g.value? this.userform.controls.passed_science_gen_g.value : 0;
      var passedcommerce_gen_girls = this.userform.controls.passed_commerce_gen_g.value? this.userform.controls.passed_commerce_gen_g.value : 0;
      var passedvocational_gen_girls = this.userform.controls.passed_vocational_gen_g.value? this.userform.controls.passed_vocational_gen_g.value : 0;
      var passedstream_gen_girls= this.userform.controls.passed_stream_gen_g.value? this.userform.controls.passed_stream_gen_g.value : 0;
      var passedgen_total_girls= +passedarts_gen_girls + +passedscience_gen_girls + +passedcommerce_gen_girls + +passedvocational_gen_girls + +passedstream_gen_girls;
      this.userform.patchValue({ passed_total_gen_g: passedgen_total_girls });
    }
    if(indexvalue=="3" || indexvalue=="11" || indexvalue=="19" || indexvalue=="27" || indexvalue=="35"){ 
      var passedarts_sc_boys= this.userform.controls.passed_arts_sc_b.value? this.userform.controls.passed_arts_sc_b.value : 0;
      var passedscience_sc_boys = this.userform.controls.passed_science_sc_b.value? this.userform.controls.passed_science_sc_b.value : 0;
      var passedcommerce_sc_boys = this.userform.controls.passed_commerce_sc_b.value? this.userform.controls.passed_commerce_sc_b.value : 0;
      var passedvocational_sc_boys = this.userform.controls.passed_vocational_sc_b.value? this.userform.controls.passed_vocational_sc_b.value : 0;
      var passedstream_sc_boys= this.userform.controls.passed_stream_sc_b.value? this.userform.controls.passed_stream_sc_b.value : 0;
      var passedsc_total_boys= +passedarts_sc_boys + +passedscience_sc_boys + +passedcommerce_sc_boys + +passedvocational_sc_boys + +passedstream_sc_boys;
      this.userform.patchValue({ passed_total_sc_b: passedsc_total_boys });
    }
    if(indexvalue=="4" || indexvalue=="12" || indexvalue=="20" || indexvalue=="28" || indexvalue=="36"){ 
      var passedarts_sc_girls= this.userform.controls.passed_arts_sc_g.value? this.userform.controls.passed_arts_sc_g.value : 0;
      var passedscience_sc_girls = this.userform.controls.passed_science_sc_g.value? this.userform.controls.passed_science_sc_g.value : 0;
      var passedcommerce_sc_girls = this.userform.controls.passed_commerce_sc_g.value? this.userform.controls.passed_commerce_sc_g.value : 0;
      var passedvocational_sc_girls = this.userform.controls.passed_vocational_sc_g.value? this.userform.controls.passed_vocational_sc_g.value : 0;
      var passedstream_sc_girls= this.userform.controls.passed_stream_sc_g.value? this.userform.controls.passed_stream_sc_g.value : 0;
      var passedsc_total_girls= +passedarts_sc_girls + +passedscience_sc_girls + +passedcommerce_sc_girls + +passedvocational_sc_girls + +passedstream_sc_girls;
      this.userform.patchValue({ passed_total_sc_g: passedsc_total_girls });
    }
    if(indexvalue=="5" || indexvalue=="13" || indexvalue=="21" || indexvalue=="29" || indexvalue=="37"){ 
      var passedarts_st_boys= this.userform.controls.passed_arts_st_b.value? this.userform.controls.passed_arts_st_b.value : 0;
      var passedscience_st_boys = this.userform.controls.passed_science_st_b.value? this.userform.controls.passed_science_st_b.value : 0;
      var passedcommerce_st_boys = this.userform.controls.passed_commerce_st_b.value? this.userform.controls.passed_commerce_st_b.value : 0;
      var passedvocational_st_boys = this.userform.controls.passed_vocational_st_b.value? this.userform.controls.passed_vocational_st_b.value : 0;
      var passedstream_st_boys= this.userform.controls.passed_stream_st_b.value? this.userform.controls.passed_stream_st_b.value : 0;
      var passedst_total_boys= +passedarts_st_boys + +passedscience_st_boys + +passedcommerce_st_boys + +passedvocational_st_boys + +passedstream_st_boys;
      this.userform.patchValue({ passed_total_st_b: passedst_total_boys });
    }
    if(indexvalue=="6" || indexvalue=="14" || indexvalue=="22" || indexvalue=="30" || indexvalue=="38"){ 
      var passedarts_st_girls= this.userform.controls.passed_arts_st_g.value? this.userform.controls.passed_arts_st_g.value : 0;
      var passedscience_st_girls = this.userform.controls.passed_science_st_g.value? this.userform.controls.passed_science_st_g.value : 0;
      var passedcommerce_st_girls = this.userform.controls.passed_commerce_st_g.value? this.userform.controls.passed_commerce_st_g.value : 0;
      var passedvocational_st_girls = this.userform.controls.passed_vocational_st_g.value? this.userform.controls.passed_vocational_st_g.value : 0;
      var passedstream_st_girls= this.userform.controls.passed_stream_st_g.value? this.userform.controls.passed_stream_st_g.value : 0;
      var passedst_total_girls= +passedarts_st_girls + +passedscience_st_girls + +passedcommerce_st_girls + +passedvocational_st_girls + +passedstream_st_girls;
      this.userform.patchValue({ passed_total_st_g: passedst_total_girls });
    }
    if(indexvalue=="7" || indexvalue=="15" || indexvalue=="23" || indexvalue=="31" || indexvalue=="39"){ 
      var passedarts_obc_boys= this.userform.controls.passed_arts_obc_b.value? this.userform.controls.passed_arts_obc_b.value : 0;
      var passedscience_obc_boys = this.userform.controls.passed_science_obc_b.value? this.userform.controls.passed_science_obc_b.value : 0;
      var passedcommerce_obc_boys = this.userform.controls.passed_commerce_obc_b.value? this.userform.controls.passed_commerce_obc_b.value : 0;
      var passedvocational_obc_boys = this.userform.controls.passed_vocational_obc_b.value? this.userform.controls.passed_vocational_ob_b.value : 0;
      var passedstream_obc_boys= this.userform.controls.passed_stream_obc_b.value? this.userform.controls.passed_stream_obc_b.value : 0;
      var passedobc_total_boys= +passedarts_obc_boys + +passedscience_obc_boys + +passedcommerce_obc_boys + +passedvocational_obc_boys + +passedstream_obc_boys;
      this.userform.patchValue({ passed_total_obc_b: passedobc_total_boys });
    }
    if(indexvalue=="8" || indexvalue=="16" || indexvalue=="24" || indexvalue=="32" || indexvalue=="40"){ 
      var passedarts_obc_girls= this.userform.controls.passed_arts_obc_g.value? this.userform.controls.passed_arts_obc_g.value : 0;
      var passedscience_obc_girls = this.userform.controls.passed_science_obc_g.value? this.userform.controls.passed_science_obc_g.value : 0;
      var passedcommerce_obc_girls = this.userform.controls.passed_commerce_obc_g.value? this.userform.controls.passed_commerce_obc_g.value : 0;
      var passedvocational_obc_girls = this.userform.controls.passed_vocational_obc_g.value? this.userform.controls.passed_vocational_obc_g.value : 0;
      var passedstream_obc_girls= this.userform.controls.passed_stream_obc_g.value? this.userform.controls.passed_stream_obc_g.value : 0;
      var passedobc_total_girls= +passedarts_obc_girls + +passedscience_obc_girls + +passedcommerce_obc_girls + +passedvocational_obc_girls + +passedstream_obc_girls;
      this.userform.patchValue({ passed_total_obc_g: passedobc_total_girls });
    }

    var passed_arts_tot_b= this.userform.controls.passed_arts_tot_b.value? this.userform.controls.passed_arts_tot_b.value : 0;
    var passed_science_tot_b = this.userform.controls.passed_science_tot_b.value? this.userform.controls.passed_science_tot_b.value : 0;
    var passed_commerce_tot_b = this.userform.controls.passed_commerce_tot_b.value? this.userform.controls.passed_commerce_tot_b.value : 0;
    var passed_vocational_tot_b = this.userform.controls.passed_vocational_tot_b.value? this.userform.controls.passed_vocational_tot_b.value : 0;
    var passed_stream_tot_b= this.userform.controls.passed_stream_tot_b.value? this.userform.controls.passed_stream_tot_b.value : 0;
    var passed_total_boys= +passed_arts_tot_b + +passed_science_tot_b + +passed_commerce_tot_b + +passed_vocational_tot_b + +passed_stream_tot_b;

this.userform.patchValue({ passed_total_tot_b: passed_total_boys });

var passed_arts_tot_g= this.userform.controls.passed_arts_tot_g.value? this.userform.controls.passed_arts_tot_g.value : 0;
var passed_science_tot_g= this.userform.controls.passed_science_tot_g.value? this.userform.controls.passed_science_tot_g.value : 0;
var passed_commerce_tot_g = this.userform.controls.passed_commerce_tot_g.value? this.userform.controls.passed_commerce_tot_g.value : 0;
var passed_vocational_tot_g= this.userform.controls.passed_vocational_tot_g.value? this.userform.controls.passed_vocational_tot_g.value : 0;
var passed_stream_tot_g= this.userform.controls.passed_stream_tot_g.value? this.userform.controls.passed_stream_tot_g.value : 0;
var passed_total_girls= +passed_arts_tot_g + +passed_science_tot_g + +passed_commerce_tot_g + +passed_vocational_tot_g + +passed_stream_tot_g;

this.userform.patchValue({ passed_total_tot_g: passed_total_girls });

  } 

}
