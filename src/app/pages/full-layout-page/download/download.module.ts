
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DownloadComponent } from './download.component';
import { DownloadRoutingModule } from './download-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DashboardService } from '../dashboard/dashboard.service';
import { StateDashboardService } from '../statedashboard/dashboard.services';

@NgModule({
    imports: [
        CommonModule,
        DownloadRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        PanelModule,
        CheckboxModule,
        DropdownModule,
        TableModule,
        MultiSelectModule,
        ButtonModule
    ],
    exports: [],
    declarations: [
        DownloadComponent,
    ],
    providers: [StateDashboardService],
})
export class DownloadModule { }