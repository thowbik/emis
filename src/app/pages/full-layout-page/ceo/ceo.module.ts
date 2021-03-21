import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { CeoComponent } from './ceo.component';
import { CeoRoutingModule } from './ceo-routing.module';
import { CeoService } from './ceo.service';
import { RteIntakeCapacityComponent } from './rte-intake-capacity/rte-intake-capacity.component';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import { NocCbscComponent } from './noc-cbsc/noc-cbsc.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import { NocForCbscComponent } from './noc-for-cbsc/noc-for-cbsc.component';
import { NocCbscStatusComponent } from './noc-cbsc-status/noc-cbsc-status.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SchoolApplyListComponent } from './school-apply-list/school-apply-list.component';
import { AccordionModule} from 'primeng/accordion';
import { StateDashboardService } from '../statedashboard/dashboard.services';
import { KeyFilterModule} from 'primeng/keyfilter';
import { RenewalListComponent } from './renewal-list/renewal-list.component';
import { RenewalForwardRejectComponent } from './renewal-forward-reject/renewal-forward-reject.component';
import { RenewalApplicationStatusComponent } from './renewal-application-status/renewal-application-status.component';
import { BrteMappingComponent } from './brte-mapping/brte-mapping.component';
import { PickListModule} from 'primeng/picklist';
import { TreeTableModule} from 'primeng/treetable';
import { StaffApprovalComponent } from './staff-approval/staff-approval.component';
import { RteStudentapprovalComponent } from './rte-studentapproval/rte-studentapproval.component';
import { PLAAttendanceComponent } from './pla-attendance/pla-attendance.component';
import { PlaInspectionComponent } from './pla-inspection/pla-inspection.component';
import { PlaAttendanceLearnersComponent } from './pla-attendance-learners/pla-attendance-learners.component';
import { PlaAttendanceCompletedComponent } from './pla-attendance-completed/pla-attendance-completed.component';
import { CompetationReportsComponent } from './competation-reports/competation-reports.component';
import {DialogModule} from 'primeng/dialog';



@NgModule({
    imports: [
        TreeTableModule,
        PickListModule,
        CommonModule,
        ConfirmDialogModule,
        CalendarModule,
        RadioButtonModule,
        FileUploadModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        CeoRoutingModule,
        TableModule,
        MultiSelectModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        TabViewModule,
        AccordionModule,
        KeyFilterModule,DialogModule
        
    ],
    exports: [],
    declarations: [
        CeoComponent,
        RteIntakeCapacityComponent,
        NocCbscComponent,
        NocForCbscComponent,
        NocCbscStatusComponent,
        LandingpageComponent,
        SchoolApplyListComponent,
        RenewalListComponent,
        RenewalForwardRejectComponent,
        RenewalApplicationStatusComponent,
        BrteMappingComponent,
        StaffApprovalComponent,
        RteStudentapprovalComponent,
        PLAAttendanceComponent,
        PlaInspectionComponent,
        PlaAttendanceLearnersComponent,
        PlaAttendanceCompletedComponent,
        CompetationReportsComponent,
    ],
    providers: [CeoService,ConfirmationService,StateDashboardService],
})
export class CeoModule { }
