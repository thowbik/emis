import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionService } from 'src/services/usersession.service';
import { CwsnPreviousAcademicYearComponent } from '../reports/cwsn-previous-academic-year/cwsn-previous-academic-year.component';
import { StringDecoder } from 'string_decoder';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { Observable } from 'rxjs';
// import { ClassList } from 'src/models/classlist';
// import { StudentData } from 'src/models/studentdata';
// import { bloodgroupjson,religionjson,communityjson,studentregistration, castejson } from 'src/models/student-registration';

@Injectable()
export class schoolsService {
  activate = new Subject<any>();


    constructor(private dataService: DataService,private http : HttpClient) {}
    getfundsdetails(sch_id)
    {
      return this.dataService.getData('/api/schprof?sch_id='+sch_id, true)
    }

    // all_class_API_1(sch_ky_id){
    //   debugger;
    //   return this.dataService.getData('/api/schoolWiseClassandSection?school_id=' + sch_ky_id,true);
    // }

    // all_section_API_1(data, refresh){
    //   return this.dataService.post('/api/classWiseSection',data);
    // }

    student_list_API_1(sch_id){
      return this.dataService.getData('/api/kgbvcwsnClassSection?school_id=' + sch_id ,true);
    }

    current_stud_detail(student_id){
      debugger;
      return this.dataService.getData('/api/studCOVIDSchlMap2?student_id=' + student_id ,true);
    }

    all_district_API_1(){
      debugger;
      return this.dataService.getData('/api/alldistrictlist',true);
    }

    all_school_dist_1(dist_id){
      debugger;
      return this.dataService.getData('/api/distGovtschools?district_id=' + dist_id ,true);
    }

    get_correctiondataapi(type){
      return this.dataService.getData('/api/StudentsTeacherData/?report_id='+type, true)
    }

    getBasicsList(data) {
      debugger;
      // return this.dataService.getData('/api/schoolBasic?school_id='+data,true);
      return this.dataService.getData('/api/schprof?sch_id=' + data, true);
    }
    getstdCodeJSON() {
      return this.dataService.getJSON('../../../assets/json/stdcode.json');
    }

  getschoolclasses(data, refresh) {
    // console.log(data);
    return this.dataService.getData('/api/Classlist?school_id=' + data, true);
  }

  mapping_details_save_API_1(data, refresh){
    debugger;
    return this.dataService.post('/api/studCOVIDSchlMapUpdation' ,data);
  }
  updateTrackingDetails(data) {
    return this.dataService.post('/api/UpdateTrackingDetails',data);
  }

  getteacherlist(){
    return this.dataService.getData('/api/teacherlist', true);
  }
  getKGBVStudentDetails(studentId) {
    return this.dataService.getData('/api/StudentDetailsTraked/?student_id='+studentId, true);
  }
  getAllStudentsKGBV(){
    return this.dataService.getData('/api/kgbvcwsnStudMappedSchl', true); 
  }
  getclasslist(data, refresh) {
      return this.dataService.getData('/api/GetClass_Details?school_id=' + data, true);
   }

   getmaster(data, refresh) {
    return this.dataService.post('/api/GetMaster_Timetable', data);
   }

  getmasterdata(data, refresh) {
   return this.dataService.post('/api/GetMaster_Timetabledata', data);
  }
  
  getNocPdfdata(data, refresh) {
    return this.dataService.post('/api/ordercpydata', data);
  }
  

  addmastertimetableDetails(data, refresh) {
   // console.log(data);
    return this.dataService.post('/api/SaveMaster_Timatable', data);
  }
  

  getweeklydata(data, refresh) {
    return this.dataService.post('/api/GetWeek_Timetabledata', data);
  }

  getlastweekdata(data, refresh) {
    return this.dataService.post('/api/GetLasteek_Timetabledata', data);
  }

  addweeklytimetableDetails(data, refresh) {
    return this.dataService.post('/api/SaveWeek_Timatable', data);
  }

  gettoday(data, refresh) {
    return this.dataService.getData('/api/GetToday_Timetable?school_id=' + data, true);
  }

  getPdfReport(data) {
    return this.dataService.getData('/api/StuTeachNonTeachStrngth?sch_id=' + data, true);
  }

  gettodayteacherclasses(data, refresh) {
    return this.dataService.getData('/api/GetToday_Teacherclasses?school_id=' + data, true);
  }


