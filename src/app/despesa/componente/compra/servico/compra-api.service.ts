import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { filtroService } from "src/app/shared/function/filtro.service";
import { environment } from "src/environments/environment";
import { CompraModel, FiltroCompraParametroModel } from "../modelo/compra.model";

@Injectable({
  providedIn: 'root'
})
export class CompraApiService{
  protected readonly pathApi = `${environment.url.service}`
  protected readonly pathApiCompra = this.pathApi + '/compra'

  constructor(private http: HttpClient){}

  buscarCompras(
    param?: FiltroCompraParametroModel,
    page?: number,
    size?: number
  ){
    return this.http.get(`${this.pathApiCompra}/filtros`,
      {params: filtroService.criarParametro(param,page, size)}
    ).pipe(take(1))
  }

  buscarCompraPorId(id: string){
    return this.http.get(`${this.pathApiCompra}/${id}`).pipe(take(1))
  }

  salvarCompra(param: CompraModel){
    return this.http.post(`${this.pathApiCompra}`, param).pipe(take(1))
  }

  editarCompra(id: string, param: CompraModel){
    return this.http.put(`${this.pathApiCompra}/${id}`, param).pipe(take(1))
  }

  deletarCompra(id: string){
    return this.http.delete(`${this.pathApiCompra}/${id}`).pipe(take(1))
  }
}
