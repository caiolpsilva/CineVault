import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncar',
  standalone: true
})
export class PipeTruncar implements PipeTransform {
  transform(valor: string, limite: number = 100): string {
    if (!valor) return '';
    return valor.length > limite ? valor.substring(0, limite) + '...' : valor;
  }
}
