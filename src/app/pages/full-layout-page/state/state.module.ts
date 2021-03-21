import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { StateService } from './state.service';
import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { CommonpoolComponent } from './commonpool/commonpool.component';
import {TableModule} from 'primeng';
import { CommonpoolblockComponent } from './commonpoolblock/commonpoolblock.component';
import { CommonpooltransferComponent } from './commonpooltransfer/commonpooltransfer.component';
import { StudentCountClassWiseComponent } from './student-count-class-wise/student-count-class-wise.component';
import {InputTextModule} from 'primeng/inputtext';
import { StudentCountVillagewiseComponent } from './student-count-villagewise/student-count-villagewise.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MastertimetableComponent } from './mastertimetable/mastertimetable.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AttendancereportComponent } from './attendancereport/attendancereport.component';
import {TabViewModule} from 'primeng/tabview';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {CalendarModule} from 'primeng/calendar';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherDetailsSchoolComponent } from './teacher-details-school/teacher-details-school.component';
import { ChildrenWithSpecialNeedComponent } from './children-with-special-need/children-with-special-need.component';
import { StudentCountSchoolwiseComponent } from './student-count-schoolwise/student-count-schoolwise.component';
import { SchoolCountComponent } from './school-count/school-count.component';
import { AadharComponent } from './aadhar/aadhar.component';
import { NoonmealStudentReportComponent } from './noonmeal-student-report/noonmeal-student-report.component';
import { DistrictwiseNoonmealStudentReportComponent } from './districtwise-noonmeal-student-report/districtwise-noonmeal-student-report.component';
import { BRTEdetailsComponent } from './brtedetails/brtedetails.component';
import { OsclistDistrictWiseComponent } from './osclist-district-wise/osclist-district-wise.component';
import { LaptopDistributionComponent } from './laptop-distribution/laptop-distribution.component';

import { BLockwiseHigherSecondaryGroupsComponent } from './blockwise-higher-secondary-groups/blockwise-higher-secondary-groups.component';
import { SchoolHigherSecondaryGroupsComponent } from './school-higher-secondary-groups/school-higher-secondary-groups.component';
import { AidedschooldistComponent } from './aidedschooldist/aidedschooldist.component';
import { AidedschoollistComponent } from './aidedschoollist/aidedschoollist.component';
import { AidedschoolsectionComponent } from './aidedschoolsection/aidedschoolsection.component';
import { HigherSecondaryGroupsComponent } from './higher-secondary-groups/higher-secondary-groups.component';
import { RteStudentslistDistrictComponent } from './rte-studentslist-district/rte-studentslist-district.component';
import {PindicsreportComponent} from './pindicsreport/pindicsreport.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { DistrictWiseSectionAidedSchoolComponent } from './district-wise-section-aided-school/district-wise-section-aided-school.component';
import { BlockWiseSectionAidedSchoolComponent } from './block-wise-section-aided-school/block-wise-section-aided-school.component';
import { SchoolWiseSectionAidedSchoolComponent } from './school-wise-section-aided-school/school-wise-section-aided-school.component';
import { RenewalResetQueueComponent } from './renewal-reset-queue/renewal-reset-queue.component';
import { UnRecognizedSchoolComponent } from './un-recognized-school/un-recognized-school.component';
import { RteAllocationComponent } from './rte-allocation/rte-allocation.component';
import { SlasstudentdistrictwiseComponent } from './slasstudentdistrictwise/slasstudentdistrictwise.component';
import { SlasstudentblockwiseComponent } from './slasstudentblockwise/slasstudentblockwise.component';
import { SlasstudentschoolwiseComponent } from './slasstudentschoolwise/slasstudentschoolwise.component';
import { SlasschooldistrictwiseComponent } from './slasschooldistrictwise/slasschooldistrictwise.component';
import { AcademicDetailsComponent } from './academic-details/academic-details.component';
import { SchoolLandDetailsComponent } from './school-land-details/school-land-details.component';
import { SchoolWashDetailsComponent } from './school-wash-details/school-wash-details.component';
import { IndicatorsMarkSheetReportsComponent } from './indicators-mark-sheet-reports/indicators-mark-sheet-reports.component';
import { CommitteeDetailsComponent } from './committee-details/committee-details.component';
import { CommitteeDistrictDetailsComponent } from './committee-district-details/committee-district-details.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import {TeachertransferComponent} from './teachertransfer/teachertransfer.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { SchoolSummaryComponent } from './school-summary/school-summary.component';
import { AtslReportComponent } from './atsl-report/atsl-report.component';
import { EbidComponent } from './ebid/ebid.component';
import { ParttimeteachersalaryreportComponent } from './parttimeteachersalaryreport/parttimeteachersalaryreport.component';
import { NearestGovtSchoolComponent } from './nearest-govt-school/nearest-govt-school.component';
import { VerficationstatusmonitoringComponent } from './verficationstatusmonitoring/verficationstatusmonitoring.component';
import { IedTeacherComponent } from './ied-teacher/ied-teacher.component';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {EditorModule} from 'primeng/editor';
import { TeacherHomeworkComponent } from './teacher-homework/teacher-homework.component';
import { NocApplicationStatusComponent } from './noc-application-status/noc-application-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CovidWatchReportComponent } from './covid-watch-report/covid-watch-report.component';
import { CovidDetailReportComponent } from './covid-detail-report/covid-detail-report.component';
import { CovidSummaryReportComponent } from './covid-summary-report/covid-summary-report.component';
import { HealthItReportComponent } from '../state/health-it-report/health-it-report.component';
@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        StateRoutingModule,
        TableModule,
        InputTextModule,
        MultiSelectModule,
        TabViewModule,
        FieldsetModule,
        DropdownModule,
        ButtonModule,
        ProgressBarModule,
        CalendarModule,
        DialogModule,
        RadioButtonModule,
        EditorModule,
        BreadcrumbModule


    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // CardModule,
    // StateRoutingModule,
    // TableModule,
    // TabViewModule,
    // InputTextModule
  ],
