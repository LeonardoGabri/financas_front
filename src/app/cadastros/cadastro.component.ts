import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { PoMenuComponent, PoMenuItem } from "@po-ui/ng-components";
import { menuCadastroArray } from "./servico/navegacao-cadastro-data.service";
import { Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { navegacaAppCadastros } from "../service/navegacao-app.service";
import { menuAlterado } from "../shared/function/menu-alterado.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, OnDestroy{
  readonly menus: PoMenuItem[] = menuCadastroArray

  private menu$ = new Subscription();

  @ViewChild('menuCadastro', {static: true})
  menuCadastro!: PoMenuComponent

  constructor(
      private titleService: Title,
      private router: Router,
      private changeDetectorRef: ChangeDetectorRef
    ){}

  ngOnDestroy(): void {
    this.menu$.unsubscribe()
  }

  ngOnInit(): void {
    this.titleService.setTitle(navegacaAppCadastros.label + ' - Finanças')

    this.selecionaLinkMenu()

    this.menu$ = menuAlterado.subscribe(() => {
      this.selecionaLinkMenu()
    })
  }

  selecionaLinkMenu(){
    let url = this.router.url;

    url && menuCadastroArray.every((itemMenu) => {
      if(itemMenu.link && url.includes(itemMenu.link)){
        this.changeDetectorRef.detectChanges();

        //this.menuCadastro.checkActiveMenuByUrl(itemMenu.link)

        return false
      }

      return true
    })
  }
}
