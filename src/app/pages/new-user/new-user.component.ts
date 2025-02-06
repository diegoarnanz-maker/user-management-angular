import { Component } from '@angular/core';
import { UsuarioFormComponent } from "../../components/usuario-form/usuario-form.component";

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [UsuarioFormComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

}
