import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { BeoService } from './beo.service';
import { BeoComponent } from './beo.component';
import { BeoRoutingModule } from './beo-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        BeoRoutingModule
    ],
    exports: [],
    declarations: [
        BeoComponent,
    ],
    providers: [BeoService],
})
export class BeoModule { }
