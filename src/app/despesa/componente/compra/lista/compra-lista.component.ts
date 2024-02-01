import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  PoDialogService,
  PoDisclaimer,
  PoDisclaimerGroup,
  PoDisclaimerGroupRemoveAction,
  PoNotificationService,
  PoPageAction,
  PoPageFilter,
  PoPageListComponent,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
} from '@po-ui/ng-components';
import { acaoVisualizarEditarRemover } from 'src/app/shared/function/acoes-lista.service';

import {
  FiltroCompraDisclaimerModel,
  FiltroCompraParametroModel,
  ItemCompraModel,
  listaColunasCompra,
} from '../modelo/compra.model';
import { CompraApiService } from '../servico/compra-api.service';
import {
  navegacaoDespesaCompraEditar,
  navegacaoDespesaCompraLista,
  navegacaoDespesaCompraNovo,
  navegacaoDespesaCompraVisualizar,
} from '../servico/navegacao-despesas-compra.service';
import { FiltroCompraComponent } from './filtro/filtro-compra.component';

@Component({
  selector: 'app-compra-lista',
  templateUrl: './compra-lista.component.html'
})
export class CompraListaComponent implements AfterViewInit{
  public nomePagina = navegacaoDespesaCompraLista.label;
  public colunasTabelaCompra: PoTableColumn[] = listaColunasCompra;

  public filtroCompra!: FiltroCompraDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaCompra = false;
  public carregandoDadosCompra = false;
  public desabilitarCarregarMais = false;

  @Input() listaCompras!: any[];

  @ViewChild('filtrosCompra', { static: true })
  filtrosCompra!: FiltroCompraComponent;

  @ViewChild('tabelaListaCompra', { static: true })
  tabelaListaCompra!: PoTableComponent;

  @ViewChild('paginaListaCompra', { static: true })
  paginaListaCompra!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Nova ${this.nomePagina}`,
      action: this.novaCompra.bind(this),
      icon: 'po-icon-plus',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly compraListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    advancedAction: this.abrirBuscaAvançada.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly compraListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public compraListaAcoes: Array<PoTableAction> = acaoVisualizarEditarRemover(
    this.visualizarCompra.bind(this),
    this.editarCompra.bind(this),
    this.removerCompraDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private compraApiService: CompraApiService,
    private poDialog: PoDialogService
  ) {}

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);

    //this.filtrosCompra.buscarNovosDadosComFiltros()
  }

  novaCompra() {
    this.router.navigate([navegacaoDespesaCompraNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaCompra = true;

    this.filtroLista = filtro;

    this.limparItensCompras();

    this.popularDisclaimers(this.filtroCompra, this.filtroLista);

    this.buscarNovosDados(this.filtroCompra);

    this.carregandoTabelaCompra = false;
  }

  buscarNovosDados(filtros: FiltroCompraDisclaimerModel) {
    this.limparItensCompras();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroCompraDisclaimerModel) {
    this.filtroCompra = filtros;

    this.popularDisclaimers(this.filtroCompra, this.filtroLista);

    const param = this.criarParametroCompra(
      this.filtroCompra,
      this.filtroLista
    );

    this.carregandoTabelaCompra = true;

    this.compraApiService
      .buscarCompras(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaCompra.sortColumn({});

          this.listaCompras = this.listaCompras
            ? [...this.listaCompras, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensCompras();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaCompra = false;
        },
      });
  }

  popularDisclaimers(
    filtroCompraAvancado: FiltroCompraDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroCompraAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroCompraAvancado(filtroCompraAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.compraListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.compraListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroCompraAvancado(
    filtroAtorAvancado: FiltroCompraDisclaimerModel
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

  criarParametroCompra(
    filtro?: FiltroCompraDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      bancoId: filtro?.bancoId?.value,
      fornecedorId: filtro?.fornecedorId?.value,
      subgrupoId: filtro?.subgrupoId?.value,
      dataInicio: filtro?.dataInicio?.value,
      dataFim: filtro?.dataFim?.value,
      pesquisar: filtroLista,
    } as FiltroCompraParametroModel;
  }

  limparItensCompras() {
    this.paginacao.page = 0;
    this.listaCompras = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaCompra.clearInputSearch();
        this.buscar('');
        break;
      case 'filtroCompras':
        this.filtrosCompra.removerDisclaimer(disclaimerRemove)
        break
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaCompra.clearInputSearch();
    this.filtrosCompra.removerTodosDisclaimer(arrayDisclaimerRemove)
    this.listaCompras = []
  }

  visualizarCompra(itemListaCompra: ItemCompraModel){
    this.router.navigate([
      navegacaoDespesaCompraVisualizar(itemListaCompra.id).link,
    ]);
  }

  editarCompra(itemListaCompra: ItemCompraModel){
    this.router.navigate([
      navegacaoDespesaCompraEditar(itemListaCompra.id).link,
    ]);
  }

  removerCompraDialog(itemListaCompra: ItemCompraModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a compra?
      <br>
      <br> <b>Código</b>: ${itemListaCompra.nome || ''}`,
      confirm: () => this.removerCompra(itemListaCompra),
    });
  }

  removerCompra(itemListaCompra: ItemCompraModel){
    this.carregandoTabelaCompra = true;
    this.compraApiService.deletarCompra(itemListaCompra.id).subscribe({
      next: () => {
        this.filtrosCompra.buscarNovosDadosComFiltros()
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },

      complete: () => {
        this.carregandoTabelaCompra = false;
      },
    });
  }

  mostrarMaisCompras() {
    this.tabelaListaCompra.sortColumn({});
    this.carregandoDadosCompra = true;
    this.paginacao.page++;

    this.filtrosCompra.buscarMaisDadosComFiltros()
    this.carregandoDadosCompra = false;
  }

  abrirBuscaAvançada(){
    this.filtrosCompra.abrirFiltroCompra()
  }

}
