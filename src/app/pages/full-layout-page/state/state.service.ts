import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { HttpClient } from '@angular/common/http';
import { concatAll } from 'rxjs/operators';
import { TeachersRoutingModule } from '../teachers/teachers-routing.module';
@Injectable()
export class StateService {
  getSchoolDetails(dataid: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private dataService: DataService) {
  }
  /* Schools API */
  // getMasterTimetableDropdown(data) {
  //   return this.dataService.getData('/api/SchoolwiseClassTimetableReportDist?emis_loggedin=' + data, false);
  //  }
  getMasterTimetableDropdown(data) {
    return this.dataService.post('/api/SchoolwiseClassTimetableReportDist', { records: data });
  }
  /*  Report API Start    */
  getDistrictWiseSectionAidedDetails() {
    return this.dataService.getData('/api/State/district_schoolwise_class_section', true);
  }
  getblockwiseWiseSectionAidedDetails(districtwise) {
    return this.dataService.getData('/api/SchoolWiseClassSection?district_id=' + districtwise, true);
  }
  getschoolwiseSectionAidedDetails(schoolid) {
    console.log(schoolid);
    return this.dataService.getData('/api/SchoolClassSection?school_id=' + schoolid, true);
  }
  getAttendancelist(data) {
    return this.dataService.getData('/api/GetAttendanceDetails?date=' + data, false);
  }
  getAttendanceDistReport(dist, date) {

    return this.dataService.getData('/api/GetAttendanceDetailsDistrict?dist=' + dist + '&date=' + date, false);
  }



  getAttendanceStudentBlockReport(dist, date) {
    return this.dataService.getData('/api/GetStudentsAttendanceDetailsBlock?block=' + dist + '&date=' + date, false);
  }
  getAttendanceStaffBlockReport(dist, date) {
    return this.dataService.getData('/api/GetTeacherAttendanceDetailsBlock?block=' + dist + '&date=' + date, false);
  }
  getStudentAttendaceDistMark(dist, col_name, date) {
    return this.dataService.getData('/api/GetStudentAttendanceSearch?dist=' + dist + '&col_name=' + col_name + '&date=' + date, false);
  }
  getStudentAttendaceBlockMark(block, col_name, date) {
    return this.dataService.getData('/api/GetStudentAttendanceSearch?block=' + block + '&col_name=' + col_name + '&date=' + date, false);
  }
  getStaffAttendaceDistMark(dist, col_name, date) {
    return this.dataService.getData('/api/GetTeacherAttendanceSearch?dist=' + dist + '&col_name=' + col_name + '&date=' + date, false);
  }
  getStaffAttendaceBlockMark(block, col_name, date) {
    return this.dataService.getData('/api/GetTeacherAttendanceSearch?block=' + block + '&col_name=' + col_name + '&date=' + date, false);
  }
  getStudentAttendaceBlockCate(cate, col_name, date, dist) {
    debugger;
    return this.dataService.getData('/api/GetStudentAttendanceSearch?cate=' + cate + '&col_name=' + col_name + '&date=' + date + '&dist=' + dist, false);
  }
  getAttendanceByStaff(school) {
    return this.dataService.getData('/api/GetTeacherAttendanceClasswise?school=' + school, false);
  }
  getAttendanceByClass(school, date) {
    return this.dataService.getData('/api/GetStudentsAttendanceClasswise?school=' + school + '&date=' + date, false);
  }
  getAttendanceBySection(school, class1, date) {
    return this.dataService.getData('/api/GetStudentsAttendanceSectionwise?school=' + school + '&class=' + class1 + '&date=' + date, false);
  }
  /*   end  */
  /*   karthick  Report start  */
  CommonDist(refresh) {
    return this.dataService.getData('/api/Common_pool', refresh);
  }
  CommonDistTransfer(refresh) {
    return this.dataService.getData('/api/CP_transfer_reason', refresh);
  }
  getlaptopdistrlist(data) {
    return this.dataService.getData('/api/stlaptopdistrlist', data);
  }
  getlaptopDistributionDistrList(district_id) {
    return this.dataService.getData('/api/stlaptopdistrdistwiselist?dist=' +district_id, true);
  }
  getlaptopDistributionSclList(school_id) {
    return this.dataService.getData('/api/stlaptopdistrschwiselist?sch=' + school_id, true);
  }
  getcommonpoolblocktransfer(distname) {
    return this.dataService.post('/api/CP_transfer_reason_block', { records: { dist_id: distname.dist_id, block_id: distname.block_id } });
  }
  // tslint:disable-next-line:variable-name
  getCommonPoolBlockdata(block_id, dist_id, block_name) {
    return this.dataService.post('/api/Common_pool_block', { records: block_id, dist_id, block_name });
  }
  getAadharList(data) {
    return this.dataService.getData('/api/AadharEnrolementdetails', data);
  }
  getRankSheet(data) {
    return this.dataService.getData('/api/ranksheet', data);
  }

