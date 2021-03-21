import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { schoolsService } from '../schools.service';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-school-inventory',
  templateUrl: './school-inventory.component.html',
  styleUrls: ['./school-inventory.component.css'],
  providers: [MessageService]
})
export class SchoolInventoryComponent implements OnInit {
  public optionsICTLab: any[] = [];
  public optionsTypeSchool: any[] = [];
  public Deworming: any[] = [];
  public InternetDiv: boolean = false;
  laptopnote: boolean = true;
  public laptopnotebk: string;
  public Desktop_value: string;
  public teach_value: string;
  public digital_value: string;
  public server_value: string;
  public projector_value: string;
  public lcd_value: string;
  public Scanner_value: string;
  public web_value: string;
  public Printer_value: string;
  public ups_value: string;
  public internet_value: string;
  public DTH_value: string;
  public Content_value: string;
  public Assistive_value: string;
  public tabletbook: string;
  public submitted: boolean = false;
  public schoolId: string;
  schoolDetailForm: FormGroup;
  optionsList: any[] = [];
  tabletnote: boolean = true;
  Desktopnote: boolean = true;
  teachesnote: boolean = true;
  digitalnote: boolean = true;
  servernote: boolean = true;
  projectorsnote: boolean = true;
  lcdnote: boolean = true;
  Scannernote: boolean = true;
  webcamera: boolean = true;
  Printernote: boolean = true;
  upsnote: boolean = true;
  internetnote: boolean = true;
  DTHNOTE: boolean = true;
  Contentsnote: boolean = true;
  Assistivenote: boolean = true;
  form: any;
  public schoolDetailsData: any[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService,
     private schoolsService: schoolsService, 
     private routers: Router, 
     private userSessionService: UserSessionService, 
     private confirmationService: ConfirmationService,
     private alertService: AlertService,
     private el: ElementRef) {
    this.schoolId = this.userSessionService.schoolId();
    this.schoolDetailForm = this.fb.group({
      school_key_id: new FormControl(this.schoolId, Validators.required),

      'cal': new FormControl('', Validators.required),
      'clab': new FormControl('', Validators.required),
      'intrntfac_avail': new FormControl('', Validators.required),
      'electricity': new FormControl('', Validators.required),
      'lap_nbook_avail': new FormControl('', Validators.required),
      'tablet_avail': new FormControl('', Validators.required),
      'dcomp_avail': new FormControl('', Validators.required),
      'PC_avail': new FormControl('', Validators.required),
      'DB_avail': new FormControl('', Validators.required),
      'server_avail': new FormControl('', Validators.required),
      'projtr_avail': new FormControl('', Validators.required),
      'lcd_led_plas_avail': new FormControl('', Validators.required),
      'webcam_avail': new FormControl('', Validators.required),
      'printr_avail': new FormControl('', Validators.required),
      'gnrtr_invups_avail': new FormControl('', Validators.required),
      'dth_antna_avail': new FormControl('', Validators.required),
      'econtnt_dig_avail': new FormControl('', Validators.required),
      'asst_CWSN_avail': new FormControl('', Validators.required),
      'med_ckup_lstyr': new FormControl('', Validators.required),
      'deworm_tab': new FormControl('', Validators.required),
      'iron_folic': new FormControl('', Validators.required),
      'phy_rm_avail': new FormControl('', Validators.required),
      'chem_rm_avail': new FormControl('', Validators.required),
      'bio_rm_avail': new FormControl('', Validators.required),
      'math_rm_avail': new FormControl('', Validators.required),
      'lang_rm_avail': new FormControl('', Validators.required),
      'geo_rm_avail': new FormControl('', Validators.required),
      'hom_scnrm_avail': new FormControl('', Validators.required),
      'psy_rm_avail': new FormControl('', Validators.required),
      'lab_rm_avail': new FormControl('', Validators.required),
      'aud_visfac_avail': new FormControl('', Validators.required),
      'scien_fac_avail': new FormControl('', Validators.required),
      'math_fac_avail': new FormControl('', Validators.required),
      'bio_fac_avail': new FormControl('', Validators.required),



      'year_implmnt': new FormControl('', null),
      'ict_lab': new FormControl('', null),
      'model_ict': new FormControl('', null),
      'ict_type': new FormControl('', null),
      // 'schlinternet': new FormControl('', Validators.required),
      // 'schlinternetspd': new FormControl('', Validators.required),
      // 'ifrange': new FormControl('', Validators.required),
      // 'ifprovidedby': new FormControl('', Validators.required),
      'lap_nbook_tot': new FormControl('', null),
      'lap_nbook_func': new FormControl('', null),
      'tablet_tot': new FormControl('', null),
      'tablet_func': new FormControl('', null),
      'dcomp_tot': new FormControl('', null),
      'dcomp_func': new FormControl('', null),
      'PC_tot': new FormControl('', null),
      'PC_func': new FormControl('', null),
      'DB_LMS_tot': new FormControl('', null),
      'DB_func': new FormControl('', null),
      'server_tot': new FormControl('', null),
      'server_func': new FormControl('', null),
      'projtr_tot': new FormControl('', null),
      'projtr_func': new FormControl('', null),
      'lcd_led_plas_tot': new FormControl('', null),
      'lcd_led_plas_func': new FormControl('', null),
      'scnr_avail': new FormControl('', null),
      'scnr_tot': new FormControl('', null),
      'scnr_func': new FormControl('', null),
      'webcam_tot': new FormControl('', null),
      'webcam_func': new FormControl('', null),
      'printr_tot': new FormControl('', null),
      // 'printr_internetfunc': new FormControl('', Validators.required),
      'gnrtr_invups_tot': new FormControl('', null),
      'gnrtr_invups_func': new FormControl('', null),
      // 'internet': new FormControl('', Validators.required),
      'intrntfac_tot': new FormControl('', null),
      'intrntfac_func': new FormControl('', null),
      'dth_antna_tot': new FormControl('', null),
      'dth_antna_func': new FormControl('', null),
      'econtnt_dig_tot': new FormControl('', null),
      'econtnt_dig_func': new FormControl('', null),
      // 'med_ckup_1': new FormControl('', Validators.required),
      // 'med_ckup_2': new FormControl('', Validators.required),
      // 'med_ckup_3': new FormControl('', Validators.required),
      'phy_prsnt_cond': new FormControl('', null),
      'chem_prsnt_cond': new FormControl('', null),
      'bio_prsnt_cond': new FormControl('', null),
      'math_prsnt_cond': new FormControl('', null),
      'lang_prsnt_cond': new FormControl('', null),
      'geo_prsnt_cond': new FormControl('', null),
      'hom_scnprsnt_cond': new FormControl('', null),
      'psy_prsnt_cond': new FormControl('', null),
      'asst_CWSN_tot': new FormControl('', null),
      'asst_CWSN_func': new FormControl('', null),
      'printr_func': new FormControl('', null),

    });
    this.optionsList = [
      { "value": "0", "label": "Please Select Option" },
      { "value": "1", "label": "Kutcha Road" },
      { "value": "2", "label": "Partial Pucca Road" },
      { "value": "3", "label": "No Road" },
    ];

    this.optionsICTLab = [
      { "value": "1", "label": "BOOT Model" },
      { "value": "2", "label": "BOO Model" },
      { "value": "3", "label": "Other" },
    ];

    this.optionsTypeSchool = [
      { "value": "1", "label": "Full Time" },
      { "value": "2", "label": "Part Time" },
      { "value": "3", "label": "Not Available" },
    ];

    this.Deworming = [
      { "value": "1", "label": "Complete (Two Doses)" },
      { "value": "2", "label": "Partially (One Dose)" },
      { "value": "3", "label": "Not Given" },
    ];
  }

