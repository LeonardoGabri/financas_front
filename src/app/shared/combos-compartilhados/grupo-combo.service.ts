import { Injectable } from "@angular/core";
import { PoComboFilter, PoComboOption } from "@po-ui/ng-components";
import { Observable, map } from "rxjs";
import { BancoApiService } from "src/app/cadastros/componente/banco/servico/banco-api.service";
import { GrupoApiService } from "src/app/cadastros/componente/grupo/servico/responsavel-api.service";

@Injectable({
  providedIn: 'root'
})
export class GrupoComboService implements PoComboFilter{

  getFilteredData(param: any, filterParams?: any): Observable<PoComboOption[]> {
    const params = { name: param.value };
    return this.grupoApiService.buscarGrupos().pipe(
      map((response: any) => {
        if (response) {
          return response.content.map((grupo: any) => {
            return {
              label: grupo.nome,
              value: grupo.id,
            } as PoComboOption;
          });
        }
        return [];
      })
    );
  }

  getObjectByValue(value: string): Observable<PoComboOption> {
    return this.grupoApiService.buscarGrupoPorId(value).pipe(
      map((response: any) => {
        const grupo = response || null;
        return  {
          label: grupo.nome,
          value: grupo.id || undefined,
        } as any;
      })
    );
  }

  constructor(
    private grupoApiService: GrupoApiService
  ) { }
}
