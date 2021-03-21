import { Component, OnInit, ElementRef } from '@angular/core';
import { schoolsService } from '../schools.service';
 import { UserSessionService } from 'src/services/usersession.service';
 import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {SelectItem, ConfirmationService} from 'primeng/api';
import { AlertService } from 'src/services/alert.service';   
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css'],
  providers: [MessageService]

})
export class FundsComponent implements OnInit {
  userform: FormGroup;
  public expenditure_value: any ;
  public nonGovtOrgDiv : boolean = false;
  public userLoginId : boolean = true;
  public  Govtschool : boolean = false;
  public schoolTypeId : string ;
  schoolId: any;
  submitted: boolean;
  schoolfundsDetails:  any;
  schoolfundsDetailsDiable:  any[] = [];

  schoolLandDetails: any;
  public show:boolean = false;
  showNGO: boolean;
  commity: boolean;
  others: boolean;
  public laptopnotebk: string;
  public laptopnote: boolean; 
  public laptopnotes: boolean; 
  development_ssa: boolean;
  Maintanance_ssa: boolean;
  teachers_ssa: boolean;
  preschool: boolean;
  media: boolean;
  sports: boolean;
  library_grant: boolean;
  Composite: boolean;
  Total: boolean;
  otherss: boolean;
  telephone: boolean;
  Periodicals: boolean;
  Repair: boolean;
  Minor_Repair: boolean;
  Annual: boolean;
  Civil_Works: boolean;
  listOfLanguagues: any;
  ssagrntmjrrpr_txt : boolean;
  Composite_Value: number;
  library_grant_value: number;
  sports_value: number;
  media_value: number;
  ssagrntmjrrpr_value: number;
  laptop_value: number;
  preschool_value: number;
  Civil_Works_value: boolean;
  Annual_recept_value: boolean;
  Repair_recept_value: boolean;
  Minor_Repair_value: boolean;
  Periodicals_value: any;
  telephone_recept_value : boolean;
  others_recept_value: number;
  TLM_receipt_value: number;
  development_receipt_value: number;
  Maintanance_receipt_value: number;
  Total_recept_value : number;
  isValidComposite: boolean = true;
  isValidLibrary: boolean = true;
  isValidSports: boolean = true;
  isValidMedia: boolean = true;
  isValidSmc: boolean = true;
  isValidPreschool: boolean = true;
  isValidMajorRepair: boolean = true;


  constructor( private alertService :AlertService,
    private schoolService : schoolsService, 
    public usersessionService : UserSessionService,
    private fb: FormBuilder, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private el: ElementRef ) {
      this.schoolId = this.usersessionService.schoolId();
   }