  ngOnInit() {

    this.getSchoolDetailsData();

  }

  getSchoolDetailsData() {
    debugger;
    let schoolId = this.userSessionService.schoolId();
    this.schoolsService.getschoolDetails(schoolId, true).subscribe((res) => {
      if (res.result.schoolinfo) {
        this.schoolDetailsData = res.result.schoolinfo;
        this.schoolDetailForm.patchValue(this.schoolDetailsData);
        if(this.schoolDetailForm.value.med_ckup_lstyr)
        {
          var medicalCheckup = this.schoolDetailForm.value.med_ckup_lstyr == 'YES' ? '1' : '2';
          this.schoolDetailForm.controls['med_ckup_lstyr'].setValue(medicalCheckup);
        }
        if (this.schoolDetailForm.value.lap_nbook_avail) {
          this.listofItem(this.schoolDetailForm.value.lap_nbook_avail)
        }
        if (this.schoolDetailForm.value.tablet_avail) {
          this.tabletsvalue(this.schoolDetailForm.value.tablet_avail)
        }
        if (this.schoolDetailForm.value.dcomp_avail) {
          this.Desktopvalue(this.schoolDetailForm.value.dcomp_avail)
        }
        if (this.schoolDetailForm.value.PC_avail) {
          this.Devices(this.schoolDetailForm.value.PC_avail)
        }
        if (this.schoolDetailForm.value.DB_avail) {
          this.Boards(this.schoolDetailForm.value.DB_avail)
        }
        if (this.schoolDetailForm.value.server_avail) {
          this.Servervalue(this.schoolDetailForm.value.server_avail);
        }
        if (this.schoolDetailForm.value.projtr_avail) {
          this.projectorvalue(this.schoolDetailForm.value.projtr_avail);
        }
        if (this.schoolDetailForm.value.lcd_led_plas_avail) {
          this.Screen(this.schoolDetailForm.value.lcd_led_plas_avail);
        }
        if (this.schoolDetailForm.value.webcam_avail) {
          this.webcameravalue(this.schoolDetailForm.value.webcam_avail);
        }
        if (this.schoolDetailForm.value.printr_avail) {
          this.printer(this.schoolDetailForm.value.printr_avail);
        }
        if (this.schoolDetailForm.value.gnrtr_invups_avail) {
          this.inverter(this.schoolDetailForm.value.gnrtr_invups_avail);
        }
        if (this.schoolDetailForm.value.phy_rm_avail) {
          this.Physics(this.schoolDetailForm.value.phy_rm_avail);
        }
        if (this.schoolDetailForm.value.chem_rm_avail) {
          this.Chemistry(this.schoolDetailForm.value.chem_rm_avail);
        }
        if (this.schoolDetailForm.value.bio_rm_avail) {
          this.Biology(this.schoolDetailForm.value.bio_rm_avail);
        }
        if (this.schoolDetailForm.value.math_rm_avail) {
          this.Mathamatics(this.schoolDetailForm.value.math_rm_avail);
        }
        if (this.schoolDetailForm.value.lang_rm_avail) {
          this.Language(this.schoolDetailForm.value.lang_rm_avail);
        }
        if (this.schoolDetailForm.value.geo_rm_avail) {
          this.Geography(this.schoolDetailForm.value.geo_rm_avail);
        }
        if (this.schoolDetailForm.value.hom_scnrm_avail) {
          this.Science(this.schoolDetailForm.value.hom_scnrm_avail);
        }
        if (this.schoolDetailForm.value.psy_rm_avail) {
          this.Psychology(this.schoolDetailForm.value.psy_rm_avail);
        }
      }
    })
  }

