
import { Component, OnInit, OnDestroy} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
/** Imported - Schemes Service  */
import { UserSessionService } from 'src/services/usersession.service';
import { StudentService } from '../../students/student.service';
import { SortEvent } from 'primeng/api';

/** Interface */
import { schemeList,noonmealList,noonmealResponse,saveAndUpdateSchemesDtl,medinstr } from '../../../../../models/schemes.model';
import { AlertService } from 'src/services/alert.service';
import { AlertComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-bicycle-issue',
  templateUrl: './bicycle-issue.component.html',
  styleUrls: ['./bicycle-issue.component.css']
})
export class BicycleIssueComponent implements OnInit {

  public schemesListArr: schemeList[] = []; 
  public noonmealListArr: noonmealList[] = []; 
  public selectedList: Array<Object>  = [];
  public ArrayPush: Array<Object>  = [];
  selectedColumns : Array<Object> = [];
  public submitted : boolean = true;
  parentsCheckbox : boolean = false;
  public pageTitle : String;
  public filterForm: FormGroup;    
  
  private finalSaveArr : Array<Object>  = [];
  private finalUpdateArr : Array<Object>  = [];

  public classesInRoman = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII',"LKG","UKG","PRE KG"];  
  
  classList: Array<{'label':string, 'value':string}> = [ {label:'Select Class', value:''},];
  sectionList: Array<{'label':string, 'value':string}> = [{label:'Select Selction', value:''},];

  pipe = new DatePipe('en-US');
  tempArrForClassAndSection: any;

  schoolId: number;
  DataClicked:any;
  dataSaveCycle:any;
  data:any;
  
  lowClassId: string;
  schoolName:String;
  
  /** Datatable Column Field And Header */
  dataHeader: Array<{'field':string,'header':string,'widthstyle':string}> = [ { field:'EMISID',header:'EMIS ID' ,widthstyle: ''},
                                                                   { field: 'StudNam', header: 'Student Name' ,widthstyle: ''},
                                                                   { field: 'Class', header: 'Class',widthstyle: '8em'},
                                                                   { field: 'Section', header: 'Section',widthstyle: '8em'},
                                                                   { field: 'issued', header: 'issued' ,widthstyle: '15em'},
                                                                   
                                                                 ];
  exportColumns: { title: any; dataKey: any; }[];
  test: any;
  value: any;
  status: any;
  enable: string;

  

  constructor(public fb:FormBuilder,
              private studentService:StudentService,
              private userSessionService: UserSessionService,
              private alertService:AlertService,
              private route: ActivatedRoute,
              private router: Router ) {

                this.schoolId = this.userSessionService.schoolId();
                this.schoolName = this.userSessionService.schoolName();
  }
  
  id:any;
  id2:any;
  
  ngOnInit() {
    
    console.clear();
  //   this.route.params.subscribe(params => {
  //     this.id = +params['class']; // (+) converts string 'id' to a number
  //     this.id2 = +params['section']; // (+) converts string 'id' to a number

  //     // In a real app: dispatch action to load the details here.
  //  });
  //  console.log(this.id);
  //  console.log(this.id2);
  // this.selectedColumns = this.dataHeader;
    
    this.toGetClassDetails(this.schoolId);  
    this.toGetSectionDetails(this.schoolId);
    this.initfilterForm();  

        //<<<---    using ()=> syntax
    //  this.fetchingDetails(this.lowClassId,"0");
      this.toGetBicylceDetails(this.schoolId)
      
   

    this.exportColumns = this.dataHeader.map(col => ({title: col['header'], dataKey: col['field']}));
    
  }