  ngOnInit() {
     this.getschoolfundsDetails();
 
    this.userform = this.fb.group({ 
      'school_key_id': new FormControl(this.schoolId),
      'brlbks_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlbks_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brailbks_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlbks_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brailbks_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlbks_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlkit_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlkit_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brailkit_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlkit_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brailkit_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'brlkit_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'lvnkit_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'lvnkit_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'lvnkit_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'lvnkit_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'lvnkit_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'lvnkit_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'hearaid_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'hearaid_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'hearaid_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'hearaid_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'hearaid_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'hearaid_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'braces_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'braces_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'braces_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'braces_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'braces_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'braces_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'crthes_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'crthes_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'crthes_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'crthes_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'crthes_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'crthes_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'whlchr_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'whlchr_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'whlchr_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'whlchr_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'whlchr_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'whlchr_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'tricyle_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'tricyle_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'tricyle_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'tricyle_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'tricyle_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'tricyle_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'caliper_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'caliper_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'caliper_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'caliper_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'caliper_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'caliper_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),  
      'escort_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'escort_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'escort_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'escort_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'escort_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'escort_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'stipend_elebys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'stipend_elegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'stipend_secbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'stipend_secgls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'stipend_hsecbys': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'stipend_hsegls': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]), 
      /*newly created fields */
      'brlbks_prebys': new FormControl('', Validators.required),
      'brlbks_pregls': new FormControl('', Validators.required),
      'brlbks_uppbys': new FormControl('', Validators.required),
      'brlbks_uppgls': new FormControl('', Validators.required),
      'brlkit_prebys': new FormControl('', Validators.required),
      'brlkit_pregls': new FormControl('', Validators.required),
      'brlkit_uppbys': new FormControl('', Validators.required),
      'brlkit_uppgls': new FormControl('', Validators.required),
      'lvnkit_prebys': new FormControl('', Validators.required),
      'lvnkit_pregls': new FormControl('', Validators.required),
      'lvnkit_uppbys': new FormControl('', Validators.required),
      'lvnkit_uppgls': new FormControl('', Validators.required),
      'hearaid_prebys': new FormControl('', Validators.required),
      'hearaid_pregls': new FormControl('', Validators.required),
      'hearaid_uppbys': new FormControl('', Validators.required),
      'hearaid_uppgls': new FormControl('', Validators.required),
      'braces_prebys': new FormControl('', Validators.required),
      'braces_pregls': new FormControl('', Validators.required),
      'braces_uppbys': new FormControl('', Validators.required),
      'braces_uppgls': new FormControl('', Validators.required),
      'crthes_prebys': new FormControl('', Validators.required),
      'crthes_pregls': new FormControl('', Validators.required),
      'crthes_uppbys': new FormControl('', Validators.required),
      'crthes_uppgls': new FormControl('', Validators.required),
      'whlchr_prebys': new FormControl('', Validators.required),
      'whlchr_pregls': new FormControl('', Validators.required),
      'whlchr_uppbys': new FormControl('', Validators.required),
      'whlchr_uppgls': new FormControl('', Validators.required),
      'tricyle_prebys': new FormControl('', Validators.required),
      'tricyle_pregls': new FormControl('', Validators.required),
      'tricyle_uppbys': new FormControl('', Validators.required),
      'tricyle_uppgls': new FormControl('', Validators.required),
      'caliper_prebys': new FormControl('', Validators.required),
      'caliper_pregls': new FormControl('', Validators.required),
      'caliper_uppbys': new FormControl('', Validators.required),
      'caliper_uppgls': new FormControl('', Validators.required),
      'escort_prebys': new FormControl('', Validators.required),
      'escort_pregls': new FormControl('', Validators.required),
      'escort_uppbys': new FormControl('', Validators.required),
      'escort_uppgls': new FormControl('', Validators.required),
      'stipend_prebys': new FormControl('', Validators.required),
      'stipend_pregls': new FormControl('', Validators.required),
      'stipend_uppbys': new FormControl('', Validators.required),
      'stipend_uppgls': new FormControl('', Validators.required),
      /*newly created fields */

