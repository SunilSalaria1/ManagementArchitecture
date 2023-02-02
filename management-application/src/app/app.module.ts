import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPasswrdComponent } from './account/forgot-passwrd/forgot-passwrd.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EditRecordComponent } from './admin//edit-record/edit-record.component';
import { AddRecordComponent } from './admin/add-record/add-record.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AsideNavComponent } from './shared/aside/aside-nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswrdComponent,
    AdminDashboardComponent,
    EditRecordComponent,
    AddRecordComponent,
    DashboardComponent,
    AsideNavComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
