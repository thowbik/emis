import { Component, OnInit, ElementRef } from '@angular/core';
import { CeoService } from '../ceo.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-brte-mapping',
  templateUrl: './brte-mapping.component.html',
  styleUrls: ['./brte-mapping.component.css']
})
export class BrteMappingComponent implements OnInit {
  brte_mapping : FormGroup;
  header: { field: string; header: string; widthstyle: string; }[];
  all_block_value: any [] = [];
  school_list: any;
  noDataFound: boolean;
  selected_schools: any;
  selected_schools_zone: any;
  page_st_3: boolean;
  page_st_1: boolean;
  save_btn_brte: boolean;
  save_data: { school_id: any; zonal_id: any; }[];
  selected_sch__value: any [] = [];
  save_sele_zonal_id: any;
  School_udise: any;
  School_key_id: any;
  schoolNameList: any [] =[];
  selectedSchoolNameList: any [] =[];
  save_datas: any[]=[];
  to_do_value: { label: string; value: number; }[];
  index: number;
  brte_value: any [] = [];
  brte: any;
  blk_sch_value: any [] =[];
  type_bbrte: any;
  submitted: boolean;
  brte_field: boolean;
  block_field: boolean;
  zone_field: boolean;
  files2: any[]=[];
  cols: { field: string; header: string; widthstyle: string; }[];
  page_1: boolean;
  page_2: boolean;
  go_assing_sub_sch: boolean;
  block_header: { field: string; header: string; widthstyle: string; }[];
  block_list: any;
  noDataFound1: boolean;
  page_1_1: boolean;
  zonal_sub_list: any;
  page_1_2: boolean;
  current_block_id: any;
  noDataFound1_2: boolean;
  userTypeID: any;
  current_block: any;
  crnt_block: boolean;
  school_type: { label: string; value: number; }[];
  sch_typ_filter : any[]=[]
  sch_typ_dis: boolean;
  deinedurl: string;
  page_st_3_1: boolean;
  current_zonal_id: any;
  manage_school_name: any;
  Un_Aided: any;
  Fully_Aided: any;
  Government: any;
  Central_Goverment: any;
  Partially_Aided: any;
  Manage_sch_id: any;
  Manage_udise: any;
  ManageClick: boolean;
  ManageSchoolName: any;
  ZonalSubCount: any;
  exportExcelData: any[];
  zonal_sub_lists: any;
  sch_lists: any;
 
  constructor(
     private CeoService: CeoService,
     public usersessionservice :UserSessionService,
     private alertService :AlertService,
     private fb: FormBuilder, 
     private el: ElementRef,private confirmationService: ConfirmationService
  ) { 
    this.userTypeID = this.usersessionservice.userTypeId();
  }

