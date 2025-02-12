import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    UsuarioFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
