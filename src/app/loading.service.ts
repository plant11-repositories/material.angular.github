import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  subject = new Subject<string>();

  constructor() { }

  setLoading(strMessage: string): void {
    this.subject.next(strMessage);
  }
}
