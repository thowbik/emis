import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule} from 'primeng/card';
import { BrteService } from './brte.service';
import { BrteComponent } from './brte.component';
import { BrteRoutingModule } from './brte-routing.module';
import { BrteRemarksComponent } from './brte-remarks/brte-remarks.component';
import { DropdownModule} from 'primeng/dropdown';
import { ButtonModule} from 'primeng/button';
import { BreadcrumbModule} from 'primeng/breadcrumb';
import { UdiseValidationsComponent } from './udise-validations/udise-validations.component';
import {TableModule} from 'primeng/table';
import { SummaryReportsComponent } from './summary-reports/summary-reports.component';
//import { TableModule} from 'primeng/table';
import { VolunteerDetailsComponent } from './volunteer-details/volunteer-details.component';
import { TabViewModule} from 'primeng/tabview';
import {KeyFilterModule} from 'primeng/keyfilter';
import { UidaiValidationModule } from 'ng2-uidai-validation';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
 


@NgModule({
    imports: [
        TabViewModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        BrteRoutingModule,
        DropdownModule,
        ButtonModule,
        BreadcrumbModule,     
        TableModule,
        KeyFilterModule,
        UidaiValidationModule,
        ConfirmDialogModule,
        CheckboxModule
        
    ],
    exports: [],
    declarations: [
        BrteComponent,
        BrteRemarksComponent,
         UdiseValidationsComponent,
         SummaryReportsComponent,
         VolunteerDetailsComponent,
    ],
    providers: [BrteService,ConfirmationService],
})
export class BrteModule { }