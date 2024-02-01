import { Injectable } from "@angular/core";
import { PoComboFilter, PoComboOption } from "@po-ui/ng-components";
import { Observable, map } from "rxjs";
import { BancoApiService } from "src/app/cadastros/componente/banco/servico/banco-api.service";
import { FornecedorApiService } from "src/app/cadastros/componente/fornecedor/servico/fornecedor-api.service";
import { GrupoApiService } from "src/app/cadastros/componente/grupo/servico/responsavel-api.service";
import { SubgrupoApiService } from "src/app/cadastros/componente/subgrupo/servico/responsavel-api.service";

@Injectable({
  providedIn: 'root'
})
export class SubgrupoComboService implements PoComboFilter{

  getFilteredData(param: any, filterParams?: any): Observable<PoComboOption[]> {
    const params = { name: param.value };
    return this.subgrupoApiService.buscarSubgrupos().pipe(
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
    return this.subgrupoApiService.buscarSubgrupoPorId(value).pipe(
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
    private subgrupoApiService: SubgrupoApiService
  ) { }
}
