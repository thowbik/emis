import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Injectable()
export class TeachersDashboardService {

   constructor(private dataService: DataService) {
  }
  getteachersInfo() {
    return this.dataService.getData('/api/teacherDetails', true);
  }
}