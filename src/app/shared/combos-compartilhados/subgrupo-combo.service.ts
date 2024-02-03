import { Injectable } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { map, Observable } from 'rxjs';
import { SubgrupoApiService } from 'src/app/cadastros/componente/subgrupo/servico/responsavel-api.service';

@Injectable({
  providedIn: 'root'
})
export class SubgrupoComboService implements PoComboFilter{

  getFilteredData(param: any, filterParams?: any): Observable<PoComboOption[]> {
    const params = { name: param.value };
    return this.subgrupoApiService.buscarSubgrupos({pesquisar: params.name}).pipe(
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
