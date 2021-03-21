import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
// import { environment } from 'src/environments/environment';
import { ClassList } from 'src/models/classlist';
import { StudentData } from 'src/models/studentdata';
import { bloodgroupjson, religionjson, communityjson,studentregistration, castejson } from 'src/models/student-registration';
import { medinstr, saveAndUpdateSchemesDtl, uniformResponse, noonmealResponse, schemeSubCategoryResponse, schemesResponse } from 'src/models/schemes.model';

@Injectable()
export class StudentService {
  // private getSignedUrlApi = environment.getSignedUrlApi;
  // private readingFileApi = environment.readingFileApi;
    constructor(private dataService: DataService) {};


    // getStudentList(data,refresh) {
    //     debugger;
    //     ?school_id = 2112
    //     return this.http.get<any>('http://13.232.228.90' + route).map(response => {
    //       return response;
    //     });
    // }
    getStudentList(data,keyword,refresh) {
      debugger;
      return this.dataService.getData('/api/schoolWiseStudentList?school_id='+data+'&constant='+keyword,refresh);
    }

    popup_teacher_detail_API(data,refresh){
      debugger;
      return this.dataService.post('/api/UpdateTeacherAssign',data);
    }

    block_detail_API(block_id){
      debugger;
      return this.dataService.getData('/api/SchoolDropdownForCenters?block_id=' + block_id,true);
    }
    
    popup_detail_API(roll_no){
      debugger;
      return this.dataService.getData('/api/RetrieveTeacherAssign/?roll_no='+ roll_no ,true);
    }

    student_list_API(){
      debugger;
      return this.dataService.getData('/api/SchoolTeacherAssignment',true);
    }
    
    get_ifsc_data(ifsc_code)
    {
      return this.dataService.getData('/api/RetrieveIfscBankdet/?ifsc_code=' + ifsc_code ,true);
    }

    get_popup_data(id)
    {
      return this.dataService.getData('/api/GetIEDStudents/?student_id=' + id ,true);
    }

    student_edit_save_API(data,refresh){
      return this.dataService.post('/api/EditIEDStudents',data);
    }

    getdropdowdata()
    {
      return this.dataService.getData('/api/DiffAbledDet',true);
    }

    statelogin_reportAPI(district_id){
      debugger;
      return this.dataService.getData('/api/ReportTeacherAssign?district_id=' + district_id  ,true);
    }

    stateloginonloadAPI(school_type , district_id , block_id , udise_code){
      debugger;
      return this.dataService.getData('/api/IEDStudentsReport/?school_type='+ school_type + '&district_id=' + district_id + '&block_id=' + block_id + '&udise_code=' + udise_code,true);
    }

    getStudentDetail(data,refresh) {
        debugger;
        return this.dataService.post('/api/searchStudentDetails',data);
    }

    getStudentArchiveDetail(data,refresh) {
      debugger;
      return this.dataService.post('/api/searchArchiveStudentDetails',data);
    }

    moveToCommonPool(data,refresh) {
      debugger;
      return this.dataService.getData('/api/studsrchArchToCpool?uid='+data,refresh);
    }

    raiseRequestForm(data,refresh)
    {
      debugger;
      return this.dataService.post('/api/updateStudentsRaiseRequest',data);
    }

    getClassList() {
        return this.dataService.getJSON('../assets/json/classlist.json');
    }

    getSection(data,refresh)
    {
        return this.dataService.post('/api/GetClass_Details',data);
    }
    
    //no need
    getStudentData()  {
        return this.dataService.getJSON('../assets/json/studentdata.json');
    }

      studentRegistration(data) {
        return this.dataService.getData('/api/studentRegistration?school_id='+data,true);
      }

      subcastebycomm(val) {
        return this.dataService.getData('/api/subcastebycomm?subcaste='+val,true);
      }

      allsectionsbyclass(school_id,class_id) {
        return this.dataService.getData('/api/allsectionsbyclass?school_id='+school_id+'&class_id='+class_id,true);
      }

