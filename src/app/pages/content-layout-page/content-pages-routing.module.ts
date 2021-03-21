import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SchoolRegistraionComponent } from './school-registraion/school-registraion.component';
import { UdisereportsprintComponent } from './udisereportsprint/udisereportsprint.component';
import { SchoolregisterreportComponent } from './schoolregisterreport/schoolregisterreport.component';
import { NocpdfComponent } from './nocpdf/nocpdf.component';
import { NocpdfPart2Component } from './nocpdf-part2/nocpdf-part2.component';
import { CbscPrintpdfComponent } from './cbsc-printpdf/cbsc-printpdf.component';
import { RenewalreportComponent } from './renewalreport/renewalreport.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentTcFormComponent } from './student-tc-form/student-tc-form.component';
import { StudentassessmentreportComponent } from './studentassessmentreport/studentassessmentreport.component';
import { TeachersassessmentreportComponent } from './teachersassessmentreport/teachersassessmentreport.component';



const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent,
      data: {
          title: 'Login'
      }
  },
  {
    path: 'udisereportprintpdf', 
    component: UdisereportsprintComponent,
    data: {
        title: 'Udise Report'
    }
  },
  {
    path: 'nocpdf/:appid', 
    component: NocpdfComponent,
    data: {
        title: 'Noc Report'
    }
  },
  {
    path:'studentassessmentreport',
    component:StudentassessmentreportComponent,
    data:{
        title:'Studentassessmentreport',
        parent:'Students'
    }
  },
  {
    path:'teachersassessmentreport',
    component:TeachersassessmentreportComponent,
    data:{
        title:'teachersassessmentreport',
        parent:'teachers'
    }
  },
  {
    path: 'nocpdf-part2/:appid', 
    component: NocpdfPart2Component,
    data: {
        title: 'Noc Report'
    }
  },
  {
    path: 'schoolreportpdf', 
    component: SchoolregisterreportComponent,
    data: {
        title: 'School Report'
    }
  },
  {
    path: 'registration',
    component: SchoolRegistraionComponent,
    data: {
        title: 'Registration'
    }
  },
  {
    path: 'cbsc-pdf',
    component: CbscPrintpdfComponent,
    data: {
        title: 'cbscprintpdf'
    }
  },
  {
    path: 'renewal-pdf',
    component: RenewalreportComponent,
    data: {
        title: 'Renewal Report'
    }
  },
  {
    path: 'reset-password/:username/:usertype',
    component: ResetPasswordComponent,
    data: {
        title: 'Reset Password'
    }
  },
  // {
  //   path: 'reset-password',
  //   component: ResetPasswordComponent,
  //   data: {
  //       title: 'Reset Password'
  //   }
  // },
  {
    path:'student-qr',
    component : StudentDetailsComponent,
    data : {
      title :'Student-Qr'
    }
  },
  {
    path:'tcform',
    component : StudentTcFormComponent,
    data : {
      title :'Student-Qr'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