  getMarkReport(data) {
    return this.dataService.getData('/api/indicators?indicators=1', data);
  }

  getMarkSheetReport(distname) {
    return this.dataService.getData('/api/indicators?indicators=1&grp=EDU&q=' + distname.edu_dist_id, true);
  }
  getAadharDetails(id) {
    return this.dataService.getData('/api/AadharSchoolDistrictBasedCount?district_id=' + id, true);
  }
  getBlockAadharDetails(blockid) {
    return this.dataService.getData('/api/AadharSchoolDistrictBasedCount?block_id=' + blockid, true);
  }
  getStudentWithoutAadhar(id) {
    return this.dataService.getData('/api/AadharSchoolNotinCountDetails?school_id=' + id, true);
  }
  getpindicsreport(data) {
    return this.dataService.getData('/api/EmisStatePindicsReport', data);
  }
  /*   karthick  Report end  */
  getTeacherDetails(teachers) {
    return this.dataService.post('/api/teacher_details_block', { records: { dist_id: teachers.dist_id } });
  }
  getTeacherDetailsSchool(teachers) {
    return this.dataService.post('/api/teacher_details_school', { records: { block_id: teachers.block_id } });
  }
  getStudentDetails(distwise,school_type) {
   
  //  return this.dataService.post('/api/student_count_block_wise', { records: { school_manage: "1", school_cate: distwise.cate_type, dist_id: distwise.district_id, block_name: distwise.block_name } });
    return this.dataService.post('/api/student_count_block_wise', { records: { school_manage: school_type,dist_id: distwise.district_id } });
  
  }
  getschoolStudentDetails(blockwise,school_type_id) {
    
   
    //return this.dataService.post('/api/student_count_school_wise', { records: { school_manage: blockwise.manage, school_cate: blockwise.cate_type, dist_id: blockwise.district_name, block_name: blockwise.block_name } });
    return this.dataService.post('/api/student_count_school_wise', { records: { school_manage:school_type_id, block_id: blockwise } });
  }
  getDistrictSchoolWiseHigherSectionDetails() {
    return this.dataService.getData('/api/DistrictSchoolWiseHigherSection', true);
  }
  getblockwiseSchoolWiseHigherSectionDetails(distwise) {
    return this.dataService.getData('/api/SchoolClassHigherSection?district_id=' + distwise, true);
  }
  getschoolwiseSchoolWiseHigherSectionDetails(blockwise) {
    debugger;
    return this.dataService.getData('/api/SchoolHigherClassSection?school_id=' + blockwise.school_id + '&school_name=' + blockwise.school_name, true);
  }
  getstudentdistrictlistClasses() {
    return this.dataService.post('/api/student_count_district_wise', { records: { school_manage: "1" } });
  }
  getStatedistrictlistClasses(school_type_id) {
    return this.dataService.post('/api/student_count_district_wise', { records: { school_manage: school_type_id } });
  }
  getTeachersListDetails() {
    return this.dataService.getData('/api/teacher_details', true);
  }
  // getStateDashboard() {
  //   return this.dataService.getData('/api/Dashboard', true);
  // }
  getschoolcountData() {
    return this.dataService.getData('/api/stateschoolcount', true);
  }
  getNoonmealCountDetails() {
    return this.dataService.getData('/api/EmisNoonMealsReport', true);
  }
  getDistrictwiseNoonmealDetails(NoonMeal) {
    return this.dataService.getData('/api/EmisNoonMealsReportByDistrictWise?district_id=' + NoonMeal, true);
  }
  getChildrenSpecialNeedData() {
    return this.dataService.getData('/api/CWSNStudentReportDistrictwise', true);
  }
  getSelectedCWSN(childrens) {
    return this.dataService.getData('/api/CWSNStudentReportBlockWise?district_name=' + childrens, true);
  }
  getSelectedCWSNBlock(childrens) {
    return this.dataService.getData('/api/CWSNStudentReportSchoolWise?block_name=' + childrens, true);
  }
  getStatePtStaffReport(params) {
    return this.dataService.getData('/api/pt_staff_paided_report' + params, true);
  }
  aidedscldictList(data) {
    return this.dataService.getData('/api/DistrictSchoolWiseClassSection', data);
  }
  aidedsclList(distname) {
    return this.dataService.getData('/api/SchoolWiseClassSection?district_id=' + distname.district_id, true);
  }
  aidedsclsecList(distname) {
    return this.dataService.getData('/api/SchoolClassSection?school_id=32710&school_name=' + distname.school_name, true);
  }
  schoolCountDistrict(dataid) {
    return this.dataService.getData('/api/statedistschoolcount/?mang=' + dataid, true);
  }
  DistCountSchool(district_id, manage_id) {
    return this.dataService.getData('/api/stateschoolwise/?dist=' + district_id + '&mang=' + manage_id, true);
  }
  getOSCList() {
    return this.dataService.getData('/api/osclist', true);
  }
  getOSCListDistrict(outStudents) {
    return this.dataService.getData('/api/osclistblock/?district_id=' + outStudents, true);
  }
  getSelectedSchoolDetails(outStudents) {
    return this.dataService.getData('/api/osclistschool/?block_id=' + outStudents.block_id, true);
  }
  getOSCListSchoolWise(outStudents) {
    return this.dataService.getData('/api/oscliststud', true);
  }
  getRTEStudentListData() {
    return this.dataService.getData('/api/RTEStudentReport', true);
  }
  getSelectedRTEList(distwise) {
    return this.dataService.getData('/api/RTEStudentReportSchoolWise2019?dist=' + distwise, true);
  }
  getBlockRTEList(block){
    return this.dataService.getData('/api/RTEStudentReportSchoolWise2019?block_id=' + block, true);
  }
  getBrteList() {
    return this.dataService.getData('/api/BRTEList', true);
  }
  BlkResTeacher(Distid) {
    return this.dataService.getData('/api/BRTEListTeacher?dist_id=' + Distid, true);
  }
  BlkResTeacherDetails(blk)
  {
    return this.dataService.getData('/api/BRTEListTeacher?block_id=' + blk, true);
  }
  BlkAssignedData(brtedataid) {
    return this.dataService.getData('/api/BRTEAssignedSchool?brte_id=' + brtedataid, true);
  }
  getverificationstatusmonitoring(school_type) {
    return this.dataService.getData('/api/UdiseVerficationStatusReport/?school_type=' + school_type, true);

  }