  ngOnInit() {
    if( this.userTypeID == 3){
      this.page_1 = true;
      this.page_1_1 = true;
      this.all_block_dropdown();

      this.block_header = [
        { field: 'block_name', header: 'Block' ,widthstyle: '4em' },
        { field: 'block_name', header: 'BRTE' ,widthstyle: '6em' },
        { field: 'zonal_schools', header: 'Zonal Schools' ,widthstyle: '4em'},
        { field: 'zonal_subschools', header: 'Annexed Schools' ,widthstyle: '4em'},
        { field: 'zonal_subschools', header: 'Un-Assigned Schools' ,widthstyle: '4em'},
        { field: 'total_schools', header: 'Total Schools' ,widthstyle: '4em'},
     ];
     
    this.brte_mapping = this.fb.group({ 
      'brt_type': new FormControl('',null),
      'BrteID': new FormControl('',null),
      // 'BlockID': new FormControl('',null),
      'ZonalID': new FormControl('',null),
      'SelectZonalSchool': new FormControl('',null),
      'SchoolType': new FormControl('',null),
     })

   
    this.to_do_value=[
      {label : "Assign BRTE To Block " , value : 2},
      {label : "Assign BRTE To School " , value : 1}
    ];
    this.header =
    [
      { field: '', header: 'Select',widthstyle: '4em'},
      { field: 'SchlName', header: 'School Name',widthstyle: '12em'},
      { field: 'udise_coUdiseCodede', header: 'UDISE Code',widthstyle: '16em'},
    ];
    this.sch_typ_filter=[];
    }
     else{
      this.alertService.info("User Not Allowed Here");
      this.deinedurl= './assets/img/AccessDeniedError.png';

     }
  }
  Selected_Block_zonal(block_id,block_name) {
    debugger;
    this.current_block_id = block_id;
    this.current_block = block_name;
    this.page_2= false;
    this.page_st_3= false; 
    this.page_st_3_1 = false;
    this.page_1=true;
    this.page_1_2=true;
    debugger;
    this.crnt_block=true;
    this.page_1_1=false;
    this.CeoService.zonal_list_API_1(block_id).subscribe((data) => {
     debugger;
      let dropDownList = data.zonal_school;
      // console.log(data,"school");
    // Table Values
    if(data.dataStatus != false || data.status == 200 )
      {
      this.zonal_sub_list =  data.zonal_school;
      // console.log(data.zonal_school.length,"data.zonal_school.length");
       let TotalArray = [];
      for (let i = 0; i < this.zonal_sub_list.length; i++) {
        TotalArray.push(this.zonal_sub_list[i]);
        }
        console.log(this.zonal_sub_list, '---------');
       this.zonal_sub_list = TotalArray.map(l => { return { 
        TotalSubSchool: l.zonal_sub_school.length,
        block_id: l.block_id,
        block_name: l.block_name,
        brte_id: l.brte_id,
        brte_name: l.brte_name,
        district_id: l.district_id,
        district_name: l.district_name,
        map_type: l.map_type,
        school_id: l.school_id,
        school_name: l.school_name,
        udise_code: l.udise_code,
        zonal_id: l.zonal_id,
        zonal_sub_school : l.zonal_sub_school}; });
      //  console.log(this.zonal_sub_list.TotalSubSchool,"this.zonal_sub_list Dist");
      //  console.log(this.zonal_sub_list,"this.zonal_sub_list Dist");
      }
      else
      {
        this.alertService.warning("NO Schools Found");
      }
    });
  } 

  Selected_school_type(id){
    let current_sch_type = id.value;
    this.save_btn_brte=true;
   if (current_sch_type == 1) {
    let remarksArray = [];
    this.sch_typ_filter =[];
    var govt_sch = this.schoolNameList;
    var govt_schoo = govt_sch.filter(item=> item.SchoolType == "Government");
    // console.log(govt_schoo,"Government");

    if(govt_schoo.length > 0) {
      for (let i = 0; i < govt_schoo.length; i++) {
      remarksArray.push(govt_schoo[i]);
      }
     this.sch_typ_filter = remarksArray.map(l => { return { BlckName: l.BlckName ,SchlID: l.SchlID,SchoolType: l.SchoolType, SchlName: l.SchlName, UdiseCode:l.UdiseCode }; });
    }
    else {
      this.alertService.warning("No Schools Found");
      }
   }
   else if (current_sch_type == 2){
    let remarksArray = [];
    this.sch_typ_filter =[];
    var govt_sch = this.schoolNameList;
    var govt_schoo = govt_sch.filter(item=> item.SchoolType == "Un-aided");
    // console.log(govt_schoo,"Un-aided");
    
    if(govt_schoo.length > 0) {
      for (let i = 0; i < govt_schoo.length; i++) {
      remarksArray.push(govt_schoo[i]);
      }
     this.sch_typ_filter = remarksArray.map(l => { return { BlckName: l.BlckName ,SchlID: l.SchlID,SchoolType: l.SchoolType, SchlName: l.SchlName, UdiseCode:l.UdiseCode }; });
    }
    else {
      this.alertService.warning("No Schools Found");
      }
   }
   else if (current_sch_type == 3){
    let remarksArray = [];
    this.sch_typ_filter =[];
    var govt_sch = this.schoolNameList;
    var govt_schoo = govt_sch.filter(item=> item.SchoolType == "Fully Aided");
    // console.log(govt_schoo,"Fully Aided");

    if(govt_schoo.length > 0) {
      for (let i = 0; i < govt_schoo.length; i++) {
      remarksArray.push(govt_schoo[i]);
      }
    this.sch_typ_filter = remarksArray.map(l => { return { BlckName: l.BlckName ,SchlID: l.SchlID,SchoolType: l.SchoolType, SchlName: l.SchlName, UdiseCode:l.UdiseCode }; });
    }
    else {
      this.alertService.warning("No Schools Found");
      }
    }
    else if (current_sch_type == 4){
      let remarksArray = [];
      this.sch_typ_filter =[];
      var govt_sch = this.schoolNameList;
      var govt_schoo = govt_sch.filter(item=> item.SchoolType == "Partially Aided");
      // console.log(govt_schoo,"Partially Aided");
      
      if(govt_schoo.length > 0) {
        for (let i = 0; i < govt_schoo.length; i++) {
        remarksArray.push(govt_schoo[i]);
        }
       this.sch_typ_filter = remarksArray.map(l => { return { BlckName: l.BlckName ,SchlID: l.SchlID,SchoolType: l.SchoolType, SchlName: l.SchlName, UdiseCode:l.UdiseCode }; });
      }
      else {
        this.alertService.warning("No Schools Found");
        }
     }
     else if (current_sch_type == 5){
      let remarksArray = [];
      this.sch_typ_filter =[];
      var govt_sch = this.schoolNameList;
      var govt_schoo = govt_sch.filter(item=> item.SchoolType == "Central Govt");
      // console.log(govt_schoo,"Central Govt");
      
      if(govt_schoo.length > 0) {
        for (let i = 0; i < govt_schoo.length; i++) {
        remarksArray.push(govt_schoo[i]);
        }
       this.sch_typ_filter = remarksArray.map(l => { return { BlckName: l.BlckName ,SchlID: l.SchlID,SchoolType: l.SchoolType, SchlName: l.SchlName, UdiseCode:l.UdiseCode }; });
      }
      else {
        this.alertService.warning("No Schools Found");
        }
     }
    else{
      this.alertService.warning("In Correct School Type");
    }
  }

