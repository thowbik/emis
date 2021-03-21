import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CeoComponent } from './ceo.component';
import { RteIntakeCapacityComponent } from './rte-intake-capacity/rte-intake-capacity.component';
import { NocCbscComponent } from './noc-cbsc/noc-cbsc.component';
import { NocForCbscComponent } from './noc-for-cbsc/noc-for-cbsc.component';
import { NocCbscStatusComponent } from './noc-cbsc-status/noc-cbsc-status.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SchoolApplyListComponent } from './school-apply-list/school-apply-list.component';
import { RenewalListComponent } from './renewal-list/renewal-list.component';
import { RenewalForwardRejectComponent } from './renewal-forward-reject/renewal-forward-reject.component';
import { RenewalApplicationStatusComponent } from './renewal-application-status/renewal-application-status.component';
import { BrteMappingComponent } from './brte-mapping/brte-mapping.component';
import { StaffApprovalComponent } from './staff-approval/staff-approval.component';
import { RteStudentapprovalComponent } from './rte-studentapproval/rte-studentapproval.component';
import { PLAAttendanceComponent } from './pla-attendance/pla-attendance.component';
import { PlaInspectionComponent } from './pla-inspection/pla-inspection.component';
import { PlaAttendanceLearnersComponent } from './pla-attendance-learners/pla-attendance-learners.component';
import { PlaAttendanceCompletedComponent } from './pla-attendance-completed/pla-attendance-completed.component';
import { CompetationReportsComponent } from './competation-reports/competation-reports.component';


const routes: Routes = [
    {
        path: 'ceo',
        component: CeoComponent,
        data: {
            title: 'CEO'
        }
    },
    {
      path: 'brte/mapping',
      component: BrteMappingComponent,
      data: {
        title: 'RTE Intake Capacity'
      }
    },
    {
        path: 'rteIntakeCapacity',
        component: RteIntakeCapacityComponent,
        data: {
          title: 'RTE Intake Capacity'
        }
      },
      {
        path: 'ceo/nocforcbscaffiliation',
        component: NocCbscComponent,
        data: {
          title: 'NocCbscComponent'
        }
      },
      {
        path: 'nocforcbscaffiliation',
        component: NocForCbscComponent,
        data: {
          title: 'NocCbscComponent'
        }
      },
      {
        path: 'nocforcbscaffiliationstatus',
        component: NocCbscStatusComponent,
        data: {
          title: 'NocCbscStatusComponent'
        }
      },
      {
        path: 'ceolandingpage',
        component: LandingpageComponent,
        data: {
          title: 'NocCbscStatusComponent'
        }
      },
      {
        path: 'schoolApplyPendingList',
        component: SchoolApplyListComponent,
        data: {
          title: 'School Apply List'
        }
      },
      {
        path: 'renewal-list',
        component: RenewalListComponent,
        data: {
          title: 'Renewal List'
        }
      },
      {
        path: 'renewal-forward/reject',
        component: RenewalForwardRejectComponent,
        data: {
          title: 'Renewal'
        }
      },
      {
        path: 'renewal-application-status',
        component: RenewalApplicationStatusComponent,
        data: {
          title: 'Renewal'
        }
      },
      {
        path: 'staffapproval',
        component: StaffApprovalComponent,
        data: {
          title: 'Staff Approval For Dc'
        }
      },
      {
        path: 'rtestudentapproval',
        component: RteStudentapprovalComponent,
        data: {
          title: 'Staff Approval For Dc'
        }
      },
      {
        path: 'pla-attendance',
        component : PLAAttendanceComponent
      },
      {
        path: 'pla-inspection',
        component : PlaInspectionComponent
      },
      {
        path: 'pla-attendance-learners',
        component : PlaAttendanceLearnersComponent
      },
      {
        path: 'pla-attendance-completed',
        component : PlaAttendanceCompletedComponent
      },
      {
        path: 'competition-report',
        component : CompetationReportsComponent
      }
      
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CeoRoutingModule { }
