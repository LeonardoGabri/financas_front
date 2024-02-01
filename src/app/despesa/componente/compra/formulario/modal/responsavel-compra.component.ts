import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ResponsavelCompraModel } from "../../modelo/compra.model";
import { PoModalAction, PoModalComponent, PoNotification, PoNotificationService } from "@po-ui/ng-components";
import { ResponsavelComboService } from "src/app/shared/combos-compartilhados/responsavel-combo.service";

@Component({
  selector: 'app-responsavel-compra',
  templateUrl: './responsavel-compra.component.html'
})
export class ResponsavelCompraComponent implements OnInit{
  formulario!: FormGroup;

  @Output() atualizarFormulario = new EventEmitter(true)

  @Input() responsaveis!: ResponsavelCompraModel[]

  @ViewChild('modalResponsavelCompra', {static: true})
  modalResponsavelCompra!: PoModalComponent

  readonly acao: PoModalAction = {
    action: () => {
      this.salvar()
    },
    disabled: true,
    label: 'Salvar'
  }

  constructor(
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService,
    public responsavelComboService: ResponsavelComboService
  ){}

  ngOnInit(): void {
    this.criarFormulario()

    this.formulario.statusChanges.subscribe((status) => {
      if (status == 'INVALID') {
        this.acao.disabled = true;
      } else {
        this.acao.disabled = false;
      }
    });
  }

  criarFormulario(novoFormulario?: ResponsavelCompraModel){
    this.formulario = this.formBuilder.group({
      indTabela:[novoFormulario?.indTabela],
      id:[novoFormulario?.id],
      responsavel:[novoFormulario?.responsavel],
      responsavelNome:[novoFormulario?.responsavelNome],
      percentual:[novoFormulario?.percentual],
    })
  }

  abrirModalResponsavelCompra(item?: ResponsavelCompraModel){
    this.limpar()
    this.modalResponsavelCompra.open()

    if(item){
      this.formulario.patchValue(item)
    }
  }

  fecharModalResponsavelCompra(){
    this.formulario.reset()
    this.modalResponsavelCompra.close()
  }

  limpar(){
    this.formulario.reset();
    this.formulario.markAsPristine()
  }

  salvar(){
    if(!this.formulario.valid){
      this.poNotification.error('Formulário inválido')
    }

    let responsavelEncontrado = this.responsaveis?.find((item: ResponsavelCompraModel) => {
      return item.id == this.formulario.get('id')?.value
    })

    if(responsavelEncontrado){
      this.poNotification.error("Responsável já incluso na compra")
      return
    }

    this.atualizarFormulario.emit(this.formulario.getRawValue())
    this.fecharModalResponsavelCompra()
  }

  alteraResponsavel(responsavel: any){
    this.formulario.get('responsavel')?.setValue(responsavel?.label);
  }
}
