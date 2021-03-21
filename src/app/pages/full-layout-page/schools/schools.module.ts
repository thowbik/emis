import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsComponent } from './schools.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { ClassSectionsComponent } from './class-sections/class-sections.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import {FieldsetModule} from 'primeng/fieldset';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CalendarModule} from 'primeng/calendar';
import { schoolsService } from './schools.service';
import {TabViewModule} from 'primeng/tabview';
import {RadioButtonModule} from 'primeng/radiobutton';
import { MastertimetableComponent } from './mastertimetable/mastertimetable.component';
import { WeeklytimetableComponent } from './weeklytimetable/weeklytimetable.component';
import { TodaytimetableComponent } from './todaytimetable/todaytimetable.component';
import {DropdownModule} from 'primeng/dropdown';
import { TeachertimetableComponent } from './teachertimetable/teachertimetable.component';
import { SchoolCommitteeComponent } from './school-committee/school-committee.component';
import { SchoolLandComponent } from './school-land/school-land.component';
import { SchoolInventoryComponent } from './school-inventory/school-inventory.component';
import { FundsComponent } from './funds/funds.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { SchoolBasicComponent } from './school-basic/school-basic.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import {ToastModule} from 'primeng';
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { SchoolNeedCsrComponent } from './school-need-csr/school-need-csr.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UdisereportComponent } from './udisereport/udisereport.component';
import { SharedModule } from '../sharedcomponent/shared.module';
import {AccordionModule} from 'primeng/accordion';
import { StudentSummaryComponent } from './student-summary/student-summary.component';
import { NoccbscaffiliationComponent } from './noc-cbsc-affiliation/noccbscaffiliation.component';
import { DataCorrectionComponent } from './data-correction/data-correction.component';
import { NewSchoolApplicationComponent } from './new-school-application/new-school-application.component';
import { StateDashboardService } from '../statedashboard/dashboard.services';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FitIndiaFormComponent } from './fit-india-form/fit-india-form.component';
import { FitIndiaReportComponent } from './fit-india-report/fit-india-report.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import {PickListModule} from 'primeng/picklist';
import { StudentNewadmissionComponent } from './student-newadmission/student-newadmission.component';
import { StudentNewadmissionfreshComponent } from './student-newadmissionfresh/student-newadmissionfresh.component';
import { RegistrationService } from '../registration/registration.service';
import { KGBVCWSNMappingComponent } from './kgbv-cwsn-mapping/kgbv-cwsn-mapping.component';
import { KGBVCWSNTrackingComponent } from './kgbv-cwsn-tracking/kgbv-cwsn-tracking.component';
import {ToolbarModule} from 'primeng/toolbar';
import { StudentsRaiseRequestComponent } from './students-raise-request/students-raise-request.component';
import { KgersMgmtMaintenanceComponent } from './kgers-mgmt-maintenance/kgers-mgmt-maintenance.component';
import { SelfDefenseTrainingComponent } from './self-defense-training/self-defense-training.component';
import { ManagementMaintenanceComponent } from './management-maintenance/management-maintenance.component';
import { KgbvStudentBankingDetailsComponent } from './kgbv-student-banking-details/kgbv-student-banking-details.component';
import { EBBillManagementComponent } from './eb-bill-management/eb-bill-management.component';
import { SchoolGrantsComponent } from './school-grants/school-grants.component';
import {MessageService} from 'primeng/api';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HealthProfileComponent } from './health-profile/health-profile.component';
import { StudenthealthCovidComponent } from './studenthealth-covid/studenthealth-covid.component';
import { ItProfileComponent } from './it-profile/it-profile.component';
import { SchoolCompetitionComponent } from './school-competition/school-competition.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { ShowQuestionsComponent } from './show-questions/show-questions.component';
import {EditorModule} from 'primeng/editor';
import { LearningOutcomeMasterComponent } from './learning-outcome-master/learning-outcome-master.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { CreateQuestionsetComponent } from './create-questionset/create-questionset.component';
import { SchoolBankDetailsComponent } from './school-bank-details/school-bank-details.component';
import { NsqfCompletionComponent } from './nsqf-completion/nsqf-completion.component';
// import { BicycleIssueComponent } from './bicycle-issue/bicycle-issue.component';
 @NgModule({
   imports: [
    ToolbarModule,
     CommonModule,SharedModule,
     RadioButtonModule,
     FormsModule,
     ReactiveFormsModule,
     SchoolsRoutingModule,
     TableModule,
     MultiSelectModule,
     DialogModule,
     ButtonModule,
     FieldsetModule,
     KeyFilterModule,
     CalendarModule,
     TabViewModule,
     RadioButtonModule,
     DropdownModule,
     CardModule,
     MessagesModule,
     MessageModule,
     CheckboxModule,
     ToastModule,
     PanelModule,
     InputTextareaModule,
     ConfirmDialogModule,
     FileUploadModule,
     GalleriaModule,
     ScrollPanelModule,
     AccordionModule,
     SelectButtonModule,
     PickListModule,
     PdfViewerModule,
     EditorModule,
     InputSwitchModule
   ],

    exports: [],
    declarations: [
        SchoolsComponent,
        SchoolListComponent,
        ClassSectionsComponent,
        SchoolProfileComponent,
        MastertimetableComponent,
        WeeklytimetableComponent,
        TodaytimetableComponent,
        TeachertimetableComponent,
        SchoolCommitteeComponent,
        SchoolLandComponent,
        SchoolInventoryComponent,
         SchoolDetailsComponent,
         FundsComponent,
         TrainingDetailsComponent,
        SchoolBasicComponent,
        SchoolDetailsComponent,
        SchoolNeedCsrComponent,
        UdisereportComponent,
        StudentSummaryComponent,
        NoccbscaffiliationComponent,
        DataCorrectionComponent,
        NewSchoolApplicationComponent,
        FitIndiaFormComponent,
        FitIndiaReportComponent,
        StudentPromotionComponent,
        StudentNewadmissionComponent,
        StudentNewadmissionfreshComponent,
        KGBVCWSNMappingComponent,
        KGBVCWSNTrackingComponent,
        StudentsRaiseRequestComponent,
        KgersMgmtMaintenanceComponent,
        SelfDefenseTrainingComponent,
        ManagementMaintenanceComponent,
        KgbvStudentBankingDetailsComponent,
        EBBillManagementComponent,
        SchoolGrantsComponent,
        HealthProfileComponent,
        StudenthealthCovidComponent,
        ItProfileComponent,
        SchoolCompetitionComponent,
        CreateQuestionsComponent,
        ShowQuestionsComponent,
        LearningOutcomeMasterComponent,
        CreateQuestionsetComponent,
        SchoolBankDetailsComponent,
        NsqfCompletionComponent,
        // BicycleIssueComponent
    ],
    providers: [schoolsService, ConfirmationService,StateDashboardService,RegistrationService,DatePipe,MessageService],
})
export class SchoolsModule { }