  all_block_dropdown()  {
    this.CeoService.all_block_API_1().subscribe((data) => {
      let dropDownList = data.blocklist;
      // console.log(data,"block");
    // Dropdown Values
      debugger;
      if (data.dataStatus == true || data.status == 200){
        if(dropDownList.length>0) {
          if(this.page_1_1== true){
            debugger
            this.block_list = dropDownList ;
            this.noDataFound1_2 = false;
            this.zonal_sub_list = [];
          }
          else if(this.page_2 == true) {
            debugger
            if(dropDownList.length > 0) {
              for(let i=0; i<dropDownList.length;i++)
              {
                this.all_block_value.push({ value: dropDownList[i].id, label: dropDownList[i].block_name })
              }
            }
            else{
              this.alertService.error("No Blocks Found");
              this.all_block_value.push({ value: "", label: "No Data" })
            }
          }
          else{
            debugger;
            this.all_block_value.push({ value: "", label: "No Data" })
            this.noDataFound1_2 = true;
            this.alertService.error(data.msg);
          }
        }
      else{
        this.alertService.error("No Data Found");
        this.noDataFound1_2 = true;
      }}
      else
      {
        this.all_block_value.push({ value: "", label: "No Data" })
        this.noDataFound1_2 = true;
      }
    });
  }

  Selected_Zone_schoolss(){
    debugger;
    if(this.selected_schools.length > 0) {
     const selectedSchools = this.selected_schools.map(l => { return { school_id: l.SchlID, zonal_id:l.UdiseCode }; });
     
      this.CeoService.save_sel_sch_API_1({"records":selectedSchools}, true).subscribe((res) => {
      if(res){                                              
      this.alertService.success("Selected Zonal Schools are Saved Successfully");
      this.selected_schools =[];
        this.selected_sch__value=[];
        this.open_tab_one();
        this.Selected_Block_zonal(this.current_block_id, this.current_block);
     }
      else {
        this.alertService.error(res.msg); 
      }     
    })
  }
  }
  
