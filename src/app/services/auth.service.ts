import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response';
import { IUsuario } from '../models/iusuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private userData: any = null;

  usuarioService = inject(UsuarioService);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          const userData = {
            username: username,
            password: password, //revisar porque no se si es seguro pero me hace falta para el basic auth
            roles: response.roles,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          return this.usuarioService.getUsuarioByUsername(username);
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(() => new Error('Error al iniciar sesión'));
        })
      );
  }

  register(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.apiUrl}/register`, usuario).pipe(
      tap((response) => console.log('Usuario registrado con éxito:', response)),
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(() => new Error('Error en el registro de usuario'));
      })
    );
  }

  getUser(): any {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('user') || 'null');
    }
    return this.userData;
  }

  isAdmin(): boolean {
    return this.getUser()?.roles.includes('ROLE_ADMIN');
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  logout() {
    localStorage.removeItem('user');
    this.userData = null;
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).roles[0] : null;
  }

  getUsername(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : null;
  }
}
