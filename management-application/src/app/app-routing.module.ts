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
import { AsideNavComponent } from './shared/aside/aside-nav.component';
import { AppComponent } from './app.component';

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
  // dashboard route
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'aside',
    component: AsideNavComponent,
  },
  {
    path: 'app',
    component: AppComponent,
  },
  // page not found route
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
