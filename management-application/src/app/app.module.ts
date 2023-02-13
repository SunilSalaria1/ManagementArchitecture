import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import http for server requests
import { HttpClientModule } from '@angular/common/http';
// Import forms module
import { FormsModule } from '@angular/forms';
// Import account components
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPasswrdComponent } from './account/forgot-passwrd/forgot-passwrd.component';
// Import admin components
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EditRecordComponent } from './admin//edit-record/edit-record.component';
import { AddRecordComponent } from './admin/add-record/add-record.component';
// import pages components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// Import shared components
import { AsideNavComponent } from './shared/aside/aside-nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DeleteComponent } from './shared/popup/delete/delete.component';
import { UserDetailsComponent } from './pages/dashboard/user-details/user-details.component';
import { TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    PageNotFoundComponent,
    DeleteComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
