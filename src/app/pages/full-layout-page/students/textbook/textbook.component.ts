import { Component, OnInit, OnDestroy} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
/** Imported - Schemes are  */
import { UserSessionService } from 'src/services/usersession.service';

/** Interface */
import { schemeList,medinstr} from '../../../../../models/schemes.model';
import { StudentService } from '../student.service';


/** TO Gathering Textbook Details In Class Wise  
*  Last Modified Date : 04/12/2019 (venba/ps)
* */
@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.css']
})
export class TextbookComponent implements OnInit {
    
    public priTxtbookListArr: Array<Object> = []; 
    public selectedList: Array<Object>  = [];
    public submitted : boolean = true;
    public tableTitle : String;
    public filterForm: FormGroup;
    private tempArrForClassAndSection : Array<Object> = [];
    private finalSaveArr : Array<Object>  = [];
    private finalUpdateArr : Array<Object>  = [];
    public allMedium: Array<object> = [];
    schoolId: number;
    acyear: string;
    public classesInRoman = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII',"LKG","UKG","PRE KG"];  

    pipe = new DatePipe('en-US');
    /** Datatable Column Field And Header */
    cols: Array<{'field':string,'header':string,'width':string,'shown':boolean,'temp_name':string}> = [{ field:'unique_id_no',header:'Unique ID' ,width: '',shown:true,temp_name:'unique_no'},
    { field: 'name', header: 'Student Name' ,width: '11em',shown:true,temp_name:'name'},
    { field: 'class_studying_id', header: 'Class-Sec',width: '8em',shown:true,temp_name:'class_studying'},
    { field: 'term1_language1_distribution_date', header: 'Language 1' ,width: '' ,shown:true,temp_name:'language1'},
    { field: 'term1_language2_distribution_date', header: 'Language 2' ,width: '',shown:true,temp_name:'language2'},
    { field: 'term1_mathematics_distribution_date', header: 'Subject 1' ,width: '',shown:true,temp_name:'subject1'},
    { field: 'term1_science_distribution_date', header: 'Subject 2' ,width: '',shown:true,temp_name:'subject2'},
    { field: 'term1_socialscience_distribution_date', header: 'Subject 3' ,width: '',shown:true,temp_name:'subject3'},
    { field: 'indent', header: 'Indent Date' ,width: '',shown:true,temp_name:'indent'}];
    /** Dropdown For Class */
    classList: Array<{'label':string, 'value':string}> = [ {label:'Select Class', value:''}];
    sectionList: Array<{'label':string, 'value':string}> = [ {label:'Select Section', value:''}];

    /** Dropdown For Type */
    mediumList: Array<{'label':any, 'value':any}> = [ {label:'Select Medium', value:''}];
                                                         
                                                         
    /** Dropdown For Section */
    termList: Array<{'label':string, 'value':string}> = [{label:'Select Term', value:''},
                                                            {label:'Term 1', value:'1'},
                                                            {label:'Term 2', value:'2'},
                                                            {label:'Term 3', value:'3'}
                                                           ];

    constructor(public fb:FormBuilder,
                private studentService:StudentService,
                private userSessionService: UserSessionService,
                private router: Router ) {
                  this.filterForm = this.fb.group({
                    class_id :  ['', Validators.compose([Validators.required])],
                    medium :  ['', Validators.compose([Validators.required])], 
                    term : ['', Validators.compose([Validators.required])], 
                  });
    }
    

    ngOnInit() {
      console.clear();
      let month = (new Date().getMonth() + 1);
      let year_range = (new Date()).getFullYear();

      this.acyear = (month >= 6) ? year_range + '-' + (year_range+1) : (year_range-1) + '-' + year_range;
      this.schoolId = this.userSessionService.schoolId();
      
      this.studentService.getSchoolWiseClassandSection(this.schoolId,true).subscribe(
        list=>{
          let result = list['result'].filter(d => Number(d['class_id']) <= 8);
          this.tempArrForClassAndSection = list['result'];
          result.map(item => { return { value: item.class_id, label:this.classesInRoman[item.class_id] }})
                        .forEach(item => this.classList.push(item));       
          list['medium'].map(item => { return { label: item.MEDINSTR_DESC, value:item.MEDINSTR_ID }})
                        .forEach(item => this.mediumList.push(item));       
         }
      );
      
      this.tableTitle = '( '+this.classesInRoman[1] +' Standard - ALL Section )';
      // this.toGetTextbookDetials({"class_id":12,"school_id":2112,"medium":16});

    }

