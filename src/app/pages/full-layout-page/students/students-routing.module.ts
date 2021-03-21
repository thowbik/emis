import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { SchoolListComponent } from '../schools/school-list/school-list.component';
import { StudentlistComponent } from './studentlist.component';
import { StudentAdmissionComponent } from './student-admission/student-admission.component';
import { StudentCommonPoolComponent } from './student-common-pool/student-common-pool.component';
import { StudentSummaryComponent } from './student-summary/student-summary.component';
import { StudentTaggingComponent } from './student-tagging/student-tagging.component';
import { AcademicRecordsComponent } from './academic-records/academic-records.component';
import { TransferPromotionComponent } from './transfer-promotion/transfer-promotion.component';
import { CoScholasticComponent } from './co-scholastic/co-scholastic.component';
import { TextbookSecComponent } from './textbook-sec/textbook-sec.component';
import { TextbookComponent } from './textbook/textbook.component';
import { UniformComponent } from './uniform/uniform.component';
import { LaptopComponent } from './laptop/laptop.component';
import { NoonmealComponent } from './noonmeal/noonmeal.component';
import { SchemeSummaryComponent } from './scheme-summary/scheme-summary.component';
import { TextbookHrsecComponent } from './textbook-hrsec/textbook-hrsec.component';
import { InvalidAadharcountComponent } from './invalid-aadharcount/invalid-aadharcount.component';
import { InvalidPhonecountComponent } from './invalid-phonecount/invalid-phonecount.component';
import { MigrantStudentListComponent } from './migrant-student-list/migrant-student-list.component';
import { Class7SlasReportComponent } from '../students/class7-slas-report/class7-slas-report.component';
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
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BicycleIssueComponent } from '../schools/bicycle-issue/bicycle-issue.component';


const routes: Routes = [
    {
        path: 'teacher/asigned/reports',
        component: ReportsForTeacherAssignedComponent,
        data: {
            title: 'Schools',
            parent: 'Students'
        }
    },
    {
        path: 'cwsn/details',
        component: CwsnDetailsComponent,
        data: {
            title: 'Schools',
            parent: 'Students'
        }
    },
    
    {
        path: 'board/exam.co-ordinator',
        component: BoardXamCordinatorComponent,
        data: {
            title: 'Student List',
            parent: 'Students'
        }
    },
    {
        path: 'students',
        component: StudentsComponent,
        data: {
            title: 'Schools',
            parent: 'Students'
        }
    },
    {
        path: 'studentlist',
        // canActivate : [AuthGuard],
        component: StudentlistComponent,
        data: {
            title: 'Student List',
            parent: 'Students'
        }
    },
    {
        path: 'admission',
        component: StudentAdmissionComponent,
        data: {
            title: 'Student Admission',
            parent: 'Students'
        }
    },
    {
        path: 'commonpool',
        component: StudentCommonPoolComponent,
        data: {
            title: 'Student Common Pool',
            parent: 'Students'
        }
    },
    {
        path: 'summary',
        component: StudentSummaryComponent,
        data: {
            title: 'Student Summary',
            parent: 'Students'
        }
    },
    {
        path: 'tagging',
        component: StudentTaggingComponent,
        data: {
            title: 'Student Tagging',
            parent: 'Students'
        }
    },
    {
        path: 'tcdetails/:pageId/:studentId',
        component: StudentTcDetailsComponent,
        data: {
            title: 'Student TC Details',
            parent: 'Students'
        }
    },
    {
        path:'cashincentive',
        component: SpecialCashIncentiveComponent,
        data: {
            title: 'Special Cash Incentive',
            parent: 'Students'
        }
    },
    {
        path: 'academicrecords',
        component: AcademicRecordsComponent,
        data: {
            title: 'Academic Records',
            parent: 'Students'
        }
    },
    {
        path: 'transfer_promotion',
        component: TransferPromotionComponent,
        data: {
            title: 'Transfer And Promotion',
            parent: 'Students'
        }
    },
    {
        path: 'coscholastic',
        component: CoScholasticComponent,
        data: {
            title: 'Transfer And Promotion',
            parent: 'Students'
        },
        
    },
    {
        path: 'migrantstudentlist',
        component: MigrantStudentListComponent,
        data: {
            title: 'Migrant Student List',
            parent: 'Students'
        },
        
    },
    {
        path: 'schemesummary',
        component: SchemeSummaryComponent,
        data: {
            title: 'Scheme Summary'
        }
    },
    {
        path: 'noonmeal',
        component: NoonmealComponent,
        data: {
            title: 'Noon Meal',
            parentUrl:'/schemesummary',
            parent: 'Schemes'
            
        }
    },
    {
        path: 'laptop',
        component: LaptopComponent,
        data: {
            title: 'Laptop',
            parent: 'Schemes',
            parentUrl:'/schemesummary'
        }
    },
    {
        path: 'bicycle',
        component: BicycleIssueComponent,
        data: {
            title: 'Bicycle',
            parent: 'Schemes',
            parentUrl:'/schemesummary'
        }
    },
    {
        path: 'uniform',
        component: UniformComponent,
        data: {
            title: 'Uniform',
            parent: 'Schemes',
            parentUrl:'/schemesummary'
        }
    },
    {
        path: 'textbook',
        component: TextbookComponent,
        data: {
            title: 'TextBook Distribution For Primary Students',
            parent: 'Schemes',
            parentUrl:'/schemesummary'
        }
    },
    {
        path: 'textbook_sec',
        component: TextbookSecComponent,
        data: {
            title: 'TextBook Distribution For Secondary Students',
            parent: 'Schemes',
            parentUrl:'/schemesummary'
        }
    },
    {
        path: 'textbook_hrsec',
        component: TextbookHrsecComponent,
        data: {
            title: 'TextBook Distribution For Hr.Secondary Students',
            parent: 'Schemes',
            parentUrl:'/schemesummary'
        }
    },
    {
        path: 'invalid-aadharcount',
        component: InvalidAadharcountComponent,
        data: {
            title: 'Invalid Aadhar Count',
            parent: 'Dashboard',
            parentUrl:'/dashboard'
        }
    },
    {
        path: 'invalid-phonecount',
        component: InvalidPhonecountComponent,
        data: {
            title: 'Invalid Phone Number Count',
            parent: 'Dashboard',
            parentUrl:'/dashboard'
        }
  },
  {
    path: 'class7_report',
    component: Class7SlasReportComponent,
    data: {
      title: 'Class 7 SLAS 2019',
      
    }

  },
  {
      path :'studentmigrationreport',
      component: StudentMigrationReportComponent,
      data: {
       title: 'Student Migration Report',
      }
  },
  {
    path :'studentcommonpoolreport',
    component: StudentCommonPoolReportComponent,
    data: {
     title: 'Student Common Pool Report',
    }
},
{
    path :'pendingstudentrequest',
    component: PendingTransferRequestComponent,
    data: {
     title: 'Pending Student Request',
    }
},
{
    path :'oscstudents',
    component: OscstudentsComponent,
    data: {
     title: 'Osc Students',
    }
},
{
    path:'student/RTE-Reimbursement',
    component:RteReimbursementComponent
},
{
    path:'student/RTE-Dailyreport',
    component:RTEDailyReportComponent
},
{
    path:'students/rteapplicants',
    component:RteApplicantsComponent
},
{
    path:'students/admissionapproval',
    component:StudentAdmissionApprovalComponent,
    data: {
        title: 'Students Admission Approval',
       }
},
{
    path:'errorpage',
    component : PagenotfoundComponent
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentsRoutingModule { }
