import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class NavigationService {
  constructor(private router: Router) {

  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToschoolList(){
    this.router.navigate(['/school-count']);
  }
goToMasterTimetable()
{
  this.router.navigate(['/mastertimetable']);
}
goToWeeklyTimetable()
{
  this.router.navigate(['/weeklytimetable']);
}
goToTodayTimetable()
{
  this.router.navigate(['/todaytimetable']);
}
goToInvalidAadharList()
{
  this.router.navigate(['/invalid-aadharcount']);
}
goToInvalidPhoneList()
{
  this.router.navigate(['/invalid-phonecount']);
}
goToStudentTransfer()
{
  this.router.navigate(['/StudentTransfer']);
}
goToStudentFershTransfer()
{
  this.router.navigate(['/StudentFresh']);
}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSessionTimedOut() {
    this.router.navigate(['/sessiontimedout']);
  }

  isOnLoginScreen(): boolean {
    return this.router.url === '/login';
  }

}


