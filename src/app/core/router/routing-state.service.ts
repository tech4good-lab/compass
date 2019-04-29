import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingStateService {

  private prevUrl: string;
  private currUrl: string;

  constructor(
    private router: Router
  ) { }

  public loadRouting(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(({urlAfterRedirects}: NavigationEnd) => {
      this.prevUrl = this.currUrl || '/';
      this.currUrl = urlAfterRedirects;
    });
  }

  public getPrevUrl(): string {
    return this.prevUrl || '/';
  }
}