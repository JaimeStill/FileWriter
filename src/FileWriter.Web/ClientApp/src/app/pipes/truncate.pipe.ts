import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, ellipses = '...') {
    if (!value) { return ''; }
    return value.length <= limit ? value : `${value.substr(0, limit)}${ellipses}`;
  }
}
