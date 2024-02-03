import { Component, OnInit } from '@angular/core';
import { PoNavbarIconAction, PoNavbarItem } from '@po-ui/ng-components';
import { menuArrayFinancas } from './service/navegacao-app.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  readonly iconNav: PoNavbarIconAction[] = [];
  readonly menus: PoNavbarItem[] = menuArrayFinancas;

  hiddenMenu = true;

  constructor(private router: Router) {
    this.iconNav = [{
      label: '',
      icon: 'po-icon-exit',
      action: this.logout.bind(this)
    }];
  }

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