      // 'ssadevep_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssadevep_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssamntn_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssamntn_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssatlm_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssatlm_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssacivil_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssacivil_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssaannual_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssaannual_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),      
      // 'ssarpr_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssarpr_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssamnr_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssamnr_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssapur_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssapur_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssametwtr_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssametwtr_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),      
      // 'ssaoth_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssaoth_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssatot_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      // 'ssatot_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]), 
      'ssacmpste_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssacmpste_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssalibg_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssalibg_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssaped_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssaped_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssamedia_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssamedia_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssatrngsmcdc_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssatrngsmcdc_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssapreschl_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssapreschl_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssagrntmjrrpr_recept': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ssagrntmjrrpr_expdtre': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      'ngo_name': new FormControl('',null),
      'ngo_amt':new FormControl('',null),
      'psu_name': new FormControl('',null),
      'psu_amt': new FormControl('',null),
      'comu_name': new FormControl('',null),
      'comu_amt': new FormControl('',null),
      'othr_name': new FormControl('',null),
      'othr_amt': new FormControl('',null),
      'ngo_fince': new FormControl('', Validators.required),
      'psu_fince': new FormControl('', Validators.required),
      'comu_fince': new FormControl('', Validators.required),
      'othr_fince': new FormControl('', Validators.required),
      'main_com': new FormControl('', Validators.required),
      'sprts_equip': new FormControl('', Validators.required),
      'lib_boks': new FormControl('', Validators.required),
      'schlevl_cmp': new FormControl('', Validators.required),
      'schl_imp': new FormControl('', Validators.required),
      'schlreg_pfms': new FormControl('', Validators.required),    

  });

 
    // this.schoolTypeId=localStorage.getItem("schoolTypeId")
    // if(this.schoolTypeId == '4' || this.schoolTypeId == '2' ){
    //   this.userLoginId = true;
    //  } 
    //  else if(this.schoolTypeId == '1')
    //  { 
    //   this.Govtschool = true;
    //  }
    //  else{
    //   this.userLoginId = true;
    //   this.Govtschool = true;
    //  }   
    //  usersession.service  
    //  schoolTypeId

   }
   showDiv() {
    this.show = true;
  }
  hideDiv() {
    this.show = false;
  }
  Civil_Works_recept(e) {
    this.Civil_Works_value = e;
   }
   Civil_Works_expenture(e) {
    const num = this.Civil_Works_value;
    if (num >= e) {
        this.Civil_Works = false;
      } else {
       this.Civil_Works = true ;
     }
  }

  Annual_recept(e) {
    this.Annual_recept_value = e;
   }
   Annual_expenture(e) {
    const num = this.Annual_recept_value;
    if (num >= e) {
        this.Annual = false;
      } else {
       this.Annual = true ;
     }
  }

  Repair_recept(e) {
    this.Repair_recept_value = e;
   }
   Repair_expenture(e) {
    const num = this.Repair_recept_value;
    if (num >= e) {
        this.Repair = false;
      } else {
       this.Repair = true ;
     }
  }
  Minor_Repair_recept(e) {
    this.Minor_Repair_value = e;
   }
   Minor_Repair_expenture(e) {
    const num = this.Minor_Repair_value;
    if (num >= e) {
        this.Minor_Repair = false;
      } else {
       this.Minor_Repair = true ;
     }
  }
  Periodicals_recept(e) {
    this.Periodicals_value = e;
   }
   Periodicals_expenture(e) {
    const num = this.Periodicals_value;
    if (num >= e) {
        this.Periodicals = false;
      } else {
       this.Periodicals = true ;
     }
  }
  telephone_recept(e) {
    this.telephone_recept_value = e;
   }
   telephone_expenture(e) {
    const num = this.telephone_recept_value;
    if (num >= e) {
        this.telephone = false;
      } else {
       this.telephone = true ;
     }
  }
  others_recept(e) {
    this.others_recept_value = e;
   }
   others_expenture(e) {
    const num = this.others_recept_value;
    if (num >= e) {
        this.otherss = false;
      } else {
       this.otherss = true ;
     }
  }
  Total_recept(e) {
    this.Total_recept_value = e;
   }
   Total_expent(e) {
    const num = this.Total_recept_value;
    if (num >= e) {
        this.Total = false;
      } else {
       this.Total = true ;
     }
  }

  /* Code Correction by Thowfik */

  schGrantsCheck()
  {
    const num = parseInt(this.userform.value.ssacmpste_recept);
    const num1 = parseInt(this.userform.value.ssacmpste_expdtre);
    if(num >= num1)
    {
      this.isValidComposite = true;
  // this.alertService.error("No of functional units should not be more than total no of units");
  // this.schoolDetailForm.controls['lap_nbook_func'].setValue("");
    }
    else {
      this.isValidComposite = false;
    }
  }

  libGrantsCheck()
  {
    const num = parseInt(this.userform.value.ssalibg_recept);
    const num1 = parseInt(this.userform.value.ssalibg_expdtre);
    if(num >= num1)
    {
      this.isValidLibrary = true;
    }
    else {
      this.isValidLibrary = false;
    }
  }

  sportsGrantsCheck()
  {
    const num = parseInt(this.userform.value.ssaped_recept);
    const num1 = parseInt(this.userform.value.ssaped_expdtre);
    if(num >= num1)
    {
      this.isValidSports= true;
    }
    else {
      this.isValidSports = false;
    }
  }

  mediaGrantsCheck() {
    const num = parseInt(this.userform.value.ssamedia_recept);
    const num1 = parseInt(this.userform.value.ssamedia_expdtre);
    if(num >= num1)
    {
      this.isValidMedia= true;
    }
    else {
      this.isValidMedia = false;
    }
  }

  smcGrantsCheck() {
    const num = parseInt(this.userform.value.ssatrngsmcdc_recept);
    const num1 = parseInt(this.userform.value.ssatrngsmcdc_expdtre);
    if(num >= num1)
    {
      this.isValidSmc= true;
    }
    else {
      this.isValidSmc = false;
    }
  }
  preschoolGrantsCheck() {
    const num = parseInt(this.userform.value.ssapreschl_recept);
    const num1 = parseInt(this.userform.value.ssapreschl_expdtre);
    if(num >= num1)
    {
      this.isValidPreschool= true;
    }
    else {
      this.isValidPreschool = false;
    }
  }

  majorRepairsGrantsCheck() {
    const num = parseInt(this.userform.value.ssagrntmjrrpr_recept);
    const num1 = parseInt(this.userform.value.ssagrntmjrrpr_expdtre);
    if(num >= num1)
    {
      this.isValidMajorRepair= true;
    }
    else {
      this.isValidMajorRepair = false;
    }
  }
  
  /* Code Correction by Thowfik */

  sports_recept(e) {
    this.sports_value = e;
    this.sports = false;
   }
   sports_expenture(e) {
    const num = this.sports_value;
    if (num >= e) {
        this.sports = false;
      } else {
       this.sports = true ;
     }
  }
  media_recept(e) {
    this.media_value = e;
    this.media = false;
   }
   media_expenture(e) {
    const num = this.media_value;
    if (num >= e) {
        this.media = false;
      } else {
       this.media = true ;
     }
  }
  preschool_recept(e) {
    this.preschool_value = e;
    this.preschool = false;
   }
   preschool_exepent(e) {
    const num = this.preschool_value;
    const num1 = parseInt(e)
    if (num >= num1) {
        this.preschool = false;
      } else {
       this.preschool = true ;
     }
  }

  ssagrntmjrrp_recept(e) {
    this.ssagrntmjrrpr_value = e;
    this.ssagrntmjrrpr_txt = false;
   }
   ssagrntmjrrp_expdtre(e) {
    const num = this.ssagrntmjrrpr_value;
    const num1= parseInt(e)
    if (num >= num1) {
        this.ssagrntmjrrpr_txt = false;
      } else {
       this.ssagrntmjrrpr_txt = true ;
     }
  }

  TLM_receipt(e) {
    this.TLM_receipt_value = e;
   }
   TLM_expenditure(e) {
    const num = this.TLM_receipt_value;
    if (num >= e) {
        this.teachers_ssa = false;
      } else {
       this.teachers_ssa = true ;
     }
  }
  Maintanance_receipt(e) {
    this.Maintanance_receipt_value = e;
   }
   Maintanance_expenditure(e) {
    const num = this.Maintanance_receipt_value;
    if (num >= e) {
        this.Maintanance_ssa = false;
      } else {
       this.Maintanance_ssa = true ;
     }
  }
  development_receipt(e) {
    this.development_receipt_value = e;
   }
   development_expenditure(e) {
    const num = this.development_receipt_value;
    if (num >= e) {
        this.development_ssa = false;
      } else {
       this.development_ssa = true ;
     }
  }
  laptop(e) {
    this.laptop_value = e;
   }
  notebook(e) {
    debugger;
    const num = this.laptop_value;
    const num1 = parseInt(e)
    
    if (num >= num1) {
        this.laptopnote = false;
     } else {
       this.laptopnote = true ;
    }
  }

   showDivNGO () {
    this.showNGO = true;
    
  }
  hideDivNGO() {
    this.showNGO = false;
  }
  communityshow () {
    this.commity = true;
    
  }
  communityhide() {
    this.commity = false;
  }
  othersshow () {
    this.others = true;
    
  }
  othershide() {
    this.others = false;
  }


  
   onSubmit(value : string)
    {
     this.submitted = true;
    // this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});    
   }
 
