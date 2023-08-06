import { Component } from '@angular/core';
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent {
  constructor( public errorService: ErrorHandlerService) {
  }
}
