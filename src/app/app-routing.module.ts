import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './authguard.guard';
import { TitleListComponent } from './title-list/title-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthguardGuard], data: { title: 'Dashboard'}},
  { path: 'about', component: AboutComponent,canActivate:[AuthguardGuard], data: { title: 'About Us'}},
  { path: 'titleList', component: TitleListComponent,canActivate:[AuthguardGuard], data: { title: 'Title'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
