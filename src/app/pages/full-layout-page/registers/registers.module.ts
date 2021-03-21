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
import { RegistersService } from './registers.service';
import { RegistersRoutingModule } from './registers-routing.module';
import { RegistersComponent } from './registers.component';
import { TRSTSEScholarshipSchemeComponent } from './trstse-scholarship-scheme/trstse-scholarship-scheme.component';
import { InspireAwardDetailsComponent } from './inspire-award-details/inspire-award-details.component';
import { StudentAttendanceregComponent } from './student-attendancereg/student-attendancereg.component';
import { StaffAttendanceregComponent } from './staff-attendancereg/staff-attendancereg.component';
import { NmmsschemeregComponent } from './nmmsschemereg/nmmsschemereg.component';
import { OutofschollChildrenRegComponent } from './outofscholl-children-reg/outofscholl-children-reg.component';
import { VocationalstudentNSQFRegComponent } from './vocationalstudent-nsqf-reg/vocationalstudent-nsqf-reg.component';
import { StudentssportsParticipationRegComponent } from './studentssports-participation-reg/studentssports-participation-reg.component';
import { RteStudentRegComponent } from './rte-student-reg/rte-student-reg.component';
import { CwsnStudentRegComponent } from './cwsn-student-reg/cwsn-student-reg.component';
import { StudentsreligiondetailsRegComponent } from './studentsreligiondetails-reg/studentsreligiondetails-reg.component';
import { StudentsUnderblowpovertylineRegComponent } from './students-underblowpovertyline-reg/students-underblowpovertyline-reg.component';
import { StudentsValidaadharRegComponent } from './students-validaadhar-reg/students-validaadhar-reg.component';
import { StudentsReportbyageRegComponent } from './students-reportbyage-reg/students-reportbyage-reg.component';
import { StudentsCommunitydetailsRegComponent } from './students-communitydetails-reg/students-communitydetails-reg.component';
import { StaffTrainingdetailsComponent } from './staff-trainingdetails/staff-trainingdetails.component';
import { ScaleregisterComponent } from './scaleregister/scaleregister.component';
import { CostfreeCutsweaterRegComponent } from './costfree-cutsweater-reg/costfree-cutsweater-reg.component';
import { CostfreeBootRegComponent } from './costfree-boot-reg/costfree-boot-reg.component';
import { CostfreeSocksRegComponent } from './costfree-socks-reg/costfree-socks-reg.component';
import { CostfreeRaincoatRegComponent } from './costfree-raincoat-reg/costfree-raincoat-reg.component';
import { PtmgrNoonmealprogramRegComponent } from './ptmgr-noonmealprogram-reg/ptmgr-noonmealprogram-reg.component';
import { CostfreeTextbooksRegComponent } from './costfree-textbooks-reg/costfree-textbooks-reg.component';
import { CostfreeNotebooksRegComponent } from './costfree-notebooks-reg/costfree-notebooks-reg.component';
import { CostfreeBagsRegComponent } from './costfree-bags-reg/costfree-bags-reg.component';
import { CostfreeUniformsRegComponent } from './costfree-uniforms-reg/costfree-uniforms-reg.component';
import { CostfreeFootwearRegComponent } from './costfree-footwear-reg/costfree-footwear-reg.component';
import { CostfreeBuspassRegComponent } from './costfree-buspass-reg/costfree-buspass-reg.component';
import { CostfreeColourpencilRegComponent } from './costfree-colourpencil-reg/costfree-colourpencil-reg.component';
import { CostfreeGeometryboxRegComponent } from './costfree-geometrybox-reg/costfree-geometrybox-reg.component';
import { CostfreeAtlasRegComponent } from './costfree-atlas-reg/costfree-atlas-reg.component';
import { CostfreeLaptop11RegComponent } from './costfree-laptop11-reg/costfree-laptop11-reg.component';
import { CostfreeLaptop12RegComponent } from './costfree-laptop12-reg/costfree-laptop12-reg.component';
import { CostfreeCWSNstudentbenefitsRegComponent } from './costfree-cwsnstudentbenefits-reg/costfree-cwsnstudentbenefits-reg.component';
import { CostfreeLaptop12preyearsRegComponent } from './costfree-laptop12preyears-reg/costfree-laptop12preyears-reg.component';
import { ClubParticipationRegistersComponent } from './club-participation-registers/club-participation-registers.component';
import {CardModule} from 'primeng/card';
import { StudentsummaryComponent } from './studentsummary/studentsummary.component';
import { CostfreeBicycleRegComponent } from './costfree-bicycle-reg/costfree-bicycle-reg.component';
import { CompetitionParticipantRegisterComponent } from './competition-participant-register/competition-participant-register.component';

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
        RegistersRoutingModule,
        CardModule
        
        
        
    ],
    exports: [],
    declarations: [
        RegistersComponent,
        TRSTSEScholarshipSchemeComponent,
        InspireAwardDetailsComponent,
        StudentAttendanceregComponent,
        StaffAttendanceregComponent,
        NmmsschemeregComponent,
        OutofschollChildrenRegComponent,
        VocationalstudentNSQFRegComponent,
        StudentssportsParticipationRegComponent,
        RteStudentRegComponent,
        CwsnStudentRegComponent,
        StudentsreligiondetailsRegComponent,
        StudentsUnderblowpovertylineRegComponent,
        StudentsValidaadharRegComponent,
        StudentsReportbyageRegComponent,
        StudentsCommunitydetailsRegComponent,
        StaffTrainingdetailsComponent,
        ScaleregisterComponent,
        CostfreeCutsweaterRegComponent,
        CostfreeBootRegComponent,
        CostfreeSocksRegComponent,
        CostfreeRaincoatRegComponent,
        PtmgrNoonmealprogramRegComponent,
        CostfreeTextbooksRegComponent,
        CostfreeNotebooksRegComponent,
        CostfreeBagsRegComponent,
        CostfreeUniformsRegComponent,
        CostfreeFootwearRegComponent,
        CostfreeBuspassRegComponent,
        CostfreeColourpencilRegComponent,
        CostfreeGeometryboxRegComponent,
        CostfreeAtlasRegComponent,
        CostfreeLaptop11RegComponent,
        CostfreeLaptop12RegComponent,
        CostfreeCWSNstudentbenefitsRegComponent,
        CostfreeLaptop12preyearsRegComponent,
        ClubParticipationRegistersComponent,
        StudentsummaryComponent,
        CostfreeBicycleRegComponent,
        CompetitionParticipantRegisterComponent
    ],
    providers: [RegistersService],
})
export class RegistersModule { }
