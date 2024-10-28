import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorStorageService {
  private errorsSubject = new BehaviorSubject<string[]>([]);
  errors$ = this.errorsSubject.asObservable();

  addError(error: string) {
    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, error]);
  }

  clearErrors() {
    this.errorsSubject.next([]);
  }
}
