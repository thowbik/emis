import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateDashboardComponent } from './dashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CommondashboardComponent } from './commondashboard/commondashboard.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { UploadComponent } from './upload/upload.component';
  const routes: Routes = [
    {
        path: 'statedashboard',
        component: StateDashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'mainpage',
        component: LandingpageComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'commondashboard/:user',
        component: CommondashboardComponent,
        data: {
            title: 'Dashboard'
        }
    },
    {
        path: 'studentdashboard',
        component: StudentdashboardComponent,
        data: {
            title: 'Student Dashboard'
        }
    },
    {
        path: 'uploads',
        component: UploadComponent,
        data: {
            title: 'Upload'
        }
    },
  
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class DashboardRoutingModule { }
