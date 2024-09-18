import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'ShortenString'
})
export class ShortenStringPipe implements PipeTransform {
  transform(value: string, maxLength?: any): any {
    if (value.length <= maxLength) {
      return value;
    }
    return value.substring(0, maxLength) + '...';
  }
}
