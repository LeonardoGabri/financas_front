import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { PoBreadcrumb, PoDialogService, PoNotificationService } from "@po-ui/ng-components";
import { navegacaoCadastroFornecedor } from "src/app/cadastros/servico/navegacao-cadastro-data.service";
import { verificarFormularioAlterado, marcarFormularioAlterado } from "src/app/shared/function/form.service";
import { FornecedorModel } from "../modelo/fornecedor.model";
import { FornecedorApiService } from "../servico/fornecedor-api.service";
import { navegacaoCadastroFornecedorEditar, navegacaoCadastroFornecedorNovo } from "../servico/navegacao-cadastro-fornecedor.service";

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html'
})
export class FornecedorFormComponent implements OnInit{
  formulario!: FormGroup;
  public nomePrincipal = navegacaoCadastroFornecedor.label;
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
    private fornecedorApiService: FornecedorApiService,
    ) {}

    ngOnInit() {
      this.criarFormulario();

      this.route.params.subscribe((info: Params) => {
        if (info && info['id']) {

          this.nomePagina = navegacaoCadastroFornecedorEditar(info['id']).label;
          this.fornecedorApiService.buscarFornecedorPorId(info['id']).subscribe({
            next: (fornecedor) => {
              if (fornecedor) {
                this.nomePagina = navegacaoCadastroFornecedorEditar(info['id']).label;
                this.formulario.patchValue(fornecedor)
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
          this.nomePagina = navegacaoCadastroFornecedorNovo.label;
          this.navegacao.items.push({ label: this.nomePagina });
          this.titleService.setTitle(`${this.nomePagina} - Motor Fiscal`);
        }
      });
    }

  criarFormulario(novoFormulario?: FornecedorModel) {
    this.formulario = this.formBuilder.group({
      id: [novoFormulario?.id],
      ativo: [novoFormulario?.ativo == null ? true : novoFormulario?.ativo],
      nome: [novoFormulario?.nome],
      descricao: [novoFormulario?.descricao]
    });
  }

  private verificarFormulario(
    valorObjeto?: any,
    navegacao: string[] = [navegacaoCadastroFornecedor.link],
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
          ? this.fornecedorApiService.editarFornecedor(valueId, valueSubmit)
          : this.fornecedorApiService.salvarFornecedor(valueSubmit);

        metodo.subscribe({
          next: (produto) => {
            if (produto) {
              this.poNotification.success('Salvo com sucesso');
              this.router.navigate([navegacaoCadastroFornecedor.link]);
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
