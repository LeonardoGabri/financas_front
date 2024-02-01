import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
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
import { acaoEditarRemover } from 'src/app/shared/function/acoes-lista.service';

import {
  FiltroParcelaDisclaimerModel,
  FiltroParcelaParametroModel,
  ItemParcelaModel,
  listaColunasParcela,
} from '../modelo/parcela.model';
import {
  navegacaoDespesaParcelaEditar,
  navegacaoDespesaParcelaLista,
  navegacaoDespesaParcelaNovo,
} from '../servico/navegacao-despesas-parcela.service';
import { ParcelaApiService } from '../servico/parcela-api-service';
import { FiltroParcelaComponent } from './filtro/filtro-parcela.component';

@Component({
  selector: 'app-parcela-lista',
  templateUrl: './parcela-lista.component.html'
})
export class ParcelaListaComponent implements AfterViewInit{
  public nomePagina = navegacaoDespesaParcelaLista.label;
  public colunasTabelaParcela: PoTableColumn[] = listaColunasParcela;

  public valorTotal: any = '****'

  public filtroParcela!: FiltroParcelaDisclaimerModel;
  private disclaimers = new Array();

  private filtroLista!: string;

  public carregandoTabelaParcela = false;
  public carregandoDadosParcela = false;
  public desabilitarCarregarMais = false;

  @Input() listaParcelas!: any[];

  @ViewChild('filtroParcelas', { static: true })
  filtroParcelas!: FiltroParcelaComponent;

  @ViewChild('tabelaListaParcela', { static: true })
  tabelaListaParcela!: PoTableComponent;

  @ViewChild('paginaListaParcela', { static: true })
  paginaListaParcela!: PoPageListComponent;

  public readonly acoes: Array<PoPageAction> = [
    {
      label: `Gerar valor total`,
      action: this.gerarValorTotal.bind(this),
      icon: 'po-icon-finance',
    },
  ];

  private paginacao = {
    page: 0,
  };

  public readonly parcelaListaFilter: PoPageFilter = {
    action: this.buscar.bind(this),
    advancedAction: this.abrirBuscaAvançada.bind(this),
    placeholder: 'Pesquisar Código ou Descrição',
    width: 4,
  };

  public readonly parcelaListaDisclaimer: PoDisclaimerGroup = {
    title:"Filtros",
    disclaimers: [],
    remove: this.removerDisclaimer.bind(this),
    removeAll: this.removerTodosDisclaimer.bind(this),
  };

  public parcelaListaAcoes: Array<PoTableAction> = acaoEditarRemover(
    this.editarParcela.bind(this),
    this.removerParcelaDialog.bind(this)
  );

  constructor(
    private router: Router,
    private titleService: Title,
    private poNotification: PoNotificationService,
    private parcelaApiService: ParcelaApiService,
    private poDialog: PoDialogService
  ) {}

  ngAfterViewInit() {
    this.titleService.setTitle(`${this.nomePagina}`);

    //this.filtroParcelas.buscarNovosDadosComFiltros()
  }

  novaParcela() {
    this.router.navigate([navegacaoDespesaParcelaNovo.link]);
  }

  buscar(filtro: string) {
    this.carregandoTabelaParcela = true;

    this.filtroLista = filtro;

    this.limparItensParcelas();

    this.popularDisclaimers(this.filtroParcela, this.filtroLista);

    this.buscarNovosDados(this.filtroParcela);

    this.carregandoTabelaParcela = false;
  }

  buscarNovosDados(filtros: FiltroParcelaDisclaimerModel) {
    this.limparItensParcelas();
    this.buscarMaisDados(filtros);
  }

  buscarMaisDados(filtros: FiltroParcelaDisclaimerModel) {
    this.filtroParcela = filtros;

    this.popularDisclaimers(this.filtroParcela, this.filtroLista);

    const param = this.criarParametroParcela(
      this.filtroParcela,
      this.filtroLista
    );

    this.carregandoTabelaParcela = true;

    this.parcelaApiService
      .buscarParcelas(param, this.paginacao.page)
      .subscribe({
        next: (response: any) => {
          this.tabelaListaParcela.sortColumn({});

          this.listaParcelas = this.listaParcelas
            ? [...this.listaParcelas, ...response.content]
            : [...response.content];

          this.desabilitarCarregarMais = response.last;
        },

        error: ({ error }) => {
          this.limparItensParcelas();
          let msg = error?.title ? error.title : "Erro no servidor";
          this.poNotification.error(msg);
          console.error(error);
        },

        complete: () => {
          this.carregandoTabelaParcela = false;
        },
      });
  }