  getverificationstatusmonitoringblock(distrctID, school_type_get_val) {
    debugger;
    // console.log("distric",distrctID)
    // console.log("servicedata",school_type_get_val);
    return this.dataService.getData('/api/UdiseVerficationStatusReport/?district_id=' + distrctID + '&school_type=' + school_type_get_val, true);
  }

  getRenewalResetQueueData() {
    return this.dataService.getData('/api/BRTEListTeacher', true);
  }
  getRTEServiceData() {
    return this.dataService.getData('/api/StudentRTEAllocation', true);
  }
  getRTEServiceDistrictData(id) {
    return this.dataService.getData('/api/RTESchoolAllocation/?district_name=' + id, true);
  }
  getUnRecognizedData() {
    return this.dataService.getData('/api/SchoolUnrecognizedList', true);
  }
  getUnRecognizedDistric(id) {
    return this.dataService.getData('/api/SchoolUnrecognizedBlockList/?district_id=' + id, true);
  }


  /* transfer teacher (district,block,schoollist,teachertype)*/
  getteachertransferdropdown(refresh) {
    return this.dataService.getData('/api/GetDropdown_Transfer', refresh);
  }
  getteacherlist(schoolid, teachertype) {
    // console.log(data);
    //return false;
    return this.dataService.getData('/api/GetTeacherlist_Transfer?school_id=' + schoolid + '&teachertype=' + teachertype, false);
  }
  saveteachertransfer(data, refresh) {
    console.log(data);
    //return false;
    return this.dataService.post('/api/SaveTeacher_Transfer', data);
  }
  savetransferdepute(data, refresh) {
    console.log(data);
    //return false;
    return this.dataService.post('/api/SaveTeacher_Transferdepute', data);
  }

