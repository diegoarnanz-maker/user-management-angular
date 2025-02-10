import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  addUserForm!: FormGroup;
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  idUsuario?: number;

  update: boolean = false;

  constructor() {
    this.addUserForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9._-]+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });

    //Busco si hay id en la URL para poder pasar los datos en caso de ser updateuser
    this.idUsuario = Number(this.route.snapshot.paramMap.get('idUsuario'));
    if (this.idUsuario) {
      //Si existe activo el update para el control flow en el template
      this.update = true;
      this.usuarioService.getUsuarioById(this.idUsuario).subscribe({
        next: (usuario) => {
          this.addUserForm.patchValue(usuario);
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.addUserForm.invalid) {
      console.log('Formulario inválido:', this.addUserForm.errors);
      return;
    }

    let usuario = { ...this.addUserForm.value };

    if (usuario.role) {
      usuario.roles = [usuario.role];
      delete usuario.role;
    } else {
      usuario.roles = [];
    }

    // console.log('Datos enviados al backend:', usuario);

    if (this.idUsuario) {
      usuario.idUsuario = this.idUsuario;
      this.usuarioService.updateUsuario(usuario).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            text: 'El usuario ha sido actualizado con éxito.',
            confirmButtonColor: 'var(--secondary)',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar el usuario.',
            confirmButtonColor: 'var(--danger)',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      this.usuarioService.createUser(usuario).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario ha sido creado con éxito.',
            confirmButtonColor: 'var(--secondary)',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear el usuario.',
            confirmButtonColor: 'var(--danger)',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    }
  }
}
