import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolDetailRegistraionComponent } from './school-detail-registraion/school-detail-registraion.component';
import { SchoolRecognitionRenewalStatusComponent } from './school-recognition-renewal-status/school-recognition-renewal-status.component';


const routes: Routes = [

 
  {
    path: 'school/detail/registration',
    component: SchoolDetailRegistraionComponent,
    data: {
        title: 'Registration' 
    }
  },
  {
    path: 'new/school/renewal/status',
    component: SchoolRecognitionRenewalStatusComponent,
    data: {
        title: 'Registration' 
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
