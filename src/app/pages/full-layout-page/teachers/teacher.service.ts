import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'src/services/data.service';
import {Teacher,bloodgroupjson,pgjson,ugjson} from '../../../../models/teacher';

@Injectable()

export class TeacherService {
  SearchTeacherClassTaught: any;
  activate = new Subject<any>();
  
  constructor(private dataService: DataService) {};

   getteacherslist(data,refresh)
   {
     console.log(data,'testing');
     return this.dataService.getData('/api/stflist?school_id='+data,true);
   }
   getdropdownsteachingstaff(refresh)
   { 
    return this.dataService.getData('/api/GetDropdown_Staff',refresh);
   }

   getdropdownsdepute(refresh)
   {
     return this.dataService.getData('/api/GetDropdown_Depute',refresh);
   }

  getBloodgroupJSON() {
    return this.dataService.getJSON('../assets/json/teachermaster.json');
  //   return this.http.get<bloodgroupjson[]>();
  }

   getpgJSON() {
    return this.dataService.getJSON('../assets/json/teachermaster.json');
   
  }

  getugJSON()  {
    return this.dataService.getJSON('../assets/json/teachermaster.json');
  }
 
  saveStaffDetails(data,refresh){
   
    return this.dataService.post('/api/stfsaveall',data);
   
  }

  updateStaffDetails(data,refresh){
   
    return this.dataService.post('/api/stfupdateall',data);
   
  }


//   updateteachingstafffirstpart(data,refresh){
   
//     return this.dataService.post('/api/tchupdateall',data);
   
//   }

//  updateteachingstaffsecondpart(data,refresh){
   
//   return this.dataService.post('/api/tchupdatebank',data);
 
//  }

// updateteachingstaffregulationpart(data,refresh){
   
//   return this.dataService.post('/api/tchupdateregulation',data);
 
// }
getbankdetails(no){
  return this.dataService.getData('/api/getbankdetails?ifsc='+no,true);
  // http://localhost/emis-code/api/bankdetails?ifsc=""
}
 getstafflogindetails()
   {
     return this.dataService.getData('/api/teacherlogindetails',true);
   }
   getPindicsHmEvaluation(data){
    return this.dataService.getData('/api/PINDICSHMEval?school_id='+data,false);
   }

   getPindicsSingleTeacherEvaluation(data){
    return this.dataService.getData('/api/PINDICSSingleTeachr?teacher_id='+data,false);
   }

   getPindicsHmEvaluationSave(data){
    return this.dataService.post('/api/PINDICSHMEvalInsert',{records:data});
   }
   getbrteremarks(data){
    return this.dataService.getData('api/Blocklist_Schoollist?district_id=29='+data,false);
   }

   stfcheckaadhar(no)
   {
        return this.dataService.getData('/api/checkaadhar?aa='+no,true);
   }
   stfcheckbankacc(no)
   {
        return this.dataService.getData('/api/checkbankacc?accno='+no,true);
   }

   stftrainlist()
   {
        return this.dataService.getData('/api/stafftrainlist',true);
   }
   savetrainlist(data){
    return this.dataService.post('/api/savetrainingdetails',{records:data});
   }
   deletetrainee(id){
    return this.dataService.getData('/api/deletetrainee?id='+id,true);
   }
   getNSQFStfMasterJSON(){
    return this.dataService.getJSON('../assets/json/vocationstaffnsqfmaster.json');
   }

   getNSQFVocationalStfList(){
    return this.dataService.getData('/api/vocationalstflist',true);
   }
   saveNSQFVocationalStfList(data){
    return this.dataService.post('/api/vocationalstfsave',{records:data});
   }

   deleteNSQFVocationalStf(id){
    return this.dataService.getData('/api/vocationalstfdelete?id='+id,true);
   }

   checkNSQFVocationalStfAadhar(no)
   {
        return this.dataService.getData('/api/vocationalstfaadhar?aa='+no,true);
   }
   getAWSS3Image(path,refresh:boolean){
    return this.dataService.getData('/api/getAWSS3Image?path='+path,refresh);
   }
   saveAWSS3Image(data){
    return this.dataService.post('/api/stfprofpic',data);
   }
   getSchoolListForStaffFixation(distid){
    return this.dataService.getData('/api/stffixationschlist?dist_id='+distid,true);
   }
   getDSEStaffFixationDetails(sch){
    return this.dataService.getData('/api/stffixationdetails?school_id='+sch,true);
   }
   saveDSEStaffFixationDetails(data){
     debugger;
    return this.dataService.post('/api/stffixationsave',data);
   }
   updatestaffTransferDetails(data){
    return this.dataService.post('/api/stftransferdetailsupdate',{records:data});
   }

   stfTransferReqtList(dist){
    return this.dataService.getData('/api/stfTransferReqtList?district='+dist,true);
   }
   stfTransferReqtRejection(id){
    return this.dataService.getData('/api/stfTransferReqtRejection?id='+id,true);
   }
   stfTransferReqtApprovals(data){
    return this.dataService.post('/api/stfTransferReqtApprovals',{"records":data});
   }
   getAcdamicqualification(nature_appoint,school_type,distrctID){
     debugger;
    return this.dataService.getData('/api/TeachersByAcademicQualification/?school_type=' + school_type + '&appoinment_type=' + nature_appoint + '&districtId=' + distrctID,true);
   }
   getproofqualification(nature_appoint,school_type,distrctID){
    return this.dataService.getData('/api/TeachersByProfQualification/?school_type=' + school_type + '&appoinment_type=' + nature_appoint + '&districtId = '+ distrctID,true);
   }
  //  BTteachers
  BTTeachersList(lan, schoolid,report_id) {
    return this.dataService.getData('/api/BTTeachersBySubject?subject_id=' + lan + '&school_type_id=' + schoolid  + '&report_id=' + 2, true);
  }

