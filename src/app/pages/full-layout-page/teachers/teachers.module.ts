import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersComponent } from './teachers.component';
import { TeachersRoutingModule } from './teachers-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CardModule} from 'primeng/card';
import { SchoolStaffComponent } from './school-staff/school-staff.component';
import { StaffOnDeputationComponent } from './staff-on-deputation/staff-on-deputation.component';
import { VolunteerTeachersComponent } from './volunteer-teachers/volunteer-teachers.component';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import { UidaiValidationModule } from 'ng2-uidai-validation';
import { TeacherService } from './teacher.service';
import { StafflogindetailComponent } from './stafflogindetail/stafflogindetail.component';
import { PindicsHmevaluationComponent } from './pindics-hmevaluation/pindics-hmevaluation.component';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';
import {EditorModule} from 'primeng/editor';
import { AddEditStaffComponent } from './add-edit-staff/add-edit-staff.component';
import { StaffTrainingDetailsComponent } from './staff-training-details/staff-training-details.component';
import { VocationalStaffNsqfRegComponent } from './vocational-staff-nsqf-reg/vocational-staff-nsqf-reg.component';
import { StaffFixationComponent } from './staff-fixation/staff-fixation.component';
import { ApprovalForTransferRequestComponent } from './approval-for-transfer-request/approval-for-transfer-request.component';
import { TeacherAcadamicQualificationComponent } from './teacher-acadamic-qualification/teacher-acadamic-qualification.component';
import { TeacherProfQualificationComponent } from './teacher-prof-qualification/teacher-prof-qualification.component';
import { BTTeachersComponent } from './bt-teachers/bt-teachers.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { TeacherHomeworkComponent } from './teacher-homework/teacher-homework.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TrainingConductedComponent } from './training-conducted/training-conducted.component';
import { TeachersDetailsComponent } from './teachers-details/teachers-details.component';
import { TeacherStudentComponent } from './teacher-student/teacher-student.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import {AccordionModule} from 'primeng/accordion';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MappingskillComponent } from './mappingskill/mappingskill.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TeachersRoutingModule,
        TabViewModule,
        TableModule,
        ButtonModule,
        DialogModule ,
        InputTextModule,
        CalendarModule,
        ScrollPanelModule,
        CardModule,
        UidaiValidationModule,
        TabViewModule,
        DropdownModule,
        FieldsetModule,
        MultiSelectModule,
        RadioButtonModule,
        CheckboxModule,
        PanelModule,
        EditorModule,
        ConfirmDialogModule,
        AccordionModule,
        MessagesModule,
        MessageModule
    ],
    exports: [],
    declarations: [
        TeachersComponent,
        SchoolStaffComponent,
        StaffOnDeputationComponent,
        VolunteerTeachersComponent,
        StafflogindetailComponent,
        PindicsHmevaluationComponent,
        AddEditStaffComponent,
        StaffTrainingDetailsComponent,
        VocationalStaffNsqfRegComponent,
        StaffFixationComponent,
        ApprovalForTransferRequestComponent,
        TeacherAcadamicQualificationComponent,
        TeacherProfQualificationComponent,
        BTTeachersComponent,
        TrainingDetailsComponent,
        TrainingConductedComponent,
        TeacherHomeworkComponent,
        TeachersDetailsComponent,
        TeacherStudentComponent,
        StaffDetailsComponent,
        MappingskillComponent,
    ],
    providers: [TeacherService,ConfirmationService,DatePipe],
})
export class TeachersModule { }