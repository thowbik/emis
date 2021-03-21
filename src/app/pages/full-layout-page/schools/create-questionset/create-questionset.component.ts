import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { schoolsService } from '../schools.service';
import { AlertService } from 'src/services/alert.service';
import { StateDashboardService } from '../../statedashboard/dashboard.services';
@Component({
  selector: 'app-create-questionset',
  templateUrl: './create-questionset.component.html',
  styleUrls: ['./create-questionset.component.css']
})
export class CreateQuestionsetComponent implements OnInit {
  groupList: any[]=[];
  classList: any[]=[];
  mediumList: any[]=[];
  form: FormGroup;
  listform: FormGroup;
  data: { records: { Class: string; Subjct: string; Medium: string; }; };
  pageStage: number;
  QuesList: any[]=[];
  submitted1: boolean;
  dataHeader: { field: string; header: string; widthstyle: string; }[];
  questionId: any;
  questionSetName: string;
  multipleQuestions: any[]=[];
  questionsData:any[]=[];
  showPreview: boolean;
  headerTitle:string = "Preview";
  dataHeader1: any[]=[];
  QusetionCount: number;
  previewQuestionImg: any;
  previewQuestionSubject: any;
  previewOptions: any[]=[];
  previewQuestionTxt: any;
  constructor(private schoolService : schoolsService,private alertService :AlertService,
    private fb: FormBuilder,
    private dashboardService: StateDashboardService) { }

  ngOnInit() {
    this.initialValidators();
    this.getGroups();  
    this.getData();
    this.dataHeader = [
      { field: 'SetID', header: 'Question Set Id',widthstyle: '10em' },
      { field: 'SetName', header: 'Exam Title',widthstyle: '10em' },
      { field: 'SetQue', header: 'Question',widthstyle: '18em' },
      { field: 'SetCls', header: 'Class',widthstyle: '5em' },
      { field: 'SetMed', header: 'Medium',widthstyle: '7em'},
      { field: 'SetSub', header: 'Subject',widthstyle: '7em' },
      { field: 'SetTime', header: 'Exam Timing',widthstyle: '5em' },
      { field: 'SetCount', header: 'Total Question Count',widthstyle: '8em' },
      { field: '', header: 'Action',widthstyle: '8em' },
      ]  
      this.dataHeader1 = [
      { field: 'QID', header: 'Question Id',widthstyle: '8em' },
      { field: 'QText', header: 'Question',widthstyle: '18em' },
      { field: 'QClass', header: 'Class',widthstyle: '6em' },
      { field: 'QMed', header: 'Medium',widthstyle: '10em'},
      { field: 'QSubjct', header: 'Subject',widthstyle: '10em' }];
  }
  initialValidators() {
    this.listform = this.fb.group({
      SetCls  : new FormControl('', Validators.required), 
      SetSub  : new FormControl('', Validators.required), 
      SetMed  : new FormControl('', Validators.required), 
    });
    this.form = this.fb.group({
      SetID: new FormControl('', null),  
      SetName: new FormControl('', Validators.required),  
      SetCls  : new FormControl('', Validators.required), 
      SetSub  : new FormControl('', Validators.required), 
      SetMed  : new FormControl('', Validators.required), 
      SetTime  : new FormControl('', Validators.required), 
      SetCount  : new FormControl('',  Validators.required), 
      SetQue  : new FormControl('',  Validators.required), 
      SetStatus  : new FormControl('',  null)  
    });

    // this.optionForm = this.fb.group({
    //   options: this.fb.array([]),  
    // });
  }
  getData() {
    this.pageStage =1;
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
    }

