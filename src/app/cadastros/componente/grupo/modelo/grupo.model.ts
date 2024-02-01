import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroGrupoParametroModel {
  nome?: string
  ativo: boolean
  pesquisar?: string
}

export interface FiltroGrupoDisclaimerModel {
  nome?: FiltroDisclaimerModel
}

export interface GrupoModel{
  id?: string
  nome: string
  descricao: string
}

export interface ItemGrupoModel {
  id: string
  nome: string
  ativo: boolean
}

export const listaColunasGrupo = [
  {
    property: 'nome',
    label: 'Grupo'
  },
]
