import { Component, inject, OnInit } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';
import { IUsuarioResponse } from '../../models/iusuario-response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsuarioCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  usuarios: IUsuario[] = [];
  page: number = 1;
  totalPages: number = 1;
  usuarioService = inject(UsuarioService);

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios(this.page).subscribe({
      next: (respuesta: IUsuarioResponse) => {
        this.usuarios = respuesta.results;
        this.totalPages = respuesta.total_pages;
        // console.log('Usuarios:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener findAll:', error);
      },
    });
  }

  cambiarPagina(siguiente: boolean): void {
    if (siguiente && this.page < this.totalPages) {
      this.page++;
    } else if (!siguiente && this.page > 1) {
      this.page--;
    }
    this.usuarioService.getUsuarios(this.page).subscribe({
      next: (respuesta: IUsuarioResponse) => {
        this.usuarios = respuesta.results;
        this.totalPages = respuesta.total_pages;
      },
      error: (error) => {
        console.error('Error al obtener findAll:', error);
      },
    });
  }
}
