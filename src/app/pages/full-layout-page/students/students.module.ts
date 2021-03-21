import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentlistComponent } from './studentlist.component';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import { StudentAdmissionComponent } from './student-admission/student-admission.component';
import { StudentCommonPoolComponent } from './student-common-pool/student-common-pool.component';
import { StudentTaggingComponent } from './student-tagging/student-tagging.component';
import { AcademicRecordsComponent } from './academic-records/academic-records.component';
import { TransferPromotionComponent } from './transfer-promotion/transfer-promotion.component';
import { StudentSummaryComponent } from './student-summary/student-summary.component';
import { StudentService } from './student.service';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import { CoScholasticComponent } from './co-scholastic/co-scholastic.component';
import { MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import { UidaiValidationModule } from 'ng2-uidai-validation';
import { TextbookHrsecComponent } from './textbook-hrsec/textbook-hrsec.component';
import { SchemeSummaryComponent } from './scheme-summary/scheme-summary.component';
import { NoonmealComponent } from './noonmeal/noonmeal.component';
import { UniformComponent } from './uniform/uniform.component';
import { LaptopComponent } from './laptop/laptop.component';
import { BicycleIssueComponent} from '../schools/bicycle-issue/bicycle-issue.component';
import { TextbookComponent } from './textbook/textbook.component';
import { TextbookSecComponent } from './textbook-sec/textbook-sec.component';
import { FieldsetModule} from 'primeng/fieldset';
import { InvalidAadharcountComponent } from './invalid-aadharcount/invalid-aadharcount.component';
import { InvalidPhonecountComponent } from './invalid-phonecount/invalid-phonecount.component';
import { MigrantStudentListComponent } from './migrant-student-list/migrant-student-list.component';
import { Class7SlasReportComponent } from './class7-slas-report/class7-slas-report.component';
import { StudentTcDetailsComponent } from './student-tc-details/student-tc-details.component';
import { SpecialCashIncentiveComponent } from './special-cash-incentive/special-cash-incentive.component';
import { StudentMigrationReportComponent } from './student-migration-report/student-migration-report.component';
import { StudentCommonPoolReportComponent } from './student-common-pool-report/student-common-pool-report.component';
import { PendingTransferRequestComponent } from './pending-transfer-request/pending-transfer-request.component';
import { CwsnDetailsComponent } from './cwsn-details/cwsn-details.component';
import { BoardXamCordinatorComponent } from './board-xam-cordinator/board-xam-cordinator.component';
import { OscstudentsComponent } from './oscstudents/oscstudents.component';
import { ReportsForTeacherAssignedComponent } from './reports-for-teacher-assigned/reports-for-teacher-assigned.component';
import { RteReimbursementComponent } from './rte-reimbursement/rte-reimbursement.component';
import { RTEDailyReportComponent } from './rtedaily-report/rtedaily-report.component';
import { RteApplicantsComponent } from './rte-applicants/rte-applicants.component';
import { StudentAdmissionApprovalComponent } from './student-admission-approval/student-admission-approval.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PickListModule} from 'primeng/picklist';
import { FileUploadModule } from 'primeng/fileupload';
import {AccordionModule} from 'primeng/accordion';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StudentsRoutingModule,
        TableModule,
        DropdownModule,
        MultiSelectModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        SliderModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        CardModule,
        ButtonModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        KeyFilterModule,
        CalendarModule,
        UidaiValidationModule,
        FieldsetModule,InputSwitchModule,
        SelectButtonModule,
        
        ConfirmDialogModule,
        PickListModule,
        FileUploadModule,
        AccordionModule,
     
    ],
    exports: [],
    declarations: [
        StudentsComponent,
        StudentlistComponent,
        StudentAdmissionComponent,
        StudentCommonPoolComponent,
        StudentTaggingComponent,
        AcademicRecordsComponent,
        TransferPromotionComponent,
        StudentSummaryComponent,
        CoScholasticComponent,
        TextbookHrsecComponent,
        SchemeSummaryComponent,
        NoonmealComponent,
        UniformComponent,
        BicycleIssueComponent,
        LaptopComponent,
        TextbookComponent,
        TextbookSecComponent,
        InvalidAadharcountComponent,
        InvalidPhonecountComponent,
        MigrantStudentListComponent,
        Class7SlasReportComponent,
        StudentTcDetailsComponent,
        SpecialCashIncentiveComponent,
        StudentMigrationReportComponent,
        StudentCommonPoolReportComponent,
        PendingTransferRequestComponent,
        CwsnDetailsComponent,
        BoardXamCordinatorComponent,
        OscstudentsComponent,
        ReportsForTeacherAssignedComponent,
        RteReimbursementComponent,
        RTEDailyReportComponent,
        RteApplicantsComponent,
        StudentAdmissionApprovalComponent,
        PagenotfoundComponent,
       
    ],
    providers: [StudentService,MessageService,DatePipe],
})
export class StudentModule { }
