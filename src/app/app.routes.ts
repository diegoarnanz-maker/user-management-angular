import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioDetailComponent } from './pages/usuario-detail/usuario-detail.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'newuser',
    component: NewUserComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'updateuser/:idUsuario',
    component: UpdateUserComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'user/:idUsuario',
    component: UsuarioDetailComponent,
    canActivate: [authGuard],
  },
];