  //getofficelist(blockid){

  //   return this.dataService.getData('/api/GetOfficelist_Transfer?block_id='+blockid ,false);
  //   }
  /* end of teacher */
  // getOSCList(){
  //   return this.dataService.getData('/api/osclist', true)
  // }

  getAcademicData() {
    return this.dataService.post('/api/SchoolProfileVerificationDistrict', true);
  }
  getAcademicDataDistrict(academic) {
    return this.dataService.post('/api/SchoolProfileVerificationDistrict', { "school_manage": {}, "school_cate": { "0": "Pre-Primary School", "1": "Primary School" }, "district_id": academic });
  }
  getAcademicDataBlock(academic) {
    return this.dataService.post('/api/SchoolProfileVerificationDistrict', { "school_manage": {}, "school_cate": { "0": "Pre-Primary School", "1": "Primary School" }, "block_id": academic });
  }

  getSchoolLandDetails() {
    return this.dataService.post('/api/SchoolLandVerificationDistrictWise', true);
  }
  getEachSchoolLandData(id) {
    return this.dataService.post('/api/SchoolLandVerificationDistrict', { records: { "school_manage": {}, "school_cate": { "0": "Pre-Primary School", "1": "Primary School" }, "district_id": "3" } });
  }
  getSchoolWashDetails(id) {
    return this.dataService.getData('/api/schoolwashlist' + id, true);
  }
  getCommitteeDetails() {
    return this.dataService.post('/api/SchoolCommitteeVerificationDistrictWise', true);
  }
  getCommitteeEachDetails(id) {
    return this.dataService.post('/api/SchoolCommitteeVerificationDistrict', { "school_manage": {}, "school_cate": { "0": "Pre-Primary School", "1": "Primary School" }, "district_id": id });
  }
  getBuildingDetails(id) {
    return this.dataService.getData('/api/schoolbuildinglist' + id, true);
  }
  districtdatastudent() {
    return this.dataService.post('/api/StudentSlasReportDist', true);
  }
  blkwisestudent(distid) {
    return this.dataService.post('/api/StudentSlasReportBlk', { district_id: distid });
  }
  schlwisestudent(blkid) {
    return this.dataService.post('/api/StudentSlasReportSchl', { blk_id: blkid });
  }
  getSchoolSummary() {
    return this.dataService.getData('/api/schoolSummary', true);
  }
  /* ATSL Report */
  getATSLDistList(medium_id, topic) {
    return this.dataService.getData('/api/ATSLTopicMediumWise/?medium_id=' + medium_id + '&&topic=' + topic, true)
  }
  getATSLBlockList(district_id, medium_id, topic) {
    return this.dataService.getData('/api/ATSLTopicMediumWise/?district_id=' + district_id + '&&medium_id=' + medium_id + '&&topic=' + topic, true)
  }
  getATSLSchoolList(school_id, medium_id, topic) {
    return this.dataService.getData('/api/ATSLTopicMediumWise/?school_id=' + school_id + '&&medium_id=' + medium_id + '&&topic=' + topic, true)
  }

