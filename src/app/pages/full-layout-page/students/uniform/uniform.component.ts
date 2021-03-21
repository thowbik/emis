import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder,FormGroup,Validators,FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

  /** Imported - Schemes Service  */
  import { UserSessionService } from 'src/services/usersession.service';
  import { StudentService } from '../student.service';
  import { AlertService } from 'src/services/alert.service';
  
  /** Interface */
  import { uniformList,uniformResponse,saveAndUpdateSchemesDtl,schemeSubCategoryList,schemeSubCategoryResponse} from '../../../../../models/schemes.model';

  
  
/** TO Gathering Uniform both Indent And Distribution Details In Class Wise  
 *  Last Modified Date : 04/12/2019 (venba/ps)
 * */

@Component({
  selector: 'app-uniform',
  templateUrl: './uniform.component.html',
  styleUrls: ['./uniform.component.css']
})
export class UniformComponent implements OnInit,OnDestroy {
    /** Declarations */
    public uniformListArr: any = []; 
    public subcatgoryListArr:  schemeSubCategoryList[] = []; 
    public selectedList:Array<Object>  = [];
    public uniformForm: FormGroup;
    public filterForm: FormGroup;
    public tableTitle : String;
    public showPickers : boolean = false;

    public classesInRoman = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII',"LKG","UKG","PRE KG"];  
    
    classList: Array<{'label':string, 'value':string}> = [ {label:'Select Class', value:''},];
    sectionList: Array<{'label':string, 'value':string}> = [{label:'Select Selction', value:''},];
    exportColumns: { title: any; dataKey: any; }[];

    pipe = new DatePipe('en-US');
    tempArrForClassAndSection: any;

    schoolId: number;
    lowClassId: string;
    schoolName:String;
    exportExcelData : any[]=[];
    
    private finalSaveArr : Array<Object>  = [];
    private finalUpdateArr : Array<Object>  = [];

    /** Datatable Column Field And Header */
    public cols: Array<{'field':string,'header':string,'width':string}> = [
                       { field:'unique_id_no',header:'EMIS ID',width: '13em'},
                       { field: 'name', header: 'Student Name' ,width: '15em'},
                       { field: 'class_studying_id', header: 'Class - Sec' ,width: '10em'},
                       { field: 'set1_category', header: 'Set 1 Size' ,width: '10em'},
                       { field: 'set2_category', header: 'Set 2 Size' ,width: '10em'},
                       { field: 'set3_category', header: 'Set 3 Size' ,width: '10em'},
                       { field: 'set4_category', header: 'Set 4 Size' ,width: '10em'},
                       { field: 'indent', header: ' Indent Date' ,width: '10em'}];

    /** Array List For Type Dropdown */
    typeList: Array<{'label':string, 'value':string}> = [ 
                    { label:'Select Type', value:''},
                    { label:'Indent', value:'Indent'},
                    // { label:'Distribution', value:'Distribution'}
                  ];
  schemesListArr: any;
  
    constructor(public fb:FormBuilder,
               private studentService:StudentService,
               private userSessionService: UserSessionService,
               private alertService:AlertService,
               private router: Router ) {
  
                    this.filterForm = this.fb.group({
                      type :  ['', Validators.compose([Validators.required])],
                      class_id :  ['', Validators.compose([Validators.required])],
                      section :  ['', Validators.compose([Validators.required])], 
                    });

                    this.uniformForm = this.fb.group({
                       uniformDetails: this.fb.array([])
                    });
                   
    }

    
    

