import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import {ClubParticipationRegistersComponent} from './club-participation-registers/club-participation-registers.component';
import { StudentsummaryComponent } from './studentsummary/studentsummary.component';
import { CostfreeBicycleRegComponent } from './costfree-bicycle-reg/costfree-bicycle-reg.component';
import { CompetitionParticipantRegisterComponent } from './competition-participant-register/competition-participant-register.component';
const routes: Routes = [
    {
        path: 'registers',
        component: RegistersComponent,
        data: {
            title: 'Registers'
        }
    },
    {
        path: 'student_summary',
        component: StudentsummaryComponent,
        data: {
            title: 'Registers'
        }
    },

    {
        path: 'student_attendance',
        component: StudentAttendanceregComponent,
        data: {
            title: 'Student Attendance Register',
            parent: 'Registers'
        }
    },
    {
        path: 'staff_attendance',
        component: StaffAttendanceregComponent,
        data: {
            title: 'Staff Attendance Register',
            parent: 'Registers'
        }
    },
    {
        path: 'nmms_scheme',
        component: NmmsschemeregComponent,
        data: {
            title: 'NMMS Scheme',
            parent: 'Registers'
        }
    },
    {
        path: 'trstse',
        component: TRSTSEScholarshipSchemeComponent,
        data: {
            title: 'TRSTSE Scholarship Scheme',
            parent: 'Registers'
        }
    },
    {
        path: 'outofscholl-chidren',
        component: OutofschollChildrenRegComponent,
        data: {
            title: 'Out Of School Children Register',
            parent: 'Registers'
        }
    },
    {
        path: 'inspire_award',
        component: InspireAwardDetailsComponent,
        data: {
            title: 'Inspire Award Details',
            parent: 'Registers'
        }
    },
    {
        path: 'vacationalstudent-NSQF',
        component: VocationalstudentNSQFRegComponent,
        data: {
            title: 'Vocational Student(NSQF) Register',
            parent: 'Registers'
        }
    },
    {
        path: 'studentsports-participation',
        component: StudentssportsParticipationRegComponent,
        data: {
            title: 'Students Sports Participation',
            parent: 'Registers'
        }
    },
    {
        path: 'rte-studentregister',
        component: RteStudentRegComponent,
        data: {
            title: 'RTE Student Register',
            parent: 'Registers'
        }
    },
    {
        path: 'cwsn-studentregister',
        component: CwsnStudentRegComponent,
        data: {
            title: 'CWSN-Student Register',
            parent: 'Registers'
        }
    },
    {
        path: 'students-religiondetails',
        component: StudentsreligiondetailsRegComponent,
        data: {
            title: 'Students Religion Details',
            parent: 'Registers'
        }
    },
    {
        path: 'students-underbelow-povertyline',
        component: StudentsUnderblowpovertylineRegComponent,
        data: {
            title: 'Students under Below Poverty Line',
            parent: 'Registers'
        }
    },
    {
        path: 'students-validaadhar',
        component: StudentsValidaadharRegComponent,
        data: {
            title: 'Students having Valid AADHAR',
            parent: 'Registers'
        }
    },
    {
        path: 'students-reportbyage',
        component: StudentsReportbyageRegComponent,
        data: {
            title: 'Students Report By Age',
            parent: 'Registers'
        }
    },
    {
        path: 'students-communitydetails',
        component: StudentsCommunitydetailsRegComponent,
        data: {
            title: 'Students Community Details',
            parent: 'Registers'
        }
    },
    {
        path: 'staff-trainingdetail',
        component: StaffTrainingdetailsComponent,
        data: {
            title: 'Staff Training Detils',
            parent: 'Registers'
        }
    },
    {
        path: 'scaleregister',
        component: ScaleregisterComponent,
        data: {
            title: 'Scale Register',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-cutsweater',
        component: CostfreeCutsweaterRegComponent,
        data: {
            title: 'Cost Free Cut-Sweater Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-boot',
        component: CostfreeBootRegComponent,
        data: {
            title: 'Cost Free Boot Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-socks',
        component: CostfreeSocksRegComponent,
        data: {
            title: 'Cost Free Socks Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-raincoat',
        component: CostfreeRaincoatRegComponent,
        data: {
            title: 'Cost Free Raincoat Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'ptmgr-noonmealprogramme',
        component: PtmgrNoonmealprogramRegComponent,
        data: {
            title: 'PTMGR Nutritious Meal Programme Beneficiaries(Mid Day Meal)',
            parent: 'Registers'
        }
        
    },
    {
        path: 'costfree-textbooks',
        component: CostfreeTextbooksRegComponent,
        data: {
            title: 'Cost Free Textbooks Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-notebooks',
        component: CostfreeNotebooksRegComponent,
        data: {
            title: 'Cost Free Notebooks Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-bags',
        component: CostfreeBagsRegComponent,
        data: {
            title: 'Cost Free Bags Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-uniforms',
        component: CostfreeUniformsRegComponent,
        data: {
            title: 'Cost Free Uniforms Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-footwear',
        component: CostfreeFootwearRegComponent,
        data: {
            title: 'Cost Free Footwear Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-buspass',
        component: CostfreeBuspassRegComponent,
        data: {
            title: 'Cost Free Bus Pass Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-colourpencil',
        component: CostfreeColourpencilRegComponent,
        data: {
            title: 'Cost Free Colour Pencil Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-geometrybox',
        component: CostfreeGeometryboxRegComponent,
        data: {
            title: 'Cost Free Geometry Box Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-atlas',
        component: CostfreeAtlasRegComponent,
        data: {
            title: 'Cost Free Atlas Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-laptop11',
        component: CostfreeLaptop11RegComponent,
        data: {
            title: 'Cost Free Laptops Distribution 11-Std Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-laptop12',
        component: CostfreeLaptop12RegComponent,
        data: {
            title: 'Cost Free Laptops Distribution 12-Std Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-laptop12preyears',
        component: CostfreeLaptop12preyearsRegComponent,
        data: {
            title: 'Cost Free Laptops Distribution Previous Year 12-Std Details',
            parent: 'Registers'
        }
    },
    {
        path: 'costfree-bicycle',
        component: CostfreeBicycleRegComponent,
        data: {
            title: 'Cost Free bicycle Distribution Details',
            parent: 'Registers'
        }
    },
    {
        path: 'CWSN-studentbenifitregister',
        component: CostfreeCWSNstudentbenefitsRegComponent,
        data: {
            title: 'CWSN-Student Benefits Register',
            parent: 'Registers'
        }
    },
    {
        path: 'club_participation_register',
        component : ClubParticipationRegistersComponent,
        data : {
            title :'Club-Participation Registers'
        }
    },
    {
        path: 'competition-participation-register',
        component: CompetitionParticipantRegisterComponent,
        data: {
            title: 'Competition Participation Register',
            parent: 'Register'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegistersRoutingModule { }
