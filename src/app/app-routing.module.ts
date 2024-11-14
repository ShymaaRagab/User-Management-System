import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuardGuard } from './auth-guard.guard';
import { roleGuard } from './role.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UsersComponent, title: 'Users' ,canActivate: [roleGuard]},
  { path: 'search', component: SearchComponent, title: 'Search' ,canActivate: [roleGuard]},
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'profile', component: ProfileComponent, title: 'profile' ,canActivate: [authGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
