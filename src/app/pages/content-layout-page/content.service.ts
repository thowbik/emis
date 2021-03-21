import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';
@Injectable()
export class ContentService {
  constructor(private dataService: DataService, private http: HttpClient) { };
  
  resetPassword(data , refresh) {
    debugger;
    return this.dataService.post('/api/auth/updatePassword', data);
  }
 
  // Smartcardservicegetapi:
  Smartcardgetapi( ) {
    debugger;
    return this.dataService.getData('/api/SmartcardDetails?smart_id=70e1a67be56a',true);
  }
}
