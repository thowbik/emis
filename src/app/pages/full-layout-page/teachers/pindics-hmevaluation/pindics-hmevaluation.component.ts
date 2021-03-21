import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { TeacherService } from '../teacher.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-pindics-hmevaluation',
  templateUrl: './pindics-hmevaluation.component.html',
  styleUrls: ['./pindics-hmevaluation.component.css']
})
export class PindicsHmevaluationComponent implements OnInit {

  name = 'Yes';
  isDisabled = true;
  clicked = false;


  school_id: any;
  teacher_id: any;
  teacherlist: any;
  classlist: any;
  public filterForm: FormGroup;
  public checked: boolean = false;
  show: boolean = true;
  display: boolean = false;
  searchList: any;
  teacherlist1: any;
  classlists: any;
  teacherid: any;

  deletedata: any;

  form: FormGroup;

  evaluationList: Array<{ 'label': any, 'value': any }> = [
    { label: 'Below Expectations', value: '1' },
    { label: 'Closest to Expectations', value: '2' },
    { label: 'Meets Expectations', value: '3' },
    { label: 'Exceeds Expectations', value: '4' }];

  classlist1: Array<{ 'label': any, 'value': any }> = [

    { label: 'Tamil', value: '1' },
    { label: 'English', value: '2' },
    { label: 'Maths', value: '3' },
    { label: 'EVS/Science', value: '4' },
    { label: 'Social Science', value: '5' },
    { label: 'Telugu', value: '6' },
    { label: 'Malayalam', value: '7' },
    { label: 'Urudu', value: '8' },
    { label: 'Hindi', value: '9' },
    { label: 'Kannada', value: '10' }];

  constructor(public fb: FormBuilder, private userSessionService: UserSessionService,
    private teacherService: TeacherService, private alertService: AlertService, ) {
    this.school_id = this.userSessionService.schoolId();

  }

  ngOnInit() {
    this.initialValidator();
    this.filterForm = this.fb.group({
      HM_EV_1: ['', Validators.required],
      HM_EV_2: ['', Validators.required],
      HM_EV_3: ['', Validators.required],
      HM_EV_4: ['', Validators.required],
      HM_EV_5: ['', Validators.required],
      HM_EV_6: ['', Validators.required],
      HM_EV_7: ['', Validators.required],
      HM_EV_8: ['', Validators.required],
      //teacher_name: [''],
      teacher_id: ['', Validators.required],
      hm_id: [''],
      hm_ev_status: [''],
      hm_ev_date: [''],
    });

    this.school_id = this.userSessionService.schoolId();
    this.teacherService.getPindicsHmEvaluation(this.school_id).subscribe((res) => {
      if (res) {
        this.classlist = res.result.teacherinfo;
        // this.filterForm.patchValue(this.classlist[0]);

      }
    });
    this.searchList = [
      { name: 'Yes', value: 'unique_id_no' },
      { name: 'No', value: 'aadhaar_uid_number' }
    ];


  }


