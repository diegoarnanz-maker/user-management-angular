import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioDetailComponent } from './pages/usuario-detail/usuario-detail.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'newuser',
        component: NewUserComponent
    },
    {
        path: 'updateuser/:idUsuario',
        component: UpdateUserComponent
    },
    {
        path: 'user/:idUsuario',
        component: UsuarioDetailComponent
    }
    
];
