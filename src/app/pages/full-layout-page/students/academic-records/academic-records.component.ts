import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserSessionService } from 'src/services/usersession.service';
import { AlertService } from 'src/services/alert.service';

@Component({
  selector: 'app-academic-records',
  templateUrl: './academic-records.component.html',
  styleUrls: ['./academic-records.component.css']
})

export class AcademicRecordsComponent implements OnInit {
  /** ⇒ Variables Declaration */
  /* ✦ for session Declaration */
  schoolId: number;
  lowClass : number;
  highClass : number;
  
  form: FormGroup;
  academicform:FormGroup;
  studentData: any;
  parentsCheckbox : boolean = false;
  FAMedit : boolean;
  rowedit: boolean;
  class : Array<Object> = [];
  term : Array<Object> = [];
  section : Array<Object> = [];
  subject : Array<Object> = [];
  reasons : Array<Object> = [];
  
  selectedColumns : Array<Object> = [];
  dataList : Array<Object> = [];
  primaryStudentRecords:Array<Object> = [];
  tempArrForClassAndSection: any;
  secondaryStudentRecords:Array<Object> = [];
  // primaryStudentRecords:Array<Object> = [];
// academic9thRecords:Array<Object> = [];
  
  selectedIndex: number;
  classList: Array<{'label':string, 'value':string,}> = [ {label:"Select Term", value:""},{value:"1",label:"I - mid term"},{value:"2",label:"Quarterly"},{value:"3",label:"II - mid term"},{value:"4",label:"Half Yearly"},{value:"5",label:"III - mid term"},{value:"6",label:"Annual"}];

  constructor(private studentService : StudentService,private fb: FormBuilder,private userSessionService:UserSessionService) {
    this.schoolId = this.userSessionService.schoolId();
    this.lowClass = +this.userSessionService.lowClass();
    console.log(this.lowClass);
    this.highClass = +this.userSessionService.highClass();
    console.log(this.highClass);
   }

  ngOnInit() {
    this.studentData = [];
    this.initialValidator();
    
    this.getStudentData();
  }
  initialValidator() {
    this.form = this.fb.group({
      'termid': new FormControl('',null),
      'classid': new FormControl('',null),
      'sectionid': new FormControl('',null),
      'subid': new FormControl('',null),
      'school_id': new FormControl(this.schoolId,null),
    });
    this.academicform = this.fb.group({
      'termid': new FormControl('',null),
      'classid': new FormControl('',null),
      'sectionid': new FormControl('',null),
      'subid': new FormControl('',null),
      'school_id': new FormControl(this.schoolId,null),
    });
  }
  getStudentData()
  {   
    this.studentService.getSchoolWiseClassandSection(this.schoolId,true).subscribe(data=>{
      this.tempArrForClassAndSection = data['result'];
      this.term = [{"value": 1,"label": "Term I"},
                   {"value": 2,"label": "Term II"},
                   {"value": 3,"label": "Term III"}];
      this.reasons =[
                     {label:'CWSN', value:'1'},
                     {label:'Dropped Out',value:'2'},
                     {label:'New Admission', value:'3'},
                    ];
      this.class = data['result'].map(l => { return { label: l.class_studying, value: l.class_id }; })
      if(this.highClass > 8){
      this.class = this.class.filter(f => { return +f['value'] <= 8 });
      console.log(this.class);
      }
      // console.log();
    });
  }
  getSectionAndSubjectForRevalentClass(val){
    let arr= [];
    this.subject = [];
    this.section = [];
    arr.push({label:'ALL', value:'0'});
    let category = this.form.get('termid').value;
    this.studentService.textBookList({"class_id":val,"term":category,"medium":16}).subscribe(
      list=>{
        this.subject = list['result'].map(l => { return { label: l.book_name, value: l.id }; })
      }
    );
    this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
                                   .map(item => { return item['revalent_section'].split(",").map(String)})[0]
                                   .forEach(function(list,inx){ arr[inx+1] = {label:list, value:list}; });       
                                   this.section = arr;                                
  }
  
  // selectRecords(e,i)
  // { 
  //   this.primaryStudentRecords[i]['checkboxstatus'] = e;
  // }

