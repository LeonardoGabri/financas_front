import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { PoBreadcrumb, PoDialogService, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn, PoTableComponent } from "@po-ui/ng-components";
import { navegacaoDespesasCompra } from "src/app/despesa/servico/navegacao-despesas-data.service";
import { verificarFormularioAlterado, marcarFormularioAlterado } from "src/app/shared/function/form.service";
import { CompraModel, ResponsavelCompraModel, listaColunasResposavelCompra } from "../modelo/compra.model";
import { CompraApiService } from "../servico/compra-api.service";
import { navegacaoDespesaCompraVisualizar, navegacaoDespesaCompraNovo, navegacaoDespesaCompraEditar } from "../servico/navegacao-despesas-compra.service";
import { ResponsavelCompraComponent } from "./modal/responsavel-compra.component";
import { BancoComboService } from "src/app/shared/combos-compartilhados/banco-combo.service";
import { FornecedorComboService } from "src/app/shared/combos-compartilhados/fornecedor-combo.service";
import { SubgrupoComboService } from "src/app/shared/combos-compartilhados/subgrupo-combo.service";
import { TipoCompraEnumComboService } from "src/app/shared/combos-compartilhados/tipo-compra-enum.service";

@Component({
  selector: 'app-compra-form',
  templateUrl: './compra-form.component.html'
})
export class CompraFormComponent implements OnInit{
  formulario!: FormGroup;
  public nomePrincipal = navegacaoDespesasCompra.label;
  public nomePagina!: string;

  bancoNome!: string

  public somenteLeitura = false

  colunasResponsavelCompra: PoTableColumn[] = listaColunasResposavelCompra

  public acoesLista: PoTableAction[] = [
    {
      action: this.editarModalResponsavelCompra.bind(this),
      icon: 'po-icon po-icon-edit',
      label: 'Editar'
    },
    {
      action: this.removerResponsavelDialog.bind(this),
      icon: 'po-icon po-icon-delete',
      label: 'Remover'
    }
  ]

  readonly acoes: PoPageAction[] = [
    {
      action: () => {
        this.salvar()
      },
      disabled: false,
      label: 'Salvar'
    },
    {
      action: () => {
        this.cancelar()
      },
      disabled: false,
      label: 'Cancelar'
    },
  ]

  @ViewChild('modalResponsavelCompra', {static: true})
  modalResponsavelCompra!: ResponsavelCompraComponent

  @ViewChild('tabelaResponsavel', {static: true})
  tabelaResponsavel!: PoTableComponent