      studentRegistrationDataRTE(arr,udise_code,rteRecords) {
        debugger;
        return this.dataService.post('/api/studentRegData',{records:arr,school_udise_code:udise_code,student_rte_appli:rteRecords});
      }
      studentRegistrationNeedApproval(arr,udise_code,admitLog) {
        debugger;
        return this.dataService.post('/api/studentRegData',{records:arr,school_udise_code:udise_code,student_admit_log:admitLog});
      }
      studentRegistrationData(arr,udise_code) {
        debugger;
        return this.dataService.post('/api/studentRegData',{records:arr,school_udise_code:udise_code});
      }
      getClassesBySchoolId(data,refresh)
      {
        return this.dataService.getData('/api/schoolWiseClassandSection?school_id='+data,true);
      }
      getSectionList(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/classWiseSection',data);
      }
      updateAadhar(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/studaadharupdate',data);
      }
      updatePhoneNo(data,refresh)
      {
        return this.dataService.post('/api/stuphoneupdate',data);
      }
// OSCliststudents
getOSCstudent() {
  debugger;
  return this.dataService.getData('/api/osclist', true);
}
getoscstudentdist(distwise) {
  return this.dataService.getData('/api/osclist?district_id=' + distwise, true);
}
getoscstudentblock(blockwise) {
  return this.dataService.getData('/api/osclist?block_id=' + blockwise, true);
}
getoscstudentschool(schoolwise) {
  return this.dataService.getData('/api/osclist?school_id=' + schoolwise, true);
}
// Dropped out OSCliststudents
getDroppedstudent() {
  debugger;
  return this.dataService.getData('/api/studentsDroppedout', true);
}
getoscstudentdistdrop(distwisedrop) {
  return this.dataService.getData('/api/studentsDroppedout?district_id=' + distwisedrop, true);
}
getoscstudentblockdrop(blockwisedrop) {
  return this.dataService.getData('/api/studentsDroppedout?block_id=' + blockwisedrop, true);
}
getoscstudentschooldrop(schoolwisedrop) {
  return this.dataService.getData('/api/studentsDroppedout?school_id=' + schoolwisedrop, true);
}
      /*studentlist for tagging */
      getStudentTaggingList(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/classWiseTaggingStudentList',data);
      }
      /*Save Rte in student tagging*/
      saveRte(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/saveStudentTaggingRTE',{records:data});
        // return this.dataService.post('/api/classWiseTaggingStudentList',data);
      }
      saveCwsn(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/saveStudentTaggingCWSN',{records:data});
      }
      saveClubs(data,refresh){
        return this.dataService.post('/api/NssTagging',data);
      }
      saveSports(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/saveStudentTaggingSPORTS',{records:data});
      }
      saveAwards(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/saveStudentTaggingAWARDS',{records:data});
      }
      saveOsc(data,refresh)
      {
        debugger;
        return this.dataService.post('/api/saveStudentTaggingOSC',{records:data});
      }
      saveVocation(data,refresh)
      {
        debugger;
        console.log(data);
        return this.dataService.post('/api/saveStudentTaggingVOCATION',{records:data});
      }
      
      /* student tagging data for edit*/
      getStudentTaggingData(data,refresh)
      {
        return this.dataService.post('/api/studentTaggingData',data);
      }
      getStudentNssTagging(StudentId,year,refresh)
      {
        return this.dataService.getData('/api/GetNssTagging?student_id='+StudentId+'&ac_year='+year,true);
    
      }
      getAcademicSStudentNssTagging(StudentId,year,refresh)
      {
        return this.dataService.getData('/api/GetNssTagging?student_id='+StudentId+'&ac_year='+year,true);
      }

      invalidAadharList()
      {
        return this.dataService.getData('/api/stuaadharall',true);
      }
      stucheckaadhar(no)
      {
        return this.dataService.getData('/api/stucheckaadhar?aa='+no,true);
      }
      invalidPhoneNoList()
      {
        return this.dataService.getData('/api/stuphoneall',true);
      }
/* get acadamic records */
getAcademicRecords(data,refresh)
{
  return this.dataService.post('/api/Scholastic_1_8',{"records": data });
}
updateAcademicRecords(data,refresh)
{
  debugger;

  return this.dataService.post('/api/StudentmarkInsert_1_To_8',data);
}
ninethStdData(data,refresh)
{
  return this.dataService.post('/api/Scholastic_9_10',{"records": data });
}
/** TC Details : venba/ps */
  studentsTransferList(){
    return this.dataService.getData('/api/studentsTransferList',true);
  }
  studentsTransferSave(data){
    return this.dataService.post('/api/studentsTransferSave',{"records": data });
  }

