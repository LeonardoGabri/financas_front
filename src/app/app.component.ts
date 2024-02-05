import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { filter } from 'rxjs/operators';
import { menuArrayFinancas } from './service/navegacao-app.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  readonly menus: PoMenuItem[] = menuArrayFinancas

  @ViewChild('menuInicial', {static: true})
  readonly menuInicial!: PoMenuItem[]

  hiddenMenu = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
    ).subscribe((event:any) => {
      if(!event.url.includes("/login")){
        this.hiddenMenu = false;
      }else{
        this.hiddenMenu = true;
      }
      if (event instanceof NavigationStart) {
      } else if (event instanceof NavigationEnd) {
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
