import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { DeoRoutingModule } from './deo-routing.module';
import { DeoComponent } from './deo.component';
import { DeoService } from './deo.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        DeoRoutingModule
    ],
    exports: [],
    declarations: [
        DeoComponent,
    ],
    providers: [DeoService],
})
export class DeoModule { }