//     exports: [],
//         CalendarModule
//    ],

     exports: [],
    declarations: [EbidComponent,
        StateComponent,
        CommonpoolComponent,
        CommonpoolblockComponent,
        CommonpooltransferComponent,
        StudentCountClassWiseComponent,
        StudentCountVillagewiseComponent,
        TeachersComponent,
        MastertimetableComponent,
        AttendancereportComponent,
        TeacherDetailsComponent,
        TeacherDetailsSchoolComponent,
        StudentCountSchoolwiseComponent,
        SchoolCountComponent,
        // TotalSchoolDistrictWiseComponent,
        ChildrenWithSpecialNeedComponent,
        AadharComponent,
        NoonmealStudentReportComponent,
        DistrictwiseNoonmealStudentReportComponent,
        BRTEdetailsComponent,
        // AttendancedistReportComponent,
        LaptopDistributionComponent,
        TeachertransferComponent,
        HigherSecondaryGroupsComponent,
        BLockwiseHigherSecondaryGroupsComponent,
        SchoolHigherSecondaryGroupsComponent,
        AidedschooldistComponent,
        AidedschoollistComponent,
        AidedschoolsectionComponent,
        HigherSecondaryGroupsComponent,
        RteStudentslistDistrictComponent,
        PindicsreportComponent,
        OsclistDistrictWiseComponent,
        IndicatorsComponent,
        DistrictWiseSectionAidedSchoolComponent,
        BlockWiseSectionAidedSchoolComponent,
        SchoolWiseSectionAidedSchoolComponent,
        RenewalResetQueueComponent,
        UnRecognizedSchoolComponent,
        RteAllocationComponent,
        SlasstudentdistrictwiseComponent,
        SlasstudentblockwiseComponent,
        SlasstudentschoolwiseComponent,
        SlasschooldistrictwiseComponent,
        AcademicDetailsComponent,
        SchoolLandDetailsComponent,
        SchoolWashDetailsComponent,
        IndicatorsMarkSheetReportsComponent,
        CommitteeDetailsComponent,
        CommitteeDistrictDetailsComponent,
        BuildingDetailsComponent,
        SchoolSummaryComponent,
        AtslReportComponent,
        ParttimeteachersalaryreportComponent,
        NearestGovtSchoolComponent,
        VerficationstatusmonitoringComponent,
        IedTeacherComponent,
        TeacherHomeworkComponent,
     
        NocApplicationStatusComponent,
     
        DashboardComponent,
    
        NocApplicationStatusComponent,
    
        CovidWatchReportComponent,
    
        CovidDetailReportComponent,
    
        CovidSummaryReportComponent,
        HealthItReportComponent,
    
     ],
    providers: [StateService,DatePipe],
})
export class StateModule { }