  popularDisclaimers(
    filtroParcelaAvancado: FiltroParcelaDisclaimerModel,
    filtroLista: string
  ) {
    this.disclaimers = [];
    filtroLista && this.disclaimers.push(this.processaFiltroLista(filtroLista));
    filtroParcelaAvancado &&
      this.disclaimers.push(
        ...this.processaFiltroParcelaAvancado(filtroParcelaAvancado)
      );
    if (this.disclaimers && this.disclaimers.length > 0) {
      this.parcelaListaDisclaimer.disclaimers = [...this.disclaimers];
    } else {
      this.parcelaListaDisclaimer.disclaimers = [];
    }
  }

  processaFiltroLista(filtroLista: string) {
    return {
      label: "Pesquisar: " + filtroLista,
      value: filtroLista,
      property: 'filtroLista',
    } as PoDisclaimer;
  }

  processaFiltroParcelaAvancado(
    filtroAtorAvancado: FiltroParcelaDisclaimerModel
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

  criarParametroParcela(
    filtro?: FiltroParcelaDisclaimerModel,
    filtroLista?: string
  ) {
    if (!filtro && !filtroLista) {
      return undefined;
    }

    return {
      mesReferencia: filtro?.mesReferencia?.value,
      anoReferencia: filtro?.anoReferencia?.value,
      responsavelId: filtro?.responsavelId?.value,
      pesquisar: filtroLista,
    } as FiltroParcelaParametroModel;
  }

  limparItensParcelas() {
    this.paginacao.page = 0;
    this.listaParcelas = [];
    this.desabilitarCarregarMais = true;
  }

  removerDisclaimer(disclaimerRemove: PoDisclaimerGroupRemoveAction) {
    switch (disclaimerRemove.removedDisclaimer.property) {
      case 'filtroLista':
        this.paginaListaParcela.clearInputSearch();
        this.buscar('');
        break;
      case 'filtroParcelas':
        this.filtroParcelas.removerDisclaimer(disclaimerRemove)
        break;
      default:
        break;
    }
  }

  removerTodosDisclaimer(arrayDisclaimerRemove: any) {
    this.paginaListaParcela.clearInputSearch();
    this.filtroParcelas.removerTodosDisclaimer(arrayDisclaimerRemove)
    this.listaParcelas = []
  }

  editarParcela(itemListaParcela: ItemParcelaModel){
    this.router.navigate([
      navegacaoDespesaParcelaEditar(itemListaParcela.id).link,
    ]);
  }

  removerParcelaDialog(itemListaParcela: ItemParcelaModel){ //ItemListaProdutoModel) {
    this.poDialog.confirm({
      title: "Atenção",
      message: `Tem certeza que deseja remover a parcela?
      <br>
      <br> <b>Código</b>: ${itemListaParcela.nome || ''}`,
      confirm: () => this.removerParcela(itemListaParcela),
    });
  }

  removerParcela(itemListaParcela: ItemParcelaModel){
    this.carregandoTabelaParcela = true;
    this.parcelaApiService.deletarParcela(itemListaParcela.id).subscribe({
      next: () => {
        this.filtroParcelas.buscarNovosDadosComFiltros()
        this.poNotification.success("Removido com sucesso");
      },

      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },
      complete: () => {
        this.carregandoTabelaParcela = false;
      },
    });
  }

  mostrarMaisParcelas() {
    this.tabelaListaParcela.sortColumn({});
    this.carregandoDadosParcela = true;
    this.paginacao.page++;

    this.filtroParcelas.buscarMaisDadosComFiltros()
    this.carregandoDadosParcela = false;
  }

  abrirBuscaAvançada(){
    this.filtroParcelas.abrirFiltroParcela()
  }

  gerarValorTotal(){
    const param = this.criarParametroParcela(
      this.filtroParcela,
      this.filtroLista
    );

    this.parcelaApiService.buscarValorTotal(param).subscribe({
      next: (retorno: any) => {
        this.valorTotal = retorno;
      },
      error: ({ error }) => {
        let msg = error?.detail ? error.detail : "Erro no servidor";
        this.poNotification.error(msg);
        console.error(error);
      },
      complete: () => {},
    })
  }

}
