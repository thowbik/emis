import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeoComponent } from './beo.component';
const routes: Routes = [
    {
        path: 'beo',
        component: BeoComponent,
        data: {
            title: 'BEO'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BeoRoutingModule { }