  load_zone_sch(){
    debugger;
    this.selected_sch__value=[];
    this.brte_mapping.controls['SelectZonalSchool'].setValue("");
    this.brte_mapping.controls['SelectZonalSchool'].updateValueAndValidity();
    this.CeoService.all_get_sel_sch_API_1(this.current_block_id).subscribe((data) => {
      let dropDownList = data.school_list;
      // console.log(data,"school_list");
    // Dropdown Values
      debugger;
      if(data.dataStatus !== false) {
        debugger;
        this.selected_sch__value =[];
        for(let i=0; i<dropDownList.length;i++)
        {
          this.selected_sch__value.push({ value: dropDownList[i].ZonalID+"-"+dropDownList[i].SchlID, label: dropDownList[i].SchlName })
        }
        // console.log(dropDownList.length,"dropDownList.length");
        if (dropDownList.length > 0){
          this.go_assing_sub_sch = true;
        }
        else {
          this.go_assing_sub_sch = false;
        }
      }
      else
      {
        debugger
        this.selected_sch__value.push({ value: "", label: "No Data" }) 
        this.go_assing_sub_sch = false;
      } 
    });
  }

  delete(scho_id){
    debugger
      this.confirmationService.confirm({
          message: '<p class="font-weight-bold text-center p-2">Are you sure Do you want to Delete this Zonal-School?<br/>It Will Remove Selected Zonal-School & Annexed Schools.</p>',
          header: 'Delete Confirmation',
          // icon: 'pi pi-info-circle',
          accept: () => {
            this.CeoService.delete_zone_API_1(scho_id).subscribe((data) => {
              // Table Values
              if( data.dataStatus != false)
                {
                  this.alertService.success("Data Deleted Successfully");
                  this.Selected_Block_zonal( this.current_block_id, this.current_block )
                }
                else
                {
                  this.alertService.error(data.msg);
                }
              });
          },
          reject: () => {
            this.alertService.warning("Delete Cancel By User");     
        }
      });
    }

    DeleteSubSchool(scho_id){
      // console.log(scho_id,"Delete Sub ID");
      
this.confirmationService.confirm({
  message: '<p class="font-weight-bold text-center p-2">Are you sure Do you want to Delete this Annexed School?</p>',
  header: 'Delete Confirmation',
          // icon: 'pi pi-info-circle',
          accept: () => {
            this.CeoService.delete_sub_API_1(scho_id).subscribe((data) => {
              // Table Values
              if( data.dataStatus != false)
                {
                  this.alertService.success("Annex Deleted Successfully");
                  this.Selected_Block_zonal( this.current_block_id, this.current_block )
                }
                else
                {
                  this.alertService.error(data.msg);
                }
              });
          },
          reject: () => {
            this.alertService.warning("Delete Cancel By User");     
        }
      });
    }

  Selected_school_drop(zonal_id){
    debugger;
    this.sch_typ_dis=true;
    this.save_sele_zonal_id = zonal_id.value;
    let  School =  this.save_sele_zonal_id.toString().split('-');
    this.School_udise = School[0];
    this.School_key_id = School[1];

    if(this.save_sele_zonal_id == '' || this.save_sele_zonal_id == null){
      this.alertService.error("Please Select atleast one zonal school"); 
    }
    else{
      this.CeoService.all_sub_school_API_1(this.School_key_id).subscribe((data) => {
        // console.log(data,"sub_school_list");
      // Table Values
      if( data.sub_school_list.length > 0)
        {
        this.schoolNameList =  data.sub_school_list;
        this.school_type=[
          {label : "Govt Schools" , value : 1},
          {label : "Un-aided" , value : 2},
          {label : "Fully Aided" , value : 3},
          {label : "Partially Aided" , value : 4},
          {label : "Central Govt." , value : 5}
        ];
        }
        else
        {
        this.alertService.warning("NO Schools Found");
        }
      });

      this.CeoService.tot_for_current_sch(this.School_udise).subscribe((data) => {
        // console.log(data,"sub_school_list");
      // Table Values
      if( data.dataStatus != false)
        {
        this.Government =  data.data[0].Government;
        this.Fully_Aided =  data.data[0].Fully_Aided;
        this.Un_Aided =  data.data[0].Un_Aided;
        this.Partially_Aided =  data.data[0].Partially_Aided;
        this.Central_Goverment =  data.data[0].Central_Goverment;
        debugger;
        }
        else
        {
        this.alertService.warning("NO Schools Found");
        }
      });
    }
  }
  
