import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {Product} from "../../models/product";
import {FilterProductsPipe} from "../../pipes/filter-products.pipe";
import {resetCumulativeDurations} from "@angular-devkit/build-angular/src/tools/esbuild/profiling";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  constructor(private dataService: DataService) {
  }

  private inputChangedSubject = new Subject<string>();
  products$: Observable<Product[] | any> | null = null;
  searchField: string = "";

  ngOnInit(): void {
    this.products$ = this.dataService.getProducts();


    // Subscribe to the debounced input changes and call the service method
    this.inputChangedSubject.pipe(
      debounceTime(800), // Adjust the debounce time (in milliseconds) as needed
      distinctUntilChanged(),
      switchMap((searchValue: string) =>
        this.dataService.searchProductsByName(searchValue)
      )
    ).subscribe((result: any) => {
      // Handle the API response here
      this.products$ = of(result);
    });
  }

  handleSearch(event: Event): void {
    if (!this.products$) return;
    this.inputChangedSubject.next(this.searchField);
  }
}
