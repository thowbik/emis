import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolsComponent } from './schools.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { ClassSectionsComponent } from './class-sections/class-sections.component';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import { TodaytimetableComponent } from './todaytimetable/todaytimetable.component';
import { WeeklytimetableComponent } from './weeklytimetable/weeklytimetable.component';
import { MastertimetableComponent } from './mastertimetable/mastertimetable.component';
import { TeachertimetableComponent } from './teachertimetable/teachertimetable.component';
import { SchoolCommitteeComponent } from './school-committee/school-committee.component';
import {FundsComponent} from './funds/funds.component';
import {SchoolInventoryComponent} from './school-inventory/school-inventory.component';
import {SchoolLandComponent} from './school-land/school-land.component';
import {TrainingDetailsComponent} from './training-details/training-details.component';
import {SchoolBasicComponent} from './school-basic/school-basic.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolNeedCsrComponent } from '../schools/school-need-csr/school-need-csr.component';
import { UdisereportComponent } from './udisereport/udisereport.component';
import { EditSchoolProfileComponent } from '../sharedcomponent/edit-school-profile/edit-school-profile.component';
import { AddSchoolProfileComponent } from '../sharedcomponent/add-school-profile/add-school-profile.component';
import { StudentSummaryComponent } from './student-summary/student-summary.component';
import { NoccbscaffiliationComponent } from './noc-cbsc-affiliation/noccbscaffiliation.component'
import { DataCorrectionComponent } from './data-correction/data-correction.component';
import { SchooldetailsEditComponent } from '../sharedcomponent/schooldetails-edit/schooldetails-edit.component';
import { NewSchoolApplicationComponent } from './new-school-application/new-school-application.component';
import { FitIndiaFormComponent } from './fit-india-form/fit-india-form.component';
import { FitIndiaReportComponent } from './fit-india-report/fit-india-report.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import { StudentNewadmissionComponent } from './student-newadmission/student-newadmission.component';
import { StudentNewadmissionfreshComponent } from './student-newadmissionfresh/student-newadmissionfresh.component';
import { KGBVCWSNTrackingComponent } from './kgbv-cwsn-tracking/kgbv-cwsn-tracking.component';
import { KGBVCWSNMappingComponent } from './kgbv-cwsn-mapping/kgbv-cwsn-mapping.component';
import { StudentsRaiseRequestComponent} from './students-raise-request/students-raise-request.component';
import { KgersMgmtMaintenanceComponent } from './kgers-mgmt-maintenance/kgers-mgmt-maintenance.component';
import { SelfDefenseTrainingComponent } from './self-defense-training/self-defense-training.component';
import { ManagementMaintenanceComponent } from './management-maintenance/management-maintenance.component';
import { KgbvStudentBankingDetailsComponent } from './kgbv-student-banking-details/kgbv-student-banking-details.component';
import { EBBillManagementComponent } from './eb-bill-management/eb-bill-management.component';
import { SchoolGrantsComponent } from './school-grants/school-grants.component';
import { HealthProfileComponent } from './health-profile/health-profile.component';
import { ItProfileComponent } from './it-profile/it-profile.component';
import { SchoolCompetitionComponent } from './school-competition/school-competition.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { ShowQuestionsComponent } from './show-questions/show-questions.component';
import { LearningOutcomeMasterComponent } from './learning-outcome-master/learning-outcome-master.component';
import { CreateQuestionsetComponent } from './create-questionset/create-questionset.component';
import { SchoolBankDetailsComponent } from './school-bank-details/school-bank-details.component';
import { NsqfCompletionComponent } from './nsqf-completion/nsqf-completion.component';
// import { BicycleIssueComponent } from '../schools/bicycle-issue/bicycle-issue.component';

