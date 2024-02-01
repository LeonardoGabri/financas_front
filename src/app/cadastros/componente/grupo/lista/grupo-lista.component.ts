import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PoTableColumn, PoTableComponent, PoPageListComponent, PoPageAction, PoPageFilter, PoDisclaimerGroup, PoTableAction, PoNotificationService, PoDialogService, PoDisclaimer, PoDisclaimerGroupRemoveAction } from "@po-ui/ng-components";
import { acaoEditarRemover } from "src/app/shared/function/acoes-lista.service";
import { listaColunasGrupo, FiltroGrupoDisclaimerModel, FiltroGrupoParametroModel, ItemGrupoModel } from "../modelo/grupo.model";
import { navegacaoCadastroGrupoLista, navegacaoCadastroGrupoNovo, navegacaoCadastroGrupoEditar } from "../servico/navegacao-cadastro-responsavel.service";
import { GrupoApiService } from "../servico/responsavel-api.service";

@Component({
  selector: 'app-grupo-lista',
  templateUrl: './grupo-lista.component.html'
})
export class GrupoListaComponent implements OnInit{
  public nomePagina = navegacaoCadastroGrupoLista.label;
  public colunasTabelaGrupo: PoTableColumn[] = listaColunasGrupo;

  public filtroGrupo!: FiltroGrupoDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaGrupo = false;
  public carregandoDadosGrupo = false;
  public desabilitarCarregarMais = false;

  @Input() listaGrupos!: any[];

  @ViewChild('tabelaListaGrupo', { static: true })
  tabelaListaGrupo!: PoTableComponent;

  @ViewChild('paginaListaGrupo', { static: true })
  paginaListaGrupo!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Novo ${this.nomePagina}`,
      action: this.novaGrupo.bind(this),
      icon: 'po-icon-plus',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly grupoListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly grupoListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public grupoListaAcoes: Array<PoTableAction> = acaoEditarRemover(
    this.editarGrupo.bind(this),
    this.removerGrupoDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private grupoApiService: GrupoApiService,
    private poDialog: PoDialogService
  ) {}

  ngOnInit() {
    this.buscarNovosDados(this.filtroGrupo);
  }

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);
  }

  novaGrupo() {
    this.router.navigate([navegacaoCadastroGrupoNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaGrupo = true;

    this.filtroLista = filtro;

    this.limparItensGrupos();

    this.popularDisclaimers(this.filtroGrupo, this.filtroLista);

    this.buscarNovosDados(this.filtroGrupo);

    this.carregandoTabelaGrupo = false;
  }

  buscarNovosDados(filtros: FiltroGrupoDisclaimerModel) {
    this.limparItensGrupos();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroGrupoDisclaimerModel) {
    this.filtroGrupo = filtros;

    this.popularDisclaimers(this.filtroGrupo, this.filtroLista);

    const param = this.criarParametroGrupo(
      this.filtroGrupo,
      this.filtroLista
    );

    this.carregandoTabelaGrupo = true;

    this.grupoApiService
      .buscarGrupos(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaGrupo.sortColumn({});

          this.listaGrupos = this.listaGrupos
            ? [...this.listaGrupos, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensGrupos();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaGrupo = false;
        },
      });
  }

  popularDisclaimers(
    filtroGrupoAvancado: FiltroGrupoDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroGrupoAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroGrupoAvancado(filtroGrupoAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.grupoListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.grupoListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroGrupoAvancado(
    filtroAtorAvancado: FiltroGrupoDisclaimerModel
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

  criarParametroGrupo(
    filtro?: FiltroGrupoDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      nome: filtro?.nome?.value,
      pesquisar: filtroLista,
    } as FiltroGrupoParametroModel;
  }

  limparItensGrupos() {
    this.paginacao.page = 0;
    this.listaGrupos = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaGrupo.clearInputSearch();
        this.buscar('');
        break;
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaGrupo.clearInputSearch();
    this.buscar('');
  }

  editarGrupo(itemListaGrupo: ItemGrupoModel){
    this.router.navigate([
        navegacaoCadastroGrupoEditar(itemListaGrupo.id).link,
    ]);
  }

  removerGrupoDialog(itemListaGrupo: ItemGrupoModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a grupo?
      <br>
      <br> <b>Código</b>: ${itemListaGrupo.nome || ''}`,
      confirm: () => this.removerGrupo(itemListaGrupo),
    });
  }

  removerGrupo(itemListaGrupo: ItemGrupoModel){
    this.carregandoTabelaGrupo = true;
    this.grupoApiService.deletarGrupo(itemListaGrupo.id).subscribe({
      next: () => {
        this.buscarNovosDados(this.filtroGrupo);
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },

      complete: () => {
        this.carregandoTabelaGrupo = false;
      },
    });
  }

  mostrarMaisGrupos() {
    this.tabelaListaGrupo.sortColumn({});
    this.carregandoDadosGrupo = true;
    this.paginacao.page++;

    //this.buscarMaisDados(this.filtroProduto);

    this.carregandoDadosGrupo = false;
  }

}
