import { BancoComboService } from 'src/app/shared/combos-compartilhados/banco-combo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PoBreadcrumb, PoDialogService, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { navegacaoDespesasParcela } from 'src/app/despesa/servico/navegacao-despesas-data.service';
import { marcarFormularioAlterado, verificarFormularioAlterado } from 'src/app/shared/function/form.service';

import { ParcelaModel } from '../modelo/parcela.model';
import { navegacaoDespesaParcelaEditar, navegacaoDespesaParcelaNovo } from '../servico/navegacao-despesas-parcela.service';
import { ParcelaApiService } from './../servico/parcela-api-service';
import { FornecedorComboService } from 'src/app/shared/combos-compartilhados/fornecedor-combo.service';
import { SubgrupoComboService } from 'src/app/shared/combos-compartilhados/subgrupo-combo.service';
import { ResponsavelComboService } from 'src/app/shared/combos-compartilhados/responsavel-combo.service';

@Component({
  selector: 'app-parcela-form',
  templateUrl: './parcela-form.component.html',
})
export class ParcelaFormComponent implements OnInit {
  formulario!: FormGroup;

  public nomePrincipal = navegacaoDespesasParcela.label;
  public nomePagina!: string;

  public somenteLeitura = false

  public navegacao: PoBreadcrumb = {
    items: [
      {
        label: this.nomePrincipal,
        action: this.verificarFormulario.bind(this),
      },
    ],
  };

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private poDialogService: PoDialogService,
    private poNotification: PoNotificationService,
    private titleService: Title,
    private parcelaApiService: ParcelaApiService,
    public responsavelComboService: ResponsavelComboService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    this.route.params.subscribe((info: Params) => {
      if (info && info['id']) {

        this.nomePagina = navegacaoDespesaParcelaEditar(info['id']).label;
        this.parcelaApiService.buscarParcelaPorId(info['id']).subscribe({
          next: (compra) => {
            if (compra) {
              this.nomePagina = navegacaoDespesaParcelaEditar(info['id']).label;
              this.somenteLeitura = true
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
        this.nomePagina = navegacaoDespesaParcelaNovo.label;
        this.navegacao.items.push({ label: this.nomePagina });
        this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
      }
    });
  }

  criarFormulario(novoFormulario?: ParcelaModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      mesReferencia: [novoFormulario?.mesReferencia],
      anoReferencia: [novoFormulario?.anoReferencia],
      compraId: [novoFormulario?.compraId],
      responsavelId: [novoFormulario?.responsavelId],
      valorParcelado: [novoFormulario?.valorParcelado],
      parcelaAtual: [novoFormulario?.parcelaAtual],
    });
  }

  salvar() {
    this.formulario.markAsPristine();
    if (this.formulario.valid) {
      let valueSubmit = this.formulario.getRawValue();
      let valueId = valueSubmit.id;

      delete valueSubmit.id;

        let metodo = valueId
          ? this.parcelaApiService.editarParcela(valueId, valueSubmit)
          : this.parcelaApiService.salvarParcela(valueSubmit);

        this.acoes[0].disabled = true
        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoDespesasParcela.link]);
            }
          },
          error: ({ error }) => {
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

  cancelar() {
    this.verificarFormulario();
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoDespesasParcela.link],
    formulario: FormGroup = this.formulario
  ) {
    verificarFormularioAlterado(
      navegacao,
      formulario,
      this.router,
      this.poDialogService
    );
  }
}
