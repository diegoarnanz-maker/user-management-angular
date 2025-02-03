import { Component, inject } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';

@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  imports: [
    UsuarioCardComponent
  ],
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.css',
})
export class UsuarioDetailComponent {
  usuario!: IUsuario;
  usuarioService = inject(UsuarioService);
  route = inject(ActivatedRoute);
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      console.log('Buscando usuario con ID:', id);

      this.usuarioService.getUsuarioById(id).subscribe({
        next: (response) => {
          console.log('Usuario encontrado:', response);
          this.usuario = response;
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
        }
      });
    }
  }
}