  savetodaytimetableDetails(data,refresh){
   return this.dataService.post('/api/SaveToday_Timetable',data);
  }
 
  getteacherslist(data, refresh) {
    return this.dataService.getData('/api/GetTeacher_List?school_id=' + data, true);
  }


  getschoolDetails(data, refresh) {
    return this.dataService.getData('/api/schprof?sch_id=' + data,true);
  }
  getMediumDetails(data, refresh) {
    return this.dataService.getData('/api/schlProfLangMedi?sch_id=' + data,true);
  }

  getweeklyteacherdata(data, refresh) {
    return this.dataService.post('/api/GetWeek_Teacherdata', data);
  }


deleteClassSection(data, refresh) {
  return this.dataService.post('/api/DeleteClass', data);
}
addClassSection(data, refresh) {
  return this.dataService.post('/api/AddClass', data);
}
editClassSection(data, refresh) {
  return this.dataService.post('/api/EditClass', data);
}
getclassStudyingJSON() {
  return this.dataService.getJSON('../../../assets/json/classstudying.json');
}

getschoolcountData() {
  return this.dataService.getData('/api/stateschoolcount',true);
}

getSchoolDetailsData(id){
  return this.dataService.getData('/api/schprof?sch_id='+id, true)
}
getSchoolinventoryDetails(id)
{
  return this.dataService.getData('/api/schprof?sch_id='+id, true)

}
getIFSCCodeDetails(ifsc){
  return this.dataService.getData('/api/ifsc?ifsc='+ifsc, true);
  }
  //for school Need Csr
  getCsrNeeds() {
    return this.dataService.post('/api/AddNewNeedSchoolRequirements',true);
  }

  getCsrneedsList() {
    return this.dataService.getData('/api/EmisSchoolNeedsCsr', true);
  }
  getEditCsrList(data) {
    return this.dataService.getData('/api/EmisSchoolNeedsCsrById/?id='+data, true);
  }
  SaveCsrNeedDetails(data) {
    
    return this.dataService.post('/api/SaveSchoolRequirements',data);
  }
  UpdatecsrNeedDetails(data) {
    return this.dataService.post('/api/PutSchoolsRequirements', data);
  }
  DeleteCsrneed(id) {
    return this.dataService.getData('/api/EmisDelSchoolCsr?id=' + id, true)
  }
  //END

