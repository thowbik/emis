import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { schoolsService } from '../../full-layout-page/schools/schools.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cbsc-printpdf',
  templateUrl: './cbsc-printpdf.component.html',
  styleUrls: ['./cbsc-printpdf.component.css']
})
export class CbscPrintpdfComponent implements OnInit {
  form: FormGroup;
  public cbsePdfDetails: any[] = [];
  public fundsPdfDetails: any[] = [];
  schoolTypeId: any;
  schoolId: any;
  schoolDetailsData: any;
  content:any;
  @ViewChild('reportContent',{static: false}) reportContent: ElementRef;
  canvasImage: any;
  canvasImage1: any;
  sch_id: any;
  app_id: any;

  constructor(private route: ActivatedRoute,private SchoolsService: schoolsService,
    private router: Router,
    private userSessionService: UserSessionService,
    public fb: FormBuilder) {
      this.sch_id = this.router.getCurrentNavigation().extras;
    this.schoolTypeId = +this.userSessionService.schoolTypeId();
    this.schoolId = this.userSessionService.schoolId();
    this.route.queryParams.subscribe(
      params => {
        this.app_id =  params['app_id'];
      })

  }
  ngOnInit() {
    this.initialValidator();
    this.getcbscPdfInfo();
  }

  initialValidator() {
    this.form = this.fb.group({
      'udise_code': new FormControl('', null),
      'school_name': new FormControl('', null),
      'mgmt_name': new FormControl('', null),
      'mgmt_address': new FormControl('', null),
      'mgmt_pincode': new FormControl('', null),
      'mgmt_register_yn': new FormControl('', null),
      'mgmt_register_date': new FormControl('', null),
      'mgmt_register_place': new FormControl('', null),
      'minority_yn': new FormControl('', null),
      'other_inst_name1': new FormControl('', null),
      'other_inst_place1': new FormControl('', null),
      'other_inst_name2': new FormControl('', null),
      'other_inst_place2': new FormControl('', null),
      'other_inst_name3': new FormControl('', null),
      'other_inst_place3': new FormControl('', null),
      'other_inst_name4': new FormControl('', null),
      'other_inst_place4': new FormControl('', null),
      'other_inst_name5': new FormControl('', null),
      'other_inst_place5': new FormControl('', null),
      
      'hilly_yn': new FormControl('', null),
      'survey_number': new FormControl('', null),
      'area': new FormControl('', null),
      'sqfeet': new FormControl('', null),
      'land_registered': new FormControl('', null),
      'ownership_type': new FormControl('', null),
      'doc_details': new FormControl('', null),
      'doc_file_date': new FormControl('', null),
      'doc_issue_place': new FormControl('', null),
      'doc_valid_upto_date': new FormControl('', null),
      'bldg_value': new FormControl('', null),
      'students_accomodate_strength1': new FormControl('', null),
      'docs_engg_class': new FormControl('', null),
      'doa_bsc_doc_inspect_issue_authority': new FormControl('', null),
      'doa_bsc_doc_file_num': new FormControl('', null),
      'doa_bsc_doc_file_date': new FormControl('', null),
      'doc_survey_no': new FormControl('', null),
      'doc_inspect_issue_authority': new FormControl('', null),
      'students_accomodate_strength2': new FormControl('', null),
      'doc_inspect_date': new FormControl('', null),
      'doc_file_num': new FormControl('', null),
      'closure_order_yn': new FormControl('', null),
      'library_yn': new FormControl('', null),
      'books_yn': new FormControl('', null),
      'labs_yn': new FormControl('', null),
      'sch_same_campus_yn': new FormControl('', null),
      'classrooms': new FormControl('', null),
      'em_sch_yn': new FormControl('', null),
      'sch1_noc_yn': new FormControl('', null),
      'other_sch_affect_yn': new FormControl('', null),

    });
  }
  previouspage(){
    this.router.navigate(['/school/nocforcbscaffiliation']);
  }
  getcbscPdfInfo() {
    debugger
    let app_id = this.app_id; 
    this.SchoolsService.getcbscPdf(app_id).subscribe(res => {
      this.cbsePdfDetails = res.NOCwithCBSE_details[0];
      this.form.patchValue(this.cbsePdfDetails);

      if (this.cbsePdfDetails['mgmt_register_yn'] == 1) {
        this.form.controls['mgmt_register_yn'].setValue("YES");
      }
      else {
        this.form.controls['mgmt_register_yn'].setValue("NO");
      }

      if (this.cbsePdfDetails['minority_yn'] == 1) {
        this.form.controls['minority_yn'].setValue("YES");
      }
      else {
        this.form.controls['minority_yn'].setValue("NO");
      }

      if (this.cbsePdfDetails['hilly_yn'] == 1) {
        this.form.controls['hilly_yn'].setValue("YES");
      }
      else {
        this.form.controls['hilly_yn'].setValue("NO");
      }

      if (this.cbsePdfDetails['land_registered'] == 1) {
        this.form.controls['land_registered'].setValue("YES");
      }
      else {
        this.form.controls['land_registered'].setValue("NO");
      }

      if (this.cbsePdfDetails['ownership_type'] == 1) {
        this.form.controls['ownership_type'].setValue("Owned");
      }
      else if (this.cbsePdfDetails['ownership_type'] == 2) {
        this.form.controls['ownership_type'].setValue("Leased");
      }
      else {
        this.form.controls['ownership_type'].setValue("-");
      }


      if (this.cbsePdfDetails['docs_engg_class'] == 1) {
        this.form.controls['docs_engg_class'].setValue("Class I-A");
      }
      else if (this.cbsePdfDetails['docs_engg_class'] == 2) {
        this.form.controls['docs_engg_class'].setValue("Class I");
      }
      else if (this.cbsePdfDetails['docs_engg_class'] == 3) {
        this.form.controls['docs_engg_class'].setValue("Class II");
      }
      else {
        this.form.controls['docs_engg_class'].setValue("-");
      }

      if (this.cbsePdfDetails['closure_order_yn'] == 1) {
        this.form.controls['closure_order_yn'].setValue("YES");
      }
      else {
        this.form.controls['closure_order_yn'].setValue("NO");
      }
      
      if (this.cbsePdfDetails['library_yn'] == 1) {
        this.form.controls['library_yn'].setValue("YES");
      }
      else {
        this.form.controls['library_yn'].setValue("NO");
      }
    
      if (this.cbsePdfDetails['books_yn'] == 1) {
        this.form.controls['books_yn'].setValue("YES");
      }
      else {
        this.form.controls['books_yn'].setValue("NO");
      }
  
      if (this.cbsePdfDetails['labs_yn'] == 1) {
        this.form.controls['labs_yn'].setValue("YES");
      }
      else {
        this.form.controls['labs_yn'].setValue("NO");
      }

      if (this.cbsePdfDetails['sch_same_campus_yn'] == 1) {
        this.form.controls['sch_same_campus_yn'].setValue("YES");
      }
      else {
        this.form.controls['sch_same_campus_yn'].setValue("NO");
      }

      
      if (this.cbsePdfDetails['em_sch_yn'] == 1) {
        this.form.controls['em_sch_yn'].setValue("YES");
      }
      else {
        this.form.controls['em_sch_yn'].setValue("NO");
      }
      
      if (this.cbsePdfDetails['sch1_noc_yn'] == 1) {
        this.form.controls['sch1_noc_yn'].setValue("YES");
      }
      else {
        this.form.controls['sch1_noc_yn'].setValue("NO");
      }
      
      if (this.cbsePdfDetails['other_sch_affect_yn'] == 1) {
        this.form.controls['other_sch_affect_yn'].setValue("YES");
      }
      else {
        this.form.controls['other_sch_affect_yn'].setValue("NO");
      }

    })
  }
}

