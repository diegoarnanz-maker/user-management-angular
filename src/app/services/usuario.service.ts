import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUsuarioResponse } from '../models/iusuario-response';
import { IUsuario } from '../models/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private userUrl = 'http://localhost:8080/api/user';
  private adminUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // findAll() con paginacion incluida
  getUsuarios(page: number = 0, perPage: number = 10): Observable<IUsuarioResponse> {
    return this.http.get<IUsuarioResponse>(`${this.userUrl}?page=${page}&perPage=${perPage}`);
  }

  // read(_id)
  getUsuarioById(idUsuario: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.userUrl}/${idUsuario}`);
  }

  // create(Usuario)
  createUser(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.adminUrl}/newuser`, usuario);
  }

  // update(Usuario)
  updateUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(
      `${this.adminUrl}/updateuser/${usuario.idUsuario}`,
      usuario
    );
  }

  // delete(idUsuario)
  deleteUsuario(idUsuario: number): Observable<void> {
    return this.http.delete<void>(
      `${this.adminUrl}/deleteuser/${idUsuario}`
    );
  }
}
