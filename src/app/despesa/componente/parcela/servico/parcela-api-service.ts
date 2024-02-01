import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { filtroService } from "src/app/shared/function/filtro.service";
import { environment } from "src/environments/environment";
import { ParcelaModel, FiltroParcelaParametroModel } from "../modelo/parcela.model";

@Injectable({
  providedIn: 'root'
})
export class ParcelaApiService{
  protected readonly pathApi = `${environment.url.service}`
  protected readonly pathApiParcela = this.pathApi + '/parcelas'

  constructor(private http: HttpClient){}

  buscarParcelas(
    param?: FiltroParcelaParametroModel,
    page?: number,
    size?: number
  ){
    return this.http.get(`${this.pathApiParcela}/filtros`,
      {params: filtroService.criarParametro(param,page, size)}
    ).pipe(take(1))
  }

  buscarParcelaPorId(id: string){
    return this.http.get(`${this.pathApiParcela}/${id}`).pipe(take(1))
  }

  salvarParcela(param: ParcelaModel){
    return this.http.post(`${this.pathApiParcela}`, param).pipe(take(1))
  }

  editarParcela(id: string, param: ParcelaModel){
    return this.http.put(`${this.pathApiParcela}/${id}`, param).pipe(take(1))
  }

  deletarParcela(id: string){
    return this.http.delete(`${this.pathApiParcela}/${id}`).pipe(take(1))
  }

  buscarValorTotal(
    param?: FiltroParcelaParametroModel,
  ){
    return this.http.get(`${this.pathApiParcela}/valorTotal/filtros`,
      {params: filtroService.criarParametro(param)}
    ).pipe(take(1))
  }
}
