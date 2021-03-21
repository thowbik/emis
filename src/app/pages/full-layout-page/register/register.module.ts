import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';

import { RegisterComponent } from './register.component';
import {CardModule} from 'primeng/card';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterService } from './register.service';
import { AttendanceStaffClubpartComponent } from './attendance-staff-clubpart/attendance-staff-clubpart.component';
import { StudentwelfareComponent } from './studentwelfare/studentwelfare.component';
import { StudenttaggingComponent } from './studenttagging/studenttagging.component';
import { StudentsummaryComponent } from './studentsummary/studentsummary.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        MultiSelectModule,
        DialogModule,
        ButtonModule,
        FieldsetModule,
        KeyFilterModule,
        CalendarModule,
        TabViewModule,
        RegisterRoutingModule,
        CardModule
        
        
    ],
    exports: [],
    declarations: [
        RegisterComponent,
        AttendanceStaffClubpartComponent,
        StudentwelfareComponent,
        StudenttaggingComponent,
        StudentsummaryComponent,
    ],
    providers: [RegisterService],
})
export class RegisterModule { }