    ngOnInit() {
      console.clear();
      this.schoolId = this.userSessionService.schoolId();
      this.schoolName = this.userSessionService.schoolName();
      this.exportColumns = this.cols.map(col => ({title: col['header'], dataKey: col['field']}));
      this.studentService.getSchemesListWithApplicableClasses(this.schoolId,true).subscribe(
        scheme=>{ 
                  this.schemesListArr = scheme['result'];
                  let value = scheme['result'].filter(item => item.id === '1');                 
                  this.lowClassId = value[0]['appli_lowclass'];
                     for(let i=+value[0]['appli_lowclass'];i<=+value[0]['appli_highclass'];i++){
                         this.classList.push({ label: this.classesInRoman[i], value:i.toString()});
                     }
                }
      );

      this.studentService.getSchoolWiseClassandSection(this.schoolId,true).subscribe(
        list=>{
          console.log(list['result']);
          this.tempArrForClassAndSection = list['result'];
         }
      );
      this.studentService.getSchemesSubCategoryList(1,true).subscribe(list=> { this.subcatgoryListArr = list['result'].map(l => { return { label:l.scheme_category, value:l.id }; });
      });
      setTimeout(()=>{    //<<<---    using ()=> syntax
        this.tableTitle = 'Indent ( '+this.classesInRoman[this.lowClassId] +' Standard - ALL Section )';
        this.toGetUniformDetails({"class_id":this.lowClassId,"section":"0","school_id":this.schoolId});
      }, 3000);
      
    }

    toGetUniformDetails(Arr){
      this.studentService.uniformList(Arr).subscribe(list=>{
        this.uniformListArr = list['result'];                 
      });
    }

    searchableSubmit(value) {
      if(value['type'] == 'Indent'){
        this.showPickers = false;
        let inx1 : number = this.cols.findIndex(item => item.field === 'set1_distribution_date')
        inx1 != -1 ? this.cols.splice(inx1, 1) : '';
        let inx2 : number = this.cols.findIndex(item => item.field === 'set2_distribution_date')
        inx2 != -1 ? this.cols.splice(inx2, 1) : '';
        let inx3 : number = this.cols.findIndex(item => item.field === 'set3_distribution_date')
        inx3 != -1 ? this.cols.splice(inx3, 1) : '';
        let inx4 : number = this.cols.findIndex(item => item.field === 'set4_distribution_date')
        inx4 != -1 ? this.cols.splice(inx4, 1) : '';
      }
      else if(value['type'] == 'Distribution'){
        this.showPickers = true;
        this.cols.push({ field: 'set1_distribution_date', header: 'Set 1 Distributed on' ,width: ''},
                       { field: 'set2_distribution_date', header: 'Set 2 Distributed on' ,width: ''},
                       { field: 'set3_distribution_date', header: 'Set 3 Distributed on' ,width: ''},
                       { field: 'set4_distribution_date', header: 'Set 4 Distributed on' ,width: ''},)
      }
      let arr = value; 
      
      arr['school_id'] =this.schoolId ;
      this.tableTitle = (arr['section'] == 0) ? arr['type'] + ' ( '+ this.classesInRoman[arr['class_id']] +' Standard - ALL Section )' : arr['type'] +' ( '+ this.classesInRoman[arr['class_id']] +' Standard - ' + arr['section'] +' Section )' ;
      delete arr['type'];
      this.uniformListArr = [];
      this.toGetUniformDetails(arr);
    }

  
    /** Datatable Save */
    onSubmit(Arr,arr) : any{
            // console.log(arr);
            // return true;
            // let type : any = this.filterForm.value;
            // console.log(type);
            // return true;
      if(Arr.length>0){
        console.info('Save the Details');
        
        Arr.forEach((val, inx) => {
          if(val['uniform_primaryid'] == null){
                      this.finalSaveArr.push({
                              "set1_distribution_date":this.pipe.transform(val['set1_distribution_date'],'yyyy/MM/dd'), 
                              "set2_distribution_date":this.pipe.transform(val['set2_distribution_date'],'yyyy/MM/dd'), 
                              "set3_distribution_date":this.pipe.transform(val['set3_distribution_date'],'yyyy/MM/dd'), 
                              "set4_distribution_date":this.pipe.transform(val['set4_distribution_date'],'yyyy/MM/dd'), 
                              "set1_category":val['set1_category'], 
                              "set2_category":val['set2_category'], 
                              "set3_category":val['set3_category'], 
                              "set4_category":val['set4_category'], 
                              "school_id":this.schoolId, 
                              "student_id":val['student_id'], 
                              "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                              "class":val['class_studying_id'],
                              "section" :val['class_section'],
                              "finalsub":1});
          }
          if(val['uniform_primaryid'] != null){
                        this.finalUpdateArr.push({
                          
                                  "id":val['uniform_primaryid'],
                                  "school_id":this.schoolId, 
                                  "student_id":val['student_id'], 
                                  "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'), 
                                  "class":val['class_studying_id'],
                                  "section" :val['class_section'],
                                  "set1_distribution_date":this.pipe.transform(val['set1_distribution_date'],'yyyy/MM/dd'), 
                                  "set2_distribution_date":this.pipe.transform(val['set2_distribution_date'],'yyyy/MM/dd'), 
                                  "set3_distribution_date":this.pipe.transform(val['set3_distribution_date'],'yyyy/MM/dd'), 
                                  "set4_distribution_date":this.pipe.transform(val['set4_distribution_date'],'yyyy/MM/dd'), 
                                  "set1_category":val['set1_category'], 
                                  "set2_category":val['set2_category'], 
                                  "set3_category":val['set3_category'], 
                                  "set4_category":val['set4_category'], 
                                  "finalsub":2 });
          }
        });
        
        
        if(this.finalSaveArr.length>0){   
          this.studentService.saveAndUpdateSchemesdetails('/api/saveUniform',{"records": {"data":this.finalSaveArr,"tname":"schoolnew_schemes"}})
              .subscribe(
                         result=>{console.info(result['message']);this.alertService.success(result['message']);
              }); 
        }
        if(this.finalUpdateArr.length>0){ 
          this.studentService.saveAndUpdateSchemesdetails('/api/updateUniform',{"records": {"data":this.finalUpdateArr,"tname":"schoolnew_schemes"}}).subscribe(
            result=>{console.info(result['message']);this.alertService.success(result['message']);}); 
        }
        this.finalSaveArr = [];
        this.finalUpdateArr = [];
        this.redirectTo(this.router.url);
        // window.location.reload();
      }
      else{
        console.info('Nothing To Save');
        this.alertService.success('Checkbox are Not Select Please Check alteast One Checkbox');
      }
    }