  studentsTransferCertificate(no){
    return this.dataService.pdf('/api/TC',{"stud":no});
  }

/** Cash Incentive : venba/ps */
  getStudCashIncentiveList(){
    return this.dataService.getData('/api/stuSplCashlist',true);
  }

  checkAccnoForStudCashIncentive(no){ 
    return this.dataService.getData('/api/stuSplCashAccnoCheck?acc='+no,true);
  }
  saveCashIncentivedtl(data){
    return this.dataService.post('/api/stuSplCashsave',{"records": data });
  }

      public getReligionJSON() {
        return this.dataService.getJSON('../../../assets/json/religion.json');
      }
      public getRteType() {
        return this.dataService.getJSON('../../../assets/json/rtetype.json');
      }
      public getBloodGroupJSON() {
        return this.dataService.getJSON('../../../assets/json/bloodgroup.json');
      }
      public getCommunityJSON() {
        return this.dataService.getJSON('../../../assets/json/community.json');
      }
      public getCasteJSON() {
        return this.dataService.getJSON('../../../assets/json/caste.json');
      }
      public getOccupationJSON() {
        return this.dataService.getJSON('../../../assets/json/occupation.json');
      }
      public getclassStudyingJSON(){
        return this.dataService.getJSON('../../../assets/json/classstudying.json');
      }


      public _medinstrjsonurl = '../../../../assets/json/mediumofinstruction.json';

      getMediumOfInstructionJSON() {
        return this.dataService.getJSON(this._medinstrjsonurl);
      }

      studPendingTransReqt(dist){
          return this.dataService.getData('/api/studPendingTransReqt?district='+dist,true);
      }
      studPendingTransReqtReject(id){
        return this.dataService.getData('/api/studPendingTransReqtReject?id='+id,true);
      }
      studPendingTransReqtSave(data){
        return this.dataService.post('/api/studPendingTransReqtSave',{"records": data });
      }

  /* schemes services */
  /** To Get Schemes Details with its Applicable classes
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API   */
   getSchemesListWithApplicableClasses(schoolId,refresh:boolean) {
    return this.dataService.getData('/api/schemesWiseApplicableClasses?school_id='+schoolId,refresh);
  }

  /** To Get Schemes SubCatgory Details
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API */
   getSchemesSubCategoryList(id,refresh:boolean)
   {
    return this.dataService.getData('/api/schemesSubCategoryList?id='+id,refresh);

   }

  /** To Get schoolWise ClassandSection
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 4) */
   getSchoolWiseClassandSection(id,refresh:boolean)
   {
    return this.dataService.getData('/api/schoolWiseClassandSection?school_id='+id,refresh);

   }



  /** To Get Noonmeal Details as List
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 7)  */
  getnoonmealList(records)
  {
    return this.dataService.post('/api/noonmealList',{"records": records });

  }


  /** To Get Uniform Details as List
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 10)  */
  uniformList(records)
  {

    return this.dataService.post('/api/uniformList',{"records": records });
  }

  /** To Save Uniform Details
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 11) */
  // saveUniform(records):Observable<saveAndUpdateSchemesDtl[]>
  // {
  //   return this.http.post<saveAndUpdateSchemesDtl[]>(this.apiUrl+"saveUniform",{"records": {"data":records,"tname":"schoolnew_schemes"}});
  // }

  /** To Update Uniform Details
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 12) */
  // updateUniform(records):Observable<saveAndUpdateSchemesDtl[]>
  // {
  //   return this.http.post<saveAndUpdateSchemesDtl[]>(this.apiUrl+"updateUniform ",{"records": {"data":records,"tname":"schoolnew_schemes"}});
  // }

  /** To Get Laptop Details as List
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 17)  */
   laptopList(records)
   {

     return this.dataService.post('/api/laptopList',{"records": records });
   }

