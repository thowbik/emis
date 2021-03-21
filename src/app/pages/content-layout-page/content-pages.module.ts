import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { UdisereportsprintComponent } from './udisereportsprint/udisereportsprint.component';
import { schoolsService } from '../full-layout-page/schools/schools.service';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import { SchoolRegistraionComponent } from './school-registraion/school-registraion.component';
import { SchoolregisterreportComponent } from './schoolregisterreport/schoolregisterreport.component';
import { NocpdfComponent } from './nocpdf/nocpdf.component';
import { NocpdfPart2Component } from './nocpdf-part2/nocpdf-part2.component';
import { CbscPrintpdfComponent } from './cbsc-printpdf/cbsc-printpdf.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RenewalreportComponent } from './renewalreport/renewalreport.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContentService } from './content.service';
import {PasswordModule} from 'primeng/password';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentTcFormComponent } from './student-tc-form/student-tc-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { TeachersassessmentreportComponent } from './teachersassessmentreport/teachersassessmentreport.component';
import { StudentassessmentreportComponent } from './studentassessmentreport/studentassessmentreport.component';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        ButtonModule,
        CarouselModule,
        FlexLayoutModule,
        MessagesModule,
        MessageModule,
        DialogModule,
        TableModule,
        InputTextModule,
        CardModule,ScrollPanelModule,

        PasswordModule
    ],
    declarations: [LoginComponent, UdisereportsprintComponent, SchoolRegistraionComponent, SchoolregisterreportComponent, NocpdfComponent, NocpdfPart2Component, CbscPrintpdfComponent, RenewalreportComponent, ResetPasswordComponent, StudentDetailsComponent, StudentTcFormComponent, StudentassessmentreportComponent, TeachersassessmentreportComponent],
    providers: [schoolsService,ContentService],
})
export class ContentPagesModule { }
