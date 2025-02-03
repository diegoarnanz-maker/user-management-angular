import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuarioResponse } from '../models/iusuario-response';
import { IUsuario } from '../models/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'https://peticiones.online/api/users';

  constructor(private httpClient: HttpClient) {}

  // findAll() con paginacion incluida
  getUsuarios(page: number = 1): Observable<IUsuarioResponse> {
    return this.httpClient.get<IUsuarioResponse>(`${this.apiUrl}?page=${page}`);
  }

  // read(id)
  getUsuarioById(id: number): Observable<IUsuario> {
    console.log(`Obteniendo usuario con ID: ${id}`); // 🛠 Depuración
    return this.httpClient.get<IUsuario>(`${this.apiUrl}/${id}`);
  }

  // create(Usuario)
  createUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.httpClient.post<IUsuario>(this.apiUrl, usuario);
  }

  // update(Usuario)
  updateUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.httpClient.put<IUsuario>(
      `${this.apiUrl}/${usuario.id}`,
      usuario
    );
  }

  // delete(id)
  deleteUsuario(id: number): Observable<IUsuario> {
    return this.httpClient.delete<IUsuario>(`${this.apiUrl}/${id}`);
  }
}