  initialValidator() {

    this.form = this.fb.group({
      'pi_id': new FormControl('', null),
      'teacher_id': new FormControl('', null),
      'school_key_id': new FormControl('', null),
      'class_1': new FormControl('', null),
      'class_2': new FormControl('', null),
      'class_3': new FormControl('', null),
      'class_4': new FormControl('', null),
      'class_5': new FormControl('', null),
      'class_6': new FormControl('', null),
      'class_7': new FormControl('', null),
      'class_8': new FormControl('', null),
      'tot_wrk_days': new FormControl('', null),
      'cl': new FormControl('', null),
      'el': new FormControl('', null),
      'ml': new FormControl('', null),
      'maternity_leave': new FormControl('', null),
      'other_leave': new FormControl('', null),
      'traing_atnd': new FormControl('', null),
      'traing_givn': new FormControl('', null),
      'electn_dty_atnd': new FormControl('', null),
      'duty_days': new FormControl('', null),
      'clas_rm_actvty_dys': new FormControl('', null),
      'lesson_plan': new FormControl('', null),
      'teach_learn_matrl': new FormControl('', null),
      'lesson_act': new FormControl('', null),
      'life_skill_act': new FormControl('', null),
      'prj_based_act': new FormControl('', null),
      'public_speaking': new FormControl('', null),
      'advertising': new FormControl('', null),
      'graphics': new FormControl('', null),
      'music': new FormControl('', null),
      'art_craft': new FormControl('', null),
      'story_telling': new FormControl('', null),
      'draw_paint': new FormControl('', null),
      'writing_poem': new FormControl('', null),
      'yoga': new FormControl('', null),
      'singing': new FormControl('', null),
      'sports_act': new FormControl('', null),
      'photography': new FormControl('', null),
      'essay_writing': new FormControl('', null),
      'video_creation': new FormControl('', null),
      'comp_skills': new FormControl('', null),
      'creativity': new FormControl('', null),
      'innovation': new FormControl('', null),
      'foreign_lang': new FormControl('', null),
      'sign_lang': new FormControl('', null),
      'cultrl_act': new FormControl('', null),
      'spk_many_lang': new FormControl('', null),
      'P1_1': new FormControl('', null),
      'P1_2': new FormControl('', null),
      'P1_3': new FormControl('', null),
      'P1_4': new FormControl('', null),
      'P1_5': new FormControl('', null),
      'P1_6': new FormControl('', null),
      'P1_7': new FormControl('', null),
      'P2_1': new FormControl('', null),
      'P2_2': new FormControl('', null),
      'P2_3': new FormControl('', null),
      'P2_4': new FormControl('', null),
      'P2_5': new FormControl('', null),
      'P3_A_1': new FormControl('', null),
      'P3_A_2': new FormControl('', null),
      'P3_A_3': new FormControl('', null),
      'P3_A_4': new FormControl('', null),
      'P3_A_5': new FormControl('', null),
      'P3_A_6': new FormControl('', null),
      'P3_A_7': new FormControl('', null),
      'P3_A_8': new FormControl('', null),
      'P3_B_1': new FormControl('', null),
      'P3_B_2': new FormControl('', null),
      'P3_B_3': new FormControl('', null),
      'P3_B_4': new FormControl('', null),
      'P3_B_5': new FormControl('', null),
      'P3_B_6': new FormControl('', null),
      'P3_B_7': new FormControl('', null),
      'P3_B_8': new FormControl('', null),
      'P3_C_1': new FormControl('', null),
      'P3_C_2': new FormControl('', null),
      'P3_C_3': new FormControl('', null),
      'P3_C_4': new FormControl('', null),
      'P3_C_5': new FormControl('', null),
      'P4_A_1': new FormControl('', null),
      'P4_A_2': new FormControl('', null),
      'P4_A_3': new FormControl('', null),
      'P4_A_4': new FormControl('', null),
      'P4_A_5': new FormControl('', null),
      'P4_B_1': new FormControl('', null),
      'P4_B_2': new FormControl('', null),
      'P4_C_1': new FormControl('', null),
      'P4_C_2': new FormControl('', null),
      'P5_A_1': new FormControl('', null),
      'P5_A_2': new FormControl('', null),
      'P5_A_3': new FormControl('', null),
      'P5_B_1': new FormControl('', null),
      'P5_B_2': new FormControl('', null),
      'P5_B_3': new FormControl('', null),
      'P6_1': new FormControl('', null),
      'P6_2': new FormControl('', null),
      'P6_3': new FormControl('', null),
      'P6_4': new FormControl('', null),
      'P6_5': new FormControl('', null),
      'P7_1': new FormControl('', null),
      'P7_2': new FormControl('', null),
      'P8_1': new FormControl('', null),
      'P8_2': new FormControl('', null),
      'P8_3': new FormControl('', null),
      'status': new FormControl('', null),
      'createdat': new FormControl('', null),
      'updatedat': new FormControl('', null),
      'hm_id': new FormControl('', null),
      'HM_EV_1': new FormControl('', null),
      'HM_EV_2': new FormControl('', null),
      'HM_EV_3': new FormControl('', null),
      'HM_EV_4': new FormControl('', null),
      'HM_EV_5': new FormControl('', null),
      'HM_EV_6': new FormControl('', null),
      'HM_EV_7': new FormControl('', null),
      'HM_EV_8': new FormControl('', null),
      'hm_ev_status': new FormControl('', null),
      'hm_ev_date': new FormControl('', null),
      'brte_id': new FormControl('', null),
      'BRTE_EV_1': new FormControl('', null),
      'BRTE_EV_2': new FormControl('', null),
      'BRTE_EV_3': new FormControl('', null),
      'BRTE_EV_4': new FormControl('', null),
      'BRTE_EV_5': new FormControl('', null),
      'BRTE_EV_6': new FormControl('', null),
      'BRTE_EV_7': new FormControl('', null),
      'BRTE_EV_8': new FormControl('', null),
      'brte_ev_status': new FormControl('', null),
      'brte_ev_date': new FormControl('', null)
    });
  }



  onSelection(e) {
    this.teacherid = e;
    this.show = !this.show;

    this.teacherService.getPindicsHmEvaluation(this.school_id).subscribe((res) => {
      if (res) {
        this.classlist = res.result.teacherinfo;
        const deleteitem = this.classlist.filter(blockdata => blockdata.teacher_id === e);
        this.filterForm.patchValue(deleteitem[0]);
      }
    });

  }

  showDialog() {
  
    this.display = true;
    this.teacher_id = this.teacherid;

    this.teacherService.getPindicsSingleTeacherEvaluation(this.teacher_id).subscribe((res) => {
      if (res) {
        this.teacherlist = res.result.teacher_data;
        this.form.patchValue(this.teacherlist[0]);
      }
    });
  }


  onSubmit() {
    if (this.filterForm.valid == true) {
      this.filterForm.controls['hm_ev_status'].setValue('1');
      this.teacherService.getPindicsHmEvaluationSave(this.filterForm.value).subscribe((res) => {
        if (res) {
          this.alertService.success('Successfully Submitted');
          window.location.reload();
        }
      });
    }
    else {
      this.alertService.warning('Please Provide Valid Information');
    }
  }

  onCancel() {
    this.ngOnInit();

  }

  ischecked(val) {
    this.checked = val == 0 ? false : true;
    // if(val != 0){
    //   this.filterForm.controls['class_id'].setValue(12);
    //   this.filterForm.controls['section'].setValue(0);                 

    // }
  }
  // detailskod2d() {
  //   this.show = !this.show;
  //   //console.log('2 Days Kodaikanal is clicked');
  // }

}
