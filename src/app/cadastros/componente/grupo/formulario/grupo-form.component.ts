import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { PoBreadcrumb, PoDialogService, PoNotificationService } from "@po-ui/ng-components";
import { navegacaoCadastroGrupo } from "src/app/cadastros/servico/navegacao-cadastro-data.service";
import { verificarFormularioAlterado, marcarFormularioAlterado } from "src/app/shared/function/form.service";
import { GrupoModel } from "../modelo/grupo.model";
import { navegacaoCadastroGrupoEditar, navegacaoCadastroGrupoNovo } from "../servico/navegacao-cadastro-responsavel.service";
import { GrupoApiService } from "../servico/responsavel-api.service";


@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html'
})
export class GrupoFormComponent implements OnInit{
  formulario!: FormGroup;
  public nomePrincipal = navegacaoCadastroGrupo.label;
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
    private grupoApiService: GrupoApiService,
    ) {}

    ngOnInit() {
      this.criarFormulario();

      this.route.params.subscribe((info: Params) => {
        if (info && info['id']) {

          this.nomePagina = navegacaoCadastroGrupoEditar(info['id']).label;
          this.grupoApiService.buscarGrupoPorId(info['id']).subscribe({
            next: (grupo) => {
              if (grupo) {
                this.nomePagina = navegacaoCadastroGrupoEditar(info['id']).label;
                this.formulario.patchValue(grupo)
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
          this.nomePagina = navegacaoCadastroGrupoNovo.label;
          this.navegacao.items.push({ label: this.nomePagina });
          this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
        }
      });
    }

  criarFormulario(novoFormulario?: GrupoModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      nome: [novoFormulario?.nome],
      descricao: [novoFormulario?.descricao]
    });
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoCadastroGrupo.link],
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
          ? this.grupoApiService.editarGrupo(valueId, valueSubmit)
          : this.grupoApiService.salvarGrupo(valueSubmit);

        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoCadastroGrupo.link]);
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