getschoolfundsDetails() {
  debugger;
  this.schoolService.getBasicsList(this.schoolId).subscribe((res) => {
    this.schoolfundsDetailsDiable = res.result.schoolinfo;
    this.schoolfundsDetails = res.result.schoolinfo.udiseplus;
    this.userform.patchValue(this.schoolfundsDetails);
    if(this.userform.value.ngo_fince)
    {
      this.ChooseNGO(this.userform.value.ngo_fince);
    }
    if(this.userform.value.psu_fince)
    {
      this.ChoosePSU(this.userform.value.psu_fince);
    }
    if(this.userform.value.comu_fince)
    {
      this.Choosecommunity(this.userform.value.comu_fince);
    }
    if(this.userform.value.othr_fince)
    {
      this.Chooseother(this.userform.value.othr_fince);
    }
    // this.Composite_Value = this.schoolfundsDetails.ssacmpste_recept
    // this.library_grant_value = this.schoolfundsDetails.ssalibg_recept
    // this.sports_value = this.schoolfundsDetails.ssaped_recept
    // this.media_value = this.schoolfundsDetails.ssamedia_recept
    // this.laptop_value = this.schoolfundsDetails.ssatrngsmcdc_recept
    // this.preschool_value = this.schoolfundsDetails.ssapreschl_recept
    // this.ssagrntmjrrpr_value = this.schoolfundsDetails.ssagrntmjrrpr_recept

   })
}