  //
  initfilterForm(){
      this.filterForm = this.fb.group({
        class_id :  ['', Validators.compose([Validators.required])],
        section :  ['', Validators.compose([Validators.required])], 
        school_id : [this.schoolId]
      });
  }
  toGetClassDetails(school_id){
    this.studentService.getSchemesListWithApplicableClasses(school_id,true).subscribe(
      scheme=>{ 
                this.schemesListArr = scheme['result'];
                let value = scheme['result'].filter(item => item.id === '15');                 
                this.lowClassId = value[0]['appli_lowclass'];
                   for(let i=+value[0]['appli_lowclass'];i<=+value[0]['appli_highclass'];i++){
                       this.classList.push({ label: this.classesInRoman[i], value:i.toString()});
                   }
                // this.schemesListArr.map(x=>x['route'] = (x['id'] == "15")?"/schemes/Noonmeal":"/schemes/"+x['scheme_name']);            
              }
    );

  }

  toGetSectionDetails(school_id){
    this.studentService.getSchoolWiseClassandSection(school_id,true).subscribe(
      list=>{
        console.log(list['result']);
        this.tempArrForClassAndSection = list['result'];
       }
    );
  }

    // toGetNoonmealDetails(Arr){
    //   this.studentService.StudentBicycleList(Arr).subscribe(
    //     list=>{
    //       this.noonmealListArr = list['result']; 
          
    //       this.noonmealListArr.map(x=>x['status'] = (x['issued'] == '1') ? true : false );
    //       this.parentsCheckbox = this.isAllSelected();
    //     }
    //   );
    // }
    toGetBicylceDetails(Arr){
      this.studentService.StudentBicycleList(Arr).subscribe(
        list=>{
          this.noonmealListArr = list['result']; 
          
          this.noonmealListArr.map(x=>x['status'] = (x['issued'] == '1') ? true : false );
          //alert("1");
          this.parentsCheckbox = this.isAllSelected();
        }
      );
    }

    // getSectionForRevalentClass(val){
    //   // console.log(val);
    //   this.sectionList = []
    //   this.sectionList.push({label:'Select Selction', value:''},{label:'ALL', value:'0'});
    //   // this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
    //   //                               .map(item => { return { value: item['revalent_section'], label:item['revalent_section'] }})
    //   //                               .forEach(item => this.sectionList.push(item));       
    //   let str1 = this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
    //                                 .map(item => item['revalent_section'])[0];
    //                                 console.log(str1);
    //                                 // .forEach(item => this.sectionList.push(item));       
    //   Array.from(str1.replace (/,/g, ""))
    // }

    toGetSectionForRevalentClass(val){
      
      
      let arr= [];
      arr.push({label:'Select Selction', value:''},{label:'ALL', value:'0'});
       this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
                                     .map(item => { return item['revalent_section'].split(",").map(String)})[0]
                                     .forEach(function(list,inx){ arr[inx+2] = {label:list, value:list}; });       
                                     this.sectionList = arr;              
              
    }

    fetchingDetails(class_id,section){
      this.toGetSectionForRevalentClass(class_id);  
      this.filterForm.controls['class_id'].setValue(class_id);
      this.filterForm.controls['section'].setValue(section);
    //  this.toGetNoonmealDetails(this.filterForm.value);
      this.pageTitle = (section === "0" ) ? '( '+ this.classesInRoman[class_id] +' Standard - ALL Section )' : '( '+ this.classesInRoman[class_id] +' Standard - ' + section +' Section )' ;
      
    }
 



  /** When Submit The Filter Formits get the Data For Datatable */
  searchableSubmit(value) {
   
    this.pageTitle = (value['section'] == 0) ? '( '+ this.classesInRoman[value['class_id']] +' Standard - ALL Section )' : '( '+ this.classesInRoman[value['class_id']] +' Standard - ' + value['section'] +' Section )' ;
    this.submitted = true;
    this.noonmealListArr = [];
  //  this.toGetNoonmealDetails(value);
  }
 