const routes: Routes = [
    {
        path: 'schools',
        component: SchoolsComponent,
        data: {
            title: 'Schools'
        }
    },
    // {
    //     path: 'bicycle',
    //     component: BicycleIssueComponent,
    //     data: {
    //         title: 'Bicycle',
    //         parent: 'Schemes',
    //         parentUrl:'/schemesummary'
    //     }
    // },
    {
        path: 'schools/tracking',
        component: KGBVCWSNTrackingComponent,
        data: {
            title: 'Schools'
        }
    },
    {
        path: 'schools/mapping',
        component: KGBVCWSNMappingComponent,
        data: {
            title: 'Schools'
        }
    },
    {
        path: 'data/correction',
        component: DataCorrectionComponent,
        data: {
            title: 'Schools',
            parent: 'School'
        }
    },
    {
        path: 'funds',
        component: FundsComponent,
        data: {
            title: 'Schools',
            parent: 'School'
        }
    },
    {
      path:'itprofile',
      component:ItProfileComponent,
      data:{
          title:'itprofile',
          parent:'school'
      }
    },
    {
        path: 'schoolslist',
        component: SchoolListComponent,
        data: {
            title: 'School List',
            parent: 'School'
        }
    },
    {
        path: 'school-inventory',
        component: SchoolInventoryComponent,
        data: {
            title: 'school-inventory',
            parent: 'School'
        }
    },
    {
        path: 'classsection',
        component: ClassSectionsComponent,
        data: {
            title: 'Class and Section',
            parent: 'School'
        }
    },
    {
        path: 'school_profile',
        component: SchoolProfileComponent,
        data: {
            title: 'School profile',
            parent: 'School'
        }

  },
  {
    path: 'school_need_csr',
    component: SchoolNeedCsrComponent,
    data: {
      title: 'School Need CSR',
      parent: 'School'
    }

  },

    {
        path: 'mastertimetable',
        component: MastertimetableComponent,
        data: {
            title: 'Master Timetable',
            parent: 'Time table'
        }
      },
        {
          path: 'weeklytimetable',
          component: WeeklytimetableComponent,
          data: {
              title: 'Weekly Timetable',
              parent: 'Time table'
          }
    },
    {
      path: 'todaytimetable',
      component: TodaytimetableComponent,
      data: {
          title: 'Today Timetable',
          parent: 'Time table'
      }
    },
    {
        path: 'teachertimetable',
        component: TeachertimetableComponent,
        data: {
            title: 'Teacher Timetable',
            parent: 'Time table'
        }
    },
    {
        path: 'schoolcommittee',
        component: SchoolCommitteeComponent,
        data: {
            title: 'Committee Details',
            parent: 'School'
        }
    },
    {
        path : 'school-land',
        component : SchoolLandComponent,
        data : {
          title : 'School Land',
          parent : 'Time Table'
        }
    },
    {
        path: 'training-details',
        component: TrainingDetailsComponent,
        data: {
          title: 'Training Details',
          parent: 'School'
        }
    },
    {
        path: 'todaytimetable',
        component: TodaytimetableComponent,
        data: {
          title: 'Today Timetable',
          parent: 'Time table'
        }
    },
    {
        path: 'teachertimetable',
        component: TeachertimetableComponent,
        data: {
          title: 'Teacher Timetable',
          parent: 'Time table'
        }
    },
    {
        path: 'basic_school_form',
        component: SchoolBasicComponent,
        data: {
          title: 'School Basic Form',
          parent: 'School'
        }
    },
    {
        path: 'school_details',
        component: SchoolDetailsComponent,
        data: {
          title: 'SCHOOL DETAILS',
          parent: 'School'
        }
    },
    {
        path: 'udisereports',
        component: UdisereportComponent,
        data: {
          title: 'Download Profile',
          parent: 'School'
        }
    },
    {
        path : 'school/edit-school-profile',
        component : EditSchoolProfileComponent,
        data : {
            title : 'Edit School Profile',
            parent : 'School'
        }
    },
    {
        path : 'school/edit-school-profile1',
        component : SchooldetailsEditComponent,
        data : {
            title : 'Edit School Profile',
            parent : 'School'
        }
    },
    {
        path : 'school/add-school-profile',
        component : AddSchoolProfileComponent,
        data : {
            title : 'Add School Profile',
            parent : 'School'
        }
    },
    {
        path : 'school/student-summary',
        component : StudentSummaryComponent,
        data : {
            title : 'Student Summary',
            parent : 'School'
        }
    },
    {
        path : 'school/nocforcbscaffiliation',
        component : NoccbscaffiliationComponent,
        data : {
            title : 'NOC for CBSE Affiliation',
            parent : 'School'
        }
    },
    {
        path : 'school/new-school',
        component : NewSchoolApplicationComponent,
        data : {
            title : 'NOC for CBSE Affiliation',
            parent : 'School'
        }
    },
    {
        path:'fitIndia-Form',
        component:FitIndiaFormComponent,
        data : {
            title :'Fit-India'
        }
    },
    {
        path:'fitIndia-Report',
        component:FitIndiaReportComponent,
            data : {
                title : 'Fit-India-Report'
            }
    },
    {
        path:'health-profile',
        component:HealthProfileComponent,
            data : {
                title : 'Health Profile'
            }
    },
    {
        path:'school/student_promotion',
        component:StudentPromotionComponent,
        data : {
            title :'Student-Promotion'
        }
    },
    {
        path:'StudentTransfer',
        component:StudentNewadmissionComponent,
        data : {
            title :'Student-Admission Dashboard',
            parent: 'Dashboard'
        }
    },
    {
        path:'StudentFresh',
        component:StudentNewadmissionfreshComponent,
        data : {
            title :'Student-Admission Dashboard',
            parent: 'Dashboard'
        }
    },
    {
        path:'Students/pendingrequest',
        component : StudentsRaiseRequestComponent,
        data : 
        {
            title : 'Students-Pending-Request'
        }
    },
    {
        path:'Students/raiserequest',
        component : StudentsRaiseRequestComponent,
        data : 
        {
            title : 'Students-Raise-Request'
        }
    },
    {
        path:'school-maintenance/:type/:id',
        component : KgersMgmtMaintenanceComponent,
        data : 
        {
            title : 'School-Management-Maintenance'
        }
    },
    {
        path:'schoolmaintainance-home',
        component : ManagementMaintenanceComponent,
        data : 
        {
            title : 'School-Management-Maintenance'
        }
    },
    {
        path:'school-Ebbill',
        component : EBBillManagementComponent,
        data : 
        {
            title : 'School-EB Bill-Management-Maintenance'
        }
    },
    {
        path:'school-grants',
        component : SchoolGrantsComponent,
        data : 
        {
            title : 'School Grants'
        }
    },
    
    
    {
        path : 'self-defence-training',
        component : SelfDefenseTrainingComponent
    },
    {
        path : 'student-banking-detail',
        component: KgbvStudentBankingDetailsComponent
    },
    // School Competition
    {
        path:'competition',
        component : SchoolCompetitionComponent,
        data : 
        {
            title : 'School Grants'
        }
    },
    {
        path: 'schoolbankdetails',
        component: SchoolBankDetailsComponent,
        data: {
            title: 'bankdetails',
            parent: 'School'
        }
    },
    {
        path:'create-question',
        component : CreateQuestionsComponent,
        data : 
        {
            title : 'School Grants'
        }
    },
    {
        path:'create-questionset',
        component : CreateQuestionsetComponent,
        data : 
        {
            title : 'School Grants'
        }
    },
    {
        path:'getquestion',
        component : ShowQuestionsComponent,
        data : 
        {
            title : 'School Grants'
        }
    },
    {
        path:'learning-outcome',
        component : LearningOutcomeMasterComponent,
        data : 
        {
            title : 'Learning Outcome Master'
        }
    },
    {
        path:'nsqf-completion',
        component : NsqfCompletionComponent,
        data : 
        {
            title : 'NSQF Syllabus Completion'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchoolsRoutingModule { }
