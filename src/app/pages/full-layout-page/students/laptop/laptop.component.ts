  import { Component, OnInit, OnDestroy} from '@angular/core';
  import { formatDate } from '@angular/common';
  import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { DatePipe } from '@angular/common';
  /** Imported - Schemes Service  */
  import { UserSessionService } from 'src/services/usersession.service';
  import { StudentService } from '../student.service';
  import { AlertService } from 'src/services/alert.service';
  /** Interface */
  import { schemeList } from '../../../../../models/schemes.model';
  
/** TO Gathering Laptop Details In Class Wise  
 *  Last Modified Date : 04/12/2019 (venba/ps)
 * */
@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit ,OnDestroy {
    
    public schemesListArr: schemeList[] = []; 
    public laptopListArr: Array<Object> = []; 
    public selectedList: Array<Object>  = [];
    public submitted : boolean = true;
    public checked : boolean = false;
    
    public tableTitle : String;
    public filterForm: FormGroup;
    
    private finalSaveArr : Array<Object>  = [];
    private finalUpdateArr : Array<Object>  = [];
    private previousXIIdtlsArr : Array<Object>  = [];

    public classesInRoman = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII',"LKG","UKG","PRE KG"];  
    
    pipe = new DatePipe('en-US');
    schoolId: number;
    schoolName: String;
    schoolTypeId : number ;

    classList: Array<{'label':string, 'value':string,'visibility':boolean}> = [ {label:'Select Class', value:'','visibility':false},];
    sectionList: Array<{'label':string, 'value':string}> = [{label:'Select Selction', value:''},];
    
    public laptopListArr2: any= []; 
    public selectedList2: Array<Object>  = [];
    exportColumns: { title: any; dataKey: any; }[];

    /** Datatable Column Field And Header */
    cols: Array<{'field':string,'header':string,'width':string}> = [ { field:'unique_id_no',header:'EMIS ID' ,width: ''},
                                                                     { field: 'name', header: 'Student Name' ,width: '15em'},
                                                                     { field: 'class_studying_id', header: 'Class - Sec',width: '9.3em'},
                                                                     { field: 'unique_supply', header: 'Serial No' ,width: '13em'},
                                                                    //  { field: 'indent', header: 'Indent Date' ,width: ''},
                                                                     { field: 'distribution_date', header: 'Distributed on' ,width: '12em'}];
     /** Datatable Column Field And Header */
     cols2: Array<{'field':string,'header':string,'width':string}> = [ { field:'REGNO',header:'Register No.' ,width: ''},
                                                                     { field: 'NAME', header: 'Student Name' ,width: '11em'},
                                                                    //  { field: 'YEAR', header: 'Year of Pass-out' ,width: ''},
                                                                     { field: 'result', header: 'Result' ,width: ''},
                                                                     { field: 'MANAGEMENT', header: 'Management Type' ,width: ''},
                                                                     { field: 'laptop_distributed', header: 'Laptop Distributed' ,width: ''},
                                                                     { field: 'LAPTOPSERIALNO', header: 'Serial No' ,width: ''},
                                                                     { field: 'LAPTOPDISTRIBUTIONDATE', header: 'Distributed on' ,width: '13em'}
                                                                   ];
     


     

    
    /** Dropdown For Type */
    ayList: Array<{'label':any, 'value':number}> = [ {label:'Select Academic Year', value:null},
                                                  {label:'Current Year (2019-2020)',value:0},
                                                  {label:'Previous Year (2018-2019)',value:1},
                                                  {label:'Previous Year (2017-2018)',value:2}];
                                                  
  lowClassId: any;
  tempArrForClassAndSection: any;
  userName: any;
                                                         
                                                         
    constructor(public fb:FormBuilder,
                private studentService:StudentService,
                private userSessionService: UserSessionService,
                private alertService:AlertService,
                private router: Router ) {
  
                this.filterForm = this.fb.group({
                  'ac_year_id': new FormControl('', Validators.required),
                  'class_id': new FormControl('', Validators.required),
                  'section': new FormControl('', Validators.required)
                });
    }
    

    ngOnInit() {
      console.clear();
      // this.filterForm.controls['ac_year_id'].valueChanges.subscribe(val => {});
      this.schoolId = this.userSessionService.schoolId();
      this.schoolName = this.userSessionService.schoolName();
      this.schoolTypeId = this.userSessionService.schoolTypeId();
      this.userName = this.userSessionService.userName();
      this.exportColumns = this.cols.map(col => ({title: col['header'], dataKey: col['field']}));
      // let month = (new Date().getMonth() + 1);
      // let x = 2;
      // let dates = [(new Date()).getFullYear()-1,(new Date()).getFullYear(),(new Date()).getFullYear()+1,];
      // let tempArr : any = [{label:'Select Academic Year', value:'',flag:null}];
      // dates.forEach(function (date,inx) {
      //       let year = (month <= 6) ? date + '-' + (date+1) : (date-1) + '-' + date;
      //       let text = x==0 ? "Current Year ( "+year+" ) " : "Previous Year ( "+year+" ) ";
      //       // if(x==0){  let text = "Current Year ( "+year+" ) "; tempArr.push({'label':text,'value':x,'flag':x}); }
      //       tempArr.push({'label':text,'value':x,'flag':x});
      //       x--;
      // }); 
      // this.ayList = tempArr;
      // ayList: Array<{'label':any, 'value':any,'flag':number}> = [ {label:'Select Academic Year', value:'',flag:null},];
      
      
      this.studentService.getSchemesListWithApplicableClasses(this.schoolId,true).subscribe(
        scheme=>{ 
                  this.schemesListArr = scheme['result'];
                  let value = scheme['result'].filter(item => item.id === '11');                 
                  this.lowClassId = value[0]['appli_lowclass'];
                    for(let i=+value[0]['appli_lowclass'];i<=+value[0]['appli_highclass'];i++){
                        this.classList.push({ label: this.classesInRoman[i], value:i.toString(),visibility:true});
                    }
                }
      );
    //   for(let i=11;i<=12;i++){
    //     this.classList.push({ label: this.classesInRoman[i], value:i.toString(),visibility:true});
    // }

      this.studentService.getSchoolWiseClassandSection(this.schoolId,true).subscribe(
        list=>{
          // console.log(list['result']);
          this.tempArrForClassAndSection = list['result'];
        }
      );
      setTimeout(()=>{    //<<<---    using ()=> syntax
        this.tableTitle = 'For Current Year (2019-2020) ( '+this.classesInRoman[12] +' Standard - ALL Section )';
        this.toGetLaptopDetails({"class_id":"12","section":"0","school_id":this.schoolId,"ac_year_id":"0"});
      }, 3000);
    
  }

  ischecked(val){
    this.checked = val == 0 ? false : true;
    if(val != 0){
      this.filterForm.controls['class_id'].setValue(12);
      this.filterForm.controls['section'].setValue(0);                 
      this.exportColumns = this.cols2.map(col => ({title: col['header'], dataKey: col['field']})) ;
    }
    // let acy_label = this.ayList.filter(list => list.value == val)
    //                       .map(function(list) { return list.label; })[0];
    // this.tableTitle = ' ( '+this.classesInRoman[12] +' Standard - ALL Section ) '+acy_label;
  }
      toGetLaptopDetails(Arr){
        this.studentService.laptopList(Arr).subscribe(
          list=>{
            this.laptopListArr = list['result']; 
          }
        );
      }

      toGetLaptopDetails2(Arr,FLAG){
        this.studentService.previousXIIDtls(Arr).subscribe(
          list=>{
            let arr : any = list['result']
            // if(FLAG == 1){ this.laptopListArr2 = arr['acyr_1819_dtls'].filter(item => item['result'] === 'pass'); }
            // else if(FLAG == 2){ this.laptopListArr2 = arr['acyr_1718_dtls'].filter(item => item['result'] === 'pass');}
            if(FLAG == 1){ this.laptopListArr2 = arr['acyr_1819_dtls']; }
            else if(FLAG == 2){ this.laptopListArr2 = arr['acyr_1718_dtls'];}
          }
        );
      }
      

      // get diagnostic() { return JSON.stringify(this.filterForm.value); }
      assignTheDistributionDate(date,key){
        // console.log(date);
        // console.log(key);
        // console.log(str);
        // console.log(this.laptopListArr);
        let data = this.laptopListArr;
        data.forEach(function (value) {
          value[key] = date;
        });
        // console.log(data);
      }

      assignTheDistributionDate2(date,key){
        // console.log(date);
        // console.log(key);
        // console.log(str);
        // console.log(this.laptopListArr);
        let data = this.laptopListArr2;
        data.forEach(function (value) {
          value[key] = date;
        });
        // console.log(data);
      }

      getSectionForRevalentClass(val){
        
        
        let arr= [];
        arr.push({label:'Select Selction', value:''},{label:'ALL', value:'0'});
         this.tempArrForClassAndSection.filter(item => item['class_id'] === val)
                                       .map(item => { return item['revalent_section'].split(",").map(String)})[0]
                                       .forEach(function(list,inx){ arr[inx+2] = {label:list, value:list}; });       
                                       this.sectionList = arr;              
        // console.log(this.sectionList);
                      
      }

      getClassForRevalentAY(val){
        if(val == 0){
          // push({ label: this.classesInRoman[i], value:i.toString(),visibility:true});
        }
      }
     
    /** When Submit The Filter Form its get the Data For Datatable */
    searchableSubmit(value) {
      value['school_id'] = this.schoolId ;
      let acy_label = this.ayList.filter(list => list.value == value['ac_year_id'])
                          .map(function(list) { return list.label; })[0];
      this.tableTitle = (value['section'] == 0) ? 'For '+acy_label+' ( '+ this.classesInRoman[value['class_id']] +' Standard - ALL Section )' : 'For '+acy_label+' ( '+ this.classesInRoman[value['class_id']] +' Standard - ' + value['section'] +' Section )';
      if(value['ac_year_id'] == 0){
        
        this.submitted = true;
        this.laptopListArr = [];
        this.toGetLaptopDetails(value);
      }
      else{
        this.toGetLaptopDetails2({"emis_school_udise":this.userName, "school_manage":this.schoolTypeId },value['ac_year_id']);
        // this.toGetLaptopDetails2({"emis_school_udise":33011107801, "school_manage":1 },value['ac_year_id']);
        // acyr_1718_dtls
        console.log(value);
      }

    }

    checkDuplicate(arrList) {
      var dataGroups = arrList.reduce((a, cur) => {
        a[cur.unique_supply] = (a[cur.unique_supply] || 0) + 1;
        return a;
      }, {});
    
      return Object.values(dataGroups).some(num => num > 1);
    }

    checkDuplicate2(arrList) {
      var dataGroups = arrList.reduce((a, cur) => {
        a[cur.LAPTOPSERIALNO] = (a[cur.LAPTOPSERIALNO] || 0) + 1;
        return a;
      }, {});
    
      return Object.values(dataGroups).some(num => num > 1);
    }

    /** Datatable Save */
    onSubmit(Arr,flag) : any{
      
      if(Arr.length>0){
        
       if(flag == 0){
        let cnt = 0;
        let names = [];
        
        Arr.forEach((val) => {
          if((val['unique_supply'] == null || val['unique_supply'] == '' ) || val['distribution_date'] == null){
            names.push(val['name']);
            cnt++;
          }
        });
        if(cnt > 1){
          
          
          this.alertService.error("Please Check the below students because Empty Value founded either Serial-no or Distributed Date \n"+names.join("\n"));
          // console.log(names);
          return true;
        }
        if(this.checkDuplicate(Arr)) {
          console.log(this.checkDuplicate(Arr));
          this.alertService.error("Duplicate SerialNo found");
          return true;
        }
        
        // console.log(Arr);
         

        if(cnt == 0){
            Arr.forEach((val) => {
                if(val['laptop_primaryid'] == null){
                            this.finalSaveArr.push({
                                  "school_id":this.schoolId, 
                                  "scheme_id":11, 
                                  "student_id":val['student_id'], 
                                  "distribution_date":this.pipe.transform(val['distribution_date'],'yyyy/MM/dd'), 
                                  "unique_supply":val['unique_supply'],
                                  "class":val['class_studying_id'],
                                  // "section" :val['class_section'],
                                  "acyear":val['acyear'] == null ? '2019-2020' : '2018-2019' ,
                                  "finalsub":1});
                }
                if(val['laptop_primaryid'] != null){
                              this.finalUpdateArr.push({
                                        "id":val['laptop_primaryid'],
                                        "school_id":this.schoolId, 
                                        "scheme_id":15, 
                                        "student_id":val['student_id'], 
                                        "distribution_date":this.pipe.transform(val['distribution_date'],'yyyy/MM/dd'), 
                                        "unique_supply":val['unique_supply'],
                                        "class":val['class_studying_id'],
                                        // "section" :val['class_section'],
                                        "acyear":val['acyear'] == null ? '2019-2020' : '2018-2019' ,
                                        "finalsub":2 });
                }
            });
            if(this.finalSaveArr.length>0){   
              this.studentService.saveAndUpdateSchemesdetails('/api/saveLaptop',{"records": {"data":this.finalSaveArr,"tname":"schoolnew_computerindent"}}).subscribe(
                result=>{console.info(result['message']);
                this.alertService.success(result['message']);
                }); 
            }
            if(this.finalUpdateArr.length>0){ 
              this.studentService.saveAndUpdateSchemesdetails('/api/updateLaptop',{"records": {"data":this.finalUpdateArr,"tname":"schoolnew_computerindent"}}).subscribe(
                result=>{console.info(result['message']);this.alertService.success(result['message']);}); 
            }
            this.finalSaveArr = [];
            this.finalUpdateArr = [];
        }
       }
       else{
          
        let tname =  this.filterForm.get('ac_year_id').value == 1  ?  'dge_class12_2019': this.filterForm.get('ac_year_id').value == 2 ? 'dge_class12_2018' : '' ;
        let cnt2 = 0;
        let names2 = [];
        
        Arr.forEach((val) => {
          if((val['LAPTOPSERIALNO'] == null || val['LAPTOPSERIALNO'] == '' ) || val['LAPTOPDISTRIBUTIONDATE'] == null){
            names2.push(val['name']);
            cnt2++;
          }
        });

        if(cnt2 > 1){
          this.alertService.error("Please Check the below Students because Empty Value founded in Serial-no or Distributed Date \n"+names2.join("\n"));
          // console.log(names);
          return true;
        }

        if(this.checkDuplicate2(Arr)) {
          console.log(this.checkDuplicate(Arr));
          this.alertService.error("Duplicate SerialNo found");
          return true;
        }
        
          Arr.forEach((val) => {
            this.previousXIIdtlsArr.push({
              "REGNO":val['REGNO'],
              "LAPTOPSERIALNO":val['LAPTOPSERIALNO'],
              "LAPTOPDISTRIBUTIONDATE":val['LAPTOPDISTRIBUTIONDATE']});
          });
          if(this.previousXIIdtlsArr.length>0){   
            this.studentService.updatePreviousXIIdtls({"records": {"data":this.previousXIIdtlsArr,"tname":tname}}).subscribe(
              result=>{console.info(result['message']);alert(result['message']);}); 
          }
        }
        this.redirectTo(this.router.url);
      }
      else{
        console.info('Nothing To Save');
        this.alertService.error('Checkbox are Not Select Please Check alteast One Checkbox');
      }
    }

    checkWithExisting(v,inx,f){
      // console.log(v);
      // console.log(inx);
      // console.log(f);
      // console.log(this.laptopListArr[inx]['unique_supply']);
      this.studentService.checkWithExistingSerialNo(v,true).subscribe(
        result=>{
          if(result['dataStatus']){
            if(result['result'] >= 1 ){ this.alertService.info('Laptop Serial Number Already Exists'); 
                    if(f == 1){ this.laptopListArr[inx]['unique_supply'] = ''; }
               else if(f == 2){ this.laptopListArr2[inx]['LAPTOPSERIALNO'] = ''; }
            }
          }else{
            console.info(result['message']);this.alertService.error(result['message']);
          }
        });  
          
    }
    
    redirectTo(uri) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
    }

    exportPdf() {
      let arr = this.filterForm.controls['ac_year_id'].value == 0 ? this.laptopListArr : this.laptopListArr2 ;
      debugger;
      import("jspdf").then(jsPDF => {
          import("jspdf-autotable").then(x => {
              const doc = new jsPDF.default(0,0);
              doc.autoTable(this.exportColumns, arr);
              // doc.text(20, 20, 'Hello world!');
              // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
              doc.save(this.schoolName+' / Laptop Schemes '+this.tableTitle+'.pdf');
          })
      })
    }
//excel
  exportExcel(data) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "LaptopStatus");
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

    ngOnDestroy() : void{
      // this.studentService.unsubscribe();
    }
}