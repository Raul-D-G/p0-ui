import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortTransporturi',
})
export class SortTransporturiPipe implements PipeTransform {
  transform(value: Array<number>, args: any[]): any {
    const sortField = args[0].toLowerCase();
    const sortDirection = args[1];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });
    return value;
  }
}
