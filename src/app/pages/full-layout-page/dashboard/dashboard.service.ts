import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/services/usersession.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {
  // public token: string;
  private readingFileApi = environment.readingFileApi;
   
    constructor(private dataService: DataService,
                private userSessionService: UserSessionService) {
      // this.token = this.userSessionService.authToken();
    };
  
//     getStudentList(data) {
//       debugger;
//       const headers = new HttpHeaders(
//         {
//           'Content-Type': 'application/json',
//           'Authorization':'EMIS_web@2019_api',
//           'Token' : this.token
//         });
//         return this.http.get<any>('http://13.232.228.90/api/schoolWiseStudentList?school_id='+data);
    
//   }
    getDashboardData(data,refresh) {
        // const headers = new HttpHeaders(
        //     {
        //       'Content-Type': 'application/json',
        //       'Authorization':'EMIS_web@2019_api',
        //       'Token' : this.token
        //     });
        // return this.http.post<any>('http://13.232.228.90/api/schoolsDashboard', data, { headers: headers });
        return this.dataService.post('/api/schoolsDashboard',data);
       
    }
    invalidAadharCount() {
     
      return this.dataService.getData('/api/stuaadharcnt',true);
    }
    invalidPhoneNoCount()
    {
      return this.dataService.getData('/api/stuphonecnt',true);
    }
    functionalFacilitiesList()
    {
      debugger;
      return this.dataService.getData('/api/facilitieslist?value=1',true);
    }
    nonfunctionalFacilitiesList()
    {
      debugger;
      return this.dataService.getData('/api/facilitieslist?value=2',true);
    }
    staffDayAttendance() {
      return this.dataService.getData('/api/teacherattend?value=1',true);
    }
    staffWeekAttendance() {
      return this.dataService.getData('/api/teacherattend?value=2',true);
    }
    staffMonthAttendance() {
      return this.dataService.getData('/api/teacherattend?value=3',true);
    }
    staffQuaterlyAttendance() {
      return this.dataService.getData('/api/teacherattend?value=4',true);
    }
    studentDayAttendance() {
      return this.dataService.getData('/api/studentattend?value=1',true);
    }
    studentWeekAttendance() {
      return this.dataService.getData('/api/studentattend?value=2',true);
    }
    studentMonthAttendance() {
      return this.dataService.getData('/api/studentattend?value=3',true);
    }
    studentQuaterlyAttendance() {
      return this.dataService.getData('/api/studentattend?value=4',true);
    }
    getstudenttransferdata(schoolid) {
      return this.dataService.getData('/api/SchoolClassMedium1/?school_id='+schoolid , true);
     }
     getfreshstudentdata(schoolid) {
      return this.dataService.getData('/api/SchoolClassMedium/?school_id='+schoolid , true);
     } 

     getUploadedFiles(bucketName,fileName,expiry) {
      let params = {"bcktId":bucketName,"filename":fileName,"expiry":expiry};
      return this.dataService.getDataWithParams(this.readingFileApi,params, true)
    }
    download(url: string) {
      debugger;
      return this.dataService.getReport(url)
    }
    
}