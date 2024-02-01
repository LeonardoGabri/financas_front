import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatterReal'
})
export class FormatterRealPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null || isNaN(value)) {
      return '';
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

    return formattedValue;
  }
}
