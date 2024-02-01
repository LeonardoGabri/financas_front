import { SubgrupoComboService } from 'src/app/shared/combos-compartilhados/subgrupo-combo.service';
import { FornecedorComboService } from 'src/app/shared/combos-compartilhados/fornecedor-combo.service';
import { BancoComboService } from 'src/app/shared/combos-compartilhados/banco-combo.service';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { filtroCompraDisclaimer } from "./servico/filtro-compra.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PoDisclaimerGroupRemoveAction, PoModalAction, PoModalComponent } from "@po-ui/ng-components";
import { FiltroCompraParametroModel } from '../../modelo/compra.model';
import * as moment from 'moment';

@Component({
  selector: 'app-filtro-compra',
  templateUrl: './filtro-compra.component.html'
})
export class FiltroCompraComponent implements OnInit, AfterViewInit{
  formulario!: FormGroup
  backupFormulario!: any

  @ViewChild('filtroCompra', { static: true })
  filtroCompra!: PoModalComponent;

  @Output() buscarNovosDados = new EventEmitter(true)

  @Output() buscarMaisDados = new EventEmitter(true)

  public acaoFiltro: PoModalAction = {
    action: () => {
      this.buscarNovosDadosComFiltros();
    },
    label: 'Buscar'
  }

  filtrosCompra = filtroCompraDisclaimer

  constructor(
    private formBuilder:FormBuilder,
    public bancoComboService: BancoComboService,
    public fornecedorComboService: FornecedorComboService,
    public subgrupoComboService: SubgrupoComboService
  ){}

  ngOnInit(): void {
    this.criarFormulario()
  }

  ngAfterViewInit(): void {
    this.filtroCompra.onXClosed.subscribe(() => {
      this.formulario.patchValue(this.backupFormulario)
    })
  }

  criarFormulario(novoFormulario?: FiltroCompraParametroModel){
    this.formulario = this.formBuilder.group({
      bancoId: [novoFormulario?.bancoId],
      fornecedorId: [novoFormulario?.fornecedorId],
      subgrupoId: [novoFormulario?.subgrupoId],
      dataInicio: [novoFormulario?.dataInicio],
      dataFim: [novoFormulario?.dataFim],
      pesquisar: [novoFormulario?.pesquisar],
    })
  }

  abrirFiltroCompra(){
    this.backupFormulario = this.formulario.getRawValue();

    this.filtroCompra.open()
  }

  buscarMaisDadosComFiltros(){
    this.buscarDadosComFiltros();

    this.buscarMaisDados.emit(this.filtrosCompra)
  }

  buscarNovosDadosComFiltros(){
    this.buscarDadosComFiltros();
    this.buscarNovosDados.emit(this.filtrosCompra)
  }

  buscarDadosComFiltros(){
    this.filtroCompra.close();

    this.processaFiltrosCompra(this.formulario.getRawValue())
  }

  processaFiltrosCompra(formulario: FiltroCompraParametroModel) {
    Object.entries(formulario).forEach(([key, value]) => {
      if (!this.filtrosCompra[key]) {
        return;
      }

      switch (key) {
        case 'bancoId':
          this.filtrosCompra[key].object = value;
          break;
        case 'fornecedorId':
          this.filtrosCompra[key].object = value;
          break;
        case 'subgrupoId':
          this.filtrosCompra[key].object = value;
          break;
        case 'dataInicio':
          this.filtrosCompra[key].object = moment(value).format('DD/MM/yyyy');
          break;
        case 'dataFim':
          this.filtrosCompra[key].object = moment(value).format('DD/MM/yyyy');
          break;
        default:
          this.filtrosCompra[key].value = value;
          break;
      }

      this.filtrosCompra[key].value = value;
    });
  }

  removerDisclaimer(disclaimer : PoDisclaimerGroupRemoveAction){
    let nomeFiltro = disclaimer.removedDisclaimer.value[0];

    this.limparCampo(nomeFiltro);

    this.processaFiltrosCompra(this.formulario.getRawValue());
    this.buscarNovosDados.emit(this.filtrosCompra)
  }

  removerTodosDisclaimer(removerTodos: any[]){
    removerTodos.forEach((item: any) => {
      let nomeFiltro = item.value[0];

      this.limparCampo(nomeFiltro)
    })
  }

  limparCampo(nomeFiltro: string){
    if(this.filtrosCompra[nomeFiltro]){
      this.formulario.get(nomeFiltro)?.reset()
    }
  }
}
