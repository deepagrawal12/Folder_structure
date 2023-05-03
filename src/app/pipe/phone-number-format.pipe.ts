import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
// Pipe phoneNumberFormat to format Phone number as '0000 0000 0000 0'
export class PhoneNumberFormatPipe implements PipeTransform {
  transform(value: string): string {
    value = '0' + value.substring(4);
    let phoneNum = '';
    phoneNum = [value.slice(0, 4), ' ', value.slice(4, 6), ' ', value.slice(6, 8), ' ', value.slice(8, 10)].join('');
    return phoneNum;
  }
}
