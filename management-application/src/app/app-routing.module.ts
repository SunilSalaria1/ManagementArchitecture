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
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-user/:userId',
    component: EditRecordComponent,
    canActivate: [AuthGuard]
  },

  // dashboard routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'track-time',
    component: TrackTimeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-details/:userId',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
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
