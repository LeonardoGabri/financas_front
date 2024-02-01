import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroSubgrupoParametroModel {
  nome?: string
  grupoId?: string
  pesquisar?: string
}

export interface FiltroSubgrupoDisclaimerModel {
  nome?: FiltroDisclaimerModel
}

export interface SubgrupoModel{
  id?: string
  nome: string
  grupoId: string
  descricao: string
}

export interface ItemSubgrupoModel {
  id: string
  nome: string
  grupoId: string
  grupoNome: string
  ativo: boolean
}

export const listaColunasSubgrupo = [
  {
    property: 'nome',
    label: 'Subgrupo'
  },
  {
    property: 'grupoNome',
    label: 'Grupo'
  },
]
