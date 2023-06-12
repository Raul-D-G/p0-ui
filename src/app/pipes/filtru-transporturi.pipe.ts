import { Transport } from './../models/transport';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtruTransporturi',
})
export class FiltruTransporturiPipe implements PipeTransform {
  transform(value: any[], search?: string, propertyName?: string): any[] {
    if (value.length === 0 || search === undefined) {
      return value;
    } else {
      let resultArray = value.filter((obj) =>
        obj[propertyName].toLowerCase().startsWith(search.toLocaleLowerCase())
      );
      return resultArray;
    }
  }
}