  Selected_sub_z_schools(){
  //  console.log(this.selectedSchoolNameList,"selectedSchoolNameList");
   let data_array = [];
   var sch_list = this.selectedSchoolNameList.filter(item=> item.UdiseCode != '' && item.UdiseCode != null);
   if(sch_list.length > 0) {
     for (let i = 0; i < sch_list.length; i++) {
        data_array.push(sch_list[i]);
       }
     }
     else{
       this.alertService.error("No Annexed School Found");
     }
   this.save_datas = data_array.map(l => { return { SubSchlID: l.SchlID,}; });
  //  console.log(this.save_datas,"this.save_datas");
   
   this.CeoService.save_sub_sch_API_1({"ZonalID": this.School_udise,"records":this.save_datas}, true).subscribe((res) => {
    if(res){                                              
    this.alertService.success("Selected Schools are Saved Successfully");
    this.load_zone_sch();
    this.sch_typ_filter=[];
    this.selectedSchoolNameList=[];  
    this.sch_typ_dis=false;
    this.Manage_sch_id = false;
    this.brte_mapping.controls['SchoolType'].setValue("");
    this.brte_mapping.controls['SchoolType'].updateValueAndValidity();
   }
    else {
      this.alertService.error("Data Not save"); 
    }     
  })
  }

  Selected_brte(){
    this.block_field=true;
    this.blk_sch_value= []
    this.CeoService.blck_z_school_API_1(this.current_block_id).subscribe((data) => {
      let dropDownList = data.schoollist;
      // console.log(data.schoollist,"blck_z_school_API_1");
    // BRTE Dropdown Values
      debugger;
      // console.log(data.dataStatus,"data.dataStatus");
      
      if(data.dataStatus !== false) {
        debugger;
        for(let i=0; i<dropDownList.length;i++)
        {
          this.blk_sch_value.push({ value: dropDownList[i].ZonalID, label: dropDownList[i].SchlName })
        }

      }
      else
      {
        debugger
        this.blk_sch_value.push({ value: "", label: "No Data" }) 
      } 
     });
  }

  manage_brte(zonal_id,school_name){
    this.current_zonal_id = zonal_id;
    this.manage_school_name = school_name;
    this.brte_mapping.controls['ZonalID'].setValidators(null);
    this.brte_mapping.controls['ZonalID'].updateValueAndValidity();
    debugger;
    this.page_1_2= false;
    this.page_1= false;
    this.page_2= true;
    this.index = 2 ;
    this.page_st_1= false;
    this.page_st_3= true;
    this.index=2;
    this.page_st_3_1 = true;
    this.type_bbrte = '';
    this.CeoService.get_brte_API_1().subscribe((data) => {
      let dropDownList = data.result;
      // console.log(data,"brte_list");
      this.brte_value =[];
    // BRTE Dropdown Values
      debugger;
      if(dropDownList.length>0) {
        for(let i=0; i<dropDownList.length;i++)
        {
          this.brte_value.push({ value: dropDownList[i].brte_id, label: dropDownList[i].brte_name })
        }
      }
      else
      {
        this.brte_value.push({ value: "", label: "No Data" }) 
      } 
     });
     this.brte_mapping.controls['BrteID'].setValidators(Validators.required);
     this.brte_mapping.controls['BrteID'].updateValueAndValidity();
  }
  type_Selected(brtee){
    // console.log(brtee,"brteebrtee");
    debugger;
    this.brte_field= true;
    this.block_field=false;
    this.zone_field=false;
    this.submitted= false;
    this.brte_mapping.controls['BrteID'].setValue("");
    this.brte_mapping.controls['BrteID'].updateValueAndValidity();
    // this.brte_mapping.controls['BlockID'].setValue("");
    // this.brte_mapping.controls['BlockID'].updateValueAndValidity();
    this.brte_mapping.controls['ZonalID'].setValue("");
    this.brte_mapping.controls['ZonalID'].updateValueAndValidity();
    this.type_bbrte = brtee;

    this.CeoService.get_brte_API_1().subscribe((data) => {
      let dropDownList = data.result;
      // console.log(data,"brte_list");
      this.brte_value =[];
    // BRTE Dropdown Values
      debugger;
      if(dropDownList.length>0) {
        for(let i=0; i<dropDownList.length;i++)
        {
          this.brte_value.push({ value: dropDownList[i].brte_id, label: dropDownList[i].brte_name })
        }
      }
      else
      {
        this.brte_value.push({ value: "", label: "No Data" }) 
      } 
     });

    if( this.type_bbrte  == 1){
      this.brte_mapping.controls['ZonalID'].setValidators(Validators.required);
      this.brte_mapping.controls['ZonalID'].updateValueAndValidity();
      this.brte_mapping.controls['BrteID'].setValidators(Validators.required);
      this.brte_mapping.controls['BrteID'].updateValueAndValidity();
      // this.brte_mapping.controls['BlockID'].setValidators(Validators.required);
      // this.brte_mapping.controls['BlockID'].updateValueAndValidity();
    }
    else{
      this.brte_mapping.controls['ZonalID'].setValidators(null);
      this.brte_mapping.controls['BrteID'].setValue("");
      this.brte_mapping.controls['ZonalID'].updateValueAndValidity();
      this.brte_mapping.controls['BrteID'].setValidators(Validators.required);
      this.brte_mapping.controls['BrteID'].updateValueAndValidity();
      // this.brte_mapping.controls['BlockID'].setValidators(Validators.required);
      // this.brte_mapping.controls['BlockID'].updateValueAndValidity();
    }
  }

