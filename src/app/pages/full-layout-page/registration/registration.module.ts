import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { RegistrationRoutingModule } from './registration-routing.module';
import { StepsModule} from 'primeng/steps';
import { SchoolDetailRegistraionComponent } from './school-detail-registraion/school-detail-registraion.component';
import { MessagesModule} from 'primeng/messages';
import { MessageModule} from 'primeng/message';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import { SchoolRecognitionRenewalStatusComponent } from './school-recognition-renewal-status/school-recognition-renewal-status.component';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import { StateDashboardService } from '../statedashboard/dashboard.services';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';




@NgModule({
  imports: [
      CommonModule,
      ConfirmDialogModule,
      TabViewModule,
      InputTextareaModule,
      DialogModule,
      TableModule,
      ToolbarModule,
      FormsModule,
      ReactiveFormsModule,
      CheckboxModule,
      CalendarModule,
      RegistrationRoutingModule,
      StepsModule,
      MessagesModule,
      MessageModule,
      CardModule,
      AccordionModule,
      RadioButtonModule,
      DropdownModule
    ],
  exports: [],
  declarations: [
 
 
  SchoolDetailRegistraionComponent,
 
 
  SchoolRecognitionRenewalStatusComponent],
  providers: [RegistrationService, StateDashboardService,ConfirmationService],
})
export class RegistrationModule { }
