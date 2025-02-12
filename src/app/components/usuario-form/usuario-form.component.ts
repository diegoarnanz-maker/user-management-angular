import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  @Input() isAdminMode: boolean = false;
  @Input() isRegisterMode: boolean = false;

  addUserForm!: FormGroup;
  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);
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
        Validators.minLength(6),
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
      role: new FormControl(
        this.isAdminMode ? '' : 'ROLE_USER',
        this.isAdminMode ? [Validators.required] : []
      ),
    });

    this.idUsuario = Number(this.route.snapshot.paramMap.get('idUsuario'));
    if (this.idUsuario) {
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
  
    usuario.roles = this.isAdminMode ? [usuario.role] : ['ROLE_USER'];
    delete usuario.role;
  
    if (this.idUsuario) {
      usuario.idUsuario = this.idUsuario;
  
      if (!usuario.password || usuario.password.trim() === '') {
        delete usuario.password;
      }
  
      this.usuarioService.updateUsuario(usuario).subscribe({
        next: () => {
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
      const endpoint = this.isRegisterMode
        ? this.authService.register(usuario)
        : this.usuarioService.createUser(usuario);
  
      endpoint.subscribe({
        next: () => {
          if (this.isRegisterMode) {
            this.authService
              .login(usuario.username, usuario.password)
              .subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Te has registrado con éxito.',
                    confirmButtonColor: 'var(--secondary)',
                    confirmButtonText: 'Aceptar',
                  }).then(() => {
                    this.router.navigate(['/home']);
                  });
                },
                error: (error) => {
                  console.error('Error en login automático:', error);
                  Swal.fire({
                    icon: 'warning',
                    title: 'Registro exitoso, pero error en login',
                    text: 'Tu cuenta ha sido creada, pero inicia sesión manualmente.',
                    confirmButtonColor: 'var(--warning)',
                    confirmButtonText: 'Aceptar',
                  }).then(() => {
                    this.router.navigate(['/login']);
                  });
                },
              });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: 'El usuario ha sido creado con éxito.',
              confirmButtonColor: 'var(--secondary)',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.router.navigate(['/home']);
            });
          }
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
