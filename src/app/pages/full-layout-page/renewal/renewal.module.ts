
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RenewalService } from './renewal.service';
import { RenewalComponent } from './renewal.component';
import { RenewalRoutingModule } from './renewal-routing.module';
import {FileUploadModule} from 'primeng/fileupload';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import { StateDashboardService } from '../statedashboard/dashboard.services';



@NgModule({
    imports: [
        CommonModule,
        RadioButtonModule,
        CalendarModule,
        FileUploadModule,
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
        TabViewModule,
        RenewalRoutingModule
    ],
    exports: [],
    declarations: [
        RenewalComponent,
    ],
    providers: [UserSessionService,RenewalService,StateDashboardService],
})
export class RenewalModule { }
