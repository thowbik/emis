import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SchoolsComponent } from './schools/schools.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistersComponent } from './registers/registers.component';
import { ReportsComponent } from './reports/reports.component';
import { TeachersdashboardComponent } from './teachersdashboard/teachersdashboard.component';
import { AdminComponent } from './admin/admin.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegisterComponent } from './register/register.component';

// import { MastertimetableComponent } from './timetable/mastertimetable/mastertimetable.component';
 // import { MastertimetableComponent } from './timetable/mastertimetable/mastertimetable.component';
// import { WeeklytimetableComponent } from './timetable/weeklytimetable/weeklytimetable.component';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule
    ],
    declarations: [ReportsComponent, TimesheetComponent, RegistrationComponent]
})
export class FullPagesModule { }
