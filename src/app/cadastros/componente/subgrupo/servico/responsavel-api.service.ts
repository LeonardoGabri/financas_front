import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { filtroService } from 'src/app/shared/function/filtro.service';
import { environment } from 'src/environments/environment';
import { FiltroSubgrupoParametroModel, SubgrupoModel } from '../modelo/subgrupo.model';

@Injectable({
  providedIn: 'root'
})
export class SubgrupoApiService{
  protected readonly pathApi = `${environment.url.service}`
  protected readonly pathApiSubgrupo = this.pathApi + '/subgrupo'

  constructor(private http: HttpClient){}

  buscarSubgrupos(
    param?: FiltroSubgrupoParametroModel,
    page?: number,
    size?: number
  ){
    return this.http.get(`${this.pathApiSubgrupo}/filtros`,
      {params: filtroService.criarParametro(param,page, size)}
    ).pipe(take(1))
  }

  buscarSubgrupoPorId(id: string){
    return this.http.get(`${this.pathApiSubgrupo}/${id}`).pipe(take(1))
  }

  salvarSubgrupo(param: SubgrupoModel){
    return this.http.post(`${this.pathApiSubgrupo}`, param).pipe(take(1))
  }

  editarSubgrupo(id: string, param: SubgrupoModel){
    return this.http.put(`${this.pathApiSubgrupo}/${id}`, param).pipe(take(1))
  }

  deletarSubgrupo(id: string){
    return this.http.delete(`${this.pathApiSubgrupo}/${id}`).pipe(take(1))
  }
}
