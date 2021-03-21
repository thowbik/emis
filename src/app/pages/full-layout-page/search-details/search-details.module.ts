import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';

import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {UidaiValidationModule} from 'ng2-uidai-validation';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SearchRoutingModule,
        TableModule,
        ButtonModule,
        DialogModule ,
        InputTextModule,
        CalendarModule,
        CardModule,
        UidaiValidationModule,
        DropdownModule,
        FieldsetModule,
        MultiSelectModule,
        RadioButtonModule,
        CheckboxModule,
        PanelModule
    ],
    exports: [],
    declarations: [SearchComponent],
})
export class SearchDetailsModule { }