  getmedicalcheckupData() {
    let schoolDetailsData;
    let schoolId = this.userSessionService.schoolId();
    this.schoolsService.getschoolDetails(schoolId, true).subscribe((res) => {
      schoolDetailsData = res.result.schoolinfo;
      this.schoolDetailForm.controls['year_implmnt'].setValue(schoolDetailsData.year_implmnt);
      this.schoolDetailForm.controls['ict_lab'].setValue(schoolDetailsData.ict_lab);
      this.schoolDetailForm.controls['model_ict'].setValue(schoolDetailsData.model_ict);
      this.schoolDetailForm.controls['ict_type'].setValue(schoolDetailsData.ict_type);
    })
  }

  showInternet() {
    this.InternetDiv = true;
  }
  hideInternet() {
    this.InternetDiv = false;
  }


  onSave(value: string) {
    debugger;
    this.submitted = true;
    if (this.schoolDetailForm.valid) {

      if (this.laptopnote === true && this.tabletnote === true && this.Desktopnote === true && this.teachesnote === true && this.digitalnote === true && this.servernote === true && this.projectorsnote === true && this.lcdnote === true && this.webcamera === true && this.Printernote === true && this.upsnote === true && this.internetnote === true && this.DTHNOTE === true && this.Contentsnote === true && this.Assistivenote === true) {

        let schoolId = this.userSessionService.schoolId();
        const inventoryData = {
          school_key_id: schoolId,
          "intrntfac_avail": value['intrntfac_avail'],
          "lap_nbook_avail": value['lap_nbook_avail'],
          "lap_nbook_tot": value['lap_nbook_tot'],
          "lap_nbook_func": value['lap_nbook_func'],
          "tablet_avail": value['tablet_avail'],
          "tablet_tot": value['tablet_tot'],
          "tablet_func": value['tablet_func'],
          "dcomp_avail": value['dcomp_avail'],
          "dcomp_tot": value['dcomp_tot'],
          "dcomp_func": value['dcomp_func'],
          "PC_avail": value['PC_avail'],
          "PC_tot": value['PC_tot'],
          "PC_func": value['PC_func'],
          "DB_avail": value['DB_avail'],
          "DB_LMS_tot": value['DB_LMS_tot'],
          "DB_func": value['DB_func'],
          "server_avail": value['server_avail'],
          "server_tot": value['server_tot'],
          "server_func": value['server_func'],
          "projtr_avail": value['projtr_avail'],
          "projtr_tot": value['projtr_tot'],
          "projtr_func": value['projtr_func'],
          "lcd_led_plas_avail": value['lcd_led_plas_avail'],
          "lcd_led_plas_tot": value['lcd_led_plas_tot'],
          "lcd_led_plas_func": value['lcd_led_plas_func'],
          "scnr_avail": value['scnr_avail'],
          "scnr_tot": value['scnr_tot'],
          "scnr_func": value['scnr_func'],
          "webcam_avail": value['webcam_avail'],
          "webcam_tot": value['webcam_tot'],
          "webcam_func": value['webcam_func'],
          "printr_avail": value['printr_avail'],
          "printr_tot": value['printr_tot'],
          "printr_func": value['printr_func'],
          "asst_CWSN_avail": value['asst_CWSN_avail'],
          "asst_CWSN_tot": value['asst_CWSN_tot'],
          "asst_CWSN_func": value['asst_CWSN_func'],
          "gnrtr_invups_avail": value['gnrtr_invups_avail'],
          "gnrtr_invups_tot": value['gnrtr_invups_tot'],
          "gnrtr_invups_func": value['gnrtr_invups_func'],
          "internet": value['internet'],
          "intrntfac_tot": value['intrntfac_tot'],
          "intrntfac_func": value['intrntfac_func'],
          "dth_antna_avail": value['dth_antna_avail'],
          "dth_antna_tot": value['dth_antna_tot'],
          "dth_antna_func": value['dth_antna_func'],
          "econtnt_dig_avail": value['econtnt_dig_avail'],
          "econtnt_dig_tot": value['econtnt_dig_tot'],
          "econtnt_dig_func": value['econtnt_dig_func'],
          "phy_rm_avail": value['phy_rm_avail'],
          "phy_prsnt_cond": value['phy_prsnt_cond'],
          "chem_rm_avail": value['chem_rm_avail'],
          "chem_prsnt_cond": value['chem_prsnt_cond'],
          "bio_rm_avail": value['bio_rm_avail'],
          "bio_prsnt_cond": value['bio_prsnt_cond'],
          "math_rm_avail": value['math_rm_avail'],
          "math_prsnt_cond": value['math_prsnt_cond'],
          "lang_rm_avail": value['lang_rm_avail'],
          "lang_prsnt_cond": value['lang_prsnt_cond'],
          "geo_rm_avail": value['geo_rm_avail'],
          "geo_prsnt_cond": value['geo_prsnt_cond'],
          "hom_scnrm_avail": value['hom_scnrm_avail'],
          "hom_scnprsnt_cond": value['hom_scnprsnt_cond'],
          "psy_rm_avail": value['psy_rm_avail'],
          "psy_prsnt_cond": value['psy_prsnt_cond'],
          "aud_visfac_avail": value['aud_visfac_avail'],
          "scien_fac_avail": value['scien_fac_avail'],
          "math_fac_avail": value['math_fac_avail'],
          "bio_fac_avail": value['bio_fac_avail'],
          "lab_rm_avail": value['lab_rm_avail'],
        }

        const trainingDetails = {
          school_key_id: schoolId,
          "med_ckup_lstyr": value['med_ckup_lstyr'],
          // "med_ckup_1": value['med_ckup_1'],
          // "med_ckup_2": value['med_ckup_2'],
          // "med_ckup_3": value['med_ckup_3'],
          "deworm_tab": value['deworm_tab'],
          "iron_folic": value['iron_folic'],
        }
        // const  schoolnew_inventory_facility = {
        //   school_key_id : schoolId,
        //    "lab_rm_avail": value['lab_rm_avail'],
        // }
        const result = {
          school_key_id: schoolId,
          "clab": value['clab'],
          "cal": value['cal'],
          "year_implmnt": value['year_implmnt'],
          "ict_lab": value['ict_lab'],
          "model_ict": value['model_ict'],
          "ict_type": value['ict_type'],
          "electricity": value['electricity'],
          // "schlinternet": value['schlinternet'],
          // "schlinternetspd": value['schlinternetspd'],
          // "ifrange": value['ifrange'],
          // "ifprovidedby": value['ifprovidedby'],
        }

        var data = {
          "schoolnew_academic_detail": result,
          "schoolnew_inventory_facility": inventoryData,
          // "schoolnew_natureofconst_entry": natureofconst,
          "schoolnew_training_detail": trainingDetails,
          "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_6": "1" }
        }
        console.log('form==============form>', data);



        this.schoolsService.saveSchoolDetails(data).subscribe(res => {
          if (res.dataStatus) {
            debugger;
            this.alertService.success("Records Updated Successfully");
            this.getSchoolDetailsData();
          }
          else {
            this.alertService.error(res.message);
            for (const key of Object.keys(this.schoolDetailForm.controls)) {
              if (this.schoolDetailForm.controls[key].invalid) {
                 const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                console.log('invalid keys',key);
                invalidControl.focus();
                 break;
              }
            }
          }
        });
      }
      else {
        this.alertService.error("No of functional units should not be more than total no of units");
      }
    }
    else {
      for (const key of Object.keys(this.schoolDetailForm.controls)) {
        if (this.schoolDetailForm.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys',key);
          invalidControl.focus();
           break;
        }
      }
      this.alertService.error("Please Fill all the Required Fields");
    }
  }


  laptopCountCheck() {
    debugger;
    const num = parseInt(this.schoolDetailForm.value.lap_nbook_tot);
    const num1 = parseInt(this.schoolDetailForm.value.lap_nbook_func);
    if (num >= num1) {
      this.laptopnote = true;
      // this.alertService.error("No of functional units should not be more than total no of units");
      // this.schoolDetailForm.controls['lap_nbook_func'].setValue("");
    }
    else {
      this.laptopnote = false;
    }

  }
  tabletCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.tablet_tot);
    const num1 = parseInt(this.schoolDetailForm.value.tablet_func);
    if (num >= num1) {
      this.tabletnote = true;
    }
    else {
      this.tabletnote = false;
    }
  }
  DesktopCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.dcomp_tot);
    const num1 = parseInt(this.schoolDetailForm.value.dcomp_func);
    if (num >= num1) {
      this.Desktopnote = true;
    }
    else {
      this.Desktopnote = false;
    }
  }
  pcDevicesCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.PC_tot);
    const num1 = parseInt(this.schoolDetailForm.value.PC_func);
    if (num >= num1) {
      this.teachesnote = true;
    }
    else {
      this.teachesnote = false;
    }
  }
  digitalBoardCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.DB_LMS_tot);
    const num1 = parseInt(this.schoolDetailForm.value.DB_func);
    if (num >= num1) {
      this.digitalnote = true;
    } else {
      this.digitalnote = false;
    }
  }

  serverCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.server_tot);
    const num1 = parseInt(this.schoolDetailForm.value.server_func);
    if (num >= num1) {
      this.servernote = true;
    } else {
      this.servernote = false;
    }
  }
  projectorCountCheck() {
    debugger;
    const num = parseInt(this.schoolDetailForm.value.projtr_tot);
    const num1 = parseInt(this.schoolDetailForm.value.projtr_func);
    if (num >= num1) {
      this.projectorsnote = true;
    } else {
      this.projectorsnote = false;
    }
  }

  lcdCountCheck(e) {
    const num = parseInt(this.schoolDetailForm.value.lcd_led_plas_tot);
    const num1 = parseInt(this.schoolDetailForm.value.lcd_led_plas_func);
    if (num >= num1) {
      this.lcdnote = true;
    } else {
      this.lcdnote = false;
    }
  }

  webcamCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.webcam_tot);
    const num1 = parseInt(this.schoolDetailForm.value.webcam_func);
    if (num >= num1) {
      this.webcamera = true;
    } else {
      this.webcamera = false;
    }
  }
  printerCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.printr_tot);
    const num1 = parseInt(this.schoolDetailForm.value.printr_func);
    if (num >= num1) {
      this.Printernote = true;
    } else {
      this.Printernote = false;
    }
  }
  generatorCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.gnrtr_invups_tot);
    const num1 = parseInt(this.schoolDetailForm.value.gnrtr_invups_func);
    if (num >= num1) {
      this.upsnote = true;
    } else {
      this.upsnote = false;
    }
  }

  internetCountCheck(e) {
    const num = parseInt(this.schoolDetailForm.value.intrntfac_tot);
    const num1 = parseInt(this.schoolDetailForm.value.intrntfac_func);
    if (num >= num1) {
      this.internetnote = true;
    } else {
      this.internetnote = false;
    }
  }

  dthCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.dth_antna_tot);
    const num1 = parseInt(this.schoolDetailForm.value.dth_antna_func);
    if (num >= num1) {
      this.DTHNOTE = true;
    } else {
      this.DTHNOTE = false;
    }
  }

  eContentCountCheck() {
    const num = parseInt(this.schoolDetailForm.value.econtnt_dig_tot);
    const num1 = parseInt(this.schoolDetailForm.value.econtnt_dig_func);
    if (num >= num1) {
      this.Contentsnote = true;
    } else {
      this.Contentsnote = false;
    }
  }

  assistiveCountCheck(e) {
    const num = parseInt(this.schoolDetailForm.value.asst_CWSN_tot);
    const num1 = parseInt(this.schoolDetailForm.value.asst_CWSN_func);
    if (num >= num1) {
      this.Assistivenote = true;
    } else {
      this.Assistivenote = false;
    }
  }
  listofItem(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['lap_nbook_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['lap_nbook_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['lap_nbook_tot'].setValue("");
      this.schoolDetailForm.controls['lap_nbook_func'].setValue("");
      this.schoolDetailForm.controls['lap_nbook_tot'].setValidators(null);
      this.schoolDetailForm.controls['lap_nbook_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['lap_nbook_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['lap_nbook_func'].updateValueAndValidity();
  }

  tabletsvalue(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['tablet_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['tablet_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['tablet_tot'].setValue("");
      this.schoolDetailForm.controls['tablet_func'].setValue("");
      this.schoolDetailForm.controls['tablet_tot'].setValidators(null);
      this.schoolDetailForm.controls['tablet_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['tablet_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['tablet_func'].updateValueAndValidity();
  }
  Desktopvalue(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['dcomp_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['dcomp_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['dcomp_tot'].setValue("");
      this.schoolDetailForm.controls['dcomp_func'].setValue("");
      this.schoolDetailForm.controls['dcomp_tot'].setValidators(null);
      this.schoolDetailForm.controls['dcomp_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['dcomp_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['dcomp_func'].updateValueAndValidity();
  }
  Devices(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['PC_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['PC_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['PC_tot'].setValue("");
      this.schoolDetailForm.controls['PC_func'].setValue("");
      this.schoolDetailForm.controls['PC_tot'].setValidators(null);
      this.schoolDetailForm.controls['PC_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['PC_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['PC_func'].updateValueAndValidity();
  }
  Boards(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['DB_LMS_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['DB_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['DB_LMS_tot'].setValue("");
      this.schoolDetailForm.controls['DB_func'].setValue("");
      this.schoolDetailForm.controls['DB_LMS_tot'].setValidators(null);
      this.schoolDetailForm.controls['DB_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['DB_LMS_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['DB_func'].updateValueAndValidity();
  }
  Server(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['server_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['server_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['server_tot'].setValue("");
      this.schoolDetailForm.controls['server_func'].setValue("");
      this.schoolDetailForm.controls['server_tot'].setValidators(null);

    }
    this.schoolDetailForm.controls['server_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['server_func'].updateValueAndValidity();
  }
  Servervalue(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['server_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['server_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['server_tot'].setValue("");
      this.schoolDetailForm.controls['server_func'].setValue("");
      this.schoolDetailForm.controls['server_tot'].setValidators(null);

    }
    this.schoolDetailForm.controls['server_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['server_func'].updateValueAndValidity();
  }
  projectorvalue(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['projtr_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['projtr_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['projtr_tot'].setValue("");
      this.schoolDetailForm.controls['projtr_func'].setValue("");
      this.schoolDetailForm.controls['server_tot'].setValidators(null);
      this.schoolDetailForm.controls['projtr_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['projtr_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['projtr_func'].updateValueAndValidity();
  }
  Screen(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['lcd_led_plas_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['lcd_led_plas_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['lcd_led_plas_tot'].setValue("");
      this.schoolDetailForm.controls['lcd_led_plas_func'].setValue("");
      this.schoolDetailForm.controls['lcd_led_plas_tot'].setValidators(null);
      this.schoolDetailForm.controls['lcd_led_plas_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['lcd_led_plas_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['lcd_led_plas_func'].updateValueAndValidity();
  }
  webcameravalue(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['webcam_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['webcam_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['webcam_tot'].setValue("");
      this.schoolDetailForm.controls['webcam_func'].setValue("");
      this.schoolDetailForm.controls['webcam_tot'].setValidators(null);
      this.schoolDetailForm.controls['webcam_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['webcam_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['webcam_func'].updateValueAndValidity();
  }

  printer(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['printr_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['printr_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['printr_tot'].setValue("");
      this.schoolDetailForm.controls['printr_func'].setValue("");
      this.schoolDetailForm.controls['printr_tot'].setValidators(null);
      this.schoolDetailForm.controls['printr_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['printr_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['printr_func'].updateValueAndValidity();
  }
  inverter(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['gnrtr_invups_tot'].setValidators(Validators.required);
      this.schoolDetailForm.controls['gnrtr_invups_func'].setValidators(Validators.required);

    }
    else {
      this.schoolDetailForm.controls['gnrtr_invups_tot'].setValue("");
      this.schoolDetailForm.controls['gnrtr_invups_func'].setValue("");
      this.schoolDetailForm.controls['gnrtr_invups_tot'].setValidators(null);
      this.schoolDetailForm.controls['gnrtr_invups_func'].setValidators(null);

    }
    this.schoolDetailForm.controls['gnrtr_invups_tot'].updateValueAndValidity();
    this.schoolDetailForm.controls['gnrtr_invups_func'].updateValueAndValidity();
  }

  
  Physics(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['phy_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['phy_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['phy_prsnt_cond'].setValidators(null);

    }
    this.schoolDetailForm.controls['phy_prsnt_cond'].updateValueAndValidity();
  }
  Chemistry(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['chem_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['chem_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['chem_prsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['chem_prsnt_cond'].updateValueAndValidity();
  }
  Biology(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['bio_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['bio_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['bio_prsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['bio_prsnt_cond'].updateValueAndValidity();
  }
  Mathamatics(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['math_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['math_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['math_prsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['math_prsnt_cond'].updateValueAndValidity();
  }
  Language(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['lang_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['lang_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['lang_prsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['lang_prsnt_cond'].updateValueAndValidity();
  }
  Geography(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['geo_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['geo_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['geo_prsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['geo_prsnt_cond'].updateValueAndValidity();
  }
  Science(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['hom_scnprsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['hom_scnprsnt_cond'].setValue("");
      this.schoolDetailForm.controls['hom_scnprsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['hom_scnprsnt_cond'].updateValueAndValidity();
  }
  Psychology(value) {
    if (value == 1) {
      this.schoolDetailForm.controls['psy_prsnt_cond'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['psy_prsnt_cond'].setValue("");
      this.schoolDetailForm.controls['psy_prsnt_cond'].setValidators(null);
    }
    this.schoolDetailForm.controls['psy_prsnt_cond'].updateValueAndValidity();
  }
  ictlab(value) {
    if (value == 1) {
      // this.getmedicalcheckupData();
      this.schoolDetailForm.controls['year_implmnt'].setValidators(Validators.required);
      this.schoolDetailForm.controls['ict_lab'].setValidators(Validators.required);
      this.schoolDetailForm.controls['model_ict'].setValidators(Validators.required);
      this.schoolDetailForm.controls['ict_type'].setValidators(Validators.required);
    }
    else {
      this.schoolDetailForm.controls['year_implmnt'].setValue("");
      this.schoolDetailForm.controls['ict_lab'].setValue("");
      this.schoolDetailForm.controls['model_ict'].setValue("");
      this.schoolDetailForm.controls['ict_type'].setValue("");
      this.schoolDetailForm.controls['year_implmnt'].setValidators(null);
      this.schoolDetailForm.controls['ict_lab'].setValidators(null);
      this.schoolDetailForm.controls['model_ict'].setValidators(null);
      this.schoolDetailForm.controls['ict_type'].setValidators(null);
    }
    this.schoolDetailForm.controls['year_implmnt'].updateValueAndValidity();
    this.schoolDetailForm.controls['ict_lab'].updateValueAndValidity();
    this.schoolDetailForm.controls['model_ict'].updateValueAndValidity();
    this.schoolDetailForm.controls['ict_type'].updateValueAndValidity();
  }


  // onFinalSubmit(value: string) {
  //   this.confirmationService.confirm({
  //     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
  //     accept: () => {
  //       this.submitted = true;
  //       if (this.schoolDetailForm.valid) {
    
  //         if (this.laptopnote === true && this.tabletnote === true && this.Desktopnote === true && this.teachesnote === true && this.digitalnote === true && this.servernote === true && this.projectorsnote === true && this.lcdnote === true && this.webcamera === true && this.Printernote === true && this.upsnote === true && this.internetnote === true && this.DTHNOTE === true && this.Contentsnote === true && this.Assistivenote === true) {
    
  //           let schoolId = this.userSessionService.schoolId();
  //           const inventoryData = {
  //             school_key_id: schoolId,
  //             "intrntfac_avail": value['intrntfac_avail'],
  //             "lap_nbook_avail": value['lap_nbook_avail'],
  //             "lap_nbook_tot": value['lap_nbook_tot'],
  //             "lap_nbook_func": value['lap_nbook_func'],
  //             "tablet_avail": value['tablet_avail'],
  //             "tablet_tot": value['tablet_tot'],
  //             "tablet_func": value['tablet_func'],
  //             "dcomp_avail": value['dcomp_avail'],
  //             "dcomp_tot": value['dcomp_tot'],
  //             "dcomp_func": value['dcomp_func'],
  //             "PC_avail": value['PC_avail'],
  //             "PC_tot": value['PC_tot'],
  //             "PC_func": value['PC_func'],
  //             "DB_avail": value['DB_avail'],
  //             "DB_LMS_tot": value['DB_LMS_tot'],
  //             "DB_func": value['DB_func'],
  //             "server_avail": value['server_avail'],
  //             "server_tot": value['server_tot'],
  //             "server_func": value['server_func'],
  //             "projtr_avail": value['projtr_avail'],
  //             "projtr_tot": value['projtr_tot'],
  //             "projtr_func": value['projtr_func'],
  //             "lcd_led_plas_avail": value['lcd_led_plas_avail'],
  //             "lcd_led_plas_tot": value['lcd_led_plas_tot'],
  //             "lcd_led_plas_func": value['lcd_led_plas_func'],
  //             "scnr_avail": value['scnr_avail'],
  //             "scnr_tot": value['scnr_tot'],
  //             "scnr_func": value['scnr_func'],
  //             "webcam_avail": value['webcam_avail'],
  //             "webcam_tot": value['webcam_tot'],
  //             "webcam_func": value['webcam_func'],
  //             "printr_avail": value['printr_avail'],
  //             "printr_tot": value['printr_tot'],
  //             "printr_func": value['printr_func'],
  //             "asst_CWSN_avail": value['asst_CWSN_avail'],
  //             "asst_CWSN_tot": value['asst_CWSN_tot'],
  //             "asst_CWSN_func": value['asst_CWSN_func'],
  //             "gnrtr_invups_avail": value['gnrtr_invups_avail'],
  //             "gnrtr_invups_tot": value['gnrtr_invups_tot'],
  //             "gnrtr_invups_func": value['gnrtr_invups_func'],
  //             "internet": value['internet'],
  //             "intrntfac_tot": value['intrntfac_tot'],
  //             "intrntfac_func": value['intrntfac_func'],
  //             "dth_antna_avail": value['dth_antna_avail'],
  //             "dth_antna_tot": value['dth_antna_tot'],
  //             "dth_antna_func": value['dth_antna_func'],
  //             "econtnt_dig_avail": value['econtnt_dig_avail'],
  //             "econtnt_dig_tot": value['econtnt_dig_tot'],
  //             "econtnt_dig_func": value['econtnt_dig_func'],
  //             "phy_rm_avail": value['phy_rm_avail'],
  //             "phy_prsnt_cond": value['phy_prsnt_cond'],
  //             "chem_rm_avail": value['chem_rm_avail'],
  //             "chem_prsnt_cond": value['chem_prsnt_cond'],
  //             "bio_rm_avail": value['bio_rm_avail'],
  //             "bio_prsnt_cond": value['bio_prsnt_cond'],
  //             "math_rm_avail": value['math_rm_avail'],
  //             "math_prsnt_cond": value['math_prsnt_cond'],
  //             "lang_rm_avail": value['lang_rm_avail'],
  //             "lang_prsnt_cond": value['lang_prsnt_cond'],
  //             "geo_rm_avail": value['geo_rm_avail'],
  //             "geo_prsnt_cond": value['geo_prsnt_cond'],
  //             "hom_scnrm_avail": value['hom_scnrm_avail'],
  //             "hom_scnprsnt_cond": value['hom_scnprsnt_cond'],
  //             "psy_rm_avail": value['psy_rm_avail'],
  //             "psy_prsnt_cond": value['psy_prsnt_cond'],
  //             "aud_visfac_avail": value['aud_visfac_avail'],
  //             "scien_fac_avail": value['scien_fac_avail'],
  //             "math_fac_avail": value['math_fac_avail'],
  //             "bio_fac_avail": value['bio_fac_avail'],
  //             "lab_rm_avail": value['lab_rm_avail'],
  //           }
    
  //           const trainingDetails = {
  //             school_key_id: schoolId,
  //             "med_ckup_lstyr": value['med_ckup_lstyr'],
              
  //             "deworm_tab": value['deworm_tab'],
  //             "iron_folic": value['iron_folic'],
  //           }
           
  //           const result = {
  //             school_key_id: schoolId,
  //             "clab": value['clab'],
  //             "cal": value['cal'],
  //             "year_implmnt": value['year_implmnt'],
  //             "ict_lab": value['ict_lab'],
  //             "model_ict": value['model_ict'],
  //             "ict_type": value['ict_type'],
  //             "electricity": value['electricity'],
             
  //           }
    
  //           var data = {
  //             "schoolnew_academic_detail": result,
  //             "schoolnew_inventory_facility": inventoryData,
              
  //             "schoolnew_training_detail": trainingDetails,
  //             "schoolnew_profilecomplete": { "school_key_id": this.schoolId, "part_6": "2" }
  //           }
          
    
    
    
  //           this.schoolsService.saveSchoolDetails(data).subscribe(res => {
  //             if (res.dataStatus) {
  //               debugger;
  //               this.alertService.success("Records Updated Successfully");
  //               this.getSchoolDetailsData();
  //             }
  //             else {
  //               this.alertService.error(res.message);
  //             }
  //           });
  //         }
  //         else {
  //           this.alertService.error("No of functional units should not be more than total no of units");
  //         }
  //       }
  //       else {
  //         this.alertService.error("Please Fill all the Required Fields");
  //       }
  //     }
  //   });
  // }


}
