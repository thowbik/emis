import {ResetPasswordComponent} from './reset-password.component';
import { NgModule } from '@angular/core';
import { UserSessionService } from 'src/services/usersession.service';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {CardModule} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {PasswordModule} from 'primeng/password';

@NgModule({
    imports: [
        ResetPasswordRoutingModule,
        CardModule,
        PasswordModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        ResetPasswordComponent,
    ],
    providers: [UserSessionService, ResetPasswordService],
})
export class ResetPasswordModule { }
