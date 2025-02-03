import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioFormComponent } from './pages/usuario-form/usuario-form.component';
import { UsuarioDetailComponent } from './pages/usuario-detail/usuario-detail.component';

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
        component: UsuarioFormComponent
    },
    {
        path: 'users/:id',
        component: UsuarioDetailComponent
    }
    
];
