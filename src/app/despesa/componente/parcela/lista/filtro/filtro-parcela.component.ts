import { FiltroParcelaParametroModel } from './../../modelo/parcela.model';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PoDisclaimerGroupRemoveAction, PoModalAction, PoModalComponent } from '@po-ui/ng-components';
import { filtroParcelasDisclaimer } from './servico/filtro-parcela.service';
import { ResponsavelComboService } from 'src/app/shared/combos-compartilhados/responsavel-combo.service';

@Component({
  selector: 'app-filtro-parcela',
  templateUrl: './filtro-parcela.component.html'
})
export class FiltroParcelaComponent implements OnInit, AfterViewInit{
  formulario!: FormGroup
  backupFormulario!: any

  @ViewChild('filtroParcela', { static: true })
  filtroParcela!: PoModalComponent;

  @Output() buscarNovosDados = new EventEmitter(true)

  @Output() buscarMaisDados = new EventEmitter(true)

  public acaoFiltro: PoModalAction = {
    action: () => {
      this.buscarNovosDadosComFiltros();
    },
    label: 'Buscar'
  }

  filtrosParcelas = filtroParcelasDisclaimer

  constructor(
    private formBuilder:FormBuilder,
    public responsavelComboService: ResponsavelComboService
  ){}

  ngOnInit(): void {
    this.criarFormulario()
  }

  ngAfterViewInit(): void {
    this.filtroParcela.onXClosed.subscribe(() => {
      this.formulario.patchValue(this.backupFormulario)
    })
  }

  criarFormulario(novoFormulario?: FiltroParcelaParametroModel){
    this.formulario = this.formBuilder.group({
      mesReferencia: [novoFormulario?.mesReferencia],
      anoReferencia: [novoFormulario?.anoReferencia],
      responsavelId: [novoFormulario?.responsavelId],
      pesquisar: [novoFormulario?.pesquisar],
    })
  }

  abrirFiltroParcela(){
    this.backupFormulario = this.formulario.getRawValue();

    this.filtroParcela.open()
  }

  buscarMaisDadosComFiltros(){
    this.buscarDadosComFiltros();

    this.buscarMaisDados.emit(this.filtrosParcelas)
  }

  buscarNovosDadosComFiltros(){
    this.buscarDadosComFiltros();
    this.buscarNovosDados.emit(this.filtrosParcelas)
  }

  buscarDadosComFiltros(){
    this.filtroParcela.close();

    this.processaFiltrosParcelas(this.formulario.getRawValue())
  }

  processaFiltrosParcelas(formulario: FiltroParcelaParametroModel) {
    Object.entries(formulario).forEach(([key, value]) => {
      if (!this.filtrosParcelas[key]) {
        return;
      }

      switch (key) {
        case 'mesReferencia':
          this.filtrosParcelas[key].object = value;
          break;
        case 'anoReferencia':
          this.filtrosParcelas[key].object = value;
          break;
        case 'responsavelId':
          this.filtrosParcelas[key].object = value;
          break;
        default:
          this.filtrosParcelas[key].value = value;
          break;
      }

      this.filtrosParcelas[key].value = value;
    });
  }

  removerDisclaimer(disclaimer : PoDisclaimerGroupRemoveAction){
    let nomeFiltro = disclaimer.removedDisclaimer.value[0];

    this.limparCampo(nomeFiltro);

    this.processaFiltrosParcelas(this.formulario.getRawValue());
    this.buscarNovosDados.emit(this.filtrosParcelas)
  }

  removerTodosDisclaimer(removerTodos: any[]){
    removerTodos.forEach((item: any) => {
      let nomeFiltro = item.value[0];

      this.limparCampo(nomeFiltro)
    })
  }

  limparCampo(nomeFiltro: string){
    if(this.filtrosParcelas[nomeFiltro]){
      this.formulario.get(nomeFiltro)?.reset()
    }
  }

}
