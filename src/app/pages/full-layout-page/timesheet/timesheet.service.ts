import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Injectable()

export class TimesheetService {

  constructor(private dataService: DataService) {};
  subject_chaptrAPI(){
    debugger ;
    return this.dataService.getData('/api/DropdownSubjectsChapter' ,true);
  }

  get_approved_content_api(){
   debugger ;
    return this.dataService.getData('/api/GetElearnContent' ,true);
  }

  get_e_learn_content_api(usertype,Current_User_Type_Id_1){
    debugger ;
    return this.dataService.getData('/api/ELearnContentReport/?emis_usertype='+ usertype +'&emis_usertype1='+ Current_User_Type_Id_1,true);
  }

  get_approved_status_api(data , refresh){
    return this.dataService.post('/api/SaveElearnContent' ,data);
  }

  getdropdowdataforbank()
  {
    return this.dataService.getData('/api/SchlBankDropdownList' ,true);
  }

  getdropdowdataforemisbank(district_id)
  {
    debugger;
    return this.dataService.getData('/api/SchlBankDropdownList/?district_id=' + district_id ,true);
  }

  getdropdowdatafordistr()
  {
    return this.dataService.getData('/api/DistBankDropdownList' ,true);
  }

  districtloginsaveAPI(data , refresh){
    return this.dataService.post('/api/SaveSchoolBankDet',data);
  }

  taskdetailAPI()
  {
   debugger ;
   return this.dataService.getData('/api/taskDtlsList' ,true);
  }

  dailyupdatesaveAPI(data, refresh){
    debugger;
   return this.dataService.post('/api/taskDtlsSave' ,data);
  }

  allprojectsummeryAPI(){
   return this.dataService.getData('/api/AllProjectSummary' ,true);
  }

  activitywisereportAPI(){
   return this.dataService.getData('/api/ActivitywiseReport' ,true);
  }

  resourcenameAPI(){
   return this.dataService.getData('/api/ResourceDropdown' ,true);
  }

  selectedresourceAPI(from_date , to_date, resource_name) {
   debugger;
   return this.dataService.getData('/api/DatewiseReport?from_date=' + from_date + '&to_date=' + to_date +'&resource_id=' + resource_name , true);
  }

  getDropdownList(refresh) {
    return this.dataService.getData('/api/projDtlsList', true);
  }
  getDropdownClassWiseList(class_id) {
    
    return this.dataService.getData('/api/DropdownSubjectsChapter/?class='+class_id, true);
  }
  getDropdownSubjectWiseList(class_id,subject) {
   
    return this.dataService.getData('/api/DropdownSubjectsChapter/?class='+class_id+'&subject='+subject, true);
  }
  saveProjectCreation(data)
  {
    debugger;
    return this.dataService.post('/api/projDtlsSave',data); 
  }
  QuestionsetdropdownAPI() {
    debugger;
    return this.dataService.getData('/api/QuesBnkClassList',true);
}
QuestionsetdropdownsubjectAPI(class_id) {
  debugger;
  return this.dataService.getData('/api/QuesBankSubjectList/?class='+class_id, true);
}
getquestionssave(data, refresh) {
  debugger;
  return this.dataService.post('api/SaveQuestionBank',data);
}
}