import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'src/services/data.service';
@Injectable()
export class BrteService {
  activate = new Subject<any>();
    constructor(private dataService: DataService) {};

    getbrteremarks (data ) {
      return this.dataService.getData('/api/Blocklist_Schoollist?district_id=29= '+ data,true);
    }

    AcademicOptionApi( ) {
      return this.dataService.getData('/api/getAcademicDet',true);
    }

    SocialCategryApi( ) {
      return this.dataService.getData('/api/getSocialCategry',true);
    }

    BlockApi( ) {
      return this.dataService.getData('/api/blocklist',true);
    }

    BlockSchoolApi( BlockId ) {
      debugger
      return this.dataService.getData('/api/schoolVolunteerList?block_id=' + BlockId ,true);
    }

    SaveBrte(data, refresh) {
      return this.dataService.post('/api/teacherVolunteer',data);
    }
      
    getDistrictdropdownlist()
    {
      debugger;
      return this.dataService.getData('/api/getMasterDistrict',true);
    }

    getDifferntlyabledlist()
    {
      debugger;
      return this.dataService.getData('/api/getDiffAbled',true);
    }

    getSocialCategory()
    {
      debugger;
      return this.dataService.getData('/api/getSocialCategry',true);
    }
    
    Poststudentvolunteerlist(data, refresh) {
      debugger;
      return this.dataService.post('/api/studentVolunteer',data);
    }
    
    getSchoolData(){
      return this.dataService.getData('/api/TeachStudCount',true);
    }

    getTeacherData(schlid)
    {
      return this.dataService.getData('/api/volunteersList?school_id='+schlid,true);
    }
    
    getStudentData(schlid)
    {
      return this.dataService.getData('/api/studentVolunteerlist?school_id='+schlid,true);
    }

    getTeacherDatalist(IndxID)
    {
      return this.dataService.getData('/api/TeachData?id='+IndxID,true);
    }
    getStudentDatalist(IndxID)
    {
      return this.dataService.getData('/api/studentVolunteerlist?school_id='+IndxID,true);
    }
    getStudentInfo(IndxID) {
       return this.dataService.getData('/api/StudData?id='+IndxID,true);
    }
    Deletedata(data){
      debugger;
      return this.dataService.post('/api/DelStudTeach',data);
    }
    getTeacherDropdown(schlId)
{
  return this.dataService.getData('/api/VolntrTeachrInSchl?Schl_id='+schlId , true);
}
saveTeacherList(api,data)
{
  return this.dataService.post(api,data);
}
updateTeacherList(api,data)
{
  return this.dataService.post(api,data);
}
updateStudentList(api,data)
{
  return this.dataService.post(api,data);
}
}