   textBookList(records)
   {

    return this.dataService.post('/api/bookList',{"records": records });
   }


  /** To Get Laptop Details as List
   *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 17)  */
   primarySchoolStudList(records)
   {

    return this.dataService.post('/api/primarySchoolBookList',{"records": records });
   }

    /** To Get Laptop Details as List
     *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 17)  */
     secondarySchoolStudList(records)
     {

       return this.dataService.post('/api/secondarySchoolBookList',{"records": records });
     }

   /** To Save  and Update Laptop Details
    *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 15)
    *  Note : References - open the docs.google.com/spreadsheets -> EMIS API -> Schemes API (s.no 16) */
    saveAndUpdateTxtBookDtls(records,tname,routeapi)
    {
      return this.dataService.post(routeapi,{"records": {"data":records,"tname":tname}});
    }

      /** To Save Schemes Details */
      saveAndUpdateSchemesdetails(routeapi,records)
      {
         return this.dataService.post(routeapi,records);
      }
      
      previousXIIDtls(records){
        return this.dataService.post('/api/previousXIIDtls',{"records": records }); 
      }

      updatePreviousXIIdtls(records){
        return this.dataService.post('/api/updatePreviousXIIDtlsForLaptop',records); 
      }

      checkWithExistingSerialNo(no,refresh:boolean)
      {
          return this.dataService.getData('/api/checkWithExistingSerialNo?serialno='+no,refresh);
      }
      SaveupdateStdBicycle(records)
      {
       
        return this.dataService.post('/api/SaveupdateStdBicycle',records);
  
      }

      editStudent(id){
        return this.dataService.post('/api/studentListWithMasterData',{"records":{"class_id":'',"section":'',"school_id":id}});
      }

      updateStudentRegistrationData(data){
        
        return this.dataService.post('/api/updateStudentDetails',data);
      }

      getAWSS3Image(path,refresh:boolean){
        debugger;
        return this.dataService.getData('/api/getAWSS3Image?path='+path,refresh);
      }

      getClassWiseSection(classid,schoolid){

        return this.dataService.post('/api/classWiseSection',{"records":{"class_id":classid,"school_id":schoolid}});
      }  

      updateStudentsAdmitted(value,schoolid){

        return this.dataService.post('/api/updateStudentsAdmitted',{"records":{"update_data":value,"school_id":schoolid}});
      }

      getCommonTables(val){

        return this.dataService.post('/api/getCommonTables',{"records":{'class_id':val,'table':'schoolnew_branch','where_col':'ifsc_code'}});
        
      }  

      getschoolclasses(id,refresh)
      {
        return this.dataService.getData('/api/Classlist?school_id='+id,true);
      }
      updateStudentsTransferDetails(data){
        return this.dataService.post('/api/updateStudentsTransferDetails',{"records":data});
  }
  //For Clas7 Slas Report 2019
  getclass7Report(school_id)
  {
    return this.dataService.getData('/api/GetSlasClass7Report/?school_id=' + school_id, true);
  }

  getStudentMigrationReport(){
    return this.dataService.getData('/api/studmigrationreport1', true);
  }

  getStudentMigrationReport2(from,to){
    return this.dataService.getData('/api/studmigrationreport2?school_type_from='+from+'&school_type_to='+to, true);
  }

  getStudentCommonPoolReport(){
    return this.dataService.getData('/api/Common_pool', true);
  }
  
  getStudentCommonPoolBlockReport(val){
    return this.dataService.post('/api/Common_pool_block',val);
  }

  getStudentCommonPoolSchoolReport(val){
    return this.dataService.post('/api/Common_pool_school',val);
  }    

  getStudentCommonPoolTransferReport(){
    return this.dataService.getData('/api/CP_transfer_reason', true);
  }

  getStudentCommonPoolTransferBlockReport(val){
    return this.dataService.post('/api/CP_transfer_reason_block',val);
  }

  getStudentCommonPoolTransferSchoolReport(val){
    return this.dataService.post('/api/CP_transfer_reason_school',val);
  }

  getAlternative(){
    return this.dataService.getData('/api/schoolMigration', true);
  }