  BTTeachersDetails(selt_lang , sch_typ_id, dist_id,report_id) {
    return this.dataService.getData('/api/BTTeachersBySubject/?subject_id='+ selt_lang +'&school_type_id='+ sch_typ_id + '&district_id=' + dist_id + '&report_id=' + 2, true);
  }
  BlockBTTeachersDetails(selt_lang , sch_typ_id, block_id,report_id) {
    return this.dataService.getData('/api/BTTeachersBySubject/?subject_id='+ selt_lang +'&school_type_id='+ sch_typ_id + '&block_id=' + block_id + '&report_id=' + 2, true);
  }
  getteachertrain(schooltype) {
  debugger;
  return this.dataService.getData('/api/TeachersTrainingDet/?school_type='+ schooltype + '&training_type=' + 1, true);
}
getteacherwithout(schooltype) {
  debugger;
  return this.dataService.getData('/api/TeachersTrainingDet/?school_type='+ schooltype + '&training_type=' + 2, true);
}

savestafftrainingconducted(data)
{
  debugger;
  return this.dataService.post('/api/stafftrainingconductedsave',data);
} 
getTrainingConductedListAPI() {
     return this.dataService.getData('/api/stafftrainingconductedlist',true);
}

deleteTrainingConductedListAPI(id) {
  return this.dataService.getData('/api/deletetrainee?id='+id,true);
}

editTrainingConductedListAPI(id) {
  return this.dataService.getData('/api/stafftrainingconductbytrid?training_id='+id,true);
}

get_teacher_details(emisId) {
  return this.dataService.getData('/api/stafftrainingattendedby?teacher_id=' + emisId ,true)
}
//teacherhomework data
getSchlSectionDetails(schlid,classid){
  return this.dataService.getData('/api/GetSchoolSectionDetails/?school_id='+schlid+'&class_id='+classid,true);
}
getSaveHomeworkdata(data,refresh){
  return this.dataService.post('/api/SaveHomeWork',data);

}
getHomeworkdata(schlid,teacherid){
  return this.dataService.getData('/api/GetHomeWorkdetails/?school_id='+schlid+'&teacher_id='+teacherid,true);
}
  //  getSchoolListForStaffFixation(){
  //   return this.dataService.getData('/api/stffixationschlist',true);
  //  }
 
  getudisedata(udise){
    return this.dataService.getData('/api/schoolfetchlist?udise_code='+udise,true);
  }
  getteachersdata(adhar){
    debugger;
    return this.dataService.getData('/api/fetchteacherlist?aadhar=' + adhar ,true);
  }
  postteachersave(data) {
    debugger;
    return this.dataService.post('/api/teacherschoolsave',data);
  }
  getudiseschool(udisecodeschool){
    debugger;
    return this.dataService.getData('/api/getschoollist?udise_code=' + udisecodeschool ,true);
  }
  postschoolnamesave(data) {
    debugger;
    return this.dataService.post('/api/schoolnamesave',data);
  }
  getstudentname(studentname){
    debugger;
    return this.dataService.getData('/api/studentsflaglist?student_unique_id=' + studentname ,true);
  }
  postschoolid(data) {
    debugger;
    return this.dataService.post('/api/studentsflagsave',data);
  }
  getstudentmedium(studentmedium){
    debugger;
    return this.dataService.getData('/api/GetMediumList/?udise_code=' + studentmedium ,true);
  }
  getstudentmediumdropdown(){
    debugger;
    return this.dataService.getData('/api/MediumDropdown' ,true);
  }
  updatesectionpost(data) {
    debugger;
    return this.dataService.post('/api/AddNeweMedium',data);
  }
  Deletemedium(deletemediumid,deleteid,deleteschoolid){
    debugger;
    return this.dataService.getData('/api/DeleteMedium/?medium_id='+deletemediumid+'&id='+deleteid +'&school_id='+deleteschoolid,true);
  }
  getteacherlist()
  {
    debugger;
    return this.dataService.getData('/api/stfRole?stfID',true);
  }
 
   getteacherdropdownlist()
   {
     debugger;
     return this.dataService.getData('/api/TeacherDropdown',true);
   }
   postteacherdetails(data) {
    debugger;
    return this.dataService.post('/api/CoOrdinatorUpdate',data);
  }
  updateCallsupport(data) {
    return this.dataService.post('/api/CallSupporterUpdate',data);
  }
  savemappingskill(data) {
    debugger
    return this.dataService.post('/api/StaffMapping',data);
  }
  getmappingskill(teacher_id){
    debugger;
    return this.dataService.getData('/api/StaffMappingList/?teacher_id='+teacher_id,true);
  }
  updatemappingskill(data) {
    debugger
    return this.dataService.post('/api/StaffMapping',data);
  }
}
