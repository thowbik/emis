import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import {TeachersDashboardRoutingModule } from './teachersdashboard-routing.module';
import { TeachersDashboardService } from './teachersdashboard.service';
import { TeachersdashboardComponent } from './teachersdashboard.component';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { SharedModule } from '../sharedcomponent/shared.module';
@NgModule({
    imports: [
        CommonModule,
        TeachersDashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        PanelModule,
        CheckboxModule,
        DropdownModule,
        AccordionModule,
        TableModule,
        ButtonModule,
        TabViewModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        TeachersdashboardComponent
    ],
    providers: [TeachersDashboardService],
})
export class TeachersDashboardModule { }
