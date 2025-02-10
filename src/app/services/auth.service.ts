import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  private userData: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        console.log('🔹 Respuesta del login:', response);

        const userData = {
          username: username,
          password: password, //revisar porque no se si es seguro
          roles: response.roles
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }),
      catchError(error => {
        console.error('❌ Error en login:', error);
        return throwError(() => new Error('Error al iniciar sesión'));
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
