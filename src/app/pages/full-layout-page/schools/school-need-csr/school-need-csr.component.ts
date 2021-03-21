import { Component, OnInit } from '@angular/core';
import { schoolsService } from '../schools.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavigationService } from 'src/services/navigation.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { DatePipe } from '@angular/common';

import { debug } from 'util';
@Component({
  selector: 'app-school-need-csr',
  templateUrl: './school-need-csr.component.html',
  styleUrls: ['./school-need-csr.component.css']
})
export class SchoolNeedCsrComponent implements OnInit {
  sampleDataHeader: Array<Object> = [];
  Array_send: Array<Object> = [];
  sampleSelectedColumn: Array<Object> = [];
  newclassList: boolean;
  displayDialog: boolean;
  req_displayDialog: boolean;
  dialogTitle: string;
  req_dialogTitle: string;
  getcsr: any;
  singleClass = {};
  material_master:any= [];
  list: any;
  selected: any;
  allMaterial: any;
  mat_id: [];
  school_id: any;
  CsrList: any;
  data: any;
  Flag: any = false;
  Del_id: any;
  arg: any;
  limitChar: any;
  req_id: any;
  values: any;
  name: any;
  event = [];
  events_num = [];
  urls = [];
  files = [];
  file_convert: any;
  save_req_det: any;
  submitted = false;
  req_details_data: any=[];
  public ClientForm: FormGroup;
  public csrFormReq: FormGroup;
  images :any[];
  pipe = new DatePipe('en-US');
  filename1: any;
  filename2: any;
  filename3: any;
  data_value_post: any;
  update_status: any;
  req_updates_id: any;
  exportExcelData : any[]=[];
  public formErrors = {
    item: '',
    cat_id: '',
    sub_cat_id: '',
    qty:'',
    SubCateogry: '',
    Cateogry: ''
 
  };

  readmode: boolean;
  constructor(private alertService: AlertService,public form: FormBuilder,private schoolsService: schoolsService, private userSessionService: UserSessionService, private navigationService: NavigationService) { }

  ngOnInit() {
    this.sampleData();
   
    this.getSchoolNeedsDetails();
    this.buildForm();
    this.buildReqForm();
    this.school_id = this.userSessionService.schoolId();
    console.log(this.school_id);
    this.getAllListCsr();
    this.numberOnly(this.events_num);
    
  
  
  }

  sampleData() {
    this.sampleDataHeader = [
      { field: 'material_name', header: 'Item' },
      { field: 'DEscription', header: 'Description' },
      { field: 'qty', header: 'Qty', width: '8%'},
      { field: 'created_on', header: 'Updated On', width: '12%'},

    ];

    this.sampleSelectedColumn = this.sampleDataHeader;

   
  }
  addClassSection(arg) {
    console.log(arg);
    if (arg == 1)
    {
      this.Flag = 1;
    }
   
    this.ClientForm.reset();
    this.newclassList = true;
    this.singleClass = {};
    this.displayDialog = true;
    this.dialogTitle = "CSR Need Details";
    this.readmode = false;
    this.limitChar = "4";
    
  }
  getEditCsr(data, arg) {
    console.log(arg);
    if (arg == 2)
    {
      this.Flag = 2; 
    }
    this.newclassList = true;
    this.singleClass = {};
    this.displayDialog = true;
    this.dialogTitle = "CSR Need Details";
    this.readmode = false;
    this.limitChar = "4";
    debugger;
    console.log(data[0]);
    const Records = data[0];
   
    this.ClientForm.controls['Category'].setValue(data[0].cat_name);
    this.ClientForm.controls['SubCategory'].setValue(data[0].sub_cat_name);
    this.ClientForm.controls['cat_id'].setValue(data[0].cat_id);
    this.ClientForm.controls['sub_cat_id'].setValue(data[0].sub_cat_id);
    this.ClientForm.controls['qty'].setValue(data[0].qty);
    this.ClientForm.controls['item'].setValue(data[0].mat_id);



  }
 
  
  valueChange(event,array,selectedValue) {
    
    console.log(selectedValue); 

    if (selectedValue == 44 || selectedValue == 45)
    {
      this.limitChar = "4";
      console.log(this.limitChar);
    }
    else
    {
      this.limitChar = "2";
      console.log(this.limitChar);
    }
   console.log(this.material_master);
    const getData = this.material_master.find(x => x.mat_id == selectedValue);
    this.ClientForm.controls['cat_id'].setValue(getData.cat_id);
    this.ClientForm.controls['sub_cat_id'].setValue(getData.sub_cat_id);
    this.ClientForm.controls['Category'].setValue(getData.cat_name);
    this.ClientForm.controls['SubCategory'].setValue(getData.sub_cat_name);
    
    
    //this.selected = event.target.value;
  }

  



  