    // getSectionForRevalentClass(val){
    //   // console.log(val);
    //   this.sectionList = []
    //   this.sectionList.push({label:'Select Selction', value:''},{label:'ALL', value:'0'});
    //   this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
    //                                 .map(item => { return { value: item['revalent_section'], label:item['revalent_section'] }})
    //                                 .forEach(item => this.sectionList.push(item));       
    // }

    getSectionForRevalentClass(val){
        if(val != ''){
        
          let arr= [];
          arr.push({label:'Select Selction', value:''},{label:'ALL', value:'0'});
          this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
                                     .map(item => { return item['revalent_section'].split(",").map(String)})[0]
                                     .forEach(function(list,inx){ arr[inx+2] = {label:list, value:list}; });       
          this.sectionList = arr; 
        }
        // else{
        //   alert('Class is Empty');
        // }
    }


    redirectTo(uri) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
    }

    // exportPdf() {
    //   debugger;
    //   import("jspdf").then(jsPDF => {
    //       import("jspdf-autotable").then(x => {
    //           const doc = new jsPDF.default(0,0);
    //           doc.autoTable(this.exportColumns, this.uniformListArr);
    //           // doc.text(20, 20, 'Hello world!');
    //           // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    //           doc.save(this.schoolName+' / Uniform Schemes '+this.tableTitle+'.pdf');
    //       })
    //   })
    // }
//excel

getuniformexcel()
{
  debugger
  this.exportExcelData = [];
  this.uniformListArr.map(item => {
    return {
   'EMIS ID' : item.unique_id_no ,
   'Student Name ' : item.name ,
   'Class - Sec'  : item.class_studying_id ,
   'Set 1 Size' : item.set1_category ,
   'Set 2 Size' : item.set2_category ,
   ' Set 3 Size': item.set3_category ,
   ' Set 4 Size' : item.set4_category ,
   'Indent Date': item.indent ,
    }
}).forEach(item => this.exportExcelData.push(item));
let students = [];
for(let stud of this.exportExcelData) {
    students.push(stud);
}
return students;
}  

exportExcel() {
  debugger
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getuniformexcel());
      const workbook = { Sheets: { 'all uniform list' : worksheet }, SheetNames: ['all uniform list'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer,' ( Uniform List ) ');
  })
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

    ngOnDestroy() : void{
      // this.studentService.unsubscribe();
    }

}
