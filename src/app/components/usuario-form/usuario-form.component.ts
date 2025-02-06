import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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

    const usuario = this.addUserForm.value;

    if (this.idUsuario) {
      // Si existe idUsuario, actualizamos el usuario
      usuario.idUsuario = this.idUsuario;

      this.usuarioService.updateUsuario(usuario).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          alert('Usuario actualizado con éxito');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Hubo un error al actualizar el usuario');
        },
      });
    } else {
      // Si no existe idUsuario, creamos un nuevo usuario
      this.usuarioService.createUser(usuario).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          alert('Usuario creado con éxito');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert('Hubo un error al crear el usuario');
        },
      });
    }
  }
}