  parentToggle(e) {
    // console.log('i am in par function', e);
    // console.log(this.noonmealListArr);
    this.primaryStudentRecords.forEach(row => row['checkboxstatus'] = e);
    this.primaryStudentRecords.forEach(row => row['attendance'] = (row['checkboxstatus'] == true) ? '1' : (row['checkboxstatus'] == false) ? '0' : null);
    this.parentsCheckbox = this.isAllSelected();
  }

  childToggle(e,data) {
    // console.log('i am in child function', e);
    // console.log(data);
    data['checkboxstatus'] = e;
    data['attendance'] = (data['checkboxstatus'] == true) ? '1' : (data['checkboxstatus'] == false) ? '0' : null;
    this.parentsCheckbox = this.isAllSelected();
    data['FAMedit'] = (data['checkboxstatus'] == true) ? true : (data['checkboxstatus'] == false) ? false : false;
  }

  isAllSelected() {
      let numRows = this.primaryStudentRecords.length; 
      let present=0; 
      let absent=0;
      
      this.primaryStudentRecords.forEach((item, index) => {
        if (item['checkboxstatus'] == true) present++;
        else absent++;
      });

      // console.info('present count :',present);
      // console.info('absent count :',absent);
      // console.info('total count :', numRows);

      return present === numRows ? true : false;
      // indeterminate
  }


  getAcademicRecords() {
    
    this.form.value;
      this.studentService.getAcademicRecords(this.form.value,true).subscribe((res) => {
        if (res.dataStatus == true) {
          
          // console.log(res);
          // this.primaryStudentRecords =res;
          this.primaryStudentRecords = res.studentlist;
          this.primaryStudentRecords.map(x=> { x['checkboxstatus'] = (x['attendance'] == '1') ? true : (x['attendance'] == '0') ? false : null; x['FAMedit'] = false;  });
  
          this.parentsCheckbox = this.isAllSelected();
          
          this.primaryStudentRecords.forEach((item, index) => {
            if(item['FAM'] == '0' || item['FAM'] == '0')
            this.isBlur(item['FAM'],index,'FAM',2);
            this.isBlur(item['SAM'],index,'SAM',3);
          });
          
          console.log(this.primaryStudentRecords);
        }
      });
  }
  get9th10thData()
  {
    debugger;
    this.studentService.ninethStdData(this.academicform.value,true).subscribe((res) => {
      if (res.dataStatus == true) {
        debugger;
        // console.log(res);
        this.secondaryStudentRecords = res.studentlist;
      }
        });
  }

updateAcademicRecords(data)
{
  console.log(data);
 let records = {"records": {"data": data,"classid":this.primaryStudentRecords['classid'],"schoolid":this.primaryStudentRecords['school_id'],"subjectid":this.primaryStudentRecords['subid'],"termid":this.primaryStudentRecords['termid'],"absentlist":[] }};
  this.studentService.updateAcademicRecords(records,true).subscribe((res) => {
    if (res.dataStatus == true) {
      this.getAcademicRecords();
      // console.log(res);
    }
  });
}
search(event)
{
  
}
finalSaveArr : any[] =[];
    /** Datatable Save */
    onSubmit(Arr) : any{
      let _trm = this.form.get('termid').value;
      let _cls = this.form.get('classid').value;
      let _sec = this.form.get('sectionid').value;
      let _sub = this.form.get('subid').value;
      // let _tname = '';

      

      if(Arr.length>0){
        let p_empty_count = 0;
        let a_empty_count = 0;
        Arr.forEach((val, inx) => {
          if(val['checkboxstatus'] == true){
            console.log(val['checkboxstatus'],val['SAM']);
            if(val['FAM'] == null || val['SAM'] == null){
              p_empty_count++;  
            }
            else if(val['FAM'] == 0 || val['SAM'] == 0){
              p_empty_count++;  
            }
          }
          else if(val['checkboxstatus'] == false){
            if(val['attreason'] == ''){
              a_empty_count++;  
            }
          }
        });
        console.log('p_empty_count',p_empty_count,'a_empty_count',a_empty_count);
        if(p_empty_count>0){
          alert(' CheckBox is Checked . But `FA Mark` or `SA Mark` is Empty');
          return true;
        }
        if(a_empty_count > 0){
          alert('Reason Required');
          return true;
        }

        let records = {"records": {"data": Arr,"classid":_cls,"schoolid":this.schoolId,"subjectid":_sub,"termid":_trm }};
      
                     
      this.studentService.updateAcademicRecords(records,true).subscribe((res) => {
        if(res.dataStatus == true) {
          this.getAcademicRecords();
          console.log(res);
        }
        else{
          console.log(res);
        }
      });
      }
      else{
        console.info('Nothing To Save');
        // this.alertService.error('Checkbox are Not Select Please Check alteast One Checkbox');
      }
    }


    // exportExcel() {
    //   import("xlsx").then(xlsx => {
    //       const worksheet = xlsx.utils.json_to_sheet(this.exportColumns);
    //       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //       this.saveAsExcelFile(excelBuffer, this.schoolName+' / CCE reports '+this.pageTitle);
    //   });
    // }

    // saveAsExcelFile(buffer: any, fileName: string): void {
    //   import("file-saver").then(FileSaver => {
    //       let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //       let EXCEL_EXTENSION = '.xlsx';
    //       const data: Blob = new Blob([buffer], {
    //           type: EXCEL_TYPE
    //       });
    //       FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //   });
    // }

    // exportPdf() {
    //   debugger;
    //   import("jspdf").then(jsPDF => {
    //       import("jspdf-autotable").then(x => {
    //           const doc = new jsPDF.default(0,0);
    //           doc.autoTable(this.exportColumns, this.noonmealListArr);
    //           // doc.text(20, 20, 'Hello world!');
    //           // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    //           doc.save(this.schoolName+' / CCE Reports '+this.pageTitle+'.pdf');
    //       })
    //   })
    // }


isBlur(event,inx,KEY,flag){
  let value = Number(event);
  if(flag == 1){
  let arr_fa = [0,0,0,0];
  let arr_fb = [0,0,0,0];
  let ttl_fa = 0; 
  let ttl_fb = 0; 
  let fam = 0;
  

  if (Number(value) > 10){
    alert('Please enter the value less than or equal to 10 ');
    this.primaryStudentRecords[inx][KEY] = 0;
  }

  arr_fa[0] = Number(this.primaryStudentRecords[inx]['FAA']);
  arr_fa[1] = Number(this.primaryStudentRecords[inx]['FAB']);
  arr_fa[2] = Number(this.primaryStudentRecords[inx]['FAC']); 
  arr_fa[3] = Number(this.primaryStudentRecords[inx]['FAD']);

  arr_fb[0] = Number(this.primaryStudentRecords[inx]['FBA']);
  arr_fb[1] = Number(this.primaryStudentRecords[inx]['FBB']);
  arr_fb[2] = Number(this.primaryStudentRecords[inx]['FBC']); 
  arr_fb[3] = Number(this.primaryStudentRecords[inx]['FBD']);

  ttl_fa = this.greaterNumber(arr_fa);
  ttl_fb = this.greaterNumber(arr_fb);
  fam = ttl_fa + ttl_fb
  this.primaryStudentRecords[inx]['FAM'] = fam;
  this.primaryStudentRecords[inx]['FAMedit'] = (fam > 0) ? false : true;
      console.log(this.primaryStudentRecords[inx]['FAMedit']);
  }
  else if(flag == 2){ 
    if (Number(value) > 40){
      alert('Please enter the value less than or equal to 40 ');
      this.primaryStudentRecords[inx][KEY] = 0;
    } 
  }
  else if(flag == 3){
    if (Number(value) > 60){
      alert('Please enter the value less than or equal to 60 ');
      this.primaryStudentRecords[inx][KEY] = 0;
    }
  }
}

greaterNumber(arr){			
  var fLargeNum = 0;
  var sLargeNum = 0;
  for(var i=0; i<arr.length; i++){
    if(fLargeNum < arr[i]){
      sLargeNum = fLargeNum;
      fLargeNum = arr[i];			
    }else if(sLargeNum < arr[i]){
      sLargeNum = arr[i];
    }
  }
  return fLargeNum+sLargeNum;
 }
}
