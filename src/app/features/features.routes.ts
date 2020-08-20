import { Routes } from "@angular/router";
import { ROLE } from 'app/shared/config';
import { NgxPermissionsGuard, NgxPermissionsRouterData } from 'ngx-permissions';

export const FEATURES_ROUTES: Routes = [
  {
    path: "dashboard",
    loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.NURSE]
      } as NgxPermissionsRouterData,
    }
  },
  {
    path: "patients",
    loadChildren: 'app/features/patients/patients.module#PatientsModule',
  },
  {
    path: "doctors",
    loadChildren: 'app/features/doctors/doctors.module#DoctorsModule',
  },
  {
    path: "nurses",
    loadChildren: 'app/features/nurses/nurses.module#NursesModule',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [ROLE.ADMIN]
      } as NgxPermissionsRouterData,
    }
  },
  {
    path: "departments",
    loadChildren: 'app/features/departments/departments.module#DepartmentsModule',
    data: {
      permissions: {
        only: ROLE.ADMIN
      }
    }
  },
  {
    path: "appointments",
    loadChildren: 'app/features/appointments/appointments.module#AppointmentsModule'
  },
  {
    path: "medical-history",
    loadChildren: 'app/features/medical-histories/medical-histories.module#MedicalHistoriesModule'
  },  
  {
    path: "task",
    loadChildren: 'app/features/tasks/tasks.module#TasksModule'
  },
  {
    path: "profile",
    loadChildren: 'app/features/profile/profile.module#ProfileModule'
  },
  {
    path: "**",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
];
