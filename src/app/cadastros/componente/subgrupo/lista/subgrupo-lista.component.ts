import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PoTableColumn, PoTableComponent, PoPageListComponent, PoPageAction, PoPageFilter, PoDisclaimerGroup, PoTableAction, PoNotificationService, PoDialogService, PoDisclaimer, PoDisclaimerGroupRemoveAction } from "@po-ui/ng-components";
import { acaoEditarRemover } from "src/app/shared/function/acoes-lista.service";
import { listaColunasSubgrupo, FiltroSubgrupoDisclaimerModel, FiltroSubgrupoParametroModel, ItemSubgrupoModel } from "../modelo/subgrupo.model";
import { navegacaoCadastroSubgrupoLista, navegacaoCadastroSubgrupoNovo, navegacaoCadastroSubgrupoEditar } from "../servico/navegacao-cadastro-responsavel.service";
import { SubgrupoApiService } from "../servico/responsavel-api.service";


@Component({
  selector: 'app-subgrupo-lista',
  templateUrl: './subgrupo-lista.component.html'
})
export class SubgrupoListaComponent implements OnInit{
  public nomePagina = navegacaoCadastroSubgrupoLista.label;
  public colunasTabelaSubgrupo: PoTableColumn[] = listaColunasSubgrupo;

  public filtroSubgrupo!: FiltroSubgrupoDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaSubgrupo = false;
  public carregandoDadosSubgrupo = false;
  public desabilitarCarregarMais = false;

  @Input() listaSubgrupos!: any[];

  @ViewChild('tabelaListaSubgrupo', { static: true })
  tabelaListaSubgrupo!: PoTableComponent;

  @ViewChild('paginaListaSubgrupo', { static: true })
  paginaListaSubgrupo!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Novo ${this.nomePagina}`,
      action: this.novaSubgrupo.bind(this),
      icon: 'po-icon-plus',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly subgrupoListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly subgrupoListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public subgrupoListaAcoes: Array<PoTableAction> = acaoEditarRemover(
    this.editarSubgrupo.bind(this),
    this.removerSubgrupoDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private subgrupoApiService: SubgrupoApiService,
    private poDialog: PoDialogService
  ) {}

  ngOnInit() {
    this.buscarNovosDados(this.filtroSubgrupo);
  }

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);
  }

  novaSubgrupo() {
    this.router.navigate([navegacaoCadastroSubgrupoNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaSubgrupo = true;

    this.filtroLista = filtro;

    this.limparItensSubgrupos();

    this.popularDisclaimers(this.filtroSubgrupo, this.filtroLista);

    this.buscarNovosDados(this.filtroSubgrupo);

    this.carregandoTabelaSubgrupo = false;
  }

  buscarNovosDados(filtros: FiltroSubgrupoDisclaimerModel) {
    this.limparItensSubgrupos();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroSubgrupoDisclaimerModel) {
    this.filtroSubgrupo = filtros;

    this.popularDisclaimers(this.filtroSubgrupo, this.filtroLista);

    const param = this.criarParametroSubgrupo(
      this.filtroSubgrupo,
      this.filtroLista
    );

    this.carregandoTabelaSubgrupo = true;

    this.subgrupoApiService
      .buscarSubgrupos(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaSubgrupo.sortColumn({});

          this.listaSubgrupos = this.listaSubgrupos
            ? [...this.listaSubgrupos, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensSubgrupos();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaSubgrupo = false;
        },
      });
  }

  popularDisclaimers(
    filtroSubgrupoAvancado: FiltroSubgrupoDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroSubgrupoAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroSubgrupoAvancado(filtroSubgrupoAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.subgrupoListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.subgrupoListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroSubgrupoAvancado(
    filtroAtorAvancado: FiltroSubgrupoDisclaimerModel
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

  criarParametroSubgrupo(
    filtro?: FiltroSubgrupoDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      nome: filtro?.nome?.value,
      pesquisar: filtroLista,
    } as FiltroSubgrupoParametroModel;
  }

  limparItensSubgrupos() {
    this.paginacao.page = 0;
    this.listaSubgrupos = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaSubgrupo.clearInputSearch();
        this.buscar('');
        break;
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaSubgrupo.clearInputSearch();
    this.buscar('');
  }

  editarSubgrupo(itemListaSubgrupo: ItemSubgrupoModel){
    this.router.navigate([
        navegacaoCadastroSubgrupoEditar(itemListaSubgrupo.id).link,
    ]);
  }

  removerSubgrupoDialog(itemListaSubgrupo: ItemSubgrupoModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a subgrupo?
      <br>
      <br> <b>Código</b>: ${itemListaSubgrupo.nome || ''}`,
      confirm: () => this.removerSubgrupo(itemListaSubgrupo),
    });
  }

  removerSubgrupo(itemListaSubgrupo: ItemSubgrupoModel){
    this.carregandoTabelaSubgrupo = true;
    this.subgrupoApiService.deletarSubgrupo(itemListaSubgrupo.id).subscribe({
      next: () => {
        this.buscarNovosDados(this.filtroSubgrupo);
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },

      complete: () => {
        this.carregandoTabelaSubgrupo = false;
      },
    });
  }

  mostrarMaisSubgrupos() {
    this.tabelaListaSubgrupo.sortColumn({});
    this.carregandoDadosSubgrupo = true;
    this.paginacao.page++;

    this.buscarMaisDados(this.filtroSubgrupo);

    this.carregandoDadosSubgrupo = false;
  }

}
