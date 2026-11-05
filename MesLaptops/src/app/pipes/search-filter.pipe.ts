import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    if (!list) return [];
    if (!filterText) return list;
    const term = filterText.toLowerCase().trim();
    return list.filter(item =>
      (item.brandLaptop && item.brandLaptop.toLowerCase().includes(term)) ||
      (item.caracteristiquesLaptop && item.caracteristiquesLaptop.toLowerCase().includes(term)) ||
      (item.model?.nomModel && item.model.nomModel.toLowerCase().includes(term))
    );
  }
}