  brte_selected(brte_sele){
    this.brte = brte_sele.value;
    this.all_block_dropdown();
  }

  tab_index(name){
    this.index = name.index;
    debugger;
    if(this.index == 0){
      this.page_st_1=true; 
      this.open_tab_one(); 
     }
    else if(this.index == 1){
      this.sch_typ_filter=[];
      this.load_zone_sch();
      this.sch_typ_dis = false;
     }
    else if(this.index == 2){
      this.page_st_3= true;
      this.type_bbrte = '';
      this.brte_mapping.controls['brt_type'].setValue("");
      this.brte_mapping.controls['brt_type'].updateValueAndValidity();
    }
  }
  
  goBack_b(){
    this.ngOnInit();
    this.all_block_dropdown();
    this.crnt_block=false;
    this.page_2=false;
    this.page_1_2=false;
    this.page_1_1=true;
  }

  open_tab_one() {
    this.index=0;
    this.page_2=true;
    this.page_1=false;
    this.page_1_1=false;
    this.page_st_1 = true;
    this.noDataFound1 = true;
   
    this.school_list=[];
    this.CeoService.all_school_API_1(this.current_block_id).subscribe((data) => {
      debugger
      let dropDownList = data.school_list;
      // console.log(data,"school");
    // Table Values
    if( data.dataStatus != false)
      {
      this.school_list =  data.school_list;
      this.noDataFound1 = false;
      }
      else
      {
        this.noDataFound1 = true;
      }
    });
  }

  save_brte(map_type,sch_name){
    // console.log(map_type,"maptype");
    // console.log(sch_name,"sch_name");
    this.submitted = true;
    debugger;
    if (this.brte_mapping.valid) { 
      if( map_type == 1) {
        let data = [{"MapType" : map_type,
                    "BrteID" : this.brte_mapping.value.BrteID, 
                    "BlockID" : this.current_block_id,
                   }];
        // console.log(data,"else save_data");
        this.CeoService.Save_brte_API({"records":data}, true).subscribe((res) => {
          // console.log(res,"res");
          if(res != 0){
            this.alertService.success("BRTE Saved Successfully");
            this.submitted= false;
            this.brte_mapping.reset();
            this.tab_index({originalEvent: MouseEvent, index: 2});
            this.Selected_Block_zonal(this.current_block_id, this.current_block);
          }    
            else {
              this.alertService.error(res.msg);
          }})
        }
      else {
        if(this.brte_mapping.value.ZonalID == "" || this.brte_mapping.value.ZonalID == undefined  || this.brte_mapping.value.ZonalID == null){
         debugger;
          var data = [{"MapType": map_type,
          "BrteID" : this.brte_mapping.value.BrteID, 
          // "BlockID": this.brte_mapping.value.BlockID,
          "ZonalID" : sch_name
         }];
         debugger;
        }
        else {
          var data = [{"MapType": map_type,
          "BrteID" : this.brte_mapping.value.BrteID, 
          // "BlockID": this.brte_mapping.value.BlockID,
          "ZonalID" : this.brte_mapping.value.ZonalID
         }];
        }
     
        //  console.log(data,"else save_data");
         this.CeoService.Save_brte_API({"records":data}, true).subscribe((res) => {
          // console.log(res,"res");
          if(res != 0){
            this.alertService.success("Saved Successfully");
            this.submitted= false;
            this.brte_mapping.reset();
            this.zone_field=false;
            this.block_field=false;
            this.tab_index({originalEvent: MouseEvent, index: 2});
            this.page_st_3_1 = false;
            this.Selected_Block_zonal(this.current_block_id, this.current_block);
          }    
            else {
              this.alertService.error(res.msg);
          }
        })
      }
    }
    else {
      for (const key of Object.keys(this.brte_mapping.controls)) {
        if (this.brte_mapping.controls[key].invalid) {
           const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          console.log('invalid keys',key);
          invalidControl.focus();
           break;
        }
      }
    this.alertService.error("Please Fill all the Required Fields");
    }
  }
  cancel_assign_brte(){
    this.page_st_3_1 = false;
    this.type_bbrte = '';
    debugger;
    this.Selected_Block_zonal(this.current_block_id, this.current_block);
    this.alertService.warning("Operation Cancel By User");
  }

