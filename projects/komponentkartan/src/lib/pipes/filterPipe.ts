import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'filterByProperties'
})

export class FilterPipe implements PipeTransform {
    transform(valueList: any[], filter: string, properties?: string[]): any[] {
        if (!filter) {
            return valueList;
        }
        const filteredItems: any[] = [];
        filter = filter.toLowerCase();
        for (let i = 0; i < valueList.length; i++) {
            const item = valueList[i];

            for (const property in item) {
                if (item.hasOwnProperty(property)) {
                    if (!properties || properties.length === 0 || properties.some(x => x === property)) {
                        const propertyValue = item[property];
                        if (propertyValue !== undefined && typeof (propertyValue) === 'string' &&
                            (propertyValue as string).toLowerCase().indexOf(filter) >= 0) {
                            filteredItems.push(item);
                            break;
                        }
                    }
                }
            }
        }

        return filteredItems;
    }
}
