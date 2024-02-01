import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filtroService } from "src/app/shared/function/filtro.service";
import { environment } from "src/environments/environment";
import { BancoModel, FiltroBancoParametroModel } from "../modelo/banco.model";
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BancoApiService{
  protected readonly pathApi = `${environment.url.service}`
  protected readonly pathApiBanco = this.pathApi + '/banco'

  constructor(private http: HttpClient){}

  buscarBancos(
    param?: FiltroBancoParametroModel,
    page?: number,
    size?: number
  ){
    return this.http.get(`${this.pathApiBanco}/filtros`,
      {params: filtroService.criarParametro(param,page, size)}
    ).pipe(take(1))
  }

  buscarBancoPorId(id: string){
    return this.http.get(`${this.pathApiBanco}/${id}`).pipe(take(1))
  }

  salvarBanco(param: BancoModel){
    return this.http.post(`${this.pathApiBanco}`, param).pipe(take(1))
  }

  editarBanco(id: string, param: BancoModel){
    return this.http.put(`${this.pathApiBanco}/${id}`, param).pipe(take(1))
  }

  deletarBanco(id: string){
    return this.http.delete(`${this.pathApiBanco}/${id}`).pipe(take(1))
  }

  listarBancosEnum(){
    return this.http.get(`${this.pathApi}/enum/bancos`).pipe(take(1))
  }
}
