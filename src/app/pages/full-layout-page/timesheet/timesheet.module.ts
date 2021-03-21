import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { DailyUdatesComponent } from './daily-udates/daily-udates.component';
import { TimesheetService } from './timesheet.service';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ProjectCreationComponent } from './project-creation/project-creation.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { QuestionSetComponent } from './question-set/question-set.component';
import {DialogModule} from 'primeng';
import {FileUploadModule} from 'primeng/fileupload';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { AddBranchDetailsComponent } from './add-branch-details/add-branch-details.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ELearingReportComponent } from './e-learing-report/e-learing-report.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import {ConfirmationService} from 'primeng/api';

@NgModule({
  imports: [
      CommonModule,InputTextareaModule,
      // ConfirmationService,
      FileUploadModule,
      ConfirmDialogModule,
      FormsModule,
      ReactiveFormsModule,
      TimesheetRoutingModule,
      CardModule,
      CalendarModule,
      InputTextModule,
      DropdownModule,
      MessageModule,
      MessagesModule,
      TableModule,
      DialogModule
    ],
  exports: [],
  declarations: [
    // TimesheetComponent,
    DailyUdatesComponent,
    QuestionSetComponent,
    ProjectCreationComponent,
    ProjectReportComponent,
    UploadContentComponent,
    AddBranchDetailsComponent,
    ELearingReportComponent
  ],
  providers: [TimesheetService],
})

export class TimesheetModule { }
