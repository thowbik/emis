import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
import { schoolsService } from '../schools.service';
import { SortEvent } from 'primeng/api';
declare var $: any;
declare var toggleKBMode: any
declare var convertThis: any
@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {
  text: string;
  classList:any[]=[];
  mediumList:any[]=[];
  subjectList:any[]=[];
  loList:any[]=[];
  form: FormGroup;
  optionForm: FormGroup;
  submitted: boolean;
  question_img: FileList;
  fileType: any;
  uploadUrl: string | ArrayBuffer;
  isShowOption: boolean = false;
  doc_file: FileList;
  submitted1: boolean;
  questionsData: any[]=[];
  dataHeader: any[]=[];
  pageStage: number;
  questionId: any;
  previewQuestion: any;
  showPreview: boolean;
  previewOptions: any[]=[];
  previewQuestionImg: any;
  previewQuestionTxt: any;
  previewQuestionSubject: any;
  headerTitle:any = "Preview";
  noDataFound: boolean;
  teacherId: number;
  typeList:any[]=[];
  domainList:any[]=[];
  constructor( private fb: FormBuilder,
    private schoolService: schoolsService,
    private alertService: AlertService,
    private dashboardService: StateDashboardService,
    private userSessionService:UserSessionService) { 
      this.teacherId = this.userSessionService.teacherId();
    }

  ngOnInit() {
    this.initialValidators();
    this.getData();
  }
  initialValidators() {
    this.form = this.fb.group({
      QID: new FormControl('', null),  
      IndxID: new FormControl('', null),  
      QTxt  : new FormControl('', null), 
      QImg  : new FormControl('', null), 
      EncodImgNam  : new FormControl('', null), 
      ActvSts  : new FormControl("1", null), 
      Subjct  : new FormControl('',  Validators.required), 
      QClass  : new FormControl('',  Validators.required), 
      QMedium  : new FormControl('',  Validators.required),
      QLO  : new FormControl('', null),
      QType : new FormControl('', Validators.required), 
      QDomain : new FormControl('', Validators.required), 
      
    });
    this.optionForm = this.fb.group({
      options: this.fb.array([]),  
    });
  }
  getQuestionData() {
    this.questionsData =[];
    var records = {"records":{
      "QClass":this.form.value.QClass,          
      "Subjct":this.form.value.Subjct,
      "QMedium":this.form.value.QMedium,
      "Type":this.form.value.QType,
      "Domain":this.form.value.QDomain,
      }
      }
    this.schoolService.getAllQuestions(records).subscribe(res => {
      if (res.quest_list.length > 0) {
debugger;
this.dataHeader = [
  { field: 'QID', header: 'Question Id',widthstyle: '6em' },
  { field: 'QText', header: 'Question',widthstyle: '20em' },
  { field: 'QClass', header: 'Class',widthstyle: '6em' },
  { field: 'QMed', header: 'Medium',widthstyle: '6em'},
  { field: 'QSubjct', header: 'Subject',widthstyle: '8em' },
  { field: 'ActvSts', header: 'Status',widthstyle: '6em' }
  ]  
this.pageStage = 1;  
this.questionsData = res.quest_list.map(l => { return {QID:l.QID,QText:l.QText,QClass:l.QClass,QMed:l.QMed,QSubjct:l.QSubjct, ActvSts: l.ActvSts == "1" ? true: false}; });
console.log(this.questionsData);
      }
      else {
        this.noDataFound = true; 
      }
    });
  }
  getData() {
    this.classList = [
    { "value": "6", "label": "VI" },
    { "value": "7", "label": "VII" },
    { "value": "8", "label": "VIII" },
    { "value": "9", "label": "IX" },
    { "value": "10", "label": "X" },
    { "value": "11", "label": "XI" },
    { "value": "12", "label": "XII" }
  ];
  this.mediumList = [ 
    { "value": "19", "label": "English" },
    { "value": "16", "label": "Tamil" }
  ];
  this.typeList = [
    { "value": "1", "label": "Textbook" },
    { "value": "2", "label": "Aptitude" }
  ];
    }
    createItem(i,questionId) {
      var choiceId = i+1;
      return this.fb.group({
        IndxID: new FormControl('', null),
        QID: new FormControl(questionId, null),
        ChoiceID: new FormControl(choiceId, null),
        ChoiceTxt  : new FormControl('', null),
        ChoiceImg  : new FormControl('', null),
        ChoiceCrctYN  : new FormControl('', null),
        ChoiceWght  : new FormControl('', null),
        EncodImgNam  : new FormControl('', null),
        ActvSts  : new FormControl(1, null),
      });
    }
  // loadEditor() {
  //   $(document).ready(function(){
  //     $('.test,input,textarea').on('keydown',function(event){
  //       if(event.which==121){
  //         $(this).toggleClass('tamil');
  //         return false;
  //       }
  //       if($(this).hasClass('tamil')){
  //         toggleKBMode(event);
  //       }else{
  //         return true;
  //       }
  //     });
  //     $('.test,input,textarea').on('keypress',function(event){
  //       if($(this).hasClass('tamil')){
  //         convertThis(event);
  //       }
  //     });
  //   });
  // }
  chooseType(value) {
this.form.controls['QClass'].setValue("");
this.subjectList = [];
  }
  getSubjects(value,type) {
    if(type == '1'){
    debugger
    this.domainList = [
      { "value": "Academic", "label": "Academic"}
    ];
if(value == '11' || value == '12') {
  this.subjectList = [
    { "value": "PHYSICS", "label": "PHYSICS"},
    { "value": "CHEMISTRY", "label": "CHEMISTRY"},
    { "value": "STATISTICS", "label": "STATISTICS" },
    { "value": "MATHEMATICS", "label": "MATHEMATICS" },
    { "value": "COMP.SCIENCE", "label": "COMP.SCIENCE" },
    { "value": "BIOLOGY", "label": "BIOLOGY" },
    { "value": "BIO-CHEMISTRY", "label": "BIO-CHEMISTRY" }, 
    { "value": "COMM . ENGLISH", "label": "COMM . ENGLISH" },
    { "value": "HOME SCIENCE", "label": "HOME SCIENCE" },
    { "value": "MICRO-BIOLOGY", "label": "MICRO-BIOLOGY" },
    { "value": "BIO-CHEMISTRY", "label": "BIO-CHEMISTRY" },
    { "value": "NURSING", "label": "NURSING"},
    { "value": "NUTRI.&DIETETICS", "label": "NUTRI.&DIETETICS"},
    { "value": "STATISTICS", "label": "STATISTICS" },
    { "value": "ECONOMICS", "label": "ECONOMICS"},
    { "value": "COMMERCE", "label": "COMMERCE"},
    { "value": "ACCOUNTANCY", "label": "ACCOUNTANCY"},
    { "value": "COMP.APP", "label": "COMP.APP"},
    { "value": "HISTORY", "label": "HISTORY"},
    { "value": "POL.SCIENCE", "label": "POL.SCIENCE"},
    { "value": "E.&I CULTURE", "label": "E.&I CULTURE"},
    { "value": "ADV.(TAM)", "label": "ADV.(TAM)"},
    { "value": "BUSI.MATHS", "label": "BUSI.MATHS"},
    { "value": "STAT", "label": "STAT"},
    { "value": "GEOGRAPHY", "label": "GEOGRAPHY"},
    { "value": "E.&I CULTURE", "label": "E.&I CULTURE"},
    { "value": "BASIC MECHANICAL ENG", "label": "BASIC MECHANICAL ENG"},
    { "value": "COMP. TECH", "label": "COMP. TECH"},
    { "value": "BASIC ELECTRICAL ENGINEERING", "label": "BASIC ELECTRICAL ENGINEERING"},
    { "value": "BASIC ELECTRONICS ENGINEERING", "label": "BASIC ELECTRONICS ENGINEERING"},
    { "value": "BASIC CIVIL ENGINEERING", "label": "BASIC CIVIL ENGINEERING"},
    { "value": "BASIC AUTOMOBILE ENGINEERING", "label": "BASIC AUTOMOBILE ENGINEERING"},
    { "value": "TEXTILE TECHNOLOGY", "label": "TEXTILE TECHNOLOGY"},
    { "value": "NURSING", "label": "NURSING"},
    { "value": "TEXTILES AND DRESS DESIGNING", "label": "TEXTILES AND DRESS DESIGNING"},
    { "value": "FOOD SERVICE MANAGEMENT", "label": "FOOD SERVICE MANAGEMENT"},
    { "value": "AGRICULTURAL SCIENCE", "label": "AGRICULTURAL SCIENCE"},
    { "value": "OFFICE MANAGEMENT & SECRETARYSHIP", "label": "OFFICE MANAGEMENT & SECRETARYSHIP"},
    { "value": "PROVISIONAL", "label": "PROVISIONAL"},
    { "value": "CBSE / ICSE - Arts Groups", "label": "CBSE / ICSE - Arts Groups"},
    { "value": "CBSE / ICSE - Science Groups", "label": "CBSE / ICSE - Science Groups"},
    { "value": "CBSE / ICSE - Commerce Groups", "label": "CBSE / ICSE - Commerce Groups"},
    { "value": "CBSE / ICSE - Vocational Groups", "label": "CBSE / ICSE - Vocational Groups"},
    { "value": "CBSE / ICSE - Other Groups", "label": "CBSE / ICSE - Other Groups"},
    { "value": "Bio Botany", "label": "Bio Botany"},
    { "value": "Bio Zoology", "label": "Bio Zoology"},
    { "value": "BOTANY", "label": "BOTANY"},
    { "value": "ZOOLOGY", "label": "ZOOLOGY"}
  ]
}
else {
  this.subjectList = [
    { "value": "TAMIL", "label": "TAMIL"},
    { "value": "ENGLISH", "label": "ENGLISH" },
    { "value": "MATHEMATICS", "label": "MATHEMATICS" },
    { "value": "SCIENCE", "label": "SCIENCE" },
    { "value": "SOCIAL SCIENCE", "label": "SOCIAL SCIENCE" },
  ];
}
    }
    else {
      this.domainList = [
        { "value": "Language", "label": "Language"},
        { "value": "Numerical", "label": "Numerical"},
        { "value": "Scientific", "label": "Scientific"},
        { "value": "Spatial", "label": "Spatial"},
        { "value": "Logical", "label": "Logical"},
        { "value": "Descriptive", "label": "Descriptive"},
        { "value": "General Awarness", "label": "General Awarness"},
        { "value": "Culture & Socialization", "label": "Culture & Socialization"}
      ];
      if(value == '11' || value == '12') {
        this.subjectList = [
          { "value": "Tamil", "label": "Tamil"},
          { "value": "English", "label": "English"},
          { "value": "Mathematics", "label": "Mathematics"},
          { "value": "Physics", "label": "Physics"},
          { "value": "Chemistry", "label": "Chemistry"},
          { "value": "Botany", "label": "Botany"},
          { "value": "Zoology", "label": "Zoology"},
          { "value": "Logical Reasoning", "label": "Logical Reasoning"},
          { "value": "Psychology", "label": "Psychology"},
          { "value": "Accountancy", "label": "Accountancy"},
          { "value": "Quantitative", "label": "Quantitative"},
          { "value": "Commerce", "label": "Commerce"},
          { "value": "Economics", "label": "Economics"},
          { "value": "Commerce", "label": "Commerce"},
          { "value": "General knowledge", "label": "General knowledge"},
          { "value": "Current Affairs", "label": "Current Affairs"},
          { "value": "Traditional knowledge & Social Behavior", "label": "Traditional knowledge & Social Behavior"},
        ]
      }
      else {
        this.subjectList = [
          { "value": "Tamil", "label": "Tamil"},
          { "value": "English", "label": "English"},
          { "value": "Numerical", "label": "Numerical"},
          { "value": "Scientific", "label": "Scientific"},
          { "value": "Spatial", "label": "Spatial"},
          { "value": "Logical", "label": "Logical"}
        ];
      }
    }
  }
  onSelectFile(event,type,index) {
    debugger;
   if (event.target.files && event.target.files[0]) {
     var fileName = event.target.files[0].name;
     var splittedName = fileName.split(".");
      if (event.target.files[0].size <= 1000000000) {
        this.doc_file =  event.target.files;
        var splittedName = fileName.split(".");
        this.fileType = splittedName[1]; 
          if(this.fileType == "png") {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          debugger;
          this.uploadUrl= fileReader.result;
          var bucketName= "renewalapplicationemis";
          var filename = splittedName[0];
          var ext = splittedName[1];
          let expiry:number = 300;
          this.dashboardService.getSignedUrl(bucketName,ext,filename,expiry).subscribe((result) => {
            if (result) {
var key = result.key;
if(type == 1) {
  this.form.controls['QImg'].setValue(key);
  this.form.controls['EncodImgNam'].setValue(key);
 }
 else {
  (<FormArray>this.optionForm.controls['options']).at(index).patchValue({ ChoiceImg: key });
  (<FormArray>this.optionForm.controls['options']).at(index).patchValue({ EncodImgNam: key });
 }
              let files: FileList =this.doc_file;
              let file : File = files[0];
              this.dashboardService.uploadFile(result.url,file).subscribe((res) => {
                debugger;
               
              });
              debugger;
              this.alertService.success("File Uploaded Successfully");
            }
            else {
              this.alertService.error("Error in Uploading File please try again");
            }
          });
        };
      }
      else {
        this.alertService.error("Only png format can be uploaded");
      } 
    }
 else {
       this.alertService.error("File Can`t uploaded because Image size should not exceed 2MB");
     }
   }
  }
  chooseCorrectAnswer(value,index) {
    debugger;
    if(value == true) {
      (<FormArray>this.optionForm.controls['options']).at(index).patchValue({ ChoiceCrctYN: "1" });
    }
    else {
      (<FormArray>this.optionForm.controls['options']).at(index).patchValue({ ChoiceCrctYN: "2" });
    }

  }
  saveQuestion() {
    debugger;
this.submitted = true;
if (this.form.valid) {
  var records = {"records":{
    "questn_bank":
    {    
    "QID":this.form.value.QID,     
    "QTxt":this.form.value.QTxt,
    "QImg":this.form.value.QImg,
    "EncodImgNam":this.form.value.EncodImgNam,
    "QSet":"",
    "ActvSts":"1",
    "SeqNo":"",
    "Subjct":this.form.value.Subjct,
    "QType":this.form.value.QType,
    "QDomain":this.form.value.QDomain,
    // "CreatedBy":this.teacherId,
    // "ApprovedBy":"",
    // "ApprvSts":"0",
    },
    "quest_detail":{
    "IndxID":this.form.value.IndxID,
    "QClass":this.form.value.QClass,
    "Subjct":this.form.value.Subjct,
    "QMedium":this.form.value.QMedium,
    "QLO":this.form.value.QLO,
    }
    }
    }
  this.schoolService.saveQuestions(records).subscribe(res => {
    if (res.dataStatus) {
      debugger;
    var questionId = res.quest_id;
    if(this.questionId == "") {
      const optionsFormArray = this.optionForm.controls.options as FormArray;
      while (optionsFormArray.length !== 0) {
        optionsFormArray.removeAt(0)
      }
      for (let i = 0; i <= 3; i++) {
        optionsFormArray.push(this.createItem(i,questionId));
      } 
    }
    this.isShowOption = true;
    this.alertService.success(res.message);
   
    }
});
  }
  else {
    this.alertService.error("Please Select All the Required Fields");
  }
}
  saveOptions() {
     this.submitted1 = true;
    if (this.optionForm.valid) {
 const checkCorrectOption  =   this.optionForm.value.options.findIndex(x => x.ChoiceCrctYN === true);
 if(checkCorrectOption != -1) {
      this.optionForm.value.options.map(l => { return {IndxID:l.IndxID,QID:l.QID,ChoiceID:l.ChoiceID,ChoiceTxt:l.ChoiceTxt,ChoiceImg:l.ChoiceImg, ChoiceCrctYN: l.ChoiceCrctYN == true ? "1": "2", ChoiceWght: l.ChoiceWght,EncodImgNam: l.EncodImgNam, ActvSts: l.ActvSts}; });
      var records = {"records":this.optionForm.value.options
        }
      this.schoolService.saveOptions(records).subscribe(res => {
        if (res.dataStatus) {
          this.isShowOption = true;
          if(this.questionId == "") {
          this.form.controls['QTxt'].setValue("");
          this.form.controls['QImg'].setValue("");
          this.form.controls['EncodImgNam'].setValue("");
          // this.pageStage = 1;
          const optionsFormArray = this.optionForm.controls.options as FormArray;
          while (optionsFormArray.length !== 0) {
            optionsFormArray.removeAt(0)
          }
        }
        else {
          this.pageStage = 1; 
          this.getQuestionData();
        }
          this.alertService.success(res.message);
          // this.getQuestionData();
          
        }
    });
      }
      else {
        this.alertService.error("Please Select Correct Option");
      }
    }
    else {
      this.alertService.error("Please Select All the Required Fields");
     
    }
  }
  editQuestion(id) {
    debugger;
    this.questionId = id;
    var records = {"records":{"QID":id}};
    this.schoolService.getQuestion(records).subscribe(res => {
      if (res.dataStatus) {
        this.pageStage = 2;
        this.getSubjects(res.quest_option.question.QClass,res.quest_option.question.QType);
        this.form.patchValue(res.quest_option.question);
        const optionsList = res.quest_option.options;
        const optionsFormArray = this.optionForm.controls.options as FormArray;
        if(optionsList.length > 0)
        { 
        while (optionsFormArray.length !== 0) {
          optionsFormArray.removeAt(0)
        }
       
          for (let i = 0; i < optionsList.length; i++) {
            debugger;
            var correctAnswer = optionsList[i].ChoiceCrctYN == "1" ? true : false;
            optionsFormArray.push(this.fb.group({
              IndxID: optionsList[i].IndxID,
              QID: optionsList[i].QID,
              ChoiceID: optionsList[i].ChoiceID,
              ChoiceTxt: optionsList[i].ChoiceTxt,
              ChoiceImg: optionsList[i].ChoiceImg,
              ChoiceCrctYN: correctAnswer,
              ChoiceWght: optionsList[i].ChoiceWght,
              EncodImgNam: optionsList[i].EncodImgNam,
              ActvSts:  optionsList[i].ActvSts
            }));
          }
        }
        else {
          while (optionsFormArray.length !== 0) {
            optionsFormArray.removeAt(0)
          }
          for (let i = 0; i <= 3; i++) {
            optionsFormArray.push(this.createItem(i,this.form.value.QID));
          } 
        }
        this.isShowOption = true;
      }
  });
  }
  goBack() {
    this.pageStage = 1;
    this.getQuestionData();
  }
  addQuestion() {
    this.pageStage = 2; 
    this.submitted = false;
    this.isShowOption = false;
    this.questionId = '';
this.form.reset();
this.optionForm.reset();
this.initialValidators();
  }
  clearDropDowns() {
    debugger;
    this.submitted = false;
    this.form.controls['QClass'].setValue("");
    this.form.controls['QMedium'].setValue("");
    this.form.controls['Subjct'].setValue("");
    
  }
  preview(id) {
    debugger;
    var records = {"records":{"QID":id}};
    this.schoolService.getQuestion(records).subscribe(res => {
      if (res.dataStatus) {
this.previewQuestionImg = res.quest_option.question['QImg'];
this.previewQuestionTxt = res.quest_option.question['QTxt'];
this.previewQuestionSubject = res.quest_option.question['QSubjct'];
this.previewOptions = res.quest_option.options;
this.showPreview = true;
if(res.quest_option.question['QImg']) {
 this.getUploadedFiles(res.quest_option.question['QImg'],1,0);
}
for (let i = 0; i < this.previewOptions.length; i++) {
  debugger;
  if(this.previewOptions[i].ChoiceImg) {
      this.getUploadedFiles(this.previewOptions[i].ChoiceImg,2,i);
    
  }
 
}

      }
    });
  }
  chooseStatus(event,qId) {
debugger;
var status = event.checked ? "1" : "0"
var records = {
        "records": {
                "questn_bank": {
                        "QID": qId,                        
                        "ActvSts": status
                }
        }
}
this.schoolService.deleteQuestions(records).subscribe(res => {
  if (res.dataStatus) {
    this.alertService.success(res.message);
this.getQuestionData();
  }
});
  }
  getUploadedFiles(filename,type,index) {
    debugger;
    var Index = index;
    var bucketName= "renewalapplicationemis";
    var filename = filename;
    let expiry:number = 1800;
    this.dashboardService.getUploadedFiles(bucketName,filename,expiry).subscribe((result) => {
      if (result) {
        debugger;
        if(type == 1) {
          this.previewQuestionImg = result.url;
        } 
        else {
          this.previewOptions[Index].ChoiceImg = result.url;
          // (<FormArray>this.optionForm.controls['options']).at(Index).patchValue({ ChoiceImg: result.url });
        }
        // this.messageService.add({severity:'success', summary: 'File Uploaded Successfully', detail:''});
      }
      else {
      // this.alertService.error();
      }
    });
  }
  removeImage(type,index) {
    if(type == 1) {
      this.form.controls['QImg'].setValue("");
      this.form.controls['EncodImgNam'].setValue("");
    }
    else {
      (<FormArray>this.optionForm.controls['options']).at(index).patchValue({ ChoiceImg: "" });
      (<FormArray>this.optionForm.controls['options']).at(index).patchValue({ EncodImgNam: "" });
    }
  }
  customSort(event: SortEvent) {
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
  approveReject(qid,action) {
    var records = {};
if(action == 'approve') {
records = {"records":{
  "questn_bank":
  {   
  "QID":qid,
  "ApprovedBy":this.teacherId,
  "ActvSts":"1",
  "ApprvSts":"1"
  }
  }
  }
}
else {
  records = {"records":{
    "questn_bank":
    {   
      "QID":qid,
      "ApprovedBy":this.teacherId,
    "ActvSts":"0",
    "ApprvSts":"2"
    }
    }
    }
}
    this.schoolService.approveReject(records).subscribe(res => {
      if (res.dataStatus) {
        this.alertService.success(res.message);
      }
      else {
        this.alertService.error(res.message);
      }
  });

}
}