  issuedate(e,data)
  {
    console.log(e,"event");
    console.log(data,"data");
  }
  /** Datatable Save */
  onSubmit(){
console.log(this.ArrayPush);


    this.ArrayPush.forEach((val, inx) => {
     console.log("value",val['IndxID']);
     console.log("issue_date",val['issue_date']);
   
     if(val['IndxID'] != null)
     {
       
      this.finalSaveArr.push({
        "school_id":this.schoolId, 
        "student_id":val['StudID'], 
        "id":val['IndxID'],
        "update_ts":this.pipe.transform(new Date(),'yyyy/MM/dd hh:mm:ss'), 
        "issued": val['issued']
      
      });
     }
     else
     {
      this.finalSaveArr.push({
        "school_id":this.schoolId, 
        "student_id":val['StudID'], 
        "update_ts":this.pipe.transform(new Date(),'yyyy/MM/dd hh:mm:ss'), 
        "creation_ts":this.pipe.transform(new Date(),'yyyy/MM/dd hh:mm:ss'),
        "issued": val['issued']
      });
     }

});
if(this.finalSaveArr)
{ 
  console.log(this.finalSaveArr);
var records = {"records":this.finalSaveArr}

this.studentService.SaveupdateStdBicycle(records).subscribe(
result=>{
  if(result)
  {
    this.alertService.success(result['message']);
    this.ArrayPush=[]; 
    this.finalSaveArr=[]; 
    this.ArrayPush.length = 0;
    this.finalSaveArr.length = 0;
    this.toGetBicylceDetails(this.schoolId);
    //this.childToggle(this.status,this.data);

  }
  else{
    console.info(result['message']);
    this.alertService.error(result['message']);
  }
 // console.log("Valu",this.finalSaveArr);
  
});
}

    
   
    
    else{
      // console.info('Nothing To Save');
      this.alertService.error('Checkbox are Not Select Please Check alteast One Checkbox');
    }
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }
  exportExcel(data) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.schoolName+' / Noonmeal Schemes '+this.pageTitle);
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


  exportExcel1() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.exportColumns);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.schoolName+' / Noonmeal Schemes '+this.pageTitle);
    });
  }

  saveAsExcelFile1(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  exportPdf() {
    debugger;
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, this.noonmealListArr);
            // doc.text(20, 20, 'Hello world!');
            // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
            doc.save(this.schoolName+' / Noonmeal Schemes '+this.pageTitle+'.pdf');
        })
    })
  }

  ngOnDestroy() : void{
    // this.studentService.unsubscribe();
  }

  // parentToggle(e) {
   
  //   //alert(this.status);
  //    console.log('i am in par function', e);
  //   // console.log(this.noonmealListArr);
  //   this.noonmealListArr.forEach(row => row.status = e);
  //   this.noonmealListArr.forEach(row => row.is_opted = (row.status == true) ? '1' : '0');
  //   this.parentsCheckbox = this.isAllSelected();
  // }

  childToggle(e,data) {
    // alert(this.noonmealListArr.length);
    
    console.log(data,'---------');
// if(this.noonmealListArr.length >= 1){
// this.enable = '1';
// alert(this.enable);
// } else if (data.length == undefined){
//   this.enable = '2';
//   alert(this.enable);

// } else{
//   this.enable = '3';
//   alert(this.enable);

// }
    console.log('i am in child function', e);
    this.status = e;
    this.data=data;
    console.log(this.status,"STATIS");
   
 // this.dataSaveCycle = data;
    this.ArrayPush.push(data)  
   
 
    data.status = e;
    data.issued = (data.status == true) ? '1' : '0';
    this.parentsCheckbox = this.isAllSelected();
  }

  isAllSelected() {
      let numRows = this.noonmealListArr.length; 
      let is_opted_count=0; 
      let not_opted_count=0;
      
      this.noonmealListArr.forEach((item, index) => {
        if (item.status == true) is_opted_count++;
        else not_opted_count++;
      });

      console.info('opted count :',is_opted_count);
      console.info('not opted count :',not_opted_count);
      console.info('total count :', numRows);

      return is_opted_count === numRows ? true : false;
  }
  customSort(event: SortEvent) {
    debugger  
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
}
