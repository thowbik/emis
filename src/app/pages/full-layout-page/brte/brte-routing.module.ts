import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrteComponent } from './brte.component';
import { BrteRemarksComponent } from './brte-remarks/brte-remarks.component';
 import { UdiseValidationsComponent } from './udise-validations/udise-validations.component';
 import { SummaryReportsComponent } from './summary-reports/summary-reports.component';
//import { UdiseValidationsComponent } from './udise-validations/udise-validations.component';
import { VolunteerDetailsComponent } from './volunteer-details/volunteer-details.component';

const routes: Routes = [
    {
        path: '',
        component: BrteComponent,
        data: {
            title: 'Brte Login'
        }
    },
    {
        path: 'karpom-eluduvom/:type/:id',
        component: VolunteerDetailsComponent,
        data: {
            title: 'Brte Login'
        }
    },
    {
        path: 'brte-remarks',
        component: BrteRemarksComponent,
        data: {
            title: 'Brte Remarks'
        }
    },
    {
        path: 'udise-validatation',
        component: UdiseValidationsComponent,
        data: {
            title: 'Brte validatation'
        }
    },
    {
        path:'brte-summary-reports',
        component: SummaryReportsComponent,
        data:
        {
            title:'Summary Reports'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BrteRoutingModule { }
