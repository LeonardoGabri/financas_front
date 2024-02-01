import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoComboFilter, PoComboOption } from '@po-ui/ng-components';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCompraEnumComboService implements PoComboFilter{

  protected readonly pathApi = `${environment.url.service}`

  listarTipoCompraEnum(){
    return this.http.get(`${this.pathApi}/enum/tipo-compra`).pipe(take(1))
  }

  getFilteredData(param: any, filterParams?: any): Observable<PoComboOption[]> {
    const params = { name: param.value };
    return this.listarTipoCompraEnum().pipe(
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
    return this.listarTipoCompraEnum().pipe(
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
    private http: HttpClient
  ) { }
}
