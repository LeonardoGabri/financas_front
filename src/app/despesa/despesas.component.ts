import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PoMenuComponent, PoMenuItem } from "@po-ui/ng-components";
import { menuDespesaArray } from "./servico/navegacao-despesas-data.service";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { navegacaAppDespesas } from "../service/navegacao-app.service";
import { menuAlterado } from "../shared/function/menu-alterado.service";

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html'
})
export class DespesaComponent implements OnInit, OnDestroy{
  readonly menus: PoMenuItem[] = menuDespesaArray

  private menu$ = new Subscription();

  @ViewChild('menuDespesa', {static: true})
  menuDespesa!: PoMenuComponent

  constructor(
      private titleService: Title,
      private router: Router,
      private changeDetectorRef: ChangeDetectorRef
    ){}

  ngOnDestroy(): void {
    this.menu$.unsubscribe()
  }

  ngOnInit(): void {
    this.titleService.setTitle(navegacaAppDespesas.label + ' - Finanças')

    this.selecionaLinkMenu()

    this.menu$ = menuAlterado.subscribe(() => {
      this.selecionaLinkMenu()
    })
  }

  selecionaLinkMenu(){
    let url = this.router.url;

    // url && menuDespesaArray.every((itemMenu) => {
    //   if(itemMenu.link && url.includes(itemMenu.link)){
    //     this.changeDetectorRef.detectChanges();

    //     this.menuDespesa.checkActiveMenuByUrl(itemMenu.link)

    //     return false
    //   }

    //   return true
    // })
  }
}
