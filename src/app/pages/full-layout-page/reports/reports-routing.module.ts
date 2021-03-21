import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChildrenSplNeedsComponent} from './children-spl-needs/children-spl-needs.component';
import { PrePrimaryComponent } from '../reports/pre-primary/pre-primary.component';
import { CwsnPreviousAcademicYearComponent } from './cwsn-previous-academic-year/cwsn-previous-academic-year.component';
import { RegularstudentsuniversityexamComponent } from './regularstudentsuniversityexam/regularstudentsuniversityexam.component';
import {StreamSchoolComponent} from './stream-school/stream-school.component';
import {AcademicSchoolComponent} from './academic-school/academic-school.component';
import { OtherregularstudentsunivexamComponent } from './otherregularstudentsunivexam/otherregularstudentsunivexam.component';
import { VocationlEducationComponent } from './vocationl-education/vocationl-education.component';
import { StudentsfacilitiesComponent } from './studentsfacilities/studentsfacilities.component';
import {AcademicsclMinorityComponent} from './academicscl-minority/academicscl-minority.component';
import { StudentsNewadmissionComponent } from './students-newadmission/students-newadmission.component';
import { TeachingStaffComponent } from './teaching-staff/teaching-staff.component';
import { NonTeachingStaffComponent } from './non-teaching-staff/non-teaching-staff.component';
import { EnrolmentCurrentAcademicSessionComponent } from './enrolment-current-academic-session/enrolment-current-academic-session.component';
import { VocationalLabComponent } from './vocational-lab/vocational-lab.component';
import { ClassesConductedComponent } from './classes-conducted/classes-conducted.component';
import { SkillTrainingProvidersComponent } from './skill-training-providers/skill-training-providers.component';
import { FacilitiesProvidedChildrenComponent } from './facilities-provided-children/facilities-provided-children.component';
import { EnrolmentMediumInstructionComponent } from './enrolment-medium-instruction/enrolment-medium-instruction.component';
import { RepeatersGradeComponent } from './repeaters-grade/repeaters-grade.component';
import {BoardExmResultComponent} from './board-exm-result/board-exm-result.component';
import { EnrollmentSocialcategoryComponent } from './enrollment-socialcategory/enrollment-socialcategory.component';
import {EnrolmentByGradeComponent} from './enrolment-by-grade/enrolment-by-grade.component';
import { ResultsOfTheGradeNonregularComponent } from './results-of-the-grade-nonregular/results-of-the-grade-nonregular.component';
import { ResultsOfTheGradeNonregularMarksComponent } from './results-of-the-grade-nonregular-marks/results-of-the-grade-nonregular-marks.component';
import { ResultsOfTheGradeRegularComponent } from './results-of-the-grade-regular/results-of-the-grade-regular.component';
import { ResultsOfTheGradeRegularMarksComponent } from './results-of-the-grade-regular-marks/results-of-the-grade-regular-marks.component';
import {ExamresultgradefiveComponent} from './examresultgradefive/examresultgradefive.component';
import {ReceiptsAndExpenditureComponent} from './receipts-and-expenditure/receipts-and-expenditure.component';
import { UdiseMonitoringReportsComponent } from './udise-monitoring-reports/udise-monitoring-reports.component';
import { StateRenewalRecognitionComponent } from './state-renewal-recognition/state-renewal-recognition.component';
import { StateBeoRenewalRecognitionComponent } from './state-beo-renewal-recognition/state-beo-renewal-recognition.component';
import { StateCeoRenewalRecognitionComponent } from './state-ceo-renewal-recognition/state-ceo-renewal-recognition.component';
import { StateDeoRenewalRecognitionComponent } from './state-deo-renewal-recognition/state-deo-renewal-recognition.component';
import { StateRejectedRenewalRecognitionComponent } from './state-rejected-renewal-recognition/state-rejected-renewal-recognition.component';
import { SchoolProfileVerificationReportsComponent } from './school-profile-verification-reports/school-profile-verification-reports.component';
import {ApplicationStatusComponent} from './application-status/application-status.component';
import { RTEApplicantVerificationComponent } from './rte-applicant-verification/rte-applicant-verification.component';
import { BeoAssignmentComponent } from './beo-assignment/beo-assignment.component';
import {HelpVideoComponent} from './help-video/help-video.component';
import { ParttimeTeachernameComponent } from './parttime-teachername/parttime-teachername.component';
import { StateApprovedRenewalRecognitionComponent } from './state-approved-renewal-recognition/state-approved-renewal-recognition.component';
import {RteApplicationStatusComponent} from './rte-application-status/rte-application-status.component';
import {RteTypewiseApplicationComponent} from './rte-typewise-application/rte-typewise-application.component';
import { VocationalsubjectXComponent } from './vocationalsubject-x/vocationalsubject-x.component';
import { VocationalsubjectXIIComponent } from './vocationalsubject-xii/vocationalsubject-xii.component';
import { NsqfVocationalcourseComponent } from './nsqf-vocationalcourse/nsqf-vocationalcourse.component';
import { PtStaffPaidedReportComponent } from './pt-staff-paided-report/pt-staff-paided-report.component';
import {ParttimeTeachersComponent} from './parttime-teachers/parttime-teachers.component';
import {TeachersClassTaughtComponent} from './teachers-class-taught/teachers-class-taught.component';
import {StatisticalReportComponent} from "./statistical-report/statistical-report.component";
import { VerficationstatusmonitoringComponent } from "./verficationstatusmonitoring/verficationstatusmonitoring.component"
import {ManagementStatisticalReportComponent} from "./management-statistical-report/management-statistical-report.component";
import { SchoolswithoutdataComponent } from "./schoolswithoutdata/schoolswithoutdata.component";
import { RepeatersallComponent } from './repeatersall/repeatersall.component';
import {BTTeachersComponent} from "./bt-teachers/bt-teachers.component";
import {StaffTrainingDetailsComponent} from "./staff-training-details/staff-training-details.component";
import {StaffFixationComponent} from "./staff-fixation/staff-fixation.component";
import { UdiseSummaryReportComponent } from './udise-summary-report/udise-summary-report.component';
import { SpecialCashIncentiveComponent } from './special-cash-incentive/special-cash-incentive.component';
import { SchoolmasterComponent } from './schoolmaster/schoolmaster.component';
import { SmcUploadreportComponent } from './smc-uploadreport/smc-uploadreport.component';

