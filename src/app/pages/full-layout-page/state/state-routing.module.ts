import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateComponent } from './state.component';
import { CommonpoolComponent } from './commonpool/commonpool.component';
import { CommonpoolblockComponent } from './commonpoolblock/commonpoolblock.component';
import { CommonpooltransferComponent } from './commonpooltransfer/commonpooltransfer.component';
import { StudentCountClassWiseComponent } from './student-count-class-wise/student-count-class-wise.component';
import { StudentCountVillagewiseComponent } from './student-count-villagewise/student-count-villagewise.component';
// import { StatedashboardComponent } from './statedashboard/statedashboard.component';
// import { TeachersComponent } from './teachers/teachers.component';
// import { TeachersComponent } from './teachers/teachers.component';
import { MastertimetableComponent } from './mastertimetable/mastertimetable.component';
import { AttendancereportComponent } from './attendancereport/attendancereport.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherDetailsSchoolComponent } from './teacher-details-school/teacher-details-school.component';
import { SchoolCountComponent } from './school-count/school-count.component';
import { ChildrenWithSpecialNeedComponent } from './children-with-special-need/children-with-special-need.component';
import { StudentCountSchoolwiseComponent } from './student-count-schoolwise/student-count-schoolwise.component';
import { AadharComponent } from './aadhar/aadhar.component';
import { NoonmealStudentReportComponent } from '../state/noonmeal-student-report/noonmeal-student-report.component';
import { DistrictwiseNoonmealStudentReportComponent } from './districtwise-noonmeal-student-report/districtwise-noonmeal-student-report.component';
import { BRTEdetailsComponent } from './brtedetails/brtedetails.component';
// import { AttendancedistReportComponent } from './attendancedist-report/attendancedist-report.component';
import { TeachersComponent } from './teachers/teachers.component';
import { OsclistDistrictWiseComponent } from './osclist-district-wise/osclist-district-wise.component';
import { LaptopDistributionComponent } from './laptop-distribution/laptop-distribution.component';
import { AidedschooldistComponent } from './aidedschooldist/aidedschooldist.component';
import { AidedschoollistComponent } from './aidedschoollist/aidedschoollist.component';
import { AidedschoolsectionComponent } from './aidedschoolsection/aidedschoolsection.component';
import { HigherSecondaryGroupsComponent } from './higher-secondary-groups/higher-secondary-groups.component';
// import { from } from 'rxjs';
import { TeachertransferComponent } from './teachertransfer/teachertransfer.component';

// import { AttendanceblockReportComponent } from './attendanceblock-report/attendanceblock-report.component';
import { BLockwiseHigherSecondaryGroupsComponent } from './blockwise-higher-secondary-groups/blockwise-higher-secondary-groups.component';
import { SchoolHigherSecondaryGroupsComponent } from './school-higher-secondary-groups/school-higher-secondary-groups.component';
import { RteStudentslistDistrictComponent } from './rte-studentslist-district/rte-studentslist-district.component';
import { PindicsreportComponent } from './pindicsreport/pindicsreport.component';
// import { AttendancebyclassReportComponent } from './attendancebyclass-report/attendancebyclass-report.component';
// import { AttendstaffblockReportComponent } from './attendstaffblock-report/attendstaffblock-report.component';
// import { AttendStudentdistmarkComponent } from './attend-studentdistmark/attend-studentdistmark.component';
// import { AttendStaffdistmarkComponent } from './attend-staffdistmark/attend-staffdistmark.component';
// import { AttendbystaffReportComponent } from './attendbystaff-report/attendbystaff-report.component';
// import { AttendancebysectionReportComponent } from './attendancebysection-report/attendancebysection-report.component';
import { DistrictWiseSectionAidedSchoolComponent } from './district-wise-section-aided-school/district-wise-section-aided-school.component';
import { BlockWiseSectionAidedSchoolComponent } from './block-wise-section-aided-school/block-wise-section-aided-school.component';
import { SchoolWiseSectionAidedSchoolComponent } from './school-wise-section-aided-school/school-wise-section-aided-school.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { RenewalResetQueueComponent } from './renewal-reset-queue/renewal-reset-queue.component';
import { RteAllocationComponent } from './rte-allocation/rte-allocation.component';
import { UnRecognizedSchoolComponent } from './un-recognized-school/un-recognized-school.component';
import { SlasstudentdistrictwiseComponent } from './slasstudentdistrictwise/slasstudentdistrictwise.component';
import { SlasstudentblockwiseComponent } from './slasstudentblockwise/slasstudentblockwise.component';
import { SlasstudentschoolwiseComponent } from './slasstudentschoolwise/slasstudentschoolwise.component';
import { SlasschooldistrictwiseComponent } from './slasschooldistrictwise/slasschooldistrictwise.component';
import { AcademicDetailsComponent } from './academic-details/academic-details.component';
import { SchoolLandDetailsComponent } from './school-land-details/school-land-details.component';
import { SchoolWashDetailsComponent } from './school-wash-details/school-wash-details.component';
import { IndicatorsMarkSheetReportsComponent } from './indicators-mark-sheet-reports/indicators-mark-sheet-reports.component';
import { CommitteeDistrictDetailsComponent } from './committee-district-details/committee-district-details.component';
import { CommitteeDetailsComponent } from './committee-details/committee-details.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import { SchoolSummaryComponent } from './school-summary/school-summary.component';
import { AtslReportComponent } from './atsl-report/atsl-report.component';
import { ParttimeteachersalaryreportComponent } from './parttimeteachersalaryreport/parttimeteachersalaryreport.component';
import { VerficationstatusmonitoringComponent } from './verficationstatusmonitoring/verficationstatusmonitoring.component';
import { EbidComponent } from './ebid/ebid.component';
import { NearestGovtSchoolComponent } from './nearest-govt-school/nearest-govt-school.component';
import { IedTeacherComponent } from './ied-teacher/ied-teacher.component';
import { TeacherHomeworkComponent } from './teacher-homework/teacher-homework.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CovidWatchReportComponent } from './covid-watch-report/covid-watch-report.component';
import { CovidDetailReportComponent } from './covid-detail-report/covid-detail-report.component';
import { CovidSummaryReportComponent } from './covid-summary-report/covid-summary-report.component';
import { HealthItReportComponent } from './health-it-report/health-it-report.component';



