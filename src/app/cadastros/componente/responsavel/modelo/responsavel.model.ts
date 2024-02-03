import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroResponsavelParametroModel {
  pesquisar?: string
}

export interface FiltroResponsavelDisclaimerModel {
  nome?: FiltroDisclaimerModel
}

export interface ResponsavelModel{
  id?: string
  nome: string
  descricao: string
  ativo: boolean
}

export interface ItemResponsavelModel {
  id: string
  nome: string
  ativo: boolean
}

export const listaColunasResponsavel = [
  {
    property: 'nome',
    label: 'Responsável'
  },
  {
    property: 'ativo',
    label: 'Status',
    type: 'cellTemplate'
  }
]
