import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';

const routes: Routes = [
    {
        path: 'schoolsearch',
        component: SearchComponent,
        data: {
            title: 'school search',
        }
    },
    {
        path: 'studentsearch',
        component: SearchComponent,
        data: {
            title: 'student search',
        }
    },
    {
        path: 'staffsearch',
        component: SearchComponent,
        data: {
            title: 'staff search',
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SearchRoutingModule { }
