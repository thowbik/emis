import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CeoService {

    constructor(private dataService: DataService) {};
    private getSignedUrlApi = environment.getSignedUrlApi;
    private readingFileApi = environment.readingFileApi;
       getRteIntakeCapacity()
       {
        return this.dataService.getData('/api/rTEIntakeCEO', true);
       }
       getRteIntakeCapacitySave(rtedata, refresh){
        debugger
        return this.dataService.post('/api/rTESchlDataSave',{records:rtedata});
       }

       get_brte_API_1(){
        debugger;
        return this.dataService.getData('/api/BRTE_TeacherList',true);
       }

       blck_z_school_API_1(blck_id){
        debugger;
        return this.dataService.getData('/api/ZonalSchoolByBlock/?block_id=' + blck_id , true );
       }

       Save_brte_API(record, refresh){
        debugger;
        return this.dataService.post('/api/SaveBRTEZonalSchools', record);
       }

       save_sel_sch_API_1(sch_list, refresh){
        debugger;
        return this.dataService.post('/api/SaveZonalSchools', sch_list);
       }

       all_get_sel_sch_API_1(block_id)
       {
        debugger;
        return this.dataService.getData('/api/GetZonalSchools?block_id=' + block_id,true);
       }

       delete_zone_API_1(scho_id){
        debugger;
        return this.dataService.getData('/api/deleteZonalSchools?school_id=' + scho_id,true);
       }

       delete_sub_API_1(scho_id){
        debugger;
        return this.dataService.getData('/api/deleteZonalSubSchools?school_id=' + scho_id,true);
       }

       all_sub_school_API_1(z_sch_id){
        debugger;
        return this.dataService.getData('/api/SubschoolDistrictWise/?school_id=' + z_sch_id , true );
       }
       tot_for_current_sch(z_sch_id){
        debugger;
        return this.dataService.getData('/api/ZonalBasedSchoolTypes/?zonal_id=' + z_sch_id , true );
       }
       save_sub_sch_API_1(sub_sch_list, refresh){
        debugger;
        return this.dataService.post('/api/SaveSubZonalSchools', sub_sch_list);
       }

       all_block_API_1()
       {
        debugger;
        return this.dataService.getData('/api/BlockList',true);
       }

       zonal_list_API_1(block_id){
        debugger;
        return this.dataService.getData('/api/zonalSchool?block_id=' + block_id,true);
       }

       all_school_API_1(blck_id){
        debugger;
        return this.dataService.getData('/api/schoolDistrictWise?block_id=' + blck_id , true );
       }

      getnocdeatailssave(data, refresh) {
        debugger;
        return this.dataService.post('/api/MngmentAppli',data);
      }
      getnocformstatus(schoolId,apptype) {
        debugger;
        return this.dataService.getData('/api/ApprovalSchoolStatus/?school_id=' + schoolId  + '&app_type=' + apptype, true);
      }
      getnocformstatusdownload(appid) {
        debugger;
        return this.dataService.getData('/api/SchoolDownloadOrder/?app_id=' + appid, true);
      }
      getnocformstatusdownloadcondition(appid){
        debugger;
        return this.dataService.getData('/api/SchoolDownloadOrderCondition/?app_id=' + appid, true);
     
      }
      getnocDownloadApiAppid(school_id)
      {
        return this.dataService.getData('/api/GetApiByAPPID/?school_id='+school_id, true);
  
      }
      getnocformstatuslanding(schoolId) {
        debugger;
        return this.dataService.getData('/api/SchlAppliStage3/?school_id=' + schoolId, true);
      }
      getApplicationDetails(districtid,emis_user_id)
      {
       
        debugger;
        return this.dataService.getData('/api/CeoSchoolAppliList/?district_id=' + districtid+'&emis_user_id='+emis_user_id, true);
      }
      getStateApplicationDetails(emis_user_id)
      {
        debugger;
        return this.dataService.getData('/api/CeoSchoolAppliList/?emis_user_id='+emis_user_id, true);
      }
      getApplicationCheckDetails(schoolId)
      {
        debugger;
        return this.dataService.getData('/api/NOCwithCBSESchoolWiseDtls?school_id='+schoolId, true)

      }
      GetSchoolDetails(distId,schoolId)
      {
        return this.dataService.getData('/api/NOCwithCBSESchoolWiseDtls?dist_id='+distId+'&school_id='+schoolId, true);
      }
      getStateData(appId)
      {
        return this.dataService.getData('/api/NOCwithCBSEReport?stage=4&app_id='+appId, true);
      }
      getnocceodeatailssave(data, refresh) {
        debugger;
        return this.dataService.post('/api/NOCwithCBSESaveCEODtls',data);
      }

    getnocdeatailssaveceoform(data) {
      debugger;
      return this.dataService.post('/api/NOCCBSEFrwdRej',data);
    }
    saveDocUploads(data) {
      debugger;
      return this.dataService.post('/api/docuplddata',data);
    }
    
    getnocdeatailssavestateform(data) {
      debugger;
      return this.dataService.post('/api/NOCCBSEApprvl',data);
    }
    saveremarks(data, refresh) {
      debugger;
      return this.dataService.post('/api/SaveAppDocRemaksDet',data);
    }

    getRenewalList() {
      return this.dataService.getData('/api/renewaldashboardlist', true);
    }

    getRenewalListTotalDATA(){
      return this.dataService.getData('/api/renewaldashboardlist', true);
    }

    getRenewalListDATA(data) {
      return this.dataService.getData('/api/renewaldashboardlist?section=' + data, true);
    }

    getDistSclList(data,dirID) {
      return this.dataService.getData('/api/renewaldashboardlist?section='+ data +'&grp=BLK&q='+ dirID, true);
    }

    getBlockSclList(data,blockID){
      return this.dataService.getData('/api/renewaldashboardlist?section='+ data +'&grp=SCH&q='+ blockID, true);
    }

    getApplicationstateStatus() {
      return this.dataService.getData('/api/renewaldashboard', true);
    }
    checkSubmission(schoolId) {
      debugger;
      return this.dataService.getData('/api/renewalsubmissionlist?school_id=' + schoolId, true);
    }
    saveRenewalData(data) {
      debugger;
      return this.dataService.post('/api/renewalapprove',data);
    }
    saveRenewalDocs(data) {
      debugger;
      return this.dataService.post('/api/renewaldocssubmit',data);
    }
    getSignedUrl(bucketName,ext,fileName,expiry) {
      let params = {"bcktId":bucketName,"ext":ext,"filename":fileName,"expiry":expiry};
      return this.dataService.getDataWithParams(this.getSignedUrlApi,params, true)
    }
    uploadFile(path,file) {
      return this.dataService.put(path,file);
    }
    getUploadedFiles(bucketName,fileName,expiry) {
      let params = {"bcktId":bucketName,"filename":fileName,"expiry":expiry};
      return this.dataService.getDataWithParams(this.readingFileApi,params, true)
    }
    // newfortest
    getStaffListApproval()
  {
    return this.dataService.getData('/api/getDataDC',true);
    }
  StudentDcApproval(data) {
    return this.dataService.post('/api/DCApproval',data);
  }
  StudentDcReject(data) {
    return this.dataService.post('/api/DCReject',data);
  }
  // testforstudentrte
  getStudentListApproval()
  {
    return this.dataService.getData('/api/getDataDC',true);
    }
    RteStudentDcApproval(data) {
    return this.dataService.post('/api/DCApproval',data);
  }
  RteStudentDcReject(data) {
    return this.dataService.post('/api/DCReject',data);
  }
  //pla
  getPLAAttendance(data)
  {
    return this.dataService.post('/api/PLAAttendnceRep',data);
  }
  BlockApi()
  {
    return this.dataService.getData('/api/blocklist',true);
  }

  // PLA Inspection
  getPLAInspection(data)
  {
    return this.dataService.post('/api/PLAInspecRep',data);
  }

  // PLA Attendance Learners Report

  getPLAAttendanceLearners(data)
  {
    return this.dataService.post('/api/PLALearnrsAttndnceRep',data);
  }
   // PLA Attendance Completed Report

   getPLAAttendanceCompleted(data)
   {
     return this.dataService.post('/api/PLAAttndnceCompltdRep',data);
   }

   getCompetitionReports(dstId,edudstId,blockId,schoolId,contstId)
   {
    return this.dataService.getDataSample('/contest/participantlist?dstId='+dstId+'&blockId='+blockId+'&edudstId='+edudstId+'&schId='+schoolId+'&contstId='+contstId,true);
   }

   updateCompetitionRank(data)
   {
     return this.dataService.post("/api/StudCompInsrtRank",data)
   }
}
