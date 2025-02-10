import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUsuarioResponse } from '../models/iusuario-response';
import { IUsuario } from '../models/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient) {}

  // findAll() con paginacion incluida
  getUsuarios(page: number = 1): Observable<IUsuarioResponse> {
    return this.httpClient
      .get<IUsuarioResponse>(`${this.apiUrl}?page=${page}&perPage=10`)
      .pipe(
        tap((response) => console.log('🔍 Usuarios recibidos:', response))
      );
  }

  // read(_id)
  getUsuarioById(idUsuario: number): Observable<IUsuario> {
    return this.httpClient.get<IUsuario>(`${this.apiUrl}/${idUsuario}`);
  }

  // create(Usuario)
  createUser(usuario: IUsuario): Observable<IUsuario> {
    return this.httpClient.post<IUsuario>(`${this.apiUrl}/newuser`, usuario);
  }

  // update(Usuario)
  updateUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.httpClient.put<IUsuario>(
      `${this.apiUrl}/updateuser/${usuario.idUsuario}`,
      usuario
    );
  }

  // delete(idUsuario)
  deleteUsuario(idUsuario: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/deleteuser/${idUsuario}`
    );
  }
}
