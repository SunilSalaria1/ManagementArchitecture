import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import account components
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPasswrdComponent } from './account/forgot-passwrd/forgot-passwrd.component';
// import admin portal component
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
// import pages components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserDetailsComponent } from './pages/dashboard/user-details/user-details.component';
import { EditRecordComponent } from './admin/edit-record/edit-record.component';
import { AuthGuard } from './services/guard/auth.guard';
import { TrackTimeComponent } from './pages/dashboard/track-time/track-time/track-time.component';
import { UserProfileComponent } from './pages/dashboard/user-details/user-profile/user-profile/user-profile.component';
import { EditTracktimeComponent } from './pages/dashboard/track-time/track-time/edit-tracktime/edit-tracktime.component';
import { ViewTracktimeComponent } from './pages/dashboard/track-time/track-time/view-tracktime/view-tracktime.component';
import { AddRecordComponent } from './admin/add-record/add-record.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';

const routes: Routes = [
  // default route redirect to login page
  {
    path: '',
    component: LoginComponent,
  },

  // account routes
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswrdComponent,
  },

  // admin portal route
  {
    path: 'admin-portal',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/admin-profile',
    component: AdminProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/track-time',
    component: TrackTimeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/register-user',
    component: AddRecordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/edit-user/:userId',
    component: EditRecordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/edit-tracktime/:trackUserId',
    component: EditTracktimeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/view-tracktime/:trackUserId',
    component: ViewTracktimeComponent,
    canActivate: [AuthGuard],
  },

  // dashboard routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'dashboard/track-time',
    component: TrackTimeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-portal/user-details/:userId',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/edit-tracktime/:trackUserId',
    component: EditTracktimeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/view-tracktime/:trackUserId',
    component: ViewTracktimeComponent,
    canActivate: [AuthGuard],
  },
  // page not found route
  {
    path: '**',
    component: PageNotFoundComponent,
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