  public navegacao: PoBreadcrumb = {
    items: [
      {
        label: this.nomePrincipal,
        action: this.verificarFormulario.bind(this),
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private poDialogService: PoDialogService,
    private poNotification: PoNotificationService,
    private titleService: Title,
    private compraApiService: CompraApiService,
    public bancoComboService: BancoComboService,
    public fornecedorComboService: FornecedorComboService,
    public subgrupoComboService: SubgrupoComboService,
    public tipoCompraEnumComboService: TipoCompraEnumComboService,
    ) {}

    ngOnInit() {
      this.criarFormulario();

      this.route.params.subscribe((info: Params) => {
        if (info && info['id']) {
          this.compraApiService.buscarCompraPorId(info['id']).subscribe({
            next: (compra) => {
              if (compra) {
                if(this.router.url.includes('visualizar')){
                  this.nomePagina = navegacaoDespesaCompraVisualizar(info['id']).label;
                  this.acoes[0].disabled = true
                  this.somenteLeitura = true
                }else{
                  this.nomePagina = navegacaoDespesaCompraEditar(info['id']).label;
                }
                this.formulario.patchValue(compra)
              }
            },
            error: ({ error }) => {
              let msg = error?.title
                ? error.title
                : 'Erro no servidor';
              this.poNotification.error(msg);
              console.error(error);
            },
            complete: () => {
              this.navegacao.items.push({ label: this.nomePagina });
              this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
            },
          });
        } else {
          this.nomePagina = navegacaoDespesaCompraNovo.label;
          this.navegacao.items.push({ label: this.nomePagina });
          this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
        }
      });

      this.formulario.valueChanges.subscribe({
        next: (form: any) => {
          let valorCompra = form.valor
          let aliquota = form.aliquotaImposta

          let valorImpostoAtual = this.formulario.get('valorImposto')?.value;

          if (aliquota && valorCompra) {
            let novoValorImposto = aliquota * valorCompra;

            if (novoValorImposto !== valorImpostoAtual) {
              this.formulario.get('valorImposto')?.setValue(novoValorImposto);
            }
          } else {
            if (valorImpostoAtual !== null) {
              this.formulario.get('valorImposto')?.reset();
            }
          }
        },
        error: ({ error }) => {
          console.error(error);
        }
      });
    }

  criarFormulario(novoFormulario?: CompraModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      banco: [novoFormulario?.banco],
      bancoNome: [novoFormulario?.bancoNome],
      fornecedor: [novoFormulario?.fornecedor],
      fornecedorNome: [novoFormulario?.fornecedorNome],
      dataCompra: [novoFormulario?.dataCompra],
      subgrupo: [novoFormulario?.subgrupo],
      subgrupoNome: [novoFormulario?.subgrupoNome],
      parcelas: [novoFormulario?.parcelas],
      valor: [novoFormulario?.valor],
      mesInicioCobranca: [novoFormulario?.mesInicioCobranca],
      anoInicioCobranca: [novoFormulario?.anoInicioCobranca],
      responsaveis: [novoFormulario?.responsaveis],
      descricao: [novoFormulario?.descricao],
      tipoCompra: [novoFormulario?.tipoCompra == null ? 'EFETIVO' : novoFormulario?.tipoCompra],

      aliquotaImposta: [novoFormulario?.aliquotaImposta || 0.0],
      valorImposto: [novoFormulario?.valorImposto || 0.0]
    });
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoDespesasCompra.link],
    formulario: FormGroup = this.formulario
  ) {
    verificarFormularioAlterado(
      navegacao,
      formulario,
      this.router,
      this.poDialogService
    );
  }

  cancelar() {
    this.verificarFormulario();
  }

  salvar() {
    this.formulario.markAsPristine();
    let responsaveis = this.formulario.get('responsaveis')?.value
    let soma: number = 0
    if(Array.isArray(responsaveis)){
      responsaveis.forEach((item: ResponsavelCompraModel) => {
        soma = soma + item.percentual
      })
    }

    if(soma != 100){
      this.poNotification.error("Divisão do percentual da compra diferente de 100%")
    }

    if (this.formulario.valid) {
      let valueSubmit = this.formulario.getRawValue();

      valueSubmit.aliquotaImposta = valueSubmit.aliquotaImposta == null ? 0 : valueSubmit.aliquotaImposta
      valueSubmit.valorImposto = valueSubmit.valorImposto == null ? 0 : valueSubmit.valorImposto

      let valueId = valueSubmit.id;

      delete valueSubmit.id;

        let metodo = valueId
          ? this.compraApiService.editarCompra(valueId, valueSubmit)
          : this.compraApiService.salvarCompra(valueSubmit);

        this.acoes[0].disabled = true
        this.poNotification.information('Criando Parcelas');
        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoDespesasCompra.link]);
            }
          },
          error: ({ error }) => {
            this.acoes[0].disabled = false
            let msg = {
              message: error?.title
                ? error.title
                : 'Erro no servidor',
              action: () => {},
              actionLabel: '',
            };

            if (error?.detail) {
              msg.action = () => {
                this.poDialogService.alert({
                  title: error?.title,
                  message: error?.detail,
                  ok: () => true,
                });
              };
              msg.actionLabel = 'Detalhes';
            }

            this.poNotification.error(msg);
            console.error(error);
          },
          complete: () => {
            this.acoes[0].disabled = false
          }
        });
    } else {
      marcarFormularioAlterado(this.formulario);
      this.poNotification.error('Erro no formulário');
      this.acoes[0].disabled = false;
    }
  }

  abrirModalResponsavelCompra(){
    this.modalResponsavelCompra.abrirModalResponsavelCompra()
  }

  editarModalResponsavelCompra(item: ResponsavelCompraModel){
    this.modalResponsavelCompra.abrirModalResponsavelCompra(item)
  }

  removerResponsavelDialog(item: ResponsavelCompraModel){
    this.poDialogService.confirm({
      title: 'Atenção',
      message: `Tem certeza que deseja remover responsável?
        <br>
        <b>Nome: </b> ${item.responsavel}
      `,
      confirm: () => this.removerResponsavel(item)
    })
  }

  removerResponsavel(item: ResponsavelCompraModel){
    if(item.indTabela == null){
      return;
    }

    let listaResponsaveis = this.formulario.get('responsaveis')?.value || new Array();

    listaResponsaveis = listaResponsaveis.filter((item: ResponsavelCompraModel) => {
      return item.indTabela !== item.indTabela;
    });

    this.setaIndTabela(listaResponsaveis);
  }

  setaIndTabela(itens: any[]){
    itens?.forEach((item: any, index: number) => {
      item.indTabela = index;
    });

    this.formulario.get('responsaveis')?.setValue(itens);
    this.tabelaResponsavel.items = itens;
  }

  atualizarFormulario(item: ResponsavelCompraModel){
    let listaResponsaveis = this.formulario.get('responsaveis')?.value || new Array();
    if (item.indTabela == null) {
      listaResponsaveis?.push(item);
    } else {
      let indEncontrado = listaResponsaveis.findIndex(function (item: ResponsavelCompraModel) {
        return item.indTabela == item.indTabela;
      });

      if (indEncontrado != -1) {
        listaResponsaveis[indEncontrado] = item;
      }
    }

    this.setaIndTabela(listaResponsaveis)
  }

  dataHoraAlterada(dh: string){
    let dhCompra = this.formulario.get('dataCompra')

    if(dhCompra?.value == dh){
      return
    }

    dhCompra?.setValue(dh)

  }

  alteraBanco(banco: any){
    this.bancoNome = banco.label
    this.formulario.get('bancoNome')?.setValue(this.bancoNome)
    if(banco.label != 'DINHEIRO'){
      this.formulario.get('aliquotaImposta')?.reset()
    }
  }

  alteraFornecedor(forn: any){
    this.formulario.get('fornecedorNome')?.setValue(forn.label)
  }

  alteraSubgrupo(subgrupo: any){
    this.formulario.get('subgrupoNome')?.setValue(subgrupo.label)
  }
}