const routes: Routes = [
  {
    path: 'reports/children-special-needs',
    component: ChildrenSplNeedsComponent,
    data: {
      title: 'Children with Special Needs',
      parent: 'School'
    }
  },
  {
    path: 'validation/summary/reports',
    component: UdiseSummaryReportComponent,
    data: {
      title: 'Children with Special Needs',
      parent: 'School'
    }
  },
  {
    path: 'reports/teacher-class-taught',
    component: TeachersClassTaughtComponent,
    data: {
      title: 'ptstaffpaidedreport',
    }
  },
  {
    path: 'reports/parttime-teachers',
    component: ParttimeTeachersComponent,
    data: {
      title: 'Part Time Teachers'
    }
  },
  {
    path: 'school/profile/verification/reports',
    component: SchoolProfileVerificationReportsComponent,
    data: {
      title: 'State Profile Verification',
     }
  },
  {
    path: 'rte/applicant/verification',
    component: RTEApplicantVerificationComponent,
    data: {
      title: 'RTE Applicant Verification',
     }
  },
   {
    path: 'state/renewal/recognition',
    component: StateRenewalRecognitionComponent,
    data: {
      title: 'State Renewal Recognition',
     }
  },
  {
    path: 'state/beo/renewal/recognition',
    component: StateBeoRenewalRecognitionComponent,
    data: {
      title: 'State Renewal Recognition',
     }
  },
  {
    path: 'state/ceo/renewal/recognition',
    component: StateCeoRenewalRecognitionComponent,
    data: {
      title: 'State Renewal Recognition',
     }
  },
  {
    path: 'state/deo/renewal/recognition',
    component: StateDeoRenewalRecognitionComponent,
    data: {
      title: 'State Renewal Recognition',
     }
  },
  {
    path: 'state/rejection/renewal/recognition',
    component: StateRejectedRenewalRecognitionComponent,
    data: {
      title: 'State Renewal Recognition',
     }
  },
  {
    path: 'state/approved/renewal/recognition',
    component: StateApprovedRenewalRecognitionComponent,
    data: {
      title: 'State Renewal Recognition',
     }
  },
  {
    path: 'student_facilitise',
    component: StudentsfacilitiesComponent,
    data: {
      title: 'Children Special facilities',
      parent: 'School'
    }
  },
  {
    path: 'reports/enrollment-socialcategory',
    component: EnrollmentSocialcategoryComponent,
    data: {
      title: 'Enrolment Social Category  ',
      parent: 'School'
    }
  },
  {
    path: 'regularstudentuniversityexam',
    component: RegularstudentsuniversityexamComponent,
    data: {
      title: 'University Examination for Regular Student',
      parent: 'School'
    }
  },
  {
    path: 'reports/stream_school',
    component: StreamSchoolComponent,
    data: {
      title: 'Availability of academic stream in the school',
      parent: 'School'
    }
  },
  {
    path: 'reports/academic-school',
    component: AcademicSchoolComponent,
    data: {
      title: 'Enrolment and Repeaters by academic stream',
      parent: 'School'
    }
  },
  {
    path: 'reports/academic_school_minority',
    component: AcademicsclMinorityComponent,
    data: {
      title: 'Enrolment and repeaters by academic stream (by Minority groups)',
      parent: 'School'
    }
  },
   {
     path: 'lreports/board-exam-resut',
     component: BoardExmResultComponent,
     data: {
       title: 'Board Examination Result',
       parent: 'School'
     }
   },
   {
    path: 'reports/udise-19-20-monitoring-reports',
    component: UdiseMonitoringReportsComponent,
    data: {
      title: 'Board Examination Result',
      parent: 'School'
    }
  },
  {
    path: 'otherregularstudentunivexam',
    component: OtherregularstudentsunivexamComponent,
    data: {
      title: 'University Examination for Other than Regular Student',
      parent: 'School'
    }
  },

  {
    path : 'reports/NSQfvoNScational',
    component : NsqfVocationalcourseComponent,
    data : {
      title : 'Vocationl Education',
      parent : 'School'
    }
  },
  {
    path : 'reports/vocational-education',
    component : VocationlEducationComponent,
    data : {
      title : 'Vocationl Education',
      parent : 'School'
    }
  },
  {
    path: 'cwsn_details',
    component: CwsnPreviousAcademicYearComponent,
    data: {
      title: 'CWSN Previou sAcademic Year',
      parent: 'School'
    }
  },
  {
    path : 'reports/teaching-staff',
    component: TeachingStaffComponent,
    data : {
      title : 'Teaching Staff',
      parent: 'School'
    }
  },
  {
    path : 'reports/non-teaching-staff',
    component: NonTeachingStaffComponent,
    data : {
      title : 'Non Teaching Staff',
      parent: 'School'
    }
  },
  {
    path : 'reports/enrolment-current-academic-session',
    component : EnrolmentCurrentAcademicSessionComponent,
    data : {
      title : 'Enrolment Current Academic Session',
      parent : 'School'
    }
  },
  {
    path : 'reports/vocational-lab',
    component : VocationalLabComponent,
    data : {
      title : 'Vocational Lab',
      parent : 'School'
    }
  },
  {
    path : 'reports/classes-conducted',
    component : ClassesConductedComponent,
    data : {
      title : 'Classes Conducted',
      parent : 'School'
    }
  },
  {
    path : 'reports/vocationalsubjectX',
    component : VocationalsubjectXComponent,
    data : {
      title : 'vocationalsubjectX',
      parent : 'School'
    }
  },
  {
    path : 'reports/vocationalsubjectXII',
    component : VocationalsubjectXIIComponent,
    data : {
      title : 'vocationalsubjectXII',
      parent : 'School'
    }
  },
    {
      path : 'reports/skill-training-providers',
      component : SkillTrainingProvidersComponent,
      data : {
        title : 'Skill Training Providers',
        parent : 'School'
      }
  },
  {
    path : 'reports/facilities-provided-children',
    component : FacilitiesProvidedChildrenComponent,
    data : {
      title : 'Facilities Provided to Children',
      parent : 'School'
    }
  },
  {
    path : 'reports/enrolment-medium-instruction',
    component : EnrolmentMediumInstructionComponent,
    data : {
      title : 'Enrolment Medium Instruction',
      parent : 'School'
    }
  },
  {
    path : 'reports/repeaters-grade',
    component : RepeatersGradeComponent,
    data : {
      title : 'Enrolment Medium Instruction',
      parent : 'School'
    }
  },
  {
    path : 'reports/repeaters-all',
    component : RepeatersallComponent,
    data : {
      title : 'Enrolment Repeaters All',
      parent : 'School'
    }
  },
   {
     path : 'reports/enrolment-academic-session-age',
     component : EnrolmentByGradeComponent,
     data : {
       title : 'Enrolment Medium Instruction',
       parent : 'School'
     }
   },
   {
     path : 'gisvideos',
     component : HelpVideoComponent,
     data : {
       title : 'EMIS Help Video',
       parent : 'State'
     }
   },
   {
    path : 'reports/results-of-grade-non-regular',
    component : ResultsOfTheGradeNonregularComponent,
    data : {
      title : 'Results Of The Grade Non Regular',
      parent : 'School'
    }
  },
  {
    path : 'reports/results-of-grade-non-regular-marks',
    component : ResultsOfTheGradeNonregularMarksComponent,
    data : {
      title : 'Results Of The Grade Non-Regular Marks',
      parent : 'School'
    }
  },
  {
    path : 'reports/results-of-grade-regular',
    component : ResultsOfTheGradeRegularComponent,
    data : {
      title : 'Results Of The Grade Regular',
      parent : 'School'
    }
  },
  {
    path : 'reports/results-of-grade-regular-marks',
    component : ResultsOfTheGradeRegularMarksComponent,
    data : {
      title : 'Results Of The Grade Regular Marks',
      parent : 'School'
    }
  },
   {
     path : 'reports/annual-exm-result-grade',
     component : ExamresultgradefiveComponent,
     data : {
       title : 'Annual Examination Result in Previous Year for Grade V',
       parent : 'School'
     }
   },
   {
     path : 'reports/receipts-and-expend',
     component : ReceiptsAndExpenditureComponent,
     data : {
       title : 'Receipts and Expenditure',
       parent : 'School'
     }
   },
   {
      path: 'reports/application-status',
      component: ApplicationStatusComponent,
      data: {
        title: 'Application Status',
        parent: 'School'
      }
   },
  {
    path: 'beoassignment',
    component: BeoAssignmentComponent,
    data: {
      title: 'Beo Assignment',
      parent: 'School'
    }
  },
  {
    path: 'parttimeteacher',
    component: ParttimeTeachernameComponent,
    data: {
      title: 'ParttimeTeachernameComponent',
      parent: 'School'
    }
  },
  {
    path: 'rte/applicantstatus',
    component: RteApplicationStatusComponent,
    data: {
      title: 'RTE Applicant Status',
    }
  },
  {
    path: 'rte/typewise-application',
    component: RteTypewiseApplicationComponent,
    data: {
      title: 'RTE TypeWise Applicant Status',
    }
  },
  {
    path: 'statistical-report',
    component: StatisticalReportComponent,
    data: {
      title: 'Statistical Report'
    }
  },
  {
    path: 'management-statistical-report',
    component: ManagementStatisticalReportComponent,
    data: {
      title: 'Statistical Report'
    }
  },
  {
    path: 'ptstaffpaidedreport',
    component: PtStaffPaidedReportComponent,
    data: {
      title: 'ptstaffpaidedreport',
    }
  },
  {
    path: 'reports/verificationstatusmonitoring',
    component: VerficationstatusmonitoringComponent,
    data: {
      title: 'verificationstatusmonitoring',
    }
  },
  {
    path: 'reports/schoolwithoutdata',
    component: SchoolswithoutdataComponent,
    data: {
      title: 'Schoolswithoutdata',
    }
  },
  {
    path: 'staff/bt-teachers',
    component: BTTeachersComponent,
    data: {
      title: 'BT Teachers'
    }
  },
  {
    path: 'staff/staff-fixation',
    component: StaffFixationComponent,
    data: {
      title: 'BT Teachers'
    }
  },
  {
    path: 'reports/specialcase',
    component: SpecialCashIncentiveComponent,
    data: {
      title: 'Special Cash Incentive'
    }
  },
  {
    path: 'reports/staff-training-details',
    component: StaffTrainingDetailsComponent,
    data: {
      title: 'Schoolswithoutdata',
    }
  },
  {
    path: 'reports/school-master',
    component: SchoolmasterComponent,
    data: {
      title: 'School Master',
    }
  },
  {
    path: 'reports/smcupload',
    component: SmcUploadreportComponent,
    data: {
      title: 'Smc Upload Report',
    }
  },
  
 ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class ReportsRoutingModule { }
