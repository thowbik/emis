import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { SchoolStaffComponent } from './school-staff/school-staff.component';
import { VolunteerTeachersComponent } from './volunteer-teachers/volunteer-teachers.component';
import { StaffOnDeputationComponent } from './staff-on-deputation/staff-on-deputation.component';
import { StafflogindetailComponent } from './stafflogindetail/stafflogindetail.component';
import { PindicsHmevaluationComponent } from './pindics-hmevaluation/pindics-hmevaluation.component';
import { StaffTrainingDetailsComponent } from './staff-training-details/staff-training-details.component';
import { VocationalStaffNsqfRegComponent } from './vocational-staff-nsqf-reg/vocational-staff-nsqf-reg.component';
import { StaffFixationComponent } from './staff-fixation/staff-fixation.component';
import { ApprovalForTransferRequestComponent } from './approval-for-transfer-request/approval-for-transfer-request.component';
import { TeacherAcadamicQualificationComponent } from './teacher-acadamic-qualification/teacher-acadamic-qualification.component';
import { TeacherProfQualificationComponent } from './teacher-prof-qualification/teacher-prof-qualification.component';
import { BTTeachersComponent } from './bt-teachers/bt-teachers.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { TrainingConductedComponent } from './training-conducted/training-conducted.component';
import { TeacherHomeworkComponent } from './teacher-homework/teacher-homework.component';
import { TeachersDetailsComponent } from './teachers-details/teachers-details.component';
import { TeacherStudentComponent } from './teacher-student/teacher-student.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { AddEditStaffComponent } from './add-edit-staff/add-edit-staff.component';
import { MappingskillComponent } from './mappingskill/mappingskill.component';

const routes: Routes = [
    {
        path: 'staff',
        component: TeachersComponent,
        data: {
            title: 'Staff List'
        }
    },
    {
        path: 'staffdetails',
        component: AddEditStaffComponent,
        data: {
            title: 'Staff List'
        }
    },
    {
        path: 'stafffixation',
        component: StaffFixationComponent
    },
    {
        path: 'schoolstaff',
        component: SchoolStaffComponent,
        data: {
            title: 'School Staff'
        },
        
    },{
        path: 'stafftraininglist',
        component: StaffTrainingDetailsComponent,
        data:{
            title:'In Service Training List'
        },
    },{
        path: 'nsqfstaffreg',
        component: VocationalStaffNsqfRegComponent,
        data:{
            title:'NSQF Vocational Training Course Staff Reg'
        },
    },
    {
          path:'mappingskill',
          component:MappingskillComponent,
          data:{
              title:'mapping skill feedbackformat'
          }
    },
    {
        path: 'staffdeputation',
        component: StaffOnDeputationComponent,
        data: {
            title: 'Staff On Deputation'
        },
        
    },
    {
        path: 'volunteers',
        component: VolunteerTeachersComponent,
        data: {
            title: 'Volunteers Staffs'
        }
    },
    {
        path: 'staff-logindetail',
        component: StafflogindetailComponent,
        data: {
            title: 'Staff Login Details'
        }
    },
    {
        path: 'pindics-hmevaluation',
        component: PindicsHmevaluationComponent,
        data: {
            title: 'PINDICS HM Evaluation'
        }
    },
    {
        path: 'requestapproval',
        component: ApprovalForTransferRequestComponent,
        data: {
            title: 'Transfer Request Approval'
        }
    },
    {
        path: 'teacherAcadamicQualification',
        component: TeacherAcadamicQualificationComponent,
        data: {
            title: 'Teacher Acadamic Qualification'
        }
    },
    
    {
        path: 'teacherProfQualificationComponent',
        component: TeacherProfQualificationComponent,
        data: {
            title: 'Teacher Proof Qualification'
        }
    },
    {
        path: 'staff/BtTeachers',
        component: BTTeachersComponent,
        data: {
            title: 'BT Teacher'
        }
    },
    {
        path: 'traininglist',
        component: TrainingConductedComponent,
        data:{
            title:'Training List'
        },
    },
    {
        path: 'staff/trainingdetails',
        component: TrainingDetailsComponent,
        data: {
            title: 'Training Details'
        }
    },
    {
        path:'homeworkdetails',
        component: TeacherHomeworkComponent,
        data: {
            title:'Homework Details'
        }
    },
    {
        path:'SchoolInformation',
        component: TeachersDetailsComponent,
        data: {
            title:'Teachers Information'
        }
    },
    {
        path:'Teacher/Calltracking',
        component: TeacherStudentComponent,
        data: {
            title:'Teachers Student'
        }
    },
    {
        path:'Staffdetails',
        component: StaffDetailsComponent,
        data: {
            title:'Staff Details'
        }
    },
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeachersRoutingModule { }
