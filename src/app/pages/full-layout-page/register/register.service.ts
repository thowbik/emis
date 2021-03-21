import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/services/usersession.service';
import { DataService } from 'src/services/data.service';


@Injectable()
export class RegisterService {
  // public token: string;

   
    constructor(private dataService: DataService,
                private userSessionService: UserSessionService) {
      // this.token = this.userSessionService.authToken();
    };
    
    
    getStudentAttendanceReport(data,refresh) {
        return this.dataService.post('/api/studentAttendenceReport',{records:data});
      }

      getclasslist(data,refresh)
  {
      return this.dataService.getData('/api/schoolWiseClassandSection?school_id='+data,true);

   }
   getStaffAttendanceRegister(data, refresh){
    return this.dataService.post('/api/EMISStaffAttendanceMonthlySchoolwise',{records:data});
   }

   getNMMSScheme(data){
    return this.dataService.getData('/api/studentSchemeListNMMS?emis_school_id='+data,false);
   }
   getTrstseScholarshipData(data)
    {
      debugger;
      return this.dataService.getData('/api/studentSchemeListTRSTSE?emis_school_id='+data,false);
    }
    getOutofSchollChildern(data){
      return this.dataService.getData('/api/studentsOsc?emis_school_id='+data,false);
     }
     getInspireAwardDetails(data){
      return this.dataService.getData('/api/studentSchemeListInspire?emis_school_id='+data,false);
    }
    getVocationalStudentNSQF(data){
      return this.dataService.getData('/api/studVOCNSFQReport?emis_school_id='+data,false);
    }
    getStudentSportsParticipation(data, refresh){
      return this.dataService.post('/api/studentSchemeListSports',{records:data});
     }
     getRTEStudentRegister(data, refresh){
      return this.dataService.post('/api/RTIStudentsList',{records:data});
     }
     getCWSNStudentRegister(data){
      return this.dataService.getData('/api/EMISStudentDisablityList?emis_school_id='+data,false);
     }
     getStudentsReligionDetails(data){
      return this.dataService.getData('/api/studReligionReport?emis_school_id='+data,false);
     }
     getStudentsUnderbelowPovertyline(data){
      return this.dataService.getData('/api/studBPLReport?emis_school_id='+data,false);
     }
     getStudentsAadharDetails(data){
      return this.dataService.getData('/api/studAadharReport?emis_school_id='+data,false);
     }
     getStudentsReportbyAge(data){
      return this.dataService.getData('/api/reportAge?emis_school_id='+data,false);
     }
     getStudentsCommunityDetails(data){
      return this.dataService.getData('/api/studCommunityReport?emis_school_id='+data,false);
     }
     getPTMGRMealProgramme(data){
      return this.dataService.getData('/api/PTMGRNoonMealProgram?emis_school_id='+data,false);
     }
     getCostTextNotebookDetails(data, refresh){
      return this.dataService.post('/api/EMISSchoolTextbooksDistributionDetails',{records:data});
     }
     getCostFreeNotebookDetails(data){
      return this.dataService.getData('/api/EMISSchoolNotebooksDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeBagsDetails(data){
      return this.dataService.getData('/api/EMISSchoolBagsDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeFootwearDetails(data){
      return this.dataService.getData('/api/EMISSchoolFootwearDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeBuspassDetails(data){
      return this.dataService.getData('/api/EMISSchoolBuspassDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeColourpencilDetails(data){
      return this.dataService.getData('/api/EMISSchoolColourPencilDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeGeometryboxDetails(data){
      return this.dataService.getData('/api/EMISSchoolGeometryBoxDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeAtlasDetails(data){
      return this.dataService.getData('/api/EMISSchoolAtlasDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeLaptops11Details(data){
      return this.dataService.getData('/api/EMISSchoolLaptopsDistribution11Details?emis_school_id='+data,false);
     }
     getCostFreeLaptops12Details(data){
      return this.dataService.getData('/api/EMISSchoolLaptopsDistribution12Details?emis_school_id='+data,false);
     }
     getCostFreeLaptops12preyearsDetails(data){
      return this.dataService.getData('/api/EMISSchoolLaptopsPreviousYearDistribution12Details?emis_school_id='+data,false);
     }
     getCwsnStudentBenefitRegister(data){
      return this.dataService.getData('/api/benefitStudentsList?emis_school_id='+data,false);
     }
     getCostFreeUniformsDetails(data, refresh){
      return this.dataService.post('/api/EMISSchoolUniformsDistributionDetails',{records:data});
     }

     getCostFreeCutSweaterDetails(data){
      return this.dataService.getData('/api/EMISSchoolSweaterDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeBootDetails(data){
      return this.dataService.getData('/api/EMISSchoolBootDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeSocksDetails(data){
      return this.dataService.getData('/api/EMISSchoolSocksDistributionDetails?emis_school_id='+data,false);
     }
     getCostFreeRaincoatDetails(data){
      return this.dataService.getData('/api/EMISSchoolRainCoatDistributionDetails?emis_school_id='+data,false);
     }

     getStaffTrainingRegisterDetails(data, refresh){
      return this.dataService.post('/api/StaffTrainingDetails',{records:data});
     }
     //ClubParticipationRegister
     getClubParticipationRegister()
     {
       return this.dataService.getData('/api/studClubParticipation',true);
     }


}