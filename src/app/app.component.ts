import { Component,OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loading$: Observable<string> = this.loadingService.subject.asObservable();
  strMsg:string="";

  constructor(private loadingService: LoadingService) { }

  title = 'material.angular.github';

  ngOnInit(): void {
    this.loading$.subscribe(
      (value: string) => { this.strMsg=value; }
    );
  }
}