    getSectionForRevalentClass(val){
      this.sectionList = []
      this.sectionList.push({label:'Select Selction', value:''},{label:'ALL', value:'0'});
      this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
                                    .map(item => { return { value: item['revalent_section'], label:item['revalent_section'] }})
                                    .forEach(item => this.sectionList.push(item));       
    }

    thelangname : any = '' 

    getBookID(val){
       let value = this.mediumList.filter(obj => obj.value === val).map(obj => obj.label);
       this.thelangname = value[0] == "English" ? "Tamil" : value[0] ;
      // console.log(this.mediumList.filter(data=>data['value'] === val ));
    }

    
    toGetTextbookDetials(Arr){
        this.studentService.primarySchoolStudList(Arr).subscribe(
          list=>{
            this.priTxtbookListArr = list['result']; 
          }
        );
    }

      
    assignTheDistributionDate(date,key_name){
      
        let data = this.priTxtbookListArr;
        // let term_no = this.filterForm.value["term"] == '' ? '1' : this.filterForm.value["term"];
        data.forEach(function (value) {
          value[key_name] = date;
        });
        // console.log(data);
      }
      
      languagebookid : any = '';
      englishbookid : any = '';
      mathsbookid: any = '';
      sciencebookid: any = '';
      socialbookid: any = '';
     
    /** When Submit The Filter Form its get the Data For Datatable */
    searchableSubmit(value) {
      let med_id = this.filterForm.value["medium"] == '' ? 16 : this.filterForm.value["medium"] ;
      let class_id = this.filterForm.value["class_id"] == '' ? 12 : this.filterForm.value["class_id"];
      let term_no = this.filterForm.value["term"] == '' ? '1' : this.filterForm.value["term"];
      this.cols = [];
      switch(+term_no){
      case 1:
        this.cols.push(
                  { field:'unique_id_no',header:'Unique ID' ,width: '',shown:true,temp_name:'unique_no'},
                  { field: 'name', header: 'Student Name' ,width: '11em',shown:true,temp_name:'name'},
                  { field: 'class_studying_id', header: 'Class and Section',width: '8em',shown:true,temp_name:'class_studying'},
                  { field: 'term1_language1_distribution_date', header: 'Tamil' ,width: '' ,shown:true,temp_name:'language1'},
                  { field: 'term1_language2_distribution_date', header: 'English' ,width: '',shown:true,temp_name:'language2'},
                  { field: 'term1_mathematics_distribution_date', header: 'Mathematics' ,width: '',shown:true,temp_name:'subject1'},
                  { field: 'term1_science_distribution_date', header: 'Science' ,width: '',shown:true,temp_name:'subject2'},
                  { field: 'term1_socialscience_distribution_date', header: 'Social' ,width: '',shown:true,temp_name:'subject3'},
                  { field: 'indent', header: 'Indent Date' ,width: '',shown:true,temp_name:'indent'});
        break;
      case 2:
        this.cols.push(
                  { field:'unique_id_no',header:'Unique ID' ,width: '',shown:true,temp_name:'unique_no'},
                  { field: 'name', header: 'Student Name' ,width: '11em',shown:true,temp_name:'name'},
                  { field: 'class_studying_id', header: 'Class and Section',width: '8em',shown:true,temp_name:'class_studying'},
                  { field: 'term2_language1_distribution_date', header: 'Tamil' ,width: '' ,shown:true,temp_name:'language1'},
                  { field: 'term2_language2_distribution_date', header: 'English' ,width: '',shown:true,temp_name:'language2'},
                  { field: 'term2_mathematics_distribution_date', header: 'Mathematics' ,width: '',shown:true,temp_name:'subject1'},
                  { field: 'term2_science_distribution_date', header: 'Science' ,width: '',shown:true,temp_name:'subject2'},
                  { field: 'term2_socialscience_distribution_date', header: 'Social' ,width: '',shown:true,temp_name:'subject3'},
                  { field: 'indent', header: 'Indent Date' ,width: '',shown:true,temp_name:'indent'});
        break;
        case 3:
        this.cols.push(
                  { field:'unique_id_no',header:'Unique ID' ,width: '',shown:true,temp_name:'unique_no'},
                  { field: 'name', header: 'Student Name' ,width: '11em',shown:true,temp_name:'name'},
                  { field: 'class_studying_id', header: 'Class and Section',width: '8em',shown:true,temp_name:'class_studying'},
                  { field: 'term3_language1_distribution_date', header: 'Tamil' ,width: '' ,shown:true,temp_name:'language1'},
                  { field: 'term3_language2_distribution_date', header: 'English' ,width: '',shown:true,temp_name:'language2'},
                  { field: 'term3_mathematics_distribution_date', header: 'Mathematics' ,width: '',shown:true,temp_name:'subject1'},
                  { field: 'term3_science_distribution_date', header: 'Science' ,width: '',shown:true,temp_name:'subject2'},
                  { field: 'term3_socialscience_distribution_date', header: 'Social' ,width: '',shown:true,temp_name:'subject3'},
                  { field: 'indent', header: 'Indent Date' ,width: '',shown:true,temp_name:'indent'});
        break;
      }
      

      
      this.studentService.textBookList(value).subscribe(
        res => {
              let length : number = res['result'].length;

              res['result'].forEach((val,inx) => {
                if(val.book_name == this.thelangname){this.languagebookid = val.book_id; this.cols[3].header = val.book_name; };
                if(val.book_name == 'English'){this.englishbookid = val.book_id } ;
                if(val.book_name == 'Mathematics'){this.mathsbookid =  val.book_id } ;
                if(class_id >= 3 && val.book_name == 'Science'){this.sciencebookid =  val.book_id } ;
                if(class_id <= 2 && val.book_name == 'Environmental Science'){this.sciencebookid =  val.book_id;this.cols[6].header = val.book_name; } ;
                if(length == 5 && val.book_name == 'Social Science'){this.socialbookid =  val.book_id } ;
                if(length == 4){ this.cols[7].header = '';this.cols[7].shown = false; }
              })
        }
      );
      
      // this.tableTitle['class'] = value['class_id'];
      // this.tableTitle['section'] = 'ALL';
      this.tableTitle = ' ( '+ this.classesInRoman[value['class_id']] +' Standard - ALL Section )' ;
      this.submitted = true;
      this.priTxtbookListArr = [];
      this.toGetTextbookDetials({'medium':value['medium'],'class_id':value['class_id'],'school_id':this.schoolId});
    }

