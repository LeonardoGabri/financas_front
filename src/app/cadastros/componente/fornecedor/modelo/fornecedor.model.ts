import { FiltroDisclaimerModel } from "src/app/shared/model/FiltroDisclaimer.model"

export interface FiltroFornecedorParametroModel {
  pesquisar?: string
}

export interface FiltroFornecedorDisclaimerModel {
  nome?: FiltroDisclaimerModel
}

export interface FornecedorModel{
  id?: string
  nome: string
  descricao: string
  ativo: boolean
}

export interface ItemFornecedorModel {
  id: string
  nome: string
  ativo: boolean
}

export const listaColunasFornecedor = [
  {
    property: 'nome',
    label: 'Fornecedor'
  },
  {
    property: 'ativo',
    label: 'Status',
    type: 'cellTemplate'
  }
]
