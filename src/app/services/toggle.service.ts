import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToggleService {
  private on: boolean;
  private subject = new Subject<boolean>();

  constructor() {}

  toggle(): void {
    this.on = !this.on;
    this.subject.next(this.on);
  }

  onToggle(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
