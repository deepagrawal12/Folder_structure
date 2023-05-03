import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simNumberFormat'
})
// Pipe simNumberFormat to format SIM number as '0000 00 00 00'
export class SimNumberFormatPipe implements PipeTransform {
    transform(value: any): any {
    let simNum: string = '';
    simNum = [value.slice(0, 4), ' ', value.slice(4, 8), ' ', value.slice(8, 12), ' ', value.slice(12, 13)].join('');
    return simNum;
  }
}
