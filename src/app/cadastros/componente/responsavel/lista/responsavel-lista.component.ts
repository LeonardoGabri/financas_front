import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PoTableColumn, PoTableComponent, PoPageListComponent, PoPageAction, PoPageFilter, PoDisclaimerGroup, PoTableAction, PoNotificationService, PoDialogService, PoDisclaimer, PoDisclaimerGroupRemoveAction } from "@po-ui/ng-components";
import { acaoEditarRemover } from "src/app/shared/function/acoes-lista.service";
import { listaColunasResponsavel, FiltroResponsavelDisclaimerModel, FiltroResponsavelParametroModel, ItemResponsavelModel } from "../modelo/responsavel.model";
import { ResponsavelApiService } from "../servico/responsavel-api.service";
import { navegacaoCadastroResponsavelLista, navegacaoCadastroResponsavelNovo, navegacaoCadastroResponsavelEditar } from "../servico/navegacao-cadastro-responsavel.service";

@Component({
  selector: 'app-responsavel-lista',
  templateUrl: './responsavel-lista.component.html'
})
export class ResponsavelListaComponent implements OnInit{
  public nomePagina = navegacaoCadastroResponsavelLista.label;
  public colunasTabelaResponsavel: PoTableColumn[] = listaColunasResponsavel;

  public filtroResponsavel!: FiltroResponsavelDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaResponsavel = false;
  public carregandoDadosResponsavel = false;
  public desabilitarCarregarMais = false;

  @Input() listaResponsavels!: any[];

  @ViewChild('tabelaListaResponsavel', { static: true })
  tabelaListaResponsavel!: PoTableComponent;

  @ViewChild('paginaListaResponsavel', { static: true })
  paginaListaResponsavel!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Novo ${this.nomePagina}`,
      action: this.novaResponsavel.bind(this),
      icon: 'po-icon-plus',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly responsavelListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly responsavelListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public responsavelListaAcoes: Array<PoTableAction> = acaoEditarRemover(
    this.editarResponsavel.bind(this),
    this.removerResponsavelDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private responsavelApiService: ResponsavelApiService,
    private poDialog: PoDialogService
  ) {}

  ngOnInit() {
    this.buscarNovosDados(this.filtroResponsavel);
  }

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);
  }

  novaResponsavel() {
    this.router.navigate([navegacaoCadastroResponsavelNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaResponsavel = true;

    this.filtroLista = filtro;

    this.limparItensResponsavels();

    this.popularDisclaimers(this.filtroResponsavel, this.filtroLista);

    this.buscarNovosDados(this.filtroResponsavel);

    this.carregandoTabelaResponsavel = false;
  }

  buscarNovosDados(filtros: FiltroResponsavelDisclaimerModel) {
    this.limparItensResponsavels();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroResponsavelDisclaimerModel) {
    this.filtroResponsavel = filtros;

    this.popularDisclaimers(this.filtroResponsavel, this.filtroLista);

    const param = this.criarParametroResponsavel(
      this.filtroResponsavel,
      this.filtroLista
    );

    this.carregandoTabelaResponsavel = true;

    this.responsavelApiService
      .buscarResponsavels(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaResponsavel.sortColumn({});

          this.listaResponsavels = this.listaResponsavels
            ? [...this.listaResponsavels, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensResponsavels();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaResponsavel = false;
        },
      });
  }

  popularDisclaimers(
    filtroResponsavelAvancado: FiltroResponsavelDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroResponsavelAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroResponsavelAvancado(filtroResponsavelAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.responsavelListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.responsavelListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroResponsavelAvancado(
    filtroAtorAvancado: FiltroResponsavelDisclaimerModel
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

  criarParametroResponsavel(
    filtro?: FiltroResponsavelDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      nome: filtro?.nome?.value,
      pesquisar: filtroLista,
    } as FiltroResponsavelParametroModel;
  }

  limparItensResponsavels() {
    this.paginacao.page = 0;
    this.listaResponsavels = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaResponsavel.clearInputSearch();
        this.buscar('');
        break;
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaResponsavel.clearInputSearch();
    this.buscar('');
  }

  editarResponsavel(itemListaResponsavel: ItemResponsavelModel){
    this.router.navigate([
        navegacaoCadastroResponsavelEditar(itemListaResponsavel.id).link,
    ]);
  }

  removerResponsavelDialog(itemListaResponsavel: ItemResponsavelModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a responsavel?
      <br>
      <br> <b>Código</b>: ${itemListaResponsavel.nome || ''}`,
      confirm: () => this.removerResponsavel(itemListaResponsavel),
    });
  }

  removerResponsavel(itemListaResponsavel: ItemResponsavelModel){
    this.carregandoTabelaResponsavel = true;
    this.responsavelApiService.deletarResponsavel(itemListaResponsavel.id).subscribe({
      next: () => {
        this.buscarNovosDados(this.filtroResponsavel);
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },

      complete: () => {
        this.carregandoTabelaResponsavel = false;
      },
    });
  }

  mostrarMaisResponsavels() {
    this.tabelaListaResponsavel.sortColumn({});
    this.carregandoDadosResponsavel = true;
    this.paginacao.page++;

    //this.buscarMaisDados(this.filtroProduto);

    this.carregandoDadosResponsavel = false;
  }

}
