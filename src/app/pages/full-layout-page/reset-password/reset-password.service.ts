import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { debug } from 'util';

@Injectable()
export class ResetPasswordService {
  constructor(private dataService: DataService) {}

  resetPasswordAPI(data , refresh) {
    debugger;
    return this.dataService.post('/api/ResetPassword', data);
  }

}
