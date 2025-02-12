import { Component, inject, OnInit } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';
import { IUsuarioResponse } from '../../models/iusuario-response';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UsuarioCardComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  usuarios: IUsuario[] = [];
  page: number = 0;
  totalPages: number = 1;
  perPage: number = 9;
  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios(this.page, this.perPage).subscribe({
      next: (response: IUsuarioResponse) => {
        // console.log('Usuarios recibidos en Angular:', response);
        this.usuarios = response.results;
        this.totalPages = response.total_pages;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  cambiarPagina(siguiente: boolean): void {
    if (siguiente && this.page < this.totalPages - 1) {
      this.page++;
    } else if (!siguiente && this.page > 0) {
      this.page--;
    }

    this.getUsuarios();
  }
}
