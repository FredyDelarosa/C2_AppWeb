// error-view.component.ts
import { Component, OnInit } from '@angular/core';
import { ErrorStorageService } from '../../error-storage.service';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss']
})
export class ErrorViewComponent implements OnInit {
  errors: string[] = [];

  constructor(private errorStorageService: ErrorStorageService) {}

  ngOnInit() {
    this.errorStorageService.errors$.subscribe(errors => this.errors = errors);
  }

  clearErrors() {
    this.errorStorageService.clearErrors();
  }
}
