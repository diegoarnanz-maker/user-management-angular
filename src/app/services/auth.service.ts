import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUsuario } from '../models/iusuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  private userData: IUsuario | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.apiUrl, credentials).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.userData = response;
      })
    );
  }

  getUser(): IUsuario | null {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('user') || 'null');
    }
    return this.userData;
  }

  logout() {
    localStorage.removeItem('user');
    this.userData = null;
  }

  isAdmin(): boolean {
    return this.getUser()?.roles.includes('ROLE_ADMIN') || false;
  }

  isUser(): boolean {
    return this.getUser()?.roles.includes('ROLE_USER') || false;
  }

  isAuthenticated(): boolean {
    return !!this.getUser()?.username;
  }

}
