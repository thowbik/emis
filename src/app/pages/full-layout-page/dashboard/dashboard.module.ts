import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { UserSessionService } from 'src/services/usersession.service';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import { DashboardService } from './dashboard.service';
import {MessageService} from 'primeng/api';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        MultiSelectModule,
        ToastModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        SliderModule,
        CardModule,
        TabViewModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
    ],
    providers: [UserSessionService,DashboardService,MessageService],
})
export class DashboardModule { }
