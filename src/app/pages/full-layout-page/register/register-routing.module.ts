import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AttendanceStaffClubpartComponent } from './attendance-staff-clubpart/attendance-staff-clubpart.component';
import { StudentsummaryComponent } from './studentsummary/studentsummary.component';
import { StudenttaggingComponent } from './studenttagging/studenttagging.component';
import { StudentwelfareComponent } from './studentwelfare/studentwelfare.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Registers'
        }
    },
    {
        path: 'student-attendence',
        component: AttendanceStaffClubpartComponent,
        data: {
            title: 'Student Attendance Register',
            parent: 'Register'
        }
    },
   
    {
        path: 'studentsummary',
        component: StudentsummaryComponent,
        data: {
            title: 'Student Attendance Register',
            parent: 'Register'
        }
    },
    {
        path: 'studenttagging',
        component: StudenttaggingComponent,
        data: {
            title: 'Student Attendance Register',
            parent: 'Register'
        }
    },
    {
        path: 'studentwelfare',
        component: StudentwelfareComponent,
        data: {
            title: 'Student Attendance Register',
            parent: 'Register'
        }
    },
   
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterRoutingModule { }
