import { Component, Input } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  @Input() usuario!: IUsuario;
  @Input() detalle: boolean = false;
}
