import { ResponsavelComboService } from './../../../../shared/combos-compartilhados/responsavel-combo.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PoBreadcrumb, PoDialogService, PoNotificationService } from "@po-ui/ng-components";
import { navegacaoCadastroBanco } from "src/app/cadastros/servico/navegacao-cadastro-data.service";
import { BancoModel } from "../modelo/banco.model";
import { BancoApiService } from "../servico/banco-api.service";
import { navegacaoCadastroBancoEditar, navegacaoCadastroBancoNovo } from "../servico/navegacao-cadastro-banco.service";
import { marcarFormularioAlterado, verificarFormularioAlterado } from "src/app/shared/function/form.service";
import { BancoEnumComboService } from "src/app/shared/combos-compartilhados/banco-enum.service";
import { ResponsavelModel } from '../../responsavel/modelo/responsavel.model';

@Component({
  selector: 'app-banco-form',
  templateUrl: './banco-form.component.html'
})
export class BancoFormComponent implements OnInit{
  formulario!: FormGroup;
  public nomePrincipal = navegacaoCadastroBanco.label;
  public nomePagina!: string;

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
    private bancoApiService: BancoApiService,
    public bancoEnumComboService : BancoEnumComboService,
    public responsavelComboService: ResponsavelComboService
    ) {}

    ngOnInit() {
      this.criarFormulario();

      this.route.params.subscribe((info: Params) => {
        if (info && info['id']) {

          this.nomePagina = navegacaoCadastroBancoEditar(info['id']).label;
          this.bancoApiService.buscarBancoPorId(info['id']).subscribe({
            next: (banco) => {
              if (banco) {
                this.nomePagina = navegacaoCadastroBancoEditar(info['id']).label;
                this.formulario.patchValue(banco)
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
              this.titleService.setTitle(`${this.nomePagina}`);
            },
          });
        } else {
          this.nomePagina = navegacaoCadastroBancoNovo.label;
          this.navegacao.items.push({ label: this.nomePagina });
          this.titleService.setTitle(`${this.nomePagina}`);
        }
      });
    }

  criarFormulario(novoFormulario?: BancoModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      ativo: [novoFormulario?.ativo == null ? true : novoFormulario?.ativo],
      nome: [novoFormulario?.nome],
      responsavel: [novoFormulario?.responsavel],
      responsavelNome: [novoFormulario?.responsavelNome],
      descricao: [novoFormulario?.descricao]
    });
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoCadastroBanco.link],
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
    if (this.formulario.valid) {
      let valueSubmit = this.formulario.getRawValue();
      let valueId = valueSubmit.id;

      delete valueSubmit.id;

        let metodo = valueId
          ? this.bancoApiService.editarBanco(valueId, valueSubmit)
          : this.bancoApiService.salvarBanco(valueSubmit);

        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoCadastroBanco.link]);
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
        });
    } else {
      marcarFormularioAlterado(this.formulario);
      this.poNotification.error('Erro no formulário');
    }
  }

  alteraResponsavel(resp: any){
    this.formulario.get('responsavelNome')?.setValue(resp.label)
  }
}