  /* nearest govt school by kamal */

  getSchlReportData(schltypeid) {
    return this.dataService.getData('/api/NearestSchoolReport/?school_type=' + schltypeid, true);
  }
  getSchlDetails(data){
    return this.dataService.post('/api/SaveNearestSchoolReport',data);
  }

  /* atsl kamal*/
  getStudentData() {
    return this.dataService.getData('/api/ATSLStudentWiseReport', true);
  }

  /* IED Teacher Report by Kamala */
  getDistrictDetails() {
    return this.dataService.getData('/api/IEDTeachersReport', true);
  }

  getTeacherDetailsData(distid) {

    return this.dataService.getData('/api/IEDTeachersReport/?district_id=' + distid, true);
  }

  getSavedIedTeacherDetails(data,refresh) {
    console.log(data);
    return this.dataService.post('/api/SAveIEDTeachersReport', data);
  }
  getupdateIedTeacherDetails(data,refresh) {
    console.log(data);
    return this.dataService.post('/api/SAveIEDTeachersReport', data);
  }
  /* IED end*/
 
  getUdisePdf(sch_id) {
    debugger;
    return this.dataService.getData('/api/schlproPDF?school_id=' + sch_id,true);
  }
// HOMEWORK
  getHomeWorkApi(schlid,teacherid){
      return this.dataService.getData('/api/GetHomeWorkdetails/?school_id='+schlid+'&teacher_id='+teacherid,true);
    }
    getSchlSectionDetails(schlid,classid){
      return this.dataService.getData('/api/GetSchoolSectionDetails/?school_id='+schlid+'&class_id='+classid,true);
    }
    getSaveHomeworkdata(data){
      console.log(data,"service");
      debugger;
      return this.dataService.post('/api/SaveHomeWork',data);
    }
    
    getDeleteApi(schlid,teacherid,id)
    {
      return this.dataService.getData('/api/deletehomework/?school_id='+schlid+'&teacher_id='+teacherid+'&id='+id,true);
    }

    getCovidWatchReportList(data) {
      return this.dataService.post('/api/CovidWatchList', data);
    }
  
    getCovidWatchReportData(data) {
      return this.dataService.post('/api/CovidWatchList', data);
    }
      
    getCovidWatchReportListCount(data) {
      return this.dataService.post('/api/CovidWatchList', data);
    }

    getCovidDetailsReport(data) {
      return this.dataService.post('/api/CovidWatchDetlRep', data);
    }


    getCovidSummaryReport(data)
    {
      return this.dataService.post('/api/CovidWatchSummryReprt', data);
    }

    getCovidSummaryTotalNoCount(data)
    {
      return this.dataService.post('/api/SurvyNoCountSchls', data);
    }
    getCovidAfctdUnmrkdReport()
    {
      return this.dataService.post('/api/CovidAfctdUnMrkdRep', true);
    }
    getCovidAfctdUnmrkdReportdetails(data)
    {
      return this.dataService.post('/api/CovidAfctdUnMrkdRep', data);
    }
    getCovidAfctdSummaryReport()
    {
      return this.dataService.post('/api/CovidAffectedSumryRep', true);
    }
    getCovidAfctdSummaryReportdetails(data)
    {
      return this.dataService.post('/api/CovidAffectedSumryRep', data);
    }
    getiedteachers(teacherid)
    {
      debugger;
      return this.dataService.getData('/api/GetIEDTeachers/?teacher_id='+teacherid,true);
    }
  }
