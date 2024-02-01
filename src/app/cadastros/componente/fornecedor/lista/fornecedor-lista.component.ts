import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { PoTableColumn, PoTableComponent, PoPageListComponent, PoPageAction, PoPageFilter, PoDisclaimerGroup, PoTableAction, PoNotificationService, PoDialogService, PoDisclaimer, PoDisclaimerGroupRemoveAction } from "@po-ui/ng-components";
import { acaoEditarRemover } from "src/app/shared/function/acoes-lista.service";
import { listaColunasFornecedor, FiltroFornecedorDisclaimerModel, FiltroFornecedorParametroModel, ItemFornecedorModel } from "../modelo/fornecedor.model";
import { FornecedorApiService } from "../servico/fornecedor-api.service";
import { navegacaoCadastroFornecedorLista, navegacaoCadastroFornecedorNovo, navegacaoCadastroFornecedorEditar } from "../servico/navegacao-cadastro-fornecedor.service";

@Component({
  selector: 'app-fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html'
})
export class FornecedorListaComponent implements OnInit{
  public nomePagina = navegacaoCadastroFornecedorLista.label;
  public colunasTabelaFornecedor: PoTableColumn[] = listaColunasFornecedor;

  public filtroFornecedor!: FiltroFornecedorDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaFornecedor = false;
  public carregandoDadosFornecedor = false;
  public desabilitarCarregarMais = false;

  @Input() listaFornecedors!: any[];

  @ViewChild('tabelaListaFornecedor', { static: true })
  tabelaListaFornecedor!: PoTableComponent;

  @ViewChild('paginaListaFornecedor', { static: true })
  paginaListaFornecedor!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Novo ${this.nomePagina}`,
      action: this.novaFornecedor.bind(this),
      icon: 'po-icon-plus',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly fornecedorListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly fornecedorListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public fornecedorListaAcoes: Array<PoTableAction> = acaoEditarRemover(
    this.editarFornecedor.bind(this),
    this.removerFornecedorDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private fornecedorApiService: FornecedorApiService,
    private poDialog: PoDialogService
  ) {}

  ngOnInit() {
    this.buscarNovosDados(this.filtroFornecedor);
  }

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);
  }

  novaFornecedor() {
    this.router.navigate([navegacaoCadastroFornecedorNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaFornecedor = true;

    this.filtroLista = filtro;

    this.limparItensFornecedors();

    this.popularDisclaimers(this.filtroFornecedor, this.filtroLista);

    this.buscarNovosDados(this.filtroFornecedor);

    this.carregandoTabelaFornecedor = false;
  }

  buscarNovosDados(filtros: FiltroFornecedorDisclaimerModel) {
    this.limparItensFornecedors();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroFornecedorDisclaimerModel) {
    this.filtroFornecedor = filtros;

    this.popularDisclaimers(this.filtroFornecedor, this.filtroLista);

    const param = this.criarParametroFornecedor(
      this.filtroFornecedor,
      this.filtroLista
    );

    this.carregandoTabelaFornecedor = true;

    this.fornecedorApiService
      .buscarFornecedors(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaFornecedor.sortColumn({});

          this.listaFornecedors = this.listaFornecedors
            ? [...this.listaFornecedors, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensFornecedors();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaFornecedor = false;
        },
      });
  }

  popularDisclaimers(
    filtroFornecedorAvancado: FiltroFornecedorDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroFornecedorAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroFornecedorAvancado(filtroFornecedorAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.fornecedorListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.fornecedorListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroFornecedorAvancado(
    filtroAtorAvancado: FiltroFornecedorDisclaimerModel
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

  criarParametroFornecedor(
    filtro?: FiltroFornecedorDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      nome: filtro?.nome?.value,
      pesquisar: filtroLista,
    } as FiltroFornecedorParametroModel;
  }

  limparItensFornecedors() {
    this.paginacao.page = 0;
    this.listaFornecedors = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaFornecedor.clearInputSearch();
        this.buscar('');
        break;
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaFornecedor.clearInputSearch();
    this.buscar('');
  }

  editarFornecedor(itemListaFornecedor: ItemFornecedorModel){
    this.router.navigate([
        navegacaoCadastroFornecedorEditar(itemListaFornecedor.id).link,
    ]);
  }

  removerFornecedorDialog(itemListaFornecedor: ItemFornecedorModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a fornecedor?
      <br>
      <br> <b>Código</b>: ${itemListaFornecedor.nome || ''}`,
      confirm: () => this.removerFornecedor(itemListaFornecedor),
    });
  }

  removerFornecedor(itemListaFornecedor: ItemFornecedorModel){
    this.carregandoTabelaFornecedor = true;
    this.fornecedorApiService.deletarFornecedor(itemListaFornecedor.id).subscribe({
      next: () => {
        this.buscarNovosDados(this.filtroFornecedor);
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },

      complete: () => {
        this.carregandoTabelaFornecedor = false;
      },
    });
  }

  mostrarMaisFornecedors() {
    this.tabelaListaFornecedor.sortColumn({});
    this.carregandoDadosFornecedor = true;
    this.paginacao.page++;

    this.buscarMaisDados(this.filtroFornecedor);

    this.carregandoDadosFornecedor = false;
  }

}
