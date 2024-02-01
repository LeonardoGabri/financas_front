import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PoTableColumn, PoTableComponent, PoPageListComponent, PoPageAction, PoPageFilter, PoDisclaimerGroup, PoTableAction, PoNotificationService, PoDialogService, PoDisclaimer, PoDisclaimerGroupRemoveAction } from "@po-ui/ng-components";
import { FiltroBancoDisclaimerModel, FiltroBancoParametroModel, ItemBancoModel, listaColunasBanco } from "../modelo/banco.model";
import { BancoApiService } from "../servico/banco-api.service";
import { navegacaoCadastroBancoLista, navegacaoCadastroBancoNovo, navegacaoCadastroBancoEditar } from "../servico/navegacao-cadastro-banco.service";
import { acaoEditarRemover } from "src/app/shared/function/acoes-lista.service";

@Component({
  selector: 'app-banco-lista',
  templateUrl: './banco-lista.component.html'
})
export class BancoListaComponent implements OnInit{
  public nomePagina = navegacaoCadastroBancoLista.label;
  public colunasTabelaBanco: PoTableColumn[] = listaColunasBanco;

  public filtroBanco!: FiltroBancoDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaBanco = false;
  public carregandoDadosBanco = false;
  public desabilitarCarregarMais = false;

  @Input() listaBancos!: any[];

  @ViewChild('tabelaListaBanco', { static: true })
  tabelaListaBanco!: PoTableComponent;

  @ViewChild('paginaListaBanco', { static: true })
  paginaListaBanco!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Novo ${this.nomePagina}`,
      action: this.novaBanco.bind(this),
      icon: 'po-icon-plus',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly bancoListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly bancoListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public bancoListaAcoes: Array<PoTableAction> = acaoEditarRemover(
    this.editarBanco.bind(this),
    this.removerBancoDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private bancoApiService: BancoApiService,
    private poDialog: PoDialogService
  ) {}

  ngOnInit() {
    this.buscarNovosDados(this.filtroBanco);
  }

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);
  }

  novaBanco() {
    this.router.navigate([navegacaoCadastroBancoNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaBanco = true;

    this.filtroLista = filtro;

    this.limparItensBancos();

    this.popularDisclaimers(this.filtroBanco, this.filtroLista);

    this.buscarNovosDados(this.filtroBanco);

    this.carregandoTabelaBanco = false;
  }

  buscarNovosDados(filtros: FiltroBancoDisclaimerModel) {
    this.limparItensBancos();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroBancoDisclaimerModel) {
    this.filtroBanco = filtros;

    this.popularDisclaimers(this.filtroBanco, this.filtroLista);

    const param = this.criarParametroBanco(
      this.filtroBanco,
      this.filtroLista
    );

    this.carregandoTabelaBanco = true;

    this.bancoApiService
      .buscarBancos(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaBanco.sortColumn({});

          this.listaBancos = this.listaBancos
            ? [...this.listaBancos, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensBancos();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaBanco = false;
        },
      });
  }

  popularDisclaimers(
    filtroBancoAvancado: FiltroBancoDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroBancoAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroBancoAvancado(filtroBancoAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.bancoListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.bancoListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroBancoAvancado(
    filtroAtorAvancado: FiltroBancoDisclaimerModel
  ) {
    return Object.entries(filtroAtorAvancado)
      .filter((item: any) => {
        return Array.isArray(item[1]?.value)
          ? !!item[1].value.length
          : item[1]?.value;
      })
      .map((item: any) => {
        return {
          label: item[1].fLabel(item[1]),
          value: item,
          property: item[1].property,
          hideClose: item[1].hideClose,
        } as PoDisclaimer;
      });
  }

  criarParametroBanco(
    filtro?: FiltroBancoDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      nome: filtro?.nome?.value,
      pesquisar: filtroLista,
    } as FiltroBancoParametroModel;
  }

  limparItensBancos() {
    this.paginacao.page = 0;
    this.listaBancos = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaBanco.clearInputSearch();
        this.buscar('');
        break;
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaBanco.clearInputSearch();
    this.buscar('');
  }

  editarBanco(itemListaBanco: ItemBancoModel){
    this.router.navigate([
        navegacaoCadastroBancoEditar(itemListaBanco.id).link,
    ]);
  }

  removerBancoDialog(itemListaBanco: ItemBancoModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a banco?
      <br>
      <br> <b>Código</b>: ${itemListaBanco.nome || ''}`,
      confirm: () => this.removerBanco(itemListaBanco),
    });
  }

  removerBanco(itemListaBanco: ItemBancoModel){
    this.carregandoTabelaBanco = true;
    this.bancoApiService.deletarBanco(itemListaBanco.id).subscribe({
      next: () => {
        this.buscarNovosDados(this.filtroBanco);
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },

      complete: () => {
        this.carregandoTabelaBanco = false;
      },
    });
  }

  mostrarMaisBancos() {
    this.tabelaListaBanco.sortColumn({});
    this.carregandoDadosBanco = true;
    this.paginacao.page++;

    //this.buscarMaisDados(this.filtroProduto);

    this.carregandoDadosBanco = false;
  }

}
