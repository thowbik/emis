import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeoComponent } from './deo.component';
const routes: Routes = [
    {
        path: 'deo',
        component: DeoComponent,
        data: {
            title: 'DEO'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DeoRoutingModule { }