  savestudenttransferreason(val){
    return this.dataService.post('/api/saveCommonPoolStudentList',val);
  }


  //RTE-Reimbursement
 //State
  getStatestudentsData1(){
    return this.dataService.getData('/api/Step1_NumberofStudents/?ac_year='+"'2018-19'",true);
  }

  getStatestudentsData(year){
    return this.dataService.getData('/api/Step1_NumberofStudents/?ac_year='+year,true);

  }
//CEO & DISTRICT
  getNumberofstudents(distid,year){
    return this.dataService.getData('/api/Step1_NumberofStudents/?district_id='+distid+'&ac_year='+year, true);
  }
  
  getNumberofstudents1(distid){
    return this.dataService.getData('/api/Step1_NumberofStudents/?district_id='+distid+'&ac_year='+"'2018-19'", true);

  }

  getReimbursementAmount(distid,year){
    return this.dataService.getData('/api/Step2_AmountConfirmation/?district_id='+distid+'&ac_year='+year,true);

  }
  getReimbursementAmount1(distid){
    return this.dataService.getData('/api/Step2_AmountConfirmation/?district_id='+distid+'&ac_year='+"'2018-19'",true);

  }
 getReimbursementStatus(distid,year){
   return this.dataService.getData('/api/Step3_ReimbursementStatus/?district_id='+distid+'&ac_year='+year,true);
 }
 getReimbursementStatus1(distid){
  return this.dataService.getData('/api/Step3_ReimbursementStatus/?district_id='+distid+'&ac_year='+"'2018-19'",true);
}

 getFirstTabApi(data){
   return this.dataService.post('/api/SaveConfirmStep1',data);
 }

 getSecApiConfirm(data){
   return this.dataService.post('/api/UpdateConfirmStep2',data);
 }
//  Rtedailyreport
getRTEdailyreport() {
  debugger;
  return this.dataService.getData('/api/RTEDayWiseRep', true);
}
getrtestudentpassword(data, refresh){
  debugger;
  return this.dataService.post('/api/RTEPswdRetrive',data);
}
getRteApplicantData(schoolId) {
  return this.dataService.getData('/api/rteReport?school_id='+schoolId,true);
}
getDCRteApplicantSave(rtedata, refresh){
  debugger
return this.dataService.post('/api/RTEAllotStatus',{records:rtedata});
}
getSchoolData() {
  return this.dataService.getData('/api/RTEDCSchoolList',true);
}
getrteliststudent(reg_no){
  return this.dataService.getData('/api/RTEStudentEligibleList/?register_no='+reg_no,true);
}
getStudentListApproval()
  {
    return this.dataService.getData('/api/DCStudDtls',true);
  }
  StudentDcApproval(data) {
    return this.dataService.post('/api/DCApproval',data);
  }
  StudentDcReject(data) {
    return this.dataService.post('/api/DCReject',data);
  } 
  get10THStudentList()
  {
    return this.dataService.getData('/api/StudentWiseListExcel?class=10',true);
  }
  get11THStudentList()
  {
    return this.dataService.getData('/api/StudentWiseListExcel?class=11',true);
  }
  get12THStudentList()
  {
    return this.dataService.getData('/api/StudentWiseListExcel?class=12',true);
  }
  StudentBicycleList(schl) {
    return this.dataService.getData('/api/GetStdBicycleList?SchlID='+schl+'&ClassID='+11,true);
  } 
  SaveStdBicylce(records)
  {
    return this.dataService.post('/api/SaveupdateStdBicycle',records);
  }
  //file upload
  // getSignedUrl(bucketName,ext,fileName,expiry) {
  //   let params = {"bcktId":bucketName,"ext":ext,"filename":fileName,"expiry":expiry};
  //   return this.dataService.getDataWithParams(this.getSignedUrlApi,params, true)
  // }
//   uploadFile(path,file) {
//     return this.dataService.put(path,file);
//   }
//   getUploadedFiles(bucketName,fileName,expiry) {
//     let params = {"bcktId":bucketName,"filename":fileName,"expiry":expiry};
//     return this.dataService.getDataWithParams(this.readingFileApi,params, true)
//   }
}
