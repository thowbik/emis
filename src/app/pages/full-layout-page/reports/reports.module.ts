import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ReportsService} from './reports.service';
import { ReportsRoutingModule } from './reports-routing.module';
import { ChildrenSplNeedsComponent } from '../reports/children-spl-needs/children-spl-needs.component';
import { PrePrimaryComponent } from './pre-primary/pre-primary.component';
import {DialogModule} from 'primeng/dialog';
import { CwsnPreviousAcademicYearComponent } from './cwsn-previous-academic-year/cwsn-previous-academic-year.component';
import { RegularstudentsuniversityexamComponent } from './regularstudentsuniversityexam/regularstudentsuniversityexam.component';
import { TableModule} from 'primeng/table';
import {CardModule, CarouselModule, LightboxModule, TabViewModule} from 'primeng';
import { StreamSchoolComponent } from './stream-school/stream-school.component';
import { AcademicSchoolComponent } from './academic-school/academic-school.component';
import { OtherregularstudentsunivexamComponent } from './otherregularstudentsunivexam/otherregularstudentsunivexam.component';
import { VocationlEducationComponent } from './vocationl-education/vocationl-education.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { StudentsfacilitiesComponent } from './studentsfacilities/studentsfacilities.component';
import { AcademicsclMinorityComponent } from './academicscl-minority/academicscl-minority.component';
import { StudentsNewadmissionComponent } from './students-newadmission/students-newadmission.component';
import { TeachingStaffComponent } from './teaching-staff/teaching-staff.component';
import { NonTeachingStaffComponent } from './non-teaching-staff/non-teaching-staff.component';
import { EnrolmentCurrentAcademicSessionComponent } from './enrolment-current-academic-session/enrolment-current-academic-session.component';
import { VocationalLabComponent } from './vocational-lab/vocational-lab.component';
import { ClassesConductedComponent } from './classes-conducted/classes-conducted.component';
import { SkillTrainingProvidersComponent } from './skill-training-providers/skill-training-providers.component';
import { FacilitiesProvidedChildrenComponent } from './facilities-provided-children/facilities-provided-children.component';
import { BoardExmResultComponent } from './board-exm-result/board-exm-result.component';
import { EnrolmentMediumInstructionComponent } from './enrolment-medium-instruction/enrolment-medium-instruction.component';
import { RepeatersGradeComponent } from './repeaters-grade/repeaters-grade.component';
import { EnrolmentByGradeComponent } from './enrolment-by-grade/enrolment-by-grade.component';
import { EnrollmentSocialcategoryComponent } from './enrollment-socialcategory/enrollment-socialcategory.component';
import { ResultsOfTheGradeRegularComponent } from './results-of-the-grade-regular/results-of-the-grade-regular.component';
import { ResultsOfTheGradeNonregularComponent } from './results-of-the-grade-nonregular/results-of-the-grade-nonregular.component';
import { ResultsOfTheGradeRegularMarksComponent } from './results-of-the-grade-regular-marks/results-of-the-grade-regular-marks.component';
import { ResultsOfTheGradeNonregularMarksComponent } from './results-of-the-grade-nonregular-marks/results-of-the-grade-nonregular-marks.component';
import { ExamresultgradefiveComponent } from './examresultgradefive/examresultgradefive.component';
import { ReceiptsAndExpenditureComponent } from './receipts-and-expenditure/receipts-and-expenditure.component';
import { UdiseMonitoringReportsComponent } from './udise-monitoring-reports/udise-monitoring-reports.component';
import {DropdownModule} from 'primeng/dropdown';
import { StateRenewalRecognitionComponent } from './state-renewal-recognition/state-renewal-recognition.component';
import { StateBeoRenewalRecognitionComponent } from './state-beo-renewal-recognition/state-beo-renewal-recognition.component';
import { StateCeoRenewalRecognitionComponent } from './state-ceo-renewal-recognition/state-ceo-renewal-recognition.component';
import { StateDeoRenewalRecognitionComponent } from './state-deo-renewal-recognition/state-deo-renewal-recognition.component';
import { StateRejectedRenewalRecognitionComponent } from './state-rejected-renewal-recognition/state-rejected-renewal-recognition.component';
import { SchoolProfileVerificationReportsComponent } from './school-profile-verification-reports/school-profile-verification-reports.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { RTEApplicantVerificationComponent } from './rte-applicant-verification/rte-applicant-verification.component';
import { BeoAssignmentComponent } from './beo-assignment/beo-assignment.component';
import { HelpVideoComponent } from './help-video/help-video.component';
import { ParttimeTeachernameComponent } from './parttime-teachername/parttime-teachername.component';
import { StateApprovedRenewalRecognitionComponent } from './state-approved-renewal-recognition/state-approved-renewal-recognition.component';
import { RteApplicationStatusComponent } from './rte-application-status/rte-application-status.component';
import { RteTypewiseApplicationComponent } from './rte-typewise-application/rte-typewise-application.component';
import { VocationalsubjectXComponent } from './vocationalsubject-x/vocationalsubject-x.component';
import { VocationalsubjectXIIComponent } from './vocationalsubject-xii/vocationalsubject-xii.component';
import { NsqfVocationalcourseComponent } from './nsqf-vocationalcourse/nsqf-vocationalcourse.component';
import { PtStaffPaidedReportComponent } from './pt-staff-paided-report/pt-staff-paided-report.component';
import { ParttimeTeachersComponent } from './parttime-teachers/parttime-teachers.component';
import { TeachersClassTaughtComponent } from './teachers-class-taught/teachers-class-taught.component';
import { StatisticalReportComponent } from './statistical-report/statistical-report.component';
import { VerficationstatusmonitoringComponent } from './verficationstatusmonitoring/verficationstatusmonitoring.component';
import { ManagementStatisticalReportComponent } from './management-statistical-report/management-statistical-report.component';
import { SchoolswithoutdataComponent } from './schoolswithoutdata/schoolswithoutdata.component';
import { RepeatersallComponent } from './repeatersall/repeatersall.component';
import { BTTeachersComponent } from './bt-teachers/bt-teachers.component';
import { StaffFixationComponent } from './staff-fixation/staff-fixation.component';
import { UdiseSummaryReportComponent } from './udise-summary-report/udise-summary-report.component';
import { SpecialCashIncentiveComponent } from './special-cash-incentive/special-cash-incentive.component';
import { StaffTrainingDetailsComponent } from './staff-training-details/staff-training-details.component';
import { SchoolmasterComponent } from './schoolmaster/schoolmaster.component';
import { MultiSelectModule } from 'primeng/multiselect';
import {ToolbarModule} from 'primeng/toolbar';
import { SmcUploadreportComponent } from './smc-uploadreport/smc-uploadreport.component';




 @NgModule({
   imports: [
     CalendarModule,
     ToolbarModule,
     MultiSelectModule,
     DialogModule,
     DropdownModule,
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     ReportsRoutingModule,
     TableModule,
     TabViewModule,
     CardModule,
     RadioButtonModule,
     CardModule,
     KeyFilterModule,
     MessagesModule,
     MessageModule,
     LightboxModule,
     CarouselModule
   ],
    exports: [],
    declarations: [
      ChildrenSplNeedsComponent,
      TeachersClassTaughtComponent,
        PrePrimaryComponent,
      CwsnPreviousAcademicYearComponent,
      RegularstudentsuniversityexamComponent,
      OtherregularstudentsunivexamComponent,
      VocationlEducationComponent,
      StreamSchoolComponent,
      AcademicSchoolComponent,
       StudentsfacilitiesComponent,
       AcademicsclMinorityComponent,
       StudentsNewadmissionComponent,
       TeachingStaffComponent,
       NonTeachingStaffComponent,
       EnrolmentCurrentAcademicSessionComponent,
       VocationalLabComponent,
       ClassesConductedComponent,
       SkillTrainingProvidersComponent,
       FacilitiesProvidedChildrenComponent,
       BoardExmResultComponent,
       EnrolmentMediumInstructionComponent,
       RepeatersGradeComponent,
       EnrolmentByGradeComponent,
       EnrollmentSocialcategoryComponent,
       ResultsOfTheGradeRegularComponent,
       ResultsOfTheGradeNonregularComponent,
       ResultsOfTheGradeRegularMarksComponent,
       ResultsOfTheGradeNonregularMarksComponent,
       ExamresultgradefiveComponent,
       ReceiptsAndExpenditureComponent,
       UdiseMonitoringReportsComponent,
       StateRenewalRecognitionComponent,
       StateBeoRenewalRecognitionComponent,
       StateCeoRenewalRecognitionComponent,
       StateDeoRenewalRecognitionComponent,
       StateRejectedRenewalRecognitionComponent,
       SchoolProfileVerificationReportsComponent,
       ApplicationStatusComponent,
       RTEApplicantVerificationComponent,
       BeoAssignmentComponent,
       HelpVideoComponent,
       ParttimeTeachernameComponent,
       StateApprovedRenewalRecognitionComponent,
       RteApplicationStatusComponent,
       RteTypewiseApplicationComponent,
       VocationalsubjectXComponent,
       VocationalsubjectXIIComponent,
       NsqfVocationalcourseComponent,
       PtStaffPaidedReportComponent,
       ParttimeTeachersComponent,
       StatisticalReportComponent,
       VerficationstatusmonitoringComponent,
       ManagementStatisticalReportComponent,
       SchoolswithoutdataComponent,
       RepeatersallComponent,
       BTTeachersComponent,
       StaffFixationComponent,
       UdiseSummaryReportComponent,
       SpecialCashIncentiveComponent,
       StaffTrainingDetailsComponent,
       SchoolmasterComponent,
       SmcUploadreportComponent,
      ],
    providers: [ReportsService],
})
export class ReportsModule { }
