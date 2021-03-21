import { Routes, RouterModule } from '@angular/router';
// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../pages/full-layout-page/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path : '',
    loadChildren: () => import('../../pages/full-layout-page/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/students/students.module').then(m => m.StudentModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/teachers/teachers.module').then(m => m.TeachersModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/timesheet/timesheet.module').then(m => m.TimesheetModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/schools/schools.module').then(m => m.SchoolsModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/registers/registers.module').then(m => m.RegistersModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'renewal',
    loadChildren: () => import('../../pages/full-layout-page/renewal/renewal.module').then(m => m.RenewalModule)
  },
  /* state routing */
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/statedashboard/dashboard.module').then(m => m.StateDashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/ceo/ceo.module').then(m => m.CeoModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/beo/beo.module').then(m => m.BeoModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/deo/deo.module').then(m => m.DeoModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/brte/brte.module').then(m => m.BrteModule)
  },
  {
    path: '',
    loadChildren: () => import('../../pages/full-layout-page/state/state.module').then(m => m.StateModule)
  },
  {
    path: 'download',
    loadChildren: () => import('../../pages/full-layout-page/download/download.module').then(m => m.DownloadModule)
  },
  /* state routing */

  /* Teachers Login Routing */
  {
    path: 'teachers-dashboard',
    loadChildren: () => import('../../pages/full-layout-page/teachersdashboard/teachersdashboard.module').then(m => m.TeachersDashboardModule)
  },
    /* Teachers Login Routing */

    {
      path: '',
      loadChildren: () => import('../../pages/full-layout-page/admin/admin.module').then(m => m.AdminModule)
    }
    ,{
      path: '',
      loadChildren: () => import('../../pages/full-layout-page/search-details/search-details.module').then(m => m.SearchDetailsModule)
    }
  
];
