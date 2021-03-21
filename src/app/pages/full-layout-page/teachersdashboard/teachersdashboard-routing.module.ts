import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersdashboardComponent } from './teachersdashboard.component';
import {EditSchoolProfileComponent} from '../sharedcomponent/edit-school-profile/edit-school-profile.component';
  const routes: Routes = [
    {
        path: '',
        component: TeachersdashboardComponent,
        data: {
            title: 'Teachers'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class TeachersDashboardRoutingModule { }
