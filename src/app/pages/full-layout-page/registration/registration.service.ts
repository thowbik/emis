import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private dataService: DataService) { }

  school_details_save_API_1(data,refresh){
    debugger;
    return this.dataService.post('/api/schlReg1',data);
  }

  school_details_save_API_3(data,refresh){
    debugger;
    return this.dataService.post('/api/schlReg3',data);
  }

  school_details_Doc_API_3(data,refresh){
    debugger;
    return this.dataService.post('/api/docuplddata',data);
  }

  all_district_API_1(){
    debugger;
    return this.dataService.getData('/api/alldistrictlist',true);
  }

  school_Doc_Detail_API(app_id){
    debugger;
    return this.dataService.getData('/api/newSchlDocDtls?app_id=', + app_id);
  }
   
  school_list_API(){
    debugger;
    return this.dataService.post('/api/newSchlAppList',true);
  }

  schools_list_API(data,refresh){
    debugger;
    return this.dataService.post('/api/newSchlAppList',data);
  }

  Forwrd_reject_data_API(data, refresh){
    debugger;
    return this.dataService.post('/api/NOCCBSEFrwdRej',data);
  }

  final_approval_data_API(data, refresh){
    debugger;
    return this.dataService.post('/api/NOCCBSEApprvl' ,data);
  }

  saveremarks(data, refresh) {
    debugger;
    return this.dataService.post('/api/SaveAppDocRemaksDet',data);
  }
  
  stateloginonloadAPI(school_type , district_id , block_id , udise_code){
    debugger;
    return this.dataService.getData('/api/IEDStudentsReport/?school_type='+ school_type + '&district_id=' + district_id + '&block_id=' + block_id + '&udise_code=' + udise_code,true);
  }

  all_block_API_1(data,refresh){
    return this.dataService.post('/api/commonDrpdwn',data);
  }

  saveSchoolDetailsTwo(data) {
    debugger;
    return this.dataService.post('/api/schlReg2',data);
  } 

  saveSchoolDetailsFour(data) {
    debugger;
    return this.dataService.post('/api/schlReg4',data);
  } 

  get_ifsc_data(ifsc_code)
  {
    return this.dataService.getData('/api/RetrieveIfscBankdet/?ifsc_code=' + ifsc_code ,true);
  }

  get_saved_details(app_id)
  {
    debugger;
    return this.dataService.getData('/api/newSchlDtls?app_id=' + app_id ,true);
  }

  get_saved_doc_details(app_id){
    debugger;
    return this.dataService.getData('/api/newSchlDocDtls?app_id=' + app_id ,true);
  }

}
