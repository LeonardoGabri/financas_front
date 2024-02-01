import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { filtroService } from 'src/app/shared/function/filtro.service';
import { environment } from 'src/environments/environment';
import { FiltroGrupoParametroModel, GrupoModel } from '../modelo/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoApiService{
  protected readonly pathApi = `${environment.url.service}`
  protected readonly pathApiGrupo = this.pathApi + '/grupo'

  constructor(private http: HttpClient){}

  buscarGrupos(
    param?: FiltroGrupoParametroModel,
    page?: number,
    size?: number
  ){
    return this.http.get(`${this.pathApiGrupo}/filtros`,
      {params: filtroService.criarParametro(param,page, size)}
    ).pipe(take(1))
  }

  buscarGrupoPorId(id: string){
    return this.http.get(`${this.pathApiGrupo}/${id}`).pipe(take(1))
  }

  salvarGrupo(param: GrupoModel){
    return this.http.post(`${this.pathApiGrupo}`, param).pipe(take(1))
  }

  editarGrupo(id: string, param: GrupoModel){
    return this.http.put(`${this.pathApiGrupo}/${id}`, param).pipe(take(1))
  }

  deletarGrupo(id: string){
    return this.http.delete(`${this.pathApiGrupo}/${id}`).pipe(take(1))
  }
}
