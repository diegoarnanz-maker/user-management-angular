import { IUsuario } from "./iusuario";

export interface IUsuarioResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    results: IUsuario[];
}