  goBackBlock(){
    debugger;
    this.Selected_Block_zonal(this.current_block_id, this.current_block);
  }

  ManageSubSchools(udise_code, school_id, school_name){
    this.selectedSchoolNameList =[];
    this.selected_sch__value =[];
    this.Manage_udise = {value: udise_code+"-"+school_id};
    this.ManageSchoolName= udise_code+"-"+school_id;
    // var SelectZonalSchool =  this.Manage_udise ;
    // this.Manage_sch_id = SelectZonalSchool;
    // console.log(this.Manage_udise,"Manage_udise");
    // console.log(school_id,"school_name");
    this.page_1_2=false;
    this.page_1=false;
    this.page_2=true;
    this.tab_index({originalEvent: MouseEvent, index: 1});
    // this.brte_mapping.patchValue(this.Manage_sch_id);
    this.brte_mapping.controls['SchoolType'].setValue('');
    this.brte_mapping.controls['SchoolType'].updateValueAndValidity();
    this.brte_mapping.controls['SelectZonalSchool'].setValue(this.ManageSchoolName);
    this.brte_mapping.controls['SelectZonalSchool'].updateValueAndValidity();
    debugger;
    this.Selected_school_drop(this.Manage_udise);
  }
  
  ManageBlockBrte(){
    this.page_1_2= false;
    this.page_1= false;
    this.page_2= true;
    this.index = 2 ;
    this.page_st_1= false;
    this.page_st_3= true;
    this.page_st_3_1 = false;
    this.brte_mapping.controls['brt_type'].setValue(2);
    this.brte_mapping.controls['brt_type'].updateValueAndValidity(); 
    debugger;
    this.type_Selected(2);
   }
   //excel
   getExcel() {
     debugger;
     var school_name : any;
    this.exportExcelData = [];
    let School_name : any[]=[];

    return this.zonal_sub_list.map(l => {
      if(l.zonal_sub_school.length > 0){
//debugger;
        this.zonal_sub_lists = this.zonal_sub_list.map(l => { return { 
        zonal_sub_school : l.zonal_sub_school}; });
        var sub_school_lists = this.zonal_sub_lists[0].zonal_sub_school;
        this.sch_lists = sub_school_lists.map(x => x.subschool_name)
        var school_lists = this.sch_lists;
        var sub_schl_name = school_lists.join(); 
      return {
        'School Name': l.school_name,
        'Brte Name': l.brte_name,
        'Annexed Schools': l.TotalSubSchool,
        'Sub-School' : sub_schl_name
      }
    }
    else {
      return {
        'School Name': l.school_name,
        'Brte Name': l.brte_name,
        'Annexed Schools': l.TotalSubSchool,
        'Sub-School' : 'null'
      }
    }
    })
  }
  exportExcel() {
    debugger;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getExcel());
      const workbook = { Sheets: { 'School Mapping': worksheet }, SheetNames: ['School Mapping'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "School Mapping");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }



}
