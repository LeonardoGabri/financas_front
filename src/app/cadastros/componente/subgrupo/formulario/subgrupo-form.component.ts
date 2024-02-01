import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { PoBreadcrumb, PoDialogService, PoNotificationService } from "@po-ui/ng-components";
import { navegacaoCadastroSubgrupo } from "src/app/cadastros/servico/navegacao-cadastro-data.service";
import { verificarFormularioAlterado, marcarFormularioAlterado } from "src/app/shared/function/form.service";
import { SubgrupoModel } from "../modelo/subgrupo.model";
import { navegacaoCadastroSubgrupoEditar, navegacaoCadastroSubgrupoNovo } from "../servico/navegacao-cadastro-responsavel.service";
import { SubgrupoApiService } from "../servico/responsavel-api.service";
import { GrupoComboService } from "src/app/shared/combos-compartilhados/grupo-combo.service";

@Component({
  selector: 'app-subsubgrupo-form',
  templateUrl: './subgrupo-form.component.html'
})
export class SubgrupoFormComponent implements OnInit{
  formulario!: FormGroup;
  public nomePrincipal = navegacaoCadastroSubgrupo.label;
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
    private subgrupoApiService: SubgrupoApiService,
    public grupoComboService: GrupoComboService
    ) {}

    ngOnInit() {
      this.criarFormulario();

      this.route.params.subscribe((info: Params) => {
        if (info && info['id']) {

          this.nomePagina = navegacaoCadastroSubgrupoEditar(info['id']).label;
          this.subgrupoApiService.buscarSubgrupoPorId(info['id']).subscribe({
            next: (subgrupo) => {
              if (subgrupo) {
                this.nomePagina = navegacaoCadastroSubgrupoEditar(info['id']).label;
                this.formulario.patchValue(subgrupo)
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
          this.nomePagina = navegacaoCadastroSubgrupoNovo.label;
          this.navegacao.items.push({ label: this.nomePagina });
          this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
        }
      });
    }

  criarFormulario(novoFormulario?: SubgrupoModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      nome: [novoFormulario?.nome],
      grupoId: [novoFormulario?.grupoId],
      descricao: [novoFormulario?.descricao]
    });
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoCadastroSubgrupo.link],
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
          ? this.subgrupoApiService.editarSubgrupo(valueId, valueSubmit)
          : this.subgrupoApiService.salvarSubgrupo(valueSubmit);

        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoCadastroSubgrupo.link]);
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
