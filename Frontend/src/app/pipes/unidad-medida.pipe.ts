import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidadMedida',
  standalone: false
})
export class UnidadMedidaPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'kilos':
        return 'Kg';
      case 'gramos':
        return 'Gr';
      case 'litros':
        return 'Lt';
      default:
        return value;
    }
  }
}