// import { from } from 'rxjs';
// import { from } from 'rxjs';
const routes: Routes = [
  {
    path: 'c',
    component: StateComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'ebid',
    component: EbidComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'State/aadhar-list',
    component: AadharComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'state/laptop-distribution',
    component: LaptopDistributionComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'state/enrolment-details',
    component: StudentCountClassWiseComponent,
    data: {
      title: 'District'
    }
  },
  {
    path: 'class/blockwise/count',
    component: StudentCountVillagewiseComponent,
    data: {
      title: 'Village',
      parentUrl: '/class/Districtwise/count',
    }
  },
  {
    path: 'class/schoolwise/count',
    component: StudentCountSchoolwiseComponent,
    data: {
      title: 'school',
      parentUrl: '/class/Schoolwise/count',
    }
  },
  {
    path: 'State/emis_teacher_details',
    component: TeachersComponent,
    data: {
      title: 'Teachers List'
    }
  },
  {
    path: 'state/teachertransfer',
    component: TeachertransferComponent,

    data: {
      title: 'Teachers Transfer'
    }
  },
  {
    path: 'mastertimetable-report1',
    component: MastertimetableComponent,
    data: {
      title: 'Master Timetable Report'
    }
  },
  {
    path: 'school-summary',
    component: SchoolSummaryComponent,
    data: {
      title: 'School Summary'
    }
  },
  {
    path: 'attendance-report',
    component: AttendancereportComponent,
    data: {
      title: 'Attendance Report'
    }
  },
  // {
  //   path: 'attendancedist-report',
  //   component : AttendancedistReportComponent,
  //   data: {
  //       title : 'Attendance District Report'
  //   }
  // },
  {
    path: 'State/emis_teacher_classwise_district',
    component: TeacherDetailsComponent,
    data: {
      title: 'Teacher Details'
    }
  },
  {
    path: 'State/emis_teacher_classwise_block',
    component: TeacherDetailsSchoolComponent,
    data: {
      title: 'Teacher Detail School'
    }
  },
  {
    path: 'school-count',
    component: SchoolCountComponent,
    data: {
      title: 'School Count',
      parent: 'Dashboard',
      parentUrl: '/dashboard'
    }
  },
  {
    path: 'noonmeal/student/Report',
    component: NoonmealStudentReportComponent,
    data: {
      title: 'Noonmeal-Student-Report'
    }
  },
  {
    path: 'districtwise/noonmeal/student/Report',
    component: DistrictwiseNoonmealStudentReportComponent,
    data: {
      title: 'Noonmeal-Student-Report'
    }
  },
  {
    path: 'state/commonpool',
    component: CommonpoolComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'commonpoolblock',
    component: CommonpoolblockComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'commonpool_block_transfer',
    component: CommonpooltransferComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'State/children-with-special-needs',
    component: ChildrenWithSpecialNeedComponent,
    data: {
      title: 'CWSN'
    }
  },
  {
    path: 'State/brte-details',
    component: BRTEdetailsComponent,
    data: {
      title: 'BRTE Details'
    }
  },
  {
    path: 'State/out-student-list',
    component: OsclistDistrictWiseComponent,
    data: {
      title: 'OSC List'
    }
  },
  {
    path: 'state/aided_school_dist',
    component: AidedschooldistComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'state/aided_school_list',
    component: AidedschoollistComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'state/aided_school_section',
    component: AidedschoolsectionComponent,
    data: {
      title: 'State'
    },
  },
  {
    path: 'higher_secondary/groups',
    component: HigherSecondaryGroupsComponent,
    data: {
      title: 'Higher Secondary Groups '
    }
  },
  {
    path: 'section/aided/schools',
    component: DistrictWiseSectionAidedSchoolComponent,
    data: {
      title: 'Section Aided Schools'
    }
  },
  {
    path: 'blockwise/section/aided/schools',
    component: BlockWiseSectionAidedSchoolComponent,
    data: {
      title: 'Section Aided Schools'
    }
  },
  {
    path: 'schoolwise/section/aided/schools',
    component: SchoolWiseSectionAidedSchoolComponent,
    data: {
      title: 'Section Aided Schools'
    }
  },
  {
    path: 'State/rte-student-reports',
    component: RteStudentslistDistrictComponent,
    data: {
      title: 'RTE Student List'
    }
  },
  {
    path: 'block_higher_secondary/groups',
    component: BLockwiseHigherSecondaryGroupsComponent,
    data: {
      title: 'Block Wise Higher Secondary Groups '
    }
  },
  {
    path: 'school_higher_secondary/groups',
    component: SchoolHigherSecondaryGroupsComponent,
    data: {
      title: 'Block Wise Higher Secondary Groups '
    }
  },
  {
    path: 'state/pindicsreport',
    component: PindicsreportComponent,
    data: {
      title: 'Higher Secondary Groups '
    }
  },
  {
    path: 'state/indicator',
    component: IndicatorsComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'state/atsl-report',
    component: AtslReportComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'state/indicatorMarkSheetReport',
    component: IndicatorsMarkSheetReportsComponent,
    data: {
      title: 'State'
    }
  },
  {
    path: 'State/RenewalResetQueue',
    component: RenewalResetQueueComponent,
    data: {
      title: 'RenewalResetQueue'
    }
  },
  {
    path: 'State/right-to-education',
    component: RteAllocationComponent,
    data: {
      title: 'RTE_allocation'
    }
  },
  {
    path: 'State/unrecognized-school-list',
    component: UnRecognizedSchoolComponent,
    data: {
      title: 'Un-Recognized School'
    }
  },
  {
    path: 'acadamic_slas2019_student-wise',
    component: SlasstudentdistrictwiseComponent,
    data: {
      title: 'SLAS Student District wise'
    }
  },
  {
    path: 'State/school-academic-details',
    component: AcademicDetailsComponent,
    data: {
      title: 'School Academic Details'
    }
  },
  {
    path: 'State/school-land-details',
    component: SchoolLandDetailsComponent,
    data: {
      title: 'School Academic Details'
    }
  },
  {
    path: 'State/school-wash-details',
    component: SchoolWashDetailsComponent,
    data: {
      title: 'School Wash Details'
    }
  },
  {
    path: 'State/committee-details',
    component: CommitteeDetailsComponent,
    data: {
      title: 'Committee Details'
    }
  },
  {
    path: 'State/committee-district-details',
    component: CommitteeDistrictDetailsComponent,
    data: {
      title: 'Committee Details'
    }
  },
  {
    path: 'State/building-details',
    component: BuildingDetailsComponent,
    data: {
      title: 'Building Details'
    }
  },
  {
    path: 'State/parttimeteachersalaryreport',
    component: ParttimeteachersalaryreportComponent,
    data: {
      title: 'parttimeteachersalaryreport'
    }
  },
  {
    path: 'State/nearest-govt-school',
    component: NearestGovtSchoolComponent,
    data: {
      title: 'Nearest Government School'
    }
  }, 
  {
    path: 'state/verificationstatusmonitoring',
    component: VerficationstatusmonitoringComponent,
    data: {
      title: 'verificationstatusmonitoring'
    }
  },
  {
    path: 'state/covidwatchreport',
    component: CovidWatchReportComponent,
    data: {
      title: 'CovidWatchReport'
    }
  },
  {
    path: 'state/covidwatchdetilreport',
    component: CovidDetailReportComponent,
    data: {
      title: 'CovidWatchReport'
    }
  },
  {
    path: 'health-it-report',
    component: HealthItReportComponent,
    data: {
        title: 'Health and IT'
    }
},
  {
    path: 'state/covidwatchquestionresposne',
    component: CovidSummaryReportComponent,
    data: {
      title: 'CovidWatchSummaryReport'
    }
  },
  {
    path: 'state/IED-Teacher',
    component: IedTeacherComponent,
    data: {
      title: 'verificationstatusmonitoring'
    }
  },
  {
    path:'state/homework',
    component : TeacherHomeworkComponent
  },

  {
     path:'sampledashboard',
     component : DashboardComponent
  }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateRoutingModule { }
