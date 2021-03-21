import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { debug } from 'util';

@Injectable()
export class ReportsService {
  getparttimeteachersalarystatereport(val: any, distrctID: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private dataService: DataService) { }
  studentverifiactionsaveAPI(data, refresh) {
    debugger;
    return this.dataService.post('/api/Update_App_verification', data);
  }
  UdiseVerification1_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification1', true);
  }
  UdiseVerification2_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification2', true);
  }
  UdiseVerification3_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification3', true);
  }
  UdiseVerification4_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification4', true);
  }
  UdiseVerification5_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification5', true);
  }
  UdiseVerification6_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification6', true);
  }
  UdiseVerification7_API(){
    debugger;
    return this.dataService.getData('/api/UdiseVerification7', true);
  }
  rteverifiactionlistAPI(reg_no) {
    debugger;
    return this.dataService.getData('/api/RTE_Verification_list?register_no=' + reg_no, true);
  }
  getdropdowdataforblock() {
    return this.dataService.getData('/api/crcBlocklist', true);
  }
  schoolverifiactionrHmAPI() {
    debugger;
    return this.dataService.post('/api/udiseValidatorDet', true);
  }
  SearchTeacherClassTaught(nature_appoint, school_type) {
    return this.dataService.getData('/api/TeachersByClassTaught/?school_type=' + school_type + '&appoinment_type=' + nature_appoint, true);
  }
  schoolverifiactionsaveAPI(data, refresh) {
    debugger;
    return this.dataService.post('/api/hmUdiseConf', data);
  }
  schoolverifiactionresultsAPI(schooltype, block_id) {
    debugger;
    return this.dataService.getData('/api/crcSchlList?school_type_id=' + schooltype + '&block_id=' + block_id, true);
  }
  schoolverifiactionresultAPI(schooltype) {
    debugger;
    return this.dataService.getData('/api/crcSchlList?school_type_id=' + schooltype, true);
  }
  getbeototalpendinglist(section) {
    debugger;
    return this.dataService.getData('/api/renewallist?section=' + section, true);
  }
  getdistrictwiseRenwalData(section, group, q) {
    debugger;
    return this.dataService.getData('/api/renewallist?section' + section + '&grp=' + group + '&q=' + q, true);
  }
  gettotalpendinglist() {
    return this.dataService.getData('/api/renewallist', true);
  }
  getProfileCompletedSchoolStatus(school_type, blockID) {
    debugger;
    return this.dataService.getData('/api/Profile_Completion_Schoolwise?school_type=' + school_type + '&block=' + blockID, true);
  }
  getProfileCompletedBlockState(distrctID, school_type) {
    debugger;
    return this.dataService.getData('/api/Profile_Completion_Block?dist=' + distrctID + '&school_type=' + school_type, true);
  }
  getProfileCompletedStatusState(school_type) {
    debugger;
    return this.dataService.getData('/api/Profile_Completion_State?school_type=' + school_type, true);
  }
  getMonitoringReportsList(distrctID, school_type) {
    debugger;
    return this.dataService.getData('/api/Profile_Completion?district_id=' + distrctID + '&school_type=' + school_type, true);
  }
  getXBoardExamResultsList(acyear, cls, udise, item) {
    debugger;
    return this.dataService.getData('/api/result?acyear=' + acyear + '&cls=' + cls + '&udise=' + udise + '&item=' + item, true);
  }

  getXRegularOtherResults(acyear, cls, udise, item, q) {
    debugger;
    return this.dataService.getData('/api/result?acyear=' + acyear + '&cls=' + cls + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
  }

  getNonTeachingList(schoolid,acyear) {
    debugger;
    return this.dataService.getData('/api/tch3?udise=' + schoolid + '&acyear=' + acyear, true);
  }

  getTeachingAPIList() {
    debugger;
    return this.dataService.getData('/api/incenfac', true);
  }

  getTeachersInstructorsAPI() {
    debugger;
    return this.dataService.getData('/api/Classlist?school_id=', true);
  }

  getVocationalEducaionListAPI(acyear, section, udise) {
    debugger;
    return this.dataService.getData('/api/vocational?udise=' + udise + '&acyear=' + acyear + '&section=' + section, true);
  }

  getEnrolmentCurrentAcademicAPI(acyear, section, udise) {
    debugger;
    return this.dataService.getData('/api/vocational?udise=' + udise + '&acyear=' + acyear + '&section=' + section, true);
  }

  getVocationalLabAPI() {
    debugger;
    return this.dataService.getData('/api/Classlist?school_id=', true);
  }

  getClassesConductedAPI() {
    debugger;
    return this.dataService.getData('/api/Classlist?school_id=', true);
  }



  getFacilitiesProvidedChildrenAPI() {
    debugger;
    return this.dataService.getData('/api/incenfac', true);
  }


  getEnrolmentMediumInstructionAPI(repId, acyear, udise) {
    debugger;
    return this.dataService.getData('/api/enroll?rep=' + repId + '&acyear=' + acyear + '&udise=' + udise, true);
  }

  getRegularStudentsresultListAPI() {
    debugger;
    return this.dataService.getData('/api/Classlist?school_id=', true);
  }

  getRepeatersByGradeAPI(repId, acyear, udise, item) {
    debugger;
    return this.dataService.getData('/api/enroll?rep=' + repId + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item, true);
  }

  getEnrollmentChildrenSplNeeds(repId, acyear, datasclservice) {
    return this.dataService.getData('/api/enroll?rep=' + repId + '&acyear=' + acyear + '&udise=' + datasclservice, true);
  }
  getenrollmentcategory(udise, acyear, item, rep) {
    debugger;
    return this.dataService.getData('/api/enroll42a?udise=' + udise + '&acyear=' + acyear + '&item=' + item + '&rep=' + rep, true);

  }
  getMinoritygroups(udise, acyear) {
    debugger;
    return this.dataService.getData('/api/enroll42b?udise=' + udise + '&acyear=' + acyear + '&item=2&rep=1', true);

  }
  getbeoassignment() {
    debugger;
    return this.dataService.getData('/api/beo_assignment', true);

  }
  getbeoassignmentsave(data) {
    debugger;
   // console.log('report service', data);
    return this.dataService.post('/api/beo_assignment_save', data);
  }
  getparttimeteacher(val) {
    debugger;
    return this.dataService.getData('/api/pt_staff_paided_list?month=' + val, true);

  }
  saveparttimeteacher(data) {
    return this.dataService.post('/api/pt_staff_paided_dtls_save', data);
  }
  getparttimeteachersalaryreport(val, distrctID) {
    debugger;
    // return this.dataService.getData('/api/pt_staff_paided_report/?district_id=' + distrctID + 'month='+val, true);
    return this.dataService.getData('/api/pt_staff_paided_report/?month=' + val + '&district=' + distrctID, true);

  }
  getverificationstatusmonitoring(school_type, distrctID) {
    debugger;
    return this.dataService.getData('/api/UdiseVerficationStatusReport/?school_type=' + school_type + '&district=' + distrctID, true);

  }
  getschoolwithoutdata(schooltype) {
    return this.dataService.getData('/api/' + schooltype , true);
  }
  // getschoolwithoutdatastate(schooltype) {
  //   return this.dataService.getData('/api/' + schooltype , true);
  // }
    getprovidenumber(udise, acyear, item, rep) {
        debugger;
        return this.dataService.getData('/api/enroll42c?udise=' + udise + '&acyear=' + acyear + '&item=' + item + '&rep=' + rep, true);

    }
    getTransgender(udise, acyear, item, rep) {
        debugger;
        return this.dataService.getData('/api/enroll42d?udise=' + udise + '&acyear=' + acyear + '&item=' + item + '&rep=' + rep, true);

    }

    getEnrollmentCurrentacademic(repId, acyear, datasclservice) {
      return this.dataService.getData('/api/enroll?rep=' + repId + '&acyear=' + acyear + '&udise=' + datasclservice, true);
    }

    getResultsOfTheGradeRegularAPI(cls, acyear, udise, item) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item, true);
    }

    getEnrollmentAcademicYear(repId, acyear, datasclservice, item) {
      return this.dataService.getData('/api/enroll?rep=' + repId + '&acyear=' + acyear + '&udise=' + datasclservice + '&item=' + item, true);
    }

    getEnrollmentAcademicYearMinority(repId, acyear, datasclservice, item) {
      return this.dataService.getData('/api/enroll?rep=' + repId + '&acyear=' + acyear + '&udise=' + datasclservice + '&item=' + item, true);
    }

    getExmResultGradeFive(cls, acyear, datasclservice) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&datasclservice=' + datasclservice, true);
    }

    getGrantsReceived(acyear, datasclservice) {
      return this.dataService.getData('/api/grants?&acyear=' + acyear + '&datasclservice=' + datasclservice, true);
    }

    getExmResultGradeEight(cls, acyear, datasclservice) {
      return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + datasclservice, true);
    }

    getResultsOfTheGradeRegularMarksAPI(cls, acyear, udise, item, q) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
    }

    getResultsOfTheGradeNonRegularAPI(cls, acyear, udise, item) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item, true);
    }

    getResultsOfTheGradeNonRegularMarksAPI(cls, acyear, udise, item, q) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
    }
    getclassXVocationalsubjectAPI(cls, acyear, udise, item, q) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
    }
    getclassXIIVocationalsubjectAPI(cls, acyear, udise, item, q) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
    }
    getnsofvocationalAPI(cls, acyear, udise, item, q) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
    }

    getSkillTrainingProvidersAPI(cls, acyear, udise, item, q) {
        debugger;
        return this.dataService.getData('/api/result?cls=' + cls + '&acyear=' + acyear + '&udise=' + udise + '&item=' + item + '&q=' + q, true);
    }

    applicationStatus(distrctID) {
      return this.dataService.getData('/api/RTE_ApplicationStatus/?district_id=' + distrctID, true);
    }

    typeWiseApplicationStatus(distrctID) {
      return this.dataService.getData('/api/RTE_TypeWiseApplication/?district_id=' + distrctID, true);
    }

    applicationStateStatus() {
      return this.dataService.getData('/api/RTE_ApplicationStatus', true);
    }

    typeWiseapplicationStateStatus() {
      return this.dataService.getData('/api/RTE_TypeWiseApplication', true);
    }

  getPartTeachersList() {
    return this.dataService.getData('/api/PartimeTeacherReport', true);
  }

  getPartTeachersDetails(distwise) {
    return this.dataService.getData('/api/PartimeTeacherReport/?district_id=' + distwise, true);
  }
  getPartTeachersBlockDetails(block) {
  
    return this.dataService.getData('/api/PartimeTeacherReport/?block_id=' + block, true);
  }

  StatisticsSchoolList() {
    return this.dataService.getData('/api/StatisticsSchoolCount?report_type=1', true);
  }

  StatisticsStudentList() {
    return this.dataService.getData('/api/StatisticsStudentCount?report_type=1', true);
  }
  StatisticsTeacherList() {
    return this.dataService.getData('/api/StatisticsTeacherCount?report_type=1', true);
  }

  StatisticsClassWiseList() {
    return this.dataService.getData('/api/StatisticsClassWiseCount?report_type=1', true);
  }


  managementSchoolList(schooltype) {
    return this.dataService.getData('/api/StatisticsSchoolCount?report_type=2&school_type=' + schooltype , true);
  }

  managementStudentList(schooltype) {
    return this.dataService.getData('/api/StatisticsStudentCount?report_type=2&school_type=' + schooltype , true);
  }

  managementTeacherList(schooltype) {
    return this.dataService.getData('/api/StatisticsTeacherCount?report_type=2&school_type=' + schooltype , true);
  }

  managementClassWiseList(schooltype) {
    return this.dataService.getData('/api/StatisticsClassWiseCount?report_type=2&school_type=' + schooltype , true);
  }

  BTTeachersList(lan, schoolid) {
    return this.dataService.getData('/api/BTTeachersBySubject?subject_id=' + lan + '&school_type_id=' + schoolid +'&report_id=1', true);
  }

  BTTeachersDetails(selt_lang , sch_typ_id, dist_id) {
    return this.dataService.getData('/api/BTTeachersBySubject/?subject_id='+ selt_lang +'&school_type_id='+ sch_typ_id + '&district_id=' + dist_id +'&report_id=1', true);
  }

  BlockBTTeachersDetails(selt_lang , sch_typ_id, block_id) {
    return this.dataService.getData('/api/BTTeachersBySubject/?subject_id='+ selt_lang +'&school_type_id='+ sch_typ_id + '&block_id=' + block_id +'&report_id=1', true);
  }


  staffFixationList(StaffFixation) {
    return this.dataService.getData('/api/StaffFixationRprt?report_id=' + StaffFixation , true);
  }
  getspecialcashsensitive(schooltype) {
    return this.dataService.getData('/api/cashIncentiveReport?school_type=' , true);
  }

  tranningDetailsList(traningDetails, userName) {
    return this.dataService.getData('/api/trainingdetailsreport?ay=' + traningDetails + '&id=' + userName, true);
  }
  getStateschoolmasterreport(dist) {
    return this.dataService.getData('/api/SchoolMaster/?district_id=' + dist, true);
  }
  getBlockschoolmasterreport(blck) {
    return this.dataService.getData('/api/SchoolMaster/?block_id=' + blck, true);
  }
  getsmcuploadreport()
  {
    return this.dataService.post('/api/ImgUploadRep', true);

  }
  getsmcuploadreport1(data)
  {
    return this.dataService.post('/api/ImgUploadRep', data);
  }
  BlockApi( ) {
    return this.dataService.getData('/api/blocklist',true);
  }
}
