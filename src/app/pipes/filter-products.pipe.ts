import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../models/product";
import {filter, Subject} from "rxjs";

@Pipe({
  name: 'filterProducts',
  pure: false
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Product[] | undefined, keyword: string): undefined | Product[] {
    return products ? products.filter(p => p?.title?.toLowerCase()?.trim()?.includes(keyword?.toLowerCase()?.trim())) : products;
  }

}