  //FOR CSR REQ UPDATES
  getReqDetUpdates(req_id, school_id) {
    return this.dataService.getData('/api/LoadSchoolRequirementWiseDetails?req_id=' + req_id+'&&school_id='+school_id, true)
  }
  SaveCsrReq(data) {
    return this.dataService.post('/api/SaveSchoolRequirementWiseDetails',data);
  }
  DeleteCsrUpdateDetails(id) {
    return this.dataService.getData('/api/DeleteCsrUpdateDetails?id=' + id, true)
  }
  

getUdisePdf(sch_id) {
  debugger;
  return this.dataService.getData('/api/schlproPDF?school_id=' + sch_id,true);
}

getcbscPdf(app_id){
  debugger;
  return this.dataService.getData('/api/NOCwithCBSEDtls?app_id=' + app_id,true);
}

getSchoolProfileData(params) {
  return this.dataService.getData('/api/SchoolProfileList'+params,true);
}
getStateSchoolProfileData(id) {
  return this.dataService.getData('/api/SchoolProfileApprovalList?schoolcat='+id,true);
}
getSelecteddisctSchool(id) {
  return this.dataService.getData('/api/SchoolProfileApprovalListDW?schoolcat=&district_id='+id,true);
}
SchoolProfileApproval(data) {
  debugger;
  return this.dataService.post('/api/SchoolProfileApproval',data);
}
SchoolProfileRejection(data) {
  return this.dataService.post('/api/SchoolProfileRejection',data);
}
schoolProfileHistoryDetails(school){
  return this.dataService.getData('/api/SchoolProfileHistoryDtls?school_id='+school,true);
}


updateSchoolProfileData(data,refresh) {
  return this.dataService.post('/api/UpdateSchoolprofile',data);
}

getstudentdata(sch_id) {
  debugger;
  return this.dataService.getData('/api/studentSummaryUpto10th?school_id=' + sch_id,true);
}
gethrschool(sch_id) {
  debugger;
  return this.dataService.getData('/api/studentSummaryHrSec?school_id=' + sch_id,true);
}
schoolcbscformsaveApi(data, refresh) {
  debugger;
  return this.dataService.post('/api/NOCwithCBSESaveSchoolDtls', data);
}
schoolcbscdocssaveApi(data, refresh) {
  debugger;
  return this.dataService.post('/api/NOCwithCBSESaveDocDtls', data);
}
Update_teacher_transfer(data)
{
  return this.dataService.post('/api/stftransfer', data);
}
getnewschoolData() {
  return this.dataService.post('/api/NPSchl',true);
}

getDataforNOC(distId,schoolId) {
  return this.dataService.getData('/api/NOCwithCBSESchoolWiseDtls?dist_id='+distId+'&school_id='+schoolId,true);
}

getnocceodeatailssave(data, refresh) {
  debugger;
  return this.dataService.post('/api/NOCwithCBSESaveChecklistDtls',data);
}

get_school_name(udise_id) {
  debugger;
  return this.dataService.getData('/api/GetHabitation?localbody_id=' + udise_id,true);
}

//Fit India  Form

getFitIndiaDetails(emis_id,schlid,month,year)
{
  return this.dataService.getData('/api/GetFitIndiaDet/?emis_user_id='+emis_id+'&school_id='+schlid+'&month='+month+'&year='+year,true)
}
get_SaveApi(data)
{
 return this.dataService.post('/api/SaveFitIndia',data);
}

//Fit INDIA Report
get_fitIndia_StateReport(emis_id,month,year){
  return this.dataService.getData('/api/FitIndiaReport/?emis_user_id='+emis_id+'&month='+month+'&year='+year,true);
}
get_fitIndia_DistrictReport(emis_id,month,year,distid){
  return this.dataService.getData('/api/FitIndiaReport/?emis_user_id='+emis_id+'&month='+month+'&year='+year+'&district_id='+distid,true);
}
get_fitIndia_BlockReport(emis_id,month,year,blkid){
  return this.dataService.getData('/api/FitIndiaReport/?emis_user_id='+emis_id+'&month='+month+'&year='+year+'&block_id='+blkid,true);
}
//SchoolNameList
getSchoolClassDetails(schlId){
  return this.dataService.getData('/api/schoolWiseClassandSection?school_id='+schlId,true);
}
getSchoolSectionDetails(data){
 // return this.dataService.getData('/api/GetSchoolSectionDetails/?school_id='+schlId+'&class_id='+classid,true)
  return this.dataService.post('/api/classWiseSection',data);

}

getSchoolMediumList(classid,section,schlId){
   return this.dataService.getData('/api/GetSectionMediumDetails/?class_id='+classid+'&section='+section+'&school_id='+schlId,true)
}

getStudentNameList(classid,section,schlId){
  return this.dataService.getData('/api/GetListPromoteStudents/?class_studying_id='+classid+'&class_section='+section+'&school_id='+schlId,true);
}

PromoteStudentList(data){
  return this.dataService.post('/api/UpdatePromoteStudents',data);
}

saveSchoolDetails(data)
{
  debugger;
  return this.dataService.post('/api/editschoprof',data); 
}

// Edit school Profile by Priya
getEditSchoolProfileAllData() {
  return this.dataService.getData('/api/schoolprofilelist',true);
}
getEditSchoolProfileData(school_id) {
  debugger
  return this.dataService.getData('/api/schoolprofilelist?school_id='+ school_id,true);
}
getEditDropdownData(district_id) {
  return this.dataService.getData('/api/SchoolProfileList?district_id=' + district_id,true);
}
gethabitationlist(id) {
  return this.dataService.getData('/api/GetHabitation?localbody_id='+id,true);
}
saveEditSchoolDetails(data)
{
  debugger;
  return this.dataService.post('/api/editschoolprofile',data); 
}
  getstudenttransferdata(schoolid) {
 return this.dataService.getData('/api/SchoolClassMedium1/?school_id='+schoolid , true);
} 

getfreshstudentdata(schoolid) {
  return this.dataService.getData('/api/SchoolClassMedium/?school_id='+schoolid , true);
 } 

