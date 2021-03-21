import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyUdatesComponent } from './daily-udates/daily-udates.component';
import {QuestionSetComponent} from './question-set/question-set.component';
import { ProjectCreationComponent } from './project-creation/project-creation.component'
import { ProjectReportComponent } from './project-report/project-report.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { AddBranchDetailsComponent } from './add-branch-details/add-branch-details.component';
import { ELearingReportComponent } from './e-learing-report/e-learing-report.component';

const routes: Routes = [

  {
    path: 'dailyupdates',
    component: DailyUdatesComponent,
    data: {
        title: 'Timesheet'
    }
  },
  {
    path: 'add/branch/details',
    component: AddBranchDetailsComponent,
    data: {
        title: 'Timesheet'
    }
  },
  {
    path: 'upload/content',
    component: UploadContentComponent,
    data: {
        title: 'Timesheet'
    }
  },
  {
    path: 'question-set',
    component: QuestionSetComponent,
    data: {
      title: 'Question-set'
    }
  },
  {
    path: 'projectcreation',
    component: ProjectCreationComponent,
    data: {
        title: 'Timesheet'
    }
  },
  {
    path: 'project/reports',
    component: ProjectReportComponent,
    data: {
        title: 'Timesheet'
    }
  },
  {
    path: 'elearn/content/reports',
    component: ELearingReportComponent,
    data: {
        title: 'Timesheet'
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
