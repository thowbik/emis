import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/services/usersession.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class RenewalService {
    private getSignedUrlApi = environment.getSignedUrlApi;
    private readingFileApi = environment.readingFileApi;
    constructor(private dataService: DataService,
                private userSessionService: UserSessionService) {
    };
       SaveRenewal(data) {
        return this.dataService.post('/api/applyRenewal', data);
       }
       schoolRenewalSubmit(data){
        return this.dataService.post('/api/renewalsubmit', data);
       }
       schoolRenewalDocsSubmit(data){
        return this.dataService.post('/api/renewaldocssubmit', data);
       }
       GetSchoolDetails(school_id,os)
       {
           console.log(school_id,os);
           return this.dataService.getData('/api/schprof?sch_id='+school_id+'&&os='+os,true);
       
       }

       getstatusData(schoolId) {
        return this.dataService.getData('/api/renewalsubmissionlist?school_id=' + schoolId, true);
      }

      getschoolstatusData(schoolId) {
        return this.dataService.getData('/api/renewalstatus?school_id=' + schoolId, true);
      }
       getRenewalSchoolList()
       {
           return this.dataService.getData('/api/renewalschlist',true);
       
       }
       getDocsRenewal() {
        return this.dataService.getData('/api/renewalschlist?docs=1',true);
       }
       GetAlreadyExistsRenewal()
       {
        
        return this.dataService.getData('/api/existsrenewal',true);
       
       }  
       getSignedUrl(bucketName,ext,fileName,expiry) {
        let params = {"bcktId":bucketName,"ext":ext,"filename":fileName,"expiry":expiry};
        return this.dataService.getDataWithParams(this.getSignedUrlApi,params, true)
      }
      uploadFile(path,file) {
        debugger;
        return this.dataService.put(path,file);
      }
      getUploadedFiles(bucketName,fileName,expiry) {
        let params = {"bcktId":bucketName,"filename":fileName,"expiry":expiry};
        return this.dataService.getDataWithParams(this.readingFileApi,params, true)
      }
      // ifsc
      get_ifsc_data(ifsc_code)
      {
        return this.dataService.getData('/api/RetrieveIfscBankdet/?ifsc_code=' + ifsc_code ,true);
      }
    
}