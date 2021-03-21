import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { AdminRoutingModule } from './admin-routing';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        AdminRoutingModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
    ],
    providers: [AdminService],
})
export class AdminModule { }