    /** Datatable Save */
    onSubmit(Arr) : any{
      let term_no = this.filterForm.value["term"] == '' ? "1" : this.filterForm.value["term"];
      if(Arr.length>0){
        Arr.forEach((val,inx) => {
          
          if(val['txtbook_primaryid'] === null){
                      
                      switch(+term_no){
                        case 1:
                            this.finalSaveArr.push({
                              "school_id":this.schoolId, 
                              "student_id":val['student_id'], 
                              "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                              "medium":this.filterForm.value["medium"], 
                              "ac_year":this.acyear, 
                              "class":val['class_studying_id'],
                              "finalsub":1,
                              "term1_language1_distribution_date": (val['term1_language1_distribution_date'] === '' || val['term1_language1_distribution_date'] == '0000-00-00') ? null : this.pipe.transform(val['term1_language1_distribution_date'],'yyyy/MM/dd'),
                              "term1_language1_book_id": this.languagebookid,
                              "term1_language2_distribution_date": (val['term1_language2_distribution_date'] === '' || val['term1_language2_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term1_language2_distribution_date'],'yyyy/MM/dd'),
                              "term1_language2_book_id":this.englishbookid,
                              "term1_mathematics_distribution_date": (val['term1_mathematics_distribution_date'] === '' || val['term1_mathematics_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term1_mathematics_distribution_date'],'yyyy/MM/dd'),
                              "term1_mathematics_book_id":this.mathsbookid,
                              "term1_science_distribution_date": (val['term1_science_distribution_date'] === '' || val['term1_science_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term1_science_distribution_date'],'yyyy/MM/dd'),
                              "term1_science_book_id":this.sciencebookid,
                              "term1_socialscience_distribution_date": (val['term1_socialscience_distribution_date'] === '' || val['term1_socialscience_distribution_date'] === '0000-00-00' ) ? null : this.pipe.transform(val['term1_socialscience_distribution_date'],'yyyy/MM/dd'),
                              "term1_socialscience_book_id":this.socialbookid });
                            break;
                        case 2:
                            this.finalSaveArr.push({
                              "school_id":this.schoolId, 
                              "student_id":val['student_id'], 
                              "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                              "medium":this.filterForm.value["medium"], 
                              "ac_year":this.acyear, 
                              "class":val['class_studying_id'],
                              "finalsub":1,
                              "term2_language1_distribution_date": (val['term2_language1_distribution_date'] === '' || val['term2_language1_distribution_date'] == '0000-00-00' ) ? null : this.pipe.transform(val['term2_language1_distribution_date'],'yyyy/MM/dd'),
                              "term2_language1_book_id": this.languagebookid,
                              "term2_language2_distribution_date": (val['term2_language2_distribution_date'] === '' || val['term2_language2_distribution_date'] == '0000-00-00') ? null : this.pipe.transform(val['term2_language2_distribution_date'],'yyyy/MM/dd'),
                              "term2_language2_book_id":this.englishbookid,
                              "term2_mathematics_distribution_date": (val['term2_mathematics_distribution_date'] === '' || val['term2_mathematics_distribution_date'] == '0000-00-00') ? null : this.pipe.transform(val['term2_mathematics_distribution_date'],'yyyy/MM/dd'),
                              "term2_mathematics_book_id":this.mathsbookid,
                              "term2_science_distribution_date": (val['term2_science_distribution_date'] === '' || val['term2_science_distribution_date'] == '0000-00-00') ? null : this.pipe.transform(val['term2_science_distribution_date'],'yyyy/MM/dd'),
                              "term2_science_book_id":this.sciencebookid,
                              "term2_socialscience_distribution_date": (val['term2_socialscience_distribution_date'] === '' || val['term2_socialscience_distribution_date'] == '0000-00-00') ? null : this.pipe.transform(val['term2_socialscience_distribution_date'],'yyyy/MM/dd'),
                              "term2_socialscience_book_id":this.socialbookid }); break;
                        case 3:
                            this.finalSaveArr.push({
                              "school_id":this.schoolId, 
                              "student_id":val['student_id'], 
                              "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                              "medium":this.filterForm.value["medium"], 
                              "ac_year":this.acyear, 
                              "class":val['class_studying_id'],
                              "finalsub":1,
                              "term3_language1_distribution_date": (val['term3_language1_distribution_date'] === '' || val['term3_language1_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_language1_distribution_date'],'yyyy/MM/dd'),
                              "term3_language1_book_id": this.languagebookid,
                              "term3_language2_distribution_date": (val['term3_language2_distribution_date'] === '' || val['term3_language2_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_language2_distribution_date'],'yyyy/MM/dd'),
                              "term3_language2_book_id":this.englishbookid,
                              "term3_mathematics_distribution_date": (val['term3_mathematics_distribution_date'] === '' || val['term3_mathematics_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_mathematics_distribution_date'],'yyyy/MM/dd'),
                              "term3_mathematics_book_id":this.mathsbookid,
                              "term3_science_distribution_date": (val['term3_science_distribution_date'] === '' || val['term3_science_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_science_distribution_date'],'yyyy/MM/dd'),
                              "term3_science_book_id":this.sciencebookid,
                              "term3_socialscience_distribution_date": (val['term3_socialscience_distribution_date'] === '' || val['term3_socialscience_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_socialscience_distribution_date'],'yyyy/MM/dd'),
                              "term3_socialscience_book_id":this.socialbookid }); break;
                      }
          }
          if(val['txtbook_primaryid'] !== null){
            console.log(val['txtbook_primaryid']);
              switch(+term_no){
                case 1:
                    this.finalUpdateArr.push({
                      "id":val['txtbook_primaryid'],
                      "school_id":this.schoolId, 
                      "student_id":val['student_id'], 
                      "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                      "medium":this.filterForm.value["medium"], 
                      "ac_year":this.acyear, 
                      "class":val['class_studying_id'],
                      "term1_language1_distribution_date":(val['term1_language1_distribution_date'] === '' || val['term1_language1_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term1_language1_distribution_date'],'yyyy/MM/dd'),
                      "term1_language1_book_id": this.languagebookid,
                      "term1_language2_distribution_date": (val['term1_language2_distribution_date'] === '' || val['term1_language2_distribution_date'] === '0000-00-00' ) ? null : this.pipe.transform(val['term1_language2_distribution_date'],'yyyy/MM/dd'),
                      "term1_language2_book_id":this.englishbookid,
                      "term1_mathematics_distribution_date": (val['term1_mathematics_distribution_date'] === '' || val['term1_mathematics_distribution_date'] === '0000-00-00' ) ? null : this.pipe.transform(val['term1_mathematics_distribution_date'],'yyyy/MM/dd'),
                      "finalsub":2 ,
                      "term1_mathematics_book_id":this.mathsbookid,
                      "term1_science_distribution_date": (val['term1_science_distribution_date'] === '' || val['term1_science_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term1_science_distribution_date'],'yyyy/MM/dd'),
                      "term1_science_book_id":this.sciencebookid,
                      "term1_socialscience_distribution_date": (val['term1_socialscience_distribution_date'] === '' || val['term1_socialscience_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term1_socialscience_distribution_date'],'yyyy/MM/dd'),
                      "term1_socialscience_book_id":this.socialbookid, 
                    });
                    
                    break;
                case 2:
                    this.finalUpdateArr.push({
                      "id":val['txtbook_primaryid'],
                      "school_id":this.schoolId, 
                      "student_id":val['student_id'], 
                      "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                      "medium":this.filterForm.value["medium"], 
                      "ac_year":this.acyear, 
                      "class":val['class_studying_id'],
                      "term2_language1_distribution_date":(val['term2_language1_distribution_date'] === '' || val['term2_language1_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term2_language1_distribution_date'],'yyyy/MM/dd'),
                      "term2_language1_book_id": this.languagebookid,
                      "term2_language2_distribution_date": (val['term2_language2_distribution_date'] === '' || val['term2_language2_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term2_language2_distribution_date'],'yyyy/MM/dd'),
                      "term2_language2_book_id":this.englishbookid,
                      "term2_mathematics_distribution_date": (val['term2_mathematics_distribution_date'] === '' || val['term2_mathematics_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term2_mathematics_distribution_date'],'yyyy/MM/dd'),
                      "finalsub":2 ,
                      "term2_mathematics_book_id":this.mathsbookid,
                      "term2_science_distribution_date": (val['term2_science_distribution_date'] === '' || val['term2_science_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term2_science_distribution_date'],'yyyy/MM/dd'),
                      "term2_science_book_id":this.sciencebookid,
                      "term2_socialscience_distribution_date": (val['term2_socialscience_distribution_date'] === '' || val['term2_socialscience_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term2_socialscience_distribution_date'],'yyyy/MM/dd'),
                      "term2_socialscience_book_id":this.socialbookid, 
                    });
                    break;
                case 3:
                    this.finalUpdateArr.push({
                      "id":val['txtbook_primaryid'],
                      "school_id":this.schoolId, 
                      "student_id":val['student_id'], 
                      "indent_date":this.pipe.transform(new Date(),'yyyy/MM/dd'),
                      "medium":this.filterForm.value["medium"], 
                      "ac_year":this.acyear, 
                      "class":val['class_studying_id'],
                      "term3_language1_distribution_date":(val['term3_language1_distribution_date'] === '' || val['term3_language1_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_language1_distribution_date'],'yyyy/MM/dd'),
                      "term3_language1_book_id": this.languagebookid,
                      "term3_language2_distribution_date": (val['term3_language2_distribution_date'] === '' || val['term3_language2_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_language2_distribution_date'],'yyyy/MM/dd'),
                      "term3_language2_book_id":this.englishbookid,
                      "term3_mathematics_distribution_date": (val['term3_mathematics_distribution_date'] === '' || val['term3_mathematics_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_mathematics_distribution_date'],'yyyy/MM/dd'),
                      "finalsub":2 ,
                      "term3_mathematics_book_id":this.mathsbookid,
                      "term3_science_distribution_date": (val['term3_science_distribution_date'] === '' || val['term3_science_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_science_distribution_date'],'yyyy/MM/dd'),
                      "term3_science_book_id":this.sciencebookid,
                      "term3_socialscience_distribution_date": (val['term3_socialscience_distribution_date'] === '' || val['term3_socialscience_distribution_date'] === '0000-00-00') ? null : this.pipe.transform(val['term3_socialscience_distribution_date'],'yyyy/MM/dd'),
                      "term3_socialscience_book_id":this.socialbookid, 
                    });
                     break;
              }
          }
        });
        console.log('Array update',this.finalUpdateArr);
        if(this.finalSaveArr.length>0){ this.studentService.saveAndUpdateTxtBookDtls(this.finalSaveArr,"schoolnew_textbookindent_pri","/savePrimarySchoolBookDtls").subscribe(result=>{console.info(result['message']);alert(result['message']);}); }
        if(this.finalUpdateArr.length>0){ this.studentService.saveAndUpdateTxtBookDtls(this.finalUpdateArr,"schoolnew_textbookindent_pri","/updatePrimarySchoolBookDtls").subscribe(result=>{console.info(result['message']);alert(result['message']);});}
        this.finalSaveArr = [];
        this.finalUpdateArr = [];
        this.redirectTo(this.router.url);
      }
      else{
        console.info('Nothing To Save');
        alert('Checkbox are Not Select Please Check alteast One Checkbox');
      }
    }

    redirectTo(uri) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
    }
    ngOnDestroy() : void{
      // this.studentService.unsubscribe();
    }
}