 getRenewalPdfDATA(schoolid){
  return this.dataService.getData('/api/renewalpdfview?school_id='+schoolid, true);
}

//students-raise-request
getreqpendingStd()
{
  debugger;
 return this.dataService.getData('/api/ReqPending',true); 
}
Deletedata(data)
{
  return this.dataService.post('/api/ReqUpdate',data)
}

getreqraiseStd(schlId)
{
return this.dataService.getData('/api/ReqRaised?req_id='+schlId,true);
}
//selfdefence
getStudentList(data)
{
  return this.dataService.post('/api/classWiseTaggingStudentList',data);
}
getSchoolListData()
{
  //return this.dataService.getData('/api/GetSchoolListTrainer',true);
}
getSchoolTrainerInsertData(data)
{
  return this.dataService.post('/api/SlfDfncTrainerAllotmnt',data);
}
getSchoolTrainerUpdateData(data)
{
  return this.dataService.post('/api/SlfDfncTrainerAllotmnt',data);
}
getSchoolTrainerDeleteData(data)
{
  return this.dataService.post('/api/SlfDfncTrainerAllotmnt',data);
}
getTrainerListData(distid)
{
  return this.dataService.getData('/api/GetTrainerList?DistID='+distid,true);
}
getTrainerListInsert(data)
{
  return this.dataService.post('/api/TrainerCreateUpdateDel',data);
}
getTrainerListUpdate(data)
{
  return this.dataService.post('/api/TrainerCreateUpdateDel',data);
}
getTrainerListDelete(data)
{
  return this.dataService.post('/api/TrainerCreateUpdateDel',data);

}
getStudentAttendanceList(data)
{
  return this.dataService.post('/api/GetSelfDefnceStudAttndnce',data);
}
getHelperlist()
{
  return this.dataService.getData('/api/teacherlist',true);
}
// SchoolManagementMaintanance
Schoolmgmtsave(data) {
  return this.dataService.post('/api/MaintnceInsrtUpdtDlt',data);
}
// SchoolManagementMaintanance
Schoolmgmtdeletedata(data) {
  debugger;
  return this.dataService.post('/api/MaintnceInsrtUpdtDlt',data);
}
// 

// GetAPifromschoolmaintanacetable1
schoolmaintaingetstudentdata(SchoolId){
  debugger;
  return this.dataService.getData('/api/MaintnceGet?school_id='+SchoolId,true); 
}
// table2managanementstatus
schoolmaintaingetstudentdatastatus(maintainid){
  debugger;
  return this.dataService.getData('/api/MaintnceStatusGet?id='+maintainid,true); 
}
// SchoolManagementMaintanance
Schoolmgmtlistsave(data) {
  return this.dataService.post('/api/MaintnceStatusInsrtUpdtDlt',data);
}
// changesinapi
// patchthedatain3rdform 
schoolmaintaingetstudentpatch(id) {
  return this.dataService.getData('/api/MaintnceStatusGet?maintnce_id='+id,true); 
}
// SchoolManagementMaintanancestatusdelete
Schoolmgmtdeletedatastatus(data) {
  return this.dataService.post('/api/MaintnceStatusInsrtUpdtDlt',data);
}
// Dropdownlist
getmaintanacetype()
{
  debugger;
  return this.dataService.getData('/api/MaintnceTypeGet',true);
}
// GetEbBliidata
Ebbillgetdata(SchoolId){
  debugger;
  return this.dataService.getData('/api/BilingDataGet?SchlID='+SchoolId,true); 
}
// GetEbBliidata
Ebbillsavedata(data){
  debugger;
  return this.dataService.post('/api/BillingInsrtUpdtDel',data); 
}
EBBilldeletedata(data) {
  debugger;
  return this.dataService.post('/api/BillingInsrtUpdtDel',data);
}
// EBBillpatch the data
Ebblillpatchthedata(indexid){
  debugger;
  return this.dataService.getData('/api/BilingDataGet?id='+indexid,true); 
}
//student-banking-details
getStudentclasslist(schoolId)
{
  return this.dataService.getData('/api/GetClass_Details?school_id='+schoolId,true);
  
}

getStudentclasslistUsingCattyId(schoolId,cattyid)
{
  return this.dataService.getData('/api/GetClass_Details?school_id='+schoolId+'&catty_id='+cattyid,true);
  
}
getStudentSectionlist(data)
{
  return this.dataService.post('/api/classWiseSection',data);

}
getStudentlist(data)
{
  // return this.dataService.post('/api/StudDetails',data);
  return this.dataService.post('/api/Studlist',data);
}
getStudentBanklist(data)
{
  return this.dataService.post('/api/StudentBankDetails',data);
}
getStdCurrentData(StudentId)
{
  return this.dataService.getData('/api/GetStipendHistry?studID='+StudentId,true)
}
getStdLastTransactionData(StudentId)
{
  return this.dataService.getData('/api/GetStipendDet?studID='+StudentId,true)
}
get_ifsc_data(ifsc_code)
{
  return this.dataService.getData('/api/RetrieveIfscBankdet/?ifsc_code=' + ifsc_code ,true);
}
saveFormDatas(data)
  {
    return this.dataService.post('/api/StipendInsrtUpdtDlt',data);
  }
saveEditDatas(data)
  {
    return this.dataService.post('/api/StipendInsrtUpdtDlt',data);
  }

Delete_data(data)
{
  return this.dataService.post('/api/StipendInsrtUpdtDlt',data);
}
saveAccountData(data){
  return this.dataService.post('/api/AccntDetailsInstUpdDlt',data);
}
saveEditFormDatas(data){
  return this.dataService.post('/api/AccntDetailsInstUpdDlt',data);
}
DeleteAcc_data(data)
{
  return this.dataService.post('/api/AccntDetailsInstUpdDlt',data);
}
saveGrants(data)  {
  return this.dataService.post('/api/ImgUpload',data);
}
getGrants(schoolId) {
  return this.dataService.getData('/api/GetImg/?SchlID='+schoolId ,true);
}
//health-profile
getStudentcovid(schoolId)
{
  return this.dataService.getData('/api/GetClass_Details_schools?school_id='+schoolId,true);
  
}
getStudentwiselist(data)
{
  return this.dataService.post('/api/StudDetails',data);
  
}
savestudentdata(data)
{
  return this.dataService.post('/api/HealthProfleCrud',data);
  
}

getHealthProfileData(data) {
  return this.dataService.post('/api/GetHealthprofStudDetls',data);
}

getDelete(IndxID)
{
  return this.dataService.getData('/api/GetStudHealthDetl?IndxID='+IndxID,true);
  
}
getTcdetails(data)
{
  return this.dataService.post('/api/StudentTCDetails',data);
  
}


getCompetition(data)
{
  return this.dataService.post('/api/StudCmptitnStudList',data);
 
}


getStudentParticipateCom(data)
{
  return this.dataService.post('/api/StudCompetitionCUD',data);
 
}
saveQuestions(data) {
  return this.dataService.post('/api/LOEQuestnCUD',data);
}
saveOptions(data) {
  return this.dataService.post('/api/LOEChoiceCUD',data);
}
getAllQuestions(data) {
  return this.dataService.post('/api/LOEQuestnList',data);
}
getQuestion(data) {
  return this.dataService.post('/api/LOEQuestnDetls',data);
}
deleteQuestions(data) {
  return this.dataService.post('/api/LOEQuestnDel',data);
}
approveReject(data) {
  return this.dataService.post('/api/LOEQuesChoicAction',data);
}
getteachersassessmentreport(schoolId,data){
  return this.dataService.getDataSample('/ExamQ/' + schoolId + '?classId=' + data.classId + '&mediumId=' + data.mediumId+ '&groupId='+data.groupId, true )
}
getgruopusingclass(data) {
  debugger
  return this.dataService.post('/api/SchlDetlsByClasswise',data);
}
Savesclbankdetails(data) {
  debugger
  return this.dataService.post('/api/SaveSchlBankDetls',data);
}
Getsclbankdetails(data) {
  debugger
  return this.dataService.post('/api/GetSchlBankDetls',data);
}
getGroupFromJson() {
  debugger;
  return this.dataService.getJSON('../../../assets/json/groupv9.json');
}

getQusList(data) {
  return this.dataService.post('/api/LOEQuestSetList',data);
}

QueSetMapping(data){
  return this.dataService.post('/api/LOEQuestSetCUD',data);
}
getQusID(data){
  return this.dataService.post('/api/LOEQuestSetList',data);
}
saveitprofile(data){
  debugger;
  return this.dataService.post('/api/StudITProfCUD',data);
}
getitprofile(data){
  debugger;
  return this.dataService.post('/api/StudITProfGet',data);
}
questionList(questionSetId) {
  return this.dataService.getData('/api/QuestnSet?QsetID='+questionSetId,true);
}
getSylabusDetails(data){
  debugger;
  return this.dataService.post('/api/NQSFSylabsStsDetls',data);
}

}
