import {Component, OnInit} from '@angular/core';
import {Product} from "./models/product";
import {DataService} from "./services/data.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
  }
}
