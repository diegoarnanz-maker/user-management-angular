import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

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
  
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  eliminarUsuario(idUsuario: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(idUsuario).subscribe({
        next: () => {
          console.log('Usuario eliminado correctamente');
          alert('Usuario eliminado con éxito');
          this.router.navigate(['/home']).then(() => {
            window.location.reload(); // Fuerza la recarga de la página
          });          
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Hubo un error al eliminar el usuario');
        },
      });
    }
  }
  

}