import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { PoBreadcrumb, PoDialogService, PoNotificationService } from "@po-ui/ng-components";
import { navegacaoCadastroResponsavel } from "src/app/cadastros/servico/navegacao-cadastro-data.service";
import { verificarFormularioAlterado, marcarFormularioAlterado } from "src/app/shared/function/form.service";
import { ResponsavelModel } from "../modelo/responsavel.model";
import { navegacaoCadastroResponsavelEditar, navegacaoCadastroResponsavelNovo } from "../servico/navegacao-cadastro-responsavel.service";
import { ResponsavelApiService } from "../servico/responsavel-api.service";

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html'
})
export class ResponsavelFormComponent implements OnInit{
  formulario!: FormGroup;
  public nomePrincipal = navegacaoCadastroResponsavel.label;
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
    private responsavelApiService: ResponsavelApiService,
    ) {}

    ngOnInit() {
      this.criarFormulario();

      this.route.params.subscribe((info: Params) => {
        if (info && info['id']) {

          this.nomePagina = navegacaoCadastroResponsavelEditar(info['id']).label;
          this.responsavelApiService.buscarResponsavelPorId(info['id']).subscribe({
            next: (responsavel) => {
              if (responsavel) {
                this.nomePagina = navegacaoCadastroResponsavelEditar(info['id']).label;
                this.formulario.patchValue(responsavel)
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
          this.nomePagina = navegacaoCadastroResponsavelNovo.label;
          this.navegacao.items.push({ label: this.nomePagina });
          this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
        }
      });
    }

  criarFormulario(novoFormulario?: ResponsavelModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      ativo: [novoFormulario?.ativo == null ? true : novoFormulario?.ativo],
      nome: [novoFormulario?.nome],
      descricao: [novoFormulario?.descricao]
    });
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoCadastroResponsavel.link],
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
          ? this.responsavelApiService.editarResponsavel(valueId, valueSubmit)
          : this.responsavelApiService.salvarResponsavel(valueSubmit);

        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoCadastroResponsavel.link]);
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
}