  save(){
    debugger;
    if(this.form.valid) {
      debugger;
      this.submitted1 = true;
      let data = {"records":
                   {   
                     "SetID":this.form.value.SetID,          
                     "SetName":this.form.value.SetName,
                     "SetCls":this.form.value.SetCls,
                     "SetSub":this.form.value.SetSub,
                     "SetMed":this.form.value.SetMed,
                     "SetTime":this.form.value.SetTime,
                     "SetCount":this.form.value.SetCount,
                     "SetQue":this.form.value.SetQue,
                     "SetStatus":"0"
                   }
                 };
      this.schoolService.QueSetMapping(data).subscribe((res) => {
        if(res){
         this.alertService.success("Data Save Successfully");
         this.pageStage = 1;
        //  this.getquestionList();
        }
      });
    }
else {
  this.alertService.error("Please Fill all the Required Fields");
}
   }
   update(){
    this.submitted1 = true;
     let data = {"records":
                  {   
                    "SetID":this.form.value.SetID,          
                    "SetName":this.form.value.SetName,
                    "SetCls":this.form.value.SetCls,
                    "SetSub":this.form.value.SetSub,
                    "SetMed":this.form.value.SetMed,
                    "SetTime":this.form.value.SetTime,
                    "SetCount":this.form.value.SetCount,
                    "SetQue":this.form.value.SetQue,
                    "SetStatus":"0"
                  }
                };
     this.schoolService.QueSetMapping(data).subscribe((res) => {
       if(res){
        this.alertService.success("Data Save Successfully");
        this.pageStage = 1;
        this.getquestionList();
       }
     });
   }
  getGroups() {
    this.schoolService.getGroupFromJson().subscribe(res => {
      this.groupList = res['group'];
    });
  }
  getquestionList() {
    debugger;
    this.QuesList =[];
    this.data=  {"records":
                  {   
                  "Class":this.listform.value.SetCls,          
                  "Subjct":this.listform.value.SetSub,      
                  "Medium":this.listform.value.SetMed,      
                  }
                }
    this.schoolService.getQusList(this.data).subscribe(res => {
      debugger;
      this.QuesList = res.quest_list;
    });
  }

  CreateQuestion(){
    this.pageStage = 2; 
    // this.submitted = false;
    // this.isShowOption = false;
    this.questionId = '';
this.form.reset();
this.initialValidators();
  }

  Cancel() {
    this.pageStage =1;
    this.questionSetName = "";
    this.getquestionList();
  }

  editQuestion(id,name) {
    this.questionId = id;
    this.getquestionList();
    var records = {"records":{"QsetID":id}}
    this.schoolService.getQusID(records).subscribe(res => {
      if (res.dataStatus) {
        this.questionSetName = name;
        this.pageStage = 2;
        this.form.patchValue(res.quest_list[0]);
        this.calculateQuestionSet(this.form.value.SetQue);
        this.getQuestions(res.quest_list[0].SetID);
      }
    });
  }
  getQuestions(qsetId) {
    this.questionsData =[];
    this.multipleQuestions=[];  
    let records = {"records":{"QsetID":qsetId}}
    this.schoolService.questionList(qsetId).subscribe(data => {
      debugger;
      if (data.result && data.result.length > 0) {
        this.multipleQuestions = data.result;
        this.QusetionCount = 0;
        debugger;
        for (var i = 0; i < this.multipleQuestions.length; i++) {
          if(this.multipleQuestions[i].quest && this.multipleQuestions[i].quest.length > 0) {
            this.questionsData.push({
              "QID":this.multipleQuestions[i].quest[0].q_id,
              "QText":this.multipleQuestions[i].quest[0].q_text,
              "QSubjct":this.multipleQuestions[i].quest[0].subject, 
              "QMed":this.listform.value.SetMed,
              "QClass":this.listform.value.SetCls
                        });
          }

        }
      }
        /*Suffeling the question by subjects */
    });
  }
  goBack() {
    this.pageStage = 1;
    this.questionSetName = "";
  }
  // preview(id) {
  //   this.showPreview = true;
  // }
  preview(id) {
    this.showPreview = true;
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
  previous() {
    this.QusetionCount--;
  }
  next() {
    this.QusetionCount++;
  }
  calculateQuestionSet(value) {
const totalQuestions = value.split(',');
this.form.controls['SetCount'].setValue(totalQuestions.length);
  }
}
