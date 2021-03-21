import { StateDashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { StateDashboardService } from './dashboard.services';
import { LandingpageComponent } from './landingpage/landingpage.component';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import { CommondashboardComponent } from './commondashboard/commondashboard.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { UploadComponent } from './upload/upload.component';
import {MessageService} from 'primeng/api';
@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        PanelModule,
        CheckboxModule,
        DropdownModule,
        AccordionModule,
        TableModule,
        TabViewModule,
        
    ],
    exports: [],
    declarations: [
        StateDashboardComponent,
        LandingpageComponent,
        CommondashboardComponent,
        StudentdashboardComponent,
        UploadComponent
    ],
    providers: [StateDashboardService,MessageService],
})
export class StateDashboardModule { }
