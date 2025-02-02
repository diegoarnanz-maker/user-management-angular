import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioFormComponent } from './pages/usuario-form/usuario-form.component';

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
    }
];
