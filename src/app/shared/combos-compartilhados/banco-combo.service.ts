import { Injectable } from "@angular/core";
import { PoComboFilter, PoComboOption } from "@po-ui/ng-components";
import { Observable, map } from "rxjs";
import { BancoApiService } from "src/app/cadastros/componente/banco/servico/banco-api.service";
import { GrupoApiService } from "src/app/cadastros/componente/grupo/servico/responsavel-api.service";

@Injectable({
  providedIn: 'root'
})
export class BancoComboService implements PoComboFilter{

  getFilteredData(param: any, filterParams?: any): Observable<PoComboOption[]> {
    const params = { name: param.value };
    return this.bancoApiService.buscarBancos({pesquisar: params.name}).pipe(
      map((response: any) => {
        if (response) {
          return response.content.map((banco: any) => {
            return {
              label: `${banco.nome} - ${banco.responsavelNome}`,
              value: banco.id,
            } as PoComboOption;
          });
        }
        return [];
      })
    );
  }

  getObjectByValue(value: string): Observable<PoComboOption> {
    return this.bancoApiService.buscarBancoPorId(value).pipe(
      map((response: any) => {
        const banco = response || null;
        return  {
          label: `${banco.nome} - ${banco.responsavelNome}`,
          value: banco.id || undefined,
        } as any;
      })
    );
  }

  constructor(
    private bancoApiService: BancoApiService
  ) { }
}
