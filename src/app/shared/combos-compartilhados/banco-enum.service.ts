import { Injectable } from "@angular/core";
import { PoComboFilter, PoComboOption } from "@po-ui/ng-components";
import { Observable, map } from "rxjs";
import { BancoApiService } from "src/app/cadastros/componente/banco/servico/banco-api.service";

@Injectable({
  providedIn: 'root'
})
export class BancoEnumComboService implements PoComboFilter{

  getFilteredData(param: any, filterParams?: any): Observable<PoComboOption[]> {
    const params = { name: param.value };
    return this.bancoApiService.listarBancosEnum().pipe(
      map((response: any) => {
        if (response) {
          return response.map((banco: any) => {
            return {
              label: banco.label,
              value: banco.label,
            } as PoComboOption;
          });
        }
        return [];
      })
    );
  }

  getObjectByValue(value: string): Observable<PoComboOption> {
    return this.bancoApiService.listarBancosEnum().pipe(
      map((response: any) => {
        let responseFilter = response.find((item: any) => {
          return item.value == value;
        })
        const banco = responseFilter || null;
        return  {
          label: banco.label,
          value: banco.value || undefined,
        } as any;
      })
    );
  }

  constructor(
    private bancoApiService: BancoApiService
  ) { }
}
