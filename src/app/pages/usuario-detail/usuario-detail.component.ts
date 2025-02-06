import { Component, inject, OnInit } from '@angular/core';
import { IUsuario } from '../../models/iusuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';

@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  imports: [RouterModule, UsuarioCardComponent],
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.css',
})
export class UsuarioDetailComponent implements OnInit {
  usuario!: IUsuario;
  usuarioService = inject(UsuarioService);
  route = inject(ActivatedRoute);

  constructor() {
    // this.usuario = {
    //   idUsuario: 0,
    //   username: 'usuarioInicio',
    //   first_name: 'usuario',
    //   email: 'usuarioInicio@gmail.com',
    //   last_name: 'user',
    //   image: 'https://via.placeholder.com/150',
    // };
  }

  ngOnInit(): void {
    const idUsuario = Number(this.route.snapshot.paramMap.get('idUsuario'));
    if (idUsuario) {
      // console.log('Buscando usuario con ID:', idUsuario);

      this.usuarioService.getUsuarioById(idUsuario).subscribe({
        next: (response) => {
          // console.log('Usuario encontrado:', response);
          this.usuario = response;
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
        },
      });
    }
  }
}
