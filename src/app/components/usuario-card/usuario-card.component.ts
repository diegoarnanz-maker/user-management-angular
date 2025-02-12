import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css',
})
export class UsuarioCardComponent {
  @Input() usuario!: IUsuario;
  @Input() detalle: boolean = false;

  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);
  router = inject(Router);

  eliminarUsuario(idUsuario: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger)',
      cancelButtonColor: 'var(--secondary)',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(idUsuario).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el usuario.',
              'error'
            );
          },
        });
      }
    });
  }
}
