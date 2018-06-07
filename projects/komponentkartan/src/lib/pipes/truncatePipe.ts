import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string, maxLength?: number): string {
        const trail = '...';

        if (!value) {
            return '';
        }

        if (!maxLength) {
            return value;
        }

        let limit = maxLength;
        if (!limit) {
            return value;
        }

        if (value.length <= limit) {
            return value;
        }

        limit = limit - trail.length;

        return value.substring(0, limit) + trail;
    }
}
