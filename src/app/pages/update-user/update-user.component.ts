import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    UsuarioFormComponent
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

}