  public buildForm() {
    this.ClientForm = this.form.group({
      item: ['', Validators.required],
      cat_id: ['', Validators.required],
      sub_cat_id: ['', Validators.required],
      Category: ['', Validators.required],
      SubCategory: ['', Validators.required],
      qty: ['', Validators.required],


    });
   

    
  }
  public buildReqForm() {
    this.csrFormReq = this.form.group({
      UpdateStatus: ['', Validators.required, Validators.maxLength(10)],
      'file': ['', Validators.required],
      'fileSource': [''],

    });
  }

  
  get f() { return this.ClientForm.controls; }

  OnSave() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ClientForm.invalid) {
     console.log(this.ClientForm);
      return;
    }

    // display form values on success
    
    
    // display form values on success
    
    this.Array_send = [
      { mat_id: this.ClientForm.value.item, cat_id: this.ClientForm.value.cat_id, sub_cat_id: this.ClientForm.value.sub_cat_id, qty: this.ClientForm.value.qty, school_id: this.school_id},
    
    ];
    
   
    this.schoolsService.SaveCsrNeedDetails(this.Array_send[0]).subscribe((result) => {
      if (result) {
        this.alertService.success(result.message);
        this.getAllListCsr();
        this.getAllListCsr();
        this.displayDialog = false;
      }
      else {
        this.alertService.error(result.message);
      }
    });
    
   
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  OnUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ClientForm.invalid) {
     console.log(this.ClientForm);
      return;
    }
   
    this.Array_send = [
      { id: this.ClientForm.value.item,mat_id: this.ClientForm.value.item, cat_id: this.ClientForm.value.cat_id, sub_cat_id: this.ClientForm.value.sub_cat_id, qty: this.ClientForm.value.qty, school_id: this.school_id },

    ];

   
    

    console.log(this.Array_send[0]);

    this.schoolsService.UpdatecsrNeedDetails(this.Array_send[0]).subscribe((result) => {
      if (result) {
        this.alertService.success(result.message);
      
        this.getAllListCsr();
        this.getAllListCsr();
        this.displayDialog = false;
      }
      else {
        this.alertService.error(result.message);
      }
    });


  }
  getSchoolNeedsDetails()
  {
    this.schoolsService.getCsrNeeds().subscribe((result) => {
      if (result) {

      
        this.material_master = result.result.school_needs_req_details.material_master;

       
         console.log(this.material_master); 
      
       
      }
    });
  } 

  getAllListCsr() {
    this.schoolsService.getCsrneedsList().subscribe(result => {
      if (result.dataStatus) {
      
        this.CsrList = result.material_details.csr_material;

        console.log("YES");
        console.log(this.CsrList);

      }
      else {
        console.warn(result);
      }
    },err=>console.info(err));
  }

  getAllReqDetList(rowData) {

    this.newclassList = true;
    this.req_displayDialog = true;
    this.req_dialogTitle = "CSR Requirement Details";
    this.readmode = false;
    this.limitChar = "4";
    this.req_id = rowData[0].id;
    this.update_status = rowData[0].update_status;

   
    this.schoolsService.getReqDetUpdates(this.req_id,this.school_id).subscribe(result => {
      if (result.dataStatus) {

        this.req_details_data = result.result.school_req_details;
        console.log(this.req_details_data);
      }
      else {
        console.warn(result);
      }
    }, err => console.info(err));

    
  }


  onSelectFile(fileInput) {
   /* if (fileInput.target.files && fileInput.target.files[0]) {
      var filesAmount = fileInput.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event);
          this.urls.push(event.target.result);
          console.log(this.urls);
        
        }

        reader.readAsDataURL(fileInput.target.files[i]);
      }
    } */
   
    if (fileInput.target.files.length > 3)
    {
      this.alertService.error("Allow Only 3 Images To Upload");
      fileInput.srcElement.value = null;

      }
    
    if (fileInput.target.files.length > 0) {
      this.event = fileInput.target.files.length;
      this.files = fileInput.target.files;
     
     
      for (var i = 0; i < fileInput.target.files.length; i++) {
        this.name = fileInput.target.files[i];
        const file = this.name;
      
        this.ClientForm.patchValue({
          fileSource: file,
        
        });
        //console.log(file);
      }

     

    }
    console.log(fileInput.target.files);
    if (fileInput.target.files[0].size > 1048576 || fileInput.target.files[0].size > 1048576 || fileInput.target.files[0].size > 1048576) {
      this.alertService.error("Each File Not Exist 1 MB Size!!");
      this.csrFormReq.reset();
    }
  
  }


  


  

  
    // stop here if form is invalid
    



  get eval() { return this.csrFormReq.controls; }

  OnsaveReq()
  {
   
    this.submitted = true;
    if (this.csrFormReq.invalid) {
      console.log(this.csrFormReq);
      return;
    }
   
    
   
   
    /*this.schoolsService.SaveCsrReq(this.urls).subscribe((result) => {
      


    }); */

    console.log("WELOCMES");
    this.values = this.event;
    const formData = new FormData();
    console.log(this.values);


    console.log("END");
    for (var i = 0; i < this.values; i++) {
      console.log(this.event);
      this.file_convert = this.files;
      formData.append('file[]', this.file_convert[i]);
     
      

    }
    

    
    
    console.log(this.data_value_post);
    console.log("BEFORE RESULT");
    formData.append('Description', JSON.stringify({ 'fk_req_id': this.req_id, 'created_on': this.school_id, 'update_status': this.csrFormReq.value.UpdateStatus }));
    
    this.schoolsService.SaveCsrReq(formData).subscribe((result) => {
      if (result) {

        console.log(result);
        console.log("HI");
        this.alertService.success("Data Saved SuccessFully!!");
        this.getAllListCsr();
        this.req_displayDialog = false;
        this.csrFormReq.reset();

        // this.nonfuncFacilitiesList = result.result.facilities;
      }
     

    });
  }

  DelReqDet(req_upd_id) {

    this.schoolsService.DeleteCsrUpdateDetails(req_upd_id).subscribe((result) => {
      console.log(result);
      if (result.dataStatus == true) {


        this.alertService.error(result.message);
        this.getAllListCsr();
        this.req_displayDialog = false;
      }
      else if (result.dataStatus == false) {

        this.alertService.error(result.message);
        this.getAllListCsr();
        this.req_displayDialog = false;
      }

    });

    // file EVENTS

  }
   
  
  onRowCsrdel(id)
  {
   
    this.Del_id = id.id;
    console.log(this.Del_id);
    this.schoolsService.DeleteCsrneed(this.Del_id).subscribe((result) => {
      console.log(result);
      if (result.dataStatus == true) {
       
        
        this.alertService.info(result.message);
        this.getAllListCsr();
        this.displayDialog = false;
      }
      else if(result.dataStatus == false)
      {
        
        this.alertService.error(result.message);
        this.getAllListCsr();
        this.displayDialog = false;
      }
    
    });

   // file EVENTS
    
  }

  //excel

  getschlcsrDetails() {
    
    this.exportExcelData = [];
    this.CsrList.map(i => {
      return {
              'Item' : i.material_name,
              'Description' : i. DEscription,
              'Quantity' : i.qty,
              'Updated On.' : i.created_on ,           
            }
  }).forEach(item => this.exportExcelData.push(item));
    let schlCsr = [];
    for(let SchlCsr of this.exportExcelData) {
      schlCsr.push(SchlCsr);
    }
    return schlCsr;
  }  

  exportExcel(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getschlcsrDetails());
        const workbook = { Sheets: { 'SchlCsr List': worksheet }, SheetNames: ['SchlCsr List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "SchlCsr List");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

 

}
