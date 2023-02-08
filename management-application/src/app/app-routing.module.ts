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

const routes: Routes = [
  // default route redirect to login page
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // account routes
  {
    path: 'login',
    component: LoginComponent,
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
  },
  {
    path: 'edit-user/:userId',
    component: EditRecordComponent,
  },

  // dashboard routes
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'user-details/:userId',
    component: UserDetailsComponent,
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