ChooseNGO(value)
{
if(value == 1)
{
  this.userform.controls['ngo_name'].setValidators(Validators.required);
  this.userform.controls['ngo_amt'].setValidators(Validators.required);
}
else {
  this.userform.controls['ngo_name'].setValue("");
  this.userform.controls['ngo_name'].setValidators(null);
  this.userform.controls['ngo_amt'].setValue("");
  this.userform.controls['ngo_amt'].setValidators(null);
}
this.userform.controls['ngo_name'].updateValueAndValidity();
this.userform.controls['ngo_amt'].updateValueAndValidity();

}
ChoosePSU(value)
{
if(value == 1)
{
  this.userform.controls['psu_name'].setValidators(Validators.required);
  this.userform.controls['psu_amt'].setValidators(Validators.required);
}
else 
{
  this.userform.controls['psu_name'].setValue("");
  this.userform.controls['psu_name'].setValidators(null);
  this.userform.controls['psu_amt'].setValue("");
  this.userform.controls['psu_amt'].setValidators(null);
}
this.userform.controls['psu_name'].updateValueAndValidity();
this.userform.controls['psu_amt'].updateValueAndValidity();
}
Choosecommunity(value)
{
  if(value == 1)
{
  this.userform.controls['comu_name'].setValidators(Validators.required);
  this.userform.controls['comu_amt'].setValidators(Validators.required);
}
else 
{
  this.userform.controls['comu_name'].setValue("");
  this.userform.controls['comu_name'].setValidators(null);
  this.userform.controls['comu_amt'].setValue("");
  this.userform.controls['comu_amt'].setValidators(null);
}
this.userform.controls['comu_name'].updateValueAndValidity();
this.userform.controls['comu_amt'].updateValueAndValidity();
}
Chooseother(value)
{
  if(value == 1)
{
  this.userform.controls['othr_name'].setValidators(Validators.required);
  this.userform.controls['othr_amt'].setValidators(Validators.required);

}
else {
  this.userform.controls['othr_name'].setValue("");
  this.userform.controls['othr_name'].setValidators(null);
  this.userform.controls['othr_amt'].setValue("");
  this.userform.controls['othr_amt'].setValidators(null);
}
this.userform.controls['othr_name'].updateValueAndValidity();
this.userform.controls['othr_amt'].updateValueAndValidity();

}

save() {
  this.submitted = true;
  debugger;
  if (this.userform.valid) { 
    if (this.isValidComposite === true && this.isValidLibrary === true && this.isValidSports === true && this.isValidMedia === true && this.isValidSmc === true && this.isValidPreschool === true && this.isValidMajorRepair === true) {
    var data = {
    "schoolnew_grants_details":  this.userform.value, 
    "schoolnew_finance_details":  this.userform.value,
    "schoolnew_equipment":  this.userform.value,
    "schoolnew_profilecomplete":{"school_key_id": this.schoolId,"part_7" : "1"}
    }
    this.schoolService.saveSchoolDetails(data).subscribe(res => {
      if (res.dataStatus) {
        debugger;
        // "Student registered successfully"
        this.alertService.success("Records Updated Successfully");
        this.getschoolfundsDetails();
        // this.form.reset();
      }
      else{
        this.alertService.error(res.message);
      }
    });
  }
  else
  {
  this.alertService.error("Please Fill all the Required Fields");
  }
 }
 else
  {
    for (const key of Object.keys(this.userform.controls)) {
      if (this.userform.controls[key].invalid) {
        debugger;
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
  this.alertService.error("Please Fill all the Required Fields");
  }
 } 


//  onFinalSubmit() {
//   this.confirmationService.confirm({
//     message: `Are you sure that you want to final submit? Once submitted, you will not be able to edit the page or make any more changes`,
//     accept: () => {
//       this.submitted = true;
//   debugger;
//   if (this.userform.valid) { 
//     if (this.isValidComposite === true && this.isValidLibrary === true && this.isValidSports === true && this.isValidMedia === true && this.isValidSmc === true && this.isValidPreschool === true && this.isValidMajorRepair === true) {
//     var data = {
//     "schoolnew_grants_details":  this.userform.value, 
//     "schoolnew_finance_details":  this.userform.value,
//     "schoolnew_equipment":  this.userform.value,
//     "schoolnew_profilecomplete":{"school_key_id": this.schoolId,"part_7" : "2"}
//     }
//     this.schoolService.saveSchoolDetails(data).subscribe(res => {
//       if (res.dataStatus) {
       
//         this.alertService.success("Records Updated Successfully");
//         this.getschoolfundsDetails();
      
//       }
//       else{
//         this.alertService.error(res.message);
//       }
//     });
//   }
//   else
//   {
//   this.alertService.error("Please Fill all the Required Fields");
//   }
//  }
//  else
//   {
//   this.alertService.error("Please Fill all the Required Fields");
//   }
//     }
//   });
// }



}
